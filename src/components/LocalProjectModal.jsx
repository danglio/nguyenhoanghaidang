import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  Workflow,
  Sparkles,
  Check,
  Copy,
  Lock,
  Server,
  Zap,
  CheckCircle2,
  ArrowRight,
  HardDrive,
  Activity,
} from 'lucide-react';

/**
 * Generate a clean, readable text summary of the project to copy to the clipboard.
 */
function buildProjectSummary(project) {
  if (!project) return '';

  const lines = [
    `=============================================`,
    `[DỰ ÁN NỘI BỘ // LOCAL PROJECT: ${project.title || 'Dự án'}]`,
    `=============================================`,
    `• Thể loại / Mô tả: ${project.subtitle || 'Không có mô tả'}`,
    `• Trạng thái: ${project.badge || '🔒 Bản Local Nội Bộ'} - ${project.status || 'Private Dev Environment'}`,
    '',
    `⚠️ LƯU Ý MÔI TRƯỜNG PHÁT TRIỂN:`,
    project.disclaimer ||
      'Dự án hiện đang vận hành trên máy chủ phát triển nội bộ (Local / Apple Silicon). Bản dùng thử trực tiếp (Live Demo) công khai hiện chưa được mở để bảo mật tài nguyên.',
    '',
  ];

  if (project.highlights && project.highlights.length > 0) {
    lines.push(`🌟 ĐIỂM NỔI BẬT:`);
    project.highlights.forEach((h) => lines.push(`• ${h}`));
    lines.push('');
  }

  if (project.architecture && project.architecture.length > 0) {
    lines.push(`🏗️ KIẾN TRÚC & LUỒNG DỮ LIỆU:`);
    project.architecture.forEach((arch, idx) => {
      if (typeof arch === 'string') {
        lines.push(`  Bước ${idx + 1}: ${arch}`);
      } else {
        const title = arch.title || arch.step || `Bước ${idx + 1}`;
        const desc = arch.desc || arch.detail || '';
        const tag = arch.tag ? ` [${arch.tag}]` : '';
        lines.push(`  Bước ${idx + 1}${tag}: ${title}${desc ? ` - ${desc}` : ''}`);
      }
    });
    lines.push('');
  }

  if (project.features && project.features.length > 0) {
    lines.push(`✨ TÍNH NĂNG CỐT LÕI:`);
    project.features.forEach((feat) => {
      if (typeof feat === 'string') {
        lines.push(`• ${feat}`);
      } else {
        const title = feat.title || 'Tính năng';
        const desc = feat.desc ? ` - ${feat.desc}` : '';
        lines.push(`• ${title}${desc}`);
      }
    });
    lines.push('');
  }

  if (project.techStack) {
    lines.push(`🛠️ TECH STACK:`);
    if (Array.isArray(project.techStack)) {
      const items = project.techStack
        .map((t) => (typeof t === 'string' ? t : t.name || ''))
        .filter(Boolean)
        .join(', ');
      lines.push(`• ${items}`);
    } else if (typeof project.techStack === 'object') {
      Object.entries(project.techStack).forEach(([cat, items]) => {
        const itemStr = Array.isArray(items) ? items.join(', ') : String(items);
        lines.push(`• ${cat}: ${itemStr}`);
      });
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('Liên hệ trao đổi: Nguyễn Hoàng Hải Đăng (Lio) • contact@danglio.com');
  return lines.join('\n');
}

/**
 * LocalProjectModal Component
 *
 * Reusable modal for showcasing locally hosted or internal projects with:
 * - Prominent amber/gold glass Disclaimer Notice box
 * - Architecture flow pipeline visualization
 * - Core features grid
 * - Categorized or pill-styled tech stack badges
 * - Copy project summary & keyboard Escape listener
 */
export default function LocalProjectModal({ project, isOpen, onClose, onCopyInfo }) {
  const [isCopied, setIsCopied] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [isOpen]);

  // Copy project summary handler
  const handleCopy = useCallback(async () => {
    if (!project) return;
    const summary = buildProjectSummary(project);

    try {
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

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);

      // Invoke parent callback if provided
      onCopyInfo?.(summary);
    } catch (err) {
      console.warn('Failed to copy project summary:', err);
      onCopyInfo?.(summary);
    }
  }, [project, onCopyInfo]);

  if (!isOpen || !project) {
    return null;
  }

  // Normalize tech stack
  const isTechStackCategorized =
    project.techStack &&
    !Array.isArray(project.techStack) &&
    typeof project.techStack === 'object';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="local-project-modal-title"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-auto rounded-3xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Top decorative gradient line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-500 shrink-0" />

            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800/80 flex items-start justify-between gap-4 shrink-0 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
              <div className="space-y-1.5 min-w-0">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{project.badge || '🔒 Bản Local Nội Bộ'}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{project.status || 'Private Dev Environment'}</span>
                  </span>
                </div>

                {/* Title */}
                <h2
                  id="local-project-modal-title"
                  className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug"
                >
                  {project.title}
                </h2>

                {/* Subtitle */}
                {project.subtitle && (
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng cửa sổ"
                className="p-2 rounded-2xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-5 sm:p-6 lg:p-7 space-y-6 flex-1 custom-scrollbar">
              {/* 1. PROMINENT DISCLAIMER NOTICE BOX */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/35 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/30 dark:via-amber-900/15 dark:to-neutral-900/40 p-4 sm:p-5 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 font-mono">
                        Lưu Ý Quan Trọng // Môi Trường Chạy Cục Bộ (Localhost)
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                      {project.disclaimer ||
                        'Dự án này đang được triển khai và thử nghiệm trực tiếp trên phần cứng máy chủ nội bộ (Apple Silicon / Local Server). Để bảo vệ dữ liệu và kiến trúc hệ thống, phiên bản dùng thử công khai (Live Public Demo) hiện chưa được mở trên Internet. Quý đối tác hoặc nhà tuyển dụng có thể xem toàn bộ cấu trúc kiến trúc, tính năng kỹ thuật và pipeline bên dưới.'}
                    </p>

                    {/* Disclaimer Mini Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-mono">
                        <Server className="w-3 h-3" />
                        <span>Apple Silicon / Localhost Node</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-mono">
                        <Lock className="w-3 h-3" />
                        <span>Private View-Only Preview</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Highlights (if present) */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 text-xs font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. ARCHITECTURE FLOW SECTION */}
              {project.architecture && project.architecture.length > 0 && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                        Kiến Trúc & Luồng Dữ Liệu Hệ Thống
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                        Pipeline luồng xử lý end-to-end từ client đến engine tính toán cục bộ
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-6 sm:pl-7 border-l-2 border-dashed border-indigo-500/30 dark:border-indigo-500/40 ml-3 sm:ml-3.5 space-y-4 py-1">
                    {project.architecture.map((node, index) => {
                      const isString = typeof node === 'string';
                      const title = isString ? node : node.title || node.step || `Bước ${index + 1}`;
                      const desc = isString ? '' : node.desc || node.detail || '';
                      const tag = !isString && node.tag ? node.tag : null;

                      return (
                        <div key={index} className="relative group">
                          {/* Step dot marker */}
                          <div className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shadow-md shadow-indigo-500/20 ring-4 ring-white dark:ring-neutral-900">
                            {index + 1}
                          </div>

                          {/* Node card */}
                          <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-1.5">
                              <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                                <span>{title}</span>
                              </span>
                              {tag && (
                                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                  {tag}
                                </span>
                              )}
                            </div>
                            {desc && (
                              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. CORE FEATURES GRID */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                        Tính Năng Cốt Lõi Đã Hoàn Thiện
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                        Các module công nghệ đã kiểm thử thành công trên môi trường nội bộ
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat, index) => {
                      const isString = typeof feat === 'string';
                      const title = isString ? feat : feat.title;
                      const desc = isString ? '' : feat.desc;
                      const IconComponent = !isString && feat.icon ? feat.icon : CheckCircle2;

                      return (
                        <div
                          key={index}
                          className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-cyan-500/30 transition-all flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/20">
                            {typeof IconComponent === 'function' ? (
                              <IconComponent className="w-4 h-4" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                              {title}
                            </h4>
                            {desc && (
                              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. TECH STACK BADGES */}
              {project.techStack && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                        Ngăn Xếp Công Nghệ (Tech Stack)
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                        Frameworks, libraries và hardware pipeline triển khai
                      </p>
                    </div>
                  </div>

                  {/* If categorized object */}
                  {isTechStackCategorized ? (
                    <div className="space-y-3">
                      {Object.entries(project.techStack).map(([category, items]) => {
                        const itemList = Array.isArray(items) ? items : [items];
                        return (
                          <div
                            key={category}
                            className="p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/30 border border-neutral-200/60 dark:border-neutral-800/60"
                          >
                            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                              {category}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {itemList.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                  <span>{typeof item === 'string' ? item : item.name}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Flat array of pills */
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.techStack) ? project.techStack : []).map(
                        (tech, idx) => {
                          const name = typeof tech === 'string' ? tech : tech.name;
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200/70 dark:border-neutral-700/70 shadow-xs"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              <span>{name}</span>
                            </span>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 sm:p-5 border-t border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Nội dung mang tính trình diễn kỹ thuật (Technical Architecture)</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Copy Summary Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 hover:bg-neutral-300/80 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300/80 dark:border-neutral-700 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
                  title="Sao chép toàn bộ thông tin kiến trúc & tính năng dự án"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Đã sao chép!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span>Sao chép thông tin dự án</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs sm:text-sm font-bold shadow-md hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
