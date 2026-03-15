'use client';
import React from 'react';

interface ColumnProps {
  span?: number;
  flex?: string;
  children?: React.ReactNode;
}

export default function Column({
  span = 1,
  flex = '1',
  children,
}: ColumnProps) {
  return (
    <div 
      style={{ 
        flex: flex,
        gridColumn: `span ${span}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'inherit'
      }}
    >
      {children}
    </div>
  );
}
