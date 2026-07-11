'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import { Server, Wrench, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { experiences, toolkit } from '@/lib/profile';

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
              Soy <span className="text-white font-semibold">Gian Piero Cano</span>,{' '}
              <span className="text-accent-cloud">Cloud Engineer</span> y{' '}
              <span className="text-accent-ai">arquitecto de soluciones de IA</span>.
              Pienso en sistemas: diseño la infraestructura, la operación y los componentes
              inteligentes que hacen que un producto funcione en producción. Fundador de
              Logimatix (automatización con agentes de IA) y Co-Fundador de Kchimbo
              (EdTech para preuniversitarios).
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              Opero servicios en Oracle Cloud —Ubuntu VMs, Nginx, PostgreSQL, APIs ML/LLM— y he
              creado más de 50 flujos de automatización que reducen procesos manuales en más de 70%.
              El desarrollo web (React, Next.js) y de videojuegos (Godot Engine) es la capa de
              entrega de esos sistemas: la aplicación visible de una base cloud + IA.
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
