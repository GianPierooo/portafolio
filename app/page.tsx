'use client';

import { useState } from 'react';
import SpaceBackground from '@/components/ui/SpaceBackground';
import VerticalSwitcher from '@/components/ui/VerticalSwitcher';
import ProjectCard from '@/components/ui/ProjectCard';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import ContactForm from '@/components/ui/ContactForm';
import Magnetic from '@/components/ui/Magnetic';
import CountUp from '@/components/ui/CountUp';
import SectionLabel from '@/components/ui/SectionLabel';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Download, Server, Wrench, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectCategory, getProjectsByCategory } from '@/lib/data';
import { experiences, toolkit, contactInfo, identity, techMarquee, stats } from '@/lib/profile';
import { fadeUp, fadeIn, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/lib/motion';

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
        {/* Orquestación con stagger: los hijos entran en cascada desde tokens */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl text-center"
        >
          {/* Animated Greeting — acento de ingeniero en mono */}
          <motion.p
            variants={fadeUp}
            className="mb-4 font-mono text-sm font-medium tracking-widest text-accent-cloud"
          >
            {'// hola_mundo, soy'}
          </motion.p>

          {/* Main Title */}
          <motion.h1
            variants={fadeUp}
            className="mb-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-accent-cloud bg-clip-text text-transparent">
              {identity.name}
            </span>
          </motion.h1>

          {/* Rol — mandato de posicionamiento: Cloud + IA, sin ambigüedad */}
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-300"
          >
            <span className="text-accent-cloud">Cloud Engineer</span> &{' '}
            <span className="text-accent-ai">AI Solutions Architect</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed"
          >
            {identity.tagline} Los productos que ves aquí —automatización,
            videojuegos, e-commerce— corren sobre esa arquitectura.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={fadeUp}
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

          {/* CTAs: Ver arquitecturas (primario) + Descargar CV (secundario), con hover magnético */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
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
                  'transition-colors duration-300',
                  'text-lg font-semibold text-white',
                  'inline-flex items-center gap-2'
                )}
              >
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-cloud to-accent-ai opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
                <span className="relative flex items-center gap-2">
                  Ver arquitecturas
                  <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            </Magnetic>

            {/* TODO: reemplazar /cv.pdf con la versión enfocada en Cloud+IA (lo actualiza Gian) */}
            <Magnetic>
              <a
                href="/cv.pdf"
                download
                className={cn(
                  'group relative overflow-hidden rounded-full px-8 py-4',
                  'glass hover:bg-white/10',
                  'transition-colors duration-300',
                  'text-lg font-semibold text-white',
                  'inline-flex items-center gap-2'
                )}
              >
                <span className="relative flex items-center gap-2">
                  Descargar CV
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Tech marquee — curada y jerarquizada: cloud/IA primero */}
          <motion.div
            variants={fadeIn}
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
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <SectionLabel className="mb-3">arquitecturas_en_produccion</SectionLabel>
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-16"
          >
            <SectionLabel className="mb-3" color="#8b5cf6">sobre_mi</SectionLabel>
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

          {/* Métricas reales con number counters (cuentan al entrar en viewport) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass rounded-xl border border-slate-800 p-6 text-center"
              >
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  className="block font-mono text-4xl sm:text-5xl font-bold text-white"
                />
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-20"
          >
            <SectionLabel className="mb-3">experiencia</SectionLabel>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Wrench className="h-8 w-8 text-accent-cloud" />
              Experiencia Profesional
            </h3>
            <ExperienceTimeline experiences={experiences} />
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <SectionLabel className="mb-3" color="#8b5cf6">stack_tecnologico</SectionLabel>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Server className="h-8 w-8 text-accent-ai" />
              Stack Tecnológico
            </h3>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {toolkit.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.category}
                    variants={fadeUp}
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
            </motion.div>
          </motion.section>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-8"
            >
              <div>
                <SectionLabel className="mb-3">contacto</SectionLabel>
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

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-4"
              >
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.label} variants={fadeUp}>
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
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
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
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
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
