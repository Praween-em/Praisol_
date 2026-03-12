import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/playground', '/login'],
        disallow: ['/dashboard/', '/dashboard/deployments/', '/api/'],
      },
    ],
    sitemap: 'https://praisol.online/sitemap.xml',
  };
}
