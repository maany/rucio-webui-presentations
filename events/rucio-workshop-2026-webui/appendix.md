---
layout: section
---

# Appendix
Feature lists, flags and variables

---
layout: default
class: table-compact
---

# A1 · rucio CLI vs WebUI (1/2)

<div class="text-xs">

✓ in the WebUI (main) · ◐ partly · ✗ missing · <sup>A</sup> admin-only under the default policy

| Group | Commands |
|---|---|
| Session | `whoami` ✓ · `ping` ✗ · `test-server` ✗ |
| Account | `list` ✓ · `show` ✓ · `add`<sup>A</sup> ✓ · `update`<sup>A</sup> ✓ · `remove`<sup>A</sup> ✓ |
| Account attribute | `list` ✓ · `add`<sup>A</sup> ✓ · `remove`<sup>A</sup> ✓ |
| Account limit | `list` ✓ · `add`<sup>A</sup> ✓ · `remove`<sup>A</sup> ✓ (local and global) |
| Identity | `list` ✓ · `add`<sup>A</sup> ✓ · `remove`<sup>A</sup> ✓ |
| Scope | `list` ✗ · `add`<sup>A</sup> ✗ · `update`<sup>A</sup> ✗ |
| DID | `list` ✓ · `show` ✓ · `add` ✗ · `update` (touch, open, close) ✗ · `remove` ✗ |
| DID content | `list` ✓ · `history` ✗ · `add` (attach) ✗ · `remove` (detach) ✗ |
| DID metadata | `list` ✓ · `add` ✗ · `remove` ✗ |
| Upload / download | `upload` ✗ · `download` ✗ |
| Opendata DID | `list` ✗ · `show` ✗ · `add` ✗ · `update` ✗ · `remove` ✗ (pages in review) |
| Lifetime exception | `add` ✗ (disabled by default in the CLI) |

</div>

<!--
Account rows are on main and ship in the next release.
DID add, attach and open/close have WebUI API routes behind FEATURE_DIDS_MUTATE, but no UI yet, so they count as missing.
-->

---
layout: default
class: table-compact
---

# A1 · rucio CLI vs WebUI (2/2)

<div class="text-xs">

| Group | Commands |
|---|---|
| Replica | `list file` ✓ (PFNs in an open PR) · `list dataset` ◐ (no `--rse` view) · `remove`<sup>A</sup> ✗ · `state list suspicious` ✓ · `state update bad`<sup>A</sup> ✓ · `state update unavailable`<sup>A</sup> ✗ |
| Rule | `add` ✓ · `list` ✓ · `show` ✓ (`--examine` ✗) · `history` ✗ · `update`<sup>A</sup> ◐ (lifetime, comment, priority, approve; not locked, activity, source RSEs, suspend, stuck, account) · `move`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✓ |
| Subscription | `list` ✓ · `show` ✓ · `add`<sup>A</sup> ✗ · `update`<sup>A</sup> ✗ · `touch` ✗ |
| RSE | `list` ✓ · `show` ✓ · `add`<sup>A</sup> ✗ · `update`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ |
| RSE attribute | `list` ✓ · `add`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ (dialogs built) |
| RSE protocol | shown on the RSE page · `add`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ |
| RSE distance | `show` ✗ · `add`<sup>A</sup> ✗ · `update`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ |
| RSE limit | `add`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ |
| RSE QoS | `list` ✗ · `add`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ |
| Config | `list`<sup>A</sup> ✗ · `add`<sup>A</sup> ✗ · `update`<sup>A</sup> ✗ · `remove`<sup>A</sup> ✗ |

</div>

<div class="text-xs mt-2">

**Totals:** reads 19 of 31, plus `replica list dataset` in part · writes 12 of 51, plus `rule update` in part. **WebUI beyond the CLI:** rule approve and deny (client API only), bulk actions, dashboard, bookmarks, AMI and PanDA links, DDM and FTS links on locks.

</div>

---
layout: default
class: table-compact
---

# A2 · Old Flask UI vs WebUI

<div class="text-xs">

