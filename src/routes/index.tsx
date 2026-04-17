import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

function ProductsPage() {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void supabase
      .from("products")
      .select("id,title,slug,description,category,is_featured")
      .order("sort_order")
      .then(({ data }) => setProducts((data ?? []) as Product[]));
  }, []);

  const featured = products.filter((p) => p.is_featured);
  const grouped = (["book", "audio", "video", "kids"] as const).map((c) => ({
    cat: c,
    items: products.filter((p) => p.category === c),
  }));

  return (
    <AppLayout>
      <PageHeader title="Sản phẩm" seedCount={profile?.seed_count ?? 0} />

      {/* Featured carousel */}
      <section className="-mt-10 px-4">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4">
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="snap-center shrink-0 w-[80%] rounded-3xl overflow-hidden shadow-card"
            >
              <div className="warm-gradient h-44 grid place-items-center text-primary-foreground p-5 relative">
                <div className="absolute top-3 left-3 bg-card/30 backdrop-blur text-primary-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {categoryLabel[p.category]}
                </div>
                <h3 className="text-xl font-extrabold text-center leading-snug drop-shadow">
                  {p.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
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
                  <div className="hero-gradient aspect-[4/5] grid place-items-center p-3 text-primary-foreground">
                    <Icon className="h-8 w-8 opacity-80" />
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
