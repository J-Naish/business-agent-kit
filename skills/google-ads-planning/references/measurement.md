# Measurement and incrementality

Use this reference when designing conversion actions, deciding what to bid on, judging whether reported numbers are trustable, or planning an incrementality test. This reference is the *decision layer* — it does not cover GTM tag implementation, dataLayer design, or pixel firing logic. For those, use the `gtm-tracking-setup` skill.

## Scope and what this reference does not cover

| In scope | Out of scope (use other skill / reference) |
|---|---|
| Which conversion to bid on, how to value it, how to judge it | Tag firing logic, GTM container JSON, dataLayer schema → `gtm-tracking-setup` |
| Consent Mode v2 strategy and consequences | CMP banner UX, geo-IP rules, legal review |
| Enhanced Conversions and Offline Conversion Import as decision tools | Server-side hashing code, API client implementation |
| Modeled conversions interpretation, VTC policy, attribution choice | Audience build / segmentation tactics → playbooks |
| Incrementality methods, eligibility, statistical reads | Specific MMM model fitting → vendor or analytics team |
| iOS / app measurement at the planning level | SDK installation and event mapping → Firebase docs |

---

## Operating principles

- **Conversion action is the strategy.** Smart Bidding and PMax / Demand Gen optimize aggressively toward whatever you mark Primary. Pick the deepest reliable signal with workable volume and latency. Weak proxies as Primary will buy weak business outcomes for years.
- **Platform metrics are a steering signal, not financial truth.** Reported ROAS and CPA include modeled, view-through, brand, and remarketing pickup. Reconcile against revenue, pipeline, CRM, app LTV, or contribution margin before treating any platform number as ground truth.
- **Observed > modeled.** Improving consent capture, Enhanced Conversions coverage, and offline imports moves conversions from modeled to observed and tightens Smart Bidding. This usually beats any campaign-setting tweak.
- **Treat VTC as a separate signal by default.** Combining click-based and view-through CV in headline CPA / ROAS hides cause and effect, especially in PMax, Demand Gen, Display, and Video.
- **Inside Google Ads, lift studies measure Google's view of Google.** They do not capture cross-platform leakage. Triangulate with geo holdouts, MMM, or business-data reconciliation when the decision is material.
- **Do not optimize what you cannot reconcile.** If your Google Ads CV count, GA4 conversion count, and CRM/POS revenue cannot be made to agree within an explainable delta, fix the plumbing before scaling spend.

---

## 1. Measurement stack at a glance

A working Google Ads measurement stack has four layers. Each layer has a different failure mode and a different fix.

```
┌──────────────────────────────────────────────────────────────────┐
│  Layer 4: Reconciliation                                         │
│    CRM / POS / DWH / finance source of truth                     │
│    → Reconciles platform CV with business outcome                │
└─────────────────▲────────────────────────────────────────────────┘
                  │  Offline imports, API joins, blended dashboards
┌─────────────────┴────────────────────────────────────────────────┐
│  Layer 3: Google Ads conversion actions                          │
│    Primary / Secondary CV, attribution model, VTC windows        │
│    → Drives Smart Bidding and reporting                          │
└─────────────────▲────────────────────────────────────────────────┘
                  │  Tag fires, gclid join, EC match, OCI upload
┌─────────────────┴────────────────────────────────────────────────┐
│  Layer 2: Signal collection                                      │
│    Google tag, GTM, sGTM / Tag Gateway, Enhanced Conversions     │
│    → Where most accuracy is won or lost                          │
└─────────────────▲────────────────────────────────────────────────┘
                  │  Cookies, identifiers, hashed PII, click IDs
┌─────────────────┴────────────────────────────────────────────────┐
│  Layer 1: Consent and privacy                                    │
│    Consent Mode v2, ITP/ETP, CMP, regional rules                 │
│    → Determines what Layer 2 is allowed to see                   │
└──────────────────────────────────────────────────────────────────┘
```

Diagnose top-down when a number looks wrong: is this a reconciliation issue (Layer 4), a CV-action issue (Layer 3), a tag/identifier issue (Layer 2), or a consent issue (Layer 1)? Acting at the wrong layer wastes weeks.

---

## 2. Conversion-action design

### Primary / Secondary / Micro decision

| Type | Used for | Examples | Default count rule |
|---|---|---|---|
| **Primary** | Bid optimization (Smart Bidding optimizes toward this) | Purchase, qualified lead, booked appointment, paid signup, in-app revenue event | "Include in Conversions" ON |
| **Secondary** | Monitoring only — not used by bidding | Newsletter signup, content download, account creation without payment | "Include in Conversions" OFF |
| **Micro** | Engagement signals, never primary unless proxy validated | Scroll depth, dwell time, pricing page view, video 50% | "Include in Conversions" OFF |

**Choosing Primary.** Use the deepest reliable signal that has workable volume and latency. Translation:

| Volume per month (true Primary CV) | What's bidable |
|---|---|
| 0–10 | Manual CPC / Maximize Clicks. Don't run Smart Bidding on this; signal is too thin. |
| 10–30 | Maximize Conversions on a single Primary. No multi-campaign tCPA. |
| 30–50 | tCPA possible if CPA is stable and Primary is unambiguous. |
| 50–100 | Value bidding becomes realistic if values are clean. |
| 100+ | Multi-campaign portfolio strategies, value rules, PMax lead gen with imports. |

If the deepest reliable signal cannot produce 30+/month, **either deepen creative/offer/LP to lift volume**, **broaden the Primary to a slightly shallower but still meaningful action** (e.g., qualified-lead instead of closed-won), or **stay manual until volume builds**. Do not fabricate a "Primary CV" by promoting a micro-conversion.

### Value passing

| Tier | What's passed | When to use |
|---|---|---|
| Fixed value | Static value per CV | Lead gen with stable economics; default for B2B form fills |
| Dynamic revenue | Order revenue or stage-weighted lead value | E-commerce default; SaaS with paid signup |
| Margin-aware value | Revenue × margin (or contribution margin) | E-commerce when margin varies materially across products |
| Lead score | CRM-derived score (0–100, hashed-band, or stage value) | B2B with reliable lead scoring; enterprise SaaS |

For e-commerce, a fixed-value CV is almost always wrong — Smart Bidding cannot tell a $20 sale from a $2,000 sale. For B2B lead gen, a fixed value is the practical default unless lead scores are imported.

### Business-model defaults (cross-link with [business-model-playbooks.md](business-model-playbooks.md))

