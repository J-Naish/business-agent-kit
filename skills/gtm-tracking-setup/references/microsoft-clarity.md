# Microsoft Clarity - GTM Implementation Manual

> Always verify the latest specifications at [Microsoft Learn - Clarity](https://learn.microsoft.com/en-us/clarity/).

---

## 1. Smart Events (Automatic Detection)

Representative auto-detected events (UI is source of truth):

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

Smart Event types: **Button Clicks** / **API events** (`clarity("event", name)`) / **Auto events** / **Page visits**. Custom Smart Events can be created with no code.

---

## 2. Limits and Data Retention

| Item | Limit / Retention |
|------|-------------------|
| Session recordings | Up to 100,000 per project per day (excess sampled) |
| Heatmaps | Up to 100,000 PVs per heatmap |
| Custom Tags | Up to 128 tags per page, max 255 chars per tag |
| GA4 integration | Only one web property per project |
| Standard recordings retention | 30 days |
| Favorite / labeled / sample recordings | Up to 13 months |
| Heatmap data | Up to 13 months |

---

## 3. GTM Configuration

### Setup Steps

1. Create a project in [Clarity](https://clarity.microsoft.com/)
2. Obtain the Project ID (URL: `https://clarity.microsoft.com/projects/view/{Project ID}/`)
3. Replace `{CLARITY_PROJECT_ID}` in the GTM template JSON with the Project ID
4. Import the JSON into GTM

### Tag

| Tag Name | Template | Trigger | Notes |
|----------|----------|---------|-------|
| Clarity Tag | Microsoft Clarity - Official (Community Template, `cvt_MQDKZ`) | All Pages | Only Project ID is required |

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

Clarity auto-detects route changes. When detection is incomplete, fire a Custom HTML tag on a History Change trigger to attach the route:

```javascript
clarity("set", "route", location.pathname);
```

> `clarity("event", ...)` is recorded only as an event and does not split URLs — use a Custom Tag for route identification.

---

## 4. Client API

### JavaScript API

| API | Syntax | Purpose |
|-----|--------|---------|
| **Custom Tags** | `clarity("set", key, value)` | Attach a custom tag to a session. key/value: string (max 255 chars); value can also be string[]. Up to 128 tags per page |
| **Identify** | `clarity("identify", customId, sessionId, pageId, friendlyName)` | User identification (cross-device tracking). Only customId is required |
| **Event** | `clarity("event", eventName)` | Send a custom event |
| **Upgrade** | `clarity("upgrade", reason)` | Prioritize the session for recording |
| **ConsentV2** | `clarity("consentv2", {ad_Storage, analytics_Storage})` | Send cookie consent state (note capital S) |

### HTML Attributes

| Attribute | Purpose |
|-----------|---------|
| `data-clarity-mask="true"` | Masks the element and its children |
| `data-clarity-unmask="true"` | Unmasks the element and its children |

> `data-clarity-mask="false"` has no effect. Use `data-clarity-unmask="true"` to unmask.

### PII Notes

Do **not** pass PII (email, phone, names) directly to Custom Tags, Event, or Identify APIs. Clarity masks PII in the DOM but does not mask data sent through the API. Pass a hashed or internal ID to Identify.

### clarity-events Community Template

GitHub: `mbaersch/clarity-events`. Add as a separate tag from the base Clarity tag to configure Event sending, Custom Tags, Session Upgrade, and Consent management from the GTM UI. Base tag must already be installed.

---

## 5. Masking

| Mode | Behavior |
|------|----------|
| **Strict** | Masks all content (high-privacy domains) |
| **Balanced** (default) | Masks numbers and email addresses only |
| **Relaxed** | No masking (public-only sites) |

Input boxes and dropdowns are **always masked in every mode**. Masked data is not sent to Clarity servers. Setting changes apply only to new recordings; takes up to 1 hour.

---

## 6. Consent Management

Clarity controls cookies and features based on the `analytics_storage` signal:
- **Granted**: full analytics with cookies.
- **Denied**: cookieless mode (no cross-session tracking).

If you already use Google Consent Mode (GCM), **no additional configuration is required** — Clarity auto-reads `analytics_storage` / `ad_storage`. For manual control, send `clarity('consentv2', { ad_Storage: "granted", analytics_Storage: "granted" })` from a Custom Event tag after consent. In EEA/UK/CH, Clarity does not set cookies until a consent signal is present.

See: https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode

---

## 7. GA4 Integration

Auto-integration: select a GA4 property under Clarity Settings > Setup > Google Analytics integration. Reflection takes 24+ hours. Only one GA4 web property per project. The integration scope (e.g. Playback URL Custom Dimension) has changed over time — verify in the current UI.

See: https://learn.microsoft.com/en-us/clarity/ga-integration/ga4-integration

---

## 8. Recommended Settings

- Install via GTM Community Template (centralized management)
- Masking mode: **Balanced**
- Bot detection: **ON**
- Consent: control via GCM integration or ConsentV2 API
- IP Blocking: block office/developer IPs
- Smart Events: review and customize auto-detected events

---

## 9. Debugging

- **GTM Preview**: confirm Clarity tag fires on All Pages with the correct Project ID.
- **DevTools Network**: filter `clarity.ms` and confirm collection requests.
- **Clarity Dashboard**: live sessions appear within minutes; recordings within ~2 hours.
