'use client';
import React from 'react';
import { Accordion as AccordionAtom } from '../atoms/Accordion';

export interface AccordionSectionProps {
  title?: string;
  items?: { title: string; content: string }[];
}

export const AccordionSection = ({
  title = 'Frequently Asked Questions',
  items = [
    { title: 'What are the admission requirements?', content: 'Admission is based on previous academic records and an entrance test for specific grades.' },
    { title: 'What is the fee structure for 2026?', content: 'The fee structure varies by grade. Please download the prospectus from the downloads section.' },
    { title: 'Do you provide school transport?', content: 'Yes, we have a fleet of 20 buses covering all major parts of the city.' },
  ],
}: AccordionSectionProps) => {
  return (
    <section className="py-20 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-12 text-center">{title}</h2>
        <AccordionAtom items={items} />
      </div>
    </section>
  );
};
