import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Award,
  Radio,
  Maximize2,
  X,
  ShieldCheck,
  Code2,
  Camera,
} from 'lucide-react';

export default function ProfilePhotoFrame({ personal, className = '' }) {
  const avatarUrl = personal?.avatarUrl || `${import.meta.env.BASE_URL}avatar.jpg`;
  const fullName = personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)';
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Card reference for calculating mouse coordinates
  const cardRef = useRef(null);

  // Mouse tilt motion values [-0.5 to 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D perspective
  const springConfig = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // Dynamic specular sheen position
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <div className={`relative group inline-block select-none ${className}`}>
        {/* ========================================================
            1. AMBIENT AURA GLOW (Multi-color atmospheric bloom)
        ======================================================== */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/25 to-pink-500/25 rounded-[36px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute -inset-4 bg-gradient-to-b from-blue-600/15 to-purple-600/15 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

        {/* ========================================================
            2. FLOATING BADGE (TOP-RIGHT POP-OUT)
        ======================================================== */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 -right-3 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-300/80 dark:border-white/20 shadow-xl shadow-cyan-500/10 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>AI & Creative Tech</span>
        </motion.div>

        {/* ========================================================
            3. FLOATING BADGE (BOTTOM-LEFT POP-OUT)
        ======================================================== */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-3 -left-3 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-300/80 dark:border-white/20 shadow-xl shadow-indigo-500/10 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span>Gen Z Creator // HUIT</span>
        </motion.div>

        {/* ========================================================
            4. MAIN 3D TILT CHASSIS
        ======================================================== */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsZoomOpen(true)}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative w-64 sm:w-72 md:w-80 aspect-[3.2/4] rounded-[32px] p-2 sm:p-2.5 bg-gradient-to-b from-white/90 via-white/70 to-white/90 dark:from-white/15 dark:via-neutral-900/80 dark:to-neutral-950/90 backdrop-blur-2xl border border-neutral-300/80 dark:border-white/15 shadow-2xl cursor-pointer overflow-hidden"
        >
          {/* Internal Image Frame */}
          <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-neutral-900">
            {/* Portrait Image */}
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-full h-full object-cover object-[50%_18%] scale-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800';
              }}
            />

            {/* Specular Diagonal Sheen Sweep on hover */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </div>

            {/* Camera Viewfinder Studio Corner Marks */}
            <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70 rounded-tl-sm pointer-events-none drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70 rounded-tr-sm pointer-events-none drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
            <span className="absolute bottom-14 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70 rounded-bl-sm pointer-events-none drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
            <span className="absolute bottom-14 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70 rounded-br-sm pointer-events-none drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />

            {/* Top Viewfinder Metadata Bar */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80 pointer-events-none">
              <div className="flex items-center gap-1.5">
                <Camera className="w-3 h-3 text-cyan-400" />
                <span className="font-semibold tracking-wider">PORTRAIT // 2026</span>
              </div>
              <span className="text-cyan-400 font-bold">4K STUDIO</span>
            </div>

            {/* Cinematic Gradient Vignette at Bottom (Blends shirt into dark glass) */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-transparent pointer-events-none" />

            {/* Bottom Status Capsule Overlay */}
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between p-2 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/15 text-white shadow-lg">
              <div className="flex items-center gap-2 pl-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-bold leading-tight tracking-wider text-emerald-400">
                    SẴN SÀNG HỢP TÁC
                  </span>
                  <span className="text-[9px] text-neutral-300 font-medium">
                    HUIT • TP. Hồ Chí Minh
                  </span>
                </div>
              </div>

              {/* Zoom Preview Button Indicator */}
              <div className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          5. FULL HIGH-RES LIGHTBOX MODAL (ON CLICK)
      ======================================================== */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 max-w-md w-full rounded-3xl p-3 bg-neutral-900/90 border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-2 px-2 text-white">
                <div>
                  <h3 className="text-sm font-bold">{fullName}</h3>
                  <p className="text-xs text-neutral-400">Ảnh chân dung chính thức • 2026</p>
                </div>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High-res Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden aspect-[2/3] bg-neutral-950">
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Caption */}
              <div className="pt-2 text-center text-xs text-neutral-400 font-mono">
                Creative Technologist & Gen Z Creator
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
