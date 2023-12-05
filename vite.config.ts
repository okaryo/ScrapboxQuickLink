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
          background: path.resolve(__dirname, "src/index.ts"),
        },
      },
    },
    test: {
      globals: true
    },
  };
});
