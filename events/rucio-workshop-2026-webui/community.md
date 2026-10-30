---
layout: default
---

# Welcome, Tomasz

<div class="grid grid-cols-5 gap-8 mt-6 items-start">

<div class="col-span-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 text-center">
  <span class="i-heroicons-user-circle w-20 h-20 text-brand-600"/>
  <div class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-2">Tomasz Paja</div>
  <div class="text-sm opacity-75">Technical student, Rucio WebUI</div>
  <div class="text-sm mt-2"><code>@pajka2T</code> on GitHub</div>
</div>

<div class="col-span-3">

<div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">10 merged pull requests since August</div>

- Multi-select filters for every enum column in every table
- "No rows match your filters" overlay
- Tips for RSE expressions and DID queries
- Dataset replicas tab on the DID page, with more columns
- Data sizes in base 10, like the CLI
- Clickable DID, RSE and rule cells, in one place
- Fixes: multi-RSE rule creation, replica states, navigation, local dev defaults

</div>

</div>

<!--
Tomasz joined the WebUI team this summer as a technical student and has already shipped ten pull requests.
Many of the table improvements in 41.1 are Tomasz's work.
If you open an issue in the coming months, there is a good chance Tomasz will be the one picking it up.
-->

---
layout: default
class: table-compact
---

# Get involved

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">44 open issues in rucio/webui</div>

<div class="flex flex-wrap gap-2 text-xs">
  <span class="badge">tables and UI polish</span>
  <span class="badge">search</span>
  <span class="badge">DID routing</span>
  <span class="badge">rules and transfers</span>
  <span class="badge">RSE views</span>
  <span class="badge">deployment</span>
  <span class="badge">auth and permissions</span>
  <span class="badge">OpenData</span>
</div>

<div class="font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Good first issues</div>

| Issue | |
|---|---|
| #874 | URL filters on the accounts list |
| #769 | "No FTS submission in the last X days" |
| #708 | Sorting by rule lock state |
| #665 | Sorting on every table column |
| #647 | Wider RSE prefix column |
| #528 | Storybook deployment static file |

</div>

<div>

<div class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">How</div>

- **Use it** and tell us what is missing: open an issue
- **Tell us** which old UI views you still need before March 2027
- **Deploy it** for your community and share your config
- **Contribute**: `npm run dev` against your Rucio, Storybook for components, tests under `test/`

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 mt-6 text-sm">
  <div><span class="i-heroicons-chat-bubble-left-right inline-block w-5 h-5 text-brand-600 align-middle mr-1"/> Rucio WebUI channel on Mattermost</div>
  <div class="mt-1"><span class="i-heroicons-code-bracket inline-block w-5 h-5 text-brand-600 align-middle mr-1"/> github.com/rucio/webui</div>
</div>

</div>

</div>

<!--
44 open issues, grouped into eight themes.
The six on the left are small, well scoped and a good way to learn the codebase; each one touches a single table or page.
The most useful contribution for most communities is feedback: deploy it, tell us what you miss, and vote on the priorities.
-->

---
layout: center
class: text-center
---

# Thank you!

Questions?

<div class="pt-10 text-sm">

**Rucio WebUI Team**

rucio.cern.ch | github.com/rucio/webui | Rucio WebUI channel on Mattermost

</div>

<!--
Thanks. Happy to take questions, and to talk deployment details for your community after the session.
-->
