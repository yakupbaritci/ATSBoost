'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Calendar as CalendarIcon, X, ChevronDown, ChevronUp, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useEffect, KeyboardEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { MoreVertical, FileText as FileIcon, Copy, Eye, Download as DownloadIcon, Settings as SettingsIcon, Check, Sparkles, Lightbulb, Lock, AlertCircle } from 'lucide-react'

// Accordion Card Component for managing expandable sections
const AccordionItem = ({
    title,
    subtitle,
    children,
    onDelete,
    defaultOpen = false
}: {
    title: string,
    subtitle?: string,
    children: React.ReactNode,
    onDelete: () => void,
    defaultOpen?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <Card>
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{title || "New Item"}</span>
                    {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
            </CardHeader>
            {isOpen && (
                <CardContent className="pt-0 p-4 border-t">
                    {children}
                </CardContent>
            )}
        </Card>
    )
}

// Helper for date generation
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => (currentYear + 5 - i).toString())

// Helper for date parsing and matching
const parseDate = (val?: string) => {
    if (!val) return { month: undefined, year: undefined }

    // Handle "Present" case insensitive
    if (val.toLowerCase().includes('present')) return { month: undefined, year: 'Present' }

    // Clean and split string
    const parts = val.trim().split(/[\s/.,-]+/) // Split by space, slash, dot, comma, hyphen

    let monthFound: string | undefined = undefined
    let yearFound: string | undefined = undefined

    // Iterate parts to find month and year
    for (const part of parts) {
        // Check for year (4 digits)
        if (/^\d{4}$/.test(part)) {
            yearFound = part
            continue
        }

        // Check for month names (Jan, January, etc.) or Numbers (01, 1, 10)
        const lowerPart = part.toLowerCase()

        // Match numeric months 1-12
        if (/^\d{1,2}$/.test(part)) {
            const m = parseInt(part)
            if (m >= 1 && m <= 12) {
                monthFound = months[m - 1] // Convert 1 -> January
                continue
            }
        }

        // Match string months
        const matchedMonth = months.find(m =>
            m.toLowerCase() === lowerPart ||
            m.toLowerCase().startsWith(lowerPart.substring(0, 3)) // Check first 3 letters matching
        )
        if (matchedMonth) {
            monthFound = matchedMonth
        }
    }

    // Fallback logic if splitting by space failed or simple format
    if (!yearFound && !monthFound && val.includes(' ')) {
        const [m, y] = val.split(' ')
        if (years.includes(y)) yearFound = y
        if (months.includes(m)) monthFound = m
    }

    return { month: monthFound, year: yearFound }
}

