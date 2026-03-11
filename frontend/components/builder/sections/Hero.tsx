'use client';
import React from 'react';
import { Button } from '../atoms/Button';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero = ({
  title = 'Welcome to Our Institution',
  subtitle = 'Shaping the future of education with excellence and innovation.',
  backgroundImage = '',
  ctaText = 'Apply Now',
  ctaLink = '#',
}: HeroProps) => {
  return (
    <section className="relative min-h-[500px] flex items-center px-6 py-20 overflow-hidden bg-zinc-950">
      {/* Background Image/Overlay */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-glow)_0%,_transparent_70%)] opacity-20" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-100 mb-6 leading-tight animate-fade-up">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Button size="lg" className="px-10">
            {ctaText}
          </Button>
          <Button variant="outline" size="lg" className="px-10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
