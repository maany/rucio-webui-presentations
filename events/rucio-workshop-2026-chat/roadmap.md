---
layout: default
---

# What's next

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-code-bracket w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Codebase exploration</span></div>
  <p class="text-sm !leading-snug">"How does the judge evaluate this rule?" answered from a pinned <code>rucio/rucio</code> checkout that matches the server version</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-beaker w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Python sandbox</span></div>
  <p class="text-sm !leading-snug">Pyodide in a worker next to DuckDB, self-hosted, data only and no credentials</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-puzzle-piece w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">MCP</span></div>
  <p class="text-sm !leading-snug">Expose the same tool registry as an MCP server for external agents, and consume external MCP servers</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-user-group w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Second-person approval</span></div>
  <p class="text-sm !leading-snug">High-risk actions wait in a review queue for another admin instead of a single click</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-funnel w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">URL filters on accounts</span></div>
  <p class="text-sm !leading-snug">So the bot can open a filtered account list like it does for rules (<a href="https://github.com/rucio/webui/issues/874" target="_blank">rucio/webui#874</a>)</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-table-cells w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Pinned data tables</span></div>
  <p class="text-sm !leading-snug">Keep a result table across reloads when the user asks for it</p>
</div>

</div>

<!--
None of this is built yet; it is the v2 backlog from the design spec plus one WebUI issue.
Codebase exploration is aimed at developers and integrators.
Second-person approval is what would let operators raise the cap on high-risk tools safely.
I would love input on which of these matters most for your experiment.
-->

---
layout: center
class: text-center
---

# Thank you!

Questions?

<div class="pt-10 text-sm">

Rucio bot ships behind <code>FEATURE_ASSISTANT</code>, off by default

**Rucio WebUI Team**

rucio.cern.ch | github.com/rucio/webui

</div>

<!--
Thanks. Happy to take questions, and to show any part of the demo again.
Feedback on GitHub issues or on Mattermost is very welcome, especially from operators who want to try it with their own model.
-->
