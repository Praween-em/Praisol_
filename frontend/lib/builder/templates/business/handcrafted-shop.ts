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
              backgroundColor: '#fffbeb',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Our Story', href: '/story' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Beauty in Every Detail',
              subtitle: 'Handmade with love, delivered with care.',
              ctaText: 'Shop Collection',
              ctaLink: '/shop',
              backgroundImage: 'https://images.unsplash.com/photo-1459706484596-186105a67972?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'products-1',
            type: 'ProductGrid',
            props: { title: 'Featured Crafts' }
          },
          {
            id: 'footer-1',
            type: 'Footer',
            props: {
              brandName: 'Artisan Crafts',
              tagline: 'Handmade excellence.',
              backgroundColor: '#1c1917'
            }
          }
        ]
      },
      {
        id: 'shop',
        label: 'Shop',
        components: [
          {
            id: 'nav-2',
            type: 'Navbar',
            props: {
              logoText: 'Artisan Crafts',
              backgroundColor: '#fffbeb',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Our Story', href: '/story' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'shop-hero',
            type: 'HeroTemplate',
            props: {
              title: 'Our Collection',
              subtitle: 'Browse our latest handmade products.',
              alignment: 'center'
            }
          },
          {
            id: 'products-all',
            type: 'ProductGrid',
            props: { title: 'All Products' }
          },
          { id: 'footer-2', type: 'Footer', props: { brandName: 'Artisan Crafts', backgroundColor: '#1c1917' } }
        ]
      },
      {
        id: 'story',
        label: 'Our Story',
        components: [
          {
            id: 'nav-3',
            type: 'Navbar',
            props: {
              logoText: 'Artisan Crafts',
              backgroundColor: '#fffbeb',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Our Story', href: '/story' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'story-hero',
            type: 'HeroTemplate',
            props: {
              title: 'Our Story',
              subtitle: 'From a small workshop to a community of artisans.',
              alignment: 'center'
            }
          },
          {
            id: 'story-para',
            type: 'Paragraph',
            props: { text: 'We started in a garage with a passion for woodworking. Today, we source the finest sustainable materials to create timeless pieces for your home.', align: 'center' }
          },
          {
            id: 'team-story',
            type: 'TeamGrid',
            props: { title: 'Meet Our Artisans' }
          },
          { id: 'footer-3', type: 'Footer', props: { brandName: 'Artisan Crafts', backgroundColor: '#1c1917' } }
        ]
      },
      {
        id: 'faq',
        label: 'FAQ',
        components: [
          {
            id: 'nav-4',
            type: 'Navbar',
            props: {
              logoText: 'Artisan Crafts',
              backgroundColor: '#fffbeb',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Our Story', href: '/story' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'faq-hero',
            type: 'HeroTemplate',
            props: {
              title: 'Frequently Asked Questions',
              alignment: 'center'
            }
          },
          {
            id: 'faq-section',
            type: 'FAQ',
            props: {
              title: 'Shipping and Returns',
              items: [
                { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide. Shipping costs apply.' },
                { question: 'What is your return policy?', answer: 'We accept returns within 30 days of purchase for unused items in original packaging.' },
                { question: 'Are your materials sustainable?', answer: 'Absolutely. We only use responsibly sourced wood and eco-friendly finishes.' }
              ]
            }
          },
          { id: 'footer-4', type: 'Footer', props: { brandName: 'Artisan Crafts', backgroundColor: '#1c1917' } }
        ]
      },
      {
        id: 'contact',
        label: 'Contact',
        components: [
          {
            id: 'nav-5',
            type: 'Navbar',
            props: {
              logoText: 'Artisan Crafts',
              backgroundColor: '#fffbeb',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Our Story', href: '/story' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'contact-page',
            type: 'ContactSection',
            props: {
              title: 'Drop Us a Message',
              description: 'Whether you have a question about a product or want to request a custom order, we are here to help.',
              email: 'hello@artisancrafts.com',
              phone: '+1 (555) 987-6543',
              address: '45 Artisan Lane, Craftsville, CR 98765'
            }
          },
          { id: 'footer-5', type: 'Footer', props: { brandName: 'Artisan Crafts', backgroundColor: '#1c1917' } }
        ]
      }
    ],
    globalSettings: { primaryColor: '#92400e', fontFamily: 'serif' }
  }
};
