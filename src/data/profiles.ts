import type { ProfileId } from "./projectsData";

// Profil kimliği ve iletişim bilgileri tek yerde: Contact, Footer ve
// proje detay sayfası aynı kaynağı kullanır.
export interface ProfileInfo {
  shortName: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export const profiles: Record<ProfileId, ProfileInfo> = {
  mas: {
    shortName: "MAS.",
    fullName: "Mehmet Ali Sevinç",
    role: "Frontend Developer",
    email: "sevincmehmetali716@gmail.com",
    phone: "0531 221 82 61",
    linkedin: "https://linkedin.com/in/mehmet-ali-sevinç-2a8521254",
    github: "https://github.com/sevincmehmet",
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
