import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfilePhotoFrame from '../ProfilePhotoFrame';
import ProjectsShowcase from '../ProjectsShowcase';
import FeaturedVideoSpotlight from '../FeaturedVideoSpotlight';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import { Sparkles, Music, ExternalLink, Send, ArrowRight, Share2, MapPin, GraduationCap } from 'lucide-react';
import { YouTubeIcon, TikTokIcon, FacebookIcon, InstagramIcon, ZaloIcon } from '../SocialIcons';

export default function SplitLayout({ profile, onOpenContact, showToast, onShare }) {
  const [activeSection, setActiveSection] = useState('projects');

  const navItems = [
    { id: 'split-projects', label: '01 // DỰ ÁN TIÊU BIỂU' },
    { id: 'split-videos', label: '02 // VIDEO SPOTLIGHT' },
    { id: 'split-stats', label: '03 // THÀNH TÍCH & STATS' },
    { id: 'split-socials', label: '04 // KÊNH MẠNG XÃ HỘI' },
    { id: 'split-skills', label: '05 // KỸ NĂNG & LIÊN HỆ' },
  ];

  // Automatic scroll-spy: tracks current section as user scrolls
  useEffect(() => {
    const sectionIds = ['split-projects', 'split-videos', 'split-stats', 'split-socials', 'split-skills'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id.replace('split-', ''));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id.replace('split-', ''));
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="lg:flex lg:gap-10 xl:gap-16 relative">
      {/* LEFT COLUMN: Fixed Sticky Profile Sidebar on Desktop */}
      <aside className="lg:w-[40%] xl:w-[38%] shrink-0 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:flex lg:flex-col lg:justify-between space-y-8 lg:space-y-0 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-r border-neutral-200/60 dark:border-neutral-800/60 lg:pr-8">
        {/* Top Info */}
        <div className="space-y-4">
          {/* Stylish Portrait Photo Frame */}
          <ProfilePhotoFrame personal={profile.personal} className="mb-1" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>PORTFOLIO 2-COLUMN // VERCEL STYLE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            {profile.personal?.fullName || 'Nguyễn Hoàng Hải Đăng'}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-cyan-600 dark:text-cyan-400">
            {profile.personal?.title || 'Content Creator & Digital Storyteller'}
          </p>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {profile.personal?.bio || 'Đam mê sáng tạo nội dung số, kể chuyện truyền cảm hứng và phát triển các sản phẩm web tương tác.'}
          </p>

          <div className="pt-2 text-xs text-neutral-500 space-y-1 font-mono">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Đại học Công Thương TP.HCM (HUIT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span>TP. Hồ Chí Minh, Việt Nam</span>
            </div>
          </div>
        </div>

        {/* Center: Anchor Navigation (Desktop Only) */}
        <nav className="hidden lg:block py-6 space-y-2">
          {navItems.map((item) => {
            const isCurrent = activeSection === item.id.replace('split-', '');
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group flex items-center gap-3 text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isCurrent
                    ? 'text-cyan-500 dark:text-cyan-400 font-bold translate-x-2'
                    : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-white'
                }`}
              >
                <span
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-10 bg-cyan-500 dark:bg-cyan-400'
                      : 'w-4 bg-neutral-300 dark:bg-neutral-700 group-hover:w-8 group-hover:bg-neutral-500'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom: Fast Actions & Mini Socials */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenContact}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi lời mời hợp tác</span>
            </button>
            {onShare && (
              <button
                onClick={onShare}
                className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 cursor-pointer transition-colors"
                title="Chia sẻ trang"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-neutral-500">
            <a
              href="https://www.tiktok.com/@liotapkechuyen"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-cyan-500 transition-colors"
              title="TikTok Kể Chuyện"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-red-500 transition-colors"
              title="YouTube LIO"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/share/19JS9Xy3rN/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-blue-500 transition-colors"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/nguyenhoanghaidanglio"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-pink-500 transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://zalo.me/0862231322"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-cyan-600 transition-colors"
              title="Zalo"
            >
              <ZaloIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN: Independently Scrollable Content Stream */}
      <main className="lg:w-[60%] xl:w-[62%] space-y-16 pt-6 lg:pt-0">
        {/* Section 1: Projects Showcase */}
        <section id="split-projects" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
            <span className="font-mono text-xs font-bold text-cyan-500">01.</span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Dự Án Tiêu Biểu & Ứng Dụng
            </h2>
          </div>
          <ProjectsShowcase showToast={showToast} />
        </section>

        {/* Section 2: Featured Video Spotlight (Interactive Player) */}
        <section id="split-videos" className="scroll-mt-24 space-y-4">
          <FeaturedVideoSpotlight showToast={showToast} />
        </section>

        {/* Section 3: Stats & Achievements */}
        <section id="split-stats" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
            <span className="font-mono text-xs font-bold text-indigo-500">03.</span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Thành Tích & Chỉ Số Phát Triển
            </h2>
          </div>
          <AchievementsStats stats={profile.stats} />
        </section>

        {/* Section 4: Social Hubs */}
        <section id="split-socials" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
            <span className="font-mono text-xs font-bold text-pink-500">04.</span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Kênh Mạng Xã Hội Chính Thức
            </h2>
          </div>
          <SocialLinks links={profile.links} />
        </section>

        {/* Section 5: Skills & Music */}
        <section id="split-skills" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
            <span className="font-mono text-xs font-bold text-emerald-500">05.</span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Kỹ Năng & Giai Điệu Cảm Hứng
            </h2>
          </div>

          <SkillsSection skills={profile.skills} skillCategories={profile.skillCategories} />

          {profile.vibeMusic && (
            <div className="glass-card p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    {profile.vibeMusic.title}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {profile.vibeMusic.artist}
                  </div>
                </div>
              </div>
              <a
                href={profile.vibeMusic.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
              >
                <span>Mở YouTube</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
