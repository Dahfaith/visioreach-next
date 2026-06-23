"use client";
import React from "react";
import FadeIn from "@/components/ui/FadeIn";

const skills = [
  { name: "TypeScript", icon: "bx bxl-typescript" },
  { name: "JavaScript", icon: "bx bxl-javascript" },
  { name: "React", icon: "bx bxl-react" },
  { name: "Next.js", icon: "bx bxl-react" },
  { name: "Tailwind CSS", icon: "bx bxl-tailwind-css" },
  { name: "Node.js", icon: "bx bxl-nodejs" },
  { name: "PostgreSQL", icon: "bx bxl-postgresql" },
  { name: "Figma", icon: "bx bxl-figma" },
  { name: "WordPress", icon: "bx bxl-wordpress" },
  { name: "HTML5", icon: "bx bxl-html5" },
  { name: "AI Engineering", icon: "bx bx-bot" }
];

export default function Skills() {
  return (
    <section id="stack" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Tech Stack</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                Tools we reach for.<span className="italic text-ink-500"> most of the time.</span>
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-t border-ink-100 pt-10">
          {skills.map((skill, index) => (
            <FadeIn key={skill.name} direction="up" delay={index * 50} className="flex flex-col items-start gap-3">
              <i className={`${skill.icon} text-3xl text-ink-800`}></i>
              <span className="font-serif text-xl text-ink-900">{skill.name}</span>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
