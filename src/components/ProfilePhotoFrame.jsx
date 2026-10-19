import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ShieldCheck, MapPin, GraduationCap } from 'lucide-react';

export default function ProfilePhotoFrame({ personal, className = '' }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const avatarUrl = personal?.avatarUrl || `${import.meta.env.BASE_URL}avatar.jpg`;
  const fullName = personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)';

  return (
    <>
      <div className={`relative group inline-block ${className}`}>
        {/* Ambient atmospheric backlight - sophisticated monochrome/titanium tone */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-neutral-300/30 via-neutral-200/20 to-transparent dark:from-white/10 dark:via-neutral-700/15 dark:to-transparent rounded-[40px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Main Glassmorphic Photo Squircle Frame */}
        <motion.div
          whileHover={{ scale: 1.02, y: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative rounded-[32px] sm:rounded-[36px] p-2.5 sm:p-3 bg-gradient-to-b from-white/95 via-white/80 to-white/60 dark:from-neutral-800/90 dark:via-neutral-900/90 dark:to-neutral-950/90 backdrop-blur-2xl border border-neutral-300/70 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] cursor-pointer select-none"
          onClick={() => setIsPreviewOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Xem ảnh chân dung của ${fullName}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsPreviewOpen(true);
            }
          }}
        >
          {/* Inner Image Container */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[24px] sm:rounded-[28px] overflow-hidden bg-neutral-950 ring-1 ring-black/10 dark:ring-white/10">
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-[1.02]"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500';
              }}
            />

            {/* Subtle cinematic gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            {/* Top-Left Monogram Luxury Brand Mark */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
              <span className="font-serif font-black text-[11px] tracking-wider text-white">ĐL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Top-Right Expand Prompt */}
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Bottom Status Beacon Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-mono font-semibold tracking-wide truncate">
                  ONLINE // HUIT TP.HCM
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 shrink-0 hidden sm:inline">
                CREATOR
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* High-Resolution Portrait Lightbox Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full bg-neutral-900 border border-white/15 rounded-3xl p-4 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Display */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-950 mb-3 border border-white/10">
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Meta Info */}
              <div className="space-y-1 text-center px-2 py-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>XÁC THỰC DANH TÍNH CHÍNH THỨC</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {fullName}
                </h4>
                <p className="text-xs text-neutral-400">
                  Sinh viên Trường Đại học Công Thương TP.HCM (HUIT) • Khóa 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
