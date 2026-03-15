'use client';
import React from 'react';

interface ParagraphProps {
  text?: string;
  align?: 'left' | 'center' | 'right';
  color?: string;
  fontSize?: string;
  lineHeight?: number;
  marginBottom?: string;
}

export default function Paragraph({
  text = 'Your paragraph text goes here. Add something descriptive about your site.',
  align = 'left',
  color = '#a1a1aa',
  fontSize = '1.1rem',
  lineHeight = 1.7,
  marginBottom = '1.5rem',
}: ParagraphProps) {
  return (
    <p style={{
      textAlign: align,
      color,
      fontSize,
      lineHeight,
      marginBottom,
      maxWidth: '80ch',
      marginRight: align === 'center' ? 'auto' : '0',
      marginLeft: align === 'center' ? 'auto' : '0',
    }}>
      {text}
    </p>
  );
}
