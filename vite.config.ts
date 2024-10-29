import path from "node:path";
import { defineConfig } from "vitest/config";

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
					content_scripts: path.resolve(__dirname, "src/content_scripts.ts"),
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
			globals: true,
		},
	};
});
