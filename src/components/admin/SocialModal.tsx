"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  social?: any;
}

export default function SocialModal({ isOpen, onClose, onSuccess, social }: SocialModalProps) {
  const [formData, setFormData] = useState({
    platform_name: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (social) {
      setFormData({
        platform_name: social.platform_name,
        url: social.url,
      });
    } else {
      setFormData({ platform_name: "", url: "" });
    }
  }, [social, isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (social) {
      await supabase.from('socials').update(formData).eq('id', social.id);
    } else {
      await supabase.from('socials').insert([formData]);
    }

    setLoading(false);
    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-5">
      <div className="bg-bone border border-ink-100 p-8 w-full max-w-md shadow-2xl">
        <h2 className="font-serif text-3xl text-ink-900 mb-8 pb-4 border-b border-ink-100">
          {social ? "Edit Social Link" : "Add Social Link"}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Platform Name</label>
            <input required type="text" placeholder="e.g. GitHub" value={formData.platform_name} onChange={e => setFormData({...formData, platform_name: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">URL</label>
            <input required type="url" placeholder="https://..." value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-ink-100">
            <button type="button" onClick={onClose} className="flex-1 border border-ink-200 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600 hover:bg-ink-100 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-ink-900 text-bone py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-flare transition-colors">
              {loading ? "Saving..." : "Save Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
