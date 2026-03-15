'use client';
import React from 'react';

// Single file for all basic form controls to keep registry manageable
export const FormInput = ({ label = 'Input Label', placeholder = 'Type here...', type = 'text', color = '#fff' }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-500 transition-all"
    />
  </div>
);

export const FormSelect = ({ label = 'Select Option', options = ['Option 1', 'Option 2'] }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-500 transition-all">
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const FormCheckbox = ({ label = 'Check this box' }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center group-hover:border-indigo-500 transition-all">
      <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500 scale-0 group-hover:scale-100 transition-transform" />
    </div>
    <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{label}</span>
    <input type="checkbox" className="hidden" />
  </label>
);

export const FormSubmit = ({ label = 'Submit Form', width = 'w-full' }: any) => (
  <button className={`${width} bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-500/10`}>
    {label}
  </button>
);
