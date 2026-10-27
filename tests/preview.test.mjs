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
