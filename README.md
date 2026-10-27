# Rucio WebUI presentations

Slidev decks for the Rucio WebUI talks given at different events, built from a shared library of versioned sections and deployed together on Vercel: `/` lists the talks and each deck lives at `/<deck>/`.

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

1. Copy an existing deck file, e.g. `cp atlas-sc-week-83.md cern-it-2026.md`. The file name becomes the URL, so use lowercase words joined by hyphens.
2. Set `title` and `date` (`YYYY-MM-DD`) in its first block. They appear on the talk index. Quote the title if it contains `#` or `:` (YAML would cut it off).
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
