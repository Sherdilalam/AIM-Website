// Minimal static file server for the Next.js export in out/. Handles clean URLs
// (trailingSlash export lays pages out as out/<route>/index.html).
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const ROOT = join(process.cwd(), 'out');
const PORT = Number(process.env.PORT || 4180);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.txt': 'text/plain', '.map': 'application/json',
};

async function tryFile(p) {
  try {
    const s = await stat(p);
    if (s.isFile()) return p;
  } catch {}
  return null;
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const rel = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const base = join(ROOT, rel);
  const candidate =
    (await tryFile(base)) ||
    (await tryFile(join(base, 'index.html'))) ||
    (await tryFile(base + '.html'));
  if (candidate) {
    const body = await readFile(candidate);
    res.writeHead(200, { 'Content-Type': MIME[extname(candidate)] || 'application/octet-stream' });
    res.end(body);
    return;
  }
  const nf = await tryFile(join(ROOT, '404.html'));
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(nf ? await readFile(nf) : 'Not found');
});

server.listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}`));