// Date Selector Component
const DateSelector = ({ value, onChange, placeholder }: { value?: string, onChange: (val: string) => void, placeholder: string }) => {
    // Parse existing value using the smart parser
    const { month, year } = parseDate(value)

    // Validate parsed year against our list to ensure it shows up in UI
    const selectedYear = (year && (years.includes(year) || year === 'Present')) ? year : undefined
    const selectedMonth = month && months.includes(month) ? month : undefined

    // If year is not in our recent list (e.g. very old), we might want to still show it or add it,
    // but for now let's stick to the generated list or 'Present'. 
    // If the parser found a year but it's not in the list, we can temporarily add it to options or just let it be blank.
    // Let's trust the years list covers most. If not, the user can re-select.

    const handleUpdate = (m?: string, y?: string) => {
        if (m && y) onChange(`${m} ${y}`)
        else if (y) onChange(y)
        else onChange('')
    }

    return (
        <div className="flex gap-2">
            <Select value={selectedMonth} onValueChange={(v: string) => handleUpdate(v, selectedYear)}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value=" ">None</SelectItem>
                    {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={(v: string) => handleUpdate(selectedMonth, v)}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    )
}

// Language Levels
const languageLevels = [
    "Elementary Proficiency",
    "Limited Working Proficiency",
    "Professional Working Proficiency",
    "Full Professional Proficiency",
    "Native or Bilingual Proficiency"
]

// Level Selector Component
const LevelSelector = ({ value, onChange }: { value?: string, onChange: (val: string) => void }) => {
    // Smart mapping for incoming values
    const mapLevel = (val?: string) => {
        if (!val) return undefined;
        const v = val.toLowerCase();

        // Native / Bilingual
        if (v.includes('native') || v.includes('mother') || v.includes('ana') || v.includes('bilingual')) return "Native or Bilingual Proficiency";

        // Full Professional / Advanced / C1-C2
        if (v.includes('full') || v.includes('advanced') || v.includes('ileri') || v.includes('c1') || v.includes('c2') || v.includes('fluent')) return "Full Professional Proficiency";

        // Professional Working / B2
        if (v.includes('professional') || v.includes('business') || v.includes('b2')) return "Professional Working Proficiency";

        // Limited Working / Intermediate / B1
        if (v.includes('limited') || v.includes('intermediate') || v.includes('orta') || v.includes('b1')) return "Limited Working Proficiency";

        // Elementary / Beginner / A1-A2
        if (v.includes('elementary') || v.includes('beginner') || v.includes('temel') || v.includes('a1') || v.includes('a2')) return "Elementary Proficiency";

        return undefined; // If no match, we might show a custom input or just let them pick
    }

    const selectedLevel = languageLevels.includes(value || '') ? value : mapLevel(value);

    return (
        <Select value={selectedLevel} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
                {languageLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}

// Define types for our Resume Content
// (In a real app, these would be shared Zod schemas)
type ResumeContent = {
    contact: {
        fullName?: string
        email?: string
        phone?: string
        location?: string
        linkedin?: string
        portfolio?: string
    }
    documentLanguage?: string // New field for resume language
    summary?: string
    experience: Array<{
        id: string
        title: string
        company: string
        location?: string
        startDate?: string
        endDate?: string
        description?: string
    }>
    education: Array<{
        id: string
        school: string
        degree: string
        location?: string
        startDate?: string
        endDate?: string
        description?: string
    }>
    skills: Array<string>
    certifications?: Array<{
        title: string
        issuer?: string
        date?: string
    }>
    projects?: Array<{
        title: string
        description?: string
        link?: string
    }>
    languages?: Array<{
        language: string
        proficiency?: string
    }>
    targetJob?: {
        title?: string
        company?: string
        description?: string
        url?: string
    }
}

interface ResumeFormProps {
    initialContent: ResumeContent
    onUpdate: (content: ResumeContent) => void
    isWizardMode?: boolean
    // New props for the "Finish Up" section
    onCheckScore?: () => void
    atsScore?: any
    onDownload?: () => React.ReactNode // Returns the download button/link
    isOptimizing?: boolean
    onAutoOptimize?: () => void
    currentTemplate?: string
    onTemplateChange?: (template: string) => void
    previewComponent?: React.ReactNode // Pass the live preview component to render in the finish tab
    title?: string
}

export function ResumeForm({
    initialContent,
    onUpdate,
    isWizardMode = false,
    onCheckScore,
    atsScore,
    onDownload,
    isOptimizing,
    onAutoOptimize,
    currentTemplate,
    onTemplateChange,
    previewComponent,
    title = "Untitled Resume"
}: ResumeFormProps) {
    const [content, setContent] = useState<ResumeContent>(initialContent)
    const [activeTab, setActiveTab] = useState("contact")
    const [activeExperienceIndex, setActiveExperienceIndex] = useState(0)
    const [activeEducationIndex, setActiveEducationIndex] = useState(0) // New state for Education

    // Wizard Steps Configuration - Refined Order
    const steps = [
        { id: "contact", title: "CONTACT", description: "Basics" },
        { id: "experience", title: "EXPERIENCE", description: "Work History" },
        { id: "projects", title: "PROJECT", description: "Portfolios" },
        { id: "education", title: "EDUCATION", description: "Academics" },
        { id: "certifications", title: "CERTIFICATIONS", description: "Credentials" },
        { id: "skills", title: "SKILLS", description: "Competencies" },
        { id: "summary", title: "SUMMARY", description: "About You" },
        { id: "languages", title: "LANGUAGES", description: "Languages" },
        { id: "finish", title: "FINISH UP", description: "Review & Download" }
    ]

    // Split steps for the adaptive UI
    const visibleStepIds = ["contact", "experience", "projects", "education", "certifications", "skills", "summary"]
    const moreStepIds = ["languages"] // Add other less frequent sections here

    // We filter steps based on these lists for rendering
    const visibleSteps = steps.filter(s => visibleStepIds.includes(s.id))
    const moreSteps = steps.filter(s => moreStepIds.includes(s.id))
    const finishStep = steps.find(s => s.id === "finish")

    const currentStepIndex = steps.findIndex(s => s.id === activeTab)

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setActiveTab(steps[currentStepIndex + 1].id)
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setActiveTab(steps[currentStepIndex - 1].id)
        }
    }

    // Fix dates on mount: If only startDate exists and looks like a single date, move it to endDate (Graduation/End date logic)
    useEffect(() => {
        let hasChanges = false
        const newContent = { ...content }

        const fixSectionDates = (items: any[]) => {
            if (!items) return;
            items.forEach(item => {
                if (item.startDate && !item.endDate) {
                    // Check if startDate is just a year "2023" or Month Year "May 2023" without a hyphen
                    if (!item.startDate.includes('-') && !item.startDate.toLowerCase().includes('present')) {
                        item.endDate = item.startDate
                        item.startDate = ''
                        hasChanges = true
                    }
                }
            })
        }

        if (newContent.education) fixSectionDates(newContent.education)
        if (newContent.experience) fixSectionDates(newContent.experience)

        // Fix huge skill blobs (e.g. "Infrastructure: Linux, AWS, Docker...")
        // Only trigger if we find skills containing commas or colons and having a certain length
        if (newContent.skills && newContent.skills.length > 0) {
            let needsSkillSplit = false
            const polishedSkills: string[] = []

            newContent.skills.forEach(skill => {
                // If skill contains comma or colon and is a bit long, try to split
                if ((skill.includes(',') || skill.includes(':'))) {
                    needsSkillSplit = true
                    // Split logic:
                    // 1. If it has ':', we can either keep the prefix or dump it. Usually users want the tools.
                    //    "Backend: Node, Express" -> "Node", "Express" (Maybe keep Backend as a separate tag? Let's just split everything by delimiters)
                    const parts = skill.split(/[:;,]+/) // Split by colon, semicolon, comma
                    parts.forEach(p => {
                        const trimmed = p.trim()
                        if (trimmed && trimmed.length > 1) { // Filter out tiny noise
                            polishedSkills.push(trimmed)
                        }
                    })
                } else {
                    polishedSkills.push(skill)
                }
            })

            if (needsSkillSplit) {
                newContent.skills = polishedSkills
                hasChanges = true
            }
        }

        if (hasChanges) {
            setContent(newContent)
            // We don't call onUpdate here to avoid infinite loops or unnecessary saves on first render
        }
    }, [])

    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const validateField = (section: string, field: string, value: any) => {
        let newErrors = { ...errors }
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (value && !emailRegex.test(value)) {
                newErrors[`${section}.${field}`] = 'Invalid email address'
            } else {
                delete newErrors[`${section}.${field}`]
            }
        }
        setErrors(newErrors)
    }

    const handleChange = (section: keyof ResumeContent, field: string, value: any, index?: number) => {
        const newContent = { ...content }

        // Validation Check
        validateField(section, field, value)

        if (section === 'contact') {
            // Special case for documentLanguage which is root level but UI is in contact tab
            if (field === 'documentLanguage') {
                newContent.documentLanguage = value
            } else {
                newContent.contact = { ...newContent.contact, [field]: value }
            }

        } else if (section === 'summary') {
            newContent.summary = value
        } else if (section === 'experience' && typeof index === 'number') {
            newContent.experience[index] = { ...newContent.experience[index], [field]: value }
        } else if (section === 'education' && typeof index === 'number') {
            newContent.education[index] = { ...newContent.education[index], [field]: value }
        } else if (section === 'skills' && typeof index === 'number') {
            // For skills array edits
            const newSkills = [...(newContent.skills || [])]
            newSkills[index] = value
            newContent.skills = newSkills
        } else if ((section === 'certifications' || section === 'projects' || section === 'languages') && typeof index === 'number') {
            // Generic handler for array of objects (Certifications, Projects, Languages)
            // @ts-ignore
            newContent[section] = [...(newContent[section] || [])]
            // @ts-ignore
            newContent[section][index] = { ...newContent[section][index], [field]: value }
        }

        setContent(newContent)
        onUpdate(newContent)
    }

    const addExperience = () => {
        const newExp = { id: crypto.randomUUID(), title: '', company: '' }
        const newContent = { ...content, experience: [...(content.experience || []), newExp] }
        setContent(newContent)
        onUpdate(newContent)
    }

    const addEducation = () => {
        const newEdu = { id: crypto.randomUUID(), school: '', degree: '' }
        const newContent = { ...content, education: [...(content.education || []), newEdu] }
        setContent(newContent)
        onUpdate(newContent)
    }

    const addSkill = (newSkill: string) => {
        if (!newSkill.trim() || content.skills.includes(newSkill.trim())) return
        const newContent = { ...content, skills: [...(content.skills || []), newSkill.trim()] }
        setContent(newContent)
        onUpdate(newContent)
    }

    const removeSkill = (index: number) => {
        const newSkills = [...(content.skills || [])]
        newSkills.splice(index, 1)
        const newContent = { ...content, skills: newSkills }
        setContent(newContent)
        onUpdate(newContent)
    }

    const addItem = (section: 'certifications' | 'projects' | 'languages') => {
        const newContent = { ...content }
        if (section === 'certifications') newContent.certifications = [...(content.certifications || []), { title: '', issuer: '' }]
        if (section === 'projects') newContent.projects = [...(content.projects || []), { title: '', description: '' }]
        if (section === 'languages') newContent.languages = [...(content.languages || []), { language: '', proficiency: '' }]
        setContent(newContent)
        onUpdate(newContent)
    }

    const removeItem = (section: 'experience' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages', index: number) => {
        const newContent = { ...content }
        if (section === 'skills') {
            newContent.skills = newContent.skills?.filter((_, i) => i !== index)
        } else if (section === 'experience') {
            newContent.experience = newContent.experience?.filter((_, i) => i !== index)
        } else if (section === 'education') {
            newContent.education = newContent.education?.filter((_, i) => i !== index)
        } else {
            // @ts-ignore
            newContent[section] = newContent[section]?.filter((_, i) => i !== index)
        }
        setContent(newContent)
        onUpdate(newContent)
    }



    return (
        <div className="h-full flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">

                {/* Wizard Progress or Standard Tabs */}
                {isWizardMode ? (
                    <div className="mb-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{steps[currentStepIndex].title}</h2>
                                <p className="text-muted-foreground">{steps[currentStepIndex].description}</p>
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">
                                Step {currentStepIndex + 1} of {steps.length}
                            </div>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    // New Top Navigation Bar with Rezi-style Dropdown
                    <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10 flex items-center px-4 h-14">

                        {/* Left: Document Menu */}
                        <div className="mr-6 shrink-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 px-2 gap-2 text-zinc-700 dark:text-zinc-200 font-semibold text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                        {title}
                                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56">
                                    <DropdownMenuItem onClick={() => setActiveTab('contact')}>
                                        <SettingsIcon className="w-4 h-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setActiveTab('finish')}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Review
                                    </DropdownMenuItem>

                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <DownloadIcon className="w-4 h-4 mr-2" />
                                            Download
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            {onDownload ? (
                                                <div className="p-1" onClick={(e) => e.stopPropagation()}>
                                                    {/* We wrap the download button to prevent menu close logic from interfering if needed, though react-pdf usually works fine */}
                                                    {onDownload()}
                                                </div>
                                            ) : (
                                                <DropdownMenuItem disabled>PDF not available</DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem disabled>
                                                <FileIcon className="w-4 h-4 mr-2" />
                                                Download .DOCX
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Center: Adaptive Tabs */}
                        <div className="flex-1 flex items-center">
                            <TabsList className="inline-flex w-auto h-12 p-0 bg-transparent gap-1">
                                {visibleSteps.map(step => (
                                    <TabsTrigger
                                        key={step.id}
                                        className="h-full px-3 rounded-md data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 font-bold text-[11px] lg:text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-b-none"
                                        value={step.id}
                                    >
                                        {step.title}
                                    </TabsTrigger>
                                ))}

                            </TabsList>

                            {/* More Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className={cn("h-12 px-2 rounded-md hover:bg-zinc-100 data-[state=open]:bg-zinc-100 mt-[1px]", moreStepIds.includes(activeTab) && "text-blue-600 bg-zinc-50")}>
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {moreSteps.map(step => (
                                        <DropdownMenuItem key={step.id} onClick={() => setActiveTab(step.id)} className="flex justify-between">
                                            {step.title}
                                            {activeTab === step.id && <Check className="w-4 h-4 ml-2 text-blue-600" />}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 ml-auto">
                            {finishStep && (
                                <Button
                                    variant="ghost"
                                    onClick={() => setActiveTab(finishStep.id)}
                                    className={cn(
                                        "h-9 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all",
                                        activeTab === finishStep.id
                                            ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                    )}
                                >
                                    {finishStep.title} ✨
                                </Button>
                            )}
                            <Button variant="outline" size="sm" className="h-9 hidden xl:flex text-xs font-bold uppercase tracking-wider" disabled>
                                AI Cover Letter
                            </Button>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-[#f8f9fc] dark:bg-black/20 p-4 md:p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* We wrap content in a centered container for better focus */}

                        {/* Contact Tab */}
                        <TabsContent value="contact" className="space-y-4 mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Document Language Selector */}
                                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label htmlFor="doc-lang" className="text-base font-semibold">Resume Language</Label>
                                            <p className="text-xs text-muted-foreground">Select the primary language for this resume.</p>
                                        </div>
                                        <Select
                                            value={content.documentLanguage || 'en'}
                                            onValueChange={(val) => handleChange('contact', 'documentLanguage', val)} // Handles update via special check or new section handler
                                        >
                                            <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-900" id="doc-lang">
                                                <SelectValue placeholder="Language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">🇺🇸 English</SelectItem>
                                                <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                                                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                                                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                                                <SelectItem value="es">🇪🇸 Español</SelectItem>
                                                <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input
                                                value={content.contact?.fullName || ''}
                                                onChange={(e) => handleChange('contact', 'fullName', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input
                                                type="email"
                                                value={content.contact?.email || ''}
                                                onChange={(e) => handleChange('contact', 'email', e.target.value)}
                                                className={errors['contact.email'] ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                            />
                                            {errors['contact.email'] && <p className="text-xs text-red-500">{errors['contact.email']}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input
                                                value={content.contact?.phone || ''}
                                                onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Location</Label>
                                            <Input
                                                value={content.contact?.location || ''}
                                                onChange={(e) => handleChange('contact', 'location', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>LinkedIn</Label>
                                            <Input
                                                value={content.contact?.linkedin || ''}
                                                onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Portfolio / Website</Label>
                                            <Input
                                                value={content.contact?.portfolio || ''}
                                                onChange={(e) => handleChange('contact', 'portfolio', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Summary Tab */}
                        <TabsContent value="summary" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Professional Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        className="min-h-[200px]"
                                        placeholder="Briefly describe your career highlights..."
                                        value={content.summary || ''}
                                        onChange={(e) => handleChange('summary', '', e.target.value)}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Experience Tab - Rezi Style Split Layout */}
                        <TabsContent value="experience" className="mt-0 h-[calc(100vh-140px)]">
                            <div className="flex h-full gap-6">
                                {/* Left Sidebar: List & Score */}
                                <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto pr-2 pb-20">
                                    {/* Score Card Mockup */}
                                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-100 dark:text-zinc-800" />
                                                <circle cx="24" cy="24" r="20" stroke="#f59e0b" strokeWidth="4" fill="transparent" strokeDasharray={125} strokeDashoffset={125 - (125 * 0.79)} className="text-amber-500" strokeLinecap="round" />
                                            </svg>
                                            <span className="absolute text-sm font-bold text-amber-600">79</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Your Resume Score</h4>
                                            <p className="text-xs text-amber-600 font-medium">Needs improvement</p>
                                        </div>
                                    </div>

                                    {/* List Header */}
                                    <div className="flex items-center justify-between px-1">
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                            <ChevronDown className="w-4 h-4" /> Your Experience
                                        </h3>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full" onClick={() => {
                                            addExperience()
                                            setActiveExperienceIndex((content.experience?.length || 0))
                                        }}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Experience List */}
                                    <div className="space-y-2">
                                        {content.experience?.map((exp, index) => (
                                            <div
                                                key={exp.id}
                                                onClick={() => setActiveExperienceIndex(index)}
                                                className={cn(
                                                    "group relative p-3 rounded-lg cursor-pointer border transition-all hover:shadow-md",
                                                    activeExperienceIndex === index
                                                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-100 dark:ring-blue-900"
                                                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                                                )}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className={cn("font-bold text-sm", activeExperienceIndex === index ? "text-blue-700 dark:text-blue-300" : "text-zinc-800 dark:text-zinc-200")}>
                                                            {exp.title || "Untitled Position"}
                                                        </h4>
                                                        <p className="text-xs text-zinc-500 truncate mt-0.5">
                                                            {exp.company || "No Company"} • {exp.startDate || "Date"}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 text-zinc-400 opacity-0 group-hover:opacity-100"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeItem('experience', index)
                                                            if (activeExperienceIndex === index && index > 0) setActiveExperienceIndex(index - 1)
                                                        }}
                                                    >
                                                        <MoreVertical className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Gamification / Analysis List Mockup */}
                                    {/* This mimics the Rezi sidebar analysis */}
                                    <div className="mt-4 space-y-3 px-2 opacity-80 pointer-events-none grayscale">
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <X className="w-3 h-3 text-red-500 rounded-full bg-red-100 p-0.5" /> Short Bullet Points
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <Lock className="w-3 h-3 text-zinc-400" /> Personal Pronoun <Badge variant="secondary" className="text-[9px] h-4 px-1 ml-auto">PRO</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <Lock className="w-3 h-3 text-zinc-400" /> Buzzwords <Badge variant="secondary" className="text-[9px] h-4 px-1 ml-auto">PRO</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <Lock className="w-3 h-3 text-zinc-400" /> Passive Voice <Badge variant="secondary" className="text-[9px] h-4 px-1 ml-auto">PRO</Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Main: Editor */}
                                <div className="flex-1 overflow-y-auto pb-20">
                                    {content.experience && content.experience[activeExperienceIndex] ? (
                                        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                                            <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                        {content.experience[activeExperienceIndex].title || "New Experience"}
                                                        <span className="text-zinc-400 font-normal ml-2 text-base">
                                                            {content.experience[activeExperienceIndex].company ? `at ${content.experience[activeExperienceIndex].company}` : ""}
                                                        </span>
                                                    </h3>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-6 pt-6">
                                                <div className="space-y-4">
                                                    {/* Role */}
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs uppercase font-bold text-zinc-500">What was your <span className="text-black dark:text-white">Role</span> at Company?</Label>
                                                        <Input
                                                            value={content.experience[activeExperienceIndex].title || ''}
                                                            onChange={(e) => handleChange('experience', 'title', e.target.value, activeExperienceIndex)}
                                                            className="h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                                                            placeholder="e.g. Senior Software Engineer"
                                                        />
                                                    </div>

                                                    {/* Company */}
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs uppercase font-bold text-zinc-500">For which <span className="text-black dark:text-white">Company</span> did you work?</Label>
                                                        <Input
                                                            value={content.experience[activeExperienceIndex].company || ''}
                                                            onChange={(e) => handleChange('experience', 'company', e.target.value, activeExperienceIndex)}
                                                            className="h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                                                            placeholder="e.g. Google"
                                                        />
                                                    </div>

                                                    {/* Date & Location */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-1.5">
                                                            <Label className="text-xs uppercase font-bold text-zinc-500">How long were you there?</Label>
                                                            <div className="flex gap-2 items-center">
                                                                <div className="flex-1">
                                                                    <DateSelector
                                                                        value={content.experience[activeExperienceIndex].startDate}
                                                                        onChange={(val) => handleChange('experience', 'startDate', val, activeExperienceIndex)}
                                                                        placeholder="Start Date"
                                                                    />
                                                                </div>
                                                                <span className="text-zinc-400">-</span>
                                                                <div className="flex-1">
                                                                    <DateSelector
                                                                        value={content.experience[activeExperienceIndex].endDate}
                                                                        onChange={(val) => handleChange('experience', 'endDate', val, activeExperienceIndex)}
                                                                        placeholder="End Date"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className="text-xs uppercase font-bold text-zinc-500">Where was located?</Label>
                                                            <Input
                                                                value={content.experience[activeExperienceIndex].location || ''}
                                                                onChange={(e) => handleChange('experience', 'location', e.target.value, activeExperienceIndex)}
                                                                className="h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                                                                placeholder="e.g. New York, NY"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="space-y-1.5 pt-2">
                                                        <Label className="text-xs uppercase font-bold text-zinc-500">What did you do?</Label>
                                                        <div className="relative">
                                                            <Textarea
                                                                value={content.experience[activeExperienceIndex].description || ''}
                                                                onChange={(e) => handleChange('experience', 'description', e.target.value, activeExperienceIndex)}
                                                                className="min-h-[250px] p-4 font-mono text-sm leading-relaxed bg-white dark:bg-zinc-950 resize-none rounded-lg border-zinc-200 dark:border-zinc-700 focus:ring-blue-500/20"
                                                                placeholder="• Lead a team of..."
                                                            />
                                                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                                                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                                                    <Sparkles className="w-3 h-3" /> 10
                                                                </div>
                                                                <Button size="sm" className="h-8 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 hover:from-blue-700 hover:to-indigo-700">
                                                                    <Sparkles className="w-3.5 h-3.5" /> Generate Bullet
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-2">
                                                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                                            Aim for a balanced mix of descriptive and key number bullet points.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                                    Save to Experience List
                                                </Button>
                                            </div>
                                        </Card>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-4">
                                            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                <FileIcon className="w-8 h-8 opacity-50" />
                                            </div>
                                            <p>Select an experience to edit or add a new one.</p>
                                            <Button onClick={() => {
                                                addExperience()
                                                setActiveExperienceIndex((content.experience?.length || 0))
                                            }}>
                                                <Plus className="w-4 h-4 mr-2" /> Add New Position
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Education Tab */}
                        <TabsContent value="education" className="mt-0 space-y-4">
                            {content.education?.map((edu, index) => (
                                <AccordionItem
                                    key={`${edu.id}-${index}`}
                                    title={edu.school || "School / University"}
                                    subtitle={edu.degree}
                                    onDelete={() => removeItem('education', index)}
                                    defaultOpen={index === 0}
                                >
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label>School / University</Label>
                                            <Input
                                                value={edu.school || ''}
                                                onChange={(e) => handleChange('education', 'school', e.target.value, index)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Degree / Major</Label>
                                            <Input
                                                value={edu.degree || ''}
                                                onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <DateSelector
                                                value={edu.startDate}
                                                onChange={(val) => handleChange('education', 'startDate', val, index)}
                                                placeholder="Start Date"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            {/* Education Tab - Split Layout */}
                                            <TabsContent value="education" className="mt-0 h-[calc(100vh-140px)]">
                                                <div className="flex h-full gap-6">
                                                    {/* Left Sidebar: List */}
                                                    <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto pr-2 pb-20">
                                                        <div className="flex items-center justify-between px-1">
                                                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                                                <ChevronDown className="w-4 h-4" /> Your Education
                                                            </h3>
                                                            <Button size="icon" variant="ghost" className="h-6 w-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full" onClick={() => {
                                                                addEducation()
                                                                setActiveEducationIndex((content.education?.length || 0))
                                                            }}>
                                                                <Plus className="w-4 h-4" />
                                                            </Button>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {content.education?.map((edu, index) => (
                                                                <div
                                                                    key={edu.id}
                                                                    onClick={() => setActiveEducationIndex(index)}
                                                                    className={cn(
                                                                        "group relative p-3 rounded-lg cursor-pointer border transition-all hover:shadow-md",
                                                                        activeEducationIndex === index
                                                                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-100 dark:ring-blue-900"
                                                                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                                                                    )}
                                                                >
                                                                    <div className="flex justify-between items-start">
                                                                        <div>
                                                                            <h4 className={cn("font-bold text-sm", activeEducationIndex === index ? "text-blue-700 dark:text-blue-300" : "text-zinc-800 dark:text-zinc-200")}>
                                                                                {edu.school || "University/School"}
                                                                            </h4>
                                                                            <p className="text-xs text-zinc-500 truncate mt-0.5">
                                                                                {edu.degree || "Degree"}
                                                                            </p>
                                                                        </div>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-6 w-6 text-zinc-400 opacity-0 group-hover:opacity-100"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                removeItem('education', index)
                                                                                if (activeEducationIndex === index && index > 0) setActiveEducationIndex(index - 1)
                                                                            }}
                                                                        >
                                                                            <MoreVertical className="w-3 h-3" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Right Main: Editor */}
                                                    <div className="flex-1 overflow-y-auto pb-20">
                                                        {content.education && content.education[activeEducationIndex] ? (
                                                            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                                                                <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
                                                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                                        {content.education[activeEducationIndex].school || "New Education"}
                                                                        <span className="text-zinc-400 font-normal ml-2 text-base">
                                                                            {content.education[activeEducationIndex].degree ? `• ${content.education[activeEducationIndex].degree}` : ""}
                                                                        </span>
                                                                    </h3>
                                                                </CardHeader>
                                                                <CardContent className="space-y-6 pt-6">
                                                                    <div className="space-y-4">
                                                                        {/* School */}
                                                                        <div className="space-y-1.5">
                                                                            <Label className="text-xs uppercase font-bold text-zinc-500">School / University</Label>
                                                                            <Input
                                                                                value={content.education[activeEducationIndex].school || ''}
                                                                                onChange={(e) => handleChange('education', 'school', e.target.value, activeEducationIndex)}
                                                                                className="h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                                                                                placeholder="e.g. Harvard University"
                                                                            />
                                                                        </div>

                                                                        {/* Degree */}
                                                                        <div className="space-y-1.5">
                                                                            <Label className="text-xs uppercase font-bold text-zinc-500">Degree / Major</Label>
                                                                            <Input
                                                                                value={content.education[activeEducationIndex].degree || ''}
                                                                                onChange={(e) => handleChange('education', 'degree', e.target.value, activeEducationIndex)}
                                                                                className="h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                                                                                placeholder="e.g. Bachelor of Science in Computer Science"
                                                                            />
                                                                        </div>

                                                                        {/* Dates */}
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                            <div className="space-y-1.5">
                                                                                <Label className="text-xs uppercase font-bold text-zinc-500">Start Date</Label>
                                                                                <DateSelector
                                                                                    value={content.education[activeEducationIndex].startDate}
                                                                                    onChange={(val) => handleChange('education', 'startDate', val, activeEducationIndex)}
                                                                                    placeholder="Start Date"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1.5">
                                                                                <Label className="text-xs uppercase font-bold text-zinc-500">End Date / Expected</Label>
                                                                                <DateSelector
                                                                                    value={content.education[activeEducationIndex].endDate}
                                                                                    onChange={(val) => handleChange('education', 'endDate', val, activeEducationIndex)}
                                                                                    placeholder="Graduation Date"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-1.5">
                                                                            <Label className="text-xs uppercase font-bold text-zinc-500">Location</Label>
                                                                            <Input
                                                                                value={content.education[activeEducationIndex].location || ''}
                                                                                onChange={(e) => handleChange('education', 'location', e.target.value, activeEducationIndex)}
                                                                                className="h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                                                                                placeholder="e.g. Cambridge, MA"
                                                                            />
                                                                        </div>

                                                                        {/* Description (Optional for Education but good to have) */}
                                                                        <div className="space-y-1.5 pt-2">
                                                                            <Label className="text-xs uppercase font-bold text-zinc-500">Description / Achievements (Optional)</Label>
                                                                            <Textarea
                                                                                value={content.education[activeEducationIndex].description || ''}
                                                                                onChange={(e) => handleChange('education', 'description', e.target.value, activeEducationIndex)}
                                                                                className="min-h-[150px] p-4 bg-white dark:bg-zinc-950 resize-none rounded-lg border-zinc-200 dark:border-zinc-700 focus:ring-blue-500/20"
                                                                                placeholder="• GPA: 3.8/4.0&#10;• Relevant Coursework: Data Structures, Algorithms..."
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                                                        Save to Education List
                                                                    </Button>
                                                                </div>
                                                            </Card>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-4">
                                                                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                                    <FileIcon className="w-8 h-8 opacity-50" />
                                                                </div>
                                                                <p>Select an education to edit or add a new one.</p>
                                                                <Button onClick={() => {
                                                                    addEducation()
                                                                    setActiveEducationIndex((content.education?.length || 0))
                                                                }}>
                                                                    <Plus className="w-4 h-4 mr-2" /> Add Education
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TabsContent>

                                            {/* Skills Tab */}
                                            <TabsContent value="skills" className="mt-0 space-y-4">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Skills & Technologies</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-3">
                                                        <div className="space-y-2">
                                                            <Label>Add Skills (Type and press Enter or Comma)</Label>
                                                            <Input
                                                                placeholder="e.g. React, Node.js, Typescript..."
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter' || e.key === ',') {
                                                                        e.preventDefault()
                                                                        const val = e.currentTarget.value
                                                                        if (val) {
                                                                            addSkill(val)
                                                                            e.currentTarget.value = ''
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 mt-4">
                                                            {content.skills?.map((skill, index) => (
                                                                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1 text-sm flex items-center gap-1">
                                                                    {skill}
                                                                    <button
                                                                        onClick={() => removeSkill(index)}
                                                                        className="hover:bg-red-200 dark:hover:bg-red-900 rounded-full p-0.5 transition-colors text-red-500"
                                                                    >
                                                                        <X className="w-3 h-3" />
                                                                    </button>
                                                                </Badge>
                                                            ))}
                                                            {(!content.skills || content.skills.length === 0) && (
                                                                <p className="text-sm text-muted-foreground italic">No skills added yet.</p>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>

                                            {/* Certifications Tab */}
                                            <TabsContent value="certifications" className="mt-0 space-y-4">
                                                {content.certifications?.map((cert, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        title={cert.title || "Certification"}
                                                        subtitle={cert.issuer}
                                                        onDelete={() => removeItem('certifications', index)}
                                                        defaultOpen={index === 0}
                                                    >
                                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                                            <div className="space-y-2"><Label>Title</Label><Input value={cert.title} onChange={(e) => handleChange('certifications', 'title', e.target.value, index)} /></div>
                                                            <div className="space-y-2"><Label>Issuer</Label><Input value={cert.issuer} onChange={(e) => handleChange('certifications', 'issuer', e.target.value, index)} /></div>
                                                            <div className="space-y-2"><Label>Date</Label><Input value={cert.date} onChange={(e) => handleChange('certifications', 'date', e.target.value, index)} /></div>
                                                        </div>
                                                    </AccordionItem>
                                                ))}
                                                <Button onClick={() => addItem('certifications')} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Certification</Button>
                                            </TabsContent>

                                            {/* Projects Tab */}
                                            <TabsContent value="projects" className="mt-0 space-y-4">
                                                {content.projects?.map((proj, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        title={proj.title || "Project"}
                                                        onDelete={() => removeItem('projects', index)}
                                                        defaultOpen={index === 0}
                                                    >
                                                        <div className="space-y-2 mt-4"><Label>Project Title</Label><Input value={proj.title} onChange={(e) => handleChange('projects', 'title', e.target.value, index)} /></div>
                                                        <div className="space-y-2"><Label>Link</Label><Input value={proj.link} onChange={(e) => handleChange('projects', 'link', e.target.value, index)} /></div>
                                                        <div className="space-y-2"><Label>Description</Label><Textarea value={proj.description} onChange={(e) => handleChange('projects', 'description', e.target.value, index)} /></div>
                                                    </AccordionItem>
                                                ))}
                                                <Button onClick={() => addItem('projects')} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
                                            </TabsContent>

                                            {/* Languages Tab */}
                                            <TabsContent value="languages" className="mt-0 space-y-4">
                                                {content.languages?.map((lang, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        title={lang.language || "Language"}
                                                        subtitle={lang.proficiency}
                                                        onDelete={() => removeItem('languages', index)}
                                                        defaultOpen={index === 0}
                                                    >
                                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                                            <div className="space-y-2"><Label>Language</Label><Input value={lang.language} onChange={(e) => handleChange('languages', 'language', e.target.value, index)} /></div>
                                                            <div className="space-y-2"><Label>Proficiency</Label>
                                                                <LevelSelector
                                                                    value={lang.proficiency}
                                                                    onChange={(val) => handleChange('languages', 'proficiency', val, index)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </AccordionItem>
                                                ))}
                                                <Button onClick={() => addItem('languages')} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Language</Button>
                                            </TabsContent>

                                            {/* Finish Up Tab */}
                                            <TabsContent value="finish" className="mt-0 space-y-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                    {/* Left Col: Actions */}
                                                    <div className="lg:col-span-1 space-y-6">
                                                        <Card>
                                                            <CardHeader>
                                                                <CardTitle>Final Review</CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="space-y-4">
                                                                <div className="space-y-4">
                                                                    <Label>Resume Template</Label>
                                                                    <Select value={currentTemplate} onValueChange={onTemplateChange}>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select Template" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="classic">Global Standard</SelectItem>
                                                                            <SelectItem value="modern">Modern Professional</SelectItem>
                                                                            <SelectItem value="bold">Bold Executive</SelectItem>
                                                                            <SelectItem value="minimalist">Minimalist Mono</SelectItem>
                                                                            <SelectItem value="tech">Tech / Developer</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                                                                    <Button
                                                                        className="w-full justify-between"
                                                                        variant="outline"
                                                                        onClick={onCheckScore}
                                                                    >
                                                                        <span>Check ATS Score</span>
                                                                        {/* Show dynamic score badge if available */}
                                                                        {atsScore?.score !== undefined ? (
                                                                            <Badge variant={atsScore.score >= 80 ? 'default' : atsScore.score >= 60 ? 'secondary' : 'destructive'}>
                                                                                {atsScore.score} / 100
                                                                            </Badge>
                                                                        ) : (
                                                                            <Badge variant="outline">Not Checked</Badge>
                                                                        )}
                                                                    </Button>

                                                                    <Button
                                                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
                                                                        onClick={onAutoOptimize}
                                                                        disabled={isOptimizing}
                                                                    >
                                                                        {isOptimizing ? 'Optimizing...' : '✨ AI Auto-Optimize'}
                                                                    </Button>
                                                                </div>

                                                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                                                    {onDownload && onDownload()}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>

                                                    {/* Right Col: Preview */}
                                                    <div className="lg:col-span-2 min-h-[600px] bg-white dark:bg-zinc-900 shadow-sm rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
                                                        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex justify-between items-center">
                                                            <span className="font-semibold text-sm">Resume Preview</span>
                                                        </div>
                                                        <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/50 p-6 overflow-y-auto">
                                                            <div className="mx-auto shadow-2xl origin-top transform scale-95" style={{ width: '210mm' }}>
                                                                {/* Render the preview component passed from parent */}
                                                                {previewComponent}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                        </div> {/* End Centered Container */}
                                    </div>
                                    {/* Wizard Nav Buttons (Only in Wizard Mode) */}
                                    {isWizardMode && (
                                        <div className="flex items-center justify-between mt-0 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky bottom-0 z-10 shrink-0">
                                            <Button
                                                variant="outline"
                                                onClick={handleBack}
                                                disabled={currentStepIndex === 0}
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                            </Button>

                                            <Button
                                                onClick={handleNext}
                                                disabled={currentStepIndex === steps.length - 1} // Hide next on last step, user interacts with finish tab content
                                                className={cn(currentStepIndex === steps.length - 1 && "invisible")}
                                            >
                                                Next <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    )}
                                </Tabs>
        </div>
                    )
}
