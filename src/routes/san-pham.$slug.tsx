import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Headphones, Play, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/san-pham/$slug")({
  component: ProductDetail,
});

type Product = {
  id: string;
  title: string;
  description: string | null;
  category: "book" | "audio" | "video" | "kids";
  cover_url: string | null;
  content_url: string | null;
};

const labels: Record<Product["category"], string> = {
  book: "Khoá học",
  audio: "Audio",
  video: "Video",
  kids: "Sách nói thiếu nhi",
};
const icons: Record<Product["category"], typeof BookOpen> = {
  book: BookOpen,
  audio: Headphones,
  video: Play,
  kids: Sparkles,
};

function ProductDetail() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase
      .from("products")
      .select("id,title,description,category,cover_url,content_url")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as Product | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="phone-frame">
        <p className="p-10 text-center text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="phone-frame p-6 text-center">
        <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm.</p>
        <Button asChild>
          <Link to="/">Về trang sản phẩm</Link>
        </Button>
      </div>
    );
  }

  const Icon = icons[product.category];

  return (
    <div className="phone-frame flex flex-col">
      <div className="hero-gradient text-primary-foreground px-5 pt-10 pb-16 rounded-b-[2rem]">
        <Link to="/" className="inline-flex items-center gap-1 text-sm opacity-90 mb-3">
          <ArrowLeft className="h-4 w-4" /> Sản phẩm
        </Link>
        <span className="inline-block bg-card/25 backdrop-blur text-xs font-semibold px-2 py-0.5 rounded-full">
          {labels[product.category]}
        </span>
        <h1 className="text-2xl font-extrabold mt-2 drop-shadow">{product.title}</h1>
      </div>

      <Card className="mx-4 -mt-8 p-5 shadow-card space-y-4">
        <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
          {product.cover_url ? (
            <img src={product.cover_url} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <div className="warm-gradient w-full h-full grid place-items-center text-warm-foreground">
              <Icon className="h-14 w-14 opacity-90" />
            </div>
          )}
        </div>
        {product.description && (
          <p className="text-sm leading-relaxed text-foreground/80">{product.description}</p>
        )}
        <Button className="w-full" size="lg">
          <Play className="h-4 w-4 mr-2 fill-current" /> Bắt đầu học
        </Button>
      </Card>

      <div className="h-10" />
    </div>
  );
}
