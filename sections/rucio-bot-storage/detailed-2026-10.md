---
layout: default
---

# Storage: chats stay in your browser

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

### IndexedDB <code>rucio-assistant</code>

<div class="text-sm">

- Conversations and messages per **account@VO**; history shows the current account only
- Private mode or no IndexedDB: chats work in memory, with "History is not saved in this browser"
- Stored: text, tool calls, approvals, page context, usage
- **Never stored:** rows (only provenance), sessions or tokens
- Rename a chat from the history menu or the Storage tab

</div>
</div>

<div>

### Cleanup

<div class="text-sm">

- Retention by age (default 30 days) and size (default 50 MB **per account@VO**, oldest first, so one account never evicts another)
- Enforced when the panel mounts and after each turn
- Opt-in **clear on sign-out** for the signed-out account only, on every sign-out path, automatic ones included

</div>
</div>

</div>

<div class="mt-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 text-sm">
  <strong>Storage tab:</strong> size per chat and in total, browser usage, live DuckDB memory with <strong>Free memory now</strong>, export as Markdown or JSON, rename, delete one or all, and the <strong>other accounts</strong> in this browser with per-account delete and delete for all accounts.
</div>

<!--
Nothing about conversations is stored on our server. They live in IndexedDB in the user's browser, keyed by account at VO, so a shared lab machine does not mix people's chats.
Retention is per account: one heavy user cannot push out another account's history.
Clear on sign-out is opt-in and hooks every sign-out path, including the automatic sign-out when a session expires.
The Storage tab makes all of it visible: sizes, export, delete, and the other accounts that used this browser.
-->

---
layout: default
---

# The Storage tab

<div class="grid grid-cols-5 gap-6 mt-2 items-start">

<div class="col-span-3">
  <img src="/rucio-bot/2026-10/assistantstorageview--other-accounts.png" class="rounded-lg shadow-lg w-full object-cover object-top" style="height: 400px;" alt="Storage tab with saved chats, other accounts, retention and memory" />
</div>

<div class="col-span-2 flex flex-col items-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--history-not-saved.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 220px; height: 300px;" alt="Panel banner: history is not saved in this browser" />
  <p class="text-xs mt-2 text-center">No IndexedDB (for example a private window): the chat still works, in memory, and says so</p>
</div>

</div>

<!--
Left: chats of this account with size, Markdown and JSON export, rename and delete; the other accounts that used this browser, each deletable; retention and memory.
Right: the banner when the browser does not allow saving chats.
-->
