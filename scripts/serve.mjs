// Servidor local que imita la publicación: sirve site/ con los headers de netlify.toml (bloque "/*"),
// incluida la CSP, para que las pruebas vean las mismas restricciones que producción.
// Uso: node scripts/serve.mjs [puerto]   (por defecto 4321)
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(repo, 'site');
const port = Number(process.argv[2] || process.env.PORT || 4321);

/** Headers del primer bloque [[headers]] de netlify.toml. */
export function readHeaders(toml) {
  const block = toml.split('[[headers]]')[1] || '';
  const out = {};
  for (const m of block.matchAll(/^\s*([A-Za-z-]+)\s*=\s*"(.*)"\s*$/gm)) if (m[1] !== 'for') out[m[1]] = m[2];
  // En http://localhost no aplican HSTS ni upgrade-insecure-requests.
  delete out['Strict-Transport-Security'];
  if (out['Content-Security-Policy']) out['Content-Security-Policy'] = out['Content-Security-Policy'].replace(/;\s*upgrade-insecure-requests/, '');
  return out;
}

const headers = readHeaders(readFileSync(join(repo, 'netlify.toml'), 'utf8'));
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
};

createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (path.endsWith('/')) path += 'index.html';
  let file = join(root, path);
  let status = 200;
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) { file = join(root, '404.html'); status = 404; }
  res.writeHead(status, { ...headers, 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`beta en http://localhost:${port} (headers de netlify.toml)`));
