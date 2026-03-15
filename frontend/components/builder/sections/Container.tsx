'use client';
import React from 'react';

interface ContainerProps {
  maxWidth?: string;
  paddingLeft?: string;
  paddingRight?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export default function Container({
  maxWidth = '1200px',
  paddingLeft = '1rem',
  paddingRight = '1rem',
  centered = true,
  children,
}: ContainerProps) {
  return (
    <div 
      style={{ 
        maxWidth, 
        paddingLeft, 
        paddingRight,
        marginLeft: centered ? 'auto' : '0',
        marginRight: centered ? 'auto' : '0',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}
