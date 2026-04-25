# Google Ads - GTM Implementation Manual

> For the latest specifications, refer to [Google Ads Conversions - GTM Help](https://support.google.com/tagmanager/answer/6105160).

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

**Conversion value rules:** Conversion values can be automatically adjusted based on audience, location, or device (e.g., multiply conversion value by 1.5x for high-value customer lists).

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

A tag that detects ad click information (GCLID) from the URL and stores it in a first-party cookie. **As a rule, install it on All Pages** (for compatibility and as a safeguard). However, in configurations where a Google tag (e.g., GA4 Configuration tag) is loaded on every page through GTM, it may be unnecessary because the Google tag includes this functionality.

**Cookies stored:**

| Cookie | Purpose |
|--------|---------|
| `_gcl_aw` | Google Ads click ID |
| `_gcl_dc` | DoubleClick click ID |
| `_gcl_gs` | Google Ads session info |

**Configuration:**
1. Tag type: "Conversion Linker"
2. Trigger: **All Pages** (required)

**Cross-domain configuration:**
- Check "Enable linking across domains"
- Enter auto-link domains as a comma-separated list
- Optionally check "Enable linking in form action URLs"

### Conversion Tag

**Tag setup:**
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

---

## 3. Enhanced Conversions

A feature that matches user-provided first-party data (e.g., email) with Google accounts to supplement cookie-independent conversion measurement.

### Two Types

| Type | Target | Use Case |
|------|--------|----------|
| **For Web** | Online conversions | Improves accuracy of conversions completed on the website |
| **For Leads** | Offline conversions | Tracks offline conversions following lead form submission |

### Sendable Data Fields

| Field | Notes |
|-------|-------|
| Email address | **Highest match rate**. Normalize to lowercase |
| Phone number | E.164 format (e.g., `+1XXXXXXXXXX`) |
| First name | Normalize to lowercase |
| Last name | Normalize to lowercase |
| Street / City / Region / Postal code / Country code | ISO 3166-1 alpha-2 |

> At least one is required. Sending multiple improves match rate.

### GTM Configuration

**Prerequisite:** Google Ads > Goals > Conversions > Settings > turn on Enhanced Conversions > Method: select "GTM"

**Method A: Google Ads User-Provided Data Event tag (recommended)**
1. Tag type: "Google Ads User-Provided Data Event"
2. Enter the Conversion ID
3. Set dataLayer variables in the User-provided data section
4. Trigger: same trigger as the conversion tag

**Method B: Add to existing conversion tag**
1. Check "Include user-provided data" on the existing conversion tag
2. Configure user-provided data variables

### Hashing

| Pattern | Data Sent | Field Name | Hashing Performed By |
|---------|----------|------------|---------------------|
| **A: Let the tag handle it (recommended)** | Plaintext | `email`, `phone_number` | gtag.js / GTM hashes automatically |
| **B: Hash yourself** | SHA-256 hash value | `sha256_email_address`, `sha256_phone_number` | Implementer hashes in advance |

> **Avoid double-hashing:** Passing a hash into a Pattern A field, or having the tag re-hash a Pattern B field, will make matching impossible.

**Normalization rules for self-hashing (Pattern B only):**
1. trim (remove leading/trailing whitespace)
2. toLowerCase
3. Phone: standardize to E.164 format
4. Email: gmail.com period removal and removal after `+` should be applied only when needed (verify; the official spec only requires trim/lowercasing)

### PII Handling Considerations

Recommended priority order for sending user data:

1. **Hash and send on the server side (e.g., sGTM)** (do not expose plaintext on the page; safest)
2. **When sending from the web side, rely on the tag's automatic hashing** (the Google Ads tag automatically applies SHA-256 via the dataLayer; this is Google's official, canonical procedure)
3. Self-hashing carries a risk of normalization errors, so use it only when the above options are not possible.

PII placed on the dataLayer is accessible to **all tags** in the GTM container (GA4, Meta Pixel, etc.). Mitigations:
- Design enhanced-conversion variables to be used only by Google Ads-related tags
- Recognize that PII may appear in GTM Preview mode and monitoring tools
- Design the implementation to send data only after consent is granted

### Enhanced Conversions Diagnostic Metrics

| Metric | Description |
|--------|-------------|
| Coverage | Percentage of events that include user-provided data. Aim for close to 100% |
| Match rate | Percentage matched against Google login data |
| Uplift | Increase in conversions recorded thanks to enhanced conversions |

---

## 4. GA4 Integration

### Linking Setup

GA4 Admin > Product Links > Google Ads Links > select account > enable Personalized Advertising.

