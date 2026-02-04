// Polyfill for Node.js environment (fixes DOMMatrix is not defined)
if (typeof Promise.withResolvers === 'undefined') {
    // @ts-ignore
    if (typeof window === 'undefined' && !global.DOMMatrix) {
        // @ts-ignore
        global.DOMMatrix = class DOMMatrix {
            constructor() {
                this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
            }
            toString() { return "matrix(1, 0, 0, 1, 0, 0)"; }
        }
    }
}

// @ts-ignore
const pdf = require('pdf-parse');

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    try {
        const data = await pdf(buffer)
        return data.text
    } catch (error) {
        console.error('PDF Parse Error:', error)
        throw new Error('Failed to parse PDF')
    }
}
