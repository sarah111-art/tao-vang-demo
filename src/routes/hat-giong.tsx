import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/hat-giong")({
  head: () => ({
    meta: [
      { title: "Hạt giống — Táo Vàng" },
      { name: "description", content: "Cây 24 hạt giống đức tính giúp bạn sống vui tươi, thành công, giúp ích." },
      { property: "og:title", content: "Hạt giống đức tính — Táo Vàng" },
      { property: "og:description", content: "Chăm hạt giống — sống vui tươi, thành công, giúp ích." },
    ],
  }),
  component: SeedsPage,
});

type Seed = { id: string; name: string; color: string };

// Maps seed.color → tailwind gradient pair for the heart-apple
const colorMap: Record<string, { from: string; to: string }> = {
  amber:   { from: "#fbbf24", to: "#d97706" },
  violet:  { from: "#a78bfa", to: "#6d28d9" },
  emerald: { from: "#34d399", to: "#047857" },
  green:   { from: "#4ade80", to: "#15803d" },
  rose:    { from: "#fb7185", to: "#be123c" },
  purple:  { from: "#c084fc", to: "#7e22ce" },
  orange:  { from: "#fb923c", to: "#c2410c" },
  red:     { from: "#f87171", to: "#b91c1c" },
  indigo:  { from: "#818cf8", to: "#3730a3" },
  blue:    { from: "#60a5fa", to: "#1d4ed8" },
  sky:     { from: "#38bdf8", to: "#0369a1" },
  lime:    { from: "#a3e635", to: "#4d7c0f" },
  teal:    { from: "#2dd4bf", to: "#0f766e" },
  pink:    { from: "#f472b6", to: "#be185d" },
  cyan:    { from: "#22d3ee", to: "#0e7490" },
};

/** Heart-shaped apple with stem leaf, drawn in SVG so it scales perfectly. */
function HeartApple({ name, color, i }: { name: string; color: string; i: number }) {
  const c = colorMap[color] ?? colorMap.green;
  const gid = `g-${i}`;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.5, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 180, damping: 14 }}
      whileHover={{ scale: 1.06, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full aspect-square focus:outline-none"
      aria-label={name}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.18)]">
        <defs>
          <radialGradient id={gid} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={c.from} />
            <stop offset="100%" stopColor={c.to} />
          </radialGradient>
          <linearGradient id={`${gid}-leaf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>

        {/* Heart-shaped apple body */}
        <path
          d="M50 90 C 18 68, 8 44, 22 28 C 32 17, 45 22, 50 33 C 55 22, 68 17, 78 28 C 92 44, 82 68, 50 90 Z"
          fill={`url(#${gid})`}
        />
        {/* Highlight */}
        <ellipse cx="36" cy="38" rx="10" ry="6" fill="rgba(255,255,255,0.35)" transform="rotate(-25 36 38)" />
        {/* Stem */}
        <path d="M50 22 L52 14" stroke="#5a3a1a" strokeWidth="2.4" strokeLinecap="round" />
        {/* Leaf */}
        <path
          d="M52 16 C 60 10, 70 12, 70 18 C 64 22, 56 22, 52 18 Z"
          fill={`url(#${gid}-leaf)`}
        />
      </svg>

      {/* Label centered on the apple */}
      <span
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-2 pt-2"
        style={{ paddingTop: "18%" }}
      >
        <span className="text-white text-[13px] sm:text-sm font-extrabold text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {name}
        </span>
      </span>
    </motion.button>
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
      <div
        className="relative min-h-[calc(100dvh-4rem)] overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.97 0.04 130) 0%, oklch(0.99 0.01 130) 60%, oklch(0.96 0.05 90) 100%)",
        }}
      >
        {/* Foliage corners */}
        <div className="pointer-events-none absolute -top-6 -left-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.16_142_/_0.55),transparent_70%)]" />
        <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.16_142_/_0.55),transparent_70%)]" />

        {/* Header banner */}
        <header className="relative z-10 px-5 pt-8 pb-6 text-center">
          <div className="inline-block">
            <h1
              className="font-extrabold uppercase leading-[1.05] tracking-tight text-3xl sm:text-4xl md:text-5xl"
              style={{
                color: "#fff48a",
                WebkitTextStroke: "2px #b45309",
                textShadow:
                  "0 3px 0 #b45309, 0 6px 14px rgba(180,83,9,0.35)",
                fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
              }}
            >
              Chăm hạt giống
              <br />
              Sống vui tươi
              <br />
              Thành công, giúp ích
            </h1>
          </div>
          <p className="mt-3 text-xs font-semibold text-warm">
            {profile?.seed_count ?? 0} hạt trong túi
          </p>
        </header>

        {/* Tree composition */}
        <div className="relative z-10 mx-auto max-w-2xl px-3 sm:px-6 pb-16">
          {/* Trunk + branches behind the grid */}
          <svg
            className="absolute inset-x-0 top-0 mx-auto h-full w-full pointer-events-none"
            viewBox="0 0 400 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7a4a1d" />
                <stop offset="50%" stopColor="#a8682f" />
                <stop offset="100%" stopColor="#6b3e15" />
              </linearGradient>
            </defs>
            {/* Main trunk */}
            <path
              d="M200 0 C 195 200, 205 500, 200 1000"
              stroke="url(#trunk)"
              strokeWidth="34"
              strokeLinecap="round"
              fill="none"
            />
            {/* Branches — alternating left/right per row */}
            {[120, 270, 420, 570, 720, 870].map((y, idx) => (
              <g key={y}>
                <path
                  d={`M200 ${y} C 130 ${y - 10}, 70 ${y + 10}, 30 ${y}`}
                  stroke="url(#trunk)"
                  strokeWidth={idx % 2 === 0 ? 16 : 14}
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d={`M200 ${y} C 270 ${y - 10}, 330 ${y + 10}, 370 ${y}`}
                  stroke="url(#trunk)"
                  strokeWidth={idx % 2 === 0 ? 14 : 16}
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            ))}
          </svg>

          {/* Apple grid */}
          <div className="relative grid grid-cols-4 gap-x-2 gap-y-5 sm:gap-x-4 sm:gap-y-7">
            {seeds.map((s, i) => {
              // Stagger every other row to feel organic
              const row = Math.floor(i / 4);
              const col = i % 4;
              const offsetY = (col % 2 === 0 ? 0 : 12) + (row % 2 === 0 ? 0 : 4);
              return (
                <div key={s.id} style={{ transform: `translateY(${offsetY}px)` }}>
                  <HeartApple name={s.name} color={s.color} i={i} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
