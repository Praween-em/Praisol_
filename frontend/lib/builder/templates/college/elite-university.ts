import { TemplateDefinition } from '../types';

export const eliteUniversity: TemplateDefinition = {
  id: 'elite-university',
  name: 'Elite University',
  category: 'college',
  style: 'professional',
  description: 'Sophisticated, global, and institutional. Reassuringly professional.',
  thumbnail: '/templates/elite-university.webp',
  accentColor: '#0c4a6e', // Sky 900
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
              logoText: 'Elite Global University',
              backgroundColor: '#ffffff'
            }
          },
          {
            id: 'hero-1',
            type: 'HeroTemplate',
            props: {
              title: 'Shape the Global Dialogue',
              description: 'A world-class research university located in the heart of innovation.',
              image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=2000'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#0c4a6e', fontFamily: 'sans-serif' }
  }
};
