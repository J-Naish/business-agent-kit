# Account data diagnostics

Use this reference when the user provides account data for Google Ads improvement: CSV/XLSX exports, copied tables, screenshots, Looker Studio charts, Google Ads/GA4/CRM/Merchant Center reports, API extracts, or a written summary of metrics. The format matters less than the diagnostic job: identify what the data can prove, what it cannot prove, and which account changes deserve priority.

## Operating rules

- Diagnose from business outcome backward: revenue, qualified pipeline, retained users, booked jobs, or contribution margin before platform CPA/ROAS.
- Separate signal quality from traffic quality. Bad primary conversions make good traffic look bad and bad traffic look good.
- Do not trust one platform in isolation. Reconcile Google Ads with GA4, CRM/POS/app analytics, and Merchant Center where available.
- Use spend-weighted evidence. A tiny ad group with terrible CPA is less urgent than a campaign consuming 35% of spend with weak qualified outcomes.
- Avoid making bid, budget, goal, and structure changes at the same time. Data should produce an ordered action plan, not a pile of edits.
- Treat screenshots and summaries as directional. Ask for raw rows only when the decision depends on segmentation, joins, or exact totals.

---

## 1. Intake and data-quality check

Before analyzing performance, identify the dataset and its limits.

| Check | What to inspect | Why it matters |
|---|---|---|
| Source | Google Ads, GA4, CRM, Merchant Center, app/MMP, finance, call tracking, Looker | Determines attribution, date logic, and available joins |
| Date basis | Click/impression date, session date, conversion date, upload date, close date | Mismatched dates explain many discrepancies |
| Date range | Last 7/14/30/90 days, seasonality, conversion lag coverage | Short windows overreact to noise; long windows hide recent changes |
| Time zone / currency | Account timezone, CRM timezone, GA4 property timezone, local currency | Affects daily joins, CPA/ROAS, and pacing |
| Filters | Campaign type, campaign status, network, conversion action, channel, geo, device | Hidden filters can make the data non-representative |
| Attribution | Google Ads DDA/last click, GA4 paid channels vs paid+organic, CRM first/last touch | Determines whether source totals should match |
| Conversion definition | Primary vs secondary, key event vs Google Ads conversion, CRM stage | Defines what bidding is learning from |
| Row grain | Account, campaign, ad group, keyword, search term, product, LP, conversion action, lead | Determines which decisions are possible |

If the data is incomplete, still provide a diagnostic with a **Data limitations** section and separate "supported findings" from "needs confirmation."

---

## 2. Minimum useful fields by source

These are not mandatory columns; they are the practical fields needed to make strong decisions. If the user provides screenshots, look for the same concepts in visible columns.

### Google Ads performance

| Decision | Useful fields |
|---|---|
| Campaign health | `date`, `campaign`, `campaign_id`, `campaign_type`, `status`, `budget`, `bid_strategy`, `cost`, `impressions`, `clicks`, `ctr`, `avg_cpc`, `conversions`, `cost_per_conversion`, `conversion_value`, `roas`, `impression_share`, `lost_is_budget`, `lost_is_rank` |
| Search/query quality | `search_term`, `keyword`, `match_type`, `campaign`, `ad_group`, `cost`, `clicks`, `conversions`, `conversion_value`, `search_term_match_type`, `final_url` |
| Conversion signal | `conversion_action`, `conversion_category`, `primary_or_secondary`, `count`, `value`, `all_conversions`, `view_through_conversions`, `ad_event_type` |
| Landing page | `landing_page`, `expanded_landing_page`, `campaign`, `cost`, `clicks`, `conversions`, `conversion_rate`, `mobile_friendly_click_rate`, `valid_amp_click_rate` |
| P-MAX / Demand Gen | `channel`, `ad_event_type`, `asset_group`, `listing_group`, `search_theme`, `search_terms_insight`, `audience_signal`, `asset`, `asset_performance`, `cost`, `conversions`, `value` |
| Shopping / product | `item_id`, `product_title`, `brand`, `product_type`, `google_product_category`, `custom_label_0-4`, `product_status`, `cost`, `clicks`, `conversions`, `value`, `roas` |

### GA4 / web analytics

| Decision | Useful fields |
|---|---|
| Paid traffic quality | `date`, `session_source_medium`, `session_campaign`, `landing_page`, `device_category`, `sessions`, `engaged_sessions`, `engagement_rate`, `key_events`, `revenue` |
| LP diagnosis | `landing_page`, `query_string` if needed, `device_category`, `sessions`, `engagement_rate`, `key_event_rate`, `purchase_revenue`, `average_engagement_time` |
| Attribution reconciliation | Google Ads conversions created from GA4 key events, attribution setting, lookback window, paid channels vs paid+organic |

