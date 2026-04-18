import { useState } from "react";
import { Copy, CheckCheck, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import mascot from "@/assets/tao-vang-mascot.png";

type Plan = { months: number; seeds: number; priceVnd: number; label: string };
const PLANS: Plan[] = [
  { months: 1,  seeds: 599,  priceVnd: 199_000, label: "1 Tháng"  },
  { months: 6,  seeds: 999,  priceVnd: 499_000, label: "6 Tháng"  },
  { months: 12, seeds: 1299, priceVnd: 799_000, label: "12 Tháng" },
];

const BANK_ACCOUNT = "0343202859";
const BANK_NAME    = "TRAN GIA HUY";
const BANK_CODE    = "MB";

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function buildTransferNote(months: number, ref: string | null) {
  const tag = ref ? ref.slice(0, 8).toUpperCase() : "TV";
  return `TV${months}T ${tag}`;
}

function vietQrUrl(amount: number, note: string) {
  const encoded = encodeURIComponent(note);
  const name    = encodeURIComponent(BANK_NAME);
  return `https://img.vietqr.io/image/${BANK_CODE}-${BANK_ACCOUNT}-compact2.jpg?amount=${amount}&addInfo=${encoded}&accountName=${name}`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="ml-1.5 inline-flex items-center gap-1 text-xs text-primary hover:underline"
    >
      {copied ? <CheckCheck className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Đã chép" : "Chép"}
    </button>
  );
}

export function MembershipDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { profile } = useAuth();
  const [selected, setSelected] = useState<number>(1);
  const [step, setStep]         = useState<"pick" | "pay">("pick");

  const plan = PLANS.find((p) => p.months === selected)!;
  const note = buildTransferNote(plan.months, profile?.referral_code ?? null);

  function handleClose(v: boolean) {
    if (!v) setStep("pick");
    onOpenChange(v);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden border-0 bg-transparent shadow-none max-w-md">
        <VisuallyHidden>
          <DialogTitle>Thành viên Táo Vàng</DialogTitle>
        </VisuallyHidden>

        <div className="relative rounded-3xl overflow-hidden bg-white">

          {/* ── Step 1: chọn gói ── */}
          {step === "pick" && (
            <>
              {/* Green header */}
              <div
                className="relative h-64 flex items-end justify-center"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 0%, oklch(0.88 0.14 138) 0%, oklch(0.78 0.16 142) 45%, oklch(0.96 0.04 130) 100%)",
                }}
              >
                <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 400 40"
                  preserveAspectRatio="none" style={{ height: 30 }}>
                  <path d="M0 10 Q 30 30 60 15 T 130 18 T 200 10 T 280 22 T 360 12 T 400 18 L400 40 L0 40 Z" fill="white" />
                </svg>
                <img src={mascot} alt="Linh vật Táo Vàng" width={1024} height={1024} loading="lazy"
                  className="relative z-10 w-44 h-44 object-contain drop-shadow-xl -mb-2" />
              </div>

              <div className="px-6 pt-4 pb-2 text-center">
                <h2 className="text-3xl font-black leading-tight tracking-tight"
                  style={{ color: "oklch(0.74 0.18 55)", WebkitTextStroke: "1px oklch(0.45 0.12 142)",
                    textShadow: "2px 2px 0 oklch(0.45 0.12 142)", fontFamily: "var(--font-display)" }}>
                  THÀNH VIÊN
                </h2>
                <h3 className="text-2xl font-black -mt-1"
                  style={{ color: "oklch(0.74 0.18 55)", WebkitTextStroke: "1px oklch(0.45 0.12 142)",
                    textShadow: "2px 2px 0 oklch(0.45 0.12 142)" }}>
                  <span className="text-base align-middle mr-1 font-bold">SẢN PHẨM</span>TÁO VÀNG
                </h3>
              </div>

              <div className="px-6 py-4 space-y-3">
                {PLANS.map((p) => {
                  const active = selected === p.months;
                  return (
                    <button key={p.months} onClick={() => setSelected(p.months)}
                      className={`w-full flex items-center justify-between rounded-full border-2 px-5 py-3 transition-all ${
                        active
                          ? "border-warm bg-warm/10 shadow-warm scale-[1.02]"
                          : "border-primary/30 bg-secondary/40 hover:border-primary/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">🍑</span>
                        <span className="font-bold text-primary text-lg">
                          {p.label}:{" "}
                          <span className="text-foreground">{p.seeds.toLocaleString()} hạt</span>
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {formatVnd(p.priceVnd)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="px-6 pb-6 pt-2">
                <button onClick={() => setStep("pay")}
                  className="w-full rounded-full py-4 font-black text-lg tracking-wide text-white shadow-warm transition-transform active:scale-95"
                  style={{
                    background: "linear-gradient(180deg, oklch(0.82 0.14 138) 0%, oklch(0.62 0.16 142) 100%)",
                    border: "3px solid oklch(0.45 0.12 142)",
                    textShadow: "1px 1px 0 oklch(0.35 0.10 142)",
                  }}
                >
                  KÍCH HOẠT GÓI
                </button>
              </div>
            </>
          )}

          {/* ── Step 2: QR thanh toán ── */}
          {step === "pay" && (
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep("pick")}
                  className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted transition">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="font-bold text-base">
                  Thanh toán — {plan.label} ({formatVnd(plan.priceVnd)})
                </span>
              </div>

              {/* QR */}
              <div className="flex justify-center mb-4">
                <img
                  src={vietQrUrl(plan.priceVnd, note)}
                  alt="QR thanh toán"
                  className="w-56 h-56 rounded-2xl shadow-md border border-border"
                  loading="eager"
                />
              </div>

              {/* Bank info */}
              <div className="rounded-2xl border border-border bg-secondary/30 px-4 py-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ngân hàng</span>
                  <span className="font-semibold">MB Bank</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Số tài khoản</span>
                  <span className="flex items-center font-semibold">
                    {BANK_ACCOUNT}
                    <CopyButton text={BANK_ACCOUNT} />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Chủ tài khoản</span>
                  <span className="font-semibold">{BANK_NAME}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Số tiền</span>
                  <span className="flex items-center font-bold text-green-600">
                    {formatVnd(plan.priceVnd)}
                    <CopyButton text={String(plan.priceVnd)} />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nội dung CK</span>
                  <span className="flex items-center font-semibold text-primary">
                    {note}
                    <CopyButton text={note} />
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground text-center mt-3 leading-relaxed">
                Sau khi chuyển khoản, gói sẽ được kích hoạt trong vòng 15 phút.
                <br />
                Liên hệ hỗ trợ nếu chờ quá 1 giờ.
              </p>

              <Button
                className="w-full mt-4 rounded-full h-12 font-bold text-base"
                onClick={() => handleClose(false)}
              >
                Đã chuyển tiền
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
