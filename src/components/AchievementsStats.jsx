import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Sparkles,
  Flame,
  Heart,
  Trophy,
  Rocket,
  Star,
  Code,
  Award,
  Zap,
} from 'lucide-react';

const iconMap = {
  Users,
  Sparkles,
  Flame,
  Heart,
  Trophy,
  Rocket,
  Star,
  Code,
  Award,
  Zap,
};

export default function AchievementsStats({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="px-4 py-4 max-w-2xl mx-auto w-full"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {stats.map((stat, index) => {
          const IconComponent = iconMap[stat.icon] || Sparkles;

          return (
            <motion.div
              key={stat.id || index}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="glass-card p-3.5 sm:p-4 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/80 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <IconComponent className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
