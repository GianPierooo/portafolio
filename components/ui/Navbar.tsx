'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/motion';
import { OPEN_COMMAND_EVENT } from '@/components/ui/CommandMenu';

/** Abre el command palette vía evento global (también se abre con Ctrl/⌘+K). */
function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_COMMAND_EVENT));
}

/**
 * Navigation Links
 */
const navLinks = [
  { href: '#hero', label: 'Inicio' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#work', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
];

/**
 * Navbar Component
 * Sticky navigation with glassmorphism and mobile hamburger menu
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section with better threshold
      const sections = ['hero', 'experience', 'work', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active if its top is within viewport with offset for navbar
          const offset = 150; // Increased offset for better detection
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Immediately update active section for instant feedback
    setActiveSection(targetId);
    
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass border-b border-slate-800/50 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo GPC — texto tallado (letterpress + degradado de marca) */}
            <Link
              href="/"
              className="group relative"
              aria-label="Inicio — Gian Piero Cano"
            >
              <span
                className={cn(
                  'select-none text-2xl sm:text-3xl font-extrabold tracking-tight',
                  'bg-gradient-to-br from-white via-accent-cloud to-accent-ai bg-clip-text text-transparent',
                  'transition-[filter] duration-300'
                )}
                style={{
                  // Relieve tallado: highlight superior + sombra inferior en capas
                  filter:
                    'drop-shadow(0 -1px 0 rgba(255,255,255,0.25)) drop-shadow(0 2px 2px rgba(2,6,23,0.85)) drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
                }}
              >
                GPC
              </span>
              {/* Glow de marca al hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center text-2xl sm:text-3xl font-extrabold tracking-tight text-accent-cloud opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
              >
                GPC
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      'relative text-sm font-medium transition-colors cursor-pointer',
                      isActive
                        ? 'text-white'
                        : 'link-underline text-slate-400 hover:text-white'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cloud to-accent-ai"
                        transition={springs.pill}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Acciones de la derecha */}
            <div className="flex items-center gap-3">
              {/* Búsqueda — abre el command palette (lupa, sin símbolo de OS) */}
              <button
                onClick={openCommandPalette}
                className={cn(
                  'hidden md:flex items-center justify-center h-10 w-10 rounded-lg',
                  'bg-slate-900/40 hover:bg-slate-900/70',
                  'text-slate-400 hover:text-white',
                  'border border-slate-800/70 hover:border-slate-700',
                  'transition-all duration-200 hover:scale-105 active:scale-100'
                )}
                aria-label="Buscar (abrir paleta de comandos)"
                title="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* CV Button - Desktop */}
              {/* TODO: reemplazar /cv.pdf con la versión enfocada en Cloud+IA (lo actualiza Gian) */}
              <a
                href="/cv.pdf"
                download
                className={cn(
                  'hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg',
                  'glass hover:bg-white/10',
                  'text-sm font-semibold text-white',
                  'transition-all duration-300',
                  'hover:scale-105 active:scale-100',
                  'border border-accent-cloud/30'
                )}
              >
                <span>Descargar CV</span>
              </a>

              {/* Botón ⌘K — móvil (icono) */}
              <button
                onClick={openCommandPalette}
                className={cn(
                  'md:hidden p-2 rounded-lg',
                  'text-slate-400 hover:text-white',
                  'bg-slate-900/30 hover:bg-slate-900/50',
                  'border border-slate-800/50',
                  'transition-all duration-200'
                )}
                aria-label="Abrir paleta de comandos"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'md:hidden p-2 rounded-lg',
                  'text-slate-400 hover:text-white',
                  'bg-slate-900/30 hover:bg-slate-900/50',
                  'border border-slate-800/50',
                  'transition-all duration-200'
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed top-[72px] left-0 right-0 z-40',
              'glass border-b border-slate-800/50',
              'md:hidden'
            )}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer',
                      isActive
                        ? 'text-white bg-accent-cloud/10 border border-accent-cloud/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
