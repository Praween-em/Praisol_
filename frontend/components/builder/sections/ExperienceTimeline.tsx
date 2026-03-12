'use client';
import React from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  desc?: string;
  current?: boolean;
}

interface ExperienceTimelineProps {
  title?: string;
  items?: ExperienceItem[];
}

export default function ExperienceTimeline({
  title = 'Work Experience',
  items = [],
}: ExperienceTimelineProps) {
  return (
    <section style={{ padding: '5rem 2rem', background: '#09090b' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '4rem',
        }}>
          {title}
        </h2>

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Timeline connecting line */}
          <div style={{
            position: 'absolute',
            left: 'calc(2rem + 7px)',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, #27272a 10%, #27272a 90%, transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Timeline node */}
                <div style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '0.25rem',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: item.current ? '#6366f1' : '#18181b',
                  border: `3px solid ${item.current ? '#818cf8' : '#3f3f46'}`,
                  zIndex: 2,
                  boxShadow: item.current ? '0 0 15px rgba(99,102,241,0.5)' : 'none',
                }} />

                <div style={{
                  background: '#18181b',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #27272a',
                  transition: 'background 0.2s',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                      {item.role}
                    </h3>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 600, 
                      color: item.current ? '#818cf8' : '#71717a',
                      background: item.current ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.05)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '999px'
                    }}>
                      {item.duration}
                    </span>
                  </div>
                  <div style={{ color: '#6366f1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {item.company}
                  </div>
                  {item.desc && (
                    <p style={{ color: '#a1a1aa', fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
