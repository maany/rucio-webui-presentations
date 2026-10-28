---
layout: default
---

# Skills: know-how in SKILL.md files

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Shipped (5)</div>
  <ul class="text-xs space-y-1 !pl-4">
    <li>creating replication rules</li>
    <li>diagnosing stuck rules</li>
    <li>quota and usage analysis</li>
    <li>RSE expression basics</li>
    <li>SQL recipes over handles</li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Operator</div>
  <p class="text-xs !leading-snug"><code>ASSISTANT_SKILLS_DIR</code>: one folder per skill with a <code>SKILL.md</code>. Read on every config request, so no restart. Up to 50 skills of 32 KB.</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">User</div>
  <p class="text-xs !leading-snug">Pasted or uploaded on the Skills tab, kept in the browser. Labelled and fenced as untrusted text.</p>
</div>

</div>

<div class="mt-5 text-sm">

- Agent Skills format: <code>name</code>, <code>description</code>, optional <code>allowed-tools</code>. The catalog goes in the system prompt, <code>activate_skill</code> loads the body
- <code>allowed-tools</code> can only **narrow** the tools for the rest of the turn, including calls in the same step
- Skills never add tools and never change permissions; a skill that looks like it holds a credential is rejected
- Same name: operator wins over shipped, shipped over user, with a visible note

</div>

<!--
Skills are how operators teach the bot their local conventions without touching code: which RSE expression to use for tier 1 disks, how their quota policy works.
We use the open Agent Skills format. Only names and descriptions go into the system prompt; the body loads when the model activates a skill.
The important safety property: a skill can only take tools away. It can never add a tool or loosen a permission, and user skills are treated as untrusted text like any tool result.
We did not use @tanstack/ai-skills because its parser ignores allowed-tools.
-->

---
layout: default
---

# The Skills tab

<div class="grid grid-cols-5 gap-6 mt-2 items-start">

<div class="col-span-3">
  <img src="/rucio-bot/2026-10/settings-skillstab--default.png" class="rounded-lg shadow-lg w-full object-cover object-top" style="height: 400px;" alt="Skills tab with the docs index version and the skill list" />
</div>

<div class="col-span-2 text-sm">

- **Docs index** line: pinned documentation commit and REST API version
- Badges show the source: **Operator**, **Shipped**, **User**
- An operator skill with the same name replaces the shipped one, with a visible note
- Each skill lists the tools it is limited to
- Enable switches per skill; user skills can be deleted
- Add your own: paste a <code>SKILL.md</code> or choose a <code>.md</code> file, kept in this browser as untrusted text

</div>

</div>

<!--
The Skills tab in this story has an operator skill called rse-expression-basics, which replaces the shipped skill of the same name; the shipped one is listed greyed out at the bottom with the reason.
Every skill shows its allowed tools as "Limits tools to".
-->

---
layout: default
---

# Docs search: answers with sources

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="text-sm">

- <code>search_docs</code> over a MiniSearch index of
  - <strong>rucio/documentation</strong>, pinned at <code>566bee0</code> (2026-10-19)
  - the <strong>REST API reference</strong> 41.0.0rc1
- 795 chunks, committed under <code>public/assistant/</code>, so builds need no network
- Loaded on the first search, never before
- Every hit carries a title, a snippet and a link to rucio.cern.ch; the bot is told to cite it
- The pinned version is shown on the Skills tab

</div>

<div class="flex flex-col gap-3">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 text-sm">
    <div class="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Rebuild</div>
    <code>npm run assistant:build-docs-index</code>
    <p class="text-xs mt-2">Reads the pins in <code>tools/assistant/docs-sources.json</code>; fails if the published REST spec changed, unless you pass <code>--update-pins</code></p>
  </div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 text-sm">
    <div class="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Shipped skills</div>
    <code>npm run assistant:build-skills</code>
    <p class="text-xs mt-2">A test fails when the bundle is stale or a skill names a tool it does not allow</p>
  </div>
</div>

</div>

<!--
For "how does X work in Rucio" questions the bot searches a bundled index instead of guessing.
The index is a pinned snapshot, built by a script and committed, which keeps air-gapped deployments working and builds reproducible.
The tool description reminds the model that the live server may differ from the snapshot.
-->
