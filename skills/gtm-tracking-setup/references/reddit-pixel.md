# Reddit Pixel - GTM Implementation Manual

> Source of truth: [Reddit for Business Help Center](https://business.reddithelp.com/) — entry point to Pixel, Conversions API, and Audiences docs.

---

## 1. Event and Parameter Reference

### Standard Events

The official Reddit Pixel GTM template exposes nine selectable event types. Browser values are PascalCase; the Reddit Conversions API maps each to an upper-snake-case `tracking_type`.

| # | Event Name | `tracking_type` (CAPI) | Use Case |
|---|---|---|---|
| 1 | PageVisit | `PAGE_VISIT` | All pages (base / sitewide tag) |
| 2 | ViewContent | `VIEW_CONTENT` | Product detail or content view |
| 3 | Search | `SEARCH` | On-site search |
| 4 | AddToCart | `ADD_TO_CART` | Item added to cart |
| 5 | AddToWishlist | `ADD_TO_WISHLIST` | Item added to wishlist |
| 6 | Purchase | `PURCHASE` | Purchase / order completed |
| 7 | Lead | `LEAD` | Lead acquisition |
| 8 | SignUp | `SIGN_UP` | Registration / subscription / signup |
| 9 | Custom | `CUSTOM` | Business-specific action (requires `customEventName`) |

Reddit accepts unlimited custom conversion events, but only the 20 most recent custom events are visible in Events Manager. Use standard events whenever the action maps cleanly.

### Event Parameters

| Parameter | Type | Description |
|---|---|---|
| `currency` | String | ISO 4217 currency code. Available on AddToCart, AddToWishlist, Purchase, SignUp, Lead, Custom. |
| `transactionValue` | Number | Monetary amount in account currency. Same events as `currency`. |
| `itemCount` | Integer | Total quantity of items. Available on AddToCart, AddToWishlist, Purchase, Custom. |
| `transactionId` | String | Order / transaction ID. Available on Purchase, SignUp, Lead, Custom. |
| `conversionId` | String | Unique deduplication ID for the event (browser + CAPI). Available on every event. |
| `products` | Array | Array of product objects (see schema below). |

> **Conversion ID is the deduplication key.** Send the same value through the Reddit Pixel and the Conversions API for the same user action.

### `products` array schema

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String | Required | Catalog product ID. **Must match the catalog feed** for Dynamic Product Ads. |
| `category` | String | Required | Product category (e.g. Google product taxonomy). |
| `name` | String | Optional | Product display name. |

When the template's "Use Ecommerce Product Data" mode is enabled, it auto-maps GA4 ecommerce items (`item_id`, `item_name`, `item_category` / `item_category2…5` joined as `Cat1 > Cat2 > …`) into Reddit product objects and sums `quantity` into `item_count`.

---

## 2. GTM Configuration

### Prerequisites

- Reddit Ads account with Events Manager access.
- Reddit **Pixel ID** from Events Manager. Format: `t2_xxxxx` or `a2_xxxxx`.
- GTM web container installed on every page.
- For CAPI: server-side GTM container and a Conversion Access Token from Reddit Ads.
- Consent design defined for the target region (`ad_storage` minimum).
- Catalog product IDs available on PDP, cart, and purchase pages if running Dynamic Product Ads.

### Official GTM Templates

Reddit publishes and maintains both templates in the **GTM Community Template Gallery** under the `reddit` owner.

| Template | Container Type |
|---|---|
| **Reddit Pixel** | Web |
| **Reddit Conversions API** | Server |

Prefer these templates over Custom HTML — they handle loader injection, initialization, cookies, and current field schemas.

### Key Web Template Fields

| Field | Description |
|---|---|
| **Pixel ID** | Reddit Pixel ID. Validated against `(t2_|a2_)[a-z0-9]+`. |
| **Event to Fire** | `PageVisit`, `ViewContent`, `Search`, `AddToCart`, `AddToWishlist`, `Purchase`, `Lead`, `SignUp`, or `Custom`. |
| **CustomEventName** | Required when Event to Fire = `Custom`. |
| **Currency** | ISO 4217 (revenue events). |
| **Transaction Value** | Decimal value (revenue events). |
| **Item Count** | Total item quantity. |
| **Transaction ID** | Order / transaction ID (purchase, signup, lead, custom). |
| **Conversion ID** | Unique deduplication ID. |
| **Enable First Party Cookies** | Required for `_rdt_uuid` and click ID storage. |
| **Enable Advanced Matching** | Toggles Email, Phone, AAID, IDFA, External ID. |
| **Add Data Processing Options** | Toggles LDU `mode`, `country`, `region`. |
| **Product Information** | Per-row product entry or JSON payload (auto-mapping from GA4 supported). |

### Key Server Template Fields

| Field | Description |
|---|---|
| **Pixel ID** | Reddit Pixel ID. |
| **Source of Event** | One of `WEBSITE`, `APP`, `PHYSICAL_STORE`, `OTHER`. |
| **Event to Fire** | Same nine values as the web template. |
| **Conversion ID** | Deduplication ID. |
| **Test ID** | Test mode identifier. **Disable in production.** |
| **Conversion Access Token** | Bearer token generated in Reddit Ads. |
| **Advanced Matching Parameters** | `email`, `phone_number`, `aaid`, `idfa`, `externalId`. |
| **Limited Data Usage Options** | `country` (ISO 3166-1 alpha-2) and `region`. |
| **Product Information** | Manual rows or JSON; falls back to GA4 ecommerce items. |

### Tags

| Tag Name | Template | Trigger | Consent |
|---|---|---|---|
| Reddit - Pixel - Page Visit | Reddit Pixel | All Pages | `ad_storage` |
| Reddit - Pixel - View Content | Reddit Pixel | CE - view_item | `ad_storage` |
| Reddit - Pixel - Search | Reddit Pixel | CE - search | `ad_storage` |
| Reddit - Pixel - Add To Cart | Reddit Pixel | CE - add_to_cart | `ad_storage` |
| Reddit - Pixel - Add To Wishlist | Reddit Pixel | CE - add_to_wishlist | `ad_storage` |
| Reddit - Pixel - Purchase | Reddit Pixel | CE - purchase | `ad_storage` |
| Reddit - Pixel - Lead | Reddit Pixel | CE - generate_lead | `ad_storage` |
| Reddit - Pixel - Sign Up | Reddit Pixel | CE - sign_up | `ad_storage` |

The Reddit web template handles loader injection itself, so a separate Custom HTML base is not required.

### Per-Event Parameter Mapping

| Event | Mapping |
|---|---|
| **Purchase** | Currency → `{{DLV - ecommerce.currency}}`, Transaction Value → `{{DLV - ecommerce.value}}`, Item Count → `{{CJS - Reddit Item Count}}`, Transaction ID → `{{DLV - ecommerce.transaction_id}}`, Conversion ID → `{{DLV - ecommerce.transaction_id}}`, Products → `{{CJS - Reddit Products}}` |
| **AddToCart** | Currency → `{{DLV - ecommerce.currency}}`, Transaction Value → `{{DLV - ecommerce.value}}`, Item Count → `{{CJS - Reddit Item Count}}`, Conversion ID → `{{DLV - event_id}}`, Products → `{{CJS - Reddit Products}}` |
| **ViewContent** | Conversion ID → `{{DLV - event_id}}`, Products → `{{CJS - Reddit Products}}` |
| **Search** | Conversion ID → `{{DLV - event_id}}` (avoid sending sensitive search strings) |
| **AddToWishlist** | Currency → `{{DLV - ecommerce.currency}}`, Transaction Value → `{{DLV - ecommerce.value}}`, Conversion ID → `{{DLV - event_id}}` |
| **Lead** | Conversion ID → `{{DLV - form.submission_id}}` |
| **SignUp** | Conversion ID → `{{DLV - registration_id}}`, Transaction ID → same |

### Variables

**Constant**:

| Variable | Value |
|---|---|
| `Const - Reddit Pixel ID` | (Reddit Pixel ID, e.g. `t2_abc123`) |

**Data Layer**:

| Variable | Data Layer Path |
|---|---|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - event_id` | `event_id` |
| `DLV - form.submission_id` | `form.submission_id` |
| `DLV - registration_id` | `registration_id` |

**Custom JS** (GA4 items → Reddit `products`):

```javascript
// Variable name: CJS - Reddit Products
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return [];
  return items.map(function(item) {
    var cats = ['item_category','item_category2','item_category3','item_category4','item_category5']
      .map(function(k) { return item[k]; })
      .filter(function(v) { return v && String(v).trim(); })
      .join(' > ');
    var product = { id: String(item.item_id || '') };
    if (item.item_name) product.name = String(item.item_name);
    if (cats) product.category = cats;
    return product;
  }).filter(function(p) { return p.id; });
}
```

```javascript
// Variable name: CJS - Reddit Item Count
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return undefined;
  return items.reduce(function(sum, item) {
    return sum + (Number(item.quantity) || 1);
  }, 0);
}
```

### Triggers

| Trigger | Type | Condition |
|---|---|---|
| All Pages | Page View | All pages |
| CE - view_item | Custom Event | `view_item` |
| CE - search | Custom Event | `search` |
| CE - add_to_cart | Custom Event | `add_to_cart` |
| CE - add_to_wishlist | Custom Event | `add_to_wishlist` |
| CE - purchase | Custom Event | `purchase` |
| CE - generate_lead | Custom Event | `generate_lead` |
| CE - sign_up | Custom Event | `sign_up` |

> Custom event names are case-sensitive and must match the dataLayer `event` value exactly.

---

## 3. Conversion ID and Deduplication

Conversion ID (`conversion_id` in CAPI) is the deduplication key when an advertiser sends the same event through both the Reddit Pixel and the Conversions API. Generate one stable conversion ID per real-world user action and send the same value through both paths. For purchases, use the order / transaction ID when unique and stable. For other events, generate a UUID before either browser or server fires. Reddit attributes ad clicks via the `rdt_cid` URL parameter, which the Pixel and server template persist in the `_rdt_cid` first-party cookie (90-day) and forward on every conversion event.

---

## 4. Conversions API (Reddit CAPI)

Use the official **Reddit Conversions API server-side GTM template** with a Conversion Access Token from **Reddit Ads → Events Manager → Conversion Access Token**. Treat the token as a secret — never expose it in a web container or browser code. The template sends one event per request and supports Test ID for validation in Events Manager. See the official Reddit Business Help Center for endpoint, payload schema, and field details.

---

## 5. Advanced Matching / User Data

The web template supports Advanced Matching with `email`, `phone_number` (or `phoneNumber`), `aaid`, `idfa`, `externalId`. The server template adds `uuid`, `ip_address`, `user_agent`, and `screen_dimensions`. All PII (email, phone, external_id, aaid, idfa) must be SHA-256 hashed before transmission — Reddit treats already-hashed values as hashed and does not re-hash. Prefer server-side CAPI transmission of identifiers over browser Advanced Matching when available, and gate all advanced matching behind explicit consent. See the official Reddit docs for normalization rules.

---

## 6. Privacy and Consent

Gate the Reddit base tag and all event tags behind `ad_storage`. For strict opt-in regions, block the base tag entirely until consent is granted — loading it fetches Reddit scripts and writes / reads first-party identifiers (`_rdt_uuid`, `_rdt_cid`, `_rdt_em`).

For US state privacy (LDU), the official template exposes `mode`, `country` (ISO 3166-1 alpha-2), and `region` (ISO 3166-2). Only enable LDU when the project has a defined privacy-state signal from the CMP or backend.

---

## 7. dataLayer Mapping (GA4-compatible)

### Purchase

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T12345',
    value: 99.99,
    currency: 'USD',
    items: [
      { item_id: 'SKU001', item_name: 'Parker Boots', item_category: 'Apparel',
        item_category2: 'Shoes', price: 99.99, quantity: 1 }
    ]
  }
});
```

