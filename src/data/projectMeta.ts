import type { Project } from "./projectsData";
import { projectImages } from "./projectImages";

export interface Evidence {
  label: string;
  /** Dış bağlantı varsa; yoksa bilgi etiketi (ekran görüntüsü sayısı, şirket içi) */
  url?: string;
}

// Proje kartlarındaki "kanıt" satırı: dış bağlantılar + ekran görüntüsü sayısı
// + şirket içi notu. Kart tamamen tıklanabilir olduğunda yalnızca etiketler
// kullanılır (iç içe link olmasın diye).
export const evidenceOf = (project: Project): Evidence[] => {
  const items: Evidence[] = project.links.map((l) => ({
    label: l.label,
    url: l.url,
  }));
  const shots = projectImages[project.slug]?.length ?? 0;
  if (shots > 0) items.push({ label: `${shots} ekran görüntüsü` });
  if (project.internal) items.push({ label: "Şirket içi · kod paylaşılamaz" });
  return items;
};

export const coverOf = (slug: string) => projectImages[slug]?.[0];

// Kart kapakları ve canlı proje görselleri için 800px'lik küçük kopyalar
// (public/.../<ad>-800.webp). Mobilde ve kartlarda küçüğü, geniş ekranda
// büyüğü indirilsin diye srcSet üretilir.
const THUMBS = new Set([
  "/projects/mini-erp/01-konsolide-koyu.webp",
  "/projects/jollin/01-ana-sayfa.webp",
  "/projects/org-tree-asistani/01-insan-onayi.webp",
  "/projects/pano/01-ajan-agaci.webp",
  "/projects/sarissa-bisiklet/01-ana-sayfa.webp",
  "/projects/canli/jollin.webp",
  "/projects/canli/sarissa.webp",
]);

export const responsiveImg = (
  src: string,
  sizes = "(min-width: 768px) 50vw, 100vw",
) =>
  THUMBS.has(src)
    ? {
        src,
        srcSet: `${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1440w`,
        sizes,
      }
    : { src };
