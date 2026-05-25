import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../context/ViewContext";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { viewMode } = useView();
  const { pathname } = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMas = pathname === "/mas";
  const navLinks = [
    { name: "Projeler", href: "#projeler" },
    { name: "Hakkımda", href: "#hakkimda" },
    { name: "İletişim", href: "#iletisim" },
  ];

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );

  const getNavBg = () => {
    if (viewMode === "zen") return "rgba(0,0,0,0)";
    if (viewMode === "bento") return "rgba(17,17,17,0.98)";
    return "rgba(255,255,255,0.03)";
  };

  const getNavBorder = () => {
    if (viewMode === "zen") return "rgba(255,255,255,0)";
    if (viewMode === "bento") return "rgba(255,255,255,0.08)";
    return "rgba(255,255,255,0.15)";
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] flex justify-center pt-8 px-4 pointer-events-none">
      <div className="relative w-full max-w-fit flex flex-col items-center">
        <motion.div
          animate={{
            backgroundColor: getNavBg(),
            borderColor: getNavBorder(),
            backdropFilter: viewMode === "zen" ? "blur(0px)" : "blur(32px)",
            borderRadius: viewMode === "bento" ? "20px" : "9999px",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center gap-2 md:gap-4 px-5 md:px-8 py-3 border shadow-2xl pointer-events-auto transition-colors duration-700 w-full"
        >
          {/* --- LOGO ALANI --- */}
          <a
            href="#"
            className="relative group flex items-center gap-3 px-2 mr-auto md:mr-6"
          >
            <motion.span
              animate={{
                backgroundColor:
                  viewMode === "zen" ? "rgba(255,255,255,0.1)" : "#f59e0b",
                scale: viewMode === "vizyon" ? [1, 1.2, 1] : 1,
              }}
              transition={
                viewMode === "vizyon" ? { duration: 2, repeat: Infinity } : {}
              }
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]"
            />
            <span
              className={`font-bold text-sm tracking-tighter transition-colors duration-700 ${viewMode === "zen" ? "text-white/20 tracking-[0.4em]" : "text-white"}`}
            >
              {isMas ? "MAS." : "DAS."}
            </span>
          </a>

          {/* --- NAV LİNKLERİ --- */}
          <ul className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <a
                  href={link.href}
                  className={`relative z-10 px-4 py-2 text-[0.65rem] font-black tracking-[0.2em] uppercase transition-colors duration-500 ${viewMode === "zen" ? "text-white/10 hover:text-white" : "text-[#9CA3AF] hover:text-white"}`}
                >
                  {link.name}
                </a>
                <AnimatePresence>
                  {hoveredLink === link.name && viewMode !== "zen" && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`absolute inset-0 -z-10 ${viewMode === "bento" ? "rounded-xl bg-white/5" : "rounded-full bg-amber-500/10 border border-amber-500/20"}`}
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* --- TEKNİK BİLGİ --- */}
          <div className="hidden lg:flex items-center gap-6 ml-6">
            <motion.div
              animate={{ opacity: viewMode === "zen" ? 0 : 0.15 }}
              className="w-[1px] h-4 bg-white transition-colors duration-700"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="flex flex-col items-end"
              >
                {viewMode === "vizyon" && (
                  <>
                    <span className="text-[0.45rem] font-black tracking-[0.2em] text-white uppercase leading-none">
                      Vision_2026
                    </span>
                    <span className="text-[0.4rem] font-bold text-amber-500 mt-1 uppercase">
                      Fluid_UI
                    </span>
                  </>
                )}
                {viewMode === "bento" && (
                  <>
                    <span className="text-[0.45rem] font-black tracking-[0.2em] text-white uppercase leading-none">
                      39.9° N, 37.0° E
                    </span>
                    <span className="text-[0.4rem] font-bold text-amber-500 mt-1 uppercase">
                      Sivas_Core
                    </span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- MOBİL MENÜ BUTONU --- */}
          <div className="md:hidden flex items-center gap-1 border-l border-white/10 pl-4 transition-colors duration-700 ml-4">
            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              animate={{
                borderRadius: viewMode === "bento" ? "8px" : "9999px",
                backgroundColor:
                  viewMode === "zen"
                    ? "rgba(0,0,0,0)"
                    : "rgba(255,255,255,0.05)",
              }}
              className={`relative p-2 flex items-center justify-center transition-colors duration-500 outline-none group ${viewMode === "zen" ? "text-white/20 hover:text-white" : "text-white/40 hover:text-amber-400"}`}
              aria-label="Toggle Menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* --- AÇILIR MOBİL MENÜ --- */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`md:hidden absolute top-[calc(100%+16px)] left-0 w-full pointer-events-auto border overflow-hidden backdrop-blur-3xl shadow-2xl transition-colors duration-700 bg-[#111111]/95 border-white/10 ${viewMode === "bento" ? "rounded-2xl" : "rounded-3xl"}`}
            >
              <ul className="flex flex-col py-4 px-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`block py-3 text-xs font-black tracking-[0.2em] uppercase border-b border-white/5 text-white/70 hover:text-amber-500 transition-colors duration-300 ${i === navLinks.length - 1 ? "border-transparent" : ""}`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
