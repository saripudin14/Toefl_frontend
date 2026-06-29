import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tentukan __dirname secara manual untuk ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Toefl_PrepPro/", // <-- INI YANG PALING PENTING
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
