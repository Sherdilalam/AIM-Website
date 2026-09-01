# AIM Website — Project Guide

This is the AIM marketing site (a Webflow export) rebuilt as a Next.js
application that produces a fully static site. This document explains how the
project is put together and, in detail, how to add and change pages, since that
is the next phase of work.

For a short quick-start, see [README.md](README.md). This file is the deeper
reference.

Writing or editing any page copy? [AIM-CONTENT-KNOWLEDGE-GUIDE.md](AIM-CONTENT-KNOWLEDGE-GUIDE.md)
is the source of truth for company facts, brand voice, writing rules, the
service/industry/platform/product taxonomy, and approved proof points. Ground
all copy in it; never invent facts, stats, client names, or testimonials.

## Stack

- Next.js 16.2 (App Router) with a static export (`output: 'export'`)
- React 19
- JavaScript / JSX (no TypeScript)
- No CSS framework: the Webflow CSS is used as-is
- Node scripts for the Webflow-to-app conversion and for testing (Puppeteer)

## The core idea

The site is 102 Webflow-exported HTML pages that share a navbar and footer and
carry heavy inline styles and scripts (theme toggle, English/French switch, GSAP
scroll animations, stat counters, a three.js hero on the homepage). Rather than
rewrite every page by hand, a converter splits each exported page into reusable
pieces, and a single Next.js route renders them. The exported HTML stays the
source of truth, so the site can be regenerated at any time.

```
New-AIM-code/*.html      (Webflow export, source of truth)
        │  npm run convert   (syncs assets, then converts)
        ▼
src/generated/*          (nav, footer, per-page content + scripts, route manifest)
        │  next build
        ▼
out/                     (static HTML for every route, deployable anywhere)
```

## What this export looks like

Worth understanding before changing the converter, because it is not a
conventional Webflow export. The pages are built almost entirely from
custom-code embeds rather than Webflow-native elements:

```
body.body
└── div.customcode-wrapper
    ├── div.w-embed            -> nav.nav          (shared, identical everywhere)
    ├── div.w-embed.w-script   -> section.hero, section.sec..., section.cta
    ├── div.w-embed.w-script   -> <style> for the page
    └── div.w-embed            -> footer.foot      (shared, identical everywhere)
```

Consequences that shape the app:

- **No IX2 interactions.** There is not a single `data-w-id` in the export, so
  nothing depends on Webflow replaying a page-load reveal. The previous export
  hid its shell by default and needed a CSS override to stay visible; that
  problem is gone.
- **The design's stylesheet is in the document `<head>`, not in the exported
  CSS.** About 41 KB of `<style>` in the head carries `.nav`, `.bar`, `.nlinks`,
  `.theme-tog` and the rest of the design; `architecture-in-motion.webflow.css`
  contains none of it. The typeface (Poppins and Inter) comes from a Google Fonts
  `<link>` in the head as well. A converter that only reads the body produces
  pages that have every element and no styling, which still passes a
  presence-based smoke test. The converter extracts the head CSS to
  `public/css/aim-export-head.css` and the font link to `src/generated/head.js`.
- **Styling is also partly inline per page.** Each page carries further `<style>`
  inside its embeds. Page content and page CSS travel together, which the
  converter preserves by keeping the embed blocks intact.
- **Nav and footer are byte-identical** across every page that has them, so
  extracting them once from `index.html` and reusing them is exact, not an
  approximation.
- **Libraries vary per page.** Most pages need only the shared core. The homepage
  additionally needs three.js and PureCounter; the careers page needs Lenis and
  the BambooHR embed.

## Directory layout

