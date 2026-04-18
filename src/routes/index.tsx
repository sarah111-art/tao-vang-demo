import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { CheckCircle2, Crown, Lock } from "lucide-react";
import { VideoCourseCard, type AccessState } from "@/components/VideoCourseCard";
import { UnlockDialog } from "@/components/UnlockDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sản phẩm — Táo Vàng" },
      { name: "description", content: "Khám phá khoá học, sách nói thiếu nhi, audio và video Táo Vàng." },
      { property: "og:title", content: "Sản phẩm — Táo Vàng" },
      { property: "og:description", content: "Khoá học, sách nói, audio và video chất lượng dành cho cả gia đình." },
    ],
  }),
  component: ProductsPage,
});

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: "book" | "audio" | "video" | "kids" | "kids_pro";
  cover_url: string | null;
  is_featured: boolean;
  price_seeds: number | null;
  requires_membership: boolean;
};

const FALLBACK_PRICES: Record<string, { price: number | null; membership: boolean }> = {
  "tao-vang-cho-ca-gia-dinh":      { price: null, membership: true },
  "trau-doi-ban-linh-duong-duc":   { price: 199,  membership: false },
  "tao-vang-cho-tre-combo":        { price: null, membership: true },
  "to-uoc-mo":                     { price: 20,   membership: false },
  "to-thong-thai":                 { price: 20,   membership: false },
  "to-co-thoi-quen-tot":           { price: 20,   membership: false },
  "to-biet-on":                    { price: 20,   membership: false },
  "50-pham-chat-nguoi-thanh-cong": { price: 599,  membership: false },
  "10-video-con-nguoi-nhan-duc":   { price: 249,  membership: false },
  "30-video-nguyen-tac-ung-xu":    { price: 399,  membership: false },
  "30-ngay-ren-ban-linh-biet-on":  { price: 699,  membership: false },
  "thu-linh-thong-thai-nhan-ai":   { price: 100,  membership: false },
  "loi-vang-cho-con":              { price: 5,    membership: false },
  "14-bai-hoc-lam-nguoi-lam-giau": { price: 5,    membership: false },
  "chuyen-doi-van-menh":           { price: 199,  membership: false },
};

const KIDS_PRO_GRADIENTS = [
  "from-green-700 via-green-500 to-green-800",
  "from-pink-600 via-rose-400 to-pink-700",
  "from-yellow-600 via-amber-400 to-yellow-700",
  "from-red-700 via-red-500 to-red-800",
];
const KIDS_PRO_BORDERS = ["border-orange-400", "border-pink-300", "border-yellow-400", "border-red-400"];

const AUDIO_VIDEO_GRADIENTS = [
  "from-amber-600 via-yellow-500 to-amber-700",
  "from-teal-600 via-emerald-500 to-teal-700",
  "from-blue-600 via-sky-500 to-blue-700",
  "from-purple-600 via-violet-500 to-purple-700",
];
const AUDIO_VIDEO_BORDERS = ["border-yellow-400", "border-emerald-400", "border-sky-400", "border-violet-400"];

function computeAccess(
  p: Product,
  loggedIn: boolean,
  isVip: boolean,
  ownedIds: Set<string>,
  seedCount: number
): AccessState {
  if (!p.price_seeds && !p.requires_membership) return "free";
  if (!loggedIn) return "unauthenticated";
  if (isVip) return "vip";
  if (ownedIds.has(p.id)) return "owned";
  if (p.price_seeds != null && seedCount >= p.price_seeds) return "affordable";
  return "insufficient";
}

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-lg font-bold pb-0.5 mb-3 inline-block border-b-2 border-primary">
      {label}
    </h2>
  );
}

function AccessButton({
  state,
  price,
  membership,
  size = "sm",
}: {
  state: AccessState;
  price: number | null;
  membership: boolean;
  size?: "sm" | "lg";
}) {
  const base = "flex items-center justify-center gap-1.5 rounded-xl font-bold text-white";
  const sz = size === "lg" ? "w-full py-3 text-base" : "w-full py-2 text-sm";

  if (state === "owned") return (
    <div className={`${base} ${sz} bg-emerald-600`}>
      <CheckCircle2 className="w-4 h-4 shrink-0" /><span>Đã mở</span>
    </div>
  );
  if (state === "vip") return (
    <div className={`${base} ${sz} bg-amber-500`}>
      <Crown className="w-4 h-4 shrink-0" /><span>VIP — Xem ngay</span>
    </div>
  );
  if (state === "free") return null;

  const bg = state === "insufficient" ? "bg-red-500" : "bg-[#5cb85c]";
  if (membership) return (
    <div className={`${base} ${sz} ${bg}`}>
      <Lock className="w-4 h-4 shrink-0" /><span>Thành viên Táo Vàng</span>
    </div>
  );
  if (price == null) return null;
  return (
    <div className={`${base} ${sz} ${bg}`}>
      <Lock className="w-4 h-4 shrink-0" />
      <span><span className="text-[#ffd700] font-extrabold">{price}</span> hạt</span>
    </div>
  );
}

