# Multi-Deck Presentations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure this single-deck Slidev repo so it holds many event decks, built from a shared library of versioned sections and deployed side by side on one Vercel site.

**Architecture:** Each deck is a `<slug>.md` entry file at the repo root that `src:`-includes versioned section files (`sections/<topic>/<variant>-<YYYY-MM>.md`) and event-only files (`events/<event>/*.md`). The entries stay at the root because Slidev treats the entry file's folder as the project root, so shared `style.css`, `uno.config.ts`, `components/` and `public/` keep working. A small Node library (`scripts/lib/decks.mjs`) finds, loads and validates decks using Slidev's own parser. `scripts/build-all.mjs` validates every deck, builds each one into `dist/<slug>/` with `--base /<slug>/`, and writes a `dist/index.html` listing the talks. `vercel.json` rewrites `/<deck>/*` to that deck's `index.html`.

**Tech Stack:** Slidev 52.x (`@slidev/cli`, `@slidev/parser`), Node ≥ 20 ESM scripts, `node:test`, npm, Vercel.

**Spec:** `docs/superpowers/specs/2026-10-27-multi-deck-design.md`

## Global Constraints

- Section files: `sections/<topic>/<variant>-<YYYY-MM>.md`. A variant name is used even when a topic has only one form (`detailed`).
- Screenshots: `public/<topic>/<YYYY-MM>/<file>`, versioned per topic, not per variant. Event-only images go in `public/events/<event>/`.
- A deck's `src:` always names a specific variant and version. There is no "latest" alias.
- Deck slug = entry file basename, lowercase words joined by hyphens. The first deck is `atlas-sc-week-83`.
- Deck headmatter: `title` (string) and `date` (`YYYY-MM-DD`), in the same first frontmatter block as the first `src:`. This was verified: it adds no extra slide.
- Deck discovery: every `*.md` file at the repo root except `README.md`.
- Hosting: Vercel only, with `netlify.toml` deleted. URLs: `/` is the talk index and `/<slug>/` is a deck.
- Package manager: npm only. Commit `package-lock.json`, delete `pnpm-lock.yaml` and `.npmrc`. Keep the existing `overrides` block in `package.json`.
- Moves use `git mv`. Commit messages are plain conventional commits with **no** Co-Authored-By or "Generated with" lines.
- Out of scope: `components/Counter.vue`, `snippets/`, `pages/imported-slides.md` and `assets/` stay untouched. No deck generator, no per-deck style freezing, no PDFs in the deployed site.

## Facts verified before writing this plan

- `slidev build` exits 0 when a `src:` points at a missing file. It only records `Imported markdown file not found: …` in the parser's `markdownFiles[*].errors`, so the build script has to check decks itself.
- `--base /x/` rewrites `<img src="/a.png">` to `/x/a.png` in the build output.
- `load({ userRoot }, entry)` from `@slidev/parser/fs` returns `{ headmatter, slides: [{ title, content, frontmatter, … }], markdownFiles }`. Slides don't carry image usage, so images are found by scanning `content` and `frontmatter.image` / `frontmatter.background`.
- Baseline: today's `slides.md` parses to 28 slides with the titles listed in Task 2 Step 1.

## Review Focus

1. **A `src:` pointing at a missing or mistyped section file.** Expected: `npm run build` fails, naming the deck and the missing path, rather than deploying a deck with slides silently missing. Covered by Task 1 (`validateDeck` reports parser errors) and Task 3 (the build exits 1 before calling Slidev).
2. **A screenshot path that doesn't exist after a move or a new version** (`<img src>`, `![](…)`, or frontmatter `image:`). Expected: validation fails, naming the image. Covered by Task 1 (`imageRefs`, `validateDeck`) and Task 2 (a repo-wide check over `sections/` and `events/`).
3. **A deck title containing HTML-special characters** (the real title has `&`: "ATLAS S&C"). Expected: the index page shows it literally, escaped. Covered by a Task 1 test.
4. **A typo'd or unknown slug in `npm run build -- <slug>`, or a stray root `.md` without headmatter.** Expected: an error listing the valid decks, or a validation error, never an empty or partial `dist/`. Covered by Task 1 (`selectDecks`) and Task 3.
5. **A reload or deep link like `/atlas-sc-week-83/7`, and requests that try to escape `dist/`.** Expected: the deck's `index.html` is served, and traversal returns 404. Covered by Task 3 (`resolveRequest`) and Task 4's browser check.

