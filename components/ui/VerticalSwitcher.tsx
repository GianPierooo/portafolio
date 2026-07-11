'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectCategory, verticals } from '@/lib/data';
import { springs } from '@/lib/motion';

interface VerticalSwitcherProps {
  activeVertical: ProjectCategory | 'all';
  onVerticalChange: (vertical: ProjectCategory | 'all') => void;
}

const tabs = [
  { id: 'all' as const, label: verticals.all.label },
  { id: 'cloud' as const, label: verticals.cloud.label },
  { id: 'ai' as const, label: verticals.ai.label },
  { id: 'automation' as const, label: verticals.automation.label },
  { id: 'gamedev' as const, label: verticals.gamedev.label },
];

/**
 * VerticalSwitcher Component
 * Animated tabs to filter projects by vertical (Cloud, AI, Automation, GameDev)
 * Features a sliding pill background that animates between selections
 */
export default function VerticalSwitcher({
  activeVertical,
  onVerticalChange,
}: VerticalSwitcherProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex glass rounded-full p-1.5 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onVerticalChange(tab.id)}
            className={cn(
              'relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-accent-cloud/50',
              activeVertical === tab.id
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {/* Animated pill background */}
            {activeVertical === tab.id && (
              <motion.div
                layoutId="active-pill"
                className={cn(
                  'absolute inset-0 rounded-full',
                  // Different background colors per vertical
                  tab.id === 'cloud' && 'bg-accent-cloud/20',
                  tab.id === 'ai' && 'bg-accent-ai/20',
                  tab.id === 'automation' && 'bg-accent-automation/20',
                  tab.id === 'gamedev' && 'bg-accent-gamedev/20',
                  tab.id === 'all' && 'bg-white/10'
                )}
                style={{
                  boxShadow:
                    tab.id === 'cloud'
                      ? '0 0 20px rgba(6, 182, 212, 0.3)'
                      : tab.id === 'ai'
                      ? '0 0 20px rgba(139, 92, 246, 0.3)'
                      : tab.id === 'automation'
                      ? '0 0 20px rgba(16, 185, 129, 0.3)'
                      : tab.id === 'gamedev'
                      ? '0 0 20px rgba(245, 158, 11, 0.3)'
                      : 'none',
                }}
                transition={springs.pill}
              />
            )}

            {/* Tab label */}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
