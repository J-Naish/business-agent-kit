# Meta Pixel - GTM Implementation Manual

> Always verify the latest specifications in the [Meta Pixel Reference](https://developers.facebook.com/docs/meta-pixel/reference) and [Events Manager](https://business.facebook.com/events_manager).

---

## 1. Event and Parameter Reference

### Standard Events

| # | Event Name | Use Case | Required Parameters |
|---|-----------|-------|-------------|
| 1 | **PageView** | All pages (fired on every page as the Base tag in templates) | None |
| 2 | **ViewContent** | Product detail, content view | Recommended: `content_ids`, `value`, `currency` |
| 3 | **Search** | On-site search | Recommended: `search_string` |
| 4 | **AddToCart** | Add to cart | Recommended: `content_ids`, `value`, `currency` |
| 5 | **AddToWishlist** | Add to wishlist | None |
| 6 | **InitiateCheckout** | Start checkout | Recommended: `value`, `currency`, `num_items` |
| 7 | **AddPaymentInfo** | Payment info entered | None |
| 8 | **Purchase** | Purchase completed | **`value` (required), `currency` (required)** (needed for optimization, ROAS measurement, and DPA. Missing values prevent the event from being used for optimization.) |
| 9 | **Lead** | Lead acquisition | Recommended: `value`, `currency` |
| 10 | **CompleteRegistration** | Registration completed | None |
| 11 | **Contact** | Inquiry / contact | None |
| 12 | **CustomizeProduct** | Product customization | None |
| 13 | **Donate** | Donation | None |
| 14 | **FindLocation** | Store / location search | None |
| 15 | **Schedule** | Booking / appointment | None |
| 16 | **StartTrial** | Free trial started | Recommended: `value`, `currency` |
| 17 | **SubmitApplication** | Application submitted | None |
| 18 | **Subscribe** | Paid subscription started | Recommended: `value`, `currency` |

> The number of events may change as Meta updates its specifications. Treat the [Meta Pixel Reference](https://developers.facebook.com/docs/meta-pixel/reference) as the source of truth.

### Event Parameters

| Parameter | Type | Description |
|-----------|------|------|
| `value` | Float | Monetary amount (**must be sent as a number; strings are not allowed**. Always paired with `currency`.) |
| `currency` | String | ISO 4217 currency code (e.g. `'USD'`) |
| `content_name` | String | Product or content name |
| `content_category` | String | Category |
| `content_ids` | Array[String] | Array of product IDs (must match the catalog product IDs; required for DPA) |
| `content_type` | String | `'product'` (per SKU) or `'product_group'` (group including variants) |
| `contents` | Array[Object] | Array of product detail objects (see table below) |
| `num_items` | Integer | Number of items |
| `predicted_ltv` | Float | Predicted LTV (used for Subscribe and StartTrial) |
| `search_string` | String | Search keyword (used in Search event) |
| `status` | Boolean | Registration status, etc. (`true` / `false`) |

> **eventID**: A unique identifier specified in the **options object (4th argument)** rather than the event parameters (3rd argument): `fbq('track', 'Purchase', {params}, {eventID: '...'})`. Required for deduplication when used with CAPI. In the GTM template, set it via the "Event ID" field.

### contents array

| Parameter | Type | Description |
|-----------|------|------|
| `id` | String | Product ID (must match the catalog ID; required for DPA) |
| `quantity` | Integer | Quantity |
| `item_price` | Float | Unit price |

---

## 2. GTM Configuration

### Prerequisites

- A **Pixel ID** has been obtained in Meta Events Manager
- Use the GTM community template "**Facebook Pixel**" (maintainers: facebookarchive / Simo Ahava. Note: the template name may change in the gallery.)
- A separate template "**Facebook Pixel by Stape**" is also available (with built-in DataLayer integration and Enhanced Ecommerce auto-mapping)
- Because the template internally handles loading `fbevents.js` and initialization (`fbq('init', ...)`), **a Custom HTML Base Code is not required**

### Key Template Configuration Options

| Setting | Description |
|---|---|
| **Pixel ID** | Meta Pixel ID (multiple IDs can be comma-separated) |
| **Event Name** | Standard event name or custom event name (variables can also be used) |
| **Object Properties** | Event parameters (table or JS variable) |
| **Event ID** | Unique identifier for deduplication (required when integrating with CAPI) |
| **Advanced Matching** | Enables sending of user data (email, phone, etc.) |
| **Consent Granted** | When `false`, only loads the SDK and stops sending data (integrates with Meta Consent Mode) |
| **Enhanced Ecommerce** | Auto-maps the DataLayer ecommerce object (UA format supported. For the GA4 `items` format, check the template's support status.) |
| **Disable Automatic Configuration** | Disables automatic collection of button clicks and metadata |

### Tags

| Tag Name | Template | Trigger | Consent |
|--------|------------|---------|------|
| Meta Pixel - PageView | Facebook Pixel | All Pages | ad_storage |
| Meta Pixel - Purchase | Facebook Pixel | CE - purchase | ad_storage |
| Meta Pixel - Lead | Facebook Pixel | CE - generate_lead | ad_storage |
| Meta Pixel - CompleteRegistration | Facebook Pixel | CE - sign_up | ad_storage |
| Meta Pixel - AddToCart | Facebook Pixel | CE - add_to_cart | ad_storage |
| Meta Pixel - ViewContent | Facebook Pixel | CE - view_item | ad_storage |
| Meta Pixel - InitiateCheckout | Facebook Pixel | CE - begin_checkout | ad_storage |

Configure **tag sequencing** for all event tags: Advanced Settings > Tag Sequencing > fire `Meta Pixel - PageView` first. Since the template handles initialization internally, sequencing is more of a safety net, but it is recommended to ensure reliable Pixel initialization. For SPAs, design a separate setup using the History Change trigger.

### Per-Event Parameter Mapping

| Event | Mapping |
|---------|----------|
| **Purchase** | value -> `{{DLV - ecommerce.value}}`, currency -> `{{DLV - ecommerce.currency}}`, Event ID -> `{{DLV - ecommerce.transaction_id}}`, content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}` |
| **Lead** | Event ID -> `{{DLV - form.submission_id}}` |
| **CompleteRegistration** | status -> `true` |
| **AddToCart** | content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}` |
| **ViewContent** | content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}` |
| **InitiateCheckout** | content_ids -> `{{cjs - Meta Pixel Content IDs}}`, content_type -> `product`, contents -> `{{cjs - Meta Pixel Contents}}`, value -> `{{DLV - ecommerce.value}}`, currency -> `{{DLV - ecommerce.currency}}` |

### Variables

**Constant variables**:

| Variable Name | Value |
|--------|---|
| `Meta Pixel ID` | (Pixel ID) |

**Data Layer variables**:

| Variable Name | Data Layer Variable Name |
|--------|-------------------|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - form.submission_id` | `form.submission_id` |

**Custom JS variables** (GA4 items -> Meta Pixel conversion):

```javascript
// Variable name: cjs - Meta Pixel Contents
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (!ecommerce || !ecommerce.items) return [];
  return ecommerce.items.map(function(item) {
    return {
      id: item.item_id || '',
      quantity: item.quantity || 1,
      item_price: Number(item.price || 0)
    };
  }).filter(function(x) { return x.id; });
}
```

```javascript
// Variable name: cjs - Meta Pixel Content IDs
function() {
  var ecommerce = {{DLV - ecommerce}};
  if (!ecommerce || !ecommerce.items) return [];
  return ecommerce.items.map(function(item) {
    return item.item_id || '';
  }).filter(Boolean);
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

## 3. Meta Pixel-Specific Considerations

### eventID and Deduplication

- Deduplication criteria: matching **event_name** + **eventID** (time window: up to **48 hours** as a guideline, per the official help documentation. However, large transmission delays can break the merging/exclusion behavior, so send Pixel and CAPI events as close together in time as possible.)
- Use a **stable ID** (such as an order ID) for eventID. When using CAPI alongside Pixel, send the **same value** from both.
- **Watch out for naming differences**:

| Layer | Field Name | Format |
|---|---|---|
| Pixel (browser) | `eventID` | camelCase. The optional argument in `fbq('track', ..., {eventID: '...'})` |
| CAPI (server) | `event_id` | snake_case. JSON field of the API request |
| DataLayer (GTM) | Arbitrary (e.g. `meta_event_id`) | Retrieved via a GTM variable and passed to both the Pixel and CAPI tags |

The **value must be identical** across all three layers. Only the names differ.

### AEM (Aggregated Event Measurement)

A protocol for iOS 14.5+ ATT compliance. Specifications have been changing (removal of the previous 8-event limit, removal of the AEM tab, changes to domain verification requirements, etc.), so **treat the current Events Manager UI as the primary source of truth** for:

- Whether the AEM tab exists
- Whether event prioritization is required
- Whether domain verification is required

For accounts on the legacy specification, the 8-event prioritization and domain verification may still be required.

### Domain Verification

- Configure under Business Manager > Business Settings > Brand Safety > Domains
- Use either a **DNS TXT record** (recommended; not affected by site renewals) or an **HTML meta tag** (`<meta name="facebook-domain-verification" content="..." />`)
- There are reports that domain verification for AEM became unnecessary from mid-2025 onward (see above). However, it is still recommended for proving link ownership and preventing misuse.

### Consent Management

- **GTM consent settings are the foundation**: Add `ad_storage` as an Additional Consent Check on every Meta Pixel tag. With CMP integration, tags will not fire until `ad_storage: granted`.
- **Meta Consent Mode**: Integrates with the CMP to automatically reflect the user's consent choices. Granted = full data collection, Denied = privacy-preserving aggregated insights are estimated. Controlled via the template's "Consent Granted" setting.
- For strict GDPR opt-in, the safest design is to avoid loading `fbevents.js` itself until consent is obtained.

### Advanced Matching

A feature that improves match rates with Meta users using email, phone number, etc.:

- **Automatic**: Toggle on in Events Manager. Automatically detects form fields and sends them as hashed values.
- **Manual**: Send explicitly via `fbq('init', PIXEL_ID, {em, ph, ...})`. The Pixel automatically applies SHA-256 hashing. Configure in the Advanced Matching section of the GTM template.
- **Recommendation**: Use Automatic + Manual together to maximize EMQ.

| Parameter | Description | Format |
|---|---|---|
| `em` | Email address | Lowercase |
| `ph` | Phone number | Country code + number (digits only) |
| `fn` | First name | Lowercase |
| `ln` | Last name | Lowercase |
| `ge` | Gender | `f` or `m` |
| `db` | Date of birth | `YYYYMMDD` |
| `ct` | City | Lowercase, no spaces |
| `st` | State / prefecture | 2-letter code, lowercase |
| `zp` | Postal code | No hyphens |
| `country` | Country | ISO 3166-1 alpha-2 (`jp`, `us`) |
| `external_id` | External customer ID | Identifier from your own system |

> If raw PII (plaintext email or phone number) is included in the DataLayer, only push it to the DataLayer after cookie consent has been obtained (there is a risk of leakage via other tags). **Server-side transmission via CAPI is strongly recommended.**

### EMQ (Event Match Quality)

- **A score from 0 to 10** (shown next to each event in Events Manager; updated every 48 hours)
- **Goal: a score of 8 or higher for all key events**
- Improvement priorities:

| Priority | Data |
|---|---|
| Highest | Email (`em`) |
| High | Phone number (`ph`), `fbp` (`_fbp` cookie value), `fbc` (`_fbc` cookie value), `external_id` |
| Medium | First name (`fn`), last name (`ln`), city (`ct`) |
| Low | Country (`country`), date of birth (`db`), gender (`ge`) |

### Custom Events and Custom Conversions

- **Custom events**: `fbq('trackCustom', 'EventName', {...})`. **Prefer standard events whenever they can serve the purpose** (so you benefit from optimization based on Meta's global data). PascalCase is recommended for naming.
- **Custom conversions**: Defined via rules in Events Manager (URL patterns or event + filter conditions). No code changes required. Up to 100 per account.

### SPA Environments

- `fbevents.js` should be loaded only once on initial load. Do not reload it on every routing change.
- Events on route change (such as ViewContent) need to be designed separately, e.g. via a History Change trigger.
- If you want to send `PageView` on every route change in an SPA, fire an additional PageView tag using the History Change trigger.

### Dynamic Ads (DPA) / Catalog Requirements

**The three events ViewContent, AddToCart, and Purchase are required.** For all of them:

- `content_ids` (must exactly match catalog product IDs) and `content_type` (`'product'` or `'product_group'`) are required
- For Purchase, `value` and `currency` are also required
- Sending the `contents` array with product details (`id`, `quantity`, `item_price`) is also recommended

### Cookies

| Cookie Name | Lifetime | Purpose |
|-----------|---------|------|
| `_fbp` | About 3 months | Unique identifier for website visitors (first-party) |
| `_fbc` | About 3 months | Contains the Facebook ad click ID (`fbclid`) and links conversions back to the ad |

These are first-party cookies, so they continue to work in environments that restrict third-party cookies. When using CAPI alongside Pixel, also send the `_fbp` / `_fbc` values to the server to improve match quality.

---

## 4. Conversions API (CAPI)

Meta's recommended hybrid setup: use Pixel (client) and CAPI (server) together, deduplicating with `eventID` / `event_id`.

> **Operational policy**: Ideally, every conversion event sent via Pixel (Purchase, Lead, etc.) should also be sent via CAPI. At a minimum, send Purchase via both and deduplicate using eventID. Decide in advance which events will also be sent via CAPI.

### Required Identifiers

| Identifier | Priority | Hashing | Description |
|--------|-------|--------|------|
| `fbc` (_fbc cookie value) | Highest | Not required | Facebook Click ID (the cookie-stored form of fbclid) |
| `fbp` (_fbp cookie value) | High | Not required | Browser identifier |
| Email address (`em`) | High | SHA-256 required | Hash after lowercasing |
| Phone number (`ph`) | High | SHA-256 required | Hash with country code, digits only |
| `external_id` | Medium | SHA-256 recommended | Advertiser's user ID |
| `client_ip_address` + `client_user_agent` | Low | Not required | Fallback (sending recommended) |

### CAPI Parameters

| Parameter | Required | Description |
|---|---|---|
| `event_name` | Required | Event name (same as Pixel; **case must match exactly**) |
| `event_time` | Required | UNIX timestamp (in seconds) |
| `event_id` | Required when used with Pixel | Deduplication ID (same value as the Pixel `eventID`) |
| `event_source_url` | Recommended | URL of the page where the conversion occurred |
| `action_source` | Required | `'website'` (for websites) |
| `user_data.em` | Recommended | SHA-256 hashed email (array) |
| `user_data.ph` | Recommended | SHA-256 hashed phone number (array) |
| `user_data.fbc` | Recommended | `_fbc` cookie value (no hashing) |
| `user_data.fbp` | Recommended | `_fbp` cookie value (no hashing) |
| `user_data.client_ip_address` | Recommended | IP address (no hashing) |
| `user_data.client_user_agent` | Recommended | UA string (no hashing) |
| `user_data.external_id` | Optional | SHA-256 hashed user ID (array) |
| `custom_data.value` | Optional | Conversion amount |
| `custom_data.currency` | Optional | ISO 4217 currency code |
| `custom_data.content_ids` | Optional | Array of product IDs |
| `custom_data.content_type` | Optional | `'product'` or `'product_group'` |
| `custom_data.contents` | Optional | Array of product details (same structure as Pixel) |
| `custom_data.num_items` | Optional | Number of items |

**Endpoint**: `POST https://graph.facebook.com/v{API_VERSION}/{PIXEL_ID}/events`
**Authentication**: `access_token` parameter (generated in Events Manager)

### sGTM

- Template: the "**Facebook Conversions API**" tag from the community gallery
- Forward data from client to server using GA4 or a Data Client, then send it to Meta via the CAPI tag
- Configure the Pixel ID and API access token, then map event, user data, and custom data fields
- Hosting: **Stape.io** (recommended; easy deployment, template-based) or **Google Cloud Run** (when customization is a priority)

### Validating Deduplication

- **Coverage target**: aim for a CAPI-to-Pixel event coverage ratio of **75% or higher** (gradually expanding from key conversions such as purchases)
- **Stabilization period**: after CAPI setup, wait at least 24 hours before checking EMQ stability
- Regularly monitor the "Deduplication" metrics in Events Manager

---

## 5. Debugging

| Tool | What to Check |
|--------|---------|
| **GTM Preview Mode** | Tag firing order (PageView -> Event), variable values |
| **Meta Pixel Helper** (Chrome extension) | Pixel detection, events and parameters, errors. CAPI cannot be verified. |
| **Test Events** (Events Manager) | Real-time event reception (both Pixel and CAPI) |
| **Diagnostics** (Events Manager) | Warnings about missing parameters and configuration issues, recommended actions |
| **DevTools Network** | Check requests to `facebook.com/tr` |
| **EMQ Score** (Events Manager) | Match quality score (target: 8 or higher; updated every 48 hours) |

---

## 6. References

- [Meta Pixel - Official Reference](https://developers.facebook.com/docs/meta-pixel/)
- [Standard Events Reference](https://developers.facebook.com/docs/meta-pixel/reference)
- [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Advanced Matching](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)
- [Event Deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [GDPR / Consent Implementation](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr)
- [Domain Verification](https://developers.facebook.com/docs/sharing/domain-verification)
- [Events Manager](https://business.facebook.com/events_manager)
