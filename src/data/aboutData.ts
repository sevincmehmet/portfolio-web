export interface AboutCompany {
  name: string;
  date: string;
  role: string;
  /** Şirketin LinkedIn sayfası (yoksa ikon gösterilmez) */
  link?: string;
  current: boolean;
  details: string;
}

export interface AboutContent {
  vizyon: {
    title1: string;
    title2: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  bento: {
    experience: {
      title: string;
      companies: AboutCompany[];
      education?: string;
    };
    volunteering: {
      title: string;
      role: string;
      desc: string;
      items: string[];
    };
    uiux: {
      title: string;
      desc: string;
      icon: string;
      link?: { label: string; url: string };
    };
    location: { city: string; label: string };
  };
  zen: {
    bgText: string;
    quote: string;
    /** Alıntıda vurgulanacak kısım (alıntının içinde geçmeli) */
    highlight?: string;
    tags: string[];
  };
}

export const aboutData: Record<"mas" | "das", AboutContent> = {
  mas: {
    vizyon: {
      title1: "Mühendislik.",
      title2: "Ürün ve İnsan.",
      description:
        "Arayüzü, ürünü ve işi birlikte düşünen bir yazılım geliştiricisiyim. Bilgisayar Mühendisliği okurken tam zamanlı çalışmaya başladım. Detaysoft'ta kurumsal personel yönetimi, organizasyon ağacı, yetkiye göre değişen ekranlar ve SignalR ile gerçek zamanlı paneller geliştirdim. Artersoft'ta yapay zekayla üretilmiş monolitik bir platformu yeniden yapılandırdım ve arayüz tasarımını üstlendim. Bugün Claude Code ile uçtan uca ürün geliştiriyorum; AI Product Engineer yönüne geçmek için ai-lab'de Python, LLM API ve eval çalışıyorum. Ekip çalışmasını Toplum Gönüllüleri'nde sahada öğrendim.",
      stats: [
        { value: "4,5+ yıl", label: "Profesyonel deneyim" },
        { value: "2026", label: "Bilgisayar Müh. mezunu" },
        { value: "Sivas", label: "Uzaktan / ofis, taşınmaya açık" },
      ],
    },
    bento: {
      experience: {
        title: "Eğitim ve Kariyer",
        // Şirketler ve orada yapılanlar "Kariyer Geçmişi" bölümünde
        companies: [],
        education:
          "Bilgisayar Mühendisliği (Lisans) · Sivas Cumhuriyet Üniversitesi · 2021–2026, mezun",
      },
      volunteering: {
        title: "Toplum Gönüllüleri",
        role: "Gönüllü · 2021–2024",
        desc: "Ekip çalışmasını ve sahada sorun çözmeyi ekranda değil, sahada öğrendim. Vakıf tarafından teşekkür belgesi aldım.",
        items: [
          "Engelli bireyler için erişilebilir parkur projesini yürüttüm",
          "Okullarda kütüphane kurulumu ve yenileme çalışmaları",
          "Köy çocuklarına yönelik etkinlikler",
          "Kış aylarında sokak hayvanları için barınak inşası",
        ],
      },
      uiux: {
        title: "Şu an: AI Product Engineer yolunda",
        desc: "12 haftalık bir planla Python, LLM API, tool use ve eval çalışıyorum; her hafta ai-lab reposuna ekleniyor. Python'u bu süreçte öğreniyorum.",
        icon: "🧪",
        link: {
          label: "ai-lab · Hafta 1, 2. gün tamam",
          url: "https://github.com/sevincmehmet/ai-lab",
        },
      },
      location: {
        city: "Sivas, TR",
        label: "Uzaktan / ofis · taşınmaya açık",
      },
    },
    zen: {
      bgText: "HİKAYE",
      quote:
        "İşi küçük parçalara böl, her parçayı test et, kritik kararı insana bırak. Gürültüyü kapat, geriye işe yarayan kalsın.",
      highlight: "Gürültüyü kapat",
      tags: ["KOD", "ÜRÜN", "TOPLUM"],
    },
  },
  das: {
    vizyon: {
      title1: "Sürekli Gelişim.",
      title2: "Web ve Mobil.",
      description:
        "Sektöre yapay zekanın kod yazmadığı dönemde, Detaysoft'ta React ve React Native ile web ve mobil projeler geliştirerek adım attım. JavaScript'i daha iyi kavramak için Node.js ile temel düzeyde backend tarafında da çalıştım. Bugün Artersoft'ta Next.js, TypeScript ve Zustand/Redux ile arayüzler geliştiriyor, Swift ile temel düzeyde iOS tarafını öğreniyorum; .NET'e de giriş yaptım. Bilgisayar Mühendisliği'ni çalışırken bitirdim; Toplum Gönüllüleri'nde sahada çalıştım.",
      stats: [
        { value: "4,5+ yıl", label: "Profesyonel deneyim" },
        { value: "2026", label: "Bilgisayar Müh. mezunu" },
        { value: "Sivas", label: "Türkiye" },
      ],
    },
    bento: {
      experience: {
        title: "Eğitim ve Kariyer",
        // Şirketler ve orada yapılanlar "Kariyer Geçmişi" bölümünde
        companies: [],
        education:
          "Bilgisayar Mühendisliği (Lisans) · Sivas Cumhuriyet Üniversitesi · 2021–2026, mezun",
      },
      volunteering: {
        title: "Toplum Gönüllüleri",
        role: "Saha Organizatörü & Gönüllü",
        desc: "Ekip çalışmasını ve sahada sorun çözmeyi ekranda değil, sahada öğrendim:",
        items: [
          "Köy okullarının sıva, boya ve kütüphane kurulum çalışmaları",
          "Özel eğitim öğrencileriyle etkinlikler ve engelli parkurları",
          "Kış aylarında sokak hayvanları için barınak inşası",
        ],
      },
      uiux: {
        title: "Özenli arayüzler",
        desc: "Tasarımı birebir koda dökmeye (pixel-perfect) ve sade, tutarlı arayüzlere önem veriyorum.",
        icon: "✨",
      },
      location: {
        city: "Sivas, TR",
        label: "Konum",
      },
    },
    zen: {
      bgText: "HİKAYE",
      quote:
        "Sistemleri yeni teknolojilerle, arayüzleri özenle, geleceği gönüllülükle inşa et. Öğrenmeyi asla bırakma.",
      tags: ["KOD", "ESTETİK", "TOPLUM"],
    },
  },
};
