# X Pixel - GTM Implementation Manual

> Always check the latest specifications at [Conversion Tracking for Websites](https://business.x.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites).

---

## 1. Event & Parameter Reference

### Standard Events

| Event Name | Example Use Case |
|-----------|-------|
| **Page View** | All pages (visits are measured by installing the Base Code. To use as a conversion, an event must be created in Events Manager) |
| **Purchase** | Purchase completion |
| **Lead** | Inquiry completion, document request |
| **Sign Up** | Account creation completion (verify availability in Events Manager. If unavailable, substitute with Lead / Subscribe, etc.) |
| **Add to Cart** | Add to cart |
| **Add to Wishlist** | Add to wishlist |
| **Checkout Initiated** | Transition to checkout page |
| **Content View** | Product detail page |
| **Added Payment Info** | Payment information entry completion |
| **Search** | On-site search |
| **Subscribe** | Subscription / newsletter signup |
| **Start Trial** | Free trial signup |
| **Download** | File / app download |
| **Product Customization** | Product option selection |
| **Custom** | Actions that do not match the above |

### Event Parameters

| Parameter | Type | Description |
|-----------|------|------|
| `value` | Number | Conversion value |
| `currency` | String | ISO 4217 currency code (e.g. `'USD'`) |
| `conversion_id` | String | Unique ID for deduplication (e.g. order ID) |
| `search_string` | String | On-site search query |
| `description` | String | Additional event description |
| `status` | String | `'started'` or `'completed'` |
| `contents` | Array | Array of product details (see table below) |
| `num_items` | Number | Total quantity of items (separate from `num_items` inside `contents`. Top-level = overall total) |
| `email_address` | String | Email address (hashed to SHA256 by X. **CAPI submission recommended**) |
| `phone_number` | String | Phone number (E.164 format. **CAPI submission recommended**) |
| `restricted_data_use` | String | `'restrict_optimization'` or `'off'` |

### contents Array

| Parameter | Type | Description |
|-----------|------|------|
| `content_type` | String | Product category (Google taxonomy compliant) |
| `content_id` | String | SKU or GTIN |
| `content_name` | String | Product name |
| `content_price` | Number | Unit price |
| `num_items` | Number | Quantity |
| `content_group_id` | String | Variant group ID |

---

## 2. GTM Configuration

### Prerequisites

- **Pixel ID** and each **Event ID** (`tw-XXXXX-YYYYY` format) have been obtained from X Ads Events Manager
- Use the GTM community templates **Twitter Base Pixel** and **Twitter Event Pixel** (template names may change in the gallery; verify the latest names)

### Tags

| Tag Name | Template | Trigger | Consent |
|--------|------------|---------|------|
| X Pixel - Base | Twitter Base Pixel | All Pages | ad_storage |
| X Pixel - Purchase | Twitter Event Pixel | CE - purchase | ad_storage |
| X Pixel - Lead | Twitter Event Pixel | CE - generate_lead | ad_storage |
| X Pixel - SignUp | Twitter Event Pixel | CE - sign_up | ad_storage |
| X Pixel - Add to Cart | Twitter Event Pixel | CE - add_to_cart | ad_storage |
| X Pixel - Content View | Twitter Event Pixel | CE - view_item | ad_storage |

Configure **tag sequencing** for all event tags: Advanced Settings > Tag Sequencing > fire `X Pixel - Base` first.

### Per-Event Parameter Mapping

| Event | Mapping |
|---------|----------|
| **Purchase** | value → `{{DLV - ecommerce.value}}`, currency → `{{DLV - ecommerce.currency}}`, conversion_id → `{{DLV - ecommerce.transaction_id}}`, contents → `{{cjs - X Pixel Contents}}` |
| **Lead** | conversion_id → `{{DLV - form.submission_id}}` |
| **SignUp** | status → `completed` |
| **Add to Cart** | contents → `{{cjs - X Pixel Contents}}` |
| **Content View** | contents → `{{cjs - X Pixel Contents}}` |

### Variables

**Constant variables** (centrally manage Pixel ID and Event IDs):

| Variable Name | Value |
|--------|---|
| `X Pixel ID` | (Pixel ID) |
| `X Event ID - Purchase` | (Event ID) |
| `X Event ID - Lead` | (Event ID) |
| `X Event ID - SignUp` | (Event ID) |
| `X Event ID - AddToCart` | (Event ID) |
| `X Event ID - ContentView` | (Event ID) |

**Data Layer Variables**:

| Variable Name | Data Layer Variable Name |
|--------|-------------------|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - form.submission_id` | `form.submission_id` |

**Custom JS Variable** (GA4 items → X Pixel contents conversion):

```javascript
// Variable name: cjs - X Pixel Contents
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (!ecommerce || !ecommerce.items) return [];
  return ecommerce.items.map(function(item) {
    return {
      content_id: item.item_id || '',
      content_name: item.item_name || '',
      content_price: item.price || 0,
      num_items: item.quantity || 1,
      content_type: item.item_category || 'product'
    };
  });
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

> Custom event names are **case-sensitive**. They must exactly match the dataLayer `event` value.

---

## 3. X Pixel-Specific Considerations

### conversion_id and Deduplication

- Use a **stable ID** (e.g. order ID). `Date.now()` or random values are not acceptable
- Only Page View-type events are automatically deduplicated on X's side (approximate window: ~30 minutes; verify the official spec). **Other events (Purchase / Lead, etc.) are not automatically deduplicated by X**
- The primary role of `conversion_id` is **deduplication between Pixel and CAPI**. When using both, send the **same `conversion_id`** in both

### Parameter Restrictions for Pre-Purchase Events

For Add to Cart, Checkout Initiated, etc., **do not map** `value` / `currency` / `conversion_id` (to prevent unintended revenue attribution). Send only `contents`.

### Consent Management

X Pixel does not have its own Consent Mode. Control via GTM consent settings:
- Add **`ad_storage`** as an additional consent check on all X Pixel tags
- Via CMP integration, do not fire until `ad_storage: granted`

### PII (Email / Phone Number)

Client-side submission via dataLayer carries the risk of leaking to other tags. **Server-side submission via CAPI is strongly recommended**.

### SPA Environments

- The Base Code runs **only once** on initial load. Do not re-run it on every routing change
- Events on route changes (Content View, etc.) require a separate firing design via the History Change trigger or similar

---

## 4. Conversion API (CAPI)

X-recommended hybrid setup: use Pixel (client) + CAPI (server) together, deduplicating with `conversion_id`.

### Required Identifiers for CAPI (at least one)

| Identifier | Match Accuracy |
|--------|-----------|
| Click ID (twclid) | Highest |
| Email address (SHA256) | High |
| Phone number (SHA256, E.164) | High |

**twclid integration**: The Pixel automatically captures `?twclid=XXX` from the URL or 1st-party cookies. On the CAPI side, store it server-side at landing time and send it at conversion time.

### CAPI Parameters

| Parameter | Required | Description |
|---|---|---|
| `conversion_time` | Required | ISO 8601 timestamp |
| `event_id` | Required | Event ID from Events Manager |
| `conversion_id` | Required when used with Pixel | Deduplication ID |
| `identifiers` | Required (at least one) | twclid / hashed_email / hashed_phone_number |
| `value` / `price_currency` / `contents` | Optional | Same concepts as Pixel, but field names may differ. Follow the [API reference](https://developer.x.com/en/docs/x-ads-api/measurement/web-conversions/conversion-api) |

### sGTM

- Authentication: **OAuth 1.0a** (Consumer Key/Secret + OAuth Token/Secret) → obtain from the X Developer Portal
- Requires an X Developer Account. CAPI applications may require sales approval from X
- **Real-time testing is not supported** (12-24 hours for reflection)
- Implementation: Stape custom tag (easy) or self-hosted (full control)

---

## 5. Debugging

| Tool | What to Verify |
|--------|---------|
| **GTM Preview Mode** | Tag firing order (Base→Event), variable values |
| **X Pixel Helper** (Chrome extension) | Pixel detection, parameters, errors |
| **DevTools Network** | Requests to X-related domains (`ads-twitter.com`, etc.) |
| **Events Manager** | Status verification (up to 24 hours for reflection) |

---

## 6. Reference Links

- [X Business - Conversion Tracking](https://business.x.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites)
- [X Business - Pixel Helper](https://business.x.com/en/help/campaign-measurement-and-analytics/pixel-helper)
- [X Business - Restricted Data Use](https://business.x.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites/restricted-data-use-guide)
- [X Developer - Conversion API](https://developer.x.com/en/docs/x-ads-api/measurement/web-conversions/conversion-api)

### Additional Requirements for DPA

The four events Page View / Content View / Add to Cart / Purchase are required. `contents` is required on all events; Purchase additionally requires `value` / `currency`. Email submission is also recommended (verify). **Physical products only** are supported.
