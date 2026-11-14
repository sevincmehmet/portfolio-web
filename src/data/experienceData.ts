import type { ProfileId } from "./projectsData";

// Kariyer Geçmişi: her şirketin altında orada yapılan işler.
// Kaynak: CV (cv-ai-hr) ve mevcut proje içerikleri. Ayrıntı proje detay
// sayfasındaysa madde oraya bağlanır (slug), burada kısa özet kalır.

export interface ExperienceItem {
  title: string;
  desc: string;
  /** Proje detay sayfası varsa: /<profil>/proje/<slug> */
  slug?: string;
  /** Şirket içi iş: kod / ekran görüntüsü paylaşılamaz */
  internal?: boolean;
  /** Canlıda gezilebiliyorsa */
  liveUrl?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  /** Toplam süre (kullanıcının verdiği): "3 yıl 3 ay" */
  duration?: string;
  type: string;
  /** Şirketin LinkedIn sayfası ya da sitesi */
  link?: string;
  summary: string;
  tech: string[];
  items: ExperienceItem[];
}

export const experienceData: Partial<Record<ProfileId, ExperienceEntry[]>> = {
  mas: [
    {
      company: "Artersoft",
      role: "Frontend Developer & UI/UX Designer",
      period: "Şubat 2026 – Temmuz 2026",
      duration: "6 ay",
      type: "Tam zamanlı",
      link: "https://www.linkedin.com/company/artersoft/",
      summary:
        "Next.js, TypeScript ve Zustand/Redux ile web arayüzleri geliştirdim; ürün arayüzlerinin UI/UX tasarımını üstlendim.",
      tech: ["Next.js", "TypeScript", "Zustand / Redux", "Google Maps API"],
      items: [
        {
          title: "Kurumsal filo yönetim platformu",
          desc: "25–30 sayfalık platformda yapay zekayla üretilmiş, sayfa başına 1700 satıra ulaşan kodu feature-based mimariyle baştan yazdım. Sidebar'ı kalıcı (persistent) layout'a taşıyarak gereksiz render'ları ve menü durumunun sıfırlanmasını giderdim. Google Maps üzerindeki seyahat geçmişi oynatımı ve canlı takip senkronizasyon hatalarını çözdüm; arayüzü ve animasyonları yeniledim.",
          slug: "filo-yonetim",
          internal: true,
        },
      ],
    },
    {
      company: "Detaysoft",
      role: "Frontend Developer",
      period: "Kasım 2022 – Ocak 2026",
      duration: "3 yıl 3 ay",
      type: "Tam zamanlı · eğitimle birlikte",
      link: "https://www.linkedin.com/company/detaysoft/",
      summary:
        "Kurumsal web, masaüstü ve mobil projelerin frontend'inde çalıştım. Tam zamanlı çalışırken Bilgisayar Mühendisliği eğitimime devam ettim.",
      tech: [
        "React",
        "TypeScript",
        "Radix UI",
        "MUI",
        "SignalR",
        "Electron",
        "React Native (Expo)",
      ],
      items: [
        {
          title: "Kurumsal personel yönetim sistemi",
          desc: "İç içe departmanlar ve yönetici–çalışan ilişkilerinden oluşan organizasyon ağacı (org tree), personel detay ve departman atama ekranları, şirket / personel bazlı filtrelenen raporlama ve hiyerarşiye göre değişen yetkili ekranlar.",
          slug: "personel-yonetim-sistemi",
          internal: true,
        },
        {
          title: "Gerçek zamanlı paneller ve ihale sayfaları",
          desc: "Microsoft SignalR ile gerçek zamanlı mesajlaşma, dinamik ihale sayfaları ve veri yoğun yönetim panelleri.",
          slug: "realtime-paneller",
          internal: true,
        },
        {
          title: "Masaüstü kriptografi uygulaması",
          desc: "Electron, React ve Node.js ile şifreleme ve veri koruma katmanları içeren kurumsal masaüstü uygulaması.",
          slug: "kriptografi-masaustu",
          internal: true,
        },
        {
          title: "Mobil uygulamalar",
          desc: "React Native (Expo) ile iOS / Android uygulamalar.",
          internal: true,
        },
      ],
    },
    {
      company: "Sarissa Bisiklet",
      role: "Frontend Developer",
      period: "Freelance",
      type: "Serbest çalışma",
      link: "https://www.sarissabisiklet.com/",
      summary:
        "Bir bisiklet markası için B2C / B2B e-ticaret platformu. Arayüzü ben geliştirdim, backend'i ikizim Dursun Ali yazdı. Site canlıda.",
      tech: ["React", "JavaScript", "Tailwind", "iyzico API", "Entegra API"],
      items: [
        {
          title: "E-ticaret platformu: müşteri, admin ve bayi panelleri",
          desc: "3 bağımsız panelin arayüzü ve her bayiye özel dinamik fiyatlandırma ekranları; iyzico ödeme akışı ve pazaryeri stok senkronizasyonuyla çalışan yönetim ekranları.",
          slug: "sarissa-bisiklet",
          liveUrl: "https://www.sarissabisiklet.com/",
        },
      ],
    },
  ],
  das: [
    {
      company: "Artersoft",
      role: "Software Developer",
      period: "Ocak 2026 – Halen",
      type: "Tam zamanlı",
      link: "https://www.linkedin.com/company/artersoft/",
      summary:
        "Next.js, TypeScript ve Zustand/Redux ile ölçeklenebilir, performans odaklı arayüzler geliştiriyorum; tasarımları birebir (pixel-perfect) hayata geçiriyorum.",
      tech: [
        "Next.js",
        "TypeScript",
        "Zustand / Redux",
        "Tailwind",
        "Swift (temel)",
      ],
      items: [
        {
          title: "Swift ile temel düzey iOS",
          desc: "Belirli projeleri Swift ile klonlayarak temel düzeyde iOS geliştirme çalışmaları.",
          internal: true,
        },
      ],
    },
    {
      company: "Detaysoft",
      role: "Software Developer",
      period: "Ocak 2021 – Ocak 2026",
      duration: "5 yıl",
      type: "Tam zamanlı · eğitimle birlikte",
      link: "https://www.linkedin.com/company/detaysoft/",
      summary:
        "React ve React Native ile web ve mobil platformlarda sıfırdan çok sayıda canlı proje geliştirdim; Node.js ile temel düzeyde backend projeleri de yaptım.",
      tech: [
        "React",
        "React Native (CLI)",
        "TypeScript",
        "Redux Toolkit",
        "Zustand",
        "Node.js",
      ],
      items: [
        {
          title: "IoT ve fatura terminalleri veri sistemi",
          desc: "Sahadaki IoT cihazları ve fatura kesim terminallerinden gelen anlık verilerin işlendiği kurumsal sistem; saniyelik veri akışında render darboğazlarını önlemek için Zustand ve Redux Toolkit ile state yönetimini optimize ettim.",
          slug: "iot-fatura-gercek-zamanli-veri-terminalleri",
          internal: true,
        },
        {
          title: "Ortak auth / login paketi (NPM)",
          desc: "Üç projenin kimlik doğrulamasını tek merkezden yöneten, NPM'de yayınlanan login paketi: token yönetimi ve güvenlik parametreleri paket içinde.",
          slug: "npm-core-ortak-auth-login-kutuphanesi",
          internal: true,
        },
        {
          title: "Dijital kurumsal kartvizit",
          desc: "Çalışanların kurumsal kimliklerini hızlıca paylaştığı, mobil uyumlu kartvizit uygulamasının arayüzü.",
          slug: "dijital-kurumsal-kartvizit-platformu",
          internal: true,
        },
      ],
    },
    {
      company: "Sarissa Bisiklet",
      role: "Freelance Developer",
      period: "Freelance",
      type: "Serbest çalışma · ikizim Mehmet Ali ile",
      link: "https://www.sarissabisiklet.com/",
      summary:
        "Bir bisiklet markası için B2C / B2B e-ticaret platformu. Backend'i ben yazdım, arayüzü ikizim Mehmet Ali geliştirdi. Site canlıda.",
      tech: ["Node.js", "Entegra API", "iyzico"],
      items: [
        {
          title: "E-ticaret backend'i ve entegrasyonlar",
          desc: "Entegra API'den gelen verileri veritabanı kayıtlarıyla birleştiren süreçler, Hepsiburada ile stok senkronizasyonu ve iyzico ödeme altyapısı.",
          slug: "sarissa-bisiklet-e-ticaret-ekosistemi",
          liveUrl: "https://www.sarissabisiklet.com/",
        },
      ],
    },
  ],
};

export const educationLine =
  "Bilgisayar Mühendisliği (Lisans) · Sivas Cumhuriyet Üniversitesi · 2021–2026, mezun";

// Vizyon ve Zen'de "Hakkımda" kartları olmadığından gönüllülük burada da
// kısa bir satır olarak yer alır (kaynak: CV)
export const volunteeringLine: Record<ProfileId, string> = {
  mas: "Toplum Gönüllüleri Vakfı · 2021–2024: engelli bireyler için erişilebilir parkur projesini yürüttüm; okullarda kütüphane kurulumu ve köy çocuklarına yönelik etkinliklerde görev aldım. Vakıf tarafından teşekkür belgesi aldım.",
  das: "Toplum Gönüllüleri Vakfı · saha organizatörü ve gönüllü: köy okullarında sıva, boya ve kütüphane kurulumu; özel eğitim öğrencileriyle etkinlikler ve engelli parkurları; kış aylarında sokak hayvanları için barınak inşası.",
};
