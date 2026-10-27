import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Served at the custom domain set in Settings → Pages (Actions deployments ignore a CNAME file).
export default defineConfig({
  site: "https://yoylabs.net",
  // sitemap-index.xml lists every page except the 404, which is noindex. public/robots.txt names it.
  integrations: [sitemap({ filter: (page) => !/\/404(\.html)?\/?$/.test(new URL(page).pathname) })],
  vite: {
    build: {
      // Vite's default target lets the minifier rewrite `(max-width: 734px)` as `(width <= 734px)`,
      // which Safari before 16.4 ignores, dropping the mobile layout. Target older browsers.
      cssTarget: ["chrome87", "edge88", "firefox78", "safari14"],
    },
  },
});
