'use client';
import React, { createContext, useContext } from 'react';

interface BuilderContextType {
  isBuilder: boolean;
  onNavigate?: (href: string) => void;
  onUpdate?: (id: string, props: any) => void;
}

const BuilderContext = createContext<BuilderContextType>({
  isBuilder: false,
});

export const BuilderProvider = ({ children, isBuilder, onNavigate, onUpdate }: BuilderContextType & { children: React.ReactNode }) => {
  return (
    <BuilderContext.Provider value={{ isBuilder, onNavigate, onUpdate }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => useContext(BuilderContext);
