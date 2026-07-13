'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// El icono se resuelve DENTRO del componente cliente (no se puede pasar un
// componente/función como prop desde un server component).
const icons = { github: Github, linkedin: Linkedin, email: Mail } as const;

/**
 * SocialLink — botón social glass con hover magnético (isla cliente).
 * Extraído de la home para que el hero sea server-render; motion idéntico.
 */
export default function SocialLink({
  href,
  type,
  label,
}: {
  href: string;
  type: keyof typeof icons;
  label: string;
}) {
  const Icon = icons[type];
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'group relative flex h-12 w-12 items-center justify-center rounded-full',
        'glass hover:bg-white/10',
        'transition-all duration-300',
        'hover:scale-110 active:scale-100'
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 -z-10 rounded-full bg-accent-cloud opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
      <Icon className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-white" />
    </motion.a>
  );
}
