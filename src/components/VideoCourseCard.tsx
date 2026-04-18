import { motion } from "framer-motion";
import { CheckCircle2, Crown, Lock, Play } from "lucide-react";

export type AccessState =
  | "free"
  | "unauthenticated"
  | "vip"
  | "owned"
  | "affordable"
  | "insufficient";

type Props = {
  title: string;
  subtitle?: string;
  cta?: string;
  seedPrice?: number | null;
  requiresMembership?: boolean;
  imageSrc?: string | null;
  gradient?: string;
  borderColor?: string;
  accessState?: AccessState;
  onClick?: () => void;
};

function PriceBadgeOverlay({
  state,
  seedPrice,
}: {
  state: AccessState;
  seedPrice?: number | null;
}) {
  if (state === "free") return null;

  if (state === "owned") {
    return (
      <div className="flex items-center justify-center gap-1.5 bg-emerald-600/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow">
        <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />
        <span className="text-white text-xs font-bold">Đã mở</span>
      </div>
    );
  }

  if (state === "vip") {
    return (
      <div className="flex items-center justify-center gap-1.5 bg-amber-500/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow">
        <Crown className="h-3.5 w-3.5 text-white shrink-0" />
        <span className="text-white text-xs font-bold">VIP</span>
      </div>
    );
  }

  // unauthenticated | affordable | insufficient
  const badgeBg =
    state === "insufficient"
      ? "bg-red-700/85"
      : "bg-[#2e6b2e]/90";

  return (
    <div
      className={`flex items-center justify-center gap-1.5 ${badgeBg} backdrop-blur-sm rounded-xl px-3 py-1.5 shadow`}
    >
      <Lock className="h-3.5 w-3.5 text-white shrink-0" />
      {seedPrice != null ? (
        <>
          <span className="text-[#ffd700] font-extrabold text-sm">{seedPrice}</span>
          <span className="text-white text-xs font-semibold">hạt</span>
        </>
      ) : (
        <span className="text-white text-xs font-bold">Thành viên</span>
      )}
    </div>
  );
}

export function VideoCourseCard({
  title,
  subtitle,
  cta = "Xem ngay",
  seedPrice,
  imageSrc,
  gradient = "from-green-600 via-green-500 to-green-700",
  borderColor = "border-orange-400",
  accessState = "unauthenticated",
  onClick,
}: Props) {
  const ctaLabel =
    accessState === "owned" || accessState === "vip" || accessState === "free"
      ? "▶ Mở ngay"
      : cta;

  return (
    <motion.article
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-card cursor-pointer border-2 ${borderColor} bg-gradient-to-b ${gradient}`}
    >
      {/* Ảnh bìa */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Overlay nhẹ */}
      <div className="absolute inset-0 bg-black/10" aria-hidden />

      {/* Badge giá / trạng thái */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10">
        <PriceBadgeOverlay state={accessState} seedPrice={seedPrice} />
      </div>

      {/* Banner tên (khi không có ảnh) */}
      {!imageSrc && (
        <div className="relative z-[1] mx-3 mt-16 rounded-xl px-4 py-3 text-center bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-950 shadow-md">
          <h3 className="text-white font-black text-base leading-tight drop-shadow">
            {title}
          </h3>
          {subtitle && (
            <p className="text-amber-100 font-semibold text-xs tracking-wide mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Nút CTA dưới */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="w-full flex items-center gap-2 rounded-full px-2 py-1.5 bg-gradient-to-b from-yellow-300 to-amber-500 border-2 border-amber-700 shadow-lg">
          <span className="grid place-items-center h-8 w-8 rounded-full bg-green-700 shrink-0">
            <Play className="h-4 w-4 text-white fill-white ml-0.5" />
          </span>
          <span className="flex-1 text-center font-black text-green-900 text-xs tracking-wide uppercase">
            {ctaLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
