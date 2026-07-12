'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Home,
  FolderGit2,
  Sparkles,
  User,
  Mail,
  Github,
  Linkedin,
  Download,
  CornerDownLeft,
  Search,
  ArrowUp,
  ArrowDown,
  type LucideIcon,
} from 'lucide-react';
import { projects, verticals } from '@/lib/data';
import { identity } from '@/lib/profile';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  hint: string; // categoría/breadcrumb mostrada a la derecha
  keywords: string;
  icon: LucideIcon;
  group: 'Navegación' | 'Proyectos' | 'Enlaces';
  run: () => void;
}

/**
 * Matcher fuzzy artesanal (subsecuencia con penalización por huecos).
 * Devuelve un score (menor = mejor) o null si no hay match.
 */
function fuzzyScore(query: string, text: string): number | null {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  let score = 0;
  let last = -1;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (last >= 0) score += ti - last;
      last = ti;
      qi++;
    }
  }
  return qi === q.length ? score : null;
}

export default function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  /* Acciones de navegación reutilizables */
  const goSection = useCallback(
    (hash: string) => {
      onClose();
      if (window.location.pathname === '/') {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      } else {
        window.location.assign(`/#${hash}`);
      }
    },
    [onClose, reduced]
  );

  const commands = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      { id: 'nav-home', label: 'Inicio', hint: 'sección', keywords: 'inicio home hero', icon: Home, group: 'Navegación', run: () => goSection('hero') },
      { id: 'nav-work', label: 'Proyectos', hint: 'sección', keywords: 'proyectos work trabajos', icon: FolderGit2, group: 'Navegación', run: () => goSection('work') },
      { id: 'nav-ai', label: 'IA en vivo', hint: 'sección', keywords: 'ia demo rag inteligencia artificial', icon: Sparkles, group: 'Navegación', run: () => goSection('ai') },
      { id: 'nav-about', label: 'Sobre mí', hint: 'sección', keywords: 'sobre mi about acerca', icon: User, group: 'Navegación', run: () => goSection('about') },
      { id: 'nav-contact', label: 'Contacto', hint: 'sección', keywords: 'contacto contact email', icon: Mail, group: 'Navegación', run: () => goSection('contact') },
    ];

    const proj: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: p.title,
      hint: p.category.map((c) => verticals[c]?.label).filter(Boolean).join(' · '),
      keywords: `${p.title} ${p.techStack.join(' ')} ${p.category.join(' ')}`,
      icon: FolderGit2,
      group: 'Proyectos',
      run: () => {
        onClose();
        router.push(`/projects/${p.slug}`);
      },
    }));

    const links: CommandItem[] = [
      { id: 'link-github', label: 'GitHub', hint: identity.github.replace('https://', ''), keywords: 'github codigo repo', icon: Github, group: 'Enlaces', run: () => { onClose(); window.open(identity.github, '_blank', 'noopener'); } },
      { id: 'link-linkedin', label: 'LinkedIn', hint: identity.linkedin.replace('https://', ''), keywords: 'linkedin perfil', icon: Linkedin, group: 'Enlaces', run: () => { onClose(); window.open(identity.linkedin, '_blank', 'noopener'); } },
      { id: 'link-email', label: 'Enviar email', hint: identity.email, keywords: 'email correo mail contacto', icon: Mail, group: 'Enlaces', run: () => { onClose(); window.location.href = `mailto:${identity.email}`; } },
      { id: 'link-cv', label: 'Descargar CV', hint: 'PDF', keywords: 'cv curriculum descargar pdf', icon: Download, group: 'Enlaces', run: () => { onClose(); const a = document.createElement('a'); a.href = '/cv.pdf'; a.download = ''; a.click(); } },
    ];

    return [...nav, ...proj, ...links];
  }, [goSection, onClose, router]);

  /* Filtrado fuzzy */
  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return commands;
    return commands
      .map((c) => ({ c, s: fuzzyScore(q, `${c.label} ${c.keywords}`) }))
      .filter((r) => r.s !== null)
      .sort((a, b) => (a.s! - b.s!))
      .map((r) => r.c);
  }, [query, commands]);

  // Reset del índice activo al cambiar la búsqueda
  useEffect(() => setActive(0), [query]);

  // Foco inicial + restaurar foco al cerrar + bloquear scroll del body
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, []);

  // Mantener el ítem activo visible
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (results.length ? (i + 1) % results.length : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        break;
      case 'Enter':
        e.preventDefault();
        results[active]?.run();
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Focus trap: no dejar salir el foco del palette
        e.preventDefault();
        break;
    }
  };

  const activeId = results[active]?.id;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Paleta de comandos"
          className="glass relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-slate-700 bg-slate-950/90 shadow-2xl"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          onKeyDown={onKeyDown}
        >
          {/* Input */}
          <div className="flex items-center gap-3 border-b border-slate-800 px-4">
            <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar proyectos, secciones, enlaces…"
              className="w-full bg-transparent py-4 font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-label="Buscar comando"
            />
            <kbd className="hidden shrink-0 rounded border border-slate-700 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 sm:inline">
              ESC
            </kbd>
          </div>

          {/* Resultados */}
          <ul
            id="command-list"
            ref={listRef}
            role="listbox"
            aria-label="Comandos"
            className="max-h-[50vh] overflow-y-auto p-2"
          >
            {results.length === 0 && (
              <li className="px-3 py-8 text-center font-mono text-sm text-slate-500">
                Sin resultados para “{query}”
              </li>
            )}
            {results.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              const showGroupHeader = i === 0 || results[i - 1].group !== c.group;
              return (
                <div key={c.id}>
                  {showGroupHeader && (
                    <li
                      role="presentation"
                      className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-slate-600"
                    >
                      {c.group}
                    </li>
                  )}
                  <li
                    id={c.id}
                    data-idx={i}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => c.run()}
                    onMouseMove={() => setActive(i)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
                      isActive ? 'bg-accent-cloud/15 text-white' : 'text-slate-300'
                    )}
                  >
                    <Icon
                      className={cn('h-4 w-4 shrink-0', isActive ? 'text-accent-cloud' : 'text-slate-500')}
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate">{c.label}</span>
                    <span className="shrink-0 truncate font-mono text-xs text-slate-600">{c.hint}</span>
                    {isActive && (
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent-cloud" aria-hidden="true" />
                    )}
                  </li>
                </div>
              );
            })}
          </ul>

          {/* Pie con ayudas de teclado */}
          <div className="flex items-center gap-4 border-t border-slate-800 px-4 py-2 font-mono text-[10px] text-slate-600">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" />
              navegar
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" />
              abrir
            </span>
            <span>esc cerrar</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
