'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText, CheckCircle, Scale, Hammer, Zap } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto mb-8 shadow-lg shadow-purple-500/5">
            <FileText size={32} />
          </div>
          <h1 className="text-5xl font-black mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-zinc-500">Last updated: March 16, 2026</p>
        </div>

        <div className="space-y-12 text-zinc-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Hammer className="text-purple-400" size={24} /> 1. Platform Usage
            </h2>
            <p>
              By accessing PraiSol, you agree to use the platform for lawful purposes only. 
              You are responsible for all content published on your websites and mobile apps.
            </p>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <p className="text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">Prohibited Content:</p>
              <ul className="text-xs space-y-2 list-disc pl-4">
                <li>Illegal material or activities.</li>
                <li>Content that infringes on intellectual property.</li>
                <li>Hate speech or harassment.</li>
                <li>Malicious software or phishing sites.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="text-purple-400" size={24} /> 2. Free Plan & Deployments
            </h2>
            <p>
              Our free plan allows for one website deployment. We reserve the right to 
              limit resources or suspend sites that violate our usage policies or 
              excessively consume shared infrastructure resources.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Scale className="text-purple-400" size={24} /> 3. Liability
            </h2>
            <p>
              PraiSol provides the platform "as-is" without any express or implied warranties. 
              We are not liable for any data loss, downtime, or business interruption resulting 
              from the use of our builder or hosting services.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 flex items-start gap-4">
            <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
            <p className="text-sm m-0">
              By using PraiSol, you acknowledge that you have read, understood, and agree 
              to be bound by these terms. We may update these terms periodically.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
