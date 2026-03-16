'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Users, Target, Rocket, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Our Mission is to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Democratize the Web</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            PraiSol empowers schools, colleges, and local businesses to establish a 
            professional digital presence without high costs or technical complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: <Target className="text-indigo-400" />, title: 'Our Goal', desc: 'To provide every institution in Bharat with a world-class website and mobile app.' },
            { icon: <Users className="text-purple-400" />, title: 'User First', desc: 'Designed for non-technical users to manage their digital assets with ease.' },
            { icon: <Rocket className="text-pink-400" />, title: 'Fast Growth', desc: 'From setup to deployment in under 10 minutes. Zero code required.' },
            { icon: <Award className="text-amber-400" />, title: 'Quality', desc: 'Premium designs that ensure your brand looks professional and trustworthy.' },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center mb-6 border border-zinc-800">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="relative p-12 rounded-3xl overflow-hidden bg-indigo-600/5 border border-indigo-500/20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10">Born in Bharat, Built for the World</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto leading-relaxed relative z-10 mb-8">
            Starting from a small vision in Bhopal, PraiSol has grown into a powerful platform 
            supporting hundreds of schools and businesses. We believe that technology should 
            be an enabler, not a barrier.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <div className="px-6 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold">100+ Sites Deployed</div>
            <div className="px-6 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold">50k+ Active Users</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
