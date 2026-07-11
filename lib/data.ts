/**
 * Project Data and Type Definitions
 * Based on the 4 Verticals: Cloud, AI, Automation, GameDev
 */

export type ProjectCategory = 'cloud' | 'ai' | 'automation' | 'gamedev';

export interface Project {
  slug: string;
  title: string;
  summary: string;        // Descripción técnica (max 120 chars)
  category: ProjectCategory[];
  techStack: string[];    // Ej: ['Linux', 'Python', 'n8n', 'Godot', 'C++']
  thumbnail: string;      // Ruta en /public/images/projects/ (vacío = usar emoji en card)
  featured: boolean;
  date: string;
  links: {
    demo?: string;
    repo?: string;
    video?: string;       // Para demos de juegos o automatizaciones
  };
}

/**
 * Real Project Data
 * No placeholders - Datos reales del portafolio
 */
export const projects: Project[] = [
  // Eje central: IA + Cloud (Logimatix) — proyecto insignia
  {
    slug: 'logimatix-ecosystem',
    title: 'Logimatix',
    summary: 'Infraestructura de automatización con agentes de IA sobre Oracle Cloud. 50+ flujos en producción.',
    category: ['ai', 'cloud', 'automation'],
    techStack: ['Oracle Cloud', 'n8n', 'Python', 'PostgreSQL', 'APIs LLM'],
    thumbnail: '/images/projects/logimatix.png',
    featured: true,
    date: '2025-06',
    links: {
      demo: 'https://logimatix.shop',
    },
  },
  // Eje central: Cloud + IA (Kchimbo)
  {
    slug: 'kachimbo-platform',
    title: 'Kchimbo',
    summary: 'Plataforma EdTech desplegada sobre infraestructura cloud propia. Finalista Startup UTP entre 300+ equipos.',
    category: ['cloud', 'ai'],
    techStack: ['Oracle Cloud', 'Linux Ubuntu', 'Nginx', 'Docker', 'Next.js'],
    thumbnail: '/images/projects/kchimbo.png',
    featured: true,
    date: '2025-01',
    links: {
      demo: 'https://kchimbo.com',
    },
  },

  // Aplicación del eje: GameDev
  {
    slug: 'shadow-games-studio',
    title: 'Shadow Games Studio',
    summary: 'Estudio independiente de desarrollo. Arquitectura de sistemas de juego y mecánicas avanzadas.',
    category: ['gamedev'],
    techStack: ['Godot 4', 'GDScript', 'C++', 'Blender'],
    thumbnail: '/images/projects/shadowgames.png',
    featured: false,
    date: '2024-08',
    links: {
      // TODO: confirmar link real del video con Gian (el anterior era un placeholder roto)
    },
  },
  {
    slug: 'storyquest-threadbare',
    title: 'StoryQuest in Threadbare',
    summary: 'Desarrollo de StoryQuest integrado en Threadbare (Endless OS Foundation). Mecánicas en Godot Engine.',
    category: ['gamedev'],
    techStack: ['Godot Engine', 'LibreSprite', 'FL Studio', 'Threadbare'],
    thumbnail: '/images/projects/suenos-nocturnos.png',
    featured: false,
    date: '2025',
    links: {
      demo: 'https://utpgamelab4-0-grupo6-equipo1.github.io/threadbare/#quests/story_quests/shjourney/0_IntroVideo/IntroVideo',
    },
  },

  // Vertical: E-commerce & Automation (OnExotic / VictoriaModas)
  {
    slug: 'onexotic-brand',
    title: 'OnExotic',
    summary: 'Gestión digital y e-commerce para marca de ropa urbana. Automatización de inventario y pedidos.',
    category: ['automation'],
    techStack: ['Headless CMS', 'n8n', 'Shopify API', 'Webhooks'],
    thumbnail: '/images/projects/onexotic.png',
    featured: false,
    date: '2024-06',
    links: {
      demo: 'https://onexotic.shop',
    },
  },
  {
    slug: 'victoriamodas',
    title: 'VictoriaModas',
    summary: 'E-commerce de moda para mujer. Desarrollo full-stack con IA (Claude), Mercado Pago e inventario.',
    category: ['automation'],
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'Mercado Pago'],
    thumbnail: '',
    featured: false,
    date: '2023',
    links: {
      demo: 'https://victoriamodas.store',
    },
  },
];

/**
 * Vertical Labels and Colors
 */
/**
 * Orden y jerarquía del mandato de posicionamiento (§1):
 * Cloud Architecture → Artificial Intelligence → Automation → Game Development.
 * Automation tiene color propio (emerald) para no diluirse con el violeta de IA.
 */
export const verticals = {
  all: {
    label: 'Todos',
    color: 'white',
  },
  cloud: {
    label: 'Cloud Architecture',
    color: '#06b6d4', // Cyan
  },
  ai: {
    label: 'Artificial Intelligence',
    color: '#8b5cf6', // Violet
  },
  automation: {
    label: 'Automation',
    color: '#10b981', // Emerald — color propio, distinto de IA
  },
  gamedev: {
    label: 'Game Development',
    color: '#f59e0b', // Amber
  },
} as const;

/**
 * Get project by slug (for detail pages)
 */
export function getProjectBySlugFromData(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: ProjectCategory | 'all'): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category.includes(category));
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
