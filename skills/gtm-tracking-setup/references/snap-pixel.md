# Snap Pixel - GTM Implementation Manual

> Always verify the latest specifications against [Snap Business Help](https://businesshelp.snapchat.com/) and the [Snap Conversions API docs](https://developers.snap.com/api/marketing-api/Conversions-API/Introduction). Snap for Business and Snap for Developers are the source of truth for event names, parameters, endpoints, and validation.

---

## 1. Event and Parameter Reference

### Standard Events

Snap event names are **uppercase, snake_case**. The same names are used by both the Pixel and the Conversions API.

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

> **There is no `LEAD` standard event.** The current Snap CAPI Parameters list does not include `LEAD`. Map GA4 `generate_lead` to `SIGN_UP`, to a `CUSTOM_EVENT_*` slot, or to a configured custom conversion in Ads Manager. The official server-side GTM template maps inherited GA4 `generate_lead` to `SIGN_UP`.

App / game style events (`APP_INSTALL`, `APP_OPEN`, `LEVEL_COMPLETE`, `COMPLETE_TUTORIAL`, `INVITE`, `ACHIEVEMENT_UNLOCKED`, `SPENT_CREDITS`, `RATE`, `AD_CLICK`, `AD_VIEW`) are also accepted for app and ads contexts.

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
- Long-lived CAPI access token (Ads Manager > Business Details > Conversions API Tokens; **Organization Admin required**).
- Consent design defined for the target region (`ad_storage` at minimum).
- Decision on whether to dual-send through Pixel + CAPI and which events to dual-send.
- Catalog product IDs available on PDP, cart, and purchase pages if running dynamic ads.

### Installation Options

Snap maintains two official Community Template Gallery templates:

| Template | Repository | Container |
|---|---|---|
| **Snap Pixel** | `Snapchat/snapchat-google-tag-manager` | Web GTM |
| **Snap ConversionAPI ServerSide** | `Snapchat/capi-google-tag-manager-serverside-tag` | Server-side GTM |

Snap's Business Help GTM guide (native integration since March 2020) recommends the official template over the older Custom HTML setup. Use Custom HTML only as a fallback. Review template permissions on import.

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
| **CAPI Gateway Script URL** | Optional first-party serving via Conversions API Gateway. Custom domain must be added to template Script Injection permissions. |
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

> Custom event names are **case-sensitive** and must match the dataLayer `event` value exactly.

---

## 3. Conversion Tracking

### Event ID and Deduplication

Snap deduplicates events that share the same `event_id` and timestamp **within a 48-hour window**. For dual-send (Pixel + CAPI):

- Generate **one stable ID per user action**.
- Send the **same ID** through both paths.
- For purchases, map CAPI `event_id` to Pixel `transaction_id`.
- For non-purchase events, map CAPI `event_id` to Pixel `client_dedup_id`.
- For high-value events, generate IDs in application code and push them into the dataLayer so browser and server share the value reliably.

| Event | Pixel dedup field | CAPI field | Recommended value |
|---|---|---|---|
| Purchase | `transaction_id` | `event_id` | Order ID |
| AddCart | `client_dedup_id` | `event_id` | Generated cart action ID |
| ViewContent | `client_dedup_id` | `event_id` | Generated content view ID |
| StartCheckout | `client_dedup_id` | `event_id` | Generated checkout ID |
| SignUp | `client_dedup_id` | `event_id` | Form submission ID |

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

### Conversion Windows

`event_time` must be **within the past 7 days** to be accepted by the Conversions API. Send events as close to real time as possible.

---

## 4. Conversions API (CAPI v3)

Snap's recommended pattern is **Pixel + CAPI** with `event_id` deduplication. CAPI v2 (`tr.snapchat.com/v2/conversion`) was scheduled for deprecation in early 2025; new implementations must use v3.

### Endpoint and Authentication

```
POST https://tr.snapchat.com/v3/{PIXEL_ID}/events?access_token={TOKEN}
Content-Type: application/json
```

For app events use `{SNAP_APP_ID}` in the path; for offline events use `{PIXEL_ID}`.

- Generate the access token in **Ads Manager > Business Details > OAuth Apps > Conversions API Tokens > Generate Token**.
- **Organization Admin** access is required to view / generate tokens.
- Tokens are long-lived and **do not expire**; they remain valid until manually deleted.
- Tokens are scoped to the organization where they were generated; only pixel / app IDs in that organization are accepted.
- Store tokens **server-side only** (server-side GTM container or backend). Never embed in the web container.

### Event Schema

CAPI v3 sends events in a `data` array. Each event object can include:

| Field | Required | Description |
|---|---|---|
| `event_name` | Required | Uppercase Snap event name. |
| `event_time` | Required | UNIX timestamp; must be within 7 days. |
| `event_id` | Required for dedup | Same value used by the Pixel for the same action. |
| `action_source` | Required | `WEB`, `MOBILE_APP`, or `OFFLINE`. |
| `event_source_url` | Required (web) | Full URL of the page where the conversion occurred. |
| `user_data` | Required | Identity / matching fields (see section 5). |
| `custom_data` | Recommended | Commerce data (`currency`, `value`, `contents`, etc.). |
| `app_data` | Required (app) | Includes `extinfo`. |
| `integration` | Optional | Partner / connector identifier. |
| `data_processing_options` | Optional | Privacy flags (see section 7). |

For `PURCHASE`, `custom_data.currency` and `custom_data.value` are mandatory.

### Minimal Web Event

```json
{
  "data": [
    {
      "event_name": "PAGE_VIEW",
      "event_time": 1709761985,
      "action_source": "WEB",
      "event_source_url": "https://www.example.com/",
      "user_data": {
        "client_ip_address": "203.0.113.10",
        "client_user_agent": "Mozilla/5.0 ..."
      }
    }
  ]
}
```

### Purchase Event

```json
{
  "data": [
    {
      "event_name": "PURCHASE",
      "event_time": 1709761985,
      "event_id": "ORDER-12345",
      "action_source": "WEB",
      "event_source_url": "https://www.example.com/thank-you",
      "user_data": {
        "em": ["<sha256_email>"],
        "client_ip_address": "203.0.113.10",
        "client_user_agent": "Mozilla/5.0 ...",
        "sc_click_id": "<ScCid>",
        "sc_cookie1": "<_scid>"
      },
      "custom_data": {
        "currency": "USD",
        "value": "99.95",
        "contents": [
          { "id": "SKU-1", "quantity": "1", "item_price": "99.95" }
        ]
      }
    }
  ]
}
```

### Validation Endpoint

```
POST https://tr.snapchat.com/v3/{ASSET_ID}/events/validate?access_token={TOKEN}
```

Validates required fields and event construction without writing to production reports. Invalid events return HTTP 400 with error details. Common validation failures:

- Missing required fields (`event_name`, `event_time`, `action_source`, `event_source_url`).
- `PURCHASE` missing `currency` or `value`.
- Timestamp invalid or out of range.
- Unhashed PII.
- Insufficient PII.
- Invalid hashed IP address.

### Rate and Batch Limits

- **Standard rate limit**: 10 requests / second.
- **Batch size**: up to 2,000 events per request.
- **Long-lived token QPS**: Snap recommends a 1,000 QPS limit for high-throughput senders using long-lived tokens.
- Send events as close to real time as possible; `event_time` cannot be more than 7 days in the past.

### Server-Side GTM Template

The official `Snap ConversionAPI ServerSide` template supports:

- Event name inheritance from incoming events with manual override.
- `action_source` values `WEB`, `MOBILE_APP`, `OFFLINE`.
- Validation mode (sends to the `/events/validate` endpoint).
- Automatic mapping for common GA4 events (note: `generate_lead` maps to `SIGN_UP`).
- Auto-hashing for hashing-required user-data fields when values are not already SHA-256 hashes.
- Automatic `_scid` / `_scclid` cookie handling.
- `data_processing_options` mapping from event data.

---

## 5. Advanced Match / User Data

Snap CAPI requires **at least one** of the following per event:

- `em` (hashed email)
- `ph` (hashed phone)
- `client_ip_address` + `client_user_agent` (combined)
- `madid` (mobile advertising ID; app events only)

### `user_data` Fields

| Field | Description | Hashing |
|---|---|---|
| `em` | Email (array supported). | SHA-256 after normalize. |
| `ph` | Phone (array supported). | SHA-256 after normalize. |
| `fn` | First name. | SHA-256 (lowercase). |
| `ln` | Last name. | SHA-256 (lowercase). |
| `ge` | Gender. | SHA-256. |
| `ct` | City. | SHA-256 (lowercase, no spaces). |
| `st` | State. | SHA-256. |
| `zp` | ZIP / postal code. | SHA-256. |
| `country` | ISO 3166-1 alpha-2. | SHA-256. |
| `external_id` | First-party / loyalty / cookie ID. | SHA-256 recommended. |
| `client_ip_address` | IPv4 / IPv6. | **Do not hash.** |
| `client_user_agent` | Browser UA string. | **Do not hash.** |
| `sc_click_id` | Value from `ScCid` URL parameter. | **Do not hash.** |
| `sc_cookie1` | `_scid` first-party cookie value. | **Do not hash.** |
| `madid` | Mobile advertising ID (app only). | Lowercase; do not remove hyphens. **Do not hash.** |

### Normalization Rules (before SHA-256)

- **Email**: trim whitespace, lowercase.
- **Phone**: include country code; remove non-numeric characters; remove leading double-zero before country code; remove a leading `0` from the national number.
- **Mobile advertising ID**: lowercase; do not remove hyphens; do not hash.
- **Hash format**: lowercase hex SHA-256.
- **Never hash**: IP, user agent, click ID, `_scid`, `madid`.

The Snap Pixel JavaScript SDK auto-hashes raw email and phone fed via the GTM template. The official server-side template auto-hashes hashing-required fields when values are not already SHA-256. Treat raw identifiers as sensitive and only send when consent permits.

### `ScCid` (Snap Click ID) and `_scid`

When a user clicks or swipes up on a Snapchat ad, Snap appends `ScCid` to the destination URL.

1. On landing, read the `ScCid` query parameter (case-sensitive).
2. Persist it in a first-party cookie / consent-gated storage.
3. Pass it to CAPI as `user_data.sc_click_id`.
4. Always include `event_source_url` with the full URL — Snap can also extract the click ID from there.
5. When the Pixel is active and consent allows, pass `_scid` as `user_data.sc_cookie1`.

```javascript
// Variable name: CJS - Snap ScCid
function() {
  var match = window.location.search.match(/[?&]ScCid=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}
```

For production, prefer a shared cookie utility that handles consent, expiration, and update rules.

---

## 6. Audiences (Remarketing)

Audiences are defined in Snapchat Ads Manager. Snap Pixel + CAPI events feed:

- **Website Custom Audiences**: built from event names and event-data rules. Eligible events include `PAGE_VIEW`, `VIEW_CONTENT`, `LIST_VIEW`, `SEARCH`, `ADD_CART`, `ADD_TO_WISHLIST`, `START_CHECKOUT`, `ADD_BILLING`, `PURCHASE`, `SIGN_UP`, `SUBSCRIBE`, `START_TRIAL`, and the `CUSTOM_EVENT_*` slots.
- **Customer list audiences**: hashed email / phone uploads or via CAPI.
- **Lookalike audiences**: derived from any source audience.
- **Engagement audiences**: built from ad engagement on Snapchat.

For dynamic ads and catalog-based use cases, `item_ids` (Pixel) and `custom_data.contents[].id` (CAPI) **must match the catalog feed product IDs**. `item_category` typically aligns with the catalog `item_group_id`; verify against the advertiser's specific catalog setup.

---

## 7. Privacy and Consent

### GTM Consent

- Gate all Snap Pixel and CAPI tags behind `ad_storage` (or the equivalent ads consent signal).
- Variables that produce `em`, `ph`, `fn`, `ln`, address fragments, `external_id`, `sc_click_id`, or `sc_cookie1` should return `undefined` when consent is denied.
- Keep CAPI tokens and hashing logic server-side.
- Never put PII in URLs, event names, custom event labels, or custom parameter keys.

### `data_processing_options` (LMU / DELETE)

Snap CAPI supports a privacy parameter at the event level:

| Value | Meaning |
|---|---|
| `LMU` | Limited use processing (US state privacy / iOS 14.5+ ATT opt-out for app events). |
| `DELETE` | Delete-style request. |

For iOS 14.5+ app users in the OPT_OUT state, set `data_processing_options` to `["LMU"]`. For mobile app events, also use `advertiser_tracking_enabled` to convey ATT status.

> An older `data_use` parameter may appear in legacy account / template contexts. Prefer `data_processing_options` for new implementations; the current server-side GTM template maps to `data_processing_options`.

For regions where local policy requires full suppression rather than limited-use processing, do not send the event at all.

### Cookies

The Snap Pixel sets the `_scid` first-party cookie when active. The Pixel reads the `ScCid` URL parameter on landing pages. Verify current cookie names and lifetimes in browser DevTools for the deployment region.

---

## 8. dataLayer Mapping (GA4-compatible)

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

## 9. Debugging

| Tool | What to Verify |
|---|---|
| **GTM Preview Mode** | Tag firing order, variable values, consent state, event data structure. |
| **Snap Pixel Helper** (Chrome extension) | Pixel detection, events fired, parameters. Cannot validate CAPI. |
| **Test Events** (Events Manager) | Real-time inspection of Pixel and CAPI events. |
| **Event Quality Score** (Events Manager) | Match-quality gaps and recommendations. |
| **CAPI validate endpoint** | `POST /v3/{asset_id}/events/validate` returns 400 with error detail for malformed events. Use during build, not in production. |
| **Server-side GTM Preview** | Inspect outgoing CAPI requests, response codes, and field mapping. |
| **DevTools Network** | Confirm browser calls hit `tr.snapchat.com`. |

### Validation Checklist

- `event_name` is a documented uppercase Snap event; `event_time` within the last 7 days; `action_source` is `WEB`; `event_source_url` includes protocol.
- `PURCHASE` includes `currency` and `value`.
- At least one match-key path present (em / ph / IP+UA / madid).
- Hashed fields normalized **before** SHA-256; IP and UA **not** hashed.
- CAPI `event_id` matches Pixel `transaction_id` (purchase) or `client_dedup_id` (non-purchase).
- `ScCid` passed as `sc_click_id`; `_scid` passed as `sc_cookie1` when Pixel is active.

---

## 10. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---|---|---|
| Using Custom HTML while the official Snap GTM template exists | Missed template improvements; manual maintenance | Use the Snap Pixel community template. |
| Treating `LEAD` as a Snap standard event | CAPI rejects unknown event name | Use `SIGN_UP`, a `CUSTOM_EVENT_*` slot, or a custom conversion configured in Ads Manager. |
| Sending lowercase / GA4-style event names to CAPI | Events drop or fall back to custom | Use uppercase Snap names (`PURCHASE`, `ADD_CART`, …). |
| Missing `currency` or `value` for purchases | `PURCHASE` rejected | Always send both for purchases. |
| Missing `event_source_url` on CAPI web events | Validation failure | Include the full URL with protocol. |
| Browser Pixel and CAPI use different dedup IDs | Double-counted conversions | One stable ID per action shared across both. |
| Mapping CAPI `event_id` to Pixel `event_id` (wrong field name) | Dedup fails | Pixel uses `transaction_id` (purchase) and `client_dedup_id` (non-purchase). |
| Hashing IP address or user agent | Match degradation | Send raw values; never hash IP / UA / click ID / `_scid`. |
| Sending unhashed email or phone in CAPI | Validation rejects "Unhashed PII" | Normalize, then SHA-256 in lowercase hex. |
| Hashing email before trim / lowercase | Match rate drops | Normalize first, then hash. |
| Dropping `ScCid` after the landing page | Click attribution loss | Persist `ScCid` in a first-party cookie / storage. |
| Not passing `_scid` as `sc_cookie1` | Lower match quality | Read the `_scid` cookie and forward to CAPI. |
| Embedding the CAPI token in the web container | Token leakage | Store tokens only in server-side GTM or backend. |
| Enabling CAPI Gateway URL without updating template permissions | Script blocked by template policy | Add the custom domain to the template's Script Injection permissions. |
| Reusing v2 endpoint examples | Endpoint deprecated since early 2025 | Use `/v3/{PIXEL_ID}/events`. |
| Backfilling events older than 7 days via CAPI | `event_time` rejected | Send within 7 days; ideally near real time. |
| Bursting beyond rate limits | Throttled responses | 10 RPS standard; up to 1,000 QPS with long-lived tokens; max 2,000 events / batch. |
| `item_ids` not matching the catalog feed | Dynamic ads break | Use exact catalog product IDs. |

---

## 11. References

- [Snap Pixel](https://forbusiness.snapchat.com/advertising/snap-pixel)
- [Set up Snap Pixel with Google Tag Manager](https://businesshelp.snapchat.com/articles/en_US/Knowledge/formatting-pixel)
- [Snap Pixel GTM Template (GitHub)](https://github.com/Snapchat/snapchat-google-tag-manager)
- [Snap CAPI Server-side GTM Template (GitHub)](https://github.com/Snapchat/capi-google-tag-manager-serverside-tag)
- [Conversions API - Introduction](https://developers.snap.com/api/marketing-api/Conversions-API/Introduction)
- [Conversions API - Getting Started](https://developers.snap.com/api/marketing-api/Conversions-API/GetStarted)
- [Conversions API - Using the API](https://developers.snap.com/api/marketing-api/Conversions-API/UsingTheAPI)
- [Conversions API - Parameters](https://developers.snap.com/api/marketing-api/Conversions-API/Parameters)
- [Conversions API - Best Practices](https://developers.snap.com/api/marketing-api/Conversions-API/BestPractices)
- [Conversions API - Verify Setup](https://developers.snap.com/api/marketing-api/Conversions-API/VerifySetUp)
- [Website Events / Audience Creation](https://developers.snap.com/api/marketing-api/Ads-API/audience-creation/website-events)
