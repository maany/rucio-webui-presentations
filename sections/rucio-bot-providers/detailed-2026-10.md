---
layout: default
---

# Bring your own key, or use the operator's model

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="flex items-center gap-2 mb-3"><span class="i-heroicons-key w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">BYOK, called from the browser</span></div>
  <ul class="text-sm space-y-1 !pl-4">
    <li><strong>OpenAI</strong> and <strong>Anthropic</strong>, direct</li>
    <li><strong>OpenAI-compatible</strong> gateways: LiteLLM, vLLM, your own base URL</li>
    <li><strong>Ollama</strong>, default <code>http://localhost:11434</code></li>
    <li>Keys in <code>localStorage</code> (default) or <strong>session only</strong>; plain text with a visible warning; never sent to the WebUI server</li>
    <li>Operator decides: <code>ASSISTANT_ALLOW_BYOK</code>, <code>ASSISTANT_ALLOWED_PROVIDER_KINDS</code></li>
  </ul>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="flex items-center gap-2 mb-3"><span class="i-heroicons-server-stack w-6 h-6 text-brand-600"/><span class="font-semibold text-neutral-900 dark:text-neutral-100">Operator default, through the relay</span></div>
  <ul class="text-sm space-y-1 !pl-4">
    <li><code>ASSISTANT_DEFAULT_PROVIDER_KIND</code> (openai-compatible or anthropic), <code>_BASE_URL</code>, <code>_API_KEY</code>, <code>_MODEL</code></li>
    <li>Browser calls same-origin <code>/api/assistant/llm</code></li>
    <li>Relay needs a session and the flag, drops client credentials, injects the key and forwards only to <code>ASSISTANT_DEFAULT_BASE_URL</code></li>
    <li><strong>The key never reaches the browser</strong>; request bodies are never logged</li>
  </ul>
</div>

</div>

<div class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
  Models must support tool calling. Context windows and prices come from a bundled model catalog, overridable with <code>ASSISTANT_PRICES_JSON</code>.
</div>

<!--
Two ways to get a model.
BYOK: the user adds a provider on the Providers settings tab. The browser talks to it directly, which is the only way to reach an Ollama on the user's laptop.
Keys stay in the browser. Default storage is localStorage, with a session-only option that keeps the key in sessionStorage.
Operator default: set the ASSISTANT_DEFAULT variables and every user gets a working bot with no setup. The browser talks to our relay, the relay adds the key server side, and it only ever forwards to the one configured upstream.
-->

---
layout: default
---

# The Providers tab

<div class="grid grid-cols-5 gap-6 mt-2 items-start">

<div class="col-span-3">
  <img src="/rucio-bot/2026-10/settings--with-personal-providers.png" class="rounded-lg shadow-lg w-full object-cover object-top" style="height: 365px;" alt="Providers tab with the operator default, a Claude key and a laptop Ollama" />
  <p class="text-xs mt-2">Operator default (key stays on the server), personal providers, <strong>On this device</strong> or <strong>This tab only</strong> for keys, Test connection per provider</p>
</div>

<div class="col-span-2 flex flex-col items-center">
  <img src="/rucio-bot/2026-10/providerformdialog--only-ollama-allowed.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 250px; height: 340px;" alt="Add provider dialog for Ollama with the plain text key warning" />
  <p class="text-xs mt-2 text-center">Plain-text key warning; here the operator allows only Ollama</p>
</div>

</div>

<!--
This is the Providers tab of the settings page.
At the top the operator default: the label and model come from the env, the key never leaves the server.
Below, the user's own providers. Keys stay on this device, or in this tab only.
The add dialog is honest about storage: keys are plain text in this browser and only ever sent to the provider. In this story the operator allows only Ollama, so that is the only kind offered.
-->

---
layout: default
---

# Operator limits and failures

<div class="grid grid-cols-5 gap-6 mt-2 items-start">

<div class="col-span-3">
  <img src="/rucio-bot/2026-10/settings--only-some-kinds-allowed.png" class="rounded-lg shadow-lg object-cover object-bottom" style="width: 440px; height: 350px;" alt="Providers tab where the active provider kind is not allowed by the operator" />
  <p class="text-xs mt-2"><code>ASSISTANT_ALLOWED_PROVIDER_KINDS</code> drops Anthropic: the provider is flagged <strong>Not allowed by the operator</strong></p>
</div>

<div class="col-span-2 flex flex-col items-center">
  <img src="/rucio-bot/2026-10/assistantpanelview--provider-error.png" class="rounded-lg shadow-lg object-cover object-top" style="width: 230px; height: 350px;" alt="Panel showing a provider error with Retry" />
  <p class="text-xs mt-2 text-center">Unreachable provider: a hint and Retry, never a stack trace</p>
</div>

</div>

<!--
Operators stay in control. If they restrict provider kinds, a saved provider of another kind is marked and cannot be used.
When a provider cannot be reached, the panel says what to check and points to Test connection.
-->

---
layout: default
---

# Relay guard rails and connection test

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

### Operator relay

<div class="text-sm">

- Rate limit per signed-in account: <code>ASSISTANT_RELAY_RATE_LIMIT</code> (30 per minute)
- Stream cap per account: <code>ASSISTANT_LLM_MAX_CONCURRENT_STREAMS</code> (3), more get 429 and the panel explains why
- Deadlines: <code>ASSISTANT_LLM_UPSTREAM_TIMEOUT_MS</code> (idle, 120 s) and <code>_MAX_MS</code> (total, 600 s)
- Oversized bodies get 413; upstream cookies and redirects are never passed on
- **Topic check** of new user turns: <code>ASSISTANT_SCOPE_MODE</code> off, warn (default) or block, with <code>ASSISTANT_SCOPE_EXTRA_TOPICS</code> and a small <code>ASSISTANT_SCOPE_MODEL</code>

</div>
</div>

<div>

### Test connection

<div class="text-sm">

- Sends one tiny streamed request with one trivial tool
- Turns failures into fixes:
  - CORS, with the exact <code>OLLAMA_ORIGINS</code> or <code>LITELLM_CORS_ORIGINS</code> value for this origin
  - Local Network Access denied
  - mixed content (https page, http endpoint)
  - invalid key, model not found, **no tool support**

</div>
</div>

</div>

<!--
The relay is the only place where our server spends money on someone's behalf, so it has guard rails.
Rate limit and a cap on concurrent streams per account, total and idle deadlines, size caps.
The topic check keeps the operator's model for Rucio work. It is a soft control: in warn mode the answer still comes with a note, in block mode the request is refused, and a failed check never blocks anyone. The main defence is the scope rule in the system prompt.
Test connection exists because setting up CORS for Ollama or LiteLLM is the number one support question. It prints the exact environment value to set.
-->
