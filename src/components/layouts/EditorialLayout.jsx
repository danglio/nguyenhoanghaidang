import React from 'react';
import { motion } from 'framer-motion';
import HeroLanyard from '../HeroLanyard';
import ProjectsShowcase from '../ProjectsShowcase';
import AchievementsStats from '../AchievementsStats';
import SkillsSection from '../SkillsSection';
import SocialLinks from '../SocialLinks';
import { Music, BookOpen, Quote, Send, ArrowRight, Share2, Compass, Feather } from 'lucide-react';
import { YouTubeIcon } from '../SocialIcons';

export default function EditorialLayout({ profile, onOpenContact, showToast, onShare }) {
  return (
    <div className="space-y-20 max-w-5xl mx-auto">
      {/* Editorial Title Header */}
      <header className="text-center space-y-4 pt-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <Feather className="w-3.5 h-3.5" />
          <span>EDITORIAL STORYTELLER // VOL. 2025</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
          Kể Chuyện Bằng Hình Ảnh, <br className="hidden sm:inline" />
          Chạm Bằng Cảm Xúc.
        </h1>

        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 text-neutral-500 italic text-sm sm:text-base">
          <Quote className="w-5 h-5 text-cyan-500 shrink-0 inline opacity-60" />
          <span>
            "Tôi là Lio — Sinh năm 2008, sinh viên HUIT. Tôi tin rằng mỗi câu chuyện, nếu được kể bằng sự chân thành kết hợp với công nghệ web tương tác, đều có sức mạnh kết nối phi thường."
          </span>
        </div>
      </header>

      {/* CHƯƠNG 01: BẢN SẮC & THẺ NHẬN DIỆN */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-black text-cyan-500 uppercase tracking-widest px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            CHƯƠNG 01
          </span>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Bản Sắc Kỹ Thuật Số & Không Gian Sáng Tạo
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-5 sm:p-8 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md">
          <HeroLanyard
            personal={profile.personal}
            links={profile.links}
            profile={profile}
            onOpenContact={onOpenContact}
            showToast={showToast}
          />
        </div>
      </section>

      {/* CHƯƠNG 02: NHỮNG DÒNG CHẢY NỘI DUNG */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-black text-indigo-500 uppercase tracking-widest px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            CHƯƠNG 02
          </span>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Những Kênh Sáng Tạo Kết Nối Khán Giả
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Từ những thước phim TikTok ngắn 45K+ views đến video 4K dài phân tích tư duy trên YouTube, mỗi kênh là một cánh cửa mở ra thế giới quan của Lio:
        </p>
        <SocialLinks links={profile.links} />
      </section>

      {/* CHƯƠNG 03: SẢN PHẨM & THỬ NGHIỆM TƯƠNG TÁC */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-black text-pink-500 uppercase tracking-widest px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20">
            CHƯƠNG 03
          </span>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Phòng Thí Nghiệm Web & Trải Nghiệm Tương Tác
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Không chỉ dừng ở nội dung video, tôi đưa ý tưởng vào mã nguồn để tạo nên các ứng dụng như Cenkin Radar Check-in hay Apple Pro Showcase:
        </p>
        <ProjectsShowcase showToast={showToast} />
      </section>

      {/* CHƯƠNG 04: CHỈ SỐ PHÁT TRIỂN & KỸ NĂNG */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-black text-emerald-500 uppercase tracking-widest px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            CHƯƠNG 04
          </span>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Những Con Số Đằng Sau Hành Trình (55K+ Views)
          </h2>
        </div>
        <AchievementsStats stats={profile.stats} />
        <SkillsSection skills={profile.skills} />
      </section>

      {/* LỜI KẾT & KÊU GỌI ĐỒNG HÀNH */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6 animate-spin-slow" />
        </div>
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
            Cùng Viết Tiếp Những Câu Chuyện Mới
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500">
            Tôi luôn sẵn sàng đón nhận những lời mời hợp tác sáng tạo nội dung, sản xuất video, hoặc cùng xây dựng các dự án công nghệ thú vị.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg cursor-pointer hover:opacity-95"
          >
            <Send className="w-4 h-4" />
            <span>Gửi lời mời hợp tác ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
