export type PropType = 'text' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'list';

export interface PropSchemaItem {
  key: string;
  label: string;
  type: PropType;
  options?: { label: string; value: any }[]; // For 'select' type
}

export interface ComponentRegistryItem {
  category: 'Sections' | 'Content' | 'E-commerce' | 'Basics';
  label: string;
  defaultProps: Record<string, any>;
  propSchema: PropSchemaItem[];
}

export const COMPONENT_REGISTRY: Record<string, ComponentRegistryItem> = {
  // Global / Layout
  Navbar: {
    category: 'Sections',
    label: 'Navigation Bar',
    defaultProps: {
      logoText: 'PraiSol',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
      showCTA: true,
      ctaLabel: 'Get Started',
      ctaLink: '/contact',
      backgroundColor: '#09090b',
      sticky: true,
    },
    propSchema: [
      { key: 'logoText', label: 'Logo Text', type: 'text' },
      { key: 'links', label: 'Navigation Links', type: 'list' },
      { key: 'showCTA', label: 'Show CTA Button', type: 'boolean' },
      { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
      { key: 'ctaLink', label: 'CTA Link', type: 'text' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'sticky', label: 'Sticky Header', type: 'boolean' },
    ],
  },

  Button: {
    category: 'Basics',
    label: 'Call to Action Button',
    defaultProps: {
      label: 'Click Me',
      link: '#',
      variant: 'primary',
      size: 'md',
    },
    propSchema: [
      { key: 'label', label: 'Button Label', type: 'text' },
      { key: 'link', label: 'Link URL / Page', type: 'text' },
      { key: 'variant', label: 'Style Variant', type: 'select', options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
      ]},
      { key: 'size', label: 'Button Size', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ]},
    ]
  },

  // School / College Sections
  Hero: {
    category: 'Sections',
    label: 'Hero Section',
    defaultProps: {
      title: 'Welcome to Our Institution',
      subtitle: 'Shaping the future of education with excellence and innovation.',
      backgroundImage: '',
      ctaText: 'Apply Now',
      ctaLink: '/admissions',
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'backgroundImage', label: 'Background Image', type: 'image' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Button Link', type: 'text' },
    ],
  },

  NewsFeed: {
    category: 'Content',
    label: 'News & Announcements',
    defaultProps: {
      title: 'Latest Updates',
      limit: 6,
      showDate: true,
      layout: 'grid',
    },
    propSchema: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'limit', label: 'Number of Items', type: 'number' },
      { key: 'showDate', label: 'Show Published Date', type: 'boolean' },
      { 
        key: 'layout', 
        label: 'Layout Style', 
        type: 'select', 
        options: [
          { label: 'Grid', value: 'grid' },
          { label: 'List', value: 'list' }
        ] 
      },
    ],
  },

  // Business / E-commerce
  ProductGrid: {
    category: 'E-commerce',
    label: 'Product Showcase',
    defaultProps: {
      title: 'Our Products',
      showPrice: true,
      showCartButton: true,
      columns: 3,
    },
    propSchema: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'showPrice', label: 'Show Prices', type: 'boolean' },
      { key: 'showCartButton', label: 'Show Add to Cart', type: 'boolean' },
      { key: 'columns', label: 'Columns (Desktop)', type: 'number' },
    ],
  },
  
  // School / College Sections
  StatsBar: {
    category: 'Sections',
    label: 'Statistics Bar',
    defaultProps: {
      stats: [
        { label: 'Students', value: '1000+' },
        { label: 'Teachers', value: '50+' },
        { label: 'Years', value: '25' },
      ],
      backgroundColor: '#111827',
      textColor: '#ffffff',
    },
    propSchema: [
      { key: 'stats', label: 'Statistics List', type: 'list' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
    ],
  },

  GalleryGrid: {
    category: 'Content',
    label: 'Image Gallery',
    defaultProps: {
      title: 'Our Gallery',
      images: [
        { url: '', caption: 'Event 1' },
        { url: '', caption: 'Event 2' },
        { url: '', caption: 'Event 3' },
      ],
      columns: 3,
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'images', label: 'Gallery Images', type: 'list' },
      { key: 'columns', label: 'Columns (Desktop)', type: 'number' },
    ],
  },

  // Business / E-commerce
  PricingSection: {
    category: 'Sections',
    label: 'Pricing Tiers',
    defaultProps: {
      title: 'Our Plans',
      plans: [
        { name: 'Basic', price: '₹0', features: ['Feature 1', 'Feature 2'] },
        { name: 'Pro', price: '₹999', features: ['All Features', 'Support'], highlight: true },
      ],
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'plans', label: 'Pricing Plans', type: 'list' },
    ],
  },

  ContactSection: {
    category: 'Sections',
    label: 'Contact Info & Form',
    defaultProps: {
      title: 'Get in Touch',
      email: 'contact@example.online',
      phone: '+91 98765 43210',
      address: '123 Business Way, City, State',
      showForm: true,
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'email', label: 'Email Address', type: 'text' },
      { key: 'phone', label: 'Phone Number', type: 'text' },
      { key: 'address', label: 'Physical Address', type: 'text' },
      { key: 'showForm', label: 'Show Contact Form', type: 'boolean' },
    ],
  },
  
  // Basics / Atomic wrappers for the builder
  Accordion: {
    category: 'Basics',
    label: 'FAQ / Accordion',
    defaultProps: {
      title: 'Frequently Asked Questions',
      items: [
        { title: 'Question 1', content: 'Answer 1' },
      ]
    },
    propSchema: [
      { key: 'title', label: 'Section Title', type: 'text' },
    ],
  }
};
