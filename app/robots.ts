import type { MetadataRoute } from 'next';
import { identity } from '@/lib/profile';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${identity.domain}/sitemap.xml`,
  };
}
