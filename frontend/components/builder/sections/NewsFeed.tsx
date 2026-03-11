'use client';
import React from 'react';
import { Card } from '../atoms/Card';

export interface NewsFeedProps {
  title?: string;
  limit?: number;
  showDate?: boolean;
  layout?: 'grid' | 'list';
}

const mockNews = [
  { id: 1, title: 'Annual Day Celebrations 2026', date: 'Mar 24, 2026', excerpt: 'Join us for a day of cultural excellence and awards.' },
  { id: 2, title: 'Admissions Open for 2026-27', date: 'Mar 20, 2026', excerpt: 'Secure your child\'s future with our world-class curriculum.' },
  { id: 3, title: 'Science Fair Winners Announced', date: 'Mar 15, 2026', excerpt: 'Congratulations to all participants for their innovative projects.' },
];

export const NewsFeed = ({
  title = 'Latest Updates',
  limit = 6,
  showDate = true,
  layout = 'grid',
}: NewsFeedProps) => {
  return (
    <section className="py-20 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-zinc-100">{title}</h2>
          <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">View All Updates</button>
        </div>

        <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {mockNews.slice(0, limit).map((news) => (
            <Card 
              key={news.id}
              title={news.title}
              subtitle={showDate ? news.date : undefined}
            >
              <p>{news.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-indigo-400 font-semibold group cursor-pointer text-xs">
                Read More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