```
app/
  layout.jsx             Root layout: <html>/<body>, shared navbar + footer,
                         stylesheets, favicons, the pre-paint theme/language
                         script, and the boot loader for shared libraries.
  [[...slug]]/page.jsx   One dynamic route that statically generates every page
                         from the manifest, renders its preserved content, emits
                         its JSON-LD, and sets per-page metadata.
  not-found.jsx          404 page.

src/
  components/
    Navbar.jsx           Server component; inlines src/generated/nav.html.
    Footer.jsx           Server component; inlines src/generated/footer.html.
    GlobalChrome.jsx     Client; runs the shared chrome script once, then
                         releases the routes waiting on it.
    PageRuntime.jsx      Client; page libraries, content effects, per-route
                         script execution, Webflow reinit.
    LinkInterceptor.jsx  Client; routes internal <a> clicks client-side.
  lib/
    webflow.js           Runtime helpers: run preserved scripts, load page
                         libraries, re-apply content effects, reinit Webflow,
                         active-nav, debug logging.
  generated/             GENERATED by the converter. Do not hand-edit.
    content/<slug>.html  Each page's unique content (nav/footer/scripts removed).
    scripts/<slug>.js    Each page's page-specific inline scripts.
    nav.html             Shared navbar (extracted from index.html).
    footer.html          Shared footer (extracted from index.html).
    global-chrome.js     Scripts shared across ~all pages, run once per session.
    head.js              Head assets the export applies to every page: the
                         extracted stylesheet's href and the webfont links.
    routes.js            Route manifest: slug, path, title, description,
                         canonical, ogImage, wfPage, jsonLd, libs,
                         extraHeadCss, extraHeadLinks, empty.

public/
  css/                   normalize.css, webflow.css, the site CSS,
                         aim-export-head.css (GENERATED by the converter from the
                         export's head <style>), aim-overrides.css
  images/                All site images
  documents/             PDFs
  js/
    webflow.js           Webflow's runtime (jQuery + IX2 modules)
    aim-boot.js          Ordered, idempotent loader for the shared libraries

New-AIM-code/            The current Webflow export (converter input)
legacy/                  The previous export. Not part of the build; reference only.

scripts/
  sync-assets.mjs        Webflow export css/images/js -> public/
  convert.mjs            Webflow export HTML -> src/generated/*
  serve-out.mjs          Tiny static server for out/ (used by npm run serve/smoke)
  smoke-all.mjs          Headless render check of every route

next.config.mjs          output: export, images unoptimized, trailingSlash, etc.
```

## Commands

```bash
npm install
npm run dev        # dev server with hot reload at http://localhost:3000
npm run sync       # copy the export's css/images/js into public/
npm run convert    # sync, then regenerate src/generated/* from New-AIM-code/
npm run build      # static export to out/
npm run serve      # serve out/ at http://localhost:4180
npm run smoke      # headless check of all routes (run `npm run serve` first)
```

Note: `next start` is intentionally not used. It is incompatible with
`output: 'export'`; serve the exported `out/` folder with `npm run serve` or any
static host instead.

## How rendering works

1. `next build` reads the manifest (`src/generated/routes.js`) and, through
   `generateStaticParams` in `app/[[...slug]]/page.jsx`, prerenders one static
   HTML file per route. `dynamicParams = false`, so only known routes exist and
   anything else 404s.
2. For each route, the server component reads that page's content
   (`src/generated/content/<slug>.html`) and renders it into `<main>` with
   `dangerouslySetInnerHTML`. Because this is server-rendered, the real content
   is in the static HTML, which is good for SEO and for no-JavaScript viewing.
3. `generateMetadata` sets the page's title, description, canonical URL and Open
   Graph tags from the manifest, and the page's `application/ld+json` blocks are
   emitted server-side alongside the content.
4. The root layout wraps every page with the persistent navbar and footer and
   loads the shared libraries once.
5. On the client, `GlobalChrome` runs the shared chrome script once;
   `PageRuntime` then loads the route's own libraries, re-applies the content
   effects, runs the page's preserved scripts and reinitialises Webflow;
   `LinkInterceptor` turns internal links into client-side navigations.

## The client runtime

The shared libraries (WebFont, jQuery, `webflow.js`, GSAP + ScrollTrigger, the
chatbot widget, Google Analytics) load through `public/js/aim-boot.js`. This
loader:

- Runs once (guarded by `window.__aimBooted`), even though React 19 can re-insert
  `<script>` tags on hydration. Loading `webflow.js` twice corrupts its module
  registry, which is why the libraries are not plain `<script>` tags.
- Loads sequentially so order holds: jQuery before `webflow.js`, gsap before
  ScrollTrigger.
- Sets `window.__aimLibsReady` and fires an `aim-libs-ready` event once the core
  libraries are ready, then continues with the non-critical extras.

Libraries only some pages need are not in that list. The converter records them
per route in the manifest, and `loadLibs()` fetches them on demand before the
page's scripts run, cached by URL so a revisit does not re-fetch. This keeps
three.js (about 600 KB) off the 97 routes that do not use it.

`src/lib/webflow.js` provides:

