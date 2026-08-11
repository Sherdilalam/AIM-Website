// Copies the Webflow export's static assets into public/ so the Next.js app
// serves them at the same root-absolute paths the converter rewrites links to
// (images/foo.avif -> /images/foo.avif). Run with: npm run sync
//
// Images are merged additively: a Webflow export only ships the assets its
// current pages reference, so wiping public/images would break any asset still
// referenced by CSS or by a page whose export lagged behind.
import { readdirSync, mkdirSync, copyFileSync, existsSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC_DIR = 'New-AIM-code';

// The site stylesheet carries a content hash that changes on every Webflow
// publish. Copy it to a stable name so app/layout.jsx never has to be edited.
const SITE_CSS_STABLE = 'architecture-in-motion.webflow.css';

if (!existsSync(SRC_DIR)) {
  console.error(`Source dir "${SRC_DIR}" not found (expected the Webflow export).`);
  process.exit(1);
}

function copyDir(from, to, { label }) {
  if (!existsSync(from)) {
    console.log(`  ${label}: no ${from}/ in the export, skipped`);
    return { copied: 0, added: 0, updated: 0, skipped: 0 };
  }
  mkdirSync(to, { recursive: true });
  let added = 0;
  let updated = 0;
  let skipped = 0;
  for (const name of readdirSync(from)) {
    const src = join(from, name);
    if (!statSync(src).isFile()) continue;
    const dest = join(to, name);
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
      added += 1;
    } else if (statSync(dest).size !== statSync(src).size) {
      copyFileSync(src, dest);
      updated += 1;
    } else {
      skipped += 1;
    }
  }
  console.log(`  ${label}: ${added} added, ${updated} updated, ${skipped} unchanged`);
  return { added, updated, skipped };
}

console.log(`Syncing assets from ${SRC_DIR}/ into public/`);

// ---- images ----
copyDir(join(SRC_DIR, 'images'), 'public/images', { label: 'images' });

// ---- documents (PDFs; only present in some exports) ----
copyDir(join(SRC_DIR, 'documents'), 'public/documents', { label: 'documents' });

// ---- js: Webflow's runtime, built per site, so it must track the export ----
const exportWebflowJs = join(SRC_DIR, 'js', 'webflow.js');
if (existsSync(exportWebflowJs)) {
  mkdirSync('public/js', { recursive: true });
  copyFileSync(exportWebflowJs, 'public/js/webflow.js');
  console.log(`  js: webflow.js copied (${(statSync(exportWebflowJs).size / 1024) | 0} KB)`);
} else {
  console.log('  js: no js/webflow.js in the export, skipped');
}

// ---- css: normalize + webflow verbatim, site css under a stable name ----
const cssDir = join(SRC_DIR, 'css');
if (!existsSync(cssDir)) {
  console.error(`  css: no ${cssDir}/ in the export -- the app cannot be styled without it.`);
  process.exit(1);
}
mkdirSync('public/css', { recursive: true });
const cssFiles = readdirSync(cssDir).filter((f) => f.endsWith('.css'));
const siteCss = cssFiles.find((f) => f.endsWith('.webflow.css') && f !== 'webflow.css');
if (!siteCss) {
  console.error('  css: could not find the site stylesheet (*.webflow.css) in the export.');
  process.exit(1);
}
for (const f of cssFiles) {
  const dest = f === siteCss ? SITE_CSS_STABLE : f;
  copyFileSync(join(cssDir, f), join('public/css', dest));
  console.log(`  css: ${f}${dest === f ? '' : ` -> ${dest}`} (${(statSync(join(cssDir, f)).size / 1024) | 0} KB)`);
}

// ---- report local image references that have no file behind them ----
// Webflow exports occasionally reference an asset it never wrote out; catching it
// here is much cheaper than finding a broken image in the browser.
const htmlFiles = readdirSync(SRC_DIR).filter((f) => f.toLowerCase().endsWith('.html'));
const have = new Set(existsSync('public/images') ? readdirSync('public/images') : []);
const missing = new Map();
for (const f of htmlFiles) {
  const html = readFileSync(join(SRC_DIR, f), 'utf8');
  for (const m of html.matchAll(/(?:src|href|srcset|poster)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (!url.startsWith('images/')) continue;
      const name = decodeURIComponent(url.slice('images/'.length));
      if (!have.has(name)) {
        if (!missing.has(name)) missing.set(name, new Set());
        missing.get(name).add(f);
      }
    }
  }
}
if (missing.size) {
  console.log(`\n  WARNING: ${missing.size} image(s) referenced by the export but not present:`);
  for (const [name, pages] of [...missing].slice(0, 20)) {
    console.log(`    ${name}  (${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? `, +${pages.size - 3} more` : ''})`);
  }
  if (missing.size > 20) console.log(`    ...and ${missing.size - 20} more`);
} else {
  console.log('\n  All local image references resolve to files in public/images.');
}
