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
              backgroundColor: '#f5f5f4',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Resume', href: '/resume' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Capturing Timeless Moments',
              subtitle: 'Analog photography and soulful design for the modern era.',
              ctaText: 'View Gallery',
              ctaLink: '/gallery',
              backgroundImage: 'https://images.unsplash.com/photo-1495121553079-4c61bbbc19dd?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'featured-work',
            type: 'ProjectGrid',
            props: { title: 'Featured Work' }
          },
          {
            id: 'footer-1',
            type: 'Footer',
            props: {
              brandName: 'VNTG Studio',
              backgroundColor: '#1c1917'
            }
          }
        ]
      },
      {
        id: 'gallery',
        label: 'Gallery',
        components: [
          {
            id: 'nav-2',
            type: 'Navbar',
            props: {
              logoText: 'VNTG.',
              backgroundColor: '#f5f5f4',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Resume', href: '/resume' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'gallery-header',
            type: 'HeroTemplate',
            props: {
              title: 'Selected Works',
              subtitle: 'A curated collection of my finest analog captures.',
              alignment: 'center'
            }
          },
          {
            id: 'gallery-grid-1',
            type: 'GalleryGrid',
            props: { title: 'Portraits' }
          },
          { id: 'footer-2', type: 'Footer', props: { brandName: 'VNTG Studio', backgroundColor: '#1c1917' } }
        ]
      },
      {
        id: 'resume',
        label: 'Resume',
        components: [
          {
            id: 'nav-3',
            type: 'Navbar',
            props: {
              logoText: 'VNTG.',
              backgroundColor: '#f5f5f4',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Resume', href: '/resume' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'resume-header',
            type: 'HeroTemplate',
            props: {
              title: 'My Experience',
              subtitle: 'Over 10 years of visual storytelling and commercial photography.',
              alignment: 'left'
            }
          },
          {
            id: 'timeline-1',
            type: 'ExperienceTimeline',
            props: {
              title: 'Work History',
              experiences: [
                { role: 'Lead Photographer', company: 'Studio Blanc', duration: '2020 - Present', description: 'Directed commercial shoots for major fashion brands and managed a team of junior photographers.' },
                { role: 'Freelance Photojournalist', company: 'Global Times', duration: '2015 - 2020', description: 'Covered international stories and cultural events across 15 countries.' }
              ]
            }
          },
          { id: 'footer-3', type: 'Footer', props: { brandName: 'VNTG Studio', backgroundColor: '#1c1917' } }
        ]
      },
      {
        id: 'contact',
        label: 'Contact',
        components: [
          {
            id: 'nav-4',
            type: 'Navbar',
            props: {
              logoText: 'VNTG.',
              backgroundColor: '#f5f5f4',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Resume', href: '/resume' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'contact-page',
            type: 'ContactSection',
            props: {
              title: 'Let\'s Work Together',
              description: 'Available for freelance projects worldwide.',
              email: 'booking@vntgstudio.com',
              phone: '+1 (555) 765-4321',
              address: '101 Analog Avenue, Creative District'
            }
          },
          { id: 'footer-4', type: 'Footer', props: { brandName: 'VNTG Studio', backgroundColor: '#1c1917' } }
        ]
      }
    ],
    globalSettings: { primaryColor: '#78350f', fontFamily: 'serif' }
  }
};
