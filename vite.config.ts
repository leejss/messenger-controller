import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: "src/index.ts",
      name: "MessengerController",
      fileName: (format) => `messenger-controller.${format}.js`,
    },
  },
});
