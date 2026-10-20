import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Source entry lives in src/. The build writes index.html + assets/ to the
// repo root, which is what GitHub Pages (main branch, root) serves.
export default defineConfig({
  root: "src",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "..",
    emptyOutDir: false,
    assetsDir: "assets",
  },
});
