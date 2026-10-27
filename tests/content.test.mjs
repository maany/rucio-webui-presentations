import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { imageRefs, listDeckSlugs, loadDeck, validateDeck } from '../scripts/lib/decks.mjs'

const root = path.resolve(import.meta.dirname, '..')

// Slide titles of the ATLAS S&C Week #83 deck as presented (parsed from slides.md before the migration).
const ATLAS_BASELINE = [
  'Rucio WebUI', 'Current Release', 'User Types', 'OIDC Authentication', 'Step 1: Login Page',
  'Step 2: Identity Provider Authorization', 'Step 3: Welcome to Rucio!', 'Pending Configurations',
  'Dashboard Components', 'Top Rules Widget', 'Storage Usage Widget', 'Quick Bookmarks (HotBar)',
  'What are Bookmarks?', 'Creating a Bookmark', 'Managing Your Bookmarks', 'Sharing Bookmarks',
  'Command Palette', 'What is Command Palette?', 'How to Use Command Palette', 'Tips Feature',
  'What are Tips?', 'Streamed Tables', 'What are Streamed Tables?', 'Design System v1.0.0',
  'Upcoming Functionality', 'Old UI Phase-Out Plan', 'How to Get Involved', 'Thank You!',
]

const mdFiles = dir => existsSync(path.join(root, dir))
  ? readdirSync(path.join(root, dir), { recursive: true }).filter(f => f.endsWith('.md')).map(f => path.join(dir, f))
  : []

test('every deck at the repo root is valid', async () => {
  const slugs = listDeckSlugs(root)
  assert.ok(slugs.length > 0, 'no decks found')
  for (const slug of slugs) assert.deepEqual(validateDeck(root, await loadDeck(root, slug)), [], `${slug}.md`)
})

test('atlas-sc-week-83 has the same slides, in order, as before the migration', async () => {
  const deck = await loadDeck(root, 'atlas-sc-week-83')
  assert.deepEqual(deck.slideTitles, ATLAS_BASELINE)
  assert.equal(deck.title, 'Rucio WebUI — ATLAS S&C Week #83')
  assert.equal(deck.date, '2026-02-08')
})

test('section files are named sections/<topic>/<variant>-<YYYY-MM>.md', () => {
  const files = mdFiles('sections')
  assert.ok(files.length > 0, 'no section files')
  for (const f of files) assert.match(f.split(path.sep).join('/'), /^sections\/[a-z0-9-]+\/[a-z0-9]+(?:-[a-z0-9]+)*-\d{4}-\d{2}\.md$/)
})

test('every image referenced by a section or event file exists in public/', () => {
  for (const f of [...mdFiles('sections'), ...mdFiles('events')]) {
    for (const img of imageRefs(readFileSync(path.join(root, f), 'utf8'))) {
      assert.ok(existsSync(path.join(root, 'public', img)), `${f} → public${img}`)
    }
  }
})
