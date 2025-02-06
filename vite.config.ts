import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import packageJson from "./package.json";

const manifest: Partial<ManifestOptions> = {
  name: "Work Time Counter",
  short_name: "WorkTImeCounter",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#000000",
  icons: [
    {
      src: "/icon.png",
      sizes: "192x192",
      type: "image/png",
    },
  ],
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      minify: false,
      injectRegister: "auto",
      registerType: "prompt",
      manifest: manifest,
      includeAssets: ["assets/*.woff", "assets/*.woff2"], //TODO
      //selfDestroying: true, //TODO
      //strategies: "generateSW"
    }),
  ],
  build: {
    manifest: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
});
