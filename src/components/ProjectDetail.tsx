import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { ModeSwitcher } from "./ModeSwitcher";
import { MobileTabBar } from "./MobileTabBar";
import { SectionDivider } from "./SectionDivider";
import { useView } from "../context/useView";
import { responsiveImg } from "../data/projectMeta";
import {
  getProject,
  isProfileId,
  projectsData,
  tierOf,
  type Project,
  type ProfileId,
} from "../data/projectsData";
import { projectImages, type ProjectImage } from "../data/projectImages";
import { profiles } from "../data/profiles";
import { modeTheme } from "../theme/modeTheme";

type Mode = "vizyon" | "bento" | "zen";

// Kart, başlık ve etiket stilleri modun tasarım dilinden (theme/modeTheme)
const cardClass: Record<Mode, string> = {
  vizyon: `${modeTheme.vizyon.card} md:backdrop-blur-xl`,
  bento: modeTheme.bento.card,
  zen: modeTheme.zen.card,
};
const titleClass: Record<Mode, string> = {
  vizyon: modeTheme.vizyon.title,
  bento: modeTheme.bento.title,
  zen: modeTheme.zen.title,
};
const labelClass: Record<Mode, string> = {
  vizyon: modeTheme.vizyon.label,
  bento: modeTheme.bento.label,
  zen: modeTheme.zen.label,
};

const ArrowLeftIcon = () => (
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
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

// --- LIGHTBOX ---
const Lightbox = ({
  images,
  index,
  onClose,
  onChange,
}: {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) => {
  const total = images.length;
  const image = images[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Açılınca odağı Kapat'a taşı, kapanınca açan butona geri ver
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Tab ile odak diyalog dışına çıkmasın
      if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button"),
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onChange]);

  // Lightbox açıkken arka plan kaymasın
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-amber-400 hover:border-amber-500/40 flex items-center justify-center transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Ekran görüntüsü ${index + 1} / ${total}`}
      onClick={onClose}
      className="fixed inset-0 z-[1000] bg-black/90 md:backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12 transform-gpu"
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Kapat"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center text-xl leading-none z-10"
      >
        ×
      </button>

      <motion.img
        key={image.src}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        src={image.src}
        alt={image.caption}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[78vh] object-contain rounded-xl border border-white/10 shadow-2xl transform-gpu"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 text-center max-w-2xl px-2"
      >
        {image.caption && (
          <p className="text-white/70 text-sm font-light">{image.caption}</p>
        )}
        <p className="mt-1 text-[0.65rem] font-bold tracking-[0.3em] text-white/55 uppercase">
          {index + 1} / {total}
        </p>
      </div>

      {total > 1 && (
        <>
          <button
            aria-label="Önceki"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + total) % total);
            }}
            className={`${navBtn} left-2 md:left-6`}
          >
            ←
          </button>
          <button
            aria-label="Sonraki"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % total);
            }}
            className={`${navBtn} right-2 md:right-6`}
          >
            →
          </button>
        </>
      )}
    </motion.div>
  );
};

// --- DİĞER PROJE KARTI ---
const OtherProjectCard = ({
  project,
  profileId,
  mode,
}: {
  project: Project;
  profileId: ProfileId;
  mode: Mode;
}) => {
  const cover = projectImages[project.slug]?.[0];
  return (
    <Link
      to={`/${profileId}/proje/${project.slug}`}
      className={`group relative block overflow-hidden transition-colors hover:border-amber-500/30 transform-gpu ${cardClass[mode]}`}
    >
      {mode !== "zen" && (
        <div className="relative hidden sm:block aspect-video overflow-hidden border-b border-white/5">
          {cover ? (
            <>
              <img
                {...responsiveImg(cover.src, "(min-width: 768px) 33vw, 100vw")}
                alt={cover.caption || project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/70 to-transparent" />
            </>
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-40 group-hover:opacity-60 transition-opacity`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/5 text-6xl font-black">
                  {project.title.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </>
          )}
        </div>
      )}
      <div className={mode === "zen" ? "py-6" : "p-6"}>
        <h3
          className={`text-lg leading-snug transition-colors ${mode === "zen" ? "font-light text-white/70 group-hover:text-white" : "font-bold text-white"}`}
        >
          {project.title}
        </h3>
        <p className="mt-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/55 group-hover:text-amber-500 transition-colors">
          İncele →
        </p>
      </div>
    </Link>
  );
};

