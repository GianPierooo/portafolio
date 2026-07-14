'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * FramedPortrait — retrato (public/gian-retrato.jpg, 4:5) dentro de una CARD con
 * relieve: esquinas redondeadas, borde sutil, sombra en capas + glow de marca
 * (cyan→violeta) alrededor, sensación glass/3D, integrada con el fondo espacial.
 *
 * La <Image> es HTML plano (server-render) con object-cover → pinta desde el SSR
 * (no retrasa el LCP) y llena el marco sin deformar. Float en CSS (.photo-float);
 * parallax al mouse como mejora progresiva (rAF), SOLO en punteros finos y sin
 * prefers-reduced-motion.
 */
export default function FramedPortrait({ priority = false }: { priority?: boolean }) {
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
      target.x = ((e.clientX / window.innerWidth) * 2 - 1) * 8;
      target.y = ((e.clientY / window.innerHeight) * 2 - 1) * 6;
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
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[400px]">
      {/* Glow de marca alrededor del marco (profundidad + integración espacial) */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-accent-cloud/40 via-accent-ai/25 to-accent-ai/45 opacity-70 blur-2xl"
      />
      {/* Float lento (CSS) en el wrapper; parallax (rAF) en el interior → no chocan */}
      <div className="photo-float">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
          {/* Card con relieve: borde + ring + sombra en capas + glass */}
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 ring-1 ring-accent-cloud/25 backdrop-blur-sm"
            style={{
              boxShadow:
                '0 30px 60px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 55px -12px rgba(6,182,212,0.35)',
            }}
          >
            <Image
              src="/gian-retrato.jpg"
              alt="Gian Piero Cano"
              fill
              priority={priority}
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 400px"
              className="object-cover"
            />
            {/* Viñeta sutil para integrar con el fondo espacial */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-space-950/35 via-transparent to-white/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
