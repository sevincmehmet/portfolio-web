import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import {
  projectsData,
  tierOf,
  type Project,
  type ProfileId,
} from "../data/projectsData";
import { coverOf } from "../data/projectMeta";
import { AiBadge, EvidenceRow, MetaTags } from "./ProjectBits";
import { SectionHeader } from "./SectionHeader";

interface ProjectsProps {
  data?: Project[];
  profileId?: ProfileId;
}

export const Projects = ({
  data = projectsData["mas"],
  profileId = "mas",
}: ProjectsProps) => {
  const { viewMode } = useView();

  const projectHref = (slug: string) => `/${profileId}/proje/${slug}`;

  // Hangi projelerin geleceğine App karar verir (MAS: yalnızca öne çıkanlar)
  const main = data;
  const structured = main.some((p) => p.problem);

  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  // Bento tasarımı için asimetrik satır desenleri (12 kolon). Desen satır satır
  // tekrarlanır; son satır eksik kalırsa kartlar o satırı eşit paylaşır,
  // böylece proje sayısı değişse de gridde boşluk kalmaz.
  const bentoRows = [
    [7, 5],
    [5, 7],
    [6, 6],
    [4, 4, 4],
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
    while (spans.length < main.length) {
      const pattern = bentoRows[row % bentoRows.length];
      const remaining = main.length - spans.length;
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

  const labelCls =
    "text-[0.6rem] font-black tracking-[0.2em] uppercase text-amber-500/90";

  return (
    <section
      id="projeler"
      className="relative min-h-screen bg-[#0A0A0F] py-16 md:py-24 px-4 sm:px-6 overflow-hidden transform-gpu"
    >
      <div className="max-w-6xl mx-auto">
        {/* BÖLÜM BAŞLIĞI */}
        {structured ? (
          <SectionHeader
            index="01"
            eyebrow="Projeler"
            title="Öne Çıkan"
            accent="İşler."
            intro="Bir ürün, bir kurumsal araç, bir AI ajanı. Her birinde çözülen problem, benim yaptığım kısım, teknolojiler ve kanıt (kod, canlı site, ekran görüntüsü)."
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20 text-center md:text-left transform-gpu"
          >
            <h2
              className={`text-5xl md:text-7xl font-bold tracking-tighter text-white ${
                viewMode === "zen" ? "font-thin opacity-60" : ""
              }`}
            >
              Seçili <span className="text-amber-500 italic">İşler.</span>
            </h2>
            {structured && (
              <p className="mt-5 max-w-2xl mx-auto md:mx-0 text-base md:text-lg font-light leading-relaxed text-gray-400">
                Önce kurumsal paneller ve AI ajanları. Her projede çözülen
                problem, benim yaptığım kısım, kullanılan teknolojiler ve kanıtı
                (kod, canlı site, ekran görüntüsü) var.
              </p>
            )}
          </motion.div>
        )}

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
              className="space-y-20 md:space-y-28"
            >
              {main.map((project, i) => {
                const cover = coverOf(project.slug);
                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    // Kaydırırken takılmamaları için transform-gpu
                    className={`flex flex-col ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8 md:gap-14 group transform-gpu`}
                  >
                    {/* Görsel Alanı (Glassmorphism) */}
                    <Link
                      to={projectHref(project.slug)}
                      aria-label={`${project.title} detayları`}
                      // shadow-2xl mobilde çok yorar, md:shadow-2xl yapıldı
                      className="w-full md:w-1/2 aspect-video bg-white/[0.02] border border-white/10 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group-hover:border-amber-500/30 transition-all duration-700 shadow-lg md:shadow-2xl cursor-pointer block transform-gpu"
                    >
                      {cover ? (
                        <>
                          <img
                            src={cover.src}
                            alt={cover.caption || project.title}
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
                          {project.internal && (
                            <span className="absolute inset-x-0 bottom-5 md:bottom-8 text-center text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/55">
                              Şirket içi proje · görsel paylaşılamıyor
                            </span>
                          )}
                        </>
                      )}
                      {project.aiBuilt && (
                        <AiBadge className="absolute top-5 left-5 md:top-8 md:left-8 bg-black/40" />
                      )}
                    </Link>

                    {/* Detay Alanı: problem → ne yaptım → teknoloji → kanıt */}
                    <div className="w-full md:w-1/2 space-y-5">
                      <MetaTags project={project} />
                      <Link to={projectHref(project.slug)} className="block">
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-amber-50 transition-colors">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <p className="mt-2 text-amber-400/90 text-sm font-medium">
                            {project.subtitle}
                          </p>
                        )}
                      </Link>
                      {project.problem ? (
                        <dl className="space-y-4">
                          <div>
                            <dt className={labelCls}>Problem</dt>
                            <dd className="mt-1 text-gray-400 text-base font-light leading-relaxed">
                              {project.problem}
                            </dd>
                          </div>
                          <div>
                            <dt className={labelCls}>Ne yaptım</dt>
                            <dd className="mt-1 text-gray-300 text-base font-light leading-relaxed">
                              {project.desc}
                            </dd>
                          </div>
                        </dl>
                      ) : (
                        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                          {project.desc}
                        </p>
                      )}
                      <div lang="en" className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[0.65rem] font-bold tracking-[0.15em] text-amber-400 uppercase px-3 py-1 bg-amber-500/5 border border-amber-500/20 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-1">
                        <EvidenceRow project={project} linked />
                        <Link
                          to={projectHref(project.slug)}
                          className="inline-flex items-center gap-2 py-2 text-[0.7rem] font-black tracking-[0.25em] uppercase text-white/70 hover:text-amber-500 transition-colors"
                        >
                          Detaylar <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
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
              className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(260px,auto)] md:auto-rows-[minmax(320px,auto)] gap-4 md:gap-6"
            >
              {main.map((project, i) => {
                const cover = coverOf(project.slug);
                return (
                  <Link
                    to={projectHref(project.slug)}
                    key={project.id}
                    // Grid itemları için donanım hızlandırma
                    className={`${bentoSpans[i]} bg-white/[0.02] border ${tierOf(project) === "featured" ? "border-amber-500/20" : "border-white/5"} rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col justify-between group hover:bg-white/[0.04] hover:border-white/15 transition-all relative overflow-hidden cursor-pointer transform-gpu`}
                  >
                    {cover && (
                      <>
                        <img
                          src={cover.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 group-hover:opacity-65 group-hover:scale-[1.03] transition-all duration-700 transform-gpu"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/90 to-[#0A0A0F]/50" />
                      </>
                    )}
                    <div className="relative z-10 space-y-3">
                      <MetaTags project={project} />
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        {project.aiBuilt && <AiBadge className="mt-1.5" />}
                      </div>
                      {project.problem && (
                        <p className="text-sm font-light text-gray-400 max-w-xl line-clamp-2">
                          <span className="font-semibold text-white/75">
                            Problem:{" "}
                          </span>
                          {project.problem}
                        </p>
                      )}
                      <p className="text-base md:text-sm font-light max-w-xl line-clamp-4 md:line-clamp-3 text-gray-300">
                        {project.desc}
                      </p>
                    </div>
                    <div className="relative z-10 mt-5 space-y-3">
                      <div lang="en" className="flex flex-wrap gap-x-3 gap-y-1">
                        {project.tech.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className="text-[0.65rem] font-black tracking-widest uppercase text-white/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <EvidenceRow project={project} linked={false} />
                    </div>
                    {/* Arka plan dekorasyonu */}
                    <div
                      aria-hidden
                      className="absolute -bottom-10 -right-10 text-9xl font-black text-white/[0.01] group-hover:text-amber-500/[0.03] transition-colors select-none"
                    >
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
              {main.map((project) => (
                <Link
                  to={projectHref(project.slug)}
                  key={project.id}
                  className="group border-b border-white/5 py-8 md:py-12 flex items-center justify-between gap-6 md:hover:px-8 transition-all duration-700 cursor-pointer transform-gpu"
                >
                  <div className="space-y-3 min-w-0">
                    <h3 className="text-3xl md:text-5xl font-thin text-white/75 group-hover:text-white transition-colors break-words">
                      {project.title}
                      {project.aiBuilt && (
                        <sup className="ml-2 text-[0.65rem] md:text-xs font-medium tracking-[0.3em] text-amber-500/80 align-super">
                          AI
                        </sup>
                      )}
                    </h3>
                    {(project.kind || project.status) && (
                      <p className="text-[0.65rem] tracking-[0.35em] uppercase text-white/55">
                        {[project.kind, project.status]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    {project.problem && (
                      <p className="max-w-2xl text-sm md:text-base font-light leading-relaxed text-white/60">
                        {project.desc}
                      </p>
                    )}
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