| Reddit Field | Value |
|---|---|
| Event to Fire | `Purchase` |
| Transaction ID | `{{DLV - ecommerce.transaction_id}}` |
| Conversion ID | `{{DLV - ecommerce.transaction_id}}` |
| Transaction Value | `{{DLV - ecommerce.value}}` |
| Currency | `{{DLV - ecommerce.currency}}` |
| Item Count | `{{CJS - Reddit Item Count}}` |
| Products | `{{CJS - Reddit Products}}` |

### Add to Cart

```javascript
dataLayer.push({
  event: 'add_to_cart',
  event_id: 'atc_1700000000_abc123',
  ecommerce: {
    value: 49.99,
    currency: 'USD',
    items: [{ item_id: 'SKU001', item_name: 'Parker Boots', price: 49.99, quantity: 1 }]
  }
});
```

### Lead

```javascript
dataLayer.push({
  event: 'generate_lead',
  form: { submission_id: 'lead_12345', type: 'contact' }
});
```

| Reddit Field | Value |
|---|---|
| Event to Fire | `Lead` |
| Conversion ID | `{{DLV - form.submission_id}}` |

> Never push raw email, phone, name, address, or free-form message content into the dataLayer for ad pixels. Hash any matching identifiers on the server and gate them behind consent.

### GA4 → Reddit Event Mapping

