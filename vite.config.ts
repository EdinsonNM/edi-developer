import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@core": "/src/core",
      "@domain": "/src/domain",
      "@infra": "/src/infra",
      "@presentation": "/src/presentation",
      "@design": "/src/design",
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
