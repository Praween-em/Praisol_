'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  accentColor?: string;
}

export default function FAQ({
  items = [
    { question: 'What is PraiSol?', answer: 'PraiSol is an advanced website builder platform that allows you to create stunning, high-performance websites in minutes.' },
    { question: 'How do I get started?', answer: 'Simply pick a template or start from scratch using our intuitive drag-and-drop builder components.' },
    { question: 'Can I export my code?', answer: 'Yes! You can export your site as a fully functional React/Next.js project or deploy it directly to our cloud.' },
  ],
  accentColor = '#6366f1',
}: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        
        return (
          <div 
            key={idx}
            className={`
              rounded-xl border transition-all duration-300 overflow-hidden
              ${isOpen ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}
            `}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`font-bold transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                {item.question}
              </span>
              {isOpen ? (
                <ChevronUp className="text-indigo-500" size={20} />
              ) : (
                <ChevronDown className="text-zinc-500" size={20} />
              )}
            </button>
            
            <div 
              className={`
                transition-all duration-300 ease-in-out px-6
                ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <p className="text-zinc-400 leading-relaxed text-sm lg:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
