import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function BuilderPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const resolvedParams = await params

    const { data: resume } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

    if (!resume) {
        return notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold">{resume.title || 'Untitled Resume'}</h1>
                    <p className="text-sm text-zinc-500">
                        Builder Mode • {resume.is_optimized ? 'Optimized' : 'Draft'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-md">
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
                {/* Left: Editor Form */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200 overflow-auto dark:bg-zinc-900 dark:border-zinc-800">
                    <h2 className="font-semibold mb-4">Edit Content</h2>
                    <pre className="text-xs bg-zinc-100 p-4 rounded overflow-auto h-full">
                        {JSON.stringify(resume.content, null, 2)}
                    </pre>
                </div>

                {/* Right: Preview (Placeholder) */}
                <div className="bg-zinc-100 p-6 rounded-xl border border-zinc-200 flex items-center justify-center dark:bg-zinc-800 dark:border-zinc-700">
                    <div className="text-center">
                        <p className="text-zinc-500">PDF Preview will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
