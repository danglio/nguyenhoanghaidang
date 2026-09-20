import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Gamepad2,
  Mail,
  Check,
  ArrowUpRight,
  Calendar,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import {
  TikTokIcon,
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  GmailIcon,
  ZaloIcon,
} from './SocialIcons';
import LanyardBadge from './LanyardBadge';
import { DEFAULT_PROFILE } from '../data/defaultProfile';

/**
 * HeroLanyard Component
 * Central Hero Section of the 3D Lanyard Portfolio
 *
 * Features:
 * - Responsive 2-column layout on Desktop (Text info left, 3D Lanyard Card right)
 * - Centered stacked layout on Mobile (3D Lanyard Card swinging on top, text below)
 * - Glowing kicker badge: "✨ WELCOME TO MY CREATIVE SPACE"
 * - Neon gradient headline: "Hi, I'm Nguyễn Hoàng Hải Đăng (Lio)"
 * - Rotating dynamic role tags
 * - Notion/Glass aesthetic inspiring bio snippet
 * - Matching Davin-style Pill Buttons for all 6 official channels of Lio:
 *   1. TikTok Tập Kể Chuyện (Primary Gradient Pill)
 *   2. Kênh YouTube @lio_tsv (Glass Pill)
 *   3. Dự Án Hôm Nay Uống Gì Lio (Glass Game Pill)
 *   4. TikTok Cá Nhân @nguyndang0802 (Glass Pill)
 *   5. Instagram @nguyenhoanghaidanglio (Glass Pill)
 *   6. Facebook Cá Nhân (Glass Pill)
 *   7. Liên Hệ / Copy Email (Interactive Pill)
 *   8. Chỉnh Sửa Hồ Sơ (Interactive Pill)
 */
