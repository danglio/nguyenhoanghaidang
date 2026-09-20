import React from 'react';
import { Globe, Mail, Send, ArrowUpRight, ExternalLink } from 'lucide-react';

/**
 * High-End Cyber-Polished Social Media Icons
 * Features:
 * - Multi-stop vibrant gradients
 * - Specular highlights & subtle depth
 * - Pixel-perfect official branding geometry
 * - Authentic 3D chromatic aberration for TikTok
 * - Instagram multi-color sunset gradient
 * - Google 4-color / Ruby envelope for Gmail
 */

export function TikTokIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <filter id="tiktok-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Cyan 3D chromatic aberration shadow (left-up) */}
      <path
        d="M17.8 6.1a4.8 4.8 0 0 1-3.6-3.8V2h-3.1v13.2a2.6 2.6 0 1 1-4.7-1.6 2.6 2.6 0 0 1 2-.9v-3.2a5.7 5.7 0 0 0-1-.1A5.8 5.8 0 0 0 1.6 15a5.8 5.8 0 0 0 9.9 4.1V10.2a7.6 7.6 0 0 0 5-2.1v-2z"
        fill="#25F4EE"
        opacity="0.9"
        transform="translate(-0.8, -0.6)"
      />
      {/* Red/Magenta 3D chromatic aberration shadow (right-down) */}
      <path
        d="M17.8 6.1a4.8 4.8 0 0 1-3.6-3.8V2h-3.1v13.2a2.6 2.6 0 1 1-4.7-1.6 2.6 2.6 0 0 1 2-.9v-3.2a5.7 5.7 0 0 0-1-.1A5.8 5.8 0 0 0 1.6 15a5.8 5.8 0 0 0 9.9 4.1V10.2a7.6 7.6 0 0 0 5-2.1v-2z"
        fill="#FE2C55"
        opacity="0.9"
        transform="translate(0.8, 0.6)"
      />
      {/* Crisp White Main Foreground Body */}
      <path
        filter="url(#tiktok-glow)"
        d="M17.8 6.1a4.8 4.8 0 0 1-3.6-3.8V2h-3.1v13.2a2.6 2.6 0 1 1-4.7-1.6 2.6 2.6 0 0 1 2-.9v-3.2a5.7 5.7 0 0 0-1-.1A5.8 5.8 0 0 0 1.6 15a5.8 5.8 0 0 0 9.9 4.1V10.2a7.6 7.6 0 0 0 5-2.1v-2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function YouTubeIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="yt-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF1E40" />
          <stop offset="100%" stopColor="#D90429" />
        </linearGradient>
        <filter id="yt-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#D90429" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Red Pill Body with Metallic Gradient */}
      <rect
        x="1.5"
        y="4"
        width="21"
        height="16"
        rx="4.8"
        fill="url(#yt-gradient)"
        filter="url(#yt-shadow)"
      />
      {/* Specular Rim Light */}
      <rect
        x="2.5"
        y="5"
        width="19"
        height="6"
        rx="3"
        fill="white"
        fillOpacity="0.18"
      />
      {/* Pure White Play Triangle with Depth */}
      <path
        d="M10 8.5L16 12L10 15.5V8.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function FacebookIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="fb-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#18ACFE" />
          <stop offset="100%" stopColor="#0062E0" />
        </linearGradient>
        <filter id="fb-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0062E0" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Circular Emblem with Electric Blue Gradient */}
      <circle cx="12" cy="12" r="10.5" fill="url(#fb-gradient)" filter="url(#fb-shadow)" />
      {/* Soft Specular Top Sheen */}
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3.5" fill="white" fillOpacity="0.18" />
      {/* Crisp White 'f' glyph */}
      <path
        d="M13.8 22.3V14.1H16.5L16.9 10.9H13.8V8.9C13.8 8 14.1 7.4 15.3 7.4H17V4.5C16.4 4.4 15.4 4.3 14.3 4.3C12 4.3 10.5 5.7 10.5 8.3V10.9H7.8V14.1H10.5V22.3C11 22.4 11.5 22.5 12.1 22.5C12.7 22.5 13.2 22.4 13.8 22.3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function InstagramIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        {/* Authentic Multi-Color Instagram Gradient */}
        <radialGradient id="ig-radial" cx="30%" cy="105%" r="115%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="20%" stopColor="#F58529" />
          <stop offset="45%" stopColor="#DD2A7B" />
          <stop offset="75%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </radialGradient>
        <filter id="ig-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#DD2A7B" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Rounded squircle background */}
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-radial)" filter="url(#ig-shadow)" />
      {/* Top soft sheen */}
      <rect x="3.5" y="3.5" width="17" height="6" rx="3.5" fill="white" fillOpacity="0.15" />
      {/* Camera Outer Rounded Square */}
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.5" stroke="#FFFFFF" strokeWidth="1.6" />
      {/* Camera Lens Center Ring */}
      <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.6" />
      {/* Flash Dot */}
      <circle cx="15.6" cy="8.4" r="0.85" fill="#FFFFFF" />
    </svg>
  );
}

