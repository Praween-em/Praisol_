'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';

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

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div 
          className="md:hidden border-t border-zinc-800/50 px-4 pb-4"
          style={{ backgroundColor }}
        >
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors py-2.5 px-3 rounded-lg hover:bg-zinc-800/50"
              >
                {link.label}
              </Link>
            ))}
            {showCTA && (
              <Link 
                href={ctaLink} 
                onClick={(e) => handleLinkClick(e, ctaLink)}
                className="mt-2"
              >
                <Button size="sm" className="w-full justify-center">
                  {ctaLabel}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

