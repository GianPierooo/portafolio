'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Social Links Data
 */
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/GianPierooo',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/gianpierooo/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:gianpierodaniel@gmail.com',
    icon: Mail,
  },
];

/**
 * Footer Component
 * Global footer with copyright, status indicator, and social links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/50 bg-space-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright and Status */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="text-sm text-slate-400">
                All Systems Operational
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-4 w-px bg-slate-700" />

            {/* Copyright */}
            <p className="text-sm text-slate-400 text-center md:text-left">
              © <span suppressHydrationWarning>{currentYear}</span>{' '}
              <span className="text-slate-300 font-medium">Gian Piero Cano</span>.
              Todos los derechos reservados.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.name}
                  className={cn(
                    'p-2 rounded-lg',
                    'text-slate-500 hover:text-accent-cloud',
                    'bg-slate-900/30 hover:bg-slate-900/50',
                    'border border-slate-800/50 hover:border-accent-cloud/30',
                    'transition-all duration-200',
                    'hover:scale-110 active:scale-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
}
