import { TemplateDefinition } from '../types';

export const vintageStudio: TemplateDefinition = {
  id: 'vintage-studio',
  name: 'Vintage Studio',
  category: 'portfolio',
  style: 'skeuomorphic',
  description: 'A physical-feeling portfolio design with paper textures, noise, and classic photography vibes.',
  thumbnail: '/templates/vintage-studio.webp',
  accentColor: '#78350f', // Brown 900
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
              logoText: 'VNTG.',
              backgroundColor: '#f5f5f4'
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Capturing Timeless Moments',
              subtitle: 'Analog photography and soulful design for the modern era.',
              backgroundImage: 'https://images.unsplash.com/photo-1495121553079-4c61bbbc19dd?auto=format&fit=crop&q=80&w=2000'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#78350f', fontFamily: 'serif' }
  }
};
