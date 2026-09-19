import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  Sparkles,
  Flame,
  Heart,
  Trophy,
  Rocket,
  Star,
  Code,
  Award,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Eye,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  FacebookIcon,
  TikTokIcon,
  InstagramIcon,
  YouTubeIcon,
} from './SocialIcons';

const iconMap = {
  Users,
  Sparkles,
  Flame,
  Heart,
  Trophy,
  Rocket,
  Star,
  Code,
  Award,
  Zap,
  Eye,
};

/**
 * Animated Counter Component adhering to Motion Design Skill:
 * - Primary Layer: Smooth cubic-bezier roll-up counter driven by requestAnimationFrame
 * - Formats numbers nicely with '+' or '%' suffixes
 */
function AnimatedCounter({ targetValue, rawNumber, suffix = '+' }) {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const target =
      typeof rawNumber === 'number'
        ? rawNumber
        : parseInt(String(targetValue).replace(/\D/g, ''), 10) || 100;

    let startTime = null;
    const duration = 1200; // ms (Motion Design table for theatrical build)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic deceleration: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, rawNumber, targetValue]);

  // If the target has 'K', format e.g. 4.5K or 50K
  const isK = String(targetValue).includes('K');
  const isPercent = String(targetValue).includes('%');

  let formatted = displayCount.toLocaleString('vi-VN');
  if (isK) {
    formatted = (displayCount / 1000).toFixed(displayCount >= 10000 ? 0 : 1) + 'K';
  }

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? formatted : '0'}
      {isPercent ? '%' : suffix}
    </span>
  );
}

// Live Channel Data from Audience Perspective (Góc nhìn người xem thực tế)
const CHANNEL_INSIGHTS = [
  {
    id: 'fb',
    name: 'Facebook Cá Nhân',
    handle: 'Đăng Lio (nguyenhoanghaidang82)',
    url: 'https://www.facebook.com/share/19JS9Xy3rN/?mibextid=wwXIfr',
    icon: FacebookIcon,
    themeColor: 'blue',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25',
    glowColor: 'group-hover:border-blue-500/50 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]',
    mainMetric: '416',
    metricLabel: 'Người theo dõi (Followers)',
    subMetric: '39 Đang theo dõi • Cộng đồng & Bạn bè',
    tag: 'Kết nối',
    highlight: 'Kênh Facebook hoạt động kết nối bạn bè, đối tác và chia sẻ cập nhật cuộc sống',
  },
  {
    id: 'tiktok-personal',
    name: 'TikTok Cá Nhân',
    handle: '@nguyndang0802',
    url: 'https://www.tiktok.com/@nguyndang0802',
    icon: TikTokIcon,
    themeColor: 'cyan',
    badgeColor: 'bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
    glowColor: 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    mainMetric: '45K+',
    metricLabel: 'Lượt xem (Views) • 4.2K Tim',
    subMetric: '215 Followers • 4,214 Lượt thích',
    tag: 'Creative Lifestyle',
    highlight: 'Video bắt trend sáng tạo, khoảnh khắc hàng ngày & tương tác tích cực đa nền tảng',
  },
  {
    id: 'instagram',
    name: 'Instagram Cá Nhân',
    handle: '@nguyenhoanghaidanglio',
    url: 'https://www.instagram.com/nguyenhoanghaidanglio?stkn=OTQ2b2Nmb3F2Zm95&utm_source=qr',
    icon: InstagramIcon,
    themeColor: 'pink',
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/25',
    glowColor: 'group-hover:border-pink-500/50 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',
    mainMetric: '1K+',
    metricLabel: 'Lượt xem (Views) Reels • 131 Follow',
    subMetric: '131 Followers • 89 Đang theo dõi • 44 Bài viết',
    tag: 'Photography & Art',
    highlight: 'Reels bắt trọn khoảnh khắc, ảnh nghệ thuật máy cơ Canon & visual phong cách sống',
  },
  {
    id: 'tiktok-story',
    name: 'TikTok Kể Chuyện',
    handle: '@liotapkechuyen',
    url: 'https://www.tiktok.com/@liotapkechuyen',
    icon: TikTokIcon,
    themeColor: 'purple',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
    glowColor: 'group-hover:border-purple-500/50 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    mainMetric: '5K+',
    metricLabel: 'Lượt xem (Views) • 323 Tim',
    subMetric: '27 Followers • 323 Lượt thích',
    tag: 'Podcast & Storytelling',
    highlight: 'Series giải quyết các khúc mắc cuộc sống, bài học ý nghĩa & mẹo vặt thực tế',
  },
  {
    id: 'youtube',
    name: 'Kênh YouTube LIO',
    handle: '@lio_tsv',
    url: 'https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ',
    icon: YouTubeIcon,
    themeColor: 'red',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
    glowColor: 'group-hover:border-red-500/50 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]',
    mainMetric: '738',
    metricLabel: 'Lượt xem (Views) • 15 Video 4K',
    subMetric: '738 Lượt xem tích lũy • 4 Người đăng ký',
    tag: 'Cinematic & Analysis',
    highlight: 'Phân tích tư duy kinh tế, đời sống xã hội Gen Z, công nghệ AI và góc nhìn mới',
  },
];

