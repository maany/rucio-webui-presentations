---
layout: default
---

# OIDC Authentication

<div class="grid grid-cols-4 gap-4 mt-6">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-3xl font-bold text-brand-600 mb-2">1</div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Choose Provider</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Select your identity provider</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-3xl font-bold text-brand-600 mb-2">2</div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Redirect</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Redirect to provider login</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-3xl font-bold text-brand-600 mb-2">3</div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Authenticate</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Sign in with your credentials</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-center">
  <div class="text-3xl font-bold text-brand-600 mb-2">4</div>
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Access Rucio</div>
  <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Return with secure token</p>
</div>

</div>


---
layout: center
class: text-center
---

## Step 1: Login Page
Choose your authentication method

<img src="/login_page.png" class="m-auto rounded shadow-lg" style="max-height: 400px;" />

---
layout: center
class: text-center
---

## Step 2: Identity Provider Authorization
Grant access to your identity and profile

<img src="/oidc_login_atlas_iam.png" class="m-auto rounded shadow-lg" style="max-height: 400px;" />

---
layout: center
class: text-center
---

## Step 3: Welcome to Rucio!
Successfully authenticated and ready to use

<img src="/webui_dashboard_post_oidc.png" class="m-auto rounded shadow-lg" style="max-height: 400px;" />

---
layout: default
---

# Pending Configurations

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="border border-warning-500 bg-warning-100 dark:bg-warning-900/20 rounded-xl p-6">
  <div class="flex items-center gap-3 mb-3">
    <span class="i-heroicons-outline-arrow-path w-6 h-6 text-warning-600"/>
    <span class="font-semibold text-neutral-900 dark:text-neutral-100">OIDC Identity Sync</span>
  </div>
  <p class="text-sm text-neutral-700 dark:text-neutral-300">OIDC Identities from Atlas IAM need to be synced in Rucio database.</p>
</div>

<div class="border border-info-500 bg-info-100 dark:bg-info-900/20 rounded-xl p-6">
  <div class="flex items-center gap-3 mb-3">
    <span class="i-heroicons-outline-shield-check w-6 h-6 text-info-600"/>
    <span class="font-semibold text-neutral-900 dark:text-neutral-100">Token Validation</span>
  </div>
  <p class="text-sm text-neutral-700 dark:text-neutral-300">Some improvements to token validation workflows are foreseen in the Rucio Server.</p>
</div>

</div>
