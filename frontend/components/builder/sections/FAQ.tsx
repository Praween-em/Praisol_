import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  id?: string;
  items?: FAQItem[];
  backgroundColor?: string;
  accentColor?: string;
  questionColor?: string;
  answerColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
}

export const FAQ = ({
  id = '',
  items = [
    { question: 'What is PraiSol?', answer: 'PraiSol is an advanced website builder platform that allows you to create stunning, high-performance websites in minutes.' },
    { question: 'How do I get started?', answer: 'Simply pick a template or start from scratch using our intuitive drag-and-drop builder components.' },
    { question: 'Can I export my code?', answer: 'Yes! You can export your site as a fully functional React/Next.js project or deploy it directly to our cloud.' },
  ],
  backgroundColor = 'transparent',
  accentColor = '#6366f1',
  questionColor = '#ffffff',
  answerColor = '#a1a1aa',
  borderColor = '#27272a',
  borderRadius = '12px',
  padding = '4rem 2rem',
}: FAQProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section style={{ background: backgroundColor, padding }}>
      <div className="space-y-4 max-w-3xl mx-auto">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          
          return (
            <div 
              key={idx}
              className="transition-all duration-300 overflow-hidden"
              style={{
                borderRadius,
                border: `1px solid ${isOpen ? accentColor : borderColor}`,
                background: isOpen ? `${accentColor}11` : 'rgba(255,255,255,0.03)',
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold transition-colors" style={{ color: isOpen ? '#ffffff' : questionColor }}>
                  <EditableText id={id} propKey={`items.${idx}.question`} value={item.question} />
                </span>
                {isOpen ? (
                  <ChevronUp style={{ color: accentColor }} size={20} />
                ) : (
                  <ChevronDown style={{ color: '#52525b' }} size={20} />
                )}
              </button>
              
              <div 
                className={`
                  transition-all duration-300 ease-in-out px-6
                  ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div style={{ color: answerColor, lineHeight: 1.6 }} className="text-sm lg:text-base">
                  <EditableText id={id} propKey={`items.${idx}.answer`} value={item.answer} multiline />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
