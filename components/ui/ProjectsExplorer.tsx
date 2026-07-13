'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <p className="text-slate-400 text-lg">No hay proyectos en esta categoría aún.</p>
        </motion.div>
      )}
    </>
  );
}