| Platform | Required Permission |
|----------|--------------------|
| GA4 | Property-level "Editor" or higher |
| Google Ads | Account "Admin" permission |

### What the Link Enables

| Feature | Direction | Description |
|---------|-----------|-------------|
| View campaign data | Ads → GA4 | Clicks, cost, impressions |
| Import key events | GA4 → Ads | Use GA4 key events as conversions |
| Audience sharing | GA4 → Ads | Use GA4 audiences for ad targeting |
| Optimize automated bidding | GA4 → Ads | Optimize Smart Bidding using GA4 conversion data |

### Native Conversions vs. GA4-Imported Conversions

| Comparison | Native (recommended) | GA4 Import |
|-----------|---------------------|-----------|
| View-through conversions | Measurable | **Not supported** |
| Cross-device conversions | Measurable | **Limited** |
| Data freshness | Within a few hours | 24–48 hours |
| Enhanced conversions | Full support | Limited |
| Bidding optimization | Optimal | Disadvantaged due to lack of view-through and cross-device conversions |
| Attribution scope | Within Google Ads only | Across all channels |

> Cases where GA4 import is appropriate: when GA4 is the primary measurement system, when targeting non-web platforms (e.g., apps), or when native tag installation is difficult.

### Recommended Configuration: Hybrid Approach

```
[Primary (used for bidding optimization)]
→ Google Ads native conversion tag (via GTM)
  - Enhanced conversions enabled
  - View-through and cross-device support

[Secondary (for observation and analysis)]
→ GA4 key event import
  - Use for cross-channel analysis
  - Do not use for bidding (prevents double counting)

* Do not set the same event as "primary" on both sides
```

### Numerical Discrepancies

A discrepancy of about 20–30% can occur between Google Ads and GA4 (rough guideline; varies by product and configuration).

Main causes:
- Differences in attribution model
- Differences in reference date (GA4 = conversion date, Ads = click date)
- View-through conversions (only Ads can count them)
- Differences in data processing timing and invalid traffic filtering criteria

### GA4 Audience Use Cases

| Audience Name | Example Conditions | Use |
|---------------|-------------------|-----|
| Cart abandoners | add_to_cart and no purchase (7 days) | Remarketing |
| High engagement | session_duration > 180s AND page_view >= 5 | Lookalike audience |
| Existing customers | purchase occurred (365 days) | Exclusion, upsell |

**Predictive audiences:** Likely to purchase within 7 days, predicted high-value spenders within 28 days, likely to churn within 7 days (requirements: 1,000+ positive and negative samples each within 28 days).

---

## 5. Dynamic Remarketing

A feature that sends information about products a user has viewed and displays personalized ads.

### GTM Configuration

1. Check "Send dynamic remarketing event data" on the remarketing tag
2. Event name: dataLayer variable `{{Event}}`
3. Event value and items: corresponding dataLayer variables
4. Triggers: custom events for `view_item` / `add_to_cart` / `purchase`

### dataLayer Implementation Example

```javascript
// Product detail page
dataLayer.push({
  'event': 'view_item',
  'value': 29.99,
  'items': [{ 'id': 'SKU-001', 'google_business_vertical': 'retail' }]
});
```

> The `id` for dynamic remarketing must **exactly match the product ID in the Google Merchant Center feed**.

---

## 6. Consent Mode

### Consent Types Important for Google Ads

| Consent Type | Scope |
|--------------|-------|
| `ad_storage` | Advertising cookies |
| `ad_user_data` | Sending user data for advertising purposes |
| `ad_personalization` | Ad personalization such as remarketing |

### Basic vs. Advanced

| Mode | Behavior | Data Collection |
|------|---------|----------------|
| **Basic** | Block all tags until consent is granted | No data collection when consent is denied |
| **Advanced (recommended)** | Tags load regardless of consent state and send cookieless pings | Sends cookieless pings even when consent is denied; modeling is possible |

### GTM Firing Order

1. `Consent Initialization - All Pages` (default consent settings)
2. `Initialization - All Pages` (initialization tags)
3. `All Pages` (regular page-view tags)

### Conversion Modeling

When Advanced Consent Mode is enabled, Google compares anonymous cookieless pings from consent-denied users against behavior patterns of consented users and uses AI to estimate conversions. They appear in reports as "modeled conversions."

### Regional Considerations

Consent Mode is required in the EEA/UK to keep ads personalization and conversion measurement available under the EU Digital Markets Act. In other regions (US, etc.) it is not strictly required, but implementation is recommended — it improves data quality, prepares for global rollout, and aligns with regional privacy laws (CCPA/CPRA in California, LGPD in Brazil, APPI in Japan, etc.).

