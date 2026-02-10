---
layout: center
class: text-center
---

# Dashboard Overview
Your central hub for Rucio activity

---
layout: default
---

# Dashboard Features

<div class="grid grid-cols-2 gap-8">

<div>

## At a Glance

<v-clicks>

- 📊 **Activity Monitoring** - Track your rules and storage
- 🎯 **Quick Access** - Customizable bookmarks for frequent pages
- 📈 **Visual Analytics** - Charts and graphs for better insights
- 🔄 **Real-time Updates** - Live data streaming
- 🌓 **Dark Mode** - Comfortable viewing in any environment

</v-clicks>

</div>

<div>

## Dashboard Components

<v-clicks>

1. **Welcome Section** - Account info and role badge
2. **Rule Locks Chart** - Monitor replication status
3. **Storage Usage** - Track quota across RSEs
4. **Quick Bookmarks** - Save frequently accessed pages

</v-clicks>

</div>

</div>

---
layout: two-cols
---

# Top Rules Widget
Monitor your replication rules

## Features

<v-clicks>

- 📋 **Latest 10 Rules** - From the last 15 days
- 🎨 **Stacked Bar Charts** - Visual lock state breakdown
- 🔴 **Error Prioritization** - Issues shown first
- 🔗 **Interactive** - Click to open rule details

</v-clicks>

::right::

## Lock States

<v-clicks>

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

</v-clicks>

---
layout: two-cols
---

# Storage Usage Widget
Visualize your RSE quotas

## What It Shows

<v-clicks>

- 🥧 **Pie Charts** - Used vs. remaining quota
- 📊 **Top 10 RSEs** - Most active storage elements
- ♾️ **Unlimited Quotas** - Special handling for infinite limits
- 📝 **Available RSEs** - Unused storage elements

</v-clicks>

::right::

## Interactive Features

<v-clicks>

- **Click RSE names** to view details
- **Hover charts** for exact numbers
- **Color-coded** for quick scanning
  - 🟠 Orange = Used space
  - 🟢 Green = Remaining space
- **Smart sorting** by usage percentage
- **Responsive grid** layout (1-3 columns)

</v-clicks>

---
layout: default
---

# Quick Bookmarks (HotBar)
Customize your workflow

<div class="grid grid-cols-2 gap-8">

<div>

## Create Custom Shortcuts

<v-clicks>

- 📌 **Save up to 9 bookmarks** for quick access
- 📝 **Add titles and descriptions** for clarity
- 🏷️ **Auto-categorization** by page type
- 💾 **Browser storage** - persists across sessions
- 🔗 **Share URLs** - Copy to clipboard

</v-clicks>

</div>

<div>

## Supported Page Types

<v-clicks>

<div class="space-y-2">

- 🔵 **DID** - Single data identifier
- 📋 **DID List** - Browse data identifiers
- 📜 **Rule** - Single replication rule
- 📚 **Rule List** - Browse rules
- 🗄️ **RSE** - Single storage element
- 📦 **RSE List** - Browse storage elements

</div>

</v-clicks>

</div>

</div>

---
layout: two-cols
---

# Widget Interactivity
Powerful user interactions

## Charts & Visualizations

<v-clicks>

- **Click** rule IDs or bars to open details
- **Hover** for detailed tooltips
- **Responsive** design for all screen sizes
- **Streaming data** for better performance
- **Loading indicators** during fetches

</v-clicks>

::right::

## Bookmark Management

<v-clicks>

- ✏️ **Edit** - Update title, description, URL
- 🗑️ **Delete** - Remove unwanted bookmarks
- 📋 **Copy** - Share full URLs
- ➕ **Add** - Simple form validation
- 🔒 **Security** - Same-host validation only

</v-clicks>

---
layout: center
class: text-center
---

# Dashboard Benefits

<v-clicks>

<div class="space-y-8 text-left max-w-4xl mx-auto">

<div class="flex items-start gap-4">
  <div class="text-4xl">⚡</div>
  <div>
    <h3 class="text-xl font-bold">Increased Productivity</h3>
    <p class="text-neutral-400">Quick access to frequently used features saves time</p>
  </div>
</div>

<div class="flex items-start gap-4">
  <div class="text-4xl">👁️</div>
  <div>
    <h3 class="text-xl font-bold">Better Visibility</h3>
    <p class="text-neutral-400">Monitor rule status and storage usage at a glance</p>
  </div>
</div>

<div class="flex items-start gap-4">
  <div class="text-4xl">🎯</div>
  <div>
    <h3 class="text-xl font-bold">Personalized Experience</h3>
    <p class="text-neutral-400">Customize bookmarks to match your workflow</p>
  </div>
</div>

</div>

</v-clicks>
