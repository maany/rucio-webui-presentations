---
layout: default
class: code-xs
---

# Authentication: three methods, your choice

<div class="grid grid-cols-5 gap-6 mt-2">

<div class="col-span-3">

<div class="grid grid-cols-3 gap-3">

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">OIDC</div>
  <p class="text-xs !leading-snug !mb-0 mt-1">Any number of providers, per-VO provider lists, configurable audience, token refresh</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">x509</div>
  <p class="text-xs !leading-snug !mb-0 mt-1">Browser certificate straight to the Rucio auth server</p>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3">
  <div class="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Userpass</div>
  <p class="text-xs !leading-snug !mb-0 mt-1">Can be switched off, as ATLAS does</p>
</div>

</div>

<div class="mt-4 text-sm">

- **Multiple accounts** for every method: pick one when an identity maps to several, switch later from the header
- **Multi-VO**: a VO picker, a name and logo per VO, OIDC providers per VO
- **Sessions**: Auth.js, OIDC tokens refreshed before they expire, 24 hour ceiling, re-login in place for userpass
- **Unmapped identity?** A clear message instead of a failed login

</div>

```bash
RUCIO_WEBUI_OIDC_ENABLED=true
RUCIO_WEBUI_X509_ENABLED=true
RUCIO_WEBUI_ENABLE_USERPASS_LOGIN=false
```

</div>

<div class="col-span-2 flex flex-col items-center gap-3">
  <img src="/authentication/2026-10/login-multi-vo-oidc.png" class="rounded-lg shadow-lg" style="height: 210px;" alt="Login page with VO tabs ATLAS, CMS and LHCb and OIDC, x509 and Userpass buttons" />
  <img src="/authentication/2026-10/multi-account-select.png" class="rounded-lg shadow-lg" style="height: 120px;" alt="Select Account dialog" />
</div>

</div>

<!--
Every community enables the methods it uses with one variable each.
Multiple accounts work for all three methods now. Switching is silent for x509 and OIDC, userpass asks for the password again.
OIDC tokens are refreshed before expiry, and a session lasts at most 24 hours.
One known gap: OIDC together with multi-VO is not complete yet; the OIDC session still assumes one VO.
-->
