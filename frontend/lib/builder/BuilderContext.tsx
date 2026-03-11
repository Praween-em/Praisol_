'use client';
import React, { createContext, useContext } from 'react';

interface BuilderContextType {
  isBuilder: boolean;
  onNavigate?: (href: string) => void;
}

const BuilderContext = createContext<BuilderContextType>({
  isBuilder: false,
});

export const BuilderProvider = ({ children, isBuilder, onNavigate }: BuilderContextType & { children: React.ReactNode }) => {
  return (
    <BuilderContext.Provider value={{ isBuilder, onNavigate }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => useContext(BuilderContext);
