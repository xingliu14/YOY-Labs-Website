# YOY Labs — Website

"Coming soon" site for **YOY Labs**, a technology lab building intelligent systems, software, and experiments at the edge of what's possible.

**Live site:** https://yoylabs.net

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
- `astro.config.mjs` — `site` (the URL the site is served from) and the sitemap integration, which writes `sitemap-index.xml` listing every page except the 404.
- `public/robots.txt` — allows all crawlers and names the sitemap.
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on every push to `main`.

## Editing content

- **Text:** each tab is one short `<section>` in `src/pages/index.astro`.
- **Emails:** `CONTACT_EMAIL` and `CAREERS_EMAIL` in `src/consts.ts` (`hello@` and `careers@yoylabs.net`). The domain is onboarded to Cloudflare Email Routing, but neither address has a routing rule yet, so mail to them bounces. Each address needs its own rule (Email Routing → Routing rules → Create rule, forwarding to a verified destination).
- **Notify form:** set `FORM_ENDPOINT` in `src/consts.ts` (see "Free add-ons" below). Empty means the form opens the visitor's email app instead.

## Local development

Requires Node `>=22.23.4` (`.node-version` pins 24). With [fnm](https://github.com/Schniz/fnm): `fnm use`.

```sh
npm install
npm run dev       # → http://localhost:4321/
npm run build     # type-check, then build into dist/
npm run preview   # serve dist/ locally
```

## Deploying

GitHub Actions builds the site and publishes `dist/` to GitHub Pages on every push to `main` (Settings → Pages → Source: GitHub Actions).

Limits on the free tier: 1 GB site, 100 GB bandwidth per month. A coming-soon page will not get near either.

## Domain: `yoylabs.net`

Registered at Cloudflare Registrar, with DNS and email at Cloudflare:

- `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and `AAAA` → `2606:50c0:8000::153` … `2606:50c0:8003::153`; `CNAME` for `www` → `xingliu14.github.io`. All **DNS only** (grey cloud), so GitHub can issue the certificate.
- A `TXT` record `_github-pages-challenge-xingliu14` verifies the domain for the GitHub account, so no other account can claim it. Keep it.
- Email Routing added its own `MX` and `TXT` records. Forwarding `hello@` and `careers@` still needs the two routing rules above.

The domain itself is set under Settings → Pages → Custom domain, with **Enforce HTTPS** on. GitHub Actions deployments ignore a `CNAME` file.

## Free add-ons

- **Waitlist emails:** [Formspree](https://formspree.io) free tier gives 50 submissions/month. Create a form, paste its endpoint into `FORM_ENDPOINT`. [Web3Forms](https://web3forms.com) is a free alternative with no monthly cap.
- **Analytics:** Cloudflare Web Analytics or [GoatCounter](https://www.goatcounter.com), both free, cookie-free, and one script tag.
- **Uptime alerts:** [UptimeRobot](https://uptimerobot.com) free tier checks the URL every 5 minutes.

## Cost summary

| Item | Cost |
|---|---|
| Hosting (GitHub Pages) | $0 |
| HTTPS certificate | $0 (automatic) |
| Waitlist form, analytics, uptime monitoring | $0 |
| `yoylabs.net` | ~$12/year |
