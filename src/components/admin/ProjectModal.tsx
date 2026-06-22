"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectModal({ isOpen, onClose, onSuccess, project }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    live_url: "",
    github_url: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        live_url: project.live_url || "",
        github_url: project.github_url || "",
        image_url: project.image_url || "",
      });
    } else {
      setFormData({ title: "", description: "", category: "", live_url: "", github_url: "", image_url: "" });
    }
  }, [project, isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (project) {
      await supabase.from('projects').update(formData).eq('id', project.id);
    } else {
      await supabase.from('projects').insert([formData]);
    }

    setLoading(false);
    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-5 overflow-y-auto">
      <div className="bg-bone border border-ink-100 p-8 w-full max-w-xl shadow-2xl my-auto">
        <h2 className="font-serif text-3xl text-ink-900 mb-8 pb-4 border-b border-ink-100">
          {project ? "Edit Project" : "Add Project"}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[100px] resize-y" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Category (Comma-separated)</label>
            <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Web Development, Landing Page" className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Live URL</label>
              <input type="text" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">GitHub URL</label>
              <input type="text" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Image URL</label>
            <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
            {formData.image_url && <img src={formData.image_url} alt="Preview" className="w-full h-32 object-cover grayscale mt-2 border border-ink-100" />}
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-ink-100">
            <button type="button" onClick={onClose} className="flex-1 border border-ink-200 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600 hover:bg-ink-100 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-ink-900 text-bone py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-flare transition-colors">
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
