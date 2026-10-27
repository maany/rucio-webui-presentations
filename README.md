# Rucio WebUI presentations

Slidev decks for the Rucio talks (WebUI and related tools) given at different events, built from a shared library of versioned sections and deployed together on Vercel: `/` lists the talks and each deck lives at `/<deck>/`.

## Decks

| Deck | Talk | Event | Date |
|---|---|---|---|
| `rucio-workshop-2026-webui` | Rucio WebUI: What's New, What's Next, and How to Get Started | Rucio Workshop 2026 | 2026-10-30 |
| `rucio-workshop-2026-chat` | Rucio Chat | Rucio Workshop 2026 | 2026-10-28 |
| `atlas-sc-week-83` | Rucio WebUI | ATLAS Software & Computing Week #83 | 2026-02-08 |

## Run, build, export

```bash
npm install
npm run dev                              # present or edit the newest deck at http://localhost:3030
npm run dev -- atlas-sc-week-83          # …or a specific one
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

1. Copy an existing deck file, e.g. `cp atlas-sc-week-83.md cern-it-2026.md`. The file name becomes the URL, so use lowercase words joined by hyphens. When one event has several talks, name them `<event>-<talk>` (e.g. `rucio-workshop-2026-chat`, `rucio-workshop-2026-webui`).
2. Set `title` and `date` (`YYYY-MM-DD`) in its first block. They appear on the talk index. Quote the title if it contains `#` or `:` (YAML would cut it off).
3. Copy a cover slide, e.g. `mkdir events/cern-it-2026 && cp events/rucio-workshop-2026-webui/intro.md events/cern-it-2026/`, update its title, date and event line, and point the first `src:` at it.
4. Pick the sections you want, in order. To drop a slide without deleting it, comment out its `src:` block (`<!-- … -->`).
5. Add it to the [Decks](#decks) table above.
6. `npm test && npm run build` checks that every included file and screenshot exists.

## Change a section a past deck uses

```bash
cp sections/oidc/detailed-2026-02.md sections/oidc/detailed-2026-10.md
mkdir -p public/oidc/2026-10 && cp public/oidc/2026-02/*.png public/oidc/2026-10/
```

Edit the new files, update the image paths in the new section to `/oidc/2026-10/…`, and point the new deck at `detailed-2026-10.md`.

## Add a variant

Create `sections/<topic>/<variant>-<YYYY-MM>.md` (e.g. `oidc/minimal-2026-10.md`). It can reuse any screenshot version of its topic.

## Add a new topic

Create `sections/<topic>/<variant>-<YYYY-MM>.md` for the first version (e.g. `sections/rucio-chat/detailed-2026-10.md`) and put its screenshots in `public/<topic>/<YYYY-MM>/`. Slides that only make sense for one talk (agenda, thank-you, event-specific roadmap) go in `events/<deck>/` instead.
