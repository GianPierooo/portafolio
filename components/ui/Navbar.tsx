'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/motion';

/**
 * Navigation Links
 */
const navLinks = [
  { href: '#hero', label: 'Inicio' },
  { href: '#work', label: 'Proyectos' },
  { href: '#about', label: 'Sobre Mí' },
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
      const sections = ['hero', 'work', 'about', 'contact'];
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
            {/* Logo GPC */}
            <Link
              href="/"
              className="group flex items-center gap-3 text-xl font-bold text-white hover:text-accent-cloud transition-colors"
              aria-label="Inicio — Gian Piero Cano"
            >
              <Image
                src="/images/logo.png"
                alt="Logo GPC — Systems Engineer"
                width={36}
                height={36}
                className="rounded-full ring-1 ring-accent-cloud/30 transition-shadow group-hover:ring-accent-cloud/60"
                priority
              />
              <span className="hidden sm:inline">
                <span className="text-accent-cloud">GP</span>C
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
