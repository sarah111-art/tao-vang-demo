-- Bảng lưu sản phẩm người dùng đã mở khóa
CREATE TABLE IF NOT EXISTS public.user_products (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  seeds_paid integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON public.user_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own" ON public.user_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Hàm unlock atomic: kiểm tra hạt → trừ hạt → ghi user_products
CREATE OR REPLACE FUNCTION public.unlock_product(p_product_id uuid, p_seeds_cost integer)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_seeds integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN json_build_object('ok', false, 'error', 'Chưa đăng nhập');
  END IF;

  SELECT seed_count INTO v_seeds
  FROM public.profiles
  WHERE user_id = v_uid
  FOR UPDATE;

  IF v_seeds < p_seeds_cost THEN
    RETURN json_build_object('ok', false, 'error', 'Không đủ hạt');
  END IF;

  INSERT INTO public.user_products (user_id, product_id, seeds_paid)
  VALUES (v_uid, p_product_id, p_seeds_cost)
  ON CONFLICT (user_id, product_id) DO NOTHING;

  UPDATE public.profiles
  SET seed_count  = seed_count  - p_seeds_cost,
      seeds_spent = seeds_spent + p_seeds_cost
  WHERE user_id = v_uid;

  RETURN json_build_object('ok', true);
END;
$$;
