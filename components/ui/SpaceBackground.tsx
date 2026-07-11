'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Fallback estático ligero: gradientes radiales + campo de estrellas en CSS puro.
 * Se usa mientras carga el Canvas, con prefers-reduced-motion y en móvil/touch.
 * Cero JS de render, cero impacto en LCP.
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

/**
 * SpaceBackground — decide qué fondo renderizar:
 * - prefers-reduced-motion → estático (accesibilidad)
 * - touch/móvil (hover: none o viewport < 768px) → estático (rendimiento)
 * - desktop → escena 3D lazy-loaded
 * La decisión se toma en el cliente tras el mount; hasta entonces se muestra
 * el estático, que también es el estado que ve el servidor (sin hydration mismatch).
 */
export default function SpaceBackground() {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchDevice = window.matchMedia('(hover: none)');
    const smallViewport = window.matchMedia('(max-width: 767px)');

    const decide = () => {
      setShow3D(!reducedMotion.matches && !touchDevice.matches && !smallViewport.matches);
    };

    decide();
    // Reaccionar si el usuario cambia la preferencia o rota/redimensiona
    reducedMotion.addEventListener('change', decide);
    smallViewport.addEventListener('change', decide);
    return () => {
      reducedMotion.removeEventListener('change', decide);
      smallViewport.removeEventListener('change', decide);
    };
  }, []);

  return show3D ? <SpaceScene /> : <StaticSpace />;
}
