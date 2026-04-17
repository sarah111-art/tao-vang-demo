import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { MembershipDialog } from "@/components/MembershipDialog";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Gift, Copy, Phone, Mail, Crown, Baby, LogOut, Check,
  X, Search, Leaf, Send, History, Share2, MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import mascot from "@/assets/tao-vang-mascot.png";

export const Route = createFileRoute("/tai-khoan")({
  head: () => ({
    meta: [
      { title: "Tài khoản — Táo Vàng" },
      { name: "description", content: "Quản lý tài khoản thành viên Táo Vàng của bạn." },
      { property: "og:title", content: "Tài khoản — Táo Vàng" },
    ],
  }),
  component: AccountPage,
});

/** Popup nhận quà giới thiệu */
function ReferralDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    if (!email.trim()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    toast.success("Đã ghi nhận người giới thiệu!");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#f59e0b]">
          <h3 className="font-bold text-white text-base">Nhận quà giới thiệu</h3>
          <button type="button" onClick={onClose} className="text-white/90 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Nhập email của người giới thiệu bạn để được trải nghiệm{" "}
            <span className="font-semibold text-foreground">21 ngày rút thẻ</span> và{" "}
            <span className="font-semibold text-foreground">7 ngày Táo Vàng</span>.
          </p>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email người giới thiệu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-10 h-12 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Button
            className="w-full h-11 rounded-2xl font-bold tracking-widest uppercase"
            disabled={!email.trim() || busy}
            onClick={handleConfirm}
          >
            {busy ? "Đang xử lý..." : "Xác nhận"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);

  if (loading) {
    return (
      <AppLayout>
        <PageHeader title="Tài khoản" />
        <p className="text-center text-muted-foreground py-10">Đang tải...</p>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <PageHeader title="Tài khoản" />
        <div className="px-5 -mt-8 space-y-4">
          <Card className="p-6 text-center space-y-4 shadow-card">
            <img src={mascot} alt="Táo Vàng" className="h-24 w-24 object-contain mx-auto" />
            <h2 className="font-bold text-lg">Chào mừng đến với Táo Vàng</h2>
            <p className="text-sm text-muted-foreground">
              Đăng nhập để theo dõi hạt giống, nhận quà và truy cập khoá học.
            </p>
            <Button asChild className="w-full" size="lg">
              <Link to="/auth">Đăng nhập / Đăng ký</Link>
            </Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const copyRef = async () => {
    if (!user.email) return;
    await navigator.clipboard.writeText(user.email);
    setCopied(true);
    toast.success("Đã sao chép email!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AppLayout>
      <PageHeader title="Tài khoản" seedCount={profile?.seed_count ?? 0} />

      {/* Banner */}
      <div className="-mt-10 px-4">
        <div className="warm-gradient rounded-2xl p-5 text-warm-foreground shadow-warm">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase opacity-90">Táo Vàng</div>
            <h2 className="text-2xl font-extrabold drop-shadow mt-1">
              Trao Hạt Giống
              <br />
              Gửi Yêu Thương
            </h2>
          </div>
        </div>
      </div>

      {/* Info card */}
      <Card className="mx-4 mt-4 p-5 shadow-card space-y-3">
        <Row label="Họ và tên" value={profile?.full_name ?? "—"} />
        <Row label="Túi hạt" value={`${profile?.seed_count ?? 0} hạt`} />
        <Row label="Số điện thoại" value={profile?.phone ?? "—"} icon={<Phone className="h-3.5 w-3.5" />} />
        <Row label="Tài khoản" value={user.email ?? "—"} icon={<Mail className="h-3.5 w-3.5" />} />

        <Button
          className="w-full warm-gradient text-warm-foreground border-0 hover:opacity-90"
          onClick={() => setReferralOpen(true)}
        >
          <Gift className="h-4 w-4 mr-2" /> Nhận quà giới thiệu
        </Button>
        <Button variant="secondary" className="w-full" onClick={copyRef}>
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          Copy: {user.email}
        </Button>
      </Card>

      {/* Membership */}
      <Card className="mx-4 mt-4 p-5 shadow-card space-y-3 text-center">
        <p className="text-sm text-muted-foreground">Thời gian còn lại của Thành viên Táo Vàng</p>
        <p className="text-primary text-xl font-bold">
          {profile?.member_until
            ? `${Math.max(0, Math.ceil((+new Date(profile.member_until) - Date.now()) / 86400000))} ngày`
            : "0 ngày"}
        </p>
        <Button
          className="w-full warm-gradient text-warm-foreground border-0 hover:opacity-90"
          onClick={() => setMembershipOpen(true)}
        >
          <Crown className="h-4 w-4 mr-2" /> Kích hoạt thành viên Táo Vàng
        </Button>
        <Button className="w-full bg-[oklch(0.62_0.16_240)] hover:bg-[oklch(0.55_0.18_240)] text-primary-foreground">
          <Baby className="h-4 w-4 mr-2" /> Táo Vàng Con Trẻ
        </Button>
      </Card>

      {/* Liên hệ */}
      <Card className="mx-4 mt-4 p-4 shadow-card">
        <p className="text-sm font-semibold text-foreground/70 mb-3">Liên hệ Táo Vàng</p>
        <div className="space-y-2">
          <ActionButton
            label="Chăm sóc khách hàng"
            icon={<Phone className="h-4 w-4" />}
            iconColor="text-emerald-500"
            onClick={() => toast.info("Gọi: 1900 xxxx")}
          />
          <ActionButton
            label="Facebook Táo Vàng"
            icon={<MessageCircle className="h-4 w-4" />}
            iconColor="text-blue-500"
            onClick={() => toast.info("Đang mở Facebook...")}
          />
        </div>
      </Card>

      {/* Đại lý */}
      <Card className="mx-4 mt-4 p-4 shadow-card">
        <p className="text-sm font-semibold text-foreground/70 mb-3">Tính năng dành cho đại lý</p>
        <div className="space-y-2">
          <ActionButton
            label="Gửi hạt"
            icon={<Leaf className="h-4 w-4" />}
            iconColor="text-violet-500"
            onClick={() => toast.info("Tính năng đang phát triển.")}
          />
          <ActionButton
            label="Gửi thư mời"
            icon={<Send className="h-4 w-4" />}
            iconColor="text-blue-400"
            onClick={() => toast.info("Tính năng đang phát triển.")}
          />
          <ActionButton
            label="Lịch sử giao dịch"
            icon={<History className="h-4 w-4" />}
            iconColor="text-pink-500"
            onClick={() => toast.info("Tính năng đang phát triển.")}
          />
          <ActionButton
            label="Tra cứu thông tin F1"
            icon={<Share2 className="h-4 w-4" />}
            iconColor="text-emerald-500"
            onClick={() => toast.info("Tính năng đang phát triển.")}
          />
        </div>
      </Card>

      {/* Đăng xuất */}
      <div className="mx-4 mt-4 mb-8">
        <Button
          className="w-full h-12 rounded-2xl font-bold tracking-widest uppercase bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={async () => {
            await signOut();
            toast.success("Đã đăng xuất");
            navigate({ to: "/tai-khoan" });
          }}
        >
          <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
        </Button>
      </div>

      <MembershipDialog open={membershipOpen} onOpenChange={setMembershipOpen} />
      <ReferralDialog open={referralOpen} onClose={() => setReferralOpen(false)} />
    </AppLayout>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="font-bold min-w-[110px]">{label}</span>
      <span className="text-foreground/80 inline-flex items-center gap-1">
        {icon}{value}
      </span>
    </div>
  );
}

function ActionButton({ label, icon, iconColor, onClick }: {
  label: string; icon: React.ReactNode; iconColor: string; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-border hover:bg-secondary/60 transition-colors text-sm font-medium text-left"
    >
      <span className={iconColor}>{icon}</span>
      {label}
    </button>
  );
}
