'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Book, FileText, Code2, Search, ArrowRight, Layers, Smartphone, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    { 
      title: 'Getting Started', 
      icon: <Rocket size={20} />, 
      links: ['Introduction', 'First Website', 'Domain Setup', 'Admin Access'] 
    },
    { 
      title: 'Visual Builder', 
      icon: <Layers size={20} />, 
      links: ['Components', 'Styling', 'Pages', 'Global Settings'] 
    },
    { 
      title: 'App Builder', 
      icon: <Smartphone size={20} />, 
      links: ['APK Generation', 'App Config', 'Play Store Upload'] 
    },
    { 
      title: 'Integrations', 
      icon: <Globe size={20} />, 
      links: ['Messaging', 'Analytics', 'Payments', 'Custom Code'] 
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Documentation</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input 
              type="text" 
              placeholder="Search guides, components, or API reference..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-lg outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {sections.map((section, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-zinc-500 hover:text-indigo-400 transition-colors flex items-center justify-between group">
                      {link}
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold uppercase tracking-wider" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/api-docs" className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-600/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <Code2 className="text-indigo-400" />
              <h2 className="text-2xl font-bold">API Reference</h2>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Detailed technical guides for integrating our platform via REST APIs. 
              Ideal for developers and advanced users.
            </p>
          </Link>
          <Link href="/help" className="group p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="text-purple-400" />
              <h2 className="text-2xl font-bold">Help Center</h2>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Frequently asked questions, troubleshooting tips, and tutorial 
              videos for common use cases.
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Rocket(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.59.79-1.47.79-1.47l-1.47-1.47s-.88.08-1.47.79z" />
      <path d="M12 15l-3-3m1.35-2.35L15 4c1-1 2-1 3 0s1 2 0 3l-5.65 5.65c-.03.03-.06.06-.09.09l-.49.49a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.1 1.1 0 0 0 .14-.14z" />
      <path d="M11 20l-1-1" />
      <path d="M15 15l-1-1" />
      <path d="M16 8l-2-2" />
      <path d="M20 12l-2-2" />
    </svg>
  );
}