export function GmailIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <filter id="gmail-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#EA4335" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#gmail-shadow)">
        {/* Left red fold */}
        <path d="M3.5 19.5V7.8L12 14.2L20.5 7.8V19.5C20.5 20.3 19.8 21 19 21H5C4.2 21 3.5 20.3 3.5 19.5Z" fill="#F2F2F2" />
        <path d="M3.5 6.5C3.5 5.5 4.7 5 5.5 5.6L12 10.5L18.5 5.6C19.3 5 20.5 5.5 20.5 6.5V7.8L12 14.2L3.5 7.8V6.5Z" fill="#EA4335" />
        <path d="M3.5 7.8V19.5C3.5 20.3 4.2 21 5 21H7.5V11L3.5 7.8Z" fill="#C5221F" />
        <path d="M20.5 7.8V19.5C20.5 20.3 19.8 21 19 21H16.5V11L20.5 7.8Z" fill="#C5221F" />
        <path d="M16.5 11L12 14.2L7.5 11V21H16.5V11Z" fill="#FFFFFF" fillOpacity="0.9" />
      </g>
    </svg>
  );
}

export function GitHubIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="gh-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#30363D" />
          <stop offset="100%" stopColor="#161B22" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#gh-gradient)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58 4 4 7.59 4 12.02c0 3.54 2.29 6.54 5.47 7.6.4.08.55-.17.55-.38 0-.19-.01-.69-.01-1.36-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82A7.6 7.6 0 0 1 12 7.87c.68 0 1.37.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.08-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .22.14.47.55.38A8.02 8.02 0 0 0 20 12.02C20 7.59 16.42 4 12 4Z"
        fill="#F0F6FC"
      />
    </svg>
  );
}

export function XTwitterIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M17.8 4.5h2.6l-5.7 6.5 6.7 8.9H16.1l-4.1-5.4-4.8 5.4H4.6l6.1-7-6.4-8.4h5.4l3.7 4.9zm-.9 13.8h1.4L8.7 6h-1.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        d="M6.2 9.2H9v9.6H6.2V9.2zm1.4-4.7c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm4.4 4.7h2.7v1.3h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 2 3.5 4.5v5.3h-2.8v-4.7c0-1.1 0-2.6-1.6-2.6-1.6 0-1.8 1.2-1.8 2.5v4.8H12V9.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TelegramIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="tg-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2AABEE" />
          <stop offset="100%" stopColor="#229ED9" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#tg-gradient)" />
      <path
        d="M16.9 7.2c.1 0 .3 0 .4.2.1.1.2.3.2.4l-1.4 8.6c-.1.9-.5 1.2-.8 1.2-.7 0-1.2-.4-1.9-.9-1.1-.7-1.6-1.1-2.7-1.8-1.2-.8-.4-1.2.3-1.9.2-.2 3.2-3 3.3-3.2 0 0 0-.2-.1-.2-.1 0-.2 0-.3 0-1.8 1.1-5.1 3.3-5.1 3.3-.5.3-.9.5-1.3.5-.4 0-1.3-.2-1.9-.4-.7-.2-1.3-.4-1.3-.8 0-.2.3-.4.9-.7 3.5-1.5 5.8-2.5 7-3 3.3-1.4 4-1.6 4.5-1.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function WebGlobeIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="web-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#web-gradient)" strokeWidth="2" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="url(#web-gradient)" strokeWidth="1.8" />
    </svg>
  );
}

export function ZaloIcon({ className = 'w-5 h-5', style = {} }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="zalo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#0055EE" />
        </linearGradient>
        <filter id="zalo-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0066FF" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Blue Rounded Squircle Background */}
      <rect width="24" height="24" rx="6" fill="url(#zalo-gradient)" filter="url(#zalo-shadow)" />
      {/* Soft Specular Top Sheen */}
      <rect x="2.5" y="2.5" width="19" height="5.5" rx="3" fill="white" fillOpacity="0.16" />
      {/* Subtle Speech Bubble accent */}
      <path
        d="M17.5 12c0 3.3-2.7 6-6 6-1 0-1.9-.2-2.7-.7l-2.8.9.8-2.5C6.3 14.8 6 13.5 6 12c0-3.3 2.7-6 6-6s5.5 2.7 5.5 6z"
        fill="white"
        fillOpacity="0.12"
      />
      {/* Authentic Zalo Typography */}
      <text
        x="12"
        y="14.6"
        fill="#FFFFFF"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="7.5"
        textAnchor="middle"
        letterSpacing="-0.3"
      >
        Zalo
      </text>
    </svg>
  );
}

export { Globe, Mail, Send, ArrowUpRight, ExternalLink };
