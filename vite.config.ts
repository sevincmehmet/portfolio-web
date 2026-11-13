import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