| Area | Old UI pages |
|---|---|
| DIDs | `/search` ✓ · `/did` ◐ (no browser download, metalink, log preview, "move to WebDAV RSE") · `/` ✓ |
| Rules | `/r2d2` my rules ✓ · `/r2d2/request` wizard ✓ · `/rules` add ✓ · `/rule` ◐ (no "examine") · `/r2d2/approve` ✓ |
| Subscriptions | `/subscriptions` ✓ · `/subscriptions/rules` ✓ · `/subscription` ✓ · `/subscriptions_editor` ✗ |
| Accounts | `/list_accounts` ✓ · `/account` ✓ · `/account_rse_usage` ✓ · `/r2d2/manage_quota` ◐ (per account, not per RSE in bulk; no approval settings) |
| RSEs | `/rses` ✓ · `/rse` ✓ read only · `/rses/add` ✗ · `/rse/protocol/add` ✗ |
| Replica health | `/suspicious_replicas` ✓ · `/bad_replicas/summary` ✗ · `/bad_replicas` ✗ |
| Lifetime model | `/lifetime_exception` ✗ · `/list_lifetime_exceptions` ✗ |
| Operations | `/heartbeats` ✗ |
| ATLAS only | `/rule_backlog_monitor` ✗ · `/account_usage` ✗ · `/conditions_summary` ✗ · `/dbrelease_summary` ✗ · `/dumps` ✗ · `/infrastructure` ✗ |

</div>

<div class="text-xs mt-2">

**Totals:** 17 of 32 covered, 1 in part, 14 missing (6 ATLAS-only). Removed after 40.0.0 and not counted: `/rse_usage`, `/rse_locks`, `/accounting`, `/account_usage_history`, the ATLAS index chart. The old UI gated quota editing and approvals on <code>country-*=admin</code> too; the WebUI stores that role but does not use it yet.

</div>

---
layout: default
class: list-tight
---

# A3 · WebUI features (main)

<div class="grid grid-cols-2 gap-6 text-xs">

<div>

**Pages**
- `/dashboard`: top rules, storage usage, bookmarks
- `/dids`, `/did/[scope]/[name]`: search, metadata, contents, parents, rules, file and dataset replicas, AMI and PanDA chips
- `/rules`, `/rule/[id]`, `/rule/create`: list, details and locks, actions toolbar, create wizard
- `/rules/approve`: approval queue
- `/rses`, `/rse/[name]`: list, attributes, protocols, usage
- `/subscriptions`, `/subscription/[account]/[name]`
- `/suspicious-replicas`
- `/accounts`, `/account/[name]`: overview, identities, attributes, quotas

**Across the app**
- Command palette, bookmarks, 25 tips
- Streamed tables, multi-select filters, URL filters
- Dark mode, accessibility tests

</div>

<div>

**Write actions**
- Rules: create, boost, update lifetime, comment, approve, deny (single and bulk), delete, force delete
- Replicas: declare bad (single and bulk)
- Accounts: create, edit, suspend, reactivate, delete
- Attributes: add, edit, delete
- Identities: add, delete (6 types)
- Quotas: set and delete, local and global

**Platform**
- OIDC (multi-provider), x509, userpass; multiple accounts; multi-VO
- Feature flags, admin role from <code>admin=True</code>
- <code>/api/ping</code> health check
- Coming next: config validated at startup, no build at boot

</div>

</div>

---
layout: default
class: table-compact
---

# A4 · Features to add

<div class="text-xs">

| Feature | Source | Status |
|---|---|---|
| Subscription create and edit, touch | both | not started |
| RSE attributes add and remove | both | dialogs built |
| RSE add, settings, protocols, delete | both | not started |
| RSE distances, limits, QoS | CLI | not started |
| Examine a stuck rule | both | gateway endpoint exists |
| Rule move, locked, activity, source RSEs, suspend | CLI | not started |
| Rule history, DID content history | CLI | not started |
| Bad replica summary and list, declare unavailable | both | not started |
| PFNs, dataset replicas at an RSE | CLI | PFNs: open PR |
| DID create, attach, detach, close, erase, metadata | CLI | some API routes exist |
| Per-RSE quotas, auto-approve, country admins | old UI | not started |
| Lifetime exception request and list | both | not started |
| Browser download, metalink | both | not started |
| Scopes, server config, heartbeats | both | not started |
| Opendata catalog | CLI | PRs in review |
| Permissions from the server policy, OIDC with multi-VO | WebUI issues | open issues |

