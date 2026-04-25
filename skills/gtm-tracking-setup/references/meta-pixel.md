# Meta Pixel - GTM Implementation Manual

> Source of truth: [Meta Pixel developer docs](https://developers.facebook.com/docs/meta-pixel/) — entry point to Standard Events, Advanced Matching, Conversions API, and consent docs.

---

## 1. Event and Parameter Reference

### Standard Events

| # | Event Name | Use Case | Required Parameters |
|---|-----------|-------|-------------|
| 1 | **PageView** | All pages (fired on every page as the Base tag in templates) | None |
| 2 | **ViewContent** | Product detail, content view | Recommended: `content_ids`, `value`, `currency` |
| 3 | **Search** | On-site search | Recommended: `search_string` |
| 4 | **AddToCart** | Add to cart | Recommended: `content_ids`, `value`, `currency` |
| 5 | **AddToWishlist** | Add to wishlist | None |
| 6 | **InitiateCheckout** | Start checkout | Recommended: `value`, `currency`, `num_items` |
| 7 | **AddPaymentInfo** | Payment info entered | None |
| 8 | **Purchase** | Purchase completed | **`value` (required), `currency` (required)** (needed for optimization, ROAS measurement, and DPA. Missing values prevent the event from being used for optimization.) |
| 9 | **Lead** | Lead acquisition | Recommended: `value`, `currency` |
| 10 | **CompleteRegistration** | Registration completed | None |
| 11 | **Contact** | Inquiry / contact | None |
| 12 | **CustomizeProduct** | Product customization | None |
| 13 | **Donate** | Donation | None |
| 14 | **FindLocation** | Store / location search | None |
| 15 | **Schedule** | Booking / appointment | None |
| 16 | **StartTrial** | Free trial started | Recommended: `value`, `currency` |
| 17 | **SubmitApplication** | Application submitted | None |
| 18 | **Subscribe** | Paid subscription started | Recommended: `value`, `currency` |

### Event Parameters

| Parameter | Type | Description |
|-----------|------|------|
| `value` | Float | Monetary amount (**must be sent as a number; strings are not allowed**. Always paired with `currency`.) |
| `currency` | String | ISO 4217 currency code (e.g. `'USD'`) |
| `content_name` | String | Product or content name |
| `content_category` | String | Category |
| `content_ids` | Array[String] | Array of product IDs (must match the catalog product IDs; required for DPA) |
| `content_type` | String | `'product'` (per SKU) or `'product_group'` (group including variants) |
| `contents` | Array[Object] | Array of product detail objects (see table below) |
| `num_items` | Integer | Number of items |
| `predicted_ltv` | Float | Predicted LTV (used for Subscribe and StartTrial) |
| `search_string` | String | Search keyword (used in Search event) |
| `status` | Boolean | Registration status, etc. (`true` / `false`) |

> **eventID**: A unique identifier specified in the **options object (4th argument)** rather than the event parameters (3rd argument): `fbq('track', 'Purchase', {params}, {eventID: '...'})`. Required for deduplication when used with CAPI. In the GTM template, set it via the "Event ID" field.

### contents array

| Parameter | Type | Description |
|-----------|------|------|
| `id` | String | Product ID (must match the catalog ID; required for DPA) |
| `quantity` | Integer | Quantity |
| `item_price` | Float | Unit price |

---

## 2. GTM Configuration

### Prerequisites

- A **Pixel ID** has been obtained in Meta Events Manager
- Use the GTM community template "**Facebook Pixel**" (template name may change in the gallery)
- Because the template internally handles loading `fbevents.js` and initialization (`fbq('init', ...)`), **a Custom HTML Base Code is not required**

### Key Template Configuration Options

| Setting | Description |
|---|---|
| **Pixel ID** | Meta Pixel ID (multiple IDs can be comma-separated) |
| **Event Name** | Standard event name or custom event name (variables can also be used) |
| **Object Properties** | Event parameters (table or JS variable) |
| **Event ID** | Unique identifier for deduplication (required when integrating with CAPI) |
| **Advanced Matching** | Enables sending of user data (email, phone, etc.) |
| **Consent Granted** | When `false`, only loads the SDK and stops sending data |
| **Enhanced Ecommerce** | Auto-maps the DataLayer ecommerce object |
| **Disable Automatic Configuration** | Disables automatic collection of button clicks and metadata |

### Tags

| Tag Name | Template | Trigger | Consent |
|--------|------------|---------|------|
| Meta Pixel - PageView | Facebook Pixel | All Pages | ad_storage |
| Meta Pixel - Purchase | Facebook Pixel | CE - purchase | ad_storage |
| Meta Pixel - Lead | Facebook Pixel | CE - generate_lead | ad_storage |
| Meta Pixel - CompleteRegistration | Facebook Pixel | CE - sign_up | ad_storage |
| Meta Pixel - AddToCart | Facebook Pixel | CE - add_to_cart | ad_storage |
| Meta Pixel - ViewContent | Facebook Pixel | CE - view_item | ad_storage |
| Meta Pixel - InitiateCheckout | Facebook Pixel | CE - begin_checkout | ad_storage |

Configure **tag sequencing** for all event tags: fire `Meta Pixel - PageView` first as a safety net for reliable Pixel initialization.

### Per-Event Parameter Mapping

| Event | Mapping |
|---------|----------|
| **Purchase** | value -> `{{DLV - ecommerce.value}}`, currency -> `{{DLV - ecommerce.currency}}`, Event ID -> `{{DLV - ecommerce.transaction_id}}`, content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}` |
| **Lead** | Event ID -> `{{DLV - form.submission_id}}` |
| **CompleteRegistration** | status -> `true` |
| **AddToCart** | content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}` |
| **ViewContent** | content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}` |
| **InitiateCheckout** | content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}`, value -> `{{DLV - ecommerce.value}}`, currency -> `{{DLV - ecommerce.currency}}` |

