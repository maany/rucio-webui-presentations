---
layout: default
---

# From one write to many

<div class="grid grid-cols-7 gap-6 mt-6 items-stretch">

<div class="col-span-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 flex flex-col">
  <div class="text-xs uppercase tracking-wide opacity-60">Workshop 2025</div>
  <div class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mt-2">Read almost everything</div>
  <div class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Write one thing</div>
  <div class="mt-4"><span class="badge">Create rule</span></div>
</div>

<div class="col-span-5 border-2 border-brand-500 rounded-xl p-5">
  <div class="text-xs uppercase tracking-wide opacity-60">Today</div>
  <div class="grid grid-cols-3 gap-4 mt-3 text-sm">
    <div>
      <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Rules</div>
      <div class="flex flex-wrap gap-1"><span class="badge">create</span><span class="badge">boost</span><span class="badge">lifetime</span><span class="badge">comment</span><span class="badge">approve</span><span class="badge">deny</span><span class="badge">delete</span><span class="badge">bulk approve</span></div>
    </div>
    <div>
      <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Replicas</div>
      <div class="flex flex-wrap gap-1"><span class="badge">declare bad</span><span class="badge">bulk declare bad</span></div>
    </div>
    <div>
      <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Accounts <span class="badge-info px-2 rounded text-xs">next release</span></div>
      <div class="flex flex-wrap gap-1"><span class="badge">create</span><span class="badge">edit</span><span class="badge">suspend</span><span class="badge">delete</span><span class="badge">attributes</span><span class="badge">identities</span><span class="badge">quotas</span></div>
    </div>
  </div>
  <div class="text-xs mt-4 text-neutral-600 dark:text-neutral-400">Every write: a confirmation dialog, a permission check in the UI, a feature flag on the API route, and Rucio's own policy as the final word.</div>
</div>

</div>

<!--
Last year: one write, create rule.
Today: the whole rule lifecycle, declaring replicas bad, and, on main for the next release, account management.
Every write follows the same pattern. The dialog explains what will happen, the UI hides actions you are not allowed to do, the API route is behind a feature flag, and Rucio's permission policy still decides.
-->

---
layout: default
class: table-compact
---

# What users can do today

<div class="text-sm">

| Area | Read | Write | Since |
|---|---|---|---|
| **DIDs** | search by type and metadata, contents, parents, rules, replicas | | 39 |
| **Rules** | list, details, locks with FTS links (DDM links for ATLAS, CMS) | create, boost, lifetime, comment, approve, deny, delete | 40 |
| **Approvals** | queue of rules waiting for approval | approve and deny, single or bulk | 40 |
| **Replicas** | suspicious replicas by RSE, age, attempts | declare bad, single or bulk | 40.1 |
| **RSEs** | list by RSE expression, attributes, protocols, usage | | 39 |
| **Subscriptions** | list with rule state counts, filter and rules JSON | | 39.2 |
| **Accounts** | list, overview, identities, attributes, quotas and usage | create, edit, suspend, delete, attributes, identities, local and global quotas | main |
| **Dashboard** | top rules, storage usage, bookmarks | | 39 |

</div>

<div class="text-xs text-neutral-600 dark:text-neutral-400 -mt-2">
  Admin only: boost, approve, deny, force delete, zero or infinite lifetime, Suspicious Replicas, all account changes. Users: lifetime of at least 1 hour, comment, delete (lifetime set to 1 hour, like the CLI).
</div>

<!--
The capability matrix. "Since" is the release line it first appeared in; "main" means merged and shipping in the next release.
Admin is the Rucio account attribute admin=True, resolved at login for every auth method.
A normal user can still change lifetime, comment and delete their own rules; the server's policy decides whether that is allowed.
-->

---
layout: default
---

# Rules: the whole lifecycle

<img src="/capabilities/2026-10/rule-actions-toolbar.png" class="rounded-lg shadow-md mx-auto" style="max-height: 90px;" alt="Rule page toolbar with Delete Rule, Boost Rule and Update Priority buttons" />

<div class="grid grid-cols-3 gap-6 mt-4 items-start">

<div class="text-center">
  <img src="/capabilities/2026-10/update-lifetime-dialog.png" class="rounded-lg shadow-lg mx-auto object-cover object-top" style="height: 280px;" alt="Update Lifetime dialog with duration presets and a policy warning" />
  <p class="text-xs mt-2 !mb-0">Lifetime by duration or date, with presets</p>
</div>

<div class="text-center">
  <img src="/capabilities/2026-10/delete-rule-dialog.png" class="rounded-lg shadow-lg mx-auto" style="height: 230px;" alt="Delete Rule dialog with Force delete option" />
  <p class="text-xs mt-2 !mb-0">Delete sets a 1 hour lifetime, admins can force</p>
</div>

<div class="text-center">
  <img src="/capabilities/2026-10/comment-rule-dialog.png" class="rounded-lg shadow-lg mx-auto object-cover object-top" style="height: 280px;" alt="Add Comment dialog" />
  <p class="text-xs mt-2 !mb-0">Comments visible to everyone who can see the rule</p>
</div>

</div>

<!--
The rule page has an actions toolbar. What you see depends on your role.
Lifetime semantics match the CLI: users can set at least one hour, admins can set zero or infinite.
Delete is a soft delete, a one hour lifetime, exactly what the CLI does; admins get Force delete, lifetime zero.
The dialogs say when the server may still reject the request because of the community's policy.
-->

