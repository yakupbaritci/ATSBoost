import { FileText, Plus, Upload, Trash2, Sparkles, Briefcase, Video, MoreVertical } from 'lucide-react'
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
        <div className="space-y-10">
            {/* Top Feature Banners */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">AI Resume Agent</h3>
                        <p className="text-sm text-gray-500 mt-1">Our most powerful AI resume tool</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <Briefcase className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">Job Search</h3>
                        <p className="text-sm text-gray-500 mt-1">+2M jobs sourced from career pages</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                        <Video className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">AI Interview</h3>
                        <p className="text-sm text-gray-500 mt-1">A new way to practice interviewing</p>
                    </div>
                </div>
            </div>

            {/* Resumes Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Resumes</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 grid place-items-center">
                            <span className="sr-only">Grid View</span>
                            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                                <span className="bg-current rounded-[1px]"></span>
                                <span className="bg-current rounded-[1px]"></span>
                                <span className="bg-current rounded-[1px]"></span>
                                <span className="bg-current rounded-[1px]"></span>
                            </div>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">List View</span>
                            <div className="flex flex-col gap-0.5 w-3.5 h-3.5 justify-center">
                                <span className="bg-zinc-400 w-full h-[2px] rounded-full"></span>
                                <span className="bg-zinc-400 w-full h-[2px] rounded-full"></span>
                                <span className="bg-zinc-400 w-full h-[2px] rounded-full"></span>
                            </div>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {/* Create New Card (Always First) */}
                    <Link
                        href="/dashboard/builder/new"
                        className="group flex flex-col items-center justify-center min-h-[280px] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors mb-4">
                            <Plus className="w-6 h-6 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <span className="font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 transition-colors">Create new resume</span>
                    </Link>

                    {/* Resume Cards */}
                    {resumes?.map((resume) => (
                        <div
                            key={resume.id}
                            className="group relative flex flex-col rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all h-[280px]"
                        >
                            <Link href={`/dashboard/builder/${resume.id}`} className="absolute inset-0 z-10 rounded-xl" />

                            {/* Card Body - Preview Placeholder */}
                            <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/50 rounded-t-xl grid place-items-center relative border-b border-gray-100 dark:border-zinc-800 p-8">
                                <div className="w-full h-full bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 flex flex-col p-2 items-start space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-1/3 h-2 bg-gray-200 rounded"></div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded"></div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded"></div>
                                    <div className="w-2/3 h-1.5 bg-gray-100 rounded"></div>
                                </div>

                                {resume.is_optimized && (
                                    <span className="absolute top-3 right-3 inline-flex items-center rounded-sm bg-green-500/10 px-2 py-1 text-[10px] font-bold text-green-600 uppercase tracking-wide border border-green-200">
                                        Optimized
                                    </span>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="p-4 flex items-center justify-between bg-white dark:bg-zinc-900 rounded-b-xl relative z-20">
                                <div className="min-w-0">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate pr-2 group-hover:text-blue-600 transition-colors">
                                        {resume.title || 'Untitled Resume'}
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        Edited {new Date(resume.updated_at).toLocaleDateString()}
                                    </p>
                                </div>

                                <form action={async () => {
                                    'use server'
                                    await deleteResume(resume.id)
                                }}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500" type="submit">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
