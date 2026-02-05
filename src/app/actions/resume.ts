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

    const file = formData.get('file') as File
    const experienceLevel = formData.get('experienceLevel') as string

    // Determine title: Use form title, or fallback to filename if file exists, or default
    let derivedTitle = formData.get('title') as string
    if ((!derivedTitle || derivedTitle === 'Untitled Resume') && file && file.size > 0) {
        derivedTitle = file.name.replace(/\.[^/.]+$/, "") // Remove extension
    }
    if (!derivedTitle) derivedTitle = 'Untitled Resume'

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
        let rawText = ''

        try {
            rawText = await extractTextFromPdf(buffer)
        } catch (e: any) {
            console.error("PDF Parse Error:", e)
            // If parsing fails, we could throw or just continue empty.
            // Continuing empty might be confusing. Throwing is better.
            throw new Error(`Could not read PDF file: ${e.message}`)
        }

        // 2. Structure with AI
        let structuredData = null
        try {
            structuredData = await parseResumeWithAI(rawText)
        } catch (e) {
            console.error("AI Parse Warning:", e)
            // AI failure is acceptable, fallback to raw text
        }

        // Fallback if AI fails or returns null
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
            title: derivedTitle,
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
    // Return the created resume data instead of redirecting
    return data
}
