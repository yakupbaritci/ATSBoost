"use client"

import { useState, useTransition, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createNewResume } from "@/app/actions/resume"
import { Plus, Upload, Loader2, ChevronDown, ChevronRight, FileText, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function CreateResumeDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [importSectionOpen, setImportSectionOpen] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)
    const [statusMessage, setStatusMessage] = useState("")

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => {
                setFileName(null)
                setImportSectionOpen(false)
                setProgress(0)
                setStatusMessage("")
                formRef.current?.reset()
            }, 300) // Clear after animation
            return () => clearTimeout(timer)
        }
    }, [open])

    // Simulate progress when pending
    useEffect(() => {
        if (isPending) {
            setProgress(0)
            setStatusMessage("Starting upload...")

            const interval = setInterval(() => {
                setProgress((prev) => {
                    // Stage 1: Uploading (0-30%) - Fast
                    if (prev < 30) {
                        setStatusMessage("Uploading file...")
                        return prev + 5
                    }
                    // Stage 2: Parsing PDF (30-60%) - Fast-Medium
                    if (prev < 60) {
                        setStatusMessage("Extracting text from PDF...")
                        return prev + 2
                    }
                    // Stage 3: AI Processing (60-90%) - Slow (waiting for server)
                    if (prev < 90) {
                        setStatusMessage("AI Agent is analyzing your resume...")
                        return prev + 0.5
                    }
                    return prev
                })
            }, 100)

            return () => clearInterval(interval)
        } else {
            // When finished (or error), jump to 100 if success
            if (progress > 0 && open) { // Only if still valid
                // Don't auto set to 100 here, let the close handler or effect do it
            }
        }
    }, [isPending, open])

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                const data = await createNewResume(formData)

                // Success State
                setProgress(100)
                setStatusMessage("Resume created successfully!")

                // Small delay to show completion state
                setTimeout(() => {
                    setOpen(false)
                    toast.success("Redirecting to builder...")
                    router.push(`/dashboard/builder/${data.id}?wizard=true`)
                }, 1500)

            } catch (error: any) {
                console.error(error)
                toast.error("Failed: " + (error.message || "Unknown error"))
                setProgress(0)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {children || (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Resume
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-950 p-0 gap-0 overflow-hidden text-left">
                {isPending ? (
                    <div className="p-12 flex flex-col items-center justify-center space-y-8 min-h-[400px]">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            {/* Spinner Circle */}
                            <svg className="animate-spin w-full h-full text-zinc-200" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {/* Percentage in center */}
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-zinc-700 dark:text-zinc-300">
                                {progress === 100 ? (
                                    <Check className="w-8 h-8 text-green-500 animate-in zoom-in duration-300" />
                                ) : (
                                    <span>{Math.round(progress)}%</span>
                                )}
                            </div>
                        </div>

                        <div className="w-full space-y-2 text-center">
                            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{statusMessage}</h3>
                            <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Please wait while we process your document.</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 pb-4">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-xl font-bold">Create a resume</DialogTitle>
                        </DialogHeader>
                        <form ref={formRef} action={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Resume Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Ex: First Last Name - Job Title"
                                    className="h-12 border-zinc-200 dark:border-zinc-800 focus-visible:ring-green-500 text-zinc-900 dark:text-zinc-100 bg-transparent"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experienceLevel" className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Experience
                                </Label>
                                <div className="relative">
                                    <select
                                        name="experienceLevel"
                                        className="flex h-12 w-full appearance-none items-center justify-between rounded-md border border-zinc-200 bg-white dark:bg-zinc-950 px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 text-zinc-900 dark:text-zinc-100"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select...</option>
                                        <option value="internship">Internship (0-1 years)</option>
                                        <option value="entry">Entry Level (1-3 years)</option>
                                        <option value="mid">Mid Level (3-5 years)</option>
                                        <option value="senior">Senior Level (5+ years)</option>
                                        <option value="executive">Executive</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-4 h-4 w-4 opacity-50 pointer-events-none" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="button"
                                    className="flex items-center text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2 hover:text-green-600 transition-colors focus:outline-none"
                                    onClick={() => setImportSectionOpen(!importSectionOpen)}
                                >
                                    IMPORT YOUR EXISTING RESUME
                                    {importSectionOpen ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
                                </button>

                                <div className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    importSectionOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                                )}>
                                    <div className="rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors relative">
                                        <input
                                            type="file"
                                            name="file"
                                            accept=".pdf"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    setFileName(e.target.files[0].name)
                                                } else {
                                                    setFileName(null)
                                                }
                                            }}
                                        />
                                        {fileName ? (
                                            <div className="flex flex-col items-center text-green-600">
                                                <FileText className="w-8 h-8 mb-2" />
                                                <span className="text-sm font-medium">{fileName}</span>
                                                <span className="text-xs text-zinc-400 mt-1">Ready to import</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center text-zinc-400">
                                                <Upload className="w-8 h-8 mb-2" />
                                                <span className="text-sm">Upload PDF resume file</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
                                        <span className="inline-flex w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold items-center justify-center text-zinc-500">!</span>
                                        This process may take up to 60 seconds.
                                    </p>
                                </div>
                            </div>

                            <DialogFooter className="py-4 border-t border-zinc-100 dark:border-zinc-800 -mx-6 px-6 bg-zinc-50/50 dark:bg-zinc-900/50 flex sm:flex-row flex-col justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                                    CANCEL
                                </Button>
                                <Button type="submit" disabled={isPending} className="bg-[#00C853] text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 font-bold text-xs uppercase tracking-wider min-w-[100px]">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                                            SAVING
                                        </>
                                    ) : (
                                        'SAVE'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
