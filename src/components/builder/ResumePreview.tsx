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

const ResumeDocument = ({ content }: { content: ResumeContent }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{content.contact?.fullName || 'YOUR NAME'}</Text>
                <View style={styles.contactRow}>
                    {content.contact?.email && <Text>{content.contact.email}</Text>}
                    {content.contact?.phone && <Text>{content.contact.phone}</Text>}
                    {content.contact?.location && <Text>{content.contact.location}</Text>}
                    {content.contact?.linkedin && <Text>{content.contact.linkedin}</Text>}
                </View>
            </View>

            {/* Summary */}
            {content.summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Summary</Text>
                    <Text style={styles.summary}>{content.summary}</Text>
                </View>
            )}

            {/* Experience */}
            {content.experience?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Experience</Text>
                    {content.experience.map((exp: any, i: number) => (
                        <View key={i} style={styles.jobBlock}>
                            <View style={styles.jobHeader}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.jobTitle}>{exp.title}</Text>
                                    <Text style={styles.jobCompany}>{exp.company}</Text>
                                </View>
                                <Text style={styles.jobDate}>
                                    {exp.startDate} - {exp.endDate}
                                </Text>
                            </View>
                            {exp.description && (
                                <Text style={styles.bulletPoint}>{exp.description}</Text>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {/* Education */}
            {content.education?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {content.education.map((edu: any, i: number) => (
                        <View key={i} style={styles.jobBlock}>
                            <View style={styles.jobHeader}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.jobTitle}>{edu.school}</Text>
                                    <Text style={styles.jobCompany}>{edu.degree}</Text>
                                </View>
                                <Text style={styles.jobDate}>
                                    {edu.startDate} - {edu.endDate}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Skills */}
            {content.skills?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                        {content.skills.map((skill: string, i: number) => (
                            <Text key={i} style={{ fontSize: 10, backgroundColor: '#f3f4f6', padding: '2 6', borderRadius: 4 }}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {/* Certifications */}
            {content.certifications?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                    {content.certifications.map((cert: any, i: number) => (
                        <View key={i} style={{ marginBottom: 4 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{cert.title}</Text>
                            <Text style={{ fontSize: 10, color: '#666' }}>{cert.issuer} {cert.date ? `| ${cert.date}` : ''}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Projects */}
            {content.projects?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {content.projects.map((proj: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{proj.title} {proj.link ? `| ${proj.link}` : ''}</Text>
                            {proj.description && <Text style={{ fontSize: 10, marginTop: 2 }}>{proj.description}</Text>}
                        </View>
                    ))}
                </View>
            )}

            {/* Languages */}
            {content.languages?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Languages</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                        {content.languages.map((lang: any, i: number) => (
                            <Text key={i} style={{ fontSize: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>{lang.language}</Text>
                                {lang.proficiency ? `: ${lang.proficiency}` : ''}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

        </Page>
    </Document>
)

export function ResumePreview({ content }: { content: ResumeContent }) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return <div className="animate-pulse bg-gray-200 w-full h-full rounded" />

    return (
        <div className="w-full h-full rounded-md overflow-hidden border border-zinc-200">
            <PDFViewer width="100%" height="100%" showToolbar={true}>
                <ResumeDocument content={content} />
            </PDFViewer>
        </div>
    )
}
