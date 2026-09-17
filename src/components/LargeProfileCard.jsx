import React, { useState } from 'react';
import { Calendar, MapPin, Edit3, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateAge, formatBirthDate } from '../hooks/useProfileData';

export default function LargeProfileCard({
  personal,
  onOpenEdit,
  onShare,
}) {
  const {
    avatarUrl,
    fullName,
    title,
    birthDate,
    showAge,
    location,
    status,
  } = personal;

  const age = showAge ? calculateAge(birthDate) : null;
  const formattedBirth = formatBirthDate(birthDate);

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

  return (
    <motion.aside
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center"
    >
      {/* Outer Card with 3D Tilt and Luminous Glow */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative group perspective-1000"
      >
        {/* Ambient Glow behind the photo */}
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-pink-500/30 dark:from-purple-500/35 dark:via-blue-500/25 dark:to-indigo-500/35 rounded-[32px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <motion.div
          animate={{
            rotateX: rotate.x,
            rotateY: rotate.y,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          className="relative glass-card rounded-[28px] p-4 sm:p-5 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xl overflow-hidden glow-hover"
        >
          {/* Big Photo Container */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-inner group-hover:shadow-2xl transition-all duration-500">
            <img
              src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"}
              alt={fullName}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800";
              }}
            />

            {/* Gradient Overlay at bottom of the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Live Status Badge on Top Right */}
            {status && (
              <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 dark:bg-black/70 border border-white/20 shadow-lg backdrop-blur-md text-[11px] font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{status.replace(/^[🟢⚪🔵🟡]\s*/, '')}</span>
              </div>
            )}

            {/* Bottom Caption inside Photo */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white pointer-events-none">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
                  {fullName || "Tên Của Bạn"}
                </span>
                <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/20 drop-shadow-sm" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-200 drop-shadow line-clamp-1 mt-0.5">
                {title || "Nghề nghiệp / Lĩnh vực sáng tạo"}
              </p>
            </div>
          </div>

          {/* Quick Meta Details below Photo */}
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

            {/* Quick Action Buttons with Luminous Glow */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenEdit}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md glow-btn transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa hồ sơ</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShare}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border border-neutral-200/70 dark:border-neutral-700/70 hover:bg-neutral-200 dark:hover:bg-neutral-700 glow-btn transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Chia sẻ trang</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
