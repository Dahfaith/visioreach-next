"use client";
import React from "react";
import FadeIn from "@/components/ui/FadeIn";

const principles = [
  {
    id: "01",
    title: "Subtraction over addition.",
    description: "Great design isn't achieved when there is nothing left to add, but when there is nothing left to take away. We relentlessly strip away the unnecessary so the core utility and brand message can shine."
  },
  {
    id: "02",
    title: "Speed is a right.",
    description: "Latency breaks immersion. An interface that feels slow is fundamentally broken, regardless of what the spec says. Every database query, API call, and animation is optimized to feel instantaneous."
  },
  {
    id: "03",
    title: "Full lifecycle ownership.",
    description: "We don't just write code and hand it over. From the very first wireframe to the final production deployment pipeline, we take complete ownership of the product's technical and commercial success."
  }
];

export default function Principles() {
  return (
    <section id="principles" className="py-20 md:py-32 bg-bone border-t border-ink-100">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">04</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Principles</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                Ideas we build by. <span className="italic text-ink-500">core philosophies.</span>
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {principles.map((principle, index) => (
            <FadeIn 
              key={principle.id} 
              direction="up" 
              delay={300 + (index * 100)} 
              className="col-span-12 md:col-span-4 border border-ink-200 p-8 md:p-10 hover:bg-white transition-colors"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400 mb-12">
                Principle / {principle.id}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink-900 tracking-display leading-tight mb-4">
                {principle.title}
              </h3>
              <p className="text-ink-700 text-sm md:text-base leading-relaxed">
                {principle.description}
              </p>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
