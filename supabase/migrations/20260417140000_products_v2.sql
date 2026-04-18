-- Add pricing fields
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS price_seeds integer,
  ADD COLUMN IF NOT EXISTS requires_membership boolean NOT NULL DEFAULT false;

-- Expand category to include kids_pro
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE public.products ADD CONSTRAINT products_category_check
  CHECK (category IN ('book','audio','video','kids','kids_pro'));

-- Clear old demo data
-- Xóa bảng phụ trước để gỡ bỏ ràng buộc khóa ngoại
TRUNCATE TABLE public.user_products CASCADE; 
TRUNCATE TABLE public.products RESTART IDENTITY CASCADE;

-- ===== Táo Vàng (book) — full-width cards =====
INSERT INTO public.products (title, slug, description, category, cover_url, is_featured, sort_order, price_seeds, requires_membership) VALUES
(
  'Táo Vàng Cho Cả Gia Đình',
  'tao-vang-cho-ca-gia-dinh',
  E'* Hành trình kiến tạo thịnh vượng cho cha mẹ\n* Hành trình kiến tạo thành công cho trẻ\n* VTH: 50 hạt giống nhân cách, thói quen thành đạt\n* Bí mật con trẻ\n* 21+ ngày cùng con trưởng thành\n* 11+ Quy trình đánh thức năng lượng sống tích cực\n* 21+ điều giúp bạn lập trình vận mệnh',
  'book',
  'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&h=600&fit=crop&q=80',
  true, 1, null, true
),
(
  'Trau Dồi Bản Lĩnh, Dưỡng Đức - Tạo Phúc',
  'trau-doi-ban-linh-duong-duc',
  E'* Rèn luyện bản lĩnh vững vàng trước thử thách\n* Nuôi dưỡng đức hạnh từ những điều nhỏ nhất\n* Xây dựng nền tảng phúc đức bền vững cho gia đình',
  'book',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop&q=80',
  true, 2, 199, false
),
(
  'Táo Vàng Cho Trẻ',
  'tao-vang-cho-tre-combo',
  E'* Hành trình kiến tạo thành công cho trẻ\n* VTH: 50 hạt giống nhân cách, thói quen thành đạt',
  'book',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&q=80',
  false, 3, null, true
),

-- ===== Sách nói thiếu nhi (kids) — horizontal scroll =====
(
  'Tớ Ước Mơ',
  'to-uoc-mo',
  'Câu chuyện về ước mơ của những bạn nhỏ dám nghĩ dám làm.',
  'kids',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&q=80',
  false, 10, 20, false
),
(
  'Tớ Thông Thái',
  'to-thong-thai',
  'Nuôi dưỡng trí tuệ thông minh cho trẻ từ những bài học vui.',
  'kids',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop&q=80',
  false, 11, 20, false
),
(
  'Tớ Có Thói Quen Tốt',
  'to-co-thoi-quen-tot',
  'Bên luyện thói quen, ươm mầm tương lai tươi sáng.',
  'kids',
  'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400&h=400&fit=crop&q=80',
  false, 12, 20, false
),
(
  'Tớ Biết Ơn',
  'to-biet-on',
  '17 câu chuyện về lòng biết ơn cho trẻ.',
  'kids',
  'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=400&fit=crop&q=80',
  false, 13, 20, false
),

-- ===== Táo Vàng Cho Trẻ (kids_pro) — 2x2 grid =====
(
  '50 Phẩm Chất Của Người Thành Công',
  '50-pham-chat-nguoi-thanh-cong',
  'Ứng dụng tác phẩm kỷ lục thế giới — 50 hạt giống nhân cách.',
  'kids_pro',
  'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600&h=600&fit=crop&q=80',
  true, 20, 599, false
),
(
  '10 Video Để Con Trở Thành Người Nhân Đức',
  '10-video-con-nguoi-nhan-duc',
  'Bộ video giúp con phát triển phẩm hạnh và lòng nhân ái.',
  'kids_pro',
  'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=600&fit=crop&q=80',
  false, 21, 249, false
),
(
  'Bộ 30 Video Nguyên Tắc Ứng Xử',
  '30-video-nguyen-tac-ung-xu',
  'Học cách ứng xử khéo léo, xây dựng mối quan hệ tốt đẹp.',
  'kids_pro',
  'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=600&fit=crop&q=80',
  false, 22, 399, false
),
(
  '30 Ngày Rèn Sự Bản Lĩnh & Lòng Biết Ơn',
  '30-ngay-ren-ban-linh-biet-on',
  'Thử thách 30 ngày giúp con rèn luyện bản lĩnh và lòng biết ơn.',
  'kids_pro',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=600&fit=crop&q=80',
  false, 23, 699, false
),

-- ===== Audio & Video =====
(
  'Thủ Lĩnh Thông Thái, Nhân Ái và Tự Tin',
  'thu-linh-thong-thai-nhan-ai',
  'Bộ sách nói giúp trẻ trở thành thủ lĩnh có tâm có tầm.',
  'audio',
  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&q=80',
  false, 30, 100, false
),
(
  'Lời Vàng Cho Con',
  'loi-vang-cho-con',
  'Thay lời cha mẹ nhắn gửi tới con — những điều quan trọng nhất.',
  'audio',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80',
  false, 31, 5, false
),
(
  '14 Bài Học Làm Người Làm Giàu',
  '14-bai-hoc-lam-nguoi-lam-giau',
  'Bộ 14 video "Tầm tiến, Tiến tới" — hành trình làm người thành công.',
  'video',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&q=80',
  false, 32, 5, false
),
(
  'Chuyển Đổi Vận Mệnh',
  'chuyen-doi-van-menh',
  'Kỷ lục gia thế giới Trần Quốc Phúc chia sẻ bí mật chuyển đổi cuộc đời.',
  'video',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop&q=80',
  false, 33, 199, false
);
