---
layout: default
---

# Permissions: deny, ask, allow per tool

```mermaid {scale: 0.6}
flowchart LR
  A["Tool call"] --> V{"Visible?<br/>flags, role,<br/>permissions loaded"}
  V -- no --> DN["deny"]
  V -- yes --> P["User choice:<br/>tool, then domain,<br/>then default"]
  P --> CA["Allow for this<br/>conversation?<br/>(never high risk)"]
  CA --> K["Clamp to operator cap<br/>ASSISTANT_WRITE_POLICY_CAP<br/>ASSISTANT_HIGH_RISK_POLICY_CAP<br/>high risk: at most ask"]
  K --> R{"deny<br/>ask<br/>allow"}
```

<div class="grid grid-cols-3 gap-3 mt-2 text-sm">
  <div class="bg-success-100 dark:bg-success-900/20 rounded-lg p-3"><strong>Reads</strong> default to allow</div>
  <div class="bg-warning-100 dark:bg-warning-900/20 rounded-lg p-3"><strong>Writes</strong> default to ask</div>
  <div class="bg-error-100 dark:bg-error-900/20 rounded-lg p-3"><strong>High risk</strong> always ask, never allow</div>
</div>

<div class="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
  Operators cap, users can only tighten. Computed live on <strong>every</strong> call: a lowered cap or a tightened choice applies mid-turn. While the operator config is loading or failed, writes fail closed.
</div>

<!--
The policy is a pure function, effectivePolicy, in core services.
Hidden tools are never offered, and denied if named anyway.
Then the user's choice for that tool, or for its domain, or the default for its risk.
"Allow for this conversation" on an approval card upgrades ask to allow for the rest of the chat, but never for high risk.
Then the operator cap clamps it, and high risk tools are clamped to ask on top, so even an operator cannot set them to allow in v1.
It is evaluated on every single tool call, not cached, so tightening something mid-turn is honoured on the next call.
Unknown or tampered values count as deny.
-->

---
layout: default
---

# High-risk tools always ask

<div class="grid grid-cols-2 gap-6 mt-3 items-start">

<div>

<div class="text-sm font-mono leading-relaxed">

<code>update_rule</code> (approve or deny rules)<br/>
<code>declare_bad_replicas</code><br/>
<code>update_account</code> (suspend, reactivate)<br/>
<code>delete_account</code><br/>
<code>add_account_attribute</code><br/>
<code>update_account_attribute</code><br/>
<code>delete_account_attribute</code><br/>
<code>add_account_identity</code><br/>
<code>delete_account_identity</code>

</div>

<div class="text-xs mt-3 text-neutral-500">The other 7 write tools (create_rule, set_account_limit, ...) default to ask. Account writes are admin only; <code>declare_bad_replicas</code> also needs its own flag.</div>
</div>

<div class="flex flex-col items-center">
  <img src="/rucio-bot/2026-10/approvalcard--pending-high-risk.png" class="rounded-lg shadow-lg" style="width: 340px;" alt="High-risk approval card for add_account_identity" />
  <p class="text-xs mt-2 text-center">Red card, no "Allow for this conversation"</p>
</div>

</div>

<!--
Nine tools are high risk. The rule of thumb: anything that can lock someone out, grant admin, approve someone else's request, or lose the last copy of data.
Adding or updating an account attribute is high risk because admin=True makes the account a Rucio admin.
The high-risk card is red and never offers the conversation-wide allow.
-->

---
layout: default
---

# Approval cards

<div class="grid grid-cols-3 gap-4 mt-2 items-start">

<div>
  <img src="/rucio-bot/2026-10/approvalcard--pending-with-conversation-scope.png" class="rounded-lg shadow-lg w-full" alt="Approval card for create_rule with Allow for this conversation" />
  <p class="text-xs mt-2">One-line summary, why it asks, optional "Allow for this conversation"</p>
</div>

<div>
  <img src="/rucio-bot/2026-10/approvalcard--invalid-arguments.png" class="rounded-lg shadow-lg w-full" alt="Reject-only card for invalid arguments" />
  <p class="text-xs mt-2">Invalid arguments from the model: Reject only</p>
</div>

<div>
  <img src="/rucio-bot/2026-10/approvalcard--expired.png" class="rounded-lg shadow-lg w-full" alt="Expired approval card" />
  <p class="text-xs mt-2">Chat closed before a decision: expired, it did not run</p>
</div>

</div>

<div class="mt-4 text-sm">

- Raw arguments behind **Show arguments**, passwords masked; Approve comes first and is full width on mobile
- The decision is **saved before the runner resumes**; a stale or late click never resumes it
- After a reload, an approved call that never reported back reads "may have been applied"

</div>

<!--
The card is designed to be read in two seconds: one line saying what will happen, and why we are asking.
If the model sends arguments that fail the route schema, nothing can be approved; you can only reject.
Decisions are persisted before the runner continues, so a crash or reload can never turn a pending call into an executed one, and we never claim a write did not land when it might have.
-->

---
layout: default
---

# The Permissions settings tab

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 text-sm">

- Tools grouped by domain: DIDs, Rules, RSEs, Accounts, Replicas, Subscriptions, Requests
- deny / ask / allow per tool and per domain
- Options above the operator cap are disabled with an **Operator limit** hint
- High-risk tools show a **High risk** badge and no Allow option
- Hidden tools are listed with the reason: Feature off, Admin only, Write tools are off
- Reset to defaults
- One of six tabs at <code>/assistant/settings</code>: Providers, Permissions, Skills, Telemetry, Display, Storage

</div>

<div>
  <img src="/rucio-bot/2026-10/settings-permissionstab--default.png" class="rounded-lg shadow-lg w-full object-cover object-top" style="height: 380px;" alt="Permissions tab with deny, ask and allow per tool" />
</div>

</div>

<!--
Users manage this in the Permissions tab of the Rucio bot settings page.
A cautious user can set reads to ask, or deny a whole domain. A power user can allow create_rule without asking, if the operator cap allows it.
Everything above the operator cap is visibly disabled, so nobody is confused about why "allow" does nothing.
-->
