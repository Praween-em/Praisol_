'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';
import { ChevronRight, Menu, X } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';
import { NavbarProps } from './Navbar';

export const NavbarCentered = ({ 
  id = '',
  logoText = 'PraiSol', 
  logoImage = '',
  logoHeight = 36,
  links = [], 
  backgroundColor = '#09090b',
  linkWeight = 'medium',
  activeColor = '#6366f1',
  showCTA = true,
  ctaLabel = 'Get Started',
  ctaLink = '/contact',
  sticky = true 
}: NavbarProps) => {
  const { onNavigate } = useBuilderContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      {logoImage ? (
        <img
          src={logoImage}
          alt={logoText}
          style={{ height: logoHeight, width: 'auto' }}
          className="object-contain"
        />
      ) : (
        <span className="font-bold text-xl text-zinc-100 tracking-tight">
          <EditableText id={id} propKey="logoText" value={logoText} />
        </span>
      )}
    </div>
  );

  const weightClass = ({
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  } as any)[linkWeight];

  const midPoint = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, midPoint);
  const rightLinks = links.slice(midPoint);

  // --- Sub-Components for Dual View ---

  const DesktopView = () => (
    <div className="hidden lg:flex items-center justify-between h-20 px-6 max-w-7xl mx-auto w-full relative">
      {/* Desktop Left Links */}
      <div className="flex items-center gap-8 flex-1">
        {leftLinks.map((link: any, idx: number) => (
          <Link 
            key={idx} 
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={`text-sm ${weightClass} text-zinc-400 hover:text-white transition-colors whitespace-nowrap`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Logo - Centered on Desktop */}
      <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0">
        <LogoSection />
      </div>

      {/* Desktop Right Links + CTA */}
      <div className="flex items-center justify-end gap-8 flex-1">
        <div className="flex items-center gap-8">
          {rightLinks.map((link: { label: string; href: string }, idx: number) => (
            <Link 
              key={idx} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm ${weightClass} text-zinc-400 hover:text-white transition-colors whitespace-nowrap`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {showCTA && (
          <Link href={ctaLink} onClick={(e) => handleLinkClick(e, ctaLink)}>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              {ctaLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="lg:hidden w-full">
      <div className="flex items-center justify-between px-4 py-3 relative z-[101]">
        <LogoSection />
        <button 
          className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-xl ml-auto active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Vertical Dropdown */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-white/5 ${mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor }}
      >
        <div className="p-6 space-y-2">
          {links.map((link: { label: string; href: string }, idx: number) => (
            <Link 
              key={idx} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-lg font-bold text-zinc-300 hover:text-white py-4 border-b border-white/5 flex items-center justify-between group"
            >
              {link.label}
              <ChevronRight className="text-zinc-600 group-hover:text-white transition-all" />
            </Link>
          ))}
          {showCTA && (
            <div className="pt-6">
              <Link href={ctaLink} onClick={(e) => handleLinkClick(e, ctaLink)}>
                <Button size="lg" className="w-full bg-indigo-600 shadow-lg">
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
    <nav 
      style={{ backgroundColor }}
      className={`
        relative z-[100] border-b border-white/5 w-full transition-all duration-300
        ${sticky ? 'sticky top-0 backdrop-filter backdrop-blur-xl bg-opacity-80' : ''}
      `}
    >
      {isMobile ? <MobileView /> : <DesktopView />}
    </nav>
  );
};
