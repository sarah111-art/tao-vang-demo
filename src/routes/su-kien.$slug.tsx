import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/su-kien/$slug")({
  head: () => ({
    meta: [
      { title: "Sự kiện — Táo Vàng" },
      { property: "og:type", content: "article" },
    ],
  }),
  component: EventDetail,
});

type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  slug: string | null;
};

function EventDetail() {
  const { slug } = Route.useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase
      .from("events")
      .select("id,title,description,event_date,location,image_url,slug")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setEvent(data as Event | null);
        setLoading(false);
      });
  }, [slug]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: event?.title ?? "", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Đã sao chép link!");
    }
  };

  if (loading) {
    return (
      <div className="phone-frame flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="phone-frame flex flex-col items-center justify-center min-h-screen gap-4 p-6">
        <p className="text-muted-foreground">Không tìm thấy sự kiện.</p>
        <Button asChild variant="outline">
          <Link to="/su-kien">← Về danh sách sự kiện</Link>
        </Button>
      </div>
    );
  }

  const dateStr = event.event_date
    ? new Date(event.event_date).toLocaleDateString("vi-VN", {
        weekday: "long", day: "2-digit", month: "long", year: "numeric",
      })
    : null;

  const timeStr = event.event_date
    ? new Date(event.event_date).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className="phone-frame flex flex-col min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative w-full h-64 shrink-0 overflow-hidden">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="hero-gradient w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back + Share buttons */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-10">
          <Link
            to="/su-kien"
            className="h-9 w-9 rounded-full bg-black/30 backdrop-blur-sm grid place-items-center text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={share}
            className="h-9 w-9 rounded-full bg-black/30 backdrop-blur-sm grid place-items-center text-white hover:bg-black/50 transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content card */}
      <div className="flex-1 -mt-6 bg-background rounded-t-3xl px-5 pt-6 pb-10 space-y-5">
        {/* Title */}
        <h1 className="text-xl font-extrabold leading-snug">{event.title}</h1>

        {/* Date & location chips */}
        <div className="flex flex-col gap-2">
          {dateStr && (
            <div className="flex items-center gap-2 text-sm">
              <span className="h-8 w-8 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                <Calendar className="h-4 w-4 text-primary" />
              </span>
              <span className="font-medium">
                {dateStr}{timeStr ? ` · ${timeStr}` : ""}
              </span>
            </div>
          )}
          {event.location && (
            <div className="flex items-start gap-2 text-sm">
              <span className="h-8 w-8 rounded-xl bg-warm/20 grid place-items-center shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-warm" />
              </span>
              <span className="font-medium leading-snug">{event.location}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Description */}
        {event.description && (
          <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
            {event.description}
          </p>
        )}

        {/* CTA */}
        <Button className="w-full h-12 rounded-2xl font-bold text-base">
          Đăng ký tham gia
        </Button>
      </div>
    </div>
  );
}
