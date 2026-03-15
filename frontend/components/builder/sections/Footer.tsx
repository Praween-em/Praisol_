'use client';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface FooterProps {
  brandName?: string;
  tagline?: string;
  columns?: FooterColumn[];
  copyrightText?: string;
  backgroundColor?: string;
  accentColor?: string;
}

export default function Footer({
  brandName = 'PraiSol',
  tagline = 'Building the future, one site at a time.',
  columns = [
    { heading: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Blog', href: '#' }] },
    { heading: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Docs', href: '#' }] },
    { heading: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
  ],
  copyrightText = `© ${new Date().getFullYear()} PraiSol. All rights reserved.`,
  backgroundColor = '#09090b',
  accentColor = '#6366f1',
}: FooterProps) {
  return (
    <footer style={{ background: backgroundColor, padding: '4rem 2rem 2rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `2fr ${columns.map(() => '1fr').join(' ')}`, gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>{brandName}</div>
            <p style={{ color: '#71717a', fontSize: '0.9rem', lineHeight: 1.7 }}>{tagline}</p>
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>{col.heading}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem', textAlign: 'center', color: '#52525b', fontSize: '0.8rem' }}>
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}
