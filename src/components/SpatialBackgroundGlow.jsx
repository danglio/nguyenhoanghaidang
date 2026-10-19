import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SpatialBackgroundGlow() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth physical spring follow
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Cursor Spotlight Follower */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60 dark:opacity-40 blur-[100px] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)',
        }}
      />

      {/* VisionOS Floating Ambient Orbs */}
      <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[140px] animate-pulse delay-700" />
      <div className="absolute bottom-[10%] left-[25%] w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />

      {/* Subtle Spatial Dot Grid Mesh */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
