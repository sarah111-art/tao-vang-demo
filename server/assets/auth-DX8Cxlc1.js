import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { u as useAuth, c as useNavigate, L as Link, m as motion, A as AnimatePresence, s as supabase, t as toast } from "./router-jcV2fEf8.js";
import { B as Button } from "./button-B6b8l3Ee.js";
import { I as Input } from "./input-CAxGpR2z.js";
import { L as Label } from "./label-rzBvuCY3.js";
import { m as mascot, M as Mail, P as Phone } from "./tao-vang-mascot-BdSXyEiv.js";
import { A as ArrowLeft } from "./arrow-left-BW13aPMg.js";
import { c as createLucideIcon } from "./createLucideIcon-Dnt6Ta-A.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function GoogleButton({
  label
}) {
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "w-full h-12 rounded-2xl border-2 font-semibold gap-2.5 hover:bg-secondary/80 transition-all", disabled: busy, onClick: async () => {
    setBusy(true);
    const {
      error
    } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/tai-khoan"
      }
    });
    if (error) {
      setBusy(false);
      toast.error("Không đăng nhập được với Google");
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-5 w-5 shrink-0", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
    ] }),
    busy ? "Đang chuyển..." : label
  ] });
}
function Divider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-border/60" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3 text-xs font-medium text-muted-foreground tracking-wider uppercase", children: "hoặc" }) })
  ] });
}
function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  minLength,
  autoComplete
}) {
  const [show, setShow] = reactExports.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? show ? "text" : "password" : type;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-semibold text-foreground/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id, type: inputType, required, minLength, autoComplete, value, placeholder, onChange: (e) => onChange(e.target.value), className: "pl-10 pr-10 h-11 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-secondary/40" }),
      isPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", tabIndex: -1, className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", onClick: () => setShow((s) => !s), children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function AuthPage() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("signin");
  reactExports.useEffect(() => {
    if (user) navigate({
      to: "/tai-khoan"
    });
  }, [user, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm flex flex-col flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient text-primary-foreground px-5 pt-10 pb-14 rounded-b-[2.5rem] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 -right-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 -left-6 h-24 w-24 rounded-full bg-white/10 blur-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tai-khoan", className: "inline-flex items-center gap-1.5 text-sm font-medium opacity-90 mb-6 hover:opacity-100 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Quay lại"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          scale: 0.8,
          opacity: 0
        }, animate: {
          scale: 1,
          opacity: 1
        }, transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }, className: "h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm grid place-items-center shadow-warm overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mascot, alt: "Táo Vàng", className: "h-14 w-14 object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          x: -10,
          opacity: 0
        }, animate: {
          x: 0,
          opacity: 1
        }, transition: {
          delay: 0.1
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold leading-tight", children: "Táo Vàng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-85 font-medium", children: "Gieo hạt giống — Vun cuộc đời" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      y: 30,
      opacity: 0
    }, animate: {
      y: 0,
      opacity: 1
    }, transition: {
      delay: 0.15,
      type: "spring",
      stiffness: 220,
      damping: 24
    }, className: "mx-4 -mt-6 bg-card rounded-3xl shadow-card p-5 flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-secondary/60 rounded-2xl p-1 mb-2", children: ["signin", "signup"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTab(t), className: `flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === t ? "bg-card shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"}`, children: t === "signin" ? "Đăng nhập" : "Đăng ký" }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: tab === "signin" ? -12 : 12
      }, animate: {
        opacity: 1,
        x: 0
      }, exit: {
        opacity: 0,
        x: tab === "signin" ? 12 : -12
      }, transition: {
        duration: 0.18
      }, children: tab === "signin" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleButton, { label: "Tiếp tục với Google" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SignInForm, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
          "Chưa có tài khoản?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTab("signup"), className: "text-primary font-semibold hover:underline", children: "Đăng ký ngay" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleButton, { label: "Đăng ký với Google" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpForm, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
          "Đã có tài khoản?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTab("signin"), className: "text-primary font-semibold hover:underline", children: "Đăng nhập" })
        ] })
      ] }) }, tab) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[11px] text-muted-foreground mt-5 px-8 mb-6", children: [
      "Bằng cách tiếp tục, bạn đồng ý với",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Điều khoản dịch vụ" }),
      " và",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Chính sách bảo mật" }),
      " của Táo Vàng."
    ] })
  ] }) });
}
function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: async (e) => {
    e.preventDefault();
    setBusy(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setBusy(false);
    if (error) {
      toast.error("Email hoặc mật khẩu không đúng");
      return;
    }
    toast.success("Đăng nhập thành công! 🌱");
    navigate({
      to: "/tai-khoan"
    });
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { id: "si-email", label: "Email", type: "email", value: email, onChange: setEmail, placeholder: "ban@email.com", icon: Mail, required: true, autoComplete: "email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { id: "si-password", label: "Mật khẩu", type: "password", value: password, onChange: setPassword, placeholder: "••••••••", icon: Lock, required: true, autoComplete: "current-password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full h-11 rounded-2xl text-base font-bold mt-1", disabled: busy, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }),
      "Đang đăng nhập..."
    ] }) : "Đăng nhập" })
  ] });
}
function SignUpForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: async (e) => {
    e.preventDefault();
    setBusy(true);
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/tai-khoan` : void 0;
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          full_name: fullName,
          phone
        }
      }
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Tạo tài khoản thành công! 🌱");
    navigate({
      to: "/tai-khoan"
    });
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { id: "su-name", label: "Họ và tên", value: fullName, onChange: setFullName, placeholder: "Nguyễn Văn A", icon: User, required: true, autoComplete: "name" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { id: "su-phone", label: "Số điện thoại", value: phone, onChange: setPhone, placeholder: "0912 345 678", icon: Phone, autoComplete: "tel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { id: "su-email", label: "Email", type: "email", value: email, onChange: setEmail, placeholder: "ban@email.com", icon: Mail, required: true, autoComplete: "email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { id: "su-password", label: "Mật khẩu", type: "password", value: password, onChange: setPassword, placeholder: "Tối thiểu 6 ký tự", icon: Lock, required: true, minLength: 6, autoComplete: "new-password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full h-11 rounded-2xl text-base font-bold mt-1", disabled: busy, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }),
      "Đang tạo tài khoản..."
    ] }) : "Tạo tài khoản" })
  ] });
}
export {
  AuthPage as component
};
