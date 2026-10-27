// Serves dist/ the way vercel.json does: real files first, then /<deck>/* falls back to <deck>/index.html.
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
}

const isFile = p => existsSync(p) && statSync(p).isFile()

export function resolveRequest(dist, urlPath) {
  let clean
  try {
    clean = decodeURIComponent(urlPath.split(/[?#]/)[0])
  } catch {
    return null
  }
  const target = path.join(dist, clean)
  if (target !== dist && !target.startsWith(dist + path.sep)) return null
  if (isFile(target)) return target
  if (isFile(path.join(target, 'index.html'))) return path.join(target, 'index.html')
  const deck = clean.split('/').filter(Boolean)[0]
  const fallback = deck && path.join(dist, deck, 'index.html')
  return fallback && isFile(fallback) ? fallback : null
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dist = path.resolve('dist')
  const port = Number(process.env.PORT) || 4173
  createServer((req, res) => {
    const file = resolveRequest(dist, req.url ?? '/')
    if (!file) {
      res.writeHead(404).end('Not found')
      return
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' })
    createReadStream(file).pipe(res)
  }).listen(port, () => console.log(`Previewing dist/ at http://localhost:${port}/`))
}