### CRM / sales / call tracking

| Decision | Useful fields |
|---|---|
| Lead quality | `lead_id`, `created_at`, `source`, `medium`, `campaign`, `gclid`, `gbraid`, `wbraid`, `utm_campaign`, `utm_term`, `landing_page`, `lead_status`, `qualified_at`, `sql_at`, `opportunity_created_at`, `closed_won`, `revenue`, `lost_reason` |
| Offline import readiness | click ID or user-provided data availability, conversion timestamp, conversion name, conversion value, upload status / error |
| Sales process leakage | speed-to-lead, contact attempts, appointment rate, no-show rate, close rate by campaign/query/geo/device |

### Merchant Center / feed

| Decision | Useful fields |
|---|---|
| Eligibility | `item_id`, `status`, `issue`, `destination`, `availability`, `price`, `sale_price`, `link`, `image_link`, `gtin`, `mpn`, `brand` |
| Feed quality | `title`, `description`, `product_type`, `google_product_category`, `condition`, shipping/returns annotations, promotions |
| Profit-aware optimization | `item_id`, margin tier, inventory tier, bestseller/seasonality/custom labels, return rate, stock status |

---

## 3. Diagnostic sequence

Run these in order. Do not start with keyword pruning if the account is bidding on the wrong conversion.

### A. Measurement and reconciliation

| Signal in data | Likely meaning | Action |
|---|---|---|
| Google Ads conversions high, CRM qualified leads low | Primary CV is too shallow, low-quality traffic, or sales handoff issue | Segment by campaign/query/LP; import qualified lead or stage values; move weak actions to secondary |
| Conversions equal or nearly equal clicks | Tag likely fires on click/page load instead of true conversion | Audit tag placement before changing bids |
| Google Ads and GA4 differ materially | Could be conversion delay, attribution model, lookback window, tag setup, date basis, or view-through/cross-device handling | Compare definitions before calling one wrong |
| Many secondary / micro actions in `All conv.` but few primary CVs | Engagement exists but bid signal is weak | Keep micro actions secondary; improve offer/LP or choose a deeper reliable primary |
| Offline conversions upload successfully but do not appear | Date range, time zone, count setting, processing delay, click ID/user data match issue | Check upload diagnostics and use click/impression date for reporting |
| No `gclid` / `gbraid` / `wbraid` / user-provided data in CRM | Offline quality cannot be fed back reliably | Fix capture before scaling lead-gen automation |

### B. Budget, volume, and learning viability

| Signal in data | Likely meaning | Action |
|---|---|---|
| Campaign has <10 true primary CV/month | Smart Bidding target decisions are fragile | Consolidate, use Max Clicks/manual or Max Conversions without tight target, or choose a validated deeper-volume signal |
| Budget/day is below target CPA | Learning will be slow and noisy | Narrow scope, raise budget, or lower bid ambition only if economics allow |
| Lost IS budget high on profitable Search/Shopping | Demand exists but budget caps delivery | Reallocate from lower-quality spend before raising total budget |
| Lost IS rank high with good CVR | Ad Rank / relevance / bid is limiting profitable volume | Improve QS drivers, assets, LP, and consider bid/target adjustment |
| Spend spread across many low-volume campaigns | Fragmented learning | Consolidate around goal/economics/geo/margin, not reporting neatness |

### C. Traffic relevance

| Signal in data | Likely meaning | Action |
|---|---|---|
| High spend search terms with 0 CV and low intent | Wasted demand capture | Add negatives, tighten match/AI Max controls, rewrite ad to qualify |
| Search terms convert but not as current keywords | New demand pattern | Add as keyword/theme, align RSA/LP, protect with negatives |
| Broad / AI expansion drives weak terms | Automation has weak guardrails or bad signal | Add negatives, URL exclusions, brand controls; avoid disabling automation until signal is fixed |
| High CTR but low CVR | Ad attracts curiosity or low-fit users | Add qualification, price/service-area clarity, stronger LP match |
| Low CTR and low CVR | Wrong audience/query/message | Rebuild targeting and copy around buyer intent |
| Low CTR but strong CVR | Niche high-intent traffic | Improve ad relevance, but do not over-optimize away quality |

### D. Landing page / destination

