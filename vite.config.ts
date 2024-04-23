import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core": "/src/core",
      "@domain": "/src/domain",
      "@infra": "/src/infra",
      "@presentation": "/src/presentation",
      "@design": "/src/design",
    },
  },
  server: { host: true },
});
