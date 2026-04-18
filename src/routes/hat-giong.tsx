import { createFileRoute, Outlet, useChildMatches, useNavigate } from "@tanstack/react-router";
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
      { name: "description", content: "Cây 24 hạt giống đức tính giúp bạn sống vui tươi, thành công, giúp ích." },
      { property: "og:title", content: "Hạt giống đức tính — Táo Vàng" },
      { property: "og:description", content: "Chăm hạt giống — sống vui tươi, thành công, giúp ích." },
    ],
  }),
  component: HatGiongRoot,
});

function HatGiongRoot() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <SeedsPage />;
}

type Seed = { id: string; name: string; color: string; video_url: string | null };

const colorMap: Record<string, { from: string; to: string }> = {
  amber:   { from: "#fcd34d", to: "#d97706" },
  violet:  { from: "#c4b5fd", to: "#7c3aed" },
  emerald: { from: "#6ee7b7", to: "#059669" },
  green:   { from: "#86efac", to: "#16a34a" },
  rose:    { from: "#fda4af", to: "#e11d48" },
  purple:  { from: "#d8b4fe", to: "#9333ea" },
  orange:  { from: "#fdba74", to: "#ea580c" },
  red:     { from: "#fca5a5", to: "#dc2626" },
  indigo:  { from: "#a5b4fc", to: "#4338ca" },
  blue:    { from: "#93c5fd", to: "#2563eb" },
  sky:     { from: "#7dd3fc", to: "#0284c7" },
  lime:    { from: "#bef264", to: "#65a30d" },
  teal:    { from: "#5eead4", to: "#0d9488" },
  pink:    { from: "#f9a8d4", to: "#db2777" },
  cyan:    { from: "#67e8f9", to: "#0891b2" },
};

