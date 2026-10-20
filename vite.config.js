import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Entries live in src/. The build writes to the repo root, which is what
// GitHub Pages (main branch, root) serves:
//   /            -> v2.1 analytical framework (src/index.html)
//   /galaxy/     -> v4.0 3D gravity-fabric galaxy (src/galaxy/index.html)
export default defineConfig({
  root: "src",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "..",
    emptyOutDir: false,
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "src/index.html"),
        galaxy: resolve(import.meta.dirname, "src/galaxy/index.html"),
      },
    },
  },
});
