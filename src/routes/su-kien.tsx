import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/su-kien")({
  head: () => ({
    meta: [
      { title: "Sự kiện — Táo Vàng" },
      { name: "description", content: "Sự kiện sắp diễn ra của cộng đồng Táo Vàng." },
      { property: "og:title", content: "Sự kiện — Táo Vàng" },
      { property: "og:description", content: "Cập nhật các sự kiện và hoạt động cộng đồng Táo Vàng." },
    ],
  }),
  component: EventsPage,
});

type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
};

function EventsPage() {
  const { profile } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase
      .from("events")
      .select("id,title,description,event_date,location,image_url")
      .order("event_date", { ascending: true })
      .then(({ data }) => {
        setEvents((data ?? []) as Event[]);
        setLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <PageHeader title="Sự kiện" seedCount={profile?.seed_count ?? 0} />

      <section className="px-4 -mt-8 space-y-4">
        {loading ? (
          <p className="text-center text-muted-foreground py-10">Đang tải...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Chưa có sự kiện mới.</p>
        ) : (
          events.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl overflow-hidden bg-card shadow-card"
            >
              <div className="hero-gradient h-40 p-5 text-primary-foreground flex items-end">
                <h2 className="text-xl font-extrabold drop-shadow uppercase leading-tight">
                  {e.title}
                </h2>
              </div>
              <div className="p-4 space-y-2">
                {e.description && <p className="text-sm text-foreground/80">{e.description}</p>}
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {e.event_date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(e.event_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })}
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
          ))
        )}
      </section>
    </AppLayout>
  );
}
