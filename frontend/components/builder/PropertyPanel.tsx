'use client';
import React from 'react';
import { COMPONENT_REGISTRY } from '@/lib/builder/registry';
import { Input } from './atoms/Input';
import { Checkbox } from './atoms/Checkbox';
import { X, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface PropertyPanelProps {
  selectedId: string | null;
  components: any[];
  pages: { id: string, label: string }[];
  onUpdate: (id: string, props: any) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
  onClose: () => void;
}

export const PropertyPanel = ({
  selectedId,
  components,
  pages,
  onUpdate,
  onDelete,
  onMove,
  onClose,
}: PropertyPanelProps) => {
  const component = components.find(c => c.id === selectedId);
  
  if (!component) return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-zinc-500">
      <p className="text-sm">Select a component on the canvas to edit its properties.</p>
    </div>
  );

  const registryItem = COMPONENT_REGISTRY[component.type];
  if (!registryItem) return null;

  const handleChange = (key: string, value: any) => {
    onUpdate(component.id, { [key]: value });
  };

  const handleListItemChange = (key: string, index: number, field: string, value: any) => {
    const list = [...(component.props[key] || [])];
    list[index] = { ...list[index], [field]: value };
    handleChange(key, list);
  };

  const addListItem = (key: string) => {
    const list = [...(component.props[key] || [])];
    list.push({ label: 'New Item', href: '#' });
    handleChange(key, list);
  };

  const removeListItem = (key: string, index: number) => {
    const list = [...(component.props[key] || [])];
    list.splice(index, 1);
    handleChange(key, list);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-zinc-100">{registryItem.label}</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{component.id.split('-')[0]}</p>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-100">
          <X size={18} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-zinc-900 bg-zinc-900/30">
        <button onClick={() => onMove(component.id, 'up')} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400">
          <ArrowUp size={16} />
        </button>
        <button onClick={() => onMove(component.id, 'down')} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400">
          <ArrowDown size={16} />
        </button>
        <div className="flex-1" />
        <button onClick={() => onDelete(component.id)} className="p-1.5 hover:bg-red-900/30 rounded text-red-500">
          <Trash2 size={16} />
        </button>
      </div>

      {/* Inputs */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {registryItem.propSchema.map(field => {
          const value = component.props[field.key];

          return (
            <div key={field.key}>
              {field.type === 'text' && (
                <div className="space-y-2">
                  <Input 
                    label={field.label}
                    value={value || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value)}
                  />
                  {(field.key === 'link' || field.key.includes('Link') || field.key.includes('href')) && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Link to Internal Page</label>
                      <select 
                        className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-400 outline-none"
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        value={value}
                      >
                        <option value="">-- Select Page --</option>
                        {pages.map(p => (
                          <option key={p.id} value={`/${p.id}`}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {field.type === 'number' && (
                <Input 
                  type="number"
                  label={field.label}
                  value={value || 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, parseInt(e.target.value))}
                />
              )}

              {field.type === 'boolean' && (
                <Checkbox 
                  label={field.label}
                  checked={!!value}
                  onChange={e => handleChange(field.key, e.target.checked)}
                />
              )}

              {field.type === 'color' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{field.label}</label>
                  <div className="flex gap-3">
                    <input 
                      type="color"
                      value={value || '#000000'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value)}
                      className="w-10 h-10 rounded bg-transparent border-none cursor-pointer"
                    />
                    <input 
                      type="text"
                      value={value || '#000000'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 text-sm text-zinc-300"
                    />
                  </div>
                </div>
              )}

              {field.type === 'select' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{field.label}</label>
                  <select 
                    value={value || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(field.key, e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none focus:border-indigo-500"
                  >
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {field.type === 'image' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{field.label}</label>
                  <div className="flex flex-col gap-2">
                    {value && (
                      <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <Input 
                      placeholder="Paste Image URL"
                      value={value || ''}
                      onChange={e => handleChange(field.key, e.target.value)}
                    />
                    <p className="text-[10px] text-zinc-500 italic">Pro-tip: Upload images to Bunny.net and paste the URL here.</p>
                  </div>
                </div>
              )}

              {field.type === 'list' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{field.label}</label>
                    <button 
                      onClick={() => addListItem(field.key)}
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-3">
                    {Array.isArray(value) && value.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 space-y-3 relative group/item">
                        <button 
                          onClick={() => removeListItem(field.key, idx)}
                          className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                        <Input 
                          label="Label"
                          value={item.label || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleListItemChange(field.key, idx, 'label', e.target.value)}
                        />
                        <div className="space-y-1.5">
                          <Input 
                            label="URL / Page Href"
                            value={item.href || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleListItemChange(field.key, idx, 'href', e.target.value)}
                          />
                          <select 
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-[10px] text-zinc-400 outline-none"
                            onChange={(e) => handleListItemChange(field.key, idx, 'href', e.target.value)}
                            value={item.href || ''}
                          >
                            <option value="">-- Link to Page --</option>
                            {pages.map(p => (
                              <option key={p.id} value={`/${p.id}`}>Page: {p.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
