import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Copy, Phone, Mail, Crown, Briefcase, Baby, LogOut, Check } from "lucide-react";
import { toast } from "sonner";

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

function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

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
            <div className="text-5xl">🍎</div>
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
          onClick={() => toast.info("Tính năng nhận quà sẽ sớm có mặt!")}
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
        <Button className="w-full warm-gradient text-warm-foreground border-0 hover:opacity-90">
          <Crown className="h-4 w-4 mr-2" /> Kích hoạt thành viên Táo Vàng
        </Button>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          <Baby className="h-4 w-4 mr-2" /> Táo Vàng Con Trẻ
        </Button>
      </Card>

      {/* Extra actions */}
      <Card className="mx-4 mt-4 p-5 shadow-card space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/lien-he">
            <Mail className="h-4 w-4 mr-2" /> Liên hệ Táo Vàng
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => toast.info("Tính năng đại lý đang phát triển.")}>
          <Briefcase className="h-4 w-4 mr-2" /> Tính năng dành cho đại lý
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={async () => {
            await signOut();
            toast.success("Đã đăng xuất");
            navigate({ to: "/tai-khoan" });
          }}
        >
          <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
        </Button>
      </Card>

      <div className="h-8" />
    </AppLayout>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="font-bold min-w-[110px]">{label}</span>
      <span className="text-foreground/80 inline-flex items-center gap-1">
        {icon}
        {value}
      </span>
    </div>
  );
}
