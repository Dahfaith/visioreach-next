"use client";
import React, { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabaseClient";

export default function About() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').single();
      if (data) {
        setProfile(data);
      }
    }
    fetchProfile();
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 bg-bone">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">01</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Overview</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                Digital craftsman.<span className="italic text-ink-500"> building modern tools.</span>
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">

          <div className="col-span-12 md:col-span-3">
            <FadeIn direction="up" delay={200}>
              <div className="aspect-[3/4] overflow-hidden bg-ink-100 w-full relative grayscale hover:grayscale-0 transition-all duration-700 border border-ink-100">
                <img
                  src={profile?.image_url || "/images/myself.jpg"}
                  alt="VisioReach Concepts"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-4">
            <FadeIn direction="up" delay={300} className="space-y-5 text-ink-800 text-base md:text-lg leading-[1.6] text-balance">
              <p>
                {profile?.bio_text_1 || "Hello! I'm Gideon Oluwatobi (Dahfaith) the creative force behind VisioReach Concepts — a digital brand dedicated to crafting visually stunning, high-performance websites and digital experiences. Based in Lagos, Nigeria, I bring brands to life through code and design."}
              </p>
              <p>
                {profile?.bio_text_2 || "I specialize in building fast, responsive, and aesthetically premium web solutions that help businesses grow their online presence and connect with their audience."}
              </p>
              <p className="text-ink-600">
                {profile?.bio_text_3 || "If you need a digital agency that can own the full journey — brand identity, user experience, and scalable architecture — we should talk."}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={400} className="mt-12 flex flex-col md:flex-row gap-6">
              <a href="#contact" className="inline-flex items-center gap-3 px-6 py-3 bg-ink-900 text-bone font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-flare transition-colors">
                <span>Contact Us</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href={profile?.resume_url || "/resume.html"} target="_blank" className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-ink-200 text-ink-900 font-mono text-[11px] uppercase tracking-[0.22em] hover:border-ink-900 transition-colors">
                <span>Download Resume</span>
              </a>
            </FadeIn>

            {/* Quick Facts */}
            <FadeIn direction="up" delay={500} className="mt-16 pt-10 border-t border-ink-100 grid grid-cols-2 gap-y-8 gap-x-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-2">Full Name</p>
                <p className="font-serif text-lg text-ink-900">Gideon Oluwatobi</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-2">Brand</p>
                <p className="font-serif text-lg text-ink-900">Visioreach Concepts</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-2">Based In</p>
                <p className="font-serif text-lg text-ink-900">Lagos, Nigeria</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-2">Open To</p>
                <p className="font-serif text-lg text-ink-900">Freelance & Full-time Roles</p>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
