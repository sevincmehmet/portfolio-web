import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useView } from "../context/useView";

// Aşağı kaydırırken gizlenir (içeriğin üstüne binmesin), yukarı kaydırınca,
// sayfanın başında ve sonunda yeniden görünür.
const useHideOnScrollDown = () => {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const nearTop = y < 200;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 160;
      const delta = y - lastY.current;
      if (nearTop || nearBottom) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      if (Math.abs(delta) > 8) lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
};

// --- PREMİUM SVG İKONLAR ---
// Vizyon: Akışkanlığı ve parlamayı temsil eden 'Sparkles' tarzı bir ikon
export const VisionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

// Bento: Kusursuz sistematiği temsil eden 'Grid/Kutu' ikonu
export const BentoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

// Zen: Doğallığı ve hafifliği temsil eden 'Yaprak/Tüy' ikonu
export const ZenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const ModeSwitcher = () => {
  const { viewMode, setViewMode } = useView();
  const hidden = useHideOnScrollDown();
  // Profil sayfalarında mobilde mod seçimi üst çubukta; altta sekme çubuğu var
  const { profileId } = useParams();
  const mobileHidden = profileId ? "hidden md:block" : "";

  const modes = [
    { id: "vizyon", label: "VİZYON", icon: <VisionIcon /> },
    { id: "bento", label: "BENTO", icon: <BentoIcon /> },
    { id: "zen", label: "ZEN", icon: <ZenIcon /> },
  ] as const;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={hidden ? { y: 140, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={
        hidden
          ? { duration: 0.35, ease: "easeIn" }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
      role="group"
      aria-label="Görünüm modu"
      data-mode-switcher
      // Gizliyken klavye/ekran okuyucu odağı da almasın
      inert={hidden}
      className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[999] ${mobileHidden}`}
    >
      {/* --- DİKKAT ÇEKİCİ DIŞ PARLAMA (GLOW) --- */}
      <div className="absolute -inset-4 bg-amber-500/20 blur-2xl rounded-full pointer-events-none animate-pulse" />

      {/* --- ANA KONTROL KUTUSU --- */}
      <motion.div
        animate={{
          backgroundColor:
            viewMode === "zen"
              ? "rgba(255,255,255,0.05)"
              : viewMode === "bento"
                ? "rgba(17,17,17,0.95)"
                : "rgba(10,10,15,0.7)",
          backdropFilter: "blur(24px)",
          borderColor:
            viewMode === "zen"
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.1)",
          borderRadius: viewMode === "bento" ? "24px" : "9999px",
        }}
        className="relative flex items-center p-2 border shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            aria-label={`${mode.label} görünümü`}
            aria-pressed={viewMode === mode.id}
            className="relative px-6 py-3.5 md:px-8 md:py-4 text-[0.65rem] md:text-xs font-black tracking-[0.2em] uppercase group"
          >
            {/* SEÇİLİ OLANIN ARKAPLANI */}
            {viewMode === mode.id && (
              <motion.div
                layoutId="main-active-pill"
                animate={{
                  backgroundColor:
                    viewMode === "zen" ? "rgba(255,255,255,0.1)" : "#f59e0b",
                  borderRadius: viewMode === "bento" ? "16px" : "9999px",
                }}
                className="absolute inset-0 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <span
              className={`relative z-10 flex items-center gap-2.5 transition-colors duration-500 ${viewMode === mode.id ? (viewMode === "zen" ? "text-white" : "text-black") : "text-white/60 group-hover:text-white"}`}
            >
              {/* Emojiler gitti, jilet gibi SVG'ler geldi */}
              <span
                className={`flex items-center justify-center transition-opacity duration-300 ${viewMode === mode.id ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
              >
                {mode.icon}
              </span>
              <span aria-hidden className="hidden md:inline-block mt-[1px]">
                {mode.label}
              </span>
            </span>
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
};
