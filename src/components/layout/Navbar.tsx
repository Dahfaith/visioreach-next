"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${scrolled ? 'bg-bone/90 backdrop-blur-md border-b border-ink-100/10' : 'bg-transparent border-b border-transparent'}`}>
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-14 md:h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-ink-800 hover:text-ink-950 transition-colors">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-900 group-hover:bg-flare transition-colors"></span>
            <span>VisioReach</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              <li>
                <a href="#about" className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-700 hover:text-ink-950 transition-colors">
                  <span className="text-ink-400 mr-1.5">01</span>About
                </a>
              </li>
              <li>
                <a href="#services" className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-700 hover:text-ink-950 transition-colors">
                  <span className="text-ink-400 mr-1.5">02</span>Capabilities
                </a>
              </li>
              <li>
                <a href="#projects" className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-700 hover:text-ink-950 transition-colors">
                  <span className="text-ink-400 mr-1.5">03</span>Work
                </a>
              </li>
              <li>
                <a href="#contact" className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-700 hover:text-ink-950 transition-colors">
                  <span className="text-ink-400 mr-1.5">04</span>Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Status (Desktop) */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              </span>
              <span>Available · 2026</span>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center justify-center h-9 w-9 border border-ink-200 text-ink-800 hover:text-ink-950 hover:border-ink-500 transition-colors">
              <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'} text-xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 bg-bone pt-24 px-6 flex flex-col gap-8 transition-transform duration-500 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <a href="#about" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-ink-900 border-b border-ink-100 pb-4">
          <span className="font-mono text-sm text-ink-400 mr-4">01</span>About
        </a>
        <a href="#services" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-ink-900 border-b border-ink-100 pb-4">
          <span className="font-mono text-sm text-ink-400 mr-4">02</span>Capabilities
        </a>
        <a href="#projects" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-ink-900 border-b border-ink-100 pb-4">
          <span className="font-mono text-sm text-ink-400 mr-4">03</span>Work
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-ink-900 border-b border-ink-100 pb-4">
          <span className="font-mono text-sm text-ink-400 mr-4">04</span>Contact
        </a>
      </div>
    </>
  );
}
