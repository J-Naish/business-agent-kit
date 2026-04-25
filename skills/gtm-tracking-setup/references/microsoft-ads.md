# Microsoft Advertising / UET - GTM Implementation Manual

> Source of truth: [Universal Event Tracking (Microsoft Learn)](https://learn.microsoft.com/en-us/advertising/guides/universal-event-tracking) — entry point to UET tag setup, Conversion Goals, Audiences, and links to Microsoft Advertising Help Center setup articles.

---

## 1. Overview

Universal Event Tracking (UET) is Microsoft Advertising's tracking framework. A single UET tag installed sitewide drives:

- **Conversion tracking** for purchases, leads, signups, downloads, key page views, time on site, and pages-per-visit.
- **Remarketing lists / audience targeting**.
- **Automated bidding** optimization.
- **Dynamic remarketing** (product audiences) when retail/vertical parameters are sent.
- **Conversions API (CAPI)** server-side, which uses the same UET data model.

**Single-tag rule**: One UET tag can be used with all of an account's conversion goals and audiences. Multiple UET tags are only required when account structure, ownership, or specific server-side designs demand it.

Standard implementation pattern:

1. Create a UET tag in Microsoft Advertising.
2. Add the UET tag to every page (GTM: Base tag on All Pages).
3. Create conversion goals and/or remarketing lists in the UI.
4. For action-specific goals, send custom events from the page or server.

---

## 2. UET Tag Setup

### UET Tag ID

The numeric Microsoft Advertising identifier of the UET tag. It is the only required identifier for the GTM Base tag. Find it under conversion tracking / UET tag in the Microsoft Advertising UI.

### GTM template / Custom HTML options

| Option | When to use |
|---|---|
| **Microsoft Advertising UET GTM Community Template** | Preferred when the destination GTM container can install community templates |
| **Custom HTML** | Fallback when community templates cannot be approved, or when exporting GTM container JSON across environments (template IDs are environment-specific) |
| **Microsoft Advertising in-product GTM integration** | Available from the UET tag screen for some account configurations |

For Custom HTML, the canonical pattern initializes the `uetq` queue and loads the UET JavaScript:

```html
<script>
(function(w,d,t,r,u){
  var f,n,i;
  w[u]=w[u]||[],f=function(){
    var o={ti:"{{Const - UET Tag ID}}", enableAutoSpaTracking: true};
    o.q=w[u], w[u]=new UET(o);
  },
  n=d.createElement(t), n.src=r, n.async=1,
  n.onload=n.onreadystatechange=function(){
    var s=this.readyState;
    s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null);
  },
  i=d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n,i);
})(window,document,"script","//bat.bing.com/bat.js","uetq");
</script>
```

### Tags

| Tag Name | Type | Trigger | Consent |
|---|---|---|---|
| Microsoft Ads - UET Base | Microsoft UET (template) or Custom HTML | All Pages | ad_storage |
| Microsoft Ads - Event - purchase | Microsoft UET event | CE - purchase | ad_storage |
| Microsoft Ads - Event - generate_lead | Microsoft UET event | CE - generate_lead | ad_storage |
| Microsoft Ads - Event - sign_up | Microsoft UET event | CE - sign_up | ad_storage |
| Microsoft Ads - Event - add_to_cart | Microsoft UET event | CE - add_to_cart | ad_storage |
| Microsoft Ads - Event - begin_checkout | Microsoft UET event | CE - begin_checkout | ad_storage |
| Microsoft Ads - Event - view_item | Microsoft UET event | CE - view_item | ad_storage |

Configure tag sequencing so the Base tag fires before any event tag. The `uetq` array buffers pushes until `bat.js` loads, so sequencing is mostly a safety net.

---

## 3. Conversion Goals

UET collects page loads and custom events; goals evaluate that data. Conversion goals are defined in the Microsoft Advertising UI or the Campaign Management API.

### Goal Types

| Goal Type | API Object | Use Case | GTM Requirement |
|---|---|---|---|
| URL / Destination URL | `UrlGoal` | Thank-you / confirmation / key page | Base tag only |
| Event | `EventGoal` | Form submit, purchase, download, custom interaction | Base tag + custom event |
| Duration | `DurationGoal` | Time-on-site threshold | Base tag only |
| Pages viewed per visit | `PagesViewedPerVisitGoal` | Engagement count | Base tag only |
| Offline conversion | `OfflineConversionGoal` | Lead closes offline after web click | UET + msclkid capture + offline upload/API |
| App install | `AppInstallGoal` | App-install attribution | Specialized; rarely web GTM |
| In-store transaction | `InStoreTransactionGoal` | In-store purchase | Specialized; rarely web GTM |

### `GoalCategory` (EventGoal) — required as of June 2021

Supported enum values:

```
AddToCart, BeginCheckout, BookAppointment, Contact, GetDirections, Other,
OutboundClick, PageView, Purchase, RequestQuote, Signup, SubmitLeadForm, Subscribe
```

GA4 → Microsoft mapping:

| Site Event | `GoalCategory` |
|---|---|
| `purchase` | `Purchase` |
| `generate_lead` / contact form | `SubmitLeadForm` or `Contact` |
| `sign_up` | `Signup` |
| `subscribe` | `Subscribe` |
| `add_to_cart` | `AddToCart` |
| `begin_checkout` | `BeginCheckout` |
| quote request | `RequestQuote` |
| outbound link | `OutboundClick` |
| `book_appointment` | `BookAppointment` |
| store directions | `GetDirections` |
| key page view | `PageView` |
| anything else | `Other` |

### Counting (`CountType`)

| Value | Behavior | Recommended Use |
|---|---|---|
| `All` (default) | Every conversion after a click is counted | Sales, repeatable revenue events |
| `Unique` | One conversion per click is counted | Lead forms, signups, quote requests |

### Conversion Windows

| Field | Range | Default |
|---|---|---|
| `ConversionWindowInMinutes` (post-click) | 1 minute to 129,600 minutes (90 days) | 43,200 (30 days) |
| `ViewThroughConversionWindowInMinutes` | 1 minute to 43,200 minutes (30 days) | not returned by default |

View-through tracking additionally requires the account property `IncludeViewThroughConversions` to be true.

### `ExcludeFromBidding`

When `true`, the goal is excluded from `Conversions`/`ConversionRate`/`CostPerConversion`/`ReturnOnAdSpend`/`Revenue` columns and from automated-bidding calculations. The `All*` columns still include it. Use this for micro-conversions (`view_item`, `add_to_cart`) tracked for observation/audiences without polluting bidding.

### Enhanced conversions

Each goal exposes `IsEnhancedConversionsEnabled`. When enabled, hashed first-party identifiers (`em`, `ph`) sent via UET or CAPI improve match rates. See the [Microsoft Advertising Help Center](https://help.ads.microsoft.com/) for current field requirements and normalization rules (Microsoft's email/phone hashing rules differ from Google's and Meta's).

---

## 4. Custom Event Tracking (Client-side)

### Syntax

```javascript
window.uetq = window.uetq || [];
window.uetq.push('event', 'purchase', {
  event_category: 'ecommerce',
  event_label: 'order_complete',
  event_value: 1,
  revenue_value: 99.97,
  currency: 'USD',
  event_id: 'order-12345'
});
```

Key points:

- **Initialize the queue first** (`window.uetq = window.uetq || []`) so pushes that run before `bat.js` loads are buffered.
- The second positional argument is the **event action**; it is what an EventGoal's `ActionExpression` matches.
- `event_category` / `event_label` / `event_value` are the additional dimensions an EventGoal can match on.
- `event_id` is the **deduplication key** when both client-side UET and CAPI fire for the same logical event. Send the same value from both surfaces.
- **Required parameters for revenue events:** `revenue_value` and `currency`.

### Parameter naming

Use long-form (`event_category`, `event_label`, `event_value`, `event_id`) in new GTM implementations for readability. Short-form (`ec`, `ea`, `el`, `ev`) appears in older snippets.

### GA4 dataLayer event → UET action mapping

| GA4 event | UET action | Suggested category | Notes |
|---|---|---|---|
| `purchase` | `purchase` | `ecommerce` | Send `revenue_value` + `currency`; use `transaction_id` as `event_id` for CAPI dedup |
| `generate_lead` | `generate_lead` | `lead_generation` | Use form submission ID as `event_id` |
| `sign_up` | `sign_up` | `account` | |
| `subscribe` | `subscribe` | `subscription` | |
| `add_to_cart` | `add_to_cart` | `ecommerce` | |
| `begin_checkout` | `begin_checkout` | `ecommerce` | |
| `view_item` | `view_item` | `ecommerce` | Useful for product audiences |
| `view_item_list` | `view_item_list` | `ecommerce` | |
| `view_cart` | `view_cart` | `ecommerce` | |
| `search` | `search` | `ecommerce` | |
| `contact` (phone/email click) | `contact_click` | `contact` | |

### GTM Custom HTML example (Purchase)

```html
<script>
window.uetq = window.uetq || [];
window.uetq.push('event', 'purchase', {
  event_category: 'ecommerce',
  event_label: 'order_complete',
  event_value: 1,
  revenue_value: {{DLV - ecommerce.value}},
  currency: '{{DLV - ecommerce.currency}}',
  event_id: '{{DLV - ecommerce.transaction_id}}'
});
</script>
```

> Do not quote numeric GTM variables that should be sent as numbers. Sanitize/escape any user-controlled string injected into Custom HTML.

---

## 5. dataLayer Mapping (GA4-compatible)

Use a GA4-style ecommerce object so the same `dataLayer` drives Microsoft Ads, Google Ads, Meta, TikTok, and LinkedIn.

```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T-20260426-001',
    value: 99.97,
    currency: 'USD',
    items: [
      { item_id: 'SKU-001', item_name: 'Product A', price: 29.99, quantity: 2 }
    ]
  }
});
```

```javascript
dataLayer.push({
  event: 'generate_lead',
  form: {
    name: 'contact',
    submission_id: 'lead-20260426-001',
    lead_type: 'contact'
  }
});
```

GTM variables:

| Variable Name | Data Layer Key |
|---|---|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - form.name` | `form.name` |
| `DLV - form.submission_id` | `form.submission_id` |

> **Do not push raw email, phone, name, or address into a broadly shared `dataLayer`** — every tag in the container can read it. Handle PII server-side for enhanced conversions / CAPI.

---

## 6. Conversions API (CAPI) - Server-side

CAPI is Microsoft's server-to-server UET data path. Run it alongside the UET JavaScript (recommended) using a stable shared identifier (e.g., `transaction_id`) as `event_id` (client) / `eventId` (CAPI) for deduplication. CAPI is most often invoked from sGTM or a backend service; never store the bearer token client-side.

**Critical naming gotcha:** CAPI requires camelCase and different field names than client-side UET — e.g., `eventCategory` (not `event_category`), `value` (not `revenue_value`), `eventId` (not `event_id`). Microsoft's `em`/`ph` SHA-256 normalization rules (remove dots from email user portion, strip `+alias`, lowercase) also differ from Google's and Meta's.

For the full CAPI schema, endpoint, auth, batching limits, and field reference, see the [Microsoft Advertising Help Center](https://help.ads.microsoft.com/).

---

## 7. Microsoft Click ID (`msclkid`)

Auto-tagged onto landing pages after a click on a Microsoft Ad. Persist the **most recent** value per user for ~90 days (first-party cookie, local storage, or server-side store) and include it on every CAPI event for that user — without `msclkid`, conversion attribution is unreliable. Auto-tagging is enabled automatically when any UET goal is added/updated.

See [Microsoft Advertising Help Center](https://help.ads.microsoft.com/).

---

## 8. Offline Conversions

Use `OfflineConversionGoal` for lead-gen flows where the conversion is qualified offline (CRM lead → closed sale). Capture `msclkid` from the landing-page URL on submission, persist with timestamp/consent in the CRM, and after qualification upload via `ApplyOfflineConversions` with the original `msclkid` and a conversion timestamp within the configured window (default 30 days, max 90). Enhanced conversions are supported.

See [Microsoft Advertising Help Center](https://help.ads.microsoft.com/).

---

## 9. Consent

### GTM consent types

| Consent type | When required |
|---|---|
| `ad_storage` | All UET tags |
| `ad_user_data` | When sending hashed email/phone (enhanced conversions, CAPI userData) |
| `ad_personalization` | When the account uses remarketing / personalized audiences |

### CAPI `adStorageConsent`

| Value | Meaning |
|---|---|
| `G` | Granted (default if omitted) |
| `D` | Denied — events with `D` are not used for advertising or attribution |

For strict opt-in jurisdictions, suppress the entire UET base tag (do not load `bat.js`) until consent is obtained, rather than relying solely on the consent signal.

---

## 10. Debugging

| Tool | What to verify |
|---|---|
| **GTM Preview Mode** | Tag firing order (Base → Event), variable values, that the UET Tag ID and event parameters resolve correctly |
| **UET Tag Helper** (Edge/Chrome extension) | UET tag detection, page-load and custom-event payloads, validation errors |
| **Microsoft Advertising UET diagnostics** | Tag status (`Active`/`Receiving traffic`), recent events, conversion counts |
| **DevTools Network** | Filter for `bat.bing.com` (client) or `capi.uet.microsoft.com` (CAPI); inspect payload and HTTP status |

> Reporting can lag several hours — do not troubleshoot conversion counts from a 30-minute window. CAPI: `400` responses include `error.details[]`; a single invalid event rejects the whole batch unless `continueOnValidationError: true` is set.

---

## 11. Best Practices and Common Pitfalls

- **Run UET (browser) + CAPI (server) together** for high-value events, with a shared `event_id`/`eventId` (e.g., transaction ID) for deduplication.
- **One UET tag per site** — the single-tag rule. Multiple tags should be the exception.
- **Retain `msclkid` for 90 days**, overwrite with the most recent value, and include it on every CAPI event.
- **Do not confuse client-side snake_case with CAPI camelCase** — `event_category`/`revenue_value` only work in the browser; CAPI requires `eventCategory`/`value`.
- **Never store the CAPI bearer token client-side** — it belongs in server-side environments or sGTM only. Never push raw PII into the `dataLayer`.
