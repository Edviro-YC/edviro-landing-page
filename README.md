# edviro-landing-page

The Edviro marketing site (Vue 3 + Vite, prerendered with vite-ssg, deployed on Netlify at `edviro.com`).

Positioning: Edviro is an **AI-powered facilities operations platform** (technical category: AI-native operations and maintenance platform). The shared surfaces — homepage, default metadata, nav, footer, schema, `public/llms.txt` — are industry-neutral and name the industries explicitly (data centers, education, commercial real estate, healthcare, construction). Education is where the proof comes from today, so it appears as labeled education proof below the neutral product story rather than as the category definition. Energy management is a major entry point, not the product boundary; the school energy/O&M/work-order/CMMS/asset pages keep their school-specific titles, canonicals, and structured data. Canonical copy lives in `src/seo/site.ts` and the "What is Edviro?" Notion page.

Site structure (2026-11 redesign): the homepage is `src/pages/HomePage.vue`. Every other redesigned page is plain data in `src/content/*.ts`, rendered by `src/pages/ContentPage.vue`; routes are generated from that list in `src/router/index.ts`, and nav and footer links live in `src/content/nav.ts`. The base styles are in `src/assets/site.css`; the Awesomic cream/forest palette, Inter/Poppins typography and responsive layouts are in `src/assets/awesomic.css`, scoped under `.nd` so they cannot reach the pages that still use the component styles in `src/assets/main.css` (the three school-specific pages, the demo redirect and confirmation, and the privacy policy). Paths that existed before the redesign are unchanged and keep their search titles and descriptions (`ESTABLISHED_SEO` in `src/content/index.ts`).

Published figures and logos: the homepage and content pages state savings, site counts, two district names and a wall of building-control vendor logos. The figures are defined in `src/seo/site.ts` (owner and source noted there) and repeated as text in `src/content` and `public/llms.txt`; the vendor list is in `src/pages/HomePage.vue`. Confirm each against its source before a deploy.

## The Edviro ecosystem

Edviro is an AI-powered facilities operations platform for K-12 school districts — energy monitoring, diagnostics, work orders, assets, and capital planning in one place. Six repos, one shared data plane:

| Repo | What it is |
|------|-----------|
| `flask-server` | Python backend — Cloud Run API + nightly Fargate ML pipeline |
| `edviro-dashboard` | React operator dashboard (Netlify-hosted, Supabase-backed) |
| `edviro-caseagent` | Cloudflare Worker — LLM ResolutionAgent that works anomaly cases end-to-end |
| `edviro-mobile-app` | React Native app — district energy views via Supabase under RLS |
| `edviro-landing-page` | Marketing site — this repo |
| `edviro-blog` | Astro blog |

**Shared data plane:** Supabase (Postgres + Auth + Storage + Edge Functions). District-scoped RLS is the authorization boundary; backend jobs use the service role.

