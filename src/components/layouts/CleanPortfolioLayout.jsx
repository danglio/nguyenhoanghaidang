import React from 'react';
import { motion } from 'framer-motion';
import ProfilePhotoFrame from '../ProfilePhotoFrame';
import CertificatesSection from '../CertificatesSection';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import {
  Send,
  Share2,
  Code2,
  Layers,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Radio,
} from 'lucide-react';

export default function CleanPortfolioLayout({
  profile,
  onOpenContact,
  showToast,
  onShare,
}) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================
          HERO SECTION: CON NGƯỜI LIO & TUYÊN NGÔN SÁNG TẠO
      ======================================================== */}
      <section id="home" className="relative pt-4 sm:pt-8 scroll-mt-24">
        <div className="glass-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-neutral-200/80 dark:border-white/10 shadow-xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Profile Portrait Photo */}
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
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Sinh năm 2008 • ĐH Công Thương TP.HCM
                </div>
              </div>
            </div>

            {/* Right: Headlines, Bio & Primary CTAs */}
            <div className="lg:col-span-8 space-y-5 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-neutral-900/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-neutral-300/80 dark:border-white/15 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OFFICIAL PORTFOLIO // 2026</span>
              </div>

              {/* Name with Dynamic Shifting Color Gradient */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-cyan-500 dark:from-cyan-400 dark:via-indigo-300 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-text drop-shadow-[0_0_25px_rgba(99,102,241,0.2)]">
                  {profile.personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)'}
                </span>
              </h1>

              {/* Title with Gradient Transition */}
              <div className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 animate-gradient-text">
                {profile.personal?.title || 'Creative Technologist & Digital Storyteller'}
              </div>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                {profile.personal?.bio}
              </p>

              {/* Action Buttons: 2 Core CTAs + 1 Verified Credentials Link */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
                {/* Primary Contact CTA */}
                {onOpenContact && (
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onOpenContact}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi lời mời hợp tác</span>
                  </motion.button>
                )}

                {/* Secondary: Scroll to Projects */}
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#projects"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold glass-card border border-neutral-300/80 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  <span>Khám phá các dự án</span>
                </motion.a>

                {/* Quick Verified Certificate Pill */}
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#certificates"
                  className="flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium glass-card border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Chứng chỉ FPT & MCI</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 01: DỰ ÁN PHẦN MỀM & ỨNG DỤNG WEB (#projects)
      ======================================================== */}
      <section id="projects" className="scroll-mt-24 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-white/5 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-500 uppercase mb-1">
              <Code2 className="w-3.5 h-3.5" />
              <span>CREATIVE CODE // APPLICATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Dự Án Phần Mềm & Ứng Dụng Web
            </h2>
          </div>
          <span className="text-xs text-neutral-400">Live Web App • Radar Realtime • AI Pipeline</span>
        </div>

        <ProjectsShowcase showToast={showToast} />
      </section>

      {/* ========================================================
          SECTION 02: CHỨNG CHỈ & CHỨNG NHẬN CHUYÊN MÔN (#certificates)
      ======================================================== */}
      <CertificatesSection showToast={showToast} />

      {/* ========================================================
          SECTION 03: CHỈ SỐ PHÁT TRIỂN & 3 TRỤ CỘT KỸ NĂNG (#skills)
      ======================================================== */}
      <section id="skills" className="scroll-mt-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-white/5 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-pink-500 uppercase mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>PROOF & EXPERTISE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Chỉ Số Thực Chiến & 3 Trụ Cột Năng Lực
            </h2>
          </div>
          <span className="text-xs text-neutral-400">150K+ Lượt xem • Kỹ năng thực chiến</span>
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
          SECTION 04: KÊNH MẠNG XÃ HỘI CHÍNH THỨC (#socials)
      ======================================================== */}
      <section id="socials" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-white/5 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-cyan-500 uppercase mb-1">
              <Radio className="w-3.5 h-3.5" />
              <span>OFFICIAL CHANNELS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Kênh Mạng Xã Hội Chính Thức
            </h2>
          </div>
          <span className="text-xs text-neutral-400">YouTube • TikTok • Facebook • Instagram • Zalo</span>
        </div>

        <SocialLinks links={profile.links} />
      </section>

      {/* ========================================================
          SECTION 05: COLLABORATION CALLOUT (#contact)
      ======================================================== */}
      <section id="contact" className="scroll-mt-24">
        <div className="glass-card rounded-[32px] p-8 sm:p-12 border border-neutral-200/80 dark:border-white/15 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-pink-500/5 pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-2 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Sẵn Sàng Khởi Tạo Dự Án Cùng Lio?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Dù là hợp tác booking video, sản xuất nội dung số, hay cùng phát triển ứng dụng web tương tác — hãy gửi lời nhắn cho Lio ngay hôm nay!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            {onOpenContact && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenContact}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi lời mời hợp tác</span>
              </motion.button>
            )}

            {onShare && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onShare}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold glass-card border border-neutral-300/80 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-cyan-500" />
                <span>Chia sẻ trang web</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
