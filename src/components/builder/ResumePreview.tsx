'use client'

import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'

// Register Open Sans font which has excellent unicode support including Turkish
Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 'bold' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700italic.ttf', fontWeight: 'bold', fontStyle: 'italic' }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Open Sans',
    },
    section: {
        marginBottom: 10,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        fontSize: 10,
        color: '#444',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 4,
        marginBottom: 8,
        marginTop: 10,
    },
    jobBlock: {
        marginBottom: 10,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    jobTitle: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    jobCompany: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    jobDate: {
        fontSize: 10,
        color: '#666',
    },
    bulletPoint: {
        fontSize: 10,
        marginLeft: 10,
        marginBottom: 2,
        lineHeight: 1.4,
    },
    summary: {
        fontSize: 10,
        lineHeight: 1.5,
        marginBottom: 10,
    }
});

type ResumeContent = any // TODO: Share type

// --- TEMPLATES ---

// 1. Classic Template (Harvard Style - Times New Roman / Clean)
const TemplateClassic = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Times-Roman' }}>
        {/* Header - Centered */}
        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontFamily: 'Times-Bold', marginBottom: 4, textTransform: 'uppercase' }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, fontSize: 10, justifyContent: 'center' }}>
                {content.contact?.email && <Text>{content.contact.email}</Text>}
                {content.contact?.phone && <Text>• {content.contact.phone}</Text>}
                {content.contact?.location && <Text>• {content.contact.location}</Text>}
                {content.contact?.linkedin && <Text>• {content.contact.linkedin}</Text>}
            </View>
        </View>

        {/* Sections */}
        {/* Summary */}
        {content.summary && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontFamily: 'Times-Bold' }}>Professional Summary</Text>
                <Text style={styles.summary}>{content.summary}</Text>
            </View>
        )}

        {/* Experience */}
        {content.experience?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontFamily: 'Times-Bold' }}>Professional Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={styles.jobBlock}>
                        <View style={styles.jobHeader}>
                            <View>
                                <Text style={{ ...styles.jobTitle, fontFamily: 'Times-Bold' }}>{exp.title}</Text>
                                <Text style={{ fontSize: 11, fontFamily: 'Times-Italic' }}>{exp.company}</Text>
                            </View>
                            <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        {exp.description && <Text style={styles.bulletPoint}>{exp.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Education */}
        {content.education?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontFamily: 'Times-Bold' }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={styles.jobBlock}>
                        <View style={styles.jobHeader}>
                            <View>
                                <Text style={{ ...styles.jobTitle, fontFamily: 'Times-Bold' }}>{edu.school}</Text>
                                <Text style={styles.jobCompany}>{edu.degree}</Text>
                            </View>
                            <Text style={styles.jobDate}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                    </View>
                ))}
            </View>
        )}

        {/* Skills */}
        {content.skills?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontFamily: 'Times-Bold' }}>Skills</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
                    {content.skills.join(' • ')}
                </Text>
            </View>
        )}

        {/* Other sections reuse similar logic if needed, keeping it minimal for Classic */}
        {/* Projects */}
        {content.projects?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontFamily: 'Times-Bold' }}>Projects</Text>
                {content.projects.map((proj: any, i: number) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                        <Text style={{ fontSize: 11, fontFamily: 'Times-Bold' }}>{proj.title} {proj.link ? `| ${proj.link}` : ''}</Text>
                        {proj.description && <Text style={{ fontSize: 10, marginTop: 2 }}>{proj.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Languages */}
        {content.languages?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontFamily: 'Times-Bold' }}>Languages</Text>
                <Text style={{ fontSize: 10 }}>
                    {content.languages.map((l: any) => `${l.language} (${l.proficiency || ''})`).join(' • ')}
                </Text>
            </View>
        )}

    </Page>
)

