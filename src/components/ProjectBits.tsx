import { tierOf, type Project } from "../data/projectsData";
import { evidenceOf } from "../data/projectMeta";

// Proje kartlarında ve detay sayfasında ortak kullanılan küçük parçalar

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

export const ExternalIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

// Tür, öne çıkan ve durum etiketleri
export const MetaTags = ({ project }: { project: Project }) => {
  const featured = tierOf(project) === "featured";
  if (!project.kind && !project.status && !featured) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {featured && (
        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[0.6rem] font-black tracking-[0.15em] uppercase">
          Öne çıkan
        </span>
      )}
      {project.kind && (
        <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/65">
          {project.kind}
        </span>
      )}
      {project.status && (
        <span className="px-2 py-0.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-[0.6rem] font-bold tracking-[0.1em] uppercase text-lime-300">
          {project.status}
        </span>
      )}
    </div>
  );
};

// Kanıt satırı: kart bütünüyle bir link değilse gerçek bağlantılar,
// link ise (iç içe <a> olmasın diye) yalnızca etiketler
export const EvidenceRow = ({
  project,
  linked,
  className = "",
}: {
  project: Project;
  linked: boolean;
  className?: string;
}) => {
  const items = evidenceOf(project);
  if (items.length === 0) return null;
  return (
    <ul
      aria-label="Kanıt"
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs ${className}`}
    >
      {items.map((item) =>
        linked && item.url ? (
          <li key={item.label}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-1 font-semibold text-amber-400 hover:text-amber-300 underline decoration-amber-500/30 underline-offset-4 transition-colors"
            >
              {item.label}
              <ExternalIcon />
            </a>
          </li>
        ) : (
          <li
            key={item.label}
            className={
              item.url ? "font-semibold text-white/80" : "text-white/60"
            }
          >
            {item.label}
          </li>
        ),
      )}
    </ul>
  );
};
