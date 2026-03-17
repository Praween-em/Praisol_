import { TemplateDefinition } from '../types';

export const heritageInstitute: TemplateDefinition = {
  id: 'heritage-institute',
  name: 'Heritage Institute',
  category: 'college',
  style: 'skeuomorphic',
  description: 'A grand, traditional college design with depth and organic materials.',
  thumbnail: '/templates/heritage-institute.webp',
  accentColor: '#451a03', // Stone 900 / Brown
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
              logoText: 'Heritage College',
              backgroundColor: '#fff7ed',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Programs', href: '/programs' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'Hero',
            props: {
              title: 'Legacy in Every Stone',
              subtitle: 'Leading through centuries of academic brilliance and cultural heritage.',
              backgroundImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=2000'
            }
          },
          {
            id: 'stats-1',
            type: 'StatsBar',
            props: {
              stats: [
                { label: 'Students', value: '15,000+' },
                { label: 'Research Papers', value: '1,200+' },
                { label: 'Global Rank', value: '#42' }
              ],
              backgroundColor: '#fed7aa'
            }
          },
          {
            id: 'footer-1',
            type: 'Footer',
            props: {
              brandName: 'Heritage Institute',
              tagline: 'Preserving Wisdom, Inspiring Innovation.',
              backgroundColor: '#1c1917'
            }
          }
        ]
      },
      {
        id: 'programs',
        label: 'Programs',
        components: [
          { 
            id: 'nav-2', 
            type: 'Navbar', 
            props: { 
              logoText: 'Heritage College', 
              backgroundColor: '#fff7ed',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Programs', href: '/programs' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            } 
          },
          {
            id: 'programs-hero',
            type: 'HeroTemplate',
            props: {
              title: 'Academic Programs',
              subtitle: 'Explore our wide range of undergraduate and postgraduate courses.',
              alignment: 'center'
            }
          },
          {
            id: 'dept-grid',
            type: 'Grid',
            props: {
              title: 'Our Departments',
              columns: 3,
              items: [
                { title: 'Faculty of Arts', content: 'History, Literature, and Fine Arts.' },
                { title: 'School of Science', content: 'Physics, Chemistry, and Biological Sciences.' },
                { title: 'Engineering Hub', content: 'Computer Science, Mechanical, and Civil Engineering.' }
              ]
            }
          },
          { id: 'footer-2', type: 'Footer', props: { brandName: 'Heritage Institute', backgroundColor: '#1c1917' } }
        ]
      },
      {
        id: 'admissions',
        label: 'Admissions',
        components: [
          { 
            id: 'nav-3', 
            type: 'Navbar', 
            props: { 
              logoText: 'Heritage College', 
              backgroundColor: '#fff7ed',
              links: [
                { label: 'Home', href: '/' },
                { label: 'Programs', href: '/programs' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            } 
          },
          {
            id: 'admissions-header',
            type: 'HeroTemplate',
            props: {
              title: 'Admission Portal',
              subtitle: 'Applications for the upcoming session are now live.',
              alignment: 'center'
            }
          },
          {
            id: 'admissions-faq',
            type: 'FAQ',
            props: {
              title: 'Enrollment FAQ',
              items: [
                { question: 'What are the scholarship options?', answer: 'We offer merit-based and need-based scholarships.' },
                { question: 'How do I apply for campus housing?', answer: 'Housing applications are part of the main enrollment form.' }
              ]
            }
          },
          { id: 'footer-3', type: 'Footer', props: { brandName: 'Heritage Institute', backgroundColor: '#1c1917' } }
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
              logoText: 'Heritage College', 
              backgroundColor: '#fff7ed',
              links: [
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Contact', href: '/contact' }
              ]
            } 
          },
          {
            id: 'contact-form',
            type: 'ContactSection',
            props: {
              title: 'Campus Reach',
              description: 'Our administration office is available Mon-Fri, 9am - 5pm.',
              email: 'admin@heritage.edu.int',
              phone: '+1 (800) HERITAGE',
              address: 'University Square, Academic District'
            }
          },
          { id: 'footer-4', type: 'Footer', props: { brandName: 'Heritage Institute', backgroundColor: '#1c1917' } }
        ]
      }
    ],
    globalSettings: { primaryColor: '#451a03', fontFamily: 'serif' }
  }
};
