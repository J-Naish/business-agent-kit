# Snap Pixel - GTM Implementation Manual

> Source of truth: [Snap Conversions API — Introduction](https://developers.snap.com/api/marketing-api/Conversions-API/Introduction) — entry point to Getting Started, Parameters, Pixel integration, Offline Events, Verify Setup, and Best Practices.

---

## 1. Event and Parameter Reference

### Standard Events

Snap event names are uppercase, snake_case. The same names are used by both the Pixel and the Conversions API.

| # | Event Name | Use Case |
|---|---|---|
| 1 | `PAGE_VIEW` | Base page visit (fired on every page) |
| 2 | `VIEW_CONTENT` | Product / content detail view |
| 3 | `LIST_VIEW` | Category / list page browsing |
| 4 | `SEARCH` | On-site search |
| 5 | `ADD_CART` | Add to cart |
| 6 | `ADD_TO_WISHLIST` | Wishlist / save |
| 7 | `START_CHECKOUT` | Checkout started |
| 8 | `ADD_BILLING` | Billing / payment info added |
| 9 | `PURCHASE` | Purchase completed (`currency` + `value` required) |
| 10 | `SIGN_UP` | Account / service signup |
| 11 | `SUBSCRIBE` | Subscription action |
| 12 | `START_TRIAL` | Trial start |
| 13 | `LOGIN` | User login |
| 14 | `SHARE` | Share action |
| 15 | `SAVE` | Save / favorite |
| 16 | `RESERVE` | Reservation |
| 17 | `CUSTOM_EVENT_1` – `CUSTOM_EVENT_5` | Business-specific custom slots |

> **There is no `LEAD` standard event.** Map GA4 `generate_lead` to `SIGN_UP` or a `CUSTOM_EVENT_*` slot. The official server-side GTM template maps inherited GA4 `generate_lead` to `SIGN_UP`.

### Pixel Event Parameters (browser)

| Parameter | Type | Description |
|---|---|---|
| `currency` | String | ISO 4217 currency code. |
| `price` | Number | Order / event value in Pixel-style payloads. |
| `transaction_id` | String | Order ID; doubles as purchase deduplication key. |
| `item_ids` | Array[String] | Product / content IDs (must match catalog feed for dynamic ads). |
| `item_category` | String | Product / content category. |
| `number_items` | Integer | Total item count. |
| `description` | String | Page / product description. |
| `search_string` | String | Search query (for `SEARCH`). |
| `sign_up_method` | String | Signup method (for `SIGN_UP`). |
| `success` | Boolean | Success flag for flow-specific events. |
| `payment_info_available` | Boolean | Billing-step flag. |
| `client_dedup_id` | String | Pixel-side deduplication ID (non-purchase events). |
| `level` | String | Game level (apps / games). |

### CAPI `custom_data` Fields

| Field | Description |
|---|---|
| `currency` | ISO 4217 currency code. |
| `value` | Numeric monetary value. |
| `contents` | Array of product objects (`id`, `quantity`, `item_price`, `brand`). |
| `content_ids` | Array of product IDs (alternative to `contents`). |
| `content_category` | Product category. |
| `num_items` | Total item count. |
| `order_id` | Order ID for purchase events. |
| `search_string` | Search query. |

---

## 2. GTM Configuration

### Prerequisites

- Snapchat Ads account with Events Manager access.
- Snap Pixel ID (UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
- GTM web container installed on every page.
- Server-side GTM container or backend integration if using CAPI.
- Consent design defined for the target region (`ad_storage` at minimum).
- Catalog product IDs available on PDP, cart, and purchase pages if running dynamic ads.

### Installation Options

Snap maintains two official Community Template Gallery templates:

| Template | Repository | Container |
|---|---|---|
| **Snap Pixel** | `Snapchat/snapchat-google-tag-manager` | Web GTM |
| **Snap ConversionAPI ServerSide** | `Snapchat/capi-google-tag-manager-serverside-tag` | Server-side GTM |

Snap's Business Help GTM guide recommends the official template over Custom HTML.

### Key Web Template Fields

| Field | Description |
|---|---|
| **Pixel ID** | Snap Pixel ID (constant variable). Validated as a UUID. |
| **Event Type** | Standard event name dropdown. |
| **User Email / Hashed Email** | Advanced match (the SDK SHA-256 hashes raw values before sending). |
| **Phone / Hashed Phone** | Advanced match. |
| **First Name / Last Name** | Advanced match. |
| **Mobile Ad ID / Hashed Mobile Ad ID** | App context advanced match. |
| **Price / Currency / Number of Items** | Commerce parameters. |
| **Item IDs / Item Category** | Product metadata. |
| **Transaction ID** | Order ID (purchase dedup key). |
| **Description / Level / Search String / Signup Method** | Event-specific parameters. |
| **Success / Payment Info Available** | Flow flags. |
| **Client Deduplication ID** | Non-purchase Pixel dedup ID. |
| **CAPI Gateway Script URL** | Optional first-party serving via Conversions API Gateway. |
| **Additional Initialization Data** | Free-form init payload. |
| **Enable Console Logging (Debug Mode)** | Logs Pixel calls to the browser console. |

### Recommended Web Tags

| Tag Name | Template | Trigger | Consent |
|---|---|---|---|
| Snap - Pixel - PageView | Snap Pixel | All Pages | `ad_storage` |
| Snap - Pixel - ViewContent | Snap Pixel | CE - `view_item` | `ad_storage` |
| Snap - Pixel - ListView | Snap Pixel | CE - `view_item_list` | `ad_storage` |
| Snap - Pixel - Search | Snap Pixel | CE - `search` | `ad_storage` |
| Snap - Pixel - AddCart | Snap Pixel | CE - `add_to_cart` | `ad_storage` |
| Snap - Pixel - AddToWishlist | Snap Pixel | CE - `add_to_wishlist` | `ad_storage` |
| Snap - Pixel - StartCheckout | Snap Pixel | CE - `begin_checkout` | `ad_storage` |
| Snap - Pixel - AddBilling | Snap Pixel | CE - `add_payment_info` | `ad_storage` |
| Snap - Pixel - Purchase | Snap Pixel | CE - `purchase` | `ad_storage` |
| Snap - Pixel - SignUp | Snap Pixel | CE - `sign_up` | `ad_storage` |
| Snap - Pixel - Subscribe | Snap Pixel | CE - `subscribe` | `ad_storage` |

### Per-Event Parameter Mapping

| Event | Mapping |
|---|---|
| **Purchase** | `transaction_id` → `{{DLV - ecommerce.transaction_id}}`, `price` → `{{DLV - ecommerce.value}}`, `currency` → `{{DLV - ecommerce.currency}}`, `item_ids` → `{{CJS - Snap Item IDs}}`, `number_items` → `{{CJS - Snap Number Items}}` |
| **AddCart** | `client_dedup_id` → `{{DLV - event_id}}`, `price` → `{{DLV - ecommerce.value}}`, `currency` → `{{DLV - ecommerce.currency}}`, `item_ids` → `{{CJS - Snap Item IDs}}` |
| **ViewContent** | `client_dedup_id` → `{{DLV - event_id}}`, `item_ids` → `{{CJS - Snap Item IDs}}`, `item_category` → category |
| **StartCheckout** | `client_dedup_id` → `{{DLV - event_id}}`, `price`, `currency`, `number_items`, `item_ids` |
| **Search** | `search_string` → `{{DLV - search_term}}` |
| **SignUp** | `client_dedup_id` → `{{DLV - form.submission_id}}`, `sign_up_method` → method |

### Variables

**Constant**:

| Variable | Value |
|---|---|
| `Const - Snap Pixel ID` | (Snap Pixel ID) |

**Data Layer**:

| Variable | Path |
|---|---|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - event_id` | `event_id` |
| `DLV - snap_sc_click_id` | `snap_sc_click_id` |
| `DLV - snap_sc_cookie1` | `snap_sc_cookie1` |
| `DLV - form.submission_id` | `form.submission_id` |

**Custom JS** (GA4 items → Snap fields):

```javascript
// Variable name: CJS - Snap Item IDs
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return undefined;
  return items.map(function(item) {
    return item.item_id || item.id || item.sku;
  }).filter(Boolean);
}
```

```javascript
// Variable name: CJS - Snap Number Items
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return undefined;
  return items.reduce(function(total, item) {
    var quantity = Number(item.quantity || 1);
    return total + (isNaN(quantity) ? 1 : quantity);
  }, 0);
}
```

```javascript
// Variable name: CJS - Snap CAPI Contents
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return undefined;
  return items.map(function(item) {
    var product = { id: item.item_id || item.id || item.sku };
    if (item.quantity != null) product.quantity = String(item.quantity);
    if (item.price != null) product.item_price = String(item.price);
    if (item.item_brand) product.brand = item.item_brand;
    return product;
  }).filter(function(p) { return !!p.id; });
}
```

```javascript
// Variable name: CJS - Snap Event ID
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (ecommerce && ecommerce.transaction_id) return ecommerce.transaction_id;
  var eventId = {{DLV - event_id}};
  if (eventId) return eventId;
  return 'snap-' + Date.now() + '-' + Math.random().toString(36).slice(2);
}
```

### Triggers

| Trigger | Type | Condition |
|---|---|---|
| All Pages | Page View | All pages |
| CE - purchase | Custom Event | `purchase` |
| CE - add_to_cart | Custom Event | `add_to_cart` |
| CE - view_item | Custom Event | `view_item` |
| CE - view_item_list | Custom Event | `view_item_list` |
| CE - begin_checkout | Custom Event | `begin_checkout` |
| CE - add_payment_info | Custom Event | `add_payment_info` |
| CE - search | Custom Event | `search` |
| CE - sign_up | Custom Event | `sign_up` |
| CE - subscribe | Custom Event | `subscribe` |

> Custom event names are case-sensitive and must match the dataLayer `event` value exactly.

---

## 3. Event ID and Deduplication

Snap deduplicates events that share the same `event_id` and timestamp within a 48-hour window. Generate one stable ID per user action and send the same ID through both paths. For purchases, map CAPI `event_id` to Pixel `transaction_id`. For non-purchase events, map CAPI `event_id` to Pixel `client_dedup_id`.

| Event | Pixel dedup field | CAPI field | Recommended value |
|---|---|---|---|
| Purchase | `transaction_id` | `event_id` | Order ID |
| AddCart | `client_dedup_id` | `event_id` | Generated cart action ID |
| ViewContent | `client_dedup_id` | `event_id` | Generated content view ID |
| StartCheckout | `client_dedup_id` | `event_id` | Generated checkout ID |
| SignUp | `client_dedup_id` | `event_id` | Form submission ID |

---

## 4. Conversions API (CAPI v3)

Snap's recommended pattern is **Pixel + CAPI** with `event_id` deduplication. Use the official **Snap ConversionAPI ServerSide** GTM template with a long-lived access token from Ads Manager > Business Details > Conversions API Tokens (Organization Admin required). Store tokens server-side only — never embed in the web container. CAPI v2 was deprecated in early 2025; new implementations must use v3. See the official Snap CAPI docs for endpoint, schema, hashing, and rate-limit details.

---

## 5. Advanced Match / User Data

Snap CAPI requires at least one match key per event: `em` (hashed email), `ph` (hashed phone), `client_ip_address` + `client_user_agent` combined, or `madid` (mobile advertising ID, app events only). The official server-side GTM template auto-hashes hashing-required user-data fields when values are not already SHA-256, and handles `_scid` / `_scclid` cookie capture automatically.

When a user clicks a Snapchat ad, Snap appends `ScCid` to the destination URL — persist it in a first-party cookie and pass it as `user_data.sc_click_id` on CAPI events. Pass `_scid` cookie as `user_data.sc_cookie1` when the Pixel is active. See the official Snap CAPI Parameters docs for full field list and normalization rules.

---

## 6. Privacy and Consent

Gate all Snap Pixel and CAPI tags behind `ad_storage` (or the equivalent ads consent signal). Variables that produce `em`, `ph`, `fn`, `ln`, address fragments, `external_id`, `sc_click_id`, or `sc_cookie1` should return `undefined` when consent is denied. Keep CAPI tokens and hashing logic server-side. Never put PII in URLs, event names, or custom parameter keys.

For US state privacy and iOS 14.5+ ATT opt-out, set CAPI `data_processing_options` to `["LMU"]`. Only enable when the project has a defined privacy-state signal from the CMP or backend.

---

## 7. dataLayer Mapping (GA4-compatible)

Use GA4-style ecommerce; add Snap-specific fields only where GA4 does not provide a stable value.

### Purchase

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'ORDER-1001',
    currency: 'USD',
    value: 129.99,
    items: [
      { item_id: 'SKU-123', item_name: 'Example Product',
        item_category: 'Shoes', item_brand: 'Example Brand',
        price: 129.99, quantity: 1 }
    ]
  },
  snap_sc_click_id: '<optional stored ScCid>',
  snap_sc_cookie1: '<optional _scid cookie value>'
});
```