| Signal in data | Likely meaning | Action |
|---|---|---|
| High clicks, low CVR on one LP across campaigns | Destination bottleneck | Fix offer clarity, load speed, mobile UX, form/checkout, proof, message match |
| Mobile traffic underperforms desktop materially | Mobile UX, speed, form friction, click-to-call gap | Audit mobile LP and consider device-specific budget only after UX review |
| LP engagement low but query intent good | Page fails the promise | Align first view with query/ad; reduce friction; add proof and CTA |
| P-MAX/AI Max sends traffic to weak URLs | URL expansion issue | Add URL exclusions or constrain final URL expansion |

### E. Creative / asset quality

| Signal in data | Likely meaning | Action |
|---|---|---|
| Asset groups contain many similar text variants | Weak concept diversity | Build distinct angles: pain, outcome, proof, offer, objection, qualification |
| Demand Gen/Video has spend but low engagement | Hook/format mismatch | Rebuild first 1-3 seconds, vertical/square variants, product-in-use, proof |
| P-MAX has no video or weak image coverage | Inventory limited or auto-generated assets may dominate | Add real videos/images by asset-group theme |
| RSA assets generic and ad relevance weak | Query-message mismatch | Rewrite by intent theme and buyer language |

### F. Product / feed / margin

| Signal in data | Likely meaning | Action |
|---|---|---|
| Products not eligible or eligible limited | Feed/policy/account issue suppresses delivery | Fix Merchant Center diagnostics before bidding changes |
| High spend, low ROAS SKUs | Product economics or page competitiveness weak | Segment/exclude, adjust targets, improve price/shipping/LP, or pass margin-aware values |
| Low-margin products dominate ROAS | Revenue value hides profit problem | Add margin custom labels or pass contribution value |
| Bestsellers receive too little spend | Campaign/listing group or target constraint | Segment into asset group/campaign if volume supports it |
| Out-of-stock products get traffic | Feed availability mismatch | Fix feed sync and add inventory guardrails |

### G. Incrementality and attribution

| Signal in data | Likely meaning | Action |
|---|---|---|
| Brand campaign / P-MAX ROAS high but total revenue flat | Brand capture, remarketing bias, or attribution inflation | Separate brand/non-brand; use brand exclusions; compare blended business outcome |
| VTC or impression ad-event type dominates reported CV | Non-click credit may overstate causal effect | Report click/EVC/VTC separately and test lift where material |
| Demand Gen direct CPA weak but brand search/remarketing grows | Assisted demand may be present | Evaluate blended CPA, search lift, audience growth, and holdout feasibility |
| Platform ROAS conflicts with finance margin | Revenue values omit COGS/returns/discounts | Use contribution ROAS or margin-aware value |

---

## 4. Report-specific reading guide

| Data artifact | First questions | Decisions it can support |
|---|---|---|
| Campaign table | Where is spend concentrated? Which campaigns have meaningful CV volume? Which are limited by budget/rank? | Budget shifts, consolidation, bid-target changes |
| Search terms / search terms insights | Which terms spend without qualified outcomes? Which converting terms deserve more coverage? | Negative keywords, keyword additions, AI Max/broad guardrails |
| Conversion action segment | Which actions drive `Conversions` vs `All conv.`? Are weak actions primary? | CV redesign, primary/secondary cleanup |
| Landing pages report / GA4 LP table | Which pages receive paid traffic and fail to engage/convert? Is mobile the issue? | LP fixes, URL exclusions, final URL strategy |
| Auction insights / impression share | Is lost volume caused by budget, rank, or competitor pressure? | Raise/reallocate budget, improve relevance, adjust targets |
| Quality Score components | Is the issue expected CTR, ad relevance, or LP experience? | Copy/ad-group/LP prioritization; not a KPI target |
| P-MAX channel report | Which channels, ad formats, and ad event types drive spend and CV? | Asset/feed/channel diagnosis, reporting skepticism, experiments |
| Asset report | Which concepts are learning and which are dead weight? | Creative refresh and concept expansion |
| Product diagnostics / Products table | Which products cannot serve or spend inefficiently? | Feed fixes, listing-group/asset-group segmentation |
| CRM pipeline export | Which campaigns produce SQLs, opportunities, revenue, or junk leads? | Offline import, value rules, query/audience/LP cleanup |
| Change history | Did performance change after budget, bid, goal, feed, or asset edits? | Stabilization window and rollback/hold decisions |

---

## 5. Prioritization model

Rank findings with this score. Prefer fixing high-spend, high-business-impact, high-confidence issues with low learning risk.

