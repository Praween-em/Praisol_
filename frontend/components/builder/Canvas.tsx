'use client';
import React from 'react';
import { ComponentRenderer } from './ComponentRenderer';
import { BuilderComponent } from '@/lib/builder/useBuilder';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { BuilderProvider } from '@/lib/builder/BuilderContext';

interface CanvasProps {
  components: BuilderComponent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
  onNavigate?: (href: string) => void;
  preview?: boolean;
  viewDevice?: 'desktop' | 'mobile';
  globalSettings?: Record<string, any>;
}

export const Canvas = ({
  components,
  selectedId,
  onSelect,
  onDelete,
  onMove,
  onNavigate,
  preview = false,
  viewDevice = 'desktop',
  globalSettings = {},
}: CanvasProps) => {
  const cssVars = {
    '--color-primary': globalSettings.primaryColor || '#6366f1',
    '--color-primary-glow': `${globalSettings.primaryColor || '#6366f1'}33`,
    '--font-main': globalSettings.fontFamily === 'serif' ? 'Georgia, serif' : 'Inter, sans-serif',
  } as React.CSSProperties;

  return (
    <BuilderProvider isBuilder={!preview} onNavigate={onNavigate}>
      <div 
        style={cssVars}
        className={`
          flex-1 h-full overflow-y-auto overflow-x-hidden bg-zinc-900/50 relative font-[family-name:var(--font-main)]
        ${preview ? '' : (viewDevice === 'mobile' ? 'p-0 overflow-hidden' : 'p-8 md:p-12 overflow-hidden')}
      `}>
      {/* Canvas Interior */}
      <div className={`
        mx-auto transition-all duration-500 shadow-2xl relative flex flex-col
        ${preview ? 'w-full' : (viewDevice === 'mobile' ? 'w-full bg-zinc-950 min-h-[667px]' : 'w-full max-w-[1200px] border border-zinc-800 rounded-2xl bg-zinc-950 min-h-[800px]')}
      `}>
        {components.length === 0 && !preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <PlusIcon className="text-indigo-500 w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-zinc-100 mb-2">Build your vision</h2>
            <p className="text-zinc-500 max-w-sm">
              Click components in the left sidebar to add them to your page. Drag to reorder, click to customize.
            </p>
          </div>
        )}

        {components.map((comp) => {
          const isSelected = selectedId === comp.id;
          const spc = comp.props._spacing || {};
          const spacingStyle = {
            marginTop: spc.marginTop ? `${spc.marginTop}px` : undefined,
            marginBottom: spc.marginBottom ? `${spc.marginBottom}px` : undefined,
            paddingLeft: spc.paddingLeft ? `${spc.paddingLeft}px` : undefined,
            paddingRight: spc.paddingRight ? `${spc.paddingRight}px` : undefined,
          };
          
          return (
            <div
              key={comp.id}
              style={spacingStyle}
              onClick={(e) => {
                if (preview) return;
                e.stopPropagation();
                onSelect(comp.id);
              }}
              className={`
                group relative w-full h-full min-h-[50px] transition-all duration-200
                ${preview ? '' : 'hover:ring-2 hover:ring-indigo-500/30'}
                ${isSelected && !preview ? 'ring-2 ring-indigo-500 z-10' : ''}
              `}
            >
              {/* Component Controls (Builder only) */}
              {!preview && isSelected && (
                <div className="absolute -top-10 left-0 bg-indigo-600 rounded-t-lg flex items-center p-1 px-2 gap-1 animate-fade-up shadow-xl shadow-indigo-900/40">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest mr-2 px-1">
                    {comp.type}
                  </span>
                  <button onClick={() => onMove(comp.id, 'up')} className="p-1 hover:bg-white/10 rounded">
                    <ArrowUp size={12} className="text-white" />
                  </button>
                  <button onClick={() => onMove(comp.id, 'down')} className="p-1 hover:bg-white/10 rounded">
                    <ArrowDown size={12} className="text-white" />
                  </button>
                  <div className="w-[1px] h-3 bg-white/20 mx-1" />
                  <button onClick={() => onDelete(comp.id)} className="p-1 hover:bg-red-500/50 rounded">
                    <Trash2 size={12} className="text-white" />
                  </button>
                </div>
              )}

              <ComponentRenderer type={comp.type} props={comp.props} />
            </div>
          );
        })}
      </div>
    </div>
    </BuilderProvider>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);
