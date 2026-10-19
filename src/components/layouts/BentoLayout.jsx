import React from 'react';
import { motion } from 'framer-motion';
import HeroLanyard from '../HeroLanyard';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import { Music, ExternalLink, Send, Share2, Eye, Flame, Users, ArrowUpRight, Award, Radio, Layers } from 'lucide-react';
import { YouTubeIcon } from '../SocialIcons';

export default function BentoLayout({ profile, onOpenContact, showToast, onShare }) {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Bento Grid Header / Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
            Bento Dashboard 2.0
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold uppercase">
            Linear & Apple Style
          </span>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
          <span>{profile.personal?.status || '🟢 Đang học HUIT & làm việc tại TP.HCM'}</span>
        </div>
      </div>

      {/* Main Bento Grid: 4 Columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Cell 1: 3D Lanyard & Core Bio (Span 2 Cols, Span 2 Rows) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 glass-card rounded-3xl p-4 sm:p-6 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <HeroLanyard
            personal={profile.personal}
            links={profile.links}
            profile={profile}
            onOpenContact={onOpenContact}
            showToast={showToast}
          />
        </div>

        {/* Cell 2: Live Music Player Widget */}
        {profile.vibeMusic && (
          <div className="col-span-1 glass-card rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm flex flex-col justify-between glow-hover">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                <Music className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex items-end space-x-1 h-5 px-1">
                <span className="w-1 rounded-full bg-emerald-500 animate-wave-1" />
                <span className="w-1 rounded-full bg-emerald-400 animate-wave-2" />
                <span className="w-1 rounded-full bg-emerald-500 animate-wave-3" />
              </div>
            </div>

            <div className="my-3">
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Vibe On Repeat
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white truncate mt-0.5">
                {profile.vibeMusic.title}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {profile.vibeMusic.artist}
              </div>
            </div>

            <a
              href={profile.vibeMusic.youtubeUrl || "https://www.youtube.com/watch?v=heb1jkNWCyM"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-all"
            >
              <YouTubeIcon className="w-3.5 h-3.5" />
              <span>Nghe trên YouTube</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Cell 3: Views / Stats Highlight Card */}
        <div className="col-span-1 glass-card rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm flex flex-col justify-between glow-hover">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
              Đa nền tảng
            </span>
          </div>

          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              55K+
            </div>
            <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Tổng lượt xem nội dung
            </div>
            <div className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
              TikTok 48K+ • FB 2K+ • IG 1K+ • YT 738+
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-neutral-200/40 dark:border-white/5 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1 text-rose-500 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-rose-500/20" /> 4.5K+ Tim
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-500 font-semibold">
              <Users className="w-3.5 h-3.5" /> 800+ Follows
            </span>
          </div>
        </div>

        {/* Cell 4: Bento Skills Pills (Span 2) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 glass-card rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200">
              <Award className="w-3.5 h-3.5 text-cyan-500" />
              <span>Kỹ Năng & Lĩnh Vực Chuyên Môn</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">8 Công cụ</span>
          </div>
          <SkillsSection skills={profile.skills} />
        </div>
      </div>

      {/* Row 2: Social Channels Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-indigo-500" />
            <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
              Kênh Sáng Tạo & Mạng Xã Hội
            </h3>
          </div>
          <span className="text-xs text-neutral-500">6 Kênh chính thức</span>
        </div>
        <SocialLinks links={profile.links} />
      </section>

      {/* Row 3: Featured Projects Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-500" />
            <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
              Dự Án Tiêu Biểu & Ứng Dụng
            </h3>
          </div>
          <span className="text-xs text-neutral-500">Interactive Preview</span>
        </div>
        <ProjectsShowcase showToast={showToast} />
      </section>

      {/* Row 4: Bento Detailed Stats */}
      <section className="space-y-4">
        <AchievementsStats stats={profile.stats} />
      </section>

      {/* Bottom Collaboration Callout Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 glow-hover text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Kết nối & Hợp tác cùng Lio
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Gửi lời mời tham gia dự án, tài trợ chiến dịch hoặc trao đổi ý tưởng sáng tạo.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenContact}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Liên hệ ngay</span>
          </motion.button>
          {onShare && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onShare}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
