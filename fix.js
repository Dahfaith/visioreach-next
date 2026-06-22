const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'src/app/page.tsx');
let html = fs.readFileSync(outPath, 'utf-8');

// Fix class='bx...' to className='bx...'
html = html.replace(/class='/g, "className='");

// Fix for attributes
html = html.replace(/for="/g, "htmlFor=\"");

// Remove the hardcoded lightbox HTML and script
html = html.replace(/<div id="portfolioLightbox"[\s\S]*?<\/script>/, '');

// Fix onclick
html = html.replace(/onclick="([^"]*)"/g, "onClick={() => console.log('click')}");

// Fix autocomplete
html = html.replace(/autocomplete="([^"]*)"/g, "autoComplete=\"$1\"");

fs.writeFileSync(outPath, html);
console.log("Fixed page.tsx");