| Business model | Default Primary | Common upgrade path |
|---|---|---|
| E-commerce | Purchase with dynamic revenue value | Add margin-aware value once feed has margin labels |
| B2B lead gen | Qualified lead via CRM import (ECfL or OCI) | Add stage values (MQL / SQL / Opportunity) |
| Local service | Phone call ≥ qualified duration **or** form submit | Add booking-completed via OCI |
| High-ticket / long cycle | Consultation request | Closed-won via OCI when volume permits |
| App | tCPI install initially → in-app event tCPA → tROAS | Mature ladder, see Section 11 |
| Store visit | Store visit (Google-modeled) | Store sale via POS import where eligible |

### Ad-type compatibility quick reference

| Campaign type | Bids on click-based CV | Non-click conversion handling | Notes |
|---|---|---|---|
| Search | Yes | No (VTC reported but not in Conversions column) | Standard click-driven |
| Display | Yes | EVC can apply to video inventory; standard VTC is reporting-only | Use VTC as assist evidence, not the main CPA story |
| Shopping | Yes | No | Click-driven |
| Video Action | Click + Engaged-View | EVC counted in Conversions; standard VTC reported separately | EVC is the direct-response video non-click signal |
| App | Click + view-based | VTC optimization can make eligible VTC biddable, especially Android installs | iOS: SKAN + ICM signal blend, see Section 11 |
| **Performance Max** | Click + Engaged-View | EVC counted in Conversions; standard VTC counted in Conversions only for PMax Store Goals | Audit ad event type and channel mix quarterly |
| **Demand Gen** | Click + Engaged-View | EVC counted in Conversions; VTC optimization can be enabled for YouTube inventory but is off by default | Platform Comparable columns can include VTC for reporting only |

