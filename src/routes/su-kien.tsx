import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/su-kien")({
  head: () => ({
    meta: [
      { title: "Sự kiện — Táo Vàng" },
      { name: "description", content: "Sự kiện sắp diễn ra của cộng đồng Táo Vàng." },
      { property: "og:title", content: "Sự kiện — Táo Vàng" },
      { property: "og:description", content: "Cập nhật các sự kiện và hoạt động cộng đồng Táo Vàng." },
    ],
  }),
  component: SuKienRoot,
});

/** Root: nếu đang ở child route thì chỉ render Outlet (trang chi tiết), ngược lại render list */
function SuKienRoot() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <EventsPage />;
}

type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  slug: string | null;
};

function EventsPage() {
  const { profile } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase
      .from("events")
      .select("id,title,description,event_date,location,image_url,slug")
      .order("event_date", { ascending: true })
      .then(({ data }) => {
        setEvents((data ?? []) as Event[]);
        setLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <PageHeader title="Sự kiện" seedCount={profile?.seed_count ?? 0} />

      <section className="px-4 -mt-8 space-y-4 pb-8">
        {loading ? (
          <p className="text-center text-muted-foreground py-10">Đang tải...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Chưa có sự kiện mới.</p>
        ) : (
          events.map((e, i) => {
            const card = (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl overflow-hidden bg-card shadow-card active:scale-[0.98] transition-transform"
              >
                <div className="relative h-44 overflow-hidden">
                  {e.image_url ? (
                    <img src={e.image_url} alt={e.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="hero-gradient w-full h-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <h2 className="absolute bottom-4 left-4 right-8 text-white text-lg font-extrabold drop-shadow leading-tight">
                    {e.title}
                  </h2>
                  <ChevronRight className="absolute bottom-4 right-4 h-5 w-5 text-white/80" />
                </div>
                <div className="p-4 space-y-2">
                  {e.description && (
                    <p className="text-sm text-foreground/80 line-clamp-2">{e.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {e.event_date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(e.event_date).toLocaleDateString("vi-VN", {
                          day: "2-digit", month: "long", year: "numeric",
                        })}
                      </span>
                    )}
                    {e.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {e.location}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );

            return e.slug ? (
              <Link key={e.id} to="/su-kien/$slug" params={{ slug: e.slug }}>
                {card}
              </Link>
            ) : (
              <div key={e.id}>{card}</div>
            );
          })
        )}
      </section>
    </AppLayout>
  );
}
