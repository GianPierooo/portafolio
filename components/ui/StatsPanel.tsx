'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';
import { stats } from '@/lib/profile';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * StatsPanel — tira de métricas con estética de panel de observabilidad (§6.4).
 * Solo cifras reales confirmadas (lib/profile → stats). Cuenta al entrar en
 * viewport (CountUp) y respeta prefers-reduced-motion.
 */
export default function StatsPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">
      {/* Barra superior estilo dashboard */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
        <span className="font-mono text-xs tracking-widest text-slate-400">
          {'// impact_metrics'}
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          en producción
        </span>
      </div>

      {/* Tiles */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 divide-y divide-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {stats.map((stat) => (
          <motion.div key={stat.key} variants={fadeUp} className="p-6">
            {/* clave + punto de estado */}
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: stat.color }}
              />
              <span className="font-mono text-[11px] tracking-wide text-slate-400">
                {stat.key}
              </span>
            </div>

            {/* cifra */}
            <CountUp
              to={stat.value}
              suffix={stat.suffix}
              className="block font-mono text-4xl font-bold sm:text-5xl"
            />

            {/* barra solo para porcentajes reales */}
            {typeof stat.bar === 'number' && <ProgressBar value={stat.bar} color={stat.color} />}

            <p className="mt-3 text-sm leading-snug text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/** Barra de progreso que se rellena al entrar en viewport (respeta reduced-motion) */
function ProgressBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const filled = reduced ? true : inView;

  return (
    <div ref={ref} className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-800">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: filled ? `${value}%` : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </div>
  );
}
