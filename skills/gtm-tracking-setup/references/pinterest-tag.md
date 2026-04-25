# Pinterest Tag - GTM Implementation Manual

> Source of truth: [Install the Pinterest tag (Pinterest Help Center)](https://help.pinterest.com/en/business/article/install-the-pinterest-tag) — entry point with links to base code setup, event codes, and the Pinterest Conversions API.

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
| `currency` | String | ISO currency code (e.g. `USD`, `EUR`, `JPY`). |
| `order_id` | String | Required for conversion analysis reporting. |
| `order_quantity` | Integer | Item quantity. Used in conversion reporting. |
| `event_id` | String | Unique event identifier used for deduplication. |
| `promo_code` | String | Promotion code. |
| `property` | String | Property / brand context. |
| `search_query` | String | Search term (for `search`). Avoid sensitive search content. |
| `video_title` | String | Video title (for `watchvideo`). |
| `lead_type` | String | Lead category (for `lead`). |
| `line_items` | Array | Array of product detail objects (see below). |

Pinterest accepts the event ID under any of these case-sensitive field names: `eventID`, `event_id`, `eid`. Use `event_id` consistently for new implementations.

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
- Catalog product IDs available on PDP, cart, and purchase pages if running dynamic retargeting.

### Installation

GTM has a built-in **Pinterest Tag** template. Prefer the template over Custom HTML — it handles the loader and `pintrk('page')` call internally.

### Key Template Fields

| Field | Description |
|---|---|
| **Tag ID** | Pinterest Tag ID (constant variable). |
| **Event to Fire** | Standard event name (`pagevisit`, `checkout`, etc.) or custom. |
| **Event Data** / **Custom Parameters** | Event parameters (`value`, `currency`, `order_id`, `line_items`, etc.). |
| **Event ID** | Unique deduplication ID. |
| **Hashed Email** | Enhanced Match field. |
| **Opt Out Information** | Limited Data Processing flag. |

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

Configure **Tag Sequencing** on every event tag: fire `Pinterest - Base` first.

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

> Custom event names are case-sensitive and must match the dataLayer `event` value exactly.

---

## 3. Event ID and Deduplication

`event_id` is the deduplication key. Pinterest matches on identical event ID across the Pinterest Tag and the Conversions API to suppress duplicates. Generate one stable `event_id` per user action, and send the same value through both browser and server paths for the same event. For purchases, `order_id` may be reused as `event_id` if unique and stable.

---

## 4. Conversions API

Pinterest's CAPI sends conversions server-to-server, enabling server-side GTM dual-send (Pixel + CAPI) deduplicated by `event_id`. Use the **server-side GTM Pinterest CAPI tag template** with an access token generated in Pinterest Ads Manager > Conversions > Set Up API. Keep tokens server-side only. See the official Pinterest Conversions docs for endpoint, payload schema, and hashing rules.

---

## 5. Enhanced Match

Enhanced Match passes a hashed email at tag load to improve cross-device matching. In GTM, set the **Hashed Email** field on the Pinterest Tag template using a data layer variable populated only after consent. Automatic Enhanced Match auto-detects form fields and submits hashed customer data — disable it in Ads Manager for regulated sites and rely on consent-controlled Manual Enhanced Match. See the official Pinterest docs for field-level normalization and hashing details.

---

## 6. Privacy and Consent

Gate the Pinterest base tag and all event tags behind `ad_storage`. For strict opt-in regions, block the base tag entirely until consent is granted — loading it fetches Pinterest scripts and sets identifiers. Variables that produce hashed identifiers must return `undefined` when consent is denied.

For US state privacy compliance, the GTM template exposes Limited Data Processing fields (Opt Out Type = `LDP`, plus hashed state and country). Only enable LDP when the project has a defined privacy-state signal — do not infer location in GTM.

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

## 8. Debugging

| Tool | Purpose |
|---|---|
| GTM Preview Mode | Verify tag firing order (Base → Event), variables, event data. |
| Pinterest Tag Helper (Chrome) | Pixel detection, event payloads, Enhanced Match value. |
| Test Events (Ads Manager > Conversions) | Real-time inspection for both Tag and CAPI (`?test=true`). |

---

## 9. Best Practices and Common Pitfalls

| Pitfall | Impact | Prevention |
|---|---|---|
| Event tag fires before base tag | Events drop or fail to attribute | Tag Sequencing: fire `Pinterest - Base` first on every event tag. |
| Mapping `purchase` to a custom event | Loses Checkout-based optimization signals | Always map GA4 `purchase` → Pinterest `checkout`. |
| `product_id` does not match catalog | Dynamic retargeting and catalog sales break | Use the exact catalog feed IDs. |
| Missing `event_id` in dual Tag + CAPI | Double counting and inflated conversions | One stable ID per action, sent through both paths. |
| Raw PII in event parameters | Privacy violation | Never send email, phone, name, address, or message content as event data. |
