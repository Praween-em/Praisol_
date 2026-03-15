'use client';

interface VideoEmbedProps {
  title?: string;
  videoUrl?: string;
  aspectRatio?: string;
  showCaption?: boolean;
  caption?: string;
  accentColor?: string;
}

function getEmbedUrl(url: string): string {
  if (!url) return '';
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function VideoEmbed({
  title = 'Watch Our Story',
  videoUrl = '',
  aspectRatio = '16/9',
  showCaption = true,
  caption = 'See how we are changing education.',
  accentColor = '#6366f1',
}: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(videoUrl);
  return (
    <section style={{ padding: '4rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        {title && (
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2rem' }}>{title}</h2>
        )}
        <div style={{
          position: 'relative',
          aspectRatio,
          borderRadius: 20,
          overflow: 'hidden',
          border: `2px solid ${accentColor}44`,
          background: '#09090b',
          boxShadow: `0 0 60px ${accentColor}22`,
        }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', color: '#52525b', gap: '1rem',
            }}>
              <span style={{ fontSize: '3rem' }}>▶️</span>
              <p style={{ fontSize: '0.9rem' }}>Paste a YouTube or Vimeo URL in the Video URL field</p>
            </div>
          )}
        </div>
        {showCaption && caption && (
          <p style={{ color: '#a1a1aa', marginTop: '1.25rem', fontSize: '0.95rem' }}>{caption}</p>
        )}
      </div>
    </section>
  );
}
