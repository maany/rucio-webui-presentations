---
layout: default
class: table-compact
---

# ATLAS in production

<div class="grid grid-cols-5 gap-6 mt-4">

<div class="col-span-2 space-y-3 text-sm">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">atlas-rucio-webui.cern.ch</div>
  <ul class="!pl-4 !leading-snug text-xs">
    <li>41.1.0, Flux <code>HelmRelease</code>, SOPS-encrypted secrets</li>
    <li>TLS in the container behind a load balancer</li>
    <li>ATLAS IAM OIDC only, userpass off</li>
    <li>DDM dashboard, AMI tag and PanDA task flags on</li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Cadence</div>
  <p class="text-xs !leading-snug !mb-0">39.0.0 went live on 2025-12-17. About 20 production rollouts since, including two same-day patch releases and one rollback.</p>
</div>

</div>

<div class="col-span-3">

<div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-sm">Production found what tests did not</div>

| Found in production | Fix |
|---|---|
| Session cookie not decrypted at the edge | 39.0.2, same day |
| OIDC audience hardcoded to `rucio` | 39.1.1, configurable |
| Subscription names with spaces and brackets | path decoding fixes |
| `ddmadmin` subscription list crashed on a null state | 41.0.2 |
| Search page empty below 1024 px | 40.1.x |
| Wrong CA variable name, auth server not trusted | 40.2.0 |

</div>

</div>

<!--
ATLAS has run the new WebUI as its production UI since December 2025.
Setup in one breath: Flux HelmRelease of the rucio-webui chart, secrets encrypted with SOPS, TLS terminated by httpd in the container, OIDC with ATLAS IAM only, and the three ATLAS flags on.
The table is the honest part: real users with real subscription names found bugs our tests did not. The answer was small patch releases, fast.
-->

---
layout: default
---

# ATLAS asked, we built

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-exclamation-triangle w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Suspicious Replicas</span></div>
  <p class="text-sm !leading-snug !mb-0">"Monitor this in the live page": suspicious replicas by RSE expression, age and attempts, with bulk declare-bad</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-server-stack w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Dataset replicas per RSE</span></div>
  <p class="text-sm !leading-snug !mb-0">One summary row per RSE instead of "436 pages of entries"</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-tag w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">AMI tags and PanDA tasks</span></div>
  <p class="text-sm !leading-snug !mb-0">Parsed from ATLAS DID names, shown as chips with AMI details and BigPanDA links</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-chart-bar w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">DDM dashboard links</span></div>
  <p class="text-sm !leading-snug !mb-0">Each rule lock links to the transfers in the DDM Grafana dashboard, next to its FTS link</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-calculator w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Sizes like the CLI</span></div>
  <p class="text-sm !leading-snug !mb-0">Base-10 units, so the WebUI and the CLI show the same numbers</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-bars-arrow-down w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Stuck first</span></div>
  <p class="text-sm !leading-snug !mb-0">Rule and lock states sort by priority, so stuck and replicating come first</p>
</div>

</div>

<div class="mt-5 text-sm">

**Lessons:** ship small patches fast · pin dependencies and audit weekly · validate config at boot · keep instance-specific features behind opt-in flags · some views need server API changes to scale

</div>

<!--
Most of this year's features came from ATLAS operators filing issues: Rod Walker for suspicious replicas, Timo Wilken for the dataset replica summary and several bug reports.
Everything ATLAS-specific is behind a flag that is off by default, so other communities do not see AMI or PanDA unless they turn it on.
The last lesson: the approval queue and dataset replica views enrich every row with extra calls; at ATLAS scale that needs server-side support.
-->
