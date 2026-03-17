'use client';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card = ({
  children,
  title,
  subtitle,
  image,
  className = '',
  onClick,
  hoverable = true,
}: CardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden
        ${hoverable ? 'hover:border-zinc-700 hover:bg-zinc-800/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {image && (
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={image} 
            alt={typeof title === 'string' ? title : 'Card image'} 
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-5">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h3 className="text-base font-bold text-zinc-100 mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          </div>
        )}
        <div className="text-sm text-zinc-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
