---
layout: default
---

# Find things faster

<div class="grid grid-cols-3 gap-6 mt-4 items-start">

<div>
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-command-line w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Command palette</span></div>
  <img src="/command-palette/2026-02/command-palette.png" class="rounded-lg shadow-md object-cover object-top w-full" style="height: 170px;" alt="Command palette" />
  <ul class="text-xs !leading-snug !pl-4 mt-3">
    <li><code>Ctrl/Cmd+K</code> from any page</li>
    <li>Paste a rule ID, a DID or an account and jump there</li>
    <li>Recent pages, bookmarks, docs</li>
    <li>Only shows pages your role and flags allow</li>
  </ul>
</div>

<div>
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-bookmark w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Bookmarks</span></div>
  <img src="/bookmarks/2026-02/bookmarks-create.png" class="rounded-lg shadow-md object-cover object-top w-full" style="height: 170px;" alt="Creating a bookmark" />
  <ul class="text-xs !leading-snug !pl-4 mt-3">
    <li>Pin a DID, rule, RSE or account, or a whole search</li>
    <li>Searches live in the URL, so a bookmark replays them</li>
    <li>Shown on the dashboard HotBar</li>
  </ul>
</div>

<div>
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-light-bulb w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Tips</span></div>
  <img src="/productivity/2026-10/tips.png" class="rounded-lg shadow-md object-cover object-left-top w-full" style="height: 170px;" alt="Tip popovers and tip cards" />
  <ul class="text-xs !leading-snug !pl-4 mt-3">
    <li>25 tips on the pages where you need them</li>
    <li>RSE expression and DID query help on the list pages</li>
    <li>Rule page explains which actions your role allows</li>
  </ul>
</div>

</div>

<!--
Three things for daily users.
The command palette shipped in 39; it now knows about roles and flags, and searches all DID types.
Bookmarks became more useful once every search moved into the URL: bookmark a filtered rules list and it reruns.
Tips came in 39.1 and Tomasz added the RSE expression and DID query tips on the list pages.
-->
