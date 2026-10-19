import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

export default function ProfilePhotoFrame({ personal, className = '' }) {
  const avatarUrl = personal?.avatarUrl || `${import.meta.env.BASE_URL}avatar.jpg`;
  const fullName = personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)';
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Card reference for calculating mouse coordinates
  const cardRef = useRef(null);

  // Mouse tilt motion values [-0.5 to 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D perspective
  const springConfig = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <div className={`relative group inline-block select-none ${className}`}>
        {/* ========================================================
            1. AMBIENT AURA GLOW (Subtle atmospheric bloom)
        ======================================================== */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-pink-500/20 rounded-[36px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* ========================================================
            2. MAIN 3D TILT CHASSIS (Clean, unobstructed glass frame)
        ======================================================== */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
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
            {/* Pure Clean Studio Portrait Image */}
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-full h-full object-cover object-[50%_18%] scale-[1.02] group-hover:scale-106 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800';
              }}
            />

            {/* Specular Diagonal Sheen Sweep on hover */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </div>

            {/* Subtle Zoom Hint on Hover in corner */}
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          3. FULL HIGH-RES LIGHTBOX MODAL (ON CLICK)
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
