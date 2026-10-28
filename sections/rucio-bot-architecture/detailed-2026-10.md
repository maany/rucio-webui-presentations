---
layout: default
---

# Architecture: the agent runs in the browser

```mermaid {scale: 0.58}
flowchart LR
  BR["<b>Browser</b><br/>panel + agent loop (TanStack AI 1.0)<br/>tools + loop guard + policy gate<br/>DuckDB-wasm scratchpad<br/>IndexedDB chats"]
  subgraph W["WebUI server (Next.js)"]
    direction TB
    F["/api/feature/*<br/>existing routes"]
    C["/api/feature/get-assistant-config"]
    R["/api/assistant/llm"]
    TR["/api/assistant/telemetry"]
  end
  RS[("Rucio server")]
  LLM["LLM provider"]
  LF["Langfuse / OTLP"]
  BR -- "same-origin, user's session" --> F
  BR --> C
  BR -- "operator model" --> R
  BR -- "shared traces" --> TR
  BR -. "BYOK, direct" .-> LLM
  BR -. "personal sink" .-> LF
  F -- "X-Rucio-Auth-Token" --> RS
  R -- "server-side key" --> LLM
  TR --> LF
```

<div class="grid grid-cols-3 gap-3 text-xs mt-1">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>Server adds only</strong> the LLM relay, the telemetry relay and the config route</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>Tools</strong> call the WebUI's own <code>/api/feature</code> routes, so the bot sees exactly what the user can see</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>Why the browser:</strong> reach a local Ollama, user base URLs never touch our server (no SSRF), approvals live where tools run</div>
</div>

<!--
The key design decision: the agent loop runs in the browser, on TanStack AI 1.0, pinned exactly.
Only two files import TanStack: tanstack-agent-runner.ts and tanstack-tools.ts, so the framework is swappable.
The server gains three things: the operator LLM relay, the telemetry relay, and get-assistant-config, which returns the operator settings without any secrets.
Tools are plain same-origin fetches to the routes the WebUI already has. The server attaches the Rucio token as it always does; Rucio authorizes every call.
Personal providers and personal trace sinks are called straight from the browser, so a user's base URL is never fetched by our server.
-->

---
layout: default
---

# One turn

```mermaid {scale: 0.52}
sequenceDiagram
  actor U as User
  participant A as Browser (loop, guard, gate, executor)
  participant M as Model
  participant S as WebUI /api/feature
  participant Q as DuckDB
  U->>A: message + page context
  A->>M: prompt + visible tools
  M-->>A: list_rules(state=Stuck)
  Note over A: loop guard, then policy gate: allow
  A->>S: same-origin fetch, NDJSON stream
  S-->>A: rows, secret-named fields dropped
  A->>Q: rows into table rules_1
  A->>M: handle, columns, count, 3-row sample
  M-->>A: run_sql(SELECT ... FROM rules_1)
  A->>Q: guarded read-only query
  Q-->>A: at most 200 rows + total
  A-->>U: answer + activity line
```

<div class="text-xs text-neutral-600 dark:text-neutral-400 -mt-2">
  Ends when the model finishes, Stop is pressed, the tool budget runs out or the 25-step limit is hit (then <strong>Continue</strong>).
</div>

<!--
Walk through one turn.
The user message carries a page context block unless the user removes the chip.
The model only sees tools that are visible for this user and starts with a small always-on set; find_tools loads domain tools on demand, which keeps prompts small for local models.
Every call goes through the loop guard and the policy gate first.
Row results never go back to the model: they become a DuckDB table, and the model gets the handle name, columns, row count and a three row sample. Then it writes SQL.
-->

---
layout: default
---

# One turn, as the user sees it

<div class="grid grid-cols-2 gap-8 mt-2">

<div class="flex flex-col items-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--verbose.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 240px; height: 350px;" alt="Panel with the activity timeline expanded" />
  <p class="text-xs mt-2 text-center">Answer with its activity line expanded</p>
</div>

<div class="flex flex-col items-center">
  <img src="/rucio-bot/2026-10/activitytimeline--verbose.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 290px; height: 350px;" alt="Activity timeline showing find_tools and list_rules" />
  <p class="text-xs mt-2 text-center"><code>find_tools</code> loads the rule tools, then <code>list_rules</code> runs; arguments and results stay inspectable</p>
</div>

</div>

<!--
The same turn in the UI. The collapsed line reads: thought 4 seconds, tools, query, tokens, cost.
Expanded, you see the model's reasoning when the provider exposes it, then every tool call with arguments and result.
find_tools is how the model loads domain tools on demand: it starts with a small always-on set.
-->

---
layout: default
---

# Hexagonal layers

<div class="text-sm">

| Layer | Rucio bot pieces |
|---|---|
| Entities <code>core/entity/assistant/</code> | tool, conversation, data-handle, skill, settings, usage, page-context, events |
| Ports <code>core/port/secondary/</code> | conversation repository, data handle store, knowledge index, skill source, page action registry, config gateway |
| Services <code>core/services/</code> | <code>assistant-policy</code>, <code>assistant-sql-guard</code>, <code>assistant-retention</code>, <code>assistant-secret-keys</code>, tool search |
| Use cases | <code>get-assistant-config</code>, <code>list-requests</code> (controller and presenter, like every route) |
| Infrastructure <code>infrastructure/assistant/</code> | runner, tool registry, feature executor, DuckDB store, IndexedDB repository, telemetry, relays |
| Component library <code>features/assistant/</code> | Panel, ApprovalCard, ActivityTimeline, ResultTable, ContextGauge, settings tabs |

</div>

<!--
It follows the WebUI's hexagonal architecture, so nothing here should surprise a WebUI contributor.
The policy, the SQL guard, retention and the secret field rule are pure functions in core services, which made them easy to test exhaustively.
Infrastructure holds the adapters: TanStack runner, DuckDB, IndexedDB, OpenTelemetry.
The component library holds presentational components with Storybook stories.
-->

---
layout: default
---

# Lazy by design: zero cost with the flag off

```mermaid {scale: 0.6}
flowchart LR
  A["FEATURE_ASSISTANT off"] --> Z["Nothing renders<br/>routes 404<br/>no assistant code"]
  B["Flag on"] --> H["Header button only"]
  H -- "panel first opened" --> R["next/dynamic loads AssistantRoot<br/>runner, provider SDKs, markdown"]
  R -- "first rows result" --> K["DuckDB-wasm worker"]
  R -- "first search_docs" --> X["docs index JSON"]
  R -- "a trace sink is active" --> O["OpenTelemetry SDK"]
```

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4"><code>AssistantMount</code> renders nothing until the panel is opened once, then stays mounted to keep the chat across navigation</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">Build check: entry chunks of <code>/dashboard</code>, <code>/rules</code> and <code>/rule/create</code> carry no DuckDB, TanStack AI, OpenTelemetry or MiniSearch code</div>
</div>

<!--
We were careful about bundle cost. Users who never open the panel pay nothing.
The DuckDB wasm files are about 8 MB gzipped each, so they only load when the first list result arrives.
We checked the production build output after each merge: the page entry chunks contain none of these libraries; they only exist in lazy chunks.
-->
