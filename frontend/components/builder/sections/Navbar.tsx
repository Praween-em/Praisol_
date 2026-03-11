'use client';
import React from 'react';
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

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href.replace('/', '')); // Remove leading slash for page ID
    }
  };

  return (
    <nav 
      style={{ backgroundColor }}
      className={`
        flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 z-50
        ${sticky ? 'sticky top-0 backdrop-filter backdrop-blur-xl bg-opacity-80' : ''}
      `}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {logoText[0]}
        </div>
        <span className="font-bold text-xl text-zinc-100">{logoText}</span>
      </div>
      
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

      <div className="md:hidden text-zinc-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </nav>
  );
};
