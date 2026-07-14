'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Fallback estático ligero: gradientes de nebulosa + estrellas en CSS puro.
 * Se usa SOLO bajo prefers-reduced-motion (accesibilidad) y como loading del
 * Canvas lazy. Cero JS de render, cero impacto en LCP.
 */
function StaticSpace() {
  return <div className="static-space fixed inset-0 z-0" aria-hidden="true" />;
}

/**
 * Canvas 3D lazy: fuera del bundle inicial y del HTML del servidor.
 * El hero (texto = LCP) pinta primero; la escena aparece después sin bloquear.
 */
const SpaceScene = dynamic(() => import('./SpaceScene'), {
  ssr: false,
  loading: () => <StaticSpace />,
});

type Mode = 'static' | 'full' | 'lite';

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * SpaceBackground — decide qué fondo renderizar:
 * - prefers-reduced-motion → estático (única razón para NO animar).
 * - móvil / viewport pequeño → escena 3D "lite" (menos partículas, DPR más bajo),
 *   pero ANIMADA.
 * - resto → escena 3D completa e inmersiva.
 * La decisión se toma en el cliente tras el mount; el SSR muestra el estático
 * (que es también el loading del Canvas) → sin hydration mismatch.
 */
export default function SpaceBackground() {
  const [mode, setMode] = useState<Mode>('static');
  // Diferimos el montaje del Canvas 3D hasta que el hilo esté libre (tras el
  // LCP). Así el three.js no compite con el primer render (foto/texto del hero)
  // y Performance en móvil no cae. Hasta entonces se ve el estático.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 767px)');

    const decide = () => {
      if (reduced.matches) setMode('static');
      else setMode(small.matches ? 'lite' : 'full');
    };

    decide();
    reduced.addEventListener('change', decide);
    small.addEventListener('change', decide);

    const w = window as IdleWindow;
    let idleId: number | undefined;
    let timer: number | undefined;
    // timeout alto: en móvil (hilo saturado) el 3D espera hasta ~2.6s, DESPUÉS
    // del LCP; en desktop el idle dispara en cuanto el hilo queda libre (~rápido).
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(() => setReady(true), { timeout: 2600 });
    } else {
      timer = window.setTimeout(() => setReady(true), 1200);
    }

    return () => {
      reduced.removeEventListener('change', decide);
      small.removeEventListener('change', decide);
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  if (mode === 'static' || !ready) return <StaticSpace />;
  return <SpaceScene lite={mode === 'lite'} />;
}
