---
layout: default
---

# Configuration and boot: restart, not rebuild

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5">
  <div class="text-xs uppercase tracking-wide opacity-60 mb-2">Up to 41.x</div>
  <ul class="text-sm !leading-snug !pl-4">
    <li>An env generator writes a <code>.env</code> file at boot</li>
    <li><strong><code>npm run build</code> on every container start</strong>: minutes, 2 CPU and 2 to 4 GiB for ATLAS</li>
    <li>Public URL compiled into the browser bundle</li>
    <li>A wrong variable shows up later as a confusing runtime error</li>
  </ul>
</div>

<div class="border-2 border-brand-500 rounded-xl p-5">
  <div class="text-xs uppercase tracking-wide opacity-60 mb-2">Next release <span class="opacity-80">(rucio/webui#872, containers#551, helm-charts#342)</span></div>
  <ul class="text-sm !leading-snug !pl-4">
    <li>The image ships a production build; <strong>boot starts a prebuilt server</strong></li>
    <li>Config read at server start, sent to the browser at runtime</li>
    <li>Change a variable, restart the pod</li>
    <li>One schema validates everything; <strong>the container exits with a readable list</strong></li>
  </ul>
</div>

</div>

```text
Invalid WebUI configuration:
  - RUCIO_HOST: must be a valid URL
  - NEXTAUTH_SECRET: NEXTAUTH_SECRET or AUTH_SECRET is required
  - DDM_DASHBOARD_BASE_URL: is required when FEATURE_DDM_DASHBOARD=true
```

<div class="text-sm mt-2">

**Leaner image:** AlmaLinux 10, Node.js 24, multi-stage build. 2375 → 1156 packages, 98 → 44 vulnerabilities, 3 → 0 critical.

</div>

<!--
The biggest operator complaint was boot time: the container ran a full Next.js build every time it started.
Three PRs, one each in webui, containers and helm-charts, land together and fix that: the build happens once when the image is built, and config is read when the server starts.
The same change validates every variable at startup. Instead of a pod that starts and then fails on the first request, you get this list and a non-zero exit.
The image numbers are from the container hardening work in February.
Do not mix an old image with a new WebUI tag or the other way round.
-->
