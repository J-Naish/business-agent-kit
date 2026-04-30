# Meta measurement, CAPI, and attribution

Use this reference before finalizing conversion events, Advantage+ readiness, bid strategy, or reporting. Meta delivery quality depends heavily on the event stream and the business meaning of that event.


## Core principles

- Pixel alone is usually not durable enough for serious conversion programs. Use Pixel + Conversions API when conversion optimization matters.
- Deduplicate browser and server events with the same `event_id`.
- Use the deepest reliable event with enough volume and acceptable latency.
- Event Match Quality is a diagnostic, not a business KPI. Improve it, but do not treat a score as proof of causal lift.
- Platform CPA/ROAS is an optimization signal, not finance truth.
- Separate click-through, view-through, modeled, new-customer, existing-customer, and incremental views where possible.
- Since Meta's March 2026 attribution update, also separate **engage-through** where available.

---

## Signal stack

| Layer | What to verify | Why it matters |
|---|---|---|
| Pixel | Standard events fire once and on the right pages/actions | Browser signal and event coverage |
| Conversions API | Server events sent with low latency | More durable signal under browser/privacy loss |
| Deduplication | Pixel and CAPI share `event_id` for the same event | Prevents double counting or discarded events |
| Customer parameters | Email, phone, external ID, `fbp`, `fbc`, IP, user agent where policy/consent allow | Improves matching and attribution quality |
| Event semantics | `Purchase`, `Lead`, value, currency, and custom events are consistent | Prevents broken learning and bad comparisons |
| Business feedback | CRM stages, offline sales, refunds, margin, LTV | Aligns optimization with real value |

---

## Event selection

| Business type | Preferred event path | Notes |
|---|---|---|
| E-commerce | Purchase -> profit/value-aware Purchase | Use ATC/IC only as temporary validated proxies |
| Lead gen | Lead -> qualified lead -> opportunity/closed-won | Raw lead volume can be actively harmful |
| SaaS | Signup/trial -> activated user/PQL -> subscription/LTV | Activation and retention matter more than signup count |
| App | Install -> in-app event -> purchase/value | Do not optimize forever to installs |
| Local | Booking/qualified call -> completed job/POS sale | Call handling and service-area quality matter |

### Deepest reliable event rule

Choose the event that best balances value, volume, and latency:

```
Best business event
  ↓ if too sparse or too delayed
Validated proxy event
  ↓ if proxy quality is unproven
Higher-volume event for learning, with explicit quality risk
  ↓ once signal improves
Move back toward the deeper event
```

---

## Event Match Quality

Improve Event Match Quality by sending clean, consented, properly formatted identifiers:

- Hashed email and phone where available.
- `external_id` for logged-in users or CRM records.
- Browser identifiers such as `fbp` and `fbc`.
- IP address and user agent for server events where allowed.
- Consistent names, phone formats, country/state/ZIP fields, and lowercase normalized emails.

Use EMQ as a health target. Avoid hard rules such as "must be 8+" unless the account, implementation, and source warrant it.

---

## Attribution and reporting

| Issue | Recommended stance |
|---|---|
| Click-through conversions | Treat as link-click-driven conversions under the newer attribution model; compare against prior periods carefully if definitions changed |
| Engage-through conversions | Separate from click-through. It can include non-link engagements and 5-second video views followed by conversion within the 1-day window |
| View-through conversions | Keep visible but separate when possible; high VTC share can overstate causal impact |
| Retargeting ROAS | Treat with skepticism until incrementality is tested |
| Advantage+ Sales ROAS | Compare against new-customer rate, business revenue, margin, and incrementality |
| Long consideration cycle | Use longer evaluation windows and CRM/source-of-truth reconciliation |
| API/reporting changes | Verify current Ads Manager/API behavior before relying on a window or metric |

Attribution-window availability can differ by Ads Manager UI, API version, objective, event type, and reporting tool. Verify the current Ads Manager/API behavior before claiming that a 7-day/28-day view or 28-day click window is available or removed.

### Engage-through attribution

Meta's March 2026 attribution update narrowed click-through attribution toward link clicks and introduced/renamed **engage-through attribution** for social-native interactions. Treat this as an important reporting split:

