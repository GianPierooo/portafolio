'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { viewportOnce, easeOut } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Tag = 'h1' | 'h2' | 'h3';

/**
 * RaisedTitle — título con RELIEVE tallado (letterpress: highlight superior +
 * sombras en capas) y degradado de marca, que "cobra relieve" al entrar en
 * viewport. Sello visual del sitio (misma línea que el logo GPC).
 *
 * El relieve + degradado viven en la clase CSS `.raised-title` (globals.css).
 * `data-reveal` garantiza visibilidad bajo prefers-reduced-motion (sin animación).
 */
export default function RaisedTitle({
  children,
  as = 'h2',
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: easeOut }}
      data-reveal
      className={cn('raised-title', className)}
    >
      {children}
    </MotionTag>
  );
}
