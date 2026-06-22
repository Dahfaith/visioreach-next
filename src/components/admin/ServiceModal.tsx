"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service?: any;
}

export default function ServiceModal({ isOpen, onClose, onSuccess, service }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon_class: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon_class: service.icon_class,
      });
    } else {
      setFormData({ title: "", description: "", icon_class: "" });
    }
  }, [service, isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (service) {
      await supabase.from('services').update(formData).eq('id', service.id);
    } else {
      await supabase.from('services').insert([formData]);
    }

    setLoading(false);
    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-5 overflow-y-auto">
      <div className="bg-bone border border-ink-100 p-8 w-full max-w-lg shadow-2xl my-auto">
        <h2 className="font-serif text-3xl text-ink-900 mb-8 pb-4 border-b border-ink-100">
          {service ? "Edit Service" : "Add Service"}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Service Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Icon Class (RemixIcon or BoxIcon)</label>
            <input required type="text" placeholder="e.g. bx bx-code-alt" value={formData.icon_class} onChange={e => setFormData({...formData, icon_class: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
            {formData.icon_class && (
               <div className="mt-2 flex items-center gap-3">
                 <span className="font-mono text-[10px] text-ink-500 uppercase">Preview:</span>
                 <i className={`${formData.icon_class} text-2xl text-ink-900`}></i>
               </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[120px] resize-y" />
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-ink-100">
            <button type="button" onClick={onClose} className="flex-1 border border-ink-200 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600 hover:bg-ink-100 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-ink-900 text-bone py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-flare transition-colors">
              {loading ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