// 2. Modern Template (Clean Sans-Serif / Left Aligned)
const TemplateModern = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Open Sans' }}>
        {/* Header - Left Aligned with Accent */}
        <View style={{ marginBottom: 25, borderBottomWidth: 2, borderBottomColor: '#2563eb', paddingBottom: 15 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1eb', marginBottom: 5 }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, fontSize: 9, color: '#555' }}>
                {content.contact?.email && <Text>{content.contact.email}</Text>}
                {content.contact?.phone && <Text>{content.contact.phone}</Text>}
                {content.contact?.location && <Text>{content.contact.location}</Text>}
                {content.contact?.linkedin && <Text>{content.contact.linkedin}</Text>}
            </View>
        </View>

        {/* Summary */}
        {content.summary && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 6 }}>Profile</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#333' }}>{content.summary}</Text>
            </View>
        )}

        {/* Experience */}
        {content.experience?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 10 }}>Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={{ marginBottom: 12, borderLeftWidth: 2, borderLeftColor: '#e5e7eb', paddingLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#111' }}>{exp.title}</Text>
                            <Text style={{ fontSize: 9, color: '#666', backgroundColor: '#f3f4f6', padding: '2 6', borderRadius: 4 }}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 10, fontStyle: 'italic', marginBottom: 4, color: '#444' }}>{exp.company}</Text>
                        {exp.description && <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#333' }}>{exp.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Education - Same as Experience style */}
        {content.education?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 10 }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{edu.school}</Text>
                            <Text style={{ fontSize: 9, color: '#666' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                    </View>
                ))}
            </View>
        )}

        {/* Skills - Badges style */}
        {content.skills?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 8 }}>Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {content.skills.map((skill: string, i: number) => (
                        <Text key={i} style={{ fontSize: 9, backgroundColor: '#eff6ff', color: '#1e40af', padding: '3 8', borderRadius: 10 }}>
                            {skill}
                        </Text>
                    ))}
                </View>
            </View>
        )}
    </Page>
)

// 3. Bold Template (Heavy Headers / High Contrast)
const TemplateBold = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Open Sans' }}>
        {/* Header - Heavy Block */}
        <View style={{ backgroundColor: '#111', color: '#fff', margin: -40, marginBottom: 30, padding: 40, paddingBottom: 30 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 5 }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <Text style={{ fontSize: 10, opacity: 0.8 }}>
                {content.contact?.email} | {content.contact?.phone} | {content.contact?.location}
            </Text>
        </View>

        {/* Content with bold dividers */}
        {content.summary && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 3, borderBottomColor: '#000', marginBottom: 8 }}>About Me</Text>
                <Text style={styles.summary}>{content.summary}</Text>
            </View>
        )}

        {content.experience?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 3, borderBottomColor: '#000', marginBottom: 12 }}>Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{exp.title} <Text style={{ fontWeight: 'normal' }}>at</Text> {exp.company}</Text>
                        <Text style={{ fontSize: 9, color: '#444', marginBottom: 4 }}>{exp.startDate} - {exp.endDate}</Text>
                        {exp.description && <Text style={{ fontSize: 10, lineHeight: 1.5 }}>{exp.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {content.education?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 3, borderBottomColor: '#000', marginBottom: 12 }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{edu.school}</Text>
                        <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                        <Text style={{ fontSize: 9, color: '#444' }}>{edu.startDate} - {edu.endDate}</Text>
                    </View>
                ))}
            </View>
        )}

        {content.skills?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 3, borderBottomColor: '#000', marginBottom: 12 }}>Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    {content.skills.map((skill: string, i: number) => (
                        <Text key={i} style={{ fontSize: 9, border: '1 solid #000', padding: '3 6' }}>{skill}</Text>
                    ))}
                </View>
            </View>
        )}
    </Page>
)

const ResumeDocument = ({ content, template }: { content: ResumeContent, template: string }) => (
    <Document>
        {template === 'modern' ? <TemplateModern content={content} /> :
            template === 'bold' ? <TemplateBold content={content} /> :
                <TemplateClassic content={content} />}
    </Document>
)

export function ResumePreview({ content, template = 'classic' }: { content: ResumeContent, template?: string }) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return <div className="animate-pulse bg-gray-200 w-full h-full rounded" />

    return (
        <div className="w-full h-full rounded-md overflow-hidden border border-zinc-200">
            <PDFViewer width="100%" height="100%" showToolbar={true}>
                <ResumeDocument content={content} template={template} />
            </PDFViewer>
        </div>
    )
}
