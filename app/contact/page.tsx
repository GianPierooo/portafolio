'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';
import { cn } from '@/lib/utils';

/**
 * Contact Information Data
 */
const contactInfo = [
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

/**
 * Contact Page
 * Two-column layout: Left (info card), Right (contact form)
 */
export default function ContactPage() {
  return (
    <>
      <main className="relative min-h-screen bg-space-950">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-space-900 to-space-950 -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Back Button */}
          <Link
            href="/"
            className={cn(
              'inline-flex items-center gap-2 mb-12',
              'text-slate-400 hover:text-white transition-colors',
              'group'
            )}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Inicio</span>
          </Link>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <div className="h-1 w-16 bg-gradient-to-r from-accent-cloud to-accent-ai mb-6 rounded-full" />
                <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                  Trabajemos Juntos
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Estoy interesado en oportunidades para colaborar en proyectos innovadores
                  y desafiantes. Si tienes alguna propuesta, pregunta o simplemente quieres
                  saludar, no dudes en contactarme a través del formulario o por mis redes
                  sociales.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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

              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                'glass rounded-2xl p-8 border border-slate-800',
                'sticky top-24'
              )}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
