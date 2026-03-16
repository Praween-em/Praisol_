import { TemplateDefinition } from '../types';

export const handcraftedShop: TemplateDefinition = {
  id: 'handcrafted-shop',
  name: 'Handcrafted Shop',
  category: 'business',
  style: 'skeuomorphic',
  description: 'A rustic, tactile design for artisanal businesses and craft shops.',
  thumbnail: '/templates/handcrafted-shop.webp',
  accentColor: '#92400e', // Amber 800
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
              logoText: 'Artisan Crafts',
              backgroundColor: '#fffbeb'
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Beauty in Every Detail',
              subtitle: 'Handmade with love, delivered with care.',
              backgroundImage: 'https://images.unsplash.com/photo-1459706484596-186105a67972?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'products-1',
            type: 'ProductGrid',
            props: { title: 'Featured Crafts' }
          }
        ]
      }
    ],
    globalSettings: { primaryColor: '#92400e', fontFamily: 'serif' }
  }
};
