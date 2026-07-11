'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { pageEnter } from '@/lib/motion';

/**
 * Template raíz — transición de entrada entre rutas (sensación de app, no de recarga).
 * Next remonta este componente en cada navegación, disparando la animación.
 * Solo entrada (sin exit): sobrio y sin bloquear la navegación.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={pageEnter.initial}
      animate={pageEnter.animate}
      transition={pageEnter.transition}
    >
      {children}
    </motion.div>
  );
}
