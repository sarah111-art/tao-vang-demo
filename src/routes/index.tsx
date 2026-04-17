import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Headphones, Play, BookOpen, Sparkles } from "lucide-react";

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
  category: "book" | "audio" | "video" | "kids";
  cover_url: string | null;
  is_featured: boolean;
};

const categoryLabel: Record<Product["category"], string> = {
  book: "Táo Vàng",
  audio: "Audio",
  video: "Video",
  kids: "Sách nói thiếu nhi",
};

const categoryIcon: Record<Product["category"], typeof BookOpen> = {
  book: BookOpen,
  audio: Headphones,
  video: Play,
  kids: Sparkles,
};

const categoryGradient: Record<Product["category"], string> = {
  book: "from-emerald-400 to-green-600",
  audio: "from-violet-400 to-purple-600",
  video: "from-rose-400 to-red-500",
  kids: "from-amber-400 to-orange-500",
};

function ProductCover({
  cover_url, category, className,
}: { cover_url: string | null; category: Product["category"]; className?: string }) {
  const Icon = categoryIcon[category];
  const gradient = categoryGradient[category];
  if (cover_url) {
    return (
      <img
        src={cover_url}
        alt=""
        className={`w-full h-full object-cover ${className ?? ""}`}
        loading="lazy"
      />
    );
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} grid place-items-center text-white ${className ?? ""}`}>
      <Icon className="h-8 w-8 opacity-80" />
    </div>
  );
}

function ProductsPage() {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void supabase
      .from("products")
      .select("id,title,slug,description,category,cover_url,is_featured")
      .order("sort_order")
      .then(({ data }) => setProducts((data ?? []) as Product[]));
  }, []);

  const featured = products.filter((p) => p.is_featured).slice(0, 4);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featured.length < 2) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % featured.length;
        const el = scrollRef.current;
        if (el) {
          const cardWidth = el.scrollWidth / featured.length;
          el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [featured.length]);

  const grouped = (["book", "audio", "video", "kids"] as const).map((c) => ({
    cat: c,
    items: products.filter((p) => p.category === c),
  }));

  return (
    <AppLayout>
      <PageHeader title="Sản phẩm" seedCount={profile?.seed_count ?? 0} />

      {/* Featured carousel */}
      <section className="-mt-10 px-4">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / (el.scrollWidth / featured.length));
            setActiveSlide(index);
          }}
        >
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="snap-center shrink-0 w-[85%] rounded-3xl overflow-hidden shadow-card"
            >
              <Link to="/san-pham/$slug" params={{ slug: p.slug }} className="block">
                <div className="relative h-48 overflow-hidden">
                  <ProductCover cover_url={p.cover_url} category={p.category} className="rounded-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {categoryLabel[p.category]}
                  </div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-white text-base font-extrabold leading-snug drop-shadow">
                    {p.title}
                  </h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        {/* Dot indicators */}
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
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-5 bg-primary" : "w-1.5 bg-primary/30"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Grouped sections */}
      {grouped.map(({ cat, items }) => {
        if (items.length === 0) return null;
        const Icon = categoryIcon[cat];
        return (
          <section key={cat} className="px-4 mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold border-b-2 border-primary pb-0.5">
                {categoryLabel[cat]}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {items.map((p) => (
                <Link
                  key={p.id}
                  to="/san-pham/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <ProductCover cover_url={p.cover_url} category={p.category} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-semibold line-clamp-2 leading-tight">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </AppLayout>
  );
}
