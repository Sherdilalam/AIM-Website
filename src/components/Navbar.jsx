import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Shared navbar markup, extracted once from the Webflow export. Rendered by the
// root layout so it persists across client-side navigations.
const navHtml = readFileSync(join(process.cwd(), 'src/generated/nav.html'), 'utf8');

export default function Navbar() {
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: navHtml }} />;
}
