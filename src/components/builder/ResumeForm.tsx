'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Calendar as CalendarIcon, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, KeyboardEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

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
    "Native",
    "Fluent",
    "Advanced (C1-C2)",
    "Intermediate (B1-B2)",
    "Beginner (A1-A2)"
]

// Level Selector Component
const LevelSelector = ({ value, onChange }: { value?: string, onChange: (val: string) => void }) => {
    // Smart mapping for incoming values
    const mapLevel = (val?: string) => {
        if (!val) return undefined;
        const v = val.toLowerCase();
        if (v.includes('native') || v.includes('mother') || v.includes('ana')) return "Native";
        if (v.includes('fluent') || v.includes('akıcı')) return "Fluent";
        if (v.includes('advanced') || v.includes('ileri') || v.includes('c1') || v.includes('c2')) return "Advanced (C1-C2)";
        if (v.includes('intermediate') || v.includes('orta') || v.includes('b1') || v.includes('b2')) return "Intermediate (B1-B2)";
        if (v.includes('beginner') || v.includes('başlangıç') || v.includes('a1') || v.includes('a2')) return "Beginner (A1-A2)";
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
}

export function ResumeForm({ initialContent, onUpdate }: ResumeFormProps) {
    const [content, setContent] = useState<ResumeContent>(initialContent)

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
        // For experience, usually a single date implies start date, but user requested consistent logic. 
        // However, for jobs, usually single date = Start Date (Started 2023...). 
        // But the user prompt says "sadece tek tarih var ise o egitimin veya isin bitis tarihidir". So applying to both.
        if (newContent.experience) fixSectionDates(newContent.experience)

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
            newContent.contact = { ...newContent.contact, [field]: value }
        } else if (section === 'targetJob') {
            newContent.targetJob = { ...newContent.targetJob, [field]: value }
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
            <Tabs defaultValue="contact" className="w-full h-full flex flex-col">

                {/* Horizontal Scrollable Tabs */}
                <div className="w-full overflow-x-auto pb-2 mb-4 scrollbar-hide">
                    <TabsList className="inline-flex w-auto h-auto p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="contact">Contact</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="summary">Summary</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="experience">Experience</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="education">Education</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="skills">Skills</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="certifications">Certs</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="projects">Projects</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="languages">Languages</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm transition-all" value="job">Target Job</TabsTrigger>
                    </TabsList>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-4">

                    {/* Contact Tab */}
                    <TabsContent value="contact" className="space-y-4 mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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

                    {/* Experience Tab */}
                    <TabsContent value="experience" className="mt-0 space-y-4">
                        {content.experience?.map((exp, index) => (
                            <AccordionItem
                                key={`${exp.id}-${index}`}
                                title={exp.title || "Job Position"}
                                subtitle={exp.company}
                                onDelete={() => removeItem('experience', index)}
                                defaultOpen={index === 0} // Open first item by default
                            >
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <Label>Job Title</Label>
                                        <Input
                                            value={exp.title || ''}
                                            onChange={(e) => handleChange('experience', 'title', e.target.value, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Company</Label>
                                        <Input
                                            value={exp.company || ''}
                                            onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <DateSelector
                                            value={exp.startDate}
                                            onChange={(val) => handleChange('experience', 'startDate', val, index)}
                                            placeholder="Start Date"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Date</Label>
                                        <DateSelector
                                            value={exp.endDate}
                                            onChange={(val) => handleChange('experience', 'endDate', val, index)}
                                            placeholder="End Date"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <Label>Description (Bullet Points)</Label>
                                    <Textarea
                                        value={exp.description || ''}
                                        onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                                        className="min-h-[100px]"
                                    />
                                </div>
                            </AccordionItem>
                        ))}
                        <Button onClick={addExperience} variant="outline" className="w-full border-dashed">
                            <Plus className="w-4 h-4 mr-2" /> Add Experience
                        </Button>
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
                                        <Label>End Date (or Graduation)</Label>
                                        <DateSelector
                                            value={edu.endDate}
                                            onChange={(val) => handleChange('education', 'endDate', val, index)}
                                            placeholder="Graduation Year"
                                        />
                                    </div>
                                </div>
                            </AccordionItem>
                        ))}
                        <Button onClick={addEducation} variant="outline" className="w-full border-dashed">
                            <Plus className="w-4 h-4 mr-2" /> Add Education
                        </Button>
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

                    {/* Target Job Tab */}
                    <TabsContent value="job" className="mt-0 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Target Job Description</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Job URL (LinkedIn/Indeed)</Label>
                                    <Input
                                        placeholder="https://..."
                                        value={content.targetJob?.url || ''}
                                        onChange={(e) => handleChange('targetJob', 'url', e.target.value)}
                                    />
                                    <p className="text-xs text-zinc-500">Paste a link to auto-fill (Coming soon) or paste text below.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Job Description Text</Label>
                                    <Textarea
                                        className="min-h-[300px]"
                                        placeholder="Paste the full job description here..."
                                        value={content.targetJob?.description || ''}
                                        onChange={(e) => handleChange('targetJob', 'description', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    )
}
