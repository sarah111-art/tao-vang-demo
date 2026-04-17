import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Play } from "lucide-react";

export const Route = createFileRoute("/vuon-tao")({
  head: () => ({
    meta: [
      { title: "Vườn Táo — Táo Vàng" },
      { name: "description", content: "Khám phá Vườn Táo: hành trình Táo Vàng và Táo Vàng Kids." },
      { property: "og:title", content: "Vườn Táo — Táo Vàng" },
      { property: "og:description", content: "Khởi đầu hành trình của bạn cùng Táo Vàng và Táo Vàng Kids." },
    ],
  }),
  component: VuonTaoPage,
});

function StartCard({
  title,
  gradient,
  delay,
}: {
  title: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring" }}
      className={`relative w-full ${gradient} rounded-3xl p-6 text-left shadow-card overflow-hidden group`}
    >
      <h2 className="text-3xl font-extrabold text-primary-foreground drop-shadow mb-4" style={{ fontFamily: "Be Vietnam Pro" }}>
        {title}
      </h2>
      <span className="inline-flex items-center gap-2 bg-card/95 text-foreground px-4 py-1.5 rounded-full font-bold shadow-soft group-hover:scale-105 transition-transform">
        <Play className="h-4 w-4 fill-current" /> Start
      </span>
      <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl" />
    </motion.button>
  );
}

function VuonTaoPage() {
  return (
    <AppLayout>
      <div
        className="px-4 pt-8 pb-6 space-y-4"
        style={{
          background: "linear-gradient(180deg, oklch(0.92 0.06 230) 0%, oklch(0.97 0.02 130) 60%)",
        }}
      >
        <StartCard
          title="Táo Vàng"
          gradient="bg-gradient-to-br from-green-500 to-emerald-700"
          delay={0.05}
        />
        <StartCard
          title="Táo Vàng Kids"
          gradient="warm-gradient"
          delay={0.15}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-card/70 backdrop-blur p-6 text-center shadow-soft"
        >
          <div className="text-5xl mb-2">🌳</div>
          <h3 className="font-bold text-lg">Vườn Tâm Hồn</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Hành trình gieo trồng những hạt giống đức tính.
            <br />
            <span className="text-warm font-semibold">Hạnh phúc · Nhân ái · Giàu có</span>
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}
