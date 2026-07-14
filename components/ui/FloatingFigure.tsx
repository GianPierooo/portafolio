'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * FloatingFigure — el recorte transparente (public/gian.png) FLOTANDO sobre el
 * fondo espacial: sin marco ni caja. Detrás, un halo radial de marca
 * (cyan→violeta) + drop-shadow en capas para profundidad.
 *
 * La <Image> es HTML plano (server-render): pinta desde el SSR sin esperar la
 * hidratación de JS → no retrasa el LCP. El float es CSS (.photo-float). El
 * parallax al mouse es una mejora progresiva (rAF que escribe el transform en un
 * wrapper), SOLO en dispositivos con puntero fino y sin reduced-motion.
 */
export default function FloatingFigure({ priority = false }: { priority?: boolean }) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return; // móvil/táctil o reduced-motion → sin parallax

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      target.x = ((e.clientX / window.innerWidth) * 2 - 1) * 12;
      target.y = ((e.clientY / window.innerHeight) * 2 - 1) * 10;
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[520px]">
      {/* Halo radial de marca detrás de la figura */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(6,182,212,0.35), rgba(139,92,246,0.22) 55%, transparent 78%)',
        }}
      />
      {/* Float lento (CSS) en el wrapper; parallax (rAF) en el interior → no chocan */}
      <div className="photo-float">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
          <Image
            src="/gian.png"
            alt="Gian Piero Cano"
            width={1600}
            height={1066}
            priority={priority}
            sizes="(max-width: 640px) 380px, (max-width: 1024px) 440px, 520px"
            className="h-auto w-full select-none"
            style={{
              filter:
                'drop-shadow(0 22px 28px rgba(0,0,0,0.65)) drop-shadow(0 8px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 42px rgba(6,182,212,0.18))',
            }}
          />
        </div>
      </div>
    </div>
  );
}
