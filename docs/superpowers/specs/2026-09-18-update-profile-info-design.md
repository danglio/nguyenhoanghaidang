# Thiết kế Kỹ thuật: Cập nhật thông tin cá nhân & Các kênh liên kết (Nguyễn Hoàng Hải Đăng - Lio)

**Ngày thiết kế:** 18/09/2026  
**Trạng thái:** Đã phê duyệt (Approved by User)  
**Tác giả:** Antigravity  

---

## 1. Mục tiêu (Objective)

Cập nhật toàn bộ thông tin cá nhân mặc định trên Landing Page cá nhân dựa trên tài liệu `thông tin.docx` do người dùng cung cấp. Chuyển đổi hồ sơ từ thông tin mẫu sang nhận diện thương hiệu cá nhân của **Nguyễn Hoàng Hải Đăng (Lio)** – Nhà sáng tạo nội dung & Người kể chuyện (Content Creator & Storyteller).

---

## 2. Chi tiết Thông tin & Dữ liệu Cập nhật

### 2.1 Thông tin cá nhân (`personal`)
* **Họ và tên (`fullName`):** `Nguyễn Hoàng Hải Đăng (Lio)`
* **Chức danh chính (`title`):** `Content Creator & Digital Storyteller`
* **Danh sách vai trò hiển thị xoay tua (`roles`):**
  - `Digital Storyteller`
  - `Creative Content Creator`
  - `Video & Podcast Maker`
  - `Web Experimenter`
* **Trạng thái hoạt động (`status`):** `🟢 Đang quay video & sáng tạo nội dung mới`
* **Tiểu sử (`bio`):** `Đam mê sáng tạo nội dung số, chia sẻ những câu chuyện truyền cảm hứng và phát triển các dự án web tương tác thú vị. Cùng theo dõi hành trình của Lio nhé!`
* **Địa điểm (`location`):** `Việt Nam`
* **Múi giờ (`timezone`):** `Asia/Ho_Chi_Minh`
* **Hiển thị tuổi (`showAge`):** `true`

### 2.2 Danh sách Liên kết & Mạng xã hội (`links`)
Tích hợp đủ 6 kênh từ file docx:
1. **TikTok Lio Tập Kể Chuyện**
   - URL: `https://www.tiktok.com/@liotapkechuyen`
   - Platform: `tiktok`
   - Tiêu đề: `TikTok Lio Tập Kể Chuyện`
   - Mô tả: `Kênh chia sẻ những câu chuyện truyền cảm hứng và góc nhìn cuộc sống`
2. **TikTok Cá Nhân (@nguyndang0802)**
   - URL: `https://www.tiktok.com/@nguyndang0802`
   - Platform: `tiktok`
   - Tiêu đề: `TikTok @nguyndang0802`
   - Mô tả: `Kênh cá nhân chia sẻ khoảnh khắc đời thường, video sáng tạo & phong cách sống`
3. **YouTube @lio_tsv**
   - URL: `https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ`
   - Platform: `youtube`
   - Tiêu đề: `Kênh YouTube @lio_tsv`
   - Mô tả: `Kênh YouTube chính thức với vlog và các thước phim chia sẻ dài tập`
4. **Instagram @nguyenhoanghaidanglio**
   - URL: `https://www.instagram.com/nguyenhoanghaidanglio?stkn=OTQ2b2Nmb3F2Zm95&utm_source=qr`
   - Platform: `instagram`
   - Tiêu đề: `Instagram @nguyenhoanghaidanglio`
   - Mô tả: `Hình ảnh phong cách sống, hậu trường sáng tạo và khoảnh khắc hàng ngày`
5. **Facebook Cá Nhân**
   - URL: `https://www.facebook.com/share/19JS9Xy3rN/?mibextid=wwXIfr`
   - Platform: `facebook`
   - Tiêu đề: `Facebook Cá Nhân`
   - Mô tả: `Kết nối, giao lưu cùng bạn bè và cộng đồng người theo dõi`
6. **Dự án Web: Hôm Nay Uống Gì Lio**
   - URL: `https://danglio.github.io/homnayuonggilio/`
   - Platform: `website`
   - Tiêu đề: `Dự Án: Hôm Nay Uống Gì Lio`
   - Mô tả: `Mini web-app vòng quay mở hòm CS2 & thẻ FIFA Online giải cứu cơn phân vân chọn đồ uống`

### 2.3 Bộ kỹ năng (`skills`)
- `Storytelling & Kể Chuyện`
- `Sáng Tạo Nội Dung Số`
- `Video Production & Editing`
- `TikTok & YouTube Growth`
- `Web Experiments`
- `Creative Direction`
- `Community Building`
- `AI Creative Tools`

### 2.4 Chỉ số thống kê (`stats`)
- `50K+`: Người theo dõi đa kênh
- `2+`: Kênh TikTok hoạt động
- `100+`: Video & Nội dung hoàn thành
- `100%`: Nhiệt huyết & Đam mê

---

## 3. Cập nhật Kỹ thuật & Quản lý Bộ nhớ (LocalStorage Migration)

* **File:** `src/hooks/useProfileData.js`
* **Nâng cấp `STORAGE_KEY`:** Từ `personal_bio_profile_v2` sang `personal_bio_profile_v3`.
* **Mục đích:** Đảm bảo khi người dùng mở trang web trên trình duyệt, hệ thống sẽ tự động nạp hồ sơ thực tế mới nhất của Hải Đăng (Lio) mà không bị dữ liệu mẫu cũ trong cache ghi đè.

---

## 4. Kế hoạch Kiểm thử & Xác nhận (Testing Plan)

1. Kiểm tra build dự án (`npm run build`) không có lỗi cú pháp hoặc TypeScript/ESLint warnings.
2. Kiểm tra giao diện hiển thị tên "Nguyễn Hoàng Hải Đăng (Lio)" cùng các danh hiệu và bio mới.
3. Kiểm tra các nút liên kết mạng xã hội mở đúng đường dẫn khi nhấp chuột (target="_blank" rel="noopener noreferrer").
4. Thử nghiệm mở Edit Modal: dữ liệu hiển thị đúng, chỉnh sửa và lưu thành công.