| GA4 Event | Reddit Event |
|---|---|
| `page_view` | PageVisit |
| `view_item` | ViewContent |
| `search` | Search |
| `add_to_cart` | AddToCart |
| `add_to_wishlist` | AddToWishlist |
| `purchase` | Purchase |
| `generate_lead` | Lead |
| `sign_up` | SignUp |

---

## 8. Debugging

| Tool | Purpose |
|---|---|
| GTM Preview Mode | Tag firing order (Page Visit → event), variables, conversion ID values. |
| Reddit Pixel Helper (Chrome) | Pixel detection, event payloads. Enable third-party cookies for testing. |
| Events Manager / Event Testing | Real-time event volume, deduplication coverage, Test ID-tagged CAPI validation. |

---

## 9. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---|---|---|
| Pixel + CAPI without a shared conversion ID | Duplicate conversions, inflated reporting | One stable conversion ID per action; same value in both paths. |
| Missing `products[].id` on DPA events | DPA / catalog matching breaks | Send `id` (and `category`) on ViewContent / AddToCart / Purchase; match catalog IDs exactly. |
| Missing currency / value on Purchase | Optimization signal degraded | Map `ecommerce.value` and `ecommerce.currency` on Purchase tags. |
| Conversion Access Token in a web container | Credential exposure | Store the token only in server-side GTM. |
| Test ID enabled in production | Events rate-limited and excluded | Toggle Test ID off before publishing. |
