import { Link, useLocation } from "@tanstack/react-router";
import { Home, Sprout, Ticket, UserCircle2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Tab = {
  to: "/" | "/hat-giong" | "/vuon-tao" | "/su-kien" | "/tai-khoan";
  label: string;
  icon: LucideIcon | string;
  center?: boolean;
};

const tabs: Tab[] = [
  { to: "/", label: "Sản phẩm", icon: Home },
  { to: "/hat-giong", label: "Hạt giống", icon: Sprout },
  { to: "/vuon-tao", label: "Vườn Táo", icon: "https://apptaovang.com/wp-content/uploads/2023/09/logo-tao-vang.webp", center: true },
  { to: "/su-kien", label: "Sự kiện", icon: Ticket },
  { to: "/tai-khoan", label: "Tài khoản", icon: UserCircle2 },
];

function TabIcon({ icon, label, className }: { icon: LucideIcon | string; label: string; className?: string }) {
  if (typeof icon === "string") return <img src={icon} alt={label} className={className} />;
  const Icon = icon;
  return <Icon className={className ?? ""} />;
}

export function AppLayout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* Desktop top navbar */}
      <header className="hidden md:block sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://apptaovang.com/wp-content/uploads/2023/02/logo-tao-vang-new.webp"
              alt="Táo Vàng"
              className="h-10 w-auto"
              loading="eager"
              decoding="async"
            />
          </Link>
          <nav>
            <ul className="flex items-center gap-1">
              {tabs.map((t) => {
                const active = loc.pathname === t.to;
                return (
                  <li key={t.to}>
                    <Link
                      to={t.to}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
                        active
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <TabIcon icon={t.icon} label={t.label} className="h-4 w-4 rounded-full object-cover" />
                      {t.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border">
        <ul className="grid grid-cols-5 items-end px-2 pt-2 pb-3 max-w-md mx-auto">
          {tabs.map((t) => {
            const active = loc.pathname === t.to;
            if (t.center) {
              return (
                <li key={t.to} className="flex justify-center">
                  <Link to={t.to} className="-mt-7 flex flex-col items-center gap-1">
                    <span className="hero-gradient h-14 w-14 rounded-full grid place-items-center shadow-warm ring-4 ring-card overflow-hidden">
                      <TabIcon icon={t.icon} label={t.label} className="h-10 w-10 object-contain" />
                    </span>
                    <span className={`text-[11px] ${active ? "tab-active font-semibold" : "text-muted-foreground"}`}>
                      {t.label}
                    </span>
                  </Link>
                </li>
              );
            }
            return (
              <li key={t.to}>
                <Link
                  to={t.to}
                  className={`flex flex-col items-center gap-1 py-1 ${active ? "tab-active" : "text-muted-foreground"}`}
                >
                  <TabIcon icon={t.icon} label={t.label} className={`h-5 w-5 ${active ? "fill-primary/15" : ""}`} />
                  <span className={`text-[11px] ${active ? "font-semibold" : ""}`}>{t.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PageHeader({ title, seedCount = 0 }: { title: string; seedCount?: number }) {
  return (
    <header className="hero-gradient text-primary-foreground px-5 md:px-10 pt-10 md:pt-12 pb-16 md:pb-20 rounded-b-[2rem] md:rounded-b-[2.5rem] relative">
      <div className="flex items-start justify-between max-w-5xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-sm">{title}</h1>
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-warm bg-card/95 px-2 py-0.5 rounded-full mb-1">
            {seedCount} hạt
          </span>
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary-foreground/15 grid place-items-center backdrop-blur">
            <Sprout className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
