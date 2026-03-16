import { TemplateDefinition } from '../types';

export const digitalAgency: TemplateDefinition = {
  id: 'digital-agency',
  name: 'Digital Agency',
  category: 'business',
  style: 'modern',
  description: 'A vibrant, high-contrast, and dynamic design for creative studios and tech startups.',
  thumbnail: '/templates/digital-agency.webp',
  accentColor: '#f43f5e', // Rose 500
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
              logoText: 'PIXEL & CO.',
              backgroundColor: '#000000'
            }
          },
          {
            id: 'hero-1',
            type: 'HeroTemplate',
            props: {
              title: 'Bold Design. Fast Delivery.',
              description: 'We build digital products that people actually love to use.',
              image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000',
              alignment: 'center'
            }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#f43f5e', fontFamily: 'Inter' }
  }
};