### Variables

**Constant variables**:

| Variable Name | Value |
|--------|---|
| `Meta Pixel ID` | (Pixel ID) |

**Data Layer variables**:

| Variable Name | Data Layer Variable Name |
|--------|-------------------|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - form.submission_id` | `form.submission_id` |

**Custom JS variables** (GA4 items -> Meta Pixel conversion):

```javascript
// Variable name: cjs - Meta Pixel Contents
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (!ecommerce || !ecommerce.items) return [];
  return ecommerce.items.map(function(item) {
    return {
      id: item.item_id || '',
      quantity: item.quantity || 1,
      item_price: Number(item.price || 0)
    };
  }).filter(function(x) { return x.id; });
}
```

```javascript
// Variable name: cjs - Meta Pixel Content IDs
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (!ecommerce || !ecommerce.items) return [];
  return ecommerce.items.map(function(item) {
    return item.item_id || '';
  }).filter(Boolean);
}
```

### Triggers

| Trigger Name | Type | Condition |
|-----------|------|------|
| All Pages | Page View | All pages |
| CE - purchase | Custom Event | `purchase` |
| CE - generate_lead | Custom Event | `generate_lead` |
| CE - sign_up | Custom Event | `sign_up` |
| CE - add_to_cart | Custom Event | `add_to_cart` |
| CE - view_item | Custom Event | `view_item` |
| CE - begin_checkout | Custom Event | `begin_checkout` |

> Custom event names are **case-sensitive**. They must exactly match the dataLayer `event` value.

---

## 3. Meta Pixel-Specific Considerations

### eventID and Deduplication

Deduplication uses matching **event_name** + **eventID** within ~48 hours. Use a **stable ID** (e.g. order ID), and send the same value from both Pixel (`eventID`, camelCase, options arg) and CAPI (`event_id`, snake_case, JSON field). The DataLayer field name is arbitrary (e.g. `meta_event_id`); only names differ across layers, the value must be identical.

### AEM (Aggregated Event Measurement)

Protocol for iOS 14.5+ ATT compliance. Specs change frequently — treat the current Events Manager UI as the source of truth for whether AEM tab, event prioritization, and domain verification are required. See [docs](https://developers.facebook.com/docs/marketing-api/aggregated-event-measurement).

### Domain Verification

Configure under Business Manager > Business Settings > Brand Safety > Domains via DNS TXT (recommended) or HTML meta tag. See [docs](https://developers.facebook.com/docs/sharing/domain-verification).

### Consent Management

- Add `ad_storage` as an Additional Consent Check on every Meta Pixel tag. Tags will not fire until `ad_storage: granted`.
- The template's "Consent Granted" setting integrates with Meta Consent Mode.
- For strict GDPR opt-in, avoid loading `fbevents.js` itself until consent is obtained.

### Advanced Matching

Send hashed user data (email, phone, etc.) to improve match rates. Configure in the **Advanced Matching** section of the GTM template. The Pixel applies SHA-256 hashing automatically. See [docs](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching) for the full parameter list (em, ph, fn, ln, ge, db, ct, st, zp, country, external_id).

> **PII warning**: Do not push raw email/phone to the DataLayer before consent (leakage risk via other tags). **Server-side via CAPI is strongly recommended.**

### EMQ (Event Match Quality)

Score 0-10 per event in Events Manager (updated every 48 hours). Target 8+. Email is the highest-impact identifier; phone, `_fbp`, `_fbc`, and `external_id` are also high-priority. See [docs](https://www.facebook.com/business/help/765081237991954).

### Custom Events and Custom Conversions

`fbq('trackCustom', 'EventName', {...})` for custom events; **prefer standard events** for optimization. Custom conversions are rule-based (URL or event filters) defined in Events Manager, no code change.

### SPA Environments

Load `fbevents.js` once on initial load. For route-change events (e.g. ViewContent, additional PageView), fire via the GTM History Change trigger.

### Cookies

| Cookie Name | Lifetime | Purpose |
|-----------|---------|------|
| `_fbp` | ~3 months | First-party browser identifier |
| `_fbc` | ~3 months | Stores `fbclid` from ad clicks |

First-party cookies; persist in environments restricting third-party cookies. When using CAPI, forward `_fbp`/`_fbc` to the server to improve match quality.

### Dynamic Ads (DPA) / Catalog

ViewContent, AddToCart, Purchase required, all with `content_ids` (matching catalog) and `content_type`; Purchase additionally requires `value`/`currency`. See [docs](https://www.facebook.com/business/help/1275400645914358).

---

## 4. Conversions API (CAPI)

Use the GTM server-side template "**Facebook Conversions API**" (sGTM) to send server-side events alongside Pixel, deduplicated via `event_id`. Forward client events to the server (e.g. via GA4 Client) and map them to the CAPI tag with the same `eventID` value used by the Pixel. See [Conversions API docs](https://developers.facebook.com/docs/marketing-api/conversions-api).

---

## 5. Debugging

| Tool | What to Check |
|--------|---------|
| **GTM Preview Mode** | Tag firing order, variable values |
| **Meta Pixel Helper** | Pixel events / parameters / errors (browser only) |
| **Test Events** (Events Manager) | Real-time Pixel + CAPI reception |
