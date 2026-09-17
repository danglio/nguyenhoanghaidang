import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Sparkles, Layers } from 'lucide-react';

export default function SkillsSection({ skills = [] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          <span>Kỹ Năng & Công Cụ Sáng Tạo</span>
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-card border border-neutral-200/80 dark:border-neutral-800/80 text-neutral-800 dark:text-neutral-200 shadow-sm glow-hover cursor-default select-none"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
