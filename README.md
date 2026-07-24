# AIM Website (Next.js)

The AIM marketing site, converted from its Webflow static export into a Next.js
application. It uses Next.js 16 (App Router), React 19, and a static HTML export.

For the full architecture and, in particular, how to add more pages, see
[PROJECT.md](PROJECT.md).

## Running it

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # static export into out/
```

`npm run build` produces a fully static site in `out/` (via `output: 'export'`),
so it deploys to any static host with no Node server.

## How the conversion works

The original Webflow export (99 HTML pages plus shared CSS/JS/images) is
preserved under `legacy/` as the source of truth. A converter turns it into the
fragments the app renders; nothing in `src/generated/` is edited by hand.

```bash
npm run convert    # regenerate src/generated/* from legacy/*.html
```

`scripts/convert.mjs` parses each page and:

1. Extracts the shared navbar (`role="banner"`) and footer (`.section-footer`)
   once, into `src/generated/nav.html` and `src/generated/footer.html`.
2. Writes each page's unique content (everything between nav and footer) to
   `src/generated/content/<slug>.html`, with `.html` links rewritten to routes
   and relative asset paths rewritten to root-absolute (`/images/...`).
3. Separates the page scripts. Blocks byte-identical across nearly all pages
   (theme toggle, language switch, cursor, nav behaviour) become global chrome
   in `src/generated/global-chrome.js` and run once. The rest (per-page
   translations, scroll reveals, counters) go to `src/generated/scripts/<slug>.js`
   and run on each visit to that route.
4. Builds `src/generated/routes.js`, the route manifest (slug, path, title,
   description, canonical, og image, Webflow page id).

`draft.html` is excluded (a Webflow style-guide page, not a real route).

## App structure

- `app/layout.jsx` renders `<html>`/`<body>`, the persistent navbar and footer,
  the Webflow stylesheets, favicons, and the boot loader that pulls in all shared
  libraries (jQuery, `webflow.js`, GSAP + ScrollTrigger, Lenis, PureCounter, the
  chatbot widget, Google Analytics, reCAPTCHA).
- `app/[[...slug]]/page.jsx` is one dynamic route that statically generates every
  page. It reads the page's preserved content and renders it server-side (real
  HTML in the export, good for SEO), sets per-page metadata via
  `generateMetadata`, and mounts the client runtime.
- `src/components/` holds the server components that inline the shared nav/footer
  and the client components that run the scripts:
  - `GlobalChrome` runs the shared chrome scripts once.
  - `PageRuntime` runs each page's scripts on navigation, reinitialises Webflow
    interactions, sets the active nav link, and records a page view.
  - `LinkInterceptor` routes internal links client-side.
- `src/lib/webflow.js` executes preserved scripts the way the browser originally
  did: each block is evaluated independently so one error can't break the rest,
  and `load`/`DOMContentLoaded` handlers fire immediately since the DOM is
  already mounted.

Static assets are served from `public/` (`css/`, `images/`, `documents/`,
`js/webflow.js`, `js/aim-boot.js`). All third-party libraries load through
`public/js/aim-boot.js`, an idempotent, ordered loader that lives outside React
(React 19 re-inserts `<script src>` from the tree on hydration, which would run
webflow.js twice). `public/css/aim-overrides.css` keeps the page shell visible:
Webflow hides `.page-wrapper-new` by default as a page-load-animation initial
state that its IX2 engine reveals on load, and that reveal is unreliable after a
client-side re-init.

### Debug logging

The runtime logs its lifecycle to the console with an `[aim]` prefix (libraries
loaded, page mount, page-script run, Webflow reinit). Turn it off in the browser
with `window.__AIM_DEBUG = false`.

## Verification

```bash
npm run build
npm run serve                # serve out/ at http://localhost:4180 (one terminal)
npm run smoke                # headless render check of all 98 routes (another)
```

The smoke test uses Puppeteer to confirm each route renders the navbar, footer,
and content, loads its assets, produces no unexpected console errors, and that
client-side navigation works without a full reload.

## Known issues carried over from the source

- Four images are referenced but were never included in the Webflow export, so
  they render broken on the affected pages (the same as the original site):
  `Logo-Variation-CLR.avif`, `Sheridan-2.avif`, `image-21.avif`, and
  `an-architect-works-in-the-office-...-1.avif`.
- The careers page embed declares `const lenis` twice, a syntax error in that
  one script block. It failed in the original site too; it is now isolated so it
  cannot affect the rest of the careers page.
- The contact form markup is preserved but has no working backend. Webflow's
  form endpoint and reCAPTCHA verification are not available outside Webflow
  hosting, so submissions need a new endpoint wired up.
