import React from 'react';

/**
 * Đăng LIO High-End Brand Emblem & Typography Logo
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
        <linearGradient id="emblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="emblemBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="emblemLio" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>

      {/* Rounded Squircle Container */}
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx="24"
        fill="url(#emblemBg)"
        stroke="url(#emblemBorder)"
        strokeWidth="2.5"
      />

      {/* Ambient subtle glow */}
      <circle cx="50" cy="45" r="28" fill="#6366F1" fillOpacity="0.25" filter="blur(8px)" />

      {/* "Đ" Main Character */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="44"
        fontWeight="900"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
        fill="#FFFFFF"
      >
        Đ
      </text>

      {/* Cyber Cyan Crossbar */}
      <rect x="29" y="36" width="20" height="4.5" rx="2.2" fill="#22D3EE" />

      {/* Small Star / Spark Accent */}
      <circle cx="72" cy="26" r="1.8" fill="#F472B6" />
      <path d="M72 22v8M68 26h8" stroke="#F472B6" strokeWidth="0.9" strokeLinecap="round" />

      {/* "LIO" Sub-text */}
      <text
        x="50"
        y="81"
        textAnchor="middle"
        fontSize="17"
        fontWeight="900"
        letterSpacing="3.5"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
        fill="url(#emblemLio)"
      >
        LIO
      </text>
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
          <span className="font-black text-lg tracking-wider bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
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
