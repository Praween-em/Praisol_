'use client';
import React from 'react';

interface StatsBarProps {
  stats: { label: string; value: string }[];
  backgroundColor?: string;
  textColor?: string;
}

export default function StatsBar({ 
  stats = [], 
  backgroundColor = '#111827', 
  textColor = '#ffffff' 
}: StatsBarProps) {
  return (
    <section 
      style={{ 
        backgroundColor, 
        color: textColor,
        padding: '4rem 2rem'
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: '2rem',
        textAlign: 'center'
      }}>
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            style={{ 
              flex: '1 1 200px',
              minWidth: '150px'
            }}
          >
            <div style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
