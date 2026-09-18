# Thiết Kế Kỹ Thuật: Nâng Cấp Toàn Diện Landing Page Pro Suite

**Ngày thiết kế:** 18/09/2026  
**Trạng thái:** Đã phê duyệt (Approved by User)  
**Mục tiêu:** Nâng tầm Landing Page cá nhân của Nguyễn Hoàng Hải Đăng (Lio) lên chuẩn quốc tế (Awwwards / Cyber-Bento / High-Interactivity) với đầy đủ tính năng tương tác đỉnh cao.

---

## 1. Chi Tiết Các Hạng Mục Nâng Cấp

### 1.1 Thẻ đeo 3D Lanyard Lật 2 Mặt Tương Tác (`src/components/LanyardBadge.jsx`)
* **Cơ chế lật 3D (3D Dual-Sided Flip):**
  - Trạng thái `isFlipped` chuyển đổi góc `rotateY` giữa `0°` (mặt trước) và `180°` (mặt sau).
  - Thuộc tính `transform-style: preserve-3d` và `backface-visibility: hidden`.
  - Nút bấm *"Lật thẻ (Flip Card)"* thiết kế bán trong suốt có icon xoay 360° đặt nổi trên thẻ.
* **Mặt trước (Front Side):**
  - Khung Acrylic bóng kính, ảnh chân dung Lio, chữ ký nghệ thuật viết tay "Lio", dải cầu vồng Holographic óng ánh, mã vạch Barcode SVG và badge Live Status.
* **Mặt sau (Back Side - Creative Passport & Digital Pass):**
  - **Mã QR Code SVG quét thật:** Trỏ tới địa chỉ trang web cá nhân, quét bằng camera điện thoại mở trang ngay.
  - **Chip điện tử mạ vàng (Gold Smart Chip) & Dải anten NFC:** Mô phỏng vi mạch chip thẻ sự kiện VIP.
  - **Dải từ tính (Magnetic Stripe):** Dải đen sang trọng mô phỏng mặt sau thẻ tín dụng / passport.
  - **Thông tin xác thực:** Mã định danh `#LIO-PASSPORT-2026`, email `contact@danglio.com`, quốc gia `Việt Nam`.

### 1.2 Khu Trưng Bày Dự Án Sáng Tạo Tiêu Biểu (`src/components/ProjectsShowcase.jsx`)
* **Vị trí:** Ngay dưới khu vực Hero Section, điều hướng thông qua anchor `#projects`.
* **Dự án 1 (Tiêu biểu số 1): Web App "Hôm Nay Uống Gì Lio"**
  - Card Bento lớn với mockup giao diện trò chơi vòng quay mở hòm CS2 & thẻ FIFA Online chọn đồ uống.
  - Tag công nghệ: `⚡ Mini Web Game`, `🎲 CS2 & FIFA Case Simulator`, `🎨 React & Tailwind`.
  - Nút *"Trải nghiệm ngay ↗"* (mở `https://danglio.github.io/homnayuonggilio/`) và nút *"Sao chép liên kết"*.
* **Dự án 2: Series Podcast "Lio Tập Kể Chuyện"**
  - Video storytelling & podcast cuộc sống trên TikTok (`https://www.tiktok.com/@liotapkechuyen`).
  - Nút *"Xem trên TikTok ↗"*.
* **Dự án 3: Kênh Sáng Tạo YouTube @lio_tsv**
  - Video dài, vlog khám phá và đời sống trên YouTube (`https://youtube.com/@lio_tsv...`).
  - Nút *"Khám phá YouTube ↗"*.

### 1.3 Form Liên Hệ Hợp Tác Chuyên Nghiệp (`src/components/ContactModal.jsx`)
* **Vị trí kích hoạt:** Nút *"Hợp tác cùng Lio"* trên Navbar và Hero Section.
* **Nội dung form:**
  - Họ và tên người liên hệ / Tên nhãn hàng.
  - Email đối tác.
  - Loại hình hợp tác (Pill selector: *Tài trợ / Booking video*, *Sản xuất nội dung*, *Dự án công nghệ*, *Giao lưu chia sẻ*).
  - Nội dung đề xuất chi tiết.
* **Hành động khi gửi:**
  - Tự động mở trình gửi thư với `mailto:contact@danglio.com` kèm tiêu đề và nội dung soạn sẵn.
  - Sao chép nội dung vào Clipboard và bắn pháo hoa chúc mừng (`canvas-confetti`).

### 1.4 Widget Âm Nhạc Chill Thật & Soundwave (`src/components/SoundtrackPlayer.jsx`)
* **Cơ chế âm thanh:**
  - Sử dụng Web Audio API tích hợp (Synthesized Lo-Fi chord & ambient pad) tạo âm thanh êm dịu, không lo bản quyền hay gián đoạn mạng.
  - Nút Play/Pause chuyển động mượt mà.
  - Cột sóng âm thanh (Equalizer Soundwave bars) nhảy múa theo nhịp nhạc khi đang phát.
  - Thanh trượt điều chỉnh âm lượng (Volume slider).

### 1.5 Cập Nhật Navbar & App.jsx
* **Navbar:** Thêm tab `Dự án` (`#projects`) và nút `Hợp tác` nổi bật.
* **App.jsx:** Tích hợp đầy đủ các section theo trình tự mượt mà:
  1. `HeroLanyard` (Thẻ 3D lật 2 mặt & Hero Pill Buttons)
  2. `ProjectsShowcase` (Khu trưng bày Hôm Nay Uống Gì Lio & Video Series)
  3. `SocialLinks` (Lưới thẻ 6 kênh kết nối chi tiết)
  4. `AchievementsStats` & `SkillsSection` (Thành tích & Kỹ năng)
  5. `SoundtrackPlayer` & `ContactModal`

---

## 2. Kế Hoạch Kiểm Thử (Verification Plan)

1. Kiểm tra build dự án (`npm run build`) thành công 100%.
2. Kiểm tra thao tác lật thẻ 3D qua lại giữa mặt trước (Ảnh/Chữ ký) và mặt sau (QR Code/Chip vàng) không bị lộn ngược chữ hoặc nhấp nháy.
3. Kiểm tra các nút mở link của `ProjectsShowcase` mở đúng link dự án web và các kênh.
4. Kiểm tra mở modal liên hệ, nhập form và gửi thành công.
5. Kiểm tra phát/dừng âm thanh nhạc chill trơn tru.
