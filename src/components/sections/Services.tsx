"use client";
import React, { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabaseClient";

export default function Services() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (data) setServices(data);
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">02</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Capabilities</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                Digital solutions.<span className="italic text-ink-500"> end-to-end.</span>
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
              <p className="mt-4 max-w-2xl text-ink-700 text-sm md:text-base leading-relaxed">
                From concept to deployment. We build robust systems that perform perfectly across all devices and scale effortlessly.
              </p>
            </FadeIn>
          </div>
        </header>

        <div className="border-t border-ink-100">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={index * 100} className="grid grid-cols-12 gap-x-6 items-baseline border-b border-ink-100 py-6 md:py-8">
              
              <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 flex items-center gap-4 mb-4 md:mb-0">
                <span className="text-ink-400">{String(index + 1).padStart(2, '0')}</span>
                <i className={`${service.icon_class} text-xl text-ink-900`}></i>
              </div>
              
              <div className="col-span-12 md:col-span-9 mt-2 md:mt-0 flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
                <span className="font-serif text-xl md:text-2xl text-ink-900 w-full md:w-1/3">
                  {service.title}
                </span>
                <span className="text-ink-700 text-sm leading-relaxed max-w-prose w-full md:w-2/3">
                  {service.description}
                </span>
              </div>

            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
