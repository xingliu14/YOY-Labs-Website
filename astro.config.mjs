import { defineConfig } from "astro/config";

// Served at the custom domain set in Settings → Pages (Actions deployments ignore a CNAME file).
export default defineConfig({
  site: "https://yoylabs.net",
  vite: {
    build: {
      // Vite's default target lets the minifier rewrite `(max-width: 734px)` as `(width <= 734px)`,
      // which Safari before 16.4 ignores, dropping the mobile layout. Target older browsers.
      cssTarget: ["chrome87", "edge88", "firefox78", "safari14"],
    },
  },
});