---

## 7. Server-Side GTM

### Overview

A mechanism for executing tag processing on a server, which was traditionally done in the browser.

```
[Client-side]  Browser → Direct communication to each platform server
[Server-side]  Browser → Your own server container → Each platform
```

| Benefit | Description |
|---------|-------------|
| Improved performance | Reduces client-side JS execution |
| Improved data quality | **Reduces** (does not fully avoid) the impact of ad blockers |
| Cookie durability | HttpOnly cookies can be set (mitigates ITP impact) |
| Data control | Process and filter data on the server |
| Security | Manage API keys and similar credentials on the server |

### Setup Outline

1. GTM > Create container > select Server
2. Deploy to Cloud Run
3. DNS CNAME: `gtm.yourdomain.com` → server container URL
4. On the client-side GA4 Configuration tag, set `transport_url: https://gtm.yourdomain.com`
5. Configure the Google Ads conversion tag in the server container

> sGTM has two routes: **(A)** Browser → sGTM → GA4 (delivered to Ads via GA4) and **(B)** sGTM fires the Ads conversion tag directly. The procedure above describes configuration (A). For details on (B), see the [Google Ads Conversions (server-side) Guide](https://developers.google.com/tag-platform/tag-manager/server-side/ads-setup).

### Adoption Criteria

- Monthly ad spend of USD 10K or more
- High proportion of Safari/Firefox users
- Markets with high cookie consent rejection rates (e.g., Europe)

---

## 8. Offline Conversions

### Overview

A mechanism to import data into Google Ads when an online ad click leads to an offline outcome (e.g., closed deal, in-store purchase).

### GCLID

A unique identifier auto-generated when an ad is clicked. It is appended as a URL parameter and stored in a first-party cookie (`_gcl_aw`, 90-day expiration). Save it server-side at landing time and import it when a conversion occurs.

**Related identifiers:**

| Identifier | Purpose |
|-----------|---------|
| GCLID | Standard web click tracking |
| GBRAID | iOS app conversions |
| WBRAID | iOS web conversions |

### Import Methods

| Method | Description |
|--------|-------------|
| Google Ads UI | Goals > Conversions > Upload > CSV |
| **Google Ads Data Manager (recommended)** | Connect data sources > scheduled automatic import |
| Google Ads API | Programmatic upload |

### Import CSV Format

| Field | Format |
|-------|--------|
| Google Click ID | GCLID value (case-sensitive) |
| Conversion Name | Conversion action name (exact match) |
| Conversion Time | `yyyy-mm-dd HH:mm:ss+\|-HH:mm` |
| Conversion Value | Number (optional) |
| Conversion Currency | ISO 4217 (optional) |

### Limitations

- GCLID expiration: must be imported **within 90 days** of the click
- The combination of the same GCLID + conversion name + timestamp is accepted only once
- Reflection time: up to 3 hours

### Enhanced Conversions for Leads

An improved version of OCI. Matching is also possible using hashed user data in addition to GCLID (median uplift of about 10% in conversions).

---

## 9. Automated Bidding and Conversion Data

### Bidding Strategies and Recommended Conversion Counts

| Bidding Strategy | Optimization Goal | Recommended Conversions / 30 days (guideline) |
|------------------|-------------------|---------------------------------------------|
| Maximize Conversions | Conversion count | 15+ |
| Target CPA | Target cost per conversion | 30+ (ideally 50+) |
| Maximize Conversion Value | Total conversion value | 15+ with values configured |
| Target ROAS | Return on ad spend | 50+ with accurate values |

> Recommended counts are guidelines and vary by product, industry, and conversion economics.

### Micro vs. Macro Conversions

- **Macro conversion:** primary business goal (purchase, lead acquisition) → as a rule, primary
- **Micro conversion:** intermediate action (add-to-cart, started-form) → as a rule, secondary

**Cases for using a micro conversion as primary:**
- Macro conversions are fewer than 50 per month, insufficient for Smart Bidding learning
- B2B / high-ticket products with conversion cycles spanning weeks to months
- Cold-start period for new campaigns

**Calculating micro conversion value:** average macro conversion value × transition rate (e.g., purchase USD 100 × checkout-to-purchase rate 40% = begin_checkout USD 40).

### Recommended Configuration Pattern (E-commerce Site Example)

```
Primary conversions:
├── purchase → Value: dynamic (order amount)
└── lead_form_submit → Value: fixed (estimated LTV)

Secondary conversions:
├── add_to_cart
├── begin_checkout
└── GA4-imported purchase

Campaign settings:
├── P-MAX (EC) → Conversion goal: purchase / Bidding: tROAS
├── Search (brand) → Conversion goal: purchase / Bidding: Maximize Conversions
└── Search (lead) → Conversion goal: lead_form_submit / Bidding: tCPA
```

### Initiatives to Improve Data Quality

- Enable enhanced conversions
- Set conversion values accurately (dynamic values are ideal)
- Use native tags to improve data freshness
- Maintain consistent measurement configuration

---

## 10. Debugging

| Tool | What to Check |
|------|--------------|
| **GTM Preview mode** | Tag firing order, dataLayer state, variable values, consent state |
| **Tag Assistant** | Tag detection and diagnostics. Share debug sessions at tagassistant.google.com |
| **DevTools Network** | Requests to `googleads.g.doubleclick.net/pagead/conversion/` (cv = label, value = amount, oid = transaction ID, gclaw = GCLID) |

### Data Reflection Time

| Condition | Reflection Time (guideline) |
|-----------|----------------------------|
| Last click | Up to 3 hours |
| DDA and other models | Up to 15 hours |
| Offline conversion import | Up to 3 hours |

> May exceed the above due to account conditions or processing delays. If recent data appears low, also consider conversion delay (clicks attributed to the click date).

### Common Issues

| Symptom | What to Check |
|---------|--------------|
| Conversions not recorded | Is the conversion linker firing on All Pages? / Are the ID and label correct? / Trigger conditions / Is GTM published? / Is it being blocked by Consent Mode? |
| Tag shows "Failed" | Test with ad blockers disabled / Check consent state in the Consent tab / Verify request transmission in the Network tab (potential false positive) |
| Conversion value is 0 or empty | Is the dataLayer push firing before the tag? / Is the DLV variable name correct (case sensitivity, dot notation)? |
| GCLID not stored | Is the conversion linker on All Pages? / Is GCLID lost in a redirect chain? / Cross-domain configuration |
| Low enhanced conversions match rate | Send email address as the highest priority / Send multiple data points / Verify normalization / Switch from auto-collection to manual configuration |
| Duplicate conversions | Deduplicate by `transaction_id` (effective **within the same conversion action**). For SPAs and payment return-redirects causing double-firing, also consider firing guards via sessionStorage |

---

## 11. Implementation Checklist

### Basic Setup

- [ ] GTM container is installed on every page
- [ ] No duplicate implementation between gtag.js and GTM
- [ ] GA4 and Google Ads are linked
- [ ] Google Ads auto-tagging is enabled

### Conversion Setup

- [ ] Conversion linker is configured and published with "All Pages"
- [ ] Native conversion tag is configured in GTM
- [ ] Counting method is appropriate (purchase = Every, lead = One)
- [ ] Window matches the product's consideration period
- [ ] Attribution model is DDA
- [ ] Primary/secondary classification is appropriate
- [ ] Conversion value is configured
- [ ] No duplicate primaries for the same event
- [ ] GA4 key events imported as secondary

### Enhanced Conversions

- [ ] Enhanced conversions enabled in Google Ads
- [ ] User-Provided Data Event tag, or enhanced conversions on the conversion tag, is configured
- [ ] At minimum, email address is being sent
- [ ] Normalization (lowercasing, whitespace removal) is correct
- [ ] User data acquisition verified in Preview mode

### Consent Mode

- [ ] Consent Mode v2 is implemented
- [ ] CMP is deployed
- [ ] Default consent state is appropriate
- [ ] Advanced Consent Mode is enabled (cookieless pings sent)
- [ ] Behavior on consent denial has been tested

### Dynamic Remarketing

- [ ] Remarketing tag is configured
- [ ] Dynamic parameters are being sent
- [ ] Product IDs match the Merchant Center feed

### Ongoing Operations

- [ ] Periodically confirm conversion status is "Recording"
- [ ] Periodically check conversion-count discrepancies between Google Ads and GA4
- [ ] Check enhanced conversions match rate
- [ ] Check the learning state of automated bidding
- [ ] GTM versioning is properly managed

---

## 12. References

- [Consent Mode - Google Developers](https://developers.google.com/tag-platform/security/guides/consent)
- [Server-side GTM - Google Developers](https://developers.google.com/tag-platform/tag-manager/server-side/overview)
- [Google Ads Conversions (server-side) - Google Developers](https://developers.google.com/tag-platform/tag-manager/server-side/ads-setup)
- [dataLayer - Google Developers](https://developers.google.com/tag-platform/tag-manager/datalayer)