function HeartApple({ name, color, i, onClick }: { name: string; color: string; i: number; onClick?: () => void }) {
  const c = colorMap[color] ?? colorMap.green;
  const gid = `g-${i}`;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.4, y: -16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.1 + i * 0.035, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08, rotate: -3 }}
      whileTap={{ scale: 0.93 }}
      className="relative w-full aspect-square focus:outline-none"
      aria-label={name}
      onClick={onClick}
    >
      <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-[0_5px_10px_rgba(0,0,0,0.22)]">
        <defs>
          <radialGradient id={gid} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={c.from} />
            <stop offset="100%" stopColor={c.to} />
          </radialGradient>
          <radialGradient id={`${gid}-dark`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </radialGradient>
          <linearGradient id={`${gid}-leaf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
        {/* Heart body */}
        <path
          d="M50 95 C 16 72, 6 46, 22 30 C 33 18, 46 24, 50 36 C 54 24, 67 18, 78 30 C 94 46, 84 72, 50 95 Z"
          fill={`url(#${gid})`}
        />
        {/* Inner shadow */}
        <path
          d="M50 95 C 16 72, 6 46, 22 30 C 33 18, 46 24, 50 36 C 54 24, 67 18, 78 30 C 94 46, 84 72, 50 95 Z"
          fill={`url(#${gid}-dark)`}
        />
        {/* Highlight */}
        <ellipse cx="35" cy="42" rx="11" ry="6" fill="rgba(255,255,255,0.38)" transform="rotate(-28 35 42)" />
        {/* Stem */}
        <path d="M50 26 Q53 16 55 10" stroke="#5a3a1a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* Leaf */}
        <path d="M55 12 C 64 6, 76 8, 75 15 C 68 20, 58 20, 55 14 Z" fill={`url(#${gid}-leaf)`} />
        {/* Leaf vein */}
        <path d="M55 13 L71 14" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-1"
        style={{ paddingTop: "14%", paddingBottom: "6%" }}
      >
        <span className="text-white font-extrabold text-center leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          style={{ fontSize: "clamp(9px, 2.8vw, 13px)" }}>
          {name}
        </span>
      </span>
    </motion.button>
  );
}

/** Green leaf SVG for corners */
function CornerLeaves({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scale(-1,1)" : undefined;
  return (
    <svg viewBox="0 0 160 160" className="absolute top-0 w-40 h-40 pointer-events-none opacity-90"
      style={{ [side]: 0, transform: flip ? `${flip}` : undefined }}>
      <ellipse cx="20" cy="30" rx="55" ry="28" fill="#4ade80" transform="rotate(-35 20 30)" />
      <ellipse cx="40" cy="15" rx="50" ry="22" fill="#22c55e" transform="rotate(-55 40 15)" />
      <ellipse cx="10" cy="55" rx="45" ry="20" fill="#86efac" transform="rotate(-15 10 55)" />
      <ellipse cx="60" cy="10" rx="40" ry="18" fill="#16a34a" transform="rotate(-70 60 10)" />
      <ellipse cx="30" cy="75" rx="38" ry="16" fill="#4ade80" transform="rotate(-5 30 75)" />
    </svg>
  );
}

function SeedsPage() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;

  const { profile } = useAuth();
  const navigate = useNavigate();
  const [seeds, setSeeds] = useState<Seed[]>([]);

  useEffect(() => {
    void supabase
      .from("seeds")
      .select("id,name,color,sort_order,video_url")
      .order("sort_order")
      .then(({ data }) => setSeeds((data ?? []) as Seed[]));
  }, []);

  const rows = [];
  for (let i = 0; i < seeds.length; i += 4) {
    rows.push(seeds.slice(i, i + 4));
  }

  return (
    <AppLayout>
      <div
        className="relative min-h-[calc(100dvh-4rem)] overflow-hidden"
        style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #fefce8 60%, #fff7ed 100%)" }}
      >
        {/* Corner leaves */}
        <CornerLeaves side="left" />
        <CornerLeaves side="right" />

        {/* Title */}
        <header className="relative z-10 px-4 pt-10 pb-2 text-center">
          <h1
            className="font-extrabold uppercase leading-[1.1] tracking-tight"
            style={{
              fontSize: "clamp(24px, 7vw, 38px)",
              color: "#fef08a",
              WebkitTextStroke: "2.5px #92400e",
              textShadow: "0 3px 0 #92400e, 0 6px 18px rgba(146,64,14,0.3)",
              fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
            }}
          >
            Chăm hạt giống
            <br />
            Sống vui tươi
            <br />
            Thành công, giúp ích
          </h1>

          {/* Lightbulb */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto mt-4 mb-1 w-14 h-14 rounded-full bg-white shadow-warm border-2 border-amber-200 grid place-items-center"
          >
            <Lightbulb className="h-7 w-7 text-amber-400 fill-amber-100" />
          </motion.div>

          <p className="text-xs font-semibold text-amber-600 mt-1">
            {profile?.seed_count ?? 0} hạt trong túi
          </p>
        </header>

        {/* Tree + apples */}
        <div className="relative z-10 mx-auto max-w-sm px-3 pb-20">
          {/* Tree SVG behind apples */}
          <svg
            className="absolute inset-x-0 top-0 mx-auto w-full pointer-events-none"
            style={{ height: `${rows.length * 110 + 40}px` }}
            viewBox={`0 0 320 ${rows.length * 110 + 40}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="trunk-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7a4a1d" />
                <stop offset="45%" stopColor="#b07540" />
                <stop offset="100%" stopColor="#6b3e15" />
              </linearGradient>
            </defs>
            {/* Main trunk */}
            <path
              d={`M160 0 C 156 ${rows.length * 55}, 164 ${rows.length * 80}, 160 ${rows.length * 110 + 40}`}
              stroke="url(#trunk-grad)" strokeWidth="28" strokeLinecap="round" fill="none"
            />
            {/* Branches per row */}
            {rows.map((_, ri) => {
              const y = ri * 110 + 55;
              return (
                <g key={ri}>
                  <path d={`M160 ${y} C 110 ${y - 8}, 55 ${y + 5}, 20 ${y - 2}`}
                    stroke="url(#trunk-grad)" strokeWidth="14" strokeLinecap="round" fill="none" />
                  <path d={`M160 ${y} C 210 ${y - 8}, 265 ${y + 5}, 300 ${y - 2}`}
                    stroke="url(#trunk-grad)" strokeWidth="14" strokeLinecap="round" fill="none" />
                </g>
              );
            })}
          </svg>

          {/* Apple rows */}
          <div className="relative flex flex-col gap-4 pt-2">
            {rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-4 gap-2">
                {row.map((s, ci) => {
                  const offsetY = ci % 2 === 0 ? 0 : 10;
                  return (
                    <div key={s.id} style={{ transform: `translateY(${offsetY}px)` }}>
                      <HeartApple
                        name={s.name}
                        color={s.color}
                        i={ri * 4 + ci}
                        onClick={() => void navigate({ to: "/hat-giong/$id", params: { id: s.id } })}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
