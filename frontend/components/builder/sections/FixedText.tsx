import React from 'react';
import { EditableText } from '../atoms/EditableText';

interface FixedTextProps {
  id?: string;
  text?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: number;
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
}

export const FixedText = ({
  id = '',
  text = 'Floating Text',
  fontSize = '1rem',
  fontWeight = 'normal',
  color = '#ffffff',
  align = 'left',
  top = '',
  bottom = '',
  left = '',
  right = '',
  zIndex = 10,
  backgroundColor = 'transparent',
  padding = '0',
  borderRadius = '0',
}: FixedTextProps) => {
  // Only apply positioning props if they have a value (not empty string)
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    ...(top ? { top } : {}),
    ...(bottom ? { bottom } : {}),
    ...(left ? { left } : {}),
    ...(right ? { right } : {}),
  };

  return (
    <div style={{
      ...positionStyle,
      zIndex,
      backgroundColor,
      padding,
      borderRadius,
      textAlign: align,
      color,
      fontSize,
      fontWeight,
      pointerEvents: 'none', // Allows clicking through the empty space of the div
      width: '100%', // Allow text block to span full width so alignment works
    }}>
      {/* 
        We use an inner span to reset pointer events so the actual text can be clicked 
        (e.g., for selection in the builder) 
      */}
      <span style={{ pointerEvents: 'auto', display: 'inline-block' }}>
        <EditableText id={id} propKey="text" value={text} multiline />
      </span>
    </div>
  );
}
