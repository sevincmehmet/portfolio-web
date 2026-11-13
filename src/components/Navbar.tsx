import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../context/useView";
import { Link, useLocation, useParams } from "react-router-dom";
import { profiles } from "../data/profiles";
import { BentoIcon, VisionIcon, ZenIcon } from "./ModeSwitcher";

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

// Profil ana sayfasında düz hash linki, alt sayfalarda router Link'i
const SectionLink = ({
  hash,
  profileId,
  isProfileHome,
  className,
  onClick,
  children,
}: {
  hash: string;
  profileId: string;
  isProfileHome: boolean;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) =>
  isProfileHome ? (
    <a href={hash} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link to={`/${profileId}${hash}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );

export default function Navbar() {
  const { viewMode, setViewMode } = useView();
  const { pathname } = useLocation();
  const { profileId = "mas" } = useParams();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMas = profileId === "mas";
  const cvUrl = profiles[isMas ? "mas" : "das"].cvUrl;
  // Profil ana sayfasında değilsek (ör. proje detay) bölüm linkleri ana sayfaya gider
  const isProfileHome = pathname === `/${profileId}`;

  const navLinks = isMas
    ? [
        { name: "Projeler", hash: "#projeler" },
        { name: "Canlıdakiler", hash: "#canli" },
        { name: "Kariyer Geçmişi", hash: "#kariyer" },
        { name: "AI", hash: "#ai-projeler" },
        { name: "İletişim", hash: "#iletisim" },
      ]
    : [
        { name: "Projeler", hash: "#projeler" },
        { name: "Hakkımda", hash: "#hakkimda" },
        { name: "İletişim", hash: "#iletisim" },
      ];

  const getNavBg = () => {
    // Zen'de de hafif zemin: kaydırınca metin menünün altından okunur kalsın
    if (viewMode === "zen") return "rgba(10,10,15,0.88)";
    if (viewMode === "bento") return "rgba(17,17,17,0.98)";
    return "rgba(255,255,255,0.03)";
  };

  const getNavBorder = () => {
    if (viewMode === "zen") return "rgba(255,255,255,0.05)";
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
            // Mobilde daha az blur kullanarak performans artışı
            backdropFilter: viewMode === "zen" ? "blur(0px)" : "blur(16px)",
            borderRadius: viewMode === "bento" ? "20px" : "9999px",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center gap-2 md:gap-4 px-4 md:px-8 py-1.5 md:py-3 border shadow-2xl pointer-events-auto transition-colors duration-700 w-full transform-gpu"
        >
          {/* --- LOGO ALANI --- */}
          <Link
            to={`/${profileId}`}
            onClick={() => {
              if (isProfileHome)
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={`${isMas ? "Mehmet Ali Sevinç" : "Dursun Ali Sevinç"} — ana sayfa`}
            className="relative group flex items-center gap-3 px-2 py-2 mr-auto md:mr-6"
          >
            <motion.span
              animate={{
                backgroundColor:
                  viewMode === "zen" ? "rgba(255,255,255,0.1)" : "#f59e0b",
                scale: viewMode === "vizyon" ? [1, 1.2, 1] : 1,
              }}
              // Yalnızca ölçek nabız atsın; renk tekrar eden döngüye girmesin
              initial={false}
              transition={{
                backgroundColor: { duration: 0.6 },
                scale:
                  viewMode === "vizyon"
                    ? { duration: 2, repeat: Infinity }
                    : { duration: 0.6 },
              }}
              className="w-2.5 h-2.5 rounded-full shadow-none md:shadow-[0_0_12px_rgba(245,158,11,0.4)] transform-gpu"
            />
            <span
              className={`font-bold text-sm tracking-tighter transition-colors duration-700 ${viewMode === "zen" ? "text-white/60 tracking-[0.4em]" : "text-white"}`}
            >
              {isMas ? "MAS." : "DAS."}
            </span>
          </Link>

          {/* --- NAV LİNKLERİ --- */}
          <ul className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <SectionLink
                  hash={link.hash}
                  profileId={profileId}
                  isProfileHome={isProfileHome}
                  className={`relative z-10 px-3 xl:px-4 py-2 whitespace-nowrap text-[0.65rem] font-black tracking-[0.2em] uppercase transition-colors duration-500 ${viewMode === "zen" ? "text-white/45 hover:text-white" : "text-[#9CA3AF] hover:text-white"}`}
                >
                  {link.name}
                </SectionLink>
                <AnimatePresence>
                  {hoveredLink === link.name && viewMode !== "zen" && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`absolute inset-0 -z-10 transform-gpu ${viewMode === "bento" ? "rounded-xl bg-white/5" : "rounded-full bg-amber-500/10 border border-amber-500/20"}`}
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* --- CV (her ekranda görünür) --- */}
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CV'yi aç (PDF, yeni sekme)"
              className={`ml-1 md:ml-2 px-3.5 md:px-4 py-2 text-[0.65rem] font-black tracking-[0.2em] uppercase transition-colors duration-500 ${viewMode === "zen" ? "text-white/70 hover:text-white border-b border-white/20 rounded-none" : viewMode === "bento" ? "rounded-xl bg-white/5 border border-white/10 text-white hover:border-amber-500/50" : "rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black"}`}
            >
              CV
            </a>
          )}

          {/* --- MOBİL MOD SEÇİMİ (MAS): bölümler alttaki sekme çubuğunda --- */}
          {isMas && (
            <div
              role="group"
              aria-label="Görünüm modu"
              className="md:hidden flex items-center border-l border-white/10 pl-1 ml-1"
            >
              {(
                [
                  { id: "vizyon", label: "Vizyon", icon: <VisionIcon /> },
                  { id: "bento", label: "Bento", icon: <BentoIcon /> },
                  { id: "zen", label: "Zen", icon: <ZenIcon /> },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setViewMode(m.id)}
                  aria-label={`${m.label} görünümü`}
                  aria-pressed={viewMode === m.id}
                  className={`w-10 h-11 flex items-center justify-center rounded-full transition-colors ${viewMode === m.id ? (viewMode === "zen" ? "text-white" : "text-amber-400") : "text-white/45"}`}
                >
                  {m.icon}
                </button>
              ))}
            </div>
          )}

          {/* --- MOBİL MENÜ BUTONU --- */}
          <div
            className={`${isMas ? "hidden md:flex" : "flex"} lg:hidden items-center gap-1 border-l border-white/10 pl-3 transition-colors duration-700 ml-2`}
          >
            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              animate={{
                borderRadius: viewMode === "bento" ? "8px" : "9999px",
                backgroundColor:
                  viewMode === "zen"
                    ? "rgba(0,0,0,0)"
                    : "rgba(255,255,255,0.05)",
              }}
              className={`relative w-11 h-11 flex items-center justify-center transition-colors duration-500 group transform-gpu ${viewMode === "zen" ? "text-white/60 hover:text-white" : "text-white/70 hover:text-amber-400"}`}
              aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="transform-gpu"
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
              id="mobile-nav"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:hidden absolute top-[calc(100%+16px)] left-0 w-full pointer-events-auto border overflow-hidden backdrop-blur-xl shadow-2xl transition-colors duration-700 bg-[#111111]/95 border-white/10 transform-gpu ${viewMode === "bento" ? "rounded-2xl" : "rounded-3xl"}`}
            >
              <ul className="flex flex-col py-4 px-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="transform-gpu"
                  >
                    <SectionLink
                      hash={link.hash}
                      profileId={profileId}
                      isProfileHome={isProfileHome}
                      onClick={() => setIsMobileOpen(false)}
                      className={`block py-3 text-xs font-black tracking-[0.2em] uppercase border-b border-white/5 text-white/70 hover:text-amber-500 transition-colors duration-300 ${i === navLinks.length - 1 ? "border-transparent" : ""}`}
                    >
                      {link.name}
                    </SectionLink>
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
