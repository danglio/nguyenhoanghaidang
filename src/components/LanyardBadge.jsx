import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, RotateCw, ShieldCheck, Cpu } from 'lucide-react';

/**
 * 3D Interactive Lanyard ID Badge Component
 * Features:
 * - Hanging woven lanyard ribbon strap with glowing borders and vertical typography
 * - Chrome metallic hardware clamp and carabiner D-ring clip
 * - Dual-sided 3D Flip Card with preserve-3d mechanics and smooth cubic easing
 * - Front Face: Acrylic glass ID card, profile portrait, lighting sheen, artistic signature, holographic foil, barcode
 * - Back Face: High-tech Carbon Digital Passport, Gold EMV Smart Chip, NFC contactless waves, authentic scannable QR Code SVG, security magnetic stripe, verified identity
 * - Interactive Flip triggers: Dedicated 3D Flip buttons with tooltips & full-card double-click gesture
 * - Physics: Idle pendulum sway, responsive 3D tilt, elastic spring drag
 */
export default function LanyardBadge({ personal = {}, className = '' }) {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dropKey, setDropKey] = useState(0);

  // Profile data with safe fallbacks
  const avatarUrl =
    personal?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';
  const rawFullName = personal?.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)';
  const displayName = rawFullName.replace(/\s*\([^)]*\)/, '').trim().toUpperCase() || 'NGUYỄN HOÀNG HẢI ĐĂNG';
  const displayTitle = personal?.title || 'Content Creator & Storyteller';
  const email = personal?.email || 'contact@danglio.com';
  const portfolioUrl =
    personal?.portfolioUrl ||
    'https://danglio.github.io/homnayuonggilio/';
  const passportId = '#LIO-PASSPORT-2026-VIP';

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

  // Toggle Flip Handler
  const handleToggleFlip = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsFlipped((prev) => !prev);
  };

  const handleDoubleClick = (e) => {
    if (isDragging) return;
    handleToggleFlip(e);
  };

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
      {/* 1. TOP ANCHOR PIN (Wall / Collar Mount & Re-drop Trigger) */}
      <button
        type="button"
        onClick={() => setDropKey((k) => k + 1)}
        title="Nhấp để thả rơi lại thẻ 🎯"
        className="group/pin relative z-30 flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 focus:outline-none"
      >
        <div className="w-7 h-3 rounded-b-md bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 shadow-md border-x border-b border-white/60 flex items-center justify-center group-hover/pin:from-cyan-200 group-hover/pin:to-neutral-300 transition-colors">
          <div className="w-2.5 h-1 rounded-full bg-neutral-700 shadow-inner border border-neutral-400/60 group-hover/pin:bg-cyan-600 transition-colors" />
        </div>
      </button>

      {/* 2. DROP-DOWN SPRING PHYSICS WRAPPER */}
      <motion.div
        key={dropKey}
        initial={{ y: -520, rotateZ: 7, opacity: 0.2 }}
        animate={{ y: 0, rotateZ: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 130,
          damping: 11,
          mass: 1.2,
        }}
        className="relative flex flex-col items-center origin-top"
        style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
      >
        {/* 3. PENDULUM SWAY WRAPPER (Idle oscillation & strap) */}
        <motion.div
          className="relative flex flex-col items-center origin-top"
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
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

        {/* 4. DUAL-SIDED 3D FLIP ID CARD (Draggable & 3D Tilt) */}
        <motion.div
          ref={cardRef}
          drag
          dragSnapToOrigin={true}
          dragConstraints={{ left: -100, right: 100, top: -30, bottom: 60 }}
          dragElastic={0.6}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDoubleClick={handleDoubleClick}
          whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
          style={{
            x: cardX,
            y: cardY,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative -mt-2 w-[270px] sm:w-[280px] h-[410px] sm:h-[420px] cursor-grab active:cursor-grabbing"
        >
          {/* 3D ROTATION WRAPPER */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 0.65,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full h-full"
          >
            {/* ============================================================ */}
            {/* FRONT FACE (Acrylic Glass ID Card) */}
            {/* ============================================================ */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
              className={`absolute inset-0 rounded-2xl bg-neutral-900/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.2)] overflow-hidden flex flex-col justify-between p-4 ${
                isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
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

                {/* Header: Logo, Online Status & Flip Button */}
                <div className="flex items-center justify-between px-1 relative z-20">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-black tracking-[0.2em] text-neutral-200 uppercase">
                      LIO CREATIVE HUB
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      <span className="text-[9px] font-bold tracking-wider text-emerald-300 uppercase">
                        ONLINE
                      </span>
                    </div>

                    {/* 3D Flip Trigger Button */}
                    <button
                      type="button"
                      onClick={handleToggleFlip}
                      onPointerDown={(e) => e.stopPropagation()}
                      title="Lật thẻ 360° (Mặt sau: QR Code & Chip NFC) - Hoặc nhấp đúp thẻ"
                      className="group flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-300 hover:text-white transition-all shadow-[0_0_8px_rgba(6,182,212,0.2)] cursor-pointer active:scale-95"
                    >
                      <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500 text-cyan-300" />
                      <span className="text-[9px] font-bold tracking-wider uppercase">Lật 3D</span>
                    </button>
                  </div>
                </div>

                {/* PROFILE PORTRAIT WITH 3D POP-OUT & NEON BORDER BEAM */}
                <div className="relative mx-auto mt-3.5 mb-1.5 w-36 h-36 sm:w-40 sm:h-40 group">
                  {/* 1. PORTAL & NEON BORDER BEAM BASE */}
                  <div className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
                    {/* Rotating Conic-Gradient Border Beam (Cyan, Indigo, Pink, Amber, Cyan) */}
                    <div
                      className="absolute -inset-[150%] animate-border-beam pointer-events-none"
                      style={{
                        background:
                          'conic-gradient(from 0deg at 50% 50%, #06b6d4 0%, #6366f1 25%, #ec4899 50%, #f59e0b 75%, #06b6d4 100%)',
                      }}
                    />
                    {/* Deep Portal Background */}
                    <div className="relative w-full h-full rounded-[14px] bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-white/10 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(99,102,241,0.2),transparent_70%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(6,182,212,0.15),transparent_60%)]" />
                    </div>
                  </div>

                  {/* 2. 3D POP-OUT AVATAR LAYER */}
                  <div className="relative w-full h-full rounded-2xl overflow-visible pointer-events-none z-10">
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover object-top scale-[1.08] -translate-y-2.5 rounded-2xl drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter transition-transform duration-500 group-hover:scale-[1.12] group-hover:-translate-y-3.5"
                    />
                    {/* Soft lighting sheen & bottom vignette for depth */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-neutral-950/70 via-transparent to-white/15 pointer-events-none" />
                  </div>

                  {/* 3. MAGAZINE EDITORIAL HEADER BADGE */}
                  <div className="absolute top-2 inset-x-2 z-20 flex items-center justify-center py-0.5 px-2 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/30 shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    <span className="text-[7.5px] sm:text-[8px] font-mono font-extrabold tracking-wider bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 bg-clip-text text-transparent uppercase truncate">
                      ★ ISSUE 2026 // LIO EXCLUSIVE
                    </span>
                  </div>

                  {/* 4. SPECULAR GLASS SHEEN SWEEP ON HOVER */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20">
                    <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  </div>

                  {/* 5. ARTISTIC HANDWRITTEN "Lio" GOLD SIGNATURE */}
                  <div className="absolute -bottom-2.5 -right-2 pointer-events-none z-30">
                    <svg
                      viewBox="0 0 130 55"
                      className="w-28 h-12 drop-shadow-[0_2px_10px_rgba(245,158,11,0.85)] filter transform group-hover:scale-105 transition-transform duration-300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="lioGoldSignatureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="35%" stopColor="#fef08a" />
                          <stop offset="70%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 16 12 C 12 25, 14 42, 22 42 C 28 42, 34 32, 38 28 C 42 24, 46 25, 42 34 C 38 42, 28 44, 20 44 C 15 44, 18 36, 26 36 C 36 36, 48 38, 56 36"
                        stroke="url(#lioGoldSignatureGrad)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 58 28 C 59 33, 60 38, 64 36"
                        stroke="url(#lioGoldSignatureGrad)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <circle cx="61" cy="22" r="1.8" fill="#fef08a" />
                      <path
                        d="M 72 30 C 67 28, 65 37, 71 37 C 76 37, 78 30, 73 28 C 76 27, 85 24, 94 28 C 104 33, 114 36, 124 35"
                        stroke="url(#lioGoldSignatureGrad)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 28 48 C 55 52, 90 50, 120 42"
                        stroke="url(#lioGoldSignatureGrad)"
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
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,255,255,0.4)_5px,rgba(255,255,255,0.4)_10px)] mix-blend-overlay animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* BARCODE SVG & AUTHENTIC ID */}
                <div className="mt-2 px-2.5 py-1.5 bg-black/40 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
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
                    <span className="tracking-widest uppercase text-[8px] text-cyan-400/90 flex items-center gap-1">
                      <span>VERIFIED ACCESS</span>
                      <span className="text-neutral-500">&bull;</span>
                      <span className="text-neutral-300">DBL CLICK ↺</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* BACK FACE (Digital Passport & Scannable QR Code) */}
            {/* ============================================================ */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 backdrop-blur-2xl border border-neutral-700/70 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col justify-between p-4 ${
                isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Beveled edge reflection */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-cyan-500/20" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none z-30" />

              {/* SPECULAR GLARE OVERLAY (Carbon Reflection) */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-300"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]) =>
                      `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(6,182,212,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%), linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.08) 48%, rgba(6,182,212,0.15) 50%, rgba(255,255,255,0.08) 52%, transparent 65%)`
                  ),
                  opacity: isHovered ? 1 : 0.4,
                }}
              />

              {/* TOP BACK SECTION */}
              <div>
                {/* Oval Cutout Slot for Carabiner Clip */}
                <div className="w-12 h-2.5 mx-auto -mt-1 mb-1.5 rounded-full bg-neutral-950/90 border border-white/25 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center relative z-20">
                  <div className="w-8 h-1 rounded-full bg-black/60" />
                </div>

                {/* Header: Digital Passport & Flip Back Button */}
                <div className="flex items-center justify-between px-1 relative z-20">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-black tracking-[0.2em] text-neutral-200 uppercase">
                      DIGITAL PASSPORT
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleFlip}
                    onPointerDown={(e) => e.stopPropagation()}
                    title="Lật lại mặt trước"
                    className="group flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-400/50 text-neutral-200 hover:text-cyan-300 transition-all shadow-sm cursor-pointer active:scale-95"
                  >
                    <RotateCw className="w-3 h-3 group-hover:-rotate-180 transition-transform duration-500 text-cyan-400" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Mặt trước</span>
                  </button>
                </div>

                {/* Magnetic Stripe Bar */}
                <div className="relative mt-1.5 w-full h-6 bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-950 rounded border-y border-neutral-700/60 shadow-inner flex items-center justify-between px-2.5 overflow-hidden">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
                    }}
                  />
                  <span className="text-[7px] font-mono tracking-[0.14em] text-neutral-400 uppercase truncate">
                    DIGITAL IDENTITY &bull; ENCRYPTED KEY &bull; VIP ACCESS
                  </span>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-cyan-400 shrink-0 ml-1">
                    {passportId}
                  </span>
                </div>

                {/* Gold Smart Chip & NFC Simulation */}
                <div className="mt-1.5 flex items-center justify-between px-2.5 py-1.5 bg-neutral-950/60 rounded-xl border border-white/10 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    {/* EMV Gold Smart Chip */}
                    <div className="relative w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 p-[2px] shadow-[0_2px_8px_rgba(245,158,11,0.35)] border border-amber-300/90 shrink-0">
                      <div className="w-full h-full rounded-[3px] border border-amber-800/40 relative overflow-hidden bg-amber-400/90 flex flex-col justify-between">
                        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-amber-900/60 -translate-y-1/2" />
                        <div className="absolute top-0 bottom-0 left-[35%] w-[0.5px] bg-amber-900/60" />
                        <div className="absolute top-0 bottom-0 right-[35%] w-[0.5px] bg-amber-900/60" />
                        <div className="w-2 h-1.5 mx-auto my-auto rounded-[1.5px] border border-amber-900/60 bg-amber-300/80" />
                      </div>
                    </div>

                    {/* Chip Label */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-amber-300 text-[10px] font-mono font-bold tracking-wider">
                        <Cpu className="w-3 h-3 text-amber-400" />
                        <span>NFC SMART CHIP</span>
                      </div>
                      <span className="text-[8px] font-mono text-neutral-400 tracking-wider">
                        RFID EMV // AUTHENTIC PASS
                      </span>
                    </div>
                  </div>

                  {/* Contactless Waves SVG */}
                  <div className="flex items-center gap-1 text-cyan-400/90">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                      <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                      <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                    </svg>
                    <span className="text-[8px] font-mono font-bold text-neutral-400 tracking-widest hidden sm:inline">
                      WIRELESS
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER BACK SECTION: REAL SCANNABLE QR CODE */}
              <div className="flex flex-col items-center justify-center my-auto py-1">
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  title="Quét mã QR bằng camera điện thoại hoặc bấm để mở trực tiếp"
                  className="group/qr relative p-2 bg-white rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 block"
                >
                  {/* Authentic SVG QR Code Matrix (Resolves to https://danglio.github.io/homnayuonggilio/) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 37 37"
                    shapeRendering="crispEdges"
                    className="w-24 h-24 sm:w-26 sm:h-26"
                  >
                    <path fill="#ffffff" d="M0 0h37v37H0z" />
                    <path
                      stroke="#0f172a"
                      d="M4 4.5h7m2 0h1m2 0h1m1 0h2m1 0h4m1 0h7M4 5.5h1m5 0h1m1 0h2m1 0h2m1 0h3m1 0h2m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h1m1 0h1m3 0h1m2 0h3m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m2 0h1m1 0h2m2 0h2m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h3m1 0h3m2 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m6 0h1m1 0h1m1 0h1m1 0h2m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M15 11.5h4m1 0h5M4 12.5h1m1 0h1m1 0h1m1 0h1m2 0h1m2 0h2m1 0h3m6 0h1m2 0h1M4 13.5h2m1 0h1m1 0h1m1 0h1m1 0h2m5 0h1m3 0h3m2 0h1m2 0h1M5 14.5h3m1 0h3m1 0h2m6 0h1m2 0h2m1 0h1m2 0h3M6 15.5h1m1 0h2m3 0h5m2 0h4m1 0h1m5 0h1M6 16.5h1m1 0h1m1 0h1m1 0h3m1 0h2m1 0h8m2 0h1m1 0h2M6 17.5h1m2 0h1m2 0h2m6 0h1m3 0h3m2 0h1m2 0h1M5 18.5h4m1 0h2m2 0h3m1 0h1m2 0h1m2 0h1m4 0h1m1 0h2M4 19.5h5m3 0h4m1 0h8m3 0h2m1 0h1M4 20.5h1m2 0h1m1 0h3m2 0h2m1 0h1m3 0h1m3 0h2m2 0h1m1 0h2M6 21.5h1m2 0h1m2 0h3m5 0h1m3 0h3m2 0h2m1 0h1M4 22.5h1m1 0h1m1 0h3m5 0h2m4 0h1m2 0h1m1 0h2m2 0h2M5 23.5h2m6 0h7m1 0h1m1 0h1m2 0h2m1 0h1m1 0h1M4 24.5h1m1 0h2m1 0h3m1 0h1m2 0h4m1 0h1m1 0h6M12 25.5h1m2 0h2m3 0h1m2 0h2m3 0h1m1 0h3M4 26.5h7m4 0h1m1 0h1m3 0h1m1 0h2m1 0h1m1 0h2m1 0h2M4 27.5h1m5 0h1m6 0h3m1 0h2m1 0h1m3 0h2m1 0h2M4 28.5h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h1m1 0h2m2 0h5M4 29.5h1m1 0h3m1 0h1m3 0h1m5 0h1m3 0h2m1 0h2m1 0h3M4 30.5h1m1 0h3m1 0h1m1 0h1m1 0h4m2 0h1m2 0h2m2 0h3m2 0h1M4 31.5h1m5 0h1m4 0h1m4 0h5m1 0h2m3 0h1M4 32.5h7m1 0h6m1 0h3m1 0h2m2 0h2m2 0h2"
                    />
                  </svg>
                  {/* Corner scan badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-neutral-950 text-[8px] font-mono font-bold text-cyan-400 border border-cyan-500/40 whitespace-nowrap shadow-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>SCAN ME</span>
                  </div>
                </a>

                <div className="mt-3.5 text-center">
                  <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-cyan-300 uppercase">
                    SCAN TO CONNECT // QUÉT ĐỂ KẾT NỐI
                  </span>
                  <p className="text-[8px] sm:text-[9px] font-mono text-neutral-400 mt-0.5">
                    Dùng camera điện thoại để truy cập hồ sơ số
                  </p>
                </div>
              </div>

              {/* BOTTOM BACK SECTION: IDENTITY & FLIP BACK BUTTON */}
              <div className="mt-1">
                <div className="text-center mb-1.5 px-1">
                  <div className="text-xs sm:text-sm font-black text-white tracking-wider uppercase truncate">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-indigo-300 font-medium tracking-wide truncate">
                    {displayTitle}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-400 mt-0.5">
                    <span>{email}</span>
                    <span>&bull;</span>
                    <span className="text-cyan-400 font-bold">{passportId}</span>
                  </div>
                </div>

                {/* Flip Back Action Button */}
                <button
                  type="button"
                  onClick={handleToggleFlip}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="w-full py-1.5 rounded-xl bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-400/50 text-neutral-200 hover:text-cyan-200 text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-98"
                >
                  <RotateCw className="w-3 h-3 text-cyan-400" />
                  <span>Lật lại mặt trước (Double Click)</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
);
}
