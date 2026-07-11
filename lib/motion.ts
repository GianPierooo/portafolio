/**
 * Motion System — tokens centrales de animación.
 * Única fuente de verdad: duraciones, easings, delays, springs y variantes.
 * Regla de oro: dinámico ≠ ruidoso. Cada animación con propósito.
 *
 * Uso típico:
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} />
 *   <motion.div variants={staggerContainer} ...> <motion.div variants={fadeUp} /> ... </motion.div>
 */

import type { Variants } from 'framer-motion';

/* ------------------------------ Primitivas ----------------------------- */

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** easeOutExpo suavizado — entrada decidida, frenado natural, sin rebote */
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** para transiciones simétricas (página, crossfade) */
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const delays = {
  step: 0.1, // entre hijos de un stagger
  section: 0.15, // entre bloques de una misma sección
} as const;

export const springs = {
  /** pill del VerticalSwitcher / indicador del navbar */
  pill: { type: 'spring', stiffness: 500, damping: 30 } as const,
  /** hover magnético de botones — respuesta rápida, sin oscilación visible */
  magnetic: { stiffness: 300, damping: 22, mass: 0.5 } as const,
};

/** viewport estándar para reveals on-scroll: una sola vez, margen anticipado */
export const viewportOnce = { once: true, margin: '-80px' } as const;

/* ------------------------------ Variantes ------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.base, ease: easeOut },
  },
};

/** entrada lateral para layouts de dos columnas */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.base, ease: easeOut },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.base, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.fast, ease: easeOut },
  },
};

/** contenedor que orquesta a sus hijos con stagger */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: delays.step, delayChildren: 0.1 },
  },
};

/** entrada de página (app/template.tsx) — sutil, sensación de app */
export const pageEnter = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.base, ease: easeOut },
} as const;
