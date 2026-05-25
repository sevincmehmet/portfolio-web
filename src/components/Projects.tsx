import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../context/ViewContext";
import { projectsData } from "../data/projectsData";

interface ProjectsProps {
  data?: (typeof projectsData)["mas"];
}

export const Projects = ({ data = projectsData["mas"] }: ProjectsProps) => {
  const { viewMode } = useView();

  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  // Bento tasarımı için 8 projeye uygun asimetrik grid deseni
  const getBentoColSpan = (index: number) => {
    const pattern = [
      "md:col-span-8", // 1. satır sol
      "md:col-span-4", // 1. satır sağ
      "md:col-span-6", // 2. satır sol
      "md:col-span-6", // 2. satır sağ
      "md:col-span-4", // 3. satır sol (ters)
      "md:col-span-8", // 3. satır sağ (ters)
      "md:col-span-6", // 4. satır sol
      "md:col-span-6", // 4. satır sağ
    ];
    return pattern[index % pattern.length];
  };

  return (
    <section
      id="projeler"
      className="relative min-h-screen bg-[#0A0A0F] py-32 px-6 overflow-hidden transform-gpu"
    >
      <div className="max-w-7xl mx-auto">
        {/* BÖLÜM BAŞLIĞI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left transform-gpu"
        >
          <h2
            className={`text-5xl md:text-7xl font-bold tracking-tighter text-white ${
              viewMode === "zen" && "font-thin opacity-30"
            }`}
          >
            Seçili <span className="text-amber-500 italic">İşler.</span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* =========================================
               TASARIM 1: VİZYON (BÜYÜK & DERİNLİKLİ KARTLAR)
               ========================================= */}
          {viewMode === "vizyon" && (
            <motion.div
              key="v-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="space-y-32"
            >
              {data.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  // Kaydırırken takılmamaları için transform-gpu
                  className={`flex flex-col ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-16 group transform-gpu`}
                >
                  {/* Görsel Alanı (Glassmorphism) */}
                  <a
                    href={project.link}
                    target="_blank"
                    // shadow-2xl mobilde çok yorar, md:shadow-2xl yapıldı
                    className="w-full md:w-3/5 aspect-video bg-white/[0.02] border border-white/10 rounded-[3rem] relative overflow-hidden group-hover:border-amber-500/30 transition-all duration-700 shadow-lg md:shadow-2xl cursor-pointer block transform-gpu"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-30 group-hover:opacity-50 transition-opacity`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/5 text-9xl font-black">
                        {project.title.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </a>
                  {/* Detay Alanı */}
                  <div className="w-full md:w-2/5 space-y-6">
                    <h3 className="text-4xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-lg font-light leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[0.6rem] font-bold tracking-[0.2em] text-amber-500 uppercase px-3 py-1 bg-amber-500/5 border border-amber-500/10 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* =========================================
               TASARIM 2: BENTO (KUSURSUZ GRID SİSTEMİ)
               ========================================= */}
          {viewMode === "bento" && (
            <motion.div
              key="b-projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transition}
              className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-6"
            >
              {data.map((project, i) => (
                <motion.a
                  href={project.link}
                  target="_blank"
                  key={project.id}
                  // Grid itemları için donanım hızlandırma
                  className={`${getBentoColSpan(i)} bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group hover:bg-white/[0.04] transition-all relative overflow-hidden cursor-pointer block transform-gpu`}
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light max-w-sm">
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10 mt-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[0.55rem] font-black tracking-widest text-white/20 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Arka plan dekorasyonu */}
                  <div className="absolute -bottom-10 -right-10 text-9xl font-black text-white/[0.01] group-hover:text-amber-500/[0.03] transition-colors select-none">
                    {String(project.id).padStart(2, "0")}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* =========================================
               TASARIM 3: ZEN (SAF ODAK & LİSTE)
               ========================================= */}
          {viewMode === "zen" && (
            <motion.div
              key="z-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="max-w-5xl mx-auto space-y-1"
            >
              {data.map((project) => (
                <a
                  href={project.link}
                  target="_blank"
                  key={project.id}
                  className="group border-b border-white/5 py-12 flex items-center justify-between hover:px-8 transition-all duration-700 cursor-pointer block transform-gpu"
                >
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-5xl font-thin text-white/40 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm uppercase tracking-[0.4em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {project.tech.join(" / ")}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-amber-500 transition-colors shrink-0">
                    <span className="text-amber-500 opacity-0 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
