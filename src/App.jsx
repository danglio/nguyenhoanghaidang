import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import HeroProfile from './components/HeroProfile';
import AchievementsStats from './components/AchievementsStats';
import SocialLinks from './components/SocialLinks';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import { useProfileData } from './hooks/useProfileData';
import { Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const {
    profile,
    updateProfile,
    resetProfile,
    exportProfileJSON,
    importProfileJSON,
  } = useProfileData();

  // Dark / Light Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('personal_theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Edit Modal & Toast state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('personal_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
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
    } catch (err) {
      setToast({
        message: 'Không thể sao chép liên kết, vui lòng copy từ thanh địa chỉ!',
        type: 'error',
      });
    }
  };

  // Handle Save Profile
  const handleSaveProfile = (newProfile) => {
    const success = updateProfile(newProfile);
    if (success) {
      triggerConfetti();
      setToast({
        message: 'Đã cập nhật hồ sơ cá nhân thành công!',
        type: 'success',
      });
    } else {
      setToast({
        message: 'Có lỗi xảy ra khi lưu vào bộ nhớ!',
        type: 'error',
      });
    }
  };

  // Handle Reset Profile
  const handleResetProfile = () => {
    resetProfile();
    setToast({
      message: 'Đã khôi phục dữ liệu mẫu ban đầu!',
      type: 'info',
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950">
      {/* Dynamic Ambient Mesh Glow Background */}
      <AmbientBackground />

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenEdit={() => setIsEditOpen(true)}
        onShare={handleShare}
        fullName={profile.personal.fullName}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full pb-10">
        {/* Hero Profile Section */}
        <HeroProfile personal={profile.personal} />

        {/* Bento Highlights / Achievements */}
        <AchievementsStats stats={profile.stats} />

        {/* Social Channels & Links */}
        <SocialLinks links={profile.links} />

        {/* Action Callout / Footer Share */}
        <div className="flex justify-center mt-6 px-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold glass-card border border-neutral-200/80 dark:border-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4 text-indigo-500" />
            <span>Chia sẻ trang này</span>
          </motion.button>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500 border-t border-neutral-200/40 dark:border-neutral-800/40">
        <p className="flex items-center justify-center space-x-1">
          <span>© {new Date().getFullYear()} {profile.personal.fullName || 'Alex'}. Thiết kế với</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          <span>phong cách Notion & Apple.</span>
        </p>
      </footer>

      {/* Edit Profile Modal */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
        onExport={exportProfileJSON}
        onImport={importProfileJSON}
        showToast={setToast}
      />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
