"use client";
import React, { useEffect, useState, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabaseClient";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true });
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Fallback dummy data if table is empty or missing
        setTestimonials([
          {
            id: 1,
            author: "Adebolu",
            role: "CEO, Bolu Autos",
            text: "VisioReach Concepts delivered beyond my expectations. The landing page was crisp, professional, and loaded super fast. My inquiries tripled within weeks!",
            initials: "AO",
            stars: 5,
          },
          {
            id: 2,
            author: "Fatima Kareem",
            role: "Product Manager, TechBase NG",
            text: "The admin dashboard built for our startup is incredibly clean and easy to use. The attention to detail in the UI was remarkable. Highly recommended!",
            initials: "FK",
            stars: 5,
          },
          {
            id: 3,
            author: "Chima Ezenwachi",
            role: "Owner, GadgetTrade NG",
            text: "My e-commerce store went from zero to professional overnight. The design is stunning on mobile and the checkout flow is so smooth. Great work!",
            initials: "CE",
            stars: 5,
          }
        ]);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-bone">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Client Love</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                What clients say.<span className="italic text-ink-500"> real feedback.</span>
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="relative border-t border-ink-100 pt-10">
          
          {/* Desktop Scroll Buttons */}
          <div className="absolute top-0 right-0 -mt-16 hidden md:flex gap-2">
            <button onClick={() => scroll('left')} className="w-12 h-12 border border-ink-200 flex items-center justify-center text-ink-600 hover:bg-ink-900 hover:text-bone hover:border-ink-900 transition-colors">
              ←
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 border border-ink-200 flex items-center justify-center text-ink-600 hover:bg-ink-900 hover:text-bone hover:border-ink-900 transition-colors">
              →
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testi, index) => (
              <FadeIn key={testi.id} direction="up" delay={index * 50} className="flex flex-col min-w-full md:min-w-[420px] snap-center border border-ink-100 p-8 hover:bg-white transition-colors shrink-0">
                <div className="mb-6 text-ink-900 text-sm">
                  {"★".repeat(testi.stars || 5)}
                </div>
                <p className="text-ink-800 text-base md:text-lg leading-[1.65] italic mb-10 flex-grow">
                  "{testi.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-ink-100">
                  <div className="w-10 h-10 flex items-center justify-center bg-ink-100 text-ink-900 font-serif font-bold text-sm">
                    {testi.initials || testi.author.charAt(0)}
                  </div>
                  <div>
                    <strong className="block font-serif text-ink-900 text-base">{testi.author}</strong>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-600">{testi.role}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="mt-2 flex justify-center md:hidden">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">← Swipe to view more →</span>
          </div>

        </div>

      </div>
    </section>
  );
}
