import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal';
import SoundtrackPlayer from './components/SoundtrackPlayer';
import Toast from './components/Toast';
import { useProfileData } from './hooks/useProfileData';
import { Heart } from 'lucide-react';

// Layout Switcher and 7 Layout Components
import LayoutSwitcherBar, { LAYOUT_OPTIONS } from './components/layouts/LayoutSwitcherBar';
import ClassicLayout from './components/layouts/ClassicLayout';
import BentoLayout from './components/layouts/BentoLayout';
import SplitLayout from './components/layouts/SplitLayout';
import TabsLayout from './components/layouts/TabsLayout';
import MinimalBioLayout from './components/layouts/MinimalBioLayout';
import MacOSLayout from './components/layouts/MacOSLayout';
import EditorialLayout from './components/layouts/EditorialLayout';

export default function App() {
  const { profile } = useProfileData();

  // Dark Mode is active by default automatically
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('personal_theme_v2');
      if (savedTheme) return savedTheme;
    }
    return 'dark';
  });

  // Active Layout Demo State (persisted to localStorage)
  const [activeLayout, setActiveLayout] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLayout = localStorage.getItem('lio_active_layout_preview');
      if (savedLayout && LAYOUT_OPTIONS.some((l) => l.id === savedLayout)) {
        return savedLayout;
      }
    }
    return 'split'; // Default to user preferred Split-Screen 2-Column layout
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
    localStorage.setItem('personal_theme_v2', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Switch Layout Handler
  const handleSelectLayout = (layoutId) => {
    setActiveLayout(layoutId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lio_active_layout_preview', layoutId);
    }
    const layoutObj = LAYOUT_OPTIONS.find((l) => l.id === layoutId);
    setToast({
      message: `Đã chuyển sang: ${layoutObj?.name || layoutId}`,
      type: 'success',
    });
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#6366f1', '#06b6d4', '#ec4899', '#3b82f6', '#10b981'],
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
    <div className="min-h-screen relative flex flex-col justify-between bg-[#f8fafc] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-neutral-950 transition-colors duration-300 pb-24">
      {/* Dynamic Ambient Mesh Glow Background */}
      <AmbientBackground />

      {/* Top Sticky Navbar with Lio. brand and pill dock */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
        onShare={handleShare}
        fullName={profile.personal.fullName}
      />

      {/* Main Content Area: Renders Active Layout Demo */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayout}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            {activeLayout === 'classic' && (
              <ClassicLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}

            {activeLayout === 'bento' && (
              <BentoLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}

            {activeLayout === 'split' && (
              <SplitLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}

            {activeLayout === 'tabs' && (
              <TabsLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}

            {activeLayout === 'minimal' && (
              <MinimalBioLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}

            {activeLayout === 'macos' && (
              <MacOSLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}

            {activeLayout === 'editorial' && (
              <EditorialLayout
                profile={profile}
                onOpenContact={() => setIsContactOpen(true)}
                showToast={setToast}
                onShare={handleShare}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimalist Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-neutral-400 dark:text-neutral-500 border-t border-neutral-200/40 dark:border-neutral-800/40 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center space-x-1.5">
            <span>© {new Date().getFullYear()} {profile.personal.fullName || 'Nguyễn Hoàng Hải Đăng (Lio)'}.</span>
            <span className="hidden sm:inline">• Thiết kế với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span className="hidden sm:inline">3D Lanyard & Cyber Minimalist.</span>
          </p>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
            Dữ liệu cá nhân được lưu trữ bảo mật trực tiếp trên trình duyệt
          </p>
        </div>
      </footer>

      {/* Floating Interactive Layout Switcher Dock */}
      <LayoutSwitcherBar
        activeLayout={activeLayout}
        onSelectLayout={handleSelectLayout}
      />

      {/* Contact & Collaboration Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        showToast={setToast}
      />

      {/* Interactive Web Audio Lo-Fi Soundtrack Player */}
      <SoundtrackPlayer />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
