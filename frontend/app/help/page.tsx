'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HelpCircle, MessageSquare, Video, BookOpen, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    { q: 'Is the platform really free?', a: 'Yes! You can build and deploy one website for free forever. Paid plans are available for custom domains and multiple sites.' },
    { q: 'Can I change my template later?', a: 'Currently, you can edit components within a template. To switch to a completely different template, you will need to create a new site.' },
    { q: 'How do I generate an Android app?', a: 'Navigate to your dashboard, select your site, and click "Build Android App". Our server will generate an APK for you.' },
    { q: 'Do you provide custom domains?', a: 'Yes, our Pro and Basic plans support connecting your own custom domains (e.g., yourschool.com).' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Help?</span></h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Find answers to frequently asked questions and learn how to make the most of PraiSol.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <Video className="text-red-400" />, title: 'Video Tutorials', desc: 'Step-by-step videos on building your first site.' },
            { icon: <BookOpen className="text-blue-400" />, title: 'Knowledge Base', desc: 'In-depth articles about every feature.' },
            { icon: <MessageSquare className="text-green-400" />, title: 'Community', desc: 'Join our WhatsApp group for community support.' },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center hover:bg-zinc-900 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{item.desc}</p>
              <Link href="#" className="text-white text-sm font-bold flex items-center justify-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-3">
                  <HelpCircle className="text-indigo-400 shrink-0" size={20} />
                  {faq.q}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
