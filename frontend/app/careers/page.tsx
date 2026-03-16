'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Briefcase, Code, Palette, Search, Megaphone, HeartHandshake } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { title: 'Frontend Developer', type: 'Full-time', location: 'Remote / Bhopal', icon: <Code size={20} /> },
    { title: 'UI/UX Designer', type: 'Full-time', location: 'Remote', icon: <Palette size={20} /> },
    { title: 'Backend Engineer', type: 'Contract', location: 'Bhopal', icon: <Briefcase size={20} /> },
    { title: 'QA Engineer', type: 'Full-time', location: 'Remote', icon: <Search size={20} /> },
    { title: 'Marketing Lead', type: 'Full-time', location: 'Bhopal', icon: <Megaphone size={20} /> },
    { title: 'Customer Success', type: 'Internship', location: 'Remote', icon: <HeartHandshake size={20} /> },
  ];

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
              <button className="px-5 py-2 rounded-xl bg-zinc-800 text-white text-sm font-bold hover:bg-zinc-700 transition-colors">
                Apply
              </button>
            </div>
          ))}
        </div>

        <section className="p-12 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see a fit?</h2>
          <p className="text-zinc-500 mb-8">We're always looking for talented individuals. Drop us your resume at <b>careers@praisol.online</b></p>
          <div className="flex justify-center gap-12 text-sm text-zinc-400">
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
