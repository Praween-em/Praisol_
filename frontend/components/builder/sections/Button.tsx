'use client';
import React from 'react';
import Link from 'next/link';
import { Button as ButtonAtom } from '../atoms/Button';
import { useBuilderContext } from '@/lib/builder/BuilderContext';

export interface ButtonProps {
  label?: string;
  link?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  label = 'Click Me',
  link = '#',
  variant = 'primary',
  size = 'md',
}: ButtonProps) => {
  const { onNavigate } = useBuilderContext();

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href.replace('/', ''));
    }
  };

  return (
    <div className="py-6 px-6 flex justify-center bg-zinc-950">
      <Link href={link} onClick={(e) => handleLinkClick(e, link)}>
        <ButtonAtom variant={variant} size={size}>
          {label}
        </ButtonAtom>
      </Link>
    </div>
  );
};
