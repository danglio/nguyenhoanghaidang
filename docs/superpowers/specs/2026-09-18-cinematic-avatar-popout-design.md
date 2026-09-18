# Thiết Kế Kỹ Thuật: Hiệu Ứng Ảnh Chân Dung 3D Pop-Out & Neon Border Beam

**Ngày thiết kế:** 18/09/2026  
**Trạng thái:** Đã phê duyệt (Approved by User)  
**Mục tiêu:** Nâng cấp ảnh chân dung của Lio trên Thẻ 3D Lanyard và toàn bộ Landing Page thành tác phẩm nghệ thuật chuẩn bìa tạp chí điện ảnh: phần đầu/tóc nhô 3D ra khỏi khung viền (3D Pop-Out), dải sáng viền Neon Beam chuyển động mượt mà, và chữ ký mạ vàng kim loại.

---

## 1. Chi Tiết Kiến Trúc & Hiệu Ứng Thị Giác

### 1.1 Cấu Trúc Khung Ảnh 3D Pop-Out (`src/components/LanyardBadge.jsx`)
* **Khung nền (Backdrop Portal):**
  - Chiều cao khung thẻ: ~190px - 210px.
  - Nền gradient sâu thẳm phối viền kính mờ: `bg-gradient-to-b from-neutral-900 via-indigo-950/60 to-neutral-900`.
  - Khung viền bo góc `rounded-2xl` có rãnh viền phát quang.
* **Tia sáng Neon Border Beam:**
  - Sử dụng gradient hình nón (Conic gradient: `from-cyan-400 via-indigo-500 via-purple-500 to-amber-400`).
  - Chạy xoay tròn 360° quanh viền khung liên tục (CSS animation `@keyframes spin` hoặc `conic-border-spin`).
  - Lớp mặt nạ `mask-composite: exclude` tạo ra dải sáng viền mảnh mai (1.5px - 2px), tinh xảo và sang trọng.
* **Lớp Chân Dung 3D Pop-Out (Out-of-Bounds Depth):**
  - Ảnh chân dung được cấu trúc với phần đầu và vai vươn nhẹ lên trên mép khung (`translate-y-[-10px] scale-[1.06] z-20`).
  - Phần thân người bên dưới hòa quyện tự nhiên vào khung kính của thẻ thông qua gradient vignette mềm mại.
  - Khi nghiêng chuột (3D tilt), ảnh di chuyển theo thị sai góc nhìn (parallax shift) tạo cảm giác lập thể 3D chân thực.
* **Typography Bìa Tạp Chí Điện Ảnh (Editorial Watermark):**
  - Huy hiệu nhỏ góc trên: `★ ISSUE // 2026 • CREATOR EDITION` dạng chữ monospaced siêu nhỏ sắc nét.
  - Chữ ký nghệ thuật viết tay **"Lio"** được mạ vàng ánh kim dập nổi (`bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]`).
  - Bộ lọc kính: Tăng cường độ sắc nét và tương phản nhẹ nhàng (`contrast-[1.06] saturate-[1.08]`).

---

## 2. Kế Hoạch Kiểm Thử (Verification Plan)

1. Kiểm tra build dự án (`npm run build`) thành công 100%.
2. Kiểm tra hiệu ứng 3D Pop-out hiển thị đẹp mắt, phần đầu nhô tự nhiên ra khỏi khung viền mà không bị che khuất các thông tin header của thẻ.
3. Kiểm tra dải ánh sáng Neon Border Beam xoay mượt mà 60fps, không gây giật lag.
4. Kiểm tra khi xoay lật sang mặt sau (Flip card) và lật lại mặt trước vẫn giữ nguyên hiệu ứng hoàn hảo.
