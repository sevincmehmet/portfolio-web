// Bu dosya ekran görüntüsü hattı (Hat C) tarafından doldurulur.
// Anahtar: proje slug'ı. Görseller public/projects/<slug>/ altında.
export interface ProjectImage {
  src: string;
  caption: string;
}

export const projectImages: Record<string, ProjectImage[]> = {
  "mini-erp": [
    { src: "/projects/mini-erp/01-konsolide-koyu.webp", caption: "Çok şirketli konsolide görünüm (koyu tema)" },
    { src: "/projects/mini-erp/02-genel-bakis.webp", caption: "Genel bakış paneli" },
    { src: "/projects/mini-erp/03-personel-filtre.webp", caption: "Filtrelenmiş personel listesi" },
    { src: "/projects/mini-erp/04-personel-formu.webp", caption: "Personel düzenleme formu" },
    { src: "/projects/mini-erp/05-vardiya-plani-koyu.webp", caption: "Haftalık vardiya planı (koyu tema)" },
    { src: "/projects/mini-erp/06-puantaj.webp", caption: "Puantaj ve fazla mesai kayıtları" },
    { src: "/projects/mini-erp/07-izinler.webp", caption: "İzin talepleri ve onay akışı" },
    { src: "/projects/mini-erp/08-bordro.webp", caption: "Bordro ve hakediş hesaplama" },
    { src: "/projects/mini-erp/09-excel-ice-aktarma.webp", caption: "Excel içe aktarma önizlemesi" },
    { src: "/projects/mini-erp/10-rapor-galerisi.webp", caption: "Rapor oluşturucu şablon önizlemesi" },
    { src: "/projects/mini-erp/11-denetim-kaydi.webp", caption: "Değişiklik (denetim) kaydı" },
  ],
  jollin: [
    { src: "/projects/jollin/01-ana-sayfa.webp", caption: "Ana sayfa" },
    { src: "/projects/jollin/02-kesfet.webp", caption: "Keşfet: etkinlik ve deneyim listesi" },
    { src: "/projects/jollin/03-etkinlik-detayi.webp", caption: "Etkinlik detay ve bilet sayfası" },
    { src: "/projects/jollin/04-sehir-etkinlikleri.webp", caption: "Şehre göre etkinlikler" },
    { src: "/projects/jollin/05-mobil-ana-sayfa.webp", caption: "Mobil ana sayfa" },
  ],
  "sarissa-bisiklet": [
    { src: "/projects/sarissa-bisiklet/01-ana-sayfa.webp", caption: "Ana sayfa" },
    { src: "/projects/sarissa-bisiklet/02-urun-listesi.webp", caption: "Filtreli ürün listesi" },
    { src: "/projects/sarissa-bisiklet/03-urun-detayi.webp", caption: "Ürün detay sayfası" },
    { src: "/projects/sarissa-bisiklet/04-mobil-urun-detayi.webp", caption: "Mobil ürün detayı" },
  ],
  "pano": [
    { src: "/projects/pano/01-ajan-agaci.webp", caption: "Ajan hiyerarşi ağacı ve onay bekleyen ajan" },
    { src: "/projects/pano/02-alt-ajanlar.webp", caption: "Alt ajan açan bir ajanın terminali" },
    { src: "/projects/pano/03-terminalden-tasi.webp", caption: "Terminal'deki oturumları kaldığı yerden Pano'ya taşıma" },
  ],
};
