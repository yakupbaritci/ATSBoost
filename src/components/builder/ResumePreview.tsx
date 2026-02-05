'use client'

import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'

// Register Open Sans font which has excellent unicode support including Turkish
// Register fonts with Turkish character support
Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bolditalic-webfont.ttf', fontWeight: 'bold', fontStyle: 'italic' }
    ]
});

Font.register({
    family: 'Merriweather',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/merriweather/2.0.0/Merriweather-Regular.ttf' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/merriweather/2.0.0/Merriweather-Bold.ttf', fontWeight: 'bold' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/merriweather/2.0.0/Merriweather-Italic.ttf', fontStyle: 'italic' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/merriweather/2.0.0/Merriweather-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Roboto',
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

// Replace Times-Roman with Merriweather and Times-Bold with Merriweather (bold handled by fontWeight)
const TemplateClassic = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Merriweather' }}>
        {/* Header - Centered */}
        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
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
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Professional Summary</Text>
                <Text style={styles.summary}>{content.summary}</Text>
            </View>
        )}

        {/* Experience */}
        {/* Experience */}
        {content.experience?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Professional Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={styles.jobBlock} wrap={false}>
                        <View style={styles.jobHeader}>
                            <View>
                                <Text style={{ ...styles.jobTitle, fontWeight: 'bold' }}>{exp.title}</Text>
                                <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{exp.company}</Text>
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
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={styles.jobBlock} wrap={false}>
                        <View style={styles.jobHeader}>
                            <View>
                                <Text style={{ ...styles.jobTitle, fontWeight: 'bold' }}>{edu.school}</Text>
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
            <View style={styles.section} wrap={false}>
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Skills</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
                    {content.skills.join(' • ')}
                </Text>
            </View>
        )}

        {/* Projects */}
        {content.projects?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Projects</Text>
                {content.projects.map((proj: any, i: number) => (
                    <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{proj.title} {proj.link ? `| ${proj.link}` : ''}</Text>
                        {proj.description && <Text style={{ fontSize: 10, marginTop: 2 }}>{proj.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Certifications */}
        {content.certifications?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Certifications</Text>
                {content.certifications.map((cert: any, i: number) => (
                    <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{cert.title} {cert.issuer ? `- ${cert.issuer}` : ''}</Text>
                        {cert.date && <Text style={{ fontSize: 10, fontStyle: 'italic' }}>{cert.date}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Languages */}
        {content.languages?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>Languages</Text>
                <Text style={{ fontSize: 10 }}>
                    {content.languages.map((l: any) => `${l.language} (${l.proficiency || ''})`).join(' • ')}
                </Text>
            </View>
        )}

    </Page>
)

// 2. Modern Template (Clean Sans-Serif / Left Aligned)
const TemplateModern = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Roboto' }}>
        {/* Header - Left Aligned with Accent */}
        <View style={{ marginBottom: 25, borderBottomWidth: 2, borderBottomColor: '#2563eb', paddingBottom: 15 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 5 }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, fontSize: 9, color: '#64748b' }}>
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
                <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#334155' }}>{content.summary}</Text>
            </View>
        )}

        {/* Experience */}
        {content.experience?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 10 }}>Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={{ marginBottom: 12, borderLeftWidth: 2, borderLeftColor: '#e2e8f0', paddingLeft: 10 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0f172a' }}>{exp.title}</Text>
                            <Text style={{ fontSize: 9, color: '#64748b', backgroundColor: '#f1f5f9', padding: '2 6', borderRadius: 4 }}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 10, fontStyle: 'italic', marginBottom: 4, color: '#475569' }}>{exp.company}</Text>
                        {exp.description && <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#334155' }}>{exp.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Education */}
        {content.education?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 10 }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{edu.school}</Text>
                            <Text style={{ fontSize: 9, color: '#64748b' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                    </View>
                ))}
            </View>
        )}

        {/* Certifications */}
        {content.certifications?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', marginBottom: 8 }}>Certifications</Text>
                {content.certifications.map((cert: any, i: number) => (
                    <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{cert.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 10, color: '#64748b' }}>{cert.issuer}</Text>
                            <Text style={{ fontSize: 10, color: '#64748b' }}>{cert.date}</Text>
                        </View>
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

const TemplateBold = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Roboto', padding: 0 }}>
        {/* Header - Heavy Block */}
        <View style={{ backgroundColor: '#18181b', color: '#fff', padding: 40, paddingBottom: 30 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 5 }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <Text style={{ fontSize: 10, opacity: 0.8 }}>
                {content.contact?.email} {content.contact?.phone && `| ${content.contact.phone}`} {content.contact?.location && `| ${content.contact.location}`}
            </Text>
        </View>

        {/* Content Wrapper with Padding */}
        <View style={{ padding: 40, paddingTop: 30 }}>
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
                        <View key={i} style={{ marginBottom: 15 }} wrap={false}>
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
                        <View key={i} style={{ marginBottom: 10 }} wrap={false}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{edu.school}</Text>
                            <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                            <Text style={{ fontSize: 9, color: '#444' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                    ))}
                </View>
            )}

            {content.certifications?.length > 0 && (
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 3, borderBottomColor: '#000', marginBottom: 12 }}>Certifications</Text>
                    {content.certifications.map((cert: any, i: number) => (
                        <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{cert.title}</Text>
                            <Text style={{ fontSize: 10 }}>{cert.issuer} {cert.date ? `| ${cert.date}` : ''}</Text>
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
        </View>
    </Page>
)

// 4. Minimalist Template (Clean Black & White / Elegant)
const TemplateMinimalist = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Merriweather', padding: 50 }}>
        <View style={{ marginBottom: 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 26, letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <Text style={{ fontSize: 9, color: '#444', letterSpacing: 1 }}>
                {content.contact?.email}   •   {content.contact?.phone}   •   {content.contact?.location}
            </Text>
        </View>

        {content.summary && (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 8, color: '#666' }}>Profile</Text>
                <Text style={styles.summary}>{content.summary}</Text>
            </View>
        )}

        {content.experience?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 10, color: '#666' }}>Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{exp.company}</Text>
                            <Text style={{ fontSize: 10, color: '#555' }}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 10, fontStyle: 'italic', marginBottom: 4 }}>{exp.title}</Text>
                        {exp.description && <Text style={{ fontSize: 10, lineHeight: 1.6 }}>{exp.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Education (Added to Minimalist) */}
        {content.education?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 10, color: '#666' }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={{ marginBottom: 12 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{edu.school}</Text>
                            <Text style={{ fontSize: 10, color: '#555' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                    </View>
                ))}
            </View>
        )}

        {content.certifications?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 8, color: '#666' }}>Certifications</Text>
                {content.certifications.map((cert: any, i: number) => (
                    <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                        <Text style={{ fontSize: 11 }}>{cert.title}</Text>
                        <Text style={{ fontSize: 10, color: '#555' }}>{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</Text>
                    </View>
                ))}
            </View>
        )}

        {content.projects?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 10, color: '#666' }}>Projects</Text>
                {content.projects.map((proj: any, i: number) => (
                    <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                        <Text style={{ fontSize: 11, fontFamily: 'Times-Bold' }}>{proj.title} {proj.link ? `| ${proj.link}` : ''}</Text>
                        {proj.description && <Text style={{ fontSize: 10, marginTop: 2 }}>{proj.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {content.skills?.length > 0 && (
            <View style={{ marginBottom: 20 }} wrap={false}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 8, color: '#666' }}>Skills</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.6 }}>{content.skills.join('  /  ')}</Text>
            </View>
        )}

        {/* Languages for Minimalist */}
        {content.languages?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 8, color: '#666' }}>Languages</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.6 }}>
                    {content.languages.map((l: any) => `${l.language} (${l.proficiency || ''})`).join('  /  ')}
                </Text>
            </View>
        )}
    </Page>
)