---

## File Structure

| Path | Responsibility |
|---|---|
| `scripts/lib/decks.mjs` | Deck discovery, loading, validation, slug selection, index HTML rendering. Pure functions, no process exit |
| `scripts/build-all.mjs` | CLI glue: select, validate, build each deck, write the index, exit codes |
| `scripts/preview.mjs` | Local static server that mirrors the Vercel rewrite; exports `resolveRequest` for tests |
| `tests/decks.test.mjs` | Unit tests for `scripts/lib/decks.mjs` on temp-dir fixtures |
| `tests/content.test.mjs` | Repo integration: every deck valid, ATLAS baseline, section naming, image references |
| `tests/build-all.test.mjs` | Build CLI failure paths on temp-dir fixtures |
| `tests/preview.test.mjs` | `resolveRequest` routing and traversal |
| `atlas-sc-week-83.md` | The migrated ATLAS deck entry (was `slides.md`) |
| `sections/…`, `events/atlas-sc-week-83/…`, `public/<topic>/2026-02/…` | Migrated content |
| `vercel.json`, `package.json`, `README.md` | Deploy config, scripts, how-to |

---

### Task 1: Deck library

**Files:**
- Create: `scripts/lib/decks.mjs`
- Create: `tests/decks.test.mjs`
- Modify: `package.json` (add the `test` script)

**Interfaces:**
- Consumes: `load` from `@slidev/parser/fs`.
- Produces (all named exports of `scripts/lib/decks.mjs`):
  - `listDeckSlugs(root: string): string[]` lists root-level `*.md` files except `README.md`, without the extension, sorted.
  - `selectDecks(all: string[], requested: string[]): string[]` returns `all` when `requested` is empty. It strips a trailing `.md` from each request, and throws `Error` naming the unknown slug and listing `all`. It also throws when `all` is empty.
  - `imageRefs(text: string): string[]` returns absolute public paths from `src="/…"`, `src='/…'`, `](/…)`, and `image:` / `background:` frontmatter lines. Protocol-relative `//…` is excluded.
  - `loadDeck(root: string, slug: string): Promise<Deck>` where `Deck = { slug, title: string, date: string, slideTitles: string[], images: string[], errors: string[] }`.
  - `validateDeck(root: string, deck: Deck): string[]` returns the list of problems; empty means valid.
  - `escapeHtml(s: string): string`
  - `renderIndex(decks: Deck[]): string` returns a full HTML document, newest `date` first, each deck linking to `/<slug>/`.

- [ ] **Step 1: Add the test script to `package.json`**

In `"scripts"`, add `"test": "node --test tests/*.test.mjs"` (keep the existing `build`, `dev` and `export` for now).

- [ ] **Step 2: Write the failing tests**

Create `tests/decks.test.mjs`:

```js
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { imageRefs, listDeckSlugs, loadDeck, renderIndex, selectDecks, validateDeck } from '../scripts/lib/decks.mjs'

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
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module …/scripts/lib/decks.mjs`.

- [ ] **Step 4: Write the implementation**

Create `scripts/lib/decks.mjs`:

```js
// Deck discovery, loading and validation, shared by the build, the preview server and the tests.
// A deck is any *.md at the repo root (except README.md); its file name is its URL slug.
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { load } from '@slidev/parser/fs'

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
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
  const head = data.headmatter ?? {}
  return {
    slug,
    title: head.title == null ? '' : String(head.title),
    date: head.date == null ? '' : String(head.date),
    slideTitles: data.slides.map(s => s.title ?? ''),
    images: [...new Set(data.slides.flatMap(slideImages))],
    errors: Object.values(data.markdownFiles).flatMap(md => (md.errors ?? []).map(e => e.message)),
  }
}

export function validateDeck(root, deck) {
  const problems = []
  if (!SLUG.test(deck.slug)) problems.push(`file name "${deck.slug}.md" must be lowercase words joined by hyphens`)
  if (!deck.title) problems.push('headmatter is missing "title"')
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

export function renderIndex(decks) {
  const items = [...decks]
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
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
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: all 9 tests PASS. If `loadDeck` in the fixture tests reports `slideTitles` from a different property, inspect a slide with `console.log(Object.keys(data.slides[0]))`. The verified keys are `frontmatter, content, revision, frontmatterRaw, note, title, level, index, importChain, source`.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/decks.mjs tests/decks.test.mjs package.json
git commit -m "feat: deck discovery, validation and index rendering"
```

