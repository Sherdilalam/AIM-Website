import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Shared footer markup, extracted once from the Webflow export.
const footerHtml = readFileSync(join(process.cwd(), 'src/generated/footer.html'), 'utf8');

export default function Footer() {
  // suppressHydrationWarning: this markup is re-read from disk on every dev-mode
  // recompile (via npm run convert), so it can legitimately differ between the
  // server render and the client's hydration pass mid-session. Never an issue in
  // the actual static export, which bakes one snapshot at build time.
  return (
    <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: footerHtml }} suppressHydrationWarning />
  );
}
