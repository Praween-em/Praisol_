import { TemplateDefinition } from '../types';

export const neonCampus: TemplateDefinition = {
  id: 'neon-campus',
  name: 'Neon Campus',
  category: 'school',
  style: 'modern',
  description: 'A high-energy, futuristic design with bold gradients and dark backgrounds for modern tech-focused schools.',
  thumbnail: '/templates/neon-campus.webp',
  accentColor: '#a855f7', // Purple 500
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
              logoText: 'CyberAcademy',
              backgroundColor: '#09090b',
              links: [
                { label: 'Lab', href: '/' },
                { label: 'Modules', href: '/about' },
                { label: 'Enroll', href: '/admissions' },
                { label: 'Sync', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'HeroTemplate',
            props: {
              title: 'Code the Future. Build the World.',
              description: 'The premier destination for the next generation of engineers and creators.',
              ctaText: 'Start Your Journey',
              ctaLink: '/admissions',
              image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000',
              alignment: 'left'
            }
          },
          {
            id: 'banner-1',
            type: 'Banner',
            props: {
              text: 'Hackathon 2026 Registration is now LIVE!',
              backgroundColor: '#6b21a8'
            }
          },
          {
            id: 'stats-1',
            type: 'StatsBar',
            props: {
              stats: [
                { label: 'Code Lines', value: '1M+' },
                { label: 'Projects', value: '500+' },
                { label: 'Mentors', value: '42' }
              ],
              backgroundColor: '#1e1b4b'
            }
          },
          {
            id: 'footer-1',
            type: 'Footer',
            props: {
              brandName: 'CyberAcademy',
              backgroundColor: '#000000',
              accentColor: '#a855f7'
            }
          }
        ]
      }
    ],
    globalSettings: {
      primaryColor: '#a855f7',
      fontFamily: 'Inter'
    }
  }
};
