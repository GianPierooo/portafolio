'use client';

import { useState } from 'react';
import SpaceBackground from '@/components/ui/SpaceBackground';
import VerticalSwitcher from '@/components/ui/VerticalSwitcher';
import ProjectCard from '@/components/ui/ProjectCard';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import ContactForm from '@/components/ui/ContactForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Download, Server, Wrench, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectCategory, getProjectsByCategory } from '@/lib/data';
import { experiences, toolkit, contactInfo, identity, techMarquee } from '@/lib/profile';

export default function Home() {
  // State for vertical filter
  const [activeVertical, setActiveVertical] = useState<ProjectCategory | 'all'>('all');

  // Get filtered projects
  const filteredProjects = getProjectsByCategory(activeVertical);
  return (
    <main className="relative overflow-hidden">
      {/* 3D Space Background */}
      <SpaceBackground />

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          {/* Animated Greeting — acento de ingeniero en mono */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 font-mono text-sm font-medium tracking-widest text-accent-cloud"
          >
            {'// hola_mundo, soy'}
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-accent-cloud bg-clip-text text-transparent">
              {identity.name}
            </span>
          </motion.h1>

          {/* Rol — mandato de posicionamiento: Cloud + IA, sin ambigüedad */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-300"
          >
            <span className="text-accent-cloud">Cloud Engineer</span> &{' '}
            <span className="text-accent-ai">AI Solutions Architect</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed"
          >
            {identity.tagline} Los productos que ves aquí —automatización,
            videojuegos, e-commerce— corren sobre esa arquitectura.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-10 flex items-center justify-center gap-6"
          >
            <SocialLink href="https://github.com/GianPierooo" icon={Github} label="GitHub" />
            <SocialLink
              href="https://linkedin.com/in/gianpierooo/"
              icon={Linkedin}
              label="LinkedIn"
            />
            <SocialLink href="mailto:gianpierodaniel@gmail.com" icon={Mail} label="Email" />
          </motion.div>

          {/* CTAs: Ver arquitecturas (primario) + Descargar CV (secundario) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'group relative overflow-hidden rounded-full px-8 py-4',
                'bg-gradient-to-r from-accent-cloud/20 to-accent-ai/20',
                'border border-accent-cloud/40 hover:border-accent-cloud/70',
                'transition-all duration-300',
                'text-lg font-semibold text-white',
                'hover:scale-105 active:scale-100',
                'inline-flex items-center gap-2'
              )}
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-cloud to-accent-ai opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
              <span className="relative flex items-center gap-2">
                Ver arquitecturas
                <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </span>
            </a>

            {/* TODO: reemplazar /cv.pdf con la versión enfocada en Cloud+IA (lo actualiza Gian) */}
            <a
              href="/cv.pdf"
              download
              className={cn(
                'group relative overflow-hidden rounded-full px-8 py-4',
                'glass hover:bg-white/10',
                'transition-all duration-300',
                'text-lg font-semibold text-white',
                'hover:scale-105 active:scale-100',
                'inline-flex items-center gap-2'
              )}
            >
              <span className="relative flex items-center gap-2">
                Descargar CV
                <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </span>
            </a>
          </motion.div>

          {/* Tech marquee — curada y jerarquizada: cloud/IA primero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="marquee-container relative mt-14 overflow-hidden"
            aria-label="Tecnologías principales"
          >
            {/* Fades laterales */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-space-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-space-950 to-transparent" />

            <div className="marquee-track flex w-max items-center gap-8">
              {/* Duplicado para loop continuo */}
              {[...techMarquee, ...techMarquee].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="whitespace-nowrap font-mono text-sm text-slate-500"
                  aria-hidden={i >= techMarquee.length}
                >
                  {tech}
                  <span className="ml-8 text-slate-700">·</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Proyectos & Soluciones
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Arquitecturas reales desplegadas en producción. Desde sistemas de IA hasta
              infraestructura cloud y automatización empresarial.
            </p>
          </motion.div>

          {/* Vertical Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <VerticalSwitcher
              activeVertical={activeVertical}
              onVerticalChange={setActiveVertical}
            />
          </motion.div>

          {/* Projects Grid with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVertical}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-slate-400 text-lg">
                No hay proyectos en esta categoría aún.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Sobre Mí
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                Soy <span className="text-white font-semibold">Gian Piero Cano</span>,{' '}
                <span className="text-accent-cloud">ingeniero cloud</span> especializado en{' '}
                <span className="text-accent-ai">sistemas de IA en producción</span>.
                Arquitecto la infraestructura y los sistemas inteligentes detrás de Logimatix
                (automatización con agentes de IA) y Kchimbo (EdTech para preuniversitarios).
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Opero servicios en Oracle Cloud (Ubuntu VMs, Nginx, PostgreSQL, APIs ML/LLM) y he
                creado más de 50 flujos de automatización que reducen procesos manuales en más de 70%.
                El desarrollo web y de videojuegos es mi capa de entrega: los productos que construyo
                —con React, Next.js o Godot— corren sobre esa base. Finalista Startup UTP entre 300+ equipos.
              </p>
            </div>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Wrench className="h-8 w-8 text-accent-cloud" />
              Experiencia Profesional
            </h3>
            <ExperienceTimeline experiences={experiences} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Server className="h-8 w-8 text-accent-ai" />
              Stack Tecnológico
            </h3>

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
                  >
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
                      <h4 className="text-lg font-semibold text-white">
                        {category.category}
                      </h4>
                    </div>

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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="h-1 w-16 bg-gradient-to-r from-accent-cloud to-accent-ai mb-6 rounded-full" />
                <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                  Trabajemos Juntos
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Estoy interesado en oportunidades para colaborar en proyectos innovadores
                  y desafiantes. Si tienes alguna propuesta, pregunta o simplemente quieres
                  saludar, no dudes en contactarme.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl',
                            'glass border border-slate-800 hover:border-slate-700',
                            'transition-all duration-300 group',
                            'hover:scale-[1.02]'
                          )}
                        >
                          <div
                            className="p-3 rounded-lg"
                            style={{
                              backgroundColor: `${item.color}20`,
                              border: `1px solid ${item.color}40`,
                            }}
                          >
                            <Icon className="h-6 w-6" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                            <p className="text-white group-hover:text-accent-cloud transition-colors">
                              {item.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl',
                            'glass border border-slate-800'
                          )}
                        >
                          <div
                            className="p-3 rounded-lg"
                            style={{
                              backgroundColor: `${item.color}20`,
                              border: `1px solid ${item.color}40`,
                            }}
                          >
                            <Icon className="h-6 w-6" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                            <p className="text-white">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl',
                  'glass border border-accent-ai/30',
                  'bg-accent-ai/5'
                )}
              >
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <p className="text-slate-300 font-medium">
                  Disponible para nuevos proyectos
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                'glass rounded-2xl p-8 border border-slate-800'
              )}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Social Link Component with glassmorphism and hover effects
 */
function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'group relative flex h-12 w-12 items-center justify-center rounded-full',
        'glass hover:bg-white/10',
        'transition-all duration-300',
        'hover:scale-110 active:scale-100'
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 rounded-full bg-accent-cloud opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
      
      <Icon className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-white" />
    </motion.a>
  );
}
