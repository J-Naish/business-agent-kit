# Meta account data diagnostics

Use this reference when the user provides Meta Ads account data for improvement: CSV/XLSX exports, copied tables, screenshots, dashboards, Ads Manager breakdowns, Events Manager diagnostics, catalog reports, CRM/POS exports, app/MMP reports, API extracts, or a written summary of metrics. The diagnostic job is to identify what the data can prove, what it cannot prove, and which account changes deserve priority.

## Operating rules

- Diagnose from business outcome backward: revenue, qualified pipeline, retained app users, booked jobs, store/POS sales, or contribution margin before platform CPA/ROAS.
- Separate signal quality from traffic quality. Bad optimization events make good traffic look bad and bad traffic look good.
- Do not trust Meta in isolation. Reconcile Ads Manager with Events Manager, backend orders, CRM/POS, app analytics/MMP, catalog diagnostics, and finance data where available.
- Use spend-weighted evidence. A tiny ad set with poor CPA is less urgent than a campaign consuming 35% of spend with weak qualified outcomes.
- Segment click-through, engage-through, view-through, modeled, new-customer, and existing-customer contribution when the decision is material.
- Avoid making bid, budget, objective, conversion-event, creative, and structure changes at the same time. Data should produce an ordered action plan, not a pile of edits.
- Treat screenshots and summaries as directional. Ask for raw rows only when the decision depends on segmentation, joins, or exact totals.

---

## 1. Intake and data-quality check

Before analyzing performance, identify the dataset and its limits.

| Check | What to inspect | Why it matters |
|---|---|---|
| Source | Ads Manager, Events Manager, CRM, Shopify/backend, POS, catalog, app/MMP, WhatsApp/Messenger, Looker | Determines attribution, date logic, and available joins |
| Date basis | Impression date, click date, conversion date, event time, upload time, close date | Mismatched dates explain many discrepancies |
| Date range | Last 7/14/30/60/90 days, seasonality, conversion lag coverage | Short windows overreact to noise; long windows hide recent changes |
| Time zone / currency | Ad account timezone, CRM timezone, backend timezone, local currency | Affects daily joins, CPA/ROAS, pacing, and revenue |
| Filters | Campaign status, objective, conversion location, attribution setting, placement, geo, age, device | Hidden filters can make the data non-representative |
| Attribution | 7d click, 1d click, 1d view, 1d engage-through, modeled, MMP/SKAN/AAK | Determines whether source totals should match |
| Conversion definition | Optimization event, standard/custom event, raw lead vs qualified lead, app event, value | Defines what delivery is learning from |
| Row grain | Account, campaign, ad set, ad, creative, placement, event, product, lead, user, order | Determines which decisions are possible |

If the data is incomplete, still provide a diagnostic with a **Data limitations** section and separate "supported findings" from "needs confirmation."

---

## 2. Minimum useful fields by source

These are not mandatory columns; they are the practical fields needed to make strong decisions. If the user provides screenshots, look for the same concepts in visible columns.

### Ads Manager performance

| Decision | Useful fields |
|---|---|
| Campaign health | `date`, `campaign_name`, `campaign_id`, `objective`, `buying_type`, `status`, `budget`, `bid_strategy`, `attribution_setting`, `amount_spent`, `impressions`, `reach`, `frequency`, `cpm`, `link_clicks`, `landing_page_views`, `ctr`, `cpc`, `results`, `cost_per_result`, `purchases`, `purchase_roas`, `conversion_value` |
| Ad set diagnosis | `ad_set_name`, `ad_set_id`, `optimization_goal`, `billing_event`, `conversion_location`, `targeting`, `placements`, `learning_status`, `quality_ranking`, `engagement_rate_ranking`, `conversion_rate_ranking`, `budget`, `spend`, `results` |
| Ad/creative diagnosis | `ad_name`, `ad_id`, `creative_id`, `format`, `thumbnail`, `primary_text`, `headline`, `cta`, `spend`, `impressions`, `thumbstop/video metrics`, `ctr`, `cvr`, `cost_per_result`, `frequency`, `ranking diagnostics` |
| Attribution split | `actions`, `action_values`, `action_attribution_windows`, `1d_click`, `7d_click`, `1d_view`, `1d_engaged_view` or engage-through columns where exposed |
| Audience/customer | `new_customer`, `existing_customer`, custom breakdowns, age, gender, geo, placement, platform, device | 
| Placement quality | `publisher_platform`, `platform_position`, `impression_device`, `spend`, `cpm`, `ctr`, `results`, `cost_per_result`, `quality` |

