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
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="flex flex-col">
            <FadeIn direction="up" delay={100}>
              <h2 className="font-serif text-4xl md:text-5xl text-ink-900 tracking-display mb-3">
                VisioReach<span className="text-flare">.</span>
              </h2>
              <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-12">
                FULLSTACK ENGINEER · DESIGN TO DEVELOPMENT
              </p>
              
              <ul className="space-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-800">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a href={social.url} target="_blank" rel="noreferrer" className="hover:text-flare transition-colors inline-flex items-center gap-2 group">
                      {social.platform_name} 
                      <span className="text-ink-400 group-hover:text-flare group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="flex flex-col justify-end mt-8 md:mt-auto h-full w-full md:w-auto items-start md:items-end">
            <FadeIn direction="up" delay={200}>
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                 className="font-mono text-[11px] uppercase tracking-[0.2em] text-flare hover:text-ink-900 transition-colors inline-flex items-center gap-2"
               >
                 <span className="text-lg leading-none mb-1">↑</span> BACK TO TOP
               </button>
            </FadeIn>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-ink-100 flex flex-col gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
            © {new Date().getFullYear()} GIDEON OLUWATOBI · VISIOREACH CONCEPTS. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
            LET'S BUILD SOMETHING GREAT.
          </p>
        </div>

      </div>
    </footer>
  );
}
