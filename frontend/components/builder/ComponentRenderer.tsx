'use client';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { NewsFeed } from './sections/NewsFeed';
import { ProductGrid } from './sections/ProductGrid';
import { AccordionSection } from './sections/AccordionSection';
import { Button } from './sections/Button';
import StatsBar from './sections/StatsBar';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import GalleryGrid from './sections/GalleryGrid';

const COMPONENT_MAP: Record<string, React.FC<any>> = {
  Navbar,
  Hero,
  NewsFeed,
  ProductGrid,
  Accordion: AccordionSection,
  Button,
  StatsBar,
  PricingSection,
  ContactSection,
  GalleryGrid,
};

interface ComponentRendererProps {
  type: string;
  props: any;
}

export const ComponentRenderer = ({ type, props }: ComponentRendererProps) => {
  const Component = COMPONENT_MAP[type];

  if (!Component) {
    return (
      <div className="p-10 border border-dashed border-zinc-800 rounded-xl text-center text-zinc-500">
        Component type <code className="text-indigo-400 font-mono">{type}</code> not found in mapping.
      </div>
    );
  }

  return <Component {...props} />;
};
