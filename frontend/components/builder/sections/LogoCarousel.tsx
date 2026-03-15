'use client';

interface LogoItem {
  name: string;
  url?: string;
  imageUrl?: string;
}

interface LogoCarouselProps {
  title?: string;
  logos?: LogoItem[];
  backgroundColor?: string;
}

export default function LogoCarousel({
  title = 'Trusted By',
  logos = [
    { name: 'Partner One' },
    { name: 'Partner Two' },
    { name: 'Partner Three' },
    { name: 'Partner Four' },
    { name: 'Partner Five' },
  ],
  backgroundColor = 'transparent',
}: LogoCarouselProps) {
  return (
    <section style={{ padding: '3rem 2rem', background: backgroundColor }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {title && (
          <p style={{ color: '#52525b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            {title}
          </p>
        )}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {logos.map((logo, i) => (
            <a key={i} href={logo.url || '#'} style={{ textDecoration: 'none' }}>
              {logo.imageUrl ? (
                <img src={logo.imageUrl} alt={logo.name} style={{ height: 40, objectFit: 'contain', filter: 'grayscale(100%) brightness(0.5)', transition: 'filter 0.2s' }} />
              ) : (
                <div style={{
                  padding: '0.6rem 1.75rem',
                  borderRadius: 10,
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  color: '#52525b',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '-0.01em',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  {logo.name}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
