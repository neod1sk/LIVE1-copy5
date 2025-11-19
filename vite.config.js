import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  server: {
    open: true,
    host: "0.0.0.0",
    port: 8000,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});



