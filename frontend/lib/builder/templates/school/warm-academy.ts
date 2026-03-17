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
            id: 'testimonials-1',
            type: 'Testimonial',
            props: {
              quote: "Warm Academy has been a second home for my children. The teachers are incredibly supportive.",
              author: "Sarah Jenkins",
              role: "Parent of Grade 5 Student"
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
          { 
            id: 'nav-2', 
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
            id: 'hero-2', 
            type: 'HeroTemplate', 
            props: { 
              title: 'Our Heritage', 
              subtitle: 'Since 1985, we have been committed to holistic development.',
              alignment: 'center', 
              ctaText: 'View Our History', 
              ctaLink: '#' 
            } 
          },
          { 
            id: 'team-1', 
            type: 'TeamGrid', 
            props: { 
              title: 'Our Leadership Team',
              description: 'Excellence starts with visionary leadership.'
            } 
          },
          {
            id: 'faq-about',
            type: 'FAQ',
            props: {
              title: 'Common Questions',
              items: [
                { question: 'What is the student-teacher ratio?', answer: 'We maintain a healthy 14:1 ratio to ensure personal attention.' },
                { question: 'Do you offer extracurriculars?', answer: 'Yes, we have over 20 clubs ranging from robotics to drama.' }
              ]
            }
          },
          { id: 'footer-2', type: 'Footer', props: { brandName: 'Warm Academy', backgroundColor: '#1c1917' } }
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
            id: 'hero-3', 
            type: 'HeroTemplate', 
            props: { 
              title: 'Join Our Community', 
              subtitle: 'Admissions for Academic Year 2026 are now open.',
              alignment: 'left'
            } 
          },
          {
            id: 'process-1',
            type: 'AccordionSection',
            props: {
              title: 'Admission Process',
              items: [
                { title: 'Step 1: Application', content: 'Fill out the online application form and submit required documents.' },
                { title: 'Step 2: Interaction', content: 'A brief interactive session with the student and parents.' },
                { title: 'Step 3: Registration', content: 'Once approved, complete the registration by paying the admission fee.' }
              ]
            }
          },
          {
            id: 'admissions-contact',
            type: 'Banner',
            props: {
              title: 'Need Help with Admissions?',
              subtitle: 'Our counseling team is here to guide you through every step.',
              buttonText: 'Contact Counselor',
              buttonLink: '/contact'
            }
          },
          { id: 'footer-3', type: 'Footer', props: { brandName: 'Warm Academy', backgroundColor: '#1c1917' } }
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
            id: 'contact-section-1',
            type: 'ContactSection',
            props: {
              title: 'Get in Touch',
              description: 'Have a question? We would love to hear from you.',
              email: 'info@warmacademy.edu',
              phone: '+1 (555) 123-4567',
              address: '123 Education Lane, Learning City, ST 12345'
            }
          },
          { id: 'footer-4', type: 'Footer', props: { brandName: 'Warm Academy', backgroundColor: '#1c1917' } }
        ]
      }
    ],
    globalSettings: {
      primaryColor: '#b45309',
      fontFamily: 'serif'
    }
  }
};
