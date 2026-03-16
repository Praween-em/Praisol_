import { TemplateDefinition } from '../types';

export const corporateSuite: TemplateDefinition = {
  id: 'corporate-suite',
  name: 'Corporate Suite',
  category: 'business',
  style: 'professional',
  description: 'Trustworthy, efficient, and precise. Designed for professional services and corporate entities.',
  thumbnail: '/templates/corporate-suite.webp',
  accentColor: '#334155', // Slate 700
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
              logoText: 'NexGen Solutions',
              backgroundColor: '#ffffff'
            }
          },
          {
            id: 'hero-1',
            type: 'HeroTemplate',
            props: {
              title: 'Strategic Growth for Modern Enterprise',
              description: 'We help global brands scale through data-driven strategies and institutional excellence.',
              image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#334155', fontFamily: 'sans-serif' }
  }
};
