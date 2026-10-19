import React from 'react';

/**
 * Đăng LIO - 3D Isometric Prism "L" Brand Emblem & Wordmark
 * Inspired by modern Linear / Apple aesthetics.
 */
export function DangLioEmblem({ className = 'w-9 h-9' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dark Obsidian Canvas Gradient */}
        <linearGradient id="emblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0F19" />
          <stop offset="50%" stopColor="#05070E" />
          <stop offset="100%" stopColor="#020307" />
        </linearGradient>

        {/* Outer Rim Neon Gradient */}
        <linearGradient id="emblemBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.75" />
        </linearGradient>

        {/* Vertical Stem Gradient (Cyber Cyan to Royal Indigo) */}
        <linearGradient id="emblemStem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="25%" stopColor="#00F2FE" />
          <stop offset="70%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Horizontal Foot Gradient (Violet to Neon Fuchsia) */}
        <linearGradient id="emblemFoot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="40%" stopColor="#A855F7" />
          <stop offset="75%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>

        {/* 3D Interlocking Prism Wedge */}
        <linearGradient id="prismWedge" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="50%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>

        {/* Specular White Crest */}
        <linearGradient id="specularWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base Squircle Container (Apple / VisionOS radius) */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="22"
        fill="url(#emblemBg)"
        stroke="url(#emblemBorder)"
        strokeWidth="1.8"
      />

      {/* Ambient Radial Core Light */}
      <circle cx="45" cy="55" r="26" fill="#6366F1" fillOpacity="0.28" filter="blur(6px)" />

      {/* Top Glass Reflection */}
      <path
        d="M 12 10 Q 50 6 88 10"
        stroke="#FFFFFF"
        strokeOpacity="0.2"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* 3D Prism Structure */}
      <g>
        {/* 1. Interlocking Prism Wedge */}
        <path d="M 29 62 L 48 51 L 48 74 L 29 78 Z" fill="url(#prismWedge)" opacity="0.9" />

        {/* 2. Horizontal Foot (Forward dynamic speed) */}
        <path
          d="M 42 60 L 71 60 C 74.5 60 77.5 63 77.5 66.5 C 77.5 70 74.5 73 71 73 L 35 73 C 31.5 73 29 70 29 66.5 L 29 62 L 42 60 Z"
          fill="url(#emblemFoot)"
        />

        {/* 3. Specular Ridge on Foot */}
        <path
          d="M 44 61.5 L 70 61.5 C 72.5 61.5 75 63.5 75 66.5"
          stroke="#FFFFFF"
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* 4. Vertical Pillar (Cyan Prism Beam) */}
        <path
          d="M 29 29 C 29 25.5 31.8 23 35.3 23 L 41.7 23 C 45.2 23 48 25.5 48 29 L 48 63.5 L 29 72 L 29 29 Z"
          fill="url(#emblemStem)"
        />

        {/* 5. Specular Edge on Stem */}
        <path
          d="M 30.2 29.5 C 30.2 26.5 32.5 24.2 35.5 24.2 L 41 24.2"
          stroke="url(#specularWhite)"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
        <line
          x1="30.2"
          y1="29.5"
          x2="30.2"
          y2="68"
          stroke="url(#specularWhite)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 6. Sharp Diagonal Prism Blade */}
        <line
          x1="29"
          y1="72"
          x2="48"
          y2="63.5"
          stroke="#FFFFFF"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>

      {/* 7. Diamond Star Flare at Stem Apex */}
      <g transform="translate(48, 23)">
        <path
          d="M 0 -4.5 L 0.7 -1.2 L 4 0 L 0.7 1.2 L 0 4.5 L -0.7 1.2 L -4 0 L -0.7 -1.2 Z"
          fill="#00F2FE"
          opacity="0.95"
        />
        <circle cx="0" cy="0" r="0.9" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export function DangLioFullLogo() {
  return (
    <div className="flex items-center space-x-2.5 group">
      <DangLioEmblem className="w-9 h-9 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1 shadow-md shadow-indigo-500/20" />
      <div className="flex items-center">
        <div className="flex items-baseline space-x-1">
          <span className="font-black text-lg tracking-tight text-neutral-900 dark:text-white">
            Đăng
          </span>
          <span className="font-black text-lg tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
            LIO
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] ml-0.5 animate-pulse" />
        </div>
        <span className="hidden sm:inline-flex items-center ml-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          Official
        </span>
      </div>
    </div>
  );
}

export default DangLioFullLogo;
