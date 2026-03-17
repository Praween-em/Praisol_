'use client';
import React from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import { EditableText } from '../atoms/EditableText';

interface PricingCardProps {
  id?: string;
  plan?: string;
  price?: string;
  period?: string;
  features?: string[] | string;
  ctaText?: string;
  ctaLink?: string;
  isPopular?: boolean;
  accentColor?: string;
}

export const PricingCard = ({
  id = '',
  plan = 'Starter',
  price = '$29',
  period = '/month',
  features = ['Feature 1', 'Feature 2', 'Feature 3'],
  ctaText = 'Get Started',
  ctaLink = '#',
  isPopular = false,
  accentColor = '#6366f1',
}: PricingCardProps) => {
  const router = useRouter();
  // Safely normalise features — builder might pass a comma-separated string
  const isFeatureArray = Array.isArray(features);
  const featureList: string[] = isFeatureArray
    ? (features as string[])
    : typeof features === 'string'
    ? features.split(',').map((f) => f.trim()).filter(Boolean)
    : [];

  return (
    <div className={`
      relative p-8 rounded-3xl border transition-all duration-500 flex flex-col h-full
      ${isPopular ? 'border-indigo-500 bg-zinc-950 scale-105 shadow-2xl shadow-indigo-500/10 z-10' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}
    `}>
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-indigo-500/40">
          Most Popular
        </span>
      )}
      
      <div className="mb-8">
        <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-2">
          <EditableText id={id} propKey="plan" value={plan} />
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">
            <EditableText id={id} propKey="price" value={price} />
          </span>
          <span className="text-zinc-500 text-sm">
            <EditableText id={id} propKey="period" value={period} />
          </span>
        </div>
      </div>
      
      <ul className="space-y-4 mb-8 flex-1">
        {featureList.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Check className="text-green-500" size={12} />
            </div>
            {isFeatureArray ? (
              <EditableText id={id} propKey={`features.${idx}`} value={feature} />
            ) : (
              feature
            )}
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => {
          if (!isLoggedIn()) {
            router.push('/login');
            return;
          }
          if (ctaLink) router.push(ctaLink);
        }}
        style={{ backgroundColor: isPopular ? accentColor : 'transparent' }}
        className={`
          w-full py-4 rounded-xl font-bold text-sm transition-all
          ${isPopular ? 'text-white hover:brightness-110 shadow-lg shadow-indigo-500/20' : 'border border-zinc-700 text-white hover:border-white hover:bg-zinc-800'}
        `}
      >
        <EditableText id={id} propKey="ctaText" value={ctaText} />
      </button>
    </div>
  );
}
