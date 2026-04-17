import { Link, useLocation } from "@tanstack/react-router";
import { Home, Sprout, TreeDeciduous, Ticket, UserCircle2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Tab = {
  to: "/" | "/hat-giong" | "/vuon-tao" | "/su-kien" | "/tai-khoan";
  label: string;
  icon: LucideIcon;
  center?: boolean;
};

const tabs: Tab[] = [
  { to: "/", label: "Sản phẩm", icon: Home },
  { to: "/hat-giong", label: "Hạt giống", icon: Sprout },
  { to: "/vuon-tao", label: "Vườn Táo", icon: TreeDeciduous, center: true },
  { to: "/su-kien", label: "Sự kiện", icon: Ticket },
  { to: "/tai-khoan", label: "Tài khoản", icon: UserCircle2 },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  return (
    <div className="phone-frame flex flex-col">
      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <nav className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border">
        <ul className="grid grid-cols-5 items-end px-2 pt-2 pb-3">
          {tabs.map((t) => {
            const active = loc.pathname === t.to;
            const Icon = t.icon;
            if (t.center) {
              return (
                <li key={t.to} className="flex justify-center">
                  <Link to={t.to} className="-mt-7 flex flex-col items-center gap-1">
                    <span className="hero-gradient h-14 w-14 rounded-full grid place-items-center shadow-warm ring-4 ring-card">
                      <Icon className="h-7 w-7 text-primary-foreground" />
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
                  <Icon className={`h-5 w-5 ${active ? "fill-primary/15" : ""}`} />
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
    <header className="hero-gradient text-primary-foreground px-5 pt-10 pb-16 rounded-b-[2rem] relative">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight drop-shadow-sm">{title}</h1>
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-warm bg-card/95 px-2 py-0.5 rounded-full mb-1">
            {seedCount} hạt
          </span>
          <div className="h-12 w-12 rounded-full bg-primary-foreground/15 grid place-items-center backdrop-blur">
            <Sprout className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
