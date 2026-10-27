import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { imageRefs, listDeckSlugs, loadDeck, newestDeck, renderIndex, selectDecks, validateDeck } from '../scripts/lib/decks.mjs'

function fixture(files) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'decks-'))
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, rel)), { recursive: true })
    writeFileSync(path.join(root, rel), body)
  }
  return root
}

const deck = (src, head = 'title: A & B\ndate: 2026-02-08\n') => `---\n${head}src: ${src}\n---\n`

test('listDeckSlugs: root .md files except README, sorted', () => {
  const root = fixture({ 'b-talk.md': '', 'a-talk.md': '', 'README.md': '', 'notes.txt': '', 'sections/x/detailed-2026-02.md': '' })
  assert.deepEqual(listDeckSlugs(root), ['a-talk', 'b-talk'])
})

test('selectDecks: all by default, accepts .md suffix, rejects unknown', () => {
  assert.deepEqual(selectDecks(['a', 'b'], []), ['a', 'b'])
  assert.deepEqual(selectDecks(['a', 'b'], ['b.md']), ['b'])
  assert.throws(() => selectDecks(['a', 'b'], ['c']), /Unknown deck "c".*a, b/)
  assert.throws(() => selectDecks([], []), /No deck files/)
})

test('imageRefs: img src, markdown images, frontmatter image/background', () => {
  const text = [
    '<img src="/oidc/2026-02/login.png" class="x" />',
    "<img src='/a.png'>",
    '![alt](/b.png)',
    'image: /c.png',
    'background: "/d.jpg"',
    '<img src="https://example.org/e.png">',
    '<img src="//cdn.example.org/f.png">',
  ].join('\n')
  assert.deepEqual(imageRefs(text), ['/oidc/2026-02/login.png', '/a.png', '/b.png', '/c.png', '/d.jpg'])
})

test('loadDeck: headmatter, slide titles and images from included sections', async () => {
  const root = fixture({
    'talk.md': deck('./sections/s/detailed-2026-02.md'),
    'sections/s/detailed-2026-02.md': '# One\n\n<img src="/s/2026-02/x.png">\n\n---\nlayout: image-right\nimage: /s/2026-02/y.png\n---\n\n# Two\n',
  })
  const d = await loadDeck(root, 'talk')
  assert.equal(d.title, 'A & B')
  assert.equal(d.date, '2026-02-08')
  assert.deepEqual(d.slideTitles, ['One', 'Two'])
  assert.deepEqual(d.images.sort(), ['/s/2026-02/x.png', '/s/2026-02/y.png'])
  assert.deepEqual(d.errors, [])
})

test('validateDeck: valid deck has no problems', async () => {
  const root = fixture({ 'talk.md': deck('./s.md'), 's.md': '# One\n<img src="/x.png">\n', 'public/x.png': '' })
  assert.deepEqual(validateDeck(root, await loadDeck(root, 'talk')), [])
})

test('validateDeck: missing src file is reported', async () => {
  const root = fixture({ 'talk.md': deck('./sections/oidc/detailed-2099-01.md') })
  const problems = validateDeck(root, await loadDeck(root, 'talk'))
  assert.ok(problems.some(p => p.includes('Imported markdown file not found') && p.includes('detailed-2099-01.md')), problems.join('\n'))
})

test('validateDeck: missing image is reported', async () => {
  const root = fixture({ 'talk.md': deck('./s.md'), 's.md': '# One\n<img src="/gone.png">\n' })
  assert.deepEqual(validateDeck(root, await loadDeck(root, 'talk')), ['missing image public/gone.png'])
})

test('validateDeck: bad slug, missing title, bad date', async () => {
  const root = fixture({ 'My Talk.md': deck('./s.md', 'date: Feb 2026\n'), 's.md': '# One\n' })
  const problems = validateDeck(root, await loadDeck(root, 'My Talk'))
  assert.deepEqual(problems, [
    'file name "My Talk.md" must be lowercase words joined by hyphens',
    'headmatter is missing "title"',
    'headmatter "date" must be YYYY-MM-DD',
  ])
})

test('renderIndex: newest first, escaped titles, links per slug', () => {
  const html = renderIndex([
    { slug: 'old-talk', title: 'Old', date: '2025-05-01' },
    { slug: 'atlas-sc-week-83', title: 'ATLAS S&C <Week>', date: '2026-02-08' },
  ])
  assert.match(html, /^<!doctype html>/)
  assert.ok(html.includes('ATLAS S&amp;C &lt;Week&gt;'))
  assert.ok(!html.includes('S&C <Week>'))
  assert.ok(html.indexOf('href="/atlas-sc-week-83/"') < html.indexOf('href="/old-talk/"'))
})

test('validateDeck: title that YAML parses as a mapping is rejected', async () => {
  const root = fixture({ 'talk.md': deck('./s.md', 'date: 2026-01-01\ntitle: Rucio: ATLAS\n'), 's.md': '# One\n' })
  assert.deepEqual(validateDeck(root, await loadDeck(root, 'talk')), ['headmatter "title" must be plain text; wrap it in quotes'])
})

test('validateDeck: unquoted # in the title is rejected', async () => {
  const root = fixture({ 'talk.md': deck('./s.md', 'title: ATLAS Week #83\ndate: 2026-01-01\n'), 's.md': '# One\n' })
  assert.deepEqual(validateDeck(root, await loadDeck(root, 'talk')), ['headmatter "title" has an unquoted "#", which YAML treats as a comment; wrap it in quotes'])
})

test('validateDeck: quoted # in the title is fine', async () => {
  const root = fixture({ 'talk.md': deck('./s.md', 'title: "ATLAS Week #83"\ndate: 2026-01-01\n'), 's.md': '# One\n' })
  const d = await loadDeck(root, 'talk')
  assert.equal(d.title, 'ATLAS Week #83')
  assert.deepEqual(validateDeck(root, d), [])
})

test('newestDeck: picks the latest date, slug breaks ties', () => {
  assert.equal(newestDeck([
    { slug: 'b-talk', date: '2026-02-08' },
    { slug: 'c-talk', date: '2025-01-01' },
    { slug: 'a-talk', date: '2026-02-08' },
  ]), 'a-talk')
})
