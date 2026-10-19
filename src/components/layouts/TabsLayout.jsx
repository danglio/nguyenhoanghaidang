import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroLanyard from '../HeroLanyard';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import { Layers, Box, Tv, BarChart3, Music, ExternalLink, Send } from 'lucide-react';
import { YouTubeIcon } from '../SocialIcons';

export default function TabsLayout({ profile, onOpenContact, showToast, onShare }) {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tất Cả', icon: Layers, badge: 'Overview' },
    { id: 'projects', label: 'Dự Án & App', icon: Box, badge: '3 Apps' },
    { id: 'socials', label: 'Kênh MXH & Video', icon: Tv, badge: '6 Kênh' },
    { id: 'stats', label: 'Chỉ Số & Kỹ Năng', icon: BarChart3, badge: '60K+ Views' },
  ];

  return (
    <div className="space-y-10">
      {/* Top Hero Section with 3D Lanyard */}
      <section className="glass-card rounded-3xl p-4 sm:p-6 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md">
        <HeroLanyard
          personal={profile.personal}
          links={profile.links}
          profile={profile}
          onOpenContact={onOpenContact}
          showToast={showToast}
        />
      </section>

      {/* Segmented Control Bar */}
      <div className="sticky top-20 z-30 flex justify-center py-2">
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-lg overflow-x-auto no-scrollbar max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSegmentedTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md shadow-indigo-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </span>

                <span
                  className={`relative z-10 hidden md:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Tab Content Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'all' && (
          <motion.div
            key="tab-all"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-14"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-cyan-500" />
                <span>Dự Án Nổi Bật</span>
              </h3>
              <ProjectsShowcase showToast={showToast} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <Tv className="w-5 h-5 text-indigo-500" />
                <span>Kênh Mạng Xã Hội</span>
              </h3>
              <SocialLinks links={profile.links} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                <span>Thành Tích & Kỹ Năng</span>
              </h3>
              <AchievementsStats stats={profile.stats} />
              <SkillsSection skills={profile.skills} />
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-cyan-500" />
                <span>Phòng Trưng Bày Dự Án Số & Case Studies</span>
              </h3>
              <span className="text-xs text-neutral-400">3 Dự án chính</span>
            </div>
            <ProjectsShowcase showToast={showToast} />
          </motion.div>
        )}

        {activeTab === 'socials' && (
          <motion.div
            key="tab-socials"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <Tv className="w-5 h-5 text-indigo-500" />
                <span>Hệ Thống Kênh Sáng Tạo Của Lio</span>
              </h3>
              <span className="text-xs text-neutral-400">TikTok • YouTube • IG • FB</span>
            </div>
            <SocialLinks links={profile.links} />
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            key="tab-stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                <span>Chỉ Số Tương Tác & Bộ Kỹ Năng</span>
              </h3>
              <span className="text-xs text-emerald-500 font-bold">60K+ Views thực</span>
            </div>
            <AchievementsStats stats={profile.stats} />
            <SkillsSection skills={profile.skills} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
