import { TemplateDefinition } from '../types';

export const executiveProfile: TemplateDefinition = {
  id: 'executive-profile',
  name: 'Executive Profile',
  category: 'portfolio',
  style: 'professional',
  description: 'Minimal, high-end, and focused. Designed for consultants, lawyers, and industry leaders.',
  thumbnail: '/templates/executive-profile.webp',
  accentColor: '#171717', // Neutral 900
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
              logoText: 'Jonathan Reed',
              backgroundColor: '#ffffff'
            }
          },
          {
            id: 'hero-1',
            type: 'HeroTemplate',
            props: {
              title: 'Strategic Counsel for Global Markets',
              description: 'Helping Fortune 500 companies navigate complex regulatory landscapes since 2008.',
              image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#171717', fontFamily: 'sans-serif' }
  }
};
