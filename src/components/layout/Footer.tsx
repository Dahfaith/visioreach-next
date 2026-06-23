"use client";
import React, { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabaseClient";

export default function Footer() {
  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSocials() {
      const { data } = await supabase.from('socials').select('*').order('created_at', { ascending: true });
      if (data && data.length > 0) {
        setSocials(data);
      } else {
        // Fallback dummy data if table is empty or missing
        setSocials([
          { id: 1, platform_name: "Twitter (X)", url: "#" },
          { id: 2, platform_name: "LinkedIn", url: "#" },
          { id: 3, platform_name: "GitHub", url: "#" },
          { id: 4, platform_name: "Instagram", url: "#" },
        ]);
      }
    }
    fetchSocials();
  }, []);

  return (
    <footer id="contact" className="bg-bone border-t border-ink-100 pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <FadeIn direction="up" delay={100}>
              <h2 className="font-serif text-3xl md:text-5xl text-ink-900 tracking-display mb-4">
                Let's talk about your next project.
              </h2>
              <p className="text-ink-600 text-sm leading-relaxed max-w-sm mb-8">
                Whether you need a full digital overhaul or a custom scalable product, we are ready to bring your vision to production.
              </p>
              
              <a href="mailto:visioreach@gmail.com" className="inline-flex items-center gap-3 px-6 py-3 bg-ink-900 text-bone font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-flare transition-colors">
                <span>visioreach@gmail.com</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </FadeIn>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-2 lg:col-start-8">
            <FadeIn direction="up" delay={200}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-6">Socials</h3>
              <ul className="space-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-800">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a href={social.url} target="_blank" rel="noreferrer" className="hover:text-flare transition-colors">
                      {social.platform_name}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <FadeIn direction="up" delay={300}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-6">Index</h3>
              <ul className="space-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-800">
                <li><a href="#about" className="hover:text-flare transition-colors">01 About</a></li>
                <li><a href="#services" className="hover:text-flare transition-colors">02 Capabilities</a></li>
                <li><a href="#projects" className="hover:text-flare transition-colors">03 Work</a></li>
                <li><a href="#contact-form" className="hover:text-flare transition-colors">04 Contact</a></li>
              </ul>
            </FadeIn>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-ink-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
            © {new Date().getFullYear()} VisioReach Concepts.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
            Built with Next.js & Tailwind.
          </p>
        </div>

      </div>
    </footer>
  );
}
