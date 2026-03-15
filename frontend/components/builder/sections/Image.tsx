'use client';
import React from 'react';

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  borderRadius?: string;
}

export default function ImageComponent({
  src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
  alt = 'Image',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = '12px',
}: ImageProps) {
  return (
    <div style={{ 
      width, 
      height, 
      borderRadius, 
      overflow: 'hidden',
      display: 'flex'
    }}>
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit,
          display: 'block'
        }} 
      />
    </div>
  );
}
