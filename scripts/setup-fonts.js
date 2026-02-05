const fs = require('fs');
const path = require('path');

const fontsDir = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

// Function to safely copy file
function copyFont(srcPath, destName) {
    try {
        // Resolve package path if it starts with package name, else use literal path
        // Actually, require.resolve might fail if asking for non-main files depending on exports config.
        // So we will try to find node_modules path manually or use require.resolve for the package root.

        let fullSrcPath = srcPath;
        if (!fs.existsSync(srcPath)) {
            // Try to find relative to node_modules
            fullSrcPath = path.join(process.cwd(), 'node_modules', srcPath);
        }

        if (fs.existsSync(fullSrcPath)) {
            fs.copyFileSync(fullSrcPath, path.join(fontsDir, destName));
            console.log(`Copied ${destName} from ${fullSrcPath}`);
        } else {
            console.error(`Source file not found: ${srcPath}`);
        }
    } catch (err) {
        console.error(`Error copying ${destName}: ${err.message}`);
    }
}

// Roboto (from @fontsource/roboto - WOFF)
copyFont('@fontsource/roboto/files/roboto-latin-400-normal.woff', 'Roboto-Regular.woff');
copyFont('@fontsource/roboto/files/roboto-latin-700-normal.woff', 'Roboto-Bold.woff');
copyFont('@fontsource/roboto/files/roboto-latin-400-italic.woff', 'Roboto-Italic.woff');
copyFont('@fontsource/roboto/files/roboto-latin-700-italic.woff', 'Roboto-BoldItalic.woff');

// Merriweather (from @fontsource/merriweather - WOFF)
// Fontsource file naming: merriweather-latin-{weight}-{style}.woff
copyFont('@fontsource/merriweather/files/merriweather-latin-400-normal.woff', 'Merriweather-Regular.woff');
copyFont('@fontsource/merriweather/files/merriweather-latin-700-normal.woff', 'Merriweather-Bold.woff');
copyFont('@fontsource/merriweather/files/merriweather-latin-400-italic.woff', 'Merriweather-Italic.woff');
copyFont('@fontsource/merriweather/files/merriweather-latin-700-italic.woff', 'Merriweather-BoldItalic.woff');
