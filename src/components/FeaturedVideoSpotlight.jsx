import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  ExternalLink,
  Flame,
  Eye,
  Tv,
  CheckCircle2,
  Film,
  Volume2,
  Share2,
} from 'lucide-react';
import { YouTubeIcon, TikTokIcon } from './SocialIcons';

export const FEATURED_VIDEOS = [
  {
    id: 'yt-analysis',
    platform: 'youtube',
    badge: 'YOUTUBE 4K // PHÂN TÍCH TƯ DUY',
    title: 'Giai Điệu & Tư Duy Sáng Tạo Trong Kỷ Nguyên AI',
    creator: 'LIO (@lio_tsv)',
    description: 'Video dài tập phân tích góc nhìn xã hội hiện đại, công nghệ AI và cách tư duy kể chuyện số định hình nội dung tương lai.',
    stats: {
      views: '850+ Views',
      format: '4K Ultra HD',
      status: '47 Video 4K • 14 Subs',
    },
    youtubeId: 'heb1jkNWCyM', // Curated video stream
    url: 'https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ',
    accentColor: 'from-red-500/20 to-orange-500/10',
    tagColor: 'text-red-500 bg-red-500/10 border-red-500/20',
  },
  {
    id: 'tiktok-story',
    platform: 'tiktok',
    badge: 'TIKTOK // LIO TẬP KỂ CHUYỆN',
    title: 'Những Bài Học & Góc Nhìn Lắng Đọng Cuộc Sống',
    creator: '@liotapkechuyen',
    description: 'Chuỗi video Podcast & Storytelling ngắn chia sẻ những trăn trở của người trẻ, mẹo vượt qua áp lực và cách tìm lại cảm hứng sống.',
    stats: {
      views: '5,500+ Views',
      format: 'Vertical 9:16',
      status: '429 Tim Thật • 34 Video',
    },
    youtubeId: 'heb1jkNWCyM',
    url: 'https://www.tiktok.com/@liotapkechuyen',
    accentColor: 'from-cyan-500/20 to-blue-500/10',
    tagColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    id: 'tiktok-viral',
    platform: 'tiktok',
    badge: 'TIKTOK // KÊNH CÁ NHÂN 48K VIEWS',
    title: 'Khoảnh Khắc Đời Thường & Visual Xu Hướng',
    creator: '@nguyndang0802',
    description: 'Kênh cá nhân chia sẻ phong cách sống Gen Z, trải nghiệm học tập tại HUIT và hậu trường thực hiện các dự án sáng tạo.',
    stats: {
      views: '48,000+ Views',
      format: 'Viral Trends',
      status: '4,321 Lượt Thích',
    },
    youtubeId: 'heb1jkNWCyM',
    url: 'https://www.tiktok.com/@nguyndang0802',
    accentColor: 'from-pink-500/20 to-rose-500/10',
    tagColor: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
];

export default function FeaturedVideoSpotlight({ showToast }) {
  const [selectedVideo, setSelectedVideo] = useState(FEATURED_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false); // Reset play state so thumbnail shows with option to start
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
            <Film className="w-3.5 h-3.5 text-cyan-500" />
            <span>Curated Video Spotlight</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Thước Phim & Kể Chuyện Số</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold uppercase">
              Xem Trực Tiếp
            </span>
          </h2>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Tuyển tập các clip tiêu biểu đại diện cho tư duy hình ảnh của Lio
        </p>
      </div>

      {/* Main Theater Card */}
      <div className="glass-card rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-xl relative glow-hover">
        {/* Ambient lighting behind the video player */}
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${selectedVideo.accentColor} rounded-full blur-3xl pointer-events-none opacity-60`} />

        {/* Top Video Player Container */}
        <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full group/player flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(true)}>
              {/* Cover Video Thumbnail (HQ YouTube Thumbnail) */}
              <img
                src={`https://img.youtube.com/vi/${selectedVideo.youtubeId}/maxresdefault.jpg`}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-80 group-hover/player:opacity-95 transition-opacity duration-500 group-hover/player:scale-105"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${selectedVideo.youtubeId}/hqdefault.jpg`;
                }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

              {/* Big Animated Play Button */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/90 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/40 backdrop-blur-md border border-white/30 group-hover/player:bg-cyan-400 transition-colors"
              >
                <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-white" />
              </motion.div>

              {/* Top Overlay Badges */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${selectedVideo.tagColor}`}>
                  {selectedVideo.badge}
                </span>
              </div>

              {/* Bottom Quick Bar inside thumbnail */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 font-mono text-[11px] text-white/90">
                  <span className="flex items-center gap-1 font-bold text-cyan-400">
                    <Eye className="w-3.5 h-3.5" /> {selectedVideo.stats.views}
                  </span>
                  <span>•</span>
                  <span>{selectedVideo.stats.status}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-mono">
                  Bấm để phát ngay
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Video Info & Controls Panel */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {selectedVideo.platform === 'youtube' ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                    <YouTubeIcon className="w-4 h-4" />
                    <span>YouTube Channel</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-neutral-900 dark:text-white">
                    <TikTokIcon className="w-4 h-4" />
                    <span>TikTok Official</span>
                  </span>
                )}
                <span className="text-neutral-400 text-xs">• {selectedVideo.creator}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                {selectedVideo.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>

            {/* Direct Channel External Link */}
            <div className="shrink-0 flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 shadow-md transition-all cursor-pointer"
              >
                <span>Xem trên {selectedVideo.platform === 'youtube' ? 'YouTube' : 'TikTok'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Playlist Video Selector */}
          <div className="pt-3 border-t border-neutral-200/50 dark:border-white/5">
            <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Chọn Thước Phim Muốn Xem:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {FEATURED_VIDEOS.map((video) => {
                const isSelected = selectedVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-md'
                        : 'bg-white/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200/70 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0">
                      {isSelected ? (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Film className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">
                        {video.creator}
                      </div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-white/80 dark:text-neutral-700' : 'text-neutral-400'}`}>
                        {video.stats.views}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
