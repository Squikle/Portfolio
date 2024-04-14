import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression2";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const imageOptimizer = ViteImageOptimizer({
  png: {
    quality: 50,
    compressionLevel: 9,
    effort: 9,
  },
  webp: {
    quality: 50,
    lossless: false,
    effort: 6,
  },
  exclude: /.*sky.*/,
});

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    react(),
    visualizer(),
    imageOptimizer,
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$/, /\.(gz)$/],
      compressionOptions: {},
    }),
  ],
  optimizeDeps: {
    exclude: ["azysizes_plugins_blur-up_ls__blur-up"],
  },
  build: {
    sourcemap: false,
    minify: "terser",
    cssMinify: "lightningcss",
  },
});
