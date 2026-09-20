import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight,
  Dices,
  Flame,
  Radio,
  Tv,
  Coffee,
  Box,
  Layers,
  Award,
  Play,
  Share2,
  Lock,
  Eye,
  ShieldAlert,
  Cpu,
  Workflow,
  Camera,
  Server,
} from 'lucide-react';
import { YouTubeIcon, TikTokIcon, FacebookIcon } from './SocialIcons';
import SpotifyAlbumShowcase from './SpotifyAlbumShowcase';
import LocalProjectModal, { buildProjectSummary } from './LocalProjectModal';

export const LOCAL_PROJECTS = {
  cenkin: {
    id: 'cenkin',
    title: 'Cenkin (Locket & Zenly Radar Check-in)',
    subtitle: 'Nền tảng định vị bạn bè thời gian thực kết hợp widget ảnh Locket màn hình khóa và cơ chế Bump vật lý kết nối tức thì.',
    badge: '🔒 BẢN LOCAL // NỘI BỘ',
    status: 'Private Dev Environment',
    disclaimer: 'Dự án hiện đang vận hành trên máy chủ phát triển nội bộ (Localhost). Phiên bản dùng thử trực tiếp (Live Demo) công khai hiện chưa được mở trên Internet để bảo mật tài nguyên máy chủ và dữ liệu định vị người dùng.',
    highlights: [
      'Radar quét vệ tinh bạn bè 360 độ (phong cách Zenly)',
      'Widget ảnh Locket gửi tức thì lên màn hình khóa',
      'Công nghệ va chạm Bump vật lý (Accelerometer) kết nối bạn bè',
      'Đồng bộ hóa vị trí thời gian thực <50ms qua Socket.io',
    ],
    architecture: [
      {
        title: 'Native Geolocation & Bump Sensor',
        desc: 'Truy xuất GPS định kỳ và cảm biến gia tốc nhận diện tương tác đập máy vật lý.',
        tag: 'Client Hardware',
      },
      {
        title: 'Realtime Socket.io & Redux Store',
        desc: 'Truyền nhận tọa độ p2p/room với độ trễ dưới 50ms, chuẩn hóa state vị trí bạn bè trên Redux Toolkit.',
        tag: 'Transport & State',
      },
      {
        title: 'Zenly Radar Canvas Engine',
        desc: 'Tính toán góc phương vị, cự ly và render sóng radar quét 60fps với hiệu ứng âm thanh.',
        tag: 'Rendering Core',
      },
      {
        title: 'Locket Moments Pipeline',
        desc: 'Xử lý nén ảnh camera tối ưu và cập nhật live widget trên thiết bị đối tác.',
        tag: 'Media Service',
      },
    ],
    features: [
      {
        title: 'Zenly Radar Quét 360° Real-time',
        desc: 'Quét và hiển thị tọa độ bạn bè xung quanh với hiệu ứng sóng âm và cự ly thời gian thực.',
      },
      {
        title: 'Locket Camera & Chuỗi Streak',
        desc: 'Chụp và chia sẻ ảnh nhanh với chuỗi hoạt động (Streak) giữ nhiệt kết nối bạn bè.',
      },
      {
        title: 'Cơ Chế Bump Vật Lý',
        desc: 'Chạm nhẹ 2 thiết bị vào nhau để kết bạn và chia sẻ tọa độ tức thì nhờ cảm biến gia tốc kế.',
      },
      {
        title: 'Tiết Kiệm Pin & Chế Độ Ẩn Danh',
        desc: 'Thuật toán Geofencing thông minh tối ưu pin và chế độ Ghost Mode bảo vệ vị trí tùy chọn.',
      },
    ],
    techStack: {
      Frontend: ['React Native Web', 'Redux Toolkit', 'TailwindCSS', 'Framer Motion'],
      Realtime_Sensors: ['Socket.io', 'Zenly Radar GPS', 'Bump Physical Engine', 'Web Geolocation API'],
      Backend: ['Node.js', 'Express', 'Redis Geohash', 'PostGIS'],
    },
  },
  aiCompany: {
    id: 'ai-company-os',
    title: 'Autonomous AI Company OS',
    subtitle: 'Hệ điều hành doanh nghiệp AI tự động hóa hoàn toàn với kiến trúc Multi-Agent phân tầng và xử lý cục bộ.',
    badge: '🔒 BẢN LOCAL // NỘI BỘ',
    status: 'Apple Silicon M2 Pro & Private GPU',
    disclaimer: 'Hệ thống vận hành trên phần cứng nội bộ Apple Silicon M2 Pro và cụm GPU riêng biệt. Hệ thống điều phối toàn diện từ chiến lược đến sản xuất sản phẩm tự động, chưa mở truy cập công khai để bảo vệ dữ liệu bí mật kinh doanh.',
    highlights: [
      'Mô hình điều phối phân tầng: Founder ➜ CEO ➜ PM ➜ Studios',
      'Tối ưu hóa phần cứng Apple Silicon VideoToolbox render 60fps',
      'Tự động hóa từ ý tưởng đến video TVC & landing page hoàn chỉnh',
      'Bảo mật cục bộ 100%, không rò rỉ dữ liệu qua bên thứ ba',
    ],
    architecture: [
      {
        title: 'Founder Directive & Strategic Input',
        desc: 'Tiếp nhận định hướng kinh doanh, KPI và ngân sách từ Founder.',
        tag: 'Directive Layer',
      },
      {
        title: 'CEO Orchestration Agent',
        desc: 'Phân tích mục tiêu, lập kế hoạch tổng thể, cấp vốn và phân bổ task cho các PM chuyên trách.',
        tag: 'Agent Core',
      },
      {
        title: 'PM Task Decomposition & Routing',
        desc: 'Bóc tách backlog, phân chia tài nguyên, giao việc cho Video Studio & Web Studio song song.',
        tag: 'Dispatching',
      },
      {
        title: 'Studio Execution & Local Hardware Acceleration',
        desc: 'Video Studio dựng TVC bằng Apple Silicon VideoToolbox; Web Studio sinh mã & deploy tự động.',
        tag: 'Hardware Acceleration',
      },
    ],
    features: [
      {
        title: 'Hệ Thống Đa Agent Phân Tầng',
        desc: 'CEO Agent giám sát, PM Agent điều phối và các Studio Agent chuyên trách thực thi độc lập.',
      },
      {
        title: 'Tăng Tốc Phần Cứng Apple Silicon',
        desc: 'Tối ưu hóa pipeline xử lý đa phương tiện qua GPU và VideoToolbox trên chip M2 Pro.',
      },
      {
        title: 'Studio Tự Động Hóa Sản Phẩm',
        desc: 'Tự động tạo kịch bản, biên tập video TVC, viết copy và phát triển landing page tự động.',
      },
      {
        title: 'Terminal Giám Sát Realtime',
        desc: 'Log trạng thái chi tiết theo thời gian thực của từng agent với cơ chế tự phục hồi lỗi.',
      },
    ],
    techStack: {
      Frontend: ['Next.js 14', 'shadcn/ui', 'TailwindCSS', 'Framer Motion'],
      AI_Agents: ['Python FastAPI', 'Multi-Agent System', 'LangGraph', 'Local LLM'],
      Hardware_Pipeline: ['Apple Silicon VideoToolbox', 'Metal Performance Shaders', 'FFmpeg GPU Acceleration'],
    },
  },
};

