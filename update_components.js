const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/components/sections');

// Function to process each file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Add the FadeIn import if it's not already there and if there are things to replace
  if (content.includes('data-reveal') && !content.includes('FadeIn')) {
    content = content.replace('import React from "react";', 'import React from "react";\nimport FadeIn from "@/components/ui/FadeIn";');
  }

  // Replace <div ... data-reveal="direction"> with <FadeIn direction="direction" ...>
  // Note: we need to change the closing tag too.
  // This is tricky with regex, so we'll do a simpler replacement for the opening tags,
  // but wait, if we change <div> to <FadeIn>, we MUST change the corresponding </div> to </FadeIn>.
  // Since doing this with regex is hard, I will do it differently:
  // We can just keep the <div> and wrap it inside <FadeIn direction="...">
  
  const regex = /<div([^>]*?)data-reveal="([^"]+)"([^>]*?)>/g;
  
  content = content.replace(regex, (match, before, direction, after) => {
    // Return the FadeIn wrapper, and keep the div but without data-reveal
    return `<FadeIn direction="${direction}"><div${before}${after}>`;
  });

  // Now we have to close the </FadeIn> tags.
  // Since my regex approach for closing tags is risky, let me just fix the components manually using standard string replace.
  console.log(`Need manual processing for ${filePath} to close FadeIn tags.`);
}

fs.readdirSync(directoryPath).forEach(file => {
  if (file !== 'Hero.tsx' && file !== 'About.tsx' && file.endsWith('.tsx')) {
    console.log(`Processing: ${file}`);
    processFile(path.join(directoryPath, file));
  }
});
