---
layout: default
class: code-xs list-tight
---

# Feature gates: one WebUI, many communities

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="border-2 border-brand-500 rounded-xl p-3">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-adjustments-horizontal w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Pages and writes</span></div>
  <p class="text-sm !leading-snug">Core features default <strong>on</strong>. Switch off a page, or keep the page and switch off its writes.</p>
  <p class="text-xs !mb-0"><code>FEATURE_RULES_APPROVE=false</code> <code>FEATURE_ACCOUNTS_MANAGE=false</code></p>
</div>

<div class="border-2 border-warning-500 rounded-xl p-3">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-puzzle-piece w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Community integrations</span></div>
  <p class="text-sm !leading-snug">Opt in, default <strong>off</strong>. The AMI and PanDA code is not even loaded unless enabled.</p>
  <p class="text-xs !mb-0"><code>FEATURE_DIDS_AMI_TAGS</code> <code>FEATURE_DIDS_PANDA_TASK</code> ATLAS<br/><code>FEATURE_DDM_DASHBOARD</code> ATLAS, CMS</p>
</div>

<div class="border-2 border-error-500 rounded-xl p-3">
  <div class="flex items-center gap-2 mb-2"><span class="i-heroicons-shield-check w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Permissions</span></div>
  <p class="text-sm !leading-snug">Admin is the Rucio account attribute <code>admin=True</code>, resolved at login. Admin-only actions are hidden for everyone else.</p>
  <p class="text-xs !mb-0">Rucio's policy still decides every call</p>
</div>

</div>

<div class="grid grid-cols-2 gap-6 mt-3 text-sm">

<div>

**Hierarchical:** a child flag is on only when its parents are on

```text
FEATURE_RULES
├── FEATURE_RULES_CREATE
└── FEATURE_RULES_APPROVE
FEATURE_ACCOUNTS
└── FEATURE_ACCOUNTS_MANAGE
    ├── _CORE  ├── _IDENTITIES
    ├── _ATTRIBUTES  └── _QUOTAS
```

</div>

<div>

**Off means gone, everywhere**

- Navigation and command palette entries hidden
- Pages return 404
- API routes return 404, not 403
- Startup warns when a parent switches off a child you enabled

</div>

</div>

<!--
Three kinds of gates.
Core features are on by default, and you can remove a page or keep it read-only.
Community integrations are off by default. ATLAS's AMI and PanDA code is not even registered unless the flag is on, so it never leaks into other deployments.
Permissions: admin comes from the Rucio account attribute. The UI hides what you cannot do, but Rucio's server policy is always the final check.
A disabled feature looks like it does not exist: 404 on the page and on the API, not 403.
In containers and Helm every flag takes the RUCIO_WEBUI_ prefix.
Other core flags: FEATURE_SUBSCRIPTIONS, FEATURE_RSES, FEATURE_DIDS_METADATA, FEATURE_DIDS_MUTATE. Full table in the appendix.
-->
