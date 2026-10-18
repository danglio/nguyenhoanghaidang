import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  LayoutGrid,
  Columns,
  Bookmark,
  Smartphone,
  Monitor,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

export const LAYOUT_OPTIONS = [
  {
    id: 'classic',
    name: 'Gốc (Classic)',
    tag: 'Cuộn dài',
    icon: Layers,
    desc: 'Bố cục nguyên bản hiện tại',
  },
  {
    id: 'bento',
    name: 'Bento Grid 2.0',
    tag: 'Hot 2025',
    icon: LayoutGrid,
    desc: 'Lưới module kiểu Apple & Linear',
  },
  {
    id: 'split',
    name: 'Split-Screen',
    tag: '2 Cột',
    icon: Columns,
    desc: 'Cột trái cố định, cột phải cuộn',
  },
  {
    id: 'tabs',
    name: 'Dynamic Tabs',
    tag: 'iOS 18',
    icon: Bookmark,
    desc: 'Phân nhóm theo tab tiện lợi',
  },
  {
    id: 'minimal',
    name: 'Minimalist Bio',
    tag: 'Mobile-first',
    icon: Smartphone,
    desc: 'Gọn gàng danh thiếp điện tử',
  },
  {
    id: 'macos',
    name: 'macOS Desktop',
    tag: 'Giao diện Mac',
    icon: Monitor,
    desc: 'Cửa sổ ứng dụng & app dock',
  },
  {
    id: 'editorial',
    name: 'Storyteller',
    tag: 'Tạp chí',
    icon: BookOpen,
    desc: 'Kể chuyện nghệ thuật theo chương',
  },
];

export default function LayoutSwitcherBar({ activeLayout, onSelectLayout }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lio_layout_switcher_collapsed');
      if (saved !== null) return saved === 'true';
    }
    return true; // Start in collapsed floating pill mode by default
  });

  const handleSetCollapsed = (val) => {
    setIsCollapsed(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lio_layout_switcher_collapsed', String(val));
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl px-2">
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          // Minimized Floating Pill Button
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            onClick={() => handleSetCollapsed(false)}
            className="mx-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/90 dark:bg-white/95 text-white dark:text-neutral-900 shadow-2xl backdrop-blur-xl border border-white/20 dark:border-neutral-800 text-xs sm:text-sm font-bold glow-hover cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 dark:text-cyan-600 animate-pulse" />
            <span>Đang xem: <strong>{LAYOUT_OPTIONS.find((l) => l.id === activeLayout)?.name}</strong></span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 dark:text-cyan-800 font-mono">
              7 DEMO
            </span>
            <ChevronUp className="w-4 h-4 ml-1 opacity-70" />
          </motion.button>
        ) : (
          // Full Interactive Switcher Dock
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#121216]/90 backdrop-blur-2xl border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-2.5 sm:p-3"
          >
            {/* Top Bar inside dock */}
            <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-neutral-200/50 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <h4 className="text-xs sm:text-sm font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>Trải Nghiệm Thử 7 Bố Cục Thịnh Hành</span>
                  <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    Click để đổi tức thì
                  </span>
                </h4>
              </div>

              <button
                onClick={() => handleSetCollapsed(true)}
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
                title="Thu nhỏ thanh chọn"
              >
                <span>Thu gọn</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Layout Buttons Grid/Carousel */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-0.5">
              {LAYOUT_OPTIONS.map((layout) => {
                const Icon = layout.icon;
                const isActive = activeLayout === layout.id;

                return (
                  <button
                    key={layout.id}
                    onClick={() => onSelectLayout(layout.id)}
                    className={`relative shrink-0 flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white shadow-md shadow-indigo-500/25'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeLayoutPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`} />
                      <span className="whitespace-nowrap">{layout.name}</span>
                    </span>

                    {layout.tag && (
                      <span
                        className={`relative z-10 hidden md:inline-block text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-neutral-200/70 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        {layout.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
