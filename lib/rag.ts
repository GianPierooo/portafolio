/**
 * Base de conocimiento para la demo "Pregúntale a mi IA" (§6.1).
 *
 * VERSIÓN LITE: respuestas curadas a preguntas frecuentes, con recuperación
 * (retrieval) real por keywords sobre fragmentos del perfil. La UI muestra el
 * pipeline retrieval → context → generación para que se vea la ingeniería.
 *
 * Todos los fragmentos y respuestas provienen de datos CONFIRMADOS (lib/profile,
 * lib/data). No inventar. Para conectar el LLM real, ver app/api/chat/route.ts
 * (el retrieval y el contrato de streaming ya están listos; solo se sustituye
 * la fuente de la generación).
 */

/** Fragmento de conocimiento ("chunk") indexado para retrieval */
export interface KnowledgeChunk {
  id: string;
  label: string; // etiqueta corta mostrada en el paso de retrieval
  text: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: 'identity',
    label: 'perfil/identidad',
    text: 'Gian Piero Cano es Cloud Engineer & AI Solutions Architect. Diseña arquitecturas en la nube y sistemas de IA en producción; el desarrollo web y de videojuegos es su capa de entrega.',
  },
  {
    id: 'logimatix',
    label: 'proyecto/logimatix',
    text: 'Logimatix: infraestructura de automatización con agentes de IA sobre Oracle Cloud. Orquestador n8n self-hosted tras Nginx, con PostgreSQL. Integra CRM, pagos y notificaciones, y APIs ML/LLM. 50+ flujos en producción y 70% de reducción de procesos manuales.',
  },
  {
    id: 'kchimbo',
    label: 'proyecto/kchimbo',
    text: 'Kchimbo: plataforma EdTech desplegada sobre infraestructura cloud propia. Next.js en contenedor Docker tras Nginx sobre una VM de Oracle Cloud, con PostgreSQL. Finalista Startup UTP entre 300+ equipos.',
  },
  {
    id: 'cloud-stack',
    label: 'stack/cloud',
    text: 'Stack cloud: Oracle Cloud, VMs Ubuntu/Linux administradas directamente, Nginx como reverse proxy con TLS, PostgreSQL, Docker y Git. Infraestructura propia con control total de datos, rendimiento y costos.',
  },
  {
    id: 'ai-stack',
    label: 'stack/ia',
    text: 'Stack de IA: APIs ML/LLM integradas en flujos de producción (clasificación y generación), patrones RAG, Python, FastAPI, Claude y OpenAI.',
  },
  {
    id: 'gamedev',
    label: 'proyecto/gamedev',
    text: 'Game dev: StoryQuest en Threadbare (UTP Game Lab 4.0 con Endless OS Foundation), programado en Godot Engine con GDScript. Ingeniería de sistemas de juego aplicada a un producto open source real.',
  },
  {
    id: 'ecommerce',
    label: 'proyecto/ecommerce',
    text: 'E-commerce: marcas OnExotic y VictoriaModas construidas con IA (Claude) como copiloto de desarrollo, con Mercado Pago e inventario. Productos reales que corren sobre principios de ingeniería de sistemas.',
  },
  {
    id: 'contact',
    label: 'contacto',
    text: 'Contacto: gianpierodaniel@gmail.com, github.com/GianPierooo y linkedin.com/in/gianpierooo. Basado en Lima, Perú.',
  },
];

const chunkById = (id: string) => knowledgeBase.find((c) => c.id === id)!;

/** Entrada de FAQ curada: pregunta canónica + keywords + chunks + respuesta */
export interface FaqEntry {
  id: string;
  question: string; // pregunta sugerida (se muestra como chip)
  keywords: string[];
  chunkIds: string[]; // fragmentos "recuperados" para esta pregunta
  answer: string;
}

