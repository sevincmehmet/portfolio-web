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
