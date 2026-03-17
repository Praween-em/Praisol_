import { EditableText } from '../atoms/EditableText';

interface GalleryImage {
  url: string;
  caption?: string;
}

interface GalleryGridProps {
  id?: string;
  title?: string;
  subtitle?: string;
  showSubtitle?: boolean;
  images?: GalleryImage[];
  columns?: number;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  borderRadius?: string;
  aspectRatio?: string;
  gap?: string;
  padding?: string;
  showCaptions?: boolean;
}

export const GalleryGrid = ({
  id = '',
  title = 'Our Gallery',
  subtitle = 'Explore our moments and memories',
  showSubtitle = true,
  images = [],
  columns = 3,
  backgroundColor = '#09090b',
  titleColor = '#ffffff',
  subtitleColor = '#a1a1aa',
  borderRadius = '12px',
  aspectRatio = '4/3',
  gap = '1rem',
  padding = '5rem 2rem',
  showCaptions = true,
}: GalleryGridProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: titleColor,
          marginBottom: '0.75rem',
        }}>
          <EditableText id={id} propKey="title" value={title} />
        </h2>
        {showSubtitle && (
          <p style={{
            textAlign: 'center',
            color: subtitleColor,
            marginBottom: '3rem',
            fontSize: '1rem',
          }}>
            <EditableText id={id} propKey="subtitle" value={subtitle} multiline />
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(200, Math.floor(1000 / columns))}px, 1fr))`,
          gap,
        }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                borderRadius,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                aspectRatio,
                background: 'rgba(255,255,255,0.04)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {img.url ? (
                <img
                  src={img.url}
                  alt={img.caption || `Gallery image ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#52525b',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span style={{ fontSize: '0.8rem' }}>
                    <EditableText id={id} propKey={`images.${idx}.caption`} value={img.caption || 'No image'} />
                  </span>
                </div>
              )}

              {showCaptions && img.caption && img.url && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}>
                  <EditableText id={id} propKey={`images.${idx}.caption`} value={img.caption} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
