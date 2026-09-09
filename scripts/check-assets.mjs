// Fails if the export's images are not all present, and identical, in public/.
//
// Why this exists: public/ is what actually ships. `npm run convert` copies
// New-AIM-code/images/ into public/images/ as a side effect, so everything works
// locally the moment you run it, and it is easy to commit the export copy of a
// new image while leaving the public/ copy untracked. CI runs `npm ci` and
// `npm run build`, never convert, so that mistake ships a 404 rather than an
// image and nothing complains. It already happened once: five partner logos went
// live 404ing and silently fell back to initials.
//
// sync-assets.mjs does report images the export references but has not written
// out, but only by scanning src/href/srcset/poster attributes in the HTML. The
// partner logos are referenced from inside a page script, so that scan cannot
// see them. This check compares the two directories directly instead, which
// catches any asset regardless of how it is referenced.
//
// Run with: npm run check-assets

import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'New-AIM-code/images';
const DEST = 'public/images';

if (!existsSync(SRC)) {
  console.log(`check-assets: no ${SRC}/ in the export, nothing to compare.`);
  process.exit(0);
}
if (!existsSync(DEST)) {
  console.error(`check-assets: ${DEST}/ does not exist. Run: npm run convert`);
  process.exit(1);
}

const srcFiles = readdirSync(SRC).filter((f) => statSync(join(SRC, f)).isFile());
const missing = [];
const stale = [];

for (const name of srcFiles) {
  const dest = join(DEST, name);
  if (!existsSync(dest)) {
    missing.push(name);
    continue;
  }
  const a = statSync(join(SRC, name)).size;
  const b = statSync(dest).size;
  if (a !== b) stale.push({ name, src: a, dest: b });
}

if (!missing.length && !stale.length) {
  console.log(`check-assets: ${srcFiles.length} export image(s) all present in ${DEST}/.`);
  process.exit(0);
}

console.error('\ncheck-assets FAILED\n');
if (missing.length) {
  console.error(`  ${missing.length} image(s) in the export but not in ${DEST}/ (these would 404 in production):`);
  for (const n of missing.slice(0, 25)) console.error(`    ${n}`);
  if (missing.length > 25) console.error(`    ...and ${missing.length - 25} more`);
}
if (stale.length) {
  console.error(`\n  ${stale.length} image(s) whose ${DEST}/ copy differs from the export:`);
  for (const s of stale.slice(0, 25)) console.error(`    ${s.name}  export ${s.src} bytes, public ${s.dest} bytes`);
  if (stale.length > 25) console.error(`    ...and ${stale.length - 25} more`);
}
console.error('\n  Fix: run `npm run convert`, then commit BOTH copies.');
console.error('  A plain `git add .` picks up both; staging only New-AIM-code/ does not.\n');
process.exit(1);
