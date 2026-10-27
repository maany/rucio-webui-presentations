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
