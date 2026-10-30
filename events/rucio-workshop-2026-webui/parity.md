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
Against the old UI: 17 pages have a full equivalent.
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

<!--
Grouped by area; each line names the CLI command or old UI page it comes from in the appendix.
Some are already moving: PFNs in replica views is an open PR, OpenData pages are in review.
-->

---
layout: default
---

# Retiring the old WebUI by March 2027

<div class="grid grid-cols-5 gap-6 mt-4">

<div class="col-span-3">

<div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Old UI views still to bring over</div>

<div class="grid grid-cols-2 gap-2 text-sm">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Subscription editor</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Add RSE, protocols, attributes</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Examine a stuck rule</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Bad replica summary and list</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Quotas per RSE, approval settings</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Lifetime exceptions</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Browser download, metalink</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">Daemon heartbeats</div>
</div>


</div>

<div class="col-span-2 border-2 border-brand-500 rounded-xl p-5">

<div class="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">Which of these does your community use?</div>

<p class="text-sm !leading-snug mt-2">Tell us which views and features matter to you, from this list or from the CLI gaps, and we will prioritise them.</p>

<div class="text-sm mt-4 space-y-2">
  <div><span class="i-heroicons-chat-bubble-left-right inline-block w-5 h-5 text-brand-600 align-middle mr-1"/> Talk to us today</div>
  <div><span class="i-heroicons-hashtag inline-block w-5 h-5 text-brand-600 align-middle mr-1"/> Rucio WebUI channel on Mattermost</div>
  <div><span class="i-heroicons-code-bracket inline-block w-5 h-5 text-brand-600 align-middle mr-1"/> An issue on github.com/rucio/webui</div>
</div>

</div>

</div>

<!--
The goal for the coming cycle: switch off the old Flask UI by March 2027.
On the left are the old UI views that have no WebUI equivalent yet; everything else in the old UI is already covered.
We do not know which of these each community actually uses, and that decides the order we build them in. So the ask is simple: tell us what you use, today, on Mattermost, or in a GitHub issue.
The same goes for CLI features you would rather do in a browser: DID management, rule move, history, and so on.
Also on the way, from Wednesday's talk: Rucio bot, the assistant inside the WebUI, behind FEATURE_ASSISTANT and off by default.
-->
