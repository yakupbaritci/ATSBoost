'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { ResumeForm } from '@/components/builder/ResumeForm'
import { ResumePreview, ResumeDocument } from '@/components/builder/ResumePreview'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Loader2, ArrowLeft, FileText, Eye, Wand2, LayoutDashboard, Palette, Download, Wand2 as MagicWand } from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { optimizeResumeContent, calculateATSScore, applySpecificImprovement } from '@/app/actions/ai'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Trophy } from 'lucide-react'

export default function BuilderPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const [resume, setResume] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [optimizing, setOptimizing] = useState(false)
    const [scoring, setScoring] = useState(false)
    const [atsResult, setAtsResult] = useState<any>(null)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [fixingIndex, setFixingIndex] = useState<number | null>(null)
    const [pendingFixContent, setPendingFixContent] = useState<any>(null)
    const [showFixConfirm, setShowFixConfirm] = useState(false)

    // Initialize wizard mode if 'new' or if query param present
    const [isWizardMode, setIsWizardMode] = useState(params.id === 'new' || searchParams.get('wizard') === 'true')
    const [currentTemplate, setCurrentTemplate] = useState('classic')

    const supabase = createClient()

    useEffect(() => {
        if (params.id === 'new') {
            // Initialize empty resume for new creation
            setResume({
                title: 'Untitled Resume',
                content: {
                    contact: {},
                    experience: [],
                    education: [],
                    skills: [],
                    projects: [],
                    certifications: [],
                    languages: [],
                    summary: ''
                },
                is_optimized: false
            })
            setIsWizardMode(true) // Start new users in Wizard mode
            setLoading(false)
            return
        }

        const fetchResume = async () => {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('id', params.id)
                .single()

            if (data) {
                // Ensure structure exists
                if (!data.content) data.content = {}
                if (!data.content.contact) data.content.contact = {}
                if (!data.content.experience) data.content.experience = []
                setResume(data)
                if (data.content.template) {
                    setCurrentTemplate(data.content.template)
                }
                if (data.content.template) {
                    setCurrentTemplate(data.content.template)
                }
                // Load saved ATS result if exists
                if (data.content.atsAnalysis) {
                    setAtsResult(data.content.atsAnalysis)
                }
            }
            setLoading(false)
        }
        fetchResume()
    }, [params.id])

    const handleUpdate = (newContent: any) => {
        setResume((prev: any) => ({ ...prev, content: newContent }))
    }

    const handleSave = async () => {
        setSaving(true)

        if (params.id === 'new') {
            // Create new resume
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setSaving(false)
                return
            }

            const { data, error } = await supabase
                .from('resumes')
                .insert({
                    user_id: user.id,
                    title: resume.title || 'Untitled Resume',
                    content: { ...resume.content, template: currentTemplate },
                    updated_at: new Date().toISOString()
                })
                .select()
                .single()

            if (data) {
                // Redirect to the new ID so URL updates
                window.location.href = `/dashboard/builder/${data.id}`
            } else if (error) {
                alert('Failed to create resume')
            }
        } else {
            // Update existing
            const { error } = await supabase
                .from('resumes')
                .update({
                    content: { ...resume.content, template: currentTemplate },
                    title: resume.title,
                    updated_at: new Date().toISOString()
                })
                .eq('id', resume.id)

            if (error) {
                alert('Failed to save')
            }
        }
        setSaving(false)
    }

    const handleOptimize = async () => {
        const jd = resume.content.targetJob?.description
        if (!jd) {
            alert('Please add a Job Description in the "Target Job" tab first.')
            return
        }

        if (!confirm('This will rewrite your Summary and Experience sections. Continue?')) return

        setOptimizing(true)
        try {
            const optimizedContent = await optimizeResumeContent(resume.content, jd)
            handleUpdate({ ...optimizedContent, targetJob: resume.content.targetJob }) // Keep the JD

            // Mark as optimized in DB
            await supabase.from('resumes').update({ is_optimized: true }).eq('id', resume.id)

            alert('Optimization Complete! Check your new Summary.')
        } catch (e: any) {
            alert(e.message)
        } finally {
            setOptimizing(false)
        }
    }

    const handleCheckScore = async (contentToAnalyze = resume.content) => {
        if (!contentToAnalyze || Object.keys(contentToAnalyze).length === 0) {
            toast.error("Resume content is empty, cannot calculate score.")
            return
        }

        setScoring(true)
        setShowScoreModal(true)
        try {
            const jd = contentToAnalyze.targetJob?.description
            const result = await calculateATSScore(contentToAnalyze, jd)

            setAtsResult(result)

            // Persist the score to DB immediately
            const updatedContent = { ...contentToAnalyze, atsAnalysis: result }
            // Update local state first to be responsive
            setResume((prev: any) => ({ ...prev, content: updatedContent }))
            // Save to DB
            await supabase.from('resumes').update({
                content: updatedContent,
                updated_at: new Date().toISOString()
            }).eq('id', resume.id)

        } catch (e: any) {
            console.error(e)
            toast.error("Failed to calculate score")
            setShowScoreModal(false)
        } finally {
            setScoring(false)
        }
    }

    const handleApplyFix = async (instruction: string, index: number) => {
        setFixingIndex(index)
        try {
            const optimizedContent = await applySpecificImprovement(resume.content, instruction)
            setPendingFixContent(optimizedContent)
            setShowFixConfirm(true) // Open confirmation dialog
        } catch (e: any) {
            toast.error("Failed to generate fix")
        } finally {
            setFixingIndex(null)
        }
    }

    const confirmFix = async () => {
        if (pendingFixContent) {
            // 1. Update the actual resume content
            handleUpdate(pendingFixContent)

            // 2. Close the confirmation modal
            setShowFixConfirm(false)

            // 3. Show success message
            toast.success("Improvement applied! Re-calculating score...")

            // 4. Temporarily clear pending content
            const newContent = pendingFixContent
            setPendingFixContent(null)

            // 5. Build instant urgency: Re-calculate score with the NEW content immediately
            await handleCheckScore(newContent)
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!resume) return <div>Resume not found</div>

    return (
        <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            {/* Top Bar */}
            {/* Top Bar - Minimalist */}
            <header className="h-14 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/resumes" className="text-zinc-500 hover:text-zinc-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">
                            {resume.is_optimized ? 'Optimized' : 'Draft'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-zinc-500" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        {saving ? 'Saving...' : 'Save Draft'}
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsWizardMode(!isWizardMode)}
                        className="ml-2 text-zinc-400 hover:text-zinc-900"
                    >
                        {isWizardMode ? <LayoutDashboard className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                    </Button>
                </div>
            </header>

            {/* Main Workspace - Simplified */}
            <div className="flex-1 overflow-hidden bg-[#f8f9fc] dark:bg-black">
                {/* We render ONLY the ResumeForm which now handles the entire layout & preview in 'Finish' tab */}
                <ResumeForm
                    initialContent={resume.content}
                    onUpdate={handleUpdate}
                    isWizardMode={isWizardMode}
                    key={isWizardMode ? 'wizard' : 'editor'}

                    // Finish Up Props
                    atsScore={atsResult}
                    onCheckScore={() => handleCheckScore()}
                    isOptimizing={optimizing}
                    onAutoOptimize={handleOptimize}
                    currentTemplate={currentTemplate}
                    onTemplateChange={setCurrentTemplate}

                    // Pass the Preview component to be rendered inside the Finish tab
                    previewComponent={
                        <ResumePreview content={resume.content} template={currentTemplate} />
                    }

                    // Pass Download Logic
                    onDownload={() => (
                        <PDFDownloadLink
                            document={<ResumeDocument content={resume.content} template={currentTemplate} />}
                            fileName={`${resume.title || 'resume'}.pdf`}
                        >
                            {({ blob, url, loading: pdfLoading, error }) => (
                                <Button size="lg" className="w-full font-bold" disabled={pdfLoading}>
                                    {pdfLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                                    Download PDF
                                </Button>
                            )}
                        </PDFDownloadLink>
                    )}
                />
            </div>

            {/* ATS Score Modal - Still kept at page level for the full modal experience if triggered */}
            <Dialog open={showScoreModal} onOpenChange={setShowScoreModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            ATS Score Analysis
                        </DialogTitle>
                        <DialogDescription>
                            AI-powered analysis of your resume's effectiveness.
                        </DialogDescription>
                    </DialogHeader>

                    {scoring ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                            <p className="text-zinc-500 animate-pulse">Analyzing keywords and formatting...</p>
                        </div>
                    ) : (atsResult && (
                        <div className="space-y-6">
                            {/* Score Display */}
                            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <div className="relative flex items-center justify-center w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-200 dark:text-zinc-800" />
                                        <circle
                                            cx="64" cy="64" r="60"
                                            stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeDasharray={2 * Math.PI * 60}
                                            strokeDashoffset={2 * Math.PI * 60 * (1 - atsResult.score / 100)}
                                            className={`transition-all duration-1000 ease-out ${atsResult.score >= 80 ? 'text-green-500' : atsResult.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-4xl font-bold">{atsResult.score}</span>
                                        <span className="text-xs uppercase font-medium text-zinc-500">Score</span>
                                    </div>
                                </div>
                                <h3 className={`mt-4 text-lg font-bold ${atsResult.score >= 80 ? 'text-green-600' : atsResult.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {atsResult.verdict}
                                </h3>
                                <p className="text-center text-sm text-zinc-500 mt-2 px-4">
                                    {atsResult.summary}
                                </p>
                            </div>

                            {/* Improvements */}
                            <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-blue-500" />
                                    Recommended Improvements
                                </h4>
                                <ul className="space-y-2">
                                    {atsResult.improvements?.map((imp: string, i: number) => (
                                        <li key={i} className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex justify-between items-center gap-3 text-blue-700 dark:text-blue-300 group">
                                            <div className="flex gap-2">
                                                <span className="font-bold shrink-0">{i + 1}.</span>
                                                <span>{imp}</span>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="default"
                                                className="h-7 text-xs bg-blue-600 hover:bg-blue-700 opacity-60 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleApplyFix(imp, i)}
                                                disabled={fixingIndex !== null}
                                            >
                                                {fixingIndex === i ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <MagicWand className="w-3 h-3 mr-1" />}
                                                Fix
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Missing Keywords (Only if JD exist) */}
                            {atsResult.missingKeywords?.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-red-500" />
                                        Missing Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {atsResult.missingKeywords.map((kw: string, i: number) => (
                                            <Badge key={i} variant="outline" className="border-red-200 text-red-600 bg-red-50 hover:bg-red-100">
                                                {kw}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </DialogContent>
            </Dialog>

            {/* Fix Confirmation Modal */}
            <Dialog open={showFixConfirm} onOpenChange={setShowFixConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apply Improvement?</DialogTitle>
                        <DialogDescription>
                            AI has generated a new version of your resume based on this suggestion.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-sm text-zinc-600 bg-zinc-50 p-4 rounded border">
                        The content has been optimized. Check the main preview to see changes after applying.
                        <br />
                        (Undo is available via standard undo if implemented, otherwise careful!)
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowFixConfirm(false)}>Cancel</Button>
                        <Button onClick={confirmFix} className="bg-green-600 hover:bg-green-700">
                            Apply Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
