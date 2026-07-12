/**
 * Especificaciones de diagramas de arquitectura por proyecto.
 * Datos = arquitectura REAL confirmada. No inventar componentes:
 * donde haya duda, marcar con `assumed: true` y confirmarlo con Gian.
 *
 * Sistema de coordenadas: viewBox en unidades propias; cada nodo se posiciona
 * por su centro (x, y). El layout es vertical-primero para legibilidad en móvil.
 */

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number; // centro X en unidades de viewBox
  y: number; // centro Y en unidades de viewBox
  color?: string; // acento; por defecto slate
  w?: number; // ancho de caja (override)
  /** true = componente asumido, pendiente de confirmar (se marca visualmente) */
  assumed?: boolean;
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface DiagramSpec {
  title: string;
  /** región/agrupación opcional dibujada como recuadro de fondo (ej. "Oracle Cloud VM") */
  groups?: { label: string; x: number; y: number; w: number; h: number; color?: string }[];
  viewBox: { w: number; h: number };
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

const CLOUD = '#06b6d4';
const AI = '#8b5cf6';
const AUTO = '#10b981';
const SLATE = '#64748b';

/**
 * Logimatix — automatización con agentes de IA sobre Oracle Cloud.
 * Arquitectura confirmada por Gian: n8n + PostgreSQL self-hosted sobre la VM
 * (sin FastAPI ni base vectorial). Oracle Cloud (Ubuntu VMs, Nginx, PostgreSQL,
 * APIs ML/LLM), integraciones CRM + pagos (Stripe/PayPal) + notificaciones (email/SMS).
 */
export const logimatixDiagram: DiagramSpec = {
  title: 'Arquitectura de Logimatix',
  viewBox: { w: 460, h: 600 },
  groups: [
    { label: 'Oracle Cloud · Ubuntu VM', x: 30, y: 115, w: 400, h: 215, color: CLOUD },
  ],
  nodes: [
    { id: 'trigger', label: 'Trigger', sublabel: 'formulario · email · webhook', x: 230, y: 55, color: SLATE, w: 300 },
    { id: 'nginx', label: 'Nginx', sublabel: 'reverse proxy · TLS', x: 230, y: 165, color: CLOUD, w: 220 },
    { id: 'n8n', label: 'n8n', sublabel: 'orquestador de flujos', x: 230, y: 275, color: AUTO, w: 220 },
    { id: 'postgres', label: 'PostgreSQL', sublabel: 'estado · trazabilidad', x: 110, y: 420, color: CLOUD, w: 190 },
    { id: 'llm', label: 'APIs ML / LLM', sublabel: 'clasificación · gen.', x: 350, y: 420, color: AI, w: 190 },
    { id: 'integrations', label: 'Integraciones', sublabel: 'CRM · pagos · notif.', x: 230, y: 535, color: AUTO, w: 320 },
  ],
  connections: [
    { from: 'trigger', to: 'nginx' },
    { from: 'nginx', to: 'n8n' },
    { from: 'n8n', to: 'postgres' },
    { from: 'n8n', to: 'llm' },
    { from: 'n8n', to: 'integrations' },
  ],
};

/**
 * Kchimbo — plataforma EdTech sobre infraestructura cloud propia.
 * Arquitectura confirmada: Next.js self-hosted en contenedor Docker tras Nginx,
 * todo sobre la VM de Oracle Cloud (Ubuntu), con PostgreSQL como base.
 */
export const kchimboDiagram: DiagramSpec = {
  title: 'Arquitectura de Kchimbo',
  viewBox: { w: 400, h: 540 },
  groups: [
    { label: 'Oracle Cloud · Ubuntu VM', x: 30, y: 125, w: 340, h: 355, color: CLOUD },
  ],
  nodes: [
    { id: 'client', label: 'Cliente', sublabel: 'navegador del estudiante', x: 200, y: 55, color: SLATE, w: 320 },
    { id: 'nginx', label: 'Nginx', sublabel: 'reverse proxy · TLS', x: 200, y: 180, color: CLOUD, w: 240 },
    { id: 'app', label: 'Next.js', sublabel: 'contenedor Docker', x: 200, y: 300, color: CLOUD, w: 240 },
    { id: 'postgres', label: 'PostgreSQL', sublabel: 'contenido · progreso · usuarios', x: 200, y: 420, color: CLOUD, w: 320 },
  ],
  connections: [
    { from: 'client', to: 'nginx' },
    { from: 'nginx', to: 'app' },
    { from: 'app', to: 'postgres' },
  ],
};

/**
 * StoryQuest en Threadbare — arquitectura de sistemas de juego (Godot).
 * Representativa del patrón real de Godot (escena → señales → sistemas),
 * integrado en el framework de quests de Threadbare (Endless OS Foundation).
 */
export const storyquestDiagram: DiagramSpec = {
  title: 'Arquitectura de sistemas de juego',
  viewBox: { w: 460, h: 520 },
  nodes: [
    { id: 'input', label: 'Input del jugador', sublabel: 'teclado · interacción', x: 230, y: 55, color: SLATE, w: 300 },
    { id: 'tree', label: 'Godot Scene Tree', sublabel: 'nodos + señales', x: 230, y: 185, color: '#f59e0b', w: 260 },
    { id: 'mechanics', label: 'Mecánicas', sublabel: 'movimiento · diálogo', x: 115, y: 320, color: '#f59e0b', w: 190 },
    { id: 'quest', label: 'Quest System', sublabel: 'progresión', x: 345, y: 320, color: '#f59e0b', w: 190 },
    { id: 'threadbare', label: 'Threadbare', sublabel: 'framework Endless OS', x: 230, y: 450, color: SLATE, w: 300 },
  ],
  connections: [
    { from: 'input', to: 'tree' },
    { from: 'tree', to: 'mechanics' },
    { from: 'tree', to: 'quest' },
    { from: 'mechanics', to: 'threadbare' },
    { from: 'quest', to: 'threadbare' },
  ],
};

/** Registro por clave — usado desde MDX vía <ArchitectureDiagram preset="..." /> */
export const diagrams: Record<string, DiagramSpec> = {
  logimatix: logimatixDiagram,
  kchimbo: kchimboDiagram,
  storyquest: storyquestDiagram,
};
