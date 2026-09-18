import React from 'react';
import { Sun, Moon, Edit3, Share2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenEdit,
  onShare,
  onOpenContact,
  fullName = '',
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-300 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo Lio. with Cyan Glowing Dot */}
        <div className="flex items-center space-x-3">
          <a
            href="#home"
            className="flex items-center space-x-2 group focus:outline-none"
            title={fullName || 'Lio Portfolio'}
          >
            <div className="w-9 h-9 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-sm flex items-center justify-center shadow-md tracking-wider glow-hover border border-white/10 dark:border-neutral-900/10">
              L
            </div>
            <div className="flex items-center">
              <span className="font-black text-lg tracking-tight text-neutral-900 dark:text-white flex items-center">
                <span>Lio</span>
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] ml-0.5 animate-pulse" />
              </span>
              <span className="hidden sm:inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Portfolio
              </span>
            </div>
          </a>
        </div>

        {/* Centered Dock / Pill Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-neutral-200/50 dark:bg-neutral-900/60 border border-neutral-300/60 dark:border-white/10 backdrop-blur-md shadow-sm text-xs font-semibold">
          <a
            href="#home"
            className="px-4 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all"
          >
            Trang chủ
          </a>
          <a
            href="#projects"
            className="px-4 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all"
          >
            Dự án
          </a>
          <a
            href="#socials"
            className="px-4 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all"
          >
            Mạng xã hội
          </a>
          <a
            href="#skills"
            className="px-4 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all"
          >
            Kỹ năng
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Hợp tác Button */}
          {onOpenContact && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContact}
              title="Gửi lời mời hợp tác & booking"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-indigo-500/20 glow-btn transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hợp tác</span>
            </motion.button>
          )}

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
            className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md glow-btn transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chỉnh sửa hồ sơ</span>
            <span className="sm:hidden">Sửa</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
