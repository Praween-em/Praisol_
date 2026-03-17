'use client';
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { COMPONENT_REGISTRY } from './registry';

export interface BuilderComponent {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface BuilderPage {
  id: string;
  label: string;
  components: BuilderComponent[];
}

export interface BuilderConfig {
  pages: BuilderPage[];
  globalSettings: Record<string, any>;
}

export function useBuilder(initialConfig?: BuilderConfig) {
  const [config, setConfig] = useState<BuilderConfig>(initialConfig || {
    pages: [{ id: 'home', label: 'Home', components: [] }],
    globalSettings: {
      primaryColor: '#6366f1',
      fontFamily: 'Inter',
    }
  });

  const [activePageId, setActivePageId] = useState('home');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const activePage = config.pages.find(p => p.id === activePageId) || config.pages[0];

  const addComponent = useCallback((type: string) => {
    const registryItem = COMPONENT_REGISTRY[type];
    if (!registryItem) return;

    const newComponent: BuilderComponent = {
      id: uuidv4(),
      type,
      props: { ...registryItem.defaultProps }
    };

    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(p => 
        p.id === activePageId 
          ? { ...p, components: [...p.components, newComponent] }
          : p
      )
    }));

    setSelectedComponentId(newComponent.id);
  }, [activePageId]);

  const updateComponentProps = useCallback((id: string, newProps: Record<string, any>) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(p => ({
        ...p,
        components: p.components.map(c => {
          if (c.id !== id) return c;
          
          const updatedProps = { ...c.props };
          
          Object.entries(newProps).forEach(([key, value]) => {
            if (key.includes('.')) {
              const path = key.split('.');
              let current: any = updatedProps;
              for (let i = 0; i < path.length - 1; i++) {
                const step = path[i];
                // Handle array index or object key
                const nextStep = isNaN(Number(path[i+1])) ? {} : [];
                current[step] = current[step] ? (Array.isArray(current[step]) ? [...current[step]] : { ...current[step] }) : nextStep;
                current = current[step];
              }
              current[path[path.length - 1]] = value;
            } else {
              updatedProps[key] = value;
            }
          });

          return { ...c, props: updatedProps };
        })
      }))
    }));
  }, []);

  const removeComponent = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(p => ({
        ...p,
        components: p.components.filter(c => c.id !== id)
      }))
    }));
    if (selectedComponentId === id) setSelectedComponentId(null);
  }, [selectedComponentId]);

  const moveComponent = useCallback((id: string, direction: 'up' | 'down') => {
    setConfig(prev => {
      const page = prev.pages.find(p => p.id === activePageId);
      if (!page) return prev;

      const idx = page.components.findIndex(c => c.id === id);
      if (idx === -1) return prev;

      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= page.components.length) return prev;

      const newComponents = [...page.components];
      [newComponents[idx], newComponents[newIdx]] = [newComponents[newIdx], newComponents[idx]];

      return {
        ...prev,
        pages: prev.pages.map(p => 
          p.id === activePageId ? { ...p, components: newComponents } : p
        )
      };
    });
  }, [activePageId]);

  const addPage = useCallback((label: string) => {
    const id = label.toLowerCase().replace(/\s+/g, '-');
    setConfig(prev => {
      if (prev.pages.find(p => p.id === id)) return prev;
      return {
        ...prev,
        pages: [...prev.pages, { id, label, components: [] }]
      };
    });
    setActivePageId(id);
  }, []);

  const deletePage = useCallback((id: string) => {
    setConfig(prev => {
      if (prev.pages.length <= 1) return prev;
      const newPages = prev.pages.filter(p => p.id !== id);
      return { ...prev, pages: newPages };
    });
    if (activePageId === id) {
      setActivePageId(config.pages.find(p => p.id !== id)?.id || 'home');
    }
  }, [activePageId, config.pages]);

  return {
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
    setConfig,
  };
}
