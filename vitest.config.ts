/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	test: {
		globals: true,
		environment: "jsdom",

		coverage: {
			enabled: true,
			clean: true,
			cleanOnRerun: true,

			reporter: ["clover", "lcov", "json"],
		},
	},
});
