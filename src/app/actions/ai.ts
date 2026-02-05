'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function parseResumeWithAI(rawText: string) {
    const prompt = `
    You are an expert Resume Parser. 
    Extract structured data from the provided resume text below.
    
    Return ONLY valid JSON with this exact structure:
    {
      "contact": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "portfolio": "" },
      "summary": "Full professional summary text...",
      "experience": [ { "id": "uuid", "title": "", "company": "", "startDate": "", "endDate": "", "description": "Bullet points..." } ],
      "education": [ { "id": "uuid", "school": "", "degree": "", "startDate": "", "endDate": "" } ],
      "skills": ["skill1", "skill2"],
      "certifications": [ { "title": "", "issuer": "", "date": "" } ],
      "projects": [ { "title": "", "description": "", "link": "" } ],
      "languages": [ { "language": "", "proficiency": "" } ]
    }
    If a field is not found, leave it empty or empty array.
    Fix any formatting issues in the text (e.g. malformed emails, weird spacing).

    RESUME TEXT:
    ${rawText.slice(0, 10000)} 
    `
    // Limit text to 10k chars to avoid token limits if PDF is huge

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant that outputs JSON." }, { role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
            temperature: 0,
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");

        return JSON.parse(content);

    } catch (error: any) {
        console.error('OpenAI Parse Error:', error)

        // --- Fallback: Regex Parsers (Graceful Degradation) ---
        console.log("AI Failed, Attempting Regex Fallback...");

        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
        const phoneRegex = /([\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})/;
        const linkedinRegex = /(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/;

        const emailMatch = rawText.match(emailRegex);
        const phoneMatch = rawText.match(phoneRegex);
        const linkedinMatch = rawText.match(linkedinRegex);

        const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 2);
        const likelyName = lines[0] || "";

        return {
            error: `AI Error: ${error.message || error}`,
            contact: {
                fullName: likelyName,
                email: emailMatch ? emailMatch[0] : "",
                phone: phoneMatch ? phoneMatch[0] : "",
                location: "",
                linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : "",
                portfolio: ""
            },
            summary: rawText.slice(0, 500) + `...\n\n⚠️ AI Parsing Failed. Error: ${error.message}\n(Using basic regex extraction. Please edit manually.)`,
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            projects: [],
            languages: []
        }
    }
}

export async function optimizeResumeContent(currentContent: any, jobDescription: string) {
    if (!jobDescription || jobDescription.length < 50) {
        throw new Error('Please provide a valid Job Description first.')
    }

    const prompt = `
    You are an expert CV Optimizer and ATS Specialist.
    Your goal is to rewrite the user's resume content to perfectly match the provided Job Description.

    RULES:
    1. Do NOT invent new experiences. Only rephrase existing ones.
    2. Use strong action verbs.
    3. Incorporate keywords from the Job Description naturally.
    4. Optimize the "Summary" to be impactful and relevant to the job.
    5. Return ONLY valid JSON with the same structure as input.

    RESUME CONTENT:
    ${JSON.stringify(currentContent)}

    JOB DESCRIPTION:
    ${jobDescription}
    `

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant that outputs JSON." }, { role: "user", content: prompt }],
            model: "gpt-4o",
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");

        return JSON.parse(content);

    } catch (error) {
        console.error('OpenAI Optimization Error:', error)
        throw new Error('Failed to optimize resume with AI')
    }
}
