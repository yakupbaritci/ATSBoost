'use server'

import { createClient } from '@/lib/supabase/server'
import { extractTextFromPdf } from '@/lib/parse-pdf'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createResumeFromPdf(formData: FormData) {
    const file = formData.get('file') as File

    if (!file) {
        throw new Error('No file uploaded')
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 1. Extract raw text
    const rawText = await extractTextFromPdf(buffer)

    // 2. Initial Structure (TODO: Use AI here later)
    // For now, we just dump the raw text into the summary or a raw field
    const initialContent = {
        contact: {},
        summary: rawText.slice(0, 500) + '...', // Placeholder
        raw_text_dump: rawText, // We'll use this for AI processing later
        education: [],
        experience: [],
        skills: []
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    // 3. Save to DB
    const { data, error } = await supabase
        .from('resumes')
        .insert({
            user_id: user.id,
            title: file.name.replace('.pdf', ''),
            content: initialContent,
            original_pdf_url: '', // We could upload to storage here if needed
            is_optimized: false
        })
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error('Failed to create resume record')
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
