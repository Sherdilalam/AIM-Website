// Webflow static export -> framework-agnostic fragments for the Next.js app.
// Splits each page into shared nav/footer + unique content, rewrites asset/link
// URLs for routing, and separates "global chrome" scripts (run once) from
// per-page scripts (run on each route). Run with: npm run convert
//
// This export builds its pages out of Webflow custom-code embeds rather than
// Webflow-native elements: a `.customcode-wrapper` holds a series of `.w-embed`
// blocks, one of which contains `nav.nav`, one `footer.foot`, and the rest the
// page's sections plus their own <style> and <script>. There are no IX2
// interactions (no `data-w-id` anywhere), so nothing depends on Webflow
// replaying a page-load animation.
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Script } from 'node:vm';

const SRC_DIR = 'New-AIM-code'; // current Webflow export (source of truth)

// Not real routes: `draft` is Webflow's scratch page, and the `home-animation-*`
// files are homepage design variants kept in the export for internal review.
const EXCLUDE = new Set([
  'draft.html',
  'home-animation-2.html',
  'home-animation-3.html',
  'home-animation-4.html',
]);

const DIRS = {
  content: 'src/generated/content',
  scripts: 'src/generated/scripts',
  base: 'src/generated',
};
if (existsSync(DIRS.base)) rmSync(DIRS.base, { recursive: true, force: true });
for (const d of [DIRS.content, DIRS.scripts]) mkdirSync(d, { recursive: true });

const PARSE_OPTS = { comment: false, blockTextElements: { script: true, style: true, noscript: true } };

// ---- entity decode (for title/description used as plain text) ----
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' };
function decodeEntities(s) {
  if (!s) return '';
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, code) => {
    if (ENT[code] !== undefined) return ENT[code];
    if (code[0] === '#') {
      const n = code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return m;
  });
}

// ---- URL rewriting: relative asset paths -> root-absolute; .html links -> routes ----
const EXCLUDED_SLUGS = new Set([...EXCLUDE].map((f) => f.replace(/\.html$/i, '')));

