# TikTok Pixel - GTM Implementation Manual

> Source of truth: [TikTok for Business Developers Portal](https://business-api.tiktok.com/portal/docs) — entry point to Pixel, Events API, and Advanced Matching docs.

---

## 1. Event & Parameter Reference

### Standard Events

> **PageView**: Separate from standard events. Fires automatically via `ttq.page()` in the Base Code (handled by the Base tag, All Pages trigger).

| Event Name | Example Use Case |
|-----------|-------|
| **ViewContent** | Product detail pages, article pages |
| **Search** | On-site search |
| **AddToCart** | Add to cart |
| **AddToWishlist** | Add to wishlist |
| **InitiateCheckout** | Transition to checkout page |
| **AddPaymentInfo** | Payment information entry completed |
| **Purchase** | Purchase completed (former names: CompletePayment / PlaceAnOrder) |
| **Lead** | Lead acquisition / form submission (former name: SubmitForm) |
| **CompleteRegistration** | Registration completed |
| **Contact** | Inquiry (including phone click) |
| **Download** | File download |
| **Subscribe** | Subscription / newsletter signup |
| **StartTrial** | Trial started |
| **Schedule** | Booking confirmation |
| **SubmitApplication** | Application form submission |
| **ApplicationApproval** | Application approved |
| **FindLocation** | Store search |
| **CustomizeProduct** | Product customization |

> **Event name migration**: CompletePayment→Purchase, SubmitForm→Lead (legacy names still auto-converted). ClickButton, PlaceAnOrder are soft-deprecated until 2027. Use the new names for new implementations.
> **Login**: Confirm in the current TikTok Ads Manager / developer docs before using as a standard web event; it is not listed in the current public supported-standard-events table.

### Event Parameters

| Parameter | Type | Description |
|-----------|------|------|
| `value` | Number | Total order amount (always send with `currency`. Required for ROAS / VBO) |
| `currency` | String | ISO 4217 currency code (e.g., `'USD'`) |
| `content_id` | String | Product ID (must match catalog SKU; required for DPA) |
| `content_ids` | Array | Multiple product IDs |
| `content_type` | String | `'product'` or `'product_group'` (required for DPA) |
| `content_name` | String | Product / page name |
| `content_category` | String | Product category |
| `contents` | Array | Array of product details (see below) |
| `price` | Number | Unit price (`value` = total, `price` = per-unit) |
| `quantity` | Integer | Quantity |
| `search_string` | String | On-site search query |
| `description` | String | Additional description |
| `status` | String | Status |
| `order_id` | String | Order ID |
| `num_items` | Integer | Number of items |

> **event_id**: Unique identifier in the **configuration object (third argument)**, not in event parameters. Required for deduplication when used with the Events API. Set via the GTM template's dedicated field.

### contents Array

| Parameter | Type | Description |
|-----------|------|------|
| `content_id` | String | Product ID (must match catalog SKU, case-sensitive) |
| `content_type` | String | `'product'` or `'product_group'` |
| `content_name` | String | Product name |
| `content_category` | String | Category |
| `price` | Number | Unit price |
| `quantity` | Integer | Quantity |
| `brand` | String | Brand name |

---

## 2. GTM Configuration

### Prerequisites

- **Pixel ID** obtained from TikTok Ads Manager > Events Manager
- **Recommended**: automatic setup from Events Manager > Settings > Partner Platform > Google Tag Manager
- **Manual**: Place the Base Code (`ttq.load()` + `ttq.page()`) in a Custom HTML tag, and use the GTM community template "**TikTok Pixel**" for events

### Tags

| Tag Name | Template | Trigger | Consent |
|--------|------------|---------|------|
| TikTok Pixel - Base | Custom HTML (Base Code) or auto-setup | All Pages | ad_storage |
| TikTok Pixel - Purchase | TikTok Pixel | CE - purchase | ad_storage |
| TikTok Pixel - Lead | TikTok Pixel | CE - generate_lead | ad_storage |
| TikTok Pixel - CompleteRegistration | TikTok Pixel | CE - sign_up | ad_storage |
| TikTok Pixel - AddToCart | TikTok Pixel | CE - add_to_cart | ad_storage |
| TikTok Pixel - ViewContent | TikTok Pixel | CE - view_item | ad_storage |
| TikTok Pixel - InitiateCheckout | TikTok Pixel | CE - begin_checkout | ad_storage |

Configure **tag sequencing** for all event tags: fire `TikTok Pixel - Base` first.

### Parameter Mapping per Event

| Event | Mapping |
|---------|----------|
| **Purchase** | value → `{{DLV - ecommerce.value}}`, currency → `{{DLV - ecommerce.currency}}`, event_id → `{{DLV - ecommerce.transaction_id}}`, contents → `{{cjs - TikTok Pixel Contents}}` |
| **Lead** | event_id → `{{DLV - form.submission_id}}` |
| **CompleteRegistration** | status → `completed` |
| **AddToCart** | contents → `{{cjs - TikTok Pixel Contents}}` |
| **ViewContent** | contents → `{{cjs - TikTok Pixel Contents}}` |
| **InitiateCheckout** | contents → `{{cjs - TikTok Pixel Contents}}`, value → `{{DLV - ecommerce.value}}`, currency → `{{DLV - ecommerce.currency}}` |

### Variables

**Constant Variables**:

| Variable Name | Value |
|--------|---|
| `TikTok Pixel ID` | (Pixel ID) |

**Data Layer Variables**:

| Variable Name | Data Layer Variable Name |
|--------|-------------------|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - form.submission_id` | `form.submission_id` |

**Custom JavaScript Variable** (GA4 items → TikTok contents):

```javascript
// Variable name: cjs - TikTok Pixel Contents
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (!ecommerce || !ecommerce.items) return [];
  return ecommerce.items.map(function(item) {
    return {
      content_id: item.item_id || '',
      content_type: 'product',
      content_name: item.item_name || '',
      content_category: item.item_category || '',
      price: item.price || 0,
      quantity: item.quantity || 1
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
| CE - begin_checkout | Custom Event | `begin_checkout` |

> Custom event names are **case-sensitive**. They must exactly match the dataLayer `event` value.

---

## 3. TikTok Pixel-Specific Considerations

### event_id and Deduplication

Deduplication uses **event_source_id** (Pixel ID) + **event** + **event_id** within ~48 hours. Use a **stable ID** (e.g. order ID) and send the **same `event_id`** from both Pixel and Events API.

### Consent Management

No TikTok-native consent mode. Use GTM consent settings:
- Add `ad_storage` as an additional consent check on all TikTok tags (including Base)
- For strict GDPR opt-in, block the Base tag from firing until consent (since `ttq.load()` fetches scripts and sets cookies)

### Advanced Matching (PII)

Hashed PII (email, phone, external_id) sent via `ttq.identify()` or the GTM template's dedicated fields. Hashed parameter names use the `sha256_*` prefix (e.g., `sha256_email`, `sha256_phone_number`, `sha256_external_id`). See [Advanced Matching docs](https://business-api.tiktok.com/portal/docs?id=1739585702090754).

> **PII warning**: Client-side raw PII risks leakage to other tags. Send pre-hashed values, or **use the Events API server-side**.

### EMQ (Event Match Quality)

Score 0-10 in Events Manager. Target 6.0+. Improve via hashed email + phone + external_id + ttclid + _ttp + Events API.

### Custom Events

Use for tracking outside standard events (reporting only). **Use standard events for optimization.**

### SPA Environments

Auto-detection of URL changes within SPA varies by environment. If unreliable, fire route-change events (e.g. ViewContent) via the GTM History Change trigger. **Watch for double-firing.**

### Catalog / DPA Requirements

ViewContent, AddToCart, Purchase required. All need `content_id` (matching catalog SKU, case-sensitive) + `content_type`. Purchase additionally needs `value` + `currency`. Including top-level `content_ids` / `content_type` alongside `contents` improves shopping ad compatibility.

### Cookies

The Pixel sets the `_ttp` first-party cookie and captures `?ttclid=` from URLs. Forward both to the Events API server-side at conversion time to improve match quality.

---

## 4. Events API

Use the GTM server-side template [tiktok/gtm-template-eapi](https://github.com/tiktok/gtm-template-eapi) (sGTM) for server-side events alongside Pixel, deduplicated via `event_id`. Authentication is via Access Token from Events Manager. See [Events API docs](https://business-api.tiktok.com/portal/docs?id=1741601162187777).

---

## 5. Debugging

| Tool | What to Verify |
|--------|---------|
| **GTM Preview Mode** | Tag firing order, variable values |
| **TikTok Pixel Helper** | Pixel detection, parameters, errors |
| **Test Events** (Events Manager) | Real-time event reception (use `test_event_code` for Events API) |
