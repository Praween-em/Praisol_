'use client';

import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Twitter, Github, Linkedin, 
  Instagram, School, GraduationCap, Building2, Smartphone 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950 text-zinc-400 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <img 
              src="/logo.png" 
              alt="PraiSol Logo" 
              className="w-10 h-10 object-contain transition-transform group-hover:scale-110" 
            />
            <span className="font-extrabold text-2xl tracking-tight text-white">
              PraiSol
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Empowering institutions and businesses with professional, no-code websites and native mobile apps. Build freely, grow confidently.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-default">
              <Mail size={18} className="text-indigo-500" />
              <span>support@praisol.online</span>
            </div>
            <div className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-default">
              <Phone size={18} className="text-indigo-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-default">
              <MapPin size={18} className="text-indigo-500" />
              <span>Bhopal, India</span>
            </div>
          </div>
        </div>

        {/* Systems Section */}
        <div>
          <h3 className="text-white font-bold mb-6">Our Systems</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/templates?category=school" className="flex items-center gap-2 hover:text-white transition-colors">
                <School size={16} /> School Management
              </Link>
            </li>
            <li>
              <Link href="/templates?category=college" className="flex items-center gap-2 hover:text-white transition-colors">
                <GraduationCap size={16} /> College Platform
              </Link>
            </li>
            <li>
              <Link href="/templates?category=business" className="flex items-center gap-2 hover:text-white transition-colors">
                <Building2 size={16} /> Business E-commerce
              </Link>
            </li>
            <li>
              <Link href="/playground" className="flex items-center gap-2 hover:text-white transition-colors">
                <Smartphone size={16} /> Android App Builder
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-white font-bold mb-6">Resources</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            </li>
            <li>
              <Link href="/templates" className="hover:text-white transition-colors">Website Templates</Link>
            </li>
            <li>
              <Link href="/playground" className="hover:text-white transition-colors">Visual Builder</Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
            </li>
            <li>
              <Link href="/api-docs" className="hover:text-white transition-colors">API References</Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-white font-bold mb-6">Company</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white transition-colors flex items-center gap-2">
                Careers 
                <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/20 font-bold uppercase transition-colors group-hover:bg-indigo-500/20">Hiring</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">Contact Sales</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <p>© 2026 PraiSol. All rights reserved. Built with ❤️ for Bharat.</p>
        
        <div className="flex items-center gap-6">
          <Link href="https://twitter.com/praisol" className="hover:text-white transition-colors" aria-label="Twitter">
            <Twitter size={20} />
          </Link>
          <Link href="https://github.com/Praween-em" className="hover:text-white transition-colors" aria-label="GitHub">
            <Github size={20} />
          </Link>
          <Link href="https://linkedin.com/company/praisol" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </Link>
          <Link href="https://instagram.com/praisol" className="hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
