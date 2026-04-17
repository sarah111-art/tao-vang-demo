import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Lightbulb } from "lucide-react";

export const Route = createFileRoute("/hat-giong")({
  head: () => ({
    meta: [
      { title: "Hạt giống — Táo Vàng" },
      { name: "description", content: "24 hạt giống đức tính giúp bạn sống vui tươi, thành công, giúp ích." },
      { property: "og:title", content: "Hạt giống đức tính — Táo Vàng" },
      { property: "og:description", content: "Chăm hạt giống — sống vui tươi, thành công, giúp ích." },
    ],
  }),
  component: SeedsPage,
});

type Seed = { id: string; name: string; color: string };

const colorMap: Record<string, string> = {
  amber: "from-amber-300 to-amber-500",
  violet: "from-violet-400 to-violet-600",
  emerald: "from-emerald-400 to-emerald-600",
  green: "from-green-400 to-green-600",
  rose: "from-rose-400 to-rose-600",
  purple: "from-purple-400 to-purple-600",
  orange: "from-orange-400 to-orange-600",
  red: "from-red-400 to-red-600",
  indigo: "from-indigo-400 to-indigo-600",
  blue: "from-blue-400 to-blue-600",
  sky: "from-sky-400 to-sky-600",
  lime: "from-lime-400 to-lime-600",
  teal: "from-teal-400 to-teal-600",
  pink: "from-pink-400 to-pink-600",
  cyan: "from-cyan-400 to-cyan-600",
};

function Heart({ name, color, i }: { name: string; color: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.03, type: "spring", stiffness: 200 }}
      className={`relative aspect-square bg-gradient-to-br ${colorMap[color] ?? colorMap.green} rounded-[40%_40%_50%_50%/55%_55%_45%_45%] grid place-items-center shadow-card`}
      style={{ transform: "rotate(-2deg)" }}
    >
      <span className="text-primary-foreground text-sm font-bold text-center px-1 leading-tight drop-shadow">
        {name}
      </span>
    </motion.div>
  );
}

function SeedsPage() {
  const { profile } = useAuth();
  const [seeds, setSeeds] = useState<Seed[]>([]);

  useEffect(() => {
    void supabase
      .from("seeds")
      .select("id,name,color")
      .order("sort_order")
      .then(({ data }) => setSeeds((data ?? []) as Seed[]));
  }, []);

  return (
    <AppLayout>
      <div className="hero-gradient text-primary-foreground px-5 pt-10 pb-12 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute top-3 right-3 flex flex-col items-center">
          <span className="text-xs font-semibold text-warm bg-card/95 px-2 py-0.5 rounded-full">
            {profile?.seed_count ?? 0} hạt
          </span>
        </div>
        <h1 className="text-2xl font-extrabold leading-tight uppercase drop-shadow text-warm-foreground" style={{ WebkitTextStroke: "1px oklch(0.4 0.1 50)" }}>
          Chăm hạt giống
          <br />
          Sống vui tươi
          <br />
          Thành công, giúp ích
        </h1>
        <div className="mt-4 mx-auto h-12 w-12 rounded-full bg-card grid place-items-center shadow-warm">
          <Lightbulb className="h-6 w-6 text-warm" />
        </div>
      </div>

      <section className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {seeds.map((s, i) => (
            <Heart key={s.id} name={s.name} color={s.color} i={i} />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