- Includes likes, reactions, comments, shares, saves, profile/non-link interactions, and engaged video views where available.
- Uses a 1-day window.
- The video engaged-view threshold is reported as 5 seconds, or 97% of video length when the video is shorter than 5 seconds.
- It helps explain discrepancies between Meta, GA4, and backend systems, but it is not the same as a click-based visit.
- For conversion campaigns, report click-through, engage-through, and view-through separately where the account/tool exposes them.

---

## Incrementality

Use incrementality methods when budget and volume allow:

| Method | Best for | Caveat |
|---|---|---|
| Meta Experiments / A/B test | Tactical setup or creative tests | Still platform-run |
| Conversion Lift | Causal read on Meta impact | Requires enough volume and eligibility |
| Geo holdout | Channel/account-level incrementality | Needs stable geo markets and sufficient spend |
| Customer/CRM holdout | Existing-customer or lifecycle campaigns | Requires clean customer lists |
| MMM | Larger programs and cross-channel planning | Needs history and careful modeling |
| Finance reconciliation | Always-on sanity check | Not causal by itself |

Use external incrementality benchmarks only as context. Do not apply any average result as a universal forecast for one account.

---

## Lead-quality loop

For lead generation, define:

| Stage | Example | Use |
|---|---|---|
| Raw lead | Instant Form submit | Volume and front-end CPL |
| Qualified lead | Sales-accepted, MQL, SQL | Better optimization/reporting target |
| Opportunity | Pipeline created | Business quality |
| Closed-won | Revenue | Source of truth |

Operational checks:

- Use Higher Intent forms for high-value leads.
- Add 1-3 qualifying questions when quality matters.
- Sync CRM stages back to Meta when volume and latency allow.
- Monitor speed-to-lead; slow follow-up can make good leads look bad.

---

## Common measurement mistakes

| Mistake | Fix |
|---|---|
| Pixel-only setup for serious conversion spend | Add CAPI and deduplication |
| Optimizing to raw leads forever | Import qualified outcomes or use better form friction |
| Changing `Purchase` value semantics midstream | Keep value definitions stable and document changes |
| Reporting Meta ROAS as finance truth | Reconcile with orders, CRM, POS, margin, and LTV |
| Ignoring existing customers | Define and monitor customer segments |
| Judging before conversion delay passes | Use appropriate windows and stabilization periods |

## Attribution and Ads Insights API changes

### Ads Insights API attribution-window changes

| Field | Value |
|---|---|
| Effective date | 2026-01-12 |
| Change | `7d_view` and `28d_view` stop returning data via `action_attribution_windows` parameter on Ads Insights API |
| Failure mode | Silent: API returns empty data sets, not an error code. Reporting integrations may show "0" instead of the truth. |
| Surviving windows | `1d_view`, `1d_click`, `7d_click`, `28d_click`, `1d_engaged-view` (post-March 2026 renamed engage-through). Default reporting setting in Ads Manager: 7-day click + 1-day engage-through + 1-day view. |
| Historical data retention | Limited to 13 months for unique-count fields and hourly breakdowns |


Planning impact:

- Any reporting pipeline that hard-coded `7d_view` or `28d_view` is silently dropping conversions. The skill must ask: which attribution window does your dashboard request, and was it migrated after 2026-01-12?
- Year-over-year comparisons crossing 2026-01-12 must annotate the change.
- VTC-heavy categories (awareness/video/branding) lose visible long-tail VTC entirely.

### Click-through and engage-through reclassification

| Field | Value |
|---|---|
| Effective date | March 2026 (rollout, not single-day flip) |
| Click-through redefined | Now requires an actual outbound link click (to website, app, lead form, etc.) |
| Moved to engage-through | Likes, shares, saves, comments, profile taps, image expansions, short video views |
| Engage-through window | 1 day |
| Engage-through video threshold | 5 seconds (down from 10 seconds for the prior "engaged-view") |
| Default attribution setting (post-March 2026) | 7-day click + 1-day engage-through + 1-day view |
| Billing impact | None. Billing is unchanged; only classification and reporting differ. |


Planning impact:

