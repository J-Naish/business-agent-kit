# Microsoft Clarity - GTM Implementation Manual

> Always verify the latest specifications at [Microsoft Learn - Clarity](https://learn.microsoft.com/en-us/clarity/).

---

## 1. Core Features

### 1.1 Session Recordings

Records the DOM and user actions (mouse movements, clicks, scrolls, taps) and replays them. Uses DOM reconstruction rather than video streaming.

- **Clarity Highlights**: Automatically extracts important interactions from long recordings as short clips
- **Clarity Notes**: Add comments to specific moments in a recording
- **Visitor Profile**: Browse a specific user's session history across sessions
- **Live Sessions**: View up to 100 sessions simultaneously

### 1.2 Heatmaps

| Type | Description |
|------|-------------|
| **Click Heatmaps** | Visualizes elements that have been clicked (or tapped) |
| **Scroll Heatmaps** | Displays scroll-depth reach rates |
| **Area Heatmaps** | Click counts and distribution rates within a selected area |

- Automatically generated and comparable across PC / Tablet / Mobile devices
- Supports dynamic elements (dropdowns, popups, etc.)
- **Heatmap Insights**: Auto-summarized by Copilot

### 1.3 Dashboard

- **Smart Events**: Automatic detection of major actions (Purchase, Add to Cart, Sign Up, etc.; 9 types)
- **Funnels**: Build funnels with no code
- **JavaScript Errors**: Total error count, breakdowns, and Click Errors
- **Bot Activity**: Visualizes AI crawler and bot access
- **E-Commerce Insights**: Purchase and checkout abandonment analysis via Shopify integration

### 1.4 AI / Copilot

- **Copilot Chat**: Query dashboard data in natural language
- **Session Summaries**: AI bulk-analyzes up to 250 sessions and generates pattern summaries
- **Heatmap Insights**: Automated analysis reports for heatmaps

---

## 2. Metrics

### Semantic Metrics (Frustration Indicators)

| Metric | Definition |
|--------|------------|
| **Dead Clicks** | A click that receives no feedback within a certain time |
| **Rage Clicks** | Repeated clicks in the same narrow area within a short time |
| **Excessive Scrolling** | Scroll volume significantly higher than average |
| **Quick Backs** | Returning to the original page shortly after navigating away |

### Performance Metrics (Core Web Vitals)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| Performance Score | 81-100 | 51-80 | 0-50 |
| LCP | ≤ 2.5s | ≤ 4s | > 4s |
| INP | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |

### Smart Events (Automatic Detection)

Representative auto-detected events:

| Event Name | Description |
|------------|-------------|
| **Purchase** | Purchase completed |
| **Add to Cart** | Added to cart |
| **Begin Checkout** | Checkout started |
| **Contact Us** | Contact submission |
| **Submit Form** | Form submission |
| **Request Quote** | Quote request |
| **Sign Up** | New registration |
| **Login** | Login |
| **Download** | Download |

> The types and number of events may change with UI updates. Treat the current Settings > Smart Events UI as the source of truth.

Smart Event types: **Button Clicks** / **API events** (`clarity("event", name)`) / **Auto events** (auto-detected) / **Page visits**. Custom Smart Events can be created with no code (limits visible in the UI).

### Filtering (30+ Filters)

| Group | Main Filters |
|-------|--------------|
| **User Info** | Period, Day of Week, Device, Browser, OS, Location (Country/State/City), User Type (New/Returning) |
| **User Actions** | Insights (Rage/Dead/Excessive/Quick Backs), Clicked text, Scroll depth, Smart Events, Funnels |
| **Path** | Entry URL, Exit URL, Visited URL (regex supported) |
| **Traffic** | Referring site, Source, Medium, Campaign, Channel |
| **Performance** | Performance Score, LCP, INP, CLS |
| **Product** | Price, Brand, Product name, Availability, Rating |
| **Session** | Duration, Click count, Page count |
| **Page** | Duration, Click count, JS errors, Page size, Screen resolution |
| **Custom** | Custom tags, Custom User ID, Custom Session ID, Custom Page ID |

Combinations of multiple filters can be saved and reused as a **Segment**.

---

## 3. Limits and Data Retention

### Main Limits

> Numerical limits may change with UI updates or contract terms. Treat the current UI display as the source of truth.

| Item | Limit |
|------|-------|
| Session recordings | Up to 100,000 per project per day (excess is sampled) |
| Heatmaps | Up to 100,000 PVs per heatmap |
| Live sessions | Up to 100 sessions |
| Custom Tags | Up to 128 tags per page, max 255 characters per tag. The number of distinct tag types (keys) is unlimited project-wide |
| GA4 integration | Only one web property per project |

### Data Retention

| Data Type | Retention |
|-----------|-----------|
| Standard session recordings | 30 days |
| Favorite / labeled recordings | Up to 13 months |
| Random sample recordings | Up to 13 months |
| Heatmap data | Up to 13 months |

---

## 4. GTM Configuration

### Setup Steps

1. Create a project in [Clarity](https://clarity.microsoft.com/)
2. Obtain the Project ID (URL: `https://clarity.microsoft.com/projects/view/{Project ID}/`)
3. Replace `{CLARITY_PROJECT_ID}` in the GTM template JSON with the obtained Project ID
4. Import the JSON into GTM

> Equivalent tags can also be deployed via the "Google Tag Manager" integration (OAuth) under Settings > Setup in the Clarity admin console.

### Tag

| Tag Name | Template | Trigger | Notes |
|----------|----------|---------|-------|
| Clarity Tag | Microsoft Clarity - Official (Community Template) | All Pages | Only Project ID is required |

### Template Configuration Fields

| Field | Description | Required |
|-------|-------------|----------|
| **Clarity Project ID** | The project's unique ID | Yes |
| **Custom ID** | Unique user identifier | No |
| **Custom Session ID** | Custom session ID | No |
| **Custom Page ID** | Custom page ID | No |
| **Friendly name** | User name displayed in the dashboard | No |
| **Custom tag Key** | Custom tag key | No |
| **Custom tag Value** | Custom tag value (multiple allowed) | No |

### Variables

| Variable Name | Type | Value |
|---------------|------|-------|
| `Clarity Project ID` | Constant | (Project ID) |

### SPA Support

Clarity automatically detects route changes in SPA environments. However, when detection is incomplete (e.g., Visited URLs are not split), use a Custom Tag to attach the route and use it as a filter for sessions and recordings:

```javascript
// Fire on a History Change trigger, etc.
clarity("set", "route", location.pathname);
```

> `clarity("event", ...)` is recorded only as an event and does not split URLs, so use a Custom Tag for route identification.

---

## 5. Client API

### JavaScript API

| API | Syntax | Purpose |
|-----|--------|---------|
| **Custom Tags** | `clarity("set", key, value)` | Attach a custom tag to a session. key/value: string (max 255 chars); value can also be string[]. Up to 128 tags per page |
| **Identify** | `clarity("identify", customId, sessionId, pageId, friendlyName)` | User identification (cross-device tracking). Only customId is required |
| **Event** | `clarity("event", eventName)` | Send a custom event |
| **Upgrade** | `clarity("upgrade", reason)` | Prioritize the session for recording (mitigates daily-limit sampling) |
| **ConsentV2** | `clarity("consentv2", {ad_Storage, analytics_Storage})` | Send cookie consent state |

### HTML Attributes

| Attribute | Purpose |
|-----------|---------|
| `data-clarity-mask="true"` | Masks the element and its children |
| `data-clarity-unmask="true"` | Unmasks the element and its children |

> `data-clarity-mask="false"` has no effect. Use `data-clarity-unmask="true"` to unmask.

### PII (Personal Information) Notes

Do **not** pass PII such as email addresses, phone numbers, or names directly to the Custom Tags, Event, or Identify APIs. Clarity protects PII in the DOM via masking, but data explicitly sent through the API is not subject to masking. When user identification is required, pass a hashed ID or internal ID to the Identify API.

### clarity-events Community Template

GitHub: `mbaersch/clarity-events`. Add this as a separate tag from the existing Clarity tag to configure Event sending, Custom Tags, Session Upgrade, and Consent management from the GTM UI. The base tag must already be installed.

---

## 6. Consent Management (Consent Mode)

### Cookies Set by Clarity

| Cookie Name | Purpose | Type | Retention |
|-------------|---------|------|-----------|
| `_clck` | Stores the Clarity User ID and settings | First-party | 1 year |
| `_clsk` | Connects multiple PVs into a single session recording | First-party | 1 day |
| `CLID` | Identifies first-time visits across sites | Third-party | 1 year |
| `ANONCHK` | Indicates whether MUID has been transferred to ANID (always 0) | Third-party | Session |
| `MR` | Indicates whether MUID needs to be refreshed | Third-party | 7 days |
| `MUID` | Unique browser identifier for Microsoft site visits | Third-party | 1 year |
| `SM` | Synchronizes MUID across Microsoft domains | Third-party | Session |

> Reference this list when drafting cookie banners and privacy policies. Retention periods may change, so verify the latest values at [Clarity Cookies](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies).

### How Consent Control Works

Clarity controls cookie settings and features based on the `analytics_storage` signal:
- **Granted**: Provides full analytics features with cookies
- **Denied**: Cookieless collection mode (no cross-session tracking; only basic data is collected)

`ad_storage` is used for data sharing with Microsoft Advertising. Clarity itself does not share data with Microsoft Ads.

For access from the EEA/UK/CH, Clarity does not set cookies unless a consent signal is present (default Denied).

### How to Send the Consent Signal

| Method | Description |
|--------|-------------|
| **Google Consent Mode (GCM) auto-integration** | If you already use GCM, **no additional configuration is required**. Clarity automatically reads the `analytics_storage` / `ad_storage` signals |
| **Supported CMPs** | Auto-integrated via supported CMPs such as CookieYes |
| **ConsentV2 API** | Send manually with `clarity('consentv2', { ad_Storage: "granted", analytics_Storage: "granted" })` |

> The ConsentV2 API key names are `ad_Storage` / `analytics_Storage` (capital S).

### Behavior by Consent State

| State | Cookies | Session Tracking | Recording | Heatmap | Dashboard Metrics |
|-------|---------|------------------|-----------|---------|-------------------|
| Granted | Set | Cross-session tracking enabled | Full | Full | Full |
| Denied | Not set | Unique ID per PV (no cross-session) | Limited | Limited | Basic data only |

### About the "Cookies OFF" Setting

Setting "Cookies" to OFF under Clarity Settings > Setup forces **all users into cookieless mode at all times, regardless of consent state**. This is a stronger setting than GCM/ConsentV2 and is usually unnecessary because GCM integration is sufficient. Use it only for special policies that require all users to remain cookieless.

### Consent Management Setup in GTM

If you already use GCM, no additional configuration is needed. For manual implementation, use a two-tag setup:

1. **Clarity base tag**: All Pages trigger
2. **Consent send tag**: Custom Event trigger after cookie consent that runs `clarity('consentv2', ...)`

---

## 7. Masking (Content Masking)

| Mode | Behavior | Recommended Scenarios |
|------|----------|------------------------|
| **Strict** | Masks all content | High-privacy domains such as finance, healthcare, and legal |
| **Balanced** (default) | Masks numbers and email addresses only | Most websites |
| **Relaxed** | No masking | Sites containing only public information |

- Input boxes and dropdowns are **always masked in every mode** (cannot be changed)
- Masked data is not sent to Clarity servers
- Setting changes apply only to new recordings (not retroactive); takes up to 1 hour to take effect

---

## 8. GA4 Integration

### Setup

**Auto-integration (recommended)**: Select a GA4 property under Clarity Settings > Setup > Google Analytics integration. Data reflection takes **at least 24 hours**.

**Manual integration**: Enter the Account ID, Measurement ID (starts with `G-`), and Property ID.

### What You Can Do After Integrating

- GA4 traffic data (sessions, PVs, etc.) is displayed inside the Clarity dashboard
- Integrated analysis is possible: drill into the "why" behind GA4 drop-off points using Clarity recordings and heatmaps

> **About Playback URL Integration**: Previously, the Clarity Playback URL was automatically sent to a GA4 Custom Dimension, but the integration scope has changed due to high-cardinality issues and similar concerns. Verify the current integration features at [GA4 Integration](https://learn.microsoft.com/en-us/clarity/ga-integration/ga4-integration) and in the Clarity UI.

### Notes

- Only one GA4 web property can be integrated per project
- GA4's segment feature is not supported within Clarity
- Data reflection requires at least 24 hours

---

## 9. Recommended Settings

| Item | Recommendation | Reason |
|------|----------------|--------|
| Installation method | Import GTM container JSON (Community Template) | Allows centralized management with other tags (GA4, ad pixels, etc.) |
| Masking mode | Balanced | Auto-masks numbers and emails while keeping text readable |
| Bot detection | ON | Automatically excludes invalid traffic |
| Consent Mode | Control consent via GCM integration or the ConsentV2 API | Compliant with GDPR/ePrivacy. Use "Cookies OFF" only when all users must be permanently cookieless |
| IP Blocking | Block office IPs and developer IPs | Excludes internal traffic |
| GA4 integration | Enabled | Lets you reference GA4 traffic data inside Clarity. Verify the integration scope in the current UI |
| Smart Events | Review and customize the auto-detected events | Track major actions with no code |

---

## 10. References

- [Microsoft Clarity Official](https://clarity.microsoft.com/)
- [Microsoft Learn - Clarity](https://learn.microsoft.com/en-us/clarity/)
- [GTM Installation Guide](https://learn.microsoft.com/en-us/clarity/third-party-integrations/google-tag-manager)
- [Client API Reference](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api)
- [Custom Tags](https://learn.microsoft.com/en-us/clarity/filters/custom-tags)
- [Masking](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Consent Mode](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode)
- [GA4 Integration](https://learn.microsoft.com/en-us/clarity/ga-integration/ga4-integration)
- [Smart Events](https://learn.microsoft.com/en-us/clarity/setup-and-installation/smart-events)
- [Clarity GTM Template (GitHub)](https://github.com/microsoft/clarity-gtm-template)
