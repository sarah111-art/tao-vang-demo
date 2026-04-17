import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import mascot from "@/assets/tao-vang-mascot.png";

type Plan = { months: number; seeds: number };
const PLANS: Plan[] = [
  { months: 1, seeds: 599 },
  { months: 6, seeds: 999 },
  { months: 12, seeds: 1299 },
];

export function MembershipDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [selected, setSelected] = useState<number>(1);

  const activate = () => {
    const plan = PLANS.find((p) => p.months === selected)!;
    toast.success(`Đã chọn gói ${plan.months} tháng (${plan.seeds.toLocaleString()} hạt)`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden border-0 bg-transparent shadow-none max-w-md">
        <div className="relative rounded-3xl overflow-hidden bg-white">
          {/* Watercolor green header */}
          <div
            className="relative h-72 flex items-end justify-center"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 0%, oklch(0.88 0.14 138) 0%, oklch(0.78 0.16 142) 45%, oklch(0.96 0.04 130) 100%)",
            }}
          >
            {/* torn-paper bottom edge */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full"
              viewBox="0 0 400 40"
              preserveAspectRatio="none"
              style={{ height: 30 }}
            >
              <path
                d="M0 10 Q 30 30 60 15 T 130 18 T 200 10 T 280 22 T 360 12 T 400 18 L400 40 L0 40 Z"
                fill="white"
              />
            </svg>

            {/* Mascot */}
            <img
              src={mascot}
              alt="Linh vật Táo Vàng"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative z-10 w-52 h-52 object-contain drop-shadow-xl -mb-2"
            />
          </div>

          {/* Title */}
          <div className="px-6 pt-4 pb-2 text-center">
            <h2
              className="text-3xl font-black leading-tight tracking-tight"
              style={{
                color: "oklch(0.74 0.18 55)",
                WebkitTextStroke: "1px oklch(0.45 0.12 142)",
                textShadow: "2px 2px 0 oklch(0.45 0.12 142)",
                fontFamily: "var(--font-display)",
              }}
            >
              THÀNH VIÊN
            </h2>
            <h3
              className="text-2xl font-black -mt-1"
              style={{
                color: "oklch(0.74 0.18 55)",
                WebkitTextStroke: "1px oklch(0.45 0.12 142)",
                textShadow: "2px 2px 0 oklch(0.45 0.12 142)",
              }}
            >
              <span className="text-base align-middle mr-1 font-bold">SẢN PHẨM</span>
              TÁO VÀNG
            </h3>
          </div>

          {/* Plan options */}
          <div className="px-6 py-4 space-y-3">
            {PLANS.map((p) => {
              const active = selected === p.months;
              return (
                <button
                  key={p.months}
                  onClick={() => setSelected(p.months)}
                  className={`w-full flex items-center gap-3 rounded-full border-2 px-5 py-3 transition-all ${
                    active
                      ? "border-warm bg-warm/10 shadow-warm scale-[1.02]"
                      : "border-primary/30 bg-secondary/40 hover:border-primary/60"
                  }`}
                >
                  <span className="text-2xl">🍑</span>
                  <span className="font-bold text-primary text-lg">
                    {p.months} Tháng:{" "}
                    <span className="text-foreground">{p.seeds.toLocaleString()} hạt</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Activate */}
          <div className="px-6 pb-6 pt-2">
            <button
              onClick={activate}
              className="w-full rounded-full py-4 font-black text-lg tracking-wide text-white shadow-warm transition-transform active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.82 0.14 138) 0%, oklch(0.62 0.16 142) 100%)",
                border: "3px solid oklch(0.45 0.12 142)",
                textShadow: "1px 1px 0 oklch(0.35 0.10 142)",
              }}
            >
              KÍCH HOẠT GÓI
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
