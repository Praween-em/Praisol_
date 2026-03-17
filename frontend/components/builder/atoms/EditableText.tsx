'use client';
import React, { useRef, useEffect } from 'react';
import { useBuilderContext } from '@/lib/builder/BuilderContext';

interface EditableTextProps {
  id: string;
  propKey: string;
  value: string;
  className?: string;
  style?: React.CSSProperties;
  tagName?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label';
  multiline?: boolean;
}

export const EditableText = ({
  id,
  propKey,
  value,
  className = '',
  style = {},
  tagName: Tag = 'span',
  multiline = false,
}: EditableTextProps) => {
  const { isBuilder, onUpdate } = useBuilderContext();
  const elementRef = useRef<HTMLElement>(null);

  // Keep local content in sync with external value only if not focused
  useEffect(() => {
    if (elementRef.current && document.activeElement !== elementRef.current) {
      elementRef.current.innerText = value || '';
    }
  }, [value]);

  if (!isBuilder) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  const handleBlur = () => {
    if (!elementRef.current || !onUpdate) return;
    const newValue = elementRef.current.innerText;
    if (newValue !== value) {
      onUpdate(id, { [propKey]: newValue });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
    // Don't propagate to prevent component selection click handler
    e.stopPropagation();
  };

  return (
    <Tag
      ref={elementRef as any}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none focus:ring-1 focus:ring-indigo-500/50 rounded-[2px] transition-shadow px-0.5 -mx-0.5`}
      style={{
        ...style,
        cursor: 'text',
        minWidth: '1ch',
        display: (Tag === 'span' || Tag === 'label') ? 'inline-block' : style.display
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()} // Prevent component selection
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      }}
    />
  );
};
