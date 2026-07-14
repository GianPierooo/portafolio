import SpaceBackground from '@/components/ui/SpaceBackground';
import FramedPortrait from '@/components/ui/FramedPortrait';
import Magnetic from '@/components/ui/Magnetic';
import Reveal from '@/components/ui/Reveal';
import ProjectsExplorer from '@/components/ui/ProjectsExplorer';
import AiChatLazy from '@/components/ui/AiChatLazy';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import ToolkitGrid from '@/components/ui/ToolkitGrid';
import ContactInfoList from '@/components/ui/ContactInfoList';
import ContactForm from '@/components/ui/ContactForm';
import SectionLabel from '@/components/ui/SectionLabel';
import RaisedTitle from '@/components/ui/RaisedTitle';
import { ArrowRight, Server, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { experiences, identity, techMarquee } from '@/lib/profile';

/** Home — SERVER COMPONENT. Contenido estático en servidor; islas cliente solo
 *  para lo interactivo/animado. */
export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* 3D Space Background (isla cliente, lazy + fallback estático) */}
      <SpaceBackground />

      {/* Hero — editorial 2 columnas (foto + texto). Entrada CSS (hero-rise): el
          H1 (LCP) no depende de JS. Contenedor ancho (usa el ancho real). */}
      <section
        id="hero"
        className="relative z-10 flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Retrato (desktop: izquierda; móvil: arriba) */}
          <div className="hero-rise hero-rise-1">
            <FramedPortrait priority />
          </div>

          {/* Texto (desktop: derecha; móvil: abajo) */}
          <div className="text-center lg:text-left">
            <p className="hero-rise hero-rise-2 mb-4 font-mono text-sm font-medium tracking-widest text-accent-cloud">
              {'// hola_mundo, soy'}
            </p>

            {/* Nombre — elemento LCP: relieve via clase + entrada CSS (sin framer) */}
            <h1 className="hero-rise hero-rise-3 raised-title mb-5 text-6xl sm:text-7xl lg:text-8xl">
              {identity.name}
            </h1>

            {/* Rol en una línea */}
            <p className="hero-rise hero-rise-4 mb-5 text-2xl font-semibold text-slate-300 lg:text-[1.75rem]">
              <span className="text-accent-cloud">Cloud Engineer</span> &{' '}
              <span className="text-accent-ai">AI Solutions Architect</span>
            </p>

            {/* Tagline en una frase */}
            <p className="hero-rise hero-rise-5 mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-400 lg:mx-0 lg:text-xl">
              {identity.tagline}
            </p>

            {/* Un solo CTA */}
            <div className="hero-rise hero-rise-6 flex justify-center lg:justify-start">
              <Magnetic>
                <a
                  href="#work"
                  className={cn(
                    'group relative overflow-hidden rounded-full px-9 py-4',
                    'bg-gradient-to-r from-accent-cloud/20 to-accent-ai/20',
                    'border border-accent-cloud/40 hover:border-accent-cloud/70',
                    'text-lg font-semibold text-white transition-colors duration-300',
                    'inline-flex items-center gap-2'
                  )}
                >
                  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-cloud to-accent-ai opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
                  <span className="relative flex items-center gap-2">
                    Ver trabajo
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Tech marquee — full-width al pie del hero (curada: cloud/IA primero) */}
        <div
          className="hero-rise hero-rise-7 marquee-container absolute inset-x-0 bottom-8 overflow-hidden"
          aria-label="Tecnologías principales"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-space-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-space-950 to-transparent" />
          <div className="marquee-track flex w-max items-center gap-8 px-6">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="whitespace-nowrap font-mono text-sm text-slate-400"
                aria-hidden={i >= techMarquee.length}
              >
                {tech}
                <span className="ml-8 text-slate-700">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel className="mb-3">arquitecturas_en_produccion</SectionLabel>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">Proyectos &amp; Soluciones</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Arquitecturas reales desplegadas en producción. Desde sistemas de IA hasta
              infraestructura cloud y automatización empresarial.
            </p>
          </Reveal>

          {/* Isla cliente: filtro de verticales + grid animado */}
          <ProjectsExplorer />
        </div>
      </section>

      {/* AI Demo Section — el diferenciador: RAG interactiva en vivo (§6.1) */}
      <section id="ai" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <SectionLabel className="mb-3" color="#8b5cf6">ask_my_ai</SectionLabel>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">IA en vivo, no en un slide</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Un asistente RAG que responde sobre mi perfil recuperando fragmentos reales,
              armando el contexto y generando la respuesta. La misma clase de sistema que
              despliego para clientes.
            </p>
          </Reveal>

          <Reveal variant="in">
            <AiChatLazy />
          </Reveal>
        </div>
      </section>

      {/* About Section — editorial 2 columnas (foto + texto corto), ancho real */}
      <section id="about" className="relative z-10 min-h-screen py-28 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Sobre Mí: foto izq (desktop) / arriba (móvil) + texto corto der */}
          <div className="mb-28 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="left">
              <FramedPortrait />
            </Reveal>

            <div className="text-center lg:text-left">
              <SectionLabel className="mb-3" color="#8b5cf6">sobre_mi</SectionLabel>
              <RaisedTitle as="h2" className="mb-8 text-5xl sm:text-6xl lg:text-7xl">
                Sobre Mí
              </RaisedTitle>
              <Reveal variant="up" className="space-y-5">
                <p className="text-2xl font-semibold leading-snug text-slate-200 lg:text-3xl">
                  Ingeniero cloud que construye{' '}
                  <span className="text-accent-ai">sistemas de IA en producción</span>.
                </p>
                <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-400 lg:mx-0">
                  Diseño la infraestructura y los agentes inteligentes detrás de{' '}
                  <span className="text-accent-cloud">Logimatix</span> y{' '}
                  <span className="text-accent-cloud">Kchimbo</span>. El desarrollo web y de
                  videojuegos es solo la capa de entrega.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Experiencia (título con relieve) */}
          <Reveal as="section" className="mb-28">
            <SectionLabel className="mb-3">experiencia</SectionLabel>
            <div className="mb-10 flex items-center gap-3">
              <Wrench className="h-8 w-8 shrink-0 text-accent-cloud" />
              <RaisedTitle as="h3" className="text-3xl sm:text-4xl">
                Experiencia Profesional
              </RaisedTitle>
            </div>
            <ExperienceTimeline experiences={experiences} />
          </Reveal>

          <Reveal as="section">
            <SectionLabel className="mb-3" color="#8b5cf6">stack_tecnologico</SectionLabel>
            <div className="mb-10 flex items-center gap-3">
              <Server className="h-8 w-8 shrink-0 text-accent-ai" />
              <RaisedTitle as="h3" className="text-3xl sm:text-4xl">
                Stack Tecnológico
              </RaisedTitle>
            </div>
            {/* Isla cliente: grid con stagger */}
            <ToolkitGrid />
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal variant="left" className="space-y-8">
              <div>
                <SectionLabel className="mb-3">contacto</SectionLabel>
                <div className="h-1 w-16 bg-gradient-to-r from-accent-cloud to-accent-ai mb-6 rounded-full" />
                <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">Trabajemos Juntos</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Estoy interesado en oportunidades para colaborar en proyectos innovadores
                  y desafiantes. Si tienes alguna propuesta, pregunta o simplemente quieres
                  saludar, no dudes en contactarme.
                </p>
              </div>

              {/* Isla cliente: tarjetas de contacto con stagger */}
              <ContactInfoList />

              <div
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
                <p className="text-slate-300 font-medium">Disponible para nuevos proyectos</p>
              </div>
            </Reveal>

            <Reveal variant="right" className="glass rounded-2xl p-8 border border-slate-800">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
