'use client';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = ({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 
            text-sm text-zinc-100 placeholder:text-zinc-600 outline-none
            focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
