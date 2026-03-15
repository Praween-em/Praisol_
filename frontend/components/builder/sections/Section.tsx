'use client';
import React from 'react';

interface SectionProps {
  id?: string;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  children?: React.ReactNode;
}

export default function Section({
  id,
  backgroundColor = 'transparent',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  children,
}: SectionProps) {
  return (
    <section 
      id={id}
      style={{ 
        backgroundColor, 
        paddingTop, 
        paddingBottom,
        position: 'relative',
        width: '100%'
      }}
    >
      {children}
    </section>
  );
}
