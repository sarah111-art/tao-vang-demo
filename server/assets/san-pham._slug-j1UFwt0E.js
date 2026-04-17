import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { e as Route, s as supabase, L as Link } from "./router-jcV2fEf8.js";
import { B as Button } from "./button-B6b8l3Ee.js";
import { C as Card } from "./card-HrA5aNz_.js";
import { S as Sparkles, H as Headphones, B as BookOpen } from "./sparkles-CfBDz9Kk.js";
import { P as Play } from "./play-D8aVPVID.js";
import { A as ArrowLeft } from "./arrow-left-BW13aPMg.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-Dnt6Ta-A.js";
const labels = {
  book: "Khoá học",
  audio: "Audio",
  video: "Video",
  kids: "Sách nói thiếu nhi"
};
const icons = {
  book: BookOpen,
  audio: Headphones,
  video: Play,
  kids: Sparkles
};
function ProductDetail() {
  const {
    slug
  } = Route.useParams();
  const [product, setProduct] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    void supabase.from("products").select("id,title,description,category,cover_url,content_url").eq("slug", slug).maybeSingle().then(({
      data
    }) => {
      setProduct(data);
      setLoading(false);
    });
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "phone-frame", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-10 text-center text-muted-foreground", children: "Đang tải..." }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phone-frame p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Không tìm thấy sản phẩm." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Về trang sản phẩm" }) })
    ] });
  }
  const Icon = icons[product.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phone-frame flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient text-primary-foreground px-5 pt-10 pb-16 rounded-b-[2rem]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1 text-sm opacity-90 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Sản phẩm"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-card/25 backdrop-blur text-xs font-semibold px-2 py-0.5 rounded-full", children: labels[product.category] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold mt-2 drop-shadow", children: product.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mx-4 -mt-8 p-5 shadow-card space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-2xl overflow-hidden bg-muted", children: product.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.cover_url, alt: product.title, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "warm-gradient w-full h-full grid place-items-center text-warm-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-14 w-14 opacity-90" }) }) }),
      product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/80", children: product.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 mr-2 fill-current" }),
        " Bắt đầu học"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" })
  ] });
}
export {
  ProductDetail as component
};