- Pre-March 2026 vs post-March 2026 conversion counts in Ads Manager are not comparable. Set a new baseline mid-March onward.
- Meta-vs-GA4 click discrepancy should narrow because Meta's click number is now closer to "outbound link click" semantics.
- Engage-through is not a "site visit"; it is "social-native engagement followed by a same-window conversion". Do not present it as traffic.

### Current attribution windows

| Window | API name | Available in Ads Manager Compare | Available in Insights API | Default? |
|---|---|---|---|---|
| 1-day click | `1d_click` | Yes | Yes | Part of compare |
| 7-day click | `7d_click` | Yes | Yes | Default click window |
| 28-day click | `28d_click` | Yes | Yes | Compare only |
| 1-day view | `1d_view` | Yes | Yes | Default view window |
| 7-day view | `7d_view` | Verify current API/UI support | Verify current API/UI support | Do not assume availability |
| 28-day view | `28d_view` | Verify current API/UI support | Verify current API/UI support | Do not assume availability |
| 1-day engage-through | `1d_engaged_view` or current equivalent | Verify current API/UI support | Verify current API/UI support | Keep separate from outbound-link click attribution |


Note: API parameter names for engage-through behavior may lag UI naming. Verify by hitting the API and inspecting the `action_attribution_windows` echo.

### Attribution Setting vs Comparison Window vs Default Action Attribution Window

These three terms are commonly confused; the planning skill must keep them straight.

| Term | Where it lives | What it controls | Effect |
|---|---|---|---|
| Attribution Setting | Ad set level (under cost-per-result goal > more options) | Both delivery optimization and reporting | Determines which conversions count toward the bid optimizer's learning and the columns shown by default |
| Comparison Window (Compare Attribution Settings) | Reporting view in Ads Manager (Columns dropdown) | Reporting only | Lets the user view 1d_click / 7d_click / 28d_click / 1d_view / 1d_engaged-view side by side |
| Default Action Attribution Window | Account-wide reporting default | Reporting only | The default attribution column displayed when no override is set; account-level configurable |


Skill stance: when reading numbers, always state which of the three is being applied. "ROAS = 3.4" is meaningless without "under 7-day click + 1-day view".

### Engage-through attribution: precise definition

| Item | Value |
|---|---|
| Trigger interactions | Likes, shares, saves, comments, profile taps, image expansions, video views of >= 5 seconds |
| Excludes | Outbound link clicks (those are click-through) |
| Window | 1 day |
| Video threshold | 5 seconds, down from the old 10-second "engaged-view" |
| Reported as | Separate column from click-through and view-through (when comparison is on) |

### View-through (`1d_view`)

| Item | Value |
|---|---|
| Definition | Conversion within 1 day of viewing the ad with no engagement |
| Surviving windows | Only 1 day. 7-day and 28-day removed 2026-01-12. |
| Use case | Awareness / video / brand campaigns where exposure is the planned mechanism |
| Risk | Heavy modeling on iOS; do not interpret as deterministic |

### Modeled conversions and DDA on Meta

Meta does not call its attribution model "DDA" in the Google Ads sense, but uses a stack of statistical modeling, AEM, and CAPI to fill privacy-driven gaps.

| Mechanism | What it does | Where it appears |
|---|---|---|---|
| Aggregated Event Measurement (AEM) | Aggregates web events from iOS-opted-out users and other restricted contexts | Web + app, automatic since 2025-06 (no manual config) |
| Modeled conversions | Statistical estimation when a direct match is unavailable; Meta fills the gap based on patterns from observable users | Reported alongside observed conversions in Ads Manager |
| AEM-for-app | Same idea for iOS app conversions; works with SKAdNetwork / AdAttributionKit | Aggregated event reporting for app |
| Meta's attribution model | Last-touch within selected window, with engage-through and view-through as separate channels post-March 2026 | Default model in Ads Manager |


Skill stance: Ads Manager numbers blend observed and modeled conversions. The blend ratio is not exposed. Always reconcile with backend revenue / leads, especially after attribution changes.

### Cross-domain measurement and iOS 14.5+

