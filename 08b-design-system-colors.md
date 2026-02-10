---
layout: default
---

# Rucio Design System Colors
Visual Color Palette Reference

---
layout: default
---

# Color Palette

<div class="grid grid-cols-3 gap-6">

<div>

## Neutral (Slate)
Primary UI colors for text, backgrounds, borders

<div class="space-y-2 mt-4">
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-neutral-0 border border-neutral-300"></div>
    <code class="text-xs">neutral-0</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-neutral-100"></div>
    <code class="text-xs">neutral-100</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-neutral-200"></div>
    <code class="text-xs">neutral-200</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-neutral-500"></div>
    <code class="text-xs">neutral-500</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-neutral-700"></div>
    <code class="text-xs">neutral-700</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-neutral-900"></div>
    <code class="text-xs">neutral-900</code>
  </div>
</div>

</div>

<div>

## Brand (Purple)
Primary brand color for CTAs, links, emphasis

<div class="space-y-2 mt-4">
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-brand-100"></div>
    <code class="text-xs">brand-100</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-brand-300"></div>
    <code class="text-xs">brand-300</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-brand-500"></div>
    <code class="text-xs">brand-500</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-brand-600"></div>
    <code class="text-xs">brand-600</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-brand-700"></div>
    <code class="text-xs">brand-700</code>
  </div>
  <div class="flex items-center gap-2">
    <div class="w-12 h-8 rounded bg-brand-900"></div>
    <code class="text-xs">brand-900</code>
  </div>
</div>

</div>

<div>

## Semantic Colors
Success, Error, Warning, Info

<div class="space-y-3 mt-4">
  <div>
    <div class="text-xs font-semibold mb-1">Success (Green)</div>
    <div class="flex gap-1">
      <div class="w-10 h-6 rounded bg-success-100"></div>
      <div class="w-10 h-6 rounded bg-success-500"></div>
      <div class="w-10 h-6 rounded bg-success-600"></div>
      <div class="w-10 h-6 rounded bg-success-900"></div>
    </div>
  </div>

  <div>
    <div class="text-xs font-semibold mb-1">Error (Red)</div>
    <div class="flex gap-1">
      <div class="w-10 h-6 rounded bg-error-100"></div>
      <div class="w-10 h-6 rounded bg-error-500"></div>
      <div class="w-10 h-6 rounded bg-error-600"></div>
      <div class="w-10 h-6 rounded bg-error-900"></div>
    </div>
  </div>

  <div>
    <div class="text-xs font-semibold mb-1">Warning (Amber)</div>
    <div class="flex gap-1">
      <div class="w-10 h-6 rounded bg-warning-100"></div>
      <div class="w-10 h-6 rounded bg-warning-500"></div>
      <div class="w-10 h-6 rounded bg-warning-600"></div>
      <div class="w-10 h-6 rounded bg-warning-900"></div>
    </div>
  </div>

  <div>
    <div class="text-xs font-semibold mb-1">Info (Blue)</div>
    <div class="flex gap-1">
      <div class="w-10 h-6 rounded bg-info-100"></div>
      <div class="w-10 h-6 rounded bg-info-500"></div>
      <div class="w-10 h-6 rounded bg-info-600"></div>
      <div class="w-10 h-6 rounded bg-info-900"></div>
    </div>
  </div>
</div>

</div>

</div>

---
layout: two-cols
---

# Typography Scale

## Font Families

<v-clicks>

**Sans-Serif: Inter**
<div class="font-sans text-2xl mt-2">The quick brown fox jumps</div>

**Monospace: JetBrains Mono**
<div class="font-mono text-lg mt-2">const rucio = 'webui';</div>

</v-clicks>

::right::

## Size Scale

<v-clicks>

<div class="space-y-3">
  <div class="text-xs">Extra Small (12px) - text-xs</div>
  <div class="text-sm">Small (14px) - text-sm</div>
  <div class="text-base">Base (16px) - text-base</div>
  <div class="text-lg">Large (18px) - text-lg</div>
  <div class="text-xl">XL (20px) - text-xl</div>
  <div class="text-2xl">2XL (24px) - text-2xl</div>
  <div class="text-3xl">3XL (30px) - text-3xl</div>
</div>

</v-clicks>

---
layout: default
---

# Component Examples

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## Buttons

<div class="space-y-4">
  <button class="btn-primary">Primary Button</button>
  <button class="px-4 py-2 rounded-md border-2 border-brand-600 text-brand-600 hover:bg-brand-50 font-medium">Outline Button</button>
  <button class="px-4 py-2 rounded-md text-brand-600 hover:bg-brand-50 font-medium">Ghost Button</button>
</div>

</div>

<div>

## Badges & Tags

<div class="space-y-3">
  <div>
    <span class="badge">Default Badge</span>
  </div>
  <div>
    <span class="badge-success">Success</span>
  </div>
  <div>
    <span class="badge-error">Error</span>
  </div>
  <div>
    <span class="badge-warning">Warning</span>
  </div>
  <div>
    <span class="badge-info">Info</span>
  </div>
</div>

</div>

</div>

---
layout: default
---

# Design System Benefits

<v-clicks>

## Why a Design System?

<div class="grid grid-cols-3 gap-6 mt-6">

<div class="card">
  <div class="text-3xl mb-3"><span class="i-heroicons-outline-bolt w-10 h-10 text-brand-600" /></div>
  <h3 class="text-lg font-semibold mb-2">Faster Development</h3>
  <p class="text-sm text-neutral-600 dark:text-neutral-400">Reusable components accelerate feature delivery</p>
</div>

<div class="card">
  <div class="text-3xl mb-3"><span class="i-heroicons-outline-adjustments-horizontal w-10 h-10 text-brand-600" /></div>
  <h3 class="text-lg font-semibold mb-2">Consistent UX</h3>
  <p class="text-sm text-neutral-600 dark:text-neutral-400">Unified experience across all pages</p>
</div>

<div class="card">
  <div class="text-3xl mb-3"><span class="i-heroicons-outline-user-group w-10 h-10 text-brand-600" /></div>
  <h3 class="text-lg font-semibold mb-2">Accessible by Default</h3>
  <p class="text-sm text-neutral-600 dark:text-neutral-400">WCAG AAA compliance built-in</p>
</div>

<div class="card">
  <div class="text-3xl mb-3"><span class="i-heroicons-outline-wrench-screwdriver w-10 h-10 text-brand-600" /></div>
  <h3 class="text-lg font-semibold mb-2">Easy Maintenance</h3>
  <p class="text-sm text-neutral-600 dark:text-neutral-400">Update once, apply everywhere</p>
</div>

<div class="card">
  <div class="text-3xl mb-3"><span class="i-heroicons-outline-device-phone-mobile w-10 h-10 text-brand-600" /></div>
  <h3 class="text-lg font-semibold mb-2">Responsive</h3>
  <p class="text-sm text-neutral-600 dark:text-neutral-400">Works on all devices and screen sizes</p>
</div>

<div class="card">
  <div class="text-3xl mb-3"><span class="i-heroicons-outline-paint-brush w-10 h-10 text-brand-600" /></div>
  <h3 class="text-lg font-semibold mb-2">Professional Polish</h3>
  <p class="text-sm text-neutral-600 dark:text-neutral-400">Modern, elegant interface design</p>
</div>

</div>

</v-clicks>
