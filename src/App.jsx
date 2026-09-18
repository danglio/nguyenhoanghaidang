import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import HeroLanyard from './components/HeroLanyard';
import AchievementsStats from './components/AchievementsStats';
import SkillsSection from './components/SkillsSection';
import SocialLinks from './components/SocialLinks';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import { useProfileData } from './hooks/useProfileData';
import { Heart, Sparkles, Share2, Music } from 'lucide-react';
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
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-neutral-950">
      {/* Dynamic Ambient Mesh Glow Background */}
      <AmbientBackground />

      {/* Top Sticky Navbar with Lio. brand and pill dock */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenEdit={() => setIsEditOpen(true)}
        onShare={handleShare}
        fullName={profile.personal.fullName}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 sm:space-y-20">
        {/* SECTION 1: HOME (#home) - 3D Lanyard Hero & Davin Pill Links */}
        <section id="home" className="relative scroll-mt-20">
          <HeroLanyard
            personal={profile.personal}
            links={profile.links}
            profile={profile}
            onOpenEdit={() => setIsEditOpen(true)}
            showToast={setToast}
          />
        </section>

        {/* SECTION 2: SOCIAL CHANNELS & CREATIVE HUBS (#socials) */}
        <section id="socials" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Connect & Follow</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                Kênh Sáng Tạo & Mạng Xã Hội
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Khám phá các video storytelling, dự án web & kênh chia sẻ chính thức của Lio
            </p>
          </div>

          {/* Social Links Cards Grid */}
          <SocialLinks links={profile.links} />
        </section>

        {/* SECTION 3: SKILLS & MILESTONES (#skills) */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Expertise & Milestones</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                Thành Tích & Kỹ Năng Sáng Tạo
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Hành trình xây dựng nội dung số, các chỉ số phát triển và bộ công cụ thực chiến
            </p>
          </div>

          {/* Bento Stats / Achievements */}
          <AchievementsStats stats={profile.stats} />

          {/* Skills Tag Pills */}
          <SkillsSection skills={profile.skills} />

          {/* Vibe Music Player Widget */}
          {profile.vibeMusic && (
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between shadow-sm glow-hover">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Giai điệu sáng tạo cảm hứng</span>
                  </div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                    {profile.vibeMusic.title}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {profile.vibeMusic.artist}
                  </div>
                </div>
              </div>

              {/* Animated Equalizer Soundwave Bars */}
              <div className="flex items-end space-x-1 h-5 shrink-0 pl-3">
                <span className="w-1 rounded-full bg-emerald-500 animate-wave-1" />
                <span className="w-1 rounded-full bg-emerald-400 animate-wave-2" />
                <span className="w-1 rounded-full bg-emerald-500 animate-wave-3" />
                <span className="w-1 rounded-full bg-emerald-400 animate-wave-4" />
              </div>
            </div>
          )}

          {/* Callout Action Banner */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 glow-hover text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                  Muốn kết nối hoặc hợp tác cùng Lio?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Theo dõi các kênh sáng tạo phía trên hoặc sao chép nhanh liên kết hồ sơ để chia sẻ nhé!
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="shrink-0 flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md glow-btn transition-all"
            >
              <Share2 className="w-4 h-4 text-indigo-500" />
              <span>Chia sẻ trang</span>
            </motion.button>
          </div>
        </section>
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
