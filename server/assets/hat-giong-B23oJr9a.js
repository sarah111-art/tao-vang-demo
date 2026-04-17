import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { A as AppLayout } from "./AppLayout-BIdpcHEb.js";
import { u as useAuth, s as supabase, m as motion } from "./router-jcV2fEf8.js";
import { c as createLucideIcon } from "./createLucideIcon-Dnt6Ta-A.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
const colorMap = {
  amber: {
    from: "#fcd34d",
    to: "#d97706"
  },
  violet: {
    from: "#c4b5fd",
    to: "#7c3aed"
  },
  emerald: {
    from: "#6ee7b7",
    to: "#059669"
  },
  green: {
    from: "#86efac",
    to: "#16a34a"
  },
  rose: {
    from: "#fda4af",
    to: "#e11d48"
  },
  purple: {
    from: "#d8b4fe",
    to: "#9333ea"
  },
  orange: {
    from: "#fdba74",
    to: "#ea580c"
  },
  red: {
    from: "#fca5a5",
    to: "#dc2626"
  },
  indigo: {
    from: "#a5b4fc",
    to: "#4338ca"
  },
  blue: {
    from: "#93c5fd",
    to: "#2563eb"
  },
  sky: {
    from: "#7dd3fc",
    to: "#0284c7"
  },
  lime: {
    from: "#bef264",
    to: "#65a30d"
  },
  teal: {
    from: "#5eead4",
    to: "#0d9488"
  },
  pink: {
    from: "#f9a8d4",
    to: "#db2777"
  },
  cyan: {
    from: "#67e8f9",
    to: "#0891b2"
  }
};
function HeartApple({
  name,
  color,
  i
}) {
  const c = colorMap[color] ?? colorMap.green;
  const gid = `g-${i}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { type: "button", initial: {
    opacity: 0,
    scale: 0.4,
    y: -16
  }, animate: {
    opacity: 1,
    scale: 1,
    y: 0
  }, transition: {
    delay: 0.1 + i * 0.035,
    type: "spring",
    stiffness: 200,
    damping: 15
  }, whileHover: {
    scale: 1.08,
    rotate: -3
  }, whileTap: {
    scale: 0.93
  }, className: "relative w-full aspect-square focus:outline-none", "aria-label": name, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 110", className: "w-full h-full drop-shadow-[0_5px_10px_rgba(0,0,0,0.22)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: gid, cx: "35%", cy: "30%", r: "75%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: c.from }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: c.to })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: `${gid}-dark`, cx: "50%", cy: "50%", r: "50%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "rgba(0,0,0,0.18)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `${gid}-leaf`, x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#bbf7d0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#15803d" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 95 C 16 72, 6 46, 22 30 C 33 18, 46 24, 50 36 C 54 24, 67 18, 78 30 C 94 46, 84 72, 50 95 Z", fill: `url(#${gid})` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 95 C 16 72, 6 46, 22 30 C 33 18, 46 24, 50 36 C 54 24, 67 18, 78 30 C 94 46, 84 72, 50 95 Z", fill: `url(#${gid}-dark)` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "35", cy: "42", rx: "11", ry: "6", fill: "rgba(255,255,255,0.38)", transform: "rotate(-28 35 42)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 26 Q53 16 55 10", stroke: "#5a3a1a", strokeWidth: "2.8", strokeLinecap: "round", fill: "none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M55 12 C 64 6, 76 8, 75 15 C 68 20, 58 20, 55 14 Z", fill: `url(#${gid}-leaf)` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M55 13 L71 14", stroke: "rgba(255,255,255,0.5)", strokeWidth: "0.8", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center pointer-events-none px-1", style: {
      paddingTop: "14%",
      paddingBottom: "6%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-extrabold text-center leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]", style: {
      fontSize: "clamp(9px, 2.8vw, 13px)"
    }, children: name }) })
  ] });
}
function CornerLeaves({
  side
}) {
  const flip = side === "right" ? "scale(-1,1)" : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 160 160", className: "absolute top-0 w-40 h-40 pointer-events-none opacity-90", style: {
    [side]: 0,
    transform: flip ? `${flip}` : void 0
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "20", cy: "30", rx: "55", ry: "28", fill: "#4ade80", transform: "rotate(-35 20 30)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "40", cy: "15", rx: "50", ry: "22", fill: "#22c55e", transform: "rotate(-55 40 15)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "10", cy: "55", rx: "45", ry: "20", fill: "#86efac", transform: "rotate(-15 10 55)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "10", rx: "40", ry: "18", fill: "#16a34a", transform: "rotate(-70 60 10)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "30", cy: "75", rx: "38", ry: "16", fill: "#4ade80", transform: "rotate(-5 30 75)" })
  ] });
}
function SeedsPage() {
  const {
    profile
  } = useAuth();
  const [seeds, setSeeds] = reactExports.useState([]);
  reactExports.useEffect(() => {
    void supabase.from("seeds").select("id,name,color").order("sort_order").then(({
      data
    }) => setSeeds(data ?? []));
  }, []);
  const rows = [];
  for (let i = 0; i < seeds.length; i += 4) {
    rows.push(seeds.slice(i, i + 4));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[calc(100dvh-4rem)] overflow-hidden", style: {
    background: "linear-gradient(180deg, #f0fdf4 0%, #fefce8 60%, #fff7ed 100%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CornerLeaves, { side: "left" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CornerLeaves, { side: "right" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 px-4 pt-10 pb-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-extrabold uppercase leading-[1.1] tracking-tight", style: {
        fontSize: "clamp(24px, 7vw, 38px)",
        color: "#fef08a",
        WebkitTextStroke: "2.5px #92400e",
        textShadow: "0 3px 0 #92400e, 0 6px 18px rgba(146,64,14,0.3)",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif"
      }, children: [
        "Chăm hạt giống",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Sống vui tươi",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Thành công, giúp ích"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 0,
        rotate: -20
      }, animate: {
        scale: 1,
        rotate: 0
      }, transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 14
      }, className: "mx-auto mt-4 mb-1 w-14 h-14 rounded-full bg-white shadow-warm border-2 border-amber-200 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-7 w-7 text-amber-400 fill-amber-100" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-amber-600 mt-1", children: [
        profile?.seed_count ?? 0,
        " hạt trong túi"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-sm px-3 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-x-0 top-0 mx-auto w-full pointer-events-none", style: {
        height: `${rows.length * 110 + 40}px`
      }, viewBox: `0 0 320 ${rows.length * 110 + 40}`, preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "trunk-grad", x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#7a4a1d" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "45%", stopColor: "#b07540" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#6b3e15" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M160 0 C 156 ${rows.length * 55}, 164 ${rows.length * 80}, 160 ${rows.length * 110 + 40}`, stroke: "url(#trunk-grad)", strokeWidth: "28", strokeLinecap: "round", fill: "none" }),
        rows.map((_, ri) => {
          const y = ri * 110 + 55;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M160 ${y} C 110 ${y - 8}, 55 ${y + 5}, 20 ${y - 2}`, stroke: "url(#trunk-grad)", strokeWidth: "14", strokeLinecap: "round", fill: "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M160 ${y} C 210 ${y - 8}, 265 ${y + 5}, 300 ${y - 2}`, stroke: "url(#trunk-grad)", strokeWidth: "14", strokeLinecap: "round", fill: "none" })
          ] }, ri);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-col gap-4 pt-2", children: rows.map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: row.map((s, ci) => {
        const offsetY = ci % 2 === 0 ? 0 : 10;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          transform: `translateY(${offsetY}px)`
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartApple, { name: s.name, color: s.color, i: ri * 4 + ci }) }, s.id);
      }) }, ri)) })
    ] })
  ] }) });
}
export {
  SeedsPage as component
};
