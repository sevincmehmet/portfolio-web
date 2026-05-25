import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { Projects } from "./components/Projects";
import { SectionDivider } from "./components/SectionDivider";
import { TechMarquee } from "./components/TechMarquee";
import { ModeSwitcher } from "./components/ModeSwitcher";
import { ViewProvider, useView } from "./context/ViewContext";

// İkizlerin oturduğu o efsane fotoğrafın yolunu buraya ekle kralım (Bunu WebP yapmayı unutma!)
import twinPic from "./assets/twins.jpg";
import { heroContent } from "./assets/heroData";
import { projectsData } from "./data/projectsData";
import { aboutData } from "./data/aboutData";

// --- LANDING PAGE ÖZEL NAVBAR ---
const LandingNavbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 flex justify-center pt-8 px-4 pointer-events-none">
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex gap-8 items-center pointer-events-auto shadow-2xl transform-gpu">
        <span className="font-bold text-sm tracking-widest text-amber-500 uppercase">
          Twin_Core
        </span>
        <div className="w-[1px] h-4 bg-white/20"></div>
        <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/60 uppercase">
          Sivas Merkezli Dijital Mimari
        </span>
      </div>
    </nav>
  );
};

// --- EFSANEVİ LANDING PAGE (GİRİŞ KAPISI) ---
const LandingPage = () => {
  const navigation = useNavigate();
  const { viewMode, setViewMode } = useView();

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-white overflow-hidden flex flex-col font-sans selection:bg-amber-500/30">
      {/* --- 1. PERFORMANSLI ARKA PLAN (CSS Filter yerine Overlay tekniği ve GPU) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black">
        <motion.img
          src={twinPic}
          alt="DAS ve MAS"
          // blur, grayscale ve saturate kaldırıldı, opacity ile oynuyoruz. GPU dostu!
          className={`absolute inset-0 w-full h-full object-cover object-[center_bottom] transition-opacity duration-1000 transform-gpu will-change-[opacity]
            ${viewMode === "zen" ? "opacity-20" : "opacity-85"}
          `}
        />
        {/* Zen modunda siyah/gri tonlama efekti vermek için üzerine binen katman */}
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${viewMode === "zen" ? "bg-[#0A0A0F]/60" : "bg-transparent"}`}
        />

        {/* Üst Kısım Gradienti: Yazıların okunabilirliğini artırır */}
        <div className="absolute top-0 inset-x-0 h-[55%] bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent transform-gpu" />

        {/* Alt Kısım Gradienti: Sitenin bitişini yumuşatır */}
        <div className="absolute bottom-0 inset-x-0 h-1/5 bg-gradient-to-t from-[#0A0A0F] to-transparent transform-gpu" />
      </div>

      {/* --- 2. NAVBAR --- */}
      <div className="relative z-50">
        <LandingNavbar />
      </div>

      {/* --- 3. ANA İÇERİK (PERFORMANS ODAKLI) --- */}
      <div className="relative z-30 flex-1 flex flex-col justify-start items-center w-full pt-28 md:pt-32 px-6 text-center">
        <AnimatePresence mode="wait">
          {/* VİZYON MODU YAZISI */}
          {viewMode === "vizyon" && (
            <motion.div
              key="vizyon"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center transform-gpu will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 md:bg-white/5 border border-white/10 w-fit mb-4 md:backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-none md:shadow-[0_0_10px_rgba(245,158,11,0.6)]"></span>
                <span className="text-[0.6rem] font-bold text-amber-500/80 tracking-[0.2em] uppercase">
                  Çift Çekirdek Aktif
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter leading-[1.05] mb-3 text-[#F8F9FA] md:drop-shadow-2xl">
                İki Zihin.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-500">
                  Tek Vizyon.
                </span>
              </h1>
              <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto md:drop-shadow-lg">
                Yazılımın mimarisi ve tasarımın estetiği bu çatıda birleşiyor.
                Beraber kurguluyor, ayrı alanlarda ustalaşıyoruz.
              </p>
            </motion.div>
          )}

          {/* BENTO MODU YAZISI */}
          {viewMode === "bento" && (
            <motion.div
              key="bento"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-black/80 md:bg-black/40 border border-white/10 rounded-[2rem] p-6 md:p-8 md:backdrop-blur-xl shadow-none md:shadow-2xl flex flex-col items-center max-w-2xl mx-auto transform-gpu will-change-transform"
            >
              <p className="text-[0.6rem] font-bold tracking-[0.2em] text-[#9CA3AF] uppercase mb-3">
                Sistem Yapılandırması
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F8F9FA] mb-3 leading-tight">
                Ortak Mimari.
                <br />
                Farklı Disiplinler.
              </h1>
              <p className="text-white/50 font-light text-xs md:text-sm max-w-md">
                DAS Designer ve MAS Developer loglarıyla kodlanmış, uçtan uca
                kusursuz çalışan iki farklı sistem paneli.
              </p>
            </motion.div>
          )}

          {/* ZEN MODU YAZISI */}
          {viewMode === "zen" && (
            <motion.div
              key="zen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center mt-2 md:mt-4 transform-gpu will-change-transform"
            >
              <h1 className="text-[12vw] md:text-[9rem] font-extralight tracking-[-0.05em] text-white/90 leading-none md:drop-shadow-2xl">
                Birlik.
              </h1>
              <div className="w-16 h-[1px] bg-white/20 my-5 md:my-6"></div>
              <p className="text-sm md:text-base font-light tracking-[0.4em] uppercase text-white/50 md:drop-shadow-lg">
                Sessiz Güç
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PORTFOLYO SEÇİM BUTONLARI --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8 z-30 transform-gpu"
        >
          {/* DAS Portfolio (SOLDA) */}
          <button
            onClick={() => {
              setViewMode("vizyon");
              navigation("/das");
            }}
            className={`px-5 py-3 md:px-8 md:py-3.5 transition-all text-xs md:text-sm font-bold tracking-wider flex items-center gap-2.5 group md:backdrop-blur-md
            ${viewMode === "zen" ? "rounded-none border-b border-cyan-500/30 hover:border-cyan-500 text-white/50 hover:text-white bg-transparent" : ""}
            ${viewMode === "bento" ? "rounded-xl bg-black/60 border border-white/10 hover:border-cyan-500/50 md:shadow-2xl" : ""}
            ${viewMode === "vizyon" ? "rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black md:shadow-[0_0_20px_rgba(6,182,212,0.15)]" : ""}
          `}
          >
            {viewMode !== "zen" && (
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${viewMode === "vizyon" ? "bg-cyan-400 group-hover:bg-black" : "bg-cyan-500"}`}
              ></span>
            )}
            DAS Portfolio
          </button>

          {/* MAS Portfolio (SAĞDA) */}
          <button
            onClick={() => {
              setViewMode("bento");
              navigation("/mas");
            }}
            className={`px-5 py-3 md:px-8 md:py-3.5 transition-all text-xs md:text-sm font-bold tracking-wider flex items-center gap-2.5 group md:backdrop-blur-md
            ${viewMode === "zen" ? "rounded-none border-b border-amber-500/30 hover:border-amber-500 text-white/50 hover:text-white bg-transparent" : ""}
            ${viewMode === "bento" ? "rounded-xl bg-black/60 border border-white/10 hover:border-amber-500/50 md:shadow-2xl" : ""}
            ${viewMode === "vizyon" ? "rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500 hover:text-black md:shadow-[0_0_20px_rgba(245,158,11,0.15)]" : ""}
          `}
          >
            {viewMode !== "zen" && (
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${viewMode === "vizyon" ? "bg-amber-400 group-hover:bg-black" : "bg-amber-500"}`}
              ></span>
            )}
            MAS Portfolio
          </button>
        </motion.div>
      </div>

      {/* --- 4. GLOBAL KONTROL MERKEZİ --- */}
      <div className="relative z-50">
        <ModeSwitcher />
      </div>
    </div>
  );
};

const PortfolioLayout = () => {
  const { pathname } = useLocation();
  const isMas = pathname === "/mas";

  return (
    <div className="bg-[#0A0A0F] text-white selection:bg-amber-500/30 pb-32">
      <Navbar />
      <Hero data={isMas ? heroContent["mas"] : heroContent["das"]} />
      <TechMarquee />
      <Projects data={isMas ? projectsData["mas"] : projectsData["das"]} />
      <SectionDivider />
      <About data={isMas ? aboutData["mas"] : aboutData["das"]} />
      <SectionDivider />
      <Contact />
      <SectionDivider />
      <Footer />

      <ModeSwitcher />

      {/* KRİTİK DEĞİŞİKLİK: Bu kocaman blur daireler mobilde cihazı felç eder. hidden md:block ekledik! */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-amber-500/[0.02] blur-[120px] rounded-full transform-gpu" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/[0.02] blur-[120px] rounded-full transform-gpu" />
      </div>
    </div>
  );
};

// --- ANA UYGULAMA ---
function App() {
  return (
    <ViewProvider>
      <Router>
        <Routes>
          {/* Ana Giriş Kapısı */}
          <Route path="/" element={<LandingPage />} />

          {/* Dinamik Profil Rotası */}
          <Route path="/:profileId" element={<PortfolioLayout />} />
        </Routes>
      </Router>
    </ViewProvider>
  );
}

export default App;
