import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Radio,
  Command,
  ArrowRight,
  ExternalLink,
  Send,
  Share2,
  Copy,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Play,
  Film,
  Dices,
  Layers,
} from 'lucide-react';
import { YouTubeIcon, TikTokIcon, FacebookIcon, InstagramIcon, ZaloIcon } from './SocialIcons';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onOpenContact,
  onShare,
  onToggleTheme,
  theme,
  soundFX,
  showToast,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Define All Searchable Items
  const items = [
    // 1. Projects
    {
      id: 'proj-drink',
      category: 'Dự Án & Live Apps',
      title: 'Hôm Nay Uống Gì Lio (Live Web App)',
      desc: 'Mở hòm CS2 & thẻ FIFA Online giải cứu cơn phân vân đồ uống',
      icon: Dices,
      badge: 'LIVE DEMO',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      action: () => window.open('https://danglio.github.io/homnayuonggilio/', '_blank'),
    },
    {
      id: 'proj-cenkin',
      category: 'Dự Án & Live Apps',
      title: 'Cenkin Radar & Locket Check-in',
      desc: 'Định vị radar 360 độ và va chạm Bump vật lý kết nối bạn bè',
      icon: Radio,
      badge: 'R&D LAB',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      action: () => {
        const el = document.getElementById('projects') || document.getElementById('split-projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'proj-ai',
      category: 'Dự Án & Live Apps',
      title: 'Autonomous AI Company OS',
      desc: 'Hệ điều hành Multi-Agent tự động hóa trên Apple Silicon M2 Pro',
      icon: Layers,
      badge: 'ARCHITECTURE',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      action: () => {
        const el = document.getElementById('projects') || document.getElementById('split-projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },

    // 2. Videos
    {
      id: 'vid-yt',
      category: 'Thước Phim & Kể Chuyện',
      title: 'Kênh YouTube 4K LIO (@lio_tsv)',
      desc: 'Phân tích tư duy thời đại số, công nghệ AI và góc nhìn xã hội',
      icon: YouTubeIcon,
      badge: '15 TẬP 4K',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      action: () => window.open('https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ', '_blank'),
    },
    {
      id: 'vid-tiktok-story',
      category: 'Thước Phim & Kể Chuyện',
      title: 'TikTok Lio Tập Kể Chuyện',
      desc: 'Podcast chia sẻ bài học nhân sinh & mẹo giải quyết cuộc sống',
      icon: TikTokIcon,
      badge: '5K+ VIEWS',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      action: () => window.open('https://www.tiktok.com/@liotapkechuyen', '_blank'),
    },
    {
      id: 'vid-tiktok-personal',
      category: 'Thước Phim & Kể Chuyện',
      title: 'TikTok Cá Nhân @nguyndang0802',
      desc: 'Khoảnh khắc đời thường, visual xu hướng & hậu trường sáng tạo',
      icon: TikTokIcon,
      badge: '45K+ VIEWS',
      badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      action: () => window.open('https://www.tiktok.com/@nguyndang0802', '_blank'),
    },

    // 3. Socials
    {
      id: 'soc-zalo',
      category: 'Kết Nối & Mạng Xã Hội',
      title: 'Nhắn Tin Zalo Trực Tiếp',
      desc: 'Trao đổi công việc và kết nối trực tiếp cùng Lio qua Zalo',
      icon: ZaloIcon,
      badge: 'CHAT NHANH',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      action: () => window.open('https://zalo.me/0862231322', '_blank'),
    },
    {
      id: 'soc-fb',
      category: 'Kết Nối & Mạng Xã Hội',
      title: 'Facebook Cá Nhân (Đăng Lio)',
      desc: 'Giao lưu đời thực, cập nhật bài viết cuộc sống & bạn bè',
      icon: FacebookIcon,
      badge: 'FACEBOOK',
      badgeColor: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      action: () => window.open('https://www.facebook.com/share/19JS9Xy3rN/', '_blank'),
    },
    {
      id: 'soc-ig',
      category: 'Kết Nối & Mạng Xã Hội',
      title: 'Instagram @nguyenhoanghaidanglio',
      desc: 'Kho ảnh nghệ thuật Canon, visual cuốn hút & phong cách sống',
      icon: InstagramIcon,
      badge: 'INSTAGRAM',
      badgeColor: 'bg-pink-600/20 text-pink-400 border-pink-600/30',
      action: () => window.open('https://www.instagram.com/nguyenhoanghaidanglio/', '_blank'),
    },

    // 4. Quick Actions
    {
      id: 'act-contact',
      category: 'Thao Tác Nhanh',
      title: 'Gửi Lời Mời Hợp Tác',
      desc: 'Mở form đặt lịch, booking chiến dịch hoặc trao đổi ý tưởng',
      icon: Send,
      badge: 'LIÊN HỆ',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      action: () => {
        onClose();
        onOpenContact?.();
      },
    },
    {
      id: 'act-share',
      category: 'Thao Tác Nhanh',
      title: 'Chia Sẻ Trang Web Này',
      desc: 'Sao chép liên kết landing page vào clipboard kèm pháo hoa',
      icon: Share2,
      badge: 'CLIPBOARD',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      action: () => {
        onClose();
        onShare?.();
      },
    },
    {
      id: 'act-copy-email',
      category: 'Thao Tác Nhanh',
      title: 'Sao Chép Email: contact@danglio.com',
      desc: 'Copy hòm thư hợp tác & booking chính thức của Lio',
      icon: Copy,
      badge: 'EMAIL',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      action: async () => {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText('contact@danglio.com');
          soundFX?.playSuccess();
          showToast?.({ message: 'Đã sao chép email contact@danglio.com vào clipboard!', type: 'success' });
        }
        onClose();
      },
    },
    {
      id: 'act-theme',
      category: 'Thao Tác Nhanh',
      title: `Chuyển sang giao diện ${theme === 'dark' ? 'Sáng (Light)' : 'Tối (Dark)'}`,
      desc: 'Thay đổi chế độ màu sắc hiển thị của trang web',
      icon: theme === 'dark' ? Sun : Moon,
      badge: 'THEME',
      badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      action: () => {
        onToggleTheme?.();
        soundFX?.playClick();
        onClose();
      },
    },
    {
      id: 'act-sound',
      category: 'Thao Tác Nhanh',
      title: soundFX?.isMuted ? 'Bật âm thanh vi mô (Unmute Sound FX)' : 'Tắt âm thanh vi mô (Mute Sound FX)',
      desc: 'Bật hoặc tắt hiệu ứng click và pop Web Audio trên web',
      icon: soundFX?.isMuted ? Volume2 : VolumeX,
      badge: 'AUDIO FX',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      action: () => {
        soundFX?.toggleMute();
        onClose();
      },
    },
  ];

  // Filter items by search query
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Auto focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
      soundFX?.playClick();
    }
  }, [isOpen, soundFX]);

  // Keyboard Navigation: ArrowUp, ArrowDown, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFX?.playHover();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFX?.playHover();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          soundFX?.playClick();
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, soundFX]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md"
          />

          {/* Raycast Spatial Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white/90 dark:bg-[#121217]/95 backdrop-blur-2xl border border-neutral-300/80 dark:border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-neutral-200/80 dark:border-white/10 gap-3">
              <Search className="w-5 h-5 text-cyan-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Tìm kiếm dự án, video, mạng xã hội, lệnh nhanh..."
                className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
              />
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-neutral-200/70 dark:bg-white/10 text-[10px] font-mono text-neutral-500 dark:text-neutral-300">
                ESC để thoát
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Search className="w-8 h-8 text-neutral-400 mx-auto opacity-50" />
                  <p className="text-sm font-semibold text-neutral-500">
                    Không tìm thấy kết quả nào cho "{query}"
                  </p>
                  <p className="text-xs text-neutral-400">
                    Thử tìm với "uống gì", "youtube", "tiktok", "email" hoặc "zalo"
                  </p>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                        soundFX?.playHover();
                      }}
                      onClick={() => {
                        soundFX?.playClick();
                        item.action();
                      }}
                      className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-white/20 dark:bg-neutral-900/10 text-white dark:text-neutral-900'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold truncate">
                            {item.title}
                          </div>
                          <div
                            className={`text-[11px] truncate ${
                              isSelected
                                ? 'text-white/80 dark:text-neutral-700'
                                : 'text-neutral-500 dark:text-neutral-400'
                            }`}
                          >
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? 'bg-white/20 text-white dark:text-neutral-900 dark:bg-neutral-900/10 border-transparent'
                              : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isSelected
                              ? 'translate-x-0.5 opacity-100'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2 bg-neutral-100/70 dark:bg-neutral-900/70 border-t border-neutral-200/80 dark:border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 shadow-2xs border border-neutral-300 dark:border-neutral-700">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 shadow-2xs border border-neutral-300 dark:border-neutral-700">↓</kbd>
                  <span>Điều hướng</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 shadow-2xs border border-neutral-300 dark:border-neutral-700">↵</kbd>
                  <span>Chọn</span>
                </span>
              </div>
              <span className="text-cyan-500 font-bold">Lio Spotlight v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
