// Webflow static export -> framework-agnostic fragments for the Next.js app.
// Splits each page into shared nav/footer + unique content, rewrites asset/link
// URLs for routing, and separates "global chrome" scripts (run once) from
// per-page scripts (run on each route). Run with: npm run convert
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const SRC_DIR = 'legacy'; // archived Webflow export (source of truth)
const EXCLUDE = new Set(['draft.html']); // Webflow draft/style-guide page, not a real route

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

// ---- collect page files ----
if (!existsSync(SRC_DIR)) {
  console.error(`Source dir "${SRC_DIR}" not found (expected the archived Webflow export).`);
  process.exit(1);
}
const files = readdirSync(SRC_DIR)
  .filter((f) => f.toLowerCase().endsWith('.html') && !EXCLUDE.has(f))
  .sort();
if (!files.length) {
  console.error('No .html files found in', SRC_DIR);
  process.exit(1);
}

const SKIP_INLINE = /AIMChatbot|dataLayer\s*=|gtag\s*\(|WebFont\.load|w-mod-/;

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

  const main = root.querySelector('.main-wrapper-3') || root.querySelector('.page-wrapper-new') || root.querySelector('body');
  const kids = main.childNodes.filter((n) => n.nodeType === 1);
  const navEl = main.querySelector('[role="banner"]');
  const footEl = main.querySelector('.section-footer');
  const nIdx = kids.indexOf(navEl);
  const fIdx = kids.indexOf(footEl);

  let contentEls;
  if (nIdx >= 0 && fIdx >= 0) contentEls = kids.slice(nIdx + 1, fIdx);
  else if (nIdx >= 0) contentEls = kids.slice(nIdx + 1);
  else contentEls = kids.filter((k) => k !== footEl);

  let contentHtml = contentEls
    .filter((el) => el.rawTagName !== 'script') // drop top-level <script> elements
    .map((el) => {
      el.querySelectorAll('script').forEach((s) => s.remove()); // drop nested <script>
      return el.outerHTML;
    })
    .join('\n');
  contentHtml = rewriteAssets(contentHtml);

  if (slug === 'index' && navEl && footEl) {
    navHtml = rewriteAssets(navEl.outerHTML);
    footerHtml = rewriteAssets(footEl.outerHTML);
  }

  const scripts = [];
  root.querySelectorAll('body script').forEach((s) => {
    if (s.getAttribute('src')) return;
    const text = s.text;
    if (!text || !text.trim()) return;
    if (SKIP_INLINE.test(text)) return;
    scripts.push({ text, hash: createHash('sha1').update(text).digest('hex') });
  });

  pages.push({ slug, path: routePath, title, description, wfPage, canonical, ogImage, contentHtml, scripts });
}

if (!navHtml || !footerHtml) {
  console.error('Failed to extract shared nav/footer from index.html');
  process.exit(1);
}

// ---- classify scripts: identical across >=90% of pages => global chrome (run once) ----
const N = pages.length;
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
let scriptedPages = 0;
for (const p of pages) {
  const pageScript = p.scripts
    .filter((s) => !globalHashes.has(s.hash))
    .map((s) => wrapIIFE(s.text))
    .join(BLOCK_SEP);
  writeFileSync(`${DIRS.content}/${p.slug}.html`, p.contentHtml);
  writeFileSync(`${DIRS.scripts}/${p.slug}.js`, pageScript);
  if (pageScript.trim()) scriptedPages += 1;
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
  }))
  .sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));
writeFileSync(`${DIRS.base}/routes.js`, 'export default ' + JSON.stringify(manifest, null, 2) + ';\n');

console.log(`Converted ${N} pages.`);
console.log(`  Global chrome blocks: ${globalOrdered.length} -> src/generated/global-chrome.js`);
console.log(`  Pages with page-specific scripts: ${scriptedPages}`);
console.log(`  nav.html: ${(navHtml.length / 1024) | 0} KB, footer.html: ${(footerHtml.length / 1024) | 0} KB`);
