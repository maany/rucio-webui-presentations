# Extra slide ideas for the Rucio bot deck

Not included in `rucio-workshop-2026-chat.md`. Each idea is backed by code on `feat/assistant-bot`. This file is notes, not slides, and no deck includes it.

- **find_tools and the small always-on toolset**: domain tools load on demand to keep prompts small for local models (keyword search over tool specs).
- **Write tool lifecycle**: schema validation, one same-origin JSON request, typed errors, React Query invalidation through `INVALIDATION_MAP`, toast, "may have been applied" wording after timeouts or Stop.
- **Page actions in depth**: `usePageAction` / `usePageDescribe`, the bridge that keeps assistant runtime out of page bundles, and the import guard test.
- **Create-rule wizard prefill walkthrough**: `rule_create.prefill` resolves DIDs and quotas, fills the wizard up to the step that needs the user, and never opens the submit step.
- **Mobile UX**: full-screen sheet, bubble while the bot navigates, approval cards with large touch targets, focus and inert handling.
- **Ollama on a laptop**: Local Network Access prompt, `OLLAMA_ORIGINS`, mixed content, with Test connection screenshots.
- **Operator deployment checklist**: one slide with every `ASSISTANT_*` env var and its default.
- **list-requests route**: the new `/api/feature/list-requests` endpoint (state codes, permission_denied mapping, FEATURE_REQUESTS flag).
- **Secret scrubber cases**: before/after examples (JWT, DN, cookie, Bearer) and the accepted gaps listed in the phase 6 report.
- **Topic check internals**: classifier call, cache, warn versus block, why it is a soft control.
- **Why not LangChain or Vercel AI SDK**: decision log (TanStack AI pinned behind one adapter, Vercel AI SDK v7 as the verified fallback).
- **Review focus scenarios from the master plan**: session expiry mid-turn, half-failed streams, account switch, tampered settings, pending approval then reload.
- **Storybook tour**: panel states, approval card, timeline, result table, settings tabs.
- **More Storybook states**: re-shoot from the assistant Storybook (57 stories) for, for example, the Permissions tab with writes off or a non-admin, the Telemetry form with a CORS error, the provider dialog in edit mode, the streaming panel. They were captured once and removed because no slide used them.
- **Real app shell screenshots**: the panel docked beside a WebUI page and the session gate covering the panel, which Storybook cannot render; needs a logged-in WebUI.
- **Cost and token economics**: the model catalog, price overrides, per-turn and per-chat totals, and what a typical question costs.
- **Audience Q&A slide**: common objections ("can it delete my data?", "does it see my token?", "can I use our own model?") with one-line answers.
