const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = {
    "Roboto-Regular.ttf": "https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu4mxK.ttf",
    "Roboto-Bold.ttf": "https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlfBBc4.ttf",
    "Roboto-Italic.ttf": "https://fonts.gstatic.com/s/roboto/v32/KFOkCnqEu92Fr1Mu51xIIzIXKMny.ttf",
    "Roboto-BoldItalic.ttf": "https://fonts.gstatic.com/s/roboto/v32/KFOjCnqEu92Fr1Mu51TzBhc4CsE.ttf",
    "Merriweather-Regular.ttf": "https://fonts.gstatic.com/s/merriweather/v30/u8y7gqDvlWzRn0g2Y71bGTtX.ttf",
    "Merriweather-Bold.ttf": "https://fonts.gstatic.com/s/merriweather/v30/u8yznqDvlWzRn0g2Y71bHqsuPWIr.ttf",
    "Merriweather-Italic.ttf": "https://fonts.gstatic.com/s/merriweather/v30/u8yzmqDvlWzRn0g2Y71bDq8sPZwrYg.ttf",
    "Merriweather-BoldItalic.ttf": "https://fonts.gstatic.com/s/merriweather/v30/u8ywmqDvlWzRn0g2Y71bHqsWNW82.ttf"
};

Object.entries(fonts).forEach(([filename, url]) => {
    const dest = path.join(fontsDir, filename);
    const file = fs.createWriteStream(dest);

    console.log(`Downloading ${filename}...`);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { }); // Delete partial file
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
});
