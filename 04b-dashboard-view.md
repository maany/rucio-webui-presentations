---
layout: default
---

## Dashboard Components

<div class="grid grid-cols-4 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="mb-3"><span class="i-heroicons-outline-user-circle w-8 h-8 text-brand-600"/></div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Welcome Section</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Account info and role badge</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="mb-3"><span class="i-heroicons-outline-chart-bar w-8 h-8 text-brand-600"/></div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Rule Locks Chart</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Monitor replication status</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="mb-3"><span class="i-heroicons-outline-circle-stack w-8 h-8 text-brand-600"/></div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Storage Usage</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Track quota across RSEs</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="mb-3"><span class="i-heroicons-outline-bookmark w-8 h-8 text-brand-600"/></div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Quick Bookmarks</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Save frequently accessed pages</p>
</div>

</div>


---
layout: default
---

# Top Rules Widget
Monitor your replication rules

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

<img src="/latest-rules-widget.png" class="rounded-lg shadow-lg" />

</div>

<div>

## Features

- **Latest 10 Rules** - From the last 15 days
- **Stacked Bar Charts** - Visual lock state breakdown
- **Error Prioritization** - Issues shown first
- **Interactive** - Click to open rule details

## Lock States

<div class="space-y-3 mt-3">
<div class="flex items-center gap-3">
  <div class="w-4 h-4 rounded-full bg-green-500"></div>
  <span><strong>OK</strong> - Locks in good state</span>
</div>
<div class="flex items-center gap-3">
  <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
  <span><strong>Replicating</strong> - Active transfers</span>
</div>
<div class="flex items-center gap-3">
  <div class="w-4 h-4 rounded-full bg-red-500"></div>
  <span><strong>Error/Stuck</strong> - Needs attention</span>
</div>
</div>

</div>

</div>

---
layout: default
---

# Storage Usage Widget
Visualize your RSE quotas

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

<img src="/storage_usage-widget.png" class="rounded-lg shadow-lg" />

</div>

<div class="text-sm">

## What It Shows

- **Pie Charts** - Used vs. remaining quota
- **Top 10 RSEs** - Most active storage elements
- **Unlimited Quotas** - Handling for infinite limits
- **Available RSEs** - Unused storage elements
- **Click RSE names** to view details
- **Color-coded** for quick scanning
- **Default sorting** by usage percentage

</div>

</div>


---
layout: default
---

# Quick Bookmarks (HotBar)
Customize your workflow

<div class="grid grid-cols-2 gap-8">

<div>

## Create Custom Shortcuts

- **Save up to 9 bookmarks** for quick access
- **Add titles and descriptions** for clarity
- **Auto-categorization** by page type
- **Browser storage** - persists across sessions
- **Share URLs** - Copy to clipboard

</div>

<div>

## Supported Page Types


<div class="space-y-2">

- **DID** - Single data identifier
- **DID List** - Browse data identifiers
- **Rule** - Single replication rule
- **Rule List** - Browse rules
- **RSE** - Single storage element
- **RSE List** - Browse storage elements

</div>


</div>

</div>

