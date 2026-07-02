"use client";
import React, { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) {
        const injectedProject = {
          id: "247billz-injected",
          title: "247Billz",
          description: "A premium invoicing and receipt generation platform built with Next.js, Supabase, and Tailwind. Features an enterprise-grade admin dashboard, interactive charts, and real-time CSV exports.",
          category: "web, saas",
          github_url: "https://github.com/Dahfaith/247Billz",
          live_url: "https://247billz.vercel.app",
          image_url: ""
        };
        setProjects([injectedProject, ...data]);
      }
    }
    fetchProjects();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const uniqueCategories = ["All", ...Array.from(new Set(
    projects.flatMap(p => 
      p.category.split(',').map((c: string) => c.trim())
    )
  ))];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => 
        p.category.split(',').map((c: string) => c.trim().toLowerCase()).includes(filter.toLowerCase())
      );

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">03</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Selected Work</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                Things we've shipped. <span className="italic text-ink-500">recent projects.</span>
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
              <p className="mt-4 max-w-2xl text-ink-700 text-sm md:text-base leading-relaxed">
                A small, honest cross-section of product, tooling, and design we've built recently. 
                Managed live from our custom database.
              </p>
            </FadeIn>
          </div>
        </header>

        {/* Filters */}
        <FadeIn direction="up" delay={400} className="flex flex-wrap gap-4 mb-12">
          {uniqueCategories.map(cat => (
            <button 
              key={cat}
              className={`font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                filter === cat 
                  ? "border-ink-900 bg-ink-900 text-bone" 
                  : "border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-900"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        {/* Project List */}
        <ul className="border-t border-ink-100 relative" onMouseMove={handleMouseMove}>
          {filteredProjects.map((project, index) => (
            <FadeIn 
              key={project.id} 
              direction="up" 
              delay={index * 100} 
              className="group border-b border-ink-100 block relative"
            >
              <div 
                className="grid grid-cols-12 gap-x-6 items-baseline py-7 md:py-10 px-2 transition-colors hover:bg-ink-100/30"
                onMouseEnter={() => {
                  if (project.image_url) setHoveredImage(project.image_url);
                }}
                onMouseLeave={() => setHoveredImage(null)}
              >
                
                {/* Index Number */}
                <div className="col-span-12 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400 mb-2 md:mb-0">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Title & Image */}
                <div className="col-span-12 md:col-span-5 mb-4 md:mb-0 pr-4">
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink-900 tracking-display leading-[1.02] group-hover:text-flare transition-colors">
                    {project.title}
                  </h3>
                  {/* Mobile inline image (hidden on desktop where floating image takes over) */}
                  {project.image_url && (
                    <div className="mt-6 md:hidden">
                       <img src={project.image_url} alt={project.title} className="w-full h-auto border border-ink-100 grayscale-[40%]"/>
                    </div>
                  )}
                </div>
                
                {/* Description & Category */}
                <div className="col-span-12 md:col-span-4 mb-4 md:mb-0 pointer-events-none">
                  <p className="text-ink-700 text-sm md:text-[15px] leading-relaxed max-w-prose">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">
                    {project.category.split(',').map((cat: string) => (
                      <span key={cat} className="text-ink-900 bg-ink-100/50 px-2 py-0.5">{cat.trim()}</span>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="col-span-12 md:col-span-2 md:text-right font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600 flex flex-row md:flex-col justify-between md:justify-start">
                  <div className="hidden md:block">2026</div>
                  <div className="text-ink-400 hidden md:block">Delivery</div>
                  
                  <div className="mt-0 md:mt-4 flex gap-4">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink-900 hover:text-flare group/link">
                        <span>Live</span><span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink-900 hover:text-flare group/link">
                        <span>Code</span><span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </ul>

        {/* NDA Note & GitHub Link */}
        <FadeIn direction="up" delay={200} className="mt-16 pt-8 border-t border-ink-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 max-w-md leading-relaxed">
            Note: Most recent client work and internal enterprise tools are under NDA.
          </p>
          <a href="https://github.com/Dahfaith" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-3 border border-ink-200 text-ink-900 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-ink-900 hover:text-bone transition-colors group">
            <span>See more on GitHub</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </FadeIn>

      </div>

      {/* Floating Desktop Image Reveal */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 hidden md:block overflow-hidden shadow-2xl border border-ink-100"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              width: "400px",
              height: "260px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img src={hoveredImage} alt="Project Preview" className="w-full h-full object-cover grayscale-[20%]" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
