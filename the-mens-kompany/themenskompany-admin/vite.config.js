import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "process.env": import.meta.env,
  base: "./",
  server: {
    mimeTypes: {
      "text/css": ["css"],
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
