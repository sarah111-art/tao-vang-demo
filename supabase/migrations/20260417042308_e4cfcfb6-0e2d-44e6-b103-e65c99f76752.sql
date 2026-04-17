-- Add seeds_spent to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS seeds_spent integer NOT NULL DEFAULT 0;

-- Seed packages (top-up options in VND)
CREATE TABLE public.seed_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  seeds integer NOT NULL,
  price_vnd integer NOT NULL,
  bonus_seeds integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seed_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view seed packages" ON public.seed_packages FOR SELECT USING (true);
CREATE POLICY "Admins manage seed packages" ON public.seed_packages FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Membership packages (cost in seeds)
CREATE TABLE public.membership_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  months integer NOT NULL,
  seeds_cost integer NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.membership_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view membership packages" ON public.membership_packages FOR SELECT USING (true);
CREATE POLICY "Admins manage membership packages" ON public.membership_packages FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Transactions
CREATE TYPE public.tx_type AS ENUM ('topup', 'spend_membership');
CREATE TYPE public.tx_status AS ENUM ('pending', 'paid', 'failed', 'expired');

CREATE TABLE public.seed_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type public.tx_type NOT NULL,
  status public.tx_status NOT NULL DEFAULT 'pending',
  seeds_delta integer NOT NULL,                 -- +seeds for topup, -seeds for spend
  amount_vnd integer,                            -- only for topup
  order_code text UNIQUE,                        -- e.g. TVxxxxxx, used as bank memo
  sepay_ref text,                                -- SePay transaction id when paid
  package_id uuid,                               -- references seed_packages or membership_packages
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz
);
CREATE INDEX idx_seed_tx_user ON public.seed_transactions(user_id, created_at DESC);
CREATE INDEX idx_seed_tx_order ON public.seed_transactions(order_code);

ALTER TABLE public.seed_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own transactions" ON public.seed_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own pending transactions" ON public.seed_transactions FOR INSERT WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins manage transactions" ON public.seed_transactions FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Seed data
INSERT INTO public.seed_packages (name, seeds, price_vnd, bonus_seeds, sort_order) VALUES
  ('Gói 100 hạt', 100, 20000, 0, 1),
  ('Gói 599 hạt', 599, 99000, 50, 2),
  ('Gói 999 hạt', 999, 159000, 150, 3),
  ('Gói 1.299 hạt', 1299, 199000, 250, 4);

INSERT INTO public.membership_packages (name, months, seeds_cost, sort_order) VALUES
  ('1 Tháng', 1, 599, 1),
  ('6 Tháng', 6, 999, 2),
  ('12 Tháng', 12, 1299, 3);