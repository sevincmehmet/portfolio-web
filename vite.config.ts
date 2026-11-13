import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const SITE = "https://twin-core.netlify.app";

// Sosyal medya botları JavaScript çalıştırmaz; SPA'da meta etiketleri route'a
// göre değişmez. Bu yüzden build sonunda dist/index.html'in kopyası
// dist/mas.html ve dist/mas/index.html olarak, MAS'a özel paylaşım
// etiketleriyle yazılır.
// Netlify statik dosyayı _redirects kuralından önce sunar: /mas bu dosyayı,
// diğer adresler (/, /das, /mas/proje/...) ortak index.html'i alır.
const masMeta = `
    <meta name="description" content="Mehmet Ali Sevinç, Frontend &amp; Product Engineer: UI/UX, kurumsal paneller ve AI agent'lar. React, Next.js ve TypeScript ile kurumsal paneller geliştiriyor, Claude Code ile uçtan uca ürün çıkarıyor." />
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="tr_TR" />
    <meta property="og:site_name" content="Twin_Core" />
    <meta property="og:title" content="Mehmet Ali Sevinç | Frontend &amp; Product Engineer" />
    <meta property="og:description" content="UI/UX · Kurumsal paneller · AI agent'lar. Öne çıkan işler: Jollin, Mini-ERP, Org Tree Asistanı." />
    <meta property="og:url" content="${SITE}/mas" />
    <meta property="og:image" content="${SITE}/og/mas.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Mehmet Ali Sevinç, Frontend &amp; Product Engineer" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mehmet Ali Sevinç | Frontend &amp; Product Engineer" />
    <meta name="twitter:description" content="UI/UX · Kurumsal paneller · AI agent'lar" />
    <meta name="twitter:image" content="${SITE}/og/mas.png" />
    <link rel="canonical" href="${SITE}/mas" />
    <title>Mehmet Ali Sevinç | Frontend &amp; Product Engineer</title>`;

const masShareHtml = (): Plugin => ({
  name: "mas-paylasim-html",
  apply: "build",
  closeBundle() {
    const dist = resolve(__dirname, "dist");
    const html = readFileSync(resolve(dist, "index.html"), "utf8");
    const out = html.replace(
      /<!-- paylasim-meta:basla[\s\S]*?paylasim-meta:bitir -->/,
      masMeta.trim(),
    );
    if (out === html) throw new Error("paylaşım meta işaretleri bulunamadı");
    mkdirSync(resolve(dist, "mas"), { recursive: true });
    writeFileSync(resolve(dist, "mas", "index.html"), out);
    // /mas (sondaki eğik çizgi olmadan) için de: Netlify /mas isteğinde mas.html'i sunar
    writeFileSync(resolve(dist, "mas.html"), out);
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), masShareHtml()],
  build: {
    rolldownOptions: {
      output: {
        // Kütüphaneler ayrı parçada: uygulama kodu değişince tarayıcı
        // önbelleğindeki react / framer-motion yeniden indirilmez
        advancedChunks: {
          groups: [
            {
              name: "vendor",
              test: /node_modules[\\/](react|react-dom|react-router|framer-motion|motion-dom|motion-utils|scheduler)/,
            },
          ],
        },
      },
    },
  },
});
