import React from 'react';
import { Sun, Moon, Edit3, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenEdit,
  onShare,
  fullName = '',
}) {
  const initials = fullName
    ? fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('')
    : 'ME';

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Monogram */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-xs flex items-center justify-center shadow-md tracking-wider glow-hover">
            {initials}
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-neutral-100 truncate max-w-[140px] sm:max-w-[240px]">
              {fullName || 'Personal Bio'}
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Portfolio
            </span>
          </div>
        </div>

        {/* Action Buttons with Glowing Effects */}
        <div className="flex items-center space-x-2.5">
          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            title="Sao chép liên kết trang"
            className="p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 glow-btn transition-all"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
            className="p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 glow-btn transition-all"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </motion.button>

          {/* Edit Profile Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenEdit}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md glow-btn transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh sửa hồ sơ</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
