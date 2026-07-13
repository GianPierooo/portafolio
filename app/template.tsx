'use client';

import { motion } from 'framer-motion';
import { pageEnter } from '@/lib/motion';

/**
 * Template raíz — transición de entrada entre rutas (sensación de app, no de recarga).
 * Next remonta este componente en cada navegación, disparando la animación.
 * Solo entrada (sin exit): sobrio y sin bloquear la navegación.
 *
 * La estructura NO depende de useReducedMotion (eso cambiaba el DOM entre server
 * y cliente → React #418). MotionConfig (reducedMotion="user") en el layout hace
 * que bajo prefers-reduced-motion la transición sea instantánea.
 */
export default function Template({ children }: { children: React.ReactNode }) {
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