- `runScript(code)` — executes preserved script text. Blocks separated by a
  sentinel are run independently (like separate `<script>` tags), so one broken
  block cannot break the others, and `load`/`DOMContentLoaded` handlers fire
  immediately since the DOM is already mounted.
- `whenLibsReady(cb)` — waits for `window.__aimLibsReady` before running page
  scripts. Resolves immediately on later client-side navigations.
- `whenChromeReady(cb)` / `markChromeReady()` — ordering between the shared
  chrome script and the routes. See the next section.
- `loadLibs(srcs)` — loads a route's page-specific libraries in order.
- `applyContentEffects()` — re-applies the scroll reveals and stat counters to a
  newly mounted route.
- `reinitWebflow()` — `Webflow.destroy()` + `ready()` + `ix2.init()` against the
  current DOM. This export has no IX2 data, so it is defensive rather than
  load-bearing.
- `killScrollTriggers()` — clears GSAP ScrollTriggers when a route unmounts.
- `setActiveNav(path)` — marks the current nav link with `aria-current`.
- `alog(...)` — prefixed debug logging (see Debugging).

## Script ordering, and why it matters

The shared chrome script owns the site-wide scroll reveals: it selects every
`.reveal` element, sets it to `opacity: 0` with a 48px offset, and animates it
back in on scroll. It also arms the stat counters, which animate `.count`
elements from a placeholder `0` up to their `data-to` value.

That single fact produces two failure modes, both handled deliberately:

1. **A route's scripts must wait for the chrome script.** `PageRuntime` clears
   GSAP ScrollTriggers when a route unmounts. If a route's work were allowed to
   interleave with the chrome script, that cleanup could destroy triggers the
   chrome script had only just created, and the affected content would stay at
   `opacity: 0` forever. `PageRuntime` therefore waits on `whenChromeReady`
   before doing anything, and does not clear triggers at mount at all: the
   previous route's unmount already did that. `GlobalChrome` calls
   `markChromeReady()` in a `finally`, so a failure in the chrome script degrades
   the chrome instead of blocking every page, and `whenChromeReady` has a 4s
   fallback for the same reason.
2. **The chrome script runs once per session, but its effects are per page.** On
   a client-side navigation the incoming page's `.reveal` and `.count` elements
   would never be touched: reveals would not animate, and counters would sit on
   `0` rather than counting up, which shows visibly wrong numbers.
   `applyContentEffects()` re-applies both for every route after the first, and
   marks what it processed (`data-aim-revealed`, `data-aim-counted`) so nothing is
   animated twice.

`applyContentEffects()` mirrors the SCROLL REVEALS and STAT COUNTERS sections of
`src/generated/global-chrome.js`. If a future export changes their timing or
easing, update both together.

## Styling note

The site stylesheet carries a Webflow content hash in its filename, which changes
on every publish. `scripts/sync-assets.mjs` copies it to the stable name
`public/css/architecture-in-motion.webflow.css`, so `app/layout.jsx` never needs
editing after a re-export. Put app-level CSS overrides in
`public/css/aim-overrides.css`; it loads after the Webflow stylesheets and the
asset sync never overwrites it.

One caveat when dropping in a new export: delete the previous hashed stylesheet
from `New-AIM-code/css/` at the same time. `sync-assets.mjs` picks the site
stylesheet by matching `*.webflow.css`, so leaving two of them behind makes the
choice depend on directory order.

## The Webflow site id

