'use server'

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function parseResumeWithAI(rawText: string) {
    const systemPrompt = `You are an expert Resume Parser. 
  Extract structured data from the provided resume text.
  Return ONLY valid JSON with this exact structure:
  {
    "contact": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "portfolio": "" },
    "summary": "Full professional summary text...",
    "experience": [ { "id": "uuid", "title": "", "company": "", "startDate": "", "endDate": "", "description": "Bullet points..." } ],
    "education": [ { "id": "uuid", "school": "", "degree": "", "startDate": "", "endDate": "" } ],
    "skills": ["skill1", "skill2"]
  }
  If a field is not found, leave it empty or empty array.
  `

    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 4000,
            temperature: 0,
            system: systemPrompt,
            messages: [
                { role: "user", content: rawText }
            ]
        })

        const textResponse = (msg.content[0] as any).text

        // Improved JSON extraction: ensure we capture the full object
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No JSON found in AI response")
        }

        const jsonString = jsonMatch[0];

        try {
            return JSON.parse(jsonString)
        } catch (parseError: any) {
            // Try to fix common JSON errors (newline in string, etc) if simple parsing fails
            // For now, just throw the details
            throw new Error(`JSON format error: ${parseError.message}. Response excerpt: ${jsonString.substring(0, 100)}...`)
        }

    } catch (error: any) {
        console.error('AI Parse Error:', error)
        // Return error object to be displayed in the UI instead of silent fail
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

    const systemPrompt = `You are an expert CV Optimizer and ATS Specialist.
  Your goal is to rewrite the user's resume content to perfectly match the provided Job Description.
  
  RULES:
  1. Do NOT invent new experiences. Only rephrase existing ones.
  2. Use strong action verbs.
  3. Incorporate keywords from the Job Description naturally.
  4. Optimize the "Summary" to be impactful and relevant to the job.
  5. Return ONLY the JSON object with the same structure as input. Do NOT return markdown or explanations.
  `

    const userMessage = `
  RESUME CONTENT:
  ${JSON.stringify(currentContent)}

  JOB DESCRIPTION:
  ${jobDescription}

  Please optimize the 'summary' and 'experience' descriptions. 
  Keep the 'contact' details exactly the same.
  Return the full JSON.
  `

    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 4000,
            temperature: 0.7,
            system: systemPrompt,
            messages: [
                { role: "user", content: userMessage }
            ]
        })

        const textResponse = (msg.content[0] as any).text

        // Simple JSON extraction (in production, use structured output or more robust parsing)
        const jsonStart = textResponse.indexOf('{')
        const jsonEnd = textResponse.lastIndexOf('}') + 1
        const jsonString = textResponse.slice(jsonStart, jsonEnd)

        return JSON.parse(jsonString)

    } catch (error) {
        console.error('AI Optimization Error:', error)
        throw new Error('Failed to optimize resume with AI')
    }
}
