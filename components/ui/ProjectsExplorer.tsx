'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import VerticalSwitcher from '@/components/ui/VerticalSwitcher';
import ProjectCard from '@/components/ui/ProjectCard';
import { ProjectCategory, getProjectsByCategory } from '@/lib/data';
import { fadeUp, viewportOnce } from '@/lib/motion';

/**
 * ProjectsExplorer — isla cliente con el filtro de verticales y el grid animado.
 * Extraído de la home para que el resto de la página sea server component.
 * Comportamiento y motion idénticos a la Fase 1-4 (switcher + AnimatePresence).
 */
export default function ProjectsExplorer() {
  const [activeVertical, setActiveVertical] = useState<ProjectCategory | 'all'>('all');
  const filteredProjects = getProjectsByCategory(activeVertical);

  return (
    <>
      {/* Vertical Switcher */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-12"
        data-reveal
      >
        <VerticalSwitcher
          activeVertical={activeVertical}
          onVerticalChange={setActiveVertical}
        />
      </motion.div>

      {/* Grid sin AnimatePresence: al cambiar la vertical React desmonta los
          cards filtrados de inmediato y monta los nuevos (cada uno con su
          entrada). Robusto bajo prefers-reduced-motion (no depende de que el
          exit complete). `layout` da reflujo suave a los que permanecen. */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No hay proyectos en esta categoría aún.</p>
        </div>
      )}
    </>
  );
}
