---
layout: default
---

# Telemetry: OpenTelemetry to Langfuse, opt-in

```mermaid {scale: 0.66}
flowchart LR
  E["Assistant events<br/>model steps, tools, approvals,<br/>SQL, skills, compaction"] --> S["Span processor<br/>scrub secrets"]
  S -- "user opted in" --> U["Personal sink<br/>Langfuse or OTLP/HTTP<br/>direct from the browser"]
  S -- "Share traces with<br/>this deployment" --> R["/api/assistant/telemetry"]
  R -- "optional HMAC of account@vo" --> O["Operator OTLP endpoint<br/>e.g. Langfuse"]
```

<div class="grid grid-cols-3 gap-3 text-xs mt-2">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>One trace per turn</strong>, GenAI semantic conventions; Langfuse session = conversation, user = account@vo</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>Content level</strong>: metadata (default) or full, capped by <code>ASSISTANT_TELEMETRY_CONTENT_CAP</code> and read per event</div>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3"><strong>Scrubbed before truncation</strong>: provider and Langfuse keys, Bearer and Basic values, Rucio tokens, JWTs, private keys, every key in settings</div>
</div>

<div class="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
  Operator side: <code>ASSISTANT_TELEMETRY_OTLP_ENDPOINT</code>, <code>_OTLP_HEADERS</code>, <code>_HASH_USER</code> with a 16+ character <code>_USER_SALT</code>. The relay needs a session, caps bodies at 1 MiB, never forwards client headers, never logs bodies. The SDK loads only when a sink is active.
</div>

<!--
Off by default, twice: the user's own sink needs its toggle, and the deployment sink needs the user to tick "Share traces with this deployment".
Spans follow the OpenTelemetry GenAI conventions and map onto Langfuse sessions and users.
Content level is metadata by default: timings, tokens, tool names, status. Full content includes prompts and results, and the operator can cap it.
With hashing on, the relay replaces account at VO with an HMAC using a server-only salt.
Without any sink, the same events still drive the in-app activity timeline.
-->

---
layout: default
---

# The Telemetry tab

<div class="grid grid-cols-5 gap-6 mt-2 items-start">

<div class="col-span-3">
  <img src="/rucio-bot/2026-10/settings-telemetrysettingsform--capped-at-metadata.png" class="rounded-lg shadow-lg" style="height: 410px; width: auto;" alt="Telemetry settings with deployment sharing, a Langfuse sink and the content level capped at metadata" />
</div>

<div class="col-span-2 text-sm">

- **This deployment**: "Share traces with this deployment", off until the user ticks it; the account is replaced by a salted hash
- **Your trace sink**: Langfuse or an OTLP endpoint, with a plain-text key warning and **Test export**
- **Content level**: here the operator caps it, so **Full content (operator limit)** is disabled

</div>

</div>

<!--
This story shows an operator that enables hashing and caps content at metadata.
The user has their own Langfuse project configured; Test export checks CORS, credentials and the path before anything is sent.
-->
