import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useView } from "../context/useView";
import type { ProfileId } from "../data/projectsData";
import {
  educationLine,
  experienceData,
  volunteeringLine,
  type ExperienceEntry,
} from "../data/experienceData";
import { SectionHeader } from "./SectionHeader";
import { ExternalIcon } from "./ProjectBits";
import { themeOf } from "../theme/modeTheme";

type Mode = "vizyon" | "bento" | "zen";

// Bir şirketin altındaki işler: kısa özet + varsa proje detayına bağlantı
const EntryItems = ({
  entry,
  profileId,
  mode,
}: {
  entry: ExperienceEntry;
  profileId: ProfileId;
  mode: Mode;
}) => (
  <ul className="space-y-3">
    {entry.items.map((item) => (
      <li
        key={item.title}
        className={`${themeOf(mode).subCard} ${mode === "zen" ? "py-4" : "p-4 md:p-5"}`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          {item.slug ? (
            <Link
              to={`/${profileId}/proje/${item.slug}`}
              className={`inline-flex items-center min-h-[44px] md:min-h-0 text-base md:text-lg text-white hover:text-amber-400 transition-colors ${mode === "zen" ? "font-light" : "font-semibold"}`}
            >
              {item.title}{" "}
              <span aria-hidden className="text-amber-500">
                →
              </span>
            </Link>
          ) : (
            <span
              className={`text-base md:text-lg text-white ${mode === "zen" ? "font-light" : "font-semibold"}`}
            >
              {item.title}
            </span>
          )}
          <span className="flex flex-wrap gap-2">
            {item.internal && (
              <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-white/55">
                Şirket içi · kod paylaşılamaz
              </span>
            )}
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 min-h-[44px] md:min-h-0 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-emerald-400 hover:text-emerald-300"
              >
                Canlı site <ExternalIcon size={10} />
              </a>
            )}
          </span>
        </div>
        <p className="mt-2 text-base md:text-[0.95rem] text-gray-400 font-light leading-relaxed">
          {item.desc}
        </p>
      </li>
    ))}
  </ul>
);

export const Experience = ({ profileId }: { profileId: ProfileId }) => {
  const { viewMode } = useView();
  const entries = experienceData[profileId];
  if (!entries?.length) return null;

  return (
    <section
      id="kariyer"
      aria-labelledby="kariyer-baslik"
      className="relative bg-[#0A0A0F] py-16 md:py-24 px-4 sm:px-6 transform-gpu"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="kariyer-baslik"
          index="03"
          eyebrow="Kariyer Geçmişi"
          title="Kariyer"
          accent="Geçmişi."
          intro="Çalıştığım her yerde neler yaptığım. Şirket içi projelerin kodu ve ekranları paylaşılamıyor; ayrıntısı olan maddeler proje sayfasına gidiyor."
        />

        <ol
          className={
            viewMode === "vizyon"
              ? "relative space-y-12 md:space-y-16 md:border-l md:border-white/10 md:pl-10"
              : viewMode === "bento"
                ? "space-y-4 md:space-y-6"
                : "space-y-14"
          }
        >
          {entries.map((entry, i) => (
            <motion.li
              key={entry.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative grid grid-cols-1 lg:grid-cols-[17rem_1fr] gap-6 lg:gap-10 transform-gpu ${
                viewMode === "bento"
                  ? `${themeOf("bento").card} p-5 md:p-8`
                  : viewMode === "zen"
                    ? "border-t border-white/10 pt-10"
                    : ""
              }`}
            >
              {viewMode === "vizyon" && (
                <span
                  aria-hidden
                  className="hidden md:block absolute -left-[2.85rem] top-2 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-[#0A0A0F]"
                />
              )}
              {/* Şirket kartı */}
              <div className="lg:sticky lg:top-32 self-start">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/55">
                  {entry.period}
                  {entry.duration && (
                    <span className="text-amber-400/90">
                      {" "}
                      · {entry.duration}
                    </span>
                  )}
                  {" · "}
                  {entry.type}
                </p>
                <h3
                  className={`mt-2 text-2xl md:text-3xl tracking-tight text-white ${viewMode === "zen" ? "font-extralight" : "font-bold"}`}
                >
                  {entry.link ? (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
                    >
                      {entry.company}
                      <ExternalIcon size={14} />
                    </a>
                  ) : (
                    entry.company
                  )}
                </h3>
                <p
                  className={`mt-1 text-sm font-semibold ${viewMode === "zen" ? "text-white/70" : "text-amber-400"}`}
                >
                  {entry.role}
                </p>
                <p className="mt-4 text-base md:text-sm text-gray-400 font-light leading-relaxed">
                  {entry.summary}
                </p>
                <p
                  lang="en"
                  className="mt-4 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/50 leading-relaxed"
                >
                  {entry.tech.join(" · ")}
                </p>
              </div>

              {/* Orada yaptıklarım (madde yoksa boş başlık gösterilmez) */}
              {entry.items.length > 0 && (
                <div>
                  <p
                    className={`mb-3 text-[0.65rem] uppercase ${viewMode === "zen" ? "tracking-[0.4em] text-white/50" : "tracking-[0.2em] font-bold text-white/60"}`}
                  >
                    Orada yaptıklarım
                  </p>
                  <EntryItems
                    entry={entry}
                    profileId={profileId}
                    mode={viewMode}
                  />
                </div>
              )}
            </motion.li>
          ))}
        </ol>

        <p
          className={`mt-12 md:mt-16 text-sm text-gray-300 font-light ${viewMode === "zen" ? "border-t border-white/10 pt-8" : ""}`}
        >
          <span className="mr-3 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-amber-400">
            Eğitim
          </span>
          {educationLine}
        </p>
        {viewMode !== "bento" && (
          <p className="mt-4 text-sm text-gray-400 font-light leading-relaxed max-w-4xl">
            <span className="mr-3 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-amber-400">
              Gönüllülük
            </span>
            {volunteeringLine[profileId]}
          </p>
        )}
      </div>
    </section>
  );
};