export const ProjectDetail = () => {
  const { profileId, slug } = useParams();
  const { viewMode } = useView();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Çok görsel varsa sayfa (özellikle mobilde) uzamasın: önce birkaçı gösterilir
  // (proje değişince kendiliğinden sıfırlansın diye slug ile tutulur)
  const [showAllFor, setShowAllFor] = useState<string | null>(null);

  // Sayfaya girince (veya proje değişince) en üste dön
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!isProfileId(profileId)) return <Navigate to="/" replace />;

  const project = getProject(profileId, slug);
  if (!project) return <Navigate to={`/${profileId}#projeler`} replace />;

  const mode = viewMode;
  const owner = profiles[profileId];
  const images = projectImages[project.slug] ?? [];
  const GALLERY_PREVIEW = 5;
  const visibleImages =
    showAllFor === project.slug || images.length <= GALLERY_PREVIEW + 1
      ? images
      : images.slice(0, GALLERY_PREVIEW);
  // "Diğer projeler": öne çıkan ve ana işler arasından (arşivdeki bir projede
  // tüm liste)
  const all = projectsData[profileId];
  const list =
    tierOf(project) === "archive"
      ? all
      : all.filter((p) => tierOf(p) !== "archive");
  const currentIndex = list.findIndex((p) => p.slug === project.slug);
  const others = [1, 2, 3]
    .map((offset) => list[(currentIndex + offset) % list.length])
    .filter((p) => p.slug !== project.slug);

  const badgeBase =
    "inline-flex items-center gap-2 px-3 py-1.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase";
  const badgeShape = mode === "bento" ? "rounded-lg" : "rounded-full";

  return (
    <div className="relative bg-[#0A0A0F] text-white selection:bg-amber-500/30 pb-32 min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 md:pt-44 pb-16">
        {/* --- GERİ DÖN + SAHİBİ ---
            CV'den doğrudan bu sayfaya gelen ziyaretçi kimin portfolyosunda
            olduğunu ve ana sayfaya nasıl döneceğini hemen görsün */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Link
            to={`/${profileId}#projeler`}
            className="inline-flex items-center gap-2 py-2 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-white/60 hover:text-amber-500 transition-colors"
          >
            <ArrowLeftIcon />
            Tüm Projeler
          </Link>
          <Link
            to={`/${profileId}`}
            className="group inline-flex items-center gap-3 py-1 text-left"
          >
            <span
              aria-hidden
              className={`w-9 h-9 shrink-0 flex items-center justify-center text-[0.65rem] font-black tracking-tight border ${mode === "bento" ? "rounded-xl" : "rounded-full"} ${mode === "zen" ? "border-white/15 text-white/70" : "border-amber-500/30 bg-amber-500/10 text-amber-400"}`}
            >
              {owner.shortName}
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                {owner.fullName}
              </span>
              <span className="block text-xs text-white/60">{owner.role}</span>
            </span>
          </Link>
        </div>

        {/* --- BAŞLIK --- */}
        <motion.header
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 md:mt-10 transform-gpu"
        >
          {(project.aiBuilt ||
            project.internal ||
            project.kind ||
            project.status) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.kind && (
                <span
                  className={`${badgeBase} ${badgeShape} border border-white/10 bg-white/[0.03] text-white/75`}
                >
                  {project.kind}
                </span>
              )}
              {project.status && (
                <span
                  className={`${badgeBase} ${badgeShape} border border-lime-400/30 bg-lime-400/10 text-lime-300`}
                >
                  {project.status}
                </span>
              )}
              {project.aiBuilt && (
                <span
                  className={`${badgeBase} ${badgeShape} border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 text-amber-400`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Yapay Zeka ile Geliştirildi
                </span>
              )}
              {project.aiBuilt && project.handBuilt && (
                <span
                  className={`${badgeBase} ${badgeShape} border border-cyan-500/20 bg-cyan-500/5 text-cyan-400`}
                >
                  Elle + AI
                </span>
              )}
              {project.internal && (
                <span
                  className={`${badgeBase} ${badgeShape} border border-white/10 bg-white/[0.03] text-white/60`}
                >
                  Şirket İçi Proje
                </span>
              )}
            </div>
          )}

          <h1
            className={`text-4xl sm:text-5xl md:text-7xl leading-[1.05] break-words ${titleClass[mode]}`}
          >
            {project.title}
          </h1>

          {project.subtitle && (
            <p
              className={`mt-4 text-lg md:text-2xl font-light ${mode === "vizyon" ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300" : mode === "zen" ? "text-white/60" : "text-amber-500/90"}`}
            >
              {project.subtitle}
            </p>
          )}

          {(project.role || project.period) && (
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-white/70">
              {project.role && (
                <span>
                  <span className="text-white/45 mr-2">Rol</span>
                  {project.role}
                </span>
              )}
              {project.period && (
                <span>
                  <span className="text-white/45 mr-2">Dönem</span>
                  {project.period}
                </span>
              )}
            </div>
          )}

          {project.problem && (
            <div className="mt-8 md:mt-10 max-w-3xl">
              <h2 className={labelClass[mode]}>Problem</h2>
              <p className="mt-3 text-base md:text-lg font-light leading-relaxed text-white/80">
                {project.problem}
              </p>
            </div>
          )}

          <div className="mt-8 md:mt-10 max-w-3xl">
            {project.problem && (
              <h2 className={`${labelClass[mode]} mb-3`}>Ne yaptım</h2>
            )}
            <p
              className={`text-base md:text-xl font-light leading-relaxed ${mode === "vizyon" ? "text-gray-400 border-l-2 border-amber-500/50 pl-5 md:pl-8" : mode === "zen" ? "text-white/65" : "text-gray-400"}`}
            >
              {project.longDesc}
            </p>
          </div>
        </motion.header>

        {/* --- ÖZELLİKLER + TEKNOLOJİ / LİNKLER --- */}
        <section className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div
            className={`md:col-span-7 ${cardClass[mode]} ${mode === "zen" ? "pt-8" : "p-6 md:p-10"}`}
          >
            <h2 className={labelClass[mode]}>Öne Çıkanlar</h2>
            <ul className="mt-6 space-y-4">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm md:text-base text-white/75 font-light leading-relaxed"
                >
                  <span
                    className={`mt-2 w-1.5 h-1.5 shrink-0 ${mode === "bento" ? "rounded-sm" : "rounded-full"} ${mode === "zen" ? "bg-white/40" : "bg-amber-500"}`}
                  />
                  <span className="min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <div
              className={`${cardClass[mode]} ${mode === "zen" ? "pt-8" : "p-6 md:p-8"}`}
            >
              <h2 className={labelClass[mode]}>Teknolojiler</h2>
              <div lang="en" className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) =>
                  mode === "zen" ? (
                    <span
                      key={t}
                      className="text-xs text-white/65 tracking-[0.15em] uppercase mr-3"
                    >
                      {t}
                    </span>
                  ) : (
                    <span
                      key={t}
                      className={`text-[0.65rem] font-bold tracking-[0.15em] uppercase px-3 py-1 ${mode === "bento" ? "rounded-md bg-white/5 border border-white/10 text-white/80" : "rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-400"}`}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Şirket içi ve linksiz projede bu kart yerine alttaki not gösterilir */}
            {(project.links.length > 0 || !project.internal) && (
              <div
                className={`${cardClass[mode]} ${mode === "zen" ? "pt-8" : "p-6 md:p-8"}`}
              >
                <h2 className={labelClass[mode]}>Kanıt ve bağlantılar</h2>
                {project.links.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 py-2.5 text-xs font-bold tracking-wider transition-colors ${mode === "zen" ? "border-b border-amber-500/30 hover:border-amber-500 text-white/75 hover:text-white rounded-none" : mode === "bento" ? "px-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 text-white/80" : "px-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black"}`}
                      >
                        {link.label}
                        <ExternalIcon />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 space-y-4">
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      Herkese açık bir bağlantı yok; detaylar ve demo talep
                      üzerine paylaşılabilir.
                    </p>
                    <Link
                      to={`/${profileId}#iletisim`}
                      className="inline-flex items-center gap-2 py-2 text-xs font-bold tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      İletişime Geç →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* --- EKRAN GÖRÜNTÜLERİ --- */}
        {images.length > 0 ? (
          <section className="mt-14 md:mt-20">
            <h2 className={labelClass[mode]}>Ekran Görüntüleri</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {visibleImages.map((image, i) => (
                <button
                  key={image.src}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ekran görüntüsünü büyüt: ${image.caption}`}
                  className={`group text-left overflow-hidden transition-colors hover:border-amber-500/30 ${i === 0 && visibleImages.length % 2 === 1 ? "sm:col-span-2" : ""} ${mode === "zen" ? "border border-white/5" : cardClass[mode]}`}
                >
                  <div className="relative aspect-video overflow-hidden bg-black/40">
                    <img
                      src={image.src}
                      alt={image.caption}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 transform-gpu"
                    />
                  </div>
                  {image.caption && (
                    <p className="px-4 py-3 text-xs md:text-sm text-white/65 font-light">
                      {image.caption}
                    </p>
                  )}
                </button>
              ))}
            </div>
            {visibleImages.length < images.length && (
              <button
                onClick={() => setShowAllFor(project.slug)}
                className={`mt-6 w-full py-4 text-xs font-bold tracking-[0.2em] uppercase text-white/75 hover:text-amber-400 transition-colors ${mode === "zen" ? "border-t border-white/10" : `${cardClass[mode]} hover:border-amber-500/30`}`}
              >
                Tüm ekran görüntülerini göster ({images.length})
              </button>
            )}
          </section>
        ) : (
          project.internal && (
            <section
              className={`mt-14 md:mt-20 flex items-start gap-4 ${mode === "zen" ? "border-t border-white/5 pt-8" : `${cardClass[mode]} p-6 md:p-8`}`}
            >
              <span className="mt-1.5 w-2 h-2 rounded-full bg-white/30 shrink-0" />
              <p className="text-sm md:text-base text-white/65 font-light leading-relaxed">
                Şirket içi proje olduğu için ekran görüntüsü paylaşılamıyor.
              </p>
            </section>
          )
        )}

        {/* --- İLETİŞİM ÇAĞRISI --- */}
        <section
          aria-labelledby="detail-contact"
          className={`mt-14 md:mt-20 flex flex-col md:flex-row md:items-center justify-between gap-6 ${mode === "zen" ? "border-t border-white/5 pt-8" : `${cardClass[mode]} p-6 md:p-10`}`}
        >
          <div className="min-w-0">
            <h2
              id="detail-contact"
              className={`text-2xl md:text-3xl ${titleClass[mode]}`}
            >
              Bu proje hakkında konuşalım.
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/65 font-light">
              {owner.fullName} · {owner.role}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${owner.email}`}
              className={`inline-flex items-center gap-2 py-3 text-xs font-bold tracking-wider transition-colors ${mode === "zen" ? "border-b border-amber-500/40 hover:border-amber-500 text-white/80 hover:text-white rounded-none" : mode === "bento" ? "px-5 rounded-xl bg-white text-black hover:bg-amber-500" : "px-5 rounded-full bg-amber-500 text-black hover:bg-amber-400"}`}
            >
              E-posta Gönder
            </a>
            {owner.cvUrl && (
              <a
                href={owner.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 py-3 text-xs font-bold tracking-wider transition-colors ${mode === "zen" ? "ml-3 text-white/70 hover:text-white" : `px-5 ${mode === "bento" ? "rounded-xl" : "rounded-full"} border border-white/15 text-white/80 hover:border-amber-500/50 hover:text-white`}`}
              >
                CV (PDF)
              </a>
            )}
            <a
              href={owner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 py-3 text-xs font-bold tracking-wider transition-colors ${mode === "zen" ? "ml-3 text-white/70 hover:text-white" : `px-5 ${mode === "bento" ? "rounded-xl" : "rounded-full"} border border-white/15 text-white/80 hover:border-amber-500/50 hover:text-white`}`}
            >
              LinkedIn
              <ExternalIcon />
            </a>
            <a
              href={owner.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 py-3 text-xs font-bold tracking-wider transition-colors ${mode === "zen" ? "ml-3 text-white/70 hover:text-white" : `px-5 ${mode === "bento" ? "rounded-xl" : "rounded-full"} border border-white/15 text-white/80 hover:border-amber-500/50 hover:text-white`}`}
            >
              GitHub
              <ExternalIcon />
            </a>
          </div>
        </section>

        {/* --- DİĞER PROJELER --- */}
        {others.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="flex items-end justify-between gap-4">
              <h2
                className={`text-3xl md:text-5xl ${titleClass[mode]} ${mode === "zen" ? "opacity-70" : ""}`}
              >
                Diğer <span className="text-amber-500 italic">Projeler.</span>
              </h2>
              <Link
                to={`/${profileId}#projeler`}
                className="shrink-0 py-2 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/60 hover:text-amber-500 transition-colors"
              >
                Tümü →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {others.map((p) => (
                <OtherProjectCard
                  key={p.slug}
                  project={p}
                  profileId={profileId}
                  mode={mode}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <SectionDivider />
      <Footer />
      <ModeSwitcher />
      {profileId === "mas" && <MobileTabBar profileId="mas" />}

      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-amber-500/[0.03] blur-[120px] rounded-full transform-gpu" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/[0.02] blur-[120px] rounded-full transform-gpu" />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
