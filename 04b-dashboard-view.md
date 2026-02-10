---
layout: default
---

## Dashboard Components


1. **Welcome Section** - Account info and role badge
2. **Rule Locks Chart** - Monitor replication status
3. **Storage Usage** - Track quota across RSEs
4. **Quick Bookmarks** - Save frequently accessed pages


---
layout: two-cols
---

# Top Rules Widget
Monitor your replication rules

## Features


- **Latest 10 Rules** - From the last 15 days
- **Stacked Bar Charts** - Visual lock state breakdown
- **Error Prioritization** - Issues shown first
- **Interactive** - Click to open rule details

::right::

## Lock States


<div class="space-y-4">

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


---
layout: two-cols
---

# Storage Usage Widget
Visualize your RSE quotas

## What It Shows


- **Pie Charts** - Used vs. remaining quota
- **Top 10 RSEs** - Most active storage elements
- **Unlimited Quotas** - Special handling for infinite limits
-  **Available RSEs** - Unused storage elements

::right::

## Interactive Features


- **Click RSE names** to view details
- **Hover charts** for exact numbers
- **Color-coded** for quick scanning
  - 🟠 Orange = Used space
  - 🟢 Green = Remaining space
- **Default sorting** by usage percentage
- **Responsive grid** layout (1-3 columns)


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

