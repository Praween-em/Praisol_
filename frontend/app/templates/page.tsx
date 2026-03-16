'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  School, GraduationCap, Building2, UserCircle, 
  ArrowRight, CheckCircle, Zap, Search, Filter, Layers, Layout, LayoutGrid
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllTemplates, TemplateCategory, UIStyle } from '@/lib/builder/templates';

const CATEGORIES: { id: TemplateCategory | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All Templates', icon: <Layout size={16} /> },
  { id: 'school', label: 'Schools', icon: <School size={16} /> },
  { id: 'college', label: 'Colleges', icon: <GraduationCap size={16} /> },
  { id: 'business', label: 'Businesses', icon: <Building2 size={16} /> },
  { id: 'portfolio', label: 'Portfolios', icon: <UserCircle size={16} /> },
];

const STYLES: { id: UIStyle | 'all'; label: string }[] = [
  { id: 'all', label: 'All Styles' },
  { id: 'skeuomorphic', label: 'Skeuomorphic' },
  { id: 'professional', label: 'Professional' },
  { id: 'modern', label: 'Modern' },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedStyle, setSelectedStyle] = useState<UIStyle | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allTemplates = getAllTemplates();

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(t => {
      const categoryMatch = selectedCategory === 'all' || t.category === selectedCategory;
      const styleMatch = selectedStyle === 'all' || t.style === selectedStyle;
      const searchMatch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && styleMatch && searchMatch;
    });
  }, [selectedCategory, selectedStyle, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-indigo-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} className="fill-current" />
            Instant Deploy Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Perfect Foundation</span> <br className="hidden md:block" />
            For Your Next Project
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose from 12 premiums templates designed for every industry. 
            All templates are fully customizable, SEO-optimized, and responsive.
          </p>
        </div>
      </section>

      {/* Filters & Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {/* Search & Filters Bar */}
        <div className="sticky top-20 z-40 mb-12 flex flex-col md:flex-row gap-4 p-2 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar p-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          <div className="h-px md:h-8 w-full md:w-px bg-zinc-800 my-auto" />

          {/* Style Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar p-1">
            {STYLES.map(style => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all shrink-0 ${
                  selectedStyle === style.id
                    ? 'bg-white text-black border-white'
                    : 'text-zinc-500 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>

          <div className="h-px md:h-8 w-full md:w-px bg-zinc-800 my-auto" />

          {/* Search */}
          <div className="relative min-w-[200px] p-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input 
              type="text" 
              placeholder="Search templates..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo-500/50 transition-colors"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((t) => (
            <div 
              key={t.id} 
              className="group relative flex flex-col bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500"
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold group-hover:scale-110 transition-transform duration-700">
                  <LayoutGrid size={48} strokeWidth={1} />
                </div>
                
                {/* badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  <span className="px-2 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {t.category}
                  </span>
                  <span className={`px-2 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-black uppercase tracking-widest ${
                    t.style === 'skeuomorphic' ? 'text-amber-400' : 
                    t.style === 'modern' ? 'text-purple-400' : 'text-blue-400'
                  }`}>
                    {t.style}
                  </span>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <Link 
                    href={`/playground?template=${t.id}`}
                    className="px-6 py-3 bg-white text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                  >
                    Select Template
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{t.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1">
                  {t.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentColor }} />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Theme Accent</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                <Search size={32} className="text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">No templates found</h3>
              <p className="text-zinc-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedStyle('all'); setSearchQuery(''); }}
                className="mt-6 text-indigo-400 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
