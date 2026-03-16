'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';

interface HeroTemplateProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  alignment?: 'left' | 'center';
}

export default function HeroTemplate({
  title = "Design your future with speed and precision",
  description = "Join thousands of builders using our platform to launch stunning digital experiences in record time.",
  ctaText = "Get Started",
  ctaLink = "#",
  image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  alignment = 'left',
}: HeroTemplateProps) {
  const { onNavigate } = useBuilderContext();
  const isCentered = alignment === 'center';

  const handleClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href.replace('/', ''));
    }
  };

  return (
    <div className={`relative overflow-hidden py-24 lg:py-32 ${isCentered ? 'text-center' : ''}`}>
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-20 blur-[120px]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isCentered ? 'items-center' : ''}`}>
          <div className={`flex-1 space-y-8 ${isCentered ? 'max-w-4xl' : ''}`}>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {description}
            </p>
            
            <div className={`flex flex-wrap items-center gap-4 ${isCentered ? 'justify-center' : ''}`}>
              <Link href={ctaLink || '#'} onClick={(e) => handleClick(e, ctaLink || '#')}>
                <Button size="lg" className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20">
                  {ctaText}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {!isCentered && (
            <div className="flex-1 w-full max-w-xl animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative p-2 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[2rem] shadow-2xl border border-white/5">
                <img 
                  src={image} 
                  alt="Hero Preview" 
                  className="rounded-[1.5rem] shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
