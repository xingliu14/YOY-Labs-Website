import { defineConfig } from "astro/config";

// Served as a GitHub Pages project site until the custom domain is live.
// Switching to the domain: set `site` to "https://yoylabs.net" and `base` to "/" right after
// adding the domain under Settings → Pages (Actions deployments ignore a CNAME file).
export default defineConfig({
  site: "https://xingliu14.github.io",
  base: "/YOY-Labs-Website/",
  vite: {
    build: {
      // Vite's default target lets the minifier rewrite `(max-width: 734px)` as `(width <= 734px)`,
      // which Safari before 16.4 ignores, dropping the mobile layout. Target older browsers.
      cssTarget: ["chrome87", "edge88", "firefox78", "safari14"],
    },
  },
});
