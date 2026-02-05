'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function parseResumeWithAI(rawText: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })

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

        // --- Fallback: Regex Parsers (Graceful Degradation) ---
        console.log("Attempting Regex Fallback...");

        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
        const phoneRegex = /([\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})/;
        const linkedinRegex = /(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/;
        const websiteRegex = /(https?:\/\/[^\s]+)/;

        const emailMatch = rawText.match(emailRegex);
        const phoneMatch = rawText.match(phoneRegex);
        const linkedinMatch = rawText.match(linkedinRegex);
        const websiteMatch = rawText.match(websiteRegex);

        // Guess Name: First non-empty line that isn't too long
        const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 2);
        const likelyName = lines[0] || "";

        return {
            error: `AI Error (Using Regex Fallback): ${error.message || error}`,
            contact: {
                fullName: likelyName,
                email: emailMatch ? emailMatch[0] : "",
                phone: phoneMatch ? phoneMatch[0] : "",
                location: "",
                linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : "",
                portfolio: websiteMatch ? websiteMatch[0] : ""
            },
            summary: rawText.slice(0, 500) + "...\n(Note: Basic info extracted via fallback mechanism due to AI API error. Please edit manually.)",
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

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" })

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
