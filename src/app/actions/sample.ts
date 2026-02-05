'use server'

import { createClient } from '@/lib/supabase/server'
import { SAMPLE_RESUMES } from '@/lib/sample-resumes'
import { revalidatePath } from 'next/cache'

export async function duplicateSampleResume(sampleId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    // Find the sample
    const sample = SAMPLE_RESUMES.find(s => s.id === sampleId)
    if (!sample) throw new Error('Sample not found')

    // Create a deep copy of the content to avoid modifying the original (though it's static)
    // and potentially scrub personal data if we wanted to (but users might want the placeholder text)
    const newContent = JSON.parse(JSON.stringify(sample.content))

    // Insert into DB
    const { data, error } = await supabase
        .from('resumes')
        .insert({
            user_id: user.id,
            title: `Copy of ${sample.title}`, // e.g. "Copy of Senior Software Engineer"
            content: newContent,
            is_optimized: false,
            updated_at: new Date().toISOString()
        })
        .select()
        .single()

    if (error) {
        console.error('Error duplicating sample:', error)
        throw new Error('Failed to create resume from sample')
    }

    revalidatePath('/dashboard')
    return data
}
