import { TemplateDefinition } from '../types';

export const heritageInstitute: TemplateDefinition = {
  id: 'heritage-institute',
  name: 'Heritage Institute',
  category: 'college',
  style: 'skeuomorphic',
  description: 'A grand, traditional college design with depth and organic materials.',
  thumbnail: '/templates/heritage-institute.webp',
  accentColor: '#451a03', // Stone 900 / Brown
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
              logoText: 'Heritage College',
              backgroundColor: '#fff7ed',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Programs', href: '/programs' },
                { label: 'Research', href: '/research' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Legacy in Every Stone',
              subtitle: 'Leading through centuries of academic brilliance and cultural heritage.',
              backgroundImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=2000'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#451a03', fontFamily: 'serif' }
  }
};
