'use client';
import { Navbar } from './sections/Navbar';
import { NavbarCentered } from './sections/NavbarCentered';
import { NavbarGlass } from './sections/NavbarGlass';
import { Hero } from './sections/Hero';
import { NewsFeed } from './sections/NewsFeed';
import { ProductGrid } from './sections/ProductGrid';
import { AccordionSection } from './sections/AccordionSection';
import { Button } from './sections/Button';
import { StatsBar } from './sections/StatsBar';
import { PricingSection } from './sections/PricingSection';
import { ContactSection } from './sections/ContactSection';
import { GalleryGrid } from './sections/GalleryGrid';
import { ProjectGrid } from './sections/ProjectGrid';
import { ExperienceTimeline } from './sections/ExperienceTimeline';
import { SkillMatrix } from './sections/SkillMatrix';
import { Section } from './sections/Section';
import { Container } from './sections/Container';
import { Grid } from './sections/Grid';
import { Column } from './sections/Column';
import { Spacer } from './sections/Spacer';
import { Heading } from './sections/Heading';
import { Paragraph } from './sections/Paragraph';
import { List } from './sections/List';
import { Image } from './sections/Image';
import { Icon } from './sections/Icon';
import { Tabs } from './sections/Tabs';
import { Modal } from './sections/Modal';
import { Form } from './sections/Form';
import { FormInput, FormSelect, FormCheckbox, FormSubmit } from './sections/FormElements';
import { Card } from './sections/Card';
import { PricingCard } from './sections/PricingCard';
import { BlogCard } from './sections/BlogCard';
import { Testimonial } from './sections/Testimonial';
import { FAQ } from './sections/FAQ';
import { HeroTemplate } from './sections/HeroTemplate';
import { TeamGrid } from './sections/TeamGrid';
import { VideoEmbed } from './sections/VideoEmbed';
import { StatsCounter } from './sections/StatsCounter';
import { Banner } from './sections/Banner';
import { LogoCarousel } from './sections/LogoCarousel';
import { Footer } from './sections/Footer';
import { FixedText } from './sections/FixedText';
import { DynamicNotifications } from './sections/DynamicNotifications';
import { DynamicProductCatalogue } from './sections/DynamicProductCatalogue';

const COMPONENT_MAP: Record<string, React.FC<any>> = {
  Navbar,
  NavbarCentered,
  NavbarGlass,
  Hero,
  NewsFeed,
  ProductGrid,
  Accordion: AccordionSection,
  Button,
  StatsBar,
  PricingSection,
  ContactSection,
  GalleryGrid,
  ProjectGrid,
  ExperienceTimeline,
  SkillMatrix,
  Section,
  Container,
  Grid,
  Column,
  Spacer,
  Heading,
  Paragraph,
  List,
  Image,
  Icon,
  Tabs,
  Modal,
  Form,
  Input: FormInput,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Submit: FormSubmit,
  Card,
  PricingCard,
  BlogCard,
  Testimonial,
  FAQ,
  HeroTemplate,
  TeamGrid,
  VideoEmbed,
  StatsCounter,
  Banner,
  LogoCarousel,
  Footer,
  FixedText,
  DynamicNotifications,
  DynamicProductCatalogue,
};

interface ComponentRendererProps {
  type: string;
  props: any;
  /** Passed on deployed tenant sites so Form can POST to the backend */
  tenantSlug?: string;
}

export const ComponentRenderer = ({ type, props, tenantSlug }: ComponentRendererProps) => {
  const Component = COMPONENT_MAP[type];

  if (!Component) {
    return (
      <div className="p-10 border border-dashed border-zinc-800 rounded-xl text-center text-zinc-500">
        Component type <code className="text-indigo-400 font-mono">{type}</code> not found in mapping.
      </div>
    );
  }

  // Pass tenantSlug to components that need to fetch from the backend
  const dynamicTypes = ['Form', 'DynamicNotifications', 'DynamicProductCatalogue'];
  const extraProps = {
    ...(dynamicTypes.includes(type) ? { tenantSlug } : {}),
    id: props.id || 'temp-id' // Ensure id is passed for inline editing
  };

  return <Component {...props} {...extraProps} />;
};
