import PDFParser from 'pdf2json'

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    const parser = new PDFParser(null, 1); // 1 = text only

    return new Promise((resolve, reject) => {
        parser.on("pdfParser_dataError", (errData) => reject(errData.parserError));

        parser.on("pdfParser_dataReady", (pdfData) => {
            // Raw text extraction
            // pdf2json returns URL-encoded text, so we decode it
            // It puts text in Pages -> Texts -> R -> T

            try {
                const rawText = pdfData.Pages.map(page => {
                    return page.Texts.map(textItem => {
                        return decodeURIComponent(textItem.R[0].T)
                    }).join(' ')
                }).join('\n\n')

                resolve(rawText)
            } catch (e) {
                reject(e)
            }
        });

        parser.parseBuffer(buffer);
    })
}
