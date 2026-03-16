export type PropType = 'text' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'list';

export interface PropSchemaItem {
  key: string;
  label: string;
  type: PropType;
  options?: { label: string; value: any }[]; // For 'select' type
}

export interface ComponentRegistryItem {
  category: 'Layout' | 'Content' | 'Interactive' | 'Sections' | 'E-commerce' | 'Basics';
  label: string;
  defaultProps: Record<string, any>;
  propSchema: PropSchemaItem[];
}

export const COMPONENT_REGISTRY: Record<string, ComponentRegistryItem> = {
  // Layout Group
  Section: {
    category: 'Layout',
    label: 'Section Wrapper',
    defaultProps: { backgroundColor: 'transparent', paddingTop: '4rem', paddingBottom: '4rem' },
    propSchema: [
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'paddingTop', label: 'Padding Top', type: 'text' },
      { key: 'paddingBottom', label: 'Padding Bottom', type: 'text' },
    ],
  },
  Container: {
    category: 'Layout',
    label: 'Max-Width Container',
    defaultProps: { maxWidth: '1200px', centered: true },
    propSchema: [
      { key: 'maxWidth', label: 'Max Width', type: 'text' },
      { key: 'centered', label: 'Center Container', type: 'boolean' },
    ],
  },
  Grid: {
    category: 'Layout',
    label: 'Responsive Grid',
    defaultProps: { columns: 3, gap: '1.5rem', responsive: true },
    propSchema: [
      { key: 'columns', label: 'Grid Columns', type: 'number' },
      { key: 'gap', label: 'Gap Spacing', type: 'text' },
      { key: 'responsive', label: 'Responsive Auto-fit', type: 'boolean' },
    ],
  },
  Column: {
    category: 'Layout',
    label: 'Grid Column',
    defaultProps: { span: 1, flex: '1' },
    propSchema: [
      { key: 'span', label: 'Column Span', type: 'number' },
      { key: 'flex', label: 'Flex Grow', type: 'text' },
    ],
  },
  Spacer: {
    category: 'Layout',
    label: 'Whitespace Spacer',
    defaultProps: { height: '2rem', width: '100%' },
    propSchema: [
      { key: 'height', label: 'Height', type: 'text' },
      { key: 'width', label: 'Width', type: 'text' },
    ],
  },

  // Content Group
  Heading: {
    category: 'Content',
    label: 'Typography: Heading',
    defaultProps: { text: 'Your Heading', level: 2, align: 'left', color: '#ffffff', marginBottom: '1rem' },
    propSchema: [
      { key: 'text', label: 'Text', type: 'text' },
      { key: 'level', label: 'Level (H1-H6)', type: 'number' },
      { key: 'align', label: 'Alignment', type: 'select', options: [
        { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }
      ]},
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'marginBottom', label: 'Margin Bottom', type: 'text' },
    ],
  },
  Paragraph: {
    category: 'Content',
    label: 'Typography: Paragraph',
    defaultProps: { text: 'Your paragraph text goes here.', align: 'left', color: '#a1a1aa', fontSize: '1.1rem' },
    propSchema: [
      { key: 'text', label: 'Content', type: 'text' },
      { key: 'align', label: 'Alignment', type: 'select', options: [
        { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }
      ]},
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size', type: 'text' },
    ],
  },
  List: {
    category: 'Content',
    label: 'Typography: List',
    defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'], type: 'bullet', color: '#a1a1aa' },
    propSchema: [
      { key: 'items', label: 'List Items', type: 'list' },
      { key: 'type', label: 'List Type', type: 'select', options: [
        { label: 'Bullet', value: 'bullet' }, { label: 'Ordered', value: 'ordered' }, { label: 'Checkmark', value: 'check' }
      ]},
      { key: 'color', label: 'Text Color', type: 'color' },
    ],
  },
  Image: {
    category: 'Content',
    label: 'Media: Image',
    defaultProps: { src: '', alt: 'Image', width: '100%', height: 'auto', borderRadius: '12px' },
    propSchema: [
      { key: 'src', label: 'Image URL', type: 'image' },
      { key: 'alt', label: 'Alt Text', type: 'text' },
      { key: 'width', label: 'Width', type: 'text' },
      { key: 'height', label: 'Height', type: 'text' },
      { key: 'borderRadius', label: 'Rounded Corners', type: 'text' },
    ],
  },
  Icon: {
    category: 'Content',
    label: 'Media: Icon',
    defaultProps: { iconName: 'Star', size: 24, color: '#6366f1' },
    propSchema: [
      { key: 'iconName', label: 'Lucide Icon Name', type: 'text' },
      { key: 'size', label: 'Icon Size (px)', type: 'number' },
      { key: 'color', label: 'Icon Color', type: 'color' },
    ],
  },

  // Interactive Group
  Tabs: {
    category: 'Interactive',
    label: 'Interactive: Tabs',
    defaultProps: { tabStyle: 'underline', activeColor: '#6366f1' },
    propSchema: [
      { key: 'items', label: 'Tabs (Label/Content)', type: 'list' },
      { key: 'tabStyle', label: 'Style', type: 'select', options: [{label: 'Underline', value: 'underline'}, {label: 'Pills', value: 'pills'}] },
      { key: 'activeColor', label: 'Active Color', type: 'color' },
    ],
  },
  Modal: {
    category: 'Interactive',
    label: 'Interactive: Modal',
    defaultProps: { triggerText: 'Open Modal', title: 'Modal Title', buttonVariant: 'primary' },
    propSchema: [
      { key: 'triggerText', label: 'Trigger Button Text', type: 'text' },
      { key: 'title', label: 'Modal Title', type: 'text' },
      { key: 'content', label: 'Modal Content', type: 'text' },
      { key: 'buttonVariant', label: 'Button Style', type: 'select', options: [{label: 'Primary', value: 'primary'}, {label: 'Secondary', value: 'secondary'}, {label: 'Outline', value: 'outline'}] },
    ],
  },
  Form: {
    category: 'Interactive',
    label: 'Interactive: Full Form',
    defaultProps: { title: 'Contact Us', description: 'Enter details below', buttonLabel: 'Send' },
    propSchema: [
      { key: 'title', label: 'Form Title', type: 'text' },
      { key: 'description', label: 'Form Description', type: 'text' },
      { key: 'buttonLabel', label: 'Submit Button Label', type: 'text' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
    ],
  },

  // Forms Category (Individual Elements)
  Input: {
    category: 'Basics', // Using Basics for form elements
    label: 'Form: Input',
    defaultProps: { label: 'Label', placeholder: 'Enter text...', type: 'text' },
    propSchema: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'placeholder', label: 'Placeholder', type: 'text' },
      { key: 'type', label: 'HTML Type', type: 'select', options: [{label: 'Text', value: 'text'}, {label: 'Email', value: 'email'}, {label: 'Number', value: 'number'}] },
    ],
  },
  Checkbox: {
    category: 'Basics',
    label: 'Form: Checkbox',
    defaultProps: { label: 'Check this box' },
    propSchema: [{ key: 'label', label: 'Label', type: 'text' }],
  },
  Submit: {
    category: 'Basics',
    label: 'Form: Submit Button',
    defaultProps: { label: 'Submit', width: 'w-full' },
    propSchema: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'width', label: 'Width (Tailwind)', type: 'text' },
    ],
  },

  // Advanced Group
  Card: {
    category: 'Basics',
    label: 'Layout: Card',
    defaultProps: { padding: '1.5rem', backgroundColor: '#18181b', borderRadius: '16px', hoverEffect: true },
    propSchema: [
      { key: 'padding', label: 'Padding', type: 'text' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'borderRadius', label: 'Border Radius', type: 'text' },
      { key: 'hoverEffect', label: 'Enable Hover Effect', type: 'boolean' },
    ],
  },
  PricingCard: {
    category: 'Sections',
    label: 'Advanced: Pricing Card',
    defaultProps: { plan: 'Pro', price: '$49', isPopular: true, features: ['Unlimited Sites', '24/7 Support', 'Custom Domain'] },
    propSchema: [
      { key: 'plan', label: 'Plan Name', type: 'text' },
      { key: 'price', label: 'Price', type: 'text' },
      { key: 'features', label: 'Features', type: 'list' },
      { key: 'isPopular', label: 'Popular Badge', type: 'boolean' },
      { key: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
  },
  BlogCard: {
    category: 'Sections',
    label: 'Advanced: Blog Card',
    defaultProps: { title: 'Modern Web Design', author: 'Admin', category: 'Design' },
    propSchema: [
      { key: 'title', label: 'Headline', type: 'text' },
      { key: 'excerpt', label: 'Excerpt', type: 'text' },
      { key: 'image', label: 'Thumbnail URL', type: 'image' },
      { key: 'category', label: 'Category', type: 'text' },
    ],
  },
  Testimonial: {
    category: 'Sections',
    label: 'Advanced: Testimonial',
    defaultProps: { author: 'Jane Cooper', role: 'Designer', quote: 'This builder is amazing!' },
    propSchema: [
      { key: 'author', label: 'Author Name', type: 'text' },
      { key: 'role', label: 'Role/Company', type: 'text' },
      { key: 'quote', label: 'Testimonial Text', type: 'text' },
      { key: 'avatar', label: 'Avatar URL', type: 'image' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
    ],
  },
  FAQ: {
    category: 'Sections',
    label: 'Advanced: FAQ',
    defaultProps: { items: [{question: 'Custom Q?', answer: 'Your custom answer here'}] },
    propSchema: [
      { key: 'items', label: 'Questions & Answers', type: 'list' },
    ],
  },
  HeroTemplate: {
    category: 'Sections',
    label: 'Advanced: Hero Layout',
    defaultProps: { title: 'Hero Headline', alignment: 'left', ctaText: 'Get Started', ctaLink: '#' },
    propSchema: [
      { key: 'title', label: 'Headline', type: 'text' },
      { key: 'description', label: 'Description', type: 'text' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Button Link / Page', type: 'text' },
      { key: 'image', label: 'Hero Image', type: 'image' },
      { key: 'alignment', label: 'Alignment', type: 'select', options: [{label: 'Left', value: 'left'}, {label: 'Center', value: 'center'}] },
    ],
  },

  // Global / Layout
  Navbar: {
    category: 'Sections',
    label: 'Navigation Bar',
    defaultProps: {
      logoText: 'PraiSol',
      logoImage: '',
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
      { key: 'logoImage', label: 'Logo Image (Upload or URL)', type: 'image' },
      { key: 'logoText', label: 'Logo Text / Brand Name', type: 'text' },
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

  // Personal Portfolio Sections
  ProjectGrid: {
    category: 'Sections',
    label: 'Portfolio Projects',
    defaultProps: {
      title: 'Featured Projects',
      projects: [
        { title: 'Project One', desc: 'A revolutionary app.', tags: ['React', 'Next.js'], link: '#', github: '#' },
        { title: 'Project Two', desc: 'Built for scale.', tags: ['Node.js', 'PostgreSQL'], link: '#', github: '#' },
      ],
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'projects', label: 'Projects List', type: 'list' },
    ],
  },

  ExperienceTimeline: {
    category: 'Sections',
    label: 'Work Experience',
    defaultProps: {
      title: 'Professional Journey',
      items: [
        { role: 'Senior Developer', company: 'Tech Corp', duration: '2021 - Present', current: true },
        { role: 'Junior Developer', company: 'StartUp Inc', duration: '2019 - 2021', current: false },
      ],
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'items', label: 'Experience Items', type: 'list' },
    ],
  },

  SkillMatrix: {
    category: 'Sections',
    label: 'Skill Matrix',
    defaultProps: {
      title: 'Technical Arsenal',
      skills: [
        { name: 'JavaScript', proficiency: 95 },
        { name: 'React', proficiency: 90 },
        { name: 'TypeScript', proficiency: 85 },
        { name: 'Database', proficiency: 80 },
      ],
    },
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'skills', label: 'Skills List', type: 'list' },
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
  },
  
  FixedText: {
    category: 'Content',
    label: 'Fixed/Floating Text',
    defaultProps: {
      text: 'Floating Text',
      fontSize: '1rem',
      fontWeight: 'normal',
      color: '#ffffff',
      align: 'left',
      top: '',
      bottom: '20px',
      left: '',
      right: '20px',
      zIndex: 10,
      backgroundColor: 'transparent',
      padding: '10px',
      borderRadius: '8px',
    },
    propSchema: [
      { key: 'text', label: 'Text Content', type: 'text' },
      { key: 'fontSize', label: 'Font Size', type: 'text' },
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: [{ label: 'Normal', value: 'normal'}, { label: 'Medium', value: 'medium'}, { label: 'Semibold', value: 'semibold'}, { label: 'Bold', value: 'bold'}] },
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'align', label: 'Text Alignment', type: 'select', options: [{ label: 'Left', value: 'left'}, { label: 'Center', value: 'center'}, { label: 'Right', value: 'right'}] },
      { key: 'top', label: 'Top Position', type: 'text' },
      { key: 'bottom', label: 'Bottom Position', type: 'text' },
      { key: 'left', label: 'Left Position', type: 'text' },
      { key: 'right', label: 'Right Position', type: 'text' },
      { key: 'zIndex', label: 'Z-Index (Layer)', type: 'number' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'text' },
      { key: 'borderRadius', label: 'Border Radius', type: 'text' },
    ],
  },

  // --- NEW COMPONENTS ---
  TeamGrid: {
    category: 'Sections',
    label: 'Team Members Grid',
    defaultProps: {
      title: 'Meet Our Team',
      subtitle: 'The talented people behind the scenes.',
      members: [
        { name: 'Aarav Sharma', role: 'Founder & CEO', bio: 'Visionary leader.' },
        { name: 'Priya Mehta', role: 'CTO', bio: 'Platform architect.' },
        { name: 'Rohan Singh', role: 'Designer', bio: 'UX craftsman.' },
      ],
      columns: 3,
      accentColor: '#6366f1',
    },
    propSchema: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'members', label: 'Team Members', type: 'list' },
      { key: 'columns', label: 'Columns', type: 'number' },
      { key: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
  },

  VideoEmbed: {
    category: 'Content',
    label: 'Video Embed (YouTube/Vimeo)',
    defaultProps: {
      title: 'Watch Our Story',
      videoUrl: '',
      aspectRatio: '16/9',
      showCaption: true,
      caption: 'See how we are changing education.',
      accentColor: '#6366f1',
    },
    propSchema: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'videoUrl', label: 'Video URL (YouTube / Vimeo)', type: 'text' },
      { key: 'showCaption', label: 'Show Caption', type: 'boolean' },
      { key: 'caption', label: 'Caption Text', type: 'text' },
      { key: 'accentColor', label: 'Border Glow Color', type: 'color' },
    ],
  },

  StatsCounter: {
    category: 'Sections',
    label: 'Stats / Counters',
    defaultProps: {
      title: 'By the Numbers',
      subtitle: 'Our impact in numbers',
      stats: [
        { label: 'Students', value: '5,000+', icon: '🎓' },
        { label: 'Teachers', value: '150+', icon: '👩‍🏫' },
        { label: 'Years', value: '25', icon: '🏆' },
        { label: 'Alumni', value: '20,000+', icon: '🌐' },
      ],
      layout: 'row',
      accentColor: '#6366f1',
      backgroundColor: 'transparent',
    },
    propSchema: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'stats', label: 'Stats List', type: 'list' },
      { key: 'layout', label: 'Layout', type: 'select', options: [{ label: 'Row', value: 'row' }, { label: 'Grid', value: 'grid' }] },
      { key: 'accentColor', label: 'Accent Color', type: 'color' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
  },

  Banner: {
    category: 'Sections',
    label: 'Announcement Banner',
    defaultProps: {
      text: '🚀 New session starting January 2025 — Limited seats!',
      subtext: '',
      ctaLabel: 'Apply Now',
      ctaLink: '#',
      backgroundColor: '#4f46e5',
      textColor: '#ffffff',
      accentColor: '#ffffff',
    },
    propSchema: [
      { key: 'text', label: 'Banner Message', type: 'text' },
      { key: 'subtext', label: 'Sub-text', type: 'text' },
      { key: 'ctaLabel', label: 'CTA Button Label', type: 'text' },
      { key: 'ctaLink', label: 'CTA Link', type: 'text' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
    ],
  },

  LogoCarousel: {
    category: 'Sections',
    label: 'Logo Carousel / Trusted By',
    defaultProps: {
      title: 'Trusted By',
      logos: [
        { name: 'Partner One' },
        { name: 'Partner Two' },
        { name: 'Partner Three' },
        { name: 'Partner Four' },
      ],
      backgroundColor: 'transparent',
    },
    propSchema: [
      { key: 'title', label: 'Section Label', type: 'text' },
      { key: 'logos', label: 'Partner Logos', type: 'list' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
  },

  Footer: {
    category: 'Sections',
    label: 'Site Footer',
    defaultProps: {
      brandName: 'PraiSol',
      tagline: 'Building the future, one site at a time.',
      copyrightText: `© ${new Date().getFullYear()} PraiSol. All rights reserved.`,
      backgroundColor: '#09090b',
      accentColor: '#6366f1',
    },
    propSchema: [
      { key: 'brandName', label: 'Brand Name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'copyrightText', label: 'Copyright Text', type: 'text' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
  },
};
