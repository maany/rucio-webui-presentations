---
layout: default
---

# One streaming interface for every list

```mermaid {scale: 0.54}
flowchart LR
  R[("Rucio server<br/>NDJSON")] --> G["Gateway<br/>Node Transform stream"]
  G --> P["Pipeline<br/>optional enrichment hops"]
  P --> A["/api/feature/*<br/>NDJSON response"]
  A --> W["Web Worker<br/>parse off the main thread<br/>batch every 50 ms, up to 100 rows"]
  W --> T["AG Grid table<br/>rows appear as they arrive"]
```

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-bolt w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">First rows fast</span></div>
  <p class="text-sm !leading-snug !mb-0">You see results while Rucio is still sending them; pause or stop any time</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-squares-2x2 w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">One code path</span></div>
  <p class="text-sm !leading-snug !mb-0">16 tables use it: DIDs, rules, RSEs, subscriptions, approvals, replicas, accounts, rule locks</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-sparkles w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">New this year</span></div>
  <p class="text-sm !leading-snug !mb-0">Rows and progress in one stream: "All" DID search runs containers and datasets together, files only as a fallback</p>
</div>

</div>

<div class="text-xs text-neutral-600 dark:text-neutral-400 mt-4">
  Same tables everywhere: filter, multi-select filters on every enum column, sort, resize, shareable URL filters.
</div>

<!--
Every list in the WebUI goes through the same path. Rucio streams NDJSON; the WebUI server transforms and optionally enriches each row; the browser parses in a Web Worker and pushes batches into the grid.
So a new list page is mostly a gateway endpoint and a column definition.
New this year: a stream can carry progress records next to rows. That is how "All" search shows "searching datasets..." in the table while rows already arrive.
-->
