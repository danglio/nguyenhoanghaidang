# Thiết Kế Kỹ Thuật: Hiệu Ứng Thẻ 3D Lanyard Rơi Từ Trên Xuống (Drop-Down Spring Physics)

**Ngày thiết kế:** 18/09/2026  
**Trạng thái:** Đã phê duyệt (Approved by User)  
**Mục tiêu:** Tạo cảm giác chân thực sống động khi người dùng vừa mở trang web: chiếc Thẻ 3D Lanyard và sợi dây đeo rơi từ ngoài màn hình phía trên xuống, giật nảy đàn hồi (spring rebound) rồi chuyển sang đung đưa tự nhiên.

---

## 1. Chi Tiết Vật Lý & Chuyển Động (Physics & Motion Sequence)

### 1.1 Khởi đầu (Initial State - t = 0s)
* Vị trí: `y: -520px` (nằm hoàn toàn ngoài khung nhìn phía trên).
* Góc nghiêng ban đầu: `rotateZ: 7deg` (thẻ hơi nghiêng tự nhiên khi đang rơi).
* Độ mờ: `opacity: 0.2` (tăng nhanh lên 1 khi vào màn hình).

### 1.2 Giai đoạn Rơi & Giật Nảy (Drop & Rebound - t = 0s ➔ 1.2s)
* Sử dụng Framer Motion Spring:
  - `stiffness: 130`
  - `damping: 11`
  - `mass: 1.2`
* Khi rơi tới vị trí `y = 0`, quán tính kéo chiếc thẻ rơi quá đà nhẹ (~15px) rồi dây đeo giữ lại và nảy ngược lên 2-3 nhịp theo hàm dao động tắt dần.
* Sợi dây đeo áp dụng hiệu ứng căng dây: `scaleY` dãn nhẹ 1.04 khi chạm đáy và co về 1.0.

### 1.3 Giai đoạn Chuyển Tiếp Sang Đung Đưa (Transition to Idle Sway - t > 1.2s)
* Sau khi dao động dọc tắt, chuyển mượt mà sang chu kỳ đung đưa con lắc (pendulum sway: `rotateZ: [-2, 2, -2]`, `rotateY: [-2.5, 2.5, -2.5]`).
* Giữ nguyên đầy đủ tính năng:
  - Nghiêng 3D theo con trỏ chuột (`rotateX`, `rotateY`).
  - Kéo thả tự do bằng chuột / ngón tay (drag & elastic snap).
  - Nút lật 3D sang mặt sau QR Code (flip card).

### 1.4 Nút Kích Hoạt Thả Lại (Re-Drop Trigger)
* Người dùng có thể bấm vào chiếc chốt kim loại ở đỉnh màn hình (`Top Anchor Pin`) để kích hoạt lại animation rơi bất cứ lúc nào.

---

## 2. Kế Hoạch Kiểm Thử (Verification Plan)

1. Kiểm tra build dự án (`npm run build`) thành công 100%.
2. Tải lại trang (F5) để kiểm tra animation rơi từ trên trần xuống mượt mà và nảy tự nhiên.
3. Kiểm tra tính tương thích với kéo thả chuột (drag) và lật mặt thẻ (flip).
