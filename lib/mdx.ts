import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from './data';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

/**
 * Get all project slugs from MDX files
 */
export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get project data by slug
 * Returns frontmatter and content
 */
export async function getProjectBySlug(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as Partial<Project>,
    content,
  };
}

/**
 * Check if a project slug exists
 */
export function projectExists(slug: string): boolean {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}
