import { M as useRouter, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { L as Link } from "./router-jcV2fEf8.js";
import { c as createLucideIcon } from "./createLucideIcon-Dnt6Ta-A.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const __iconNode$4 = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const CircleUserRound = createLucideIcon("circle-user-round", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
      key: "139s4v"
    }
  ],
  ["path", { d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4", key: "1dlkgp" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Sprout = createLucideIcon("sprout", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z",
      key: "oadzkq"
    }
  ],
  ["path", { d: "M12 19v3", key: "npa21l" }]
];
const TreeDeciduous = createLucideIcon("tree-deciduous", __iconNode);
const tabs = [
  { to: "/", label: "Sản phẩm", icon: House },
  { to: "/hat-giong", label: "Hạt giống", icon: Sprout },
  { to: "/vuon-tao", label: "Vườn Táo", icon: TreeDeciduous, center: true },
  { to: "/su-kien", label: "Sự kiện", icon: Ticket },
  { to: "/tai-khoan", label: "Tài khoản", icon: CircleUserRound }
];
function AppLayout({ children }) {
  const loc = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "hidden md:block sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://apptaovang.com/wp-content/uploads/2023/02/logo-tao-vang-new.webp",
          alt: "Táo Vàng",
          className: "h-10 w-auto",
          loading: "eager",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex items-center gap-1", children: tabs.map((t) => {
        const active = loc.pathname === t.to;
        const Icon = t.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: t.to,
            className: `flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
              t.label
            ]
          }
        ) }, t.to);
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full pb-24 md:pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto w-full", children }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-5 items-end px-2 pt-2 pb-3 max-w-md mx-auto", children: tabs.map((t) => {
      const active = loc.pathname === t.to;
      const Icon = t.icon;
      if (t.center) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: t.to, className: "-mt-7 flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hero-gradient h-14 w-14 rounded-full grid place-items-center shadow-warm ring-4 ring-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] ${active ? "tab-active font-semibold" : "text-muted-foreground"}`, children: t.label })
        ] }) }, t.to);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: t.to,
          className: `flex flex-col items-center gap-1 py-1 ${active ? "tab-active" : "text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${active ? "fill-primary/15" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] ${active ? "font-semibold" : ""}`, children: t.label })
          ]
        }
      ) }, t.to);
    }) }) })
  ] });
}
function PageHeader({ title, seedCount = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "hero-gradient text-primary-foreground px-5 md:px-10 pt-10 md:pt-12 pb-16 md:pb-20 rounded-b-[2rem] md:rounded-b-[2.5rem] relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between max-w-5xl mx-auto w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold tracking-tight drop-shadow-sm", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-warm bg-card/95 px-2 py-0.5 rounded-full mb-1", children: [
        seedCount,
        " hạt"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary-foreground/15 grid place-items-center backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-7 w-7 text-primary-foreground" }) })
    ] })
  ] }) });
}
export {
  AppLayout as A,
  PageHeader as P
};
