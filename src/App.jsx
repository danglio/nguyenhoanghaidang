import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal';
import Toast from './components/Toast';
import CleanPortfolioLayout from './components/layouts/CleanPortfolioLayout';
import { useProfileData } from './hooks/useProfileData';
import { Heart } from 'lucide-react';

export default function App() {
  const { profile } = useProfileData();

  // Light Mode is active by default
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('personal_theme_v3');
      if (savedTheme) return savedTheme;
    }
    return 'light';
  });

  // Contact Modal & Toast state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('personal_theme_v3', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#6366f1', '#ec4899', '#3b82f6'],
    });
  };

  // Handle Share Link
  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
      triggerConfetti();
      setToast({
        message: 'Đã sao chép liên kết trang vào clipboard!',
        type: 'success',
      });
    } catch {
      setToast({
        message: 'Không thể sao chép liên kết, vui lòng copy từ thanh địa chỉ!',
        type: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-[#f8fafc] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-neutral-950 transition-colors duration-300">
      {/* Subtle Ambient Mesh Glow Background */}
      <AmbientBackground />

      {/* Top Sticky Clean Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
        onShare={handleShare}
        fullName={profile.personal.fullName}
      />

      {/* Main Single Clean Portfolio Layout */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <CleanPortfolioLayout
          profile={profile}
          onOpenContact={() => setIsContactOpen(true)}
          showToast={setToast}
          onShare={handleShare}
        />
      </main>

      {/* Minimalist Professional Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-neutral-400 dark:text-neutral-500 border-t border-neutral-200/40 dark:border-neutral-800/40 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center space-x-1.5">
            <span>© {new Date().getFullYear()} {profile.personal.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)'}.</span>
            <span className="hidden sm:inline">• Thiết kế với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span className="hidden sm:inline">Creative Code & Digital Storytelling.</span>
          </p>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
            HUIT TP.HCM • Sẵn sàng nhận dự án & cơ hội hợp tác
          </p>
        </div>
      </footer>

      {/* Contact & Collaboration Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        showToast={setToast}
      />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
