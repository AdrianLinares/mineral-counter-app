import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
    // Add bundle visualizer when running with --mode analyze
    ...(mode === 'analyze' ? [visualizer({ filename: 'dist/bundle-analysis.html', open: true })] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase the warning limit slightly and split heavy vendor libraries
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor_recharts';
            if (id.includes('react-beautiful-dnd')) return 'vendor_dnd';
            if (id.includes('@tanstack')) return 'vendor_tanstack';
            if (id.includes('@supabase')) return 'vendor_supabase';
            if (id.includes('lucide-react')) return 'vendor_icons';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor_react';
            return 'vendor_misc';
          }
        },
      },
    },
  },
}));
