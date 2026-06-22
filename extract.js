const fs = require('fs');
const path = require('path');

const pageContent = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf-8');

// Define regex patterns to extract sections
const sections = [
  { name: 'About', pattern: /<section className="about section" id="about">([\s\S]*?)<\/section>/ },
  { name: 'Skills', pattern: /<section className="skills section" id="skills">([\s\S]*?)<\/section>/ },
  { name: 'Services', pattern: /<section className="services section" id="services">([\s\S]*?)<\/section>/ },
  { name: 'Projects', pattern: /<section className="projects section" id="projects">([\s\S]*?)<\/section>/ },
  { name: 'Journey', pattern: /<section className="journey section" id="journey">([\s\S]*?)<\/section>/ },
  { name: 'Testimonials', pattern: /<section className="testimonials section" id="testimonials">([\s\S]*?)<\/section>/ },
  { name: 'Contact', pattern: /<section className="contact section" id="contact">([\s\S]*?)<\/section>/ },
  { name: 'Footer', pattern: /<footer className="footer">([\s\S]*?)<\/footer>/, isLayout: true }
];

sections.forEach(sec => {
  const match = pageContent.match(sec.pattern);
  if (match) {
    const content = match[0];
    const componentCode = `"use client";
import React from "react";

export default function ${sec.name}() {
  return (
    ${content.split('\n').join('\n    ')}
  );
}
`;
    const folder = sec.isLayout ? 'layout' : 'sections';
    const filePath = path.join(__dirname, `src/components/${folder}/${sec.name}.tsx`);
    fs.writeFileSync(filePath, componentCode);
    console.log(`Created ${filePath}`);
  } else {
    console.log(`Could not find section: ${sec.name}`);
  }
});