// 5. Technical Template (Monospace / Teal Accents / Developer Focus)
const TemplateTech = ({ content }: { content: ResumeContent }) => (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Roboto', backgroundColor: '#fdfdfd' }}>
        <View style={{ borderLeftWidth: 4, borderLeftColor: '#0d9488', paddingLeft: 20, marginBottom: 25 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#111827' }}>{content.contact?.fullName || 'YOUR NAME'}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'Courier', color: '#0d9488', marginTop: 5 }}>
                {'<'} {content.contact?.email} {'/>'}  //  {content.contact?.phone}
            </Text>
        </View>

        {content.skills?.length > 0 && (
            <View style={{ marginBottom: 20, backgroundColor: '#f0fdfa', padding: 10, borderRadius: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0d9488', marginBottom: 5, fontFamily: 'Courier' }}>// TECHNICAL_SKILLS</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {content.skills.map((skill: string, i: number) => (
                        <Text key={i} style={{ fontSize: 9, fontFamily: 'Courier', color: '#134e4a' }}>{skill}</Text>
                    ))}
                </View>
            </View>
        )}

        {content.experience?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 10 }}>Experience</Text>
                {content.experience.map((exp: any, i: number) => (
                    <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a' }}>{exp.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text style={{ fontSize: 10, color: '#0d9488', fontWeight: 'bold' }}>@ {exp.company}</Text>
                            <Text style={{ fontSize: 10, color: '#64748b', fontFamily: 'Courier' }}>[{exp.startDate} :: {exp.endDate}]</Text>
                        </View>
                        {exp.description && <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#334155' }}>{exp.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Education (Added) */}
        {content.education?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 10 }}>Education</Text>
                {content.education.map((edu: any, i: number) => (
                    <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a' }}>{edu.school}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text style={{ fontSize: 10, color: '#0d9488', fontWeight: 'bold' }}>{edu.degree}</Text>
                            <Text style={{ fontSize: 10, color: '#64748b', fontFamily: 'Courier' }}>[{edu.startDate} :: {edu.endDate}]</Text>
                        </View>
                    </View>
                ))}
            </View>
        )}

        {/* Projects (Added) */}
        {content.projects?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 10 }}>Projects</Text>
                {content.projects.map((proj: any, i: number) => (
                    <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a' }}>{proj.title}</Text>
                        {proj.link && <Text style={{ fontSize: 10, color: '#2563eb', marginBottom: 2 }}>{proj.link}</Text>}
                        {proj.description && <Text style={{ fontSize: 10, lineHeight: 1.5, color: '#334155' }}>{proj.description}</Text>}
                    </View>
                ))}
            </View>
        )}

        {/* Certifications */}
        {content.certifications?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 10 }}>Certifications</Text>
                {content.certifications.map((cert: any, i: number) => (
                    <View key={i} style={{ marginBottom: 10 }} wrap={false}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0f172a' }}>{cert.title}</Text>
                        <Text style={{ fontSize: 10, color: '#0d9488', fontFamily: 'Courier' }}>{cert.issuer} {cert.date ? `// ${cert.date}` : ''}</Text>
                    </View>
                ))}
            </View>
        )}

        {/* Languages (Added) */}
        {content.languages?.length > 0 && (
            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 10 }}>Languages</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {content.languages.map((l: any, i: number) => (
                        <Text key={i} style={{ fontSize: 9, fontFamily: 'Courier', color: '#111827' }}>
                            def {l.language} = "{l.proficiency}";
                        </Text>
                    ))}
                </View>
            </View>
        )}
    </Page>
)

export const ResumeDocument = ({ content, template }: { content: ResumeContent, template: string }) => {
    // Filter hidden items before passing to templates
    const filteredContent = {
        ...content,
        experience: content.experience?.filter((item: any) => item.visible !== false) || [],
        education: content.education?.filter((item: any) => item.visible !== false) || [],
        projects: content.projects?.filter((item: any) => item.visible !== false) || [],
        languages: content.languages?.filter((item: any) => item.visible !== false) || [],
        certifications: content.certifications?.filter((item: any) => item.visible !== false) || [],
    }

    return (
        <Document>
            {template === 'modern' ? <TemplateModern content={filteredContent} /> :
                template === 'bold' ? <TemplateBold content={filteredContent} /> :
                    template === 'minimalist' ? <TemplateMinimalist content={filteredContent} /> :
                        template === 'tech' ? <TemplateTech content={filteredContent} /> :
                            <TemplateClassic content={filteredContent} />}
        </Document>
    )
}

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
