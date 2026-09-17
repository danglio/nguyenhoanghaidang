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
  // Get initials from full name
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
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Monogram */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center shadow-sm tracking-wide">
            {initials}
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-sm tracking-tight text-neutral-800 dark:text-neutral-200 truncate max-w-[130px] sm:max-w-[200px]">
              {fullName || 'Personal Bio'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500/80 animate-pulse-slow" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            title="Sao chép liên kết trang"
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors"
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
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-sm transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chỉnh sửa</span>
            <span className="sm:hidden">Sửa</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
