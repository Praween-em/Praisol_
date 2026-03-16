'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, CheckCircle, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-8 shadow-lg shadow-indigo-500/5">
            <Shield size={32} />
          </div>
          <h1 className="text-5xl font-black mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500">Last updated: March 16, 2026</p>
        </div>

        <div className="space-y-12 text-zinc-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Eye className="text-indigo-400" size={24} /> 1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create an account, build a website, 
              or contact us for support. This includes your name, email address, phone number, and any 
              content you upload to your sites.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account credentials and profile information.</li>
              <li>Website content (images, text, data).</li>
              <li>Usage statistics and technical logs.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Lock className="text-indigo-400" size={24} /> 2. How We Use Data
            </h2>
            <p>
              Your data is used solely to provide and improve the PraiSol experience. We do not sell your 
              personal information to third parties. We use data to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Deploy and host your websites.',
                'Generate Android mobile apps.',
                'Provide customer support.',
                'Ensure security and prevent fraud.',
                'Personalize your builder experience.',
                'Send important account notifications.'
              ].map(f => (
                <div key={f} className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                  <CheckCircle className="text-green-500 shrink-0" size={16} />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertCircle className="text-indigo-400" size={24} /> 3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your data. All communication 
              is encrypted via SSL, and your databases are isolated per tenant to prevent unauthorized access.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
            <h3 className="text-white font-bold mb-4 italic">Questions?</h3>
            <p className="text-sm mb-0">
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer 
              at <b>privacy@praisol.online</b>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