---

### Task 2: Migrate the ATLAS deck into sections/ and events/

**Files:**
- Create: `tests/content.test.mjs`
- Move (git mv): every numbered `*.md`, `slides.md`, and the 11 screenshots in `public/` (tables below)
- Modify: the moved section files (image paths) and `atlas-sc-week-83.md` (headmatter and `src:` paths)

**Interfaces:**
- Consumes: `listDeckSlugs`, `loadDeck`, `validateDeck`, `imageRefs` from Task 1.
- Produces: deck `atlas-sc-week-83` (used by Tasks 3 and 4), and directories `sections/`, `events/atlas-sc-week-83/`, `public/<topic>/2026-02/`.

- [ ] **Step 1: Write the failing content test**

Create `tests/content.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: the content tests FAIL. `slides` is discovered as a deck with no title or date, `atlas-sc-week-83.md` doesn't exist, and `sections/` is empty. The Task 1 tests still pass.

- [ ] **Step 3: Move the markdown files**

```bash
mkdir -p events/atlas-sc-week-83 sections/{feature-overview,oidc,dashboard,bookmarks,command-palette,tips,streamed-tables,design-system,design-system-colors}
git mv 01-introduction.md                events/atlas-sc-week-83/intro.md
git mv 02-current-release-objectives.md  events/atlas-sc-week-83/release-objectives.md
git mv 03-feature-overview.md            sections/feature-overview/detailed-2026-02.md
git mv 04-oidc-authentication.md         sections/oidc/detailed-2026-02.md
git mv 04b-dashboard-view.md             sections/dashboard/detailed-2026-02.md
git mv 05-bookmarks.md                   sections/bookmarks/detailed-2026-02.md
git mv 06-command-palette.md             sections/command-palette/detailed-2026-02.md
git mv 07-tips.md                        sections/tips/detailed-2026-02.md
git mv 07b-streamed-tables.md            sections/streamed-tables/detailed-2026-02.md
git mv 08-design-system.md               sections/design-system/detailed-2026-02.md
git mv 08b-design-system-colors.md       sections/design-system-colors/detailed-2026-02.md
git mv 09-upcoming-functionality.md      events/atlas-sc-week-83/upcoming-functionality.md
git mv 10-missing-features.md            events/atlas-sc-week-83/missing-features.md
git mv 11-new-developments-needed.md     events/atlas-sc-week-83/new-developments-needed.md
git mv 12-release-schedule.md            events/atlas-sc-week-83/release-schedule.md
git mv slides.md                         atlas-sc-week-83.md
```

- [ ] **Step 4: Move the screenshots and rewrite their references**

```bash
mkdir -p public/{oidc,dashboard,bookmarks,command-palette,tips,streamed-tables}/2026-02
git mv public/login_page.png public/oidc_login_atlas_iam.png public/webui_dashboard_post_oidc.png public/oidc/2026-02/
git mv public/latest-rules-widget.png public/storage_usage-widget.png public/dashboard/2026-02/
git mv public/bookmarks-create.png public/bookmark-created.png public/bookmark-link-copied.png public/bookmarks/2026-02/
git mv public/command-palette.png public/command-palette/2026-02/
git mv public/tipd-sidebar.png public/tips/2026-02/
git mv public/rules-table.png public/streamed-tables/2026-02/

sed -i -E 's#(src=")/(login_page|oidc_login_atlas_iam|webui_dashboard_post_oidc)\.png"#\1/oidc/2026-02/\2.png"#g' sections/oidc/detailed-2026-02.md
sed -i -E 's#(src=")/(latest-rules-widget|storage_usage-widget)\.png"#\1/dashboard/2026-02/\2.png"#g' sections/dashboard/detailed-2026-02.md
sed -i -E 's#^(image: )/(bookmarks-create|bookmark-created|bookmark-link-copied)\.png#\1/bookmarks/2026-02/\2.png#' sections/bookmarks/detailed-2026-02.md
sed -i -E 's#(src=")/command-palette\.png"#\1/command-palette/2026-02/command-palette.png"#g' sections/command-palette/detailed-2026-02.md
sed -i -E 's#(src=")/tipd-sidebar\.png"#\1/tips/2026-02/tipd-sidebar.png"#g' sections/tips/detailed-2026-02.md
sed -i -E 's#(src=")/rules-table\.png"#\1/streamed-tables/2026-02/rules-table.png"#g' sections/streamed-tables/detailed-2026-02.md
```

Check that no old path is left: `grep -rnE '"/[a-z_-]+\.png"|^image: /[a-z_-]+\.png' sections events` should print nothing.

- [ ] **Step 5: Rewrite the deck entry**

Replace the whole content of `atlas-sc-week-83.md` with the following. It keeps the same order and the same commented-out entry; only the paths change and headmatter is added:

```markdown
---
title: Rucio WebUI — ATLAS S&C Week #83
date: 2026-02-08
src: ./events/atlas-sc-week-83/intro.md
---

