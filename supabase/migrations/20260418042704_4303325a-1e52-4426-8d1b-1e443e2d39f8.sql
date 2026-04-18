
-- 1. Fix unlock_product: derive cost from DB, ignore client-supplied price
CREATE OR REPLACE FUNCTION public.unlock_product(p_product_id uuid, p_seeds_cost integer DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid         uuid := auth.uid();
  v_seeds       integer;
  v_actual_cost integer;
  v_requires_mb boolean;
  v_member_until timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RETURN json_build_object('ok', false, 'error', 'Chưa đăng nhập');
  END IF;

  SELECT price_seeds, requires_membership
    INTO v_actual_cost, v_requires_mb
  FROM public.products
  WHERE id = p_product_id;

  IF NOT FOUND THEN
    RETURN json_build_object('ok', false, 'error', 'Không tìm thấy sản phẩm');
  END IF;

  -- Membership-gated products: must be active member, no seed cost
  IF v_requires_mb THEN
    SELECT member_until INTO v_member_until
    FROM public.profiles WHERE user_id = v_uid;

    IF v_member_until IS NULL OR v_member_until < now() THEN
      RETURN json_build_object('ok', false, 'error', 'Cần thành viên Táo Vàng');
    END IF;

    INSERT INTO public.user_products (user_id, product_id, seeds_paid)
    VALUES (v_uid, p_product_id, 0)
    ON CONFLICT (user_id, product_id) DO NOTHING;

    RETURN json_build_object('ok', true);
  END IF;

  IF v_actual_cost IS NULL OR v_actual_cost <= 0 THEN
    RETURN json_build_object('ok', false, 'error', 'Sản phẩm không hợp lệ');
  END IF;

  SELECT seed_count INTO v_seeds
  FROM public.profiles
  WHERE user_id = v_uid
  FOR UPDATE;

  IF v_seeds IS NULL OR v_seeds < v_actual_cost THEN
    RETURN json_build_object('ok', false, 'error', 'Không đủ hạt');
  END IF;

  INSERT INTO public.user_products (user_id, product_id, seeds_paid)
  VALUES (v_uid, p_product_id, v_actual_cost)
  ON CONFLICT (user_id, product_id) DO NOTHING;

  UPDATE public.profiles
  SET seed_count  = seed_count  - v_actual_cost,
      seeds_spent = seeds_spent + v_actual_cost
  WHERE user_id = v_uid;

  RETURN json_build_object('ok', true);
END;
$$;

-- 2. Restrict profile updates: only full_name and phone editable by users
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users update safe profile fields"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND seed_count   = (SELECT seed_count   FROM public.profiles WHERE user_id = auth.uid())
  AND seeds_spent  = (SELECT seeds_spent  FROM public.profiles WHERE user_id = auth.uid())
  AND member_until IS NOT DISTINCT FROM (SELECT member_until FROM public.profiles WHERE user_id = auth.uid())
  AND referral_code IS NOT DISTINCT FROM (SELECT referral_code FROM public.profiles WHERE user_id = auth.uid())
);

-- 3. Remove user-side INSERT on seed_transactions; only admins/service role write
DROP POLICY IF EXISTS "Users create own pending transactions" ON public.seed_transactions;

-- 4. Explicitly block any user-side INSERT/UPDATE/DELETE on user_roles
--    (Admins ALL policy is intentionally NOT added — role assignment must go through service role)
CREATE POLICY "Block user role self-assignment"
ON public.user_roles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Block user role updates"
ON public.user_roles
FOR UPDATE
USING (false);

CREATE POLICY "Block user role deletes"
ON public.user_roles
FOR DELETE
USING (false);
