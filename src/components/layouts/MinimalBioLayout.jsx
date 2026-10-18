import React from 'react';
import { motion } from 'framer-motion';
import HeroLanyard from '../HeroLanyard';
import { Sparkles, Music, ExternalLink, Send, ArrowUpRight, Copy, Check, MapPin, GraduationCap } from 'lucide-react';
import { YouTubeIcon, TikTokIcon, FacebookIcon, InstagramIcon, ZaloIcon } from '../SocialIcons';

export default function MinimalBioLayout({ profile, onOpenContact, showToast, onShare }) {
  const links = profile.links || [];

  return (
    <div className="max-w-xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Bio Header Badge */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-neutral-900/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>MINIMALIST BIO // MOBILE-FIRST</span>
        </div>
      </div>

      {/* Compact 3D Lanyard Card */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md">
        <HeroLanyard
          personal={profile.personal}
          links={profile.links}
          profile={profile}
          onOpenContact={onOpenContact}
          showToast={showToast}
        />
      </div>

      {/* Quick Vibe Music Pill */}
      {profile.vibeMusic && (
        <div className="glass-card p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-3 shadow-sm glow-hover">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Music className="w-4 h-4 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase truncate">
                Đang phát cảm hứng
              </div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {profile.vibeMusic.title} • {profile.vibeMusic.artist}
              </div>
            </div>
          </div>
          <a
            href={profile.vibeMusic.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
            title="Nghe trên YouTube"
          >
            <YouTubeIcon className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Stacked Minimal Bio Links */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest px-1">
          Các Liên Kết Chính Thức
        </div>

        {links.map((link, idx) => (
          <motion.a
            key={link.id || idx}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-2xl glass-card border border-neutral-200/80 dark:border-neutral-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 shadow-sm transition-all"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-colors">
                {link.platform === 'tiktok' && <TikTokIcon className="w-5 h-5 text-neutral-900 dark:text-white" />}
                {link.platform === 'youtube' && <YouTubeIcon className="w-5 h-5 text-red-500" />}
                {link.platform === 'facebook' && <FacebookIcon className="w-5 h-5 text-blue-500" />}
                {link.platform === 'instagram' && <InstagramIcon className="w-5 h-5 text-pink-500" />}
                {link.platform === 'apple' && <span className="text-base"></span>}
                {!['tiktok', 'youtube', 'facebook', 'instagram', 'apple'].includes(link.platform) && (
                  <ExternalLink className="w-5 h-5 text-neutral-500" />
                )}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {link.title}
                </div>
                <div className="text-xs text-neutral-500 truncate">
                  {link.stats || link.description}
                </div>
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-cyan-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </motion.a>
        ))}
      </div>

      {/* Quick Action Button */}
      <div className="pt-2">
        <button
          onClick={onOpenContact}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 cursor-pointer hover:opacity-95 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Gửi Lời Mời Hợp Tác Với Lio</span>
        </button>
      </div>
    </div>
  );
}
