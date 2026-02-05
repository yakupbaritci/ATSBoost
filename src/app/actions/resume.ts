'use server'

import { createClient } from '@/lib/supabase/server'
import { extractTextFromPdf } from '@/lib/parse-pdf'
import { parseResumeWithAI } from '@/app/actions/ai'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createNewResume(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const title = formData.get('title') as string || 'Untitled Resume'
    const experienceLevel = formData.get('experienceLevel') as string
    const file = formData.get('file') as File

    let initialContent: any = {
        contact: {},
        summary: '',
        education: [],
        experience: [],
        skills: [],
        meta: {
            experienceLevel
        }
    }
    let publicUrl = ''

    // If file uploaded, process PDF
    if (file && file.size > 0) {
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
        }

        publicUrl = storageData?.path
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${storageData.path}`
            : ''

        // 1. Extract raw text...
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
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

        initialContent = {
            ...initialContent,
            ...structuredData,
            raw_text_dump: rawText
        }
    }

    // 3. Save to DB
    const { data, error } = await supabase
        .from('resumes')
        .insert({
            user_id: user.id,
            title: title,
            content: initialContent,
            original_pdf_url: publicUrl,
            is_optimized: false
        })
        .select()
        .single()

    if (error) {
        console.error('Supabase Error:', error)
        throw new Error(`Failed to create resume record: ${error.message}`)
    }

    revalidatePath('/dashboard')
    // If file was imported, stick to wizard. 
    // If empty create, maybe wizard too? Yes, let's keep wizard for all new creates.
    redirect(`/dashboard/builder/${data.id}?wizard=true`)
}
