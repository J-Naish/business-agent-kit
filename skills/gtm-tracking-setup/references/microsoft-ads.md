# Microsoft Advertising / UET - GTM Implementation Manual

> Always verify the latest specifications in the [Universal Event Tracking technical guide](https://learn.microsoft.com/en-us/advertising/guides/universal-event-tracking?view=bingads-13), the [Conversions API guide](https://learn.microsoft.com/en-us/advertising/guides/uet-conversion-api-integration?view=bingads-13), and the Microsoft Advertising UI. Microsoft labels CAPI as a pilot at the time of writing; re-check pilot/GA status before publication.

---

## 1. Overview

Universal Event Tracking (UET) is Microsoft Advertising's tracking framework. A single UET tag installed sitewide drives:

- **Conversion tracking** for purchases, leads, signups, downloads, key page views, time on site, and pages-per-visit.
- **Remarketing lists / audience targeting**.
- **Automated bidding** optimization.
- **Dynamic remarketing** (product audiences) when retail/vertical parameters are sent.
- **UET Insights** (opt-in website insights surface in the Microsoft Advertising UI).
- **Conversions API (CAPI)** server-side, which uses the same UET data model.

**Single-tag rule**: Microsoft states that one UET tag can be used with all of an account's conversion goals and audiences. Creating multiple UET tags is only required when account structure, ownership, isolation, or specific server-side designs demand it.

Standard implementation pattern:

1. Create a UET tag in Microsoft Advertising.
2. Add the UET tag to every page (GTM: Base tag on All Pages).
3. Create conversion goals and/or remarketing lists in the UI.
4. For action-specific goals, send custom events from the page or server.

---

## 2. UET Tag Setup

### UET Tag ID

The UET Tag ID is the numeric Microsoft Advertising identifier of the UET tag installed on the site. It is the only required identifier for the GTM Base tag. Find it under conversion tracking / UET tag in the Microsoft Advertising UI.

### Site-wide installation

Microsoft recommends loading the UET JavaScript on every page, ideally from a sitewide layout / `<head>`. In GTM, the equivalent is a single UET Base tag on the All Pages trigger. The page-load signal alone is sufficient to support URL-based goals, Duration goals, Pages-Viewed-Per-Visit goals, and remarketing.

### GTM template / Custom HTML options

| Option | When to use |
|---|---|
| **Microsoft Advertising UET GTM Community Template** | Preferred when the destination GTM container can install community templates. Encapsulates loading, initialization, and consent integration. |
| **Custom HTML** | Fallback when community templates cannot be approved, or when exporting GTM container JSON across environments (template IDs are environment-specific). |
| **Microsoft Advertising in-product GTM integration** | Available from the UET tag screen in the Microsoft Advertising UI for some account configurations. |

For Custom HTML, the canonical pattern initializes the `uetq` queue and loads the UET JavaScript:

```html
<script>
(function(w,d,t,r,u){
  var f,n,i;
  w[u]=w[u]||[],f=function(){
    var o={ti:"{{Const - UET Tag ID}}", enableAutoSpaTracking: true};
    o.q=w[u], w[u]=new UET(o);
  },
  n=d.createElement(t), n.src=r, n.async=1,
  n.onload=n.onreadystatechange=function(){
    var s=this.readyState;
    s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null);
  },
  i=d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n,i);
})(window,document,"script","//bat.bing.com/bat.js","uetq");
</script>
```

> The host serving `bat.js` is the historically documented UET JavaScript endpoint cited by Microsoft's auto-generated tracking script. Confirm the host in your browser's network tab before relying on it for diagnostic filters.

### Tags

| Tag Name | Type | Trigger | Consent |
|---|---|---|---|
| Microsoft Ads - UET Base | Microsoft UET (template) or Custom HTML | All Pages | ad_storage |
| Microsoft Ads - Event - purchase | Microsoft UET event | CE - purchase | ad_storage |
| Microsoft Ads - Event - generate_lead | Microsoft UET event | CE - generate_lead | ad_storage |
| Microsoft Ads - Event - sign_up | Microsoft UET event | CE - sign_up | ad_storage |
| Microsoft Ads - Event - add_to_cart | Microsoft UET event | CE - add_to_cart | ad_storage |
| Microsoft Ads - Event - begin_checkout | Microsoft UET event | CE - begin_checkout | ad_storage |
| Microsoft Ads - Event - view_item | Microsoft UET event | CE - view_item | ad_storage |

Configure tag sequencing so the Base tag fires before any event tag. Because the `uetq` array is initialized synchronously and buffers pushes until `bat.js` loads, sequencing is mostly a safety net but is recommended.

---

## 3. Conversion Goals

UET collects page loads and custom events; goals evaluate that data. Conversion goals are defined in the Microsoft Advertising UI or the Campaign Management API.

### Goal Types

| Goal Type | API Object | Use Case | GTM Requirement |
|---|---|---|---|
| URL / Destination URL | `UrlGoal` | Thank-you / confirmation / key page | Base tag only |
| Event | `EventGoal` | Form submit, purchase, download, custom interaction | Base tag + custom event |
| Duration | `DurationGoal` | Time-on-site threshold | Base tag only |
| Pages viewed per visit | `PagesViewedPerVisitGoal` | Engagement count | Base tag only |
| Offline conversion | `OfflineConversionGoal` | Lead closes offline after web click | UET + msclkid capture + offline upload/API |
| App install | `AppInstallGoal` | App-install attribution | Specialized; rarely configured via web GTM |
| In-store transaction | `InStoreTransactionGoal` | In-store purchase | Specialized; rarely configured via web GTM |

### `GoalCategory` (EventGoal)

`GoalCategory` is **required as of June 2021**. The supported enum values for EventGoal are:

```
AddToCart, BeginCheckout, BookAppointment, Contact, GetDirections, Other,
OutboundClick, PageView, Purchase, RequestQuote, Signup, SubmitLeadForm, Subscribe
```

Recommended GA4 -> Microsoft mapping:

| Site Event | `GoalCategory` |
|---|---|
| `purchase` | `Purchase` |
| `generate_lead` / contact form | `SubmitLeadForm` or `Contact` |
| `sign_up` | `Signup` |
| `subscribe` | `Subscribe` |
| `add_to_cart` | `AddToCart` |
| `begin_checkout` | `BeginCheckout` |
| quote request | `RequestQuote` |
| outbound link | `OutboundClick` |
| `book_appointment` / scheduling | `BookAppointment` |
| store directions | `GetDirections` |
| key page view | `PageView` |
| anything else | `Other` |

### Counting (`CountType`)

| Value | Behavior | Recommended Use |
|---|---|---|
| `All` (default) | Every conversion after a click is counted | Sales, repeatable revenue events |
| `Unique` | One conversion per click is counted | Lead forms, signups, quote requests |

### Conversion Windows

| Field | Range | Default in API examples |
|---|---|---|
| `ConversionWindowInMinutes` (post-click) | 1 minute to 129,600 minutes (90 days) | 43,200 (30 days) |
| `ViewThroughConversionWindowInMinutes` | 1 minute to 43,200 minutes (30 days) | not returned by default |

View-through tracking additionally requires the account property `IncludeViewThroughConversions` to be true.

### `ExcludeFromBidding` (Include in Conversions)

When `true`, the goal is excluded from `Conversions`, `ConversionRate`, `CostPerConversion`, `ReturnOnAdSpend`, `RevenuePerConversion`, and `Revenue` columns and from automated-bidding calculations. The `All*` columns still include it. Default is `false`. Use this to track micro-conversions (e.g., `view_item`, `add_to_cart`) for observation/audiences without polluting bidding.

### Enhanced conversions

Each goal exposes `IsEnhancedConversionsEnabled` (boolean) on the API object. When enabled, hashed first-party identifiers (`em`, `ph`) sent via UET or CAPI are used to improve match rates.

---

## 4. Custom Event Tracking (Client-side / Browser)

### Syntax

```javascript
window.uetq = window.uetq || [];
window.uetq.push('event', 'purchase', {
  event_category: 'ecommerce',
  event_label: 'order_complete',
  event_value: 1,
  revenue_value: 99.97,
  currency: 'USD',
  event_id: 'order-12345'
});
```

Key points:

- **Initialize the queue first** (`window.uetq = window.uetq || []`) so pushes that run before `bat.js` loads are buffered.
- The second positional argument is the **event action**; it is what an EventGoal's `ActionExpression` matches.
- `event_category` / `event_label` / `event_value` are the additional dimensions an EventGoal can match on.
- `event_id` is the **deduplication key** when both client-side UET and CAPI fire for the same logical event. Send the same value from both surfaces.

### Parameter naming - long-form vs short-form

Microsoft documentation shows two patterns:

- **Long-form** (snake_case): `event_category`, `event_label`, `event_value`, `event_id`. Microsoft's CAPI guide uses these names in its client-side deduplication example, so they are first-party documented.
- **Short-form**: `ec`, `ea`, `el`, `ev` appear in older snippets and as alternative parameters in support content.

Use long-form in new GTM implementations for readability. `revenue_value` and `currency` as long-form parameter names for variable revenue are widely used in tag-manager vendor documentation but are not explicitly enumerated on Microsoft Learn UET pages; verify behavior against the chosen GTM template before relying on them. The short-form `gv` is the historical revenue parameter.

### GA4 dataLayer event -> UET action mapping

| GA4 event | UET action | Suggested category | Notes |
|---|---|---|---|
| `purchase` | `purchase` | `ecommerce` | Send `revenue_value` + `currency`; use `transaction_id` as `event_id` for CAPI dedup |
| `generate_lead` | `generate_lead` | `lead_generation` | Use form submission ID as `event_id` |
| `sign_up` | `sign_up` | `account` | |
| `subscribe` | `subscribe` | `subscription` | |
| `add_to_cart` | `add_to_cart` | `ecommerce` | |
| `begin_checkout` | `begin_checkout` | `ecommerce` | |
| `view_item` | `view_item` | `ecommerce` | Useful for product audiences |
| `view_item_list` | `view_item_list` | `ecommerce` | |
| `view_cart` | `view_cart` | `ecommerce` | |
| `search` | `search` | `ecommerce` | |
| `contact` (phone/email click) | `contact_click` | `contact` | |

### GTM Custom HTML examples

**Purchase** (with revenue and dedup ID):

```html
<script>
window.uetq = window.uetq || [];
window.uetq.push('event', 'purchase', {
  event_category: 'ecommerce',
  event_label: 'order_complete',
  event_value: 1,
  revenue_value: {{DLV - ecommerce.value}},
  currency: '{{DLV - ecommerce.currency}}',
  event_id: '{{DLV - ecommerce.transaction_id}}'
});
</script>
```

**Lead**:

```html
<script>
window.uetq = window.uetq || [];
window.uetq.push('event', 'generate_lead', {
  event_category: 'lead_generation',
  event_label: '{{DLV - form.name}}',
  event_value: 1,
  event_id: '{{DLV - form.submission_id}}'
});
</script>
```

> Do not quote numeric GTM variables that should be sent as numbers. Sanitize / escape any user-controlled string variable injected into Custom HTML.

---

## 5. dataLayer Mapping (GA4-compatible)

Use a GA4-style ecommerce object so the same `dataLayer` drives Microsoft Ads, Google Ads, Meta, TikTok, and LinkedIn.

```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T-20260426-001',
    value: 99.97,
    currency: 'USD',
    items: [
      { item_id: 'SKU-001', item_name: 'Product A', price: 29.99, quantity: 2 }
    ]
  }
});
```

```javascript
dataLayer.push({
  event: 'generate_lead',
  form: {
    name: 'contact',
    submission_id: 'lead-20260426-001',
    lead_type: 'contact'
  }
});
```

GTM variables:

| Variable Name | Data Layer Key |
|---|---|
| `DLV - ecommerce` | `ecommerce` |
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - form.name` | `form.name` |
| `DLV - form.submission_id` | `form.submission_id` |

> Do not push raw email, phone, name, or address into a broadly shared `dataLayer`. Handle PII server-side for enhanced conversions / CAPI.

---

## 6. Conversions API (CAPI) - Server-side

CAPI is Microsoft's server-to-server UET data path. It can run alongside the UET JavaScript (recommended) or stand alone. The CAPI guide is updated frequently; this section reflects the schema as documented on Microsoft Learn.

### Endpoint and headers

```text
POST https://capi.uet.microsoft.com/v1/{tagId}/events
Authorization: Bearer <ApiToken>
Content-Type: application/json
```

- **Batch limit**: maximum **1,000 events** per request. Real-time delivery is preferred.
- **Event age limit**: `eventTime` must be within the last **7 days** (UNIX epoch seconds, UTC).
- **Pilot status**: at the time of writing, Microsoft's CAPI guide states *"This program is in pilot. Contact your account manager to join."* Auth tokens are obtained from the Microsoft Advertising UI by selecting **Use Conversions API**, or from your account manager. Microsoft Learn does **not** document an explicit token expiry; treat the token as long-lived but revocable, and store it only in server-side environments (never in client-side GTM).

### Event types

| `eventType` | Purpose |
|---|---|
| `pageLoad` | Each page view or SPA navigation. Required for destination-URL goals and remarketing. |
| `custom` | Action-specific event for custom EventGoals, dynamic remarketing, and advanced features. |

Each page view should produce one `pageLoad` event and zero-or-more `custom` events linked to it via `pageLoadId`.

### Core fields (camelCase)

| Field | Required | Description |
|---|---|---|
| `eventType` | yes | `pageLoad` or `custom` |
| `eventId` | optional | Deduplication ID. Set equal to the client-side `event_id` for browser <-> CAPI dedup. |
| `eventName` | optional | Action name for custom EventGoals (e.g., `purchase`). |
| `eventTime` | yes | UNIX epoch seconds (UTC). Must be within the last 7 days. |
| `eventSourceUrl` | required for `pageLoad` | Page URL. Used for destination-URL goals. |
| `pageLoadId` | optional | Links 0+ custom events to a `pageLoad`. **Format as a v4 UUID** (e.g., `crypto.randomUUID()`). |
| `referrerUrl` | optional | Page referrer. |
| `pageTitle` | optional | Page title (e.g., `document.title`). |
| `keywords` | optional | Page SEO meta keywords. |
| `adStorageConsent` | optional | `G` (granted, default) or `D` (denied). |
| `userData` | optional | User identifiers / request metadata. See below. |
| `customData` | optional | Event-specific data. See below. |
| `continueOnValidationError` | optional | Top-level batch flag. Default `false`. |
| `dataProvider` | optional | Free-form string for analysis / monitoring. |

### `userData` fields

| Field | Hashing | Description |
|---|---|---|
| `em` | **SHA-256 required** | Hashed email. Validated as a SHA-256 string. |
| `ph` | **SHA-256 required** | Hashed phone. Validated as a SHA-256 string. |
| `clientUserAgent` | none | UA header from the end user's browser. |
| `clientIpAddress` | none | IPv4 or IPv6 address. |
| `anonymousId` | none | Guest visitor ID. **Preferably a v1 UUID** (Microsoft's documented preference). Must match the `vid` value sent from the client-side ID-sync pixel. |
| `externalId` | none | Authenticated (anonymized) user ID. Microsoft suggests a 32-byte hex string. |
| `msclkid` | none | Microsoft Click ID, most recent value for the user. |
| `idfa` | none | Apple IDFA (mobile/app traffic). |
| `gaid` | none | Google Advertising ID (Android mobile/app traffic). |

### SHA-256 normalization

**Email (`em`)**:
1. Trim whitespace from both ends.
2. Remove all dots (`.`) from the user portion.
3. Remove any `+alias` suffix from the user portion.
4. Lowercase the entire address.
5. SHA-256 -> lowercase hexadecimal string (64 chars).

**Phone (`ph`)**:
1. Normalize to E.164 with country code (e.g., `+14255551234`).
2. SHA-256 -> lowercase hexadecimal string.

These normalization rules differ from Google Ads / Meta enhanced conversions. Mismatched normalization silently degrades match quality without producing validation errors.

### `customData` fields

| Field | Description |
|---|---|
| `eventCategory` | Category for custom EventGoals. CAPI camelCase analogue of client-side `event_category`. |
| `eventLabel` | Label for custom EventGoals. Analogue of `event_label`. |
| `eventValue` | Numeric event value. Analogue of `event_value`. |
| `value` | Revenue value (float) for goals with variable revenue. **Not** `revenue_value`. |
| `currency` | ISO 4217 3-letter currency code. |
| `transactionId` | Transaction ID. Recommended for purchases; required for restate/retract via `OnlineConversionAdjustment`. |
| `searchTerm` | Search query for search-results pages. |
| `pageType` | One of: `cart`, `category`, `home`, `other`, `product`, `purchase`, `searchresults`. |
| `ecommTotalValue` | Cart/purchase total value. Typically equal to `value`. |
| `ecommCategory` | Category ID. |
| `itemIds` | Array of product IDs. |
| `items` | Array of `{ id, quantity, price, name }` objects. |
| `hotelData` | Hotel vertical block: `totalPrice`, `basePrice`, `checkinDate` (`YYYY-MM-DD`), `checkoutDate`, `lengthOfStay`, `partnerHotelId`, `bookingHref`. |

### Field-name conventions: client-side vs CAPI

The **single most common implementation error** is copying the client-side JS shape into a CAPI payload. The names differ:

| Concept | Client-side JS (`window.uetq.push`) | CAPI (JSON) |
|---|---|---|
| Event category | `event_category` | `eventCategory` |
| Event label | `event_label` | `eventLabel` |
| Event value | `event_value` | `eventValue` |
| Revenue | `revenue_value` | `value` |
| Currency | `currency` | `currency` |
| Dedup ID | `event_id` | `eventId` |

Send the same **value** for `event_id` / `eventId` across both surfaces, but never send the same **field name** - CAPI strictly requires camelCase.

### `pageLoadId` and revenue on page-load events

`pageLoad` events **cannot** carry a revenue value directly. To attribute revenue to a destination-URL goal, send a separate `custom` event containing only `value` and `currency` and the **same** `pageLoadId` as the page load.

### Restate / retract

Conversions can be corrected via the `OnlineConversionAdjustment` object (Campaign Management API) when a `transactionId` is present:
- **Restate** updates the revenue value (affects `Conv. value` / `All Conv. value`; conversion count unchanged).
- **Retract** sets the value to 0 and removes the conversion from the count.

### Sample request

```json
POST https://capi.uet.microsoft.com/v1/{tagId}/events
Authorization: Bearer <ApiToken>
Content-Type: application/json

{
  "data": [
    {
      "eventType": "pageLoad",
      "eventTime": 1714128000,
      "eventSourceUrl": "https://example.com/order/confirm?id=T-20260426-001",
      "pageLoadId": "bcf3000b-65fa-4cd2-808a-8a6cf2b1d0a5",
      "referrerUrl": "https://example.com/checkout",
      "pageTitle": "Order Confirmed",
      "adStorageConsent": "G",
      "userData": {
        "clientUserAgent": "Mozilla/5.0 ...",
        "clientIpAddress": "203.0.113.10",
        "anonymousId": "b171a9b06ce011ecafcd1b209be8601b",
        "externalId": "111222",
        "msclkid": "dd4afcccb1c9a4cad9544dd7e5006",
        "em": "ec81f3ac7b2b19675bab9d54cf416f9f18cff87c97da5cca82c0f0891bc40602",
        "ph": "c59475d96e9f01d7d18d06cfad84dd02333207f02c0c2c5663ef2782cda0390e"
      }
    },
    {
      "eventType": "custom",
      "eventId": "T-20260426-001",
      "eventName": "purchase",
      "eventTime": 1714128000,
      "pageLoadId": "bcf3000b-65fa-4cd2-808a-8a6cf2b1d0a5",
      "adStorageConsent": "G",
      "userData": {
        "anonymousId": "b171a9b06ce011ecafcd1b209be8601b",
        "msclkid": "dd4afcccb1c9a4cad9544dd7e5006"
      },
      "customData": {
        "pageType": "purchase",
        "value": 99.97,
        "currency": "USD",
        "transactionId": "T-20260426-001",
        "ecommTotalValue": 99.97,
        "items": [
          { "id": "SKU-001", "quantity": 2, "price": 29.99, "name": "Product A" }
        ]
      }
    }
  ],
  "continueOnValidationError": false
}
```

### Client-side ID sync

For remarketing and audience building (and recommended for measurement), fire a client-side ID-sync pixel:

```html
<img src="https://c.bing.com/c.gif?vid={anonymousId}&Red3=BACID_{customerId}" />
```

Required parameters: `Red3` (Microsoft customer ID in `BACID_<CID>` format), `vid` (preferably v1 UUID). Optional: `uid` (anonymized authenticated user ID). Fire at least once per session. The pixel **must** be fired client-side; do not fire it from the server.

---

## 7. Microsoft Click ID (`msclkid`)

`msclkid` is the Microsoft Click ID auto-tagged onto landing pages after a click on a Microsoft Ad.

| Property | Value |
|---|---|
| Source | Auto-tagging (enabled at the account level) |
| Format | UUID-like string (e.g., `dd4afcccb1c9a4cad9544dd7e5006`) |
| Suggested retention | **90 days** |
| Storage | First-party cookie or local storage; server-side store also acceptable |

Auto-tagging is automatically enabled (`MSCLKIDAutoTaggingEnabled` set to `true` at account / customer level) when any UrlGoal, EventGoal, DurationGoal, PagesViewedPerVisitGoal, or OfflineConversionGoal is added or updated.

Always retain the **most recent** value per user. Send `msclkid` with every CAPI event for that user; without it, `vid` alone is not sufficient for conversion attribution.

---

## 8. Offline Conversions

Use `OfflineConversionGoal` for lead-gen flows where the conversion is qualified offline (CRM lead -> closed sale).

| Aspect | Detail |
|---|---|
| Setup | Create the `OfflineConversionGoal`, **wait two hours**, then upload data via `ApplyOfflineConversions`. |
| Matching key | `msclkid` |
| Conversion window | 1 minute to 90 days (default 30 days) |
| Counting | `All` or `Unique`; `Unique` is typical for leads |
| Enhanced conversions | Supports `IsEnhancedConversionsEnabled` |

Practical pattern:

1. Capture `msclkid` from the landing page URL on lead form submission.
2. Persist `msclkid`, timestamp, landing-page URL, consent state, and the lead record in the CRM.
3. After CRM qualification, upload the qualified-lead / closed-sale event with the original `msclkid` and a conversion timestamp within the configured window.

---

## 9. Consent

### GTM consent types

Treat all UET / Microsoft Ads tags as advertising tags. Add Additional Consent Checks:

| Consent type | When required |
|---|---|
| `ad_storage` | All UET tags |
| `ad_user_data` | When sending hashed email/phone or other first-party user data (enhanced conversions, CAPI userData) |
| `ad_personalization` | When the account uses remarketing / personalized audiences |

### CAPI `adStorageConsent`

| Value | Meaning |
|---|---|
| `G` | Granted |
| `D` | Denied. Events with `D` are **not** used for any advertising purpose, including conversion attribution and retargeting. |

If `adStorageConsent` is omitted, Microsoft processes the event as **granted** by default. Privacy-sensitive implementations should pass an explicit value rather than relying on the default.

For strict opt-in jurisdictions, the safest pattern is to suppress the entire UET base tag (do not load `bat.js`) until consent is obtained, rather than relying solely on the consent signal.

---

## 10. UET Insights

UET Insights is an opt-in feature announced in July 2023 that expands website-insights signals collected via the UET tag.

- It is enabled or disabled at the **UET tag level in the Microsoft Advertising UI**, not in GTM code.
- Microsoft states advertisers retain control and can disable UET Insights at any time.
- Verify the current setting in the UET dashboard before assuming it is on or off for a given tag, especially when privacy/data-minimization is a concern.

---

## 11. Debugging

### Tools and surfaces

| Tool | What to verify |
|---|---|
| **GTM Preview Mode** | Tag firing order (Base -> Event), variable values, that the UET Tag ID and event parameters resolve correctly |
| **UET Tag Helper** (Microsoft Edge / Chrome extension) | UET tag detection, page-load and custom-event payloads, and validation errors |
| **Microsoft Advertising UET diagnostics** | Tag status (`Active` / `Receiving traffic`), recent events, conversion counts |
| **DevTools Network - client-side** | Filter for the UET JavaScript host (historically `bat.bing.com/bat.js`) and the page-load / event beacons it emits |
| **DevTools Network - CAPI** | Filter for `capi.uet.microsoft.com`. Inspect the JSON request body and HTTP status code |
| **Conversion goal status** | `TrackingStatus` reflects system-determined state (e.g., `TagUnverified` until the tag has fired). Reporting can lag several hours - do not troubleshoot from a 30-minute window |

### CAPI HTTP responses

| Status | Meaning |
|---|---|
| `200` | Success. |
| `400` | Validation error. Response body includes `error.details[]` with `propertyName` and `errorMessage`. Examples: *"'eventType' must be one of the following: pageLoad, custom."*, *"'em' must be a valid SHA256 string."*, *"'eventTime' must be a valid UNIX UTC timestamp in seconds within last 7 days."* |
| `401` | Unauthorized - missing or incorrect bearer token. |

For batch uploads, **any single invalid event causes the entire batch to be rejected** unless `continueOnValidationError: true` is set at the top level of the request.

---

## 12. Best Practices and Common Pitfalls

### Best practices

- **Run UET (browser) + CAPI (server) together** for high-value events. Use a stable shared identifier (transaction ID, form submission ID) as `event_id` / `eventId` across both surfaces.
- **Use one UET tag per site.** Multiple tags should be the exception, not the default.
- **Retain `msclkid` for 90 days**, overwrite with the most recent value, and always include it in CAPI events for that user.
- **Send `clientUserAgent` + `clientIpAddress` + `em` + `ph`** in CAPI userData when consent allows. These are the high-value enhanced-conversion signals.
- **Match `anonymousId` (CAPI) to `vid` (ID sync pixel)** for the same user, and fire the ID-sync pixel client-side at least once per session.
- **Use long-form parameter names** (`event_category`, `event_label`, `event_value`, `event_id`) on the client side for readability.
- **Pass explicit `adStorageConsent`** rather than relying on the default-granted behavior.
- **Pin GA4-style `transaction_id`** as both the client-side `event_id` and the CAPI `eventId` and `customData.transactionId`. This unlocks restate/retract via `OnlineConversionAdjustment`.

### Common pitfalls

- **Confusing client-side snake_case with CAPI camelCase.** `event_category` / `revenue_value` only work in the browser; CAPI requires `eventCategory` / `value`. A copy-pasted JS payload will be silently invalid as a CAPI payload.
- **Wrong UUID variant.** `pageLoadId` is a **v4 UUID** (e.g., `crypto.randomUUID()`). `anonymousId` is **preferably a v1 UUID**. Generating both with `randomUUID()` violates Microsoft's stated preference for `anonymousId`.
- **Wrong `eventTime` unit.** Microsoft expects **seconds** (UNIX epoch UTC). Sending milliseconds produces a "must be within last 7 days" validation error even for fresh events.
- **Revenue on page-load events.** A `pageLoad` event cannot carry revenue. For destination-URL goals with variable revenue, send a separate `custom` event with only `value` + `currency` and the matching `pageLoadId`.
- **Mismatched email/phone normalization.** Microsoft's `em` rules (remove dots from user portion, strip `+alias`, lowercase) differ from Google's and Meta's. Hashing without normalization causes silent match-rate degradation - no validation error is returned.
- **Firing the ID-sync pixel from the server.** It must be fired client-side, otherwise Microsoft cannot capture its third-party cookie IDs.
- **Relying on `vid` without `msclkid`** for conversion attribution.
- **Batch poisoning.** A single invalid event in a 1,000-event batch rejects the whole batch unless `continueOnValidationError: true` is set.
- **Storing the CAPI bearer token client-side.** Tokens belong in server-side environments or server-side GTM only.
- **Pushing raw PII into the `dataLayer`.** Other tags read the same `dataLayer` and can leak it. Hash and normalize server-side.

---

## 13. References

### Microsoft Learn (Tier 1)

- [Universal Event Tracking technical guide](https://learn.microsoft.com/en-us/advertising/guides/universal-event-tracking?view=bingads-13)
- [Conversions API (CAPI) guide](https://learn.microsoft.com/en-us/advertising/guides/uet-conversion-api-integration?view=bingads-13)
- [UetTag data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/uettag?view=bingads-13)
- [EventGoal data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/eventgoal?view=bingads-13)
- [UrlGoal data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/urlgoal?view=bingads-13)
- [DurationGoal data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/durationgoal?view=bingads-13)
- [PagesViewedPerVisitGoal data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/pagesviewedpervisitgoal?view=bingads-13)
- [OfflineConversionGoal data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/offlineconversiongoal?view=bingads-13)
- [Offline Conversion Goal bulk record](https://learn.microsoft.com/en-us/advertising/bulk-service/offline-conversion-goal?view=bingads-13)
- [ConversionGoalCategory enumeration](https://learn.microsoft.com/en-us/advertising/campaign-management-service/conversiongoalcategory?view=bingads-13)
- [OnlineConversionAdjustment data object](https://learn.microsoft.com/en-us/advertising/campaign-management-service/onlineconversionadjustment?view=bingads-13)

### Microsoft Advertising

- [Universal Event Tracking - solution overview](https://about.ads.microsoft.com/en-us/solutions/audience-targeting/universal-event-tracking/)
- [Introducing new website insights for the UET tag (UET Insights)](https://about.ads.microsoft.com/en/blog/post/july-2023/introducing-new-website-insights-for-universal-event-tracking-tag)
- [How to report custom events with UET (help center)](https://help.ads.microsoft.com/#apex/3/en/56684/2)
- [Enhanced conversions (help center)](https://help.ads.microsoft.com/apex/index/3/en/60178)
- [Consent signals (help center)](https://help.ads.microsoft.com/apex/index/3/en/60119)
- [Microsoft Q&A - custom events with `window.uetq.push`](https://learn.microsoft.com/en-us/answers/questions/4fdc90ad-6818-4a25-98e1-fe98d2caeaa8/custom-events-are-failing-to-update-conversion)
