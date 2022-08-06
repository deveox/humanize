import path from "path";
import { defineConfig } from "vite";
const tools = require('./tools.ts')
module.exports = defineConfig({
  base: "./",
  build: {
    target: ["es2020"],
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: tools.packageNameUpper,
      formats: ["es", "cjs", "iife"],
      fileName: (format) => tools.fileNames[format],
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
