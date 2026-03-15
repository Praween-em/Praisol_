'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../atoms/Button';

interface HeroTemplateProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  badge?: string;
  alignment?: 'left' | 'center';
}

export default function HeroTemplate({
  title = "Design your future with speed and precision",
  description = "Join thousands of builders using our platform to launch stunning digital experiences in record time.",
  ctaText = "Start Building",
  ctaLink = "#",
  secondaryCtaText = "Watch Demo",
  secondaryCtaLink = "#",
  image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  badge = "New feature: AI Page Generation",
  alignment = 'left',
}: HeroTemplateProps) {
  const isCentered = alignment === 'center';

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
            {badge && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest`}>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                {badge}
              </div>
            )}
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {description}
            </p>
            
            <div className={`flex flex-wrap items-center gap-4 ${isCentered ? 'justify-center' : ''}`}>
              <Link href={ctaLink || '#'}>
                <Button size="lg" className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20">
                  {ctaText}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href={secondaryCtaLink || '#'}>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:bg-zinc-900 transition-all border border-zinc-800">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Play size={10} fill="currentColor" />
                  </div>
                  {secondaryCtaText}
                </button>
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
