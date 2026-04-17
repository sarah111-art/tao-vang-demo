import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { d as Route, s as supabase, L as Link, t as toast } from "./router-jcV2fEf8.js";
import { B as Button } from "./button-B6b8l3Ee.js";
import { A as ArrowLeft } from "./arrow-left-BW13aPMg.js";
import { S as Share2 } from "./share-2-CRLnkn-V.js";
import { C as Calendar, M as MapPin } from "./map-pin-DqT_MOLb.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-Dnt6Ta-A.js";
function EventDetail() {
  const {
    slug
  } = Route.useParams();
  const [event, setEvent] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    void supabase.from("events").select("id,title,description,event_date,location,image_url,slug").eq("slug", slug).maybeSingle().then(({
      data
    }) => {
      setEvent(data);
      setLoading(false);
    });
  }, [slug]);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: event?.title ?? "",
        url
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Đã sao chép link!");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "phone-frame flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Đang tải..." }) });
  }
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phone-frame flex flex-col items-center justify-center min-h-screen gap-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Không tìm thấy sự kiện." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/su-kien", children: "← Về danh sách sự kiện" }) })
    ] });
  }
  const dateStr = event.event_date ? new Date(event.event_date).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }) : null;
  const timeStr = event.event_date ? new Date(event.event_date).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phone-frame flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-64 shrink-0 overflow-hidden", children: [
      event.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.image_url, alt: event.title, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-gradient w-full h-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/su-kien", className: "h-9 w-9 rounded-full bg-black/30 backdrop-blur-sm grid place-items-center text-white hover:bg-black/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: share, className: "h-9 w-9 rounded-full bg-black/30 backdrop-blur-sm grid place-items-center text-white hover:bg-black/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 -mt-6 bg-background rounded-t-3xl px-5 pt-6 pb-10 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-extrabold leading-snug", children: event.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        dateStr && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-8 rounded-xl bg-primary/10 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            dateStr,
            timeStr ? ` · ${timeStr}` : ""
          ] })
        ] }),
        event.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-8 rounded-xl bg-warm/20 grid place-items-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-warm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium leading-snug", children: event.location })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/50" }),
      event.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/80 whitespace-pre-line", children: event.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full h-12 rounded-2xl font-bold text-base", children: "Đăng ký tham gia" })
    ] })
  ] });
}
export {
  EventDetail as component
};
