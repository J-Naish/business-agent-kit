# Google Ads - GTM Implementation Manual

> Source of truth: [Set up Google Ads conversion tracking (Help Center)](https://support.google.com/google-ads/answer/6095821) — entry point with links to Enhanced Conversions, GTM/GA4 setup, conversion values, counting options, and troubleshooting.

---

## 1. Conversion Design

### Primary vs. Secondary

| Category | Display Location | Bidding Optimization | Use Case |
|----------|-----------------|---------------------|----------|
| **Primary** | "Conversions" column | **Eligible** | Final business goal (purchase, lead acquisition) |
| **Secondary** | "All conversions" column only | Not eligible | Observing intermediate metrics (add-to-cart, page views, etc.) |

- Whether a conversion is used for bidding optimization depends on "which conversion goals the campaign is using." Even secondary conversions can become bidding-eligible if added to a custom goal and linked to a campaign.
- Primary/secondary settings are managed at the account level.

### Counting Method

| Setting | Behavior | Recommended Scenario |
|---------|---------|---------------------|
| **Every** | Counts every occurrence from the same user | E-commerce purchases (each purchase drives revenue) |
| **One** | Counts only the first occurrence per user | Lead acquisition (a second submission adds little value) |

### Conversion Window

| Window | Description | Default | Range |
|--------|-------------|---------|-------|
| Click-through | Conversion measurement window after an ad click | 30 days | 1–90 days |
| View-through | Conversion measurement window after an ad view (no click) | 1 day | 1–30 days |
| Engaged-view | Video ads only (e.g., 10+ seconds viewed) | 3 days | 1–30 days |

### Conversion Value

| Method | Description | Use Case |
|--------|-------------|----------|
| **Static (fixed value)** | Same value applied to all conversions | Lead form submission = USD 50, etc. |
| **Dynamic value** | Per-transaction value retrieved from the dataLayer | E-commerce purchase (order amount) |

### Attribution Model

| Model | Description |
|-------|-------------|
| **Data-driven (DDA)** | Allocates contribution of each touchpoint via machine learning (**default and recommended**) |
| **Last click** | 100% credit to the last click. May still be the default for conversion actions created before 2023 |

> First click, linear, time decay, and position-based were deprecated in 2023.

---

## 2. GTM Configuration

### Prerequisites

- The **Conversion ID** (`AW-XXXXXXXXX`) and each **conversion label** have been obtained in Google Ads.
- Do **not duplicate tags with the same purpose** between gtag.js and GTM (avoid configurations where GTM-managed tags coexist with hardcoded tags, causing double-firing).

### Tag List

| Tag Name | Tag Type | Trigger | Required Consent |
|----------|---------|---------|-----------------|
| Google Ads - Conversion Linker | Conversion Linker | All Pages | ad_storage |
| Google Ads - Remarketing | Google Ads Remarketing | All Pages | ad_storage, ad_personalization |
| Google Ads - CV Purchase | Google Ads Conversion Tracking | CE - purchase | ad_storage |
| Google Ads - CV Lead | Google Ads Conversion Tracking | CE - generate_lead | ad_storage |
| Google Ads - EC Data (Purchase) | Google Ads User-Provided Data Event | CE - purchase | ad_storage, ad_user_data |

### Conversion Linker

A tag that detects ad click information (GCLID) from the URL and stores it in a first-party cookie. **As a rule, install it on All Pages**. In configurations where a Google tag (e.g., GA4 Configuration tag) is loaded on every page through GTM, it may be unnecessary because the Google tag includes this functionality.

**Cookies stored:**

| Cookie | Purpose |
|--------|---------|
| `_gcl_aw` | Google Ads click ID |
| `_gcl_dc` | DoubleClick click ID |
| `_gcl_gs` | Google Ads session info |

**Configuration:**
1. Tag type: "Conversion Linker"
2. Trigger: **All Pages** (required)

**Cross-domain configuration:** Check "Enable linking across domains", enter auto-link domains as a comma-separated list, optionally check "Enable linking in form action URLs".

### Conversion Tag

1. Tag type: "Google Ads Conversion Tracking"
2. Enter the Conversion ID and label
3. Set conversion value, currency code, and transaction ID via dataLayer variables

### Trigger Patterns

| Pattern | Trigger Type | Example Condition | Notes |
|---------|-------------|-------------------|-------|
| Thank-you page | Page View | Page URL contains `/thank-you` | Simplest |
| Form submission | Form Submission | Form ID equals `contact-form` | Recommend "Wait for Tags" and "Check Validation" |
| **dataLayer event (recommended)** | Custom Event | Event name = `purchase`, etc. | Most flexible and reliable |

### Variables

**Constant variables** (centralizing IDs/labels):

| Variable Name | Value |
|---------------|-------|
| `Google Ads - Conversion ID` | (Conversion ID) |
| `Google Ads - CV Label Purchase` | (Conversion label) |
| `Google Ads - CV Label Lead` | (Conversion label) |

**dataLayer variables:**

| Variable Name | dataLayer Variable Name |
|---------------|------------------------|
| `DLV - ecommerce.value` | `ecommerce.value` |
| `DLV - ecommerce.currency` | `ecommerce.currency` |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` |
| `DLV - ecommerce.items` | `ecommerce.items` |
| `DLV - enhanced_conversion_data` | `enhanced_conversion_data` |

### dataLayer Implementation Example (Purchase Completion)

```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T-20260221-001',
    'value': 99.97,
    'currency': 'USD',
    'items': [
      { 'item_id': 'SKU-001', 'item_name': 'Product A', 'price': 29.99, 'quantity': 2 },
      { 'item_id': 'SKU-002', 'item_name': 'Product B', 'price': 39.99, 'quantity': 1 }
    ]
  },
  'enhanced_conversion_data': {
    'email': 'user@example.com',
    'phone_number': '+12025550123'
  }
});
```

> The pre-push of `ecommerce: null` is required (prevents mixing with previous ecommerce data).

**Required parameters for purchase tag:** `value`, `currency`, `transaction_id` (used for deduplication).

---

## 3. Enhanced Conversions

Matches user-provided first-party data (e.g., email) with Google accounts to supplement cookie-independent conversion measurement.

### GTM Configuration

**Prerequisite:** Google Ads > Goals > Conversions > Settings > turn on Enhanced Conversions > Method: select "GTM"

**Method A: Google Ads User-Provided Data Event tag (recommended)** — Tag type "Google Ads User-Provided Data Event", enter Conversion ID, set dataLayer variables in the User-provided data section, trigger on the same event as the conversion tag.

**Method B:** Check "Include user-provided data" on the existing conversion tag and configure user-provided data variables.

GTM template field name: `user_provided_data` (with sub-fields `email`, `phone_number`, `address`). Let the tag handle hashing — pass plaintext via the dataLayer; do not pre-hash unless you set the explicit `sha256_*` fields.

For full field reference and normalization rules, see Enhanced conversions for web (Google Ads Help).

### PII Handling Considerations

**PII placed on the dataLayer is accessible to all tags in the GTM container** (GA4, Meta Pixel, etc.). Mitigations:
- Design enhanced-conversion variables to be used only by Google Ads-related tags
- Recognize that PII may appear in GTM Preview mode and monitoring tools
- Send data only after consent is granted
- Prefer hashing/sending on the server side (sGTM) when feasible

---

## 4. GA4 Integration

### Linking Setup

GA4 Admin > Product Links > Google Ads Links > select account > enable Personalized Advertising.

| Platform | Required Permission |
|----------|--------------------|
| GA4 | Property-level "Editor" or higher |
| Google Ads | Account "Admin" permission |

### Native Conversions vs. GA4-Imported Conversions

| Comparison | Native (recommended) | GA4 Import |
|-----------|---------------------|-----------|
| View-through conversions | Measurable | **Not supported** |
| Cross-device conversions | Measurable | **Limited** |
| Data freshness | Within a few hours | 24–48 hours |
| Enhanced conversions | Full support | Limited |
| Bidding optimization | Optimal | Disadvantaged |
| Attribution scope | Within Google Ads only | Across all channels |

### Recommended Configuration: Hybrid Approach

```
[Primary - bidding]   Google Ads native conversion tag (via GTM), enhanced conversions enabled
[Secondary - observe] GA4 key event import (cross-channel analysis; not for bidding)
* Do not set the same event as "primary" on both sides
```

### Numerical Discrepancies

A discrepancy of about 20–30% can occur between Google Ads and GA4. Main causes: differences in attribution model, reference date (GA4 = conversion date, Ads = click date), view-through conversions (only Ads), data processing timing, invalid traffic filtering.

---

## 5. Consent Mode

### Consent Types Important for Google Ads

| Consent Type | Scope |
|--------------|-------|
| `ad_storage` | Advertising cookies |
| `ad_user_data` | Sending user data for advertising purposes |
| `ad_personalization` | Ad personalization such as remarketing |

### Basic vs. Advanced

| Mode | Behavior | Data Collection |
|------|---------|----------------|
| **Basic** | Block all tags until consent is granted | No data collection when denied |
| **Advanced (recommended)** | Tags load regardless of consent state and send cookieless pings | Cookieless pings even when denied; modeling possible |

### GTM Firing Order

1. `Consent Initialization - All Pages` (default consent settings)
2. `Initialization - All Pages` (initialization tags)
3. `All Pages` (regular page-view tags)

Consent Mode is required in the EEA/UK. Recommended elsewhere for data quality and alignment with regional privacy laws (CCPA/CPRA, LGPD, APPI, etc.).

---

## 6. Server-Side GTM

Use the official **"Google Ads Conversion Tracking"** and **"Google Ads Remarketing"** tags inside an sGTM container. Two routes: (A) Browser → sGTM → GA4 (delivered to Ads via GA4), or (B) sGTM fires the Ads conversion tag directly. Benefits: HttpOnly cookies (mitigates ITP), reduced ad-blocker impact, server-side credential management.

For sGTM container setup and CAPI parameter mapping, see Google Ads Conversions (server-side).

---

## 7. Offline Conversions

Imports conversion data into Google Ads when an ad click leads to an offline outcome (e.g., closed deal). Capture **GCLID** at landing time (stored in `_gcl_aw`, 90-day expiration) and upload via Google Ads Data Manager (recommended), the Ads UI, or the Google Ads API. Related identifiers: GCLID (web), GBRAID (iOS app), WBRAID (iOS web). **Enhanced Conversions for Leads** improves OCI by also matching on hashed user data (median ~10% uplift).

See About offline conversion imports.

---

## 8. Automated Bidding and Conversion Data

Smart Bidding strategies (Maximize Conversions, tCPA, Maximize Conversion Value, tROAS) need adequate conversion volume — typically 15–50+ conversions per 30 days depending on strategy. Use **macro conversions** (purchase, lead) as primary and **micro conversions** (add_to_cart, begin_checkout) as secondary; promote a micro conversion to primary only when macros are too sparse for learning (<50/month) or in cold-start periods.

Improve data quality: enable enhanced conversions, set accurate dynamic values, use native tags, keep measurement consistent.

See About bidding strategies.

---

## 9. Debugging

| Tool | What to Check |
|------|--------------|
| **GTM Preview mode** | Tag firing order, dataLayer state, variable values, consent state |
| **Tag Assistant** (tagassistant.google.com) | Tag detection and diagnostics |
| **DevTools Network** | Requests to `googleads.g.doubleclick.net/pagead/conversion/` (cv = label, value, oid = transaction ID, gclaw = GCLID) |

### Common Issues

| Symptom | What to Check |
|---------|--------------|
| Conversions not recorded | Conversion linker on All Pages? ID/label correct? Trigger? Container published? Blocked by Consent Mode? |
| Conversion value 0 / empty | Is dataLayer push firing before the tag? DLV variable name correct? |
| GCLID not stored | Linker on All Pages? GCLID lost in redirect chain? Cross-domain config? |
| Low EC match rate | Send email first; send multiple data points; verify normalization |
| Duplicate conversions | Deduplicate by `transaction_id` (effective within the same conversion action) |

---

## 10. Best Practices and Common Pitfalls

- **Conversion Linker on All Pages** is foundational — without it, GCLID/cookie capture breaks.
- **No duplicate tags between gtag.js and GTM** — pick one source of truth to avoid double-firing.
- **Always send `value`, `currency`, `transaction_id`** for purchases; transaction ID is the dedup key.
- **Use DDA attribution** and primary/secondary classification deliberately; do not mark every event as primary.
- **Hash PII server-side when possible**, otherwise let the tag auto-hash from plaintext dataLayer fields — never double-hash.

---

## 11. Implementation Checklist

- [ ] GTM container installed on every page; no gtag.js/GTM duplication
- [ ] GA4 ↔ Google Ads linked; auto-tagging enabled
- [ ] Conversion Linker configured and published with All Pages
- [ ] Native conversion tag configured; counting (Every/One), window, attribution (DDA), primary/secondary correct
- [ ] Conversion value set; no duplicate primaries; GA4 key events imported as secondary
- [ ] Enhanced Conversions enabled in Google Ads + GTM; at minimum email is sent; normalization correct
- [ ] Consent Mode v2 implemented with CMP; Advanced mode preferred
- [ ] Periodically check status, EC match rate, Ads vs GA4 discrepancies, bidding learning state
