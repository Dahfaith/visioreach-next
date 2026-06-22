const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../visioreach/index.html');
const outPath = path.join(__dirname, 'src/app/page.tsx');

let html = fs.readFileSync(htmlPath, 'utf-8');

// Extract body inner content
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.error("No body found");
  process.exit(1);
}

let bodyHtml = bodyMatch[1];

// Remove the script tag
bodyHtml = bodyHtml.replace(/<script src="script\.js"><\/script>/, '');

// Convert class to className
bodyHtml = bodyHtml.replace(/class="/g, 'className="');

// Fix unclosed tags
bodyHtml = bodyHtml.replace(/<img(.*?)>/g, (match, p1) => {
  if (p1.trim().endsWith('/')) return match;
  return `<img${p1} />`;
});
bodyHtml = bodyHtml.replace(/<input(.*?)>/g, (match, p1) => {
  if (p1.trim().endsWith('/')) return match;
  return `<input${p1} />`;
});

// Convert inline styles to objects
bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, p1) => {
  const styles = p1.split(';').filter(s => s.trim() !== '');
  const styleObj = styles.map(s => {
    let [key, value] = s.split(':');
    if (!key || !value) return '';
    key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    value = value.trim();
    return `${key}: "${value}"`;
  }).filter(Boolean).join(', ');
  return `style={{ ${styleObj} }}`;
});

// Fix onerror
bodyHtml = bodyHtml.replace(/onerror="([^"]*)"/g, 'onError={(e) => { e.currentTarget.style.display="none"; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display="flex"; }}');

// Fix aria-hidden
bodyHtml = bodyHtml.replace(/aria-hidden="([^"]*)"/g, 'aria-hidden={$1}');

// Wrap in a component
const component = `
"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Scroll reveal observer
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay || "0");
          setTimeout(() => el.classList.add('revealed'), delay);
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main>
      ${bodyHtml}
    </main>
  );
}
`;

fs.writeFileSync(outPath, component);
console.log("Migration complete!");