</div>

---
layout: default
class: table-compact
---

# A5 · Feature flags

<div class="text-xs">

In the container and Helm chart, prefix each with `RUCIO_WEBUI_`. Values: `true`, `false`, `1`, `0`, `yes`, `no`, `on`, `off`.

| Flag | Default | Controls |
|---|---|---|
| `FEATURE_RULES` | on | rule pages and APIs |
| `FEATURE_RULES_CREATE` | on | create-rule wizard |
| `FEATURE_RULES_APPROVE` | on | approval queue |
| `FEATURE_SUBSCRIPTIONS` | on | subscription pages |
| `FEATURE_RSES` | on | RSE pages |
| `FEATURE_DIDS_METADATA` | on | DID attributes tab |
| `FEATURE_DIDS_MUTATE` | on | DID write routes |
| `FEATURE_ACCOUNTS` | on | account pages (next release) |
| `FEATURE_ACCOUNTS_MANAGE` and `_CORE`, `_IDENTITIES`, `_ATTRIBUTES`, `_QUOTAS` | on | account writes (next release) |
| `FEATURE_DDM_DASHBOARD` + `DDM_DASHBOARD_BASE_URL` | off | DDM links on rule locks |
| `FEATURE_DIDS_AMI_TAGS` + `AMI_BASE_URL` | off | ATLAS AMI tag chips |
| `FEATURE_DIDS_PANDA_TASK` + `PANDA_BASE_URL` | off | ATLAS PanDA task links |

</div>

---
layout: default
class: table-compact
---

# A6 · Configuration variables

<div class="text-xs">

| Group | Variables (`RUCIO_WEBUI_` prefix in the container) |
|---|---|
| Connection | `RUCIO_HOST`, `RUCIO_AUTH_HOST`, `HOSTNAME`, `PROJECT_URL`, `COMMUNITY_LOGO_URL`, `RULE_ACTIVITY`, `LIST_DIDS_INITIAL_PATTERN`, `PARAMS_ENCODING_ENABLED` |
| Sessions | `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AUTH_TRUST_HOST` |
| Login methods | `ENABLE_USERPASS_LOGIN` (on), `X509_ENABLED` (on), `OIDC_ENABLED` (off) |
| OIDC | `OIDC_PROVIDERS`, `OIDC_EXPECTED_AUDIENCE_CLAIM`, per provider `OIDC_PROVIDER_<NAME>_` `CLIENT_ID`, `CLIENT_SECRET`, `AUTHORIZATION_URL`, `TOKEN_URL`, `REFRESH_TOKEN_URL`, `USERINFO_URL`, `REDIRECT_URL`, `ISSUER`, `SCOPES`, `ICON_URL`, `LOGOUT_URL` |
| Multi-VO | `MULTIVO_ENABLED`, `VO_LIST`, `VO_DEFAULT`, per VO `VO_<VO>_` `NAME`, `LOGO`, `OIDC_ENABLED`, `OIDC_PROVIDERS` |
| TLS to Rucio | `ENABLE_SSL`, `SERVER_CA_BUNDLE`, plus `NODE_EXTRA_CA_CERTS` on 41.x |
| httpd only | `RUCIO_CA_PATH`, `RUCIO_CA_FILE`, `RUCIO_HTTPD_*` (timeouts, MPM, proxy protocol, extra proxy config), `RUCIO_LOG_LEVEL` |
| Mounted files | `/etc/grid-security/hostcert.pem`, `hostkey.pem`, `ca.pem`, a CA directory at `RUCIO_CA_PATH`, optional `/opt/rucio/webui/.env`, `/patch` |

</div>
