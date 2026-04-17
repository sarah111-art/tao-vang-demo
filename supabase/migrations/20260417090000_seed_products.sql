-- Seed real product data for Táo Vàng
INSERT INTO public.products (title, slug, description, category, cover_url, content_url, is_featured, sort_order) VALUES

-- Khoá học (book)
(
  'Khoá học Táo Vàng: 24 Phẩm Hạnh Trẻ Em',
  'khoa-hoc-24-pham-hanh',
  'Hành trình khám phá 24 phẩm hạnh cốt lõi giúp con trẻ xây dựng nhân cách tốt đẹp, tự tin và yêu thương. Mỗi bài học gắn liền với câu chuyện sinh động, trò chơi và hoạt động thực hành tại nhà.',
  'book',
  null,
  null,
  true,
  1
),
(
  'Nuôi Dưỡng Tâm Hồn: Khoá Học Dành Cho Cha Mẹ',
  'nuoi-duong-tam-hon-cha-me',
  'Khoá học giúp cha mẹ hiểu và đồng hành cùng con trong từng giai đoạn phát triển. Trang bị kiến thức, kỹ năng và sự kiên nhẫn để nuôi dưỡng tâm hồn con trẻ.',
  'book',
  null,
  null,
  true,
  2
),
(
  'Lòng Biết Ơn – Hạt Giống Hạnh Phúc',
  'long-biet-on-hat-giong-hanh-phuc',
  'Khoá học chuyên sâu về phẩm hạnh biết ơn — từ lý thuyết đến thực hành hàng ngày. Giúp cả gia đình sống trọn vẹn hơn và nhận ra những điều tốt đẹp xung quanh.',
  'book',
  null,
  null,
  false,
  3
),
(
  'Trung Thực & Dũng Cảm: Xây Nền Tảng Nhân Cách',
  'trung-thuc-dung-cam',
  'Hướng dẫn cha mẹ và con cùng nhau luyện tập tính trung thực và dũng cảm qua các tình huống thực tế trong cuộc sống hàng ngày.',
  'book',
  null,
  null,
  false,
  4
),

-- Audio
(
  'Audio Táo Vàng: Những Câu Chuyện Phẩm Hạnh',
  'audio-chuyen-pham-hanh',
  'Bộ sưu tập hơn 50 câu chuyện âm thanh về 24 phẩm hạnh, được kể bằng giọng đọc ấm áp, phù hợp cho trẻ từ 3–10 tuổi nghe trước khi ngủ hoặc trong lúc di chuyển.',
  'audio',
  null,
  null,
  true,
  5
),
(
  'Thiền Định Cùng Con – Audio Thư Giãn Cho Gia Đình',
  'thien-dinh-cung-con',
  'Các bài thiền ngắn (5–10 phút) được thiết kế đặc biệt cho trẻ em và cha mẹ. Giúp cả nhà bình tâm, kết nối và chuẩn bị tâm thế tốt cho ngày mới.',
  'audio',
  null,
  null,
  false,
  6
),
(
  'Nhạc Thiền Táo Vàng – Nền Nhạc Học Tập & Thư Giãn',
  'nhac-thien-tao-vang',
  'Bộ nhạc không lời được sáng tác riêng để tạo không gian yên bình, hỗ trợ tập trung học bài, đọc sách hay thư giãn sau một ngày dài.',
  'audio',
  null,
  null,
  false,
  7
),

-- Video
(
  'Video Bài Giảng: Hành Trình 24 Phẩm Hạnh',
  'video-bai-giang-24-pham-hanh',
  'Series video bài giảng sinh động với hoạt hình minh hoạ, phù hợp để xem cùng gia đình. Mỗi tập tập trung vào một phẩm hạnh kèm gợi ý thực hành.',
  'video',
  null,
  null,
  true,
  8
),
(
  'Hội Thảo Online: Đồng Hành Cùng Con Tuổi Teen',
  'hoi-thao-dong-hanh-tuoi-teen',
  'Ghi lại toàn bộ hội thảo với chuyên gia tâm lý — chia sẻ cách giao tiếp, xây dựng tin tưởng và giữ kết nối với con trong giai đoạn tuổi teen đầy thách thức.',
  'video',
  null,
  null,
  false,
  9
),
(
  'Workshop Gia Đình: Tạo Góc Đọc Sách Yêu Thích',
  'workshop-goc-doc-sach',
  'Video hướng dẫn thực hành xây dựng thói quen đọc sách cho cả gia đình. Từ cách chọn sách phù hợp đến thiết kế góc đọc ấm cúng tại nhà.',
  'video',
  null,
  null,
  false,
  10
),

-- Sách nói thiếu nhi (kids)
(
  'Sách Nói: Chú Táo Vàng Và Những Người Bạn',
  'sach-noi-chu-tao-vang',
  'Bộ sách nói kể về hành trình của chú Táo Vàng cùng các bạn thú rừng học cách yêu thương, chia sẻ và dũng cảm. Giọng đọc diễn cảm, có nhạc nền và hiệu ứng âm thanh sinh động.',
  'kids',
  null,
  null,
  true,
  11
),
(
  'Sách Nói: Hạt Giống Phép Màu',
  'sach-noi-hat-giong-phep-mau',
  'Câu chuyện về một hạt giống nhỏ học cách kiên nhẫn, chăm chỉ để trở thành cây to che bóng mát cho cả khu rừng. Phù hợp cho trẻ từ 4–8 tuổi.',
  'kids',
  null,
  null,
  false,
  12
),
(
  'Sách Nói: 12 Câu Chuyện Về Lòng Tốt',
  'sach-noi-12-cau-chuyen-long-tot',
  'Tuyển tập 12 câu chuyện ngắn về những hành động tử tế nhỏ bé nhưng tạo nên sự thay đổi lớn. Kèm câu hỏi gợi ý để cha mẹ và con trò chuyện sau mỗi câu chuyện.',
  'kids',
  null,
  null,
  false,
  13
),
(
  'Sách Nói: Bé Học Cảm Xúc',
  'sach-noi-be-hoc-cam-xuc',
  'Hướng dẫn trẻ nhận biết và quản lý cảm xúc qua những câu chuyện vui nhộn. Giúp bé hiểu rằng mọi cảm xúc đều có giá trị và biết cách thể hiện phù hợp.',
  'kids',
  null,
  null,
  false,
  14
);
