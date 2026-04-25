# Hotjar - GTM Implementation Manual

> Always verify the latest specifications at the [Hotjar Help Center](https://help.hotjar.com/).

---

## 1. Core Surfaces

| Surface | Purpose |
|---------|---------|
| **Tracking Code** | Base client-side script required for every other Hotjar feature |
| **Recordings** | Session replays of user interactions (DOM-based) |
| **Heatmaps** | Click, move, and scroll heatmaps |
| **Surveys / Feedback** | On-site surveys and feedback widgets (Ask product) |
| **Events API** | Client-side `hj('event', ...)` for filtering, segmentation, survey targeting |
| **Identify API** | Client-side `hj('identify', ...)` for User IDs and User Attributes |
| **Suppression** | HTML attributes / site settings for masking sensitive content |

Hotjar's GTM documentation states **server-side tagging is not supported** for loading the Tracking Code. GTM implementation must be client-side.

---

## 2. Tracking Code Setup

### Hotjar Site ID

Visible in Hotjar's Sites page; required by the Tracking Code to associate data with the correct site.

### Single-Base-Tag Rule

**Only one Tracking Code should fire on any given page.** Duplicates cause data corruption — common causes: direct embed + GTM both installed, multiple Site IDs, or non-Page-View triggers in SPAs.

### Installation Options

| Option | Use Case | Notes |
|--------|----------|-------|
| **Hotjar + GTM integration** | Fast setup from Hotjar UI | Hotjar detects GTM and creates the tag after Google authorization |
| **Hotjar Tracking Code tag in GTM** | Preferred manual / JSON-export setup | GTM-native built-in tag template (`type: "hjtc"`); enter Site ID, fire on All Pages |
| **Custom HTML tag** | Fallback when needed | Paste the official snippet; pin a specific `hjsv` |

For container JSON generation, prefer the **GTM-native Hotjar Tracking Code** tag (`type: "hjtc"`, single `siteId` parameter). Keep the Site ID in `Const - Hotjar Site ID`.

### Custom HTML Snippet (fallback)

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

> Re-copy the snippet from Hotjar to get the current `hjsv` version.

---

## 3. Events API

Events filter Recordings/Heatmaps, build Recording Segments, target Surveys, and start session capture. Pre-enabled on **Observe Plus/Business/Scale** and **Ask Plus/Business/Scale**.

### JavaScript Pattern

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('event', 'generate_lead');
</script>
```

The `window.hj` queue shim must be present before the call. Always include it inside Custom HTML tags that may fire before the base tag finishes loading.

### Naming Rules and Limits

| Rule | Value |
|------|-------|
| Max event name length | 250 characters |
| Allowed characters | Alphanumeric, underscores, dashes, spaces, periods, colons, pipes, forward slashes |
| Unique events per Site (filterable) | 10,000 |
| Unique events searchable per session | First 50 |
| Event properties / parameters | **Not supported** — only the event name is transmitted |

### What NOT to Put in Event Names

Event names must be **non-PII, low-cardinality strings**. Do not include emails, phones, names, addresses, IPs, numbers with 9+ digits, full URLs with sensitive query, dates/timestamps, error messages, SKUs, or any free-form input.

Use stable snake_case names aligned with the dataLayer:

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

Attaches a User ID and arbitrary key/value attributes to the current Hotjar user (filter recordings, target surveys, support data deletion by ID). Available on **Observe Business/Scale** and **Ask Business/Scale**, and must be enabled in Site settings.

Call from a GTM Custom HTML tag (with the `window.hj` shim) on a `user_context_ready` Custom Event and after SPA route changes:

```html
<script>
  window.hj = window.hj || function(){(hj.q = hj.q || []).push(arguments);};
  hj('identify', '{{DLV - user_id}}', {
    plan: '{{DLV - user_plan}}',
    account_type: '{{DLV - account_type}}'
  });
</script>
```

`null` is allowed as the User ID for anonymous attribute attachment — but never send PII attributes when the User ID is `null` (lookup/deletion cannot be fulfilled). Use internal opaque IDs (not email). Email belongs only in the reserved `email` key when legally approved. Identify must run **before** Events in the same page lifecycle if both feed Survey targeting.

See: https://help.hotjar.com/hc/en-us/articles/36820006120721-Identify-API-Reference

---

## 5. GTM Configuration

### Recommended Tags

| Tag Name | Type | Trigger | Purpose |
|----------|------|---------|---------|
| `Hotjar - Base` | GTM-native **Hotjar Tracking Code** (`hjtc`) — Custom HTML as fallback | All Pages / Page View | Loads Hotjar |
| `Hotjar - Event - generate_lead` | Custom HTML | `CE - generate_lead` | Lead session tagging |
| `Hotjar - Event - purchase` | Custom HTML | `CE - purchase` | Purchase session tagging |
| `Hotjar - Event - sign_up` | Custom HTML | `CE - sign_up` | Signup session tagging |
| `Hotjar - Identify` | Custom HTML | `CE - user_context_ready` (and SPA route changes) | User ID + attributes |

> Hotjar does not publish official GTM Community Templates for Events or User Attributes. Knowit Experience publishes unofficial templates (`gtm-hotjar-event`, `gtm-hotjar-user-attributes`); Custom HTML remains acceptable, especially for JSON-export workflows where `cvt_*` IDs and `galleryReference` signatures must come from a real GTM export rather than fabrication.

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

Create a `Hotjar` folder for the base tag, event tags, Identify tag, Site ID Constant, and Hotjar-specific DLVs. Shared custom-event triggers belong in `_Global`.

---

## 6. dataLayer Mapping

Reuse existing GA4-style dataLayer events.

### Lead

```javascript
dataLayer.push({ event: 'generate_lead', form_id: 'contact', form_type: 'inquiry' });
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

> Do not pass transaction ID, email, phone, address, cart contents, item names, or SKU codes into Hotjar event names. Hotjar Events carry no parameters.

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

Hotjar is behavior analytics, not advertising. Gate the base tag on `analytics_storage` consent in opt-in jurisdictions. For Identify with personal context, require explicit user-data consent. Hotjar respects browser **Do Not Track**.

### Suppression

Hotjar suppresses user input by default. Numeric strings 9+ digits are always suppressed. Suppression changes are **not retroactive**.

| Mechanism | Effect |
|-----------|--------|
| `data-hj-suppress` attribute or class | Suppresses text and image/video content inside the element and its children |
| `data-hj-allow` attribute or class | Allows keystroke collection on supported form fields (not recursive) |
| Inline SVG | Cannot be suppressed via specific-element suppression |

Never use GTM to pass raw form-field values into Hotjar. Treat Hotjar suppression as defense-in-depth.

---

## 8. Cookies, Storage, SPA, Retention

**Cookies** are first-party. Key items: `_hjSessionUser_{site_id}` (365d), `_hjSession_{site_id}` (30min, extended on activity), plus `_hjUserAttributes` in local storage and `hjViewportId` in session storage. Hotjar does not track with cookies disabled. See: https://help.hotjar.com/hc/en-us/articles/36819973371409

**SPA**: fire `Hotjar - Base` on **All Pages / Page View only** — never History Change (conflicts with Hotjar's own SPA detection). Send Identify after URL changes; send Events on application dataLayer events.

**Retention**: Recordings 365 days; Heatmaps 365 days; Survey responses indefinite until deleted; identified users deleted after 365 days inactive; de-identified users after 3 months.

---

## 9. Debugging

- **Verify Installation** in Hotjar Sites page after publishing GTM (wait a few minutes).
- **DevTools Network**: filter `hotjar` — confirm `hotjar-{site_id}` loads and only one Site ID appears.
- **Debug Mode**: append `?hjDebug=1` to the URL; console logs base load, each `hj('event', ...)`, and each `hj('identify', ...)`.

---

## 10. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---------|--------|------------|
| Loading Hotjar via server-side GTM | Not supported | Client-side GTM only |
| Firing the base tag on History Change in SPA | Duplicate or missing scripts | Page View / All Pages only |
| Duplicate Hotjar installs (code + GTM) | Multiple Site IDs, broken tracking | Remove direct embeds; use one source |
| Events fire before `hj` queue exists | Calls dropped | Include the `window.hj` queue shim in every event tag |
| Sending PII in Event names | Privacy violation; events have no params | Stable, low-cardinality names only |
