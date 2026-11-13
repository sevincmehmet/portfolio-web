import type { ProfileId } from "./projectsData";

// Profil kimliği ve iletişim bilgileri tek yerde: Contact, Footer ve
// proje detay sayfası aynı kaynağı kullanır.
export interface ProfileInfo {
  shortName: string;
  fullName: string;
  role: string;
  /** Rolün altındaki destek satırı */
  tagline?: string;
  email: string;
  /** Yoksa iletişimde telefon gösterilmez */
  phone?: string;
  linkedin: string;
  github: string;
  /** Varsa hero, navbar ve iletişimde "CV" bağlantısı gösterilir */
  cvUrl?: string;
  /** Konum ve çalışma tercihi (CV ile aynı) */
  location?: string;
  /** Şu an üzerinde çalıştığı yön: kısa, kanıtlı */
  now?: { text: string; url: string; label: string };
}

export const profiles: Record<ProfileId, ProfileInfo> = {
  mas: {
    shortName: "MAS.",
    fullName: "Mehmet Ali Sevinç",
    role: "Frontend & Product Engineer",
    tagline: "UI/UX · Kurumsal paneller · AI agent'lar",
    email: "sevincmehmetali716@gmail.com",
    linkedin: "https://linkedin.com/in/mehmet-ali-sevinç-2a8521254",
    github: "https://github.com/sevincmehmet",
    cvUrl: "/cv/Mehmet_Ali_Sevinc_CV.pdf",
    location: "Türkiye · uzaktan veya ofis, taşınmaya açık",
    now: {
      text: "AI Product Engineer yönüne geçiyorum: 12 haftalık planla Python, LLM API, tool use ve eval çalışıyorum.",
      url: "https://github.com/sevincmehmet/ai-lab",
      label: "ai-lab · Hafta 1, devam ediyor",
    },
  },
  das: {
    shortName: "DAS.",
    fullName: "Dursun Ali Sevinç",
    role: "UI/UX Tasarımcı",
    email: "sevincdursunali61@gmail.com",
    phone: "0535 329 67 13",
    linkedin: "https://linkedin.com/in/dursun-ali-sevinç-18a466280",
    github: "https://github.com/dursunalisevinc",
  },
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