---
src: ./events/atlas-sc-week-83/release-objectives.md
---

<!-- --- -->
<!-- src: ./sections/feature-overview/detailed-2026-02.md -->
<!-- --- -->

---
src: ./sections/oidc/detailed-2026-02.md
---

---
src: ./sections/dashboard/detailed-2026-02.md
---

---
src: ./sections/bookmarks/detailed-2026-02.md
---

---
src: ./sections/command-palette/detailed-2026-02.md
---

---
src: ./sections/tips/detailed-2026-02.md
---

---
src: ./sections/streamed-tables/detailed-2026-02.md
---

---
src: ./sections/design-system/detailed-2026-02.md
---

---
src: ./events/atlas-sc-week-83/upcoming-functionality.md
---


---
src: ./events/atlas-sc-week-83/release-schedule.md
---
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests PASS (9 from Task 1, 4 content tests).

- [ ] **Step 7: Smoke-test the deck in dev**

Run: `npx slidev atlas-sc-week-83.md --port 3030` in the background. Open `http://localhost:3030/5` (OIDC step 1) and `http://localhost:3030/14` (Creating a Bookmark): both screenshots must render. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add -A atlas-sc-week-83.md sections events public tests/content.test.mjs
git status --short   # expect only renames (R) plus the modified entry/sections and the new test
git commit -m "refactor: move ATLAS S&C deck into versioned sections and event folder"
```

---

### Task 3: Multi-deck build, Vercel routing and local preview

**Files:**
- Create: `scripts/build-all.mjs`
- Create: `scripts/preview.mjs`
- Create: `tests/build-all.test.mjs`
- Create: `tests/preview.test.mjs`
- Modify: `package.json` (`build`, `preview` scripts)
- Modify: `vercel.json`
- Delete: `netlify.toml`

**Interfaces:**
- Consumes: `listDeckSlugs`, `selectDecks`, `loadDeck`, `validateDeck`, `renderIndex` from Task 1; deck `atlas-sc-week-83` from Task 2.
- Produces: `npm run build [-- <slug>…]` writes `dist/index.html` and `dist/<slug>/`. `npm run preview` serves `dist/` on `PORT` (default 4173). `resolveRequest(dist: string, urlPath: string): string | null` is exported from `scripts/preview.mjs`.

- [ ] **Step 1: Write the failing tests**

Create `tests/build-all.test.mjs`:

```js
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const script = path.resolve(import.meta.dirname, '../scripts/build-all.mjs')

function run(files, args = []) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'build-all-'))
  for (const [rel, body] of Object.entries(files)) writeFileSync(path.join(root, rel), body)
  const res = spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: 'utf8' })
  return { ...res, root }
}

test('fails before building when a deck includes a missing section', () => {
  const res = run({ 'talk.md': '---\ntitle: T\ndate: 2026-01-01\nsrc: ./sections/oidc/detailed-2099-01.md\n---\n' })
  assert.equal(res.status, 1)
  assert.match(res.stderr, /talk\.md: Imported markdown file not found: .*detailed-2099-01\.md/)
  assert.equal(existsSync(path.join(res.root, 'dist')), false)
})

test('fails on an unknown deck argument and lists the decks', () => {
  const res = run({ 'talk.md': '---\ntitle: T\ndate: 2026-01-01\n---\n# A\n' }, ['tlak'])
  assert.equal(res.status, 1)
  assert.match(res.stderr, /Unknown deck "tlak"\. Decks: talk/)
})

test('fails when a stray root markdown file has no headmatter', () => {
  const res = run({ 'NOTES.md': '# scratch\n' })
  assert.equal(res.status, 1)
  assert.match(res.stderr, /NOTES\.md: .*lowercase/)
  assert.match(res.stderr, /NOTES\.md: headmatter is missing "title"/)
})
```

Create `tests/preview.test.mjs`:

```js
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { resolveRequest } from '../scripts/preview.mjs'