function CourseSection({
  label,
  items,
  gradients,
  borders,
  accessMap,
  ctaFor,
  onCardClick,
}: {
  label: string;
  items: Product[];
  gradients: string[];
  borders: string[];
  accessMap: Map<string, AccessState>;
  ctaFor: (p: Product) => string;
  onCardClick: (p: Product) => void;
}) {
  if (items.length === 0) return null;
  return (
    <section className="px-4 mt-6">
      <SectionHeader label={label} />
      <div className="grid grid-cols-2 gap-3">
        {items.map((p, i) => (
          <VideoCourseCard
            key={p.id}
            title={p.title}
            seedPrice={p.price_seeds}
            imageSrc={p.cover_url}
            gradient={gradients[i % gradients.length]}
            borderColor={borders[i % borders.length]}
            accessState={accessMap.get(p.id) ?? "unauthenticated"}
            cta={ctaFor(p)}
            onClick={() => onCardClick(p)}
          />
        ))}
      </div>
    </section>
  );
}

function ProductsPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
  const [unlockTarget, setUnlockTarget] = useState<Product | null>(null);

  useEffect(() => {
    void supabase
      .from("products")
      .select("id,title,slug,description,category,cover_url,is_featured")
      .order("sort_order")
      .then(({ data }) =>
        setProducts(
          (data ?? []).map((p) => {
            const fb = FALLBACK_PRICES[p.slug] ?? { price: null, membership: false };
            return { ...p, price_seeds: fb.price, requires_membership: fb.membership } as Product;
          })
        )
      );
  }, []);

  useEffect(() => {
    if (!user) { setOwnedIds(new Set()); return; }
    void supabase
      .from("user_products")
      .select("product_id")
      .then(({ data, error }) => {
        if (!error) setOwnedIds(new Set((data ?? []).map((r) => r.product_id)));
      });
  }, [user]);

  const isVip = useMemo(
    () => profile?.member_until ? new Date(profile.member_until) > new Date() : false,
    [profile?.member_until]
  );

  const accessMap = useMemo(() => {
    const loggedIn = !!user;
    const seedCount = profile?.seed_count ?? 0;
    return new Map(products.map((p) => [p.id, computeAccess(p, loggedIn, isVip, ownedIds, seedCount)]));
  }, [products, user, isVip, ownedIds, profile?.seed_count]);

  function handleCardClick(p: Product) {
    const access = accessMap.get(p.id) ?? "unauthenticated";
    if (access === "unauthenticated") { void navigate({ to: "/auth" }); return; }
    if (access === "free" || access === "owned" || access === "vip") {
      void navigate({ to: "/san-pham/$slug", params: { slug: p.slug } });
      return;
    }
    setUnlockTarget(p);
  }

  function handleUnlocked() {
    if (!unlockTarget) return;
    const id = unlockTarget.id;
    const slug = unlockTarget.slug;
    setOwnedIds((prev) => { const next = new Set(prev); next.add(id); return next; });
    setUnlockTarget(null);
    void navigate({ to: "/san-pham/$slug", params: { slug } });
  }

  const featured = useMemo(() => products.filter((p) => p.is_featured).slice(0, 5), [products]);
  const books    = useMemo(() => products.filter((p) => p.category === "book"), [products]);
  const kids     = useMemo(() => products.filter((p) => p.category === "kids"), [products]);
  const kidsPro  = useMemo(() => products.filter((p) => p.category === "kids_pro"), [products]);
  const audioVideo = useMemo(
    () => products.filter((p) => p.category === "audio" || p.category === "video"),
    [products]
  );

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featured.length < 2) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % featured.length;
        const el = scrollRef.current;
        if (el) el.scrollTo({ left: next * (el.scrollWidth / featured.length), behavior: "smooth" });
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [featured.length]);

  return (
    <AppLayout>
      <PageHeader title="Sản phẩm" seedCount={profile?.seed_count ?? 0} />

      <UnlockDialog
        open={unlockTarget !== null}
        onOpenChange={(v) => { if (!v) setUnlockTarget(null); }}
        productId={unlockTarget?.id ?? ""}
        productTitle={unlockTarget?.title ?? ""}
        seedPrice={unlockTarget?.price_seeds ?? 0}
        onUnlocked={handleUnlocked}
        onOpenMembership={() => void navigate({ to: "/tai-khoan" })}
      />

      {/* Featured carousel */}
      <section className="-mt-10 px-4">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            setActiveSlide(Math.round(el.scrollLeft / (el.scrollWidth / (featured.length || 1))));
          }}
        >
          {featured.map((p, i) => {
            const access = accessMap.get(p.id);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="snap-center shrink-0 w-[85%] rounded-3xl overflow-hidden shadow-card cursor-pointer"
                onClick={() => handleCardClick(p)}
              >
                <div className="relative h-48 overflow-hidden">
                  {p.cover_url ? (
                    <img
                      src={p.cover_url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding={i === 0 ? "sync" : "async"}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-green-600" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {access === "owned" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-600/90 rounded-full px-2 py-0.5">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                      <span className="text-white text-[10px] font-bold">Đã mở</span>
                    </div>
                  )}
                  {access === "vip" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/90 rounded-full px-2 py-0.5">
                      <Crown className="h-3 w-3 text-white" />
                      <span className="text-white text-[10px] font-bold">VIP</span>
                    </div>
                  )}
                  <h3 className="absolute bottom-4 left-4 right-4 text-white text-base font-extrabold leading-snug drop-shadow">
                    {p.title}
                  </h3>
                </div>
              </motion.article>
            );
          })}
        </div>
        {featured.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {featured.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollTo({ left: i * (el.scrollWidth / featured.length), behavior: "smooth" });
                  setActiveSlide(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-5 bg-primary" : "w-1.5 bg-primary/30"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Táo Vàng (book) */}
      {books.length > 0 && (
        <section className="px-4 mt-6">
          <SectionHeader label="Táo Vàng" />
          <div className="flex flex-col gap-4">
            {books.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl overflow-hidden bg-card shadow-soft cursor-pointer"
                onClick={() => handleCardClick(p)}
              >
                {p.cover_url && (
                  <div className="aspect-video overflow-hidden">
                    <img src={p.cover_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-extrabold text-sm uppercase mb-1">{p.title}</h3>
                  {p.description && (
                    <p className="text-xs text-muted-foreground whitespace-pre-line mb-3 line-clamp-5">
                      {p.description}
                    </p>
                  )}
                  <AccessButton
                    state={accessMap.get(p.id) ?? "unauthenticated"}
                    price={p.price_seeds}
                    membership={p.requires_membership}
                    size="lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sách nói thiếu nhi (kids) */}
      {kids.length > 0 && (
        <section className="px-4 mt-6">
          <SectionHeader label="Sách nói thiếu nhi" />
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
            {kids.map((p) => {
              const access = accessMap.get(p.id);
              return (
                <div
                  key={p.id}
                  className="shrink-0 w-28 rounded-xl overflow-hidden bg-card shadow-soft relative cursor-pointer"
                  onClick={() => handleCardClick(p)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    {p.cover_url ? (
                      <img src={p.cover_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500" />
                    )}
                    {(access === "owned" || access === "vip") ? (
                      <div className="absolute top-1 right-1 bg-emerald-600/90 rounded-full p-0.5">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    ) : access !== "free" ? (
                      <div className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <CourseSection
        label="Táo Vàng Cho Trẻ"
        items={kidsPro}
        gradients={KIDS_PRO_GRADIENTS}
        borders={KIDS_PRO_BORDERS}
        accessMap={accessMap}
        ctaFor={() => "Xem ngay"}
        onCardClick={handleCardClick}
      />

      <CourseSection
        label="Audio & Video"
        items={audioVideo}
        gradients={AUDIO_VIDEO_GRADIENTS}
        borders={AUDIO_VIDEO_BORDERS}
        accessMap={accessMap}
        ctaFor={(p) => p.category === "audio" ? "Nghe ngay" : "Xem ngay"}
        onCardClick={handleCardClick}
      />
    </AppLayout>
  );
}
