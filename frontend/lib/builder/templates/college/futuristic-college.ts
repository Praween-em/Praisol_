import { TemplateDefinition } from '../types';

export const futuristicCollege: TemplateDefinition = {
  id: 'futuristic-college',
  name: 'Futuristic College',
  category: 'college',
  style: 'modern',
  description: 'Cutting edge academics meet cutting edge design. Tech-ready and bold.',
  thumbnail: '/templates/futuristic-college.webp',
  accentColor: '#3b82f6', // Blue 500
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
              logoText: 'TECH-U',
              backgroundColor: '#0a0a0a'
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Beyond the Horizon',
              subtitle: 'Reimagining higher education for the 22nd century.',
              backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#3b82f6', fontFamily: 'Inter' }
  }
};
