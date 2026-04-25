# Hotjar - GTM Implementation Manual

> Always verify the latest specifications at the [Hotjar Help Center](https://help.hotjar.com/).

---

## 1. Core Features

Hotjar is a behavior analytics and feedback platform. The GTM-relevant surfaces are:

| Surface | Purpose |
|---------|---------|
| **Tracking Code** | Base client-side script required for every other Hotjar feature |
| **Recordings** | Session replays of user interactions (DOM-based, like Clarity) |
| **Heatmaps** | Click, move, and scroll heatmaps |
| **Surveys / Feedback** | On-site surveys and feedback widgets (Ask product) |
| **Events API** | Client-side `hj('event', ...)` for filtering, segmentation, and survey targeting |
| **Identify API** | Client-side `hj('identify', ...)` for User IDs and User Attributes |
| **Suppression** | HTML attributes and site settings for masking sensitive content |

Hotjar's GTM documentation states that **server-side tagging is not supported** for loading the Hotjar Tracking Code. GTM implementation must be client-side.

---

## 2. Tracking Code Setup

### Hotjar Site ID

The Site ID is the primary identifier needed in GTM. It is visible in Hotjar's Sites page and is used by the Tracking Code to associate collected data with the correct Hotjar site.

### Single-Base-Tag Rule

**Only one Tracking Code should fire on any given page.** Duplicate scripts cause data corruption and usually indicate one of:

- Hotjar was installed both directly in the site code and through GTM
- More than one Site ID is present in the container
- A non-Page-View trigger is firing the base tag more than once per visit (most common in SPAs)

### What the Tracking Code Does

The snippet:

- Queues `hj()` calls before the main Hotjar script finishes loading
- Tells Hotjar which site settings to load via `hjid`
- Tracks the snippet version with `hjsv`
- Loads the main Hotjar script

### Installation Options

| Option | Use Case | Notes |
|--------|----------|-------|
| **Hotjar + GTM integration** | Fast setup from the Hotjar UI | Hotjar detects a GTM container and creates/publishes the tag after Google authorization |
| **Hotjar Tracking Code tag in GTM** | Preferred manual UI and JSON-export setup | GTM-native built-in tag template (`type: "hjtc"`); enter Site ID and fire on All Pages. The template manages `hjsv` internally |
| **Custom HTML tag** | Fallback when the built-in tag is unavailable or you need to pin a specific snippet | Paste the official Hotjar snippet; export-importable across containers |

For GTM container JSON generation, prefer the **GTM-native Hotjar Tracking Code** tag (`type: "hjtc"`, single `siteId` parameter). It exports cleanly across environments, keeps the snippet version managed by Google, and avoids manual maintenance of the inline script. Fall back to **Custom HTML** only when you need to pin a specific `hjsv` or otherwise control the snippet directly. Keep the Hotjar Site ID in a Constant variable such as `Const - Hotjar Site ID` either way.

### Custom HTML Snippet

```html
<!-- Hotjar Tracking Code -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:{{Const - Hotjar Site ID}},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-',".js?sv=");
</script>
```

> The exact `hjsv` version is what Hotjar emits in the snippet copied from your Site's setup page at the time of installation. Re-copy the snippet from Hotjar if you need the current version.

---

## 3. Events API

### Purpose

Hotjar Events represent actions or state changes on the site. They can be used to:

- Filter Recordings and Heatmaps
- Create Recording Segments
- Trigger or target Surveys
- Start session capture based on an event

### Plan Availability

Events are pre-enabled on sites with **Observe Plus, Business, or Scale**, and **Ask Plus, Business, or Scale**. Confirm the customer's plan before implementing event-heavy setups.

### JavaScript Pattern

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('event', 'generate_lead');
</script>
```

The `window.hj` queue shim must be present before the call. Inside a GTM Custom HTML tag that fires before the base tag has finished loading, always include the shim.

### Event Naming Rules and Limits

| Rule | Value |
|------|-------|
| Max event name length | 250 characters |
| Allowed characters | Alphanumeric, underscores, dashes, spaces, periods, colons, pipes, forward slashes |
| Unique events per Site (filterable) | 10,000 |
| Unique events searchable per session | First 50 (later events still appear in playback) |
| Event properties / parameters | **Not supported** — only the event name is transmitted |

### What NOT to Put in Event Names

Event names must be **non-PII, low-cardinality strings**. Do not include:

- Email addresses, phone numbers, names, addresses
- IP addresses
- Numbers with 9 or more digits (treated as suppressed input)
- Full URLs with sensitive query strings
- Dates / timestamps
- Detailed error messages
- SKU / product identifiers
- Any free-form user input

Use stable snake_case names aligned with the dataLayer instead:

| dataLayer Event | Hotjar Event |
|-----------------|--------------|
| `generate_lead` | `generate_lead` |
| `purchase` | `purchase` |
| `sign_up` | `sign_up` |
| `add_to_cart` | `add_to_cart` |
| `begin_checkout` | `begin_checkout` |
| `form_error` | `form_error` |

---

## 4. Identify API and User Attributes

### Purpose

The Identify API attaches a User ID and arbitrary key/value attributes to the current Hotjar user. Attributes can be used to:

- Filter Recordings and Heatmaps
- Create Segments
- Target Surveys and Feedback
- Look up or delete a specific user's data by User ID

### Plan Availability

User Attributes are available and pre-enabled on **Observe Business, Observe Scale, Ask Business, and Ask Scale** only. The Plus tier does not include User Attributes (unlike Events).

User Attributes must also be enabled in Hotjar Site settings before the Identify API will accept calls.

### JavaScript Pattern

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('identify', '{{DLV - user_id}}', {
    plan: '{{DLV - user_plan}}',
    account_type: '{{DLV - account_type}}'
  });
</script>
```

`null` is allowed as the User ID for anonymous attribute attachment:

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('identify', null, {
    ab_test: '{{DLV - ab_test_variant}}'
  });
</script>
```

> When passing `null` as the User ID, do not send any PII attributes. Hotjar cannot fulfill lookup or deletion requests for unidentified users except by deleting the entire Site.

### User ID Guidance

The Identify User ID should be:

- Unique per user
- Sourced from the site's own database
- Free of personal information
- Stable across the user's lifetime

Email is technically accepted but is discouraged as a User ID because it is mutable and is itself personal data. Default to internal opaque IDs.

### Attribute Limits

| Item | Limit / Behavior |
|------|------------------|
| Attributes per Site | Up to 100 |
| Attribute name length | Max 50 characters |
| String values | Max 200 characters; case-insensitive; UTF-8 supported |
| Number values | Integers or decimals from `-9007199254740991` to `9007199254740991` |
| Date values | ISO-8601 strings |
| Boolean values | `true` / `false` |
| Email | Use the dedicated `email` key only — never as a generic string attribute |

### Recommended Attribute Allowlist

Prefer coarse, low-risk attributes over fine-grained ones:

| Attribute | Example | Note |
|-----------|---------|------|
| `user_role` | `admin`, `member` | Avoid raw job titles |
| `plan` | `free`, `pro` | Usually safe with consent |
| `account_type` | `agency`, `brand` | Keep categories coarse |
| `signup_date` | `2026-04-26T00:00:00.000Z` | ISO date; avoid birth dates |
| `lifetime_value_bucket` | `100_499` | Bucket rather than send exact values |
| `ab_test` | `variant_a` | Useful for surveys |

### Identify Call Timing

Hotjar recommends calling Identify:

- On every page load with the most recent values
- After a URL change in SPAs
- Whenever a relevant attribute changes (e.g. after purchase or plan upgrade)

If Events and Identify both feed Survey targeting, the Identify call must run **before** the Event in the same page lifecycle.

---

## 5. GTM Configuration

### Recommended Tags

| Tag Name | Type | Trigger | Purpose |
|----------|------|---------|---------|
| `Hotjar - Base` | GTM-native **Hotjar Tracking Code** (`hjtc`) — Custom HTML as fallback | All Pages / Page View | Loads Hotjar |
| `Hotjar - Event - generate_lead` | Custom HTML (or unofficial Knowit Experience [Hotjar Event](https://github.com/gtm-templates-knowit-experience/gtm-hotjar-event) Community Template) | `CE - generate_lead` | Lead session tagging |
| `Hotjar - Event - purchase` | Custom HTML (or Knowit Hotjar Event template) | `CE - purchase` | Purchase session tagging |
| `Hotjar - Event - sign_up` | Custom HTML (or Knowit Hotjar Event template) | `CE - sign_up` | Signup session tagging |
| `Hotjar - Identify` | Custom HTML (or unofficial Knowit Experience [Hotjar User Attributes](https://github.com/gtm-templates-knowit-experience/gtm-hotjar-user-attributes) Community Template) | `CE - user_context_ready` (and SPA route changes if applicable) | User ID + attributes |

> Hotjar does not publish official GTM Community Templates for Events or User Attributes. The Knowit Experience templates above are unofficial, community-maintained, and not supported by Hotjar — evaluate them on their own merits. Custom HTML remains a perfectly acceptable choice for these tags, especially in JSON-export workflows where the Knowit `cvt_*` ID and `galleryReference` signature must be sourced from a real GTM export rather than fabricated.

### Variables

| Variable Name | Type | Example |
|---------------|------|---------|
| `Const - Hotjar Site ID` | Constant | `1234567` |
| `DLV - user_id` | Data Layer Variable | `user_id` |
| `DLV - user_plan` | Data Layer Variable | `user_plan` |
| `DLV - account_type` | Data Layer Variable | `account_type` |
| `DLV - ab_test_variant` | Data Layer Variable | `ab_test_variant` |

### Triggers

| Trigger Name | Type | Event |
|--------------|------|-------|
| `All Pages` | Page View | Built-in |
| `CE - generate_lead` | Custom Event | `generate_lead` |
| `CE - purchase` | Custom Event | `purchase` |
| `CE - sign_up` | Custom Event | `sign_up` |
| `CE - user_context_ready` | Custom Event | `user_context_ready` |

### Folder

Create a `Hotjar` folder containing the base tag, all event tags, the Identify tag, the Site ID Constant, and Hotjar-specific DLVs. Shared custom-event triggers belong in `_Global` when they fire multiple platforms.

---

## 6. dataLayer Mapping

Reuse existing GA4-style dataLayer events. Avoid creating Hotjar-only events unless the behavior is genuinely Hotjar-specific.

### Lead

```javascript
dataLayer.push({
  event: 'generate_lead',
  form_id: 'contact',
  form_type: 'inquiry'
});
```

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('event', 'generate_lead');
</script>
```

### Purchase

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T12345',
    value: 49.99,
    currency: 'USD',
    items: [{ item_id: 'SKU001', item_name: 'Product Name', price: 49.99, quantity: 1 }]
  }
});
```

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('event', 'purchase');
</script>
```