### Events Manager / CAPI

| Decision | Useful fields or screens |
|---|---|
| Event integrity | Event match quality, event status, recent activity, diagnostics, event count trend, duplicate warning, missing parameter warning |
| Deduplication | Browser and server event counts, deduplicated events, shared `event_id`, event name consistency |
| Event semantics | Standard/custom event names, value, currency, content IDs, action source, event source URL, test event results |
| Server quality | CAPI latency, upload method, partner/gateway/direct integration, user_data fields, `fbp`, `fbc`, external ID |
| Offline/CRM | Offline event set, upload status, match rate, event time, action source, order/lead ID, event value |

### CRM / sales / lead ops

| Decision | Useful fields |
|---|---|
| Lead quality | `lead_id`, `created_at`, `campaign`, `ad_set`, `ad`, `form_id`, `source`, `utm_campaign`, `fbclid`, `fbc`, `fbp`, `lead_status`, `qualified_at`, `sql_at`, `opportunity_at`, `closed_won`, `revenue`, `lost_reason` |
| Conversion Leads readiness | CRM stage definitions, stage timestamps, 28-day stage conversion rates, monthly volume, upload cadence, event names |
| Sales process leakage | speed-to-lead, contact attempts, appointment rate, no-show rate, close rate by campaign/form/geo |
| Messaging leads | conversation started, qualified conversation, handoff to human, response time, drop-off point, booked call, closed-won |

### E-commerce backend / catalog

| Decision | Useful fields |
|---|---|
| Order reconciliation | `order_id`, `created_at`, `source`, `utm_campaign`, `fbclid/fbc`, revenue, discount, refund, tax/shipping, margin, customer type |
| Catalog eligibility | `item_id`, `retailer_id`, `content_id`, `title`, `description`, `image_link`, `price`, `availability`, `brand`, `gtin`, `product_type`, `google_product_category`, `custom_label_0-4`, diagnostics issue |
| Product economics | margin tier, inventory tier, bestseller/seasonality/custom labels, return rate, stock status, AOV |
| Feed matching | Pixel/CAPI `content_ids` vs catalog item IDs, event content type, product set membership |

### App / MMP

| Decision | Useful fields |
|---|---|
| Acquisition quality | installs, registrations, tutorial complete, subscriptions, purchases, retained users, D1/D7/D30 retention, LTV |
| Attribution | Meta-reported installs/events, MMP attributed events, SKAN/AAK postbacks, ATT opt-in status, modeled conversions |
| Event mapping | Meta SDK/MMP event names, app event IDs, revenue/currency, value optimization readiness |
| Re-engagement | audience definition, inactivity window, deep link, incrementality/holdout, returning user value |

---

## 3. Diagnostic sequence

Run these in order. Do not start with creative pruning if the account is optimizing to the wrong event.

### A. Measurement and reconciliation

| Signal in data | Likely meaning | Action |
|---|---|---|
| Meta conversions high, backend revenue flat | Existing-customer harvesting, VTC/engage-through inflation, duplicate/misfired events, attribution overlap | Segment attribution/customer type; reconcile order IDs; test incrementality |
| Conversions equal or nearly equal clicks/LPVs | Tag likely fires on page load or wrong trigger | Audit Pixel/CAPI event firing before changing bids |
| Browser and server events both high with duplicate warnings | Deduplication failure | Match event name and `event_id`; verify event time and source |
| CAPI events delayed | Server latency may weaken optimization/reporting | Fix queueing and send near real time where possible |
| Purchase values missing or inconsistent | ROAS/value optimization is unreliable | Fix value/currency semantics and document definition |
| CRM qualified leads far below raw leads | Delivery is learning cheap raw leads | Add form friction, import qualified stages, or use Conversion Leads when ready |
| Meta and MMP app installs differ materially | SKAN/AAK/modeling/date basis/attribution mismatch | Compare attribution basis before calling one source wrong |

### B. Budget, volume, and learning viability

