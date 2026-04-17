import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Sprout } from "lucide-react";

function GoogleButton() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const result = await lovable.auth.signInWithOAuth("google", {
          redirect_uri: window.location.origin + "/tai-khoan",
        });
        if (result.error) {
          setBusy(false);
          toast.error("Không đăng nhập được với Google");
          return;
        }
        if (result.redirected) return;
      }}
    >
      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4-5.4 4-3.3 0-5.9-2.7-5.9-6.1S8.7 5.9 12 5.9c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-9 0-.6-.1-1.1-.2-1.6H12z"/>
      </svg>
      {busy ? "Đang chuyển..." : "Tiếp tục với Google"}
    </Button>
  );
}

function Divider() {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
      <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">hoặc</span></div>
    </div>
  );
}

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Đăng nhập — Táo Vàng" },
      { name: "description", content: "Đăng nhập hoặc đăng ký tài khoản Táo Vàng." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/tai-khoan" });
  }, [user, navigate]);

  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="hero-gradient text-primary-foreground px-5 pt-10 pb-12 rounded-b-[2rem]">
        <Link to="/tai-khoan" className="inline-flex items-center gap-1 text-sm opacity-90 mb-4">
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-card/20 grid place-items-center">
            <Sprout className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Táo Vàng</h1>
            <p className="text-sm opacity-90">Gieo hạt giống — Vun cuộc đời</p>
          </div>
        </div>
      </div>

      <Card className="mx-4 -mt-8 p-5 shadow-card">
        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Đăng nhập</TabsTrigger>
            <TabsTrigger value="signup">Đăng ký</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-4">
            <GoogleButton />
            <Divider />
            <SignInForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <GoogleButton />
            <Divider />
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setBusy(false);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Đăng nhập thành công!");
        navigate({ to: "/tai-khoan" });
      }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="si-email">Email</Label>
        <Input id="si-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="si-password">Mật khẩu</Label>
        <Input
          id="si-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/tai-khoan` : undefined;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo,
            data: { full_name: fullName, phone },
          },
        });
        setBusy(false);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Tạo tài khoản thành công!");
        navigate({ to: "/tai-khoan" });
      }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="su-name">Họ và tên</Label>
        <Input id="su-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="su-phone">Số điện thoại</Label>
        <Input id="su-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="su-email">Email</Label>
        <Input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="su-password">Mật khẩu</Label>
        <Input
          id="su-password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Đang tạo..." : "Đăng ký"}
      </Button>
    </form>
  );
}
