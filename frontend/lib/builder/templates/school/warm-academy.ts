import { TemplateDefinition } from '../types';

export const warmAcademy: TemplateDefinition = {
  id: 'warm-academy',
  name: 'Warm Academy',
  category: 'school',
  style: 'skeuomorphic',
  description: 'A cozy, textured school website with warm tones, serif fonts, and soft shadows.',
  thumbnail: '/templates/warm-academy.webp',
  accentColor: '#b45309', // Amber 700
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
              logoText: 'Warm Academy',
              backgroundColor: '#fafaf9',
              links: [
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Nurturing Minds in a Warm Environment',
              subtitle: 'A tradition of excellence, community, and personal growth since 1985.',
              ctaText: 'Apply for 2026',
              ctaLink: '/admissions',
              backgroundImage: 'https://images.unsplash.com/photo-1523050853064-80d83b934053?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'stats-1',
            type: 'StatsBar',
            props: {
              stats: [
                { label: 'Students', value: '1,200+' },
                { label: 'Teachers', value: '85' },
                { label: 'Years', value: '40' }
              ],
              backgroundColor: '#fef3c7'
            }
          },
          {
            id: 'news-1',
            type: 'NewsFeed',
            props: {
              title: 'Latest from the Hive',
              limit: 3
            }
          },
          {
            id: 'footer-1',
            type: 'Footer',
            props: {
              brandName: 'Warm Academy',
              tagline: 'Growing together, learning forever.',
              backgroundColor: '#1c1917'
            }
          }
        ]
      },
      {
        id: 'about',
        label: 'About Us',
        components: [
          { id: 'nav-2', type: 'Navbar', props: { logoText: 'Warm Academy', backgroundColor: '#fafaf9' } },
          { id: 'hero-2', type: 'HeroTemplate', props: { title: 'Our Heritage', alignment: 'center', ctaText: 'Our History', ctaLink: '#' } },
          { id: 'para-1', type: 'Paragraph', props: { text: 'Established in 1985, Warm Academy has been a cornerstone of local education...', align: 'center' } },
          { id: 'team-1', type: 'TeamGrid', props: { title: 'Our Leadership' } },
          { id: 'footer-2', type: 'Footer', props: { brandName: 'Warm Academy', backgroundColor: '#1c1917' } }
        ]
      }
    ],
    globalSettings: {
      primaryColor: '#b45309',
      fontFamily: 'serif'
    }
  }
};
