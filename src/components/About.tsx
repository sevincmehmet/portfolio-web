import { motion, AnimatePresence } from "framer-motion";

import { aboutData } from "../data/aboutData";
import { useView } from "../context/ViewContext";

interface AboutProps {
  data?: typeof aboutData.mas;
}

export const About = ({ data = aboutData["mas"] }: AboutProps) => {
  const { viewMode } = useView();

  return (
    <section
      id="hakkimda"
      className="relative min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6 py-32 overflow-hidden transform-gpu"
    >
      <AnimatePresence mode="wait">
        {/* =========================================
             TASARIM 1: VİZYON
             ========================================= */}
        {viewMode === "vizyon" && (
          <motion.div
            key="v-about"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-7xl w-full mx-auto flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24 relative z-10 transform-gpu"
          >
            {/* SOL TARAF (METİN) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-[10rem] font-black text-white/[0.02] absolute -top-10 right-0 pointer-events-none select-none">
                01
              </div>
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-none mb-8">
                {data.vizyon.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300 italic font-light">
                  {data.vizyon.title2}
                </span>
              </h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed border-l-2 border-amber-500/50 pl-8 max-w-xl">
                {data.vizyon.description}
              </p>

              <div className="mt-12 flex gap-12">
                {data.vizyon.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-white font-bold text-2xl">
                      {stat.value}
                    </span>
                    <span className="text-gray-600 text-[0.65rem] uppercase tracking-widest mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ TARAF (GÖRSEL) */}
            <div className="w-full md:w-1/2 relative flex justify-center transform-gpu">
              <div className="relative w-full aspect-square max-w-md">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  // Sürekli dönen animasyon GPU'ya atandı
                  className="absolute inset-0 border border-white/[0.05] rounded-full transform-gpu will-change-transform"
                />
                <div className="absolute inset-8 bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center overflow-hidden group transform-gpu">
                  <div className="text-center p-12">
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-6xl mb-6 transform-gpu will-change-transform"
                    >
                      🌱
                    </motion.div>
                    <h3 className="text-white font-bold tracking-[0.3em] uppercase text-xs mb-4">
                      Kod • Sanat • Toplum
                    </h3>
                    <div className="h-[1px] w-12 bg-amber-500 mx-auto group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 2: BENTO 
             ========================================= */}
        {viewMode === "bento" && (
          <motion.div
            key="b-about"
            // KRİTİK: filter: blur silindi
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-[75rem] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 transform-gpu"
          >
            {/* İŞ DENEYİMİ */}
            <div className="col-span-1 md:col-span-8 bg-[#111] md:bg-white/[0.02] backdrop-blur-xl md:backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col group hover:border-white/10 transition-all duration-700 transform-gpu">
              <h3 className="text-amber-500 font-bold tracking-[0.2em] text-[0.65rem] uppercase mb-8">
                {data.bento.experience.title}
              </h3>
              <div className="space-y-8">
                {data.bento.experience.companies.map((company, i) => (
                  <div
                    key={i}
                    className="relative pl-6 border-l border-white/10"
                  >
                    <div
                      className={`absolute left-[-5px] top-1.5 w-2 h-2 rounded-full ${company.current ? "bg-amber-500 shadow-none md:shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" : "bg-white/20"}`}
                    ></div>
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <h4 className="text-white text-xl font-bold">
                        {company.name}
                      </h4>
                      <a
                        href={company.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-cyan-400 transition-colors"
                      >
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
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <span className="text-gray-500 text-xs tracking-wider border border-white/10 px-2 py-1 rounded-md">
                        {company.date}
                      </span>
                    </div>
                    <p className="text-amber-500/80 text-sm font-semibold mb-3">
                      {company.role}
                    </p>
                    <p className="text-gray-400 text-sm font-light leading-relaxed max-w-2xl">
                      {company.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* KARAKALEM */}
            <div className="col-span-1 md:col-span-4 bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center gap-4 hover:bg-white/[0.04] transition-all transform-gpu">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                {data.bento.uiux.icon}
              </div>
              <h3 className="text-white font-bold tracking-tight">
                {data.bento.uiux.title}
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {data.bento.uiux.desc}
              </p>
            </div>

            {/* GÖNÜLLÜLÜK */}
            <div className="col-span-1 md:col-span-8 bg-gradient-to-br from-[#111] md:from-white/[0.03] to-transparent border border-white/5 rounded-[2.5rem] p-10 group relative overflow-hidden transform-gpu">
              {/* Ağır bulanık div mobilde gizlendi */}
              <div className="absolute right-[-5%] top-[-10%] w-64 h-64 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none hidden md:block"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-white text-2xl font-bold tracking-tight">
                    {data.bento.volunteering.title}
                  </h3>
                  <p className="text-amber-500 text-xs tracking-[0.2em] uppercase mt-2">
                    {data.bento.volunteering.role}
                  </p>
                </div>
                <p className="text-gray-400 text-sm font-light max-w-sm md:text-right border-l md:border-l-0 md:border-r border-amber-500/30 pl-4 md:pl-0 md:pr-4">
                  {data.bento.volunteering.desc}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.bento.volunteering.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
                    <span className="text-gray-300 text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOKASYON KART */}
            <div className="col-span-1 md:col-span-4 bg-[#111111]/40 border border-white/5 rounded-[2.5rem] p-10 flex items-center justify-between transform-gpu">
              <div>
                <h3 className="text-white font-bold text-xl tracking-tighter">
                  {data.bento.location.city}
                </h3>
                <p className="text-gray-600 text-[0.6rem] uppercase tracking-widest mt-1">
                  {data.bento.location.label}
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-none md:shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-pulse"></div>
            </div>
          </motion.div>
        )}

        {/* =========================================
             TASARIM 3: ZEN
             ========================================= */}
        {viewMode === "zen" && (
          <motion.div
            key="z-about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl w-full mx-auto text-center z-10 transform-gpu"
          >
            <h2 className="text-[12vw] font-extralight tracking-[-0.05em] text-white/5 mb-16 select-none uppercase">
              {data.zen.bgText}
            </h2>
            <div className="space-y-12">
              <p className="text-2xl md:text-4xl text-gray-400 font-thin leading-relaxed tracking-wide italic px-4">
                "{data.zen.quote.split("Gürültüyü kapat")[0]}
                <span className="text-amber-500 not-italic">
                  Gürültüyü kapat
                </span>
                , geriye sadece bıraktığın fayda kalsın."
              </p>
              <div className="flex justify-center">
                <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30"></div>
              </div>
              <div className="flex justify-center gap-8 text-[0.6rem] font-black tracking-[0.5em] text-white/20 uppercase">
                {data.zen.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
