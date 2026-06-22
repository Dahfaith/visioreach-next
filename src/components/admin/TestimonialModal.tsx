"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  testimonial?: any;
}

export default function TestimonialModal({ isOpen, onClose, onSuccess, testimonial }: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    author: "",
    role: "",
    text: "",
    initials: "",
    stars: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        author: testimonial.author,
        role: testimonial.role || "",
        text: testimonial.text,
        initials: testimonial.initials || "",
        stars: testimonial.stars || 5,
      });
    } else {
      setFormData({ author: "", role: "", text: "", initials: "", stars: 5 });
    }
  }, [testimonial, isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (testimonial) {
      await supabase.from('testimonials').update(formData).eq('id', testimonial.id);
    } else {
      await supabase.from('testimonials').insert([formData]);
    }

    setLoading(false);
    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-5">
      <div className="bg-bone border border-ink-100 p-8 w-full max-w-lg shadow-2xl">
        <h2 className="font-serif text-3xl text-ink-900 mb-8 pb-4 border-b border-ink-100">
          {testimonial ? "Edit Testimonial" : "Add Testimonial"}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Author Name</label>
              <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
            </div>
            
            <div className="flex flex-col gap-2 w-24">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Initials</label>
              <input type="text" maxLength={2} value={formData.initials} onChange={e => setFormData({...formData, initials: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors text-center" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Role / Company</label>
              <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
            </div>
            
            <div className="flex flex-col gap-2 w-24">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Stars</label>
              <input type="number" min="1" max="5" value={formData.stars} onChange={e => setFormData({...formData, stars: Number(e.target.value)})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors text-center" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Review Text</label>
            <textarea required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[100px] resize-y" />
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-ink-100">
            <button type="button" onClick={onClose} className="flex-1 border border-ink-200 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600 hover:bg-ink-100 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-ink-900 text-bone py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-flare transition-colors">
              {loading ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
