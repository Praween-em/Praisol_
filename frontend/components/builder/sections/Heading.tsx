'use client';
import React from 'react';

interface HeadingProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  color?: string;
  marginBottom?: string;
}

export default function Heading({
  text = 'Your Heading',
  level = 2,
  align = 'left',
  color = '#fff',
  marginBottom = '1rem',
}: HeadingProps) {
  const Tag = `h${level}` as any;
  
  const fontSizes = {
    1: 'clamp(2.5rem, 8vw, 4rem)',
    2: 'clamp(2rem, 6vw, 2.5rem)',
    3: '1.75rem',
    4: '1.5rem',
    5: '1.25rem',
    6: '1rem',
  };

  return (
    <Tag style={{
      color,
      textAlign: align,
      fontSize: fontSizes[level],
      fontWeight: level <= 2 ? 800 : 600,
      marginBottom,
      lineHeight: 1.2,
    }}>
      {text}
    </Tag>
  );
}