| Item | Value |
|---|---|
| iOS ATT | Required user-opt-in for IDFA; opt-in roughly 25-30% globally |
| SKAdNetwork (SKAN) | Deterministic-but-aggregated postback for app installs; conversion values bucketed |
| AdAttributionKit | Successor / extension to SKAN announced WWDC 2024; supports re-engagement and alternative app stores |
| Meta AEM (web) | Privacy-preserving aggregation of web events for opted-out and restricted users |
| Meta AEM-for-app | Web-app cross measurement and view-through reporting in iOS app campaigns |
| Cross-domain web measurement | Single Pixel/CAPI dataset can span subdomains; cross-root-domain requires separate dataset linkage and domain verification |


### Aggregated Event Measurement (AEM) state

| Field | Value |
|---|---|
| Event cap / prioritization behavior | Verify current UI/docs before assuming manual event caps or prioritization are required |
| Manual prioritization | Removed; the AEM tab is gone from Events Manager |
| Value optimization | AEM models the summed value of all eligible events for opted-out iOS users |
| Pixel + CAPI relationship | AEM uses both as input; CAPI is essential for events that Pixel cannot reliably observe (post-purchase, server confirmations) |


Skill stance: any planning document that still says "select 8 priority events" is out of date.

### Domain verification

| Field | Value |
|---|---|
| Hard requirement for AEM web in 2026 | No (AEM auto-aggregates; manual prioritization gone) |
| Strongly recommended | Yes, for ownership of the conversion domain, to use custom conversions cleanly, and to claim Pages/Pixels under a Business Manager |
| Method | DNS TXT record, HTML file upload, meta-tag |


Skill stance: always domain-verify the primary conversion domain even though AEM no longer hard-requires it. Verification is also a prerequisite for some Business Manager controls.

---

## Conversions API details

### Server event parameters

Required for every server event:

| Parameter | Required? | Notes |
|---|---|---|---|
| `event_name` | Required | Standard event name (Purchase, Lead, AddToCart, etc.) or custom |
| `event_time` | Required | Unix epoch seconds. Web/app events: up to 7 days back. Offline `physical_store`: up to 62 days. |
| `action_source` | Required | One of: `website`, `app`, `phone_call`, `chat`, `email`, `physical_store`, `system_generated`, `business_messaging`, `other` |
| `user_data` | Required | Hashed PII and identifiers to match the event to a user |
| `event_source_url` | Required when `action_source = website` | Full URL where the event occurred |
| `event_id` | Strongly recommended | Used for browser/server deduplication |
| `client_user_agent` | Required when `action_source = website` | UA string from the browser |

`user_data` fields commonly used (all hashed except `client_ip_address`, `client_user_agent`, `fbp`, `fbc`, `external_id`):

| Field | Description |
|---|---|
| `em` | SHA-256 lowercase email |
| `ph` | SHA-256 normalized phone (no `+`, digits only, country code) |
| `fn`, `ln` | Hashed first/last name, lowercase, ASCII normalized |
| `ge` | Hashed gender (`m` / `f`) |
| `db` | Hashed date of birth, YYYYMMDD |
| `ct`, `st`, `zp`, `country` | Hashed city, state, ZIP, country |
| `external_id` | First-party user ID (hashed recommended) |
| `client_ip_address` | Plaintext IP |
| `client_user_agent` | Plaintext UA |
| `fbp` | Facebook browser pixel cookie |
| `fbc` | Facebook click ID, format `fb.subdomain_index.timestamp.fbclid` |

`custom_data` fields commonly used: `currency`, `value`, `content_type`, `content_ids`, `contents` (array of `{id, quantity, item_price}`), `num_items`, `order_id`, `predicted_ltv`, `status`, `delivery_category`.

Note on optimization eligibility: all `action_source` values support optimization except `physical_store`, which is for measurement only.


### Browser/Server deduplication

| Item | Value |
|---|---|
| Dedup time window | 48 hours |
| Primary dedup key | `event_name` + `event_id` |
| Browser priority | When both arrive within roughly 5 minutes of each other, Meta favors the browser event |
| Alternate dedup | `fbp` + `external_id` matching exists but is less reliable; not the recommended method |
| Dedup verification | Use Events Manager > Test Events and the Diagnostics tab to confirm dedup is happening |
| Failure modes | Different `event_name` casing (`Purchase` vs `purchase`); regenerated `event_id` per side; `event_id` only sent on one side |


#### Dedup failure modes

