import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import type { Project, ProfileId } from "../data/projectsData";
import { SectionHeader } from "./SectionHeader";
import { ExternalIcon } from "./ProjectBits";
import { themeOf } from "../theme/modeTheme";

// Canlıda gezilebilen işler: tarayıcı çerçevesinde güncel ekran görüntüsü ve
// siteye giden net bir buton
export const LiveProjects = ({
  data,
  profileId,
}: {
  data: Project[];
  profileId: ProfileId;
}) => {
  const { viewMode } = useView();
  if (data.length === 0) return null;
  const zen = viewMode === "zen";
  const bento = viewMode === "bento";

  const t = themeOf(viewMode);
  const card = zen ? `${t.card} pt-8` : `${t.card} p-4 md:p-5`;

  return (
    <section
      id="canli"
      aria-labelledby="canli-baslik"
      className="relative bg-[#0A0A0F] py-16 md:py-24 px-4 sm:px-6 transform-gpu"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="canli-baslik"
          index="02"
          eyebrow="Canlıdakiler"
          title="Canlıdaki"
          accent="Projeler."
          intro="Şu an yayında olan, tarayıcıdan gezebileceğiniz işler. Görseller sitelerin güncel ana sayfalarından alındı."
        />

        <div
          className={
            zen
              ? "grid grid-cols-1 gap-12"
              : "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6"
          }
        >
          {data.map((project, i) => {
            const live = project.live!;
            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`transform-gpu ${card} ${zen ? "grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-6 md:gap-10" : "flex flex-col"}`}
              >
                {/* Tarayıcı çerçevesi */}
                <a
                  href={live.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} canlı sitesini aç (${live.host})`}
                  className={`group block overflow-hidden border border-white/10 bg-black ${bento ? "rounded-xl" : zen ? "rounded-md" : "rounded-2xl"}`}
                >
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] border-b border-white/10">
                    <span aria-hidden className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    </span>
                    <span className="flex-1 min-w-0 truncate text-center text-[0.7rem] text-white/60 font-medium">
                      {live.host}
                    </span>
                    <span className="flex items-center gap-1 text-[0.6rem] font-bold tracking-[0.15em] uppercase text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Canlı
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={live.image}
                      alt={`${project.title} canlı sitesinin ekran görüntüsü`}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] transform-gpu ${zen ? "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" : ""}`}
                    />
                  </div>
                </a>

                <div
                  className={`flex-1 flex flex-col ${zen ? "pt-6" : "px-2 md:px-3 pt-6 pb-2"}`}
                >
                  <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60">
                    {project.role ?? project.kind}
                  </p>
                  {live.years && (
                    <p
                      className={`mt-3 inline-flex w-fit items-center gap-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase ${zen ? "text-white/60" : `px-2.5 py-1 ${t.badgeShape} ${bento ? "bg-white/5 border border-white/10 text-white/80" : "bg-amber-500/10 border border-amber-500/25 text-amber-300"}`}`}
                    >
                      <span className="sr-only">Yapım yılı: </span>
                      {live.years}
                    </p>
                  )}
                  <h3
                    className={`mt-2 text-2xl md:text-3xl tracking-tight text-white ${zen ? "font-light" : "font-bold"}`}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-300 font-light leading-relaxed">
                    {project.desc}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {project.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="flex gap-2.5 text-[0.95rem] md:text-sm text-gray-400 font-light leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className={`mt-2 w-1 h-1 shrink-0 rounded-full ${zen ? "bg-white/40" : "bg-amber-500"}`}
                        />
                        <span className="min-w-0">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 min-h-[44px] text-sm transition-colors ${t.btnPrimary}`}
                    >
                      Siteyi aç
                      <ExternalIcon size={14} />
                    </a>
                    <Link
                      to={`/${profileId}/proje/${project.slug}`}
                      className={`inline-flex items-center gap-2 min-h-[44px] text-sm transition-colors ${zen ? "ml-4 " : ""}${t.btnSecondary}`}
                    >
                      Proje detayı →
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
