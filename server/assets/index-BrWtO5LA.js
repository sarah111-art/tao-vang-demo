import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { u as useAuth, s as supabase, m as motion, L as Link } from "./router-jcV2fEf8.js";
import { A as AppLayout, P as PageHeader } from "./AppLayout-BIdpcHEb.js";
import { S as Sparkles, H as Headphones, B as BookOpen } from "./sparkles-CfBDz9Kk.js";
import { P as Play } from "./play-D8aVPVID.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-Dnt6Ta-A.js";
const categoryLabel = {
  book: "Táo Vàng",
  audio: "Audio",
  video: "Video",
  kids: "Sách nói thiếu nhi"
};
const categoryIcon = {
  book: BookOpen,
  audio: Headphones,
  video: Play,
  kids: Sparkles
};
const categoryGradient = {
  book: "from-emerald-400 to-green-600",
  audio: "from-violet-400 to-purple-600",
  video: "from-rose-400 to-red-500",
  kids: "from-amber-400 to-orange-500"
};
function ProductCover({
  cover_url,
  category,
  className
}) {
  const Icon = categoryIcon[category];
  const gradient = categoryGradient[category];
  if (cover_url) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cover_url, alt: "", className: `w-full h-full object-cover ${className ?? ""}`, loading: "lazy" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full h-full bg-gradient-to-br ${gradient} grid place-items-center text-white ${className ?? ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 opacity-80" }) });
}
function ProductsPage() {
  const {
    profile
  } = useAuth();
  const [products, setProducts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    void supabase.from("products").select("id,title,slug,description,category,cover_url,is_featured").order("sort_order").then(({
      data
    }) => setProducts(data ?? []));
  }, []);
  const featured = products.filter((p) => p.is_featured).slice(0, 4);
  const [activeSlide, setActiveSlide] = reactExports.useState(0);
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (featured.length < 2) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % featured.length;
        const el = scrollRef.current;
        if (el) {
          const cardWidth = el.scrollWidth / featured.length;
          el.scrollTo({
            left: next * cardWidth,
            behavior: "smooth"
          });
        }
        return next;
      });
    }, 3e3);
    return () => clearInterval(id);
  }, [featured.length]);
  const grouped = ["book", "audio", "video", "kids"].map((c) => ({
    cat: c,
    items: products.filter((p) => p.category === c)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Sản phẩm", seedCount: profile?.seed_count ?? 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "-mt-10 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 scrollbar-hide", style: {
        scrollbarWidth: "none"
      }, onScroll: (e) => {
        const el = e.currentTarget;
        const index = Math.round(el.scrollLeft / (el.scrollWidth / featured.length));
        setActiveSlide(index);
      }, children: featured.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.article, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.07
      }, className: "snap-center shrink-0 w-[85%] rounded-3xl overflow-hidden shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/san-pham/$slug", params: {
        slug: p.slug
      }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCover, { cover_url: p.cover_url, category: p.category, className: "rounded-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full", children: categoryLabel[p.category] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "absolute bottom-4 left-4 right-4 text-white text-base font-extrabold leading-snug drop-shadow", children: p.title })
      ] }) }) }, p.id)) }),
      featured.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1.5 mt-2", children: featured.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({
          left: i * (el.scrollWidth / featured.length),
          behavior: "smooth"
        });
      }, className: `h-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? "w-5 bg-primary" : "w-1.5 bg-primary/30"}` }, i)) })
    ] }),
    grouped.map(({
      cat,
      items
    }) => {
      if (items.length === 0) return null;
      const Icon = categoryIcon[cat];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold border-b-2 border-primary pb-0.5", children: categoryLabel[cat] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/san-pham/$slug", params: {
          slug: p.slug
        }, className: "group rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-card transition-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] overflow-hidden relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCover, { cover_url: p.cover_url, category: p.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold line-clamp-2 leading-tight", children: p.title }) })
        ] }, p.id)) })
      ] }, cat);
    })
  ] });
}
export {
  ProductsPage as component
};
