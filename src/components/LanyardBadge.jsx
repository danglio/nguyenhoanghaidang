import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * 3D Interactive Lanyard ID Badge Component
 * Features:
 * - Hanging woven lanyard ribbon strap with glowing borders and vertical typography
 * - Chrome metallic hardware clamp and carabiner D-ring clip
 * - Acrylic glass ID card with frosted backdrop, bevel highlights, and specular glare
 * - Profile portrait with lighting sheen and artistic cursive "Lio" signature
 * - Holographic rainbow foil ribbon and authentic SVG barcode with ID #LIO-2026-0802
 * - Framer Motion physics: idle pendulum sway, responsive 3D tilt, and elastic spring drag
 */
export default function LanyardBadge({ personal = {}, className = '' }) {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Profile data with safe fallbacks
  const avatarUrl =
    personal?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';
  const rawFullName = personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)';
  const displayName = rawFullName.replace(/\s*\([^)]*\)/, '').trim().toUpperCase() || 'NGUYỄN HOÀNG HẢI ĐĂNG';
  const displayTitle = personal?.title || 'Content Creator & Storyteller';

  // Drag Motion Values
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // Mouse coordinate values for 3D tilt [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring physics for 3D tilt
  const springConfig = { stiffness: 280, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  // Dynamic glare coordinates matching tilt
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, 85]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, 85]), springConfig);

  // Strap tilt angle follows card horizontal drag displacement
  const strapAngle = useTransform(cardX, [-100, 100], [-8, 8]);

  // Handle mouse movements for 3D tilt
  const handleMouseMove = (e) => {
    if (isDragging) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const normX = Math.max(-0.6, Math.min(0.6, (e.clientX - cardCenterX) / rect.width));
    const normY = Math.max(-0.6, Math.min(0.6, (e.clientY - cardCenterY) / rect.height));

    mouseX.set(normX);
    mouseY.set(normY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center select-none py-2 ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 1. TOP ANCHOR PIN (Wall / Collar Mount) */}
      <div className="relative z-30 flex flex-col items-center">
        <div className="w-7 h-3 rounded-b-md bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 shadow-md border-x border-b border-white/60 flex items-center justify-center">
          <div className="w-2.5 h-1 rounded-full bg-neutral-700 shadow-inner border border-neutral-400/60" />
        </div>
      </div>

      {/* 2. PENDULUM SWAY WRAPPER (Idle oscillation & strap) */}
      <motion.div
        className="relative flex flex-col items-center origin-top"
        style={{ transformOrigin: 'top center' }}
        animate={
          isDragging
            ? { rotateZ: 0, rotateY: 0 }
            : {
                rotateZ: [-2, 2, -2],
                rotateY: [-2.5, 2.5, -2.5],
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* RIBBON STRAP */}
        <motion.div
          style={{ rotate: strapAngle, transformOrigin: 'top center' }}
          className="relative w-[38px] h-[125px] sm:h-[135px] border-x border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Woven fabric twill diagonal texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                135deg,
                rgba(18, 18, 24, 0.98) 0px,
                rgba(18, 18, 24, 0.98) 3px,
                rgba(32, 32, 42, 0.98) 3px,
                rgba(32, 32, 42, 0.98) 6px
              )`,
            }}
          />

          {/* Stitched seam lines */}
          <div className="absolute left-[3px] top-0 bottom-0 w-px border-r border-dashed border-cyan-400/30" />
          <div className="absolute right-[3px] top-0 bottom-0 w-px border-l border-dashed border-cyan-400/30" />

          {/* Subtly embossed vertical ribbon typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-black tracking-[0.24em] text-neutral-300/85 uppercase select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              ★ LIO CREATIVE STORYTELLER ★
            </span>
          </div>

          {/* Ribbon edge glow sheen */}
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-cyan-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
        </motion.div>

        {/* 3. CHROME HARDWARE (Metallic Clasp & Carabiner Swivel) */}
        <div className="relative z-20 flex flex-col items-center -mt-0.5">
          {/* Chrome Ribbon Clamp */}
          <div className="w-8 h-4 rounded-sm bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-white/60 flex items-center justify-center relative">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-300 shadow-inner" />
          </div>

          {/* Chrome Carabiner D-Ring Swivel */}
          <div className="w-5 h-5 rounded-t-full border-2 border-neutral-200/90 shadow-sm mx-auto -mt-0.5 bg-transparent" />
          <div className="w-4 h-6 rounded-b-md bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-400 border border-white/60 shadow-md mx-auto -mt-1 relative z-20 flex items-center justify-center">
            <div className="w-1 h-3 bg-neutral-500/60 rounded-full" />
          </div>
        </div>

        {/* 4. ACRYLIC GLASS ID CARD (Draggable & 3D Tilt) */}
        <motion.div
          ref={cardRef}
          drag
          dragSnapToOrigin={true}
          dragConstraints={{ left: -100, right: 100, top: -30, bottom: 60 }}
          dragElastic={0.6}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
          style={{
            x: cardX,
            y: cardY,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative -mt-2 w-[270px] sm:w-[280px] h-[410px] sm:h-[420px] rounded-2xl bg-neutral-900/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.2)] cursor-grab active:cursor-grabbing overflow-hidden flex flex-col justify-between p-4"
        >
          {/* Beveled glass frosted edge reflection */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-white/15" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30" />

          {/* DYNAMIC GLARE / SPECULAR REFLECTION OVERLAY */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 45%, transparent 70%), linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 48%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 52%, transparent 65%)`
              ),
              opacity: isHovered ? 1 : 0.45,
            }}
          />

          {/* TOP CARD SECTION */}
          <div>
            {/* Oval Cutout Slot for Carabiner Clip */}
            <div className="w-12 h-2.5 mx-auto -mt-1 mb-2 rounded-full bg-neutral-950/90 border border-white/25 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center relative z-20">
              <div className="w-8 h-1 rounded-full bg-black/60" />
            </div>

            {/* Header: Logo & Online Status */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-black tracking-[0.2em] text-neutral-200 uppercase">
                  LIO CREATIVE HUB
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[9px] font-bold tracking-wider text-emerald-300 uppercase">
                  ONLINE
                </span>
              </div>
            </div>

            {/* PROFILE PORTRAIT WITH HOLOGRAPHIC FRAME & SIGNATURE */}
            <div className="relative mx-auto mt-2.5 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400/50 via-indigo-500/50 to-purple-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] group">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-neutral-800">
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Soft lighting sheen overlay on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-white/15 pointer-events-none" />
              </div>

              {/* VIP Pass Badge in Corner of Photo */}
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/20 text-[8px] font-mono font-bold text-cyan-300 tracking-wider">
                VIP
              </div>

              {/* ARTISTIC HANDWRITTEN "Lio" SIGNATURE (Overlay on photo bottom right) */}
              <div className="absolute -bottom-2 -right-3 pointer-events-none z-20">
                <svg
                  viewBox="0 0 130 55"
                  className="w-28 h-12 drop-shadow-[0_2px_8px_rgba(6,182,212,0.85)] filter"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="lioSignatureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                  {/* Cursive "L" */}
                  <path
                    d="M 16 12 C 12 25, 14 42, 22 42 C 28 42, 34 32, 38 28 C 42 24, 46 25, 42 34 C 38 42, 28 44, 20 44 C 15 44, 18 36, 26 36 C 36 36, 48 38, 56 36"
                    stroke="url(#lioSignatureGrad)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Cursive "i" & glowing dot */}
                  <path
                    d="M 58 28 C 59 33, 60 38, 64 36"
                    stroke="url(#lioSignatureGrad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <circle cx="61" cy="22" r="1.8" fill="#38bdf8" />
                  {/* Cursive "o" with artistic loop */}
                  <path
                    d="M 72 30 C 67 28, 65 37, 71 37 C 76 37, 78 30, 73 28 C 76 27, 85 24, 94 28 C 104 33, 114 36, 124 35"
                    stroke="url(#lioSignatureGrad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Elegant underline flourish */}
                  <path
                    d="M 28 48 C 55 52, 90 50, 120 42"
                    stroke="url(#lioSignatureGrad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* NAME & TITLE */}
            <div className="mt-2.5 text-center">
              <h3 className="font-black text-sm sm:text-base tracking-wider text-white uppercase drop-shadow-sm truncate px-2">
                {displayName}
              </h3>
              <p className="text-[11px] sm:text-xs text-indigo-300 font-medium tracking-wide mt-0.5 truncate px-2">
                {displayTitle}
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-medium tracking-widest text-neutral-300 bg-white/5 border border-white/10 uppercase">
                  STORYTELLER &bull; CREATOR
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM CARD SECTION: HOLOGRAPHIC STRIP & BARCODE */}
          <div>
            {/* HOLOGRAPHIC RAINBOW FOIL RIBBON */}
            <div className="relative h-2.5 w-full overflow-hidden rounded-sm bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_12px_rgba(6,182,212,0.35)]">
              {/* Shimmering micro-prismatic diagonal pattern */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,255,255,0.4)_5px,rgba(255,255,255,0.4)_10px)] mix-blend-overlay animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* BARCODE SVG & AUTHENTIC ID */}
            <div className="mt-2 px-2.5 py-1.5 bg-black/40 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                {/* Crisp SVG Barcode */}
                <svg
                  className="h-6 w-full text-neutral-200"
                  viewBox="0 0 160 26"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <rect x="0" y="0" width="2" height="26" />
                  <rect x="4" y="0" width="1" height="26" />
                  <rect x="7" y="0" width="3" height="26" />
                  <rect x="12" y="0" width="1" height="26" />
                  <rect x="15" y="0" width="4" height="26" />
                  <rect x="21" y="0" width="2" height="26" />
                  <rect x="25" y="0" width="1" height="26" />
                  <rect x="28" y="0" width="3" height="26" />
                  <rect x="33" y="0" width="2" height="26" />
                  <rect x="37" y="0" width="4" height="26" />
                  <rect x="43" y="0" width="1" height="26" />
                  <rect x="46" y="0" width="3" height="26" />
                  <rect x="51" y="0" width="2" height="26" />
                  <rect x="55" y="0" width="1" height="26" />
                  <rect x="58" y="0" width="4" height="26" />
                  <rect x="64" y="0" width="2" height="26" />
                  <rect x="68" y="0" width="1" height="26" />
                  <rect x="71" y="0" width="3" height="26" />
                  <rect x="76" y="0" width="2" height="26" />
                  <rect x="80" y="0" width="4" height="26" />
                  <rect x="86" y="0" width="1" height="26" />
                  <rect x="89" y="0" width="3" height="26" />
                  <rect x="94" y="0" width="2" height="26" />
                  <rect x="98" y="0" width="1" height="26" />
                  <rect x="101" y="0" width="4" height="26" />
                  <rect x="107" y="0" width="2" height="26" />
                  <rect x="111" y="0" width="1" height="26" />
                  <rect x="114" y="0" width="3" height="26" />
                  <rect x="119" y="0" width="2" height="26" />
                  <rect x="123" y="0" width="4" height="26" />
                  <rect x="129" y="0" width="1" height="26" />
                  <rect x="132" y="0" width="3" height="26" />
                  <rect x="137" y="0" width="2" height="26" />
                  <rect x="141" y="0" width="1" height="26" />
                  <rect x="144" y="0" width="4" height="26" />
                  <rect x="150" y="0" width="2" height="26" />
                  <rect x="154" y="0" width="1" height="26" />
                  <rect x="157" y="0" width="3" height="26" />
                </svg>
              </div>

              {/* ID & Verified Labels */}
              <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 mt-1">
                <span className="font-bold tracking-wider text-neutral-300">#LIO-2026-0802</span>
                <span className="tracking-widest uppercase text-[8px] text-neutral-500">
                  VERIFIED ACCESS
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
