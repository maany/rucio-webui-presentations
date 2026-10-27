// Builds every deck (or only the slugs given as arguments) into dist/<slug>/ and writes dist/index.html.
// All decks are validated first, because `slidev build` succeeds even when a src: file is missing.
import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { listDeckSlugs, loadDeck, renderIndex, selectDecks, validateDeck } from './lib/decks.mjs'

const root = process.cwd()
const dist = path.join(root, 'dist')
const slidev = path.resolve(import.meta.dirname, '../node_modules/.bin/slidev')

let slugs
try {
  slugs = selectDecks(listDeckSlugs(root), process.argv.slice(2))
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

const decks = await Promise.all(slugs.map(slug => loadDeck(root, slug)))
let invalid = false
for (const deck of decks) {
  for (const problem of validateDeck(root, deck)) {
    console.error(`${deck.slug}.md: ${problem}`)
    invalid = true
  }
}
if (invalid) process.exit(1)

rmSync(dist, { recursive: true, force: true })
for (const { slug } of decks) {
  const res = spawnSync(slidev, ['build', `${slug}.md`, '--base', `/${slug}/`, '--out', path.join(dist, slug)], { cwd: root, stdio: 'inherit' })
  if (res.status !== 0) {
    console.error(`${slug}.md: slidev build failed`)
    process.exit(1)
  }
}
mkdirSync(dist, { recursive: true })
writeFileSync(path.join(dist, 'index.html'), renderIndex(decks))
console.log(`Built ${decks.length} deck(s) into dist/: ${slugs.join(', ')}`)
