import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Film, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  {
    id: 'cat-content',
    title: 'Nội Dung & Video Production',
    tag: 'Storytelling & Growth',
    icon: Film,
    accent: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    skills: [
      'Digital Storytelling & Kịch Bản',
      'Biên Tập Video 4K & Short-form (TikTok 45K+)',
      'Podcast & Kỹ Thuật Âm Thanh Cảm Xúc',
      'Chiến Lược Tăng Trưởng Kênh (YouTube & TikTok)',
    ],
  },
  {
    id: 'cat-tech',
    title: 'Công Nghệ & Web Tương Tác',
    tag: 'Code & Creative Tech',
    icon: Code,
    accent: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    skills: [
      'Frontend (React 18, Vite, Tailwind CSS)',
      'Web Animation & Physics (Framer Motion)',
      'Thiết Kế Giao Diện UI/UX & Micro-interactions',
      'Mini Web Games & Gacha Simulators',
    ],
  },
  {
    id: 'cat-ai',
    title: 'AI & Tự Động Hóa Thực Chiến',
    tag: 'Automation & LLMs',
    icon: Cpu,
    accent: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    skills: [
      'AI Creative Workflows & Automation Pipelines',
      'Whisper STT & Voice Cloning Synthesis',
      'Prompt Engineering & Local LLMs',
      'Kiến Trúc Multi-Agent Phân Tầng',
    ],
  },
];

export default function SkillsSection({ skills = [], skillCategories = null }) {
  const categories = skillCategories && skillCategories.length > 0
    ? skillCategories.map((c) => ({
        ...c,
        icon: c.icon === 'Film' ? Film : c.icon === 'Code' ? Code : Cpu,
        accent: c.id === 'cat-content'
          ? 'text-rose-500 bg-rose-500/10 border-rose-500/20'
          : c.id === 'cat-tech'
          ? 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
          : 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      }))
    : DEFAULT_CATEGORIES;

  return (
    <section className="space-y-4">
      {/* 3 Pillar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon || Layers;
          return (
            <motion.div
              key={cat.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-4 sm:p-5 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col justify-between space-y-3.5 glow-hover shadow-sm"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-neutral-200/50 dark:border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-xl border ${cat.accent}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-white/5 shadow-2xs transition-all cursor-default select-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