| Failure | Symptom | Fix |
|---|---|---|
| `event_id` generated separately on browser and server | Double-counted conversions; inflated platform ROAS | Generate ID once at the source of truth (server or shared client cache), pass to both Pixel and CAPI |
| `event_name` case mismatch | Dedup misses; double counting | Standardize on Meta's exact case (e.g., `Purchase`); reject custom case drift in code review |
| Server event arrives > 48h after browser | Dedup misses; double counting | Send server event within seconds of browser event; never batch beyond hours |
| Server event arrives > 5 minutes before browser without `event_id` | Browser preference logic doesn't apply | Always include `event_id` even when browser fires first |
| Different value/currency on browser vs server | Reporting drift; unstable optimization | Use server as source of truth; optionally suppress value on browser side |
| External_id used as dedup key without `event_id` | Cross-event collision | Use `event_id`+`event_name` as primary; treat external_id as user-data, not dedup-key |
| Missing `event_source_url` on website server event | Event rejected or downranked | Always include `event_source_url` when `action_source=website` |
| `client_ip_address` and `client_user_agent` missing on web server event | Lower match quality, lower EMQ | Capture and forward both from the browser request to server |

### Offline events via CAPI

| Item | Value |
|---|---|
| Method | CAPI is Meta's recommended path for offline / store events |
| Dataset | Offline events must be associated with a dataset; datasets can include web, app, store, business messaging, legacy offline conversions, MMP |
| `action_source` | `physical_store` for in-store transactions; `phone_call`, `email`, `chat`, `system_generated` for non-web non-app |
| `event_time` window | Up to 62 days back for `physical_store` events; 7 days for other event types |
| Dedup window | 7 days for offline events |
| Dedup field combination | `dataset_id` + `event_time` + `event_name` + `item_number` plus `order_id` or user fields |
| Optimization support | `physical_store` is measurement-only; other action sources support optimization |
| Upload cadence | Real-time recommended; daily acceptable |


### Conversion Leads CRM integration

| Item | Value |
|---|---|
| Use case | Optimize Meta lead delivery toward CRM-stage quality, not raw form fills |
| Event source | Facebook/Instagram Lead Ads (Instant Forms) and qualifying website forms |
| Required mapping | 15-16 digit Meta Lead ID into CRM |
| Stage timing | Stage event must occur within 28 days of lead creation |
| Stage conversion rate | Should fall between 1% and 40% |
| Practical planning floor | Around 200-250 qualifying leads per month before expecting stable optimization |
| Upload cadence | Daily minimum; near-real-time preferred |
| Time to value | About 3 months expected; implementation 1 month to several months |


Skill stance: do not promise Conversion Leads optimization for a brand with fewer than ~200 leads/month or no daily CRM upload pipeline. The platform-side delivery quality lever is real but cannot be backfilled overnight.

### Event Match Quality (EMQ)

| Item | Value |
|---|---|
| Score range | 0-10 (or labeled Poor / OK / Good / Great) |
| Practical floor for healthy matching | 6+ generally; 8+ is ideal |
| Inputs | Customer parameters in `user_data` (hashed email, phone, name, address, external_id, fbp, fbc, IP, UA) and their match rate |
| Calculation window | Last 48 hours of events |
| Surface availability | Web events; offline / app / lead require Meta guidance and Integration Quality API beta access |
| Misuse | EMQ is diagnostic, not a KPI; high EMQ does not prove lift |

Parameter hierarchy (importance to match):

| Tier | Parameters |
|---|---|
| Top | `em`, `ph`, `external_id` |
| Mid | `fbp`, `fbc` |
| Low | `client_ip_address`, `client_user_agent` |


### Integration Quality API (beta)

| Item | Value |
|---|---|
| Status | Beta; requires Meta representative access |
| Surface | Programmatic access to per-event diagnostics, EMQ, dedup status, missing parameters |
| Coverage | Web events first-class; offline/app/lead/alpha/beta integrations require Meta guidance |
| Use case | Replace manual Events Manager spot-check with continuous integration health monitoring |


### CAPI Gateway / cloud connector vs server-to-server direct

