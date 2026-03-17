import { EditableText } from '../atoms/EditableText';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface FooterProps {
  id?: string;
  brandName?: string;
  tagline?: string;
  showColumns?: boolean;
  columns?: FooterColumn[];
  copyrightText?: string;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  borderColor?: string;
  showSocials?: boolean;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  padding?: string;
}

export const Footer = ({
  id = '',
  brandName = 'PraiSol',
  tagline = 'Building the future, one site at a time.',
  showColumns = true,
  columns = [
    { heading: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Blog', href: '#' }] },
    { heading: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Docs', href: '#' }] },
    { heading: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
  ],
  copyrightText = `© ${new Date().getFullYear()} PraiSol. All rights reserved.`,
  backgroundColor = '#09090b',
  accentColor = '#6366f1',
  textColor = '#71717a',
  borderColor = 'rgba(255,255,255,0.07)',
  showSocials = false,
  facebookUrl = '',
  twitterUrl = '',
  instagramUrl = '',
  linkedinUrl = '',
  youtubeUrl = '',
  padding = '4rem 2rem 2rem',
}: FooterProps) => {
  const socials = [
    { label: 'Facebook', href: facebookUrl, icon: 'f' },
    { label: 'Twitter', href: twitterUrl, icon: '𝕏' },
    { label: 'Instagram', href: instagramUrl, icon: '📷' },
    { label: 'LinkedIn', href: linkedinUrl, icon: 'in' },
    { label: 'YouTube', href: youtubeUrl, icon: '▶' },
  ].filter(s => s.href);

  return (
    <footer 
      style={{ background: backgroundColor, borderTop: `1px solid ${borderColor}` }}
      className="px-4 sm:px-6 py-16 sm:py-20"
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16"
        >
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>
              <EditableText id={id} propKey="brandName" value={brandName} />
            </div>
            <p style={{ color: textColor, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              <EditableText id={id} propKey="tagline" value={tagline} multiline />
            </p>
            {showSocials && socials.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: 'rgba(255,255,255,0.06)',
                      border: `1px solid ${borderColor}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: textColor, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700,
                      transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentColor; (e.currentTarget as HTMLElement).style.color = accentColor; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = borderColor; (e.currentTarget as HTMLElement).style.color = textColor; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          {showColumns && columns.map((col, i) => (
            <div key={i}>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                <EditableText id={id} propKey={`columns.${i}.heading`} value={col.heading} />
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} style={{ color: textColor, textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
                      onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                    >
                      <EditableText id={id} propKey={`columns.${i}.links.${j}.label`} value={link.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '1.5rem', textAlign: 'center', color: '#52525b', fontSize: '0.8rem' }}>
          <EditableText id={id} propKey="copyrightText" value={copyrightText} />
        </div>
      </div>
    </footer>
  );
}
