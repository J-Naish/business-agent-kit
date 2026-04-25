# LinkedIn Insight Tag - GTM Implementation Manual

> Always verify the latest specifications in [LinkedIn Marketing Solutions Help](https://www.linkedin.com/help/lms), the [LinkedIn Marketing API docs on Microsoft Learn](https://learn.microsoft.com/en-us/linkedin/marketing/), and the LinkedIn Campaign Manager UI. LinkedIn API versions follow a `YYYYMM` cadence; each version is supported for at least 12 months before sunset, so plan a recurring migration.

---

## 1. Conversion Type Reference

Unlike Meta or TikTok, LinkedIn does not expose a fixed list of standard event names that you fire from JavaScript. Instead, you create a **conversion rule** in Campaign Manager (or via the Marketing API), assign it a **conversion type** from a fixed enum, and then trigger that rule from the website using either a URL match or `window.lintrk('track', { conversion_id: <ID> })`. Each rule receives its own numeric **Conversion ID**.

### Campaign Manager Conversion Behaviors (current UI — 13 simplified options)

| Funnel Stage | Conversion Behavior | Use Case |
|---|---|---|
| Top of funnel | Key page view | Views an important page or section |
| Top of funnel | Video view | Plays a video |
| Top of funnel | Register event | Registers for an event |
| Middle of funnel | Sign up | Completes signup / trial |
| Middle of funnel | Download | Downloads a file or installs an app |
| Middle of funnel | Lead | Lead-gen form submission |
| Middle of funnel | Book appointment | Reserves / schedules an appointment |
| Middle of funnel | Contact | Form, call, or other contact |
| Bottom of funnel | Qualified Lead | MQL / SQL identification |
| Bottom of funnel | Submit application | Submits an application or quote request |
| Bottom of funnel | Add to cart | Initiates shopping cart / checkout |
| Bottom of funnel | Purchase | Makes a purchase |
| Other | Other | Catch-all (clicks, wishlist, share, donate, etc.) |

### Marketing API `type` enum (full list, used on `POST /rest/conversions`)

```
ADD_TO_CART, DOWNLOAD, INSTALL, KEY_PAGE_VIEW, LEAD, PURCHASE, SIGN_UP, OTHER,
SAVE, START_CHECKOUT, SCHEDULE, VIEW_CONTENT, VIEW_VIDEO, ADD_BILLING_INFO,
BOOK_APPOINTMENT, REQUEST_QUOTE, SEARCH, SUBSCRIBE, AD_CLICK, AD_VIEW,
COMPLETE_SIGNUP, SUBMIT_APPLICATION, PHONE_CALL, INVITE, LOGIN, SHARE,
DONATE, ADD_TO_LIST, START_TRIAL, OUTBOUND_CLICK, CONTACT, QUALIFIED_LEAD
```

`QUALIFIED_LEAD` is special — it surfaces as the `qualifiedLeads` and `costPerQualifiedLead` reporting metrics and is usable as an optimization goal for Lead Generation campaigns.

### Conversion Rule Attributes (defined once per rule)

| Field | Description |
|---|---|
| `name` | Human-readable rule name |
| `type` | Conversion type from the enum above |
| `valueType` | `DYNAMIC` (overridden per event), `FIXED` (uses rule's stored value), or `NO_VALUE`. Default is `DYNAMIC`. |
| `postClickAttributionWindowSize` | 1, 7, 30, or 90 days. Default 30. A 365-day window is allowed for `SUBMIT_APPLICATION`, `PURCHASE`, `ADD_TO_CART`, `QUALIFIED_LEAD`, and `LEAD`. |
| `viewThroughAttributionWindowSize` | 1, 7, 30, or 90 days. Default 7. 365-day window allowed for the same long-window types. |
| `attributionType` | `LAST_TOUCH_BY_CAMPAIGN` (default; each campaign with an interaction in the window is credited) or `LAST_TOUCH_BY_CONVERSION` (only the most recent campaign is credited). |
| `enabled` | Boolean. Only enabled rules count. |
| `conversionMethod` | `CONVERSIONS_API` for server-side rules. Insight Tag rules are created in Campaign Manager (Site-wide URL or Event-specific). For Insight Tag <-> CAPI deduplication, create **two separate rules** (one browser, one CAPI) and link both to the same campaigns. |

---

## 2. Insight Tag Setup

### Base Tag Behavior

The LinkedIn Insight Tag is a JavaScript snippet that, once installed, automatically fires a page-view request to `px.ads.linkedin.com/collect/` on every page where it loads. There is no separate "PageView event"; the base tag is the page-view signal and the foundation for Matched Audiences (Website Retargeting), Website Demographics, and conversion tracking.

```html
<script type="text/javascript">
  _linkedin_partner_id = "12345";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
  (function(l) {
    if (!l) {
      window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q = [];
    }
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript"; b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
  })(window.lintrk);
</script>
<noscript>
  <img height="1" width="1" style="display:none;" alt=""
       src="https://px.ads.linkedin.com/collect/?pid=12345&fmt=gif" />
</noscript>
```

> **Sensitive-data restriction**: LinkedIn forbids placing the Insight Tag on pages that collect or display sensitive data (consumer health, consumer financial services, etc.). Violation can result in advertising privileges being disabled.

### Prerequisites

- A **Partner ID** has been obtained from Campaign Manager > **Data > Signals manager > Insight Tag** (older UI: Measurement > Insights > Manage Data Sources). When prompted, choose **"I will use a tag manager"** to surface the Partner ID.
- (For event-specific conversions) one or more **Conversion IDs** created in Campaign Manager > Measurement > Conversion tracking, with **"Event-specific"** chosen as the tracking method on the Sources page.
- The **LinkedIn Insight Tag** community template (v2.0) published by `linkedin` in the GTM Community Template Gallery. Because the template handles loading `insight.min.js` and initializing `_linkedin_partner_id` / `lintrk` internally, **no Custom HTML Base Code is required**.

### Official GTM Template — Configuration Fields

The official `linkedin` template exposes only four user-facing fields:

| Field | Description |
|---|---|
| **Partner ID / Insight Tag ID** | Numeric Partner ID. Comma-separated values are accepted to fire multiple tags. |
| **Conversion IDs (max. 3)** | Optional. Comma-separated numeric Conversion IDs from Campaign Manager. Only the first three values are sent. |
| **Custom URL override** | Optional. Overrides the default page URL when LinkedIn instructs you to do so. |
| **Event ID** | Optional. Passed to `lintrk('track', ...)` for deduplication with Conversions API. |

> The official template does **not** expose dedicated Conversion Value, Currency, or Order ID fields. To send a per-event monetary value, configure `valueType: FIXED` on the conversion rule, or use a third-party template (e.g. WebMechanix's improved fork) that exposes the underlying `lintrk` track options. For dynamic values driven by GA4 ecommerce, the recommended path today is sGTM + Conversions API.

### Tags

Two patterns are common.

**A. Single base tag + URL-based conversions in Campaign Manager** (low-touch, no per-event tags). Define each conversion rule with a URL match (Sources: "Site-wide Insight Tag", e.g. URL contains `/thank-you`).

| Tag Name | Template | Trigger | Consent |
|---|---|---|---|
| LinkedIn Insight - Base | LinkedIn Insight Tag (Partner ID only) | All Pages | ad_storage |

**B. Base tag + per-event conversion tags** (preferred when a `dataLayer` is available).

| Tag Name | Template | Trigger | Consent |
|---|---|---|---|
| LinkedIn Insight - Base | LinkedIn Insight Tag (Partner ID only) | All Pages | ad_storage |
| LinkedIn Insight - Purchase | LinkedIn Insight Tag (Partner ID + Conversion ID) | CE - purchase | ad_storage |
| LinkedIn Insight - Lead | LinkedIn Insight Tag (Partner ID + Conversion ID) | CE - generate_lead | ad_storage |
| LinkedIn Insight - SignUp | LinkedIn Insight Tag (Partner ID + Conversion ID) | CE - sign_up | ad_storage |
| LinkedIn Insight - AddToCart | LinkedIn Insight Tag (Partner ID + Conversion ID) | CE - add_to_cart | ad_storage |
| LinkedIn Insight - KeyPageView | LinkedIn Insight Tag (Partner ID + Conversion ID) | (page-specific) | ad_storage |

The `lintrk` queue (`window.lintrk.q`) buffers events until `insight.min.js` loads, so strict tag sequencing is less critical than for some other vendors. Configuring `LinkedIn Insight - Base` to fire first is still recommended as a safety net.

### Per-Event Parameter Mapping

| Event | Mapping |
|---|---|
| **Purchase** | Partner ID -> `{{Const - LinkedIn Partner ID}}`, Conversion ID -> `{{Const - LI Conversion ID Purchase}}`, Event ID -> `{{DLV - ecommerce.transaction_id}}` |
| **Lead** | Partner ID -> `{{Const - LinkedIn Partner ID}}`, Conversion ID -> `{{Const - LI Conversion ID Lead}}`, Event ID -> `{{DLV - form.submission_id}}` |
| **Sign Up** | Partner ID -> `{{Const - LinkedIn Partner ID}}`, Conversion ID -> `{{Const - LI Conversion ID SignUp}}`, Event ID -> `{{DLV - user.id}}` (when available) |
| **AddToCart** | Partner ID -> `{{Const - LinkedIn Partner ID}}`, Conversion ID -> `{{Const - LI Conversion ID AddToCart}}` |
| **KeyPageView** | Partner ID -> `{{Const - LinkedIn Partner ID}}`, Conversion ID -> `{{Const - LI Conversion ID KeyPageView}}` |

### Variables

**Constant variables**:

| Variable Name | Value |
|---|---|
| `LinkedIn Partner ID` | (Partner ID, e.g. `1234567`) |
| `LI Conversion ID Purchase` | (Conversion ID for Purchase rule) |
| `LI Conversion ID Lead` | (Conversion ID for Lead rule) |
| `LI Conversion ID SignUp` | (Conversion ID for Sign-Up rule) |
| `LI Conversion ID AddToCart` | (Conversion ID for AddToCart rule) |
| `LI Conversion ID KeyPageView` | (Conversion ID for Key Page View rule) |

**Data Layer variables**:

| Variable Name | Data Layer Variable Name |
|---|---|
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - form.submission_id` | `form.submission_id` |

### Triggers

| Trigger Name | Type | Condition |
|---|---|---|
| All Pages | Page View | All pages |
| CE - purchase | Custom Event | `purchase` |
| CE - generate_lead | Custom Event | `generate_lead` |
| CE - sign_up | Custom Event | `sign_up` |
| CE - add_to_cart | Custom Event | `add_to_cart` |

> Custom event names are **case-sensitive** and must match the dataLayer `event` value exactly.

---

## 3. Conversion Tracking

LinkedIn supports three methods, configured in Campaign Manager > Measurement > Conversion tracking:

1. **Site-wide Insight Tag** — define a URL match (e.g. URL contains `/thank-you`). No JavaScript change required; the base tag's page-view fires the conversion when the URL matches.
2. **Event-specific Insight Tag** — define a Conversion ID; fire `lintrk('track', { conversion_id: <ID> })` from JavaScript / GTM when the user completes the action.
3. **Conversions API** (server-side) — see Section 4.

### Workflow

1. **Data > Signals manager > Insight Tag** — confirm the tag status is `Active` / `Receiving traffic` (status updates within minutes to 24 hours of first load).
2. **Measurement > Conversion tracking > Create conversion** > **Insight Tag conversion**.
3. Configure name, conversion type, value behavior (fixed / dynamic / none), conversion windows, and attribution model.
4. Choose Sources: *Site-wide* (URL rule) or *Event-specific* (Campaign Manager returns a numeric Conversion ID to use in your tag).
5. **Associate the conversion with one or more campaigns.** Rules without an associated campaign collect events but do not attribute.

### Attribution Windows

| Setting | Allowed Values | Default |
|---|---|---|
| Post-click | 1, 7, 30, 90 (and 365 for `SUBMIT_APPLICATION`, `PURCHASE`, `ADD_TO_CART`, `QUALIFIED_LEAD`, `LEAD`) | 30 |
| View-through | 1, 7, 30, 90 (and 365 for the same long-window types) | 7 |

View-through attribution requires the user to have been served (not necessarily clicked) a LinkedIn ad and then converted on the site within the window.

### Counting Behavior

LinkedIn does not expose a Google Ads-style "One" vs "Every" toggle. Counting is dictated by the conversion type:

- **Most types** (Lead, Sign Up, Key Page View, Download, etc.): if a member converts multiple times within the conversion window, **a single conversion is counted** and attributed to the most recent click or view.
- **Purchase and Add to Cart**: if one member converts multiple times within the conversion window, **each event can be counted**.

`attributionType` controls which campaign / ad set is credited, not whether repeated events are counted.

### Browser-Side Deduplication

Avoid firing the same browser conversion tag more than once for the same logical action. Use GTM trigger conditions ("Once per page" / "Once per event"). Duplicate browser-side tags can pollute diagnostics and may overcount for Purchase / Add to Cart, which support multiple events per member.

For redundancy with Conversions API, deduplicate via `event_id` / `eventId` — see Section 4.

---

## 4. Conversions API (CAPI)

LinkedIn's Conversions API (launched in 2023) is the recommended hybrid setup alongside the Insight Tag.

### Endpoint and Headers

- **Endpoint (single)**: `POST https://api.linkedin.com/rest/conversionEvents`
- **Endpoint (batch)**: same URL with `X-RestLi-Method: BATCH_CREATE` header (up to **5,000** events per batch)
- **Required headers**: `Authorization: Bearer {token}`, `Content-Type: application/json`, `Linkedin-Version: YYYYMM`, `X-Restli-Protocol-Version: 2.0.0`
- **Rate limits**: 600 requests/minute, 300,000 requests/day per access token
- **Event age limit**: `conversionHappenedAt` must be within the past **90 days**, in **epoch milliseconds** (not seconds)

> Header casing: Microsoft Learn spells the version header `Linkedin-Version` (capital L only). HTTP headers are case-insensitive on the wire, but if quoting verbatim in code, match the docs.

### API Versioning

LinkedIn Marketing API versions follow a monthly `YYYYMM` cadence. Each version is supported for **at least 12 months** before sunset. Plan a recurring migration cadence; pin the version explicitly in every request.

### Authentication — Two Paths

| Path | Who | Process | Token Lifetime |
|---|---|---|---|
| **Direct API access (Campaign Manager)** | Advertisers sending their own data | Data > Signals Manager > Direct API > Generate access token. No developer app required. | **Tokens do not expire.** |
| **Partner / API app integration** | Platforms / vendors integrating on behalf of advertisers | LinkedIn Developer Portal > apply for the **Conversions API** product. Required scopes: `rw_conversions`, `r_ads`. | Standard OAuth lifetimes apply. |

For API calls using member-authorized access, the authorizing user must hold one of: `ACCOUNT_BILLING_ADMIN`, `ACCOUNT_MANAGER`, `CAMPAIGN_MANAGER`, or `CREATIVE_MANAGER` on the ad account.

### Required Workflow

1. **Create a CAPI conversion rule** with `conversionMethod: "CONVERSIONS_API"` via `POST /rest/conversions`. Returns a numeric ID; the URN form is `urn:lla:llaPartnerConversion:{id}`.
2. **Associate campaigns** to the rule (via `autoAssociationType=ALL_CAMPAIGNS` query param at creation, via `PUT /rest/campaignConversions/...`, or in Campaign Manager UI).
3. **Stream events** to `/rest/conversionEvents`.

### Event Schema

| Field | Required | Description |
|---|---|---|
| `conversion` | yes | Conversion rule URN, e.g. `urn:lla:llaPartnerConversion:123` |
| `conversionHappenedAt` | yes | Epoch **milliseconds**. Must be within the past 90 days. |
| `conversionValue.currencyCode` | optional | ISO 4217 (e.g. `"USD"`) |
| `conversionValue.amount` | optional | Decimal as string (e.g. `"50.0"`) |
| `eventId` | optional | Advertiser-generated unique event ID. Required for deduplication with Insight Tag. |
| `user.userIds[]` | yes (at least one ID type, unless `userInfo` is supplied) | Array of `{ idType, idValue }` |
| `user.userInfo` | optional | Object with `firstName`, `lastName` (both required if used), `companyName`, `title`, `countryCode` |
| `user.lead` | optional | LinkedIn Lead Gen Form response URN (`urn:li:leadGenFormResponse:<id>`) |
| `user.externalIds` | optional | List of advertiser-provided IDs (currently only the first item is used) |

### `userIds` idType Values

The schema currently defines **only four** identity types. **There is no phone-number identifier.** PII matching for LinkedIn is email-based.

| `idType` | Format | Notes |
|---|---|---|
| `SHA256_EMAIL` | SHA-256 hex of lowercased, trimmed email; max 64 chars | Highest-value match for B2B |
| `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` | Value of the `li_fat_id` URL parameter / first-party cookie | Requires "Enhanced conversion tracking" enabled on the Insight Tag |
| `ACXIOM_ID` | LiveRamp identity graph ID | For advertisers using LiveRamp |
| `ORACLE_MOAT_ID` | Oracle MOAT identity ID | |

A request must include at least one of the four idTypes **OR** a populated `userInfo` (with `firstName` + `lastName`) **OR** a populated `externalIds`. Including `userInfo` alongside an idType significantly improves match rates.

### PII Hashing

| Field | Hashing |
|---|---|
| `SHA256_EMAIL` | Lowercase + trim + SHA-256 hex (64 chars) |
| `userInfo.firstName` / `lastName` | Plaintext (not hashed) |
| `userInfo.companyName` / `title` | Plaintext |
| `userInfo.countryCode` | ISO-3166-1 alpha-2, plaintext |

This differs from Meta's CAPI, where name fields are hashed. LinkedIn accepts these as plaintext.

### Insight Tag <-> CAPI Deduplication

If the same `eventId` arrives from both the Insight Tag and the Conversions API on the same ad account, **the Insight Tag event is counted and the CAPI event is discarded**. Both rules must exist as separate conversion rules (browser rule + CAPI rule), both linked to the same campaigns. Reporting will show CAPI counts deducted on a per-rule basis.

> This is the **opposite of Meta's behavior** (Meta typically prefers CAPI when both arrive). Plan reporting expectations accordingly.

### Sample Request

```json
POST https://api.linkedin.com/rest/conversionEvents
Authorization: Bearer {token}
Linkedin-Version: 202604
X-Restli-Protocol-Version: 2.0.0
Content-Type: application/json

{
  "conversion": "urn:lla:llaPartnerConversion:104012",
  "conversionHappenedAt": 1714128000000,
  "conversionValue": { "currencyCode": "USD", "amount": "150.00" },
  "eventId": "order-9f3a1c",
  "user": {
    "userIds": [
      { "idType": "SHA256_EMAIL",
        "idValue": "bad8677b6c86f5d308ee82786c183482a5995f066694246c58c4df37b0cc41f1" },
      { "idType": "LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID",
        "idValue": "df5gf5-gh6t7-ph4j7h-fgf6n1" }
    ],
    "userInfo": {
      "firstName": "mike",
      "lastName": "smith",
      "companyName": "microsoft",
      "title": "software engineer",
      "countryCode": "US"
    }
  }
}
```

### Server-Side GTM (sGTM)

LinkedIn maintains an official server-tag template:

- Template repository: `linkedin-developers/linkedin-capi-tag-template`
- Community Gallery name: **LinkedIn | CAPI Tag** by `linkedin-developers`
- Required inputs: LinkedIn API access token, Conversion Rule ID
- Pattern: GA4 Web Tag in the web container -> server container URL -> GA4 Client in server container -> LinkedIn | CAPI Tag converts the GA4 event model to LinkedIn's schema and POSTs to `/rest/conversionEvents`.

#### GA4 -> LinkedIn parameter mapping (LinkedIn CAPI sGTM template)

| LinkedIn API Parameter | GA4 / Common Event Schema field |
|---|---|
| `conversion` | `eventModel.conversion_rule_id` |
| `conversionHappenedAt` | `eventModel.conversion_happened_at` |
| `eventId` | `eventModel.event_id` |
| `SHA256_EMAIL` | `eventModel.user_data.sha256_email_address` |
| `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` | `eventModel.user_data.linkedinFirstPartyId` |
| `ACXIOM_ID` | `eventModel.user_data.acxiomID` |
| `ORACLE_MOAT_ID` | `eventModel.user_data.moatID` |
| `firstName` | `eventModel.user_data.address.first_name` |
| `lastName` | `eventModel.user_data.address.last_name` |
| `countryCode` | `eventModel.user_data.address.country` |
| `companyName` | `eventModel.user_data.companyName` |
| `title` | `eventModel.user_data.title` |
| `conversionValue` | `eventModel.user_data.currency` + `eventModel.user_data.value` |

Stape.io and TAGGRS provide hosted sGTM with LinkedIn CAPI templates as alternatives.

---

## 5. Matched Audiences (Remarketing)

The Insight Tag enables three flavors of Matched Audiences in Campaign Manager. All require a minimum of **300 matched members** before activation.

| Audience Type | Source | Requires Insight Tag |
|---|---|---|
| **Website Audiences** | Insight Tag visitors filtered by URL rules | Yes |
| **Contact Lists** | CSV upload of emails, or CRM sync (HubSpot, Marketo, Salesforce) | No (but Insight Tag improves measurement) |
| **Company Lists** | CSV of company names + LinkedIn Company URL | No |

The Insight Tag also powers **Website Demographics** reporting.

### Lookalike Audiences — Discontinued

LinkedIn discontinued Lookalike Audiences on **February 29, 2024**. New lookalikes cannot be created and existing ones cannot be edited or refreshed. The replacements are:

- **Predictive Audiences** — for contact list, company list, conversion, Lead Gen Form, or retargeting audience data sources.
- **Audience Expansion** — for Matched Audiences and LinkedIn attribute targeting (e.g. by skill or interest).

The Lookalike API was discontinued at the same time, which affects partner CRM integrations.

---

## 6. Consent & Privacy

### Cookies Set by the Insight Tag

Lifetimes below come from the LinkedIn Cookie Table; the table is updated frequently and lifetimes vary by region — re-verify before publishing.

| Cookie | Set By | Purpose | Lifetime |
|---|---|---|---|
| `bcookie` | linkedin.com (third-party) | LinkedIn browser identifier | 1 year |
| `lidc` | linkedin.com | Routing | 24 hours |
| `li_gc` | linkedin.com | Stores guest cookie consent | 6 months |
| `li_sugr` | linkedin.com | Pixel matching / browser ID | 90 days |
| `UserMatchHistory` | linkedin.com | Ad ID sync | 30 days |
| `AnalyticsSyncHistory` | linkedin.com | Ad measurement sync | 30 days |
| `li_fat_id` | **first-party (advertiser domain)** when Enhanced conversion tracking is enabled | LinkedIn click ID; pseudonymous identifier appended to landing-page URLs | 30 days |

### `li_fat_id` (First-Party Click ID)

When **Enhanced conversion tracking** is enabled (Campaign Manager > Signals manager > Insight Tag > Settings):

- LinkedIn appends a click ID parameter (`li_fat_id`) to landing-page URLs after a click on a LinkedIn ad.
- The Insight Tag stores it as a first-party cookie on the advertiser's domain.
- The value can be sent to CAPI as `idType: LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` for high-quality match.
- This is LinkedIn's analogue of Meta's `_fbc` and TikTok's `ttclid`.

### GDPR / Regional

- The Insight Tag sets advertising/measurement cookies. In jurisdictions requiring prior consent for such storage, gate the tag behind advertising/marketing consent. LinkedIn's GDPR guidance also states that LinkedIn requires member consent to use connectable Off-LinkedIn Data for ads.
- LinkedIn does **not** publish a native consent-mode SDK signal (no equivalent of Google's `consent_mode` or Meta's "Consent Granted" template parameter). Enforce consent at the **GTM/CMP layer**: add `ad_storage` as a required Additional Consent Check on every LinkedIn Insight tag.
- For strict GDPR opt-in, the safest design is to suppress the entire base tag (do not load `insight.min.js`) until consent is obtained.
- **LinkedIn pseudonymization commitments**: direct identifiers are removed within **7 days**; remaining pseudonymized data is deleted within **180 days**. IP addresses are truncated or hashed.

### ITP / Browser Restrictions

- The third-party `bcookie` and `lidc` cookies are blocked by Safari ITP and similar protections. This degrades Website Demographics and retargeting match rates but does not prevent conversion measurement when first-party cookies are enabled.
- The first-party `li_fat_id` cookie is not blocked as a third-party cookie but is subject to Safari's 7-day client-side first-party cookie cap.
- For maximum durability, pair the Insight Tag with **Conversions API** sending `SHA256_EMAIL` and `li_fat_id` from a server-side context.

---

## 7. dataLayer Mapping (Recommended Pattern)

Map common GA4-style events to LinkedIn conversion rules. Each requires a separate Conversion ID created in Campaign Manager.

| GA4 dataLayer event | LinkedIn Conversion Type | Recommended `event_id` |
|---|---|---|
| `purchase` | `PURCHASE` | `transaction_id` |
| `generate_lead` | `LEAD` | form submission ID |
| `sign_up` | `SIGN_UP` or `COMPLETE_SIGNUP` | user ID |
| `add_to_cart` | `ADD_TO_CART` | cart event ID |
| `begin_checkout` | `START_CHECKOUT` | session / cart ID |
| `view_item` | `VIEW_CONTENT` or `KEY_PAGE_VIEW` | — |
| `subscribe` | `SUBSCRIBE` or `START_TRIAL` | subscription ID |
| (custom) book demo | `BOOK_APPOINTMENT` | booking ID |

When sending the same `event_id` to both the Insight Tag and CAPI, use a **stable identifier** (order ID, form submission ID) — never `Date.now()` or random values.

---

## 8. Debugging

| Tool | What to Verify |
|---|---|
| **GTM Preview Mode** | Tag firing order (Base -> Event), variable values, that `Partner ID` and `Conversion ID` resolve correctly |
| **Campaign Manager > Signals manager > Insight Tag** | Status `Active` / `Receiving traffic` (delay up to 24 hours from first load); list of recent domains |
| **Campaign Manager > Conversion tracking** | Conversion shows as `Active`; per-conversion event counts; "Last received" timestamp |
| **DevTools Network** | Filter for `px.ads.linkedin.com`. Base PageView -> `https://px.ads.linkedin.com/collect/?pid=<partner>&fmt=gif`. Event-specific -> `https://px.ads.linkedin.com/wa/?...` (`pid`, `conversionId`, `eventId`, `time` parameters). Successful responses are HTTP 200/302. |
| **CAPI testing** | Use the [LinkedIn Marketing Solutions Postman Collection](https://www.postman.com/linkedin-developer-apis/linkedin-marketing-solutions-versioned-apis/) and the [Conversions Payload Builder](https://www.linkedin.com/developers/payload-builder). There is no real-time "Test Events" surface in Campaign Manager; verification is via reporting. |

> **Browser extensions**: LinkedIn does not publish a first-party Pixel Helper. Official troubleshooting guidance recommends a generic third-party network-tag inspector such as Ghostery for spot-checking. Several third-party LinkedIn-specific helpers exist; vet them yourself before relying on their output.

---

## 9. Best Practices

- **Run Insight Tag + CAPI for high-value events** (Lead, Purchase, Qualified Lead). Use a stable browser `event_id` / CAPI `eventId` (transaction ID, form submission ID) so the two streams can deduplicate. Remember: if both arrive, the **Insight Tag event wins**.
- **Use `SHA256_EMAIL` + `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` together** in CAPI events for the highest match rates.
- **Enable Enhanced conversion tracking** (first-party cookies) in Campaign Manager.
- **Send `userInfo`** (firstName + lastName + companyName + title + countryCode) when available — these are plaintext and significantly boost B2B match rates.
- **Use the LinkedIn-published GTM template** (author: `linkedin`), not legacy Custom HTML implementations.
- **Use separate Conversion IDs per event type**; do not multiplex events under a single Conversion ID.
- **Set 30-90 day post-click windows for B2B**, and 365 days for `LEAD`, `QUALIFIED_LEAD`, `PURCHASE`, `ADD_TO_CART`, and `SUBMIT_APPLICATION` when sales cycles are long.
- **Pair Conversion Tracking with LinkedIn Lead Gen Forms** — these surface as `urn:li:leadGenFormResponse:<id>` and can be sent in `user.lead` for direct match.
- **Pin the API version** explicitly in every CAPI request and schedule a yearly migration.

### Common Pitfalls

- **Double firing**: a Site-wide URL rule and a per-event Conversion ID can both match the same logical action. Pick one method per conversion.
- **Wrong unit on `conversionHappenedAt`**: must be **milliseconds** since epoch, not seconds.
- **90-day past-event limit**: events older than 90 days are rejected. Send promptly.
- **Sensitive-data pages**: do not place the Insight Tag on consumer health or financial pages; LinkedIn can disable advertising privileges.
- **Forgetting to associate campaigns**: an unlinked rule collects but does not attribute. Always associate.
- **Conflating browser and CAPI rules**: deduplication requires **two distinct conversion rules** (browser and CAPI), both linked to the same campaigns, with matching `event_id` values.
- **Insight Tag does not auto-send PII**: unlike Meta's automatic Advanced Matching, the Insight Tag does not scrape forms. PII matching only happens via CAPI.
- **Reporting lag**: Insight Tag and CAPI conversions can take a few hours to appear. Don't troubleshoot based on a 30-minute window.

---

## 10. References

### LinkedIn Official (Help Center)

- [LinkedIn Insight Tag — Marketing Solutions](https://business.linkedin.com/marketing-solutions/insight-tag)
- [Add the LinkedIn site-wide Insight Tag to Google Tag Manager](https://www.linkedin.com/help/lms/answer/a416960)
- [Add the LinkedIn Insight Tag to your website](https://www.linkedin.com/help/lms/answer/a418880)
- [Use event-specific conversion tracking with Google Tag Manager](https://www.linkedin.com/help/lms/answer/a417886)
- [Set up Conversion Tracking for Insight Tag conversions](https://www.linkedin.com/help/lms/answer/a425606)
- [Conversion tracking event types](https://www.linkedin.com/help/lms/answer/a528686)
- [LinkedIn Conversion Tracking FAQs](https://www.linkedin.com/help/lms/answer/a420533)
- [LinkedIn Conversions API (Help)](https://www.linkedin.com/help/lms/answer/a1655394)
- [Enable first-party cookies on a LinkedIn Insight Tag](https://www.linkedin.com/help/lms/answer/a423304)
- [Troubleshooting the LinkedIn Insight Tag](https://www.linkedin.com/help/lms/answer/a425696)
- [LinkedIn Matched Audiences](https://www.linkedin.com/help/lms/answer/a420552)
- [Lookalike audiences discontinuation](https://www.linkedin.com/help/lms/answer/a423698)
- [Conversion windows and counting](https://www.linkedin.com/help/lms/answer/a426359)
- [LinkedIn Marketing Solutions and GDPR](https://www.linkedin.com/help/lms/answer/a1444756)
- [LinkedIn Cookie Table](https://www.linkedin.com/legal/l/cookie-table)
- [Conversions Payload Builder](https://www.linkedin.com/developers/payload-builder)

### LinkedIn Developer (Microsoft Learn)

- [Marketing API Versioning](https://learn.microsoft.com/en-us/linkedin/marketing/versioning)
- [Conversions API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api)
- [Conversions API Schema](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api-schema)
- [Conversions API GTM Server-Side Tagging Guide](https://learn.microsoft.com/en-us/linkedin/marketing/conversions/conversions-api-gtm-guide)
- [Insight Tag <-> CAPI Deduplication](https://learn.microsoft.com/en-us/linkedin/marketing/conversions/deduplication)
- [Getting Access to Conversions API](https://learn.microsoft.com/en-us/linkedin/marketing/conversions/getting-access-conversions)
- [LinkedIn Insight Tag GTM Community Template (GitHub)](https://github.com/linkedin/linkedin-gtm-community-template)
- [LinkedIn CAPI sGTM Template (GitHub)](https://github.com/linkedin-developers/linkedin-capi-tag-template)
- [LinkedIn Marketing Solutions Postman Collection](https://www.postman.com/linkedin-developer-apis/linkedin-marketing-solutions-versioned-apis/)
