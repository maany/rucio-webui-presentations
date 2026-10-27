// `npm run dev [-- <deck>[.md]] [slidev options]`: opens the given deck, or the newest one by date.
// Plain `slidev` would look for slides.md and offer to scaffold it, which then breaks the build.
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { listDeckSlugs, loadDeck, newestDeck, selectDecks } from './lib/decks.mjs'

const root = process.cwd()
const slidev = path.resolve(import.meta.dirname, '../node_modules/.bin/slidev')
const args = process.argv.slice(2)
const named = args[0] && !args[0].startsWith('-') ? [args.shift()] : []

let slug
try {
  const all = listDeckSlugs(root)
  slug = named.length
    ? selectDecks(all, named)[0]
    : newestDeck(await Promise.all(selectDecks(all, []).map(s => loadDeck(root, s))))
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

const res = spawnSync(slidev, [`${slug}.md`, '--open', ...args], { cwd: root, stdio: 'inherit' })
if (res.error) console.error(res.error.message)
process.exit(res.status ?? 1)
