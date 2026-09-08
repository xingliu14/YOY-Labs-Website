# YOY Labs — Website

"Coming soon" site for **YOY Labs**, a technology lab building intelligent systems, software, and experiments at the edge of what's possible.

**Live site:** https://xingliu14.github.io/YOY-Labs-Website/

## What's in it

A single `index.html` with five client-side tabs, deep-linkable via the URL hash:

| Tab | URL | Contents |
|---|---|---|
| Home | `/` | "YOY Labs is coming soon" hero, waitlist form, three section tiles |
| Services | `/#services` | Six service lines |
| Team | `/#team` | Founder card plus open roles |
| Careers | `/#careers` | Four open roles, perks, "pitch us" |
| Contact | `/#contact` | Email and socials |

Apple-style dark design: system font (SF on Apple devices, Inter elsewhere), one gradient headline, frosted nav, pill buttons, rounded cards. Arrow keys move within the tab bar. Respects `prefers-reduced-motion`.

Files:

- `index.html` — the whole site (HTML, CSS, JS). No build step, no dependencies.
- `404.html` — styled not-found page that redirects to the site root.
- `.nojekyll` — tells GitHub Pages to serve files as-is (skips the Jekyll build).

## Editing content

Everything is plain HTML in `index.html`. Search for the section comments `<!-- ===== TEAM ===== -->` etc.

- **Team members:** copy a `.card` block in the Team section. Initials go in `.avatar`.
- **Open roles:** copy a `<details class="role-item">` block. Update the `mailto:` subject.
- **Emails:** `hello@yoylabs.com` and `careers@yoylabs.com` are placeholders. Search and replace.
- **Waitlist form:** set `FORM_ENDPOINT` at the top of the `<script>` (see "Free add-ons" below). Empty means the form opens the visitor's email client instead.

## Local development

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

Opening `index.html` directly from disk also works.

## Serving it for free

### Current state (2026-09-07)

- Repo is **public** and **GitHub Pages is enabled**, deploying from `main` (root). Live at the URL above with HTTPS.
- Every `git push` to `main` redeploys in about a minute. Nothing else to do.

The steps below are kept for reference (e.g. if the repo is ever re-created).

### GitHub Pages setup ($0)

The site is static and already lives on GitHub, so this is the shortest path.

1. **Make the repo public.** Settings → General → Danger Zone → Change visibility → Public. A marketing site has nothing secret in it, and this keeps everything on the Free plan. (If you'd rather keep it private, use Cloudflare Pages below instead.)
2. **Enable Pages.** Settings → Pages → Build and deployment → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
3. **Wait about a minute**, then open https://xingliu14.github.io/YOY-Labs-Website/. HTTPS is on by default.
4. **Deploy forever after:** `git push`. Every push to `main` goes live in under a minute.

Same thing from the terminal, if you prefer:

```sh
brew install gh && gh auth login
gh repo edit xingliu14/YOY-Labs-Website --visibility public --accept-visibility-change-consequences
gh api -X POST repos/xingliu14/YOY-Labs-Website/pages -f 'source[branch]=main' -f 'source[path]=/'
```

Limits on the free tier: 1 GB site, 100 GB bandwidth per month, 10 builds per hour. A coming-soon page will not get near any of these.

### Custom domain (optional, the only thing that costs money)

A domain like `yoylabs.com` runs $10–15/year at Cloudflare Registrar or Porkbun. Everything else stays free.

1. Add a file named `CNAME` at the repo root containing just `yoylabs.com`.
2. At your DNS provider, add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `xingliu14.github.io`
3. Settings → Pages → Custom domain → enter `yoylabs.com` → tick **Enforce HTTPS** once the certificate is issued (a few minutes).

Don't add the `CNAME` file before you own the domain; Pages will refuse to serve until DNS resolves.

### Alternatives if GitHub Pages doesn't fit

| Host | Free tier | Why you'd pick it |
|---|---|---|
| **Cloudflare Pages** | Unlimited bandwidth, 500 builds/mo, deploys from **private** repos | Keep the repo private, best global CDN, free analytics and DNS in one dashboard |
| **Netlify** | 100 GB/mo bandwidth, 300 build min/mo, private repos OK | Built-in form handling (would replace Formspree) |
| **Vercel** | Hobby tier, 100 GB/mo | Great DX, but Hobby terms **prohibit commercial use**, so not ideal for a company site |

All three connect to the GitHub repo and auto-deploy on push, with no build command needed (output directory: repo root).

### Free add-ons

- **Waitlist emails:** [Formspree](https://formspree.io) free tier gives 50 submissions/month. Create a form, paste its endpoint into `FORM_ENDPOINT` in `index.html`. [Web3Forms](https://web3forms.com) is a free alternative with no monthly cap.
- **Email at your domain:** Cloudflare Email Routing forwards `hello@yoylabs.com` to any inbox for free. No Google Workspace needed for a coming-soon page.
- **Analytics:** Cloudflare Web Analytics or [GoatCounter](https://www.goatcounter.com), both free, cookie-free, and one script tag.
- **Uptime alerts:** [UptimeRobot](https://uptimerobot.com) free tier checks the URL every 5 minutes.

### Cost summary

| Item | Cost |
|---|---|
| Hosting (GitHub Pages or Cloudflare Pages) | $0 |
| HTTPS certificate | $0 (automatic) |
| Waitlist form, analytics, uptime monitoring | $0 |
| Custom domain (optional) | ~$10–15/year |
