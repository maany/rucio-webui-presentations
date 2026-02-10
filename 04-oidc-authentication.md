# OIDC Authentication
<v-clicks>

1. Choose your identity provider
2. Redirect to provider login
3. Authenticate with your credentials
4. Return to Rucio with secure token

</v-clicks>

---
layout: center
class: text-center
---

## Step 1: Login Page
Choose your authentication method

<img src="/login_page.png" class="m-auto rounded shadow-lg" style="max-height: 400px;" />

<arrow v-click x1="400" y1="550" x2="400" y2="580" color="#564" width="3" arrowSize="1" />

---
layout: center
class: text-center
---

## Step 2: Identity Provider Authorization
Grant access to your identity and profile

<img src="/oidc_login_atlas_iam.png" class="m-auto rounded shadow-lg" style="max-height: 400px;" />

<arrow v-click x1="400" y1="550" x2="400" y2="580" color="#564" width="3" arrowSize="1" />

---
layout: center
class: text-center
---

## Step 3: Welcome to Rucio!
Successfully authenticated and ready to use

<img src="/webui_dashboard_post_oidc.png" class="m-auto rounded shadow-lg" style="max-height: 400px;" />

---
layout: default
---

# Pending Configurations

- OIDC Identities from Atlas IAM need to be syned in Rucio database.
- Some improvements to token validation workflows are foreseen in the Rucio Server.
