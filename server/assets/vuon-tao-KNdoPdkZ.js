import { U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { A as AppLayout } from "./AppLayout-BIdpcHEb.js";
import { m as motion } from "./router-jcV2fEf8.js";
import { P as Play } from "./play-D8aVPVID.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-Dnt6Ta-A.js";
function StartCard({
  title,
  gradient,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
    opacity: 0,
    y: 30
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    delay,
    type: "spring"
  }, className: `relative w-full ${gradient} rounded-3xl p-6 text-left shadow-card overflow-hidden group`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-foreground drop-shadow mb-4", style: {
      fontFamily: "Be Vietnam Pro"
    }, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 bg-card/95 text-foreground px-4 py-1.5 rounded-full font-bold shadow-soft group-hover:scale-105 transition-transform", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }),
      " Start"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl" })
  ] });
}
function VuonTaoPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-8 pb-6 space-y-4", style: {
    background: "linear-gradient(180deg, oklch(0.92 0.06 230) 0%, oklch(0.97 0.02 130) 60%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StartCard, { title: "Táo Vàng", gradient: "bg-gradient-to-br from-green-500 to-emerald-700", delay: 0.05 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StartCard, { title: "Táo Vàng Kids", gradient: "warm-gradient", delay: 0.15 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 0.3
    }, className: "rounded-3xl bg-card/70 backdrop-blur p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-2", children: "🌳" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "Vườn Tâm Hồn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "Hành trình gieo trồng những hạt giống đức tính.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-warm font-semibold", children: "Hạnh phúc · Nhân ái · Giàu có" })
      ] })
    ] })
  ] }) });
}
export {
  VuonTaoPage as component
};
