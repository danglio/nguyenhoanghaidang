# Hiệu Ứng Ảnh Chân Dung 3D Pop-Out & Neon Border Beam Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp khu vực ảnh chân dung trên Thẻ 3D Lanyard với cấu trúc 3D Pop-Out (phần đầu/tóc nhô ra khỏi khung viền), dải sáng Neon Border Beam xoay 360° vô tận, typography tạp chí `ISSUE // 2026` và chữ ký vàng ánh kim.

**Architecture:** Thêm animation `@keyframes border-beam-spin` vào `src/index.css`; nâng cấp cấu trúc khung ảnh trong `src/components/LanyardBadge.jsx` với 2 lớp (portal background + pop-out avatar layer); kiểm thử build.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, CSS Conic Gradient.

## Global Constraints

- Ảnh chân dung: Có hiệu ứng 3D Pop-Out (`scale-[1.06] -translate-y-2`), phần đầu nhô nhẹ lên trên đường viền khung ảnh nhưng không che khuất header của thẻ.
- Neon Border Beam: Tia sáng conic-gradient (Cyan - Indigo - Amber) chạy quanh viền khung ảnh theo chu kỳ vô tận mượt mà.
- Watermark tạp chí: Nhãn `★ ISSUE // 2026 • CREATOR EDITION`.
- Chữ ký vàng: Chữ ký "Lio" viết tay mạ vàng ánh kim dập nổi.
- Không phát sinh lỗi cú pháp hay cảnh báo khi chạy `npm run build`.

---

### Task 1: Cấu hình Animation Neon Border Beam trong `src/index.css`

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: CSS utility class `.animate-border-beam` hoặc `@keyframes border-beam-spin`

- [ ] **Step 1: Thêm keyframes và CSS class cho Neon Border Beam**

Trong `src/index.css`, thêm keyframe quay conic-gradient:
```css
@keyframes border-beam-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-border-beam {
  animation: border-beam-spin 6s linear infinite;
}
```

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: add border-beam-spin animation keyframe for cinematic avatar frame"
```

---

### Task 2: Nâng cấp khung ảnh chân dung trong `src/components/LanyardBadge.jsx`

**Files:**
- Modify: `src/components/LanyardBadge.jsx`

**Interfaces:**
- Consumes: `.animate-border-beam`, `personal.avatarUrl`
- Produces: Khung ảnh 3D Pop-Out với Neon Border Beam, watermark tạp chí và chữ ký vàng ánh kim

- [ ] **Step 1: Cập nhật vùng hiển thị ảnh chân dung trong `src/components/LanyardBadge.jsx`**

Bao gồm:
1. Container khung ảnh `relative h-44 sm:h-48 rounded-2xl overflow-visible my-3`:
   - Lớp nền Portal: Khung kính đen bo góc `rounded-2xl bg-gradient-to-b from-neutral-950 via-indigo-950/50 to-neutral-950 border border-white/10 overflow-hidden absolute inset-0`.
   - Lớp Neon Border Beam: Phần tử viền quay tròn với `conic-gradient(from 0deg, transparent 0%, #22d3ee 25%, #6366f1 50%, #f59e0b 75%, transparent 100%)` chạy quanh viền qua lớp mask mỏng.
2. Lớp ảnh chân dung 3D Pop-Out:
   - Đặt trong vùng `overflow-visible`.
   - Ảnh chân dung `scale-[1.06] -translate-y-2.5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] object-cover rounded-2xl`.
   - Phần đầu và mái tóc nhô nhẹ ra khỏi mép trên của khung viền.
3. Lớp phủ tạp chí & Chữ ký vàng:
   - Huy hiệu monospaced ở góc trên: `★ ISSUE // 2026 • CREATOR EDITION`.
   - Chữ ký vàng mạ kim loại "Lio" (`bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 bg-clip-text text-transparent`) nổi bật ở góc dưới.
   - Vệt sáng phản chiếu ánh kim (specular sheen) chạy qua ảnh khi rê chuột.

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanyardBadge.jsx
git commit -m "feat: upgrade portrait with 3D pop-out depth, neon border beam, and gold signature"
```

---

### Task 3: Kiểm thử toàn diện & Verification Build

- [ ] **Step 1: Chạy `npm run build` xác nhận bundle hoàn hảo.**
- [ ] **Step 2: Final Code Reviewer subagent đánh giá chất lượng.**
- [ ] **Step 3: Báo cáo hoàn thành.**