| Method | Best for | Pros | Cons |
|---|---|---|---|
| CAPI Gateway (Meta-managed) | Marketers / small teams, no in-house data engineering | No-code, Meta-managed, fast to deploy | Limited control over event payload, harder to do enrichment, monthly hosting cost |
| Server-side GTM (sGTM) | Mid-market teams with GTM expertise | Browser-side coexistence, multi-platform fanout, moderate flexibility | Hosting cost, GTM complexity |
| Direct server-to-server | Engineering-led DTC, enterprises | Maximum flexibility, no hosting middleman, can enrich from internal systems | Highest dev cost, requires CAPI version maintenance |
| MMP / partner integration | App-heavy advertisers | Bundled with attribution stack | Coupled to MMP roadmap, additional dedup considerations |


Skill stance: choose by team capability, not Meta's "recommended" badge. Always validate dedup in Events Manager regardless of method.

### Pixel + CAPI redundancy

| Item | Value |
|---|---|
| Required for serious accounts | Yes, since roughly 2021 official Meta guidance, hardened in 2024-2026 |
| Why redundant | Pixel covers what server cannot see (browser-side micro-events); CAPI covers what Pixel cannot reliably send (post-checkout server confirmations, ad blockers, ITP) |
| Without redundancy | EMQ degrades, AEM has fewer signals, optimization gets noisier |
| With redundancy + dedup | Full visibility with no double counting |


### CAPI for Browsers

CAPI for Browsers (formerly "server-side Pixel" / "browser CAPI") routes browser events through a server endpoint while staying browser-resident. Treat it as part of the broader Pixel + CAPI implementation discussion unless current Meta materials expose it as a distinct product in the user's account.

Skill stance: do not encode "CAPI for Browsers" as a separate strategy in the skill. Encode it as one of the implementation options for browser-origin events.

---

## CAPI implementation checklist

Use this as an audit before declaring CAPI "done".

### Foundations

- Pixel installed on every page that should fire an event
- CAPI deployed via one of: direct server, sGTM, CAPI Gateway, MMP
- Dataset configured in Events Manager and linked to the ad account
- Domain verified for the primary conversion domain
- Test Events used to confirm both Pixel and CAPI fire for each event

### Per-event payload

- `event_name` matches Meta standard names exactly (case-sensitive)
- `event_time` is sent at the moment of conversion, never batched > 1 hour
- `action_source` is the correct value (`website` / `app` / `physical_store` / etc.)
- `event_source_url` present for `website` events
- `client_user_agent` and `client_ip_address` forwarded from the originating request
- `event_id` generated once per event and sent to BOTH browser and server
- `value` and `currency` consistent between browser and server
- `order_id` sent for purchase-style events
- `content_ids` and `contents` aligned with catalog SKU IDs

### user_data hygiene

- Hashed email and hashed phone where consent allows
- `external_id` populated (first-party user ID)
- `fbp` and `fbc` captured from cookies/click and forwarded
- Names, address fields hashed and sent where consent allows
- No accidental plaintext PII in hashed fields (verify hash format)

### Dedup verification

- Browser and server share `event_name` and `event_id`
- Dedup status checked in Events Manager > Diagnostics
- No "Pixel only" or "Server only" warnings on production events
- Periodic spot-check (weekly) for dedup rate >= 90%

### Offline / CRM

- Offline events upload daily minimum
- `event_time` within 62 days for `physical_store`
- Conversion Leads integration if leads are the goal and CRM stages are usable
- 15-16 digit Meta Lead ID mapped from Lead Ads to CRM

### Quality

- EMQ tracked weekly per event (target 6+, push 8+)
- Integration Quality API monitored if access is granted
- `value`/`currency` reconciled monthly to backend revenue

### Documentation

- Per-event spec stored in repo: required fields, source of truth, dedup key strategy
- Runbook for "Pixel fires but CAPI doesn't" / "CAPI fires but Pixel doesn't" / "EMQ drops"

---

## Volatile measurement checks

Use the official sources below before making hard recommendations about API windows, CAPI payloads, deduplication, offline events, or Conversion Leads eligibility.

- Meta Conversions API server events: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event
- Meta CAPI deduplication: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- Meta Offline Events via CAPI: https://developers.facebook.com/docs/marketing-api/conversions-api/offline-events
- Meta Conversion Leads CRM integration: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration
- Meta Integration Quality API / EMQ: https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api

