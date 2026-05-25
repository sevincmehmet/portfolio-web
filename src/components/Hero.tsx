import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../context/ViewContext";
import { heroContent } from "../assets/heroData";

interface HeroProps {
  data?: typeof heroContent.mas;
}

export default function Hero({ data = heroContent["mas"] }: HeroProps) {
  const { viewMode } = useView();

  return (
    <section className="relative min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-4 md:px-8 py-24 overflow-hidden selection:bg-amber-500/30 selection:text-white font-sans">
      {/* --- SABİT ARKA PLAN IŞIKLARI (SADECE MASAÜSTÜNDE AKTİF) --- */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none transform-gpu will-change-transform"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none transform-gpu will-change-transform"
      />

      {/* --- TASARIM GEÇİŞ ALANI --- */}
      <AnimatePresence mode="wait">
        {/* =========================================
             TASARIM 1: VİZYON
             ========================================= */}
        {viewMode === "vizyon" && (
          <motion.div
            key="vizyon"
            initial={{ opacity: 0, y: 20 }} // KRİTİK: Blur kaldırıldı
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-[80rem] w-full mx-auto flex flex-col md:flex-row items-center relative z-10 pt-16 transform-gpu"
          >
            {/* SOL BÖLÜM */}
            <div className="w-full md:w-3/5 flex flex-col justify-center relative z-20">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="transform-gpu"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mb-8 md:backdrop-blur-md">
                  <span className="text-[0.65rem] font-bold text-amber-500/80 tracking-[0.2em] uppercase">
                    {data.vizyon.badge}
                  </span>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#F8F9FA] leading-[1.05] mb-6">
                  {data.vizyon.title1}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-cyan-500">
                    {data.vizyon.title2}
                  </span>
                </h1>

                <p className="text-[#9CA3AF] text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10">
                  {data.vizyon.description}
                </p>

                {/* Yetenekler */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {data.vizyon.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[#F8F9FA] text-xs font-medium tracking-wide cursor-default backdrop-blur-none md:backdrop-blur-sm transform-gpu"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>

                {/* Butonlar */}
                <div className="flex items-center gap-6">
                  <a
                    href="#projeler"
                    className="px-8 py-4 rounded-full bg-[#F8F9FA] text-[#0A0A0F] text-sm font-semibold tracking-wide hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-none md:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {data.vizyon.ctaText}
                  </a>
                  <a
                    href="#iletisim"
                    className="group flex items-center gap-2 text-xs font-bold text-white/50 hover:text-amber-500 uppercase tracking-[0.2em] transition-colors"
                  >
                    Kahve Ismarla ☕
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform transform-gpu"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* SAĞ BÖLÜM: Fotoğraf */}
            <div className="w-full md:w-2/5 h-[600px] relative mt-16 md:mt-0 flex justify-center items-center pointer-events-none">
              {/* Animasyonlara donanım ivmesi eklendi */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-gradient-to-tr from-amber-500/10 to-cyan-500/10 rounded-full blur-[80px] z-0 transform-gpu will-change-transform"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-white/[0.03] rounded-full z-0 transform-gpu will-change-transform"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-500/50 rounded-full shadow-none md:shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square border border-white/[0.02] rounded-full z-0 transform-gpu will-change-transform"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500/40 rounded-full shadow-none md:shadow-[0_0_12px_rgba(6,182,212,0.8)]"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: [-5, 5, -5] }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeOut", delay: 0.3 },
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  },
                }}
                className="relative w-[320px] md:w-[450px] aspect-square z-10 flex items-center justify-center transform-gpu will-change-transform"
              >
                <img
                  src={data.vizyon.image}
                  alt="Mehmet Ali Sevinç"
                  // Maskelemeler performansı biraz etkiler, sorun olursa burayı düzeltebiliriz
                  className="w-full h-full rounded-full object-cover object-top filter contrast-[1.1] saturate-[0.9]"
                  style={{
                    maskImage:
                      "radial-gradient(circle at center, black 40%, transparent 70%), linear-gradient(to bottom, black 50%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at center, black 40%, transparent 70%), linear-gradient(to bottom, black 60%, transparent 100%)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 2: BENTO
             ========================================= */}
        {viewMode === "bento" && (
          <motion.div
            key="bento"
            initial={{ opacity: 0, y: 20 }} // Blur silindi
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-[75rem] w-full mx-auto grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(220px,auto)] gap-6 relative z-10 pt-16 transform-gpu"
          >
            {/* SOL BÖLÜM: Ana Mesaj */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="col-span-1 md:col-span-8 bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-all duration-700 shadow-xl md:shadow-2xl transform-gpu"
            >
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none hidden md:block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              ></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mb-8 md:backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-[0.65rem] font-bold text-amber-500/80 tracking-[0.2em] uppercase">
                    {data.bento.badge}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[#F8F9FA] leading-[1.1] mb-6">
                  {data.bento.title1}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9CA3AF] to-[#6B7280]">
                    {data.bento.title2}
                  </span>
                </h1>
                <p className="text-[#9CA3AF] text-lg font-light leading-relaxed max-w-xl mb-10">
                  {data.bento.description}
                </p>
                <div className="flex gap-4">
                  <a
                    href="#projeler"
                    className="px-8 py-4 rounded-full bg-[#F8F9FA] text-[#0A0A0F] text-sm font-semibold tracking-wide hover:scale-105 transition-transform duration-300"
                  >
                    {data.bento.ctaText}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* SAĞ ÜST: Fotoğraf */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="col-span-1 md:col-span-4 row-span-2 relative flex items-center justify-center rounded-[2.5rem] overflow-hidden group transform-gpu"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[2px] border-dashed border-white/10 rounded-full scale-[1.35] opacity-50 group-hover:border-amber-500/30 transition-colors duration-700 transform-gpu will-change-transform"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-solid border-cyan-500/20 rounded-full scale-[1.5] opacity-30 transform-gpu will-change-transform"
              />
              <div className="relative w-full h-full bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] overflow-hidden shadow-none md:shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10">
                <img
                  src={data.bento.image}
                  alt="Mehmet Ali"
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 ease-out will-change-transform"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-[#F8F9FA] font-medium text-xl tracking-tight">
                    {data.bento.avatarInitials}
                  </p>
                  <p className="text-amber-500/80 text-xs font-bold tracking-[0.2em] uppercase mt-1">
                    {data.bento.avatarRole}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ALT SOL: Yetenekler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="col-span-1 md:col-span-4 bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden group hover:bg-white/[0.04] transition-colors transform-gpu"
            >
              <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none hidden md:block"></div>
              <p className="text-[0.65rem] font-bold text-[#9CA3AF] tracking-[0.2em] uppercase mb-6">
                Uzmanlık Alanları
              </p>
              <div className="flex flex-wrap gap-3">
                {data.bento.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[#F8F9FA] text-xs font-medium tracking-wide hover:border-amber-500/50 hover:text-amber-500 transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ALT ORTA: Kahve */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="col-span-1 md:col-span-4 bg-gradient-to-br from-[#111] md:from-white/[0.03] to-transparent backdrop-blur-xl md:backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors transform-gpu"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl shadow-none md:shadow-inner mb-6 relative z-10 transform-gpu will-change-transform"
              >
                ☕
              </motion.div>
              <div className="relative z-10">
                <p className="text-[0.65rem] font-bold tracking-[0.2em] text-[#9CA3AF] mb-1 uppercase">
                  Sıvı Yakıt
                </p>
                <p className="text-lg font-medium text-[#F8F9FA]">
                  Kritik Seviyede
                </p>
                <a
                  href="#iletisim"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-500/70 hover:text-amber-500 uppercase tracking-[0.1em] transition-colors"
                >
                  Kahve Ismarla
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =========================================
            TASARIM 3: ZEN 
            ========================================= */}
        {viewMode === "zen" && (
          <motion.div
            key="zen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center relative z-10 py-10 transform-gpu"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden md:flex">
              <div className="w-[700px] h-[700px] bg-amber-500/10 blur-[160px] rounded-full opacity-40"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
              {/* SOL */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="transform-gpu"
                >
                  <h1 className="text-[14vw] lg:text-[11rem] font-extralight tracking-[-0.08em] text-white leading-none mb-2">
                    {data.zen.titleMain}
                  </h1>
                  <h2 className="text-3xl lg:text-5xl font-thin tracking-[0.4em] text-amber-400 uppercase mb-10">
                    {data.zen.titleSub}
                  </h2>
                  <div className="h-[1px] w-32 bg-gradient-to-r from-amber-400 via-white/20 to-transparent mb-10 mx-auto lg:mx-0"></div>
                  <p className="text-lg lg:text-xl text-white/50 font-light leading-relaxed max-w-md tracking-wide">
                    {data.zen.descRegular}
                    <span className="text-white">{data.zen.descHighlight}</span>
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-14 transform-gpu"
                  >
                    <a
                      href="#projeler"
                      className="text-xs tracking-[0.6em] text-white/30 hover:text-amber-400 transition-all duration-500 uppercase relative group"
                    >
                      {data.zen.ctaText}
                      <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-amber-400 transition-all duration-500 group-hover:w-full"></span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>

              {/* SAĞ */}
              <div className="relative flex justify-center items-center perspective-[2000px]">
                <div className="absolute w-[130%] aspect-square border border-white/[0.03] rounded-full animate-[spin_40s_linear_infinite] transform-gpu"></div>
                <motion.div
                  animate={{ y: [-15, 15, -15], rotateY: [-8, 8, -8] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-72 md:w-[26rem] aspect-[3/4] z-10 group transform-gpu will-change-transform"
                >
                  <div className="absolute inset-0 bg-white/[0.02] md:backdrop-blur-[4px] border border-white/10 rounded-[2.5rem] shadow-xl md:shadow-[0_0_60px_rgba(0,0,0,0.6)] z-20"></div>
                  <img
                    src={data.zen.image}
                    alt="Mehmet Ali"
                    className="w-full h-full object-cover rounded-[2.5rem] grayscale contrast-125 brightness-75 opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-transparent to-transparent rounded-[2.5rem] z-30 opacity-60 group-hover:opacity-100 transition"></div>
                  <div className="absolute -inset-[1px] rounded-[2.5rem] border border-amber-400/20 opacity-30"></div>
                </motion.div>
              </div>
            </div>

            {/* arka yazı */}
            <div className="absolute bottom-[-5%] text-[14vw] font-black text-white/5 tracking-tighter select-none pointer-events-none uppercase hidden md:block">
              {data.zen.bgText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
