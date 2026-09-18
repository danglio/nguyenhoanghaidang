# Hiệu Ứng Thẻ 3D Lanyard Rơi Từ Trên Xuống Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm hiệu ứng rơi từ trên trần xuống (`y: -520px` ➔ `y: 0px`) với lò xo nảy giật đàn hồi (spring rebound) cho Thẻ 3D Lanyard khi vừa tải trang, sau đó chuyển êm sang trạng thái đung đưa con lắc và tương tác chuột.

**Architecture:** Nâng cấp motion wrapper trong `src/components/LanyardBadge.jsx` với state `dropKey` để hỗ trợ cả hiệu ứng rơi lúc mount và tính năng click thả rơi lại (re-drop); kiểm thử build.

**Tech Stack:** React 18, Vite, Framer Motion, Tailwind CSS.

## Global Constraints

- Chuyển động thả rơi: Bắt đầu từ `y: -520px`, `rotateZ: 7deg`, `opacity: 0.2`.
- Spring Rebound: Khi dây căng, giật nảy lên xuống (`stiffness: 130, damping: 11, mass: 1.2`).
- Chuyển tiếp: Sau khi nảy xong, tự động tiếp tục chu kỳ đung đưa con lắc (pendulum sway) mượt mà.
- Tương tác: Bấm vào chốt neo kim loại đỉnh (Top Anchor Pin) để kích hoạt thả rơi lại bất cứ lúc nào.
- Không phát sinh lỗi cú pháp hay cảnh báo khi chạy `npm run build`.

---

### Task 1: Tích hợp hiệu ứng Thả rơi lò xo vào `src/components/LanyardBadge.jsx`

**Files:**
- Modify: `src/components/LanyardBadge.jsx`

**Interfaces:**
- Produces: `LanyardBadge` với animation rơi ban đầu và nút chốt neo kích hoạt thả rơi lại

- [ ] **Step 1: Cập nhật `src/components/LanyardBadge.jsx`**

Bao gồm:
1. Thêm state `dropKey` (number, bắt đầu bằng 0). Khi người dùng click vào Top Anchor Pin, `setDropKey(k => k + 1)`.
2. Tạo motion wrapper bao bọc toàn bộ chuỗi thẻ và dây:
   - `key={dropKey}`
   - `initial={{ y: -520, rotateZ: 7, opacity: 0.2 }}`
   - `animate={{ y: 0, rotateZ: 0, opacity: 1 }}`
   - `transition={{ type: "spring", stiffness: 130, damping: 11, mass: 1.2 }}`
3. Thêm tooltip và hiệu ứng hover cho Top Anchor Pin: `title="Click để thả rơi lại thẻ 🎯"`, con trỏ `cursor-pointer`, khi bấm sẽ làm thẻ rơi lại từ trên trần xuống cực kỳ thích mắt!

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanyardBadge.jsx
git commit -m "feat: add drop-down spring physics entrance animation and re-drop trigger to LanyardBadge"
```

---

### Task 2: Kiểm thử toàn diện & Verification Build

- [ ] **Step 1: Chạy `npm run build` xác nhận bundle hoàn hảo.**
- [ ] **Step 2: Final Code Reviewer subagent đánh giá chất lượng.**
- [ ] **Step 3: Báo cáo hoàn thành.**
