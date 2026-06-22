"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import FadeIn from "@/components/ui/FadeIn";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        "service_s9b66n4",
        "template_8w82n58",
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          service: formData.service,
          message: formData.message,
        },
        "zD-hWj55776077qH5"
      );
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact-form" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 md:pt-8 mb-16">
          <FadeIn direction="up" delay={100} className="col-span-12 md:col-span-3 flex items-start gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">04</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Contact</span>
          </FadeIn>
          <div className="col-span-12 md:col-span-9">
            <FadeIn direction="up" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-display text-ink-900 text-balance">
                Let's work together.
              </h2>
            </FadeIn>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-ink-100 pt-10">
          
          <div className="col-span-12 md:col-span-4">
            <FadeIn direction="up" delay={300}>
              <h3 className="font-serif text-2xl text-ink-900 mb-4">Direct Lines</h3>
              <p className="text-ink-700 text-sm mb-8 leading-relaxed">
                If you prefer to skip the form, you can reach us directly via email or WhatsApp.
              </p>
              
              <div className="flex flex-col gap-6">
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2">Location</span>
                  <p className="text-ink-900">Lagos, Nigeria</p>
                </div>
                
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2">WhatsApp</span>
                  <a href="https://wa.me/message/P24GXY7J6HCKL1" target="_blank" rel="noreferrer" className="text-ink-900 hover:text-flare transition-colors">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FadeIn direction="up" delay={400}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="bg-transparent border-b border-ink-200 py-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors placeholder:text-ink-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="bg-transparent border-b border-ink-200 py-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors placeholder:text-ink-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Subject</label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="bg-transparent border-b border-ink-200 py-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors placeholder:text-ink-300"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Service Needed</label>
                    <select 
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="bg-transparent border-b border-ink-200 py-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-ink-300">Select a service...</option>
                      <option value="Web Development" className="bg-bone text-ink-900">Web Development</option>
                      <option value="Branding" className="bg-bone text-ink-900">Branding</option>
                      <option value="UI/UX Design" className="bg-bone text-ink-900">UI/UX Design</option>
                      <option value="SEO Optimization" className="bg-bone text-ink-900">SEO Optimization</option>
                      <option value="Other" className="bg-bone text-ink-900">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Message *</label>
                  <textarea 
                    required 
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="bg-transparent border-b border-ink-200 py-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[120px] resize-y placeholder:text-ink-300"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-ink-900 text-bone font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-flare transition-colors disabled:opacity-50"
                  >
                    <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>

                {status === "success" && (
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-600">
                    Message sent! We'll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-red-600">
                    Something went wrong. Please try WhatsApp instead.
                  </p>
                )}
                
              </form>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
