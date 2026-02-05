'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { SAMPLE_RESUMES } from '@/lib/sample-resumes'
import { Search, MapPin, Briefcase, GraduationCap, Copy, Eye, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ResumePreview } from '@/components/builder/ResumePreview'
import { duplicateSampleResume } from '@/app/actions/sample'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['All', ...Array.from(new Set(SAMPLE_RESUMES.map(s => s.category)))]

export default function SampleLibraryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isCopying, setIsCopying] = useState<string | null>(null)
    const [previewSample, setPreviewSample] = useState<typeof SAMPLE_RESUMES[0] | null>(null)
    const router = useRouter()

    const filteredSamples = SAMPLE_RESUMES.filter(sample => {
        const matchesCategory = selectedCategory === 'All' || sample.category === selectedCategory
        const matchesSearch = sample.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sample.category.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const handleUseSample = async (sampleId: string) => {
        setIsCopying(sampleId)
        try {
            const newResume = await duplicateSampleResume(sampleId)
            toast.success("Resume created from sample!")
            router.push(`/dashboard/builder/${newResume.id}`)
        } catch (error) {
            toast.error("Failed to copy sample")
        } finally {
            setIsCopying(null)
        }
    }

    return (
        <div className="container py-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Sample Library</h1>
                <p className="text-muted-foreground">
                    Browse our collection of professional resume samples to get inspired or start with a template.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className="rounded-full"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by role or category..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSamples.map(sample => (
                    <Card key={sample.id} className="flex flex-col hover:shadow-lg transition-shadow border-zinc-200 dark:border-zinc-800">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="mb-2">{sample.category}</Badge>
                            </div>
                            <CardTitle className="line-clamp-1">{sample.title}</CardTitle>
                            <CardDescription className="line-clamp-2 min-h-[40px]">
                                {sample.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4">
                            {/* Mini Preview / Stats */}
                            <div className="text-sm text-muted-foreground space-y-2">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    <span>{sample.content.experience?.length || 0} Experience Entries</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>{sample.content.education?.length || 0} Education Entries</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{sample.content.contact?.location || 'Location Not Specified'}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 gap-2"
                                onClick={() => setPreviewSample(sample)}
                            >
                                <Eye className="w-4 h-4" /> Preview
                            </Button>
                            <Button
                                className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleUseSample(sample.id)}
                                disabled={isCopying === sample.id}
                            >
                                {isCopying === sample.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                                Use
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredSamples.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No samples found matching your criteria.</p>
                    <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                        Clear filters
                    </Button>
                </div>
            )}

            {/* Preview Modal */}
            <Dialog open={!!previewSample} onOpenChange={(open) => !open && setPreviewSample(null)}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-2 shrink-0 bg-white dark:bg-zinc-900 z-10 border-b">
                        <DialogTitle className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span>{previewSample?.title}</span>
                                <span className="text-sm font-normal text-muted-foreground">{previewSample?.description}</span>
                            </div>
                            {previewSample && (
                                <Button
                                    className="ml-4 gap-2 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => {
                                        setPreviewSample(null) // Close modal
                                        handleUseSample(previewSample.id) // Trigger copy
                                    }}
                                    disabled={isCopying === previewSample.id}
                                >
                                    {isCopying === previewSample.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Use Template <Copy className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-black/50 p-8">
                        {/* We render the ResumePreview component here properly scaled/fitted */}
                        <div className="max-w-[800px] mx-auto shadow-2xl bg-white min-h-[1100px]">
                            {previewSample && (
                                <ResumePreview content={previewSample.content} template="modern" />
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
