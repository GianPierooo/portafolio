'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import { Code2, Server, Brain, Gamepad2, Wrench, Database, Cloud, Zap } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Professional Experience Data - Información real del CV
 */
const experiences = [
  {
    year: 'Jun 2025 — Presente',
    role: 'Fundador y Desarrollador',
    company: 'Logimatix',
    companyUrl: 'https://logimatix.shop',
    description:
      'Fundador y desarrollador de plataforma de automatizaciones para negocios, integrando n8n con APIs de CRM, pagos (Stripe/PayPal) y notificaciones (email/SMS).',
    achievements: [
      'Creación de 50+ flujos para clientes, reduciendo procesos manuales en más de un 70%.',
      'Despliegue en Oracle Cloud (Ubuntu VMs, Nginx, PostgreSQL, APIs ML/LLM).',
    ],
    techStack: ['n8n', 'Python', 'Oracle Cloud', 'PostgreSQL', 'Stripe', 'PayPal'],
    current: true,
  },
  {
    year: 'Ene 2025 — Presente',
    role: 'Co-Fundador',
    company: 'Kchimbo',
    companyUrl: 'https://kchimbo.com',
    description:
      'Creador de plataforma inteligente para preuniversitarios con contenido dinámico y tracking.',
    achievements: [
      'Despliegue de servicios en Oracle Cloud (Ubuntu, Nginx, PostgreSQL).',
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
      'Desarrollo de StoryQuest integrado en Threadbare (Endless OS Foundation).',
    achievements: [
      'Programación de mecánicas en Godot Engine y pruebas internas colaborativas.',
      'Diseño de personajes y sonido con LibreSprite y FL Studio.',
    ],
    techStack: ['Godot Engine', 'LibreSprite', 'FL Studio'],
  },
  {
    year: 'Oct 2023 — Presente',
    role: 'E-commerce Fundador',
    company: 'OnExotic / VictoriaModas',
    description:
      'Fundador de las marcas OnExotic (moda urbana hombre) y VictoriaModas (moda mujer), con presencia en redes y ventas online.',
    achievements: [
      'Desarrollo full-stack asistido por IA (Claude, React/Next.js, Node.js/Express).',
      'Integración de Mercado Pago, panel de admin e inventario.',
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'Mercado Pago'],
    current: true,
  },
];

/**
 * Toolkit Data - Technologies and Tools
 */
const toolkit = [
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    color: '#06b6d4',
    tools: ['Oracle Cloud', 'Ubuntu', 'Nginx', 'PostgreSQL', 'Docker', 'Git'],
  },
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    color: '#8b5cf6',
    tools: ['APIs ML/LLM', 'Python', 'FastAPI', 'Claude', 'OpenAI'],
  },
  {
    category: 'Automation',
    icon: Zap,
    color: '#8b5cf6',
    tools: ['n8n', 'Stripe', 'PayPal', 'Mercado Pago', 'Webhooks', 'CRM APIs'],
  },
  {
    category: 'Game Development',
    icon: Gamepad2,
    color: '#f59e0b',
    tools: ['Godot Engine', 'LibreSprite', 'FL Studio', 'GDScript'],
  },
  {
    category: 'Web Development',
    icon: Code2,
    color: '#06b6d4',
    tools: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Databases',
    icon: Database,
    color: '#8b5cf6',
    tools: ['PostgreSQL', 'REST APIs', 'MongoDB', 'Redis'],
  },
];

/**
 * About Page
 * Professional bio, experience timeline, and toolkit showcase
 */
export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-space-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-space-900 to-space-950 -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Back Button */}
        <Link
          href="/"
          className={cn(
            'inline-flex items-center gap-2 mb-8',
            'text-slate-400 hover:text-white transition-colors',
            'group'
          )}
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Inicio</span>
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Sobre Mí
          </h1>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-slate-300 leading-relaxed mb-4">
              Soy <span className="text-white font-semibold">Gian Piero Cano</span>,
              Ingeniero de Sistemas con experiencia en{' '}
              <span className="text-accent-ai">automatización con IA</span>,{' '}
              <span className="text-accent-cloud">infraestructura cloud</span> y{' '}
              <span className="text-accent-automation">desarrollo full-stack</span>.
              Fundador de Logimatix y Co-Fundador de Kchimbo (EdTech para preuniversitarios).
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              He creado más de 50 flujos de automatización que reducen procesos manuales en más de 70%,
              desplegado servicios en Oracle Cloud y desarrollado productos con React, Next.js y Godot Engine.
              Finalista Startup UTP entre 300+ equipos.
            </p>
          </div>
        </motion.header>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-accent-cloud" />
            Experiencia Profesional
          </h2>
          <ExperienceTimeline experiences={experiences} />
        </motion.section>

        {/* Toolkit Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Server className="h-8 w-8 text-accent-ai" />
            Stack Tecnológico
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkit.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    'glass rounded-xl p-6',
                    'border border-slate-800 hover:border-slate-700',
                    'transition-all duration-300',
                    'hover:shadow-lg'
                  )}
                  style={{
                    ['--category-color' as string]: category.color,
                  }}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${category.color}20`,
                        border: `1px solid ${category.color}40`,
                      }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.category}
                    </h3>
                  </div>

                  {/* Tools List */}
                  <ul className="space-y-2">
                    {category.tools.map((tool) => (
                      <li
                        key={tool}
                        className="text-sm text-slate-400 flex items-center gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl p-8 border border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-slate-400 mb-6">
              Hablemos sobre cómo puedo ayudarte a construir soluciones innovadoras.
            </p>
            <Link
              href="/#work"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 rounded-lg',
                'bg-gradient-to-r from-accent-cloud to-accent-ai',
                'text-white font-semibold',
                'hover:scale-105 active:scale-100',
                'transition-transform duration-300'
              )}
            >
              Ver Proyectos
            </Link>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
