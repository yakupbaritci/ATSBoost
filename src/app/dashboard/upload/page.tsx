'use client'

import { createNewResume } from '@/app/actions/resume'
import { Button } from '@/components/ui/button'
import { Upload, FileText } from 'lucide-react'
import { useState } from 'react'

export default function UploadPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name)
        } else {
            setFileName(null)
        }
    }

    return (
        <div className="max-w-xl mx-auto py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Upload your CV</h1>
                <p className="text-zinc-500 mt-2">
                    We&apos;ll extract the text and help you optimize it for ATS.
                </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                <form
                    action={async (formData) => {
                        setIsLoading(true)
                        await createNewResume(formData)
                    }}
                    className="space-y-6"
                >
                    <div className="border-2 border-dashed border-zinc-300 rounded-lg p-12 text-center hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:hover:bg-zinc-800/50 relative">
                        {/* Always keep the input present but hidden so it submits with the form */}
                        <input
                            id="file-upload"
                            name="file"
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            required
                            onChange={handleFileChange}
                            ref={(input) => {
                                // If file name is null (removed), reset input value
                                if (input && !fileName) input.value = '';
                            }}
                        />

                        {fileName ? (
                            <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                                <FileText className="h-12 w-12 text-blue-500 mb-2" />
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{fileName}</p>
                                <p className="text-xs text-zinc-500 mt-1">Ready to upload</p>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFileName(null);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-zinc-400" />
                                <div className="mt-4 flex text-sm text-zinc-600 justify-center dark:text-zinc-400">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                                    >
                                        <span>Upload a file</span>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-zinc-500 mt-2">PDF up to 10MB</p>
                            </>
                        )}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading || !fileName}>
                        {isLoading ? 'Processing...' : 'Analyze CV'}
                    </Button>
                </form>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500 mb-4">Don&apos;t have a PDF?</p>
                <form action={async () => {
                    // Import dynamically or use client transition
                    const { createEmptyResume } = await import('@/app/actions/resume')
                    await createEmptyResume()
                }}>
                    <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        Create from Scratch
                    </Button>
                </form>
            </div>
        </div>
    )
}
