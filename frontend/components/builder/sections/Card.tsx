'use client';
import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  hoverEffect?: boolean;
}

export const Card = ({
  children,
  padding = '1.5rem',
  backgroundColor = '#18181b',
  borderRadius = '16px',
  hoverEffect = true,
}: CardProps) => {
  return (
    <div 
      className={`
        border border-zinc-800 transition-all duration-300
        ${hoverEffect ? 'hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1' : ''}
      `}
      style={{ 
        padding, 
        backgroundColor, 
        borderRadius,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}
    >
      {children || <div className="text-zinc-600 text-sm italic">Empty Card</div>}
    </div>
  );
}
