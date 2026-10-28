---
layout: default
---

# How we built it

<div class="grid grid-cols-9 gap-1 mt-4 text-center text-xs">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">0</div>zod 4, route schemas, Jest ESM</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">1a</div>flags, core, relay, settings</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">1b</div>runner, panel, chats</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">2</div>read tools, SQL</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">3</div>page actions</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">4</div>writes, gate</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">5</div>docs, skills</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">6</div>telemetry</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"><div class="font-bold text-brand-600">7</div>list-requests</div>
</div>

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="text-center"><div class="text-4xl font-bold text-brand-600">~4,000</div><div class="text-sm">tests in the full suite</div></div>
  <div class="text-center"><div class="text-4xl font-bold text-brand-600">129</div><div class="text-sm">planned tasks, each reviewed</div></div>
  <div class="text-center"><div class="text-4xl font-bold text-brand-600">1 flag</div><div class="text-sm">every phase merges safely, off by default</div></div>
</div>

<div class="mt-6 text-sm">

- A design spec, a master plan with the shared contract, one plan and one PR per phase; review after every task
- Then a hardening wave: session gate, loop guard, topic check, account binding, open-redirect fixes
- Build, lint and the full suite on every merge; type errors are caught by <code>npm run build</code>
- 57 Storybook stories for the assistant components; every screenshot in this talk is one of them

</div>

<div class="flex justify-center items-start gap-4 mt-3">
  <img src="/rucio-bot/2026-10/approvalcard--approved.png" class="rounded-lg shadow-lg" style="width: 190px;" alt="Approved card story" />
  <img src="/rucio-bot/2026-10/approvalcard--rejected.png" class="rounded-lg shadow-lg" style="width: 190px;" alt="Rejected card story" />
  <img src="/rucio-bot/2026-10/resulttable--refreshing.png" class="rounded-lg shadow-lg" style="width: 190px;" alt="Refreshing result table story" />
  <img src="/rucio-bot/2026-10/resulttable--empty.png" class="rounded-lg shadow-lg" style="width: 190px;" alt="Empty result table story" />
</div>

<!--
Short version of the engineering story.
We wrote a spec, then a master plan that fixed the shared contract: entities, ports, the runner interface. Each phase had its own plan and its own PR, and every task got a review before the next one started.
The full suite is about four thousand tests now: 3,718 at the last merge checkpoint, plus the hardening wave since.
Because everything sits behind FEATURE_ASSISTANT, each phase can merge on its own without changing anything for users.
-->

---
layout: default
---

# Not done yet

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="border-2 border-warning-500 bg-warning-100 dark:bg-warning-900/20 rounded-xl p-5 text-sm">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Before merge</div>

- Manual browser pass with a real Rucio server and a real model: wizard prefill, mobile sheet and bubble, Langfuse traces, operator skills, flag-off network check
- End-to-end Playwright run with a mock model

</div>

<div class="border-2 border-info-500 bg-info-100 dark:bg-info-900/20 rounded-xl p-5 text-sm">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Known limits</div>

- The policy gate is consent, not authorization; Rucio still decides
- Relay rate limits are in memory per server process
- SQL joins need compatible keys (RSE expressions first)
- <code>list_requests</code> needs admin rights under Rucio's default policy
- The topic check is a soft control
- The WebUI client session still carries the Rucio token (separate follow-up)

</div>

</div>

<!--
Be honest about where it stands.
Our development environment had no Rucio backend, so the manual browser pass is still open, and that is the gate before we ask for merges.
Known limits: the gate protects the user from the model, not Rucio from the user, which is fine because the user can make the same calls by hand.
Rate limits are per process, so with several replicas each enforces its own.
-->
