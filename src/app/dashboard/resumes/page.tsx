import { FileText, Plus, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { deleteResume } from '@/app/actions/resume-actions'

export default async function ResumesPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: resumes } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        View and manage your resume collection.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/upload">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload PDF
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard/builder/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New
                        </Link>
                    </Button>
                </div>
            </div>

            <div>
                {(!resumes || resumes.length === 0) ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                            <FileText className="h-6 w-6 text-zinc-400" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No resumes yet</h3>
                        <p className="mb-4 text-sm text-zinc-500 max-w-sm">
                            Upload an existing PDF or create a new one from scratch to get started.
                        </p>
                        <Button asChild>
                            <Link href="/dashboard/builder/new">Create your first Resume</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {resumes.map((resume) => (
                            <div
                                key={resume.id}
                                className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                            >
                                <Link href={`/dashboard/builder/${resume.id}`} className="absolute inset-0 z-10 focus:outline-none rounded-xl" />

                                <div className="relative flex justify-between items-start">
                                    <div className="pointer-events-none">
                                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                                            {resume.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <form action={async () => {
                                        'use server'
                                        await deleteResume(resume.id)
                                    }} className="relative z-20">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-50" type="submit">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>

                                <div className="mt-4 flex items-center gap-2 relative z-0">
                                    {resume.is_optimized && (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            Optimized
                                        </span>
                                    )}
                                    <span className="text-xs text-zinc-400 uppercase">
                                        {resume.language}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
