'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, ArrowRight, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Project, verticals } from '@/lib/data';
import { durations, easeOut, scaleIn } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
}

/** Inclinación máxima del tilt 3D (grados) — sutil por diseño */
const MAX_TILT = 4;

/**
 * ProjectCard Component - Bento Style
 * Dark card with subtle border that glows on hover based on category.
 * Micro-interacciones: spotlight que sigue al cursor + tilt 3D sutil.
 * El tilt vive en un wrapper interno (tiltRef) para no interferir con el
 * transform que Framer Motion controla en el <motion.article> (layout/scale).
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const tiltRef = useRef<HTMLDivElement>(null);
  // Solo desktop con puntero fino y sin reduced-motion (se evalúa una vez)
  const interactiveRef = useRef(false);

  useEffect(() => {
    interactiveRef.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Get accent color based on primary category
  const primaryCategory = project.category[0];
  const accentColor = verticals[primaryCategory]?.color || '#ffffff';

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = tiltRef.current;
    if (!el || !interactiveRef.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    // Spotlight: posición del glow radial (CSS vars, sin re-render)
    el.style.setProperty('--spot-x', `${px * 100}%`);
    el.style.setProperty('--spot-y', `${py * 100}%`);
    // Tilt 3D sutil hacia el cursor
    const tiltX = (py - 0.5) * -MAX_TILT;
    const tiltY = (px - 0.5) * MAX_TILT;
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <motion.article
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        layout
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: durations.fast, ease: easeOut }}
        className="group aspect-[4/3] cursor-pointer"
        style={{
          ['--accent-color' as string]: accentColor,
        }}
      >
      <div
        ref={tiltRef}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl',
          'bg-slate-900/50 backdrop-blur-sm',
          'border border-slate-800',
          'transition-[border-color,box-shadow,transform] duration-300 ease-out',
          'group-hover:shadow-2xl'
        )}
      >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `0 0 40px ${accentColor}40, inset 0 0 60px ${accentColor}10`,
        }}
      />

      {/* Spotlight que sigue al cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${accentColor}18, transparent 65%)`,
        }}
      />

      {/* Thumbnail Container */}
      <div className="relative h-1/2 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/85 z-10" />
        
        {/* Image or emoji placeholder - object-cover para que llene y se vea bien */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="text-6xl opacity-90">
              {project.slug === 'victoriamodas' ? '👗' : (
                <>
                  {primaryCategory === 'cloud' && '☁️'}
                  {primaryCategory === 'ai' && '🤖'}
                  {primaryCategory === 'automation' && '⚙️'}
                  {primaryCategory === 'gamedev' && '🎮'}
                </>
              )}
            </div>
          )}
        </div>
        
      </div>

      {/* Content Container */}
      <div className="relative flex-1 p-6 flex flex-col justify-between">
        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-opacity-90 transition-colors line-clamp-1 flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-slate-800/50 text-xs font-medium text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-xs font-medium text-slate-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800/50">
          {project.links.demo && (
            <ProjectLink 
              href={project.links.demo} 
              icon={ExternalLink} 
              label="Página"
            />
          )}
          {project.links.repo && (
            <ProjectLink 
              href={project.links.repo} 
              icon={Github} 
              label="Code"
            />
          )}
          {project.links.video && (
            <ProjectLink 
              href={project.links.video} 
              icon={Play} 
              label="Video"
            />
          )}
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `1px solid ${accentColor}60`,
        }}
      />
      </div>
    </motion.article>
  );
}

/**
 * Project Link Component
 * Small link button with icon for demo/repo/video
 */
function ProjectLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
        'text-xs font-medium text-slate-300',
        'bg-slate-800/30 hover:bg-slate-700/50',
        'border border-slate-700/50 hover:border-slate-600',
        'transition-all duration-200',
        'hover:scale-105 active:scale-100',
        'z-10 relative'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </a>
  );
}
