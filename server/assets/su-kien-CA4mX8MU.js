import { a0 as useChildMatches, U as jsxRuntimeExports, _ as Outlet, r as reactExports } from "./worker-entry-DbZuVAdO.js";
import { u as useAuth, s as supabase, m as motion, L as Link } from "./router-jcV2fEf8.js";
import { A as AppLayout, P as PageHeader } from "./AppLayout-BIdpcHEb.js";
import { c as createLucideIcon } from "./createLucideIcon-Dnt6Ta-A.js";
import { C as Calendar, M as MapPin } from "./map-pin-DqT_MOLb.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function SuKienRoot() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EventsPage, {});
}
function EventsPage() {
  const {
    profile
  } = useAuth();
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    void supabase.from("events").select("id,title,description,event_date,location,image_url,slug").order("event_date", {
      ascending: true
    }).then(({
      data
    }) => {
      setEvents(data ?? []);
      setLoading(false);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Sự kiện", seedCount: profile?.seed_count ?? 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 -mt-8 space-y-4 pb-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-10", children: "Đang tải..." }) : events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-20", children: "Chưa có sự kiện mới." }) : events.map((e, i) => {
      const card = /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.08
      }, className: "rounded-3xl overflow-hidden bg-card shadow-card active:scale-[0.98] transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden", children: [
          e.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.image_url, alt: e.title, className: "w-full h-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-gradient w-full h-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "absolute bottom-4 left-4 right-8 text-white text-lg font-extrabold drop-shadow leading-tight", children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "absolute bottom-4 right-4 h-5 w-5 text-white/80" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 line-clamp-2", children: e.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
            e.event_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              new Date(e.event_date).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })
            ] }),
            e.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              e.location
            ] })
          ] })
        ] })
      ] }, e.id);
      return e.slug ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/su-kien/$slug", params: {
        slug: e.slug
      }, children: card }, e.id) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: card }, e.id);
    }) })
  ] });
}
export {
  SuKienRoot as component
};
