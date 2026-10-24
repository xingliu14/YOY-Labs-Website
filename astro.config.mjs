import { defineConfig } from "astro/config";

// Served as a GitHub Pages project site until the custom domain is live.
// Switching to the domain: set `site` to "https://yoylabs.net" and `base` to "/" right after
// adding the domain under Settings → Pages (Actions deployments ignore a CNAME file).
export default defineConfig({
  site: "https://xingliu14.github.io",
  base: "/YOY-Labs-Website/",
});
