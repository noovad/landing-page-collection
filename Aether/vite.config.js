import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import handlebars from "vite-plugin-handlebars";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",

  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: [
        resolve(__dirname, "partials"),
        resolve(__dirname, "partials/home"),
      ],
      context() {
        return JSON.parse(
          fs.readFileSync(resolve(__dirname, "data/content.json"), "utf-8"),
        );
      },
      helpers: {
        eq(a, b) { return a === b; },
        add(a, b) { return a + b; },
        join(arr, sep) { return arr.join(sep); },
      },
    }),
  ],

  build: {
    cssMinify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
