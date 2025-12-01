import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": "/src"        // ★ 이게 정답 ★
    }
  },
  server: {
    watch: { usePolling: true },
    proxy: {
      "/api": {
        target: "http://3.27.86.20:8080",
        changeOrigin: true
      }
    }
  }
});
