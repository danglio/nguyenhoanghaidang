import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateAge, formatBirthDate } from '../hooks/useProfileData';

export default function HeroProfile({ personal }) {
  const {
    avatarUrl,
    fullName,
    title,
    birthDate,
    showAge,
    location,
    status,
    bio,
  } = personal;

  const age = showAge ? calculateAge(birthDate) : null;
  const formattedBirth = formatBirthDate(birthDate);

  // Micro 3D tilt state for avatar
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotate({ x: -(y / 8), y: x / 8 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center pt-8 pb-6 px-4"
    >
      {/* Avatar Container with 3D tilt effect */}
      <div
        className="relative group mb-5 perspective-500 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={{
            rotateX: rotate.x,
            rotateY: rotate.y,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 shadow-xl"
        >
          <img
            src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"}
            alt={fullName}
            className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              // Fallback if image link fails
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
            }}
          />
        </motion.div>

        {/* Live Status Badge */}
        {status && (
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-700 shadow-sm backdrop-blur-md text-[11px] font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{status.replace(/^[🟢⚪🔵🟡]\s*/, '')}</span>
          </div>
        )}
      </div>

      {/* Full Name & Title */}
      <div className="space-y-1.5 mt-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center justify-center space-x-2">
          <span>{fullName || "Tên Của Bạn"}</span>
          <CheckCircle2 className="w-5 h-5 text-blue-500 inline-block fill-blue-500/10" title="Đã xác thực" />
        </h1>

        <p className="text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-400">
          {title || "Nghề nghiệp / Lĩnh vực sáng tạo"}
        </p>
      </div>

      {/* Quick Meta Details: Birthday & Location */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {formattedBirth && (
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60">
            <Calendar className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>
              {formattedBirth}
              {age !== null && ` • ${age} tuổi`}
            </span>
          </div>
        )}

        {location && (
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60">
            <MapPin className="w-3.5 h-3.5 text-rose-500/80" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* Bio Paragraph */}
      {bio && (
        <div className="mt-4 max-w-lg mx-auto">
          <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-normal">
            {bio}
          </p>
        </div>
      )}
    </motion.section>
  );
}
