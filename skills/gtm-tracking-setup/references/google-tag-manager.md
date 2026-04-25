# GTM (Google Tag Manager) Configuration Manual

> **Purpose:** Guidelines for the AI to design GTM containers in collaboration with the user and output importable JSON files.
> The JSON specification is based on GTM's container export/import format (`exportFormatVersion: 2`) and conforms to the ContainerVersion model defined in the [Tag Manager API v2](https://developers.google.com/tag-platform/tag-manager/api/v2/devguide).

---

## 1. Prerequisites

### 1.1 Information to Collect from the User

| # | Item | Example | Required |
|---|------|-----|------|
| 1 | GTM Account ID | `123456` | ✅ |
| 2 | GTM Container ID | `789012` | ✅ |
| 3 | Container Public ID | `GTM-XXXXXXX` | ✅ |
| 4 | Site domain | `example.com` | ✅ |
| 5 | GA4 Measurement ID | `G-XXXXXXXXXX` | When using GA4 |
| 6 | Google Ads Conversion ID | `AW-XXXXXXXXX` | When using Google Ads |
| 7 | Meta Pixel ID | `123456789012345` | When using Meta |
| 8 | TikTok Pixel ID | `XXXXXXXXXX` | When using TikTok |
| 9 | X Pixel ID | `XXXXX` | When using X |
| 10 | Clarity Project ID | `xxxxxxxxxx` | When using Clarity |
| 11 | List of platforms in use | GA4, Meta, Clarity | ✅ |
| 12 | Conversions to track | Purchase, lead generation | ✅ |
| 13 | E-commerce / Non-EC | EC | For determining site type |
| 14 | SPA / MPA | MPA | For determining page_view control |

### 1.2 Basic Principles

- Manage tracking vendor tags in the GTM dashboard. Only **one GTM snippet** is installed in the HTML.
- Implement `dataLayer.push` calls required for tracking in the application source code.
- **No PII transmission:** Do not send email addresses, phone numbers, names, etc. to GA4 or other tracking tools. For `tel:` / `mailto:` link tracking, record the click event and its context (placement, type) only; mask or categorize raw data.
- Do not implement **duplicate tags for the same purpose** across gtag.js and GTM.
- Follow the official recommended setup method when one is available.

---

## 2. Container Structure Design

### 2.1 Container Principles

| Rule | Description |
|--------|------|
| One account per company | Create one GTM account per company |
| One container per site | One container per domain. Subdomains share the same container |
| Keep it slim | Periodically clean up unused tags, triggers, and variables. First pause, then delete after a period. Record the deletion in the version name/description |

### 2.2 Folder Structure

```
_Global                    ← Shared triggers and variables (leading _ keeps it at the top)
GA4                        ← GA4-related
GA4 - Ecommerce            ← When e-commerce tracking is in use
Google Ads                 ← Google Ads-related
Meta                       ← Meta Pixel-related
TikTok                     ← TikTok Pixel-related
X                          ← X Pixel-related
Clarity                    ← Microsoft Clarity-related
Utilities                  ← Helper variables, etc.
```

- New tags, triggers, and variables **must always be placed in a folder**.
- Prefixing a folder name with `_` makes it appear at the top of the list.

### 2.3 Tag Firing Order

| Priority | Trigger | Purpose |
|--------|---------|------|
| 1 | Consent Initialization - All Pages | CMP (consent management) tags |
| 2 | Initialization - All Pages | Google tag (GA4 configuration), Conversion Linker |
| 3 | All Pages | Base tags for each platform (Clarity, Meta Base, etc.) |
| 4 | Event-specific triggers | Conversions, click events, etc. |

### 2.4 Typical Tag Configuration

**Common foundation:**

| Tag name | Tag type | Trigger | Notes |
|--------|----------|---------|------|
| GA4 - Config | Google tag (`googtag`) | Initialization - All Pages | `send_page_view: true` (default) |
| Google Ads - Conversion Linker | Conversion Linker (`gclidw`) | Initialization - All Pages | Generally installed when using Google Ads |

> **About `page_view`:** The Google tag automatically sends `page_view` by default (`send_page_view` defaults to `true`). Creating a separate `page_view` tag results in double counting. Only when manual control is required for an SPA, set `send_page_view=false` on the Google tag and fire it manually via a History Change trigger.

