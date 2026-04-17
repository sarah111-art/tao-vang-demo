import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Liên hệ — Táo Vàng" },
      { name: "description", content: "Liên hệ với đội ngũ Táo Vàng." },
      { property: "og:title", content: "Liên hệ — Táo Vàng" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="phone-frame flex flex-col">
      <div className="hero-gradient text-primary-foreground px-5 pt-10 pb-10 rounded-b-[2rem]">
        <Link to="/tai-khoan" className="inline-flex items-center gap-1 text-sm opacity-90 mb-3">
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </Link>
        <h1 className="text-3xl font-extrabold drop-shadow">Liên hệ Táo Vàng</h1>
        <p className="text-sm opacity-90 mt-1">Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
      </div>

      <Card className="mx-4 -mt-6 p-5 shadow-card">
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            const { error } = await supabase.from("contact_messages").insert({ name, email, phone, message });
            setBusy(false);
            if (error) return toast.error(error.message);
            toast.success("Đã gửi tin nhắn — cảm ơn bạn!");
            setName(""); setEmail(""); setPhone(""); setMessage("");
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="c-name">Họ và tên</Label>
            <Input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email">Email</Label>
            <Input id="c-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-phone">SĐT (tuỳ chọn)</Label>
            <Input id="c-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-msg">Lời nhắn</Label>
            <Textarea id="c-msg" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Đang gửi..." : "Gửi tin nhắn"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