| Signal in data | Likely meaning | Action |
|---|---|---|
| Ad set has far below practical learning volume | Delivery decisions are fragile | Consolidate, raise budget, or choose a validated higher-volume event |
| Budget/day below target CPA | Learning will be slow and noisy | Narrow structure, raise budget, or lower ambition only if economics allow |
| Spend spread across many low-volume ad sets | Fragmented learning | Consolidate around objective/economics/geo/compliance |
| Cost per result goal / ROAS goal underspends | Target too tight or signal too weak | Loosen target, return to highest volume, or fix signal before forcing control |
| Retargeting consumes large budget with high ROAS | Incrementality risk | Cap/holdout/reallocate to prospecting and measure blended outcome |

### C. Objective and traffic quality

| Signal in data | Likely meaning | Action |
|---|---|---|
| Traffic campaign has cheap clicks but no purchases | Objective mismatch | Use Sales for revenue; keep Traffic only for content/consideration with LPV quality KPIs |
| Engagement campaign has high reactions but no pipeline | Social proof is not a conversion signal | Use as upper/mid-funnel support; build handoff audience or switch to Leads/Sales |
| Lead campaign has cheap CPL and poor close rate | Form too easy, audience too broad, message mismatch, weak follow-up | Higher Intent, qualifier questions, CRM feedback, speed-to-lead fix |
| App campaign has low CPI and poor retention | Install event too shallow | Graduate toward app events/value and diagnose store/app onboarding |

### D. Creative and fatigue

| Signal in data | Likely meaning | Action |
|---|---|---|
| Frequency rises, CTR falls, CPA rises | Creative fatigue | Launch new concepts; do not only change budget/bid |
| Many active ads receive no spend | Too many similar ads or insufficient budget | Reduce active set and improve concept diversity |
| Quality/conversion ranking weak across ads | Offer/message/destination mismatch | Rebuild hooks, proof, qualification, and LP/form alignment |
| Reels/Stories spend but poor video retention | First seconds or vertical fit weak | Redesign 9:16 creative around hook, product, captions, safe zones |

### E. Destination and operations

| Signal in data | Likely meaning | Action |
|---|---|---|
| LPVs high, CVR low | Landing page/checkout/form issue | Audit mobile speed, offer match, proof, friction, tracking |
| Instant Form completion high, contact rate low | Low intent, fake/wrong data, slow follow-up | Higher Intent, custom questions, validation, CRM speed-to-lead |
| Click-to-message volume high, qualified conversations low | Bot/welcome flow or handoff quality problem | Add qualifying quick replies, human SLA, business-hours logic |
| Catalog ads underdeliver | Feed eligibility/matching/product set issue | Fix diagnostics, content IDs, availability, images, labels |

### F. Incrementality and attribution

| Signal in data | Likely meaning | Action |
|---|---|---|
| Platform ROAS high, blended revenue flat | Attribution capture, remarketing, existing-customer concentration | New/existing split, backend reconciliation, holdout |
| VTC or engage-through dominates conversions | Non-click credit may overstate causal effect | Report click/engage/view separately and test lift where material |
| Advantage+ Sales scales existing customers | Customer controls or exclusions insufficient | Define customer lists, use budget cap/control if available, or manual split |
| Re-engagement app campaign looks strong without holdout | Many users may have returned anyway | Use incrementality/holdout and retained value, not only reopens |

---

## 4. Report-specific reading guide

| Data artifact | First questions | Decisions it can support |
|---|---|---|
| Campaign table | Where is spend concentrated? Which objectives have meaningful event volume? | Budget shifts, objective correction, consolidation |
| Ad set table | Which ad sets are learning-limited, duplicated, too narrow, or underfunded? | Consolidation, audience controls, budget strategy |
| Ad/creative report | Which concepts drive spend and qualified outcomes? Is fatigue visible? | Creative refresh, concept expansion, ad pruning |
| Attribution breakdown | How much is click vs engage vs view? Did definitions change? | Reporting stance, incrementality need, finance reconciliation |
| Placement breakdown | Are cheap placements producing quality outcomes? | Placement controls, creative adaptation, quality diagnosis |
| Events Manager diagnostics | Are events duplicated, missing parameters, delayed, or low match? | Tracking fixes before media changes |
| Catalog diagnostics | Which products cannot serve or match events? | Feed fixes, product set strategy, catalog campaign diagnosis |
| CRM export | Which campaigns/forms produce qualified leads, opportunities, revenue, or junk? | Qualified lead import, form design, budget reallocation |
| App/MMP report | Which installs retain or monetize? How does SKAN/AAK differ? | Event-depth move, iOS/Android split, re-engagement tests |
| Change history | Did performance change after budget, bid, event, creative, or structure edits? | Stabilization window and rollback/hold decisions |

