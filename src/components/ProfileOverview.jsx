import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote, Compass } from 'lucide-react';

export default function ProfileOverview({ personal }) {
  const { fullName, title, bio } = personal;

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
        <span>Hồ sơ cá nhân chính thức</span>
      </div>

      {/* Main Headline & Intro */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          <span>Xin chào, tôi là </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
            {fullName || 'Alex'}
          </span>
        </h1>

        <p className="text-base sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400">
          {title || 'Content Creator & Developer'}
        </p>
      </div>

      {/* Notion-style Bio Quote Box with Glow */}
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
