'use client';

interface BannerProps {
  text?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  dismissible?: boolean;
}

export default function Banner({
  text = '🚀 New session starting in January 2025 — Limited seats available!',
  subtext = '',
  ctaLabel = 'Apply Now',
  ctaLink = '#',
  backgroundColor = '#4f46e5',
  textColor = '#ffffff',
  accentColor = '#ffffff',
}: BannerProps) {
  return (
    <div style={{
      background: backgroundColor,
      color: textColor,
      padding: '0.85rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      flexWrap: 'wrap',
      textAlign: 'center',
    }}>
      <div>
        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{text}</span>
        {subtext && <span style={{ opacity: 0.8, marginLeft: '0.5rem', fontSize: '0.85rem' }}>{subtext}</span>}
      </div>
      {ctaLabel && (
        <a href={ctaLink} style={{
          background: accentColor,
          color: backgroundColor,
          padding: '0.4rem 1.2rem',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.2s',
        }}>
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
