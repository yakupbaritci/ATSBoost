const fs = require('fs');
const path = require('path');

const fontsDir = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

// Using Google Fonts GitHub repository raw URLs which are stable
const fonts = {
    "Roboto-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Regular.ttf",
    "Roboto-Bold.ttf": "https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Bold.ttf",
    "Roboto-Italic.ttf": "https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Italic.ttf",
    "Roboto-BoldItalic.ttf": "https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-BoldItalic.ttf",
    "Merriweather-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/merriweather/Merriweather-Regular.ttf",
    "Merriweather-Bold.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/merriweather/Merriweather-Bold.ttf",
    "Merriweather-Italic.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/merriweather/Merriweather-Italic.ttf",
    "Merriweather-BoldItalic.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/merriweather/Merriweather-BoldItalic.ttf"
};

async function download() {
    for (const [filename, url] of Object.entries(fonts)) {
        const dest = path.join(fontsDir, filename);
        console.log(`Downloading ${filename} from ${url}...`);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

            const buffer = await response.arrayBuffer();
            if (buffer.byteLength < 1000) {
                console.warn(`Warning: ${filename} is surprisingly small (${buffer.byteLength} bytes). Check URL.`);
            }
            fs.writeFileSync(dest, Buffer.from(buffer));
            console.log(`Downloaded ${filename} (${buffer.byteLength} bytes)`);
        } catch (err) {
            console.error(`Error downloading ${filename}:`, err);
        }
    }
}

download();