**Architecture source of truth:** the [Edviro Architecture](https://app.notion.com/p/3a1e1e5ee06481c7ab24f4e8db322027) Notion page and its component pages, mirrored as the Monoid canvas "Edviro Architecture" (id `cab10eba-96ba-49ef-aec0-22959c08e5c2`). Agents: fetch pages via the Notion MCP; explore component relationships via the Monoid MCP (`get_canvas`, `get_node_context`).

## Docs map

This repo has no dedicated Notion component page; start from the [Edviro Architecture](https://app.notion.com/p/3a1e1e5ee06481c7ab24f4e8db322027) index. Product positioning lives in the "What is Edviro?" Notion page.

## Vue template notes

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Search and domain migration

### Brand images

`npm run generate:brand` renders the social card, favicons, Apple touch icon, Android icons, and schema logo from `src/assets/img/edviro-logo.svg`, `edviro-icon.svg`, and the site's Geist font. First install the renderer browser with `npx playwright install chromium`, or set `BRAND_BROWSER_PATH` to an installed Chrome/Chromium executable. Rendering is a development task; generated images are committed and production builds need no browser.

The shared social image is `/edviro-autopilot-2026.png` (1200×630). `/og-image.png` remains an identical compatibility copy for existing external embeds. When changing the social card again, use a new filename in `DEFAULT_OG_IMAGE`; bump icon URL versions in `index.html` and `public/site.webmanifest` when regenerating icons. The maskable icon has separate safe-area padding. Do not restore the retired raster wordmark or Hanken Grotesk generator.

`src/seo/site.ts` defines the canonical `https://edviro.com` origin. The production build prerenders all pages, then generates `dist/sitemap.xml` from their canonical URLs, excluding `noindex` pages. No fabricated modification dates are emitted. `public/robots.txt` advertises that sitemap.

`vite.config.ts` emits forced, permanent host redirects for the old apex/www domains, legacy `home.edviroenergy.com` alias, production `edviro-landing-page.netlify.app` hostname, and new www/HTTP variants. Deploy-preview hostnames remain accessible. Keep the old host aliases and TLS certificates attached to this Netlify site for at least a year, preferably indefinitely. Answers, dashboard, and email hostnames are separate services and are not migrated by these rules.

The November 11, 2026 cutover is deployed: `edviro.com` is Netlify's primary domain; old apex/www/home aliases and HTTPS coverage remain for permanent redirects. Search Console ownership, sitemap submission, and Change of Address still require completion. Adding an alias alone does not migrate search signals.

Run `npm run build` before merging (it includes the SEO checks). Before release, obtain Search Console ownership of the old and new sites in the same account and inspect the new domain's security/manual-action reports. Coordinate deploying this PR with making `edviro.com` the Netlify primary domain; retain every existing alias and TLS coverage. Verify old-to-new redirects with real HTTP requests, including a deep path with a query string, no redirect back to the old domain, and the new site's self-canonicals. Submit `https://edviro.com/sitemap.xml`, inspect priority URLs, then complete Change of Address for the migrated old apex and relevant www/home variants. The tool does not automatically move subdomains; do not submit moves for Blog or Answers while they remain on their current hosts. Monitor indexing and traffic on both properties. A PR preview cannot verify production hostname routing.

### Blog routing

`/blog/*` is a Netlify 200 rewrite to `https://edviro-blog.netlify.app/blog/:splat`, in the same Netlify team. The Astro blog owns that entire namespace, including its assets, RSS, sitemap, and real 404 responses. Keep the origin's netlify.app hostname free of blanket canonical-host redirects; those would create a loop. Blog links use full-document navigation rather than Vue Router. The root robots.txt advertises both sitemaps.

The hidden `share-your-story` form in index.html lets Netlify detect the form served through the blog proxy. Enable Forms detection on this landing project; new submissions on edviro.com belong to this project. Existing blog-project submissions stay there. The newsletter endpoint is unchanged.

Release order: publish the blog origin with legacy redirects disabled, publish this routing change, verify public blog pages/assets/forms detection, then set `BLOG_MIGRATION_REDIRECTS=true` in the blog project's production build environment and trigger a Git build. Keep blog.edviroenergy.com DNS and TLS attached to the blog project to serve 301 redirects indefinitely. See the blog repository's migration notes for mappings and rollback.

### Awesomic design adaptation

The [November 12 Awesomic preview](https://generated-site-c064d934.awesomic.app/index.html) supplies the complete page layouts and CSS for Home, How Edviro Works, Building Intelligence, and Integrations. Those pages use `src/components/design/styles` and `AwesomicShell.vue`, isolated from the legacy `.nd` styles. Home is `src/pages/HomePage.vue`; the other three layouts are in `src/components/design/pages` and receive the current content through `ContentPage.vue`. Other routes retain their existing content renderer.

The source's drawing paths, layered product panels, workflow progression, decision charts, customer carousel, timeline, rotating verification illustration, and integrations marquee are retained. Every stylesheet block is included, including the integrations page's second block. The rotating homepage hero stack is omitted as requested. Current headline, explanatory copy, FAQ answers, published figures, module offering and pricing distinction, real page destinations, SEO and demo-intent tracking are retained. Unverified designer testimonials and hotspot metrics are excluded.

`useAwesomicMotion` mounts the original source controllers through `awesomicMotion.js`. Queries stay within the mounted page. Created SVG paths and headline letters receive the page's Vue style scope; event listeners, observers, animation frames and timers are disposed on navigation. Reduced-motion changes restart the controllers with the current preference. Inter and Poppins are self-hosted WOFF2 files with their licenses next to them.

Run `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4178`, then `npm run check:design`. This uses the existing Playwright dependency. The checks compare browser-computed layout properties and animation names, durations and delays against the original four pages at phone and desktop widths, then exercise the restored interactions, responsive routes, reduced-motion changes, no-JavaScript content, asset loading and runtime errors. Set `DESIGN_BASE_URL` to check a deployed PR preview and `DESIGN_SCREENSHOTS` to save review captures. Playwright's Chromium browser must be installed.

The source baseline is `scripts/fixtures/awesomic-styles.json`. To regenerate it after an intentional designer revision, serve the original downloaded pages and run `DESIGN_REFERENCE_URL=http://127.0.0.1:4189 node scripts/check-design.mjs --record-reference`. This records the reference pages, not the implementation under test. It uses a 1000px-high viewport at 390px and 1440px widths; scoped Vue keyframe suffixes are normalized when comparing.
