import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["i18next", "react-i18next"],
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
    },
  },
});
