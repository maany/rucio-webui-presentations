---
layout: section
---

# Live demo

<div class="text-lg mt-4 opacity-75">Six flows, about ten minutes</div>

<div class="flex justify-center items-start gap-6 mt-8">
  <img src="/rucio-bot/2026-10/assistantpanelview--with-conversation.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 170px; height: 230px;" alt="Panel with an answer" />
  <img src="/rucio-bot/2026-10/approvalcard--pending-write.png" class="rounded-lg shadow-lg" style="width: 260px;" alt="Approval card for create_rule" />
  <img src="/rucio-bot/2026-10/resulttable--default.png" class="rounded-lg shadow-lg" style="width: 280px;" alt="Result table with Export CSV" />
</div>

<!--
Setup before the talk: FEATURE_ASSISTANT=true and FEATURE_ASSISTANT_WRITE=true, an operator default model through ASSISTANT_DEFAULT_*, a non-admin demo account with some stuck rules, and an admin account for the transfer requests question.
Open the panel with Ctrl or Cmd+Shift+Space. Settings: Display set to verbose so the timeline is expanded.
Fallback if the network fails: the Storybook stories of the panel, approval card, timeline and result table.
-->

---
layout: default
---

# Demo 1: stuck rules per destination, joined in SQL

<div class="grid grid-cols-5 gap-5 mt-2">

<div class="col-span-2 text-sm">

<div class="border-2 border-brand-500 rounded-xl p-3 mb-3 font-semibold text-neutral-900 dark:text-neutral-100">"How many of my rules are stuck, per destination RSE, and which of those RSEs are tape?"</div>

1. <code>list_rules</code> with state Stuck, into <code>rules_1</code>
2. <code>list_rses</code>, into <code>rses_1</code>
3. <code>run_sql</code> joins both, <code>save_as</code> keeps the result
4. Answer as a table; the timeline shows the live SQL result with **CSV export**

<div class="text-xs mt-3 text-neutral-500">Admin follow-up: "How much data is queued from SITE-A to SITE-B?" uses <code>list_requests</code> and <code>SUM(bytes)</code> by state.</div>

</div>

<div class="col-span-3">

```sql
SELECT r.rse_expression       AS destination,
       s.rse_type,
       COUNT(*)               AS stuck_rules,
       SUM(r.locks_stuck_cnt) AS stuck_locks
FROM rules_1 r
LEFT JOIN rses_1 s ON s.name = r.rse_expression
GROUP BY destination, s.rse_type
ORDER BY stuck_locks DESC
```

<img src="/rucio-bot/2026-10/activitytimeline--verbose.png" class="rounded-lg shadow-lg object-cover object-bottom mt-3 mx-auto" style="width: 330px; height: 215px;" alt="run_sql in the activity timeline with its live result and Export CSV" />

</div>

</div>

<!--
The showcase. Point at the activity line first: two tools, one query, tokens and cost.
Expand it: the rows never went to the model, only handle names, columns and a three row sample. The model wrote the join.
The join works when the rule's RSE expression is a plain RSE name; for real expressions the bot resolves them with list_rses first, which is a documented limit.
For the admin follow-up, list_requests needs a source and destination RSE or site, and Rucio's default policy only lets admins list requests.
-->

---
layout: default
---

# Demos 2 and 3: navigation and page awareness

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">"Open the stuck rules for my account"</div>
  <ul class="text-sm space-y-1 !pl-4">
    <li><code>navigate</code> to <code>rules</code> with state and account</li>
    <li>The URL builder adds <code>autoSearch=true</code>, so the list loads already filtered</li>
    <li>On mobile the sheet shrinks to a bubble while the page changes</li>
    <li>Follow-up on that page: "only the ones updated this week" uses <code>rules.filter</code></li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">On a rule page: "Why is this rule stuck?"</div>
  <ul class="text-sm space-y-1 !pl-4">
    <li>The page context chip shows what is attached: route, title, account and a short page summary</li>
    <li>The bot reads the lock states with <code>list_rule_replica_lock_states</code> and groups stuck locks by RSE in SQL</li>
    <li>Starter prompts change per page</li>
  </ul>
</div>

</div>

<!--
Navigation uses our own URL builders, so the bot can only go to plain in-app pages and never to auth or api routes.
Page awareness: the detail pages register a short summary. The chip at the bottom of the composer shows exactly what the bot will see, and the user can remove it per message.
-->

---
layout: default
---

# Demos 4 to 6: approval, session gate, timeline

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">4. Create a rule</div>
  <p class="text-sm !leading-snug">"Replicate this dataset to two tier 1 disks for 30 days." <code>create_rule</code> stops at an <strong>approval card</strong>: one-line summary, raw args, Approve or Reject. After it runs, a toast confirms and cached rule lists refresh. Alternative: "open the wizard instead" fills it with <code>rule_create.prefill</code> and you submit.</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">5. Expire the session</div>
  <p class="text-sm !leading-snug">Mid-answer, let the session expire (in dev, <code>DEV_SHORT_SESSION_SECONDS</code> with an OIDC login). The re-auth dialog opens, the turn stops and the panel is covered until you sign in again.</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">6. Show the work</div>
  <p class="text-sm !leading-snug">Expand the activity timeline: tool arguments and results, the SQL with its live result table, <strong>CSV export</strong>, the context gauge, tokens and cost. Then the Storage tab: export the chat as Markdown.</p>
</div>

</div>

<div class="flex justify-center items-start gap-6 mt-4">
  <img src="/rucio-bot/2026-10/approvalcard--pending-write.png" class="rounded-lg shadow-lg" style="width: 170px;" alt="Approval card for create_rule" />
  <img src="/rucio-bot/2026-10/activitytimeline--verbose.png" class="rounded-lg shadow-lg object-cover object-bottom" style="width: 260px; height: 130px;" alt="run_sql with its live result and Export CSV" />
</div>

<div class="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
  Bonus: ask it to write an essay. With <code>ASSISTANT_SCOPE_MODE=block</code> the operator relay refuses it; in <code>warn</code> it answers with a note.
</div>

<!--
Demo 4 needs FEATURE_ASSISTANT_WRITE and the rules.create flag. Point out that the policy reason is on the card and that "Allow for this conversation" exists for create_rule but not for high-risk tools.
Demo 5 is the safety story in one move: nothing can happen behind a covered panel.
Demo 6 is the transparency story: every number in the answer can be traced to a tool call or a query.
-->
