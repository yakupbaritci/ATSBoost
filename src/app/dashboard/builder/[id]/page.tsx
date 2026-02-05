'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { ResumeForm } from '@/components/builder/ResumeForm'
import { ResumePreview } from '@/components/builder/ResumePreview'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Loader2, ArrowLeft, FileText, Eye, Wand2, LayoutDashboard, Palette } from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { optimizeResumeContent } from '@/app/actions/ai'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BuilderPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const [resume, setResume] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [optimizing, setOptimizing] = useState(false)
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
                    content: resume.content,
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
                    content: resume.content,
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
            <header className="h-14 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-zinc-500 hover:text-zinc-900">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <input
                            className="font-semibold bg-transparent focus:outline-none focus:ring-1 focus:ring-primary rounded px-1"
                            defaultValue={resume.title}
                            onBlur={async (e) => {
                                if (params.id !== 'new') {
                                    await supabase.from('resumes').update({ title: e.target.value }).eq('id', resume.id)
                                } else {
                                    // For new resumes, just update local state title (not saving yet)
                                    setResume({ ...resume, title: e.target.value })
                                }
                            }}
                        />
                        <span className="text-xs text-zinc-400 ml-2">
                            {resume.is_optimized ? 'Optimized' : 'Draft'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save
                    </Button>
                    <Button
                        size="sm"
                        variant="default"
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0"
                        onClick={handleOptimize}
                        disabled={optimizing}
                    >
                        {optimizing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Optimizing...
                            </>
                        ) : (
                            <>✨ Auto-Optimize</>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsWizardMode(!isWizardMode)}
                        className="ml-2"
                    >
                        {isWizardMode ? <LayoutDashboard className="w-4 h-4 mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                        {isWizardMode ? 'Editor Mode' : 'Wizard Mode'}
                    </Button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Interactive Form */}
                <div className="w-1/2 p-6 overflow-hidden border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                    <ResumeForm
                        initialContent={resume.content}
                        onUpdate={handleUpdate}
                        isWizardMode={isWizardMode}
                        key={isWizardMode ? 'wizard' : 'editor'}
                    />
                </div>

                {/* Right: Live Preview */}
                <div className="w-1/2 bg-zinc-100 p-8 dark:bg-zinc-950 flex flex-col overflow-hidden">
                    <Tabs defaultValue="preview" className="w-full h-full flex flex-col">
                        <div className="flex justify-between mb-4 items-center">
                            <TabsList>
                                <TabsTrigger value="preview"><Eye className="w-4 h-4 mr-2" /> ATS Preview</TabsTrigger>
                                <TabsTrigger value="original" disabled={!resume.original_pdf_url}><FileText className="w-4 h-4 mr-2" /> Original PDF</TabsTrigger>
                            </TabsList>

                            {/* Template Selector */}
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <Select value={currentTemplate} onValueChange={setCurrentTemplate}>
                                    <SelectTrigger className="w-[180px] h-9">
                                        <SelectValue placeholder="Select Template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="classic">Global Standard</SelectItem>
                                        <SelectItem value="modern">Modern Clean</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <TabsContent value="preview" className="flex-1 flex justify-center overflow-hidden data-[state=inactive]:hidden">
                            <div className="w-full max-w-[210mm] shadow-2xl h-full overflow-y-auto">
                                <ResumePreview content={resume.content} template={currentTemplate} />
                            </div>
                        </TabsContent>

                        <TabsContent value="original" className="flex-1 h-full data-[state=inactive]:hidden">
                            {resume.original_pdf_url ? (
                                <iframe
                                    src={resume.original_pdf_url}
                                    className="w-full h-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-zinc-500">
                                    No original PDF found
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
