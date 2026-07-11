import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/mdx';
import { Github, ExternalLink, Calendar, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { verticals, getProjectBySlugFromData, type Project } from '@/lib/data';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ArchitectureDiagram from '@/components/ui/ArchitectureDiagram';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all projects (MDX + data.ts)
 */
export async function generateStaticParams() {
  const mdxSlugs = getAllProjectSlugs();
  const { projects } = await import('@/lib/data');
  const allSlugs = Array.from(new Set([...mdxSlugs, ...projects.map((p) => p.slug)]));
  return allSlugs.map((slug) => ({ slug }));
}

/**
 * Custom MDX Components
 * Styled for dark theme with cyberpunk aesthetics
 */
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-white mb-6 mt-8" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-white mb-4 mt-8" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-slate-200 mb-3 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-300 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-slate-300 space-y-2 mb-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-slate-300" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-slate-800 text-accent-cloud px-2 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto mb-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent-cloud hover:text-accent-ai underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-accent-cloud bg-slate-900/50 pl-4 py-2 italic text-slate-400 my-4"
      {...props}
    />
  ),
  // Diagrama de arquitectura animado, usable desde MDX: <ArchitectureDiagram preset="logimatix" />
  ArchitectureDiagram,
};

/** Shared header/actions from project data */
function ProjectHeader({
  project,
  accentColor,
}: {
  project: Project;
  accentColor: string;
}) {
  const primaryCategory = project.category[0];
  return (
    <header className="mb-12">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.category.map((cat) => (
          <span
            key={cat}
            className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
            style={{
              backgroundColor: `${verticals[cat]?.color}20`,
              color: verticals[cat]?.color,
              border: `1px solid ${verticals[cat]?.color}40`,
            }}
          >
            {verticals[cat]?.label}
          </span>
        ))}
      </div>
      <h1
        className="text-5xl sm:text-6xl font-bold text-white mb-4"
        style={{ textShadow: `0 0 40px ${accentColor}40` }}
      >
        {project.title}
      </h1>
      <p className="text-xl text-slate-300 mb-6 leading-relaxed">{project.summary}</p>
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
        {project.date && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(project.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        )}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded bg-slate-800/50 text-slate-300 text-xs border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      {(project.links?.demo || project.links?.repo || project.links?.video) && (
        <div className="flex flex-wrap gap-4 mt-6">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-lg',
                'glass hover:bg-white/10',
                'text-white font-medium transition-all duration-300',
                'hover:scale-105 active:scale-100'
              )}
              style={{ boxShadow: `0 0 20px ${accentColor}30` }}
            >
              <ExternalLink className="h-5 w-5" />
              Ver Página
            </a>
          )}
          {project.links.video && (
            <a
              href={project.links.video}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-lg',
                'border border-slate-700 hover:border-slate-600',
                'text-slate-300 hover:text-white font-medium',
                'transition-all duration-300',
                'hover:scale-105 active:scale-100'
              )}
            >
              <Play className="h-5 w-5" />
              Ver Video
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-lg',
                'border border-slate-700 hover:border-slate-600',
                'text-slate-300 hover:text-white font-medium',
                'transition-all duration-300',
                'hover:scale-105 active:scale-100'
              )}
            >
              <Github className="h-5 w-5" />
              Ver Código
            </a>
          )}
        </div>
      )}
    </header>
  );
}

/**
 * Project Detail Page
 * Uses MDX when available, otherwise fallback from lib/data.ts
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const mdxProject = await getProjectBySlug(slug);
  const dataProject = getProjectBySlugFromData(slug);

  const useMdx = !!mdxProject;
  if (!useMdx && !dataProject) {
    notFound();
  }

  const projectForHeader: Project = useMdx
    ? {
        slug,
        title: mdxProject!.frontmatter.title ?? '',
        summary: mdxProject!.frontmatter.summary ?? '',
        category: mdxProject!.frontmatter.category ?? ['cloud'],
        techStack: mdxProject!.frontmatter.techStack ?? [],
        thumbnail: mdxProject!.frontmatter.thumbnail ?? '',
        featured: mdxProject!.frontmatter.featured ?? false,
        date: mdxProject!.frontmatter.date ?? '',
        links: mdxProject!.frontmatter.links ?? {},
      }
    : dataProject!;

  const primaryCategory = projectForHeader.category[0];
  const accentColor = verticals[primaryCategory]?.color || '#06b6d4';

  return (
    <>
      <ScrollProgress />
      <main className="relative min-h-screen bg-space-950">
        <div className="fixed inset-0 bg-gradient-to-b from-space-900 to-space-950 -z-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <Link
            href="/#work"
            className={cn(
              'inline-flex items-center gap-2 mb-8',
              'text-slate-400 hover:text-white transition-colors',
              'group'
            )}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Proyectos</span>
          </Link>

          {useMdx ? (
            <>
              <ProjectHeader project={projectForHeader} accentColor={accentColor} />
              <div
                className="h-px mb-12"
                style={{
                  background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)`,
                }}
              />
              <article className="prose prose-invert prose-lg max-w-none">
                <MDXRemote source={mdxProject!.content} components={mdxComponents} />
              </article>
            </>
          ) : (
            <>
              <ProjectHeader project={projectForHeader} accentColor={accentColor} />
              <div
                className="h-px mb-12"
                style={{
                  background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)`,
                }}
              />
              <section>
                <h2 className="text-3xl font-semibold text-white mb-4 mt-8">Sobre el proyecto</h2>
                <p className="text-slate-300 leading-relaxed mb-4">{projectForHeader.summary}</p>
              </section>
            </>
          )}

          <footer className="mt-16 pt-8 border-t border-slate-800">
            <Link
              href="/#work"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-lg',
                'glass hover:bg-white/10',
                'text-white font-medium transition-all duration-300',
                'hover:scale-105 active:scale-100'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Ver Más Proyectos
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}
