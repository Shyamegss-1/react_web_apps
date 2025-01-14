/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "process.env": import.meta.env,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
