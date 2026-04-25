# LinkedIn Insight Tag - GTM Implementation Manual

> Source of truth: [LinkedIn Marketing API documentation](https://learn.microsoft.com/en-us/linkedin/marketing/) — entry point to Insight Tag, Conversions API, and Audiences docs.
> LinkedIn API versions follow a `YYYYMM` cadence; each version is supported for at least 12 months before sunset.

---

## 1. Conversion Type Reference

LinkedIn does not expose a fixed list of standard JS event names. Instead, you create a **conversion rule** in Campaign Manager (or via the Marketing API), assign it a **conversion type** from a fixed enum, and trigger it from the website using either a URL match or `window.lintrk('track', { conversion_id: <ID> })`. Each rule receives its own numeric **Conversion ID**.

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

`QUALIFIED_LEAD` surfaces as the `qualifiedLeads` and `costPerQualifiedLead` reporting metrics and is usable as an optimization goal for Lead Generation campaigns.

### Conversion Rule Attributes (defined once per rule)

| Field | Description |
|---|---|
| `name` | Human-readable rule name |
| `type` | Conversion type from the enum above |
| `valueType` | `DYNAMIC` (overridden per event), `FIXED` (uses rule's stored value), or `NO_VALUE`. Default is `DYNAMIC`. |
| `postClickAttributionWindowSize` | 1, 7, 30, or 90 days. Default 30. 365-day window allowed for `SUBMIT_APPLICATION`, `PURCHASE`, `ADD_TO_CART`, `QUALIFIED_LEAD`, `LEAD`. |
| `viewThroughAttributionWindowSize` | 1, 7, 30, or 90 days. Default 7. 365-day window allowed for the same long-window types. |
| `attributionType` | `LAST_TOUCH_BY_CAMPAIGN` (default) or `LAST_TOUCH_BY_CONVERSION`. |
| `enabled` | Boolean. Only enabled rules count. |
| `conversionMethod` | `CONVERSIONS_API` for server-side rules. For Insight Tag <-> CAPI deduplication, create **two separate rules** (one browser, one CAPI) and link both to the same campaigns. |

---

## 2. Insight Tag Setup

The LinkedIn Insight Tag is a JavaScript snippet that automatically fires a page-view request to `px.ads.linkedin.com/collect/` on every page where it loads. The base tag is the page-view signal and the foundation for Matched Audiences, Website Demographics, and conversion tracking.

> **Sensitive-data restriction**: LinkedIn forbids placing the Insight Tag on pages that collect or display sensitive data (consumer health, consumer financial services, etc.).

### Prerequisites

- A **Partner ID** from Campaign Manager > **Data > Signals manager > Insight Tag**. Choose **"I will use a tag manager"** to surface the Partner ID.
- (For event-specific conversions) one or more **Conversion IDs** created in Campaign Manager > Measurement > Conversion tracking, with **"Event-specific"** chosen as the tracking method.
- The **LinkedIn Insight Tag** community template (v2.0) published by `linkedin` in the GTM Community Template Gallery. The template handles loading `insight.min.js` and initializing `_linkedin_partner_id` / `lintrk` internally — **no Custom HTML Base Code is required**.

### Official GTM Template — Configuration Fields

| Field | Description |
|---|---|
| **Partner ID / Insight Tag ID** | Numeric Partner ID. Comma-separated values are accepted to fire multiple tags. |
| **Conversion IDs (max. 3)** | Optional. Comma-separated numeric Conversion IDs from Campaign Manager. |
| **Custom URL override** | Optional. Overrides the default page URL when LinkedIn instructs you to do so. |
| **Event ID** | Optional. Passed to `lintrk('track', ...)` for deduplication with Conversions API. |

> The official template does not expose dedicated Conversion Value, Currency, or Order ID fields. To send a per-event monetary value, configure `valueType: FIXED` on the conversion rule, or use sGTM + Conversions API for dynamic values.

### Tags

Two patterns are common.

**A. Single base tag + URL-based conversions in Campaign Manager** (low-touch). Define each conversion rule with a URL match (e.g. URL contains `/thank-you`).

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

1. **Site-wide Insight Tag** — define a URL match. No JavaScript change required.
2. **Event-specific Insight Tag** — define a Conversion ID; fire `lintrk('track', { conversion_id: <ID> })` from GTM.
3. **Conversions API** (server-side) — see Section 4.

### Attribution Windows

| Setting | Allowed Values | Default |
|---|---|---|
| Post-click | 1, 7, 30, 90 (and 365 for `SUBMIT_APPLICATION`, `PURCHASE`, `ADD_TO_CART`, `QUALIFIED_LEAD`, `LEAD`) | 30 |
| View-through | 1, 7, 30, 90 (and 365 for the same long-window types) | 7 |

### Counting Behavior

- **Most types** (Lead, Sign Up, Key Page View, Download, etc.): a single conversion is counted per member within the conversion window.
- **Purchase and Add to Cart**: each event can be counted.

### Browser-Side Deduplication

Avoid firing the same browser conversion tag more than once per logical action. Use GTM trigger conditions ("Once per page" / "Once per event"). For redundancy with Conversions API, deduplicate via `event_id` / `eventId`.

---

## 4. Conversions API (CAPI)

LinkedIn's Conversions API is the recommended hybrid setup alongside the Insight Tag. Use the official sGTM template **LinkedIn | CAPI Tag** (by `linkedin-developers`) — pattern: GA4 Web Tag -> server container -> GA4 Client -> LinkedIn CAPI Tag posts to `/rest/conversionEvents`. Required inputs: API access token + Conversion Rule ID. Pin `Linkedin-Version: YYYYMM` per request and migrate yearly.

> **Insight Tag <-> CAPI deduplication**: if the same `eventId` arrives from both, **the Insight Tag event wins** (opposite of Meta). Both rules must exist as separate conversion rules linked to the same campaigns.

See: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api

---

## 5. Matched Audiences (Remarketing)

Insight Tag enables Website Audiences (URL rules), and is paired in Campaign Manager with Contact Lists (CSV/CRM) and Company Lists. Minimum **300 matched members** before activation. Insight Tag also powers Website Demographics. Lookalike Audiences were discontinued Feb 29, 2024 — replacements are **Predictive Audiences** and **Audience Expansion**.

See: https://www.linkedin.com/help/lms/answer/a420552

---

## 6. Consent & Privacy

LinkedIn does not publish a native consent-mode SDK signal. Enforce consent at the **GTM/CMP layer**: add `ad_storage` as a required Additional Consent Check on every LinkedIn Insight tag. For strict GDPR opt-in, suppress the entire base tag until consent is obtained.

### `li_fat_id` (First-Party Click ID)

When **Enhanced conversion tracking** is enabled (Campaign Manager > Signals manager > Insight Tag > Settings), LinkedIn appends `li_fat_id` to landing-page URLs and stores it as a first-party cookie on the advertiser domain. The value can be sent to CAPI as `idType: LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` for high-quality match.

### Cookies (key set)

| Cookie | Set By | Purpose | Lifetime |
|---|---|---|---|
| `bcookie` | linkedin.com (third-party) | LinkedIn browser identifier | 1 year |
| `lidc` | linkedin.com | Routing | 24 hours |
| `li_gc` | linkedin.com | Stores guest cookie consent | 6 months |
| `UserMatchHistory` | linkedin.com | Ad ID sync | 30 days |
| `li_fat_id` | first-party (advertiser) | LinkedIn click ID | 30 days |

Third-party cookies are blocked by Safari ITP. For maximum durability, pair the Insight Tag with **Conversions API** sending `SHA256_EMAIL` and `li_fat_id`.

---

## 7. dataLayer Mapping (Recommended Pattern)

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

When sending the same `event_id` to both Insight Tag and CAPI, use a **stable identifier** (order ID, form submission ID) — never `Date.now()` or random values.

---

## 8. Debugging

- **GTM Preview Mode**: tag firing order (Base -> Event), variable resolution.
- **Campaign Manager > Signals manager > Insight Tag**: status `Active` / `Receiving traffic` (delay up to 24 hours).
- **DevTools Network**: filter `px.ads.linkedin.com`. Base PageView -> `/collect/`; events -> `/wa/?...` with `pid`, `conversionId`, `eventId`.

---

## 9. Best Practices

- **Run Insight Tag + CAPI for high-value events** with a stable `event_id` (transaction ID, form ID). Remember Insight Tag wins on dedup.
- **Use `SHA256_EMAIL` + `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` together** in CAPI for best match rates.
- **Enable Enhanced conversion tracking** (first-party cookies) in Campaign Manager.
- **Use the LinkedIn-published GTM template**, not legacy Custom HTML.
- **Use separate Conversion IDs per event type**; do not multiplex events under a single Conversion ID.
