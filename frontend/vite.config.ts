import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // legacy({
    //   targets: ["ie >= 11"],
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    // }),
  ],

  build: {
    outDir: "../src/main/resources/static", // Cartella di output
    rollupOptions: {
      input: {
        main: "./index.html", // Pagina principale
        laboratori: "./laboratori/index.html", // Pagina "Laboratori"
        richiediPrenotazione: "./richiedi-prenotazione/index.html", // Pagina "Richiedi Prenotazione"
        "sign-in": "./sign-in/index.html", // Pagina "Login"
        dashboard: "./dashboard/index.html", // Pagina "Laboratori"
      },
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
