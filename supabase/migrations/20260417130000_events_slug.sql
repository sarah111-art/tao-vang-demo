-- Add slug to events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Update existing events with slugs
UPDATE public.events SET slug = 'hoi-thao-gieo-hat-giong-yeu-thuong'
  WHERE title ILIKE '%Gieo Hạt Giống Yêu Thương%';

UPDATE public.events SET slug = 'workshop-ke-chuyen-pham-hanh-cho-be'
  WHERE title ILIKE '%Kể Chuyện Phẩm Hạnh%';

UPDATE public.events SET slug = 'trai-he-tao-vang-2026'
  WHERE title ILIKE '%Trại Hè Táo Vàng%';

UPDATE public.events SET slug = 'gap-go-cong-dong-tao-vang-thang-6'
  WHERE title ILIKE '%Gặp Gỡ Cộng Đồng%';

UPDATE public.events SET slug = 'le-trao-giai-gia-dinh-pham-hanh-2026'
  WHERE title ILIKE '%Lễ Trao Giải%';

UPDATE public.events SET slug = 'khoa-hoc-online-thien-dinh-cung-con'
  WHERE title ILIKE '%Thiền Định Cùng Con%';
