import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import type { Project, ProfileId } from "../data/projectsData";
import { projectImages } from "../data/projectImages";

interface AiProjectsProps {
  data: Project[];
  profileId: ProfileId;
}

const steps = [
  {
    title: "Planla",
    desc: "Kapsamı ve adımları netleştiririm.",
  },
  {
    title: "Paralel parçalara böl",
    desc: "Birbirini etkilemeyen işler, ortak sözleşmeler.",
  },
  {
    title: "Ajanlara yazdır",
    desc: "Her parça ayrı bir Claude Code ajanında; Pano ile tek pencereden.",
  },
  {
    title: "Test et & birleştir",
    desc: "Testler, gözden geçirme ve entegrasyon.",
  },
];

export const AiProjects = ({ data, profileId }: AiProjectsProps) => {
  const { viewMode } = useView();

  if (data.length === 0) return null;
  const threeCol = data.length % 3 === 0;

  const card =
    viewMode === "bento"
      ? "bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-white/10"
      : viewMode === "zen"
        ? "border-t border-white/5 rounded-none"
        : "bg-white/[0.02] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] hover:border-amber-500/30 shadow-lg md:shadow-2xl";

  return (
    <section
      id="ai-projeler"
      className="relative bg-[#0A0A0F] py-24 md:py-32 px-6 overflow-hidden transform-gpu"
    >
      <div className="max-w-7xl mx-auto">
        {/* BÖLÜM BAŞLIĞI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center md:text-left transform-gpu"
        >
          <h2
            className={`text-4xl sm:text-5xl md:text-7xl tracking-tighter text-white ${
              viewMode === "zen" ? "font-thin opacity-60" : "font-bold"
            }`}
          >
            Yapay Zeka ile{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-cyan-400 italic">
              Geliştirilenler.
            </span>
          </h2>
          <p
            className={`mt-6 max-w-2xl mx-auto md:mx-0 text-base md:text-lg font-light leading-relaxed ${viewMode === "zen" ? "text-white/60" : "text-gray-400"}`}
          >
            Son projelerimi Claude Code ile geliştiriyorum. İşi önce planlayıp
            birbirinden bağımsız parçalara bölüyorum; her parçayı ayrı bir
            Claude Code ajanına paralel olarak yazdırıp test ederek
            birleştiriyorum. Bu ajanları yönetmek için Pano&apos;yu geliştirdim.
          </p>
        </motion.div>

        {/* NASIL ÇALIŞIYORUM ŞERİDİ */}
        <div className="mb-12 md:mb-16">
          <p
            className={`mb-5 text-center md:text-left text-[0.65rem] uppercase ${viewMode === "zen" ? "text-white/55 tracking-[0.5em] font-medium" : "text-amber-500 tracking-[0.2em] font-bold"}`}
          >
            Nasıl çalışıyorum
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={`relative flex gap-4 p-5 ${
                  viewMode === "zen"
                    ? "border-t border-white/5 px-0"
                    : viewMode === "bento"
                      ? "bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-2xl"
                      : "bg-white/[0.02] border border-white/10 rounded-[1.5rem]"
                }`}
              >
                <span
                  className={`shrink-0 text-xs font-black tracking-widest ${i === 1 ? "text-cyan-400" : "text-amber-500"} ${viewMode === "zen" ? "opacity-70" : ""}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-sm ${viewMode === "zen" ? "font-light text-white/70" : "font-bold text-white"}`}
                  >
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs text-white/60 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/30 z-10"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* PROJE KARTLARI */}
        {/* 3'ün katıysa geniş ekranda üçlü grid; tabletteki tek kalan kart tam satır */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${threeCol ? "lg:grid-cols-3" : ""}`}
        >
          {data.map((project, i) => {
            const cover = projectImages[project.slug]?.[0];
            return (
              <Link
                key={project.slug}
                to={`/${profileId}/proje/${project.slug}`}
                className={`group relative overflow-hidden flex flex-col transition-colors duration-500 transform-gpu ${card} ${data.length % 2 === 1 && i === data.length - 1 ? (threeCol ? "md:col-span-2 lg:col-span-1" : "md:col-span-2") : ""}`}
              >
                {viewMode !== "zen" && (
                  <div className="relative aspect-[16/8] overflow-hidden border-b border-white/5">
                    {cover ? (
                      <>
                        <img
                          src={cover.src}
                          alt={cover.caption || project.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-75 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700 transform-gpu"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} to-cyan-500/5 opacity-50 group-hover:opacity-70 transition-opacity`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/5 text-7xl md:text-8xl font-black">
                            {project.title.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div
                  className={`flex-1 flex flex-col ${viewMode === "zen" ? "py-8" : "p-6 md:p-8"}`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3
                      className={`text-2xl md:text-3xl tracking-tight mr-2 ${viewMode === "zen" ? "font-thin text-white/75 group-hover:text-white transition-colors" : "font-bold text-white"}`}
                    >
                      {project.title}
                    </h3>
                    {project.handBuilt && (
                      <span className="px-2.5 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[0.6rem] font-bold tracking-[0.15em] uppercase text-cyan-400">
                        Elle başladı, AI ile devam
                      </span>
                    )}
                  </div>
                  {project.subtitle && (
                    <p className="text-amber-500/80 text-sm font-medium mb-3">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed line-clamp-3">
                    {project.desc}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                    <p
                      lang="en"
                      className="min-w-0 text-[0.65rem] font-black tracking-widest uppercase text-white/55 leading-relaxed">
                      {project.tech.slice(0, 4).join(" · ")}
                    </p>
                    <span className="shrink-0 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/65 group-hover:text-amber-500 transition-colors">
                      İncele →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
