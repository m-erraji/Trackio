import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { SITE_URL } from "./src/site.js";
import { PRODUCTS } from "./src/products.js";

const LANGS = ["fr", "ar", "en"];

/** Writes dist/sitemap.xml at build time: every page × every language, with hreflang links. */
function sitemap() {
  return {
    name: "trackio-sitemap",
    apply: "build",
    generateBundle() {
      const pages = ["", ...PRODUCTS.map((p) => `/products/${p.id}`)];
      const alternates = (page) =>
        [...LANGS.map((l) => [l, `${SITE_URL}/${l}${page}`]), ["x-default", `${SITE_URL}/fr${page}`]]
          .map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`)
          .join("\n");
      const urls = pages.flatMap((page) =>
        LANGS.map(
          (l) => `  <url>\n    <loc>${SITE_URL}/${l}${page}</loc>\n${alternates(page)}\n  </url>`
        )
      );
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
          `${urls.join("\n")}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemap()],
});
