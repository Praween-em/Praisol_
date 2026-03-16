'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Code2, Cpu, Database, Key, Terminal, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function ApiDocsPage() {
  const endpoints = [
    { method: 'GET', path: '/api/v1/sites', desc: 'List all deployed sites for your account.' },
    { method: 'POST', path: '/api/v1/deploy', desc: 'Trigger a new deployment via site config.' },
    { method: 'GET', path: '/api/v1/site/:slug', desc: 'Fetch full site data and configuration.' },
    { method: 'POST', path: '/api/v1/auth/otp', desc: 'Request an OTP for mobile authentication.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">REST API Reference</h3>
            <ul className="space-y-6">
              {[
                { label: 'Authentication', icon: <Key size={16} /> },
                { label: 'Site Management', icon: <Globe size={16} /> },
                { label: 'App Builds', icon: <Cpu size={16} /> },
                { label: 'Database Queries', icon: <Database size={16} /> },
              ].map(item => (
                <li key={item.label}>
                  <Link href="#" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                    <span className="text-indigo-500 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="font-bold">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-8 tracking-tight">API Reference</h1>
            <p className="text-zinc-400 text-lg mb-12 max-w-3xl leading-relaxed">
              Integrate PraiSol with your existing workflows using our powerful REST APIs. 
              Our APIs use standard HTTP response codes and JSON-encoded responses.
            </p>

            <div className="space-y-8 mb-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Terminal className="text-indigo-400" /> Endpoints
              </h2>
              {endpoints.map((ep, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-900 transition-all">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      ep.method === 'GET' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {ep.method}
                    </span>
                    <code className="text-white font-mono text-sm">{ep.path}</code>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{ep.desc}</p>
                  <Link href="#" className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                    View Specs <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>

            <section className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-4 mb-4">
                <Play className="text-green-500 fill-current" size={24} />
                <h3 className="text-xl font-bold">Try it out</h3>
              </div>
              <p className="text-zinc-500 text-sm mb-6">Explore our interactive API playground and test requests in real-time.</p>
              <button className="px-6 py-2 rounded-xl bg-zinc-800 text-white text-sm font-bold hover:bg-zinc-700 transition-colors">
                Open API Explorer
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Globe(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
