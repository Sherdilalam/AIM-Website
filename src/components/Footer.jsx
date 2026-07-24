import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Shared footer markup, extracted once from the Webflow export.
const footerHtml = readFileSync(join(process.cwd(), 'src/generated/footer.html'), 'utf8');

export default function Footer() {
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: footerHtml }} />;
}
