import React from 'react';
import { EditableText } from '../atoms/EditableText';

interface BannerProps {
  id?: string;
  text?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaLink?: string;
  showCta?: boolean;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  dismissible?: boolean;
}

export const Banner = ({
  id = '',
  text = '🚀 New session starting in January 2026 — Limited seats available!',
  subtext = '',
  ctaLabel = 'Apply Now',
  ctaLink = '#',
  showCta = true,
  backgroundColor = '#4f46e5',
  textColor = '#ffffff',
  accentColor = '#ffffff',
  fontSize = '0.95rem',
  padding = '0.85rem 2rem',
  borderRadius = '0px',
}: BannerProps) => {
  return (
    <div 
      className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-center px-4 sm:px-6 transition-all duration-300"
      style={{
        background: backgroundColor,
        color: textColor,
        paddingTop: '0.85rem',
        paddingBottom: '0.85rem',
        borderRadius,
      }}
    >
      <div>
        <span style={{ fontWeight: 700, fontSize }}>
          <EditableText id={id} propKey="text" value={text} />
        </span>
        {subtext && (
          <span style={{ opacity: 0.8, marginLeft: '0.5rem', fontSize: `calc(${fontSize} - 0.1rem)` }}>
            <EditableText id={id} propKey="subtext" value={subtext} />
          </span>
        )}
      </div>
      {showCta && ctaLabel && (
        <a
          href={ctaLink}
          style={{
            background: accentColor,
            color: backgroundColor,
            padding: '0.4rem 1.2rem',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: `calc(${fontSize} - 0.1rem)`,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
        >
          <EditableText id={id} propKey="ctaLabel" value={ctaLabel} />
        </a>
      )}
    </div>
  );
}
