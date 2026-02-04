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
        } else if (section === 'summary') {
            newContent.summary = value
        } else if (section === 'experience' && typeof index === 'number') {
            newContent.experience[index] = { ...newContent.experience[index], [field]: value }
        } else if (section === 'education' && typeof index === 'number') {
            newContent.education[index] = { ...newContent.education[index], [field]: value }
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

    const removeItem = (section: 'experience' | 'education', index: number) => {
        const newContent = { ...content }
        newContent[section] = newContent[section]?.filter((_, i) => i !== index)
        setContent(newContent)
        onUpdate(newContent)
    }

    return (
        <div className="h-full flex flex-col">
            <Tabs defaultValue="contact" className="w-full h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="experience">Exp</TabsTrigger>
                    <TabsTrigger value="education">Edu</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
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
                            <Card key={exp.id || index}>
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

                    {/* TODO: Education & Skills implementation similarly */}
                    <TabsContent value="education" className="mt-0">
                        <div className="text-center text-zinc-500 py-8">Education fields coming soon...</div>
                    </TabsContent>
                    <TabsContent value="skills" className="mt-0">
                        <div className="text-center text-zinc-500 py-8">Skills fields coming soon...</div>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    )
}
