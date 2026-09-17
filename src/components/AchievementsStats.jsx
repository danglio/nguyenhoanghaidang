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
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Thành Tích & Chỉ Số Nổi Bật
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const IconComponent = iconMap[stat.icon] || Sparkles;

          return (
            <motion.div
              key={stat.id || index}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="glass-card p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm glow-card flex flex-col justify-between cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <IconComponent className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
