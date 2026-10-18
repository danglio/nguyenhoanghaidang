import React from 'react';
import { motion } from 'framer-motion';
import HeroLanyard from '../HeroLanyard';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import { Sparkles, Music, ExternalLink, Send, Share2 } from 'lucide-react';
import { YouTubeIcon } from '../SocialIcons';

export default function ClassicLayout({ profile, onOpenContact, showToast, onShare }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* SECTION 1: HOME (#home) - 3D Lanyard Hero & Davin Pill Links */}
      <section id="home" className="relative scroll-mt-20">
        <HeroLanyard
          personal={profile.personal}
          links={profile.links}
          profile={profile}
          onOpenContact={onOpenContact}
          showToast={showToast}
        />
      </section>

      {/* SECTION 2: FEATURED PROJECTS & APPS (#projects) */}
      <ProjectsShowcase showToast={showToast} />

      {/* SECTION 3: SOCIAL CHANNELS & CREATIVE HUBS (#socials) */}
      <section id="socials" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Connect & Follow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              Kênh Sáng Tạo & Mạng Xã Hội
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Khám phá các video storytelling, dự án web & kênh chia sẻ chính thức của Lio
          </p>
        </div>

        {/* Social Links Cards Grid */}
        <SocialLinks links={profile.links} />
      </section>

      {/* SECTION 4: SKILLS & MILESTONES (#skills) */}
      <section id="skills" className="space-y-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Expertise & Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              Thành Tích & Kỹ Năng Sáng Tạo
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Hành trình xây dựng nội dung số, các chỉ số phát triển và bộ công cụ thực chiến
          </p>
        </div>

        {/* Bento Stats / Achievements */}
        <AchievementsStats stats={profile.stats} />

        {/* Skills Tag Pills */}
        <SkillsSection skills={profile.skills} />

        {/* Vibe Music Player Widget */}
        {profile.vibeMusic && (
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm glow-hover">
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-sm">
                <Music className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Giai điệu sáng tạo cảm hứng // On Repeat</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate">
                  {profile.vibeMusic.title}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {profile.vibeMusic.artist}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              {/* Animated Equalizer Soundwave Bars */}
              <div className="flex items-end space-x-1 h-5 shrink-0 px-2" title="Giai điệu phát cảm hứng">
                <span className="w-1 rounded-full bg-emerald-500 animate-wave-1" />
                <span className="w-1 rounded-full bg-emerald-400 animate-wave-2" />
                <span className="w-1 rounded-full bg-emerald-500 animate-wave-3" />
                <span className="w-1 rounded-full bg-emerald-400 animate-wave-4" />
              </div>

              {/* Direct Listen Link Button */}
              <motion.a
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                href={profile.vibeMusic.youtubeUrl || "https://www.youtube.com/watch?v=heb1jkNWCyM"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-all shadow-sm group/yt"
              >
                <YouTubeIcon className="w-4 h-4 text-red-500" />
                <span>Nghe bài này</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/yt:opacity-100 transition-opacity" />
              </motion.a>
            </div>
          </div>
        )}

        {/* Callout Action Banner */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 glow-hover text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Muốn kết nối hoặc hợp tác cùng Lio?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Khởi tạo ý tưởng mới hoặc gửi lời mời hợp tác dự án, chiến dịch ngay hôm nay!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenContact}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-indigo-500/20 glow-btn transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Gửi lời mời hợp tác</span>
            </motion.button>

            {onShare && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onShare}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/10 shadow-sm transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-indigo-500" />
                <span>Chia sẻ trang</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
