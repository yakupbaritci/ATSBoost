import { FileText, Plus, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { deleteResume } from '@/app/actions/resume-actions' // You'll create this next

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch resumes
    const { data: resumes } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Welcome back, {user.user_metadata.full_name || user.email?.split('@')[0]}
                    </p>
                </div>
                <div>
                    <CreateResumeDialog>
                         <Button className="bg-[#00C853] text-white hover:bg-green-600 border-none">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Resume
                        </Button>
                    </CreateResumeDialog>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Stats Cards (Placeholders) */}
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="text-sm font-medium text-zinc-500">Total Resumes</div>
                    <div className="mt-2 text-3xl font-bold">{resumes?.length || 0}</div>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="text-sm font-medium text-zinc-500">Optimized</div>
                    <div className="mt-2 text-3xl font-bold text-green-600">
                        {resumes?.filter((r) => r.is_optimized).length || 0}
                    </div>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="text-sm font-medium text-zinc-500">Credits Remaining</div>
                    <div className="mt-2 text-3xl font-bold text-blue-600">
                        {/* TODO: Fetch real credits from profile */}
                        5
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Resumes</h2>
                {(!resumes || resumes.length === 0) ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                            <FileText className="h-6 w-6 text-zinc-400" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No resumes yet</h3>
                        <p className="mb-4 text-sm text-zinc-500 max-w-sm">
                            Upload an existing PDF or create a new one from scratch to get started.
                        </p>
                        <CreateResumeDialog>
                             <Button>Create your first Resume</Button>
                        </CreateResumeDialog>
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
                        ))}      </div>
                )}
            </div>
        </div >
    )
}
