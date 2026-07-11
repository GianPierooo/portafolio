'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * CountUp — cuenta de 0 al valor al entrar en viewport (una sola vez).
 * Con prefers-reduced-motion muestra el valor final directamente.
 * Solo cifras reales confirmadas — el dato viene de lib/profile.ts.
 */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;

    if (reduced) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: easeOutValue,
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to, prefix, suffix, duration]);

  // Render inicial con el valor final: si JS falla o el efecto no corre,
  // nunca se muestra un "0" engañoso (SEO/no-JS ven la cifra real).
  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}

/** easeOut cúbico como función (animate() de framer no acepta el tuple aquí) */
function easeOutValue(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
