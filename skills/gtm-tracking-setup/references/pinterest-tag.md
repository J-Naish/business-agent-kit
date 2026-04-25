# Pinterest Tag - GTM Implementation Manual

> Always verify the latest specifications against the [Pinterest Tag setup guide](https://help.pinterest.com/en/business/article/google-tag-manager-and-pinterest-tag), the [Pinterest event codes reference](https://help.pinterest.com/en/business/article/add-event-codes), and the [Pinterest Conversions API docs](https://developers.pinterest.com/docs/api/v5/). Pinterest Help and Ads Manager UI are the source of truth for event names, parameters, and validation.

---

## 1. Event and Parameter Reference

### Standard Events

Pinterest Help lists 20 event types. The `pintrk('track', '<name>', {...})` value is lowercase.

| # | Event Name | `pintrk` Value | Use Case |
|---|---|---|---|
| 1 | Checkout | `checkout` | Completed transaction / purchase |
| 2 | AddToCart | `addtocart` | Item added to cart |
| 3 | PageVisit | `pagevisit` | Primary page view, product page, article page |
| 4 | Signup | `signup` | User signs up |
| 5 | WatchVideo | `watchvideo` | Video watched |
| 6 | Lead | `lead` | Lead or interest action |
| 7 | Search | `search` | On-site search |
| 8 | ViewCategory | `viewcategory` | Category / listing page view |
| 9 | AddPaymentInfo | `addpaymentinfo` | Payment information added |
| 10 | AddToWishList | `addtowishlist` | Wishlist add |
| 11 | InitiateCheckout | `initiatecheckout` | Checkout started |
| 12 | Subscribe | `subscribe` | Paid subscription action |
| 13 | ViewContent | `viewcontent` | Web / product / landing page view |
| 14 | Contact | `contact` | Contact via phone, email, chat, etc. |
| 15 | Schedule | `schedule` | Appointment scheduled |
| 16 | FindLocation | `findlocation` | Store / location lookup |
| 17 | CustomizeProduct | `customizeproduct` | Product customization |
| 18 | SubmitApplication | `submitapplication` | Application submitted |
| 19 | StartTrial | `starttrial` | Free trial started |
| 20 | Custom | (custom name) | Business-specific action |

> Pinterest uses **Checkout** (not Purchase) as the canonical purchase event. Map GA4 `purchase` → Pinterest `checkout`.

### Event Parameters

| Parameter | Type | Description |
|---|---|---|
| `value` | Number | Order / event total. Used in paid and organic conversion reporting. |
| `currency` | String | ISO currency code (e.g. `USD`, `EUR`, `JPY`). Pinterest converts to the advertiser account currency. |
| `order_id` | String | Required for conversion analysis reporting. |
| `order_quantity` | Integer | Item quantity. Used in conversion reporting. |
| `event_id` | String | Unique event identifier used for deduplication. |
| `promo_code` | String | Promotion code. |
| `property` | String | Property / brand context. |
| `search_query` | String | Search term (for `search`). Avoid sensitive search content. |
| `video_title` | String | Video title (for `watchvideo`). |
| `lead_type` | String | Lead category (for `lead`). |
| `line_items` | Array | Array of product detail objects (see below). |

Pinterest accepts the event ID under any of these **case-sensitive** field names: `eventID`, `event_id`, `eid`. Use `event_id` consistently for new implementations to align with the Conversions API.

Only `value` and `order_quantity` populate paid and organic conversion reports. All event data is available for audience targeting.

### `line_items` Schema

| Field | Type | Description |
|---|---|---|
| `product_id` | String | Product ID. **Must match the catalog feed** for dynamic retargeting. |
| `product_name` | String | Product name. |
| `product_category` | String | Product category. |
| `product_variant_id` | String | Variant ID. |
| `product_variant` | String | Variant name / value. |
| `product_price` | Number | Unit price. |
| `product_quantity` | Integer | Quantity. |
| `product_brand` | String | Brand. |

For a single product, `product_id` may be passed at the top level instead of `line_items` for `addtocart`, `checkout`, and `pagevisit`.

---

## 2. GTM Configuration

### Prerequisites

- Pinterest Business account with Conversions access.
- Pinterest **Tag ID** (10-digit numeric ID from Pinterest Ads Manager > Conversions).
- GTM container installed on every page.
- Consent design defined for the target region (`ad_storage` at minimum).
- Catalog product IDs available on PDP, cart, and purchase pages if running dynamic retargeting or catalog sales.
- Decision on Enhanced Match and Automatic Enhanced Match.
- Decision on Limited Data Processing for US state privacy laws.

### Installation Options

GTM has a built-in **Pinterest Tag** template (configured through Pinterest Ads Manager > Conversions > Google Tag Manager flow, or added manually from the GTM template gallery). Prefer the template over Custom HTML — official setup expects it, and it handles the loader and `pintrk('page')` call internally.

### Key Template Fields

| Field | Description |
|---|---|
| **Tag ID** | Pinterest Tag ID (constant variable). |
| **Event to Fire** | Standard event name (`pagevisit`, `checkout`, etc.) or custom. |
| **Event Data** / **Custom Parameters** | Event parameters (`value`, `currency`, `order_id`, `line_items`, etc.). |
| **Event ID** | Unique deduplication ID. |
| **Hashed Email** | Enhanced Match. Accepts hashed or unhashed; the tag hashes unhashed values with SHA-256 before transmission. |
| **Opt Out Information** | Limited Data Processing flag (set Opt Out Type to `LDP`, plus hashed state and country). |

### Tags

| Tag Name | Template | Trigger | Consent |
|---|---|---|---|
| Pinterest - Base | Pinterest Tag | All Pages | `ad_storage` |
| Pinterest - Checkout | Pinterest Tag | CE - purchase | `ad_storage` |
| Pinterest - AddToCart | Pinterest Tag | CE - add_to_cart | `ad_storage` |
| Pinterest - PageVisit | Pinterest Tag | CE - view_item (PDP) | `ad_storage` |
| Pinterest - ViewCategory | Pinterest Tag | CE - view_item_list | `ad_storage` |
| Pinterest - InitiateCheckout | Pinterest Tag | CE - begin_checkout | `ad_storage` |
| Pinterest - Search | Pinterest Tag | CE - search | `ad_storage` |
| Pinterest - Lead | Pinterest Tag | CE - generate_lead | `ad_storage` |
| Pinterest - Signup | Pinterest Tag | CE - sign_up | `ad_storage` |

Configure **Tag Sequencing** on every event tag: Advanced Settings > Tag Sequencing > fire `Pinterest - Base` first. Pinterest's GTM guide explicitly requires the base to fire before any event tag.

### Per-Event Parameter Mapping

| Event | Mapping |
|---|---|
| **Checkout** | `event_id` → `{{DLV - ecommerce.transaction_id}}`, `order_id` → same, `value` → `{{DLV - ecommerce.value}}`, `currency` → `{{DLV - ecommerce.currency}}`, `order_quantity` → `{{CJS - Pinterest Order Quantity}}`, `line_items` → `{{CJS - Pinterest Line Items}}` |
| **AddToCart** | `event_id` → `{{DLV - event_id}}`, `value` → `{{DLV - ecommerce.value}}`, `currency` → `{{DLV - ecommerce.currency}}`, `line_items` → `{{CJS - Pinterest Line Items}}` |
| **PageVisit** | `line_items` → `{{CJS - Pinterest Line Items}}` (on PDP) |
| **InitiateCheckout** | `value`, `currency`, `line_items` |
| **Search** | `search_query` → `{{DLV - search_term}}` |
| **Lead** | `event_id` → `{{DLV - form.submission_id}}`, `lead_type` → `{{DLV - form.type}}` |

### Variables

**Constant**:

| Variable | Value |
|---|---|
| `Const - Pinterest Tag ID` | (Pinterest Tag ID) |

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
| `DLV - form.type` | `form.type` |

**Custom JS** (GA4 items → Pinterest `line_items`):

```javascript
// Variable name: CJS - Pinterest Line Items
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return [];
  return items.map(function(item) {
    return {
      product_id: item.item_id || '',
      product_name: item.item_name || '',
      product_category: item.item_category || '',
      product_variant: item.item_variant || '',
      product_price: Number(item.price || 0),
      product_quantity: item.quantity || 1,
      product_brand: item.item_brand || ''
    };
  }).filter(function(x) { return x.product_id; });
}
```

```javascript
// Variable name: CJS - Pinterest Order Quantity
function() {
  var ecommerce = {{DLV - ecommerce}};
  var items = ecommerce && ecommerce.items;
  if (!items || !items.length) return 0;
  return items.reduce(function(sum, item) {
    return sum + (Number(item.quantity) || 0);
  }, 0);
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
| CE - search | Custom Event | `search` |
| CE - generate_lead | Custom Event | `generate_lead` |
| CE - sign_up | Custom Event | `sign_up` |

> Custom event names are **case-sensitive** and must match the dataLayer `event` value exactly.

---

## 3. Conversion Tracking

### Event ID and Deduplication

`event_id` is the deduplication key. Pinterest matches on identical event ID across the Pinterest Tag and the Conversions API to suppress duplicates. Practical rules:

- Generate **one stable `event_id` per user action**.
- Send the **same `event_id`** through the Pinterest Tag and the Conversions API for the same event.
- For purchases, `order_id` can be reused as `event_id` if it is unique and stable.
- For non-purchase events, generate a UUID/submission ID before either browser or server fires.

The Events Overview > Deduplication report shows event ID coverage and the rate of duplicate events removed.

### Campaign and Feature Requirements

| Campaign / Feature | Required Events | Required Event Data |
|---|---|---|
| Catalog sales | PageVisit, AddToCart, Checkout | `product_id`, `order_id`, `value`, `currency` (on AddToCart and Checkout) |
| Conversion insights | PageVisit, AddToCart, Checkout | `currency` |
| Verified Merchant Program | PageVisit, AddToCart, Checkout | `currency` |
| Dynamic retargeting | PageVisit, AddToCart, Checkout | `product_id`, `value`, `currency` |
| Conversions campaign | At least one of Signup, Lead, AddToCart, Checkout | (depends on optimization goal) |

---

## 4. Conversions API

Pinterest's Conversions API (CAPI) sends conversions server-to-server. Pinterest recommends a **dual integration**: the Pinterest Tag plus CAPI for the same events, deduplicated by `event_id`. CAPI supports web, in-app, and offline / in-store conversions.

### Endpoint and Authentication

```
POST https://api.pinterest.com/v5/ad_accounts/{ad_account_id}/events
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
```

- Generate the access token in Pinterest Ads Manager under **Conversions > Set Up API**.
- Test events: append `?test=true` to the same path. Test events do not affect production reports.

### Event Schema

CAPI event objects commonly include:

| Field | Required | Description |
|---|---|---|
| `event_name` | Required | Event name matching the Pinterest Tag event. |
| `action_source` | Required | `web`, `app_android`, `app_ios`, `offline`, etc. |
| `event_time` | Required | UNIX timestamp (seconds). |
| `event_id` | Required for dedup | Same value used in the Pinterest Tag. |
| `event_source_url` | Recommended | Page URL for web events. |
| `user_data` | Required | Identity / matching fields (see below). |
| `custom_data` | Optional | `value`, `currency`, `order_id`, `content_ids`, `content_name`, `num_items`, etc. |

> The Pinterest Developer Platform is the source of truth for the request schema, accepted `event_name` casing, and full field list. Verify before shipping.

### `user_data` Identity Fields

CAPI accepts the following identity fields. PII fields must be SHA-256 hashed; non-PII fields are sent as-is.

| Field | Hashing | Description |
|---|---|---|
| `em` | SHA-256 | Email (lowercase, trimmed before hashing). |
| `ph` | SHA-256 | Phone (digits only, country code, no leading zeros). |
| `fn` | SHA-256 | First name (lowercase). |
| `ln` | SHA-256 | Last name (lowercase). |
| `ge` | SHA-256 | Gender (`f` / `m`). |
| `db` | SHA-256 | Date of birth (`YYYYMMDD`). |
| `ct` | SHA-256 | City (lowercase, no spaces). |
| `st` | SHA-256 | State / region (2-letter where applicable). |
| `zp` | SHA-256 | Postal code (no spaces / hyphens). |
| `country` | SHA-256 | ISO-3166 country code (lowercase). |
| `external_id` | SHA-256 recommended | Advertiser-side user ID. |
| `hashed_maids` | SHA-256 | Mobile advertising IDs (IDFA / GAID). |
| `client_ip_address` | None | IPv4 / IPv6. |
| `client_user_agent` | None | Browser UA string. |
| `click_id` | None | Pinterest click ID where available. |

At least one identifier is required per event. Pre-hash all PII before sending; do not rely on the server to hash.

### Batch Limits

Per partner-connector documentation (Tealium):

- Up to **1000 events per request**
- Maximum payload **2 MB**
- Oldest event in a batch within **10 minutes**

Confirm exact current limits in the Pinterest Developer Platform docs.

### Test Events

```
POST https://api.pinterest.com/v5/ad_accounts/{ad_account_id}/events?test=true
```

Validate in Pinterest Ads Manager > Conversions > Test Events. Test traffic is excluded from reporting.

### Operational Rules

- Send events near real time, ideally within **1 hour** of the user action.
- Use Limited Data Processing where required by US state privacy laws.
- Decide upfront which events run through both Tag and CAPI; at minimum, dual-send Checkout.

---

## 5. Enhanced Match

Two related matching features:

### Enhanced Match (manual)

Pass the user's email at tag load to improve cross-device match when a Pinterest cookie is absent.

```javascript
pintrk('load', '<TAG_ID>', { em: '<EMAIL_OR_HASH>' });
pintrk('page');
```

- The JS `em` parameter accepts hashed **or** unhashed email; the tag hashes unhashed values with SHA-256 in the browser before transmission.
- Pinterest does not store unhashed values.
- For `<img>` (no-JS) tags, the email **must be pre-hashed** (SHA-256 preferred; SHA-1 and MD5 also accepted).
- In GTM, set the **Hashed Email** field on the base tag using a data layer variable populated only after consent.

### External ID

Send an opaque advertiser-side ID alongside conversions, either at load or via `pintrk('set', ...)`:

```javascript
pintrk('load', '<TAG_ID>', { external_id: '<value>' });
pintrk('set', { external_id: '<value>' });
```

Use an internal user ID, never an email, phone number, or name.

### Automatic Enhanced Match

Pinterest auto-detects form fields and sends hashed customer information (email, first / last name, phone, gender, birthdate, external ID, city, state, ZIP, country). Constraints:

- JavaScript tags only (not `<img>` tags).
- The Pinterest Tag must be present on every page where the relevant form fields appear.
- The tag must run in the page environment, not an iframe.
- Pinterest enables Automatic Enhanced Match by default for new advertisers installing the Pinterest Tag for the first time.

> **Automatic Enhanced Match captures form-field data automatically.** For privacy-sensitive or regulated sites, disable it in Ads Manager and rely on consent-controlled Manual Enhanced Match or server-side CAPI matching. Treat enabling it as a decision that requires explicit consent and legal review.

---

## 6. Audiences (Remarketing)

Audiences are defined in Pinterest Ads Manager. The Pinterest Tag feeds the following audience types:

- **Visitors**: visited the site or fired specific events (rules over event names and event data).
- **Engagers / shoppers**: built from `addtocart`, `checkout`, and other commerce events.
- **Customer list**: hashed email / phone uploads (manual or via CAPI).
- **Actalike (lookalike)**: derived from any source audience.

For dynamic retargeting and catalog sales, all `pagevisit`, `addtocart`, and `checkout` events must include `product_id` values that match the product IDs in the catalog feed.

---

## 7. Privacy and Consent

### Consent Classification

Pinterest Tag is an advertising and conversion measurement tag. Default consent gates:

- `ad_storage` for the base tag and all event tags.
- `ad_user_data` when sending hashed customer data via Enhanced Match or CAPI.
- `ad_personalization` when using audiences, retargeting, or dynamic retargeting.

For strict opt-in regions, block the base tag entirely until the relevant ad consent is granted — loading the base tag fetches Pinterest scripts and sets / reads identifiers.

### Limited Data Processing (LDP)

Pinterest's GTM guide includes LDP fields for US state privacy compliance:

- Set **Opt Out Type** to `LDP`.
- **State**: SHA-256 hash of the USPS state abbreviation.
- **Country**: SHA-256 hash of the ISO-3166 country code.

Only enable LDP when the project has a defined privacy-state signal. Do not guess location in GTM.

### Cookies

The Pinterest Tag sets a first-party cookie used for visitor measurement. Verify current cookie names and lifetimes in Pinterest Ads Manager / browser DevTools for the deployment region.

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
      { item_id: 'SKU001', item_name: 'Parker Boots', item_category: 'Shoes',
        item_brand: 'Parker', price: 99.99, quantity: 1 }
    ]
  }
});
```

| Pinterest Field | Value |
|---|---|
| Event | `checkout` |
| `event_id` | `{{DLV - ecommerce.transaction_id}}` |
| `order_id` | `{{DLV - ecommerce.transaction_id}}` |
| `value` | `{{DLV - ecommerce.value}}` |
| `currency` | `{{DLV - ecommerce.currency}}` |
| `order_quantity` | `{{CJS - Pinterest Order Quantity}}` |
| `line_items` | `{{CJS - Pinterest Line Items}}` |

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

| Pinterest Field | Value |
|---|---|
| Event | `lead` |
| `event_id` | `{{DLV - form.submission_id}}` |
| `lead_type` | `{{DLV - form.type}}` |

> Never push raw email, phone, name, or free-form message content into the dataLayer for ad pixels. Hash any matching identifiers and gate them behind consent.

### GA4 → Pinterest Event Mapping

| GA4 Event | Pinterest Event |
|---|---|
| `purchase` | Checkout |
| `add_to_cart` | AddToCart |
| `view_item` | PageVisit (PDP) or ViewContent |
| `view_item_list` | ViewCategory |
| `begin_checkout` | InitiateCheckout |
| `add_payment_info` | AddPaymentInfo |
| `add_to_wishlist` | AddToWishList |
| `search` | Search |
| `sign_up` | Signup |
| `generate_lead` | Lead |
| `subscribe` | Subscribe |
| `contact` | Contact |
| `schedule` | Schedule |
| `start_trial` | StartTrial |

---

## 9. Debugging

| Tool | What to Verify |
|---|---|
| **GTM Preview Mode** | Tag firing order (Base → Event), variable values, event data structure. |
| **Pinterest Tag Helper** (Chrome extension) | Tag detection, event count, event data per event, Enhanced Match value. CAPI cannot be validated here. |
| **Test Events** (Ads Manager > Conversions) | Real-time inspection of events and captured data; works for both Tag and CAPI (`?test=true`). |
| **Events Overview** (Ads Manager) | Event volume, deduplication coverage, error rate. |
| **DevTools Network** | Confirm `https://s.pinimg.com/ct/core.js` loads and event requests hit `https://ct.pinterest.com/v3/`. |

### Pinterest Tag Helper signals

The Tag Helper warns on common quality issues:

- The same `product_id` passed for many events (static or broken dynamic variable).
- PageVisit / AddToCart / Checkout missing `product_id` (breaks dynamic retargeting).
- Missing `product_category` (degrades audience creation).
- Checkout `value` missing, zero, unrecognized, or unusually high.
- Static Enhanced Match email hash or static `order_id` (each event should be unique).
- Empty / `undefined` / `null` Enhanced Match — expected when the user is not logged in or no email is available.

For SPAs the Tag Helper accumulates events across in-page navigation. Verify against actual network requests when output looks surprising.

### Content Security Policy

Allow these domains in the site's CSP:

- `s.pinimg.com` — script source for `core.js`.
- `ct.pinterest.com` — event endpoint.

---

## 10. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---|---|---|
| Event tag fires before base tag | Events drop or fail to attribute | Tag Sequencing: fire `Pinterest - Base` first on every event tag. |
| Mapping `purchase` to a custom event | Loses Checkout-based optimization signals | Always map GA4 `purchase` → Pinterest `checkout`. |
| `product_id` does not match catalog | Dynamic retargeting and catalog sales break | Use the exact catalog feed IDs, case preserved. |
| Missing `event_id` in dual Tag + CAPI | Double counting and inflated conversion volume | Generate one stable ID per action, send through both paths. |
| Reusing the same `event_id` across actions | Wrong dedup behavior | One unique ID per user action. |
| Automatic Enhanced Match enabled silently | Form-field PII leaves the page without explicit review | Disable by default for regulated sites; require explicit approval. |
| Raw PII in event parameters | Privacy violation and Tag Helper warnings | Never send email, phone, name, address, or message content as event data. |
| `search_query` contains sensitive content | Sensitive intent transmitted to Pinterest | Suppress or categorize sensitive searches. |
| Missing CSP exceptions | Pinterest scripts or beacons blocked | Allow `s.pinimg.com` and `ct.pinterest.com`. |
| LDP state / country not hashed | LDP flag invalid | Use SHA-256 of USPS state and ISO-3166 country code. |
| Loading tag in iframes | Automatic Enhanced Match cannot run | Load the tag in the main page environment. |
| Static order ID values | Fails deduplication and inflates dedup warnings | Generate per-transaction order IDs. |
| Sending value as a string | Reporting may drop / mis-parse `value` | Always send `value` as a number; pair with `currency`. |

---

## 11. References

- [Set up the Pinterest tag with Google Tag Manager](https://help.pinterest.com/en/business/article/google-tag-manager-and-pinterest-tag)
- [Add event codes](https://help.pinterest.com/en/business/article/add-event-codes)
- [Track conversions with the Pinterest tag](https://help.pinterest.com/en/business/article/track-conversions-with-pinterest-tag)
- [Enable optional enhanced match](https://help.pinterest.com/en/business/article/enhanced-match)
- [Enable automatic enhanced match](https://help.pinterest.com/en/business/article/automatic-enhanced-match)
- [Verify the Pinterest tag](https://help.pinterest.com/en/business/article/verify-the-pinterest-tag)
- [Getting started with the Conversions API](https://help.pinterest.com/en/business/article/getting-started-with-the-conversions-api)
- [The Pinterest Conversions API](https://help.pinterest.com/en/business/article/the-pinterest-api-for-conversions)
- [Validating your set up with Event Testing](https://help.pinterest.com/en/business/article/validating-your-set-up-with-event-testing)
- [Pinterest Developer Platform - Conversions API (v5)](https://developers.pinterest.com/docs/api/v5/)
- [Pinterest Tag Helper (Chrome Web Store)](https://chromewebstore.google.com/)
