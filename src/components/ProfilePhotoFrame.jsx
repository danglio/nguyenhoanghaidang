import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ProfilePhotoFrame({ personal, className = '' }) {
  const avatarUrl = personal?.avatarUrl || `${import.meta.env.BASE_URL}avatar.jpg`;
  const fullName = personal?.fullName || 'Nguyễn Hoàng Hải Đăng';

  return (
    <div className={`relative group inline-block ${className}`}>
      {/* Ambient background glow behind the frame synchronized with web theme */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/25 via-indigo-500/25 to-pink-500/25 rounded-[30px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Glassmorphic Photo Frame */}
      <motion.div
        whileHover={{ scale: 1.025, y: -2 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative rounded-3xl p-2 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200/80 dark:border-white/15 shadow-xl overflow-hidden"
      >
        {/* Inner Image Container with Rounded Corners */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500';
            }}
          />

          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

          {/* Active Status Badge in the corner */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white font-medium shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>HUIT • TP.HCM</span>
          </div>
        </div>

        {/* Decorative corner accent badge */}
        <div className="absolute top-3.5 right-3.5 p-1 rounded-full bg-white/90 dark:bg-neutral-800/90 text-cyan-500 shadow-sm border border-neutral-200/60 dark:border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
        </div>
      </motion.div>
    </div>
  );
}
