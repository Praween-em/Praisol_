'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBuilder } from '@/lib/builder/useBuilder';
import { COMPONENT_REGISTRY } from '@/lib/builder/registry';
import { Canvas } from '@/components/builder/Canvas';
import { PropertyPanel } from '@/components/builder/PropertyPanel';
import api from '@/lib/api';
import {
  ArrowLeft, Monitor, Smartphone, Globe, CheckCircle,
  ChevronRight, Box, Type, Image, LayoutGrid, Layers, Loader2, Trash2, Save
} from 'lucide-react';

export default function BuilderPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [viewDevice, setViewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [deploymentId, setDeploymentId] = useState<string | null>(null);

  const {
    config,
    activePage,
    activePageId,
    setActivePageId,
    selectedComponentId,
    setSelectedComponentId,
    addComponent,
    updateComponentProps,
    removeComponent,
    moveComponent,
    addPage,
    deletePage,
    setConfig
  } = useBuilder();

  const [activeTab, setActiveTab] = useState<'components' | 'pages'>('components');
  const [newPageName, setNewPageName] = useState('');

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageName.trim()) return;
    addPage(newPageName);
    setNewPageName('');
    setActiveTab('pages');
  };

  // Load initial config from database
  useEffect(() => {
    api.get(`/platform/deployments`)
      .then(r => {
        const deployment = (r.data.data as any[]).find(d => d.slug === slug);
        if (deployment) {
          setDeploymentId(deployment.id);
          if (deployment.builder_config) {
            setConfig(deployment.builder_config);
          }
        }
      });
  }, [slug, setConfig]);

  const handleSave = async () => {
    if (!deploymentId) return;
    setSaving(true);
    try {
      await api.put(`/platform/deployments/${deploymentId}/builder-config`, {
        builder_config: config
      });
      // Optionally show a success toast here
    } catch (error) {
      console.error('Failed to save builder config', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden text-zinc-100">
      {/* Top Bar */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/deployments/${slug}`} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="h-6 w-[1px] bg-zinc-800" />
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{slug}</span>
            <select
              className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs font-bold text-zinc-400 outline-none hover:text-white cursor-pointer ml-2"
              value={activePageId}
              onChange={(e) => setActivePageId(e.target.value)}
            >
              {config.pages.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="flex items-center bg-zinc-800/50 p-1 rounded-lg border border-zinc-700/50">
          <button
            onClick={() => { setViewDevice('desktop'); setPreviewMode(false); }}
            className={`p-1.5 rounded-md transition-all ${viewDevice === 'desktop' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => { setViewDevice('mobile'); setPreviewMode(false); }}
            className={`p-1.5 rounded-md transition-all ${viewDevice === 'mobile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border ${previewMode ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}
          >
            <Globe size={16} />
            {previewMode ? 'Exit Preview' : 'Live Preview'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Component Library */}
        {!previewMode && (
          <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col shrink-0">
            <div className="flex border-b border-zinc-900">
              <button
                onClick={() => setActiveTab('components')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'components' ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/5' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Components
              </button>
              <button
                onClick={() => setActiveTab('pages')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'pages' ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/5' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Pages
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
              {activeTab === 'components' ? (
                <div className="space-y-6">
                  {['Layout', 'Content', 'Interactive', 'Sections', 'E-commerce', 'Basics'].map((cat) => (
                    <div key={cat}>
                      <h3 className="text-[10px] font-bold text-zinc-600 uppercase mb-3 px-2">{cat}</h3>
                      <div className="grid grid-cols-1 gap-1">
                        {Object.entries(COMPONENT_REGISTRY)
                          .filter(([_, item]) => item.category === cat)
                          .map(([key, item]) => (
                            <button
                              key={key}
                              onClick={() => addComponent(key)}
                              className="flex items-center gap-3 w-full p-2.5 rounded-lg text-left text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all group"
                            >
                              <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                                <Box size={16} className="group-hover:text-indigo-400 transition-colors" />
                              </div>
                              <span className="text-sm font-medium">{item.label}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <form onSubmit={handleCreatePage} className="flex gap-2 p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <input
                      type="text"
                      placeholder="Page Name..."
                      className="flex-1 bg-transparent border-none text-xs text-zinc-300 outline-none px-1"
                      value={newPageName}
                      onChange={e => setNewPageName(e.target.value)}
                    />
                    <button type="submit" className="p-1.5 bg-indigo-600 rounded text-white hover:bg-indigo-700">
                      <Save size={12} />
                    </button>
                  </form>

                  <div className="space-y-1">
                    {config.pages.map(p => (
                      <div
                        key={p.id}
                        className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all ${activePageId === p.id ? 'bg-indigo-600/10 border border-indigo-600/30 text-indigo-400' : 'hover:bg-zinc-900 text-zinc-500 hover:text-zinc-400 border border-transparent'}`}
                        onClick={() => setActivePageId(p.id)}
                      >
                        <span className="text-xs font-semibold">{p.label}</span>
                        {config.pages.length > 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); deletePage(p.id); }}
                            className="p-1 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Center - Canvas Area */}
        <main className={`flex-1 flex flex-col bg-zinc-900 relative transition-all duration-300 ${previewMode ? 'p-0' : 'p-0'}`}>
          <div className={`
                h-full w-full mx-auto transition-all duration-500
                ${viewDevice === 'mobile' ? 'max-w-[375px] my-10 rounded-[3rem] border-[12px] border-zinc-800 shadow-2xl overflow-hidden' : 'w-full'}
              `}>
            <Canvas
              components={activePage.components}
              selectedId={selectedComponentId}
              onSelect={setSelectedComponentId}
              onDelete={removeComponent}
              onMove={moveComponent}
              onUpdate={updateComponentProps}
              onNavigate={setActivePageId}
              viewDevice={viewDevice}
              preview={previewMode}
              globalSettings={config.globalSettings}
            />
          </div>
        </main>

        {/* Right Panel - Properties */}
        {!previewMode && (
          <aside className="w-80 border-l border-zinc-800 bg-zinc-950 shrink-0">
            <PropertyPanel
              selectedId={selectedComponentId}
              components={activePage.components}
              pages={config.pages.map(p => ({ id: p.id, label: p.label }))}
              onUpdate={updateComponentProps}
              onDelete={removeComponent}
              onMove={moveComponent}
              onClose={() => setSelectedComponentId(null)}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