export default function HeroLanyard({
  personal,
  links,
  profile,
  showToast,
}) {
  // Graceful data resolution from props or default profile
  const personalData = personal || profile?.personal || DEFAULT_PROFILE.personal;
  const linksData =
    (links && links.length > 0) ? links : (profile?.links || DEFAULT_PROFILE.links);

  // Dynamic roles cycle
  const roleList =
    personalData?.roles && personalData.roles.length > 0
      ? personalData.roles
      : [personalData?.title || 'Content Creator & Digital Storyteller'];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (roleList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roleList.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roleList]);

  // Extract URLs for all 6 official channels with guaranteed fallbacks
  const tiktokStoryLink =
    linksData.find((l) => l.url?.includes('liotapkechuyen'))?.url ||
    'https://www.tiktok.com/@liotapkechuyen';

  const tiktokPersonalLink =
    linksData.find((l) => l.url?.includes('nguyndang0802'))?.url ||
    'https://www.tiktok.com/@nguyndang0802';

  const youtubeLink =
    linksData.find((l) => l.platform === 'youtube' || l.url?.includes('youtube.com'))?.url ||
    'https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ';

  const drinkProjectLink =
    linksData.find((l) => l.url?.includes('homnayuonggilio') || l.platform === 'website')?.url ||
    'https://danglio.github.io/homnayuonggilio/';

  const instagramLink =
    linksData.find((l) => l.platform === 'instagram' || l.url?.includes('instagram.com'))?.url ||
    'https://www.instagram.com/nguyenhoanghaidanglio?stkn=OTQ2b2Nmb3F2Zm95&utm_source=qr';

  const facebookLink =
    linksData.find((l) => l.platform === 'facebook' || l.url?.includes('facebook.com'))?.url ||
    'https://www.facebook.com/share/19JS9Xy3rN/?mibextid=wwXIfr';

  // Handle Contact / Copy Email
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopySpecificEmail = async (email, key) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
      if (showToast) {
        showToast({
          message: `Đã sao chép email ${email} vào bộ nhớ tạm!`,
          type: 'success',
        });
      }
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="relative w-full py-4 sm:py-8 lg:py-12 overflow-visible">
      {/* Ambient background glow behind hero section */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[450px] bg-indigo-600/10 dark:bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* LEFT COLUMN (Desktop) / BOTTOM (Mobile): Intro, Headline, Bio, Pill Buttons */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Kicker Pill: WELCOME TO MY CREATIVE SPACE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
            <span>WELCOME TO MY CREATIVE SPACE</span>
          </motion.div>

          {/* Headline: Hi, I'm Nguyễn Hoàng Hải Đăng (Lio) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.15]"
          >
            <span>Hi, I'm </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
              {personalData.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)'}
            </span>
          </motion.h1>

          {/* Sub-headline & Dynamic Rotating Roles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center gap-2.5 text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-300"
          >
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">
              {personalData.title || 'Content Creator & Digital Storyteller'}
            </span>
            <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">&bull;</span>
            <div className="h-7 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="text-xs sm:text-sm font-bold font-mono px-3 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5 shadow-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  <span>{roleList[currentRoleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Info Badges: Birthday, Location, University */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.13 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono"
          >
            {/* 1. Sinh nhật 08/02/2008 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 shadow-sm backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-pink-500 shrink-0" />
              <span className="font-semibold">08/02/2008</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold font-sans">
                18 tuổi
              </span>
            </div>

            {/* 2. Nơi học tập & làm việc: TP. Hồ Chí Minh */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 shadow-sm backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>TP. Hồ Chí Minh</span>
            </div>

            {/* 3. Trường Đại học Công Thương TP.HCM (HUIT) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-medium shadow-sm backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span>ĐH Công Thương TP.HCM (HUIT)</span>
            </div>
          </motion.div>

          {/* Inspiring Bio Quote Box */}
          {personalData.bio && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative p-4 sm:p-5 rounded-2xl bg-white/75 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-sm max-w-xl text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal text-left"
            >
              <div className="absolute top-0 left-6 w-14 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 rounded-full" />
              <p>{personalData.bio}</p>
            </motion.div>
          )}

          {/* Hàng nút Pill Buttons (Matching Video Davin) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2"
          >
            {/* 1. TikTok Kể Chuyện (Primary Gradient Pill) */}
            <motion.a
              href={tiktokStoryLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_25px_rgba(236,72,153,0.5)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <TikTokIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white shrink-0" />
              <span>TikTok Kể Chuyện</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* 2. Kênh YouTube (Glass Pill) */}
            <motion.a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/80 dark:bg-white/5 hover:bg-red-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-red-500/30 text-neutral-800 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" />
              <span>Kênh YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform" />
            </motion.a>

            {/* 3. Dự Án Hôm Nay Uống Gì Lio (Glass Pill với Game badge) */}
            <motion.a
              href={drinkProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/80 dark:bg-white/5 hover:bg-amber-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-amber-500/30 text-neutral-800 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span>Hôm Nay Uống Gì Lio</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 uppercase">
                Game
              </span>
            </motion.a>

            {/* 4. TikTok Cá Nhân @nguyndang0802 (Compact Glass Pill) */}
            <motion.a
              href={tiktokPersonalLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-cyan-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-cyan-500/30 text-neutral-800 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm"
            >
              <TikTokIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span>TikTok @nguyndang0802</span>
            </motion.a>

            {/* 5. Instagram (Compact Glass Pill) */}
            <motion.a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-pink-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-pink-500/30 text-neutral-800 dark:text-neutral-200 hover:text-pink-600 dark:hover:text-pink-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500 shrink-0" />
              <span>Instagram</span>
            </motion.a>

            {/* 6. Facebook (Compact Glass Pill) */}
            <motion.a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-blue-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-blue-500/30 text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm"
            >
              <FacebookIcon className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Facebook</span>
            </motion.a>

            {/* 7. Nút Gmail Cá Nhân */}
            <motion.button
              type="button"
              onClick={() => handleCopySpecificEmail('nguyenhoanghaidang.lio@gmail.com', 'gmail')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-rose-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-rose-500/30 text-neutral-800 dark:text-neutral-200 hover:text-rose-600 dark:hover:text-rose-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm"
              title="Sao chép Gmail nguyenhoanghaidang.lio@gmail.com"
            >
              {copiedKey === 'gmail' ? (
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
              ) : (
                <GmailIcon className="w-4 h-4 shrink-0" />
              )}
              <span>{copiedKey === 'gmail' ? 'Đã sao chép Gmail!' : 'nguyenhoanghaidang.lio@gmail.com'}</span>
            </motion.button>

            {/* 8. Nút Hòm Thư Công Việc / Booking */}
            <motion.button
              type="button"
              onClick={() => handleCopySpecificEmail('contact@danglio.com', 'work')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-emerald-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-emerald-500/30 text-neutral-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm"
              title="Sao chép email booking contact@danglio.com"
            >
              {copiedKey === 'work' ? (
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
              ) : (
                <Mail className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
              )}
              <span>{copiedKey === 'work' ? 'Đã sao chép email!' : 'contact@danglio.com'}</span>
            </motion.button>

            {/* 9. Nút Zalo Trực Tiếp */}
            <motion.a
              href="https://zalo.me/0862231322"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-blue-500/10 border border-neutral-200/90 dark:border-white/10 hover:border-blue-500/30 text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all shadow-sm hover:shadow-[0_0_20px_rgba(0,136,255,0.2)]"
              title="Nhắn tin Zalo trực tiếp cùng Lio"
            >
              <ZaloIcon className="w-4 h-4 shrink-0" />
              <span>Nhắn tin Zalo</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Desktop) / TOP (Mobile): 3D Lanyard ID Badge */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-start w-full relative z-20 overflow-visible">
          <LanyardBadge personal={personalData} />
        </div>
      </div>
    </section>
  );
}
