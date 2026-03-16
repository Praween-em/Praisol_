'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Briefcase, Code, Palette, Search, Megaphone, HeartHandshake } from 'lucide-react';
import api from '@/lib/api';

export default function CareersPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const jobs = [
    { title: 'Frontend Developer', type: 'Full-time', location: 'Remote / Bhopal', icon: <Code size={20} /> },
    { title: 'UI/UX Designer', type: 'Full-time', location: 'Remote', icon: <Palette size={20} /> },
    { title: 'Backend Engineer', type: 'Contract', location: 'Bhopal', icon: <Briefcase size={20} /> },
    { title: 'QA Engineer', type: 'Full-time', location: 'Remote', icon: <Search size={20} /> },
    { title: 'Marketing Lead', type: 'Full-time', location: 'Bhopal', icon: <Megaphone size={20} /> },
    { title: 'Customer Success', type: 'Internship', location: 'Remote', icon: <HeartHandshake size={20} /> },
  ];

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post('/platform/career/apply', data);
      setSuccess(true);
      setShowForm(false);
      alert('Application submitted successfully!');
    } catch (err: any) {
      alert('Failed to submit application. Please try again or email us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            We are Hiring!
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Future of No-Code</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join our mission to empower millions with the tools to build their own digital identity. 
            We're looking for passionate creators to join our core team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {jobs.map((job, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-900 transition-all flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {job.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                  <div className="flex gap-3 text-xs text-zinc-500">
                    <span className="font-medium uppercase tracking-wider">{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleApply(job.title)}
                className="px-5 py-2 rounded-xl bg-zinc-800 text-white text-sm font-bold hover:bg-zinc-700 transition-colors"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Application Form */}
        {showForm && (
          <section id="application-form" className="mb-20 p-8 md:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Apply for <span className="text-indigo-400">{selectedJob}</span></h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white">Close</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
                  <input required name="name" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                  <input required name="email" type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="+91 8374950475" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Position</label>
                  <select name="position" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors text-zinc-200">
                    {jobs.map(j => <option key={j.title} value={j.title}>{j.title}</option>)}
                    <option value="Other">Other / Spontaneous</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Experience (Years)</label>
                  <input name="experience" type="number" min="0" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Portfolio / Resume Link</label>
                  <input name="resumeLink" type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="https://linkedin.com/in/johndoe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tell us about yourself</label>
                <textarea name="message" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="Briefly describe your background and why you want to join PraiSol..."></textarea>
              </div>

              <button 
                disabled={isSubmitting}
                className="py-4 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </section>
        )}

        <section className="p-12 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see a fit?</h2>
          <p className="text-zinc-500 mb-8">We're always looking for talented individuals. Drop us your resume at <b>info.praisol@gmail.com</b></p>
          <div className="flex justify-center flex-wrap gap-8 md:gap-12 text-sm text-zinc-400">
            <div>🚀 Fast-paced growth</div>
            <div>🎨 Creative freedom</div>
            <div>🌍 Remote options</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
