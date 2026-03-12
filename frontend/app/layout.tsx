import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = 'https://praisol.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'PraiSol — Build & Deploy School, College & Business Websites',
    template: '%s | PraiSol',
  },
  description:
    'Create fully functional school, college, and business management websites with our visual builder. No coding needed. Deploy in minutes — free forever.',
  keywords: [
    'school website builder',
    'college website builder',
    'business website builder',
    'no-code website builder',
    'deploy school website',
    'management system website',
    'PraiSol',
    'visual builder',
    'android app builder',
    'free website builder India',
  ],
  authors: [{ name: 'PraiSol', url: BASE_URL }],
  creator: 'PraiSol',
  publisher: 'PraiSol',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'PraiSol',
    title: 'PraiSol — Build & Deploy School, College & Business Websites',
    description:
      'Create fully functional school, college, and business management websites with our visual builder. No coding needed. Deploy in minutes — free forever.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PraiSol — Visual Website Builder for Schools, Colleges & Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PraiSol — Build & Deploy School, College & Business Websites',
    description:
      'Create fully functional school, college, and business management websites with our visual builder. No coding needed. Deploy in minutes — free.',
    images: ['/og-image.png'],
    creator: '@praisol',
  },
  verification: {
    // Add your Google Search Console verification token here:
    // google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
