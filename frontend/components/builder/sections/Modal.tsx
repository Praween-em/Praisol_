'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  triggerText?: string;
  title?: string;
  content?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

export default function Modal({
  triggerText = 'Open Modal',
  title = 'Modal Title',
  content = 'This is the modal content. You can use it to display extra information without leaving the page.',
  buttonVariant = 'primary',
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg
          ${buttonVariant === 'primary' ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20' : ''}
          ${buttonVariant === 'secondary' ? 'bg-zinc-800 text-white hover:bg-zinc-700 shadow-black/20' : ''}
          ${buttonVariant === 'outline' ? 'border border-zinc-700 text-zinc-300 hover:border-zinc-500' : ''}
        `}
      >
        {triggerText}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-900">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-zinc-400 leading-relaxed">
                {content}
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white"
              >
                Close
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
