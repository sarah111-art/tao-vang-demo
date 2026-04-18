import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Leaf, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  productId: string;
  productTitle: string;
  seedPrice: number;
  onUnlocked?: () => void;
  onOpenMembership?: () => void;
};

export function UnlockDialog({
  open,
  onOpenChange,
  productId,
  productTitle,
  seedPrice,
  onUnlocked,
  onOpenMembership,
}: Props) {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const userSeeds = profile?.seed_count ?? 0;
  const canAfford = userSeeds >= seedPrice;

  async function handleUnlock() {
    if (!user) {
      onOpenChange(false);
      void navigate({ to: "/auth" });
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.rpc("unlock_product", {
      p_product_id: productId,
      p_seeds_cost: seedPrice,
    });
    setBusy(false);
    const result = data as { ok?: boolean; error?: string } | null;
    if (error || !result?.ok) {
      toast.error(result?.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
      return;
    }
    await refreshProfile();
    toast.success(`Đã mở khoá "${productTitle}"!`);
    onOpenChange(false);
    onUnlocked?.();
  }

  function handleMembership() {
    onOpenChange(false);
    onOpenMembership?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden border-0 bg-transparent shadow-none max-w-[360px]">
        <VisuallyHidden>
          <DialogTitle>Mở khoá sản phẩm</DialogTitle>
        </VisuallyHidden>
        <div className="bg-white rounded-2xl shadow-card">
          {/* Header */}
          <header className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-foreground">Túi hạt</span>
              <span className="text-muted-foreground">
                {userSeeds.toLocaleString("vi-VN")} hạt
              </span>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Đóng"
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted transition"
            >
            </button>
          </header>

          {/* Giá mở khoá */}
          <div className="px-5 pb-2">
            <p className="text-[15px]">
              <span className="font-bold text-foreground">Mở khóa cần </span>
              <span className="font-bold text-green-600">
                {seedPrice.toLocaleString("vi-VN")} hạt
              </span>
            </p>
          </div>

          {/* Số hạt còn lại */}
          <div className="px-5 pt-3 pb-5">
            <div className="relative rounded-xl border-2 border-muted px-4 py-3">
              <label className="absolute -top-2 left-3 bg-white px-1.5 text-[11px] text-muted-foreground">
                Số hạt táo còn lại
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="text-base font-semibold text-foreground">
                    {userSeeds.toLocaleString("vi-VN")}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">Hạt</span>
              </div>
            </div>
          </div>

          {/* CTA mở khoá */}
          <div className="px-5 pb-2">
            <Button
              onClick={handleUnlock}
              disabled={busy}
              className={`w-full h-12 rounded-full font-bold tracking-wide border-0 shadow-md
                ${canAfford
                  ? "bg-gradient-to-b from-green-500 to-green-600 text-white hover:opacity-90"
                  : "bg-gradient-to-b from-amber-400 to-amber-500 text-amber-900/70 pointer-events-none"
                }`}
            >
              {busy ? "Đang xử lý..." : canAfford ? "MỞ KHÓA NGAY" : "KHÔNG ĐỦ HẠT"}
            </Button>
            {!canAfford && (
              <p className="text-center text-xs text-muted-foreground mt-2">
                Bạn cần thêm {(seedPrice - userSeeds).toLocaleString("vi-VN")} hạt
              </p>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground py-1">Hoặc</div>

          {/* CTA thành viên */}
          <div className="px-5 pb-5">
            <Button
              onClick={handleMembership}
              className="w-full h-12 rounded-full font-bold tracking-wide text-white border-0 shadow-md
                         bg-gradient-to-b from-lime-500 to-green-600 hover:opacity-90"
            >
              THÀNH VIÊN TÁO VÀNG
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
