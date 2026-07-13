'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeIn, fadeLeft, fadeRight, viewportOnce } from '@/lib/motion';

const variantMap = {
  up: fadeUp,
  in: fadeIn,
  left: fadeLeft,
  right: fadeRight,
} as const;

/**
 * Reveal — isla cliente mínima para reveals on-scroll.
 * Recibe el contenido como `children` renderizado en el SERVIDOR: solo el wrapper
 * (motion.div) es cliente y anima; el contenido no hidrata como componente cliente.
 * Usa exactamente las mismas variantes del motion system (Fase 2) → visual idéntico.
 */
export default function Reveal({
  children,
  variant = 'up',
  className,
  as = 'div',
}: {
  children: ReactNode;
  variant?: keyof typeof variantMap;
  className?: string;
  as?: 'div' | 'section' | 'header';
}) {
  const MotionTag = motion[as];
  const reduced = useReducedMotion();
  return (
    <MotionTag
      variants={variantMap[variant]}
      // Con reduced-motion no ocultamos el contenido (evita secciones en
      // opacity:0 si el reveal no se dispara). Sin reduced-motion, reveal normal.
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
