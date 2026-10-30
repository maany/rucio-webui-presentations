---
layout: section
---

# What's new
Rucio Workshop 2025 to today

<!--
First part: what changed since the 2025 workshop in November, and what a year of running in ATLAS production taught us.
-->

---
layout: default
---

# A year in numbers

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-4xl font-bold text-brand-600">21</div>
  <div class="text-sm mt-1">releases, 39.0.0 to 41.1.0</div>
  <div class="text-xs mt-2 opacity-75">plus 8 security releases on the 38 LTS line</div>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-4xl font-bold text-brand-600">1 → 21</div>
  <div class="text-sm mt-1">write actions</div>
  <div class="text-xs mt-2 opacity-75">9 released in 41.1, the rest on main</div>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-4xl font-bold text-brand-600">0 → 16</div>
  <div class="text-sm mt-1">feature flags</div>
  <div class="text-xs mt-2 opacity-75">each community picks what its users see</div>
</div>

</div>

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">
  <div class="text-center"><strong>10 → 14</strong> pages</div>
  <div class="text-center"><strong>37 → 61</strong> API routes</div>
  <div class="text-center"><strong>87 → 225</strong> test files</div>
</div>

<div class="mt-8 text-sm text-neutral-600 dark:text-neutral-400">

Also this year: Next.js 16, React 19, Tailwind v4, accessibility tests, Playwright end-to-end tests.

</div>

<!--
Counts from rucio/webui: GitHub releases since the 2025 workshop, and main (Oct 26) against the 39.0.0 tag.
39.0.0 was cut in December, so last year's talk showed pre-release 39 work.
The LTS line, release-38-LTS, carries security fixes only, for communities that cannot upgrade every month.
The 1 to 21 is the headline: last year the only thing you could change from the WebUI was creating a rule.
41.1 has 9 write actions: create, boost, update lifetime, comment, approve, deny, delete and force delete rules, and declare replicas bad.
Main adds 12 account actions: create, edit, suspend, reactivate, delete; add, edit, delete attributes; add, delete identities; set, delete quotas.
Feature flags arrived in 41.0: 16 on main, so a community can switch off pages or writes it does not want and opt in to integrations.
-->

---
layout: default
---

# Releases since the last workshop

<div class="grid grid-cols-4 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center justify-between mb-2"><span class="font-semibold text-neutral-900 dark:text-neutral-100">39.x</span><span class="text-xs opacity-60">Dec 2025 to Feb 2026</span></div>
  <ul class="text-xs !leading-snug !pl-4">
    <li>New design system, OIDC, command palette, bookmarks</li>
    <li>IronSession replaced by Auth.js</li>
    <li>Tips, DID metadata filters</li>
    <li>Subscription details page</li>
    <li>Next.js 16, simpler routes</li>
  </ul>
</div>

<div class="border-2 border-brand-500 rounded-xl p-4">
  <div class="flex items-center justify-between mb-2"><span class="font-semibold text-neutral-900 dark:text-neutral-100">40.x</span><span class="text-xs opacity-60">Apr to Jul 2026</span></div>
  <ul class="text-xs !leading-snug !pl-4">
    <li><strong>First write operations release</strong>: boost, lifetime, comment, approve, deny, delete rules</li>
    <li>Approve Rules page, permissions</li>
    <li>Token refresh, multiple accounts for every login method</li>
    <li>Suspicious Replicas page, DDM dashboard links</li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center justify-between mb-2"><span class="font-semibold text-neutral-900 dark:text-neutral-100">41.x</span><span class="text-xs opacity-60">Jul to Oct 2026</span></div>
  <ul class="text-xs !leading-snug !pl-4">
    <li><strong>Feature flags</strong></li>
    <li>ATLAS AMI tags and PanDA task links</li>
    <li>Multi-select filters in every table</li>
    <li>"All" DID search type</li>
    <li>Tailwind v4</li>
  </ul>
</div>

<div class="border-2 border-dashed border-neutral-400 rounded-xl p-4">
  <div class="flex items-center justify-between mb-2"><span class="font-semibold text-neutral-900 dark:text-neutral-100">Next release</span><span class="text-xs opacity-60">on main / in review</span></div>
  <ul class="text-xs !leading-snug !pl-4">
    <li><strong>Account and identity management</strong> (merged)</li>
    <li>Per-RSE dataset replica summary (merged)</li>
    <li>Sizes in base 10, like the CLI (merged)</li>
    <li>Config validated at startup, no build at boot (in review)</li>
  </ul>
</div>

</div>

<div class="mt-4 text-xs text-neutral-600 dark:text-neutral-400 text-center">
  40.0.0 is "Guardians of the Donkeyverse". Release notes: github.com/rucio/webui/releases
</div>

<!--
Three release lines this year plus what is on main.
39 was the big UX overhaul shown as a preview last year.
40 was the first release where you could change things.
41 brought feature flags, so communities can switch pages and write operations on and off.
Main already has account management; it ships in the next release.
-->
