# GA4 + GTM - Design and Implementation Manual

> Focus: GTM container design for GA4. Admin/analytics-side topics are summarized with pointers to official docs.
> Single source of truth: [GA4 Help Center](https://support.google.com/analytics).

---

## 1. Property Structure

**Account > Property > Data Stream.** 1 property = 1 site (+ apps); avoid excessive splitting. For GTM design purposes, you typically target a single Web data stream's Measurement ID (`G-XXXXX`). Limits and setup details: see GA4 property setup.

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

### Parameter / Limit Rules (key limits for GTM design)

| Item | Standard | 360 |
|------|------|-----|
| Parameters per event | 25 | 25 |
| Parameter name | 40 chars (alphanumeric + underscore, must start with letter) | same |
| Parameter value | 100 chars | 500 chars |
| User property name / value | 24 / 36 chars | same |
| Unique event names (App hard limit) | 500 | 500 |
| E-commerce items per event | 200 | 200 |
| Key events | 30 | 50 |

Full quota reference: GA4 limits.

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

In GA4, conversions are called **key events**. Any event can be marked as a key event; mark only business-critical actions. For counting methods (once per event vs. once per session), conversion windows (default 30/90 days), and attribution model details (Data-driven vs. Paid and organic last click), see GA4 key events and Attribution in GA4.

**Practical notes for GTM design**:
- Trigger granularity matters: choose "once per session" semantics in GTM (e.g., trigger group / blocking) for lead-style events, "once per event" for purchases.
- Reports use different attribution (Traffic acquisition = last non-direct, User acquisition = first touch, Conversions = selected model). This is a frequent cause of number mismatches.
- Google Ads import: GA4 key events default to **Secondary**; switch to **Primary** if used for bidding. CV reflection up to 24h.

---

## 5. Custom Dimensions / Metrics

Quotas (standard / 360): event-scoped 50/125, user-scoped 25/100, item-scoped 10/25, custom metrics 50/125. After deletion wait 48h before recreating. Full reference: Custom dimensions and metrics.

**GTM design implications**:
- Check default dimensions first before registering parameters as custom dimensions (avoid duplicates).
- Avoid high-cardinality parameters as dimensions (Event ID / Session ID / User ID) — they get bucketed into "(other)".
- Use built-in **User-ID** feature, not a custom dimension.
- Numeric values → custom metrics, not dimensions.
- Once you push a custom parameter via GTM, register it in GA4 admin promptly — unregistered parameters never appear in UI reports.

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

## 8. Data Quality (Internal Traffic, Referral Exclusion, Cross-Domain)

Configured in **GA4 Admin > Data Streams / Data Filters**, not in GTM. See GA4 data filters and Cross-domain measurement.

**GTM-relevant gotchas**:
- Internal traffic filters default to **"Testing"** (inactive). Remember to flip to "Active".
- Add payment processors (PayPal, Stripe) to the referral exclusion list.
- Cross-domain: use the **same Measurement ID** across all domains; client ID rides on the `_gl` parameter. Server redirects that strip query params will break attribution — verify `_gl` survives all redirects. Form decoration is officially supported alongside link decoration.

---

## 9. User-ID and Reporting Identity

Send a stable, non-PII identifier (≤256 chars) at login; omit when not signed in; send `null` on sign-out. Do **not** also register User-ID as a custom dimension — use the built-in feature. Reporting identity options (Blended / Observed / Device-based): **Blended is recommended**. See User-ID for the web.

---

## 10. Consent Mode and Privacy

### Consent Types & Modes

Seven consent signals (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, `functionality_storage`, `personalization_storage`, `security_storage`). Two implementation modes: **Basic** (tags blocked until consent) and **Advanced** (recommended; default "denied" + cookieless pings, enabling advertiser-specific CV modeling). Scope default consent to regions where a banner is shown. Full reference: Consent Mode.

Behavioral modeling requires roughly 1,000 events/day for 7 days (`denied`) and 1,000 granted users/day on 7 of 28 days; meeting the threshold is necessary but not sufficient.

Data retention: change to **14 months** (the standard maximum) immediately after creating the property. Retention only affects exploration reports; standard aggregated reports persist. See Data retention.

### PII Prohibition

Do not send email addresses, phone numbers, names, addresses, credit card numbers, or government-issued IDs to GA4 (this violates the terms of service and risks account suspension).

**Common contamination paths**:
- Email contained in a URL query parameter → recorded in `page_location`
- Form input values mistakenly sent as parameters
- Using email/username for User-ID (use a hashed internal ID)

**Mitigations**:
- In Data Streams > Tag settings > "Configure your query parameters further", add PII-containing query parameters to the exclusion list
- Avoid including PII in query parameters when designing app URLs

---

## 11. Reports and Audiences

Exploration techniques (Free form, Funnel, Path, Segment overlap, User explorer, User lifetime, Cohort) and audiences (default 30-day membership, max 540 days; standard limit 100 / 360 limit 400; 24-48h to start accumulating, no retroactive application) are configured in the GA4 UI. See Explorations and Audiences.

GTM-relevant: ensure the events and parameters audiences depend on (e.g., `engagement_time`, cart events for "cart abandoners", page-path matches for "feature explorers") are actually firing and registered as custom dimensions where needed.

---

## 12. Google Ads / Search Console Linking

Performed in GA4 Admin (not GTM). Requires Editor in GA4 + admin in Google Ads / verified owner in Search Console. Enable Google Ads auto-tagging and verify GCLID survives redirects. See Product links.

---

## 13. Configuration Limits

Key limits used during GTM design are consolidated in §2. For the full property-level quota reference (audiences, key events, exploration sampling, session timeout, etc.) and 360 differences, see [GA4 limits](https://support.google.com/analytics/answer/9267744).

---

## 14. Testing and Validation

- **GTM Preview mode** automatically attaches `debug_mode: true` — easiest way to surface events in GA4 **DebugView**.
- `debug_mode` only flags for debug display; events still hit production reports unless filtered. Enable the **developer traffic data filter** to exclude.
- Cross-check with GTM Tag Assistant + DevTools Network. Validate in incognito to avoid cache. For e-commerce: confirm event name, unique `transaction_id`, parameter syntax.
- Standard reports lag 24-48h. See [DebugView](https://support.google.com/analytics/answer/7201382).

---

## 15. Initial Setup Checklist

1. Create GA4 property and Web data stream; install Google tag via GTM on the **Initialization trigger**.
2. Set data retention to **14 months**; review enhanced measurement toggles individually.
3. Define internal traffic IPs and create the filter ("Testing" → validate → "Active"); enable developer traffic filter.
4. Implement recommended events; mark business-critical ones as key events.
5. Configure cross-domain (if needed), User-ID (if auth exists), consent mode (especially EU).
6. Register custom dimensions/metrics for any custom parameters you push.
7. Validate end-to-end with DebugView + Realtime, and document the measurement plan (events, parameters, triggers, registration status).
