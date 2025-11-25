import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, ".", "");
	return {
		plugins: [react()], // Add React plugin
		define: {
			"process.env.API_KEY": JSON.stringify(
				env.GEMINI_API_KEY
			),
			"process.env.GEMINI_API_KEY": JSON.stringify(
				env.GEMINI_API_KEY
			),
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "."),
			},
		},
		// Add asset handling configuration
		assetsInclude: [
			"**/*.jpg",
			"**/*.jpeg",
			"**/*.png",
			"**/*.svg",
			"**/*.webp",
			"**/*.gif",
		],
		// Simple build optimization without custom asset naming
		build: {
			chunkSizeWarningLimit: 1000,
			// Let Vite handle asset naming automatically
			assetsDir: "assets",
		},
		// Optimize dependencies
		optimizeDeps: {
			include: ["react", "react-dom", "react-router-dom"],
		},
	};
});
