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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React y React DOM
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Separar Three.js y librerías relacionadas (pesadas)
          "three-vendor": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
            "postprocessing",
          ],
          // Separar librerías de animación
          "animation-vendor": ["gsap", "@gsap/react", "framer-motion"],
          // Separar otras librerías grandes
          "ui-vendor": [
            "@headlessui/react",
            "@radix-ui/react-icons",
            "@radix-ui/react-slot",
            "lucide-react",
          ],
        },
      },
    },
    // Optimizaciones de compilación
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimizar dependencias pre-empaquetadas
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
    ],
    exclude: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
