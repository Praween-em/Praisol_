'use client';
import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title?: string;
  excerpt?: string;
  image?: string;
  date?: string;
  author?: string;
  category?: string;
  readMoreLink?: string;
}

export default function BlogCard({
  title = "The Future of Web Design in 2026",
  excerpt = "Exploring how AI and agentic workflows are changing the way we think about user interfaces and digital experiences.",
  image = "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
  date = "March 12, 2026",
  author = "Admin",
  category = "Design",
  readMoreLink = "#",
}: BlogCardProps) {
  return (
    <div className="group bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full shadow-2xl">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {date}</span>
          <span className="flex items-center gap-1.5"><User size={12} /> {author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center justify-between">
          <Link href={readMoreLink || '#'} className="text-sm font-bold text-indigo-400 flex items-center gap-2 group/btn hover:text-white transition-colors">
            Read More
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
