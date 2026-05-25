import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../context/ViewContext";

export const Footer = () => {
  const { viewMode } = useView();
  const currentYear = 2026;

  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  const GithubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  return (
    <footer className="relative bg-[#0A0A0F] border-t border-white/5 overflow-hidden selection:bg-amber-500/30 transform-gpu">
      <AnimatePresence mode="wait">
        {/* =========================================
             TASARIM 1: VİZYON 
             ========================================= */}
        {viewMode === "vizyon" && (
          <motion.div
            key="v-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="max-w-7xl mx-auto px-6 py-20 relative z-10 transform-gpu"
          >
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-6">
                <h3 className="text-6xl md:text-8xl font-black text-white/5 select-none tracking-tighter">
                  MAS.
                </h3>
                <div className="space-y-2">
                  <p className="text-white font-medium tracking-tight">
                    Mehmet Ali Sevinç
                  </p>
                  <p className="text-gray-500 text-sm font-light">
                    Dijital Mimar & Frontend Geliştirici
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-6">
                <div className="flex gap-8 text-xs font-bold tracking-[0.3em] uppercase text-white/40">
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    X
                  </a>
                </div>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                <p className="text-[0.6rem] font-black tracking-[0.4em] text-gray-600 uppercase">
                  Sivas, TR — {currentYear}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 2: BENTO
             ========================================= */}
        {viewMode === "bento" && (
          <motion.div
            key="b-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transition}
            className="max-w-[75rem] mx-auto px-6 py-12 relative z-10 transform-gpu"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Marka Kutusu */}
              <div className="p-8 bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-[2rem] md:backdrop-blur-xl flex flex-col justify-between transform-gpu">
                <span className="text-amber-500 font-black tracking-widest text-xs uppercase">
                  Marka
                </span>
                <h4 className="text-white font-bold text-xl tracking-tighter">
                  MAS. 2026
                </h4>
              </div>

              {/* Lokasyon Kutusu */}
              <div className="p-8 bg-[#111111]/40 border border-white/5 rounded-[2rem] flex flex-col justify-between group hover:border-amber-500/20 transition-colors transform-gpu">
                <span className="text-gray-500 font-bold tracking-widest text-[0.6rem] uppercase">
                  Lokasyon
                </span>
                <p className="text-white text-sm font-medium">Sivas, Türkiye</p>
              </div>

              {/* Linkler Kutusu */}
              <div className="p-8 bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col justify-between transform-gpu">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-amber-500 transition-colors cursor-pointer">
                    <GithubIcon />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-amber-500 transition-colors cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </div>
                <p className="text-[0.6rem] font-bold text-gray-600 uppercase tracking-[0.2em]">
                  Tüm Hakları Saklıdır
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 3: ZEN 
             ========================================= */}
        {viewMode === "zen" && (
          <motion.div
            key="z-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="max-w-4xl mx-auto px-6 py-16 text-center relative z-10 transform-gpu"
          >
            <div className="space-y-10">
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  // Dönen yuvarlak için donanım ivmesi
                  className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center transform-gpu will-change-transform"
                >
                  <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                <p className="text-[0.65rem] font-medium tracking-[0.6em] text-white/20 uppercase">
                  Mehmet Ali Sevinç
                </p>
                <p className="text-[0.65rem] font-medium tracking-[0.6em] text-white/20 uppercase">
                  {currentYear}
                </p>
                <p className="text-[0.65rem] font-medium tracking-[0.6em] text-white/20 uppercase">
                  Sivas
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <div className="h-[0.5px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KRİTİK: Arka plandaki dev blur efekti mobilde gizlendi, masaüstünde aktif */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-500/[0.02] blur-[100px] rounded-full pointer-events-none hidden md:block transform-gpu"></div>
    </footer>
  );
};
