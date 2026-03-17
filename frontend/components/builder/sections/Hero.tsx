import React from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';
import { EditableText } from '../atoms/EditableText';

export interface HeroProps {
  id?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
  textAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
  subtitleColor?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  showSecondaryBtn?: boolean;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  paddingTop?: string;
  paddingBottom?: string;
  minHeight?: string;
  showBadge?: boolean;
  badgeText?: string;
}

export const Hero = ({
  id = '',
  title = 'Welcome to Our Institution',
  subtitle = 'Shaping the future of education with excellence and innovation.',
  backgroundImage = '',
  backgroundColor = '#09090b',
  overlayOpacity = 30,
  textAlign = 'center',
  titleColor = '#ffffff',
  subtitleColor = '#a1a1aa',
  ctaText = 'Apply Now',
  ctaLink = '#',
  ctaVariant = 'primary',
  showSecondaryBtn = true,
  secondaryCtaText = 'Learn More',
  secondaryCtaLink = '#',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  minHeight = '500px',
  showBadge = false,
  badgeText = '🎉 Admissions Open 2026',
}: HeroProps) => {
  const { onNavigate } = useBuilderContext();

  const handleClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href.replace('/', ''));
    }
  };

  const alignClass = textAlign === 'left' ? 'text-left items-start' : textAlign === 'right' ? 'text-right items-end' : 'text-center items-center';
  const justifyClass = textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start';

  return (
    <section
      className="relative flex items-center px-6 overflow-hidden"
      style={{
        background: backgroundImage ? undefined : backgroundColor,
        paddingTop,
        paddingBottom,
        minHeight,
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Hero" className="w-full h-full object-cover" style={{ opacity: overlayOpacity / 100 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
        </div>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-glow)_0%,_transparent_70%)] opacity-20" />
      )}

      <div className={`relative z-10 max-w-4xl mx-auto w-full flex flex-col ${alignClass}`}>
        {showBadge && (
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <EditableText id={id} propKey="badgeText" value={badgeText} />
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight" style={{ color: titleColor }}>
          <EditableText id={id} propKey="title" value={title} tagName="span" />
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl leading-relaxed opacity-90" style={{ color: subtitleColor }}>
          <EditableText id={id} propKey="subtitle" value={subtitle} tagName="span" multiline />
        </p>
        <div className={`flex flex-wrap gap-4 ${justifyClass} w-full`}>
          <Link href={ctaLink || '#'} onClick={(e) => handleClick(e, ctaLink || '#')}>
            <Button size="lg" variant={ctaVariant as any} className="px-10">
              <EditableText id={id} propKey="ctaText" value={ctaText} />
            </Button>
          </Link>
          {showSecondaryBtn && (
            <Link href={secondaryCtaLink || '#'} onClick={(e) => handleClick(e, secondaryCtaLink || '#')}>
              <Button variant="outline" size="lg" className="px-10">
                <EditableText id={id} propKey="secondaryCtaText" value={secondaryCtaText} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
