'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBuilder } from '@/lib/builder/useBuilder';
import { COMPONENT_REGISTRY } from '@/lib/builder/registry';
import { Canvas } from '@/components/builder/Canvas';
import { PropertyPanel } from '@/components/builder/PropertyPanel';
import { isLoggedIn } from '@/lib/auth';
import { 
  ArrowLeft, Rocket, Globe, Smartphone, Monitor, Save,
  Box, Loader2, Info, Trash2
} from 'lucide-react';
import { DeployModal } from '@/components/builder/DeployModal';

const LOCAL_STORAGE_KEY = 'praisol_playground_config';

export default function PlaygroundPage() {
  const router = useRouter();
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [viewDevice, setViewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  
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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved config');
      }
    }
  }, [setConfig]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const handleDeploy = () => {
    // If logged in, go to dashboard/new with this config? Or show names modal.
    // If not logged in, show OTP/Login redirect.
    if (!isLoggedIn()) {
      // Store current config and redirect to login with callback
      // For now, let's just show a simple alert or redirect
      // router.push('/login?callback=/playground');
      setDeployModalOpen(true);
    } else {
      setDeployModalOpen(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden text-zinc-100">
      {/* Top Bar */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="h-6 w-[1px] bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider">Playground</span>
            <select 
              className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs font-bold text-zinc-400 outline-none hover:text-white cursor-pointer ml-1"
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
          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 mr-2">
            <Info size={14} /> Local Auto-save enabled
          </div>
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border ${previewMode ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}
          >
            <Globe size={16} />
            {previewMode ? 'Exit Preview' : 'Live Preview'}
          </button>
          <button 
            onClick={handleDeploy}
            className="flex items-center gap-2 px-6 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            <Rocket size={16} />
            Deploy Now
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
                  {['Sections', 'Content', 'E-commerce', 'Basics'].map((cat) => (
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
        <main className="flex-1 flex flex-col bg-zinc-900 relative">
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
              onNavigate={setActivePageId}
              viewDevice={viewDevice}
              preview={previewMode}
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

      {/* Deploy Modal Component */}
      {deployModalOpen && (
        <DeployModal 
          config={config}
          onClose={() => setDeployModalOpen(false)}
        />
      )}
    </div>
  );
}
