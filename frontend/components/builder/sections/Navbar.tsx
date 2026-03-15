'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';
import { ChevronRight } from 'lucide-react';

export interface NavbarProps {
  logoText?: string;
  links?: { label: string; href: string }[];
  backgroundColor?: string;
  showCTA?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
  sticky?: boolean;
}

export const Navbar = ({ 
  logoText = 'PraiSol', 
  links = [], 
  backgroundColor = '#09090b',
  showCTA = true,
  ctaLabel = 'Get Started',
  ctaLink = '/contact',
  sticky = true 
}: NavbarProps) => {
  const { onNavigate } = useBuilderContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href.replace('/', ''));
    }
    setMobileOpen(false);
  };

  return (
    <nav 
      style={{ backgroundColor }}
      className={`
        relative z-50 border-b border-zinc-800/50
        ${sticky ? 'sticky top-0 backdrop-filter backdrop-blur-xl bg-opacity-80' : ''}
      `}
    >
      {/* Desktop + Mobile Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {logoText[0]}
          </div>
          <span className="font-bold text-lg sm:text-xl text-zinc-100">{logoText}</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {links.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {showCTA && (
            <Link href={ctaLink} onClick={(e) => handleLinkClick(e, ctaLink)}>
              <Button size="sm">
                {ctaLabel}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Slide-out Drawer */}
      <div 
        className={`
          fixed inset-0 z-[60] md:hidden transition-all duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        
        {/* Drawer Content */}
        <div 
          className={`
            absolute top-0 right-0 bottom-0 w-[280px] transition-transform duration-300 transform
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
            flex flex-col
          `}
          style={{ backgroundColor: '#09090b', borderLeft: '1px solid #27272a' }}
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
            <span className="font-bold text-lg text-zinc-100">{logoText}</span>
            <button 
              onClick={() => setMobileOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {links.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-medium text-zinc-400 hover:text-indigo-400 transition-colors py-2 flex items-center justify-between group"
              >
                {link.label}
                <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>

          {showCTA && (
            <div className="p-6 border-t border-zinc-800/50">
              <Link 
                href={ctaLink} 
                onClick={(e) => handleLinkClick(e, ctaLink)}
              >
                <Button size="lg" className="w-full justify-center shadow-lg shadow-indigo-500/20">
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

