# Twin_Core — Portfolyo

İki kişilik portfolyo sitesi: **Mehmet Ali Sevinç** (Frontend Developer) ve **Dursun Ali Sevinç**. Her profil kendi adresinde, aynı kod tabanından.

**Canlı:** https://twin-core.netlify.app/mas

## Öne çıkanlar

- **Üç görünüm modu:** Aynı içerik üç farklı tasarım diliyle gösteriliyor: *Vizyon* (glassmorphism), *Bento* (ızgara kartlar) ve *Zen* (minimal tipografi). Mod değiştirince bölümler framer-motion ile geçiş yapıyor.
- **Profil bazlı yönlendirme:** `/:profileId` ve `/:profileId/proje/:slug`. Her profilin içeriği tipli veri dosyalarından geliyor (`src/data/`), bileşenler profile göre veri alıyor.
- **Proje detay sayfaları:** Ekran görüntüsü galerisi, özellikler, teknolojiler ve bağlantılar. Projeler "Yapay zeka ile geliştirildi" ya da "Elle + AI" olarak etiketleniyor.
- **"Yapay Zeka ile Geliştirilenler" bölümü:** Claude Code ile nasıl çalıştığımı (planla → parçala → ajanlara yazdır → test et) ve bu süreçte geliştirdiğim projeleri anlatıyor.
- **Performans:** Animasyonlar GPU dostu (blur filtreleri kaldırıldı), arka plan ışıkları sadece masaüstünde, görseller WebP.

## Teknolojiler

React 19 · TypeScript · Vite · Tailwind CSS 4 · framer-motion · React Router 7 · Netlify

## Çalıştırma

```bash
npm install
npm run dev
```

## Yapı

```
src/
├── components/      Hero, About, Projects, AiProjects, ProjectDetail, ModeSwitcher...
├── context/         Görünüm modu (vizyon / bento / zen)
├── data/            Profil, hakkımda, proje ve görsel verileri (tipli)
└── assets/          Profil fotoğrafları ve hero metinleri
public/projects/     Proje ekran görüntüleri (WebP)
```
