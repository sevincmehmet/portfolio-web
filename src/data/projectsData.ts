export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  /** URL'de kullanılan sabit kimlik: /<profil>/proje/<slug> */
  slug: string;
  title: string;
  subtitle?: string;
  /** Kartlarda görünen kısa açıklama */
  desc: string;
  /** Detay sayfasındaki uzun açıklama */
  longDesc: string;
  features: string[];
  tech: string[];
  links: ProjectLink[];
  color: string;
  role?: string;
  period?: string;
  /** Yapay zeka (Claude Code) ile geliştirildi */
  aiBuilt?: boolean;
  /** Elle yazılmaya başlandı (aiBuilt ile birlikte: "Elle + AI") */
  handBuilt?: boolean;
  /** Şirket içi proje — canlı link / ekran görüntüsü yok */
  internal?: boolean;
}

export type ProfileId = "mas" | "das";

export const projectsData: Record<ProfileId, Project[]> = {
  mas: [
    {
      id: 9,
      slug: "mini-erp",
      title: "Mini-ERP",
      subtitle: "Çok Şirketli Personel & Finans Yönetimi",
      desc: "Claude Code ile uçtan uca geliştirilmiş masaüstü ERP. Personel, vardiya, puantaj, izin, Türk bordrosu, cari hesaplar ve gelir-gider; çok şirketli yapı ve şirket bazlı veri izolasyonu ile tek uygulamada.",
      longDesc:
        "Birden fazla şirketi tek bir uygulamadan yöneten, Electron tabanlı bir masaüstü ERP. Uygulamayı Claude Code ile uçtan uca geliştirdim. İK tarafında personel, vardiya planlama, puantaj ve izin yönetimini; finans tarafında Türk bordro hesaplamasını, cari hesapları ve gelir-gideri kapsıyor. Her şirketin verisi birbirinden izole tutuluyor (testlerle doğrulanmış multi-tenant yapı), istenirse tüm şirketler konsolide görünümde izlenebiliyor. Backend .NET Clean Architecture ile yazıldı; çok kullanıcılı sürüm için Docker ve Caddy ile hazır bir sunucu kurulumu, demo için ise sunucusuz, tek tık kurulumlu bir paket var. Demo talep üzerine paylaşılıyor.",
      features: [
        "Personel (İK), vardiya planlama, puantaj ve izin yönetimi",
        "Kıst gün dahil Türk bordro hesaplaması",
        "Cari hesaplar ve gelir-gider takibi",
        "Çok şirketli yapı: şirket bazlı veri izolasyonu (multi-tenant, testlerle doğrulanmış) ve konsolide görünüm",
        "Excel / CSV içe aktarma",
        "Excel verisinden sürükle-bırak rapor ve sayfa oluşturucu (grafik widget'ları)",
        "Denetim kaydı, çöp kutusu, JSON yedekleme ve uygulama içi ürün turu",
        "Sunucusuz demo paketi: gömülü .NET API, yerel SQLite, tek tık kurulum",
        "Sunucu sürümü için Docker + Caddy (HTTPS) kurulumu, JWT kimlik doğrulama ve rate limit",
      ],
      tech: [
        "Electron",
        "React 19",
        "TypeScript",
        "Zustand",
        "Tailwind",
        ".NET Clean Architecture",
        "EF Core",
        "SQL Server / SQLite",
        "Docker",
      ],
      links: [],
      color: "from-amber-500/20",
      aiBuilt: true,
    },
    {
      id: 12,
      slug: "pano",
      title: "Pano",
      subtitle: "Claude Code Ajan Yönetim Uygulaması",
      desc: "Bir işi birden fazla Claude Code ajanına bölüp paralel yürütmek için tek başıma geliştirdiğim ve kendim kullandığım masaüstü aracı. Ajanlar bir hiyerarşi ağacında, her biri kendi terminaliyle tek pencerede.",
      longDesc:
        "Claude Code ile çalışırken işi önce planlayıp birbirinden bağımsız parçalara bölüyor, her parçayı ayrı bir ajana yazdırıyorum. Pano, bu paralel çalışma şeklini tek pencereden yönetmek için kendi kullanımıma yönelik tek başıma geliştirdiğim bir Electron uygulaması; kendisi de Claude Code ile geliştirildi. Ajanlar, kimin hangi ajanın altında açıldığını gösteren yakınlaştırılabilir bir ağaçta duruyor. Her ajanın gömülü bir terminali var, durumları (çalışıyor, onay bekliyor, bitti, hata) anlık izleniyor.",
      features: [
        "Ajan hiyerarşi ağacı: üst/alt ajan ilişkileri, sürükleyerek gezme, yakınlaştırma ve sığdırma",
        "Her ajan için node-pty + xterm.js ile gömülü terminal; tam ekran ve gizle modları, ⌘1–9 kısayolları",
        "pano komut satırı aracı: ajanlar kendi alt ajanlarını açabiliyor, birbirine mesaj gönderebiliyor (yerel, jetonla korunan HTTP API)",
        "Claude Code hook'larıyla anlık durum takibi ve onay bekleyen ajan için masaüstü bildirimi",
        "Terminal'de açık Claude oturumlarını konuşma geçmişiyle birlikte kaldığı yerden Pano'ya taşıma",
      ],
      tech: ["Electron", "Node.js", "node-pty", "xterm.js", "Claude Code Hooks"],
      links: [],
      color: "from-violet-500/20",
      role: "Tek geliştirici — kişisel kullanım aracı",
      aiBuilt: true,
    },
    {
      id: 1,
      slug: "jollin",
      title: "Jollin",
      desc: "Deneyim, eğlence, kulüp ve etkinlikleri tek çatı altında toplayan keşif ve biletleme platformu. Next.js altyapısıyla etkinlik keşfi, dinamik biletleme ve sepet yönetimi akışları.",
      longDesc:
        "Jollin; etkinlik, deneyim, eğlence ve kulüpleri tek çatı altında toplayan bir keşif ve biletleme platformu. Ekip içinde platformun web tarafında çalışıyorum. Web uygulaması, yapay zeka kodlama araçları yaygınlaşmadan önce elle yazılmaya başlandı; bugün geliştirmeye Claude Code ile yapay zeka destekli olarak devam ediyorum. Next.js altyapısı üzerinde etkinlik keşfi, dinamik biletleme ve sepet yönetimi akışlarını geliştiriyorum.",
      features: [
        "Etkinlik, deneyim ve kulüp keşfi",
        "Dinamik biletleme akışı",
        "Sepet yönetimi",
        "Yapay zeka entegrasyonu",
      ],
      tech: ["Next.js", "TypeScript", "AI Integration", "Tailwind"],
      links: [{ label: "Canlı Site", url: "https://jollin.com.tr/j/" }],
      color: "from-orange-500/20",
      role: "Web Developer — ekip projesi",
      aiBuilt: true,
      handBuilt: true,
    },
    {
      id: 10,
      slug: "personel-yonetim-sistemi",
      title: "Kurumsal Personel Yönetim Sistemi",
      subtitle: "Organizasyon ağacı, raporlama ve yetkilendirilmiş arayüz",
      desc: "Şirket Bünyesinde — İç içe departmanlar ve yönetici–çalışan ilişkilerinden oluşan organizasyon ağacı, personel ve departman ekranları, gelişmiş filtreli raporlama ve hiyerarşiye göre yetkilendirilen arayüz.",
      longDesc:
        "Detaysoft bünyesinde geliştirilen kurumsal bir personel yönetim sistemi. Projede frontend tarafında çalıştım. İç içe departmanlar ve yönetici–çalışan ilişkilerinden oluşan organizasyon ağacını gösteren arayüzü, personel detay ve departman atama ekranlarını ve şirket / personel bazlı filtrelenebilen raporlama ekranlarını geliştirdim. Arayüz hiyerarşiye ve role göre yetkilendiriliyor: bir yönetici yalnızca kendi ekibini görüyor.",
      features: [
        "İç içe departmanlar ve yönetici–çalışan ilişkilerinden oluşan organizasyon ağacı (org tree) arayüzü",
        "Personel detay ve departman atama ekranları",
        "Şirket ve personel bazlı gelişmiş filtreleme / arama ile raporlama ekranları",
        "Hiyerarşi ve rol bazlı yetkilendirilen arayüz (yönetici yalnızca kendi ekibini görür)",
      ],
      tech: ["React", "TypeScript", "MUI / Radix UI"],
      links: [],
      color: "from-sky-500/20",
      role: "Frontend Developer — Detaysoft",
      internal: true,
    },
    {
      id: 2,
      slug: "sarissa-bisiklet",
      title: "Sarissa Bisiklet",
      desc: "React (JSX) tabanlı; iyzico ödeme sistemi ve Entegra pazaryeri entegrasyonuna sahip devasa bir e-ticaret ekosistemi. Hepsiburada gibi mecralarla çift taraflı anlık stok senkronizasyonu; Müşteri, Admin ve her bayiye özel dinamik fiyatlandırma sunan Bayi platformu olmak üzere 3 farklı bağımsız yönetim panelinin inşası.",
      longDesc:
        "Bir bisiklet markası için React (JSX) ile geliştirilen kapsamlı bir e-ticaret sistemi. Ödemeler iyzico üzerinden alınıyor; Entegra entegrasyonu sayesinde Hepsiburada gibi pazaryerleriyle stoklar çift taraflı ve anlık olarak senkronize ediliyor. Sistem; müşteri, admin ve bayi olmak üzere üç ayrı panelden oluşuyor. Bayi panelinde her bayiye özel dinamik fiyatlandırma uygulanıyor.",
      features: [
        "iyzico ödeme entegrasyonu",
        "Entegra pazaryeri entegrasyonu",
        "Hepsiburada gibi mecralarla çift taraflı anlık stok senkronizasyonu",
        "Müşteri, Admin ve Bayi olmak üzere 3 bağımsız panel",
        "Her bayiye özel dinamik fiyatlandırma",
      ],
      tech: ["React (JSX)", "Entegra API", "iyzico Integration", "Tailwind"],
      links: [{ label: "Canlı Site", url: "https://www.sarissabisiklet.com/" }],
      color: "from-cyan-500/20",
    },
    {
      id: 6,
      slug: "smart-plug",
      title: "Akıllı Priz & Aydınlatma Otomasyonu (IoT)",
      desc: "React Native Expo ve MQTT protokolü kullanılarak geliştirilmiş, donanımla anlık haberleşerek akıllı priz ve uzaktan oda ışık kontrolü (Aydınlatma) sağlayan mobil IoT uygulaması.",
      longDesc:
        "React Native (Expo) ile geliştirilmiş bir mobil IoT uygulaması. MQTT protokolü üzerinden donanımla anlık haberleşerek akıllı prizlerin ve oda aydınlatmasının uzaktan kontrol edilmesini sağlıyor.",
      features: [
        "MQTT ile donanımla anlık haberleşme",
        "Akıllı priz kontrolü",
        "Uzaktan oda aydınlatma kontrolü",
        "React Native (Expo) ile mobil arayüz",
      ],
      tech: ["React Native", "Expo", "MQTT", "IoT Home Automation"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/smart-plug-app",
        },
      ],
      color: "from-rose-500/20",
    },
    {
      id: 7,
      slug: "dotnet-ecommerce",
      title: "Çok Satıcılı (Multi-Vendor) .NET Backend",
      subtitle: "Temel seviye backend öğrenme projesi",
      desc: "Backend tarafını öğrenmek için geliştirdiğim temel seviye API projesi. Shopier modelinde; N-Tier (çok katmanlı) mimari, özel middleware katmanları ve token tabanlı kimlik doğrulama içeriyor.",
      longDesc:
        "Frontend odaklı çalışırken backend tarafını öğrenmek için geliştirdiğim, temel seviyede bir API projesi. Shopier modelinde, birden fazla satıcının ürün satabildiği bir e-ticaret altyapısı kurguladım. Proje N-Tier (çok katmanlı) mimariyle yapılandırıldı; özel middleware katmanları ve token tabanlı kimlik doğrulama içeriyor.",
      features: [
        "Shopier modelinde çok satıcılı (multi-vendor) e-ticaret API'si",
        "N-Tier (çok katmanlı) mimari",
        "Özel middleware katmanları",
        "Token tabanlı kimlik doğrulama",
      ],
      tech: [
        ".NET Core",
        "N-Tier Architecture",
        "Custom Middleware",
        "Token Auth",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/ECommarceDotNet",
        },
        {
          label: "LinkedIn Yazısı",
          url: "https://www.linkedin.com/posts/mehmet-ali-sevin%C3%A7-2a8521254_dotnet-csharp-softwarearchitecture-activity-7436463255025471488-KDvf/",
        },
      ],
      color: "from-indigo-500/20",
    },
    {
      id: 4,
      slug: "kriptografi-masaustu",
      title: "Masaüstü Kriptografi & Şifreleme Sistemleri",
      desc: "Şirket Bünyesinde — Electron framework'ü kullanılarak masaüstü platformu için geliştirilmiş; yüksek güvenlikli şifreleme algoritmaları, veri koruma katmanları ve performanslı arayüz yönetimi içeren kurumsal masaüstü çözümü.",
      longDesc:
        "Şirket bünyesinde, Electron ile masaüstü platformu için geliştirilen kurumsal bir çözüm. Uygulama; şifreleme algoritmaları ve veri koruma katmanlarını performanslı bir React arayüzüyle bir araya getiriyor.",
      features: [
        "Electron ile masaüstü uygulama",
        "Şifreleme algoritmaları ve veri koruma katmanları",
        "Performanslı arayüz yönetimi",
      ],
      tech: ["Electron", "React", "Node.js", "Crypto API"],
      links: [],
      color: "from-blue-500/20",
      internal: true,
    },
    {
      id: 3,
      slug: "filo-yonetim",
      title: "Kurumsal Filo Yönetim Platformu",
      desc: "Şirket Bünyesinde — İlk etapta yapay zekayla üretilmiş olan sayfa başına 1000+ satırlık monolitik yapıları, sıfırdan modüler bileşen mimarisine (Refactoring) taşıyarak render sağlığını ve performansını optimize ettim. Tasarımı ve animasyonları tamamen yenilerken; Google Maps API üzerindeki araç seyahat oynatımı ve harita takip senkronizasyon hatalarını kökten çözdüm.",
      longDesc:
        "Şirket bünyesinde yürütülen bir filo yönetim platformu. Projenin ilk sürümünde yapay zekayla üretilmiş, sayfa başına 1000 satırı aşan monolitik yapılar vardı. Bu sayfaları modüler bir bileşen mimarisine taşıyarak render performansını iyileştirdim. Tasarımı ve animasyonları yenilerken Google Maps API üzerindeki araç seyahat oynatımı ve harita takip senkronizasyonu hatalarını çözdüm.",
      features: [
        "1000+ satırlık monolitik sayfaların modüler bileşen mimarisine refactor edilmesi",
        "Render performansı optimizasyonu",
        "Tasarım ve animasyonların yenilenmesi",
        "Google Maps API üzerinde araç seyahat oynatımı ve harita takip senkronizasyonu düzeltmeleri",
      ],
      tech: [
        "React",
        "Google Maps API",
        "Code Refactoring",
        "Performance Optimization",
      ],
      links: [],
      color: "from-purple-500/20",
      internal: true,
    },
    {
      id: 5,
      slug: "realtime-paneller",
      title: "Real-Time Yönetim Panelleri & Mesajlaşma",
      desc: "Şirket Bünyesinde — Microsoft SignalR protokolü kullanılarak geliştirilmiş gerçek zamanlı (Real-time) zengin mesajlaşma altyapısı, dinamik ihale sayfaları, Entegra süreçleri ve veri yoğunluklu kurumsal paneller.",
      longDesc:
        "Şirket bünyesinde geliştirilen gerçek zamanlı kurumsal paneller. Microsoft SignalR ile çalışan zengin bir mesajlaşma altyapısı, dinamik ihale sayfaları, Entegra süreçleri ve veri yoğunluklu yönetim ekranları.",
      features: [
        "SignalR ile gerçek zamanlı zengin mesajlaşma",
        "Dinamik ihale sayfaları",
        "Entegra süreçleri",
        "Veri yoğunluklu kurumsal yönetim panelleri",
      ],
      tech: ["React", "SignalR", "TypeScript", "Radix UI / MUI"],
      links: [],
      color: "from-emerald-500/20",
      internal: true,
    },
    {
      id: 8,
      slug: "mas-portfolio",
      title: "MAS. Portfolio",
      desc: "Şu an incelediğiniz sistem. Framer Motion ve React ile minimalist 'Apple-tarzı' estetik ve glassmorphism detaylarıyla tasarlanmış, 3 farklı premium mod sunan 'Zen' odaklı portfolyo mimarisi.",
      longDesc:
        "Şu an incelediğiniz site. İkiz kardeşimle ortak bir çatı altında iki ayrı profil sunan bir portfolyo. React ve Framer Motion ile geliştirildi; minimalist bir estetik ve glassmorphism detaylarıyla Vizyon, Bento ve Zen olmak üzere üç farklı görünüm modu sunuyor.",
      features: [
        "Vizyon, Bento ve Zen olmak üzere 3 görünüm modu",
        "İki profil (MAS / DAS) için ortak mimari",
        "Framer Motion ile animasyonlar ve mod geçişleri",
        "Proje detay sayfaları",
      ],
      tech: ["React", "Framer Motion", "Tailwind"],
      links: [
        {
          label: "LinkedIn Yazısı",
          url: "https://www.linkedin.com/posts/mehmet-ali-sevin%C3%A7-2a8521254_reactjs-frontend-webdevelopment-ugcPost-7464672814323843072-rJwR/",
        },
      ],
      color: "from-zinc-500/20",
    },
  ],
  das: [
    {
      id: 1,
      slug: "sarissa-bisiklet-e-ticaret-ekosistemi",
      title: "Sarissa Bisiklet E-Ticaret Ekosistemi",
      desc: "React ve Node.js mimarisiyle uçtan uca geliştirdiğim, performans odaklı devasa bir e-ticaret ekosistemi. Backend süreçlerini derinlemesine kurgulayarak; Entegra API'den gelen verilerle veritabanı (DB) kayıtlarını milisaniyeler içinde kusursuzca birleştirdim. Hepsiburada çift taraflı anlık stok senkronizasyonu, Iyzico ödeme altyapısı ve Müşteri, Admin, Bayi olmak üzere 3 farklı bağımsız dinamik fiyatlandırma panelinin sıfırdan inşası.",
      longDesc:
        "React ve Node.js ile uçtan uca geliştirdiğim, performans odaklı bir e-ticaret sistemi. Backend tarafında Entegra API'den gelen verileri veritabanı kayıtlarıyla birleştiren süreçleri kurguladım. Sistem; Hepsiburada ile çift taraflı anlık stok senkronizasyonu, iyzico ödeme altyapısı ve müşteri, admin, bayi olmak üzere üç ayrı panel içeriyor.",
      features: [
        "Entegra API verilerinin veritabanı kayıtlarıyla birleştirilmesi",
        "Hepsiburada ile çift taraflı anlık stok senkronizasyonu",
        "iyzico ödeme altyapısı",
        "Müşteri, Admin ve Bayi olmak üzere 3 bağımsız panel ve dinamik fiyatlandırma",
      ],
      tech: ["React (JSX)", "Node.js", "Entegra API", "iyzico", "Tailwind"],
      links: [{ label: "Canlı Site", url: "https://www.sarissabisiklet.com/" }],
      color: "from-cyan-500/20",
    },
    {
      id: 2,
      slug: "npm-core-ortak-auth-login-kutuphanesi",
      title: "NPM Core: Ortak Auth & Login Kütüphanesi",
      desc: "Üç farklı büyük ölçekli projenin kimlik doğrulama altyapısını tek merkezden yönetmek amacıyla sıfırdan kurgulayıp NPM üzerinde yayınladığım ortak login paketi. Tüm güvenlik parametrelerini, token yönetimini ve kullanıcı verilerini yüksek hassasiyetle işleyerek sistemler arası kusursuz bir entegrasyon sağladım.",
      longDesc:
        "Üç farklı projenin kimlik doğrulama altyapısını tek merkezden yönetmek için sıfırdan kurgulayıp NPM üzerinde yayınladığım ortak login paketi. Güvenlik parametreleri, token yönetimi ve kullanıcı verileri paket içinde ele alınarak projeler arası tutarlı bir entegrasyon sağlandı.",
      features: [
        "Üç projede ortak kullanılan login / auth paketi",
        "NPM üzerinde yayınlanan paket yapısı",
        "Token yönetimi ve güvenlik parametreleri",
      ],
      tech: ["NPM Package", "Auth Architecture", "TypeScript", "Security"],
      links: [],
      color: "from-fuchsia-500/20",
    },
    {
      id: 3,
      slug: "iot-fatura-gercek-zamanli-veri-terminalleri",
      title: "IoT Fatura & Gerçek Zamanlı Veri Terminalleri",
      desc: "Şirket Bünyesinde — Sahadaki IoT cihazlarından ve fatura kesim terminallerinden akan anlık verilerin (Real-time) işlendiği kurumsal veri yönetim sistemi. Saniyelik veri akışlarında render darboğazlarını önlemek için Zustand ve Redux Toolkit gibi state management yapılarını mikro düzeyde optimize ederek maksimum hız ve performans elde ettim.",
      longDesc:
        "Şirket bünyesinde geliştirilen, sahadaki IoT cihazlarından ve fatura kesim terminallerinden gelen anlık verilerin işlendiği kurumsal bir veri yönetim sistemi. Saniyelik veri akışlarında render darboğazlarını önlemek için Zustand ve Redux Toolkit ile state yönetimini optimize ettim.",
      features: [
        "IoT cihazları ve fatura terminallerinden gerçek zamanlı veri akışı",
        "Zustand ve Redux Toolkit ile state yönetimi optimizasyonu",
        "Yüksek frekanslı veride render darboğazlarının önlenmesi",
      ],
      tech: ["React", "Redux Toolkit", "IoT Data Flow", "Performance Opt."],
      links: [],
      color: "from-orange-500/20",
      internal: true,
    },
    {
      id: 4,
      slug: "dijital-kurumsal-kartvizit-platformu",
      title: "Dijital Kurumsal Kartvizit Platformu",
      desc: "Şirket Bünyesinde — Modern web teknolojileri kullanılarak geliştirilmiş kurumsal dijital kartvizit uygulaması. Şirket içi kullanıcıların kurumsal kimliklerini hızlı ve prestijli bir şekilde paylaşabilmesi için sıfır gecikmeli, mobil uyumlu ve yüksek UX standartlarına sahip şık bir arayüz inşa ettim.",
      longDesc:
        "Şirket bünyesinde geliştirilen kurumsal dijital kartvizit uygulaması. Çalışanların kurumsal kimliklerini hızlıca paylaşabilmesi için mobil uyumlu ve sade bir arayüz tasarladım.",
      features: [
        "Kurumsal dijital kartvizit paylaşımı",
        "Mobil uyumlu arayüz",
        "UX odaklı sade tasarım",
      ],
      tech: ["React / Next.js", "UI/UX Design", "Tailwind", "Responsive"],
      links: [],
      color: "from-teal-500/20",
      internal: true,
    },
    // {
    //   id: 5,
    //   title: "DAS. Portfolio",
    //   desc: "Şu an incelediğiniz sistem. Framer Motion ve React ile minimalist 'Apple-tarzı' estetik ve glassmorphism detaylarıyla tasarlanmış, 3 farklı premium mod sunan 'Zen' odaklı portfolyo mimarisi.",
    //   tech: ["React", "Framer Motion", "Tailwind", "Clean Architecture"],
    //   link: "#",
    //   color: "from-zinc-500/20",
    // },
  ],
};

export const isProfileId = (value: string | undefined): value is ProfileId =>
  value === "mas" || value === "das";

export const getProject = (profileId: ProfileId, slug: string | undefined) =>
  projectsData[profileId].find((p) => p.slug === slug);