| Factor | Score 1 | Score 3 | Score 5 |
|---|---|---|---|
| Spend impact | Small tail | Noticeable | Top spend driver |
| Business impact | Cosmetic metric | CPA/ROAS movement | Revenue, pipeline, margin, or tracking integrity |
| Evidence confidence | One screenshot / anecdote | Segmented platform data | Cross-source reconciliation |
| Fix effort | Multi-team project | Some implementation | Immediate account/feed/copy change |
| Learning risk | Resets major learning | Moderate | Low-risk guardrail or measurement fix |

Use this formula as a guide, not a rigid score:

```
Priority = (Spend impact + Business impact + Evidence confidence + Fix ease) - Learning risk
```

Apply fixes in this order by default:

1. Measurement integrity: primary CV, duplicate/missing tracking, CRM join, feed eligibility.
2. Waste controls: irrelevant search terms, excluded/weak URLs, disapproved/out-of-stock products, obvious placement/audience waste.
3. Budget reallocation: move spend from weak-quality pockets to proven high-intent / high-margin / high-quality segments.
4. Destination and creative: LP, feed title/image/price, RSA and asset-group concept quality.
5. Bidding and structure: targets, campaign splits/consolidation, P-MAX/Demand Gen expansion.
6. Incrementality tests: brand, remarketing, VTC-heavy, P-MAX overlap, Demand Gen assist.

---

## 6. Output format for data-driven diagnosis

When the user provides account data, return:

1. **Data reviewed** — source, date range, row grain, filters, and limitations.
2. **Data quality flags** — missing fields, date/attribution mismatch, suspicious totals, incomplete joins.
3. **Primary diagnosis** — 3-7 ranked findings with evidence.
4. **Decision table** — what to change, why, expected effect, stabilization window, and what not to change at the same time.
5. **Follow-up data needed** — only request data that would change the decision.

Example finding format:

| Priority | Evidence | Interpretation | Action | Avoid |
|---|---|---|---|---|
| P1: Lead-quality import | Search and P-MAX show 180 form CVs, CRM shows 14 SQLs and 2 opportunities; weak SQLs cluster in broad non-brand queries | Bidding is learning cheap form fills, not qualified pipeline | Import qualified lead / opportunity as primary or value signal; add query and LP qualification | Do not raise budget or loosen tCPA until quality signal is fixed |
| P2: Search term waste | 22% of Search spend in 90 days went to informational terms with 0 qualified leads | Traffic relevance leak | Add negatives, split high-intent exact/phrase, review AI Max/broad expansion | Do not pause the whole campaign if high-intent terms still work |
| P3: Product eligibility | 18% of high-margin SKUs are Not eligible / Eligible limited in diagnostics | Feed suppresses profitable inventory | Fix Merchant Center issues, GTIN/availability/price mismatch, then segment high-margin labels | Do not judge Shopping/P-MAX until feed coverage is restored |

---

## 7. Source notes to verify volatile claims

Use official Google documentation for platform behavior when possible:

- Search terms report: https://support.google.com/google-ads/answer/2472708?hl=en
- Negative keyword ideas from search terms: https://support.google.com/google-ads/answer/7102466?hl=en
- Primary and secondary conversion actions: https://support.google.com/google-ads/answer/11461796?hl=en
- Conversion goals and campaign goal behavior: https://support.google.com/google-ads/answer/10995103?hl=en
- Google Ads data discrepancies: https://support.google.com/google-ads/answer/7457111?hl=en
- Offline conversion import discrepancies: https://support.google.com/google-ads/answer/13321563?hl=en
- Landing page report: https://support.google.com/google-ads/answer/7543502?hl=en
- Quality Score components: https://support.google.com/google-ads/answer/6167118?hl=en
- Auction insights: https://support.google.com/google-ads/answer/2579754?hl=en
- P-MAX channel performance: https://support.google.com/google-ads/answer/16260130?hl=en
- Product diagnostics: https://support.google.com/google-ads/answer/12097493?hl=en
- Merchant Center issues: https://support.google.com/merchants/answer/12153802?hl=en
- Shopping/P-MAX custom labels: https://support.google.com/google-ads/answer/6275295?hl=en
- Enhanced conversions for leads / offline imports: https://support.google.com/google-ads/answer/14274408?hl=en
- Google Ads Data Manager with enhanced conversions for leads: https://support.google.com/google-ads/answer/15707550?hl=en

Non-official audit patterns can inform prioritization, but treat them as heuristics. Useful practitioner references include Optmyzr PPC audit documentation and WordStream Google Ads audit / wasted-spend analyses.
