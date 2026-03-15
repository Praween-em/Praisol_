'use client';
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  iconName?: string;
  size?: number;
  color?: string;
}

export default function Icon({
  iconName = 'Star',
  size = 24,
  color = 'currentColor',
}: IconProps) {
  const IconComponent = (LucideIcons as any)[iconName];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} color={color} />;
  }

  return <IconComponent size={size} color={color} />;
}