Two files carry the Webflow project's site id by hand: the `data-wf-site`
attribute in [app/layout.jsx](app/layout.jsx) and `SITE_ID` in
[public/js/aim-boot.js](public/js/aim-boot.js), where it is the `?site=` query on
Webflow's jQuery CDN URL. Nothing derives them from the export, so if the Webflow
project is rebuilt rather than republished (the id in the export's `<html
data-wf-site>` changes), update both. It changed from `6a68f37e87efa6a5b2b2119b`
to `6a79aa1b9c4ff1f5e5ab7a07` with the 11 Aug 2026 export.

## Adding pages

There are two supported ways to add a page.

### Path A — a page from Webflow (recommended, matches the rest of the site)

1. Build the page in Webflow and export the site (or that page).
2. Copy the page's HTML into `New-AIM-code/`. The filename is the route:
   `New-AIM-code/pricing.html` becomes `/pricing`; `index.html` is the home page
   `/`.
3. Copy any new images into `New-AIM-code/images/` and any PDFs into
   `New-AIM-code/documents/`. The asset sync will pick them up.
4. Run `npm run convert`. This syncs assets and regenerates `src/generated/*`,
   including the new page's content, its page-specific scripts, its libraries and
   a manifest entry.
5. Run `npm run build` (or just let `npm run dev` pick it up).

No code changes are needed. The new route is prerendered with the shared navbar
and footer and its own metadata.

What the converter expects of the exported HTML:

- The page uses this export's structure: a `.customcode-wrapper` holding, in
  order, the block containing the navbar (`nav.nav`), the content blocks, and the
  block containing the footer (`footer.foot`). It falls back to the previous
  export's `.main-wrapper-3` / `[role="banner"]` / `.section-footer` names, then
  to `body`. If a future export uses different names again, update the `main`,
  `nav.nav` and `footer.foot` lookups in `scripts/convert.mjs`.
- The navbar and footer are taken from `index.html` only and reused everywhere. A
  page with a different navbar or footer still gets the `index.html` one.
- Title, meta description, canonical, `og:image`, JSON-LD and `data-wf-page` are
  read from the export's `<head>`, along with the design stylesheet and the
  webfont links (see the export notes above). The head `<style>` shared by at
  least 90% of pages becomes `public/css/aim-export-head.css`; a page whose head
  CSS differs carries only its remainder inline, so the shared sheet is never
  duplicated.
- Library `<script src>` tags are dropped if they are part of the shared core and
  recorded per route otherwise. Inline scripts are kept and split into shared
  chrome versus page-specific.
- Inline scripts are syntax-checked. A block that cannot be parsed is reported
  and dropped rather than shipped, since it would only throw in the browser. This
  is how the converter handles embeds with an unterminated `<script>`, which make
  every parser swallow the rest of the document.
- To exclude a file from routing, add its name to `EXCLUDE` in
  `scripts/convert.mjs` (currently `draft.html` and `home-animation-2/3/4.html`).

### Path B — a hand-authored React page (not from Webflow)

Do not put hand-written files in `src/generated/`; the converter overwrites it.
Instead add a normal Next.js route, which takes precedence over the catch-all:

1. Create `app/<route>/page.jsx` as a regular React component (add `'use client'`
   if it needs browser APIs or interactivity).
2. It renders inside the shared layout automatically, so it gets the navbar,
   footer, libraries and theme. Reuse the export's CSS classes to match the look,
   or add your own styles in `public/css/aim-overrides.css`.
3. Run `npm run build`; `/<route>` is generated statically.

Keep the route's slug distinct from any `New-AIM-code/*.html` slug so a route has
only one source.

### Adding a page to the navigation menu

New pages are not added to the menu automatically. The navbar and footer come
from `index.html`. To add a menu link durably, add it to the Webflow navigation,
re-export `index.html` into `New-AIM-code/`, and run `npm run convert`. A one-off
edit to `src/generated/nav.html` works too, but the next `npm run convert`
overwrites it.

## Build and deploy

`npm run build` writes a complete static site to `out/`, with `trailingSlash`
enabled so each route is a folder containing `index.html` (for example
`out/about-us/index.html`). Deploy `out/` to any static host.

- Internal links work as normal static URLs on first load and as client-side
  navigations once the app has loaded.
- Configure the host to serve `out/404.html` for unknown paths.
- On Azure Static Web Apps, point the app artifact at `out/` and set a
  `navigationFallback`/404 rule to `404.html`.

## Testing

`scripts/smoke-all.mjs` uses Puppeteer to load every route and assert that the
navbar, footer and content are present, that the page shell is actually visible
(computed display, rendered height, and non-empty text, not just DOM presence),
that there are no unexpected console errors, and that client-side navigation
works without a full reload. Broken images are reported separately.

Three things it does deliberately:

- It asserts layout, not only presence: the navbar must be a horizontal bar
  spanning the viewport, `#themeToggle` must have real dimensions, and the body
  must be set in Poppins or Inter. A presence-only check passes on a page holding
  all its markup and none of its CSS, which is precisely the failure mode when the
  head stylesheet is not carried across. Blocking `aim-export-head.css` makes all
  three assertions fail, which is the intended behaviour.
- Routes the export has no content for are asserted as chrome-only. Demanding a
  populated `<main>` there would report an upstream content gap as a conversion
  failure.
- `KNOWN_UPSTREAM` lists defects in the Webflow source. A route listed there must
  still render correct chrome and content; it is only allowed to log the console
  error its own broken source produces. They are reported in their own section so
  they stay visible without masking a real regression.

```bash
npm run build
npm run serve      # terminal 1
npm run smoke      # terminal 2
```

## Debugging

The runtime logs its lifecycle to the browser console with an `[aim]` prefix:
libraries loaded (and which globals are present), page mount, page libraries,
page-script execution, content effects and Webflow reinit. Turn it off with
`window.__AIM_DEBUG = false` in the console, or on again with `true`.

## Known issues in the current export

All of these are defects in the Webflow source rather than the conversion, and
each one fails in the plain Webflow export too. `npm run convert` reports the
script problems every run, and `npm run smoke` reports the rest.

- **6 routes have no content.** `/application-modernization-services`,
  `/enterprise-ai`, `/gallery`, `/industries`, `/platforms` and `/services` have
  bodies containing only `<script>`, so they render as navbar and footer with
  nothing between. `legacy/` has real content for all of them, so they need
  building out in Webflow. This was 15 routes before the 11 Aug 2026 export, which
  filled in `/bi`, `/it-digital-strategy`, `/itsm`,
  `/goright-fleet-ai-knowledge-assistant` and all five legal/policy pages.
- **`/gallery` is a leftover, not part of the current export.** The 11 Aug 2026
  export does not contain `gallery.html`; the copy in `New-AIM-code/` is from the
  previous site. Nothing links to it, and because its head `<style>` is the
  previous design's it is the reason `npm run convert` reports 40 KB of extra head
  CSS for that one route. Either build the page in Webflow or add `gallery.html`
  to `EXCLUDE` in `scripts/convert.mjs` to drop the route.
- **The contact form cannot be submitted.** `/contact-us` renders its fields, but
  the export contains no `<form>` wrapper, so the script that would bind the
  submit handler finds nothing. Beyond that, Webflow's form endpoint only works
  on Webflow hosting, so a submission endpoint is needed either way.
- **The careers page declares `const lenis` twice** in one block, a syntax error.
  The converter reports and drops that block. This has been broken across three
  exports now.
- **One Unsplash image 404s** and renders broken. It is referenced by `/about-us`
  and `/semantic-modeling-olap-ssas-tabular`.
- **`/vital-sense`'s partner logos are partly missing.** Its script builds the
  logo grids from `cdn.simpleicons.org`, and 6 of those slugs still return 404
  (`ibm`, `microsoftazure`, `amazonwebservices`, `servicenow`, `salesforce`,
  `oracle`); it was 24 before the 11 Aug 2026 export. The script's own `onerror`
  hides a failed icon, so the labels still read correctly and nothing looks
  broken, but those logos stay absent until the slugs are updated.

Fixed by the 11 Aug 2026 export, kept here because the shape of the failure is
worth recognising if it returns: `application-technology-managed-services.html`
and `l1-l2-l3-support-services.html` each used to open a `<script>` that was
never closed, which makes every parser (ours and the browser's alike) treat the
rest of the document as script text. The converter trims the markup back off and
drops the block if what remains still will not parse.

## Conventions worth keeping

- Treat `src/generated/` as build output. Change pages through `New-AIM-code/`
  plus `npm run convert`, or through new `app/` routes, never by editing
  generated files.
- Keep app-level CSS in `public/css/aim-overrides.css`. Not in the exported
  stylesheets, which the asset sync overwrites, and not in
  `public/css/aim-export-head.css`, which the converter regenerates.
- If you change the reveal or counter behaviour, change it in both
  `global-chrome.js`'s source (the Webflow embed) and `applyContentEffects()`.
- Re-run `npm run smoke` after adding pages to confirm they render and are
  visible.
- `convert.mjs` builds into `src/generated.staging/` and only renames it over
  `src/generated/` as its very last step, rather than deleting `src/generated/`
  up front and writing into it for the several seconds the rest of the script
  takes. `app/layout.jsx` and `app/[[...slug]]/page.jsx` import `head.js` and
  `routes.js` from that directory, so if a live `npm run dev` compiles while
  those files are genuinely missing, Turbopack fails with "Module not found"
  and can keep showing that error well after the files come back. Don't
  reintroduce a delete-then-repopulate version of this even for a quick fix;
  keep the write-to-staging-then-rename shape.
