'use client';
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Checkbox = ({
  label,
  description,
  className = '',
  ...props
}: CheckboxProps) => {
  return (
    <label className={`flex items-start gap-3 cursor-pointer group ${className}`}>
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <div className="
          w-5 h-5 border border-zinc-700 rounded bg-zinc-900 
          peer-checked:bg-indigo-600 peer-checked:border-indigo-600
          peer-focus:ring-2 peer-focus:ring-indigo-500/20
          transition-all duration-200
        " />
        <svg 
          className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-xs text-zinc-500">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};
