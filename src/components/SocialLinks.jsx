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
        badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
        name: 'YouTube',
      };
    case 'tiktok':
      return {
        icon: TikTokIcon,
        badgeColor: 'bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
        name: 'TikTok',
      };
    case 'facebook':
      return {
        icon: FacebookIcon,
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        name: 'Facebook',
      };
    case 'instagram':
      return {
        icon: InstagramIcon,
        badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
        name: 'Instagram',
      };
    case 'github':
      return {
        icon: GitHubIcon,
        badgeColor: 'bg-neutral-800/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
        name: 'GitHub',
      };
    case 'x':
    case 'twitter':
      return {
        icon: XTwitterIcon,
        badgeColor: 'bg-neutral-800/10 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700',
        name: 'X (Twitter)',
      };
    case 'linkedin':
      return {
        icon: LinkedInIcon,
        badgeColor: 'bg-sky-600/10 text-sky-600 dark:text-sky-400 border-sky-600/20',
        name: 'LinkedIn',
      };
    case 'telegram':
      return {
        icon: TelegramIcon,
        badgeColor: 'bg-sky-400/10 text-sky-500 border-sky-400/20',
        name: 'Telegram',
      };
    case 'email':
    case 'mail':
      return {
        icon: Mail,
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        name: 'Email',
      };
    case 'website':
    case 'blog':
    default:
      return {
        icon: Globe,
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
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
        staggerChildren: 0.08,
        delayChildren: 0.2,
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
    <section className="px-4 py-6 max-w-2xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center space-x-1.5">
          <span>Kênh Hoạt Động & Liên Kết</span>
          <span className="px-1.5 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-[10px] font-semibold text-neutral-700 dark:text-neutral-300">
            {links.length}
          </span>
        </h2>
      </div>

      {/* Links List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-2.5"
      >
        {links.map((link) => {
          const config = getPlatformConfig(link.platform);
          const Icon = config.icon;

          return (
            <motion.a
              key={link.id}
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-3.5 sm:p-4 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/80 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                {/* Platform Icon Box */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105 ${config.badgeColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="min-w-0 pr-2">
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white truncate">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {link.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="shrink-0 pl-2">
                <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-all">
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