> Do not pass transaction ID, customer email, phone number, address, cart contents, item names, or SKU codes into Hotjar event names. Hotjar Events carry no parameters — the name itself is the only payload.

### User Context

```javascript
dataLayer.push({
  event: 'user_context_ready',
  user_id: 'u_123456',
  user_plan: 'pro',
  account_type: 'brand',
  ab_test_variant: 'pricing_v2_a'
});
```

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('identify', '{{DLV - user_id}}', {
    plan: '{{DLV - user_plan}}',
    account_type: '{{DLV - account_type}}',
    ab_test: '{{DLV - ab_test_variant}}'
  });
</script>
```

---

## 7. Privacy and Consent

### Consent Classification

Hotjar is behavior analytics, not advertising. Default treatment in GTM:

- Gate the base tag on `analytics_storage` consent where the site uses opt-in analytics
- Do not load Hotjar before consent in opt-in jurisdictions
- For Identify calls that include any personal context, require explicit user-data consent and legal sign-off

Hotjar respects browser **Do Not Track** headers and provides a public Do Not Track page for end-users.

### Suppression

Hotjar suppresses user input by default. Numeric strings 9 digits or longer are always suppressed regardless of settings. Email-like text and numeric suppression in collected page text are also enabled by default in current site settings.

**Suppression changes are not retroactive** — they apply only to sessions captured after the change.

| Mechanism | Effect |
|-----------|--------|
| `data-hj-suppress` attribute or class | Suppresses text and image/video content inside the element and its children |
| `data-hj-allow` attribute or class | Allows keystroke collection on supported form fields (not recursive); does not override suppression for fields named/typed as email, password, phone, name, address, credit card, etc. |
| Inline SVG | Cannot be suppressed via specific-element suppression — handle by avoiding sensitive content in inline SVG |

### Skill Stance

- Never use GTM to pass raw form-field values into Hotjar
- Treat Hotjar suppression as defense-in-depth, not the primary safeguard — keep sensitive data out of the DOM where possible
- Recommend `data-hj-suppress` in application markup for account, checkout, profile, pricing, medical/legal/financial, and similar sensitive sections

---

## 8. Cookies and Storage

Hotjar cookies are first-party (set by JS executing on the host domain). The Tracking Code also uses local and session storage.

| Name | Type | Purpose | Duration |
|------|------|---------|----------|
| `_hjSessionUser_{site_id}` | Cookie | Persists Hotjar User ID for the site | 365 days |
| `_hjSession_{site_id}` | Cookie | Holds current session data | 30 minutes (extended on activity) |
| `_hjHasCachedUserAttributes` | Cookie | Indicates whether cached User Attributes are up to date | Session |
| `_hjUserAttributesHash` | Cookie | Indicates whether User Attributes changed | Short-lived, refreshed on activity |
| `_hjUserAttributes` | Local storage | Stores attributes sent through Identify | No explicit expiration |
| `hjViewportId` | Session storage | Stores viewport details | Session |

Hotjar does not track or record users with cookies disabled.

---

## 9. SPA Handling

The base Hotjar tag must fire on **Page View / All Pages only** — including in SPAs. GTM History Change or other state-change triggers conflict with Hotjar's own SPA detection and cause duplicate or missing scripts.

Recommended SPA pattern:

- Fire `Hotjar - Base` once on All Pages / Page View
- Do **not** add the base tag to a History Change trigger
- Send Identify calls after URL changes when attributes need refreshing
- Send Events on application dataLayer events (route milestones, modals, errors, conversions, experiments)

---

## 10. Data Retention

| Data Type | Retention |
|-----------|-----------|
| Recordings | 365 days from capture |
| Heatmap data | 365 days from creation |
| Survey responses | Stored indefinitely until the account owner deletes them |
| Identified users (with User ID) | Deleted after 365 days of inactivity |
| De-identified users (no User ID) | Deleted after 3 months |

---

## 11. Debugging

### Verification from Hotjar

After publishing GTM, wait a few minutes, then run **Verify Installation** from the Sites page in Hotjar.

### Browser Network Tab

1. Open Network tab
2. Reload the page
3. Filter by `hotjar`
4. Confirm requests prefixed `hotjar-{site_id}` load
5. Confirm only **one** Site ID appears

### Hotjar Debug Mode

Append `?hjDebug=1` to any URL on the site (or `&hjDebug=1` if other query parameters are present). The console logs:

- Base script load
- Each `hj('event', ...)` call after its GTM trigger fires
- Each `hj('identify', ...)` call with attributes

### GTM Preview

In GTM Preview confirm:

- `Hotjar - Base` fires exactly once on the initial Page View
- Hotjar Event tags fire only on their intended Custom Events
- `Hotjar - Identify` fires after user data is available and after SPA route changes where required
- Consent state blocks/allows Hotjar according to policy

---

## 12. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---------|--------|------------|
| Loading Hotjar via server-side GTM | Not supported | Use client-side GTM only |
| Firing the base tag on History Change in SPA | Duplicate or missing scripts | Page View / All Pages only |
| Duplicate Hotjar installs (code + GTM) | Multiple Site IDs, broken tracking | Remove direct embeds; use one source |
| Events fire before `hj` queue exists | Calls dropped | Include the `window.hj` queue shim in every event tag |
| Sending PII in Event names | Privacy violation; events have no params | Stable, low-cardinality names only |
| Using email as User ID | Unstable, personal data | Use internal opaque IDs |
| Email in generic User Attribute | Rejected / privacy issue | Use the reserved `email` key only when legally approved |
| PII attached when User ID is `null` | Unfulfillable lookup/deletion requests | Never send PII for unidentified users |
| Relying solely on Hotjar suppression | Sensitive DOM/API data can still leak | Add `data-hj-suppress` and avoid sensitive DOM exposure |
| Forgetting to publish GTM | Hotjar invisible on the live site | Publish and verify Network requests |

---

## 13. References

- [Hotjar Help Center](https://help.hotjar.com/)
- [Getting Started with GTM and Hotjar](https://help.hotjar.com/hc/en-us/articles/36820007341585-Getting-Started-with-Google-Tag-Manager-and-Hotjar)
- [Install the Tracking Code with GTM](https://help.hotjar.com/hc/en-us/articles/36820058585873-Install-the-Tracking-Code-with-Google-Tag-Manager)
- [GTM Installation Troubleshooting](https://help.hotjar.com/hc/en-us/articles/36819965783825-Google-Tag-Manager-Installation-Troubleshooting)
- [What is the Hotjar Tracking Code?](https://help.hotjar.com/hc/en-us/articles/36820044421393-What-is-the-Hotjar-Tracking-Code)
- [Events API Reference](https://help.hotjar.com/hc/en-us/articles/36819965075473-Events-API-Reference)
- [How to Send Events with GTM](https://help.hotjar.com/hc/en-us/articles/36820025530641-How-to-Send-Events-with-Google-Tag-Manager)
- [Identify API Reference](https://help.hotjar.com/hc/en-us/articles/36820006120721-Identify-API-Reference)
- [How to Send User Attributes with GTM](https://help.hotjar.com/hc/en-us/articles/36820034014993-How-to-Send-User-Attributes-with-Google-Tag-Manager)
- [Cookies Set by the Hotjar Tracking Code](https://help.hotjar.com/hc/en-us/articles/36819973371409-Cookies-Set-by-the-Hotjar-Tracking-Code)
- [Privacy FAQs](https://help.hotjar.com/hc/en-us/articles/36820004397713-Privacy-FAQs)
- [How to Suppress Text, Images, Videos, and User Input](https://help.hotjar.com/hc/en-us/articles/36819956605329-How-to-Suppress-Text-Images-Videos-and-User-Input-from-Collected-Data)
- [How Long Does Hotjar Keep My Data?](https://help.hotjar.com/hc/en-us/articles/36819991007505-How-Long-Does-Hotjar-Keep-My-Data)
