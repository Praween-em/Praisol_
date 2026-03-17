'use client';
import React, { useState } from 'react';

interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion = ({ items, className = '' }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`flex flex-col border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b last:border-b-0 border-zinc-800">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors"
            >
              <span className="text-sm font-semibold text-zinc-200">{item.title}</span>
              <svg
                className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`
              overflow-hidden transition-all duration-300 
              ${isOpen ? 'max-h-96 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0'}
            `}>
              <div className="text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
