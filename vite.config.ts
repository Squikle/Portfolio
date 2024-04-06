import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), viteCompression(), visualizer()],
  optimizeDeps: {
    exclude: ["azysizes_plugins_blur-up_ls__blur-up"],
  },
  build: {
    sourcemap: false,
    minify: "terser",
  },
});
