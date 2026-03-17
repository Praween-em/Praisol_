'use client';
import React from 'react';

interface SpacerProps {
  height?: string;
  width?: string;
}

export const Spacer = ({
  height = '2rem',
  width = '100%',
}: SpacerProps) => {
  return (
    <div style={{ height, width, flexShrink: 0 }} />
  );
}
