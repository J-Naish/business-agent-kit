# GA4 + GTM - Design and Implementation Manual

> GA4 is the foundation of all analytics, and its design is difficult to change later. Approach the initial design carefully.
> Always verify the latest specifications in the [GA4 Help Center](https://support.google.com/analytics) and [GA4 Developer Docs](https://developers.google.com/analytics/devguides/collection/ga4).

---

## 1. Property Structure

### Hierarchy

**Account** > **Property** > **Data Stream**

- 1 property = 1 site (+ associated apps). Avoid excessive splitting in order to maintain a unified user journey
- The recommended data stream configuration is Web 1 + iOS 1 + Android 1 (the official limit is 50, but avoid excessive splitting)
- If you only have a website, configure a single Web data stream

| Setting | Limit |
|------|------|
| Properties per account | 2,000 |
| Data streams per property | 50 (up to 30 apps) |

> Subproperties / rollup properties are available only in 360.

---

## 2. Event Taxonomy

### Event Categories

| Category | Description | Implementation |
|---------|------|------|
| **Automatically collected** | Collected by default (`first_visit`, `session_start`, `page_view`, etc.) | None required |
| **Enhanced measurement** | Enabled in the GA4 UI (`scroll`, `click`, `file_download`, `video_start/progress/complete`, `form_start/submit`) | UI toggle |
| **Recommended events** | Google-defined names and parameters. Enables specific report features (monetization reports, etc.) | GTM/code |
| **Custom events** | User-defined. Anything not covered by the above | GTM/code |

**Priority**: Recommended events > custom events. Recommended events are required for the automatic generation of monetization reports and for ML features.

### Event Naming Rules

- **Case-sensitive** (`my_event` ≠ `My_Event`)
- Must start with a letter. Letters, digits, and underscores only. **Less than 40 characters**
- Use **lowercase snake_case** (e.g., `contact_form_submit`). Non-ASCII characters cannot be used in event names
- Localized or non-ASCII text is allowed in parameter **values**

**Reserved prefixes** (forbidden): `_`, `firebase_`, `ga_`, `google_`, `gtag.`

**Reserved event names** (forbidden): `ad_activeview`, `ad_click`, `ad_exposure`, `ad_query`, `ad_reward`, `adunit_exposure`, `app_clear_data`, `app_exception`, `app_install`, `app_remove`, `app_store_refund`, `app_store_subscription_cancel`, `app_store_subscription_convert`, `app_store_subscription_renew`, `app_update`, `app_upgrade`, `dynamic_link_app_open`, `dynamic_link_app_update`, `dynamic_link_first_open`, `error`, `first_open`, `first_visit`, `in_app_purchase`, `notification_dismiss`, `notification_foreground`, `notification_open`, `notification_receive`, `os_update`, `screen_view`, `session_start`, `user_engagement`

### Event Design Principle: Use Parameters Rather Than Event Names

Keep event names generic and specify details with parameters. This limits the growth of unique event names and preserves analytical flexibility.

**Bad example**: `cta_click_top_banner`, `cta_click_bottom_button`, `cta_click_sidebar_link`

**Good example**:
```
Event: cta_click
Parameters:
  cta_id: cta_bnr_top / cta_btn_btm / cta_link_side
  click_url: https://...
```

Parameter value prefix pattern: `type_position` (e.g., `cta_bnr_top`, `cta_btn_footer`)

> Operational guideline: keep custom events to roughly 15-25. Web has no official limit, but apps have a hard limit of 500.

### Parameter Rules

| Item | Limit |
|------|------|
| Parameters per event | 25 |
| Parameter name | 40 chars, alphanumeric + underscore, must start with a letter |
| Parameter value | 100 chars (standard) / 500 chars (360) |
| User property name | 24 chars |
| User property value | 36 chars |

---

## 3. Recommended Events Reference

### Common to All Properties

| Event | Purpose |
|---------|------|
| `login` | Login |
| `sign_up` | Sign-up |
| `search` | On-site search |
| `select_content` | Content selection |
| `share` | Content sharing |

### E-commerce

> "Required parameters" = events still fire without them, but they are essentially required because they are indispensable for monetization reports, optimization, and ROAS measurement.

| Event | Purpose | Required parameters |
|---------|------|---------------|
| `view_item_list` | View product list | `items` |
| `select_item` | Select product | `items` |
| `view_item` | View product detail | `currency`, `value`, `items` |
| `add_to_cart` | Add to cart | `currency`, `value`, `items` |
| `remove_from_cart` | Remove from cart | `currency`, `value`, `items` |
| `add_to_wishlist` | Add to wishlist | `currency`, `value`, `items` |
| `view_cart` | View cart | `currency`, `value`, `items` |
| `begin_checkout` | Begin checkout | `currency`, `value`, `items` |
| `add_shipping_info` | Submit shipping info | `currency`, `value`, `items` |
| `add_payment_info` | Submit payment info | `currency`, `value`, `items` |
| `purchase` | Purchase complete | `currency`, `value`, `transaction_id`, `items` |
| `refund` | Refund | `currency`, `value`, `transaction_id` |

### Lead Generation

| Event | Purpose | Required parameters |
|---------|------|---------------|
| `generate_lead` | Lead generation (form submission) | `currency`, `value` |
| `qualify_lead` | Lead qualification | `currency`, `value` |
| `disqualify_lead` | Lead disqualification | `currency`, `value` |
| `close_convert_lead` | Lead conversion | `currency`, `value` |
| `close_unconvert_lead` | Non-conversion | `currency`, `value` |

### Custom Event Examples for SaaS

```
# Onboarding
onboarding_start / onboarding_step_complete (step_name, step_number) / onboarding_complete

# Feature usage
feature_used (feature_name, feature_category) / feature_discovered (feature_name)

# Subscription
plan_viewed (plan_name, plan_price) / trial_started / trial_expired
subscription_started (plan_name, billing_cycle, value)
subscription_upgraded / subscription_downgraded (from_plan, to_plan)
subscription_canceled (cancel_reason)

# Support
help_article_viewed (article_id) / support_ticket_created / feedback_submitted (feedback_type, rating)
```

### Structure of the items Array

- Up to **200 items per event**, and up to **27 custom parameters** within the items array
- Standard fields: `item_id`, `item_name`, `price`, `quantity`, `item_brand`, `item_category` (up to 5 levels), `item_variant`, `affiliation`, `discount`, `coupon`, `location_id`, `index`

---

## 4. Key Events (Conversions)

In GA4, "conversions" have been renamed to "key events". Any event can be marked as a key event. Mark only the business actions that truly matter.

### Counting Methods

| Method | Behavior | Best suited for |
|------|------|-----------|
| **Once per event** | Counts every time it fires | E-commerce (count each purchase) |
| **Once per session** | Counted only once within the same session | Leads (prevent duplicates) |

### Conversion Window

| Type | Default | Options |
|------|-----------|-----------|
| Acquisition events (`first_open`, `first_visit`) | 30 days | 7 days |
| Other key events | 90 days | 30 days, 60 days |

### Attribution

Only **two** models are available in GA4 (the others have been deprecated):

| Model (UI label) | Description | Recommended case |
|-----------------|------|-----------|
| **Data-driven** | ML calculates the contribution of each touchpoint | 200+ CV / 2,000+ touchpoints per month |
| **Paid and organic channels last click** | 100% credit to the last paid/organic touchpoint | Low CV volume / simple purchase flow |

**Recommendation**: Use last click while traffic is low, then switch to data-driven once enough data has accumulated.

**Differences in attribution per report** (fixed regardless of settings):

| Report | Attribution used |
|---------|---------------------|
| Traffic acquisition | Last non-direct click |
| User acquisition | First touch |
| Conversions | Selected model (Data-driven or Last click) |

> This is a major cause of data discrepancies. When report numbers don't match, check this difference first.

### Google Ads Linking

- GA4 key events default to **Secondary** in Google Ads → switch to **Primary** if used for bidding
- After import, wait **3 weeks** before applying the bidding strategy
- Reflection: up to **24 hours**
- During migration: change the old CV action to "Secondary" → set the new GA4 action to "Primary"

---

## 5. Custom Dimensions / Metrics

### Quotas

| Type | Standard | 360 |
|--------|------|-----|
| Event-scoped | 50 | 125 |
| User-scoped | 25 | 100 |
| Item-scoped | 10 | 25 |
| Custom metrics | 50 | 125 |

### Best Practices

- **Check default dimensions first**. Registering duplicates against existing parameters wastes quota
- **Avoid high cardinality**: too many unique values get aggregated into the "(other)" row (rule of thumb: can occur at around several hundred unique values; varies by situation). Do not register Event ID / Session ID / User ID
- **Use the built-in User-ID feature for User ID** (do not make it a custom dimension)
- **Use custom metrics** for numeric data
- After deletion, wait **48 hours** before recreating
- Once a custom parameter is created, register the custom dimension/metric promptly (without registration, it will not appear in UI reports)

---

## 6. GTM Integration Design

### Google Tag (GA4 Configuration)

- The Google tag = the foundational tag that establishes the connection to GA4. Fires on all pages via the **Initialization trigger**
- GA4 event tags fire on individual triggers (the legacy "Configuration tag" dropdown has been deprecated)
- Use **configuration variables** to share common parameters across tags. **Make the Google tag configuration variable the single source of truth for the Measurement ID, server container URL, common parameters, and consent state, and have event tags simply reference that variable** (to prevent duplicate definitions)
- **No double tagging**: using gtag.js and the GTM-based GA4 tag simultaneously results in double-collected data. Use only one or the other

### GTM Naming Conventions

**Tags**: `[Platform] [type] - [name]`
- Example: `GA4 event - generate_lead`, `GA4 config`, `Meta - Purchase`

**Triggers**: `[Type] - [Description]`
- Example: `click - blog - register button`, `CE - purchase`, `timer - 30s engagement`

**Variables**: `[prefix] - [description]`

| Prefix | Type |
|---------------|------|
| `dlv` | Data Layer Variable |
| `cookie` | First-party Cookie |
| `js` | JavaScript Variable |
| `cjs` | Custom JavaScript |
| `url` | URL Variable |
| `aev` | Auto-Event Variable |
| `regex` | Regular Expression |
| `const` | Constant |

Example: `dlv - ecommerce.value`, `cjs - X Pixel Contents`, `const - GA4 Measurement ID`

### DataLayer Design

**Initialization**: Declare it **before** the GTM container snippet

```javascript
window.dataLayer = window.dataLayer || [];
```

**Design rules**:

- Include the `event` key when pushing events
- Use camelCase variable names (GTM is case-sensitive)
- Use descriptive names (`page_category` ✓, `cat` ✗)
- Use explicit dataLayer pushes rather than HTML scraping

```javascript
dataLayer.push({
  event: 'form_submit',
  form_type: 'contact',
  form_location: 'footer'
});
```

**Persistence**: dataLayer variables persist only within the current page. After navigation, you must re-push or use cookies/localStorage.

### SPA Support

In SPAs, double-counted `page_view` events and missed events are common. Decide your approach **in advance**.

**Approach 1 (recommended)**: Enable enhanced measurement's "Page changes based on browser history events"
- Detects `history.pushState` / `popstate` and automatically sends `page_view`
- Compatible with React Router, Vue Router, Next.js, and the like

**Approach 2**: **Disable** the automatic `page_view` in enhanced measurement, and send manually via GTM
- Explicitly set `page_location` and `page_title`

**Double-count check**: In DebugView, always verify that `page_view` fires **exactly once** per page navigation.

### Server-side GTM (sGTM)

- Browser → sGTM server (1 HTTP request) → dispatch to each vendor (GA4, Google Ads, Meta, etc.)
- Fewer client-side HTTP requests → improved page performance
- Set `server_container_url` on **both** the Google tag and GA4 event tags
- **Note**: The first hit may bypass sGTM. Verify proper routing

---

## 7. E-commerce Tracking

### dataLayer Pattern

**Required**: Clear the ecommerce object **before** pushing each e-commerce event (to prevent contamination from residual data).

```javascript
dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'USD',
    value: 29.99,
    items: [{
      item_id: 'SKU_12345',
      item_name: 'Product Name',
      price: 29.99,
      quantity: 1
    }]
  }
});
```

### GTM "Send Ecommerce data" Checkbox

When enabled on a GA4 event tag, e-commerce data is **read automatically** from the dataLayer. No individual variable configuration is needed.

### Common Mistakes

1. Failing to run `dataLayer.push({ ecommerce: null })` → residual data contaminates subsequent events
2. Omitting `currency` / `value` → no numeric values appear in monetization reports
3. Using random values for `transaction_id` → deduplication fails. Use a stable order ID
4. Failing to apply throttling/debouncing to consecutive events (e.g., rapid quantity-button clicks)

### GTM vs. gtag.js

| Approach | Recommended case |
|------|-----------|
| **gtag.js** | When measuring e-commerce in GA4 only |
| **GTM** | When sharing the same dataLayer across multiple platforms (GA4 + Google Ads + Meta, etc.) |

---

## 8. Data Quality

### Internal Traffic Filtering

1. Data Streams > Tag settings > Define internal traffic, then specify IPs
2. Data Settings > Data Filters, then create a filter
3. Validate first in the **"Testing"** state → after confirmation, manually change to **"Active"**

> The default is "Testing" state, in which **filtering is not active**. It is easy to forget to change it to "Active".

### Developer Traffic Filtering

Excludes traffic with debug mode enabled from production data. Enable it under Data Settings > Data Filters.

### Referral Exclusion

- Add payment processors (PayPal, Stripe, etc.) to the referral exclusion list
- Self-referrals from domains included in the cross-domain configuration are handled automatically

### Cross-Domain Tracking

- Data Streams > Tag settings > Configure your domains
- Use the **same Measurement ID** (`G-XXXXX`) across all domains
- Carry the client ID via the `_gl` parameter
- In addition to link decoration (`<a>` tags), **form decoration** is officially supported
- **Common issue**: server redirects strip the `_gl` parameter → verify that URL parameters are preserved through redirects

---

## 9. User ID and Reporting Identity

### User-ID

- Send a unique identifier (256 chars or fewer) at login
- On sign-in: send the ID / not signed in: do not send the parameter / on sign-out: `null`
- **Do not register as a custom dimension** (use the built-in User-ID feature)

### Reporting Identity

| Option | Method | Recommendation |
|-----------|------|------|
| **Blended** | User-ID > device ID > modeling | **Recommended** (maximum coverage) |
| Observed | User-ID > device ID | When modeling is not needed |
| Device-based | Device ID only | Simple but lowest accuracy |

> Enabling Google Signals provides cross-device insights, but low-traffic data may be hidden by thresholding.

---

## 10. Consent Mode and Privacy

### Consent Types

| Consent type | What it controls |
|-----------|---------|
| `analytics_storage` | Analytics cookies/identifiers |
| `ad_storage` | Ad cookies/device identifiers |
| `ad_user_data` | Sending user data for advertising purposes |
| `ad_personalization` | Personalized advertising |
| `functionality_storage` | Functional cookies |
| `personalization_storage` | Personalization |
| `security_storage` | Security and fraud prevention |

### Implementation Modes

| Mode | Behavior | Characteristics |
|--------|------|------|
| **Basic** | Tags are blocked until consent | No data sent. Generic CV modeling |
| **Advanced (recommended)** | Tags load with default "denied". Cookieless pings sent | Advertiser-specific CV modeling enabled |

> Scope the default consent settings to regions where the consent banner is shown (preserve measurement in regions where a banner is not required).

### Behavioral Modeling Thresholds

- `analytics_storage='denied'`: at least **1,000 events per day** for **7 days**
- Daily users with `analytics_storage='granted'`: at least **1,000 users per day** on **7 of 28 days**
- Meeting the threshold does not guarantee eligibility (ML applies additional criteria)

### PII Prohibition

Do not send email addresses, phone numbers, names, addresses, credit card numbers, or government-issued IDs to GA4 (this violates the terms of service and risks account suspension).

**Common contamination paths**:
- Email contained in a URL query parameter → recorded in `page_location`
- Form input values mistakenly sent as parameters
- Using email/username for User-ID (use a hashed internal ID)

**Mitigations**:
- In Data Streams > Tag settings > "Configure your query parameters further", add PII-containing query parameters to the exclusion list
- Avoid including PII in query parameters when designing app URLs

### Data Retention

| Option | Conditions |
|-----------|------|
| 2 months | Standard default |
| **14 months** | **Recommended for standard (the maximum)** |
| 26-50 months / unlimited | 360 only |

- Data retention only affects **exploration reports**. Standard aggregated reports are retained indefinitely
- Age/gender/interest data is always limited to 2 months
- Google Signals data is retained for up to 26 months
- **Change to 14 months immediately after creating the property**

---

## 11. Reports and Audiences

### Exploration Reports

| Technique | Purpose |
|------|------|
| Free form | Pivot tables, charts |
| Funnel exploration | Up to 10 steps, drop-off rates (open/closed) |
| Path exploration | Visualize navigation paths |
| Segment overlap | Compare up to 3 segments (Venn diagram) |
| User explorer | Timeline of an individual user |
| User lifetime | Long-term LTV analysis |
| Cohort exploration | Retention by acquisition date |

> Explorations are affected by the data retention setting. Sampling limits: 10M events (standard) / 1B (360).

### Audiences

| Setting | Value |
|------|-----|
| Default membership | 30 days |
| Maximum membership | 540 days |
| Limit | 100 (standard) / 400 (360) |
| Accumulation start | 24-48 hours (no retroactive application) |

- **Predictive audiences**: likely to purchase in 7 days / likely to churn / predicted revenue (200+ CV / 2,000+ touchpoints per month recommended)
- When linked to Google Ads, audiences are exported automatically for remarketing (up to 2 days to reflect)

**Behavior-based segment examples**:
- Cart abandoners (no purchase within X days of adding)
- Highly engaged users (engaged sessions > threshold)
- Feature explorers (viewed pricing/feature pages)
- Sequential conditions: view list → view detail → add to cart (no purchase)
- Exclusions: purchasers in the last 30 days, bounce traffic (`engagement_time` < 10 seconds)

---

## 12. Google Ads / Search Console Linking

### Google Ads

**Setup**: Editor role in GA4 + admin access in Google Ads. Enable auto-tagging. Verify that GCLID is not stripped by redirects.

**Handling key events**:
- GA4 key events default to **Secondary** in Google Ads → switch to **Primary** if used for bidding
- After import, wait **3 weeks** before applying the bidding strategy
- CV reflection: up to 24 hours

### Search Console

- Editor in GA4 + verified owner in Search Console
- 1:1 relationship with the web data stream
- Data availability: 48 hours after collection

---

## 13. Configuration Limits Summary

### Standard Property

| Setting | Limit |
|---------|------|
| Properties per account | 2,000 |
| Data streams per property | 50 (up to 30 apps) |
| Unique event names (Web) | Unlimited (operationally recommended within 500) |
| Unique event names (App) | 500 (hard limit) |
| Parameters per event | 25 |
| Event name | 40 chars |
| Parameter name | 40 chars |
| Parameter value | 100 chars |
| User property name | 24 chars |
| User property value | 36 chars |
| Event-scoped custom dimensions | 50 |
| User-scoped custom dimensions | 25 |
| Item-scoped custom dimensions | 10 |
| Custom metrics | 50 |
| Audiences | 100 |
| Key events | 30 |
| E-commerce items per event | 200 |
| Cardinality threshold | Rule of thumb: "(other)" appears at several hundred unique values (situation-dependent) |
| Exploration sampling | 10M events |
| Session timeout | Default 30 minutes (max 7h 55m) |
| Data retention | Default 2 months (max 14 months) |

### 360 Property (Differences Only)

| Setting | Limit |
|---------|------|
| Parameter value | 500 chars |
| Event-scoped custom dimensions | 125 |
| User-scoped custom dimensions | 100 |
| Item-scoped custom dimensions | 25 |
| Custom metrics | 125 |
| Audiences | 400 |
| Key events | 50 |
| Exploration sampling | 1B events |

---

## 14. Testing and Validation

### DebugView

- Displays events and parameters in real time in the GA4 admin UI
- `debug_mode` is a flag for debug display, and **does not stop event sending itself** (events may still appear in production reports)
- To exclude from production reports, enable the **developer traffic data filter**
- Standard reports have a processing delay of **24-48 hours**

### Enabling Debug Mode

| Method | Description |
|------|------|
| GTM Preview mode | Automatically attaches `debug_mode: true` (the easiest) |
| Chrome extension | Google Analytics Debugger |
| Manual parameter | Add `debug_mode: true` in GTM tag settings |

### Validation Best Practices

- Follow the test plan; do not browse randomly
- Use incognito mode to avoid cache interference
- **Test edge cases too** (adding to cart while not logged in, applying a discount code, when cookies are denied, etc.)
- Record expected and actual values
- Use three tools together: **DebugView** + **GTM Tag Assistant** + **DevTools Network**
- E-commerce: validate the correct event name, unique `transaction_id`, and parameter syntax

---

## 15. Initial Setup Checklist

### Day 1

1. Create GA4 property (verify account structure)
2. Create web data stream (up to 3)
3. Install Google tag via GTM (use the **Initialization trigger**)
4. **Change data retention to 14 months**
5. **Enable enhanced measurement events** (review each toggle individually; do not enable all blindly)
6. Define internal traffic rules (specify IPs)
7. Create the internal traffic filter ("Testing" → validate → change to "Active")
8. Create and enable the developer traffic filter
9. Enable Google Signals (if applicable)

### Week 1

10. Implement recommended events (those appropriate for the business type)
11. Configure key events (choose counting method)
12. Configure cross-domain tracking (if multiple domains)
13. Link Search Console
14. Link Google Ads (if running ads)
15. Configure User-ID (if authentication exists)
16. Define and share GTM naming conventions with the team

### Weeks 2-3

17. Register custom dimensions and metrics
18. Create audiences (for remarketing and analysis)
19. Configure consent mode (especially for EU traffic)
20. Configure attribution (DDA recommended when data is sufficient)
21. Configure referral exclusions (payment processors, etc.)
22. Validate the entire setup with DebugView + Realtime report
23. **Document the measurement plan in a spreadsheet** (event names, parameters, expected values, firing conditions, custom dimension registration status)

---

## 16. Reference Links

### GA4 Official

- [GA4 Help Center](https://support.google.com/analytics)
- [GA4 Developer Docs](https://developers.google.com/analytics/devguides/collection/ga4)
- [Recommended Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Ecommerce Implementation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [User-ID](https://developers.google.com/analytics/devguides/collection/ga4/user-id)
