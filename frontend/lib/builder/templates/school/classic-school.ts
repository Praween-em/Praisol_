import { TemplateDefinition } from '../types';

export const classicSchool: TemplateDefinition = {
  id: 'classic-school',
  name: 'Classic School',
  category: 'school',
  style: 'professional',
  description: 'A formal, clean, and reliable design for established institutions.',
  thumbnail: '/templates/classic-school.webp',
  accentColor: '#1e40af', // Blue 800
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
              logoText: 'St. Mary High',
              backgroundColor: '#ffffff',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Curriculum', href: '/about' },
                { label: 'Admission', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Academic Excellence & Moral Integrity',
              subtitle: 'Empowering future leaders through rigorous academics and ethical grounding.',
              ctaText: 'View Prospectus',
              ctaLink: '/admissions',
              backgroundImage: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'stats-1',
            type: 'StatsCounter',
            props: {
              title: 'Our Achievements',
              stats: [
                { label: 'Board Result', value: '100%', icon: '📈' },
                { label: 'IIT Placements', value: '45+', icon: '🎓' },
                { label: 'Sports Trophies', value: '150+', icon: '🏆' }
              ],
              layout: 'row',
              accentColor: '#1e40af'
            }
          },
          {
            id: 'feed-1',
            type: 'NewsFeed',
            props: { title: 'School Notices', limit: 4 }
          },
          {
            id: 'footer-1',
            type: 'Footer',
            props: {
              brandName: 'St. Mary High',
              backgroundColor: '#0f172a'
            }
          }
        ]
      },
      {
        id: 'about',
        label: 'About Us',
        components: [
          {
            id: 'nav-2',
            type: 'Navbar',
            props: {
              logoText: 'St. Mary High',
              backgroundColor: '#ffffff',
              links: [
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Admission', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-about',
            type: 'Hero',
            props: {
              title: 'Our History & Values',
              subtitle: 'Founded in 1950, we have been a beacon of learning for generations.',
              ctaText: 'View Gallery',
              ctaLink: '/gallery',
              backgroundImage: 'https://images.unsplash.com/photo-1523050853064-85a17f009041?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'footer-2',
            type: 'Footer',
            props: {
              brandName: 'St. Mary High',
              backgroundColor: '#0f172a'
            }
          }
        ]
      }
    ],
    globalSettings: {
      primaryColor: '#1e40af',
      fontFamily: 'sans-serif'
    }
  }
};