### Add to Cart

```javascript
dataLayer.push({
  event: 'add_to_cart',
  snap_event_id: 'cart-abc123',
  ecommerce: {
    currency: 'USD', value: 49.99,
    items: [{ item_id: 'SKU-123', item_name: 'Example Product',
              price: 49.99, quantity: 1 }]
  }
});
```

> Never push raw email, phone, name, or address content into the dataLayer for ad pixels. Hash any matching identifiers and gate them behind consent.

### GA4 → Snap Event Mapping

| GA4 Event | Snap Event |
|---|---|
| `page_view` | `PAGE_VIEW` |
| `view_item` | `VIEW_CONTENT` |
| `view_item_list` | `LIST_VIEW` |
| `search` | `SEARCH` |
| `add_to_cart` | `ADD_CART` |
| `add_to_wishlist` | `ADD_TO_WISHLIST` |
| `begin_checkout` | `START_CHECKOUT` |
| `add_payment_info` | `ADD_BILLING` |
| `purchase` | `PURCHASE` |
| `sign_up` | `SIGN_UP` |
| `subscribe` | `SUBSCRIBE` |
| `start_trial` | `START_TRIAL` |
| `login` | `LOGIN` |
| `share` | `SHARE` |
| `generate_lead` | `SIGN_UP` or `CUSTOM_EVENT_*` (no `LEAD` standard event) |

---

## 8. Debugging

| Tool | Purpose |
|---|---|
| GTM Preview Mode | Tag firing order, variables, consent state, event data. |
| Snap Pixel Helper (Chrome) | Pixel detection, events fired, parameters. |
| Test Events / CAPI validate endpoint | Real-time inspection of Pixel and CAPI events; `/v3/{asset_id}/events/validate` returns 400 with details for malformed events. |

---

## 9. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---|---|---|
| Treating `LEAD` as a Snap standard event | CAPI rejects unknown event name | Use `SIGN_UP` or a `CUSTOM_EVENT_*` slot. |
| Sending lowercase / GA4-style event names to CAPI | Events drop or fall back to custom | Use uppercase Snap names (`PURCHASE`, `ADD_CART`, …). |
| Missing `currency` or `value` for purchases | `PURCHASE` rejected | Always send both for purchases. |
| Browser Pixel and CAPI use different dedup IDs | Double-counted conversions | Pixel uses `transaction_id` (purchase) and `client_dedup_id` (non-purchase); CAPI uses `event_id`. Share a single value. |
| Embedding the CAPI token in the web container | Token leakage | Store tokens only in server-side GTM or backend. |