Reference: [Google Ads Help](https://support.google.com/google-ads/answer/16542520).

---

## 3. Consent Mode v2

Consent Mode v2 (CMv2) controls what data Google tags can collect and use ([Consent mode reference](https://support.google.com/google-ads/answer/13802165?hl=en)). It is **infrastructure**, not a setting — a misconfigured CMv2 silently degrades remarketing, conversion tracking, modeling, and bidding for affected traffic.

### Basic vs Advanced

| Mode | Tag behavior pre-consent | Pings if user denies | Operational impact |
|---|---|---|---|
| **Basic** | Tags do not load until user grants consent | None — full silence on denial | Simpler legal posture; loses all signal from non-consenters including modeling fuel |
| **Advanced** | Tags load before banner; cookies/identifiers held until granted | Cookieless pings (no IDs, just contextual: timestamp, page, browser, geo region) | Modeling can fill some of the gap; cookieless pings are a contested gray area under ePrivacy in some EU member states |

Practical default: **Advanced** for most Google Ads accounts targeting EEA/UK, because modeling materially closes the consent-decline gap. Switch to Basic only if legal review specifically requires it.

### Regional requirements

For Google Ads planning, the main operational gating is EEA / UK / Switzerland traffic. Consent Mode v2 is mandatory there for personalized advertising and audience features ([Google Ads Help](https://support.google.com/google-ads/answer/13695607?hl=en)).

| Region | Planning consequence |
|---|---|
| **EEA + UK + Switzerland** | Remarketing audiences, personalized ads, conversion modeling, EC, and audience features can degrade or stop working if required consent signals are missing. Lost signal is not backfilled. |
| Other regions | Confirm local privacy and consent requirements separately with legal / privacy owners. Do not assume CMv2 replaces local compliance work. |

### Modeling thresholds

Google Ads will model conversions for non-consented traffic only when both conditions hold per **country × domain**:

| Threshold | Value |
|---|---|
| Google Ads conversion modeling | ≥ **700 ad clicks** per 7-day rolling window per country × domain ([Google Ads Help](https://support.google.com/google-ads/answer/10548233?hl=en)) |
| GA4 behavioral modeling | ≥ 1,000 daily users with `analytics_storage='granted'` for ≥ 7 of last 28 days **and** ≥ 1,000 daily events with `analytics_storage='denied'` for ≥ 7 days; Reporting Identity = **Blended** |

If you operate in multiple countries on the same domain, a small country may never hit 700 clicks/week and modeling will not activate there. Practical fix: aggregate reporting by region, accept that small-market modeling is unavailable, or reduce CV-action fragmentation.

### Signal definitions

| Signal | Layer | Controls |
|---|---|---|
| `ad_storage` | Upstream (storage) | Whether ads cookies / identifiers can be written / read |
| `analytics_storage` | Upstream (storage) | Whether analytics cookies (`_ga`) can be written / read |
| `ad_user_data` | Downstream (transmission) | Whether user data may be sent to Google for advertising — **required for Enhanced Conversions and tag-based CV tracking** |
| `ad_personalization` | Downstream (transmission) | Whether data may be used for **remarketing / personalized ads / audience features** |

Without `ad_personalization='granted'`, you cannot build remarketing audiences from EEA users.

### EEA enforcement state

For non-compliant EEA/UK/CH accounts, consent signal gaps can degrade measurement, ad personalization, and remarketing capabilities ([Google Ads Help](https://support.google.com/google-ads/answer/13695607?hl=en)). Treat lost signal as non-recoverable in planning.

- Remarketing audiences are not populated (no rebuild from lost period)
- Personalized ads disabled for affected traffic
- Conversion tracking, demographic reports, EC, audience features stop working for those users
- **Lost data is non-recoverable** — no backfill
- Account-level GDPR/DMA fine exposure separate from feature degradation

### Consent Mode signal architecture change (June 15, 2026)

Effective **June 15, 2026**, Google Signals is demoted from controlling cross-device ad data; Consent Mode v2 becomes the sole control point for ad cross-device IDs. Ensure `ad_storage='granted'` and `ad_personalization='granted'` are flowing for users who consent — otherwise cross-device remarketing and Customer Match degrade silently after that date. Google Signals retains a narrower behavioral / demographic role inside GA4.

---

## 4. Enhanced Conversions (web and leads)

Enhanced Conversions (EC) sends hashed first-party data (email, phone, name, address) alongside conversion events ([EC for web Help](https://support.google.com/google-ads/answer/15712870?hl=en), [EC for leads Help](https://support.google.com/google-ads/answer/14274408?hl=en)). Google matches it against signed-in users it has seen, recovering conversions that were lost to cookie restrictions, ITP, ad-blockers, or unconsented sessions. **EC is the most leverage-per-effort lever in modern Google Ads measurement.**

### Two products, different jobs

| Product | Job | Match data captured at | Offline event uploaded later? |
|---|---|---|---|
| **EC for Web (ECfW)** | Recover online conversions (e-commerce purchases, online form fills) | Conversion page (checkout success, thank-you) | No — match happens at conversion time |
| **EC for Leads (ECfL)** | Attribute *offline* CRM events back to the click | Lead form submit | Yes — eventual offline outcome (qualified, opportunity, closed-won) uploaded via Data Manager / API / Zapier and matched on the hashed PII (no gclid required) |

### Setup methods

| Method | Reliability | When to use |
|---|---|---|
| Google tag — automatic detection | Low–medium | Quick start; relies on standard form-field structure; breaks on SPAs and custom checkouts |
| Google tag — manual (CSS selectors / JS variables) | High | Most production accounts |
| GTM (same three modes as gtag) | High | Default when GTM is already in place |
| **Data Manager / Google Ads API** | Highest | Server-side, batch-friendly, required for ECfL offline portion |

(June 2026 simplification: EC becomes a **single toggle** per conversion action; multi-source ingestion — tag + Data Manager + API simultaneously — becomes default. Method-selector UI is removed.)

### Hashing requirements

- SHA-256, hex-encoded, **lowercase**
- Email normalized: lowercase + trim + (Gmail only) strip dots and `+suffix`
- Phone in E.164 format (`+15551234567`), no spaces or punctuation
- Hashing happens **before** transmission — Google never receives raw PII
- First-name / last-name / postal code / country can be passed in addition to email/phone for higher match rates

### Coverage / match rate

The diagnostic to watch is **coverage rate**: % of conversions with valid EC data attached. Aim for ≥ 70%. Below 50% means a meaningful share of conversions are not benefiting from EC and the limiting factor is usually a missing field or mis-mapped selector.

### Reported uplift

| Source | Claim | Notes |
|---|---|---|
| Google (product marketing) | +5% Search, +17% YouTube | Best-case averages from Google case studies |
| Independent practitioner reports | +5–10% in measured conversions | More common in the field |
| Combined with Consent Mode v2 modeling | +15–25% blended | Most "uplift" attributed to EC + modeling together |

Uplift is shown in the Google Ads UI under Conversion → Diagnostics → Conversion Uplift, but **only for the first 30 days** after EC activates. After that, EC-recovered conversions fold into total conversion counts without a labeled column. Take a screenshot during the 30-day window for record-keeping.

### Compatibility with Consent Mode

EC requires `ad_user_data='granted'`. Without it, EC will not fire even when `ad_storage='granted'`. CMv2 and EC are complementary: CMv2 gates consent, EC supplies deterministic 1P signal when consent is granted, increasing the observed share of conversions and reducing reliance on modeling.

---

## 5. Offline Conversion Import (OCI)

OCI brings post-click events that happen outside the website (CRM updates, sales calls, store visits, closed deals) back into Google Ads, attributed to the original ad click ([Google Ads Help](https://support.google.com/google-ads/answer/2998031?hl=en-EN)). **For lead gen with variable lead quality, OCI or ECfL is non-negotiable** — without it, Smart Bidding will buy more of whatever produces cheap form fills, regardless of whether they close.

### Click identifiers

| Identifier | Use case | Lifespan for OCI upload | Granularity |
|---|---|---|---|
| `gclid` | Standard web ad click → web/offline CRM conversion | **90 days** from click | User-level (deterministic) |
| `gbraid` | Web ad click → app conversion (ATT-restricted iOS) | Aggregate match window | Coarse / aggregate |
| `wbraid` | App ad click → web conversion (ATT-restricted iOS) | Aggregate match window | Coarse / aggregate |

(Canonical convention: **g**braid = **g**oing to app, **w**braid = **w**eb destination. A handful of older third-party posts have these reversed; use the Google convention.)

**Capture mechanics** (planning level — implementation lives in `gtm-tracking-setup`):

1. Read the click ID from the URL on the landing page
2. Persist it to a 1P cookie + a hidden form field
3. Save it on the lead record in CRM at form submit
4. Upload `{click_id, conversion_time, value, conversion_action}` back to Google Ads via API / Data Manager / native CRM integration when CRM stage advances

### Adjustment windows

| Window | Behavior |
|---|---|
| **Within 7 days of conversion** | Adjustment is read by Smart Bidding — bidding adapts to your imported quality signal |
| 7–55 days | Adjustment recorded for reporting but **ignored by autobidding** |
| > 55 days | Hard rejection — adjustment not accepted |

Practical rule: **import at least daily**, ideally hourly via API. Weekly batches lose most of the bidding-influence value.

### ECfL vs OCI — which to use

| Scenario | Use |
|---|---|
| Native CRM integration available (HubSpot Marketing Hub Pro+, Salesforce link) | **ECfL via the integration** |
| Lead form on your own site, custom CRM | **ECfL** if you can capture email/phone reliably; OCI only as fallback |
| Legacy account already running on gclid + OCI, no PII in CRM | OCI is fine to keep, but plan an upgrade — Google's stated direction since 2024 is ECfL via Data Manager |
| Phone calls without a form (call-only) | Forwarding number + OCI on call duration |
| Privacy-restricted iOS app conversions | gbraid / wbraid handling — aggregate only |

ECfL is more durable than OCI: it works without a stored click ID, supports cross-device matching, and is the canonical path for new builds.

Upload timing differs by product: standard OCI imports can use GCLIDs retained for up to 90 days, while enhanced conversions for leads imports uploaded more than 63 days after the associated last click are not imported.

### Common rejection / failure modes

| Symptom | Cause | Fix |
|---|---|---|
| "Click ID outside 90-day window" | gclid older than 90 days | Upload sooner; for very long sales cycles, import a closer qualified-stage proxy or use ECfL where user-provided data is captured early |
| "Enhanced conversions for leads import too old" | ECfL offline event uploaded more than 63 days after the associated last click | Upload daily or import a closer funnel event; do not design ECfL around >63-day upload latency |
| "Conversion time before click time" | Timezone misconfiguration | Verify CRM and Google Ads use the same time zone; add 1–2 day buffer; do not round timestamps |
| "Click not yet processed" | Trying to import a CV within ~6 hours of click | Delay import 6+ hours; batch hourly is fine |
| "No 'Import from clicks' conversion action" | CV action created after the click occurred | Backfill is impossible; align CV action setup with launch date |
| Hash format errors | SHA-256 hex required, lowercase | Normalize email (lowercase, trim, Gmail dot-strip) before hashing |
| Match rate too low for ECfL | Email/phone fields missing or wrong field passed | Verify selector / variable; check coverage rate diagnostic |

### `conversion_environment` parameter

Google announced a `conversion_environment` parameter (values: `UNSPECIFIED` / `UNKNOWN` / `APP` / `WEB`) for offline uploads in June 2025. The **September 30, 2025 hard-deadline was withdrawn** — uploads without it still process. Practical stance: **set it on new integrations** because app/web attribution and Smart Bidding signal quality degrade without it, but legacy uploads without the parameter are not rejected.

---

## 6. Server-side tagging and Google Tag Gateway

### Decision tree

```
Is the account on EEA/UK traffic OR > $50k/month spend OR Safari-heavy audience?
├── No → Default Google tag (client-side) is enough. Stop here.
├── Yes, but < $250k/month spend
│   └── Google Tag Gateway for Advertisers (GTG)
│       Cost: ~free; replaces ad-hoc 1P-domain hacks
│       Wins: ITP cookie persistence, ad-blocker resilience, ~13% claimed conv. signal recovery
└── Yes, > $250k/month spend OR multi-platform CAPI (Meta, TikTok in parallel) OR CRM data enrichment
    └── Full sGTM (Stape / GCP / Tag Pilot) + GTG
        Realistic cost: $1,000+/month all-in
        Wins above GTG: payload enrichment, server-side EC, multi-channel CAPI, PII hygiene
```

### Google Tag Gateway for Advertisers (GTG)

- GA since 2025; relabeled from "first-party mode"
- Since **April 10, 2025**, GTM containers with Google Ads / Floodlight tags load the Google tag first via `Set-Cookie` semantics, defeating most ITP / extension-level cookie restrictions
- Reported lift: **~13%** more conversion signals (Google figure, echoed by Merkle / Brainlabs; not independently audited at scale)
- It is **not** a replacement for sGTM; recommended setup is **CDN + sGTM** combined when the budget supports it

### Server-side GTM (sGTM)

Real-world cost reality:

| Hosting | Monthly cost floor | Notes |
|---|---|---|
| GCP self-hosted (Cloud Run, ≥3 servers) | ~$90 | Plus logging, egress, storage; real cost higher |
| Stape (managed) | $20+ ($200–400 for high traffic) | Free tier under 10k req/mo |
| Tag Pilot | $15+ | No event cap |
| **All-in (incl. setup 50–120h @ ~$120/h, ongoing 10–20h/mo)** | **~$1,000+/month** | This is the figure to use in viability discussions |

**What sGTM solves:**
- Safari ITP cookie persistence (server-set 1P cookies bypass the JS 7-day / `gclid` 24-hour cap)
- Ad-blocker resilience (ad blockers can't see the request)
- Payload enrichment (CRM joins, server-side EC, profit values added before sending)
- Multi-platform CAPI in parallel (Meta, TikTok, etc. share the same sGTM infrastructure)
- PII hygiene (hash/strip before data leaves your perimeter)

**What sGTM does *not* solve:**
- Page-load speed (modern client GTM is already async)
- "GDPR compliance" by itself — consent obligations are independent of where the tag lives
- Attribution problems caused by lack of consent — consent gates everything regardless of server vs. client

**Adoption rule of thumb:** ~$250k/month spend or running CAPI for two+ platforms is the threshold where sGTM clears its all-in cost via a 5%+ attribution recovery. Below that, GTG alone is usually the right answer.

---

## 7. Modeled conversions

Google Ads reports **modeled conversions** alongside observed conversions when deterministic attribution is unavailable (consent denied, cross-device journey, expired cookie, app↔web). Modeled values fill into the standard "Conversions" column when confidence is high enough.

### When conversions are modeled

| Trigger | Cause |
|---|---|
| User denied consent (Advanced CMv2) | Only cookieless pings available; Google models from those |
| Cross-device journey | User clicked on mobile, converted on desktop without sign-in |
| Safari / iOS expired cookie | gclid cookie capped at 7 days (24 hours with `gclid` URL param) by ITP |
| App ↔ web bridge | iOS ATT-restricted; partial gbraid/wbraid attribution |

### How modeled CV is surfaced in the UI

- "Conversions" column **includes** modeled when confidence is high
- **Conversion Uplift diagnostic** shows the modeled-share lift, but **only for the first 30 days** after modeling activates per CV action — capture this for record-keeping
- Modeled values can take **up to 5 days** to stabilize and can be retroactively increased

### "Normal" modeled share

| Modeled share of total CV | Interpretation |
|---|---|
| **< 10%** in EEA traffic | **Warning**: CMv2 likely misconfigured — banner fires after tags, default not "denied", or below 700-clicks/week threshold per country×domain |
| 10–30% | Normal range for healthy CMv2 with 50–70% consent rate |
| 30–35% | Worth monitoring; check for consent-rate drop or banner UX changes |
| **> 35%** | **Investigate**: consent banner may be over-suppressing, or domain split too narrow for modeling threshold |

(Industry rule of thumb; Google publishes no official benchmark.)

### Practical reading rules

- Treat modeled CV as **directional**, not bankable. It tells you "approximately this much additional CV happened"; it does not tell you which click drove which conversion.
- When modeled share is high and PMax/Demand Gen ROAS looks great, **separately evaluate click-only ROAS** as a sanity check.
- After EC + GTG are deployed, modeled share usually drops — that is good; observed share rises and Smart Bidding gets sharper signal.
- Do not compare YoY conversion totals across changes in CMv2 setup, EC enablement, or attribution model without a footnote.

---

## 8. Attribution model

### Available models

Only **two** models remain selectable for Google Ads conversion actions:

| Model | Behavior | When to use |
|---|---|---|
| **Data-Driven Attribution (DDA)** | Bayesian/ML model distributes credit across touchpoints based on observed conversion paths in your account | **Default**; recommended for almost all accounts |
| **Last Click** | 100% credit to final click before conversion | When DDA isn't trustable (very low volume, just-launched account, or you specifically need a conservative reference) |

The four rule-based models (First Click, Linear, Time Decay, Position-Based) are no longer supported and were migrated automatically to DDA ([Google Ads Help](https://support.google.com/google-ads/answer/6259715?hl=en)).

### DDA eligibility

- **No minimum** for most web/lead conversion actions — DDA is the default for new actions
- Some app and store-visit actions still carry minimums: ≥ 3,000 ad interactions and ≥ 300 conversions in 30 days to start; ≥ 2,000 / ≥ 200 to stay eligible
- Recommended for stable modeling: ≥ 200 conversions and ≥ 2,000 ad interactions per 30 days

### Scope and limits

DDA evaluates the full path across mobile/desktop/tablet, across Search, Display, Shopping, YouTube, Discover, Gmail, and Performance Max — including web → app → in-app journeys.

**Critical limit:** DDA only credits **Google-owned channels**. Meta, TikTok, organic, email, and other non-Google touchpoints are invisible. This is the structural reason platform ROAS overstates Google's true contribution.

### Attribution windows

| Window type | Range | Default |
|---|---|---|
| Click-through | 1–90 days | **30 days** (most CV actions) |
| View-through | 1–30 days | **1 day** |
| Engaged-view | 1–30 days | **3 days** for web conversions / offline imports and store visits / store sales; **1 day** for Video Action / Demand Gen / P-MAX and Web to App Connect in-app actions; **2 days** for ACi; **1 day** for ACe |

Choose the window that matches conversion latency, not vanity. Long windows inflate counts and slow learning; short windows under-count high-consideration purchases.

### Cross-account attribution

Cross-account conversion tracking at the MCC/manager level **overrides** sub-account attribution settings. Reports must be viewed at manager level when this is on. Plan attribution model and conversion-action design at the manager level for multi-account setups.

---

## 9. View-through conversions (VTC) and engaged-view (EVC)

VTC measures users who saw an ad without clicking and converted later. It applies anywhere with impression-led inventory: Display, Video, PMax, Demand Gen, App. **Treat VTC consistently across the account**, do not let policy drift by campaign type.

### Default windows and inclusion by campaign type

| Campaign | Default non-click window | Inclusion in "Conversions" column by default |
|---|---|---|
| Search | n/a (click-driven) | n/a |
| Display | 1 day | **No** — reported in "View-through conversions" only |
| Shopping | 1 day | **No** |
| Video Action | 1-day Engaged-View | **Yes for EVC, not standard VTC** |
| App — Install | 2-day install EVC / 24-hour VTC where VTC optimization is enabled | **Yes for eligible optimized view signals** |
| App — Engagement | 1-day engagement EVC / 24-hour VTC where VTC optimization is enabled | **Yes for eligible optimized view signals** |
| **Performance Max (standard)** | 1-day Engaged-View | **Yes for EVC; no for standard VTC** |
| **Performance Max for Store Goals** | 1 day | **Yes** |
| **Demand Gen** | 1-day Engaged-View; 1-day VTC recommended if VTC optimization is enabled | **Yes for EVC; VTC only when VTC optimization is enabled. Platform Comparable columns can include VTC for reporting only** |

References: [View-through conversions](https://support.google.com/google-ads/answer/16542520), [Engaged-view conversions](https://support.google.com/google-ads/answer/10048752), [Demand Gen VTC optimization](https://support.google.com/google-ads/answer/16399666), and [Demand Gen Platform Comparable columns](https://support.google.com/google-ads/answer/15299024).

This means standard PMax, Display, Shopping, and Search do **not** normally include standard VTC in the primary Conversions column. They can still include EVC where video engagement is eligible. Demand Gen requires extra care: ordinary Conversions can include EVC, VTC optimization can make YouTube VTC biddable when enabled, and Platform Comparable columns include VTC for cross-platform reporting but do not affect bidding.

### Engaged-View Conversions (EVC)

- **Skippable in-stream**: viewer watches ≥ 10 seconds without clicking, then converts within window
- **In-feed / Shorts**: viewer watches ≥ 5 seconds without clicking, then converts within window
- Available on Video, App, Display video inventory, Demand Gen, and Performance Max
- Default EVC window is 1 day for Video Action / Demand Gen / P-MAX and 3 days for store visits / store sales
- EVCs flow into **Conversions** and **All conversions** columns for supported campaign types

### VTC handling policy (default for this skill)

| Principle | Practice |
|---|---|
| **Default = monitoring first** | Track standard VTC separately; do not treat impression-only credit as primary proof unless the campaign is explicitly opted into VTC optimization or is PMax Store Goals / eligible App |
| **Keep windows short** | 1-day VTC default; longer windows blur causality |
| **Don't combine click + EVC + VTC blindly** | Separate click-based, EVC, and VTC-included CPA / ROAS for material decisions |
| **Watch the VTC ratio** | If VTC > 50% of total CV for a campaign, the campaign's direct effect is likely overstated |
| **Audit Demand Gen VTC optimization and PMax Store Goals quarterly** | These can make VTC biddable; recalibrate against business outcomes |

### VTC red flags

| Symptom | Likely cause | Action |
|---|---|---|
| VTC > 50% of total reported CV in PMax Store Goals or VTC-heavy reports | Heavy Display/YouTube delivery, low-quality placement, frequency too high | Add brand exclusions, audit placement reports, use channel report / ad event type, and reconcile against store/POS or backend data |
| Demand Gen VTC > 70% after VTC optimization is enabled | Audience too narrow → frequency over-exposure or impression-credit inflation | Broaden audience signal, add new creative, separate prospecting / remarketing, and check click+EVC performance |
| App VTC > 60% | iOS attribution noise or remarketing-heavy mix | Audit ATT opt-in rate, separate prospecting from re-engagement |
| ROAS spikes after a Display launch | New VTC pickup, not new revenue | Verify business revenue moved; if not, keep VTC visible but reweight |

---

## 10. GA4 and Google Ads — source of truth

Google Ads conversion count, GA4 conversion count, and CRM/POS revenue **will not match exactly**. This is normal, and the right response is to know which number drives which decision — not to "fix" them to be identical.

### Why numbers differ

| Difference | Cause |
|---|---|
| Google Ads CV count > GA4 conversion count | Google Ads counts modeled conversions; GA4 counts only directly attributed events. EC also recovers conversions Google Ads can see that GA4 cannot. |
| GA4 sessions don't match Google Ads clicks | Bot filtering, gclid loss in redirects, single-page navigation differences, session timeout vs. click event |
| GA4 attributes a CV to "google / cpc"; Google Ads doesn't see it | Cookie-based gclid expired or stripped; user came back after window |
| Google Ads CV time vs GA4 CV time differ | Google Ads bucketizes to **click date**; GA4 bucketizes to **event date** |

### Source-of-truth rule

| Decision | Source of truth |
|---|---|
| **Bidding decisions** (Smart Bidding, target CPA/ROAS, budget allocation per Google campaign) | **Google Ads** conversion data — this is the only data Smart Bidding can act on |
| **Cross-channel performance reporting** (Google vs Meta vs organic vs email) | **GA4** with proper UTM hygiene, or a DWH/MMP that ingests all channels |
| **Business reporting and finance** | **CRM / POS / DWH / finance source of truth** — never sum platform-reported revenue across channels |
| **Diagnosing tag/tracking issues** | **GA4 DebugView + Google Tag Diagnostics** in parallel |

### Don't sum platform-reported revenue

If Google Ads reports $100k revenue and Meta reports $80k revenue, you do not have $180k of advertising-driven revenue. Each platform claims credit for journeys involving the other. Use a single source of truth (CRM, GA4 with consistent attribution, or MMM) for business reporting; use platform numbers only for within-platform optimization.

---

## 11. iOS and app measurement

iOS measurement is a fundamentally different stack from web. Plan it separately.

### ATT (App Tracking Transparency) planning ranges

| Category | Opt-in rate |
|---|---|
| Industry average | ~38% |
| Gaming overall | ~39% (sports 50%, hyper-casual 43%, action 40%) |
| Education | ~14% (up from 7% in 2023) |
| Publications | ~26% (up from 18% one year prior) |
| Finance / e-commerce / utility | 20–30% |

Use these as directional planning ranges; app-category, region, and prompt design can move the actual rate materially.

Operational implication: ATT-attributable signal alone is too thin to power tCPA/tROAS for iOS. Google blends three signals to compensate: (1) ATT-opted-in IDFA conversions, (2) on-device measurement (ODM), (3) SKAN aggregate, plus (4) Integrated Conversion Measurement (ICM) since Nov 2025.

### SKAdNetwork 4.0

SKAN 4 is the production baseline for this planning guide. SKAN 5 was discussed at WWDC 2023 then folded into AdAttributionKit (AAK); Apple removed SKAN 5 references from developer docs.

| Feature | Detail |
|---|---|
| Postbacks | Up to 3 per install across windows 0–2 / 3–7 / 8–35 days |
| Conversion values | Postback 1 carries 64-value fine-grained; postbacks 2 & 3 are coarse (low/medium/high) |
| Source identifier | 4-digit hierarchical, with crowd-anonymity tiering |
| Web-to-app | Supported for Safari ads driving App Store opens |
| Google Ads + SKAN | Live since March 19, 2024; aggregate data via Google Ads API, ~72-hour delay; visible in SKAdNetwork conversions report in UI |

**Conversion-value schema design**: map your **revenue tiers** into the 64 fine-grained slots in postback 1. Don't waste fine values on funnel-stage events — coarse buckets (postbacks 2/3) are sufficient for stage tracking.

### AdAttributionKit (AAK)

Introduced iOS 17.4; meaningfully upgraded at WWDC 2025 / iOS 18.4 (overlapping conversion windows, configurable cooldowns, geo-level postback data). **Adoption remains low** — Meta, Google, and Snap are still primarily on SKAN. Plan for AAK migration but **do not build dependencies on it yet**; it is not Google's primary App-campaigns measurement framework.

### Integrated Conversion Measurement (ICM)

Google's proprietary alternative to Apple's frameworks. **Open beta GA since November 12, 2025** for iOS. Materially increases observable iOS conversions for users without dual ATT consent by using de-identified, event-level signals via MMP integrations (Singular, Branch, Adjust) plus Firebase ODM. Self-serve enablement.

**Practitioner default: enable ICM iOS for any meaningful App campaign.** It is the single biggest measurement upgrade available for iOS app advertising at present.

### Firebase + Google Ads plumbing

```
GA for Firebase SDK ──→ GA4 property ──→ Google Ads account
       (≥ 11.14.0)         (linked)        (linked)
```

- **Required SDK version**: ≥ 11.14.0 (Jun 2025) for full iOS ICM + ODM integration
- Auto-import of newly-reported GA4 conversions into Google Ads has been default since Dec 3, 2025
- ODM (on-device measurement) is **disabled in EEA, UK, and Switzerland**
- Mark GA4 events as **Key Events**, then designate as conversions in Google Ads

### App campaign bidding ladder

| Stage | Bid type | Volume gate to graduate |
|---|---|---|
| New app, no install signal | **ACi tCPI** | Daily budget ≥ 50× target CPI |
| Some installs, want quality | **ACi tCPA** on in-app event | ≥ 10 daily conversions on the target event; daily budget ≥ 10× target CPA |
| Mature, monetizing | **ACi tROAS** | 30–50+ daily revenue conversions; conversion window < 30 days that captures ~ 90% of revenue |
| Re-engagement | **ACe tCPA** | App needs ≥ 50,000 installs; deep links + audience lists; budget ≥ 15× target CPA |
| Pre-registration (Android) | **ACpre** | Budget ≥ 50× target CPI |

Treat these as planning gates and confirm current App-campaign requirements in the UI before launch.

### iOS practitioner takeaways for 2026

1. **Enable ICM iOS** — the largest single measurement upgrade currently available for iOS.
2. **Upgrade Firebase iOS SDK to ≥ 11.14.0** — required for the full integration.
3. **Plan ATT prompts at value-moments** — post-onboarding / post-first-win, with localized pre-prompts. Categories that moved opt-in 5–10pts up in 2025–2026 (publications, education) all changed timing/framing.
4. **Don't graduate bid types prematurely** — respect the 10/30–50 daily volume gates; thin signal under tROAS produces volatile spending.
5. **Map SKAN postback 1 to revenue tiers, not events** — fine values are your only high-resolution iOS signal.
6. **Treat Consent Mode v2 as critical infrastructure for cross-device** (Google Signals demotion June 15, 2026 makes CMv2 the sole control for cross-device IDs).
7. **Prepare for AAK but don't depend on it** — keep your stack on SKAN 4 + ICM until Google moves.

---

## 12. Incrementality testing

Inside Google Ads, lift studies measure Google's view of Google. They do not capture cross-platform leakage, organic-search substitution, or Meta retargeting overlap. Use them, but triangulate.

### Method comparison

| Question to answer | Method | Min spend / data | Time to read | Self-serve in 2026? |
|---|---|---|---|---|
| YouTube driving brand metrics? | **Brand Lift** | $5–10k / 4 weeks | 4 weeks | **No** — requires Google rep |
| YouTube driving brand search? | **Search Lift** | $10k / 4 weeks | 4 weeks | Self-serve (Video, Demand Gen) |
| Demand Gen / Video conversions incremental? | **User Conversion Lift** | $5k / ~1k CV | 2–4 weeks | Self-serve (Video, Discovery, Demand Gen); rep for Search/Display/Shopping/PMax |
| PMax incremental on top of Search/Shopping? | **PMax Uplift Experiment** | $5k+ | 4–6 weeks | **Self-serve** |
| Multi-channel campaign incremental nationally? | **Geo holdout** (GeoLift / CausalImpact) | 6+ months geo data, ≥ 20 geos | 4–8 weeks test + analysis | DIY / agency |
| Did email/CRM push drive net-new revenue? | **Customer Match holdout** | ≥ 50k list members | 2–4 weeks | DIY |
| Right budget split across channels next year? | **MMM** | 2 yrs weekly data | 6–12 weeks initial build | Analytics team / vendor |
| Did revenue change after we turned X on? | **CausalImpact pre/post** | 3+ months pre-period, control series | 2–4 weeks post | DIY |

### Conversion Lift (Google Ads native)

- **November 11, 2025 change**: minimum spend dropped from ~$100k to **$5,000** by switching to Bayesian inference. Major democratization for SMBs.
- **Reporting**: Bayesian credible intervals, not frequentist confidence. Reads like "90% probability that the campaign increased conversions." Default reporting band is 80% credible interval; 90% is the headline certainty target.
- **Self-serve**: Video, Discovery, Demand Gen — fully self-serve. **Search, Display, Shopping, Performance Max — still requires rep coordination** in many accounts, despite the $5k floor applying.
- **Methodologies**: User Lift (cookie/user randomization, needs signed-in volume) and Geo Lift (geo holdout, more resilient to signal loss).
- **2026 UI**: Lift studies live under the **Experiments** tab.

### Brand Lift

- **Minimums vary by country, account, measured metric, and buying path.** Confirm eligibility, spend thresholds, and setup path in the UI or with the Google rep before promising a Brand Lift study.
- **Recommended planning posture**: enough impressions and budget to detect the selected metric; avoid promising a readout for very small reach campaigns.
- **Measures**: ad recall, awareness, consideration, favorability, brand interest, purchase intent, brand association.
- **Methodology**: in-product survey, exposed vs. control users.
- **Self-serve**: NOT self-serve in most accounts — requires Google account rep.

### PMax Uplift Experiments

- Measures incremental conversions from *adding* PMax on top of existing Search + Shopping + Display
- Self-serve in the Experiments tab as of 2025; rolled out broadly through 2024–2025
- Two related experiment types:
  - **Upgrade Experiments** — simulate shifting budget from Standard Shopping / DSAs / GDA to PMax
  - **Optimization Experiments (Beta)** — A/B test asset variations within a PMax campaign
- Practitioner-validated test pattern: PMax with brand search excluded vs included; cross-reference [diagnostic-decision-trees.md](diagnostic-decision-trees.md) for cannibalization symptoms

### Geo holdout / DIY (most defensible for cross-platform questions)

| Method | Rigor | Tool |
|---|---|---|
| **Synthetic control** (Abadie) | High | Hand-rolled R/Python, [GeoLift](https://github.com/facebookincubator/GeoLift) |
| **CausalImpact** (Bayesian structural time series) | High | [google/CausalImpact](https://github.com/google/CausalImpact) R package, `tfp-causalimpact` Python |
| **Difference-in-differences** | Medium | Plain regression |
| Naive matched markets (eyeball pairing) | Low | Avoid — not defensible |

**GeoLift minimum data**: ≥ 6 months daily or ≥ 1 year weekly geo-level data; ≥ 20 distinct geos; clear KPI time series.

**Common pitfalls**:
- Spillover between adjacent markets / regions contaminating the control
- Other campaigns running in treated geos
- Pre-period too short for stable counterfactual fit
- Treating a single test as conclusive — geo tests have wide CIs; replicate

### Customer Match holdout

**Sample size for power** (formula: `n = (Z₁₋α/₂ + Z₁₋β)² × 2σ² / Δ²`):

- 2% baseline CVR, 20% relative MDE, 95% confidence, 80% power → ~ **25,000 per cell** (50k total list minimum)
- B2B at 2–3% CVR → 12,700–19,200 per cell
- **Practical floor**: 50,000+ list members; below 10k is theater, not measurement

**Cross-platform leakage** is the structural weakness. Google can't suppress a holdout user from being reached on Meta, TikTok, organic, or email. The clean version is to coordinate holdouts across all paid channels simultaneously; otherwise you're measuring "Google on top of everything else."

### MMM as an advanced appendix topic

MMM is useful when budget allocation across channels matters more than within-campaign optimization, usually with at least 2 years of weekly data. Treat tool choice as an analytics-team decision; for this planning skill, the important advice is:

- Use MMM for top-down channel allocation and saturation questions.
- Use lift studies or geo holdouts for a faster causal read on a specific campaign.
- Use platform attribution only as an in-flight steering signal, not as final business truth.
- Triangulate MMM, lift, and platform data instead of treating any one model as definitive.

### Honest caveats

1. Self-serve Conversion Lift for Search / Shopping / PMax still requires a rep in many accounts, despite Google's "$5k for everyone" framing.
2. Bayesian credible intervals depend on Google's prior — not fully transparent.
3. Within-walled-garden lift overstates pure Google incrementality (Meta + organic leakage).
4. Geo tests are sample-size limited at country level; after excluding major markets, the number of comparable test/control regions can be too small for detecting modest lift.
5. **PMax cannibalization of Search remains the single largest unresolved measurement issue.** Optmyzr (Feb 2025, n=503) and Adalysis (3,300 PMax campaigns, 1.2M search terms) both documented severe overlap; standard reports attribute both to PMax.
6. MMM is only as good as the data it ingests — short or noisy histories produce confidently wrong answers.
7. Customer Match match rates of 50–70% mean your holdout is only partially "real."
8. Privacy / signal loss continues degrading user-based methods. Practitioner consensus through 2025 has shifted toward geo and MMM as primary, with user-level lift as supplementary.

---

## 13. Measurement health checks

### Daily

| Check | What to look for |
|---|---|
| Spend anomaly | Sudden CPC spikes, day-over-day budget consumption deviation > 30% |
| Conversion volume drop | CV count below 7-day rolling average minus 2σ |
| Tag firing | Tag Diagnostics — any "no recent firing" alerts |
| Disapprovals / policy | Disapproved ads, feed disapprovals (Shopping/PMax) |

### Weekly

| Check | What to look for |
|---|---|
| Modeled CV share | Within 10–35% expected band for EEA traffic; outside = investigate |
| EC coverage rate | ≥ 70% of CVs have valid EC data attached |
| VTC ratio per campaign | Trend; flag campaigns crossing 50% |
| Search terms / placements | Wasted spend on irrelevant queries / placements |
| GA4 ↔ Google Ads CV count delta | Direction stable; flag sudden divergence |

### Monthly

| Check | What to look for |
|---|---|
| Consent rate trend | Banner UX changes, regional shifts, opt-in stagnation |
| Modeled vs observed share | Trend; deteriorating observed share = stack degradation |
| OCI / ECfL upload health | Match rate, rejection reasons, latency |
| Attribution window appropriateness | Conversion-delay distribution still inside chosen window |

### Quarterly

| Check | What to look for |
|---|---|
| CV-action redesign | Are Primary CVs still the deepest reliable signal? |
| Incrementality review | Run a lift study or geo holdout for material campaigns |
| Brand vs non-brand reporting | Brand still isolated and not hiding non-brand performance |
| Cross-platform reconciliation | Google Ads + GA4 + CRM/POS still tied together |

---

## 14. Common pitfalls and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| CV count suddenly doubled | Thank-you page CV tag firing on every page-load (SPA routing change, or duplicate tag) | Move to event-based firing; verify with GTM Preview + Tag Assistant; dedupe `transaction_id` |
| Modeled CV share suddenly increased | Consent rate dropped, or banner changed | Audit CMP changes, banner version history, consent acceptance rate |
| Modeled CV share < 10% in EEA | CMv2 misconfigured (banner fires after tags, default not "denied", or sub-700-clicks/week threshold) | Verify default consent state, banner load order, country×domain volume |
| GA4 and Google Ads CV diverge sharply | gclid loss in redirects, attribution-window difference, modeling, EC coverage | Audit redirects, click-ID capture, EC coverage rate; accept some delta |
| ROAS spiked but profit didn't move | Modeled CV inflated, or VTC pickup, or brand share rose | Decompose: modeled vs observed, click vs VTC, brand vs non-brand |
| Lead CPA looks good but SQL rate dropped | Bid strategy is learning low-quality leads | Switch Primary to qualified-lead via ECfL/OCI; re-run for 2–3 weeks |
| Offline imports cause bidding volatility | Bulk uploads at irregular intervals during learning | Move to daily or hourly imports; avoid huge backfills mid-learning |
| Demand Gen CPA looks bad | Last-click CPA may understate mid-funnel value, while Platform Comparable or VTC-optimized views may overstate it | Segment click vs EVC vs impression; consider blended CPA against business outcome |
| PMax revenue great, business revenue flat | Brand capture, remarketing bias, EVC/VTC interpretation, low-margin product mix | Brand exclusions, NCA mode, segment by ad event type and margin (see [pmax.md §7](pmax.md)) |
| iOS App tROAS unstable | Volume below 30–50 daily revenue conversions; SKAN signal sparsity | Drop back to ACi tCPA, deepen ATT prompt UX, enable ICM |
| EEA/UK/CH campaigns silently lost remarketing | CMv2 / required consent signals missing for users in regulated regions | Re-implement CMv2 properly; lost period is non-recoverable |
| Conversion adjustments not affecting bids | Adjustments arriving > 7 days post-conversion | Move to within-7-day import cadence; for very long cycles, switch Primary to a closer proxy |

---

## Appendix A: Minimum-viable measurement setup by account size

A "good enough" stack scales with spend. Don't over-engineer for accounts that aren't there yet, and don't under-engineer for accounts that are.

### < $5,000 / month spend

- Google tag (client-side) via GTM
- Auto-detected Enhanced Conversions
- Single Primary CV action; secondary as monitoring
- DDA default for most web / GA4 conversion actions; use last-click only as a deliberate conservative reference
- CMv2 only if EEA/UK/CH traffic (mandatory there)
- No sGTM, no GTG required
- Skip incrementality testing — volume too thin

### $5,000 – $50,000 / month spend

- Google tag + GTM + manual Enhanced Conversions (CSS selectors / GTM variables)
- **Google Tag Gateway** enabled
- CMv2 Advanced for any EEA/UK/CH exposure
- ECfL via Data Manager / Zapier for B2B lead gen
- Conversion Lift on Demand Gen / Video where eligible ($5k threshold)
- PMax Uplift Experiments quarterly

### $50,000 – $250,000 / month spend

- Above plus:
- Server-side hashing of EC payloads where feasible
- OCI / ECfL via API for CRM-driven businesses
- Customer Match holdouts on retention / re-engagement
- Quarterly Conversion Lift on material campaigns
- Annual or bi-annual MMM read if ≥ 2 yrs data

### > $250,000 / month spend

- Full sGTM (Stape / GCP / Tag Pilot) + GTG combined
- Multi-platform CAPI (Meta, TikTok in parallel through sGTM)
- DWH-anchored attribution and reconciliation
- Continuous incrementality program: rolling lift studies + geo holdouts + MMM triangulation
- Dedicated measurement owner (in-house or partnered)

---

## Cross-references

- Conversion design and Primary/Secondary policy at the SKILL level → [SKILL.md §3 — Conversion design](../SKILL.md#conversion-design)
- VTC / EVC handling per ad type policy → [SKILL.md](../SKILL.md)
- Budget vs signal viability → [budget-planning.md](budget-planning.md)
- Diagnostic decision trees for failing accounts → [diagnostic-decision-trees.md](diagnostic-decision-trees.md)
- PMax-specific measurement detail (asset-group reporting, brand exclusions, click-based custom CV) → [pmax.md](pmax.md)
- Demand Gen-specific measurement (channel reporting, NCA mode) → [demand-gen.md](demand-gen.md)
- Search-specific measurement (brand vs non-brand isolation) → [search-ads.md](search-ads.md)
- App-specific measurement detail (event depth, SKAN schema design) → [app-campaigns.md](app-campaigns.md)
