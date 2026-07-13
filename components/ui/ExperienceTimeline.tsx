'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Experience {
  year: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  achievements: string[];
  techStack?: string[];
  current?: boolean;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

/**
 * ExperienceTimeline Component
 * Clean vertical timeline showing professional experience
 * Inspired by the minimal design of the references
 */
export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cloud via-accent-ai to-transparent" />

      {/* Timeline items */}
      <div className="space-y-12 pl-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.year}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-12 top-2 flex items-center justify-center">
              <div className="relative">
                <div className="h-3 w-3 rounded-full bg-accent-cloud" />
                <div className="absolute inset-0 rounded-full bg-accent-cloud animate-ping opacity-75" />
              </div>
            </div>

            {/* Year badge */}
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-accent-cloud" />
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                {exp.year}
                {exp.current && (
                  <span className="ml-2 text-accent-ai">— Presente</span>
                )}
              </span>
            </div>

            {/* Content card */}
            <div
              className={cn(
                'glass rounded-xl p-6',
                'border border-slate-800 hover:border-accent-cloud/30',
                'transition-all duration-300',
                'hover:shadow-lg hover:shadow-accent-cloud/10'
              )}
            >
              {/* Role and Company */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cloud hover:text-accent-ai transition-colors inline-flex items-center gap-2 group"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="font-medium">{exp.company}</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                ) : (
                  <div className="text-accent-cloud inline-flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>

              {/* Achievements */}
              {exp.achievements.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="text-slate-400 text-sm flex items-start gap-2"
                    >
                      <span className="text-accent-cloud mt-1">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack */}
              {exp.techStack && exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-slate-800/50 text-xs font-medium text-slate-300 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
