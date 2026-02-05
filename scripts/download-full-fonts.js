const fs = require('fs');
const path = require('path');

const fontsDir = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

// Full character set fonts from official repositories
const fonts = {
    // Roboto (src/hinted contains full TTF)
    "Roboto-Regular.ttf": "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Regular.ttf",
    "Roboto-Bold.ttf": "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf",
    "Roboto-Italic.ttf": "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Italic.ttf",
    "Roboto-BoldItalic.ttf": "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-BoldItalic.ttf",

    // Merriweather (fonts/ttf contains full TTF)
    "Merriweather-Regular.ttf": "https://raw.githubusercontent.com/EbenSorkin/Merriweather/master/fonts/ttf/Merriweather-Regular.ttf",
    "Merriweather-Bold.ttf": "https://raw.githubusercontent.com/EbenSorkin/Merriweather/master/fonts/ttf/Merriweather-Bold.ttf",
    "Merriweather-Italic.ttf": "https://raw.githubusercontent.com/EbenSorkin/Merriweather/master/fonts/ttf/Merriweather-Italic.ttf",
    "Merriweather-BoldItalic.ttf": "https://raw.githubusercontent.com/EbenSorkin/Merriweather/master/fonts/ttf/Merriweather-BoldItalic.ttf"
};

async function download() {
    for (const [filename, url] of Object.entries(fonts)) {
        const dest = path.join(fontsDir, filename);
        console.log(`Downloading ${filename} from ${url}...`);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

            const buffer = await response.arrayBuffer();
            fs.writeFileSync(dest, Buffer.from(buffer));
            console.log(`Downloaded ${filename} (${buffer.byteLength} bytes)`);
        } catch (err) {
            console.error(`Error downloading ${filename}:`, err);
        }
    }
}

download();