const dist = mkdtempSync(path.join(os.tmpdir(), 'dist-'))
for (const f of ['index.html', 'talk/index.html', 'talk/assets/app.js', 'talk/oidc/2026-02/login_page.png']) {
  mkdirSync(path.dirname(path.join(dist, f)), { recursive: true })
  writeFileSync(path.join(dist, f), f)
}
const rel = p => p && path.relative(dist, p).split(path.sep).join('/')

test('serves the root index and deck index', () => {
  assert.equal(rel(resolveRequest(dist, '/')), 'index.html')
  assert.equal(rel(resolveRequest(dist, '/talk/')), 'talk/index.html')
  assert.equal(rel(resolveRequest(dist, '/talk')), 'talk/index.html')
})

test('serves real files before falling back', () => {
  assert.equal(rel(resolveRequest(dist, '/talk/assets/app.js?v=1')), 'talk/assets/app.js')
  assert.equal(rel(resolveRequest(dist, '/talk/oidc/2026-02/login_page.png')), 'talk/oidc/2026-02/login_page.png')
})

test('deep links fall back to the deck index', () => {
  assert.equal(rel(resolveRequest(dist, '/talk/7')), 'talk/index.html')
  assert.equal(rel(resolveRequest(dist, '/talk/presenter/3')), 'talk/index.html')
})