export default function AchievementsStats({ stats = [] }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = async (url, id) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  if (!stats || stats.length === 0) return null;

  // Stagger container variant adhering to 1/3 rule (< 400ms total)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* 1. PRIMARY METRICS BENTO (4 KPI CARDS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Chỉ Số Tăng Trưởng & Sáng Tạo
            </h2>
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Góc nhìn khán giả trực quan</span>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Sparkles;

            return (
              <motion.div
                key={stat.id || index}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 450, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative glass-card p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm glow-card flex flex-col justify-between overflow-hidden cursor-default"
              >
                {/* AMBIENT LAYER: Soft corner glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-indigo-500/15 via-cyan-500/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                {/* SECONDARY LAYER: Holographic sheen sweeping across card on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-3">
                  {/* Secondary Layer: Icon with spring pop */}
                  <motion.span
                    whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.3 }}
                    className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-200/60 dark:border-neutral-700/60"
                  >
                    <IconComponent className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </motion.span>

                  {stat.trend && (
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {stat.trend}
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  {/* Primary Layer: Animated Roll-up Counter */}
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                    <AnimatedCounter
                      targetValue={stat.value}
                      rawNumber={stat.rawNumber}
                      suffix={stat.value.endsWith('%') ? '%' : '+'}
                    />
                  </div>
                  <div className="text-xs text-neutral-800 dark:text-neutral-200 font-semibold line-clamp-1 mt-1">
                    {stat.label}
                  </div>
                  {stat.desc && (
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                      {stat.desc}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 2. MỤC CHÚ Ý: BẢNG TỔNG HỢP CÁC KÊNH CÁ NHÂN (GÓC NHÌN NGƯỜI XEM THỰC TẾ) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
              <Eye className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span>MỤC CHÚ Ý // TỔNG HỢP GÓC NHÌN KHÁN GIẢ</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 dark:text-white mt-0.5">
              Chi Tiết Số Liệu Các Kênh Cá Nhân Của Lio
            </h3>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Số liệu thực tế truy cập từ góc độ người xem trực tuyến
          </span>
        </div>

        {/* Channels Grid with 3-Layer Motion Design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
        >
          {CHANNEL_INSIGHTS.map((ch) => {
            const Icon = ch.icon;

            return (
              <motion.div
                key={ch.id}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  scale: 1.015,
                  transition: { type: 'spring', stiffness: 400, damping: 22 },
                }}
                className={`group relative glass-card p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm glow-card flex flex-col justify-between transition-all overflow-hidden ${ch.glowColor}`}
              >
                {/* Ambient Layer */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div>
                  {/* Channel Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm ${ch.badgeColor}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                          {ch.name}
                        </h4>
                        <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                          {ch.handle}
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 shrink-0">
                      {ch.tag}
                    </span>
                  </div>

                  {/* Highlight Metric Box */}
                  <div className="p-3 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/80 space-y-1 mb-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                      <span>{ch.metricLabel}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                      {ch.mainMetric}
                    </div>
                    <div className="text-[11px] text-neutral-600 dark:text-neutral-300 font-medium line-clamp-1">
                      {ch.subMetric}
                    </div>
                  </div>

                  {/* Description note */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {ch.highlight}
                  </p>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/60">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/btn"
                  >
                    <span>Xem kênh</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleCopyLink(ch.url, ch.id)}
                    className="p-2 rounded-xl glass-card border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Sao chép link kênh"
                  >
                    {copiedId === ch.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
