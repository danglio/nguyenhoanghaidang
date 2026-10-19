import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  Download,
  Eye,
  ExternalLink,
  X,
  Calendar,
  Building2,
  FileText,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const CERTIFICATES = [
  {
    id: 'fpt-ai',
    title: 'Ứng Dụng AI Trí Tuệ Nhân Tạo Trong Tạo Ảnh & Video',
    issuer: 'Đại Học FPT (FPT University)',
    program: 'FPT Education Vì Cộng Đồng',
    recipient: 'Nguyễn Hoàng Hải Đăng',
    school: 'Trường THPT Đức Trọng, Tỉnh Lâm Đồng',
    date: '06/12/2025',
    category: 'Trí Tuệ Nhân Tạo & Video AI',
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    accentColor: 'from-orange-500/20 to-amber-500/10',
    thumbnail: 'certificates/cert_fpt_ai.png',
    pdfFile: 'certificates/chungchi_1764977787643.pdf',
    fileName: 'ChungChi_AI_FPT_NguyenHoangHaiDang.pdf',
    description: 'Chứng nhận hoàn thành chương trình đào tạo chuyên sâu về ứng dụng công cụ Trí Tuệ Nhân Tạo thế hệ mới (Generative AI) trong quy trình sản xuất hình ảnh, thiết kế mỹ thuật và dàn dựng video kỹ thuật số.',
    skills: ['Generative AI', 'AI Video Synthesis', 'Prompt Engineering', 'Visual AI Automation'],
  },
  {
    id: 'mci-powerbi',
    title: 'Analyzing and Visualizing Data on Power BI',
    issuer: 'MCI Academy',
    program: 'Nurturing a Digital Vietnam (Công ty CP Tư Vấn MCI Việt Nam)',
    recipient: 'Nguyen Hoang Hai Dang',
    school: 'Hanoi / Online Professional Training',
    date: 'Tháng 08/2025',
    category: 'Phân Tích & Trực Quan Dữ Liệu',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    accentColor: 'from-blue-500/20 to-indigo-500/10',
    thumbnail: 'certificates/cert_power_bi.png',
    pdfFile: 'certificates/Certificate_Nguyen_Hoang_Hai_Dang_2025.pdf',
    fileName: 'Certificate_PowerBI_NguyenHoangHaiDang_2025.pdf',
    description: 'Chứng nhận hoàn thành xuất sắc khóa học chuyên môn về phân tích cấu trúc dữ liệu, thiết kế Dashboard báo cáo tương tác và trực quan hóa chỉ số kinh doanh thực tế trên nền tảng Microsoft Power BI.',
    skills: ['Microsoft Power BI', 'Data Modeling', 'Interactive Dashboards', 'Business Analytics'],
  },
];

export default function CertificatesSection({ showToast }) {
  const baseUrl = import.meta.env.BASE_URL;
  const [selectedCert, setSelectedCert] = useState(null);

  const handleDownload = (cert) => {
    if (showToast) {
      showToast({
        message: `Đang tải chứng nhận: ${cert.title}`,
        type: 'success',
      });
    }
  };

  return (
    <section id="certificates" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200/60 dark:border-white/5 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-amber-500 uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>ACCREDITATIONS // CHỨNG CHỈ & CHỨNG NHẬN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Chứng Nhận & Bằng Cấp Chuyên Môn
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md sm:text-right">
          Minh chứng chính quy cho năng lực sáng tạo AI và kỹ năng phân tích dữ liệu được cấp bởi FPT University & MCI Academy.
        </p>
      </div>

      {/* Grid of 2 Curated Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATES.map((cert, index) => {
          const thumbUrl = `${baseUrl}${cert.thumbnail}`;
          const pdfUrl = `${baseUrl}${cert.pdfFile}`;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="glass-card rounded-[28px] p-5 sm:p-7 border border-neutral-200/80 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div
                className={`absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br ${cert.accentColor} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
              />

              <div className="space-y-4 relative z-10">
                {/* Header Badge & Date */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cert.badgeColor}`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{cert.issuer}</span>
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Interactive Certificate Preview Thumbnail */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-white/10 aspect-[16/11] bg-neutral-900 cursor-pointer group/thumb shadow-inner"
                >
                  <img
                    src={thumbUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Xem toàn màn hình</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{cert.program}</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                    {cert.description}
                  </p>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-5 relative z-10 border-t border-neutral-200/50 dark:border-white/5 mt-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Xem chi tiết</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={pdfUrl}
                  download={cert.fileName}
                  onClick={() => handleDownload(cert)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold glass-card border border-neutral-300/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                  title="Tải tệp PDF chứng chỉ gốc"
                >
                  <Download className="w-4 h-4 text-cyan-500" />
                  <span className="hidden sm:inline">Tải PDF</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass-card border border-neutral-300/80 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
                  title="Mở tab mới xem file PDF"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-[28px] border border-neutral-200 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Award className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {selectedCert.issuer} • {selectedCert.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`${baseUrl}${selectedCert.pdfFile}`}
                    download={selectedCert.fileName}
                    onClick={() => handleDownload(selectedCert)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tải PDF Gốc</span>
                  </a>

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                    title="Đóng modal (ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: High Resolution Certificate Image */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 bg-neutral-100/50 dark:bg-neutral-950/50 flex items-center justify-center">
                <img
                  src={`${baseUrl}${selectedCert.thumbnail}`}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[65vh] rounded-xl object-contain shadow-2xl border border-neutral-200/80 dark:border-white/10"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Xác thực chính thức: <strong>{selectedCert.recipient}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`${baseUrl}${selectedCert.pdfFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Mở PDF toàn màn hình</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
