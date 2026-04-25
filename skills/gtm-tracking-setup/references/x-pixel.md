# X Pixel - GTM Implementation Manual

> Source of truth: [X for Business Help Center](https://business.x.com/en/help) — entry point to Pixel, Conversion API, and campaign measurement docs.

---

## 1. Event & Parameter Reference

### Standard Events

| Event Name | Example Use Case |
|-----------|-------|
| **Page View** | All pages (Base Code; create event in Events Manager to use as conversion) |
| **Purchase** | Purchase completion |
| **Lead** | Inquiry completion, document request |
| **Sign Up** | Account creation (verify in Events Manager) |
| **Add to Cart** | Add to cart |
| **Add to Wishlist** | Add to wishlist |
| **Checkout Initiated** | Transition to checkout page |
| **Content View** | Product detail page |
| **Added Payment Info** | Payment information entered |
| **Search** | On-site search |
| **Subscribe** | Subscription / newsletter signup |
| **Start Trial** | Free trial signup |
| **Download** | File / app download |
| **Product Customization** | Product option selection |
| **Custom** | Other actions |

### Event Parameters

| Parameter | Type | Description |
|-----------|------|------|
| `value` | Number | Conversion value |
| `currency` | String | ISO 4217 currency code (e.g. `'USD'`) |
| `conversion_id` | String | Unique deduplication ID (e.g. order ID) |
| `search_string` | String | On-site search query |
| `description` | String | Additional event description |
| `status` | String | `'started'` or `'completed'` |
| `contents` | Array | Array of product details (see below) |
| `num_items` | Number | Top-level total quantity |
| `email_address` | String | Email (X applies SHA256. **CAPI recommended**) |
| `phone_number` | String | Phone in E.164 format (**CAPI recommended**) |
| `restricted_data_use` | String | `'restrict_optimization'` or `'off'` |

### contents Array

| Parameter | Type | Description |
|-----------|------|------|
| `content_type` | String | Product category (Google taxonomy) |
| `content_id` | String | SKU or GTIN |
| `content_name` | String | Product name |
| `content_price` | Number | Unit price |
| `num_items` | Number | Quantity |
| `content_group_id` | String | Variant group ID |

---

## 2. GTM Configuration

### Prerequisites

- **Pixel ID** and per-event **Event IDs** (`tw-XXXXX-YYYYY`) from X Ads Events Manager
- Use GTM community templates **Twitter Base Pixel** and **Twitter Event Pixel**

### Tags

| Tag Name | Template | Trigger | Consent |
|--------|------------|---------|------|
| X Pixel - Base | Twitter Base Pixel | All Pages | ad_storage |
| X Pixel - Purchase | Twitter Event Pixel | CE - purchase | ad_storage |
| X Pixel - Lead | Twitter Event Pixel | CE - generate_lead | ad_storage |
| X Pixel - SignUp | Twitter Event Pixel | CE - sign_up | ad_storage |
| X Pixel - Add to Cart | Twitter Event Pixel | CE - add_to_cart | ad_storage |
| X Pixel - Content View | Twitter Event Pixel | CE - view_item | ad_storage |

Configure **tag sequencing** for all event tags: fire `X Pixel - Base` first.

### Per-Event Parameter Mapping

| Event | Mapping |
|---------|----------|
| **Purchase** | value → `{{DLV - ecommerce.value}}`, currency → `{{DLV - ecommerce.currency}}`, conversion_id → `{{DLV - ecommerce.transaction_id}}`, contents → `{{cjs - X Pixel Contents}}` |
| **Lead** | conversion_id → `{{DLV - form.submission_id}}` |
| **SignUp** | status → `completed` |
| **Add to Cart** | contents → `{{cjs - X Pixel Contents}}` |
| **Content View** | contents → `{{cjs - X Pixel Contents}}` |

> **Pre-purchase events**: For Add to Cart / Checkout Initiated, **do not map** `value` / `currency` / `conversion_id` (prevents unintended revenue attribution). Send only `contents`.

### Variables

**Constant variables**:

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

**Custom JS Variable** (GA4 items → X Pixel contents):

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

Use a **stable ID** (e.g. order ID; not `Date.now()` or random). Only Page View-type events are auto-deduplicated by X (~30 min). For Purchase/Lead/etc., `conversion_id` is the **primary deduplication mechanism between Pixel and CAPI** — send the same value from both.

### Consent Management

No native consent mode. Add `ad_storage` as an additional consent check on all X Pixel tags; do not fire until `ad_storage: granted`.

### PII (Email / Phone)

Client-side dataLayer submission risks leaking to other tags. **Server-side via CAPI is strongly recommended.**

### SPA Environments

Base Code runs once on initial load. Fire route-change events (Content View, etc.) via the GTM History Change trigger.

### DPA Requirements

Page View / Content View / Add to Cart / Purchase required. `contents` required on all; Purchase additionally needs `value` / `currency`. Physical products only.

---

## 4. Conversion API (CAPI)

Use a server-side custom tag (Stape or self-hosted sGTM) to send server events alongside Pixel, deduplicated via `conversion_id`. Authentication is OAuth 1.0a from the X Developer Portal (CAPI access may require X sales approval). Real-time test mode is unsupported (12-24h reflection). See [Conversion API reference](https://developer.x.com/en/docs/x-ads-api/measurement/web-conversions/conversion-api).

---

## 5. Debugging

| Tool | What to Verify |
|--------|---------|
| **GTM Preview Mode** | Tag firing order, variable values |
| **X Pixel Helper** | Pixel detection, parameters, errors |
| **Events Manager** | Status (up to 24h reflection) |