function rewriteUrl(val) {
  if (val == null) return val;
  const v = String(val).trim();
  if (!v) return val;
  if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/|\/)/i.test(v)) return val;
  if (v === 'index.html') return '/';
  const s = v.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
  if (s.startsWith('images/') || s.startsWith('documents/') || s.startsWith('css/') || s.startsWith('js/')) {
    return '/' + s;
  }
  const m = s.match(/^([^?#]+)\.html([?#].*)?$/);
  if (m) return (m[1] === 'index' ? '/' : '/' + m[1]) + (m[2] || '');
  return val;
}

function rewriteAssets(html) {
  if (!html) return html;
  html = html.replace(
    /\b(src|href|poster|data-src|data-bg-src)=("|')([^"']*)\2/g,
    (m, attr, q, val) => `${attr}=${q}${rewriteUrl(val)}${q}`,
  );
  html = html.replace(/\bsrcset=("|')([^"']*)\1/g, (m, q, val) => {
    const out = val
      .split(',')
      .map((part) => {
        const seg = part.trim();
        if (!seg) return '';
        const sp = seg.split(/\s+/);
        sp[0] = rewriteUrl(sp[0]);
        return sp.join(' ');
      })
      .filter(Boolean)
      .join(', ');
    return `srcset=${q}${out}${q}`;
  });
  html = html.replace(/url\((\s*['"]?)([^)'"]+)(['"]?\s*)\)/g, (m, pre, u, post) => `url(${pre}${rewriteUrl(u.trim())}${post})`);
  return html;
}

// ---- third-party libraries ----
// These load once for every page via public/js/aim-boot.js, so drop them here.
const CORE_LIB = [
  /webfont\.js/i,
  // Webflow's jQuery URL carries a build hash: jquery-3.5.1.min.dc5e7f18c8.js
  /\bjquery[-.\d]*\.min\./i,
  /(^|\/)js\/webflow\.js$/i,
  /gsap\.min\.js/i,
  /ScrollTrigger\.min\.js/i,
  /aim-chatbot\.js/i,
  /googletagmanager\.com\/gtag/i,
];
// Anything else a page pulls in (three.js on the homepage, Lenis and the
// BambooHR embed on careers, PureCounter on the homepage) is recorded per page
// and loaded on demand, so a 600 KB 3D library is not shipped to 97 routes that
// never use it.
const isCoreLib = (src) => CORE_LIB.some((re) => re.test(src));

// ---- collect page files ----
if (!existsSync(SRC_DIR)) {
  console.error(`Source dir "${SRC_DIR}" not found (expected the Webflow export).`);
  process.exit(1);
}
const files = readdirSync(SRC_DIR)
  .filter((f) => f.toLowerCase().endsWith('.html') && !EXCLUDE.has(f))
  .sort();
if (!files.length) {
  console.error('No .html files found in', SRC_DIR);
  process.exit(1);
}

// Handled outside the preserved scripts: the chatbot boot, the GA snippet and the
// WebFont call all live in aim-boot.js, and Webflow's `w-mod-` probe runs in the
// document head before React mounts.
const SKIP_INLINE = /AIMChatbot|dataLayer\s*=|gtag\s*\(|WebFont\.load|w-mod-/;

// Parse-only syntax check (never executes the code).
function isParseable(code) {
  try {
    new Script(code);
    return true;
  } catch {
    return false;
  }
}

// An embed that forgets to close its <script> makes every parser -- ours and the
// browser's alike -- swallow the rest of the document as script text, which then
// dies on the first '<'. Trim the markup back off; if what remains still does not
// parse (the author's function was left unclosed too), drop the block rather than
// shipping code that is guaranteed to throw. Either way it is reported, because
// the fix belongs in Webflow.
const HTML_RESUMES = /<\/(?:div|section|footer|nav|main|header|body|html)\s*>/i;
const malformed = [];

function sanitizeInline(text, file) {
  if (isParseable(text)) return text;
  const at = text.search(HTML_RESUMES);
  if (at > 0) {
    const cut = text.slice(0, at);
    if (isParseable(cut)) {
      malformed.push({ file, kind: 'unterminated <script>, markup trimmed and script kept' });
      return cut;
    }
    malformed.push({ file, kind: 'unterminated <script> and unclosed function, block dropped' });
    return null;
  }
  malformed.push({ file, kind: 'inline script does not parse, block dropped' });
  return null;
}

const pages = [];
let navHtml = null;
let footerHtml = null;

for (const file of files) {
  const raw = readFileSync(`${SRC_DIR}/${file}`, 'utf8');
  const root = parse(raw, PARSE_OPTS);
  const htmlEl = root.querySelector('html');
  const slug = file.replace(/\.html$/i, '');
  const routePath = slug === 'index' ? '/' : '/' + slug;

  const title = decodeEntities(root.querySelector('title')?.text?.trim() || '');
  const description = decodeEntities(root.querySelector('meta[name="description"]')?.getAttribute('content') || '');
  const wfPage = htmlEl?.getAttribute('data-wf-page') || '';
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

  // Per-page schema.org structured data, kept verbatim for SEO.
  const jsonLd = root
    .querySelectorAll('script[type="application/ld+json"]')
    .map((s) => s.text.trim())
    .filter(Boolean);

  // This export keeps the design's whole stylesheet (about 41 KB of it) in a
  // <style> in the document head, not in the exported .webflow.css, and pulls its
  // typeface from Google Fonts by a <link> there too. Neither is in the body, so
  // both have to be collected explicitly or the site renders unstyled.
  const headCss = root.querySelectorAll('head style').map((s) => s.text).join('\n');
  const headLinks = root
    .querySelectorAll('head link[rel="stylesheet"]')
    .map((l) => l.getAttribute('href'))
    .filter((h) => h && /^https?:/i.test(h));

  // Harvest scripts BEFORE extracting content: content extraction strips <script>
  // elements out of the tree, so anything read afterwards would come up empty.
  // Libraries this page needs beyond the shared core.
  const libs = [];
  root.querySelectorAll('script[src]').forEach((s) => {
    const src = s.getAttribute('src');
    if (!src || isCoreLib(src)) return;
    const url = /^(https?:)?\/\//i.test(src) ? src : rewriteUrl(src);
    if (!libs.includes(url)) libs.push(url);
  });

  const scripts = [];
  root.querySelectorAll('body script').forEach((s) => {
    if (s.getAttribute('src')) return;
    const raw0 = s.text;
    if (!raw0 || !raw0.trim()) return;
    if (SKIP_INLINE.test(raw0)) return;
    const text = sanitizeInline(raw0, file);
    if (!text || !text.trim()) return;
    scripts.push({ text, hash: createHash('sha1').update(text).digest('hex') });
  });

  // The embed wrapper is the page shell. Pages the redesign has not been built
  // out on yet have a body containing only <script>, and fall through to `body`
  // where every child is filtered out, leaving empty content.
  const main =
    root.querySelector('.customcode-wrapper') ||
    root.querySelector('.main-wrapper-3') ||
    root.querySelector('.page-wrapper-new') ||
    root.querySelector('body');
  const kids = main.childNodes.filter((n) => n.nodeType === 1);

  // Nav and footer sit *inside* embed blocks rather than being direct children,
  // so find the block that contains each and treat that whole block as chrome.
  const holderOf = (sel) => {
    const el = main.querySelector(sel);
    if (!el) return -1;
    return kids.findIndex((k) => k === el || k.querySelector(sel));
  };
  const nIdx = holderOf('nav.nav') >= 0 ? holderOf('nav.nav') : holderOf('[role="banner"]');
  const fIdx = holderOf('footer.foot') >= 0 ? holderOf('footer.foot') : holderOf('.section-footer');

  let contentEls;
  if (nIdx >= 0 && fIdx >= 0) contentEls = kids.slice(nIdx + 1, fIdx);
  else if (nIdx >= 0) contentEls = kids.slice(nIdx + 1);
  else contentEls = kids.filter((_, i) => i !== fIdx);

  let contentHtml = contentEls
    .filter((el) => el.rawTagName !== 'script') // drop top-level <script> elements
    .map((el) => {
      el.querySelectorAll('script').forEach((s) => s.remove()); // drop nested <script>
      return el.outerHTML;
    })
    .join('\n');
  contentHtml = rewriteAssets(contentHtml);

  if (slug === 'index' && nIdx >= 0 && fIdx >= 0) {
    navHtml = rewriteAssets(kids[nIdx].outerHTML);
    footerHtml = rewriteAssets(kids[fIdx].outerHTML);
  }

  pages.push({
    slug, path: routePath, title, description, wfPage, canonical, ogImage,
    jsonLd, libs, contentHtml, scripts, headCss, headLinks,
    empty: !contentHtml.trim(),
  });
}

if (!navHtml || !footerHtml) {
  console.error('Failed to extract shared nav/footer from index.html');
  process.exit(1);
}

const N = pages.length;

// ---- shared head CSS + webfont links ----
// The head <style> is identical on nearly every page, so emit it once as a real
// stylesheet. That is one cached request instead of ~41 KB inlined into all 98
// pages, and it keeps the exported HTML small. It must load after the Webflow
// stylesheets (it overrides them) and before aim-overrides.css.
const HEAD_CSS_FILE = 'aim-export-head.css';
const countBy = (vals) => {
  const m = new Map();
  for (const v of vals) m.set(v, (m.get(v) || 0) + 1);
  return m;
};

const cssCounts = countBy(pages.map((p) => p.headCss).filter((s) => s.trim()));
const sharedHeadCss = [...cssCounts].filter(([, c]) => c >= Math.floor(N * 0.9)).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
if (sharedHeadCss) {
  mkdirSync('public/css', { recursive: true });
  writeFileSync(
    `public/css/${HEAD_CSS_FILE}`,
    '/* Auto-generated from the Webflow export\'s <head> <style>. Do not edit;\n' +
      '   npm run convert overwrites it. App overrides belong in aim-overrides.css. */\n' +
      sharedHeadCss,
  );
}

// Fonts the whole site uses. Anything a single page adds is kept on that page.
const linkCounts = countBy(pages.flatMap((p) => [...new Set(p.headLinks)]));
const sharedHeadLinks = [...linkCounts].filter(([, c]) => c >= Math.floor(N * 0.9)).map(([h]) => h);
writeFileSync(
  `${DIRS.base}/head.js`,
  '// Auto-generated: head assets the export applies to every page.\n' +
    `export const headCssHref = ${sharedHeadCss ? JSON.stringify('/css/' + HEAD_CSS_FILE) : 'null'};\n` +
    `export const stylesheets = ${JSON.stringify(sharedHeadLinks, null, 2)};\n`,
);

// A page whose head CSS differs carries only the remainder, so the shared sheet
// is never duplicated.
for (const p of pages) {
  p.extraHeadCss =
    p.headCss && p.headCss !== sharedHeadCss
      ? (sharedHeadCss && p.headCss.includes(sharedHeadCss) ? p.headCss.split(sharedHeadCss).join('') : p.headCss).trim()
      : '';
  p.extraHeadLinks = [...new Set(p.headLinks)].filter((h) => !sharedHeadLinks.includes(h));
}

// ---- classify scripts: identical across >=90% of pages => global chrome (run once) ----
const hashCount = new Map();
for (const p of pages) for (const s of p.scripts) hashCount.set(s.hash, (hashCount.get(s.hash) || 0) + 1);
const THRESH = Math.floor(N * 0.9);
const globalHashes = new Set([...hashCount].filter(([, c]) => c >= THRESH).map(([h]) => h));

const globalText = new Map();
const globalPos = new Map();
for (const p of pages) {
  p.scripts.forEach((s, i) => {
    if (!globalHashes.has(s.hash)) return;
    if (!globalText.has(s.hash)) globalText.set(s.hash, s.text);
    const cur = globalPos.get(s.hash) || { sum: 0, n: 0 };
    cur.sum += i; cur.n += 1; globalPos.set(s.hash, cur);
  });
}
const globalOrdered = [...globalHashes].sort(
  (a, b) => globalPos.get(a).sum / globalPos.get(a).n - globalPos.get(b).sum / globalPos.get(b).n,
);

// Each block is wrapped in its own IIFE (scoped declarations, no residue on
// re-run) and separated by a sentinel so the runtime evals each independently --
// one block's error must not break the others, like separate <script> tags.
const wrapIIFE = (text) => `;(function(){\n${text}\n})();`;
const BLOCK_SEP = '\n/*__AIM_BLOCK__*/\n';

const globalChromeJs =
  '/* Auto-generated: global chrome scripts shared across pages (run once). */\n' +
  globalOrdered.map((h) => wrapIIFE(globalText.get(h))).join(BLOCK_SEP);
writeFileSync(`${DIRS.base}/global-chrome.js`, globalChromeJs);

// ---- write per-page content + scripts, shared nav/footer, and route manifest ----
// TODO (human action item): the Microsoft 365 / Dynamics 365 connection is
// being finalized by Kabir with Rajiv. Once they confirm the endpoint the live
// site already uses, set D365_FORM_ENDPOINT wherever this build runs (e.g. an
// Azure Pipelines secret variable) so the contact form on New-AIM-code/contact-us.html
// starts submitting for real. Until then this stays '' and that form renders
// its "not yet connected" state instead of failing silently.
//
// The contact form's submit endpoint is build-time config, not a page constant:
// it's baked in from an env var at `npm run convert` time (e.g. set as a secret
// pipeline variable in CI) rather than hardcoded, so the endpoint can change
// without editing page source. This is NOT secret-grade protection -- the value
// ends up in shipped client JS same as any static-export site -- see PROJECT.md
// for why (no server/API route exists in this static-export architecture).
const D365_FORM_ENDPOINT = process.env.D365_FORM_ENDPOINT || '';

let scriptedPages = 0;
for (const p of pages) {
  const pageScript = p.scripts
    .filter((s) => !globalHashes.has(s.hash))
    .map((s) => wrapIIFE(s.text))
    .join(BLOCK_SEP);
  const scriptedPageOut =
    p.slug === 'contact-us'
      ? pageScript.replaceAll('__D365_FORM_ENDPOINT__', D365_FORM_ENDPOINT)
      : pageScript;
  writeFileSync(`${DIRS.content}/${p.slug}.html`, p.contentHtml);
  writeFileSync(`${DIRS.scripts}/${p.slug}.js`, scriptedPageOut);
  if (pageScript.trim()) scriptedPages += 1;
}
if (!D365_FORM_ENDPOINT) {
  console.log(
    '  NOTE: D365_FORM_ENDPOINT is not set -- the contact form will render its "not yet connected" state.',
  );
}
writeFileSync(`${DIRS.base}/nav.html`, navHtml);
writeFileSync(`${DIRS.base}/footer.html`, footerHtml);

const manifest = pages
  .map((p) => ({
    slug: p.slug,
    path: p.path,
    title: p.title,
    description: p.description,
    wfPage: p.wfPage,
    canonical: p.canonical,
    ogImage: p.ogImage,
    jsonLd: p.jsonLd,
    libs: p.libs,
    extraHeadCss: p.extraHeadCss,
    extraHeadLinks: p.extraHeadLinks,
    // This export has no content for the route yet, so it renders as nav +
    // footer only. Recorded so the smoke test asserts the right thing instead of
    // reporting a page the export genuinely does not have as a conversion bug.
    empty: p.empty,
  }))
  .sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));
writeFileSync(`${DIRS.base}/routes.js`, 'export default ' + JSON.stringify(manifest, null, 2) + ';\n');

const empties = pages.filter((p) => p.empty);
const extraLibs = [...new Set(pages.flatMap((p) => p.libs))];

console.log(`Converted ${N} pages from ${SRC_DIR}/.`);
console.log(`  Global chrome blocks: ${globalOrdered.length} -> src/generated/global-chrome.js`);
console.log(`  Pages with page-specific scripts: ${scriptedPages}`);
console.log(`  Pages with JSON-LD: ${pages.filter((p) => p.jsonLd.length).length}`);
console.log(
  `  Shared head CSS: ${sharedHeadCss ? `${(sharedHeadCss.length / 1024) | 0} KB -> public/css/${HEAD_CSS_FILE}` : 'NONE FOUND'}`,
);
console.log(`  Shared stylesheets: ${sharedHeadLinks.length ? sharedHeadLinks.join(', ') : 'none'}`);
const withExtraCss = pages.filter((p) => p.extraHeadCss);
if (withExtraCss.length) {
  console.log(`  Pages with extra head CSS: ${withExtraCss.map((p) => `${p.slug} (${(p.extraHeadCss.length / 1024) | 0} KB)`).join(', ')}`);
}
console.log(`  nav.html: ${(navHtml.length / 1024) | 0} KB, footer.html: ${(footerHtml.length / 1024) | 0} KB`);
if (extraLibs.length) {
  console.log(`  Page-specific libraries (loaded on demand):`);
  for (const l of extraLibs) {
    const users = pages.filter((p) => p.libs.includes(l)).map((p) => p.slug);
    console.log(`    ${l}\n      used by: ${users.join(', ')}`);
  }
}
if (malformed.length) {
  console.log(`\n  WARNING: ${malformed.length} malformed inline script(s) in the export.`);
  console.log('  Fix these in the Webflow embed; the browser fails on them too:');
  for (const m of malformed) console.log(`    ${m.file}: ${m.kind}`);
}
if (empties.length) {
  console.log(`\n  NOTE: ${empties.length} page(s) have no content in this export and will`);
  console.log('  render as nav + footer only. They are not built out in Webflow yet:');
  for (const p of empties) console.log(`    ${p.path}`);
}
