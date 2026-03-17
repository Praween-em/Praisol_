'use client';
import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

interface BlogCardProps {
  id?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  image?: string;
  readTime?: string;
  readMoreLink?: string;
  backgroundColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  titleColor?: string;
  textColor?: string;
  subtextColor?: string;
  categoryBackground?: string;
  categoryColor?: string;
}

export const BlogCard = ({
  id = '',
  title = 'How to Build a Sustainable Future with Technology',
  category = 'Technology',
  excerpt = 'Discover the latest trends in sustainable tech and how they are shaping our world for the better.',
  author = 'Sarah Jenkins',
  date = 'Dec 15, 2026',
  image = '',
  readTime = '5 min read',
  readMoreLink = "#",
  cardBackground = '#18181b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  titleColor = '#ffffff',
  textColor = '#ffffff',
  subtextColor = '#a1a1aa',
  categoryBackground = '#6366f1',
  categoryColor = '#ffffff',
}: BlogCardProps) => {
  return (
    <div style={{
      background: cardBackground,
      borderRadius: '20px',
      overflow: 'hidden',
      border: `1px solid ${cardBorderColor}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.borderColor = accentColor;
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = cardBorderColor;
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        {image ? (
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ 
            width: '100%', height: '100%', 
            background: `linear-gradient(45deg, ${accentColor}33, ${accentColor}66)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.1)', fontWeight: 900, fontSize: '5rem'
          }}>
            P
          </div>
        )}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: categoryBackground, color: categoryColor, fontSize: '0.75rem',
          fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '999px',
          textTransform: 'uppercase', letterSpacing: '0.05em'
        }}>
          <EditableText id={id} propKey="category" value={category} />
        </div>
      </div>

      <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: subtextColor, fontSize: '0.85rem', marginBottom: '1rem' }}>
          <span><EditableText id={id} propKey="date" value={date} /></span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: cardBorderColor }}></span>
          <span>{readTime}</span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', fontWeight: 700, color: titleColor, marginBottom: '1rem', lineHeight: 1.3 }}>
          <EditableText id={id} propKey="title" value={title} />
        </h3>

        <p style={{ color: subtextColor, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          <EditableText id={id} propKey="excerpt" value={excerpt} multiline />
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem', borderTop: `1px solid ${cardBorderColor}` }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: cardBorderColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: accentColor }}>
            {author[0]}
          </div>
          <span style={{ color: textColor, fontSize: '0.9rem', fontWeight: 600 }}>
            <EditableText id={id} propKey="author" value={author} />
          </span>
        </div>
      </div>
    </div>
  );
}
