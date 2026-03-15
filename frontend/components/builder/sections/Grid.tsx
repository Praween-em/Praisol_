'use client';
import React from 'react';

interface GridProps {
  columns?: number;
  gap?: string;
  responsive?: boolean;
  children?: React.ReactNode;
}

export default function Grid({
  columns = 3,
  gap = '1.5rem',
  responsive = true,
  children,
}: GridProps) {
  return (
    <div 
      style={{ 
        display: 'grid',
        gridTemplateColumns: responsive 
          ? `repeat(auto-fit, minmax(calc((100% / ${columns}) - ${gap}), 1fr))` 
          : `repeat(${columns}, 1fr)`,
        gap,
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}
