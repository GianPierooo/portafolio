'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * FloatingFigure — el recorte transparente (public/gian.png) FLOTANDO sobre el
 * fondo espacial: sin marco ni caja. Detrás, un halo radial de marca
 * (cyan→violeta) + drop-shadow en capas para profundidad. Animación viva: float
 * lento (CSS) + parallax leve al mouse (framer). Respeta prefers-reduced-motion.
 */
export default function FloatingFigure({ priority = false }: { priority?: boolean }) {
  const reduced = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 120, damping: 22, mass: 0.6 });
  const y = useSpring(mvY, { stiffness: 120, damping: 22, mass: 0.6 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // [-1, 1]
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mvX.set(nx * 12); // parallax sutil (±12px)
      mvY.set(ny * 10);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, mvX, mvY]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[520px]">
      {/* Halo radial de marca detrás de la figura (profundidad + integración espacial) */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(6,182,212,0.35), rgba(139,92,246,0.22) 55%, transparent 78%)',
        }}
      />
      {/* Float lento (CSS) en el wrapper; parallax (framer) en el interior → no chocan */}
      <div className="photo-float">
        <motion.div style={{ x, y }}>
          <Image
            src="/gian.png"
            alt="Gian Piero Cano"
            width={1600}
            height={1066}
            priority={priority}
            sizes="(max-width: 640px) 380px, (max-width: 1024px) 440px, 520px"
            className="h-auto w-full select-none"
            style={{
              // Sombra en capas sobre la silueta del recorte (no caja) → parece flotar
              filter:
                'drop-shadow(0 22px 28px rgba(0,0,0,0.65)) drop-shadow(0 8px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 42px rgba(6,182,212,0.18))',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
