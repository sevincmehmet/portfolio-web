import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import {
  projectsData,
  type Project,
  type ProfileId,
} from "../data/projectsData";
import { projectImages } from "../data/projectImages";

interface ProjectsProps {
  data?: Project[];
  profileId?: ProfileId;
}

// Küçük "AI" rozeti — yapay zeka ile geliştirilen projelerde görünür
export const AiBadge = ({ className = "" }: { className?: string }) => (
  <span
    title="Yapay Zeka ile Geliştirildi"
    className={`inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 text-[0.6rem] font-black tracking-[0.2em] uppercase text-amber-400 ${className}`}
  >
    <span className="w-1 h-1 rounded-full bg-cyan-400" />
    AI
  </span>
);

export const Projects = ({
  data = projectsData["mas"],
  profileId = "mas",
}: ProjectsProps) => {
  const { viewMode } = useView();

  const projectHref = (slug: string) => `/${profileId}/proje/${slug}`;
  const coverOf = (slug: string) => projectImages[slug]?.[0];

  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  // Bento tasarımı için asimetrik satır desenleri (12 kolon). Desen satır satır
  // tekrarlanır; son satır eksik kalırsa kartlar o satırı eşit paylaşır,
  // böylece proje sayısı değişse de gridde boşluk kalmaz.
  const bentoRows = [
    [8, 4],
    [4, 8],
    [6, 6],
    [4, 4, 4],
    [7, 5],
  ];
  const spanClass: Record<number, string> = {
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    12: "md:col-span-12",
  };
  const bentoSpans = (() => {
    const spans: string[] = [];
    let row = 0;
    while (spans.length < data.length) {
      const pattern = bentoRows[row % bentoRows.length];
      const remaining = data.length - spans.length;
      if (remaining >= pattern.length) {
        pattern.forEach((n) => spans.push(spanClass[n]));
      } else {
        // Eksik son satır: 1 kart → tam genişlik, 2 kart → 6 + 6
        const even = remaining === 1 ? 12 : 6;
        for (let k = 0; k < remaining; k++) spans.push(spanClass[even]);
      }
      row++;
    }
    return spans;
  })();

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
          className="mb-14 md:mb-20 text-center md:text-left transform-gpu"
        >
          <h2
            className={`text-5xl md:text-7xl font-bold tracking-tighter text-white ${
              viewMode === "zen" ? "font-thin opacity-60" : ""
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
              className="space-y-20 md:space-y-32"
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
                  } items-center gap-8 md:gap-16 group transform-gpu`}
                >
                  {/* Görsel Alanı (Glassmorphism) */}
                  <Link
                    to={projectHref(project.slug)}
                    aria-label={`${project.title} detayları`}
                    // shadow-2xl mobilde çok yorar, md:shadow-2xl yapıldı
                    className="w-full md:w-3/5 aspect-video bg-white/[0.02] border border-white/10 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group-hover:border-amber-500/30 transition-all duration-700 shadow-lg md:shadow-2xl cursor-pointer block transform-gpu"
                  >
                    {coverOf(project.slug) ? (
                      <>
                        <img
                          src={coverOf(project.slug)!.src}
                          alt={coverOf(project.slug)!.caption || project.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 transform-gpu"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/70 via-[#0A0A0F]/10 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-30 group-hover:opacity-50 transition-opacity`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/5 text-8xl md:text-9xl font-black">
                            {project.title.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </>
                    )}
                    {project.aiBuilt && (
                      <AiBadge className="absolute top-5 left-5 md:top-8 md:left-8 bg-black/40" />
                    )}
                  </Link>
                  {/* Detay Alanı */}
                  <div className="w-full md:w-2/5 space-y-6">
                    <Link to={projectHref(project.slug)} className="block">
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-amber-50 transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="mt-2 text-amber-500/80 text-sm font-medium">
                          {project.subtitle}
                        </p>
                      )}
                    </Link>
                    <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                      {project.desc}
                    </p>
                    <div lang="en" className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[0.65rem] font-bold tracking-[0.2em] text-amber-400 uppercase px-3 py-1 bg-amber-500/5 border border-amber-500/20 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={projectHref(project.slug)}
                      className="inline-flex items-center gap-2 py-2 text-[0.7rem] font-black tracking-[0.25em] uppercase text-white/70 hover:text-amber-500 transition-colors"
                    >
                      Detayları İncele <span aria-hidden>→</span>
                    </Link>
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
              className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(260px,auto)] md:auto-rows-[300px] gap-4 md:gap-6"
            >
              {data.map((project, i) => {
                const cover = coverOf(project.slug);
                return (
                  <Link
                    to={projectHref(project.slug)}
                    key={project.id}
                    // Grid itemları için donanım hızlandırma
                    className={`${bentoSpans[i]} bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col justify-between group hover:bg-white/[0.04] hover:border-white/10 transition-all relative overflow-hidden cursor-pointer transform-gpu`}
                  >
                    {cover && (
                      <>
                        <img
                          src={cover.src}
                          alt={cover.caption || project.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-75 group-hover:scale-[1.03] transition-all duration-700 transform-gpu"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/85 to-[#0A0A0F]/40" />
                      </>
                    )}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        {project.aiBuilt && <AiBadge className="mt-1.5" />}
                      </div>
                      <p
                        className={`text-sm font-light max-w-sm line-clamp-4 ${cover ? "text-gray-300" : "text-gray-400"}`}
                      >
                        {project.desc}
                      </p>
                    </div>
                    <div
                      lang="en"
                      className="flex flex-wrap gap-2 relative z-10 mt-4"
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-[0.65rem] font-black tracking-widest uppercase ${cover ? "text-white/65" : "text-white/55"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* Arka plan dekorasyonu */}
                    <div className="absolute -bottom-10 -right-10 text-9xl font-black text-white/[0.01] group-hover:text-amber-500/[0.03] transition-colors select-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </Link>
                );
              })}
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
                <Link
                  to={projectHref(project.slug)}
                  key={project.id}
                  className="group border-b border-white/5 py-8 md:py-12 flex items-center justify-between gap-6 md:hover:px-8 transition-all duration-700 cursor-pointer transform-gpu"
                >
                  <div className="space-y-2 min-w-0">
                    <h3 className="text-3xl md:text-5xl font-thin text-white/70 group-hover:text-white transition-colors break-words">
                      {project.title}
                      {project.aiBuilt && (
                        <sup className="ml-2 text-[0.65rem] md:text-xs font-medium tracking-[0.3em] text-amber-500/80 align-super">
                          AI
                        </sup>
                      )}
                    </h3>
                    <p
                      lang="en"
                      className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] font-medium md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-700"
                    >
                      {project.tech.join(" / ")}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-amber-500 transition-colors shrink-0">
                    <span className="text-amber-500 opacity-0 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
