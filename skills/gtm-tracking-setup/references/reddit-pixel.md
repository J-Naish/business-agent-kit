# Reddit Pixel - GTM Implementation Manual

> Always verify the latest specifications against the [Reddit Ads Events Manager](https://ads.reddit.com/events-manager), the [Reddit Business Help Center](https://business.reddithelp.com/), and the official Reddit GTM template repositories ([web](https://github.com/reddit/reddit-gtm-template), [server-side](https://github.com/reddit/reddit-ss-gtm-template)). The Reddit Ads Events Manager UI is the source of truth for Pixel ID, Conversion Access Token, and event verification.

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

Reddit accepts unlimited custom conversion events, but only the 20 most recent custom events are visible in the Events Manager dashboard. Use standard events whenever the action maps cleanly — they drive optimization. Reserve custom events for secondary business actions and keep names stable and non-PII.

### Event Parameters

| Parameter | Type | Description |
|---|---|---|
| `currency` | String | ISO 4217 currency code (e.g. `USD`). Available on AddToCart, AddToWishlist, Purchase, SignUp, Lead, Custom. |
| `transactionValue` | Number | Monetary amount of the event. Decimal in account currency (e.g. `10.99`). Available on the same events as `currency`. |
| `itemCount` | Integer | Total quantity of items. Available on AddToCart, AddToWishlist, Purchase, Custom. |
| `transactionId` | String | Order / transaction ID. Available on Purchase, SignUp, Lead, Custom. |
| `conversionId` | String | Unique deduplication ID for the event (browser + CAPI). Available on every event. |
| `products` | Array | Array of product objects (see schema below). Used for ViewContent, AddToCart, Purchase. |

> **Conversion ID is the deduplication key.** Send the same value through the Reddit Pixel and the Conversions API for the same user action.

### `products` array schema

The official template accepts product information either as individual rows or as a JSON array.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String | Required | Catalog product ID. **Must match the catalog feed** for Dynamic Product Ads. |
| `category` | String | Required | Product category (e.g. Google product taxonomy). |
| `name` | String | Optional | Product display name. |

JSON payload format:

```json
[
  { "id": "SKU001", "name": "Parker Boots", "category": "Apparel > Shoes" }
]
```

When the template's "Use Ecommerce Product Data" mode is enabled, it auto-maps standard GA4 ecommerce items (`item_id`, `item_name`, `item_category` / `item_category2…5` joined as `Cat1 > Cat2 > …`) into Reddit product objects and sums `quantity` into `item_count`.

---

## 2. GTM Configuration

### Prerequisites

- Reddit Ads account with Events Manager access.
- Reddit **Pixel ID** from Events Manager. Format: `t2_xxxxx` or `a2_xxxxx` (validated by the official template against `(t2_|a2_)[a-z0-9]+`).
- GTM web container installed on every page.
- For CAPI: server-side GTM container and a **Conversion Access Token** generated in Reddit Ads.
- Consent design defined for the target region (`ad_storage` minimum).
- Catalog product IDs available on PDP, cart, and purchase pages if running Dynamic Product Ads.
- Decision on advanced matching fields and consent gating.
- Decision on Limited Data Usage (LDU) for US state privacy laws.

### Official GTM Templates

Reddit publishes and maintains both templates in the **Google Tag Manager Community Template Gallery** under the `reddit` owner.

| Template | Container Type | GitHub | Gallery |
|---|---|---|---|
| **Reddit Pixel** | Web | [reddit/reddit-gtm-template](https://github.com/reddit/reddit-gtm-template) | [Gallery link](https://tagmanager.google.com/gallery/#/owners/reddit/templates/reddit-gtm-template) |
| **Reddit Conversions API** | Server | [reddit/reddit-ss-gtm-template](https://github.com/reddit/reddit-ss-gtm-template) | [Gallery link](https://tagmanager.google.com/gallery/#/owners/reddit/templates/reddit-ss-gtm-template) |

Prefer these templates over Custom HTML — they handle loader injection, initialization, cookies, and current field schemas. Verify the gallery "Last Updated" date and commit hash against the GitHub repository before importing in production.

### Key Web Template Fields

| Field | Description |
|---|---|
| **Pixel ID** | Reddit Pixel ID. Validated against `(t2_|a2_)[a-z0-9]+`. |
| **Event to Fire** | One of `PageVisit`, `ViewContent`, `Search`, `AddToCart`, `AddToWishlist`, `Purchase`, `Lead`, `SignUp`, or `Custom`. |
| **CustomEventName** | Required when Event to Fire = `Custom`. |
| **Currency** | ISO 4217 (revenue events). |
| **Transaction Value** | Decimal value (revenue events). |
| **Item Count** | Total item quantity (cart / purchase / wishlist / custom). |
| **Transaction ID** | Order / transaction ID (purchase, signup, lead, custom). |
| **Conversion ID** | Unique deduplication ID. |
| **Enable First Party Cookies** | On by default; required for first-party identifier (`_rdt_uuid`) and click ID storage. |
| **Enable Advanced Matching** | Toggles the Advanced Matching parameters table (Email, Phone Number, AAID, IDFA, External ID). |
| **Add Data Processing Options** | Toggles Data Processing Parameters (`mode`, `country`, `region`) for LDU. |
| **Product Information** | Per-row product entry or JSON payload. Auto-mapping from GA4 ecommerce items is also supported. |

### Key Server Template Fields

| Field | Description |
|---|---|
| **Pixel ID** | Reddit Pixel ID (same format as web). |
| **Source of Event** | One of `WEBSITE`, `APP`, `PHYSICAL_STORE`, `OTHER`. |
| **Event to Fire** | Same nine values as the web template. |
| **Conversion ID** | Deduplication ID. |
| **Test ID** | Test mode identifier. **Disable in production.** Test events are rate-limited to 10 events/sec. |
| **Conversion Access Token** | Bearer token generated in Reddit Ads. |
| **Advanced Matching Parameters** | `email`, `phone_number`, `aaid`, `idfa`, `externalId`. |
| **Limited Data Usage Options** | `country` (ISO 3166-1 alpha-2) and `region` (ISO 3166-2 or just region code). |
| **Product Information** | Manual rows or JSON; falls back to GA4 ecommerce items in the event data. |

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

The Reddit web template handles loader injection and initialization itself, so a separate Custom HTML base is not required. Fire the Page Visit tag on All Pages first, then fire each event tag on its custom event trigger.

### Per-Event Parameter Mapping

| Event | Mapping |
|---|---|
| **Purchase** | Currency → `{{DLV - ecommerce.currency}}`, Transaction Value → `{{DLV - ecommerce.value}}`, Item Count → `{{CJS - Reddit Item Count}}`, Transaction ID → `{{DLV - ecommerce.transaction_id}}`, Conversion ID → `{{DLV - ecommerce.transaction_id}}`, Products → `{{CJS - Reddit Products}}` |
| **AddToCart** | Currency → `{{DLV - ecommerce.currency}}`, Transaction Value → `{{DLV - ecommerce.value}}`, Item Count → `{{CJS - Reddit Item Count}}`, Conversion ID → `{{DLV - event_id}}`, Products → `{{CJS - Reddit Products}}` |
| **ViewContent** | Conversion ID → `{{DLV - event_id}}`, Products → `{{CJS - Reddit Products}}` |
| **Search** | Conversion ID → `{{DLV - event_id}}` (avoid sending sensitive search strings as event metadata) |
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

## 3. Conversion Tracking

### Click ID (`rdt_cid`)

Reddit attributes ad clicks via the `rdt_cid` URL parameter. The Reddit Pixel and the server-side template both:

- Read `rdt_cid` from the page URL.
- Persist it in the first-party cookie `_rdt_cid` (90-day max-age, `samesite=strict`, `secure`).
- Forward it on every conversion event so server-to-server events can attribute back to the original click.

The server template applies a precedence of **URL → cookie → event data** when resolving the click ID for a given event.

### Conversion ID and Deduplication

Conversion ID (`conversion_id` in CAPI) is the deduplication key when an advertiser sends the same event through both the Reddit Pixel and the Conversions API. Practical rules:

- Generate **one stable conversion ID per real-world user action**.
- Send the **same value** through the Reddit Pixel and the Conversions API for that action.
- For purchases, use the order / transaction ID when it is unique and stable.
- For leads and sign-ups, use a backend submission / registration ID.
- For add-to-cart, view-content, search, and other intent events, generate a UUID (or `event-name + timestamp + random`) before either browser or server fires.
- Never reuse a conversion ID across different actions or users.

### Attribution Windows

| Attribution Type | Default | Available |
|---|---|---|
| Click-through | 28 days | 1 / 7 / 28 days |
| View-through (paired with click) | 1-day view + 28-day click | 1 / 7 / 28 days |

The view window cannot exceed the click-through window. Attribution settings live in Events Manager and only affect reporting; GTM does not configure them.

---

## 4. Conversions API (Reddit CAPI)

The official Reddit Conversions API server-side GTM template sends one event per request. Hand-rolled implementations should follow the same contract.

### Endpoint

```
POST https://ads-api.reddit.com/api/v3/pixels/{PIXEL_ID}/conversion_events
```

Headers:

```
Content-Type: application/json
Authorization: Bearer {CONVERSION_TOKEN}
User-Agent: SGTM:{containerId}:{tagVersion} (by {pixelId})
```

The Conversion Access Token is generated in **Reddit Ads → Events Manager → Conversion Access Token**. Treat it as a secret; never expose it in a web GTM container or browser code.

### Request Body

```json
{
  "data": {
    "test_id": "optional-test-id",
    "events": [ { /* event object */ } ],
    "partner": "SGTM",
    "partner_version": "2.0.0"
  }
}
```

### Event Object

| Field | Required | Description |
|---|---|---|
| `event_at` | Required | Event timestamp in milliseconds since epoch. |
| `action_source` | Required | `WEBSITE`, `APP`, `PHYSICAL_STORE`, or `OTHER`. |
| `event_source_url` | Recommended | Page URL where the event occurred (web). |
| `type.tracking_type` | Required | One of `PAGE_VISIT`, `VIEW_CONTENT`, `SEARCH`, `ADD_TO_CART`, `ADD_TO_WISHLIST`, `PURCHASE`, `LEAD`, `SIGN_UP`, `CUSTOM`. |
| `type.custom_event_name` | Conditional | Required when `tracking_type = CUSTOM`. |
| `click_id` | Recommended | Reddit click ID (`rdt_cid`). Resolves URL → cookie → event data. |
| `metadata` | Recommended | Event metadata object (see below). |
| `user` | Required | User identity / matching object (see below). |

### `metadata` Fields

| Field | Description |
|---|---|
| `conversion_id` | Deduplication ID. Required when sending the same event via Pixel + CAPI. |
| `value` | Numeric monetary amount. |
| `currency` | ISO 4217 currency code. |
| `item_count` | Total quantity of items. |
| `products` | Array of `{ id, name?, category? }`. `id` and `category` are required for DPA matching. |

### `user` Fields

The Reddit server-side template populates these user-data fields on the event:

| Field | Hashed | Notes |
|---|---|---|
| `uuid` | No | Reddit Pixel-issued ID. Read from the `_rdt_uuid` first-party cookie or the event data. Strongly recommended. |
| `email` | SHA-256 | Lowercase email before hashing. |
| `phone_number` | SHA-256 | Digits only with country code, no leading `+` or zeros. |
| `external_id` | SHA-256 recommended | Opaque advertiser-side user ID. **Never use raw email or phone as the External ID.** |
| `aaid` | SHA-256 | Android advertising ID (mobile / app context). |
| `idfa` | SHA-256 | Apple Identifier for Advertisers (mobile / app context). |
| `ip_address` | None | Client IP. |
| `user_agent` | None | Browser UA string. |
| `screen_dimensions.width` / `.height` | None | Screen dimensions. |
| `data_processing_options` | None | LDU object: `{ "modes": ["LDU"], "country": "...", "region": "..." }`. |

Pre-hash all PII with SHA-256 of the lowercased / normalized value before sending. Do not rely on the API to hash for you. The web template's Advanced Matching field accepts hashed or unhashed values per the template; the safer default is to send only pre-hashed values.

### Test Mode

The server template exposes a **Test ID** field. When present, the value is sent as `data.test_id`, the request is logged to console, and traffic is rate-limited to 10 events per second. Validate with **Reddit Ads → Events Manager → Event Testing**, then disable in production.

### Response Handling

| Status | Behavior |
|---|---|
| 2xx | Success. Body contains `data.message`. |
| 4xx / 5xx | Failure. Body contains `error.code` and `error.message`. Common: `401 No bearer token provided`. |

---

## 5. Advanced Matching / User Data

The web template supports Advanced Matching with these parameters: `email`, `phone_number` (or `phoneNumber` in the web template), `aaid`, `idfa`, `externalId`. CAPI supports the same plus `uuid`, `ip_address`, `user_agent`, and `screen_dimensions`.

### Hashing Rules

- All PII (`email`, `phone_number`, `external_id`, `aaid`, `idfa`) must be SHA-256 hashed before transmission.
- **Email**: trim, lowercase, then SHA-256.
- **Phone**: digits only (no `+`, spaces, hyphens), include country code with no leading zero, then SHA-256.
- Reddit treats already-hashed values as hashed and does not re-hash them.
- Non-PII context fields (`ip_address`, `user_agent`, screen dimensions, `uuid`, `_rdt_cid`) are sent as-is.

### Recommendations

- Do not push raw PII into the dataLayer for ad pixels. Hash on the server / backend, or push pre-hashed values into the dataLayer only after consent.
- Prefer server-side CAPI transmission of identifiers over browser Advanced Matching when available.
- Use opaque, stable internal user IDs for `external_id`. Never use email, phone, or name.
- Gate all advanced matching behind explicit consent and document the legal basis.

---

## 6. Audiences (Custom Audiences / Retargeting)

Audiences are defined in Reddit Ads Manager. The Reddit Pixel and CAPI feed:

- **Pixel-based audiences**: site visitors and users who fired specific events (rules over event names and event metadata).
- **Customer file uploads**: hashed email / phone / IDFA / AAID lists uploaded directly or sent via CAPI.
- **Lookalike audiences**: derived from any pixel or customer-list source.

For Dynamic Product Ads, all `ViewContent`, `AddToCart`, and `Purchase` events must include a `products[].id` that matches the catalog feed exactly (case preserved).

### Catalog Mapping

- Map a product catalog to the Reddit Pixel in Reddit Ads to enable DPAs.
- Product IDs sent on events must match catalog IDs.
- DPAs are only compatible with physical products.
- Purchase events additionally require `currency` and `value`.
- Deleting a catalog mapped to a pixel deletes the pixel data collected so far — do not delete catalogs casually.

---

## 7. Privacy and Consent

Reddit Pixel is an advertising and conversion measurement tag. Default consent gates:

- `ad_storage` for the base tag and all event tags.
- `ad_user_data` when sending Advanced Matching or CAPI user data.
- `ad_personalization` when using audiences, retargeting, or DPAs.

For strict opt-in regions, block the base tag entirely until the relevant ad consent is granted. Loading the base tag fetches Reddit scripts and writes / reads first-party identifiers.

### Limited Data Usage (LDU)

For US state privacy laws, the official template exposes `mode`, `country`, and `region`. The server template emits this object on the event:

```json
{
  "modes": ["LDU"],
  "country": "USA",
  "region": "USA-CA"
}
```

- `country`: ISO 3166-1 alpha-2 (e.g. `USA`).
- `region`: ISO 3166-2 (e.g. `USA-CA`) or the bare region code (e.g. `CA`).

Only enable LDU when the project has a defined privacy-state signal from the CMP or backend. Do not infer LDU state in GTM.

### Cookies

The Reddit Pixel and server template set / read these first-party cookies:

| Cookie | Purpose |
|---|---|
| `_rdt_uuid` | First-party identifier (Pixel-issued UUID). Format: `timestamp_ms.UUIDv4`. |
| `_rdt_cid` | Reddit click ID (`rdt_cid`). Set with 90-day max-age, `samesite=strict`, `secure`. |
| `_rdt_em` | Hashed email cookie used for cross-page matching when supplied. |

These cookies remain effective in environments restricting third-party cookies because they are first-party.

---

## 8. dataLayer Mapping (GA4-compatible)

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

## 9. Debugging

| Tool | What to Verify |
|---|---|
| **GTM Preview Mode** | Tag firing order (Page Visit → event), variable values, conversion ID values. |
| **Reddit Pixel Helper** (Chrome extension) | Pixel detection, event payloads, event count per event. CAPI cannot be validated here. Enable third-party cookies in the browser when testing. |
| **Events Manager** (Reddit Ads) | Real-time event volume, event metadata sample, deduplication coverage. |
| **Event Testing** (Events Manager → Testing) | Send Test ID-tagged events from CAPI for live validation. |
| **DevTools Network** | Confirm browser requests reach Reddit's pixel endpoint. Confirm server-side requests target `https://ads-api.reddit.com/api/v3/pixels/{PIXEL_ID}/conversion_events`. |

### Verification Flow

1. Publish the GTM container (or use Preview).
2. Trigger Page Visit and each conversion action manually.
3. Confirm events appear in Reddit Pixel Helper and in Events Manager.
4. For dual-send, validate that conversion IDs match between Pixel and CAPI events.
5. Inspect the deduplication report in Events Manager and reconcile against backend source-of-truth volume.

---

## 10. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---|---|---|
| Pixel + CAPI without a shared conversion ID | Duplicate conversions, inflated reporting | Generate one stable conversion ID per action; send the same value in both paths. |
| Reusing a conversion ID across actions or users | Wrong dedup behavior | One unique ID per real-world user action. |
| Missing `products[].id` on DPA events | DPA / catalog matching breaks | Send `id` (and `category`) on ViewContent / AddToCart / Purchase; match catalog IDs exactly. |
| Missing currency / value on Purchase | Optimization signal degraded; DPA readiness fails | Map `ecommerce.value` and `ecommerce.currency` on Purchase tags. |
| Conversion Access Token in a web container | Credential exposure | Store the token only in server-side GTM. |
| Test ID enabled in production | Events rate-limited and excluded | Toggle Test ID off before publishing the server container. |
| Sending raw PII as event metadata | Privacy violation | Keep PII out of event metadata; use consent-gated, hashed Advanced Matching or CAPI user data only. |
| Sensitive search strings on Search events | Privacy risk | Suppress or categorize sensitive searches before tagging. |
| Custom event used where a standard event fits | Weaker optimization and reporting | Map to standard events whenever possible. |
| Third-party cookies blocked during testing | Pixel Helper / Events Manager test events do not appear | Enable third-party cookies for testing as Reddit notes. |
| Base / Page Visit tag fires multiple times in SPAs | Inflated page events | Control SPA page tracking explicitly with History Change triggers and test in Preview. |
| LDU enabled without a real privacy signal | Incorrect privacy state sent to Reddit | Only enable LDU when the CMP / backend supplies a verified jurisdiction. |
| Importing the GTM template without verifying the gallery hash | Out-of-date or wrong template imported | Compare the gallery "Last Updated" date and commit hash against the GitHub repo before publishing. |

---

## 11. References

- [Reddit Pixel GTM template - GitHub](https://github.com/reddit/reddit-gtm-template)
- [Reddit Conversions API GTM template - GitHub](https://github.com/reddit/reddit-ss-gtm-template)
- [Reddit Pixel template - GTM Gallery](https://tagmanager.google.com/gallery/#/owners/reddit/templates/reddit-gtm-template)
- [Reddit Conversions API template - GTM Gallery](https://tagmanager.google.com/gallery/#/owners/reddit/templates/reddit-ss-gtm-template)
- [Supported Conversion Events - Reddit Business Help](https://business.reddithelp.com/helpcenter/s/article/supported-conversion-events)
- [Web Attribution Overview - Reddit Business Help](https://business.reddithelp.com/helpcenter/s/article/Web-Attribution-Overview)
- [Catalogs - Reddit Business Help](https://business.reddithelp.com/helpcenter/s/article/catalogs)
- [Dynamic Product Ads - Reddit Business Help](https://business.reddithelp.com/helpcenter/s/article/dynamic-product-ads)
- [Conversion Access Token - Reddit Business Help](https://business.reddithelp.com/helpcenter/s/article/conversion-access-token)
- [Reddit Ads Events Manager](https://ads.reddit.com/events-manager)
