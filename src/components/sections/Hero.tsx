"use client";
import React from "react";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-40 pb-10 min-h-[90vh] flex flex-col justify-center border-b border-ink-100">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 w-full">
        
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          
          {/* Left Index (Desktop) */}
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-2 flex md:block gap-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              <div className="flex items-center gap-2">
                <span>VisioReach / 2026</span>
              </div>
              <div className="mt-3 text-ink-600">Lagos, NG·</div>
            </div>
          </FadeIn>

          {/* Main Headline */}
          <div className="col-span-12 md:col-span-10">
            <FadeIn direction="up" delay={200}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-600 mb-5">Premium Digital Studio ·</p>
            </FadeIn>
            <h1 className="font-serif text-ink-900 leading-[0.92] tracking-display text-balance text-[14vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8rem]">
              <FadeIn direction="up" delay={300} className="block">VisioReach</FadeIn>
              <FadeIn direction="up" delay={400} className="block">
                <span className="italic text-ink-600">Concepts.</span>
                <span className="ml-4 inline-block align-middle font-mono not-italic normal-case tracking-[0.14em] text-[10px] sm:text-xs text-ink-500 max-w-[200px] leading-relaxed">
                  (Designing scalable digital products)
                </span>
              </FadeIn>
            </h1>
          </div>
        </div>

        {/* Lower Info Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-x-6 gap-y-10 border-t border-ink-100 pt-10">
          
          {/* Left Col */}
          <FadeIn direction="up" delay={500} className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">Focus</p>
            <p className="mt-3 text-ink-800 text-sm leading-relaxed">
              Premium Web Development<br/>
              <span className="text-ink-600">brand identity, end-to-end.</span>
            </p>
          </FadeIn>

          {/* Middle Col */}
          <FadeIn direction="up" delay={600} className="col-span-12 md:col-span-6 md:col-start-5">
            <p className="text-ink-800 text-base md:text-lg leading-[1.6] text-balance max-w-2xl">
              We design and build fullstack products, from the database to the pixel. Our work is a practice in restraint: interfaces that feel inevitable, systems that stay quiet under load, and brands that speak for themselves.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-ink-900 text-bone font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-flare transition-colors">
                <span>Start a project</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#projects" className="group inline-flex items-center gap-3 px-6 py-3 border border-ink-200 text-ink-900 font-mono text-[11px] uppercase tracking-[0.22em] hover:border-ink-500 transition-colors">
                <span>View Portfolio</span>
              </a>
            </div>
          </FadeIn>

          {/* Right Col */}
          <FadeIn direction="up" delay={700} className="col-span-12 md:col-span-2 md:col-start-11 md:text-right hidden md:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">Index</p>
            <ul className="mt-3 space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-700">
              <li><a href="#about" className="hover:text-ink-950 transition-colors">01 · About</a></li>
              <li><a href="#services" className="hover:text-ink-950 transition-colors">02 · Capabilities</a></li>
              <li><a href="#projects" className="hover:text-ink-950 transition-colors">03 / Selected Work</a></li>
              <li><a href="#contact" className="hover:text-ink-950 transition-colors">04 / Contact</a></li>
            </ul>
          </FadeIn>

        </div>

        {/* Stats Grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-t border-ink-100 pt-10">
           <FadeIn direction="up" delay={800} className="col-span-1">
             <p className="font-serif text-3xl md:text-5xl text-ink-900 tracking-display">15+</p>
             <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mt-2">Products Shipped</p>
           </FadeIn>
           <FadeIn direction="up" delay={900} className="col-span-1">
             <p className="font-serif text-3xl md:text-5xl text-ink-900 tracking-display">5+</p>
             <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mt-2">Industries</p>
           </FadeIn>
           <FadeIn direction="up" delay={1000} className="col-span-1">
             <p className="font-serif text-3xl md:text-5xl text-ink-900 tracking-display">99.9%</p>
             <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mt-2">Uptime Mindset</p>
           </FadeIn>
           <FadeIn direction="up" delay={1100} className="col-span-1">
             <p className="font-serif text-3xl md:text-5xl text-ink-900 tracking-display">∞</p>
             <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mt-2">Curiosity</p>
           </FadeIn>
        </div>

      </div>

      {/* Infinite Tech Marquee */}
      <div className="mt-20 md:mt-32 border-y border-ink-100 py-6 overflow-hidden relative flex bg-ink-950">
        <div className="flex animate-marquee whitespace-nowrap font-serif text-2xl md:text-4xl italic text-ink-200 tracking-wide">
           <span className="mx-6">Framer Motion</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">React</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">Next.js</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">TypeScript</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">Tailwind CSS</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">PostgreSQL</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">Node.js</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">WordPress</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">AI Engineering</span> <span className="mx-6 text-flare">·</span>
           
           {/* Duplicate for seamless looping */}
           <span className="mx-6">Framer Motion</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">React</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">Next.js</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">TypeScript</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">Tailwind CSS</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">PostgreSQL</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">Node.js</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">WordPress</span> <span className="mx-6 text-flare">·</span>
           <span className="mx-6">AI Engineering</span> <span className="mx-6 text-flare">·</span>
        </div>
      </div>
    </section>
  );
}
