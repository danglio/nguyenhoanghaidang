import React from 'react';
import { motion } from 'framer-motion';
import {
  YouTubeIcon,
  TikTokIcon,
  FacebookIcon,
  InstagramIcon,
  GitHubIcon,
  XTwitterIcon,
  LinkedInIcon,
  TelegramIcon,
  Globe,
  Mail,
  ArrowUpRight,
} from './SocialIcons';

// Platform icon & theme mapper
const getPlatformConfig = (platform) => {
  switch (platform?.toLowerCase()) {
    case 'youtube':
      return {
        icon: YouTubeIcon,
        badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
        glowColor: 'group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]',
        name: 'YouTube',
      };
    case 'tiktok':
      return {
        icon: TikTokIcon,
        badgeColor: 'bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
        glowColor: 'group-hover:border-neutral-400 dark:group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
        name: 'TikTok',
      };
    case 'facebook':
      return {
        icon: FacebookIcon,
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25',
        glowColor: 'group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
        name: 'Facebook',
      };
    case 'instagram':
      return {
        icon: InstagramIcon,
        badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/25',
        glowColor: 'group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.25)]',
        name: 'Instagram',
      };
    case 'github':
      return {
        icon: GitHubIcon,
        badgeColor: 'bg-neutral-800/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
        glowColor: 'group-hover:border-neutral-400 dark:group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(140,140,140,0.2)]',
        name: 'GitHub',
      };
    case 'x':
    case 'twitter':
      return {
        icon: XTwitterIcon,
        badgeColor: 'bg-neutral-800/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
        glowColor: 'group-hover:border-neutral-400 dark:group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(140,140,140,0.2)]',
        name: 'X (Twitter)',
      };
    case 'linkedin':
      return {
        icon: LinkedInIcon,
        badgeColor: 'bg-sky-600/10 text-sky-600 dark:text-sky-400 border-sky-600/25',
        glowColor: 'group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(2,132,199,0.25)]',
        name: 'LinkedIn',
      };
    case 'telegram':
      return {
        icon: TelegramIcon,
        badgeColor: 'bg-sky-400/10 text-sky-500 border-sky-400/25',
        glowColor: 'group-hover:border-sky-400/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]',
        name: 'Telegram',
      };
    case 'email':
    case 'mail':
      return {
        icon: Mail,
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
        glowColor: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]',
        name: 'Email',
      };
    case 'website':
    case 'blog':
    default:
      return {
        icon: Globe,
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
        glowColor: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
        name: 'Website',
      };
  }
};

export default function SocialLinks({ links = [] }) {
  if (!links || links.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 24 },
    },
  };

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center space-x-2">
          <span>Kênh Hoạt Động & Liên Kết</span>
          <span className="px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
            {links.length}
          </span>
        </h2>
      </div>

      {/* Responsive 2-column Grid on wider screen with luminous glow */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {links.map((link) => {
          const config = getPlatformConfig(link.platform);
          const Icon = config.icon;

          return (
            <motion.a
              key={link.id}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group glass-card p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm transition-all flex items-center justify-between glow-card ${config.glowColor}`}
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                {/* Platform Icon Box */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm ${config.badgeColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="min-w-0 pr-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white truncate">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                      {link.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="shrink-0 pl-2">
                <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 group-hover:text-white group-hover:bg-neutral-900 dark:group-hover:bg-white dark:group-hover:text-neutral-950 transition-all shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}
