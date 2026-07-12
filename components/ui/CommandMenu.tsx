'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// El diálogo (búsqueda, lista, aria) se carga solo al abrir → no entra en el
// First Load JS inicial. El launcher en sí es mínimo (un listener de teclado).
const CommandPaletteDialog = dynamic(() => import('./CommandPaletteDialog'), {
  ssr: false,
});

/** Evento global para abrir el palette desde cualquier botón (ej. Navbar). */
export const OPEN_COMMAND_EVENT = 'open-command-palette';

/**
 * CommandMenu — launcher del command palette (§6.3).
 * Montado una vez en el layout. Abre con ⌘K / Ctrl+K o con el evento global,
 * y carga el diálogo pesado de forma diferida.
 */
export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, []);

  if (!open) return null;
  return <CommandPaletteDialog onClose={() => setOpen(false)} />;
}
