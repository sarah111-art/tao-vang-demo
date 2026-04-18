import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/hat-giong/$id")({
  component: SeedVideoPage,
});

type SeedDetail = {
  id: string;
  name: string;
  color: string;
  description: string | null;
  video_url: string | null;
};

function SeedVideoPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [seed, setSeed] = useState<SeedDetail | null>(null);

  useEffect(() => {
    void supabase
      .from("seeds")
      .select("id,name,color,description,video_url")
      .eq("id", id)
      .single()
      .then(({ data }) => setSeed(data as SeedDetail | null));
  }, [id]);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => void navigate({ to: "/hat-giong" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>

        {seed ? (
          <>
            <h1 className="text-2xl font-extrabold text-foreground mb-4">{seed.name}</h1>

            {seed.video_url ? (
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-black">
                <iframe
                  src={seed.video_url}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={seed.name}
                />
              </div>
            ) : (
              <div className="rounded-2xl bg-muted aspect-video flex items-center justify-center text-muted-foreground text-sm">
                Video đang được cập nhật...
              </div>
            )}

            {seed.description && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{seed.description}</p>
            )}
          </>
        ) : (
          <div className="py-20 text-center text-muted-foreground text-sm">Đang tải...</div>
        )}
      </div>
    </AppLayout>
  );
}
