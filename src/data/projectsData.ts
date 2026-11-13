export interface ProjectLink {
  label: string;
  url: string;
}

/**
 * Projenin ana sayfadaki yeri:
 * - featured: işe alımcının ilk göreceği en iyi 3 iş (hero + projelerin başı)
 * - main: diğer profesyonel / ürün işleri
 * - archive: eski ve öğrenme projeleri (kompakt listede)
 * Alan yoksa "main" sayılır.
 */
export type ProjectTier = "featured" | "main" | "archive";

export interface Project {
  id: number;
  /** URL'de kullanılan sabit kimlik: /<profil>/proje/<slug> */
  slug: string;
  title: string;
  subtitle?: string;
  /** Kısa tür etiketi: "Kurumsal · İK", "AI ajanı" gibi */
  kind?: string;
  /** Çözülen problem: tek cümle */
  problem?: string;
  /** Kartlarda görünen kısa açıklama: "ne yaptım" */
  desc: string;
  /** Detay sayfasındaki uzun açıklama */
  longDesc: string;
  features: string[];
  tech: string[];
  links: ProjectLink[];
  color: string;
  role?: string;
  period?: string;
  /** Örn. "Devam ediyor · Hafta 1" */
  status?: string;
  tier?: ProjectTier;
  /** Yapay zeka (Claude Code) ile geliştirildi */
  aiBuilt?: boolean;
  /** Elle yazılmaya başlandı (aiBuilt ile birlikte: "Elle + AI") */
  handBuilt?: boolean;
  /** Konusu AI ajanı / LLM olan proje ("AI ile çalışma şeklim" bölümünde listelenir) */
  aiAgent?: boolean;
  /** Şirket içi proje — canlı link / ekran görüntüsü yok */
  internal?: boolean;
  /**
   * Çalışırken yapılan iş: "Deneyim" bölümünde şirketin altında listelenir,
   * proje listelerinde ayrıca tekrar edilmez (öne çıkan değilse)
   */
  company?: string;
  /** Canlıda gezilebilen iş: "Canlıdaki Projeler" bölümünde gösterilir */
  /**
   * Canlıda gezilebilen iş: "Canlıdaki Projeler" bölümünde gösterilir.
   * years: git geçmişinden (ilk/son commit), uydurma değil
   */
  live?: { url: string; host: string; image: string; years?: string };
}

export type ProfileId = "mas" | "das";

