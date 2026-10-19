# Thiết Kế Kỹ Thuật: Lio Spatial Cinema // The Digital Exhibition Deck

**Ngày tạo:** 2026-10-19  
**Trạng thái:** Đã phê duyệt (Approved)  
**Tác giả:** Antigravity Creative Engineering & Nguyễn Hoàng Hải Đăng (Lio)  

---

## 1. Mục Tiêu & Tầm Nhìn
Tạo ra một phiên bản Landing Page đột phá đạt chuẩn **Awwwards Site of the Day**, kết hợp giữa:
- **Cinematic Digital Exhibition:** Trải nghiệm triển lãm nghệ thuật số đa giác quan, mỗi sản phẩm là một gian trưng bày sống động có thể tương tác trực tiếp.
- **Spatial Cyber Deck (VisionOS & Raycast):** Giao diện kính không gian ảo siêu mờ (Spatial Glass), ánh sáng con trỏ chuột thời gian thực (Cursor-following Spotlight), phím tắt tìm kiếm nhanh **Command Palette (`Cmd + K`)** và âm thanh tương tác vi mô **Web Audio Sound Effects**.

Tất cả được xây dựng bằng tài nguyên hiện có trong dự án: **React 18, Vite 6, Tailwind CSS 3, Framer Motion 12, Lucide Icons, Canvas Confetti và Web Audio API** (không cần cài thêm thư viện cồng kềnh).

---

## 2. Kiến Trúc & Các Thành Phần Cốt Lõi

### 2.1. Web Audio Micro-Sound Engine (`useSoundFX.js`)
* Sử dụng Web Audio API tích hợp sẵn trong trình duyệt để tổng hợp âm thanh vi mô (procedural audio) trong thời gian thực:
  * `playHover()`: Âm thanh "pop" mềm mại ở tần số 800Hz êm dịu khi rê chuột qua các nút hoặc thẻ.
  * `playClick()`: Âm thanh click cơ học tinh tế khi bấm chọn hoặc mở modal.
  * `playSuccess()`: Âm thanh chimes ngân vang khi copy link hoặc gửi form thành công.
* Có nút bật/tắt âm thanh (Mute/Sound toggle) trên thanh điều hướng để tôn trọng trải nghiệm người dùng.

### 2.2. Command Palette Raycast Spotlight (`CommandPaletteModal.jsx`)
* Mở bằng phím tắt `Cmd + K` (Mac) hoặc `Ctrl + K` (Windows), hoặc click nút Kính lúp trên thanh điều hướng.
* Cung cấp thanh tìm kiếm thông minh với các nhóm lệnh:
  * **Dự án:** Mở trực tiếp Hôm Nay Uống Gì (Live Demo), Cenkin Radar, AI Company OS.
  * **Video:** Bật video YouTube 4K, TikTok Storytelling.
  * **Mạng xã hội:** TikTok, YouTube, Facebook, Instagram, Zalo.
  * **Thao tác nhanh:** Bật/Tắt nhạc Lo-Fi, Đổi giao diện Sáng/Tối, Sao chép email.

### 2.3. Mouse-Tracking Ambient Spotlight
* Bắt tọa độ con trỏ chuột `(clientX, clientY)` để tạo hiệu ứng quầng sáng rọi theo chuột dịu nhẹ (Radial Spotlight Mesh Glow) bao phủ toàn bộ trang web, tạo chiều sâu thị giác như trong không gian VisionOS.

### 2.4. 4 Gian Triển Lãm Số Tương Tác (The 4 Interactive Pavilions)
1. **Pavilion 01 - Cinema Reel Spotlight:**
   * Rạp chiếu mini với hiệu ứng quầng sáng rạp phim, phát trực tiếp video YouTube 4K và clip TikTok kèm bộ chọn 3 thước phim tiêu biểu.
2. **Pavilion 02 - Interactive Web Lab:**
   * Trải nghiệm live app *Hôm Nay Uống Gì* (mở hòm CS2/FIFA) với nút chơi ngay, kèm mô phỏng Radar Zenly 360° sóng âm thực tế.
3. **Pavilion 03 - Vinyl Sound Lounge:**
   * Máy đĩa than 3D xoay thực tế, phát các track Lo-Fi (`the_dashboard_vow.mp3`, `the_hour_before_waking.mp3`) với visualizer sóng nhạc sống động.
4. **Pavilion 04 - Proof of Impact & Expertise:**
   * Bảng số liệu uy tín: 55K+ Views, 4.5K+ Likes, 50+ Video và 3 Trụ cột năng lực cốt lõi (Nội dung, Công nghệ, AI).

### 2.5. Spatial Portrait Lens
* Khung ảnh chân dung kính không gian với độ cong viền kính đa tầng, hiệu ứng Parallax chuyển động nhẹ theo góc nhìn của người xem.

---

## 3. Cấu Trúc File & Thư Mục

```
src/
├── hooks/
│   └── useSoundFX.js                # Web Audio Engine phát âm thanh hover/click/chime vi mô
├── components/
│   ├── CommandPaletteModal.jsx      # Spotlight Command Palette (Cmd + K)
│   ├── SpatialBackgroundGlow.jsx    # Spotlight theo chuột và lưới không gian VisionOS
│   ├── VinylSoundLounge.jsx         # Máy đĩa than 3D tương tác phát nhạc Lo-Fi Lio
│   ├── layouts/
│   │   └── SpatialCinemaLayout.jsx  # Layout chính của bản cook mới
```

---

## 4. Tích Hợp & Đảm Bảo An Toàn
* Tích hợp `SpatialCinemaLayout` thành một lựa chọn đẳng cấp trong `LayoutSwitcherBar` và đặt làm **Giao Diện Mặc Định Mới** (hoặc dễ dàng chuyển đổi sang Split-Screen bất cứ khi nào).
* Bảo toàn 100% dữ liệu gốc (`defaultProfile.js`, links, stats, bio mới).
