---
layout: default
---

# You asked, we built

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-exclamation-triangle w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Suspicious Replicas</span></div>
  <p class="text-sm !leading-snug !mb-0">Watch suspicious replicas live by RSE expression, age and attempts, and declare them bad in bulk</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-server-stack w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Dataset replicas per RSE</span></div>
  <p class="text-sm !leading-snug !mb-0">One summary row per RSE instead of hundreds of pages of file replicas</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-puzzle-piece w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Experiment integrations</span></div>
  <p class="text-sm !leading-snug !mb-0">Opt-in flags: DDM dashboard links on rule locks (ATLAS, CMS), AMI tags and PanDA task links on DIDs (ATLAS)</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-calculator w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Sizes like the CLI</span></div>
  <p class="text-sm !leading-snug !mb-0">Base-10 units, so the WebUI and the CLI show the same numbers</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-bars-arrow-down w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Stuck first</span></div>
  <p class="text-sm !leading-snug !mb-0">Rule and lock states sort by priority, so stuck and replicating come first</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-wrench-screwdriver w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Production fixes</span></div>
  <p class="text-sm !leading-snug !mb-0">Subscription and RSE names with spaces and brackets, search in narrow windows</p>
</div>

</div>

<div class="mt-5 text-sm">

**Lessons:** ship small patches fast · pin dependencies and audit weekly · validate config at boot · keep experiment-specific features behind opt-in flags · some views need server API changes to scale

</div>

<!--
Most of this year's features started as issues filed by operators running the WebUI in production.
Experiment-specific integrations are behind flags that are off by default: the DDM dashboard links are for ATLAS and CMS, AMI and PanDA for ATLAS. Other communities never see them unless they turn them on.
"Production fixes" is the class of bugs production found and tests did not: names with spaces and brackets, and the search page in a narrow window. Deep links through the login redirect are next, in an open PR.
The last lesson: the approval queue and dataset replica views enrich every row with extra calls; at scale that needs server-side support.
If your community needs an integration like these, open an issue: the flag system is there so it does not affect anyone else.
-->
