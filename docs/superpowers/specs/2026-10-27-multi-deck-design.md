# Multi-deck presentations: design

Date: 2026-10-27
Status: approved in conversation, awaiting spec review

## Goal

Turn this repo, which currently holds one Slidev deck (ATLAS Software & Computing Week #83, Feb 2026), into a home for every Rucio WebUI talk given at different events. Every deck stays runnable locally and deployed side by side on one Vercel site.

Success means:

- A new event deck can be put together by choosing existing sections, plus a few event-specific slides.
- A past deck's content never changes when a section is later updated or given a new variant.
- One `npm run build` produces the whole site: an index of talks at `/` and each deck at `/<deck>/`.

## Decisions

| Question | Decision |
|---|---|
| Reuse model | Shared section library; decks select sections |
| Freezing past decks | Sections are versioned files; a presented version is read-only |
| Variants | A topic can have several variants (e.g. `detailed`, `minimal`), each versioned independently |
| Layout | Deck entry files at the repo root (Slidev treats the entry's folder as the project root, so shared `style.css`, `uno.config.ts`, `components/` and `public/` keep working without an addon) |
| Hosting | Vercel only; one site, one deck per path, root is a talk index |
| Package manager | npm (`package-lock.json`); pnpm lockfile and `.npmrc` removed |

## Layout

```
atlas-sc-week-83.md                 deck entry: headmatter (title, date) + ordered src: list
sections/<topic>/<variant>-<YYYY-MM>.md
events/<event>/*.md                 slides that only make sense for one event
public/<topic>/<YYYY-MM>/*          screenshots, versioned per topic (shared by variants)
public/events/<event>/*             event-only images
style.css  uno.config.ts  components/  snippets/  pages/   shared, unchanged
scripts/build-all.mjs               builds every deck + the index page
vercel.json                         per-deck SPA rewrites
```

## Rules

1. **Naming.** Every section file is `sections/<topic>/<variant>-<YYYY-MM>.md`, where the date is the month the version was written. Use a variant name even when a topic has only one form (`detailed`), so there are no exceptions.
2. **Explicit references.** A deck's `src:` always names a specific variant and version. There is no "latest" alias.
3. **Read-only once presented.** To change a section used by a past deck, copy it to a new version (`detailed-2026-10.md`) and its screenshots to `public/<topic>/2026-10/`, then edit the copies. Adding a variant never touches existing files.
4. **Image versions are per topic, not per variant.** Any variant can reference any image version of its topic.
5. **Time-bound slides go in `events/<event>/`.** This covers covers/intros, release objectives, schedules and roadmaps.
6. **Not frozen:** `style.css`, `uno.config.ts`, `components/`, and the Slidev version are shared by all decks. Restyling changes how old decks look, but not their content.

## Migration of the existing deck

Deck slug: `atlas-sc-week-83`. `slides.md` becomes `atlas-sc-week-83.md`, with the same slide order and the same commented-out entry. It gains headmatter `title: Rucio WebUI — ATLAS S&C Week #83` and `date: 2026-02-08`.

| Current file | New location | In deck today |
|---|---|---|
| `01-introduction.md` | `events/atlas-sc-week-83/intro.md` | yes |
| `02-current-release-objectives.md` | `events/atlas-sc-week-83/release-objectives.md` | yes |
| `03-feature-overview.md` | `sections/feature-overview/detailed-2026-02.md` | commented out |
| `04-oidc-authentication.md` | `sections/oidc/detailed-2026-02.md` | yes |
| `04b-dashboard-view.md` | `sections/dashboard/detailed-2026-02.md` | yes |
| `05-bookmarks.md` | `sections/bookmarks/detailed-2026-02.md` | yes |
| `06-command-palette.md` | `sections/command-palette/detailed-2026-02.md` | yes |
| `07-tips.md` | `sections/tips/detailed-2026-02.md` | yes |
| `07b-streamed-tables.md` | `sections/streamed-tables/detailed-2026-02.md` | yes |
| `08-design-system.md` | `sections/design-system/detailed-2026-02.md` | yes |
| `08b-design-system-colors.md` | `sections/design-system-colors/detailed-2026-02.md` | no |
| `09-upcoming-functionality.md` | `events/atlas-sc-week-83/upcoming-functionality.md` | yes |
| `10-missing-features.md` | `events/atlas-sc-week-83/missing-features.md` | no |
| `11-new-developments-needed.md` | `events/atlas-sc-week-83/new-developments-needed.md` | no |
| `12-release-schedule.md` | `events/atlas-sc-week-83/release-schedule.md` | yes |

Images move from `public/` into versioned folders, and their references are rewritten:

| Images | New folder | Referenced by |
|---|---|---|
| `login_page.png`, `oidc_login_atlas_iam.png`, `webui_dashboard_post_oidc.png` | `public/oidc/2026-02/` | oidc |
| `latest-rules-widget.png`, `storage_usage-widget.png` | `public/dashboard/2026-02/` | dashboard |
| `bookmarks-create.png`, `bookmark-created.png`, `bookmark-link-copied.png` | `public/bookmarks/2026-02/` | bookmarks |
| `command-palette.png` | `public/command-palette/2026-02/` | command-palette |
| `tipd-sidebar.png` | `public/tips/2026-02/` | tips |
| `rules-table.png` | `public/streamed-tables/2026-02/` | streamed-tables |

Moves use `git mv`, so history follows each file.

## Build: `scripts/build-all.mjs`

- **Deck discovery:** every `*.md` file at the repo root except `README.md`. The basename is the slug and the URL path.
- **Per deck:** run `slidev build <slug>.md --base /<slug>/ --out dist/<slug>`, one deck at a time, because Slidev's multi-entry build shares one `--base`.
- **Index:** writes `dist/index.html`, a static page listing every deck's `title` and `date` from its headmatter, newest first, each linking to `/<slug>/`. It uses the same brand colours as the decks and supports dark mode.
- **Single deck:** `npm run build -- <slug>` builds only that deck, plus the index.
- **Failure:** if any deck build fails, the script exits non-zero and names the deck, so Vercel does not deploy a partial site.

## `package.json` scripts

```json
"build": "node scripts/build-all.mjs",
"dev": "slidev --open",
"export": "slidev export"
```

`dev` and `export` take the deck as an argument: `npm run dev -- atlas-sc-week-83.md`.

## Deploy: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/:deck/:path*", "destination": "/:deck/index.html" }]
}
```

Vercel serves existing files before rewrites, so assets and `/index.html` are unaffected. Deep links like `/atlas-sc-week-83/7` survive a reload. `netlify.toml` is deleted.

## Package manager

Standardise on npm: commit `package-lock.json`, and delete `pnpm-lock.yaml` and `.npmrc` (its settings are pnpm-only). The `overrides` block that fixed `npm audit` only applies under npm. Vercel picks the installer from the lockfile, so leaving `pnpm-lock.yaml` would ship the vulnerable versions.

## README

Replace the Slidev starter README with a short how-to:

- Run or export a deck.
- Start a new event deck: copy an entry file and create `events/<event>/intro.md`.
- Change a section that a past deck uses (new version).
- Add a variant.
- The read-only rule.

## Verification

1. Before migrating, build the current deck and record its slide count and titles in order (baseline).
2. After migrating, run `npm run build`. `dist/` must contain `index.html` and `atlas-sc-week-83/`.
3. The migrated deck's slide count and titles in order must match the baseline.
4. Check that headmatter (`title`, `date`) and a first-slide `src:` can live in the same frontmatter block of the entry without adding an empty slide. If they can't, adjust the entry format and record the choice here.
5. Serve `dist/` locally with the same rewrite rule, then check in Chrome: the index lists the deck; the deck loads at `/atlas-sc-week-83/`; every screenshot renders under the base path; reloading `/atlas-sc-week-83/5` works; presenter mode opens.
6. `npm audit` reports 0 vulnerabilities after installing from the committed `package-lock.json`.

## Out of scope

- Starter leftovers (`components/Counter.vue`, `snippets/`, `pages/imported-slides.md`, `assets/`) stay as they are.
- A generator for new decks.
- Freezing styles or the Slidev version per deck.
- PDF exports in the deployed site.
