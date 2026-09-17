import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote, Terminal, ArrowRight } from 'lucide-react';

export default function ProfileOverview({ personal }) {
  const { fullName, title, roles, bio } = personal;

  const roleList = roles && roles.length > 0 ? roles : [title || 'Content Creator & Developer'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Cycle roles every 3 seconds
  useEffect(() => {
    if (roleList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roleList.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roleList]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
    >
      {/* Top Pill / Vibe Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span>Hồ sơ cá nhân & không gian sáng tạo</span>
      </div>

      {/* Main Headline & Animated Dynamic Roles */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          <span>Xin chào, tôi là </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
            {fullName || 'Alex'}
          </span>
        </h1>

        {/* Animated Rotating Role */}
        <div className="h-8 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-base sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-2"
            >
              <span>{roleList[currentRoleIndex]}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Notion-style Bio Quote Box with Luminous Glow */}
      {bio && (
        <div className="relative glass-card p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm glow-hover transition-all">
          <Quote className="w-6 h-6 text-neutral-300 dark:text-neutral-700 mb-2 opacity-80" />
          <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
            {bio}
          </p>
        </div>
      )}
    </motion.section>
  );
}
