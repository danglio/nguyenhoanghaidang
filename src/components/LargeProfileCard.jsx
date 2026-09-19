import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Share2,
  Clock,
  Music,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateAge, formatBirthDate } from '../hooks/useProfileData';

export default function LargeProfileCard({
  personal,
  vibeMusic,
  onShare,
  showToast,
}) {
  const {
    avatarUrl,
    fullName,
    title,
    birthDate,
    showAge,
    location,
    status,
    email,
  } = personal;

  const age = showAge ? calculateAge(birthDate) : null;
  const formattedBirth = formatBirthDate(birthDate);

  // Live real-time clock
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeStr);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Music widget play/pause toggle simulation
  const [isPlayingMusic, setIsPlayingMusic] = useState(vibeMusic?.isPlaying ?? true);

  // 3D tilt effect on mouse move
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotate({ x: -(y / 25), y: x / 25 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Copy email with feedback
  const handleCopyEmail = async () => {
    if (!email) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      }
      showToast?.({
        message: `Đã sao chép email: ${email}`,
        type: 'success',
      });
    } catch {
      showToast?.({
        message: `Email của tôi: ${email}`,
        type: 'info',
      });
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center"
    >
      {/* Outer Card with 3D Tilt and Ambient Luminous Glow */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative group perspective-1000"
      >
        {/* Dynamic Multi-layer Ambient Halo behind the photo */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/35 via-indigo-500/25 to-pink-500/30 dark:from-purple-500/40 dark:via-cyan-500/25 dark:to-indigo-500/40 rounded-[34px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <motion.div
          animate={{
            rotateX: rotate.x,
            rotateY: rotate.y,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          className="relative glass-card rounded-[30px] p-4 sm:p-5 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xl overflow-hidden glow-hover"
        >
          {/* Big Photo Container */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-inner group-hover:shadow-2xl transition-all duration-700">
            <img
              src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'}
              alt={fullName}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800';
              }}
            />

            {/* Gradient Overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-85 group-hover:opacity-70 transition-opacity" />

            {/* Live Status Badge on Top Right */}
            {status && (
              <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 dark:bg-black/75 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{status.replace(/^[🟢⚪🔵🟡]\s*/, '')}</span>
              </div>
            )}

            {/* Live Real-Time Clock Badge on Top Left */}
            <div className="absolute top-3.5 left-3.5 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 dark:bg-black/75 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-mono font-medium text-neutral-200">
              <Clock className="w-3 h-3 text-indigo-400 animate-spin-slow" />
              <span>{currentTime || '00:00:00'}</span>
            </div>

            {/* Bottom Caption inside Photo */}
            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
                  {fullName || 'Tên Của Bạn'}
                </span>
                <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/20 drop-shadow-sm" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-200 drop-shadow line-clamp-1 mt-0.5">
                {title || 'Nghề nghiệp / Lĩnh vực sáng tạo'}
              </p>
            </div>
          </div>

          {/* Quick Meta Details: Birthday & Location */}
          <div className="mt-4 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              {formattedBirth && (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/70 dark:border-neutral-700/70">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>
                    {formattedBirth}
                    {age !== null && ` • ${age} tuổi`}
                  </span>
                </div>
              )}

              {location && (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/70 dark:border-neutral-700/70">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Interactive Music Vibe Widget */}
            {vibeMusic && (
              <div
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                title="Bấm để bật/dừng hiệu ứng nhạc"
                className="group/music flex items-center justify-between p-3 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-700/70 cursor-pointer hover:border-emerald-500/50 transition-all glow-hover"
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <Music className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 truncate">
                      {vibeMusic.title}
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      {vibeMusic.artist}
                    </div>
                  </div>
                </div>

                {/* Animated Equalizer Soundwave bars */}
                <div className="flex items-end space-x-1 h-4 shrink-0 pl-2">
                  <span
                    className={`w-1 rounded-full bg-emerald-500 ${
                      isPlayingMusic ? 'animate-wave-1' : 'h-1'
                    }`}
                  />
                  <span
                    className={`w-1 rounded-full bg-emerald-400 ${
                      isPlayingMusic ? 'animate-wave-2' : 'h-2'
                    }`}
                  />
                  <span
                    className={`w-1 rounded-full bg-emerald-500 ${
                      isPlayingMusic ? 'animate-wave-3' : 'h-1.5'
                    }`}
                  />
                  <span
                    className={`w-1 rounded-full bg-emerald-400 ${
                      isPlayingMusic ? 'animate-wave-4' : 'h-2.5'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Quick Email Copy Row */}
            {email && (
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Bấm để sao chép địa chỉ email"
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-all group/email"
              >
                <div className="flex items-center space-x-2 truncate pr-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                <Copy className="w-3 h-3 text-neutral-400 group-hover/email:text-neutral-900 dark:group-hover/email:text-white shrink-0 transition-colors" />
              </button>
            )}

            {/* Action Button with Luminous Glow */}
            <div className="pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShare}
                className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md glow-btn transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600" />
                <span>Chia sẻ trang cá nhân</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
