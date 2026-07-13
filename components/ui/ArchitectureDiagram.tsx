'use client';

import { motion, type Variants } from 'framer-motion';
import { diagrams, type DiagramSpec, type DiagramNode } from '@/lib/diagrams';
import { easeOut } from '@/lib/motion';

interface ArchitectureDiagramProps {
  /** Clave de un preset en lib/diagrams.ts (uso típico desde MDX) */
  preset?: keyof typeof diagrams | string;
  /** O una especificación inline (uso programático) */
  spec?: DiagramSpec;
}

const NODE_W = 240;
const NODE_H = 62;
const SLATE = '#64748b';

/**
 * ArchitectureDiagram — SVG animado y reutilizable que se "dibuja" al entrar
 * en viewport: los nodos aparecen y las conexiones se trazan.
 *
 * - Configurable por props (nodos, conexiones, colores, grupos).
 * - Responsive: el SVG escala con el contenedor vía viewBox (legible en móvil,
 *   layout vertical-primero).
 * - prefers-reduced-motion: se dibuja instantáneo (sin animación de trazado).
 */
export default function ArchitectureDiagram({ preset, spec }: ArchitectureDiagramProps) {
  const resolved: DiagramSpec | undefined = spec ?? (preset ? diagrams[preset] : undefined);

  if (!resolved) {
    return (
      <div className="my-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
        {/* TODO: diagrama no encontrado para preset "{preset}" */}
        Diagrama no disponible.
      </div>
    );
  }

  const { viewBox, nodes, connections, groups, title } = resolved;

  const nodeById = (id: string) => nodes.find((n) => n.id === id);
  const nodeW = (n: DiagramNode) => n.w ?? NODE_W;

  // Punto donde una línea desde `from` toca el borde de la caja de `target`.
  const edgePoint = (target: DiagramNode, fromX: number, fromY: number) => {
    const hw = nodeW(target) / 2;
    const hh = NODE_H / 2;
    const dx = fromX - target.x;
    const dy = fromY - target.y;
    if (dx === 0 && dy === 0) return { x: target.x, y: target.y };
    const scale = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
    return { x: target.x + dx * scale, y: target.y + dy * scale };
  };

  // Variantes: contenedor orquesta; conexiones se trazan tras aparecer los nodos.
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const nodeVariant: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeOut } },
  };
  const pathVariant: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 0.7, ease: easeOut }, opacity: { duration: 0.1 } },
    },
  };

  // Reveal on-scroll; MotionConfig (reducedMotion="user") salta al estado final
  // bajo prefers-reduced-motion sin condicionales en render (evita mismatch SSR).
  const animProps = {
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, margin: '-60px' },
  };

  return (
    <figure className="my-10">
      {/* max-width acota el escalado en desktop; en móvil el SVG llena el contenedor */}
      <div className="mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
        <motion.svg
          role="img"
          aria-label={title}
          viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
          className="h-auto w-full"
          variants={container}
          {...animProps}
        >
          {/* Grupos de fondo (ej. la VM de Oracle Cloud) */}
          {groups?.map((g, i) => {
            const c = g.color ?? SLATE;
            return (
              <motion.g key={`group-${i}`} variants={nodeVariant} data-reveal>
                <rect
                  x={g.x}
                  y={g.y}
                  width={g.w}
                  height={g.h}
                  rx={16}
                  fill={`${c}0a`}
                  stroke={`${c}33`}
                  strokeDasharray="6 6"
                  strokeWidth={1.5}
                />
                <text
                  x={g.x + 14}
                  y={g.y + 24}
                  fontSize={14}
                  fontFamily="var(--font-jetbrains-mono), monospace"
                  fill={`${c}cc`}
                >
                  {g.label}
                </text>
              </motion.g>
            );
          })}

          {/* Conexiones — se dibujan con pathLength; van debajo de los nodos */}
          {connections.map((conn, i) => {
            const from = nodeById(conn.from);
            const to = nodeById(conn.to);
            if (!from || !to) return null;
            const start = edgePoint(from, to.x, to.y);
            const end = edgePoint(to, from.x, from.y);
            const color = to.color ?? from.color ?? SLATE;
            return (
              <motion.path
                key={`conn-${i}`}
                data-reveal
                d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray={conn.dashed ? '6 8' : undefined}
                opacity={0.7}
                variants={pathVariant}
              />
            );
          })}

          {/* Nodos — cajas con label + sublabel, encima de las líneas */}
          {nodes.map((n) => {
            const w = nodeW(n);
            const color = n.color ?? SLATE;
            return (
              <motion.g key={n.id} variants={nodeVariant} style={{ transformOrigin: 'center' }} data-reveal>
                <rect
                  x={n.x - w / 2}
                  y={n.y - NODE_H / 2}
                  width={w}
                  height={NODE_H}
                  rx={12}
                  fill="#0b1220"
                  stroke={color}
                  strokeWidth={1.75}
                  strokeDasharray={n.assumed ? '5 4' : undefined}
                />
                <text
                  x={n.x}
                  y={n.sublabel ? n.y - 4 : n.y + 6}
                  textAnchor="middle"
                  fontSize={20}
                  fontWeight={600}
                  fill="#f8fafc"
                >
                  {n.label}
                </text>
                {n.sublabel && (
                  <text
                    x={n.x}
                    y={n.y + 17}
                    textAnchor="middle"
                    fontSize={13}
                    fontFamily="var(--font-jetbrains-mono), monospace"
                    fill="#94a3b8"
                  >
                    {n.sublabel}
                  </text>
                )}
              </motion.g>
            );
          })}
        </motion.svg>
      </div>
      <figcaption className="mt-3 text-center font-mono text-xs text-slate-400">
        {'// '}
        {title}
      </figcaption>
    </figure>
  );
}
