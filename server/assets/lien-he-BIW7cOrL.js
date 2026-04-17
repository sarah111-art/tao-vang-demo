import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DbZuVAdO.js";
import { L as Link, s as supabase, t as toast } from "./router-jcV2fEf8.js";
import { a as cn, B as Button } from "./button-B6b8l3Ee.js";
import { I as Input } from "./input-CAxGpR2z.js";
import { L as Label } from "./label-rzBvuCY3.js";
import { C as Card } from "./card-HrA5aNz_.js";
import { A as ArrowLeft } from "./arrow-left-BW13aPMg.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-Dnt6Ta-A.js";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function ContactPage() {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "phone-frame flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient text-primary-foreground px-5 pt-10 pb-10 rounded-b-[2rem]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tai-khoan", className: "inline-flex items-center gap-1 text-sm opacity-90 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Quay lại"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold drop-shadow", children: "Liên hệ Táo Vàng" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 mt-1", children: "Chúng tôi sẽ phản hồi sớm nhất có thể." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mx-4 -mt-6 p-5 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: async (e) => {
      e.preventDefault();
      setBusy(true);
      const {
        error
      } = await supabase.from("contact_messages").insert({
        name,
        email,
        phone,
        message
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Đã gửi tin nhắn — cảm ơn bạn!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-name", children: "Họ và tên" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "c-name", required: true, value: name, onChange: (e) => setName(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "c-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-phone", children: "SĐT (tuỳ chọn)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "c-phone", value: phone, onChange: (e) => setPhone(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-msg", children: "Lời nhắn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "c-msg", rows: 4, required: true, value: message, onChange: (e) => setMessage(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Đang gửi..." : "Gửi tin nhắn" })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
