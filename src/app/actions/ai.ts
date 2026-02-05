'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function parseResumeWithAI(rawText: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    You are an expert Resume Parser. 
    Extract structured data from the provided resume text below.
    
    Return ONLY valid JSON with this exact structure (no markdown, no backticks):
    {
      "contact": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "portfolio": "" },
      "summary": "Full professional summary text...",
      "experience": [ { "id": "uuid", "title": "", "company": "", "startDate": "", "endDate": "", "description": "Bullet points..." } ],
      "education": [ { "id": "uuid", "school": "", "degree": "", "startDate": "", "endDate": "" } ],
      "skills": ["skill1", "skill2"]
    }
    If a field is not found, leave it empty or empty array.

    RESUME TEXT:
    ${rawText}
    `

    try {
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        // Clean up markdown if Gemini adds it
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim()

        return JSON.parse(jsonString)

    } catch (error: any) {
        console.error('Gemini Parse Error:', error)
        return {
            error: `AI Error: ${error.message || error}`,
            contact: {},
            summary: `AI Processing Failed. \n\nError Details: ${error.message}\n\nPlease edit manually from the raw text below.\n\n${rawText.slice(0, 2000)}...`,
            experience: [],
            education: [],
            skills: []
        }
    }
}

export async function optimizeResumeContent(currentContent: any, jobDescription: string) {
    if (!jobDescription || jobDescription.length < 50) {
        throw new Error('Please provide a valid Job Description first.')
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    You are an expert CV Optimizer and ATS Specialist.
    Your goal is to rewrite the user's resume content to perfectly match the provided Job Description.

    RULES:
    1. Do NOT invent new experiences. Only rephrase existing ones.
    2. Use strong action verbs.
    3. Incorporate keywords from the Job Description naturally.
    4. Optimize the "Summary" to be impactful and relevant to the job.
    5. Return ONLY valid JSON (no markdown) with the same structure as input.

    RESUME CONTENT:
    ${JSON.stringify(currentContent)}

    JOB DESCRIPTION:
    ${jobDescription}

    Please optimize the 'summary' and 'experience' descriptions. 
    Keep the 'contact' details exactly the same.
    Return the full JSON.
    `

    try {
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        // Clean up markdown if Gemini adds it
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim()

        return JSON.parse(jsonString)

    } catch (error) {
        console.error('Gemini Optimization Error:', error)
        throw new Error('Failed to optimize resume with AI')
    }
}
