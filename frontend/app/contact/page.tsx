'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              Have questions about our platform or need a custom solution? 
              Our team is here to help you get started.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Mail />, title: 'Email Us', value: 'info.praisol@gmail.com', sub: 'We reply within 24 hours' },
                { icon: <Phone />, title: 'Call Us', value: '+91 8374950475', sub: 'Mon-Fri, 10am-6pm IST' },
                { icon: <MessageCircle />, title: 'WhatsApp', value: '+91 8374950475', sub: 'Instant support for Pro users' },
                { icon: <MapPin />, title: 'Office', value: 'Anantapur, Andhra Pradesh', sub: 'India' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white font-medium">{item.value}</p>
                    <p className="text-zinc-500 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="flex-1 lg:max-w-lg">
            <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-2xl">
              <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name</label>
                    <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
                    <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Subject</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors text-zinc-400">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales & Partnerships</option>
                    <option>Billing Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Message</label>
                  <textarea rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
