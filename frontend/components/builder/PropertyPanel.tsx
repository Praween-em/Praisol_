'use client';
import React, { useState } from 'react';
import { COMPONENT_REGISTRY } from '@/lib/builder/registry';
import { Input } from './atoms/Input';
import { Checkbox } from './atoms/Checkbox';
import { X, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Settings2, Move, ChevronDown, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';

interface PropertyPanelProps {
  selectedId: string | null;
  components: any[];
  pages: { id: string, label: string }[];
  onUpdate: (id: string, props: any) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
  onClose: () => void;
}

// Collapsible section wrapper
function Section({ title, icon, children, defaultOpen = true }: { title: string; icon?: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: open ? '1.25rem' : 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.85rem 0', background: 'none', border: 'none', cursor: 'pointer',
          color: '#a1a1aa', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase'
        }}
      >
        {icon && <span style={{ opacity: 0.7 }}>{icon}</span>}
        <span style={{ flex: 1, textAlign: 'left' }}>{title}</span>
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {open && <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>{children}</div>}
    </div>
  );
}

// Simple friendly slider+number combo
function SpacingControl({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <label style={{ color: '#71717a', fontSize: '0.72rem', fontWeight: 600, minWidth: 80 }}>{label}</label>
      <input
        type="range" min={0} max={120} step={4}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: '#6366f1', cursor: 'pointer' }}
      />
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6, padding: '0.2rem 0.4rem', display: 'flex', alignItems: 'center', gap: '0.2rem',
        minWidth: 44
      }}>
        <span style={{ color: '#e4e4e7', fontSize: '0.8rem', fontWeight: 700, minWidth: 24, textAlign: 'right' }}>{value}</span>
        <span style={{ color: '#52525b', fontSize: '0.65rem' }}>px</span>
      </div>
    </div>
  );
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
  const router = useRouter();
  const component = components.find(c => c.id === selectedId);
  
  if (!component) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center', gap: '1rem' }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(99,102,241,0.08)', border: '1.5px solid rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Settings2 size={22} style={{ color: '#6366f1', opacity: 0.7 }} />
      </div>
      <p style={{ color: '#52525b', fontSize: '0.85rem', lineHeight: 1.6 }}>Select a component on the canvas to edit its properties.</p>
    </div>
  );

  const registryItem = COMPONENT_REGISTRY[component.type];
  if (!registryItem) return null;

  // Spacing state — stored directly in props
  const spc = component.props._spacing || { marginTop: 0, marginBottom: 0, paddingLeft: 0, paddingRight: 0 };
  const handleSpacing = (key: string, val: number) => {
    onUpdate(component.id, { _spacing: { ...spc, [key]: val } });
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0f' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(99,102,241,0.05)' }}>
        <div>
          <h3 style={{ color: '#e4e4e7', fontWeight: 800, fontSize: '0.9rem', margin: 0 }}>{registryItem.label}</h3>
          <p style={{ color: '#6366f1', fontSize: '0.65rem', fontWeight: 700, margin: '0.2rem 0 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{component.type}</p>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', padding: '0.25rem' }}>
          <X size={18} />
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => onMove(component.id, 'up')} title="Move Up" style={{ flex: 1, padding: '0.5rem', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#a1a1aa', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <ArrowUp size={13} /> Up
        </button>
        <button onClick={() => onMove(component.id, 'down')} title="Move Down" style={{ flex: 1, padding: '0.5rem', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#a1a1aa', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <ArrowDown size={13} /> Down
        </button>
        <button onClick={() => onDelete(component.id)} title="Delete" style={{ flex: 1, padding: '0.5rem', borderRadius: 8, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <Trash2 size={13} /> Delete
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem' }}>

        {/* SPACING — Universal for every component */}
        <Section title="Spacing" icon={<Move size={12} />} defaultOpen={true}>
          <p style={{ color: '#3f3f46', fontSize: '0.7rem', margin: '0 0 0.5rem' }}>Control the outer space around this component.</p>
          <SpacingControl label="Top margin" value={spc.marginTop} onChange={v => handleSpacing('marginTop', v)} />
          <SpacingControl label="Bottom margin" value={spc.marginBottom} onChange={v => handleSpacing('marginBottom', v)} />
          <SpacingControl label="Left padding" value={spc.paddingLeft} onChange={v => handleSpacing('paddingLeft', v)} />
          <SpacingControl label="Right padding" value={spc.paddingRight} onChange={v => handleSpacing('paddingRight', v)} />
        </Section>

        {/* CONTENT — component-specific props */}
        <Section title="Content" icon={<Settings2 size={12} />} defaultOpen={true}>
          {registryItem.propSchema.map(field => {
            const value = component.props[field.key];

            return (
              <div key={field.key}>
                {field.type === 'text' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Input
                      label={field.label}
                      value={value || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value)}
                    />
                    {(field.key === 'link' || field.key.includes('Link') || field.key.includes('href')) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ color: '#52525b', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Link to Page</label>
                        <select
                          style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.5rem 0.75rem', color: '#a1a1aa', fontSize: '0.8rem', outline: 'none' }}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          value={value}
                        >
                          <option value="">— Select internal page —</option>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ color: '#71717a', fontSize: '0.72rem', fontWeight: 600 }}>{field.label}</label>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={value || '#000000'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value)}
                        style={{ width: 40, height: 36, borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.08)', cursor: 'pointer', background: 'transparent', padding: '2px' }}
                      />
                      <input
                        type="text"
                        value={value || '#000000'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value)}
                        style={{ flex: 1, background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.4rem 0.65rem', color: '#e4e4e7', fontSize: '0.82rem', outline: 'none', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>
                )}

                {field.type === 'select' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ color: '#71717a', fontSize: '0.72rem', fontWeight: 600 }}>{field.label}</label>
                    <select
                      value={value || ''}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(field.key, e.target.value)}
                      style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.5rem 0.75rem', color: '#e4e4e7', fontSize: '0.82rem', outline: 'none', cursor: 'pointer' }}
                    >
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {field.type === 'image' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#71717a', fontSize: '0.72rem', fontWeight: 600 }}>{field.label}</label>
                    {value && (
                      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '16/9', background: '#18181b' }}>
                        <img src={value} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          onClick={() => handleChange(field.key, '')}
                          style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(17,17,17,0.85)', border: 'none', borderRadius: 6, padding: '0.25rem 0.5rem', color: '#f87171', cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <input
                          type="file"
                          id={`upload-${field.key}`}
                          style={{ display: 'none' }}
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const response = await api.post('/platform/upload/image', formData, {
                                headers: { 'Content-Type': 'multipart/form-data' },
                                timeout: 60000,
                              });
                              if (response.data.success) {
                                handleChange(field.key, response.data.data.url);
                              }
                            } catch (err: any) {
                              const msg = err.response?.data?.message || err.message || 'Unknown error';
                              alert(`Upload failed: ${msg}`);
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            if (!isLoggedIn()) {
                              router.push('/login');
                              return;
                            }
                            document.getElementById(`upload-${field.key}`)?.click();
                          }}
                          style={{ width: '100%', padding: '0.55rem', borderRadius: 8, background: '#4f46e5', border: 'none', color: '#fff', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                        >
                          <ImageIcon size={13} /> Upload Image
                        </button>
                      </div>
                    </div>
                    <Input
                      placeholder="Or paste image URL..."
                      value={value || ''}
                      onChange={e => handleChange(field.key, e.target.value)}
                    />
                  </div>
                )}

                {field.type === 'list' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <label style={{ color: '#71717a', fontSize: '0.72rem', fontWeight: 600 }}>{field.label}</label>
                      <button
                        onClick={() => addListItem(field.key)}
                        style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 6, padding: '0.2rem 0.6rem', color: '#818cf8', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                      >
                        + Add
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {Array.isArray(value) && value.map((item: any, idx: number) => (
                        <div key={idx} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                          <button
                            onClick={() => removeListItem(field.key, idx)}
                            style={{ position: 'absolute', top: 6, right: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', padding: '0.15rem' }}
                          >
                            <X size={12} />
                          </button>
                          {typeof item === 'string' ? (
                            <input
                              value={item}
                              onChange={e => {
                                const list = [...(component.props[field.key] || [])];
                                list[idx] = e.target.value;
                                handleChange(field.key, list);
                              }}
                              style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '0.4rem 0.65rem', color: '#e4e4e7', fontSize: '0.82rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                              placeholder={`Item ${idx + 1}`}
                            />
                          ) : (
                            Object.keys(item).filter(k => k !== 'href').map(k => (
                              <div key={k}>
                                <label style={{ color: '#52525b', fontSize: '0.65rem', fontWeight: 600, textTransform: 'capitalize' }}>{k}</label>
                                <input
                                  value={item[k] || ''}
                                  onChange={e => handleListItemChange(field.key, idx, k, e.target.value)}
                                  style={{ display: 'block', width: '100%', boxSizing: 'border-box', background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '0.35rem 0.65rem', color: '#e4e4e7', fontSize: '0.8rem', marginTop: '0.2rem', outline: 'none' }}
                                  placeholder={k}
                                />
                              </div>
                            ))
                          )}
                          {typeof item === 'object' && item !== null && 'href' in item && (
                            <div>
                              <label style={{ color: '#52525b', fontSize: '0.65rem', fontWeight: 600 }}>Link URL</label>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.2rem' }}>
                                <input
                                  value={item.href || ''}
                                  onChange={e => handleListItemChange(field.key, idx, 'href', e.target.value)}
                                  style={{ width: '100%', boxSizing: 'border-box', background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '0.35rem 0.65rem', color: '#e4e4e7', fontSize: '0.8rem', outline: 'none' }}
                                  placeholder="https://..."
                                />
                                <select
                                  style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '0.35rem 0.65rem', color: '#71717a', fontSize: '0.75rem', outline: 'none' }}
                                  onChange={e => handleListItemChange(field.key, idx, 'href', e.target.value)}
                                  value={item.href || ''}
                                >
                                  <option value="">— Link to internal page —</option>
                                  {pages.map(p => (
                                    <option key={p.id} value={`/${p.id}`}>{p.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Section>

      </div>
    </div>
  );
};
