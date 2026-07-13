'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { contactInfo } from '@/lib/profile';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * ContactInfoList — isla cliente con las tarjetas de contacto y su stagger.
 * Datos desde lib/profile; motion idéntico a la Fase 1-4.
 */
export default function ContactInfoList() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="space-y-4"
    >
      {contactInfo.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.label} variants={fadeUp}>
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
                  <p className="text-sm text-slate-400 font-medium">{item.label}</p>
                  <p className="text-white group-hover:text-accent-cloud transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ) : (
              <div className={cn('flex items-center gap-4 p-4 rounded-xl', 'glass border border-slate-800')}>
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
                  <p className="text-sm text-slate-400 font-medium">{item.label}</p>
                  <p className="text-white">{item.value}</p>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
