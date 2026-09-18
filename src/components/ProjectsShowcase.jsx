import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight,
  Dices,
  Flame,
  Radio,
  Tv,
  Coffee,
  Box,
  Layers,
  Award,
  Play,
  Share2,
} from 'lucide-react';
import { YouTubeIcon, TikTokIcon } from './SocialIcons';

export default function ProjectsShowcase({ showToast }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopyLink = async (url, title, key) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);

      if (showToast) {
        showToast({
          message: `Đã sao chép liên kết "${title}" vào clipboard!`,
          type: 'success',
        });
      }
    } catch {
      if (showToast) {
        showToast({
          message: 'Không thể sao chép liên kết, vui lòng thử lại!',
          type: 'error',
        });
      }
    }
  };

  return (
    <section id="projects" className="space-y-8 scroll-mt-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>✨ FEATURED CREATIVE WORKS // DỰ ÁN & SẢN PHẨM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
            Dự Án Nổi Bật & Tác Phẩm Sáng Tạo
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
          Những sản phẩm web tương tác, series video kể chuyện và nội dung số được Lio dày công phát triển.
        </p>
      </div>

      {/* Cyber-Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* DỰ ÁN 1: HERO FEATURE CARD (FULL 12 COLS / 2 COLS PROMINENCE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-12 glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg glow-card relative overflow-hidden group"
        >
          {/* Ambient Cyber Neon Background Accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>ONLINE DEMO</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <Dices className="w-3 h-3" />
                  <span>CS2 & FIFA Interactive Gacha</span>
                </span>
              </div>

              {/* Title & Headline */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                  Hôm Nay Uống Gì Lio <span className="text-sm sm:text-base font-bold text-neutral-500 dark:text-neutral-400 tracking-normal">(Web App)</span>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Ứng dụng web độc đáo giải cứu cơn phân vân chọn đồ uống bằng vòng quay mở hòm CS2 & thẻ cầu thủ FIFA Online cực kỳ cuốn hút!
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-1">
                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">Chế độ 1</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Box className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mở Hòm CS2</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">Chế độ 2</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Thẻ FIFA Online</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80 col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">Trải nghiệm</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    <span>Âm thanh cực đã</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                  ⚡ Mini Web Game
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                  🎲 CS2 & FIFA Case Simulator
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                  🎨 React & Tailwind
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  🔥 Viral Project
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://danglio.github.io/homnayuonggilio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md glow-btn transition-all group/btn"
                >
                  <span>Trải nghiệm ngay</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-cyan-400 dark:text-indigo-600" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleCopyLink(
                      'https://danglio.github.io/homnayuonggilio/',
                      'Hôm Nay Uống Gì Lio',
                      'hero-app'
                    )
                  }
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                  title="Sao chép liên kết Hôm Nay Uống Gì Lio"
                >
                  {copiedKey === 'hero-app' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Đã chép link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span>Sao chép liên kết</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Right Mockup Showcase: CS2 Case + FIFA Ultimate Card Hybrid Visual */}
            <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-sm">
                {/* FIFA Ultimate Card Mockup (Angled Back Layer) */}
                <motion.div
                  whileHover={{ y: -6, rotate: 2, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute -top-4 -right-2 sm:-right-4 w-48 sm:w-52 h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-600 to-yellow-950 p-[2px] shadow-2xl z-10 select-none cursor-pointer transform -rotate-3"
                >
                  <div className="w-full h-full rounded-[14px] bg-neutral-950/90 backdrop-blur-md p-3 flex flex-col justify-between border border-amber-400/40 relative overflow-hidden text-amber-100">
                    {/* Holographic Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none" />

                    {/* Card Top: Rating & Position */}
                    <div className="flex items-start justify-between relative z-10">
                      <div>
                        <div className="text-2xl sm:text-3xl font-black tracking-tighter text-amber-300 leading-none">
                          99
                        </div>
                        <div className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
                          DRINK
                        </div>
                      </div>
                      <div className="p-1 rounded bg-amber-500/20 border border-amber-400/30">
                        <Award className="w-4 h-4 text-amber-300" />
                      </div>
                    </div>

                    {/* Card Center: Icon & Name */}
                    <div className="text-center my-1 relative z-10">
                      <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-300/30 flex items-center justify-center border border-amber-400/50 shadow-inner mb-1.5">
                        <Coffee className="w-7 h-7 text-amber-300 animate-bounce" />
                      </div>
                      <div className="text-xs font-black tracking-wide text-white uppercase truncate drop-shadow">
                        Trà Sữa Trân Châu
                      </div>
                      <div className="text-[9px] font-mono text-amber-300/90 uppercase tracking-wider">
                        ★ BẢN HOÀNG KIM ★
                      </div>
                    </div>

                    {/* Card Bottom: Stats */}
                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-amber-500/30 text-center relative z-10 text-[9px] font-mono">
                      <div>
                        <div className="font-bold text-amber-200">99</div>
                        <div className="text-[7px] text-neutral-400">VIBE</div>
                      </div>
                      <div>
                        <div className="font-bold text-amber-200">98</div>
                        <div className="text-[7px] text-neutral-400">SWEET</div>
                      </div>
                      <div>
                        <div className="font-bold text-amber-200">100</div>
                        <div className="text-[7px] text-neutral-400">ENERGY</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CS2 Crate Mockup (Front Layer) */}
                <motion.div
                  whileHover={{ y: -4, rotate: -1, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative z-20 w-52 sm:w-56 rounded-2xl bg-neutral-900/95 border-2 border-cyan-500/50 p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl space-y-3 cursor-pointer select-none"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        CS2 WEAPON CASE
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                      ★ SPECIAL
                    </span>
                  </div>

                  {/* Crate Visual Box */}
                  <div className="h-28 rounded-xl bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/60 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]" />
                    <Box className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                    <div className="mt-2 text-[11px] font-bold text-white tracking-wide flex items-center gap-1">
                      <span>Rương Đồ Uống Lio</span>
                    </div>
                  </div>

                  {/* Loot Roulette Ticker Preview */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
                      <span>VẬT PHẨM HIẾM:</span>
                      <span className="text-rose-400 font-bold">COVERT (ĐỎ)</span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-800 overflow-hidden flex">
                      <div className="w-1/4 bg-blue-500" />
                      <div className="w-1/4 bg-purple-500" />
                      <div className="w-1/4 bg-pink-500" />
                      <div className="w-1/4 bg-rose-500 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DỰ ÁN 2: BENTO CARD - SERIES PODCAST LIO TẬP KỂ CHUYỆN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md glow-card flex flex-col justify-between relative overflow-hidden group"
        >
          {/* TikTok Ambient Cyan / Magenta Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-cyan-500/15 via-pink-500/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="space-y-4 relative z-10">
            {/* Platform & Type Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok Short-Form Series</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                @liotapkechuyen
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Series Podcast: "Lio Tập Kể Chuyện"
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Nơi chia sẻ những mẩu chuyện đời thường, góc nhìn sâu lắng và thông điệp tích cực chạm đến trái tim người nghe.
              </p>
            </div>

            {/* Stylized Podcast Audio Visualizer Widget */}
            <div className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    Lio Tập Kể Chuyện
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Podcast & Audio Storytelling
                  </div>
                </div>
              </div>

              {/* Animated Soundwave Equalizer */}
              <div className="flex items-end space-x-1 h-5 pr-2">
                <span className="w-1 rounded-full bg-cyan-400 animate-wave-1" />
                <span className="w-1 rounded-full bg-pink-400 animate-wave-2" />
                <span className="w-1 rounded-full bg-cyan-400 animate-wave-3" />
                <span className="w-1 rounded-full bg-pink-500 animate-wave-4" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                🎙️ Storytelling
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                📱 TikTok Short Form
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                💙 Tích Cực
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-6 relative z-10">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.tiktok.com/@liotapkechuyen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/link"
            >
              <span>Xem trên TikTok</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleCopyLink(
                  'https://www.tiktok.com/@liotapkechuyen',
                  'Lio Tập Kể Chuyện',
                  'podcast-series'
                )
              }
              className="p-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              title="Sao chép link TikTok Series"
            >
              {copiedKey === 'podcast-series' ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* DỰ ÁN 3: BENTO CARD - KÊNH YOUTUBE @LIO_TSV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md glow-card flex flex-col justify-between relative overflow-hidden group"
        >
          {/* YouTube Ambient Red Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-red-500/15 via-rose-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="space-y-4 relative z-10">
            {/* Platform & Type Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <YouTubeIcon className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube Channel</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                @lio_tsv
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Kênh YouTube @lio_tsv
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Những thước phim dài tập, vlog khám phá và trải nghiệm thực tế cùng hành trình sáng tạo nội dung của Lio.
              </p>
            </div>

            {/* Stylized Video Player Preview Widget */}
            <div className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    Vlog & Cinematic Experience
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Video dài tập & Hậu trường sản xuất
                  </div>
                </div>
              </div>

              {/* 4K Badge */}
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                4K UHD
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                📺 YouTube Long-form
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                🎬 Vlog Đời Sống
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                ✨ Cinematic
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-6 relative z-10">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/link"
            >
              <span>Khám phá YouTube</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleCopyLink(
                  'https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ',
                  'Kênh YouTube @lio_tsv',
                  'youtube-channel'
                )
              }
              className="p-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              title="Sao chép link YouTube"
            >
              {copiedKey === 'youtube-channel' ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
