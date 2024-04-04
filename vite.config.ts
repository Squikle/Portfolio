import { defineConfig, optimizeDeps } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), viteCompression()],
  optimizeDeps: {
    exclude: ["azysizes_plugins_blur-up_ls__blur-up"],
  },
});
