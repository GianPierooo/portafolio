import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/lib/mdx';
import { projects } from '@/lib/data';
import { identity } from '@/lib/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = identity.domain;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const allSlugs = Array.from(
    new Set([...getAllProjectSlugs(), ...projects.map((p) => p.slug)])
  );

  const projectRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