## CAPI payload examples

### Web Purchase (server-side, action_source=website)

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1745971200,
      "action_source": "website",
      "event_id": "ord_12345_a1b2c3",
      "user_data": {
        "em": ["<sha256(lowercase(email))>"],
        "ph": ["<sha256(normalized_phone)>"],
        "external_id": ["<sha256(user_id)>"],
        "fbp": "fb.1.1745971000123.1234567890",
        "fbc": "fb.1.1745970000456.PAAaBbCc",
        "client_ip_address": "203.0.113.42",
        "client_user_agent": "Mozilla/5.0 ..."
      },
      "custom_data": {
        "currency": "USD",
        "value": 129.99,
        "order_id": "ord_12345_a1b2c3",
        "content_type": "product",
        "content_ids": ["SKU-1234"],
        "contents": [{"id": "SKU-1234", "quantity": 1, "item_price": 129.99}],
        "num_items": 1
      }
    }
  ]
}
```

### Offline / In-store Purchase (action_source=physical_store)

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1745885000,
      "action_source": "physical_store",
      "event_id": "pos_store23_txn_889721",
      "user_data": {
        "em": ["<sha256(email)>"],
        "ph": ["<sha256(phone)>"],
        "fn": ["<sha256(firstname)>"],
        "ln": ["<sha256(lastname)>"],
        "ct": ["<sha256(city)>"],
        "st": ["<sha256(state)>"],
        "zp": ["<sha256(zip)>"],
        "country": ["<sha256(country)>"]
      },
      "custom_data": {
        "currency": "USD",
        "value": 245.00,
        "order_id": "pos_store23_txn_889721"
      }
    }
  ]
}
```

### CRM Conversion Lead (action_source=system_generated)

```json
{
  "data": [
    {
      "event_name": "Lead",
      "event_time": 1745899000,
      "action_source": "system_generated",
      "event_id": "crm_lead_47781",
      "user_data": {
        "em": ["<sha256(email)>"],
        "ph": ["<sha256(phone)>"],
        "lead_id": "1234567890123456"
      },
      "custom_data": {
        "lead_event_source": "CRM Salesforce",
        "event_source": "crm",
        "lead_status_stage": "qualified"
      }
    }
  ]
}
```

Notes:

- `event_id` must be deterministically derivable from your source-of-truth ID; never random per side

---

## Attribution reconciliation worksheet

When backend revenue and Meta-attributed revenue diverge, walk this list before declaring a "Meta is broken" verdict.

| # | Question | Where to look | Likely cause if mismatched |
|---|---|---|---|
| 1 | What attribution setting is the campaign using? | Ad set settings | Default changed March 2026 |
| 2 | What attribution column is the dashboard requesting? | API code / Looker / Triple Whale config | Dashboard still requests `7d_view` (returns empty since 2026-01-12) |
| 3 | Is engage-through enabled and counted? | Compare attribution settings | Post-March 2026 split between click vs engage vs view |
| 4 | What is the EMQ for the relevant event? | Events Manager | Low EMQ = under-matching |
| 5 | What is the dedup rate? | Events Manager > Diagnostics | Double-counting if low |
| 6 | Is value/currency consistent between browser and server? | Diagnostics | Drift inflates ROAS |
| 7 | Are offline/CRM events backfilling? | Dataset uploads | Out-of-window events being silently dropped |
| 8 | What proportion of conversions are modeled? | Not exposed deterministically | Heavy iOS exposure = more modeling |
| 9 | Is the AEM auto-aggregation healthy? | Events Manager | Rare; mostly automatic post-2025-06 |
| 10 | Is the catalog feed clean? | Catalog Manager | Out-of-stock / rejected items invisible to delivery |
| 11 | Are there missing browser events on Safari/Firefox? | Web QA | ITP / ad blockers; CAPI should cover |
| 12 | Is `fbc` being captured on the landing page? | Landing page QA | Missing fbclid -> lost click attribution |
| 13 | Is the conversion domain verified? | Business Settings | Verification missing can degrade attribution |
| 14 | Year-over-year period crossing 2026-01-12 or March 2026? | Dashboard period | Apples to oranges; annotate |

---
