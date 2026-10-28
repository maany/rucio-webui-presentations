---
layout: section
---

# What's next
Where the WebUI stands against the CLI and the old UI

<!--
Second part. Before planning the next cycle, I compared the WebUI with the two things people use instead of it: the rucio CLI and the old Flask UI.
-->

---
layout: default
---

# Three inventories

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="flex items-center gap-2 mb-3"><span class="i-heroicons-command-line w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">rucio CLI</span></div>
  <div class="text-3xl font-bold text-brand-600">82</div>
  <div class="text-sm">commands: 31 read, 51 write</div>
  <p class="text-xs mt-3 !mb-0">38 are admin-only under the default policy. <code>rucio-admin</code> is deprecated; everything lives in <code>rucio</code></p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="flex items-center gap-2 mb-3"><span class="i-heroicons-archive-box w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Old Flask UI</span></div>
  <div class="text-3xl font-bold text-brand-600">32</div>
  <div class="text-sm">pages still on rucio master</div>
  <p class="text-xs mt-3 !mb-0">14 with write actions, 6 ATLAS-only. 5 more pages were removed in 40.1</p>
</div>

<div class="border-2 border-brand-500 rounded-xl p-5">
  <div class="flex items-center gap-2 mb-3"><span class="i-heroicons-window w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">New WebUI (main)</span></div>
  <div class="text-3xl font-bold text-brand-600">14</div>
  <div class="text-sm">pages, 21 write actions</div>
  <p class="text-xs mt-3 !mb-0">DIDs, rules, approvals, RSEs, subscriptions, suspicious replicas, accounts, dashboard</p>
</div>

</div>

<div class="text-xs text-neutral-600 dark:text-neutral-400 mt-6">
  Read from <code>rucio/rucio</code> master (<code>lib/rucio/cli</code>, <code>lib/rucio/web/ui</code>) and <code>rucio/webui</code> main, October 2026. Full lists in the appendix.
</div>

<!--
The CLI has 82 commands in the unified rucio CLI. Admin-only means root or admin=True under the generic policy; experiment policies can change that.
The old UI still has 32 pages on master.
The WebUI counts are for main, including account management that ships next.
-->

---
layout: default
---

# Coverage today

<div class="space-y-5 mt-6">

<div>
  <div class="flex justify-between text-sm mb-1"><span><strong>CLI read commands</strong></span><span>19 of 31, plus <code>replica list dataset</code> in part</span></div>
  <div class="h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex"><div class="h-full bg-brand-600" style="width: 61%"></div><div class="h-full bg-brand-300" style="width: 3%"></div></div>
</div>

<div>
  <div class="flex justify-between text-sm mb-1"><span><strong>CLI write commands</strong></span><span>12 of 51, plus <code>rule update</code> in part</span></div>
  <div class="h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex"><div class="h-full bg-brand-600" style="width: 23.5%"></div><div class="h-full bg-brand-300" style="width: 2%"></div></div>
</div>

<div>
  <div class="flex justify-between text-sm mb-1"><span><strong>Old UI pages</strong></span><span>17 of 32, 1 in part, 14 missing (6 of them ATLAS-only)</span></div>
  <div class="h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex"><div class="h-full bg-brand-600" style="width: 53%"></div><div class="h-full bg-brand-300" style="width: 3%"></div></div>
</div>

</div>

<div class="text-xs text-neutral-600 dark:text-neutral-400 mt-2">rucio/webui main, including account management from the next release</div>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>Users</strong> are mostly covered: search, inspect, create and manage their rules</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>17 of the 38 missing writes</strong> are infrastructure admin: RSEs, protocols, distances, limits, QoS, config</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>The old UI</strong> still wins on subscriptions editing, RSE editing, bad replica summaries and quota management</div>
</div>

<!--
Counted command by command against main, so account management, which ships next, counts as covered. The tables are in the appendix.
Reads are about two thirds covered. The missing reads are things like scope list, rule history, content history, distances, QoS and config.
Writes are where the gap is, and almost half of the missing writes are infrastructure administration that most users never touch.
Against the old UI: 17 pages have a full equivalent. 6 of the 14 missing pages are ATLAS-only and need a decision: port them behind a flag, or retire them.
-->

---
layout: default
---

# What's missing

<div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-4 text-sm">

<div><strong>Subscriptions</strong> · create and edit (old UI editor, CLI), touch</div>
<div><strong>RSEs</strong> · add, settings, attributes, protocols, distances, limits, QoS</div>
<div><strong>Rules</strong> · examine a stuck rule, move, activity, source RSEs, locked, suspend</div>
<div><strong>DIDs</strong> · create datasets and containers, attach, detach, close, erase, edit metadata</div>
<div><strong>Replica health</strong> · bad replica summary and list, declare unavailable, PFNs</div>
<div><strong>Quotas and approvals</strong> · per-RSE quota editing, auto-approve settings, country admins</div>
<div><strong>Lifetime model</strong> · request and list lifetime exceptions</div>
<div><strong>History</strong> · rule history and content history of a DID</div>
<div><strong>Downloads</strong> · browser download from WebDAV RSEs, metalink files</div>
<div><strong>Operations</strong> · scopes, server config, daemon heartbeats</div>

</div>

<div class="mt-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 text-sm">
  <strong>ATLAS-only old pages, port or retire?</strong> Rule backlog monitor, group account usage, ConditionsDB and DBRelease summaries, dumps, infrastructure links
</div>

<!--
Grouped by area; each line names the CLI command or old UI page it comes from in the appendix.
Some are already moving: PFNs in replica views is an open PR, OpenData pages are in review.
The ATLAS-only pages are a question for ATLAS: several of them are thin wrappers around dumps or links, so a feature-flagged page may not be worth it.
-->

---
layout: default
---

# Proposed priorities

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="border-2 border-brand-500 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">1 · Retire the old UI</div>
  <ul class="text-sm !leading-snug !pl-4">
    <li>Subscription editor</li>
    <li>RSE attributes, protocols, settings</li>
    <li>Examine stuck rules</li>
    <li>Bad replica summary</li>
    <li>Per-RSE quotas, approval settings, country admins</li>
    <li>Lifetime exceptions</li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">2 · Power users</div>
  <ul class="text-sm !leading-snug !pl-4">
    <li>DID management (routes exist)</li>
    <li>Rule move and full rule update</li>
    <li>PFNs in replica views (open PR)</li>
    <li>Rule and content history</li>
    <li>Downloads and metalinks</li>
    <li>Permissions from the server policy</li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">3 · Operators</div>
  <ul class="text-sm !leading-snug !pl-4">
    <li>RSE distances, limits, QoS</li>
    <li>Scopes, server config, heartbeats</li>
    <li>OpenTelemetry</li>
    <li>OIDC together with multi-VO</li>
    <li>OpenData pages (in review)</li>
  </ul>
</div>

</div>

<div class="mt-5 text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
  Which three would you move up? Tell us today, on Mattermost, or on GitHub.
</div>

<!--
This is a proposal, and the point of this slide is to get your input.
Column one is what blocks switching off the old UI for good.
Column two is what makes the WebUI a real alternative to the CLI for daily work.
Column three is for the people running Rucio itself.
Also on the way, from Wednesday's talk: Rucio bot, the assistant inside the WebUI, behind FEATURE_ASSISTANT and off by default.
-->
