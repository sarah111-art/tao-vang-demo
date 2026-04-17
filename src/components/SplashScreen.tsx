import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show only once per browser session
    if (sessionStorage.getItem("tv_splash_seen") === "1") {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("tv_splash_seen", "1");
      setShow(false);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background overflow-hidden"
          aria-hidden="true"
        >
          {/* Top green wave with golden curve */}
          <svg
            className="absolute top-0 left-0 w-full"
            viewBox="0 0 400 220"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 H400 V120 C320 180, 200 90, 100 150 C 60 168, 20 160, 0 150 Z"
              fill="oklch(0.55 0.16 145)"
            />
            <path
              d="M0 110 C 90 170, 220 80, 400 150 V0 H0 Z"
              fill="oklch(0.78 0.17 90)"
              opacity="0.95"
            />
          </svg>

          {/* Bottom green hills */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 400 240"
            preserveAspectRatio="none"
          >
            <path
              d="M0 240 V120 C 80 60, 180 140, 260 90 C 320 55, 360 90, 400 80 V240 Z"
              fill="oklch(0.55 0.16 145)"
            />
            <path
              d="M0 240 V170 C 100 130, 200 200, 300 160 C 350 140, 380 170, 400 165 V240 Z"
              fill="oklch(0.45 0.14 145)"
              opacity="0.9"
            />
          </svg>

          {/* Record badge top-right */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
            className="absolute top-6 right-6 sm:top-10 sm:right-10"
          >
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full grid place-items-center text-center shadow-warm"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.85 0.18 85), oklch(0.55 0.18 55))",
                border: "3px solid oklch(0.45 0.14 50)",
              }}
            >
              <div className="text-[7px] sm:text-[8px] font-extrabold text-warm-foreground leading-tight px-1">
                TÁC PHẨM
                <br />
                <span className="text-[10px] sm:text-xs">KỶ LỤC</span>
                <br />
                THẾ GIỚI
              </div>
            </div>
          </motion.div>

          {/* Center logo block */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 14 }}
              className="relative"
            >
              {/* Curved top text */}
              <svg viewBox="0 0 320 70" className="w-72 sm:w-80 h-auto -mb-2">
                <defs>
                  <path id="topArc" d="M20 60 Q 160 -10 300 60" />
                </defs>
                <text
                  fill="oklch(0.55 0.16 145)"
                  fontSize="16"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                    HỌC TẬP · RÈN NHÂN CÁCH
                  </textPath>
                </text>
              </svg>

              {/* Logo with spinning ring */}
              <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48 grid place-items-center">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="oklch(0.55 0.16 145)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="6 10"
                    opacity="0.85"
                  />
                  <circle cx="50" cy="4" r="3.5" fill="oklch(0.78 0.17 90)" />
                  <circle cx="96" cy="50" r="2.5" fill="oklch(0.55 0.16 145)" />
                  <circle cx="50" cy="96" r="2.5" fill="oklch(0.55 0.16 145)" />
                  <circle cx="4" cy="50" r="2.5" fill="oklch(0.78 0.17 90)" />
                </motion.svg>
                <motion.div
                  className="absolute inset-3 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.92 0.10 90 / 0.6) 0%, transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <img
                  src="https://apptaovang.com/wp-content/uploads/2023/02/logo-tao-vang-new.webp"
                  alt="Táo Vàng"
                  className="relative h-28 sm:h-36 w-auto drop-shadow-[0_6px_20px_rgba(180,83,9,0.35)]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Curved bottom text */}
              <svg viewBox="0 0 320 70" className="w-72 sm:w-80 h-auto -mt-2">
                <defs>
                  <path id="botArc" d="M20 10 Q 160 80 300 10" />
                </defs>
                <text
                  fill="oklch(0.55 0.16 145)"
                  fontSize="16"
                  fontWeight="700"
                  letterSpacing="3"
                >
                  <textPath href="#botArc" startOffset="50%" textAnchor="middle">
                    TẠO THÓI QUEN
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-warm"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
