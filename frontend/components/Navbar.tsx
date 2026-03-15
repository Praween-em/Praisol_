'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isLoggedIn } from '@/lib/auth';
import { Menu, X, ChevronDown, Layers, Play } from 'lucide-react';

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav className="sticky top-0 z-[100] border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="PraiSol Logo" 
                className="w-8 h-8 object-contain transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              PraiSol
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Templates
            </Link>
            {!loggedIn && (
              <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Sign In
              </Link>
            )}
            
            <Link 
              href={loggedIn ? "/dashboard" : "/playground"} 
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              {loggedIn ? 'Dashboard' : 'Get Started Free'}
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-3">
            <Link 
              href={loggedIn ? "/dashboard" : "/playground"} 
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/10"
            >
              {loggedIn ? 'Dashboard' : 'Start'}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/templates" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-zinc-300 hover:text-indigo-400 transition-colors"
            >
              Templates
            </Link>
            {!loggedIn && (
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-zinc-300 hover:text-indigo-400 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
