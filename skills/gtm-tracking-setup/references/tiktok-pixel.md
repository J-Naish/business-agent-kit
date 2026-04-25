# TikTok Pixel - GTM Implementation Manual

> Always verify the latest specifications in [TikTok Pixel](https://ads.tiktok.com/help/article/tiktok-pixel) and [Standard Events & Parameters](https://ads.tiktok.com/help/article/standard-events-parameters).

---

## 1. Event & Parameter Reference

### Standard Events

> **PageView (page tracking)**: Separate from standard events. Fires automatically via `ttq.page()` in the Base Code. In GTM, this is handled by the Base tag (All Pages trigger). Use the standard events below for optimization and conversion design.

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
| **Login** | Successful login |

> **Migration of legacy event names** (two categories):
> - **Renamed (legacy names still supported)**: CompletePayment→Purchase, SubmitForm→Lead (automatically converted to the new names in the backend; legacy names still work)
> - **Soft-deprecated (until 2027)**: ClickButton, PlaceAnOrder (verify with official docs)
> **Always use the new names for new implementations.**
>
> **Note**: The list above reflects the state at the time of research. For events usable for optimization and bidding, treat [Supported standard events](https://ads.tiktok.com/help/article/standard-events-parameters) as the source of truth.

### Event Parameters

| Parameter | Type | Description |
|-----------|------|------|
| `value` | Number | Total order amount (always send together with `currency`. Required for ROAS measurement and VBO) |
| `currency` | String | ISO 4217 currency code (e.g., `'USD'`) |
| `content_id` | String | Product ID (must exactly match the catalog SKU ID. Required when using DPA) |
| `content_ids` | Array | Multiple product IDs (e.g., `['987','654']`) |
| `content_type` | String | `'product'` (when specifying SKU IDs) or `'product_group'` (when specifying group IDs). Required when using DPA |
| `content_name` | String | Product name / page name |
| `content_category` | String | Product category |
| `contents` | Array | Array of product details (see table below) |
| `price` | Number | Unit price (`value` = total amount, `price` = per-unit price. Distinct concepts) |
| `quantity` | Integer | Quantity |
| `search_string` | String | On-site search query (recommended for the Search event. Note: some docs reference this as `query`) |
| `description` | String | Additional description of the item |
| `status` | String | Status |
| `order_id` | String | Order ID |
| `num_items` | Integer | Number of items |

> **event_id**: A unique identifier specified in the **configuration object (third argument)**, not in the event parameters (second argument). Required for deduplication when used together with the Events API. In GTM templates, set it via the dedicated field.

### contents Array

| Parameter | Type | Description |
|-----------|------|------|
| `content_id` | String | Product ID (must exactly match the catalog SKU ID. Case-sensitive) |
| `content_type` | String | `'product'` or `'product_group'` |
| `content_name` | String | Product name |
| `content_category` | String | Category |
| `price` | Number | Unit price |
| `quantity` | Integer | Quantity |
| `brand` | String | Brand name |

---

## 2. GTM Configuration

### Prerequisites

- A **Pixel ID** has been obtained from TikTok Ads Manager > Events Manager
- **Recommended**: Use **automatic setup** from Events Manager > Settings > Partner Platform > Google Tag Manager (the Base Code tag along with event tags, triggers, and variables are automatically installed in GTM)
- **For manual setup**: Place the Base Code (`ttq.load()` + `ttq.page()`) in a Custom HTML tag, and use the GTM community template "**TikTok Pixel**" for sending events (GitHub: [tiktok/gtm-template-pixel](https://github.com/tiktok/gtm-template-pixel). Note: the template name in the gallery may change)

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

Configure **tag sequencing** for all event tags: Advanced Settings > Tag Sequencing > fire `TikTok Pixel - Base` first.

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

**Custom JavaScript Variable** (converts GA4 items → TikTok Pixel contents):

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

- Duplicate detection criteria: identical **event_source_id** (Pixel ID) + **event** (event name) + **event_id**
- Same source (Pixel-to-Pixel / Events API-to-Events API): events with the same event_id within **48 hours** of the first event are dropped (approximate; verify with official specs)
- Pixel ↔ Events API: events **within 5 minutes** are merged (data combined); events arriving **between 5 minutes and 48 hours** later are dropped
- Use a **stable ID** for event_id (e.g., order ID). When using the Events API together, send the **same event_id** from both Pixel and Events API.

### Event Name Migration

- **Renamed (legacy names still supported)**: CompletePayment→Purchase, SubmitForm→Lead (automatically converted in the backend)
- **Soft-deprecated (until 2027)**: ClickButton, PlaceAnOrder (verify with official docs)
- **Always use the new names for new implementations**

### Consent Management

There is no TikTok-native equivalent to Google Consent Mode. **Control via GTM consent settings is the standard approach**:

- Add **`ad_storage`** as an additional consent check on all TikTok tags (including Base)
- Tags will not fire until CMP integration sets `ad_storage: granted`
- For strict GDPR opt-in, the safest approach is to block the Base tag from firing (i.e., not load the Pixel itself) until consent is obtained, since `ttq.load()` has side effects such as fetching scripts and setting cookies.

The TikTok Pixel API also provides `holdConsent()` / `grantConsent()` / `revokeConsent()` methods, but official documentation on them is limited. Use GTM's consent settings as the primary control mechanism, and use the Pixel API methods only as a supplement.

### Advanced Matching (PII)

A feature that improves match rates with TikTok users via email and phone number:

- **Automatic**: Toggle on in Events Manager. Form fields are auto-detected (not recommended for regulated industries)
- **Manual**: Send hashed PII via `ttq.identify()`. If the GTM template provides dedicated fields, configure them there

| Field | Parameter Name | Hashed Parameter | Format |
|-----------|------------|-------------------|------------|
| Email | `email` | `sha256_email` | Lowercased → SHA-256 |
| Phone Number | `phone_number` | `sha256_phone_number` | E.164 format → SHA-256 |
| External ID | `external_id` | `sha256_external_id` | SHA-256 |

**Recommendation**: Client-side transmission carries a risk of leakage to other tags. Whenever possible, send pre-hashed values via the `sha256_*` parameters. **Server-side transmission via the Events API is strongly recommended.**

### EMQ (Event Match Quality)

- Conversion event match quality is measured on a **scale of 0–10**. **Target: 6.0 or higher**
- Improvement tactics: hashed email + phone number + external_id + ttclid + _ttp + enabling advanced matching + using the Events API in conjunction

### Custom Events

Arbitrary actions outside the standard events can be tracked. However, **use standard events for campaign optimization** (custom events are primarily for reporting purposes).

### SPA Environments

- Whether TikTok Pixel automatically detects URL changes within an SPA **varies by environment** (depends on framework and routing approach; test in your actual environment)
- If automatic detection does not work, events on route changes (e.g., ViewContent) must be fired separately using triggers such as History Change
- **Watch for double-firing**: ensure automatic detection and manual calls do not overlap

### Catalog / DPA Requirements

The **three events ViewContent, AddToCart, and Purchase are required**. All events must include `content_id` (must exactly match the catalog SKU ID, case-sensitive) + `content_type`. Purchase additionally requires `value` + `currency`. In addition to the `contents` array, also including top-level `content_ids` / `content_type` improves compatibility with shopping ads (e.g., Video Shopping Ads). The Pixel Upload feature automatically updates the catalog (within approximately 15 minutes).

---

## 4. Events API

TikTok-recommended hybrid setup: use Pixel (client) + Events API (server) together, with `event_id` for deduplication.

> **Operational policy**: Ideally, all conversion events sent via Pixel (Purchase, Lead, etc.) should also be sent via the Events API. At minimum, send Purchase from both sides and deduplicate using `event_id`. Decide upfront which events will also be sent through the Events API.

### Required Identifiers (at least one)

| Identifier | Match Accuracy | Description |
|--------|-----------|------|
| ttclid | Highest | TikTok Click ID. Retrieved from URL parameters (valid for 30 days) |
| _ttp | High | First-party cookie set by TikTok Pixel |
| Email Address (SHA256) | High | Hash after lowercasing |
| Phone Number (SHA256, E.164) | High | Hash after converting to E.164 format |
| external_id (SHA256) | Medium | Advertiser's user ID |
| IP + User Agent | Low | Fallback (lowest priority) |

**ttclid / _ttp linkage**: The Pixel automatically retrieves `?ttclid=XXX` from URL parameters and sets the `_ttp` cookie. On the Events API side, save `ttclid` and `_ttp` server-side at landing time and send them as `user.ttclid` / `user.ttp` at conversion time.

### Events API Parameters

| Parameter | Path | Required | Description |
|---|---|---|---|
| `event_source` | top-level | Required | `'web'` (for websites) |
| `event_source_id` | top-level | Required | Pixel ID |
| `event` | data[] | Required | Event name (same name as Pixel) |
| `event_time` | data[] | Required | UNIX timestamp (seconds) |
| `event_id` | data[] | Required when used with Pixel | Deduplication ID (same value as Pixel) |
| `user.ttclid` | data[].user | Recommended | TikTok Click ID |
| `user.ttp` | data[].user | Recommended | Value of the `_ttp` cookie |
| `user.email` | data[].user | Recommended | SHA-256 hashed email |
| `user.phone` | data[].user | Recommended | SHA-256 hashed phone number (E.164) |
| `user.external_id` | data[].user | Optional | SHA-256 hashed user ID |
| `user.ip` | data[].user | Recommended | IPv4/IPv6 |
| `user.user_agent` | data[].user | Recommended | Browser UA string |
| `properties.value` | data[].properties | Optional | Conversion amount |
| `properties.currency` | data[].properties | Optional | ISO 4217 currency code |
| `properties.contents` | data[].properties | Optional | Product detail array (same structure as Pixel) |
| `test_event_code` | top-level | During testing | Test code (does not affect production reports) |

**Endpoint**: `POST https://business-api.tiktok.com/open_api/v1.3/event/track/`
**Authentication**: `Access-Token` header (generated in Events Manager. Admin/Operator privileges required)

### sGTM

- Authentication: **Access Token** (generated in Events Manager)
- Template: [tiktok/gtm-template-eapi](https://github.com/tiktok/gtm-template-eapi) (automatically recognizes GA4 standard events and converts them to TikTok events)
- Testing: validate by adding `test_event_code` to the request (does not affect production reports)
- Batch limits (approximate; verify with official docs): up to 50 events per batch, oldest event within 5 minutes, payload under 1MB

---

## 5. Debugging

| Tool | What to Verify |
|--------|---------|
| **GTM Preview Mode** | Tag firing order (Base→Event), variable values |
| **TikTok Pixel Helper** (Chrome extension) | Pixel detection, parameters, errors (green/yellow/red indicators). Cannot validate the Events API |
| **Test Events** (Events Manager) | Real-time event reception check (via QR code). For the Events API, validate using `test_event_code` |
| **Web Diagnostics** (Events Manager) | Errors (critical) / Warnings (quality-impacting) / Suggestions (optimization-recommended) |
| **DevTools Network** | Check requests to `analytics.tiktok.com`, etc. |
| **EMQ Score** (Events Manager) | Check match quality score (target: 6.0 or higher) |

---

## 6. References

- [TikTok Pixel](https://ads.tiktok.com/help/article/tiktok-pixel)
- [Standard Events & Parameters](https://ads.tiktok.com/help/article/standard-events-parameters)
- [Custom Events](https://ads.tiktok.com/help/article/custom-events)
- [Advanced Matching for Web](https://ads.tiktok.com/help/article/advanced-matching-web)
- [Events API](https://ads.tiktok.com/help/article/events-api)
- [Event Deduplication](https://ads.tiktok.com/help/article/event-deduplication)
- [GTM Setup](https://ads.tiktok.com/help/article/get-started-google-tag-manager)
- [GTM Pixel Template (GitHub)](https://github.com/tiktok/gtm-template-pixel)
- [GTM Events API Template (GitHub)](https://github.com/tiktok/gtm-template-eapi)
- [TikTok Pixel Helper](https://ads.tiktok.com/help/article/tiktok-pixel-helper-2.0)
- [Web Diagnostics](https://ads.tiktok.com/help/article/web-diagnostics)
- [Value-Based Optimization (Web)](https://ads.tiktok.com/help/article/value-based-optimization-web)
- [Catalog Event Match Rates](https://ads.tiktok.com/help/article/best-practices-for-increasing-catalog-event-match-rates)
- [Using Cookies with TikTok Pixel](https://ads.tiktok.com/help/article/using-cookies-with-tiktok-pixel)
