# AIM Website (Next.js)

The AIM marketing site, converted from its Webflow static export into a Next.js
application. It uses Next.js 16.2 (App Router), React 19, and a static HTML
export.

For the full architecture and, in particular, how to add more pages, see
[PROJECT.md](PROJECT.md).

## Running it

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # static export into out/
```

`npm run build` produces a fully static site in `out/` (via `output: 'export'`),
so it deploys to any static host with no Node server. There are 98 routes.

## How the conversion works

The current Webflow export lives in `New-AIM-code/` and is the source of truth:
102 HTML pages plus the CSS, images and `webflow.js` that go with them. A
converter turns it into the fragments the app renders. Nothing in
`src/generated/` is edited by hand.

```bash
npm run sync       # copy the export's css/images/js into public/
npm run convert    # sync, then regenerate src/generated/* from New-AIM-code/*.html
```

This export is built almost entirely from Webflow custom-code embeds rather than
Webflow-native elements. Each page is a `.customcode-wrapper` holding a series of
`.w-embed` blocks: one contains `nav.nav`, one contains `footer.foot`, and the
rest hold the page's sections along with their own `<style>` and `<script>`.
There are no IX2 interactions anywhere (no `data-w-id`), so nothing depends on
Webflow replaying a page-load animation.

`scripts/convert.mjs` parses each page and:

1. Extracts the shared navbar (`nav.nav`) and footer (`footer.foot`) once, into
   `src/generated/nav.html` and `src/generated/footer.html`. Both are
   byte-identical across every page that has them.
2. Writes each page's unique content (the blocks between nav and footer) to
   `src/generated/content/<slug>.html`, with `.html` links rewritten to routes
   and relative asset paths rewritten to root-absolute (`/images/...`).
3. Separates the page scripts. Blocks byte-identical across nearly all pages
   (the language engine, custom cursor, nav behaviour, theme toggle, scroll
   reveals, stat counters) become global chrome in
   `src/generated/global-chrome.js` and run once per session. The rest, mostly
   per-page translations and animations, go to
   `src/generated/scripts/<slug>.js` and run on each visit to that route.
4. Extracts the design's stylesheet. This export keeps roughly 41 KB of CSS in a
   `<style>` in the document `<head>`, not in the exported `.webflow.css`, and
   pulls its typeface (Poppins and Inter) from a Google Fonts `<link>` there too.
   Neither is in the body. The shared block is written once to
   `public/css/aim-export-head.css` and the font link is recorded in
   `src/generated/head.js`, both loaded by the layout. Without this the site
   renders as an unstyled column.
5. Records the libraries each page needs beyond the shared core, so three.js
   is not shipped to the 97 routes that never use it.
6. Preserves each page's `application/ld+json` structured data (97 pages have
   it, nearly all distinct) and emits it server-side.
7. Builds `src/generated/routes.js`, the route manifest (slug, path, title,
   description, canonical, og image, Webflow page id, JSON-LD, libraries, any
   extra head CSS, and whether the export has any content for the route).

`draft.html` and `home-animation-2/3/4.html` are excluded: the first is
Webflow's scratch page, the others are homepage design variants kept in the
export for internal review.

`legacy/` holds the previous export. It is no longer part of the build and is
kept only for reference.

## App structure

- `app/layout.jsx` renders `<html>`/`<body>`, the persistent navbar and footer,
  the Webflow stylesheets, favicons, the pre-paint theme and language script, and
  the boot loader for the shared libraries.
- `app/[[...slug]]/page.jsx` is one dynamic route that statically generates every
  page. It reads the page's preserved content and renders it server-side (real
  HTML in the export, good for SEO), sets per-page metadata via
  `generateMetadata`, emits the page's JSON-LD, and mounts the client runtime.
- `src/components/` holds the server components that inline the shared nav/footer
  and the client components that run the scripts:
  - `GlobalChrome` runs the shared chrome scripts once, then signals that routes
    may proceed.
  - `PageRuntime` loads the route's page-specific libraries, re-arms the shared
    content effects, runs the page's scripts, reinitialises Webflow, sets the
    active nav link, and records a page view.
  - `LinkInterceptor` routes internal links client-side.
- `src/lib/webflow.js` executes preserved scripts the way the browser originally
  did: each block is evaluated independently so one error cannot break the rest,
  and `load`/`DOMContentLoaded` handlers fire immediately since the DOM is
  already mounted. It also loads page libraries on demand and re-applies the
  scroll reveals and stat counters after a client-side navigation.

Static assets are served from `public/` (`css/`, `images/`, `documents/`,
`js/webflow.js`, `js/aim-boot.js`). The shared libraries (WebFont, jQuery,
`webflow.js`, GSAP + ScrollTrigger, the chatbot widget, Google Analytics) load
through `public/js/aim-boot.js`, an idempotent, ordered loader that lives outside
React, because React 19 re-inserts `<script src>` from the tree on hydration and
running `webflow.js` twice corrupts its module registry. Put app-level CSS in
`public/css/aim-overrides.css`; it loads last and the asset sync never touches
it.

### Two ordering rules worth knowing

The shared chrome script creates the site-wide scroll reveals by setting
`.reveal` elements to `opacity: 0` and animating them back in on scroll. Two
consequences fall out of that, and both are handled in the runtime:

- A route's own scripts must not run until the chrome script has finished.
  Otherwise the per-route ScrollTrigger cleanup can tear down triggers the chrome
  script has only just created, which leaves that content permanently invisible.
- The chrome script runs once per session, so on a client-side navigation the
  incoming page's `.reveal` and `.count` elements would never be touched. Reveals
  would not animate, and stat counters would sit on their placeholder `0` instead
  of counting up. `applyContentEffects()` re-applies both per route, and marks
  what it has processed so nothing is animated twice.

### Debug logging

The runtime logs its lifecycle to the console with an `[aim]` prefix (libraries
loaded, page mount, page libraries, page-script run, Webflow reinit). Turn it off
in the browser with `window.__AIM_DEBUG = false`.

## Verification

```bash
npm run build
npm run serve                # serve out/ at http://localhost:4180 (one terminal)
npm run smoke                # headless render check of all 98 routes (another)
```

The smoke test uses Puppeteer to confirm each route renders the navbar, footer
and content, that the shell is actually visible rather than merely present in the
DOM, that there are no unexpected console errors, and that client-side navigation
works without a full reload. It knows which routes the export has no content for
and asserts working chrome on those instead of demanding a populated `<main>`.

It also asserts **layout**, not just presence: the navbar has to be a horizontal
bar spanning the viewport, the theme button has to have real dimensions, and the
body has to be set in the design's typeface. Presence checks alone pass happily
on a page that has all its markup and none of its CSS, which is exactly what
happens if the head stylesheet above is not carried over.

## Known issues in the current export

These are defects in the Webflow source, not in the conversion. Each one fails in
the plain Webflow export too.

- 15 routes have no content in this export and render as navbar and footer only:
  `/application-modernization-services`, `/bi`, `/enterprise-ai`, `/gallery`,
  `/industries`, `/it-digital-strategy`, `/itsm`, `/legal-notice`,
  `/mirlin-ai-knowledge-assistant`, `/platforms`, `/privacy-policy`, `/services`,
  `/terms-conditions`, `/terms-of-use`, `/workplace-policy`. The previous export
  has content for all of them, so these pages need building out in Webflow.
- `/contact-us` renders its contact fields but the export contains no `<form>`
  wrapper, so the submit script has nothing to bind to and the form cannot be
  submitted.
- `application-technology-managed-services.html` and
  `l1-l2-l3-support-services.html` each contain a `<script>` that is never
  closed, which makes every parser swallow the rest of the document. The
  converter reports these and drops the unparseable block, so those two pages
  render but skip their own animations.
- The careers page embed declares `const lenis` twice, a syntax error in that one
  block. The converter reports it and drops the block.
- One Unsplash image referenced by the export returns an error and renders
  broken.
- `/vital-sense` builds its partner logo grids from `cdn.simpleicons.org`, and 24
  of those icon URLs now 404. The page's own script hides an icon that fails to
  load, so the labels still read correctly and nothing appears visibly broken,
  but the logos are missing until the slugs are updated.