export const faqs: FaqEntry[] = [
  {
    id: 'especialidad',
    question: '¿Cuál es tu especialidad?',
    keywords: ['especialidad', 'especializas', 'haces', 'quien', 'quién', 'eres', 'rol', 'perfil', 'dedicas', 'trabajas'],
    chunkIds: ['identity', 'cloud-stack', 'ai-stack'],
    answer:
      'Soy Cloud Engineer & AI Solutions Architect: diseño arquitecturas en la nube y sistemas de IA en producción. Opero servicios en Oracle Cloud —Ubuntu, Nginx, PostgreSQL, Docker— e integro APIs ML/LLM y patrones RAG. El desarrollo web o de videojuegos es mi capa de entrega, no mi identidad.',
  },
  {
    id: 'logimatix',
    question: '¿Qué es Logimatix?',
    keywords: ['logimatix', 'automatizacion', 'automatización', 'n8n', 'agentes', 'flujos'],
    chunkIds: ['logimatix', 'cloud-stack', 'ai-stack'],
    answer:
      'Logimatix es una infraestructura de automatización con agentes de IA sobre Oracle Cloud. Un orquestador n8n self-hosted (tras Nginx, con PostgreSQL) conecta CRM, pagos y notificaciones e integra APIs ML/LLM. Lleva 50+ flujos en producción y ha reducido procesos manuales de los clientes en más de 70%.',
  },
  {
    id: 'infra',
    question: '¿Qué infraestructura cloud manejas?',
    keywords: ['infraestructura', 'cloud', 'oracle', 'servidores', 'devops', 'nginx', 'docker', 'postgresql', 'linux', 'ubuntu'],
    chunkIds: ['cloud-stack', 'logimatix', 'kchimbo'],
    answer:
      'Trabajo sobre Oracle Cloud: VMs Ubuntu que administro directamente (hardening, monitoreo), Nginx como reverse proxy con TLS, PostgreSQL como base transaccional y Docker para despliegues reproducibles. Es infraestructura propia, con control total de datos, rendimiento y costos.',
  },
  {
    id: 'ia',
    question: '¿Tienes experiencia con IA, LLM o RAG?',
    keywords: ['ia', 'llm', 'rag', 'inteligencia', 'artificial', 'modelos', 'ml', 'openai', 'claude'],
    chunkIds: ['ai-stack', 'logimatix', 'identity'],
    answer:
      'Sí. Integro APIs ML/LLM en flujos de producción (clasificación y generación) y trabajo con patrones RAG. De hecho, esta misma demo corre sobre una arquitectura RAG: recupera fragmentos de mi perfil, arma el contexto y genera la respuesta. En producción se conecta el LLM real; aquí ves el pipeline con respuestas curadas.',
  },
  {
    id: 'contacto',
    question: '¿Cómo te contacto?',
    keywords: ['contacto', 'contactar', 'email', 'correo', 'linkedin', 'github', 'escribir', 'hablar'],
    chunkIds: ['contact'],
    answer:
      'Escríbeme a gianpierodaniel@gmail.com, o encuéntrame en github.com/GianPierooo y linkedin.com/in/gianpierooo. También puedes usar el formulario de contacto más abajo.',
  },
];

export interface RetrievalResult {
  faq: FaqEntry;
  chunks: KnowledgeChunk[];
  score: number; // 0 = sin coincidencia (fallback)
}

const FALLBACK: FaqEntry = {
  id: 'fallback',
  question: '',
  keywords: [],
  chunkIds: ['identity'],
  answer:
    'Puedo responder sobre mi perfil, mi stack cloud/IA y proyectos como Logimatix o Kchimbo. Prueba una de las preguntas sugeridas. En producción, esta demo conecta un LLM real sobre mi arquitectura RAG.',
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos (diacríticos combinados) para el matching
    .replace(/[^\w\s]/g, ' ');
}

/**
 * Retrieval por scoring de keywords. Devuelve la FAQ más relevante y sus chunks.
 * Sencillo a propósito: en producción se sustituye por embeddings + vector search.
 */
export function retrieve(question: string): RetrievalResult {
  const q = normalize(question);
  const tokens = new Set(q.split(/\s+/).filter(Boolean));

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (tokens.has(normalize(kw))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }

  const faq = best ?? FALLBACK;
  return {
    faq,
    chunks: faq.chunkIds.map(chunkById),
    score: bestScore,
  };
}
