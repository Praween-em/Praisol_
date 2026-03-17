'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';
import { Menu, X, ArrowRight } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';
import { NavbarProps } from './Navbar';

export const NavbarGlass = ({ 
  id = '',
  logoText = 'PraiSol', 
  links = [], 
  backgroundColor = '#000000',
  showCTA = true,
  ctaLabel = 'Sign Up',
  ctaLink = '/signup',
  sticky = true 
}: NavbarProps) => {
  const { onNavigate } = useBuilderContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href.replace('/', ''));
    }
    setMobileOpen(false);
  };

  const LogoSection = () => (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
        <span className="font-black text-xl">{logoText[0]}</span>
      </div>
      <span className="font-extrabold text-xl text-white tracking-tighter">
        <EditableText id={id} propKey="logoText" value={logoText} />
      </span>
    </div>
  );

  const DesktopView = () => (
    <div className="hidden lg:flex items-center justify-between px-6">
      <LogoSection />

      {/* Center Links */}
      <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-1 border border-white/5">
        {links.map((link, idx) => (
          <Link 
            key={idx} 
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-all rounded-xl hover:bg-white/5 whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Action */}
      <div className="block">
        {showCTA && (
          <Link href={ctaLink} onClick={(e) => handleLinkClick(e, ctaLink)}>
            <Button size="sm" className="rounded-xl bg-white text-black hover:bg-zinc-200 px-6">
              {ctaLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="lg:hidden w-full">
      <div className="flex items-center justify-between px-6 relative z-[101]">
        <LogoSection />
        <button 
          className="p-2 text-white bg-white/10 rounded-xl ml-auto active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 py-8 space-y-3">
          {links.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/50 transition-all group"
            >
              <span className="text-xl font-bold text-white">{link.label}</span>
              <ArrowRight size={20} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          {showCTA && (
            <div className="pt-4">
              <Link href={ctaLink} onClick={(e) => handleLinkClick(e, ctaLink)}>
                <Button size="lg" className="w-full rounded-3xl bg-indigo-600 py-8 text-xl shadow-xl">
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`transition-all duration-500 px-4 sm:px-6 py-4 ${sticky ? 'sticky top-0 active:z-[110]' : 'relative'} ${scrolled ? 'pt-2' : 'pt-6'} z-[100]`}>
      <nav 
        className={`
          max-w-5xl mx-auto rounded-3xl border transition-all duration-500
          ${scrolled 
            ? 'bg-zinc-950/80 border-white/10 backdrop-blur-2xl shadow-2xl py-2' 
            : 'bg-white/5 border-white/5 backdrop-blur-md py-3'}
        `}
      >
        {isMobile ? <MobileView /> : <DesktopView />}
      </nav>
    </div>
  );
};
