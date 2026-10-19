import React from 'react';
import { motion } from 'framer-motion';
import ProfilePhotoFrame from '../ProfilePhotoFrame';
import FeaturedVideoSpotlight from '../FeaturedVideoSpotlight';
import ProjectsShowcase from '../ProjectsShowcase';
import VinylSoundLounge from '../VinylSoundLounge';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import {
  Command,
  Send,
  Share2,
  Film,
  Box,
  Radio,
  Flame,
  ArrowUpRight,
  ExternalLink,
  Layers,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { YouTubeIcon, TikTokIcon, FacebookIcon, InstagramIcon, ZaloIcon } from '../SocialIcons';

export default function SpatialCinemaLayout({
  profile,
  onOpenContact,
  showToast,
  onShare,
  onOpenCommandPalette,
  soundFX,
}) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================
          HERO SECTION: SPATIAL CINEMATIC LENS & KINETIC HEADLINE
      ======================================================== */}
      <section className="relative pt-6 sm:pt-10">
        <div className="glass-card rounded-[36px] p-6 sm:p-10 lg:p-12 border border-neutral-200/80 dark:border-white/10 shadow-2xl relative overflow-hidden">
          {/* Ambient Cosmic Neon Mesh Background */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Spatial Portrait Frame with Ambient Light */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <ProfilePhotoFrame
                personal={profile.personal}
                className="mb-4"
              />

              <div className="space-y-1 mt-2">
                <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE // HUIT TP.HCM</span>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  Sinh năm 2008 • ĐH Công Thương TP.HCM
                </div>
              </div>
            </div>

            {/* Right: Big Cinematic Headline & Core Declaration */}
            <div className="lg:col-span-8 space-y-6 text-center sm:text-left">
              {/* VisionOS Kicker Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-neutral-900/5 dark:bg-white/10 text-neutral-800 dark:text-white border border-neutral-300/80 dark:border-white/15 backdrop-blur-md shadow-sm">
                <Film className="w-3.5 h-3.5 text-cyan-500" />
                <span>SPATIAL CINEMA // DIGITAL EXHIBITION DECK</span>
              </div>

              {/* Massive Kinetic Typography */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                {profile.personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)'}
              </h1>

              <div className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500">
                {profile.personal?.title || 'Creative Technologist & Digital Storyteller'}
              </div>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                {profile.personal?.bio}
              </p>

              {/* Action Bar with Command Palette trigger & Contact */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                {/* Raycast Cmd+K Quick Button */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => soundFX?.playHover()}
                  onClick={() => {
                    soundFX?.playClick();
                    onOpenCommandPalette?.();
                  }}
                  className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-lg cursor-pointer transition-all group"
                  title="Mở thanh tìm kiếm Raycast (Cmd + K)"
                >
                  <Command className="w-4 h-4 text-cyan-400 dark:text-indigo-600 group-hover:rotate-12 transition-transform" />
                  <span>Tìm kiếm nhanh</span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-white/20 dark:bg-black/10 text-[10px] font-mono">
                    ⌘K
                  </span>
                </motion.button>

                {/* Collaboration Button */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => soundFX?.playHover()}
                  onClick={() => {
                    soundFX?.playClick();
                    onOpenContact?.();
                  }}
                  className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-indigo-500/20 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi lời mời hợp tác</span>
                </motion.button>

                {/* Live App Link */}
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => soundFX?.playHover()}
                  href="https://danglio.github.io/homnayuonggilio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold glass-card border border-neutral-300/80 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <span>🎮 Chơi Hôm Nay Uống Gì</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-500" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAVILION 01: CINEMA REEL SPOTLIGHT (VIDEO RẠP PHIM MINI)
      ======================================================== */}
      <section id="cinema" className="scroll-mt-24 space-y-4">
        <FeaturedVideoSpotlight showToast={showToast} soundFX={soundFX} />
      </section>

      {/* ========================================================
          PAVILION 02: INTERACTIVE WEB LAB (PROJECTS SHOWCASE)
      ======================================================== */}
      <section id="weblab" className="scroll-mt-24 space-y-4">
        <ProjectsShowcase showToast={showToast} soundFX={soundFX} />
      </section>

      {/* ========================================================
          PAVILION 03: 3D VINYL SOUND LOUNGE (MÁY ĐĨA THAN LO-FI)
      ======================================================== */}
      <section id="vinyl" className="scroll-mt-24 space-y-4">
        <VinylSoundLounge soundFX={soundFX} showToast={showToast} />
      </section>

      {/* ========================================================
          PAVILION 04: PROOF OF IMPACT & 3 PILLARS OF EXPERTISE
      ======================================================== */}
      <section id="expertise" className="scroll-mt-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-white/5 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-500 uppercase mb-1">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>PAVILION 04 // PROOF & EXPERTISE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Chỉ Số Phát Triển & 3 Trụ Cột Năng Lực
            </h2>
          </div>
          <span className="text-xs text-neutral-400">55K+ Views Thực • 3 Nhóm Kỹ Năng</span>
        </div>

        {/* Bento Stats Counters */}
        <AchievementsStats stats={profile.stats} />

        {/* 3 Pillars Categorized Skills */}
        <SkillsSection
          skills={profile.skills}
          skillCategories={profile.skillCategories}
        />
      </section>

      {/* ========================================================
          SOCIAL HUBS & OFFICIAL CHANNELS
      ======================================================== */}
      <section id="socials" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-white/5 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Kênh Mạng Xã Hội Chính Thức</span>
          </h2>
          <span className="text-xs text-neutral-400">TikTok • YouTube • IG • FB • Zalo</span>
        </div>
        <SocialLinks links={profile.links} />
      </section>

      {/* ========================================================
          FINAL COLLABORATION CALLOUT BANNER
      ======================================================== */}
      <div className="glass-card rounded-[32px] p-8 sm:p-12 border border-neutral-200/80 dark:border-white/15 shadow-xl text-center space-y-6 glow-hover relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-pink-500/5 pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-2 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            Sẵn Sàng Khởi Tạo Dự Án Mới Cùng Lio?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Dù là chiến dịch booking video triệu view, dự án sản xuất video 4K, hay cùng phát triển một sản phẩm web tương tác độc lạ — hãy để lại lời nhắn ngay hôm nay!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={() => soundFX?.playHover()}
            onClick={() => {
              soundFX?.playClick();
              onOpenContact?.();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Gửi lời mời hợp tác</span>
          </motion.button>

          {onShare && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => soundFX?.playHover()}
              onClick={() => {
                soundFX?.playClick();
                onShare();
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold glass-card border border-neutral-300/80 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-cyan-500" />
              <span>Chia sẻ trang web</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
