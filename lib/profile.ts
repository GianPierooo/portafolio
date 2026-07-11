/**
 * Perfil profesional centralizado — única fuente de verdad.
 * Consumido por app/page.tsx y app/about/page.tsx (antes estaba duplicado en ambos).
 *
 * Mandato de posicionamiento: Cloud + IA son el eje. Automatización, gamedev
 * y e-commerce son aplicaciones de ese eje, no identidades que compitan con él.
 * Todos los datos provienen del CV real — no inventar métricas ni logros.
 */

import {
  Cloud,
  Brain,
  Zap,
  Gamepad2,
  Code2,
  Mail,
  Linkedin,
  Github,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

/* ============================= Experiencia ============================= */

export interface Experience {
  year: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  achievements: string[];
  techStack: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    year: 'Jun 2025',
    role: 'Fundador — Infraestructura de Automatización con IA',
    company: 'Logimatix',
    companyUrl: 'https://logimatix.shop',
    description:
      'Infraestructura de automatización con agentes de IA sobre Oracle Cloud: orquestación de flujos con n8n integrados con APIs de CRM, pagos (Stripe/PayPal) y notificaciones (email/SMS).',
    achievements: [
      'Creación de 50+ flujos para clientes, reduciendo procesos manuales en más de un 70%.',
      'Despliegue y operación de la plataforma en Oracle Cloud: Ubuntu VMs, Nginx, PostgreSQL y APIs ML/LLM.',
    ],
    techStack: ['Oracle Cloud', 'n8n', 'Python', 'PostgreSQL', 'APIs LLM', 'Stripe'],
    current: true,
  },
  {
    year: 'Ene 2025',
    role: 'Co-Fundador — Plataforma EdTech sobre infraestructura propia',
    company: 'Kchimbo',
    companyUrl: 'https://kchimbo.com',
    description:
      'Plataforma inteligente para preuniversitarios con contenido dinámico y tracking, desplegada sobre infraestructura cloud propia para control total de rendimiento y datos.',
    achievements: [
      'Arquitectura y despliegue de servicios en Oracle Cloud (Ubuntu, Nginx, PostgreSQL).',
      'Finalista Startup UTP (premio $10,000 USD, 300+ equipos participantes).',
    ],
    techStack: ['Oracle Cloud', 'Ubuntu', 'Nginx', 'PostgreSQL', 'Next.js'],
    current: true,
  },
  {
    year: 'May 2025 — Oct 2025',
    role: 'Programador',
    company: 'Sueños Nocturnos / Endless OS Foundation',
    description:
      'Desarrollo de StoryQuest integrado en Threadbare (Endless OS Foundation): ingeniería de sistemas de juego aplicada a un producto open source con distribución real.',
    achievements: [
      'Programación de mecánicas en Godot Engine y pruebas internas colaborativas.',
      'Diseño de personajes y sonido con LibreSprite y FL Studio.',
    ],
    techStack: ['Godot Engine', 'LibreSprite', 'FL Studio'],
  },
  {
    year: 'Oct 2023',
    role: 'Fundador — E-commerce potenciado por IA',
    company: 'OnExotic / VictoriaModas',
    description:
      'Marcas de ropa OnExotic (moda urbana hombre) y VictoriaModas (moda mujer) con venta online: productos reales operando sobre sistemas construidos con desarrollo asistido por IA.',
    achievements: [
      'Desarrollo asistido por IA (Claude) sobre React/Next.js y Node.js/Express como capa de entrega.',
      'Integración de Mercado Pago, panel de administración e inventario.',
    ],
    techStack: ['Next.js', 'Node.js', 'Mercado Pago', 'Claude'],
    current: true,
  },
];

/* =============================== Toolkit =============================== */

export interface ToolkitCategory {
  category: string;
  icon: LucideIcon;
  color: string;
  tools: string[];
}

/**
 * Orden obligatorio (mandato §1): Cloud → IA → Automation → GameDev.
 * "Software Delivery" va al final: el desarrollo web/backend es la capa de
 * entrega de los sistemas cloud + IA, no la identidad.
 */
export const toolkit: ToolkitCategory[] = [
  {
    category: 'Cloud Architecture',
    icon: Cloud,
    color: '#06b6d4',
    tools: ['Oracle Cloud', 'Ubuntu / Linux', 'Nginx', 'PostgreSQL', 'Docker', 'Git'],
  },
  {
    category: 'Artificial Intelligence',
    icon: Brain,
    color: '#8b5cf6',
    tools: ['APIs ML/LLM', 'RAG', 'Python', 'FastAPI', 'Claude', 'OpenAI'],
  },
  {
    category: 'Automation',
    icon: Zap,
    color: '#10b981',
    tools: ['n8n', 'Webhooks', 'CRM APIs', 'Stripe', 'PayPal', 'Mercado Pago'],
  },
  {
    category: 'Game Development',
    icon: Gamepad2,
    color: '#f59e0b',
    tools: ['Godot Engine', 'GDScript', 'LibreSprite', 'FL Studio'],
  },
  {
    category: 'Software Delivery',
    icon: Code2,
    color: '#64748b',
    tools: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs', 'MongoDB', 'Redis'],
  },
];

/* =============================== Contacto ============================== */

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  color: string;
}

export const contactInfo: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'gianpierodaniel@gmail.com',
    href: 'mailto:gianpierodaniel@gmail.com',
    color: '#06b6d4',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/gianpierooo/',
    href: 'https://linkedin.com/in/gianpierooo/',
    color: '#0077b5',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/GianPierooo',
    href: 'https://github.com/GianPierooo',
    color: '#8b5cf6',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Lima, Perú',
    href: null,
    color: '#f59e0b',
  },
];

/* ============================ Identidad/SEO ============================ */

export const identity = {
  name: 'Gian Piero Cano',
  role: 'Cloud Engineer & AI Solutions Architect',
  tagline: 'Diseño arquitecturas en la nube y sistemas de IA en producción.',
  domain: 'https://gpcano.space',
  github: 'https://github.com/GianPierooo',
  linkedin: 'https://linkedin.com/in/gianpierooo/',
  email: 'gianpierodaniel@gmail.com',
} as const;

/**
 * Métricas reales confirmadas (CV) — para los number counters.
 * NO añadir cifras sin confirmación de Gian.
 */
export const stats = [
  { value: 50, suffix: '+', label: 'flujos de automatización en producción' },
  { value: 70, suffix: '%', label: 'reducción de procesos manuales' },
  { value: 300, suffix: '+', label: 'equipos superados como finalista Startup UTP' },
] as const;

/**
 * Tech marquee del hero — curada y jerarquizada: cloud/IA primero (§5.1).
 */
export const techMarquee = [
  'Oracle Cloud',
  'Linux',
  'Docker',
  'Nginx',
  'PostgreSQL',
  'Python',
  'RAG / LLM',
  'n8n',
  'FastAPI',
  'Next.js',
  'TypeScript',
  'Godot Engine',
] as const;
