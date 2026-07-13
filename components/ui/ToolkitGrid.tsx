'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toolkit } from '@/lib/profile';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * ToolkitGrid — isla cliente con el grid del stack tecnológico y su stagger.
 * Datos desde lib/profile; motion idéntico a la Fase 1-4.
 */
export default function ToolkitGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
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
                <Icon className="h-6 w-6" style={{ color: category.color }} />
              </div>
              <h4 className="text-lg font-semibold text-white">{category.category}</h4>
            </div>

            <ul className="space-y-2">
              {category.tools.map((tool) => (
                <li key={tool} className="text-sm text-slate-400 flex items-center gap-2">
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
  );
}
