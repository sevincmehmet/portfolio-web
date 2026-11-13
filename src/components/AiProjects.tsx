import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import type { Project, ProfileId } from "../data/projectsData";
import { coverOf } from "../data/projectMeta";
import { MetaTags } from "./ProjectBits";
import { SectionHeader } from "./SectionHeader";

interface AiProjectsProps {
  data: Project[];
  profileId: ProfileId;
}

// Geliştirirken: Claude Code ile çalışma şekli
const buildSteps = [
  {
    title: "Planla",
    desc: "Kapsamı, kabul kriterlerini ve adımları netleştiririm.",
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
    desc: "Testler, kod okuma ve entegrasyon. Son karar bende.",
  },
];

// Üründe: AI'ı işe bağlarken uyduğum kurallar
const productRules = [
  {
    title: "Tek görevli küçük ajanlar",
    desc: "Bir ajan bir işi yapar. Org Tree Asistanı'nda yönetici, çalışan ve triyaj ajanları ayrı.",
  },
  {
    title: "Sınırlı araç ve yetki",
    desc: "Her ajan yalnızca kendi araçlarını çağırabilir; yetki kontrolü prompt'ta değil kodda.",
  },
  {
    title: "Kritik işlem insan onayında",
    desc: "Ekip taşıma, talep gönderme gibi yazma işlemleri onay olmadan çalışmaz, geri alınabilir.",
  },
  {
    title: "Ölç ve düzelt",
    desc: "Küçük eval'lerle modelin sızdırdığı ya da uydurduğu yeri bulur, aracı düzeltirim.",
  },
];

type Mode = "vizyon" | "bento" | "zen";

const StepList = ({
  items,
  numbered,
  accent,
  mode,
}: {
  items: { title: string; desc: string }[];
  numbered: boolean;
  accent: string;
  mode: Mode;
}) => {
  const stepCard =
    mode === "zen"
      ? "border-t border-white/5 px-0"
      : mode === "bento"
        ? "bg-[#111] md:bg-white/[0.02] border border-white/5 rounded-2xl"
        : "bg-white/[0.02] border border-white/10 rounded-[1.5rem]";
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((step, i) => (
        <li key={step.title} className={`relative flex gap-4 p-5 ${stepCard}`}>
          <span
            aria-hidden
            className={`shrink-0 text-xs font-black tracking-widest ${accent} ${mode === "zen" ? "opacity-70" : ""}`}
          >
            {numbered ? String(i + 1).padStart(2, "0") : "●"}
          </span>
          <div className="min-w-0">
            <p
              className={`text-sm ${mode === "zen" ? "font-light text-white/75" : "font-bold text-white"}`}
            >
              {step.title}
            </p>
            <p className="mt-1 text-sm md:text-xs text-white/65 font-light leading-relaxed">
              {step.desc}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
};

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

  const groupLabel = `mb-5 text-center md:text-left text-[0.65rem] uppercase ${viewMode === "zen" ? "text-white/55 tracking-[0.5em] font-medium" : "text-amber-500 tracking-[0.2em] font-bold"}`;

  return (
    <section
      id="ai-projeler"
      className="relative bg-[#0A0A0F] py-16 md:py-24 px-4 sm:px-6 overflow-hidden transform-gpu"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          eyebrow="AI"
          title="AI ile"
          accent="nasıl çalışıyorum."
          intro="AI'ı iki yerde kullanıyorum: geliştirirken (Claude Code ile) ve ürünün içinde (ajanlar). İkisinde de kural aynı: işi küçük parçalara böl, her parçanın yetkisini sınırla, sonucu test et, kritik kararı insana bırak. Ürün tarafının en net örneği yukarıdaki Org Tree Asistanı."
        />

        {/* İKİ ŞERİT: GELİŞTİRİRKEN / ÜRÜNDE */}
        <div className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <p className={groupLabel}>Geliştirirken · Claude Code</p>
            <StepList
              items={buildSteps}
              numbered
              accent="text-amber-500"
              mode={viewMode}
            />
          </div>
          <div>
            <p className={groupLabel}>Üründe · AI ajanları</p>
            <StepList
              items={productRules}
              numbered={false}
              accent="text-cyan-400"
              mode={viewMode}
            />
          </div>
        </div>

        {/* PROJE KARTLARI */}
        <p className={groupLabel}>Bu çalışma şeklinden çıkan araçlar</p>
        {/* 3'ün katıysa geniş ekranda üçlü grid; tabletteki tek kalan kart tam satır */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${threeCol ? "lg:grid-cols-3" : ""}`}
        >
          {data.map((project, i) => {
            const cover = coverOf(project.slug);
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
                          alt=""
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
                  <div className="mb-3">
                    <MetaTags project={project} />
                  </div>
                  <h3
                    className={`text-2xl md:text-3xl tracking-tight mb-3 ${viewMode === "zen" ? "font-thin text-white/75 group-hover:text-white transition-colors" : "font-bold text-white"}`}
                  >
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-amber-400/90 text-sm font-medium mb-3">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="text-gray-400 text-base font-light leading-relaxed line-clamp-4">
                    {project.desc}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                    <p
                      lang="en"
                      className="min-w-0 text-[0.65rem] font-black tracking-widest uppercase text-white/55 leading-relaxed"
                    >
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