**Per-platform tag configuration:** See each individual manual → [Section 5](#5-per-platform-reference)

### 2.5 Sharing Triggers

When multiple platforms have tags that fire at the same timing, **share the trigger**. Do not create separate triggers with the same condition for each platform. Store shared triggers in the `_Global` folder.

Example: Create a single form submission trigger `CE - form_submit` and link it to the lead event tags for GA4, Meta, and TikTok.

### 2.6 Data Layer Design

`dataLayer.push` on the application side → receive on the GTM side via custom event triggers and data layer variables. Direct DOM element references are fragile, so prefer the data layer whenever possible.

```javascript
// Form submission complete
dataLayer.push({
  event: 'form_submit',
  form_name: 'contact',
  form_id: 'contact-form-01'
});

// Purchase complete (GA4 ecommerce-compliant)
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T12345',
    value: 49.99,
    currency: 'USD',
    items: [{ item_id: 'SKU001', item_name: 'Product Name', price: 49.99, quantity: 1 }]
  }
});
```

**dataLayer event name vs. GA4 event name:**

| Type | Role | Example |
|------|------|-----|
| dataLayer event name | Identifier for the GTM trigger. Freely named on the application side | `form_submit`, `purchase` |
| GA4 event name | Displayed in GA4 reports. Should follow [recommended events](https://support.google.com/analytics/answer/9267735?hl=en) | `generate_lead`, `purchase` |

### 2.7 Centralizing IDs in Constant Variables

Store measurement IDs and pixel IDs in constant variables and reference them from multiple tags. When an ID changes, only one place needs to be updated.

| Variable name | Example value |
|--------|--------|
| `Const - GA4 Measurement ID` | `G-XXXXXXXXXX` |
| `Const - Google Ads Conversion ID` | `AW-XXXXXXXXX` |
| `Const - Meta Pixel ID` | `123456789012345` |
| `Const - TikTok Pixel ID` | `XXXXXXXXXX` |
| `Const - X Pixel ID` | `XXXXX` |
| `Const - Clarity Project ID` | `xxxxxxxxxx` |

---

## 3. Naming Conventions

### 3.1 Basic Policy

| Item | Rule |
|------|--------|
| Separator | ` - ` (hyphen + space) |
| Language | English |
| Casing | Platform names start with uppercase; event names are snake_case |

### 3.2 Tags

```
[Platform] - [Tag Type] - [Detail]
```

| Example | Description |
|-----|------|
| `GA4 - Config` | GA4 configuration tag |
| `GA4 - Event - generate_lead` | GA4 event |
| `GA4 - Event - click_cta - hero_section` | Event with detail |
| `Meta - Base` | Base tag |
| `Meta - Event - Purchase` | Conversion |
| `Clarity - Base` | Base tag |
| `TikTok - Event - CompletePayment` | Conversion |
| `Google Ads - Conversion - purchase` | Conversion |
| `Google Ads - Remarketing` | Remarketing |
| `X - Event - Purchase` | Conversion |

**Platform prefixes:**

| Prefix | Platform |
|---------------|----------------|
| GA4 | Google Analytics 4 |
| Google Ads | Google Ads |
| Meta | Meta (Facebook/Instagram) |
| TikTok | TikTok |
| X | X (Twitter) |
| Clarity | Microsoft Clarity |
| LinkedIn | LinkedIn |

### 3.3 Triggers

```
[Trigger Type] - [Detail]
```

| Example | Description |
|-----|------|
| `PV - All Pages` | All pages |
| `PV - Thank You Page` | Conditional page view |
| `Click - CTA Button` | Click |
| `Link Click - External Links` | Link click |
| `Link Click - File Download` | File download |
| `Link Click - Phone Call` | Phone tap |
| `Form - Contact Submit` | Form submission |
| `Scroll - 50 Percent` | Scroll |
| `CE - purchase` | Custom event |
| `CE - form_submit` | Custom event |
| `Timer - 30s` | Timer |
| `Visibility - Pricing Section` | Element visibility |

**Trigger type prefixes:**

| Prefix | Trigger Type |
|---------------|---------------|
| PV | Page view |
| Click | All elements click |
| Link Click | Just links click |
| Form | Form submission |
| Scroll | Scroll depth |
| CE | Custom event (dataLayer.push) |
| Timer | Timer |
| Visibility | Element visibility |

Exception (blocking) triggers use the `Blocking - ` prefix: `Blocking - Internal Traffic`, `Blocking - Staging Domain`.

### 3.4 Variables

```
[Variable Type] - [Detail]
```

| Example | Description |
|-----|------|
| `Const - GA4 Measurement ID` | Constant |
| `DLV - ecommerce` | Data layer variable |
| `DLV - form_name` | Data layer variable |
| `URL - Page Path` | URL variable |
| `URL - Query Parameter - utm_source` | URL query |
| `Cookie - user_id` | Cookie |
| `CJS - Trim Page Title` | Custom JS |
| `LUT - Page Type` | Lookup table |
| `Regex - Clean URL` | Regex table |
| `DOM - H1 Text` | DOM element |
| `AEV - Click Classes` | Auto-event variable |

**Variable type prefixes:**

| Prefix | Variable Type |
|---------------|-----------|
| Const | Constant |
| DLV | Data layer variable |
| URL | URL variable |
| Cookie | First-party cookie |
| CJS | Custom JavaScript |
| LUT | Lookup table |
| Regex | Regex table |
| DOM | DOM element |
| AEV | Auto-event variable |
| JSV | JavaScript variable |

### 3.5 Folders

Use the platform name as-is. A leading `_` displays it at the top.

### 3.6 Versions

```
[Platform] - [Operation] - [Target]
```

Examples: `GA4 - Add - scroll event`, `Meta - Add - purchase conversion`, `Clarity - Initial Setup`.

In the description, record **who, what, and why**. Publish changes in small batches (do not bundle multiple unrelated changes into one version).

---

## 4. Container JSON Specification

### 4.1 Export / Import

**Export:** GTM admin → Admin → Export Container → choose a version or workspace.

**Import:** GTM admin → Admin → Import Container → select a JSON file.

| Import method | Behavior |
|---------------|------|
| Overwrite | Deletes everything existing and replaces it with the imported content |
| Merge | Keeps existing items and adds. On conflict, choose between "Overwrite" or "Rename" |

### 4.2 Top-Level Structure

| Field | Type | Description |
|-----------|-----|------|
| `exportFormatVersion` | number | Export format version. Currently `2` |
| `exportTime` | string | Export timestamp (UTC) |
| `containerVersion` | object | All container version data |

### 4.3 containerVersion

| Field | Type | Description |
|-----------|-----|------|
| `path` | string | API resource path |
| `accountId` | string | GTM account ID |
| `containerId` | string | GTM container ID |
| `containerVersionId` | string | Version ID |
| `name` | string | Version display name |
| `description` | string | Version description |
| `container` | object | Container metadata (name, publicId, usageContext, etc.) |
| `tag` | Tag[] | Tag array |
| `trigger` | Trigger[] | Trigger array |
| `variable` | Variable[] | User-defined variable array |
| `builtInVariable` | BuiltInVariable[] | Array of enabled built-in variables |
| `folder` | Folder[] | Folder array |
| `customTemplate` | CustomTemplate[] | Custom template array |
| `zone` | Zone[] | Zone array |
| `gtagConfig` | GtagConfig[] | Google tag configuration array |
| `fingerprint` | string | Hash value (for change detection) |

### 4.4 Tag

| Field | Type | Description |
|-----------|-----|------|
| `accountId` | string | GTM account ID |
| `containerId` | string | GTM container ID |
| `tagId` | string | Unique tag ID |
| `name` | string | Tag display name |
| `type` | string | Tag type identifier |
| `parameter` | Parameter[] | Parameter array |
| `firingTriggerId` | string[] | Firing trigger ID array (fires when any are true) |
| `blockingTriggerId` | string[] | Blocking trigger ID array (blocks firing when any are true) |
| `tagFiringOption` | enum | Firing option |
| `liveOnly` | boolean | If `true`, fires only in production |
| `priority` | Parameter | Firing priority (higher fires first) |
| `setupTag` | SetupTag[] | Setup tag (max 1) |
| `teardownTag` | TeardownTag[] | Teardown tag (max 1) |
| `parentFolderId` | string | Parent folder ID |
| `paused` | boolean | If `true`, paused |
| `scheduleStartMs` | string | Scheduled start time (milliseconds) |
| `scheduleEndMs` | string | Scheduled end time (milliseconds) |
| `notes` | string | Notes |
| `monitoringMetadata` | Parameter | Metadata for tag monitoring |
| `consentSettings` | object | Consent settings |
| `fingerprint` | string | Hash value |

**tagFiringOption:**

| Value | Description |
|----|------|
| `UNLIMITED` | Can fire multiple times per event |
| `ONCE_PER_EVENT` | Once per event (can fire multiple times per page load) |
| `ONCE_PER_LOAD` | Once per page load |

**Major tag type identifiers (type):**

| type | Tag |
|------|------|
| `googtag` | Google tag (GA4 configuration, Google Ads integration) |
| `gaawc` | GA4 configuration tag (legacy) |
| `gaawe` | GA4 event tag |
| `awct` | Google Ads conversion tracking |
| `sp` | Google Ads remarketing |
| `gclidw` | Conversion Linker |
| `html` | Custom HTML |
| `img` | Custom image |
| `flc` | Floodlight counter |
| `fls` | Floodlight sales |
| `cvt_*` | Community templates (`cvt_XXXXXXXXXX` format) |

### 4.5 Trigger

| Field | Type | Description |
|-----------|-----|------|
| `accountId` | string | GTM account ID |
| `containerId` | string | GTM container ID |
| `triggerId` | string | Unique trigger ID |
| `name` | string | Trigger display name |
| `type` | enum | Trigger type |
| `customEventFilter` | Condition[] | Custom event firing conditions (fires when all are true) |
| `filter` | Condition[] | Additional filter conditions (fires when all are true) |
| `autoEventFilter` | Condition[] | Auto-event filter |
| `parameter` | Parameter[] | Additional parameters |
| `parentFolderId` | string | Parent folder ID |
| `notes` | string | Notes |
| `fingerprint` | string | Hash value |

**Trigger types (Web):**

| type | Trigger | GTM UI label |
|------|---------|-----------|
| `PAGEVIEW` | Page view | Page View |
| `DOM_READY` | DOM Ready | DOM Ready |
| `WINDOW_LOADED` | Window loaded | Window Loaded |
| `CUSTOM_EVENT` | Custom event | Custom Event |
| `CLICK` | All elements click | All Elements |
| `LINK_CLICK` | Link only click | Just Links |
| `FORM_SUBMISSION` | Form submission | Form Submission |
| `SCROLL_DEPTH` | Scroll depth | Scroll Depth |
| `ELEMENT_VISIBILITY` | Element visibility | Element Visibility |
| `YOU_TUBE_VIDEO` | YouTube video | YouTube Video |
| `HISTORY_CHANGE` | History change | History Change |
| `JS_ERROR` | JavaScript error | JavaScript Error |
| `TIMER` | Timer | Timer |
| `TRIGGER_GROUP` | Trigger group | Trigger Group |
| `INIT` | Initialization | Initialization |
| `CONSENT_INIT` | Consent initialization | Consent Initialization |

Server-side: `SERVER_PAGEVIEW` (server-side page view).

**Trigger-specific fields:**

| Trigger type | Specific fields |
|--------------|--------------|
| Click | `selector` (CSS selector), `checkValidation`, `waitForTags`, `waitForTagsTimeout` |
| Scroll | `verticalScrollPercentageList`, `horizontalScrollPercentageList` |
| Timer | `eventName`, `interval` (milliseconds), `limit` (max firings) |

**Condition (filter condition):**

| Field | Description |
|-----------|------|
| `type` | Condition type: `EQUALS`, `CONTAINS`, `STARTS_WITH`, `ENDS_WITH`, `MATCH_REGEX`, etc. |
| `parameter[0]` | `arg0` = left side (variable reference, e.g. `{{_event}}`) |
| `parameter[1]` | `arg1` = right side (comparison value, e.g. `purchase`) |

Modifier parameters: `negate` (`true` to invert the condition), `ignore_case` (`true` to ignore case).

### 4.6 Variable

| Field | Type | Description |
|-----------|-----|------|
| `accountId` | string | GTM account ID |
| `containerId` | string | GTM container ID |
| `variableId` | string | Unique variable ID |
| `name` | string | Variable display name |
| `type` | string | Variable type identifier |
| `parameter` | Parameter[] | Parameter array |
| `parentFolderId` | string | Parent folder ID |
| `notes` | string | Notes |
| `formatValue` | FormatValue | Value transformation options |
| `fingerprint` | string | Hash value |

**Major variable type identifiers (type):**

| type | Variable | GTM UI label |
|------|------|-----------|
| `c` | Constant | Constant |
| `v` | Data layer variable | Data Layer Variable |
| `j` | JavaScript variable | JavaScript Variable |
| `jsm` | Custom JavaScript | Custom JavaScript |
| `k` | First-party cookie | 1st Party Cookie |
| `u` | URL | URL |
| `d` | DOM element | DOM Element |
| `aev` | Auto-event variable | Auto-Event Variable |
| `gas` | Google Analytics settings | Google Analytics Settings |
| `smm` | Lookup table | Lookup Table |
| `remm` | Regex table | RegEx Table |
| `e` | Custom event | Custom Event |
| `dbg` | Debug mode | Debug Mode |
| `ctv` | Container version number | Container Version Number |
| `vis` | Element visibility | Element Visibility |
| `gtcs` | Google tag: settings | Google Tag: Configuration Settings |
| `gtes` | Google tag: event settings | Google Tag: Event Settings |

### 4.7 BuiltInVariable

**Page-related:**

| type | Description |
|------|------|
| `PAGE_URL` | Page URL |
| `PAGE_HOSTNAME` | Hostname |
| `PAGE_PATH` | Path |
| `REFERRER` | Referrer |
| `EVENT` | Event |

**Click-related:**

| type | Description |
|------|------|
| `CLICK_ELEMENT` | Click element |
| `CLICK_CLASSES` | Classes |
| `CLICK_ID` | ID |
| `CLICK_TARGET` | Target |
| `CLICK_URL` | URL |
| `CLICK_TEXT` | Text |

**Form-related:**

| type | Description |
|------|------|
| `FORM_ELEMENT` | Form element |
| `FORM_CLASSES` | Classes |
| `FORM_ID` | ID |
| `FORM_TARGET` | Target |
| `FORM_URL` | URL |
| `FORM_TEXT` | Text |

**Scroll-related:**

| type | Description |
|------|------|
| `SCROLL_DEPTH_THRESHOLD` | Threshold |
| `SCROLL_DEPTH_UNITS` | Units |
| `SCROLL_DEPTH_DIRECTION` | Direction |

**History-related:**

| type | Description |
|------|------|
| `NEW_HISTORY_URL` | New history URL |
| `OLD_HISTORY_URL` | Old history URL |
| `NEW_HISTORY_FRAGMENT` | New fragment |
| `OLD_HISTORY_FRAGMENT` | Old fragment |
| `HISTORY_SOURCE` | Source |

**Video-related:**

| type | Description |
|------|------|
| `VIDEO_PROVIDER` | Provider |
| `VIDEO_URL` | URL |
| `VIDEO_TITLE` | Title |
| `VIDEO_DURATION` | Duration |
| `VIDEO_PERCENT` | Percent played |
| `VIDEO_STATUS` | Status |
| `VIDEO_CURRENT_TIME` | Current time |
| `VIDEO_VISIBLE` | Visibility |

**Element visibility-related:**

| type | Description |
|------|------|
| `ELEMENT_VISIBILITY_RATIO` | Visibility ratio |
| `ELEMENT_VISIBILITY_TIME` | Visibility time |
| `ELEMENT_VISIBILITY_FIRST_TIME` | First visible time |
| `ELEMENT_VISIBILITY_RECENT_TIME` | Most recent visible time |

**Error-related:**

| type | Description |
|------|------|
| `ERROR_MESSAGE` | Error message |
| `ERROR_URL` | Error URL |
| `ERROR_LINE` | Line number |

**Other:**

| type | Description |
|------|------|
| `DEBUG_MODE` | Debug mode |
| `RANDOM_NUMBER` | Random number |
| `CONTAINER_ID` | Container ID |
| `CONTAINER_VERSION` | Container version |
| `HTML_ID` | HTML ID |
| `ENVIRONMENT_NAME` | Environment name |

### 4.8 Parameter

All parameters for tags, triggers, and variables share this common structure.

| Field | Type | Description |
|-----------|-----|------|
| `type` | enum | Parameter type |
| `key` | string | Parameter name (required at top level and in maps; ignored in lists) |
| `value` | string | Value (may include variable references like `{{variable name}}`) |
| `list` | Parameter[] | Child parameter array for list types |
| `map` | Parameter[] | Keyed child parameter array for map types |
| `isWeakReference` | boolean | Weak reference (Transformation only) |

**`type` values:**

| type | Description | Example |
|------|------|-----|
| `TEMPLATE` | Template string (variable references allowed) | `"G-XXXXXXXXXX"`, `"{{DLV - ecommerce}}"` |
| `INTEGER` | 64-bit integer | `"30000"` |
| `BOOLEAN` | Boolean | `"true"`, `"false"` |
| `LIST` | Parameter list (stored in `list` field) | — |
| `MAP` | Keyed parameter map (stored in `map` field) | — |
| `TRIGGER_REFERENCE` | Reference to a trigger ID | `"1"` |
| `TAG_REFERENCE` | Reference to a tag name | `"GA4 - Config"` |

### 4.9 Folder

| Field | Type | Description |
|-----------|-----|------|
| `accountId` | string | GTM account ID |
| `containerId` | string | GTM container ID |
| `folderId` | string | Unique folder ID |
| `name` | string | Folder name |
| `fingerprint` | string | Hash value |

### 4.10 Built-in Trigger IDs

| Fixed ID | Trigger |
|--------|---------|
| `2147479553` | All Pages |
| `2147479573` | Initialization - All Pages |
| `2147479583` | Consent Initialization - All Pages |

**Only these built-in trigger IDs may be hard-coded.** IDs of user-created triggers vary by container. On import, IDs of user-created triggers are automatically renumbered and updated, so user-created trigger IDs in the JSON only need to be internally consistent as cross-references within the JSON.

### 4.11 Notes on Importing

- `accountId` and `containerId` are automatically replaced with those of the destination container.
- `tagId`, `triggerId`, `variableId`, and `folderId` are renumbered on import.
- ID references in `firingTriggerId` and `blockingTriggerId` are automatically updated.
- Community template tags (`cvt_*`) reference gallery templates via `galleryReference` in the `customTemplate` section. Clarity uses `cvt_MQDKZ` (Gallery Template ID is fixed).
- `fingerprint` is recalculated on import.

### Example container JSON

The `examples/` directory provides illustrative container JSONs per site type. **Use them as references for structure and naming patterns, not as files to import as-is** — build a custom container tailored to the user's actual platform mix and conversions. Community templates that include `galleryReference` in the `customTemplate` section (such as Clarity) are auto-installed at import time; community templates (`cvt_*`) without a `galleryReference` must be replaced with a template ID already installed in the destination.

| Example | Platforms | Use Case |
|---|---|---|
| [corporate-site.json](../examples/corporate-site.json) | GA4 + Clarity | Corporate site / homepage. Scroll, CTA click, and phone tap tracking |
| [landing-page-with-clarity.json](../examples/landing-page-with-clarity.json) | GA4 + Clarity + Google Ads | Landing page for Google Ads. Lead generation conversion (generate_lead) + scroll |
| [landing-page-with-hotjar.json](../examples/landing-page-with-hotjar.json) | GA4 + Google Ads + Hotjar | Landing page using Hotjar in place of Clarity. Tracking Code + Hotjar Event for generate_lead via Custom HTML, plus GA4 lead/scroll and Google Ads conversion |
| [paid-search.json](../examples/paid-search.json) | GA4 + Clarity + Google Ads + Microsoft Ads | Paid search across Google and Bing. UET base + per-event UET tags (purchase, generate_lead) via Custom HTML |
| [ecommerce.json](../examples/ecommerce.json) | GA4 + Clarity + Google Ads | E-commerce site basics. ecommerce funnel (view_item → add_to_cart → begin_checkout → purchase) |
| [lead-generation.json](../examples/lead-generation.json) | GA4 + Clarity + Google Ads + Meta | Lead generation site. Lead conversions for multiple ad platforms + phone tap |
| [b2b-lead-generation.json](../examples/b2b-lead-generation.json) | GA4 + Clarity + Google Ads + LinkedIn | B2B lead generation. Lead conversions via LinkedIn Insight Tag (Partner ID + per-event Conversion ID) + phone tap + scroll |
| [saas-lead-generation.json](../examples/saas-lead-generation.json) | GA4 + Clarity + Google Ads + LinkedIn + Reddit | SaaS / developer-tool lead generation. generate_lead + sign_up conversions mirrored across Google Ads, LinkedIn (LEAD, SIGN_UP rules), and Reddit (Lead -> tracking_type LEAD, SignUp -> tracking_type SIGN_UP) using Reddit's official Pixel template (cvt_PBGZL) for PageVisit + per-event tags |
| [social-ecommerce.json](../examples/social-ecommerce.json) | GA4 + Clarity + Google Ads + Meta + Pinterest | Visual / social e-commerce. Full ecommerce funnel (view_item, add_to_cart, begin_checkout, purchase) mirrored across Meta (ViewContent, AddToCart, InitiateCheckout, Purchase) and Pinterest (PageVisit, AddToCart, InitiateCheckout, Checkout) |
| [gen-z-ecommerce.json](../examples/gen-z-ecommerce.json) | GA4 + Clarity + Google Ads + Snap + TikTok | Youth-focused mobile-first e-commerce. Full ecommerce funnel (view_item, add_to_cart, begin_checkout, purchase) mirrored across Snap (VIEW_CONTENT, ADD_CART, START_CHECKOUT, PURCHASE) and TikTok (ViewContent, AddToCart, InitiateCheckout, Purchase). Snap Pixel uses placeholder cvt_SNAP_PIXEL_TEMPLATE_ID (no galleryReference) |
| [ecommerce-multi-platform.json](../examples/ecommerce-multi-platform.json) | GA4 + Clarity + Google Ads + Meta + TikTok + X | Full e-commerce. ecommerce conversions for all platforms + items conversion CJS included |

---

## 5. Per-Platform Reference

For details on each platform's event definitions, parameters, and GTM configuration, see the individual manuals.

| Platform | Manual | Main Contents |
|---|---|---|
| Google Analytics 4 | [google-analytics.md](./google-analytics.md) | Recommended events, ecommerce, custom dimensions, enhanced measurement |
| Google Ads | [google-ads.md](./google-ads.md) | Conversion design, Enhanced Conversions, Dynamic Remarketing |
| Meta Pixel | [meta-pixel.md](./meta-pixel.md) | Standard events, custom events, Conversions API |
| TikTok Pixel | [tiktok-pixel.md](./tiktok-pixel.md) | Standard events, Events API |
| X Pixel | [x-pixel.md](./x-pixel.md) | Standard events, Conversion API |
| Microsoft Clarity | [microsoft-clarity.md](./microsoft-clarity.md) | Heatmaps, session recordings, custom tags |

---

## 6. Additional Use Cases

### 6.1 Cross-Domain Tracking

Track user behavior that spans multiple domains (e.g. `example.com` and `shop.example.jp`) within the same session. **This is configured entirely in the GA4 admin UI; no GTM-side configuration is required.**

**Setup:**
1. GA4 admin → Data Streams → Google tag → Configure tag settings → **Configure your domains** → add all target domains.
2. As needed, add payment processors and similar to the "Unwanted referrals" list.
3. Verification: confirm the URL gets the `_gl=` parameter when navigating between domains, and that GA4 DebugView shows the same session.

**Notes:**
- Only `<a>` tag link clicks are supported. `<form>` submissions and JS navigation do not get `_gl=` automatically, so custom implementation is required.
- All target domains must have GTM snippets installed with the same GA4 measurement ID.
- Subdomains are treated as the same domain by default (no setup needed).

### 6.2 Excluding Internal Traffic

#### Method A: IP Address Exclusion (for offices with static IPs)

GA4 admin → Google tag → Define internal traffic → add the office IP. In GA4 data filters, first set it to "Testing" → after verification, change to "Active" (excluded data cannot be restored once activated).

#### Method B: Cookie Method (supports remote work and dynamic IPs)

1. **Cookie-setting tag** (Custom HTML): When a special URL (`?set_internal=true`) is accessed, set the `is_internal=true` cookie (90-day expiry).
2. **Cookie-reading variable**: `Cookie - is_internal`.
3. **Lookup table variable**: `is_internal=true` → `traffic_type=internal`.
4. Add `traffic_type` to the **Google tag's configuration parameters**.
5. Activate the GA4 data filter (same procedure as Method A).

Have internal members bookmark `https://example.com/?set_internal=true` (re-access every 90 days).

#### Method C: Excluding Staging Environments

Set a blocking trigger `Blocking - Staging Domain` (Page Hostname = `staging.example.com`) on the GA4 tag.

### 6.3 File Download Tracking

**GA4 enhanced measurement (recommended):** Turning on "File downloads" in GA4 data stream settings auto-collects the `file_download` event. Target extensions: `pdf, xls, xlsx, doc, docx, txt, rtf, csv, exe, key, pps, ppt, pptx, 7z, pkg, rar, gz, zip, avi, mov, mp4, mpe, mpeg, wmv, mid, midi, mp3, wav, wma`. Parameters: `file_extension`, `file_name`, `link_text`, `link_url`.

**GTM custom tracking (when adding extensions or limiting to specific pages):**
- Trigger `Link Click - File Download`: Just Links, Click URL matches regex `\.(pdf|docx?|xlsx?|pptx?|csv|zip|rar)$`.
- Tag `GA4 - Event - file_download`: parameters `file_name={{Click URL}}`, `link_text={{Click Text}}`.
- **When using GTM custom tracking, turn off enhanced measurement's file downloads to prevent duplication.**

### 6.4 Outbound Link Click Tracking

**GA4 enhanced measurement (recommended):** Turning on "Outbound clicks" auto-collects the `CLICK` event (`outbound: true`). Parameters: `link_classes`, `link_domain`, `link_id`, `link_url`, `outbound`.

**GTM custom tracking (to track only specific outbound links):**
- Trigger `Link Click - Outbound`: Just Links, Click URL does not contain your site's domain.
- Tag `GA4 - Event - outbound_click`: parameters `link_url={{Click URL}}`, `link_text={{Click Text}}`.
- **When using GTM custom tracking, turn off enhanced measurement's "Outbound clicks" to prevent duplication.**

### 6.5 Phone Tap and Email Link Tracking

**Phone tap:**
- Trigger `Link Click - Phone Call`: Just Links, Click URL starts with `tel:`.
- Tag `GA4 - Event - phone_call_click`.
- **PII caution:** Sending `{{Click URL}}` directly records the raw phone number in GA4 (PII transmission is prohibited). Send the placement (`header`, `footer`, `contact_page`, etc.) instead. Set a `data-tracking-section` attribute on the HTML side and read it via a custom JS variable.

```javascript
// CJS - Phone Call Location
function() {
  var el = {{Click Element}};
  if (!el) return 'unknown';
  var section = el.closest('[data-tracking-section]');
  return section ? section.getAttribute('data-tracking-section') : 'other';
}
```

```html
<header data-tracking-section="header">
  <a href="tel:+12025550123">Call us</a>
</header>
```

**Email links:** The same pattern works for `mailto:`. Change the trigger condition to start with `mailto:`, set the event name to `email_link_click`, and include placement as a parameter. Sending `{{Click URL}}` directly is PII transmission and is prohibited.

---

## 7. Operational Rules

### Version Management

GTM versions (the publish history) act as a rollback-capable change history.

```
Version name: One-line summary of the change
Description:
- Who: Owner name
- What: What was added, changed, or deleted
- Why: Reason and background for the change
```

### Workspaces

When operating as a team, separate work into different workspaces. Naming: `[Project Name] - [Owner / Team Name]`.

### Performance

- When adding a tag, measure the impact with **PageSpeed Insights**.
- Keep custom HTML tags to a minimum.
- Avoid duplicate tags for the same platform.

---

## 8. Checklist

### When Creating a New Container

- [ ] Create a GTM account and container (one account per company, one container per site).
- [ ] Install the GTM snippet in the HTML `<head>` and `<body>`.
- [ ] Create folders: `_Global`, `GA4`, and one for each platform in use.
- [ ] Create constant variables: `Const - GA4 Measurement ID`, etc.
- [ ] Configure the Google tag (GA4 - Config) on Initialization - All Pages.
- [ ] When using Google Ads, configure the Conversion Linker on Initialization - All Pages.
- [ ] Configure each platform's base tag on All Pages.
- [ ] Name all tags, triggers, and variables according to the naming conventions.
- [ ] Place all tags, triggers, and variables in folders.

### Before Publishing

- [ ] Verify the firing timing of all tags in GTM Preview mode.
- [ ] Confirm that events are recorded correctly in GA4 DebugView.
- [ ] Verify with each helper tool (Meta Pixel Helper, Tag Assistant, etc.).
- [ ] Confirm there is no double counting of `page_view`.
- [ ] Confirm no PII is included in event parameters.
- [ ] Confirm tags do not fire on unintended pages.
- [ ] Confirm blocking triggers function correctly.
- [ ] Confirm conversion event parameters (value, currency, transaction_id, etc.) are correct.
- [ ] Record the version name and description.

### Naming and Structure

- [ ] Tag: `[Platform] - [Type] - [Detail]`.
- [ ] Trigger: `[Trigger Type] - [Detail]`.
- [ ] Variable: `[Variable Type] - [Detail]`.
- [ ] No uncategorized tags, triggers, or variables.
- [ ] No duplicate triggers with the same conditions (use shared triggers).
- [ ] Shared triggers are stored in the `_Global` folder.

---

## 9. Debugging

| Tool | Use |
|--------|------|
| GTM Preview mode | Verify tag firing and trigger conditions |
| GA4 DebugView | Real-time inspection of GA4 events |
| Meta Pixel Helper (Chrome extension) | Verify Meta Pixel firing |
| TikTok Pixel Helper (Chrome extension) | Verify TikTok Pixel firing |
| X Pixel Helper (Chrome extension) | Verify X Pixel firing |
| Tag Assistant | General Google tag verification |

**Always test in Preview mode before publishing.** In particular, verify trigger conditions and that there is no firing on unintended pages.

---

## References

- [Google - Tag Manager API v2 Developer Guide](https://developers.google.com/tag-platform/tag-manager/api/v2/devguide)
- [Google - Tag Manager API v2 - ContainerVersion](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions)
- [Google - Tag Manager API v2 - Tag](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags)
- [Google - Tag Manager API v2 - Trigger](https://developers.google.com/tag-platform/tag-manager/api/v2/reference/accounts/containers/workspaces/triggers)
- [Google - Tag Manager API v2 - Variable](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables)
- [Google - Tag Manager API v2 - Parameter](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/Parameter)
- [Google - BuiltInVariable Types](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions#BuiltInVariable)
