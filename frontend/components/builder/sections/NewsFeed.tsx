'use client';
import React from 'react';
import { ArrowRight, Bell } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
}

interface NewsFeedProps {
  id?: string;
  title?: string;
  news?: NewsItem[];
  backgroundColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  titleColor?: string;
  textColor?: string;
  subtextColor?: string;
  padding?: string;
}

export const NewsFeed = ({
  id = '',
  title = 'Latest News & Updates',
  news = [
    { id: 1, title: 'Annual Sports Day 2026 Announced', date: 'Oct 20, 2025', summary: 'The much awaited annual sports day will be held on January 15th with over 50 events.' },
    { id: 2, title: 'New Science Lab Inauguration', date: 'Oct 15, 2025', summary: 'State-of-the-art physics and chemistry labs are now open for senior secondary students.' },
    { id: 3, title: 'Results: Inter-school Debate', date: 'Oct 10, 2025', summary: 'PraiSol Academy wins the first prize in the regional inter-school debate competition.' },
  ],
  backgroundColor = '#18181b',
  cardBackground = '#09090b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  titleColor = '#ffffff',
  textColor = '#ffffff',
  subtextColor = '#a1a1aa',
  padding = '2rem',
}: NewsFeedProps) => {
  return (
    <div 
      className="px-4 sm:px-6 py-8 transition-all duration-300"
      style={{ background: backgroundColor, borderRadius: '24px', border: `1px solid ${cardBorderColor}` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 800, color: titleColor, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${accentColor}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0 }}>
            <Bell size={20} />
          </div>
          <EditableText id={id} propKey="title" value={title} />
        </h3>
        <button style={{ background: 'none', border: 'none', color: accentColor, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {news.map((item, idx) => (
          <div key={item.id} style={{
            padding: '1.5rem',
            background: cardBackground,
            borderRadius: '16px',
            border: `1px solid ${cardBorderColor}`,
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accentColor;
            e.currentTarget.style.transform = 'scale(1.005)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = cardBorderColor;
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h4 style={{ color: textColor, fontSize: '1.1rem', fontWeight: 700, flex: 1 }}>
                <EditableText id={id} propKey={`news.${idx}.title`} value={item.title} />
              </h4>
              <span style={{ color: subtextColor, fontSize: '0.8rem', fontWeight: 500 }}>{item.date}</span>
            </div>
            <p style={{ color: subtextColor, fontSize: '0.9rem', lineHeight: 1.5 }}>
              <EditableText id={id} propKey={`news.${idx}.summary`} value={item.summary} multiline />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
