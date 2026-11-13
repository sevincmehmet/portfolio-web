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
        "Frontend & Product Engineer olarak arayüzü, ürünü ve işi birlikte düşünürüm. Bilgisayar Mühendisliği okurken tam zamanlı çalışmaya başladım. Detaysoft'ta kurumsal personel yönetimi, organizasyon ağacı, yetkiye göre değişen ekranlar ve SignalR ile gerçek zamanlı paneller geliştirdim. Artersoft'ta yapay zekayla üretilmiş monolitik bir platformu yeniden yapılandırdım ve arayüz tasarımını üstlendim. Bugün Claude Code ile uçtan uca ürün geliştiriyorum; AI Product Engineer yönüne geçmek için ai-lab'de Python, LLM API ve eval çalışıyorum. Ekip çalışmasını Toplum Gönüllüleri'nde sahada öğrendim.",
      stats: [
        { value: "3,5+ yıl", label: "Profesyonel deneyim" },
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
          label: "ai-lab · Hafta 1, devam ediyor",
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
      title2: "Estetik ve İnsan.",
      description:
        "Yapay zekanın kod yazmadığı dönemlerde; React ve React Native ile web ve mobil dünyasında sistemler kurarak sektöre adım attım. JavaScript'in çekirdek mantığını tam anlamıyla kavramak için Node.js ile arka plan süreçlerini de inşa ettim. Bugün Artersoft'ta Next.js, TypeScript ve Zustand/Redux ile modern arayüzler geliştiriyorum. Sürekli öğrenmeye olan açlığım ve full-stack vizyonunu tamamen özümseme hedefimle, şu sıralar yoğun bir şekilde .NET mimarilerini öğreniyorum. Bir mühendis sadece çalışır kod yazmamalı; UI/UX'te kusursuzluğu hedeflemeli ve Toplum Gönüllüleri'ndeki gibi gerçek hayatlara dokunmalı.",
      stats: [
        { value: "4+ Yıl", label: "Sektör Deneyimi" }, // Ocak 2021'den bugüne 5 yılı geçtiği için bunu 5+ Yıl olarak güncelledim
        { value: "Sivas", label: "Üretim Üssü" },
      ],
    },
    bento: {
      experience: {
        title: "Kariyer Geçmişi",
        companies: [
          {
            name: "Artersoft",
            date: "Ocak 2026 - Halen",
            role: "Frontend Developer",
            link: "https://www.linkedin.com/company/artersoft/",
            current: true,
            details:
              "Next.js ekosisteminde ölçeklenebilir, estetik ve performans odaklı frontend mimarileri geliştiriyorum. Öğrenmeye açık vizyonumla kompleks projelerin arayüzlerini 'pixel-perfect' bir hassasiyetle inşa ederken, bir yandan da .NET öğrenerek full-stack hedeflerimi güçlendiriyorum.",
          },
          {
            name: "Detaysoft",
            date: "Ocak 2021 - Ocak 2026",
            role: "Frontend Developer",
            link: "https://www.linkedin.com/company/detaysoft/",
            current: false,
            details:
              "Sektöre asıl damgamı vurduğum yer. Yapay zekanın işleri kolaylaştırmadığı o dönemde; React ve React Native kullanarak web ve mobil platformlarda sıfırdan onlarca canlı proje geliştirdim. Javascript mantığını uçtan uca kavramak adına Node.js ile projeler geliştirerek full-stack dünyasının temellerini burada attım.",
          },
        ],
      },
      volunteering: {
        title: "Toplum Gönüllüleri",
        role: "Saha Organizatörü & Gönüllü",
        desc: "Ekip ruhunun ve kriz yönetiminin en saf halini ekranda değil, sahada öğrendim. Sadece dijitalde değil, fiziksel dünyada da iz bırakıyoruz:",
        items: [
          "Köy okullarının sıva, boya ve kütüphane kurulum çalışmaları",
          "Özel eğitim öğrencileriyle etkinlikler ve engelli parkurları",
          "Kış aylarında sokak hayvanları için barınak inşası",
        ],
      },
      uiux: {
        title: "Pixel-Perfect & Estetik",
        desc: "Sadece çalışır kod yazmam, pikselleri estetikle buluştururum. 'Apple-tarzı' minimalizm, glassmorphism detayları ve kusursuz UI/UX entegrasyonları benim için bir standarttır.",
        icon: "✨",
      },
      location: {
        city: "Sivas, TR",
        label: "Merkez Karargah",
      },
    },
    zen: {
      bgText: "HİKAYE",
      quote:
        "Sistemleri yeni teknolojilerle, arayüzleri estetikle, geleceği gönüllülükle inşa et. Öğrenmeyi asla bırakma, geriye sadece bıraktığın kusursuz iz kalsın.",
      tags: ["KOD", "ESTETİK", "TOPLUM"],
    },
  },
};
