import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Top Left / Center */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-500/20 via-indigo-500/15 to-pink-500/15 dark:from-purple-600/20 dark:via-blue-600/15 dark:to-indigo-500/20 blur-[100px] opacity-70"
      />

      {/* Orb 2: Bottom Right */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[45%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-blue-400/20 via-teal-400/15 to-emerald-400/10 dark:from-cyan-600/15 dark:via-blue-600/15 dark:to-emerald-600/10 blur-[110px] opacity-60"
      />

      {/* Subtle Noise / Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-30 dark:opacity-20" />
    </div>
  );
}