/**
 * Animated Terminal Log Viewer simulating multi-agent rolling activities
 */
function TerminalLogViewer() {
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    { time: '14:20:01', tag: 'FOUNDER', color: 'text-amber-400', msg: 'Directive set: Triển khai chiến dịch Q3' },
    { time: '14:20:02', tag: 'CEO', color: 'text-purple-400', msg: 'Directive received. Lập kế hoạch 4 milestones' },
    { time: '14:20:03', tag: 'PM', color: 'text-cyan-400', msg: 'Dispatched to VideoStudio & WebStudio' },
    { time: '14:20:04', tag: 'VideoStudio', color: 'text-emerald-400', msg: 'Apple Silicon VideoToolbox: 60fps [OK]' },
    { time: '14:20:05', tag: 'WebStudio', color: 'text-blue-400', msg: 'shadcn/ui responsive UI synthesized [READY]' },
    { time: '14:20:06', tag: 'SYSTEM', color: 'text-neutral-400', msg: 'GPU M2 Pro: 32% Load • Latency: 38ms • Status: HEALTHY' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [logs.length]);

  const visibleLogs = [
    logs[(logIndex + logs.length - 2) % logs.length],
    logs[(logIndex + logs.length - 1) % logs.length],
    logs[logIndex],
  ];

  return (
    <div className="rounded-xl bg-neutral-900/95 border border-neutral-800 p-3 space-y-2 font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-rose-500/80 shrink-0" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80 shrink-0" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 shrink-0" />
          <span className="text-[10px] text-neutral-400 ml-1.5 truncate">terminal@ai-company-os: ~</span>
        </div>
        <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold shrink-0 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          ONLINE (M2 PRO)
        </span>
      </div>

      <div className="space-y-1 overflow-hidden min-h-[60px]">
        {visibleLogs.map((item, idx) => (
          <div key={idx} className="flex items-start gap-1.5 leading-tight truncate">
            <span className="text-neutral-500 text-[10px]">[{item.time}]</span>
            <span className={`font-bold shrink-0 ${item.color}`}>[{item.tag}]</span>
            <span className="text-neutral-300 truncate">{item.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsShowcase({ showToast }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeLocalProject, setActiveLocalProject] = useState(null);

  const handleCopyLink = async (url, title, key) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);

      if (showToast) {
        showToast({
          message: `Đã sao chép liên kết "${title}" vào clipboard!`,
          type: 'success',
        });
      }
    } catch {
      if (showToast) {
        showToast({
          message: 'Không thể sao chép liên kết, vui lòng thử lại!',
          type: 'error',
        });
      }
    }
  };

  const handleCopyProjectInfo = async (project, key) => {
    try {
      const summary = buildProjectSummary(project);
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = summary;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);

      if (showToast) {
        showToast({
          message: `Đã sao chép thông tin dự án "${project.title}"!`,
          type: 'success',
        });
      }
    } catch {
      if (showToast) {
        showToast({
          message: 'Không thể sao chép thông tin dự án, vui lòng thử lại!',
          type: 'error',
        });
      }
    }
  };

  return (
    <section id="projects" className="space-y-8 scroll-mt-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>✨ FEATURED CREATIVE WORKS // DỰ ÁN & SẢN PHẨM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
            Dự Án Nổi Bật & Tác Phẩm Sáng Tạo
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
          Những sản phẩm web tương tác, series video kể chuyện và nội dung số được Lio dày công phát triển.
        </p>
      </div>

      {/* Cyber-Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* DỰ ÁN 1: HERO FEATURE CARD (FULL 12 COLS / 2 COLS PROMINENCE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-12 glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg glow-card relative overflow-hidden group"
        >
          {/* Ambient Cyber Neon Background Accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>ONLINE DEMO</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <Dices className="w-3 h-3" />
                  <span>CS2 & FIFA Interactive Gacha</span>
                </span>
              </div>

              {/* Title & Headline */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                  Hôm Nay Uống Gì Lio <span className="text-sm sm:text-base font-bold text-neutral-500 dark:text-neutral-400 tracking-normal">(Web App)</span>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Ứng dụng web độc đáo giải cứu cơn phân vân chọn đồ uống bằng vòng quay mở hòm CS2 & thẻ cầu thủ FIFA Online cực kỳ cuốn hút!
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-1">
                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">Chế độ 1</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Box className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mở Hòm CS2</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">Chế độ 2</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Thẻ FIFA Online</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80 col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">Trải nghiệm</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    <span>Âm thanh cực đã</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                  ⚡ Mini Web Game
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                  🎲 CS2 & FIFA Case Simulator
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                  🎨 React & Tailwind
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  🔥 Viral Project
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://danglio.github.io/homnayuonggilio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md glow-btn transition-all group/btn"
                >
                  <span>Trải nghiệm ngay</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-cyan-400 dark:text-indigo-600" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleCopyLink(
                      'https://danglio.github.io/homnayuonggilio/',
                      'Hôm Nay Uống Gì Lio',
                      'hero-app'
                    )
                  }
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                  title="Sao chép liên kết Hôm Nay Uống Gì Lio"
                >
                  {copiedKey === 'hero-app' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Đã chép link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span>Sao chép liên kết</span>
                    </>
                  )}
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://www.facebook.com/share/1AfnEdbkeu/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold glass-card border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-all"
                  title="Ghé thăm Fanpage Facebook Uống Gì Hôm Nay"
                >
                  <FacebookIcon className="w-4 h-4 text-blue-500" />
                  <span>Fanpage Facebook</span>
                </motion.a>
              </div>
            </div>

            {/* Right Mockup Showcase: CS2 Case + FIFA Ultimate Card Hybrid Visual */}
            <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-sm">
                {/* FIFA Ultimate Card Mockup (Angled Back Layer) with Ambient Levitation */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [-3, -1.5, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ y: -10, rotate: 2, scale: 1.03 }}
                  className="absolute -top-4 -right-2 sm:-right-4 w-48 sm:w-52 h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-600 to-yellow-950 p-[2px] shadow-2xl z-10 select-none cursor-pointer transform"
                >
                  <div className="w-full h-full rounded-[14px] bg-neutral-950/90 backdrop-blur-md p-3 flex flex-col justify-between border border-amber-400/40 relative overflow-hidden text-amber-100">
                    {/* Holographic Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none" />

                    {/* Card Top: Rating & Position */}
                    <div className="flex items-start justify-between relative z-10">
                      <div>
                        <div className="text-2xl sm:text-3xl font-black tracking-tighter text-amber-300 leading-none">
                          99
                        </div>
                        <div className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
                          DRINK
                        </div>
                      </div>
                      <div className="p-1 rounded bg-amber-500/20 border border-amber-400/30">
                        <Award className="w-4 h-4 text-amber-300" />
                      </div>
                    </div>

                    {/* Card Center: Icon & Name */}
                    <div className="text-center my-1 relative z-10">
                      <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-300/30 flex items-center justify-center border border-amber-400/50 shadow-inner mb-1.5">
                        <Coffee className="w-7 h-7 text-amber-300 animate-bounce" />
                      </div>
                      <div className="text-xs font-black tracking-wide text-white uppercase truncate drop-shadow">
                        Trà Sữa Trân Châu
                      </div>
                      <div className="text-[9px] font-mono text-amber-300/90 uppercase tracking-wider">
                        ★ BẢN HOÀNG KIM ★
                      </div>
                    </div>

                    {/* Card Bottom: Stats */}
                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-amber-500/30 text-center relative z-10 text-[9px] font-mono">
                      <div>
                        <div className="font-bold text-amber-200">99</div>
                        <div className="text-[7px] text-neutral-400">VIBE</div>
                      </div>
                      <div>
                        <div className="font-bold text-amber-200">98</div>
                        <div className="text-[7px] text-neutral-400">SWEET</div>
                      </div>
                      <div>
                        <div className="font-bold text-amber-200">100</div>
                        <div className="text-[7px] text-neutral-400">ENERGY</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CS2 Crate Mockup (Front Layer) with Counter Ambient Floating */}
                <motion.div
                  animate={{ y: [0, 6, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ y: -6, rotate: -1, scale: 1.03 }}
                  className="relative z-20 w-52 sm:w-56 rounded-2xl bg-neutral-900/95 border-2 border-cyan-500/50 p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl space-y-3 cursor-pointer select-none"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        CS2 WEAPON CASE
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                      ★ SPECIAL
                    </span>
                  </div>

                  {/* Crate Visual Box */}
                  <div className="h-28 rounded-xl bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/60 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]" />
                    <Box className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                    <div className="mt-2 text-[11px] font-bold text-white tracking-wide flex items-center gap-1">
                      <span>Rương Đồ Uống Lio</span>
                    </div>
                  </div>

                  {/* Loot Roulette Ticker Preview */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
                      <span>VẬT PHẨM HIẾM:</span>
                      <span className="text-rose-400 font-bold">COVERT (ĐỎ)</span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-800 overflow-hidden flex">
                      <div className="w-1/4 bg-blue-500" />
                      <div className="w-1/4 bg-purple-500" />
                      <div className="w-1/4 bg-pink-500" />
                      <div className="w-1/4 bg-rose-500 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DỰ ÁN 2: BENTO CARD - CENKIN (LOCKET & ZENLY RADAR CHECK-IN) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md glow-card flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Ambient Emerald & Cyan Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-emerald-500/15 via-cyan-500/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-gradient-to-tr from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Badges Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>🔒 BẢN LOCAL // NỘI BỘ</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                  <Eye className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>👀 CHỈ XEM PREVIEW</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                v1.2.0 • GPS
              </span>
            </div>

            {/* Local Notice Warning Callout */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Bản local chưa cho phép test • Chỉ xem giao diện</span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Cenkin (Locket & Zenly Radar Check-in)
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Nền tảng định vị radar thời gian thực kết hợp widget ảnh Locket màn hình khóa và cơ chế Bump vật lý kết nối tức thì khi va chạm nhẹ điện thoại.
              </p>
            </div>

            {/* Rich Interactive UI Mockup: Zenly Radar 360° + Locket Viewfinder with Streak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-neutral-950/90 border border-neutral-800 shadow-inner">
              {/* 1. Zenly Radar Scan Circle */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-900/80 border border-emerald-500/20 relative overflow-hidden min-h-[170px]">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Concentric rings */}
                  <div className="absolute inset-0 rounded-full border border-emerald-500/30" />
                  <div className="absolute inset-3 rounded-full border border-dashed border-emerald-500/25" />
                  <div className="absolute inset-7 rounded-full border border-emerald-500/20" />
                  {/* Crosshairs */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-emerald-500/20" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-emerald-500/20" />

                  {/* 360 Rotating Radar Beam */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none animate-radar-sweep"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.45) 360deg)',
                    }}
                  />

                  {/* Center user blip */}
                  <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] ring-4 ring-emerald-500/30 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>

                  {/* Blip 1: Friend Ha My */}
                  <div className="absolute top-2.5 right-4 z-10 flex items-center gap-1 group">
                    <div className="relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 block shadow-[0_0_8px_#22d3ee]" />
                      <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-cyan-300 bg-neutral-950/90 px-1.5 py-0.5 rounded border border-cyan-500/40">
                      Ha My (120m)
                    </span>
                  </div>

                  {/* Blip 2: Friend Minh */}
                  <div className="absolute bottom-3 left-2.5 z-10 flex items-center gap-1 group">
                    <div className="relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block shadow-[0_0_8px_#f59e0b]" />
                      <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-amber-300 bg-neutral-950/90 px-1.5 py-0.5 rounded border border-amber-500/40">
                      Minh (450m)
                    </span>
                  </div>
                </div>

                <div className="mt-1.5 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span>Zenly Radar 60fps Scan</span>
                </div>
              </div>

              {/* 2. Locket Camera Viewfinder Frame */}
              <div className="rounded-xl bg-neutral-900/90 border border-neutral-800 p-3 flex flex-col justify-between min-h-[170px] relative overflow-hidden">
                {/* Viewfinder Corner Brackets */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-white/70" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-white/70" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-white/70" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-white/70" />

                {/* Top Bar with Streak */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
                    <Camera className="w-3 h-3 text-white" />
                    <span>LOCKET LIVE</span>
                  </span>

                  {/* Animated 14 Days Streak Badge */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-[10px] shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                  >
                    <Flame className="w-3 h-3 fill-white" />
                    <span>🔥 14 Days Streak</span>
                  </motion.div>
                </div>

                {/* Center Viewfinder Reticle */}
                <div className="my-auto flex flex-col items-center justify-center text-center z-10 py-1">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-800/90 border border-white/20 flex items-center justify-center shadow-inner">
                    <div className="w-7 h-7 rounded-full border border-dashed border-cyan-400/70 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-300 mt-1">
                    Chạm đập máy để Bump
                  </span>
                </div>

                {/* Bottom Bar: Shutter Button and Bump status */}
                <div className="flex items-center justify-between z-10 border-t border-neutral-800/80 pt-1.5">
                  <span className="text-[9px] font-mono text-emerald-400">
                    Bump: Ready
                  </span>
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-white/30 flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-400">
                    Widget Sync
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                React Native Web
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                Redux Toolkit
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                Socket.io
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Zenly Radar GPS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Bump Physical Engine
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-6 relative z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveLocalProject(LOCAL_PROJECTS.cenkin)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/link cursor-pointer"
            >
              <Eye className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
              <span>Xem Chi Tiết & Giao Diện</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCopyProjectInfo(LOCAL_PROJECTS.cenkin, 'cenkin-card')}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              title="Sao chép thông tin dự án Cenkin"
            >
              {copiedKey === 'cenkin-card' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-bold text-xs">Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  <span className="text-xs">Sao chép thông tin</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* DỰ ÁN 3: BENTO CARD - AUTONOMOUS AI COMPANY OS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md glow-card flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Ambient Purple & Rose Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-purple-500/15 via-rose-500/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-gradient-to-tr from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Badges Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>🔒 BẢN LOCAL // NỘI BỘ</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/25">
                  <Eye className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span>👀 CHỈ XEM PREVIEW</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                M2 Pro • Multi-Agent
              </span>
            </div>

            {/* Local Notice Warning Callout */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Hệ thống chạy trên Apple Silicon M2 Pro & GPU nội bộ, bảo mật máy chủ</span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Autonomous AI Company OS
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Hệ điều hành doanh nghiệp AI tự động hóa hoàn toàn với cấu trúc đa Agent phân tầng từ Founder ➜ CEO ➜ PM ➜ Studios, tối ưu hóa phần cứng Apple Silicon M2 Pro.
              </p>
            </div>

            {/* Rich Interactive UI Mockup: Hierarchical Org Tree + Simulated Terminal */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/90 border border-neutral-800 shadow-inner space-y-3">
              {/* Hierarchical Org Tree */}
              <div className="space-y-1.5 text-xs font-mono">
                {/* Founder Node */}
                <div className="flex items-center justify-center">
                  <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="font-bold text-[11px]">Founder (Human Directive)</span>
                  </div>
                </div>

                {/* Vertical Line with Pulse */}
                <div className="w-px h-3 mx-auto bg-gradient-to-b from-amber-500 to-purple-500 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 absolute top-1/2 -left-[2px] -translate-y-1/2 animate-pulse" />
                </div>

                {/* CEO Node */}
                <div className="flex items-center justify-center">
                  <div className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/40 text-purple-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span className="font-bold text-[11px]">CEO Agent (Orchestration & Budget)</span>
                  </div>
                </div>

                {/* Vertical Line with Pulse */}
                <div className="w-px h-3 mx-auto bg-gradient-to-b from-purple-500 to-cyan-500 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute top-1/2 -left-[2px] -translate-y-1/2 animate-pulse" />
                </div>

                {/* PM Node */}
                <div className="flex items-center justify-center">
                  <div className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                    <Workflow className="w-3 h-3 text-cyan-400" />
                    <span className="font-bold text-[11px]">PM Agent (Task Decomposition)</span>
                  </div>
                </div>

                {/* Fork Lines to Studios */}
                <div className="relative h-3 max-w-[220px] mx-auto">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1.5 bg-cyan-500/40" />
                  <div className="absolute top-1.5 left-5 right-5 h-px bg-cyan-500/40" />
                  <div className="absolute top-1.5 left-5 w-px h-1.5 bg-cyan-500/40" />
                  <div className="absolute top-1.5 right-5 w-px h-1.5 bg-cyan-500/40" />
                </div>

                {/* Studios Grid */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col items-center text-center">
                    <div className="text-[11px] font-bold text-white flex items-center gap-1">
                      <Tv className="w-3 h-3 text-emerald-400" />
                      <span>Video Studio</span>
                    </div>
                    <div className="text-[9px] text-neutral-400 mt-0.5 font-mono">
                      Apple Silicon M2 Pro • 60fps
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col items-center text-center">
                    <div className="text-[11px] font-bold text-white flex items-center gap-1">
                      <Layers className="w-3 h-3 text-blue-400" />
                      <span>Web Studio</span>
                    </div>
                    <div className="text-[9px] text-neutral-400 mt-0.5 font-mono">
                      Next.js 14 • shadcn/ui
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Live Terminal */}
              <TerminalLogViewer />
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                Next.js 14
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                Python FastAPI
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                shadcn/ui
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                Apple Silicon VideoToolbox
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Multi-Agent System
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-6 relative z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveLocalProject(LOCAL_PROJECTS.aiCompany)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/link cursor-pointer"
            >
              <Eye className="w-4 h-4 text-purple-400 dark:text-purple-600" />
              <span>Xem Chi Tiết & Giao Diện</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCopyProjectInfo(LOCAL_PROJECTS.aiCompany, 'ai-company-card')}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              title="Sao chép thông tin dự án Autonomous AI Company OS"
            >
              {copiedKey === 'ai-company-card' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-bold text-xs">Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  <span className="text-xs">Sao chép thông tin</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* DỰ ÁN 4: BENTO CARD - SERIES PODCAST LIO TẬP KỂ CHUYỆN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md glow-card flex flex-col justify-between relative overflow-hidden group"
        >
          {/* TikTok Ambient Cyan / Magenta Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-cyan-500/15 via-pink-500/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="space-y-4 relative z-10">
            {/* Platform & Type Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok Short-Form Series</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                @liotapkechuyen
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Series Podcast: "Lio Tập Kể Chuyện"
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Nơi chia sẻ những mẩu chuyện đời thường, góc nhìn sâu lắng và thông điệp tích cực chạm đến trái tim người nghe.
              </p>
            </div>

            {/* Stylized Podcast Audio Visualizer Widget */}
            <div className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    Lio Tập Kể Chuyện
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Podcast & Audio Storytelling
                  </div>
                </div>
              </div>

              {/* Animated Soundwave Equalizer */}
              <div className="flex items-end space-x-1 h-5 pr-2">
                <span className="w-1 rounded-full bg-cyan-400 animate-wave-1" />
                <span className="w-1 rounded-full bg-pink-400 animate-wave-2" />
                <span className="w-1 rounded-full bg-cyan-400 animate-wave-3" />
                <span className="w-1 rounded-full bg-pink-500 animate-wave-4" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                🎙️ Storytelling
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                📱 TikTok Short Form
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                💙 Tích Cực
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-6 relative z-10">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.tiktok.com/@liotapkechuyen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/link"
            >
              <span>Xem trên TikTok</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleCopyLink(
                  'https://www.tiktok.com/@liotapkechuyen',
                  'Lio Tập Kể Chuyện',
                  'podcast-series'
                )
              }
              className="p-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              title="Sao chép link TikTok Series"
            >
              {copiedKey === 'podcast-series' ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* DỰ ÁN 5: BENTO CARD - KÊNH YOUTUBE @LIO_TSV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md glow-card flex flex-col justify-between relative overflow-hidden group"
        >
          {/* YouTube Ambient Red Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-red-500/15 via-rose-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="space-y-4 relative z-10">
            {/* Platform & Type Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <YouTubeIcon className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube Channel</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                @lio_tsv
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Kênh YouTube @lio_tsv
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Những thước phim dài tập, vlog khám phá và trải nghiệm thực tế cùng hành trình sáng tạo nội dung của Lio.
              </p>
            </div>

            {/* Stylized Video Player Preview Widget */}
            <div className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    Vlog & Cinematic Experience
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Video dài tập & Hậu trường sản xuất
                  </div>
                </div>
              </div>

              {/* 4K Badge */}
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                4K UHD
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                📺 YouTube Long-form
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                🎬 Vlog Đời Sống
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                ✨ Cinematic
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-6 relative z-10">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm glow-btn group/link"
            >
              <span>Khám phá YouTube</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleCopyLink(
                  'https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ',
                  'Kênh YouTube @lio_tsv',
                  'youtube-channel'
                )
              }
              className="p-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              title="Sao chép link YouTube"
            >
              {copiedKey === 'youtube-channel' ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* DỰ ÁN 6: BENTO CARD - SPOTIFY MINI EP ALBUM (THE DAWN CHRONICLES) */}
        <div className="lg:col-span-12">
          <SpotifyAlbumShowcase showToast={showToast} />
        </div>
      </div>

      {/* Reusable Modal for Local/Internal Projects */}
      <LocalProjectModal
        project={activeLocalProject}
        isOpen={Boolean(activeLocalProject)}
        onClose={() => setActiveLocalProject(null)}
        onCopyInfo={() => {
          if (showToast) {
            showToast({
              message: 'Đã sao chép thông tin dự án!',
              type: 'success',
            });
          }
        }}
      />
    </section>
  );
}
