'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteResume(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error('Failed to delete resume')
    }

    revalidatePath('/dashboard')
}
