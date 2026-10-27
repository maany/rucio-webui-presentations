// Deck discovery, loading and validation, shared by the build, the preview server and the tests.
// A deck is any *.md at the repo root (except README.md); its file name is its URL slug.
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { load } from '@slidev/parser/fs'

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
// An unquoted title with " #" loses everything after it: YAML reads it as a comment.
const UNQUOTED_HASH = /^title\s*:\s*[^"'\s].*\s#/
// Absolute public-dir references: <img src="/x">, ![](/x), and image:/background: frontmatter.
const IMAGE_REF = /(?:src=["']|\]\(|^\s*(?:image|background):\s*["']?)(\/(?!\/)[^"'()\s]+)/gm

export function listDeckSlugs(root) {
  return readdirSync(root, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md')
    .map(e => e.name.slice(0, -'.md'.length))
    .sort()
}

export function selectDecks(all, requested) {
  if (all.length === 0) throw new Error('No deck files found at the repo root')
  if (requested.length === 0) return all
  return requested.map((r) => {
    const slug = r.replace(/\.md$/, '')
    if (!all.includes(slug)) throw new Error(`Unknown deck "${slug}". Decks: ${all.join(', ')}`)
    return slug
  })
}

export function imageRefs(text) {
  return [...text.matchAll(IMAGE_REF)].map(m => m[1])
}

function slideImages(slide) {
  const fm = ['image', 'background']
    .map(k => slide.frontmatter?.[k])
    .filter(v => typeof v === 'string' && v.startsWith('/') && !v.startsWith('//'))
  return [...imageRefs(slide.content ?? ''), ...fm]
}

export async function loadDeck(root, slug) {
  const entry = path.resolve(root, `${slug}.md`)
  const data = await load({ userRoot: path.dirname(entry) }, entry)
  // Raw headmatter as written: data.headmatter falls back to the first slide's heading for a missing title.
  const first = data.entry?.slides?.[0]
  const head = first?.frontmatter ?? {}
  return {
    slug,
    // Kept as parsed: an unquoted "a: b" title comes back as an object, which validateDeck rejects.
    title: head.title ?? '',
    titleLine: (first?.frontmatterRaw ?? '').split('\n').find(l => /^title\s*:/.test(l)) ?? '',
    date: head.date == null ? '' : String(head.date),
    slideTitles: data.slides.map(s => s.title ?? ''),
    images: [...new Set(data.slides.flatMap(slideImages))],
    errors: Object.values(data.markdownFiles).flatMap(md => (md.errors ?? []).map(e => e.message)),
  }
}

export function validateDeck(root, deck) {
  const problems = []
  if (!SLUG.test(deck.slug)) problems.push(`file name "${deck.slug}.md" must be lowercase words joined by hyphens`)
  if (deck.title === '') problems.push('headmatter is missing "title"')
  else if (typeof deck.title !== 'string') problems.push('headmatter "title" must be plain text; wrap it in quotes')
  else if (UNQUOTED_HASH.test(deck.titleLine ?? '')) problems.push('headmatter "title" has an unquoted "#", which YAML treats as a comment; wrap it in quotes')
  if (!DATE.test(deck.date)) problems.push('headmatter "date" must be YYYY-MM-DD')
  if (deck.slideTitles.length === 0) problems.push('deck has no slides')
  for (const img of deck.images) {
    const file = img.split(/[?#]/)[0]
    if (!existsSync(path.join(root, 'public', file))) problems.push(`missing image public${file}`)
  }
  return [...problems, ...deck.errors]
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[c])
}

const byNewest = (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)

export function newestDeck(decks) {
  return [...decks].sort(byNewest)[0]?.slug
}

export function renderIndex(decks) {
  const items = [...decks]
    .sort(byNewest)
    .map(d => `      <li><a href="/${escapeHtml(d.slug)}/"><span>${escapeHtml(d.title)}</span><time datetime="${escapeHtml(d.date)}">${escapeHtml(d.date)}</time></a></li>`)
    .join('\n')
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rucio WebUI Talks</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #ffffff; --fg: #0f172a; --muted: #64748b; --card: #f1f5f9; --brand: #7c3aed; }
    @media (prefers-color-scheme: dark) { :root { --bg: #0f172a; --fg: #f1f5f9; --muted: #94a3b8; --card: #1e293b; --brand: #a78bfa; } }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font-family: Inter, system-ui, sans-serif; }
    main { max-width: 720px; margin: 0 auto; padding: 48px 16px; }
    h1 { font-size: 2rem; margin: 0 0 32px; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    a { display: flex; justify-content: space-between; gap: 16px; padding: 16px 20px; border-radius: 12px; background: var(--card); color: inherit; text-decoration: none; border: 2px solid transparent; }
    a:hover, a:focus-visible { border-color: var(--brand); }
    span { font-weight: 600; }
    time { color: var(--muted); white-space: nowrap; }
  </style>
</head>
<body>
  <main>
    <h1>Rucio WebUI Talks</h1>
    <ul>
${items}
    </ul>
  </main>
</body>
</html>
`
}