test('unknown decks, traversal and malformed URLs are not served', () => {
  assert.equal(resolveRequest(dist, '/nope/3'), null)
  assert.equal(resolveRequest(dist, '/../../etc/passwd'), null)
  assert.equal(resolveRequest(dist, '/%2e%2e/%2e%2e/etc/passwd'), null)
  assert.equal(resolveRequest(dist, '/%E0%A4%A'), null)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: the build-all and preview tests FAIL (the scripts don't exist yet); the Task 1 and Task 2 tests pass.

- [ ] **Step 3: Write `scripts/build-all.mjs`**

```js
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
```

- [ ] **Step 4: Write `scripts/preview.mjs`**

```js
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
```

- [ ] **Step 5: Wire up scripts and deploy config**

In `package.json` `"scripts"`, set:

```json
"build": "node scripts/build-all.mjs",
"dev": "slidev --open",
"export": "slidev export",
"preview": "node scripts/preview.mjs",
"test": "node --test tests/*.test.mjs"
```

Replace `vercel.json` with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/:deck/:path*", "destination": "/:deck/index.html" }
  ]
}
```

Delete Netlify: `git rm netlify.toml`

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests PASS (9 + 4 + 3 + 4 = 20).

- [ ] **Step 7: Run the real build**

Run: `npm run build`
Expected: exit 0, ending with `Built 1 deck(s) into dist/: atlas-sc-week-83`. Then:

```bash
ls dist                                   # index.html  atlas-sc-week-83
ls dist/atlas-sc-week-83/index.html
grep -c 'href="/atlas-sc-week-83/"' dist/index.html                              # 1
grep -rho '/atlas-sc-week-83/oidc/2026-02/login_page.png' dist/atlas-sc-week-83/assets | head -1   # prints the path
```

Also run `npm run build -- atlas-sc-week-83.md`: it must build the same single deck. Run `npm run build -- nope`: it must exit 1 with `Unknown deck "nope". Decks: atlas-sc-week-83`.

- [ ] **Step 8: Commit**

```bash
git add scripts/build-all.mjs scripts/preview.mjs tests/build-all.test.mjs tests/preview.test.mjs package.json vercel.json
git commit -m "feat: build every deck under its own path with a talk index"
```

(`netlify.toml` was already staged by `git rm`.)

---

### Task 4: npm only, README, end-to-end check

**Files:**
- Delete: `pnpm-lock.yaml`, `.npmrc`
- Modify: `README.md` (full rewrite)
- Keep: `package-lock.json` (already committed)

**Interfaces:**
- Consumes: everything above.
- Produces: an npm-only repo and the documented workflow.

- [ ] **Step 1: Remove pnpm and verify a clean npm install**

```bash
git rm pnpm-lock.yaml .npmrc
rm -rf node_modules && npm ci
npm audit
```

Expected: `npm ci` succeeds without `Unknown project config` warnings, and `npm audit` prints `found 0 vulnerabilities`. If `npm ci` complains that the lockfile is out of sync, run `npm install`, re-run `npm audit`, and include `package-lock.json` in this task's commit.

- [ ] **Step 2: Rewrite `README.md`**

Replace its content with:

````markdown
# Rucio WebUI presentations

Slidev decks for the Rucio WebUI talks given at different events, built from a shared library of versioned sections and deployed together on Vercel: `/` lists the talks and each deck lives at `/<deck>/`.

## Run, build, export

```bash
npm install
npm run dev -- atlas-sc-week-83.md       # present or edit one deck at http://localhost:3030
npm run build                            # validate + build every deck into dist/
npm run build -- atlas-sc-week-83        # build just one deck
npm run preview                          # serve dist/ like Vercel does, at http://localhost:4173
npm run export -- atlas-sc-week-83.md    # export one deck to PDF
npm test                                 # deck, content, build and preview checks
```

## Layout

```
<deck>.md                                  one file per event: title, date, ordered src: list
sections/<topic>/<variant>-<YYYY-MM>.md    shared, versioned sections (e.g. oidc/detailed-2026-02.md)
events/<deck>/*.md                         slides that only belong to one event (cover, schedule, roadmap)
public/<topic>/<YYYY-MM>/                  screenshots, versioned per topic and shared by its variants
public/events/<deck>/                      event-only images
style.css, uno.config.ts, components/      shared by every deck
```

## Rules

- A deck always points at an exact variant and version, e.g. `src: ./sections/oidc/minimal-2026-10.md`.
- **A section version that has been presented is read-only.** To change it, copy it to a new version and edit the copy, so past decks keep what was shown.
- Shared styling (`style.css`, `uno.config.ts`) is not versioned: restyling changes how every deck looks.

## New event deck

1. Copy an existing deck file, e.g. `cp atlas-sc-week-83.md cern-it-2026.md`. The file name becomes the URL, so use lowercase words joined by hyphens.
2. Set `title` and `date` (`YYYY-MM-DD`) in its first block. They appear on the talk index.
3. Create `events/cern-it-2026/intro.md` for the cover slide and point the first `src:` at it.
4. Pick the sections you want, in order.
5. `npm test && npm run build` checks that every included file and screenshot exists.

## Change a section a past deck uses

```bash
cp sections/oidc/detailed-2026-02.md sections/oidc/detailed-2026-10.md
mkdir -p public/oidc/2026-10 && cp public/oidc/2026-02/*.png public/oidc/2026-10/
```

Edit the new files, update the image paths in the new section to `/oidc/2026-10/…`, and point the new deck at `detailed-2026-10.md`.

## Add a variant

Create `sections/<topic>/<variant>-<YYYY-MM>.md` (e.g. `oidc/minimal-2026-10.md`). It can reuse any screenshot version of its topic.
````

- [ ] **Step 3: Full test and build**

Run: `npm test && npm run build`
Expected: 20 tests pass, and the build ends with `Built 1 deck(s) into dist/: atlas-sc-week-83`.

- [ ] **Step 4: Browser check through the Vercel-equivalent server**

Start `npm run preview` in the background, then use Chrome (claude-in-chrome) on `http://localhost:4173`:

1. `/` shows "Rucio WebUI Talks" with one entry, "Rucio WebUI — ATLAS S&C Week #83 · 2026-02-08" (the `&` shown literally), linking to `/atlas-sc-week-83/`.
2. Click it: the cover slide loads.
3. Go to `/atlas-sc-week-83/5`, `/atlas-sc-week-83/14`, `/atlas-sc-week-83/10` and `/atlas-sc-week-83/20`. The OIDC login, bookmark (frontmatter `image:`), dashboard widget and tips screenshots must render. Check `read_network_requests` for any 404s.
4. Reload `/atlas-sc-week-83/7`: the same slide comes back.
5. Open `/atlas-sc-week-83/presenter/1`: presenter mode loads.
6. Check `read_console_messages` with pattern `error|404`: there should be no asset errors.

Stop the preview server.

- [ ] **Step 5: Commit**

```bash
git add README.md package-lock.json
git commit -m "chore: standardise on npm and document the multi-deck workflow"
```

(`pnpm-lock.yaml` and `.npmrc` were already staged by `git rm`.)

---

## After the plan

The branch `multi-deck` is ready to merge. The first Vercel deploy after merging moves the deck from `/` to `/atlas-sc-week-83/`, and `/` becomes the talk index (agreed in the spec).
