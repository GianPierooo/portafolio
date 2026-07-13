'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { springs } from '@/lib/motion';

interface MagneticProps {
  children: React.ReactNode;
  /** Cuánto sigue al cursor (0–1). Sutil por defecto. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic — el contenido se desplaza sutilmente hacia el cursor al hacer hover.
 * Respeta prefers-reduced-motion (se desactiva) y no hace nada en touch
 * (los eventos pointer de hover no se disparan sin puntero fino).
 */
export default function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);
  const reduced = useReducedMotion();

  // Estructura idéntica en server y cliente (siempre motion.div) para no
  // provocar mismatch de hidratación; el efecto se desactiva vía el handler
  // cuando hay reduced-motion (diferencia de comportamiento, no de render).
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
