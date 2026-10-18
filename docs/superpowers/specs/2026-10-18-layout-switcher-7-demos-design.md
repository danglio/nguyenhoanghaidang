# Thiết Kế Kỹ Thuật: Bộ 7 Demo Bố Cục Nổi Tiếng & Thanh Chuyển Đổi Layout Switcher

**Ngày tạo:** 2026-10-18  
**Trạng thái:** Đã phê duyệt (Approved)  
**Tác giả:** Antigravity Pairing Assistant & Nguyễn Hoàng Hải Đăng (Lio)  

---

## 1. Mục Tiêu & Bối Cảnh
Dự án hiện tại là Landing Page cá nhân / Bio Portfolio của Nguyễn Hoàng Hải Đăng (Lio) xây dựng trên React + Vite + Tailwind CSS + Framer Motion.  
Mục tiêu: Cung cấp cho người dùng một công cụ trực quan để trải nghiệm và đánh giá **7 cấu trúc bố cục (Layouts)** nổi tiếng nhất trong thiết kế web hiện đại ngay trên môi trường chạy thử nghiệm (`http://localhost:5173/`), từ đó chọn ra bố cục ưng ý nhất để làm giao diện chính thức.

---

## 2. Danh Mục 7 Bố Cục Thử Nghiệm (Layout Modes)

1. **`classic` - Gốc (Classic Scroll):**
   * Giữ nguyên cấu trúc cuộn dọc nguyên bản: Sticky Navbar -> Hero 3D Lanyard -> Projects Showcase -> Social Links Cards -> Bento Stats & Skills -> Footer.
   * Mục đích: Chuẩn đối chiếu (Baseline).

2. **`bento` - Bento Grid 2.0 (Linear & Apple Style):**
   * Lưới module bất đối xứng (CSS Grid 3-4 cột).
   * Ô lớn 1 (span-2): Thẻ 3D Lanyard + Profile Bio + Status Badge.
   * Ô 2: Mini Vibe Music Player tương tác với sóng nhạc live.
   * Ô 3: Bento Stat Lượt xem (55K+ views) và Followers.
   * Hàng dưới: Thẻ dự án nổi bật (Cenkin Radar & Apple Pro Showcase) và Lưới Pill Kênh MXH.

3. **`split` - Split-Screen 2 Cột (Brittany Chiang & Vercel Style):**
   * Màn hình Desktop chia 2 cột:
     * Cột trái (cố định ~38%, sticky top-24): Thẻ 3D Lanyard, Tên, Title, Status HUIT, Anchor Nav trỏ nhanh đến từng phần, Bộ Icon MXH, Nút Liên Hệ.
     * Cột phải (cuộn độc lập ~62%): Danh sách các case study Dự án, Bento chỉ số và kỹ năng.
   * Mobile: Tự động xếp chồng một cột tối ưu.

4. **`tabs` - Dynamic Segmented Tabs (Apple iOS 18 & Raycast):**
   * Phần trên: Hero Profile và Thẻ 3D Lanyard.
   * Phần giữa: Thanh Segmented Tab viền kính với hiệu ứng chuyển tab động của Framer Motion:
     * `[ ⦿ Tất cả ]` • `[ 📁 Dự án số ]` • `[ 🎬 Kênh video & MXH ]` • `[ 📈 Thành tích & Kỹ năng ]`
   * Bấm vào tab nào chỉ hiển thị nội dung của tab đó với hiệu ứng fade & slide mượt mà.

5. **`minimal` - Minimalist Centered Bio-Link (Readcv & Bento Minimal):**
   * Khung hiển thị căn giữa màn hình (max-w-xl), tối ưu hoàn hảo cho Mobile.
   * Thẻ 3D dạng compact, các liên kết định dạng thẻ kính (Glassmorphic) bo tròn góc, có icon tương tác và hiệu ứng hover tinh tế.

6. **`macos` - macOS Desktop Window (Apple Finder & Raycast Window Style):**
   * Giả lập giao diện hệ điều hành máy Mac:
     * Thanh Status Bar trên cùng (` LioOS • 🟢 HUIT`).
     * Cửa sổ chính bo góc với 3 nút Đỏ / Vàng / Xanh (Window traffic lights).
     * Các tab/cửa sổ con: Hồ sơ Lio, Kho Dự án, Trình phát nhạc Spotify.
     * Thanh Dock ứng dụng nổi ở dưới đáy.

7. **`editorial` - Editorial Storyteller (Awwwards & Tạp chí Kể Chuyện):**
   * Đậm chất nghệ thuật và Storytelling:
     * Headline Typography lớn, trích dẫn triết lý cá nhân của Lio.
     * Chia thành các chương (Chapters): Chương 1 - Khởi đầu & Bản sắc; Chương 2 - Hành trình 55K+ views số hóa; Chương 3 - Các thử nghiệm công nghệ & Dự án; Chương 4 - Kết nối & Hợp tác.

---

## 3. Kiến Trúc Kỹ Thuật & Cấu Trúc File

```
src/
├── components/
│   ├── layouts/
│   │   ├── LayoutSwitcherBar.jsx    # Thanh điều khiển Dock nổi 7 layout, nút thu nhỏ/mở rộng
│   │   ├── ClassicLayout.jsx        # Bố cục 1: Cuộn dọc truyền thống
│   │   ├── BentoLayout.jsx          # Bố cục 2: Lưới Bento đa tầng
│   │   ├── SplitLayout.jsx          # Bố cục 3: Hai cột Split-screen
│   │   ├── TabsLayout.jsx           # Bố cục 4: Dynamic Segmented Tabs
│   │   ├── MinimalBioLayout.jsx     # Bố cục 5: Minimalist Bio Card
│   │   ├── MacOSLayout.jsx          # Bố cục 6: macOS Desktop & Window
│   │   └── EditorialLayout.jsx      # Bố cục 7: Editorial Magazine Storyteller
├── App.jsx                          # Tích hợp activeLayout state, lưu localStorage, render layout tương ứng
```

### Quản Lý Trạng Thái (State Management):
* `activeLayout`: Trạng thái layout hiện tại (`classic` | `bento` | `split` | `tabs` | `minimal` | `macos` | `editorial`).
* Tự động lưu vào `localStorage.getItem('lio_selected_layout')` để không bị mất khi F5 tải lại trang.
* Tích hợp `AnimatePresence mode="wait"` từ Framer Motion để khi chuyển đổi giữa các layout có hiệu ứng mượt mà (fade in/out nhẹ nhàng).

---

## 4. Cam Kết Toàn Vẹn Dữ Liệu
* Tái sử dụng 100% dữ liệu gốc (`profile`, `defaultProfile.js`) và các components chức năng (`HeroLanyard`, `ProjectsShowcase`, `SocialLinks`, `AchievementsStats`, `SkillsSection`, `SoundtrackPlayer`, `ContactModal`, `Toast`).
* Không xóa bỏ hoặc ghi đè làm hỏng code hiện hữu; chế độ Classic luôn sẵn sàng làm fallback an toàn.
