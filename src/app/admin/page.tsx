"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import ProjectModal from "@/components/admin/ProjectModal";
import ServiceModal from "@/components/admin/ServiceModal";
import TestimonialModal from "@/components/admin/TestimonialModal";
import SocialModal from "@/components/admin/SocialModal";

type TabType = "projects" | "services" | "testimonials" | "socials" | "profile";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);
  const [editingTesti, setEditingTesti] = useState<any>(null);

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<any>(null);
  
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchProjects();
    fetchServices();
    fetchTestimonials();
    fetchSocials();
    fetchProfile();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      setUser(session.user);
      setLoading(false);
    }
  }

  async function fetchProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  }

  async function fetchServices() {
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
    if (data) setServices(data);
  }

  async function fetchTestimonials() {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
  }

  async function fetchSocials() {
    const { data } = await supabase.from('socials').select('*').order('created_at', { ascending: true });
    if (data) setSocials(data);
  }

  async function fetchProfile() {
    const { data } = await supabase.from('profile').select('*').single();
    if (data) setProfile(data);
  }

  async function handleDeleteProject(id: string) {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  }

  async function handleDeleteService(id: string) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    await supabase.from('services').delete().eq('id', id);
    fetchServices();
  }

  async function handleDeleteTestimonial(id: string) {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchTestimonials();
  }

  async function handleDeleteSocial(id: string) {
    if (!window.confirm("Are you sure you want to delete this social link?")) return;
    await supabase.from('socials').delete().eq('id', id);
    fetchSocials();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return <div className="min-h-screen bg-bone flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">Loading Admin...</div>;
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "testimonials", label: "Testimonials" },
    { id: "socials", label: "Socials" },
    { id: "profile", label: "Profile" }
  ];

  return (
    <div className="min-h-screen bg-bone text-ink-900 font-sans selection:bg-ink-900 selection:text-bone">
      
      {/* Header */}
      <header className="border-b border-ink-100 px-6 py-5 flex justify-between items-center bg-bone sticky top-0 z-40">
        <h1 className="font-serif text-2xl tracking-tight text-ink-900">
          VisioReach <span className="italic text-ink-500">Admin.</span>
        </h1>
        <button 
          onClick={handleLogout} 
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-600 hover:text-ink-900 transition-colors border border-ink-200 px-4 py-2 hover:border-ink-900"
        >
          Logout
        </button>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-ink-100 pb-6">
          <div className="flex gap-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {tabs.map(tab => (
              <h2 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`font-serif text-2xl md:text-3xl cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "text-ink-900" : "text-ink-400 hover:text-ink-600"
                }`}
              >
                {tab.label}
              </h2>
            ))}
          </div>
          
          {activeTab !== "profile" && (
            <button 
              onClick={() => {
                if (activeTab === "projects") { setEditingProject(null); setIsProjectModalOpen(true); }
                if (activeTab === "services") { setEditingService(null); setIsServiceModalOpen(true); }
                if (activeTab === "testimonials") { setEditingTesti(null); setIsTestiModalOpen(true); }
                if (activeTab === "socials") { setEditingSocial(null); setIsSocialModalOpen(true); }
              }}
              className="bg-ink-900 text-bone px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] hover:bg-flare transition-colors whitespace-nowrap"
            >
              + Add New {activeTab.slice(0, -1)}
            </button>
          )}
        </div>

        {/* Tab Contents */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="border border-ink-100 group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-ink-100 border-b border-ink-100 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={project.image_url || "https://placehold.co/600x400/EAE8E3/1C1C1A?text=No+Image"} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif text-2xl text-ink-900 mb-2">{project.title}</h3>
                  <p className="text-ink-600 text-sm mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex gap-3 mt-auto pt-4 border-t border-ink-100">
                    <button onClick={() => { setEditingProject(project); setIsProjectModalOpen(true); }} className="flex-1 border border-ink-200 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-ink-100 transition-colors">Edit</button>
                    <button onClick={() => handleDeleteProject(project.id)} className="flex-1 border border-red-200 text-red-600 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-red-50 transition-colors">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="border border-ink-100 p-8 flex flex-col hover:bg-ink-100/30 transition-colors">
                <i className={`${service.icon_class} text-3xl text-ink-900 mb-6 block`}></i>
                <h3 className="font-serif text-2xl text-ink-900 mb-3">{service.title}</h3>
                <p className="text-ink-600 text-sm mb-8 line-clamp-3">{service.description}</p>
                <div className="flex gap-3 mt-auto pt-6 border-t border-ink-100">
                  <button onClick={() => { setEditingService(service); setIsServiceModalOpen(true); }} className="flex-1 border border-ink-200 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-ink-100 transition-colors">Edit</button>
                  <button onClick={() => handleDeleteService(service.id)} className="flex-1 border border-red-200 text-red-600 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(testi => (
              <div key={testi.id} className="border border-ink-100 p-8 flex flex-col bg-bone hover:bg-ink-100/30 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-ink-900 text-sm">{"★".repeat(testi.stars || 5)}</span>
                  <span className="font-serif font-bold text-ink-900 bg-ink-100 w-8 h-8 flex items-center justify-center">{testi.initials}</span>
                </div>
                <h3 className="font-serif text-xl text-ink-900 mb-1">{testi.author}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500 mb-6 block">{testi.role}</span>
                <p className="text-ink-800 italic text-sm mb-8 line-clamp-4">"{testi.text}"</p>
                <div className="flex gap-3 mt-auto pt-6 border-t border-ink-100">
                  <button onClick={() => { setEditingTesti(testi); setIsTestiModalOpen(true); }} className="flex-1 border border-ink-200 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-ink-100 transition-colors">Edit</button>
                  <button onClick={() => handleDeleteTestimonial(testi.id)} className="flex-1 border border-red-200 text-red-600 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "socials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socials.map(social => (
              <div key={social.id} className="border border-ink-100 p-6 flex flex-col justify-between hover:bg-ink-100/30 transition-colors gap-6">
                <div>
                  <h3 className="font-serif text-xl text-ink-900 mb-2">{social.platform_name}</h3>
                  <a href={social.url} target="_blank" rel="noreferrer" className="font-mono text-[11px] text-ink-500 hover:text-ink-900 truncate block">{social.url}</a>
                </div>
                <div className="flex gap-3 pt-4 border-t border-ink-100">
                  <button onClick={() => { setEditingSocial(social); setIsSocialModalOpen(true); }} className="flex-1 border border-ink-200 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-ink-100 transition-colors">Edit</button>
                  <button onClick={() => handleDeleteSocial(social.id)} className="flex-1 border border-red-200 text-red-600 py-2 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl border border-ink-100 p-8 bg-bone">
            <h3 className="font-serif text-3xl text-ink-900 mb-8 pb-4 border-b border-ink-100">Edit Profile</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const profileData = profile || { id: 1 };
              await supabase.from('profile').upsert([profileData]);
              alert("Profile saved successfully!");
            }} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Image URL</label>
                <input type="text" value={profile?.image_url || ""} onChange={e => setProfile({...profile, image_url: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
                {profile?.image_url && <img src={profile.image_url} alt="Preview" className="w-24 h-24 object-cover grayscale mt-2 border border-ink-100" />}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Resume URL</label>
                <input type="text" value={profile?.resume_url || ""} onChange={e => setProfile({...profile, resume_url: e.target.value})} placeholder="e.g. /resume.html" className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Bio Text (Paragraph 1)</label>
                <textarea value={profile?.bio_text_1 || ""} onChange={e => setProfile({...profile, bio_text_1: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[120px] resize-y" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Bio Text (Paragraph 2)</label>
                <textarea value={profile?.bio_text_2 || ""} onChange={e => setProfile({...profile, bio_text_2: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[120px] resize-y" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">Bio Text (Paragraph 3)</label>
                <textarea value={profile?.bio_text_3 || ""} onChange={e => setProfile({...profile, bio_text_3: e.target.value})} className="border border-ink-200 p-3 bg-transparent text-ink-900 focus:outline-none focus:border-ink-900 transition-colors min-h-[120px] resize-y" />
              </div>

              <button type="submit" className="bg-ink-900 text-bone px-6 py-4 mt-4 font-mono text-[11px] uppercase tracking-[0.15em] hover:bg-flare transition-colors">
                Save Profile
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Modals are kept hidden if false, they manage their own styling but we'll update them next */}
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onSuccess={fetchProjects}
        project={editingProject}
      />

      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        onSuccess={fetchServices}
        service={editingService}
      />

      <TestimonialModal 
        isOpen={isTestiModalOpen} 
        onClose={() => setIsTestiModalOpen(false)} 
        onSuccess={fetchTestimonials}
        testimonial={editingTesti}
      />

      <SocialModal 
        isOpen={isSocialModalOpen} 
        onClose={() => setIsSocialModalOpen(false)} 
        onSuccess={fetchSocials}
        social={editingSocial}
      />
    </div>
  );
}
