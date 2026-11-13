import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import type { Project, ProfileId } from "../data/projectsData";
import { EvidenceRow } from "./ProjectBits";
import { SectionHeader } from "./SectionHeader";

// Eski ve öğrenme projeleri: tek satırlık özet + kanıt, ayrıntı detay sayfasında
export const ArchiveProjects = ({
  data,
  profileId,
}: {
  data: Project[];
  profileId: ProfileId;
}) => {
  const { viewMode } = useView();
  if (data.length === 0) return null;

  return (
    <section
      id="diger-projeler"
      aria-labelledby="diger-baslik"
      className="relative bg-[#0A0A0F] py-16 md:py-24 px-4 sm:px-6 transform-gpu"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="diger-baslik"
          index="05"
          eyebrow="Arşiv"
          title="Diğer ve öğrenme"
          accent="projeleri."
          intro="Daha eski işler ve bir konuyu öğrenmek için yaptığım projeler."
        />
        <ul
          className={`grid grid-cols-1 md:grid-cols-2 ${viewMode === "zen" ? "gap-x-10" : "gap-3 md:gap-4"}`}
        >
          {data.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/${profileId}/proje/${project.slug}`}
                className={`group h-full flex flex-col gap-2 transition-colors ${
                  viewMode === "zen"
                    ? "py-6 border-b border-white/5"
                    : viewMode === "bento"
                      ? "p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15"
                      : "p-5 md:p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/10 hover:border-amber-500/30"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span
                    className={`text-lg group-hover:text-amber-400 transition-colors ${viewMode === "zen" ? "font-light text-white/80" : "font-semibold text-white"}`}
                  >
                    {project.title}
                  </span>
                  {project.kind && (
                    <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/55">
                      {project.kind}
                    </span>
                  )}
                </div>
                <p className="text-base md:text-sm text-gray-400 font-light leading-relaxed">
                  {project.desc}
                </p>
                <EvidenceRow
                  project={project}
                  linked={false}
                  className="mt-auto pt-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
