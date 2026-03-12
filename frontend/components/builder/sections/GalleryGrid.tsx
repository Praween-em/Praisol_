'use client';
import React from 'react';

interface GalleryImage {
  url: string;
  caption?: string;
}

interface GalleryGridProps {
  title?: string;
  images?: GalleryImage[];
  columns?: number;
}

export default function GalleryGrid({
  title = 'Our Gallery',
  images = [],
  columns = 3,
}: GalleryGridProps) {
  return (
    <section style={{ padding: '5rem 2rem', background: '#09090b' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '0.75rem',
        }}>
          {title}
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#a1a1aa',
          marginBottom: '3rem',
          fontSize: '1rem',
        }}>
          Explore our moments and memories
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(200, Math.floor(800 / columns))}px, 1fr))`,
          gap: '1rem',
        }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #27272a',
                aspectRatio: '4/3',
                background: '#18181b',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
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
                    {img.caption || 'No image'}
                  </span>
                </div>
              )}

              {/* Caption overlay */}
              {img.caption && img.url && (
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
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
