import React from 'react';
import { motion } from 'framer-motion';
import ProfilePhotoFrame from '../ProfilePhotoFrame';
import CertificatesSection from '../CertificatesSection';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import {
  Sparkles,
  Send,
  Share2,
  Code2,
  Layers,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  ShieldCheck,
  GraduationCap,
  MapPin,
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
      <section id="home" className="relative pt-2 sm:pt-6 scroll-mt-24">
        <div className="relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 bg-white/75 dark:bg-neutral-900/70 backdrop-blur-2xl border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] overflow-hidden">
          {/* Subtle Monochromatic Ambient Backlight (Titanium / Slate tone) */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-neutral-300/40 dark:bg-neutral-800/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Elevated Portrait Squircle & Identity Card */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <ProfilePhotoFrame
                personal={profile.personal}
                className="mx-auto lg:mx-0"
              />

              {/* Informational Identity Pill Card */}
              <div className="w-full max-w-xs sm:max-w-sm space-y-2 px-4 py-3 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>XÁC THỰC DANH TÍNH CHÍNH THỨC</span>
                </div>
                <div className="text-[12px] text-neutral-600 dark:text-neutral-400 space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>ĐH Công Thương TP.HCM (HUIT) • Khóa 2026</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>TP. Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Typography, Bio Narrative, Bento Metrics & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border border-neutral-300/80 dark:border-white/15 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>OFFICIAL PORTFOLIO // 2026</span>
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span className="font-serif tracking-widest font-black text-neutral-900 dark:text-white">ĐĂNG LIO</span>
              </div>

              {/* Main Headline & Identity */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
                  {profile.personal?.fullName || 'Nguyễn Hoàng Hải Đăng'}
                </h1>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-neutral-600 dark:text-neutral-400 flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-200">Creative Technologist</span>
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span>Digital Storyteller</span>
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/80 dark:bg-white/10 font-mono text-neutral-700 dark:text-neutral-300">Gen Z • 2008</span>
                </div>
              </div>

              {/* Refined Bio & Philosophy */}
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                Chào bạn, mình là <strong className="text-neutral-900 dark:text-white font-semibold">Hải Đăng (Lio)</strong> — sinh viên <strong className="text-neutral-900 dark:text-white font-semibold">Đại học Công Thương TP.HCM (HUIT)</strong>. Mình đam mê kết hợp tư duy công nghệ phần mềm tương tác với nghệ thuật kể chuyện số (Storytelling) để kiến tạo những sản phẩm chạm đến cảm xúc và các giải pháp AI mang giá trị thực tiễn.
              </p>

              {/* Micro-Bento Credibility Counters in Hero */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-1">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-white/10 text-center lg:text-left transition-all hover:border-neutral-400 dark:hover:border-white/25">
                  <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-mono">
                    150K+
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Lượt xem đa nền tảng
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-white/10 text-center lg:text-left transition-all hover:border-neutral-400 dark:hover:border-white/25">
                  <div className="text-xl sm:text-2xl font-black text-amber-500 font-mono">
                    02
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Chứng chỉ FPT & MCI
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-white/10 text-center lg:text-left transition-all hover:border-neutral-400 dark:hover:border-white/25">
                  <div className="text-xl sm:text-2xl font-black text-emerald-500 font-mono">
                    100%
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Thực chiến độc lập
                  </div>
                </div>
              </div>

              {/* Action Buttons: 1 Main CTA + Scroll CTAs + Live App Pill */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
                {/* Primary Contact CTA */}
                {onOpenContact && (
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenContact}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-lg shadow-neutral-950/20 dark:shadow-white/10 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi lời mời hợp tác</span>
                  </motion.button>
                )}

                {/* Secondary: Scroll to Projects */}
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="#projects"
                  className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white/80 dark:bg-neutral-800/70 border border-neutral-300/80 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 transition-all cursor-pointer backdrop-blur-md shadow-sm"
                >
                  <Code2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  <span>Dự án phần mềm</span>
                </motion.a>

                {/* Secondary: Scroll to Certificates */}
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="#certificates"
                  className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 transition-all cursor-pointer backdrop-blur-md shadow-sm"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Chứng chỉ FPT & MCI</span>
                </motion.a>

                {/* Live App Quick Pill */}
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://danglio.github.io/homnayuonggilio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 transition-all cursor-pointer backdrop-blur-md shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Chơi thử: Hôm Nay Uống Gì</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
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
              <Sparkles className="w-3.5 h-3.5" />
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
