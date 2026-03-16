import { TemplateDefinition } from '../types';

export const creativeDev: TemplateDefinition = {
  id: 'creative-dev',
  name: 'Creative Dev',
  category: 'portfolio',
  style: 'modern',
  description: 'Bold, dark, and highly animated. Perfect for developers, designers, and creative technologists.',
  thumbnail: '/templates/creative-dev.webp',
  accentColor: '#06b6d4', // Cyan 500
  config: {
    pages: [
      {
        id: 'home',
        label: 'Home',
        components: [
          {
            id: 'nav-1',
            type: 'Navbar',
            props: {
              logoText: 'CREATIVE.DEV',
              backgroundColor: '#000000'
            }
          },
          {
            id: 'hero-1',
            type: 'HeroTemplate',
            props: {
              title: 'Building Fluid Digital Experiences',
              description: 'Frontend Engineer focused on WebGL, Framer Motion, and Next.js.',
              image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2000',
              alignment: 'left'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#06b6d4', fontFamily: 'Inter' }
  }
};
