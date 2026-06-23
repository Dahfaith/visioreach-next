"use client";
import React from "react";
import FadeIn from "@/components/ui/FadeIn";

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "VisioReach Concepts",
    date: "2023 TO PRESENT",
    description: "Designing and building robust web applications, from database schema to frontend pixels. Crafting scalable architectures with Next.js, React, and Supabase."
  },
  {
    title: "Backend Developer",
    company: "Freelance / Agency",
    date: "2021 TO 2023",
    description: "Developed robust backend systems, APIs, and complex automation workflows. Architected secure data models and high-performance server integrations."
  },
  {
    title: "Frontend Developer",
    company: "Contract / Freelance",
    date: "2020 TO 2022",
    description: "Crafted intuitive, responsive, and highly interactive user interfaces. Specialized in React and modern CSS frameworks to bring complex design systems to life in the browser."
  },
  {
    title: "Ads Expert",
    company: "Digital Marketing",
    date: "2020 TO 2022",
    description: "Managed high-budget ad campaigns across Google and social platforms. Engineered targeted funnels that scaled brand awareness and maximized ROI."
  },
  {
    title: "Music Promoter",
    company: "Entertainment Sector",
    date: "2018 TO 2026",
    description: "Spearheaded digital promotion strategies for artists. Leveraged streaming algorithms, playlist placements, and targeted outreach to build massive organic audiences."
  },
  {
    title: "Blogger & SEO Specialist",
    company: "Independent",
    date: "2016 TO 2026",
    description: "Authored technical and entertainment articles while optimizing content for search engines. Built platforms with high monthly recurring traffic through organic SEO."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-ink-950 text-bone">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-800 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">02</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Experience</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-balance">
                The journey so far. <span className="italic text-ink-400">always building.</span>
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <div className="space-y-16">
              {experiences.map((exp, idx) => (
                <FadeIn key={idx} direction="up" delay={idx * 100} className="group border-b border-ink-800 pb-12 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <h3 className="font-serif text-3xl md:text-4xl text-bone tracking-display group-hover:text-flare transition-colors">
                      {exp.title}
                    </h3>
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mt-2 md:mt-0">
                      {exp.date}
                    </div>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-flare mb-6">
                    {exp.company}
                  </p>
                  <p className="text-ink-300 text-sm md:text-base leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Education History */}
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-800 pt-6 md:pt-8 mt-24 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">03</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Education</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-balance">
                Academic background. <span className="italic text-ink-400">foundations.</span>
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <div className="space-y-16">
              <FadeIn direction="up" delay={300} className="group border-b border-ink-800 pb-12 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="font-serif text-3xl md:text-4xl text-bone tracking-display group-hover:text-flare transition-colors">
                    Ladoke Akintola University of Technology (LAUTECH)
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mt-2 md:mt-0">
                    2021 — 2025
                  </div>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-flare mb-6">
                  B.Sc. Computer Science
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={400} className="group border-b border-ink-800 pb-12 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="font-serif text-3xl md:text-4xl text-bone tracking-display group-hover:text-flare transition-colors">
                    Oyo State School of Science
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mt-2 md:mt-0">
                    2014 — 2017
                  </div>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-flare mb-6">
                  Senior Secondary Certificate (SSCE)
                </p>
              </FadeIn>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
