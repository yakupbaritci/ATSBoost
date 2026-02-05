'use server'

import { createClient } from '@/lib/supabase/server'
import { extractTextFromPdf } from '@/lib/parse-pdf'
import { parseResumeWithAI } from '@/app/actions/ai'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createResumeFromPdf(formData: FormData) {
    const file = formData.get('file') as File

    if (!file) {
        throw new Error('No file uploaded')
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    // 0. Upload PDF to Storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const { data: storageData, error: storageError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
            upsert: true,
            contentType: 'application/pdf'
        })

    if (storageError) {
        console.error('Storage Error:', storageError)
        // We continue even if upload fails, but original_pdf_url will be empty
    }

    const publicUrl = storageData?.path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${storageData.path}`
        : ''

    // 1. Extract raw text...
    const rawText = await extractTextFromPdf(buffer)

    // 2. Structure with AI
    let structuredData = await parseResumeWithAI(rawText)

    // Fallback if AI fails
    if (!structuredData) {
        structuredData = {
            contact: {},
            summary: rawText.slice(0, 500) + '...',
            education: [],
            experience: [],
            skills: []
        }
    }

    const initialContent = {
        ...structuredData,
        raw_text_dump: rawText
    }

    // 3. Save to DB
    const { data, error } = await supabase
        .from('resumes')
        .insert({
            user_id: user.id,
            title: file.name.replace('.pdf', ''),
            content: initialContent,
            original_pdf_url: publicUrl,
            is_optimized: false
        })
        .select()
        .single()

    if (error) {
        console.error('Supabase Error:', error)
        throw new Error(`Failed to create resume record: ${error.message} (${error.code})`)
    }

    revalidatePath('/dashboard')
    redirect(`/dashboard/builder/${data.id}`)
}

export async function createEmptyResume() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data, error } = await supabase
        .from('resumes')
        .insert({
            user_id: user.id,
            title: 'Untitled Resume',
            content: {
                contact: {},
                summary: '',
                education: [],
                experience: [],
                skills: []
            }
        })
        .select()
        .single()

    if (error) throw new Error('Failed to create resume')

    revalidatePath('/dashboard')
    redirect(`/dashboard/builder/${data.id}`)
}
