import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import LargeProfileCard from './components/LargeProfileCard';
import ProfileOverview from './components/ProfileOverview';
import AchievementsStats from './components/AchievementsStats';
import SkillsSection from './components/SkillsSection';
import SocialLinks from './components/SocialLinks';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import { useProfileData } from './hooks/useProfileData';
import { Heart, Share2, Sparkles, Send } from 'lucide-react';
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
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
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
    } catch {
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

      {/* Main Content Area: Wide Grid Layout */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Large Prominent Photo & Live Widgets (5 columns on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <LargeProfileCard
              personal={profile.personal}
              vibeMusic={profile.vibeMusic}
              onOpenEdit={() => setIsEditOpen(true)}
              onShare={handleShare}
              showToast={setToast}
            />
          </div>

          {/* RIGHT COLUMN: Headline, Dynamic Roles, Bio, Stats, Skills & Social Links (7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Overview / Animated Roles & Bio Intro */}
            <ProfileOverview personal={profile.personal} />

            {/* Bento Highlights / Achievements */}
            <AchievementsStats stats={profile.stats} />

            {/* Arsenal & Core Skills Section */}
            <SkillsSection skills={profile.skills} />

            {/* Social Channels & Links 2-Column Grid */}
            <SocialLinks links={profile.links} />

            {/* Callout Action Banner */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 glow-hover">
              <div className="flex items-center space-x-3.5 text-center sm:text-left">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Muốn kết nối hoặc hợp tác cùng tôi?
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Khám phá các kênh phía trên hoặc sao chép nhanh liên kết trang để chia sẻ nhé!
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="shrink-0 flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md glow-btn transition-all"
              >
                <Share2 className="w-4 h-4 text-indigo-500" />
                <span>Chia sẻ trang</span>
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500 border-t border-neutral-200/40 dark:border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} {profile.personal.fullName || 'Alex'}.</span>
            <span className="hidden sm:inline">• Thiết kế với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span className="hidden sm:inline">phong cách Notion & Apple.</span>
          </p>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
            Dữ liệu cá nhân được lưu trữ bảo mật trực tiếp trên trình duyệt
          </p>
        </div>
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
