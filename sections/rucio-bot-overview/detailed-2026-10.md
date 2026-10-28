---
layout: default
---

# Rucio bot in one line

<div class="grid grid-cols-5 gap-8 mt-4 items-center">

<div class="col-span-3">
  <div class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 leading-relaxed">
    Ask Rucio questions in plain language. The bot reads, analyses and, only with your approval, changes Rucio through the WebUI you are already signed in to.
  </div>
  <div class="flex flex-wrap gap-3 mt-8 text-sm">
    <span class="badge-warning px-3 py-1 rounded-md"><code>FEATURE_ASSISTANT=false</code> by default</span>
    <span class="badge-info px-3 py-1 rounded-md">Your model or the operator's</span>
    <span class="badge px-3 py-1 rounded-md">Every write asks first</span>
  </div>
</div>

<div class="col-span-2 flex justify-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--with-conversation.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 280px; height: 400px;" alt="Rucio bot panel answering how many rules are stuck per RSE" />
</div>

</div>

<!--
The one-line pitch. Three things to remember:
1. It is feature flagged and off by default. With FEATURE_ASSISTANT off nothing renders, the routes answer 404 and no assistant code is downloaded.
2. It works with a model the operator provides, or with the user's own provider.
3. It acts as the signed-in user, through the WebUI's own API, and anything that changes Rucio goes through an approval card.
-->

---
layout: default
---

# What it can do

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-magnifying-glass w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Read</span></div>
  <p class="text-sm !leading-snug">35 read tools, one per read-only <code>/api/feature</code> route: DIDs, rules, RSEs, accounts, replicas, subscriptions, transfer requests</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-table-cells w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Analyse</span></div>
  <p class="text-sm !leading-snug">Rows land in an in-browser DuckDB scratchpad; the bot counts, groups and joins them with SQL</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-cursor-arrow-rays w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Drive the UI</span></div>
  <p class="text-sm !leading-snug">Knows the current page, navigates, filters list pages and pre-fills the create-rule wizard for you to submit</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-pencil-square w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Change</span></div>
  <p class="text-sm !leading-snug">16 write tools behind a deny / ask / allow policy gate with in-chat approval cards</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-book-open w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Know</span></div>
  <p class="text-sm !leading-snug">Searches a pinned Rucio docs and REST API index, follows Agent Skills</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-eye w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Show its work</span></div>
  <p class="text-sm !leading-snug">Activity timeline per answer: tool calls, SQL, reasoning, tokens and cost</p>
</div>

</div>

<!--
Six capabilities.
Read: every non-mock read route under /api/feature is a tool, 35 with the new list-requests route.
Analyse: list results never go into the prompt; they go into DuckDB and the model writes SQL.
Drive the UI: navigate, read_current_page and page actions. Page actions only fill or filter; the user submits.
Change: the 16 write routes, each behind the policy gate.
Know: search_docs over a bundled docs index, plus skills.
Show its work: one collapsed activity line per answer that expands into every tool call and query.
-->

---
layout: default
---

# The panel

<div class="grid grid-cols-3 gap-6 mt-2 items-start">

<div class="text-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--empty.png" class="rounded-lg shadow-lg mx-auto object-cover object-top" style="width: 230px; height: 320px;" alt="Empty Rucio bot panel" />
  <p class="text-sm mt-2 !mb-0">Docked and resizable on desktop; the page stays usable</p>
</div>

<div class="text-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--mobile.png" class="rounded-lg shadow-lg mx-auto object-cover object-top" style="width: 180px; height: 320px;" alt="Rucio bot as a full-screen sheet on a phone" />
  <p class="text-sm mt-2 !mb-0">Full-screen sheet on mobile</p>
</div>

<div class="text-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--minimized-bubble.png" class="rounded-lg shadow-lg mx-auto object-cover object-bottom" style="width: 180px; height: 320px;" alt="Rucio bot minimised to a bubble" />
  <p class="text-sm mt-2 !mb-0">Shrinks to a bubble while the bot moves the page</p>
</div>

</div>

<div class="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
  Open it from the header button, <code>Ctrl/Cmd+Shift+Space</code> or <strong>Ask Rucio bot</strong> in the command palette. The chip above the composer shows the page context; remove it per message.
</div>

<!--
Storybook screenshots of the real components.
Desktop: a docked panel next to the page, which stays interactive. Mobile: a full-screen sheet. When the bot navigates or fills a page on a phone, the sheet shrinks to this bubble so you can see the page; tap it to come back.
The "Page: Rules" chip is the page context that goes with the message. Click the x to send a message without it.
-->

---
layout: default
---

# Three flags, off by default

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="border-2 border-brand-500 rounded-xl p-5">
  <code class="!text-xs">FEATURE_ASSISTANT</code>
  <p class="text-sm mt-2 !mb-0">Panel, settings page, relays and config route. Off: nothing renders, routes return 404, no assistant code loads.</p>
</div>

<div class="border-2 border-warning-500 rounded-xl p-5">
  <code class="!text-xs">FEATURE_ASSISTANT_WRITE</code>
  <p class="text-sm mt-2 !mb-0">Needs <code>FEATURE_ASSISTANT</code>. Without it, write tools are never offered to the model.</p>
</div>

<div class="border-2 border-error-500 rounded-xl p-5">
  <code class="!text-xs">FEATURE_ASSISTANT_BAD_REPLICAS</code>
  <p class="text-sm mt-2 !mb-0">Needs <code>FEATURE_ASSISTANT_WRITE</code>. Unlocks <code>declare_bad_replicas</code>.</p>
</div>

</div>

<div class="mt-8 text-sm text-neutral-700 dark:text-neutral-300">

- Existing page flags still apply: a tool is hidden when its route's flag is off (for example <code>rules.create</code>, <code>accounts</code>)
- Admin-only tools are hidden for non-admins; nothing is offered before permissions are loaded
- Rucio stays the authority: every call runs with the user's own session

</div>

<!--
Children need their parents, so you can enable a read-only bot first and add writes later.
Visibility is separate from policy: a hidden tool is never sent to the model at all, and if the model names it anyway it is denied.
-->
