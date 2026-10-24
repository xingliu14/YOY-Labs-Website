# YOY Labs — Website

"Coming soon" site for **YOY Labs**, a technology lab building intelligent systems, software, and experiments at the edge of what's possible.

**Live site:** https://xingliu14.github.io/YOY-Labs-Website/ (moving to `yoylabs.net` once the domain is registered)

## What's in it

An [Astro](https://astro.build) static site. The home page has five client-side tabs, deep-linkable via the URL hash:

| Tab | URL | Contents |
|---|---|---|
| Home | `/` | "YOY Labs is coming soon", one line, email notify form |
| Services | `/#services` | Four service names |
| Team | `/#team` | Founder |
| Careers | `/#careers` | One line and the careers email |
| Contact | `/#contact` | The contact email |

Minimal Apple-style dark design: one centered screen per tab, system font (SF on Apple devices, Inter elsewhere), one gradient headline, frosted nav, pill button. Arrow keys move within the tab bar. Respects `prefers-reduced-motion`.

Files:

- `src/pages/index.astro` — the home page: markup and the tab/form script.
- `src/pages/404.astro` — not-found page; redirects to the site root after 2.5 s.
- `src/layouts/Base.astro` — `<head>` (meta, Open Graph, favicon, fonts) shared by every page.
- `src/styles/global.css` — all styles.
- `src/consts.ts` — site name, contact emails, waitlist form endpoint.
- `astro.config.mjs` — `site` and `base` (the URL the site is served from).
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on every push to `main`.

## Editing content

- **Text:** each tab is one short `<section>` in `src/pages/index.astro`.
- **Emails:** `CONTACT_EMAIL` and `CAREERS_EMAIL` in `src/consts.ts`. They are still placeholders on `yoylabs.com`, which we do not own; switch them to `yoylabs.net` once its email routing works.
- **Notify form:** set `FORM_ENDPOINT` in `src/consts.ts` (see "Free add-ons" below). Empty means the form opens the visitor's email app instead.

## Local development

Requires Node `>=22.23.4` (`.node-version` pins 24). With [fnm](https://github.com/Schniz/fnm): `fnm use`.

```sh
npm install
npm run dev       # → http://localhost:4321/YOY-Labs-Website/
npm run build     # type-check, then build into dist/
npm run preview   # serve dist/ locally
```

## Deploying

GitHub Actions builds the site and publishes `dist/` to GitHub Pages on every push to `main`.

**One-time switch (required before merging the Astro migration):** Settings → Pages → Build and deployment → Source: **GitHub Actions**. The old "Deploy from a branch" setting would serve the raw repo, which no longer has an `index.html` at the root.

Limits on the free tier: 1 GB site, 100 GB bandwidth per month. A coming-soon page will not get near either.

## Custom domain: `yoylabs.net`

Register at Cloudflare Registrar (at-cost pricing, about $12/year for `.net`, free WHOIS privacy). Then:

1. In `astro.config.mjs`, set `site: "https://yoylabs.net"` and `base: "/"`.
2. Add `public/CNAME` containing just `yoylabs.net`.
3. In Cloudflare DNS, add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `xingliu14.github.io`
   - Keep both **DNS only** (grey cloud) until GitHub has issued the certificate.
4. Settings → Pages → Custom domain → `yoylabs.net` → tick **Enforce HTTPS** once the certificate is issued (a few minutes).

Don't add `public/CNAME` before you own the domain; Pages will refuse to serve until DNS resolves.

## Free add-ons

- **Waitlist emails:** [Formspree](https://formspree.io) free tier gives 50 submissions/month. Create a form, paste its endpoint into `FORM_ENDPOINT`. [Web3Forms](https://web3forms.com) is a free alternative with no monthly cap.
- **Email at your domain:** Cloudflare Email Routing forwards `hello@yoylabs.net` to any inbox for free.
- **Analytics:** Cloudflare Web Analytics or [GoatCounter](https://www.goatcounter.com), both free, cookie-free, and one script tag.
- **Uptime alerts:** [UptimeRobot](https://uptimerobot.com) free tier checks the URL every 5 minutes.

## Cost summary

| Item | Cost |
|---|---|
| Hosting (GitHub Pages) | $0 |
| HTTPS certificate | $0 (automatic) |
| Waitlist form, analytics, uptime monitoring | $0 |
| `yoylabs.net` | ~$12/year |
