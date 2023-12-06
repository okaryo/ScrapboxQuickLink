import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const isProduction = !isDev;

  return {
    build: {
      outDir: "dist/js",
      sourcemap: isDev,
      minify: isProduction,
      reportCompressedSize: isProduction,
      rollupOptions: {
        input: {
          background: path.resolve(__dirname, "src/background.ts"),
          offscreen: path.resolve(__dirname, "src/offscreen.ts"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: isDev
            ? "assets/[name].js"
            : "assets/[name].[hash].js",
        },
      },
    },
    test: {
      globals: true
    },
  };
});