---
layout: default
---

# Approving rules

<div class="grid grid-cols-3 gap-6 mt-2 items-start">

<div class="col-span-2">
  <img src="/capabilities/2026-10/approve-rules-page.png" class="rounded-lg shadow-lg" alt="Approve Rules page listing rules waiting for approval with Approve, Deny and View buttons" />
  <p class="text-xs mt-2">Queue of rules waiting for approval, filterable, with row and bulk actions</p>
</div>

<div class="space-y-3">
  <img src="/capabilities/2026-10/approve-rule-dialog.png" class="rounded-lg shadow-lg mx-auto" style="height: 190px;" alt="Approve Rule dialog" />
  <img src="/capabilities/2026-10/deny-rule-dialog.png" class="rounded-lg shadow-lg mx-auto object-cover object-top" style="height: 190px;" alt="Deny Rule dialog with an optional reason" />
</div>

</div>

<div class="text-xs text-neutral-600 dark:text-neutral-400">
  Behind <code>FEATURE_RULES_APPROVE</code> and the admin role. Deny takes an optional reason.
</div>

<!--
The R2D2 approval workflow from the old UI, rebuilt.
Rules created with "ask for approval" land here. Admins approve or deny one by one or in bulk; Select All only selects the filtered rows.
One known limit: each row is enriched with DID size and length, which is slow at scale and needs a server API change.
-->

---
layout: default
---

# Accounts and identities <span class="badge-info px-3 py-1 rounded-md text-sm align-middle">next release</span>

<div class="grid grid-cols-4 gap-4 mt-6">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-user-circle w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Overview</span></div>
  <p class="text-sm !leading-snug !mb-0">Create, edit email and type, suspend, reactivate, delete</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-finger-print w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Identities</span></div>
  <p class="text-sm !leading-snug !mb-0">Add and remove all six types: X509, OIDC, USERPASS, GSS, SSH, SAML</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-tag w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Attributes</span></div>
  <p class="text-sm !leading-snug !mb-0">Add, edit, delete. Edit is delete plus create, with a warning and rollback</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-circle-stack w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Quotas and usage</span></div>
  <p class="text-sm !leading-snug !mb-0">Local limits per RSE and global limits per RSE expression, next to usage</p>
</div>

</div>

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">

<div>

- Admins manage every account; users see only their own, read-only
- Map an OIDC <code>SUB</code> and <code>ISS</code> to an account from the browser instead of <code>rucio account identity add</code>

</div>

<div>

- Each tab has its own flag: <code>FEATURE_ACCOUNTS_MANAGE_CORE</code>, <code>_IDENTITIES</code>, <code>_ATTRIBUTES</code>, <code>_QUOTAS</code>
- Accounts synced from CRIC or IAM? Set <code>FEATURE_ACCOUNTS_MANAGE=false</code> for read-only pages

</div>

</div>

<!--
Merged on October 26, so it is on main and ships in the next release.
This replaces the most common rucio-admin tasks for onboarding a user: create the account, map their identity, set quotas.
Rucio has no "update attribute" call, so edit is delete then create, with a warning and a best-effort rollback.
Sites where accounts come from an external system can keep the pages but switch every write off.
-->

---
layout: default
---

# Suspicious replicas

<img src="/capabilities/2026-10/suspicious-replicas.png" class="rounded-lg shadow-lg mx-auto" style="max-height: 340px;" alt="Suspicious replicas page with RSE expression, age and attempts filters and Declare bad actions" />

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">Filter by RSE expression, age and minimum attempts</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">Declare bad, one by one or in bulk, with a reason</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">"Declare lost" left to the daemons on purpose</div>
</div>

<!--
Requested by ATLAS operations so they can watch suspicious replicas live instead of in dumps.
Declaring lost was dropped on purpose after discussing it with Martin: the daemons should do that.
-->

---
layout: default
---

# Built next

<div class="grid grid-cols-5 gap-6 mt-4">

<div class="col-span-3 space-y-3 text-sm">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">RSE management</div>
  <p class="text-xs !leading-snug !mb-0 mt-1">Attribute dialogs are built (right). Then protocols, settings, distances and limits</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">Subscription editor</div>
  <p class="text-xs !leading-snug !mb-0 mt-1">Create and update subscriptions; today the details page shows the filter and rules JSON read-only</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100">DID management</div>
  <p class="text-xs !leading-snug !mb-0 mt-1">Add, attach, open and close routes exist behind <code>FEATURE_DIDS_MUTATE</code>; the UI is next</p>
</div>

</div>

<div class="col-span-2 flex flex-col items-center">
  <img src="/capabilities/2026-10/add-rse-attribute-dialog.png" class="rounded-lg shadow-lg" style="height: 220px;" alt="Add RSE Attribute dialog" />
  <p class="text-xs mt-2 text-center">Add RSE Attribute dialog, in Storybook today</p>
</div>

</div>

<div class="text-xs text-neutral-600 dark:text-neutral-400 mt-4">Tracked in the write operations epic, rucio/webui#622. The full gap list is in "What's next".</div>

<!--
To be clear about what is not there yet: RSE, subscription and DID writes.
The RSE attribute dialogs exist as components with stories; the API routes and wiring are next.
DID write routes exist on the server side of the WebUI but no page calls them yet.
-->
