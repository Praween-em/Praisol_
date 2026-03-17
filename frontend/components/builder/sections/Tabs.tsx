import React, { useState } from 'react';
import { EditableText } from '../atoms/EditableText';

interface TabItem {
  label: string;
  content: string; // In a real app this might be nested components, but for now we use text
}

interface TabsProps {
  id?: string;
  items?: TabItem[];
  activeColor?: string;
  tabStyle?: 'underline' | 'pills';
}

export const Tabs = ({
  id = '',
  items = [
    { label: 'Tab 1', content: 'Content for the first tab. You can customize this in the properties panel.' },
    { label: 'Tab 2', content: 'Content for the second tab. Add more tabs to organize your information.' },
  ],
  activeColor = '#6366f1',
  tabStyle = 'underline',
}: TabsProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Triggers */}
      <div className={`flex gap-4 mb-6 ${tabStyle === 'underline' ? 'border-b border-zinc-800' : ''}`}>
        {items.map((item, idx) => {
          const isActive = activeIdx === idx;
          
          if (tabStyle === 'pills') {
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                style={{
                  backgroundColor: isActive ? activeColor : 'transparent',
                  color: isActive ? '#fff' : '#71717a',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  border: `1px solid ${isActive ? activeColor : '#27272a'}`
                }}
              >
                <EditableText id={id} propKey={`items.${idx}.label`} value={item.label} />
              </button>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                color: isActive ? activeColor : '#71717a',
                borderBottom: `2px solid ${isActive ? activeColor : 'transparent'}`,
                padding: '0.75rem 0.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                marginBottom: '-1px'
              }}
            >
              <EditableText id={id} propKey={`items.${idx}.label`} value={item.label} />
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[100px] animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="text-zinc-400 leading-relaxed">
          <EditableText id={id} propKey={`items.${activeIdx}.content`} value={items[activeIdx]?.content || ''} multiline />
        </div>
      </div>
    </div>
  );
}
