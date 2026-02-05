'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

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

    const handleChange = (section: keyof ResumeContent, field: string, value: any, index?: number) => {
        const newContent = { ...content }

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

    const addSkill = () => {
        const newContent = { ...content, skills: [...(content.skills || []), ''] }
        setContent(newContent)
        onUpdate(newContent)
    }

    const removeItem = (section: 'experience' | 'education' | 'skills', index: number) => {
        const newContent = { ...content }
        if (section === 'skills') {
            newContent.skills = newContent.skills?.filter((_, i) => i !== index)
        } else {
            newContent[section] = newContent[section]?.filter((_, i) => i !== index)
        }
        setContent(newContent)
        onUpdate(newContent)
    }

    return (
        <div className="h-full flex flex-col">
            <Tabs defaultValue="contact" className="w-full h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-6 mb-4">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="experience">Exp</TabsTrigger>
                    <TabsTrigger value="education">Edu</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="job">Target Job</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">

                    {/* Contact Tab */}
                    <TabsContent value="contact" className="space-y-4 mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
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
                                            value={content.contact?.email || ''}
                                            onChange={(e) => handleChange('contact', 'email', e.target.value)}
                                        />
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
                            <Card key={`${exp.id}-${index}`}>
                                <CardContent className="pt-6 space-y-4 relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                                        onClick={() => removeItem('experience', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <div className="grid grid-cols-2 gap-4">
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
                                            <Input
                                                value={exp.startDate || ''}
                                                onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)}
                                                placeholder="MM/YYYY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input
                                                value={exp.endDate || ''}
                                                onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)}
                                                placeholder="Present or MM/YYYY"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description (Bullet Points)</Label>
                                        <Textarea
                                            value={exp.description || ''}
                                            onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={addExperience} variant="outline" className="w-full border-dashed">
                            <Plus className="w-4 h-4 mr-2" /> Add Experience
                        </Button>
                    </TabsContent>

                    {/* Education Tab */}
                    <TabsContent value="education" className="mt-0 space-y-4">
                        {content.education?.map((edu, index) => (
                            <Card key={`${edu.id}-${index}`}>
                                <CardContent className="pt-6 space-y-4 relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                                        onClick={() => removeItem('education', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <div className="grid grid-cols-2 gap-4">
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
                                            <Input
                                                value={edu.startDate || ''}
                                                onChange={(e) => handleChange('education', 'startDate', e.target.value, index)}
                                                placeholder="MM/YYYY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input
                                                value={edu.endDate || ''}
                                                onChange={(e) => handleChange('education', 'endDate', e.target.value, index)}
                                                placeholder="YYYY"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
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
                                {content.skills?.map((skill, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={skill}
                                            onChange={(e) => handleChange('skills', '', e.target.value, index)}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:bg-red-50"
                                            onClick={() => removeItem('skills', index)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button onClick={addSkill} variant="outline" className="w-full border-dashed">
                                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                                </Button>
                            </CardContent>
                        </Card>
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
