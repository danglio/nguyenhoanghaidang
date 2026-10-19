import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroLanyard from '../HeroLanyard';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import {
  Music,
  Folder,
  User,
  Tv,
  BarChart,
  Wifi,
  Battery,
  Search,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Send,
} from 'lucide-react';
import { YouTubeIcon, TikTokIcon } from '../SocialIcons';

export default function MacOSLayout({ profile, onOpenContact, showToast, onShare }) {
  const [activeWindow, setActiveWindow] = useState('profile');
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);

  const dockApps = [
    { id: 'profile', label: 'Hồ Sơ (Bio)', icon: User, color: 'bg-indigo-500' },
    { id: 'projects', label: 'Dự Án Số', icon: Folder, color: 'bg-cyan-500' },
    { id: 'socials', label: 'Kênh MXH', icon: Tv, color: 'bg-pink-500' },
    { id: 'stats', label: 'Thành Tích', icon: BarChart, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Simulated macOS Menu Bar */}
      <div className="rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 px-4 py-2 flex items-center justify-between text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-sm select-none">
        <div className="flex items-center gap-4">
          <span className="font-bold text-base leading-none"></span>
          <span className="font-bold text-neutral-900 dark:text-white">LioOS</span>
          <span className="hidden sm:inline text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer">Tệp</span>
          <span className="hidden sm:inline text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer">Cửa sổ</span>
          <span className="hidden sm:inline text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer">Giới thiệu</span>
        </div>

        <div className="flex items-center gap-3 text-neutral-500 text-[11px] font-mono">
          <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-bold">● HUIT Active</span>
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
          <span>23:45</span>
        </div>
      </div>

      {/* Main macOS Application Window */}
      <div
        className={`rounded-3xl bg-white/90 dark:bg-[#121217]/95 backdrop-blur-2xl border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl overflow-hidden transition-all duration-300 ${
          isWindowMaximized ? 'w-full' : 'max-w-5xl mx-auto'
        }`}
      >
        {/* Window Chrome / Title Bar */}
        <div className="bg-neutral-100/80 dark:bg-neutral-800/80 px-4 py-3 border-b border-neutral-200/80 dark:border-white/5 flex items-center justify-between select-none">
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveWindow('profile')}
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 flex items-center justify-center text-[8px] text-rose-950 font-bold cursor-pointer"
              title="Đóng về Hồ Sơ"
            >
              <X className="w-2 h-2 opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={() => setIsWindowMaximized(!isWindowMaximized)}
              className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 flex items-center justify-center text-[8px] text-amber-950 font-bold cursor-pointer"
              title="Thu nhỏ/Phóng to"
            >
              <Minimize2 className="w-2 h-2 opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={() => setIsWindowMaximized(!isWindowMaximized)}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 flex items-center justify-center text-[8px] text-emerald-950 font-bold cursor-pointer"
              title="Toàn màn hình"
            >
              <Maximize2 className="w-2 h-2 opacity-0 hover:opacity-100" />
            </button>
          </div>

          {/* Window Title & Active Indicator */}
          <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
            <span>Finder — {dockApps.find((a) => a.id === activeWindow)?.label}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">
              lio-portfolio.app
            </span>
          </div>

          <div className="w-16" />
        </div>

        {/* Window Inner Body */}
        <div className="p-4 sm:p-8 min-h-[480px]">
          <AnimatePresence mode="wait">
            {activeWindow === 'profile' && (
              <motion.div
                key="win-profile"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <HeroLanyard
                  personal={profile.personal}
                  links={profile.links}
                  profile={profile}
                  onOpenContact={onOpenContact}
                  showToast={showToast}
                />
              </motion.div>
            )}

            {activeWindow === 'projects' && (
              <motion.div
                key="win-projects"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white">
                    Các Ứng Dụng & Dự Án Đang Chạy
                  </h3>
                  <p className="text-xs text-neutral-500">Cenkin Radar Localhost • Apple Pro Showcase</p>
                </div>
                <ProjectsShowcase showToast={showToast} />
              </motion.div>
            )}

            {activeWindow === 'socials' && (
              <motion.div
                key="win-socials"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white">
                    Kênh Truyền Thông & Sáng Tạo Số
                  </h3>
                  <p className="text-xs text-neutral-500">TikTok @liotapkechuyen • YouTube @lio_tsv</p>
                </div>
                <SocialLinks links={profile.links} />
              </motion.div>
            )}

            {activeWindow === 'stats' && (
              <motion.div
                key="win-stats"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white">
                    Thành Tích Hoạt Động & Kỹ Năng
                  </h3>
                  <p className="text-xs text-neutral-500">55,000+ lượt xem • 4,500+ lượt thích</p>
                </div>
                <AchievementsStats stats={profile.stats} />
                <SkillsSection skills={profile.skills} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Simulated macOS Dock */}
      <div className="flex justify-center pt-2">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-xl">
          {dockApps.map((app) => {
            const Icon = app.icon;
            const isActive = activeWindow === app.id;

            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.18, y: -4 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveWindow(app.id)}
                className="relative group p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex flex-col items-center cursor-pointer"
                title={app.label}
              >
                <div className={`w-9 h-9 rounded-xl ${app.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-cyan-500 mt-1" />
                )}
                {/* Tooltip on hover */}
                <span className="absolute -top-8 px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {app.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