---

## 5. Prioritization model

Rank findings with this score. Prefer fixing high-spend, high-business-impact, high-confidence issues with low learning risk.

| Factor | Score 1 | Score 3 | Score 5 |
|---|---|---|---|
| Spend impact | Small tail | Noticeable | Top spend driver |
| Business impact | Cosmetic metric | CPA/ROAS movement | Revenue, pipeline, margin, tracking integrity |
| Evidence confidence | One screenshot/anecdote | Segmented platform data | Cross-source reconciliation |
| Fix effort | Multi-team project | Some implementation | Immediate account/feed/copy change |
| Learning risk | Resets major learning | Moderate | Low-risk guardrail or measurement fix |

Use this formula as a guide, not a rigid score:

```
Priority = (Spend impact + Business impact + Evidence confidence + Fix ease) - Learning risk
```

Apply fixes in this order by default:

1. Measurement integrity: duplicate/missing events, event semantics, CAPI dedup, CRM join, catalog matching.
2. Objective/event correction: Sales vs Traffic, Leads vs Engagement, raw lead vs qualified lead, install vs app value.
3. Waste controls: customer exclusions/caps, weak placements, invalid geos, disapproved/out-of-stock products, obvious low-quality lead paths.
4. Budget reallocation: move spend from weak-quality pockets to proven high-intent / high-margin / high-quality segments.
5. Destination and creative: LP, checkout, form, messaging flow, app store, catalog feed, concept quality.
6. Bidding and structure: bid strategy, targets, campaign splits/consolidation, Advantage+ vs manual.
7. Incrementality tests: retargeting, existing customers, VTC-heavy, Advantage+ Sales, app re-engagement.

---

## 6. Output format for data-driven diagnosis

When the user provides account data, return:

1. **Data reviewed** - source, date range, row grain, filters, attribution, and limitations.
2. **Data quality flags** - missing fields, date/attribution mismatch, suspicious totals, incomplete joins.
3. **Primary diagnosis** - 3-7 ranked findings with evidence.
4. **Decision table** - what to change, why, expected effect, stabilization window, and what not to change at the same time.
5. **Follow-up data needed** - only request data that would change the decision.

Example finding format:

| Priority | Evidence | Interpretation | Action | Avoid |
|---|---|---|---|---|
| P1: Lead-quality import | Meta shows 420 raw leads, CRM shows 28 SQLs and 3 opportunities; weak SQLs cluster in one form and placement | Bidding is learning cheap form fills, not qualified pipeline | Add Higher Intent/qualifying questions, sync qualified stage, shift budget to better form/ad set | Do not raise budget on raw CPL |
| P2: Dedup failure | Events Manager shows duplicate Purchase warnings and Pixel+CAPI counts both rising | Purchase totals may be inflated and learning unstable | Fix shared `event_id`, event names, and event time | Do not change bid strategy before tracking is fixed |
| P3: Existing-customer concentration | Advantage+ Sales ROAS is high but backend new-customer revenue is flat | Campaign may be harvesting existing demand | Define customer list, inspect new/existing split, cap/exclude where available, test holdout | Do not report platform ROAS as acquisition ROAS |

---

## 7. Volatile checks

Verify current Ads Manager/API behavior before hard-coding these into recommendations:

- Attribution columns and whether click-through, engage-through, and view-through are exposed in the user's reporting stack.
- Advantage+ Sales controls, existing-customer budget cap behavior, imported ads, and multi-ad-set limits.
- Advantage+ Leads eligibility and default-on behavior.
- Detailed Targeting exclusions and audience control availability.
- AEM web/app UI behavior and app attribution requirements.
- Threads, Audience Network, WhatsApp, Marketplace, Shops, and placement availability by objective/region.
- Teen targeting, Special Ad Category, and regional policy constraints.
