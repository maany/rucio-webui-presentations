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

</div>

</div>

<!--
Be honest about where it stands.
Our development environment had no Rucio backend, so the manual browser pass is still open, and that is the gate before we ask for merges.
Known limits: the gate protects the user from the model, not Rucio from the user, which is fine because the user can make the same calls by hand.
Rate limits are per process, so with several replicas each enforces its own.
-->