export const projectsData: Record<ProfileId, Project[]> = {
  mas: [
    // ------------------------------------------------------------------
    // ÖNE ÇIKAN 3 İŞ
    // ------------------------------------------------------------------
    {
      id: 1,
      slug: "jollin",
      title: "Jollin",
      subtitle: "Etkinlik ve deneyim platformu: web ve organizatör paneli",
      kind: "Ürün · ekip projesi",
      tier: "featured",
      live: {
        url: "https://jollin.com.tr/",
        host: "jollin.com.tr",
        image: "/projects/canli/jollin.webp",
        // web-app: ilk commit Ocak 2026, sürüyor; organizatör paneli Ağustos 2026'dan beri
        years: "2026 – devam ediyor",
      },
      problem:
        "Etkinlik, deneyim ve kulüpler farklı yerlere dağılmış durumda; kullanıcı keşfedip bilet alacağı tek bir yer, organizatör de etkinliğini yöneteceği bir panel istiyor.",
      desc: "Arkadaşlarımla geliştirdiğimiz platformda web frontend'inin ve organizatör panelinin büyük kısmını geliştirdim: etkinlik keşfi, biletleme ve sepet akışları, ana sayfa animasyonları. Elle başladık, bugün Claude Code ile AI destekli sürdürüyorum.",
      longDesc:
        "Jollin; etkinlik, deneyim, eğlence ve kulüpleri tek çatı altında toplayan bir keşif ve biletleme platformu. Arkadaşlarımla birlikte geliştirdiğimiz bir ekip projesi; ben web frontend'inin ve organizatör panelinin büyük kısmını geliştirdim. Web uygulaması yapay zeka kodlama araçları yaygınlaşmadan önce elle yazılmaya başlandı; bugün geliştirmeye Claude Code ile yapay zeka destekli olarak devam ediyorum. Next.js tarafında etkinlik keşfi, dinamik biletleme ve sepet akışlarını geliştirdim, yapay zeka entegrasyonlarının arayüz tarafını yaptım. Ana sayfadaki animasyonları Figma ve Jitter ile tasarlayıp arayüze entegre ettim.",
      features: [
        "Etkinlik, deneyim ve kulüp keşfi; şehre göre listeleme",
        "Dinamik biletleme akışı ve sepet yönetimi",
        "Organizatör paneli (React + Vite)",
        "Yapay zeka entegrasyonlarının arayüz tarafı",
        "Figma ve Jitter ile tasarlanan ana sayfa animasyonları",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind",
        "Vite",
        "Claude Code",
      ],
      links: [{ label: "Canlı Site", url: "https://jollin.com.tr/" }],
      color: "from-orange-500/20",
      role: "Frontend geliştirici · ekip projesi",
      aiBuilt: true,
      handBuilt: true,
    },
    {
      id: 9,
      slug: "mini-erp",
      title: "Mini-ERP",
      subtitle: "Çok şirketli personel, vardiya ve bordro yönetimi",
      kind: "Kurumsal · ERP",
      tier: "featured",
      problem:
        "Birden fazla şirketi olan işletmelerde personel, vardiya, puantaj, izin ve bordro çoğu zaman dağınık Excel dosyalarında tutuluyor; şirketler arası tutarlı ve denetlenebilir bir görünüm olmuyor.",
      desc: "Personel, vardiya, puantaj, izin, Türk bordrosu, cari hesap ve gelir-gideri tek masaüstü uygulamada topladım. Her şirketin verisi ayrı tutuluyor, istenirse hepsi tek ekranda görülüyor. Claude Code ile uçtan uca geliştirdim.",
      longDesc:
        "Birden fazla şirketi tek uygulamadan yöneten, Electron tabanlı bir masaüstü ERP. İK tarafında personel, vardiya planlama, puantaj ve izin yönetimini; finans tarafında kıst gün dahil Türk bordro hesaplamasını, cari hesapları ve gelir-gideri kapsıyor. Her şirketin verisi birbirinden izole (testlerle doğrulanmış multi-tenant yapı); istenirse tüm şirketler konsolide görünümde izlenebiliyor. Backend .NET Clean Architecture ile yazıldı. Çok kullanıcılı sürüm için Docker ve Caddy ile hazır bir sunucu kurulumu, demo için ise sunucusuz, tek tık kurulan bir paket var. Geliştirmeyi önce planlayıp birbirinden bağımsız parçalara böldüm; her parçayı ayrı bir Claude Code ajanına yazdırdım, Vitest ve xUnit testleriyle doğrulayıp birleştirdim.",
      features: [
        "Personel (İK), vardiya planlama, puantaj ve izin yönetimi; izin talepleri için onay akışı",
        "Kıst gün dahil Türk bordro hesaplaması",
        "Cari hesaplar ve gelir-gider takibi",
        "Çok şirketli yapı: şirket bazlı veri izolasyonu (multi-tenant, testlerle doğrulanmış) ve konsolide görünüm",
        "Excel / CSV içe aktarma; Excel verisinden sürükle-bırak rapor ve sayfa oluşturucu (grafik widget'ları)",
        "Denetim kaydı (audit log), çöp kutusu, JSON yedekleme ve uygulama içi ürün turu",
        "Sunucusuz demo paketi: gömülü .NET API, yerel SQLite, tek tık kurulum",
        "Sunucu sürümü için Docker + Caddy (HTTPS) kurulumu, JWT kimlik doğrulama ve giriş denemelerinde rate limit",
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
        "Vitest / xUnit",
      ],
      links: [
        { label: "GitHub", url: "https://github.com/sevincmehmet/mini-erp" },
        {
          label: "Windows Demo",
          url: "https://github.com/sevincmehmet/mini-erp/releases/tag/v0.1.0-demo",
        },
      ],
      color: "from-amber-500/20",
      role: "Tek geliştirici · kişisel proje",
      aiBuilt: true,
    },
    {
      id: 13,
      slug: "org-tree-asistani",
      title: "Org Tree Asistanı",
      subtitle:
        "Yetkisi kodda, kritik işlemi insan onayında olan iki ajanlı asistan",
      kind: "AI ajanı",
      tier: "featured",
      aiAgent: true,
      problem:
        'Bir organizasyon asistanına "şu kişiyi bul, ekibini taşı, talebi onayla" dendiğinde modelin yetkisini aşmaması, gizli veriyi sızdırmaması ve kritik işlemleri sormadan yapmaması gerekiyor.',
      desc: "İşi iki küçük ajana böldüm: Yönetici Asistanı ve Çalışan Asistanı. Her birinin belli araçları ve kapsamı var. Yetki kontrolü prompt'ta değil kodda; ekip taşıma ve talep gönderme gibi işlemler insan onayı olmadan çalışmıyor.",
      longDesc:
        "Detaysoft'ta hiyerarşiye göre yetkilendirilen org tree arayüzleri geliştirmiştim; bu projede aynı problemi yapay zeka ajanlarıyla ele aldım. Google ADK ile yazılmış iki ajan var: Yönetici Asistanı kişi buluyor, raporlama zincirini gösteriyor, ekip taşıyor ve gelen talepleri onaylıyor; Çalışan Asistanı talebi taslaklayıp araç içinde çalışan küçük bir triyaj ajanıyla doğru yöneticiye yönlendiriyor. Yetki kontrolü before_tool_callback'te: model ne kadar ikna edilirse edilsin kapsam dışı araç çalışmıyor. Yazma işlemleri require_confirmation ile insan onayı bekliyor ve işlem kaydından geri alınabiliyor. Gerçek modele karşı küçük bir güvenlik eval'i yazdım (9 saldırı/kontrol vakası): model isim sızdırmadı ama gizlenen bir sayıyı uydurdu; araç cevabını düzelterek giderdim. Eval küçük ve çok turlu konuşmalar henüz kapsam dışı. Örnek organizasyon tamamen uydurma 18 kişiden oluşuyor.",
      features: [
        "İki ajan + araç içinde çalışan triyaj ajanı: her ajan yalnızca kendi araçlarına erişiyor (en az yetki)",
        "before_tool_callback ile kodda hiyerarşik yetki kontrolü: arayüz gizler, kod engeller",
        "require_confirmation ile insan onayı; işlem kaydından geri alma",
        "Gerçek Gemini modeline karşı küçük saldırı/sızıntı eval'i + LLM'siz araç testleri",
        'Araç çağrılarına canlı tepki veren React + d3-hierarchy ağaç arayüzü ve "ajan nasıl düşündü" zaman çizelgesi',
        "Backend ve API anahtarı olmadan denenebilen mock modu; ADK kavramlarını anlatan 8 derslik öğrenme paneli",
      ],
      tech: [
        "Google ADK",
        "Gemini",
        "Python",
        "React 19",
        "TypeScript",
        "Tailwind",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/org-tree-asistani",
        },
      ],
      color: "from-emerald-500/20",
      role: "Tek geliştirici · kişisel proje",
      aiBuilt: true,
    },
    {
      id: 10,
      slug: "personel-yonetim-sistemi",
      title: "Kurumsal Personel Yönetim Sistemi",
      subtitle: "Organizasyon ağacı, raporlama ve yetkiye göre değişen arayüz",
      kind: "Kurumsal · İK",
      tier: "main",
      company: "detaysoft",
      problem:
        "İç içe departmanları ve yönetici–çalışan ilişkileri olan kurumsal bir yapıda, her yöneticinin yalnızca kendi ekibinin verisini görmesi, düzenlemesi ve raporlayabilmesi gerekiyordu.",
      desc: "Organizasyon ağacını, personel detay ve departman atama ekranlarını, şirket ve personel bazlı filtrelenen raporlama ekranlarını ve hiyerarşiye göre değişen arayüzü geliştirdim (frontend).",
      longDesc:
        "Detaysoft bünyesinde geliştirilen kurumsal bir personel yönetim sistemi. Projede frontend tarafında çalıştım. İç içe departmanlar ve yönetici–çalışan ilişkilerinden oluşan organizasyon ağacını gösteren arayüzü, personel detay ve departman atama ekranlarını ve şirket / personel bazlı filtrelenebilen, veri yoğun raporlama ekranlarını geliştirdim. Arayüz hiyerarşiye ve role göre şekilleniyor: bir yönetici yalnızca kendi ekibini görüyor, yetkisi olmayan ekran ve aksiyonlar gösterilmiyor. Asıl yetki kontrolü backend'deydi; frontend'deki gizleme kullanıcı deneyimi için.",
      features: [
        "İç içe departmanlar ve yönetici–çalışan ilişkilerinden oluşan organizasyon ağacı (org tree) arayüzü",
        "Personel detay ve departman atama ekranları",
        "Şirket ve personel bazlı gelişmiş filtreleme / arama ile veri yoğun raporlama ekranları",
        "Hiyerarşi ve role göre değişen ekranlar ve aksiyonlar (yönetici yalnızca kendi ekibini görür)",
      ],
      tech: ["React", "TypeScript", "MUI / Radix UI"],
      links: [],
      color: "from-sky-500/20",
      role: "Frontend Developer · Detaysoft",
      period: "2022 – 2026",
      internal: true,
    },

    // ------------------------------------------------------------------
    // DİĞER PROFESYONEL VE ÜRÜN İŞLERİ
    // ------------------------------------------------------------------
    {
      id: 12,
      slug: "pano",
      title: "Pano",
      subtitle: "Claude Code ajanlarını tek pencereden yöneten masaüstü aracı",
      kind: "AI geliştirici aracı",
      tier: "main",
      aiAgent: true,
      problem:
        "Bir işi birden fazla Claude Code ajanına bölüp paralel yürütürken, ayrı terminal pencerelerinde hangi ajanın ne yaptığını ve kimin onay beklediğini takip etmek zorlaşıyor.",
      desc: "Ajanları üst/alt ilişkisiyle bir ağaçta, her birini kendi gömülü terminaliyle tek pencerede gösteren bir Electron uygulaması yazdım. Durumlar (çalışıyor, onay bekliyor, bitti, hata) anlık izleniyor. Kendi kullanımım için geliştirdim.",
      longDesc:
        "Claude Code ile çalışırken işi önce planlayıp birbirinden bağımsız parçalara bölüyor, her parçayı ayrı bir ajana yazdırıyorum. Pano, bu paralel çalışma şeklini tek pencereden yönetmek için kendi kullanımıma yönelik geliştirdiğim bir Electron uygulaması; kendisi de Claude Code ile geliştirildi. Ajanlar, kimin hangi ajanın altında açıldığını gösteren yakınlaştırılabilir bir ağaçta duruyor. Her ajanın gömülü bir terminali var, durumları anlık izleniyor ve onay bekleyen ajan için masaüstü bildirimi geliyor.",
      features: [
        "Ajan hiyerarşi ağacı: üst/alt ajan ilişkileri, sürükleyerek gezme, yakınlaştırma ve sığdırma",
        "Her ajan için node-pty + xterm.js ile gömülü terminal; tam ekran ve gizle modları, ⌘1–9 kısayolları",
        "pano komut satırı aracı: ajanlar kendi alt ajanlarını açabiliyor, birbirine mesaj gönderebiliyor (yerel, jetonla korunan HTTP API)",
        "Claude Code hook'larıyla anlık durum takibi ve onay bekleyen ajan için masaüstü bildirimi",
        "Terminal'de açık Claude oturumlarını konuşma geçmişiyle birlikte kaldığı yerden Pano'ya taşıma",
      ],
      tech: [
        "Electron",
        "Node.js",
        "node-pty",
        "xterm.js",
        "Claude Code Hooks",
      ],
      links: [{ label: "GitHub", url: "https://github.com/sevincmehmet/pano" }],
      color: "from-violet-500/20",
      role: "Tek geliştirici · kişisel kullanım aracı",
      aiBuilt: true,
    },
    {
      id: 5,
      slug: "realtime-paneller",
      title: "Gerçek Zamanlı Yönetim Panelleri",
      subtitle:
        "SignalR ile mesajlaşma, ihale sayfaları ve veri yoğun paneller",
      kind: "Kurumsal · Gerçek zamanlı",
      tier: "main",
      company: "detaysoft",
      problem:
        "Veri yoğun yönetim ekranlarında kullanıcıların sayfayı yenilemeden anlık mesajları ve güncellemeleri görmesi gerekiyordu.",
      desc: "Microsoft SignalR ile gerçek zamanlı mesajlaşma altyapısının arayüzünü, dinamik ihale sayfalarını, Entegra süreç ekranlarını ve veri yoğun yönetim panellerini geliştirdim.",
      longDesc:
        "Detaysoft bünyesinde geliştirilen gerçek zamanlı kurumsal paneller. Microsoft SignalR ile çalışan zengin bir mesajlaşma altyapısının arayüzünü, dinamik ihale sayfalarını, Entegra pazaryeri süreç ekranlarını ve veri yoğun yönetim ekranlarını geliştirdim.",
      features: [
        "SignalR ile gerçek zamanlı zengin mesajlaşma",
        "Dinamik ihale sayfaları",
        "Entegra pazaryeri süreç ekranları",
        "Veri yoğun kurumsal yönetim panelleri",
      ],
      tech: ["React", "TypeScript", "SignalR", "Radix UI / MUI"],
      links: [],
      color: "from-teal-500/20",
      role: "Frontend Developer · Detaysoft",
      period: "2022 – 2026",
      internal: true,
    },
    {
      id: 3,
      slug: "filo-yonetim",
      title: "Kurumsal Filo Yönetim Platformu",
      subtitle:
        "Yapay zekayla üretilmiş monolitik kodun yeniden yapılandırılması",
      kind: "Kurumsal · Refactoring",
      tier: "main",
      company: "artersoft",
      problem:
        "25–30 sayfalık bir filo yönetim platformunda, yapay zekayla üretilmiş ve sayfa başına 1700 satıra ulaşan monolitik kod bakımı ve yeni özellik eklemeyi zorlaştırıyordu.",
      desc: "Kodu feature-based mimariye göre baştan yazdım, sidebar'ı kalıcı (persistent) layout'a taşıyarak gereksiz render'ları giderdim ve Google Maps üzerindeki seyahat oynatımı ile canlı takipteki senkronizasyon hatalarını çözdüm.",
      longDesc:
        "Artersoft'ta çalıştığım kurumsal bir filo yönetim platformu. Projenin ilk sürümü yapay zekayla üretilmişti; sayfa başına 1700 satıra ulaşan monolitik dosyalar vardı. Bu kodu feature-based mimariye göre baştan yazarak ölçeklenebilirliği ve sürdürülebilirliği iyileştirdim. Her sayfa geçişinde yeniden oluşturulan sidebar'ı kalıcı bir layout'a taşıyarak gereksiz render'ları ve menü durumunun sıfırlanması sorununu ortadan kaldırdım. Platformun arayüz tasarımını ve animasyonlarını yeniledim; Google Maps API üzerindeki araç seyahat geçmişi oynatımı ve canlı harita takibindeki senkronizasyon hatalarını çözdüm.",
      features: [
        "Sayfa başına 1700 satıra ulaşan monolitik kodun feature-based mimariye taşınması",
        "Sidebar'ın kalıcı layout'a taşınması: gereksiz render'lar ve menü durumunun sıfırlanması giderildi",
        "Arayüz tasarımı ve animasyonların yenilenmesi",
        "Google Maps API üzerinde seyahat geçmişi oynatımı ve canlı takip senkronizasyonu düzeltmeleri",
      ],
      tech: ["React", "TypeScript", "Google Maps API"],
      links: [],
      color: "from-purple-500/20",
      role: "Frontend Developer & UI/UX Designer · Artersoft",
      period: "2026",
      internal: true,
    },
    {
      id: 2,
      slug: "sarissa-bisiklet",
      title: "Sarissa Bisiklet",
      subtitle: "Müşteri, admin ve bayi panelli e-ticaret",
      kind: "E-ticaret · freelance",
      tier: "main",
      company: "sarissa",
      live: {
        url: "https://www.sarissabisiklet.com/",
        host: "sarissabisiklet.com",
        image: "/projects/canli/sarissa.webp",
        // sarrissa-web: commit'lerin çoğu Haziran–Kasım 2025, 2026'da küçük güncellemeler
        years: "2025 – 2026",
      },
      problem:
        "Bir bisiklet markası hem son kullanıcıya hem bayilerine satış yapıyor; ödeme almak, bayiye özel fiyat vermek ve stokları pazaryerleriyle senkron tutmak istiyordu.",
      desc: "Müşteri, admin ve bayi olmak üzere 3 ayrı panele sahip e-ticaret sitesini geliştirdim: iyzico ödeme, Entegra ile Hepsiburada gibi pazaryerleriyle çift yönlü stok senkronizasyonu ve bayiye özel dinamik fiyatlandırma.",
      longDesc:
        "Bir bisiklet markası için React ile geliştirdiğim B2C/B2B e-ticaret sitesi. Ödemeler iyzico üzerinden alınıyor; Entegra entegrasyonu sayesinde Hepsiburada gibi pazaryerleriyle stoklar çift yönlü ve anlık olarak senkronize ediliyor. Sistem müşteri, admin ve bayi olmak üzere üç ayrı panelden oluşuyor; bayi panelinde her bayiye özel dinamik fiyatlandırma uygulanıyor.",
      features: [
        "iyzico ödeme entegrasyonu",
        "Entegra ile Hepsiburada gibi pazaryerleriyle çift yönlü anlık stok senkronizasyonu",
        "Müşteri, Admin ve Bayi olmak üzere 3 bağımsız panel",
        "Her bayiye özel dinamik fiyatlandırma",
      ],
      tech: ["React", "JavaScript", "Tailwind", "iyzico API", "Entegra API"],
      links: [{ label: "Canlı Site", url: "https://www.sarissabisiklet.com/" }],
      color: "from-cyan-500/20",
      role: "Freelance Frontend Developer",
    },
    {
      id: 14,
      slug: "ai-lab",
      title: "ai-lab",
      subtitle: "12 haftalık LLM ve AI agent laboratuvarı",
      kind: "AI · öğrenme",
      tier: "main",
      aiAgent: true,
      status: "Devam ediyor · Hafta 1, 2. gün",
      problem:
        "Frontend'den LLM tabanlı ürün geliştirmeye geçmek için Python, LLM API, tool use ve eval konularını sistemli ve ölçülebilir şekilde öğrenmem gerekiyor.",
      desc: "12 haftalık bir planla, her haftayı ayrı klasörde ve testleriyle GitHub'a koyuyorum. Hedef: tool kullanan bir etkinlik asistanı yazıp eval ile ölçmek. Hafta 1'in ilk iki günü bitti: koleksiyonlar, comprehension, type hint, dataclass, modüller ve pytest. Sırada hata yönetimi ve async.",
      longDesc:
        "AI Product Engineer yönüne geçerken yaptığım bütün çalışmaları topladığım, haftalara göre klasörlenmiş public bir laboratuvar. Plan dört fazdan oluşuyor: temeller (Python, LLM API, tool use, streaming arayüz, MCP), etkinlik asistanı, eval ve ölçüm, paketleme. Python'u bu projede öğreniyorum; şu an Hafta 1'deyim (Pazartesi ve Salı tamam, sırada Çarşamba: hata yönetimi ve async/httpx). Sonraki haftalar tamamlandıkça bu sayfa güncellenecek.",
      features: [
        "Hafta 1, Pazartesi–Salı (tamam): Python koleksiyonları, comprehension, *args/**kwargs, type hint, dataclass, modüller ve pytest testleri; JS → Python farkları notu",
        "Hafta 1, sırada: hata yönetimi, context manager ve async/await (httpx), ardından Pydantic ve FastAPI",
        "Paket iskeleti: Event modeli, örnek etkinlik verisi ve arama fonksiyonları (src/ai_lab)",
        "Plan: LLM API ve tool use → streaming arayüz ve MCP → etkinlik asistanı → eval ile önce/sonra ölçümü",
      ],
      tech: ["Python", "uv", "pytest"],
      links: [
        { label: "GitHub", url: "https://github.com/sevincmehmet/ai-lab" },
      ],
      color: "from-lime-500/20",
      role: "Kişisel öğrenme projesi",
    },

    // ------------------------------------------------------------------
    // ARŞİV: ESKİ VE ÖĞRENME PROJELERİ
    // ------------------------------------------------------------------
    {
      id: 7,
      slug: "dotnet-ecommerce",
      title: "Çok Satıcılı E-Ticaret API'si (.NET)",
      subtitle: "Temel seviye backend öğrenme projesi",
      kind: "Backend · öğrenme",
      tier: "archive",
      problem:
        "Frontend ağırlıklı çalışırken backend tarafını, yetkilendirme ve katmanlı mimariyi uygulayarak öğrenmek istedim.",
      desc: "Shopier modelinde, birden fazla satıcının ürün satabildiği bir REST API. Katmanlı mimari, JWT ve izin tabanlı yetki içeriyor.",
      longDesc:
        "Backend tarafını öğrenmek için geliştirdiğim, temel seviyede bir API projesi. Shopier modelinde, birden fazla satıcının ürün satabildiği bir e-ticaret altyapısı kurguladım. Proje katmanlı (N-Tier) mimariyle ve Dependency Injection ile yapılandırıldı. IAuthorizationPolicyProvider ile dinamik yetkilendirme ve özel middleware kurarak yetkisiz istekleri controller'a ulaşmadan 403 ile reddettim; IDOR açığını önlemek için kullanıcı kimliğini yalnızca JWT claim'lerinden okudum.",
      features: [
        "Shopier modelinde çok satıcılı (multi-vendor) e-ticaret API'si",
        "Katmanlı mimari (Entities, DataAccess, Business, Infrastructure, API) ve Dependency Injection",
        "İzin tabanlı dinamik yetkilendirme ve özel middleware",
        "JWT kimlik doğrulama; kullanıcı kimliği yalnızca token claim'lerinden okunuyor",
      ],
      tech: [".NET 8", "C#", "ASP.NET Web API", "SQL Server", "JWT", "Docker"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/ECommerceDotNet",
        },
        {
          label: "LinkedIn Yazısı",
          url: "https://www.linkedin.com/posts/mehmet-ali-sevin%C3%A7-2a8521254_dotnet-csharp-softwarearchitecture-activity-7436463255025471488-KDvf/",
        },
      ],
      color: "from-indigo-500/20",
      role: "Kişisel öğrenme projesi",
    },
    {
      id: 4,
      slug: "kriptografi-masaustu",
      title: "Masaüstü Kriptografi Uygulaması",
      subtitle: "Electron ile kurumsal masaüstü uygulaması",
      kind: "Kurumsal · Masaüstü",
      tier: "main",
      company: "detaysoft",
      problem:
        "Kurumsal kullanıcıların verilerini masaüstünde şifreleyip koruyabileceği bir uygulamaya ihtiyaç vardı.",
      desc: "Electron, React ve Node.js ile şifreleme ve veri koruma katmanları içeren kurumsal bir masaüstü uygulamasında arayüz tarafını geliştirdim.",
      longDesc:
        "Detaysoft bünyesinde, Electron ile masaüstü platformu için geliştirilen kurumsal bir uygulama. Şifreleme ve veri koruma katmanlarını bir React arayüzüyle bir araya getiriyor.",
      features: [
        "Electron ile masaüstü uygulama",
        "Şifreleme ve veri koruma katmanları",
        "React ile arayüz",
      ],
      tech: ["Electron", "React", "Node.js", "Crypto API"],
      links: [],
      color: "from-blue-500/20",
      role: "Frontend Developer · Detaysoft",
      internal: true,
    },
    {
      id: 6,
      slug: "smart-plug",
      title: "Akıllı Priz ve Aydınlatma (IoT)",
      subtitle: "React Native + MQTT mobil uygulama",
      kind: "Mobil · IoT",
      tier: "archive",
      problem:
        "Akıllı prizleri ve oda aydınlatmasını telefondan, gecikmesiz kontrol etmek.",
      desc: "React Native (Expo) ile, MQTT üzerinden donanımla anlık haberleşen ve priz / ışık kontrolü sağlayan bir mobil uygulama geliştirdim.",
      longDesc:
        "React Native (Expo) ile geliştirilmiş bir mobil IoT uygulaması. MQTT protokolü üzerinden donanımla anlık haberleşerek akıllı prizlerin ve oda aydınlatmasının uzaktan kontrol edilmesini sağlıyor.",
      features: [
        "MQTT ile donanımla anlık haberleşme",
        "Akıllı priz ve uzaktan oda aydınlatma kontrolü",
        "React Native (Expo) ile mobil arayüz",
      ],
      tech: ["React Native", "Expo", "MQTT"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/smart-plug-app",
        },
      ],
      color: "from-rose-500/20",
    },
    {
      id: 15,
      slug: "depresyon-tahmini",
      title: "Depresyon Tahmini: Model Karşılaştırması",
      subtitle: "5 ML modeli, Flask API ve React arayüz",
      kind: "ML · öğrenme",
      tier: "archive",
      problem:
        "Aynı veri setinde farklı makine öğrenmesi modellerinin ne kadar farklı sonuç verdiğini uçtan uca bir uygulamada görmek.",
      desc: "Beş modeli (LR, RF, SVM, XGBoost, KNN) aynı veri setinde eğitip karşılaştıran, sonucu Flask API ve React arayüzle sunan eğitim amaçlı bir proje.",
      longDesc:
        "Eğitim amaçlı bir proje; tıbbi bir teşhis aracı değil. Yaklaşık 27.900 satırlık öğrenci depresyonu veri setini temizleyip beş modeli scikit-learn ile eğittim ve test setinde karşılaştırdım. Flask API kayıtlı modellerin tahminlerini döndürüyor, React + TypeScript arayüz bunları yan yana gösteriyor. Sonuç: en basit model (Logistic Regression, %84,47) karmaşık modellerle aynı seviyede kaldı.",
      features: [
        "Veri temizleme ve kategorik sütunların sayısallaştırılması",
        "Beş modelin aynı test setinde karşılaştırılması (Logistic Regression %84,47 ile en iyi)",
        "Flask API ile tahmin uç noktası, React + TypeScript arayüz",
      ],
      tech: ["Python", "scikit-learn", "Flask", "React", "TypeScript"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/Depresyon-tahmini-ve-model-dogruluk-k-yaslamas-",
        },
      ],
      color: "from-fuchsia-500/20",
      role: "Eğitim / öğrenme projesi",
    },
    {
      id: 16,
      slug: "frontend-clean-architecture",
      title: "Frontend Clean Architecture",
      subtitle: "Katmanları adım adım izlenebilen eğitim projesi",
      kind: "Mimari · eğitim",
      tier: "archive",
      problem:
        "React projelerinde katmanlar arasındaki sınırı (UI, hook, iş kuralı, altyapı) somut olarak göstermek.",
      desc: "Tek bir sohbet özelliği üzerinden Clean Architecture katmanlarını, debugger durakları ve renkli loglarla satır satır izlenebilir hale getiren bir eğitim projesi.",
      longDesc:
        "Katmanlar arasındaki sınırı anlatmak için yazdığım eğitim projesi. Her katmanda renkli konsol logları ve debugger durakları var; mesaj gönderildiğinde akışın UI → hook → iş kuralı → altyapı katmanlarından nasıl geçtiği tarayıcının geliştirici araçlarında izlenebiliyor.",
      features: [
        "core / infra / hooks / ui katmanlarına ayrılmış sohbet özelliği",
        "Repository arayüzü ve bağımlılığın hook içinde enjekte edilmesi",
        'API çalışmazsa mesajı "pending" olarak yerelde saklama',
      ],
      tech: ["React", "TypeScript", "Axios"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/frontend-clean-architecture",
        },
      ],
      color: "from-zinc-500/20",
      role: "Kişisel eğitim projesi",
    },
    {
      id: 8,
      slug: "mas-portfolio",
      title: "Bu Portfolyo",
      subtitle: "Üç görünüm modlu kişisel site",
      kind: "Web · kişisel",
      tier: "archive",
      problem:
        "Aynı içeriği farklı zevklere hitap eden üç tasarım diliyle, mobilde de akıcı şekilde sunmak.",
      desc: "Vizyon, Bento ve Zen modlu bu siteyi React ve Framer Motion ile geliştirdim. Görselleri 2,7 MB'tan ~80 KB'a düşürüp GPU dostu efektlerle mobilde akıcı (60 FPS) hale getirdim.",
      longDesc:
        "Şu an incelediğiniz site. İkiz kardeşimle ortak bir çatı altında iki ayrı profil sunan bir portfolyo. React, TypeScript ve Framer Motion ile geliştirildi; Vizyon, Bento ve Zen olmak üzere üç görünüm modu var. Görselleri 2,7 MB'tan yaklaşık 80 KB'a düşürdüm, ağır blur efektlerini kaldırıp GPU hızlandırmalı animasyonlara geçerek mobilde 60 FPS hedefini yakaladım.",
      features: [
        "Vizyon, Bento ve Zen olmak üzere 3 görünüm modu",
        "Görsellerin 2,7 MB'tan ~80 KB'a düşürülmesi, mobilde 60 FPS",
        "İki profil (MAS / DAS) için ortak, tipli veri mimarisi",
        "Proje detay sayfaları, klavye ile gezilebilen ekran görüntüsü galerisi",
      ],
      tech: ["React", "TypeScript", "Framer Motion", "Tailwind"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/sevincmehmet/portfolio-web",
        },
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

export const tierOf = (p: Project): ProjectTier => p.tier ?? "main";
