import React from 'react'

interface ResumeContent {
    contact?: {
        fullName?: string
        email?: string
        phone?: string
        location?: string
        linkedin?: string
        portfolio?: string
    }
    summary?: string
    experience?: Array<{
        title: string
        company: string
        location?: string
        startDate?: string
        endDate?: string
        description?: string
    }>
    education?: Array<{
        school: string
        degree: string
        location?: string
        startDate?: string
        endDate?: string
        description?: string
    }>
    skills?: string[]
    languages?: Array<{
        language: string
        proficiency?: string
    }>
    projects?: Array<{
        title: string
        description?: string
        link?: string
    }>
    certifications?: Array<{
        title: string
        issuer?: string
        date?: string
    }>
}

export function SimpleResumePreview({ content }: { content: ResumeContent }) {
    return (
        <div className="bg-white p-12 text-zinc-900 font-serif" style={{ minHeight: '1100px' }}>
            {/* Header / Contact */}
            <div className="border-b-2 border-blue-600 pb-4 mb-6">
                <h1 className="text-4xl font-bold text-blue-900 mb-2">
                    {content.contact?.fullName || 'Name Not Provided'}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
                    {content.contact?.email && <span>{content.contact.email}</span>}
                    {content.contact?.phone && <span>{content.contact.phone}</span>}
                    {content.contact?.location && <span>{content.contact.location}</span>}
                    {content.contact?.linkedin && <span>{content.contact.linkedin}</span>}
                    {content.contact?.portfolio && <span>{content.contact.portfolio}</span>}
                </div>
            </div>

            {/* Summary */}
            {content.summary && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-zinc-700">{content.summary}</p>
                </div>
            )}

            {/* Experience */}
            {content.experience && content.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-3 uppercase tracking-wide">Experience</h2>
                    <div className="space-y-4">
                        {content.experience.map((exp, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base">{exp.title}</h3>
                                    <span className="text-sm text-zinc-600">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <p className="text-sm font-semibold text-zinc-700">{exp.company}</p>
                                    {exp.location && <p className="text-sm text-zinc-600">{exp.location}</p>}
                                </div>
                                {exp.description && (
                                    <div className="text-sm text-zinc-700 whitespace-pre-line leading-relaxed">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {content.education && content.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-3 uppercase tracking-wide">Education</h2>
                    <div className="space-y-3">
                        {content.education.map((edu, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base">{edu.degree}</h3>
                                    <span className="text-sm text-zinc-600">
                                        {edu.startDate} - {edu.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className="text-sm font-semibold text-zinc-700">{edu.school}</p>
                                    {edu.location && <p className="text-sm text-zinc-600">{edu.location}</p>}
                                </div>
                                {edu.description && (
                                    <p className="text-sm text-zinc-700">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {content.skills && content.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {content.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-900 text-sm rounded-md border border-blue-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Languages */}
            {content.languages && content.languages.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Languages</h2>
                    <div className="space-y-1">
                        {content.languages.map((lang, idx) => (
                            <div key={idx} className="text-sm">
                                <span className="font-semibold">{lang.language}</span>
                                {lang.proficiency && <span className="text-zinc-600"> - {lang.proficiency}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {content.projects && content.projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Projects</h2>
                    <div className="space-y-2">
                        {content.projects.map((proj, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-sm">{proj.title}</h3>
                                {proj.description && <p className="text-sm text-zinc-700">{proj.description}</p>}
                                {proj.link && (
                                    <a href={proj.link} className="text-sm text-blue-600 underline">
                                        {proj.link}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {content.certifications && content.certifications.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Certifications</h2>
                    <div className="space-y-1">
                        {content.certifications.map((cert, idx) => (
                            <div key={idx} className="text-sm">
                                <span className="font-semibold">{cert.title}</span>
                                {cert.issuer && <span className="text-zinc-600"> - {cert.issuer}</span>}
                                {cert.date && <span className="text-zinc-600"> ({cert.date})</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
