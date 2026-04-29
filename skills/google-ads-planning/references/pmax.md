# P-MAX (Performance Max) operating manual

## Operating practice

Performance Max amplifies the quality of the inputs you give it: conversion goals, values, feed, creative, audience signals, landing pages, and exclusions. It is not a substitute for strategy.

### What matters most

- **Measurement quality decides the campaign's direction.** P-MAX will aggressively optimize toward the selected primary goals. For lead gen, use Enhanced Conversions for leads and offline conversion imports when lead quality varies by query, geo, device, or audience.
- **Consolidate for learning; split for control.** Split P-MAX only when the business needs separate budget, target CPA/ROAS, margin, geo/language, customer type, store goal, or product ownership. Splitting just to see cleaner reports often starves the model.
- **Asset groups should be coherent business themes.** One asset group should connect a product/service theme, audience signal, landing page, message, images, and videos. A generic "all products/all services" asset group usually weakens learning and creative relevance.
- **Audience signals guide; they do not target.** Customer Match, remarketing, custom segments, and search themes are starting hints. Do not promise the user that P-MAX will stay inside those audiences.
- **Brand and URL controls are strategy controls.** Use brand exclusions when brand capture hides non-brand performance. Use URL exclusions or disable Final URL expansion when the site contains informational, support, hiring, or low-intent pages.
- **Feed quality is creative quality for retail.** Product titles, images, prices, availability, GTINs, product_type, and custom labels often move performance more than campaign switches.
- **P-MAX ROAS needs skepticism.** Reported performance can be inflated by brand traffic, remarketing bias, modeled conversions, and VTC. Use Search terms insights, brand exclusions, experiments, geo tests, or customer holdouts when decisions are material.

- **P-MAX is rarely one thing.** It can behave like Shopping, remarketing, brand Search, Display, YouTube, or prospecting depending on feed, assets, signals, and goals. Diagnose channel mix and query/category insights before making strategy claims.
- **Brand exclusions are not just cleanup; they are incrementality controls.** Use them when P-MAX is taking credit for demand that Search or organic would capture anyway.
- **URL expansion is powerful on strong commercial sites and dangerous on messy sites.** Keep it on when many landing pages are commercially useful; turn it off or exclude aggressively when the site has blog/support/careers/low-intent pages.
- **Asset-group reporting is directional.** Use asset groups to express coherent themes, but do not over-read noisy asset-group performance as clean A/B truth.
- **Large simultaneous changes create avoidable volatility.** Avoid changing budget, target, conversion goals, URL expansion, brand controls, and asset groups in one move unless the campaign is fundamentally wrong.
- **Feed-only P-MAX can be valid.** For asset-poor, SKU-heavy, or highly utilitarian catalogs, feed-led delivery may outperform weak generic creative. Full assets are not automatically better if the assets dilute purchase intent.
- **New-customer acquisition mode needs clean definitions.** Use it only when customer lists and new/existing customer values are reliable; otherwise it can distort bidding.

### Diagnosis

| Symptom | First checks | Likely action |
|---|---|---|
| High reported ROAS but weak business lift | Brand capture, remarketing share, VTC ratio, incremental revenue | Add brand exclusions, separate reporting, run experiment/holdout |
| Low-quality leads | Primary CV action, offline imports, URL expansion, lead form quality | Import qualified leads, remove weak primary goals, exclude weak pages |
| Low spend | Policy/feed issues, target too tight, budget too small, weak assets | Relax target, fix eligibility, broaden products/assets, consolidate |
| Good products starved | Listing groups, product performance, margin/priority labels | Isolate long-tail or strategic SKUs, use custom labels |
| Asset group noise | Too many themes in one group or too many tiny groups | Rebuild around coherent themes with full asset coverage |

### Common traps

- Launching with one thin generic asset group and expecting automation to invent positioning.
- Using audience signals as if they are strict targeting.
- Mixing brand, remarketing, and prospecting results into one success story.
- Optimizing to raw leads when sales quality varies.
- Changing budget, tROAS/tCPA, conversion goals, and asset groups all at once.

Terms used across playbooks live in [SKILL.md glossary](../SKILL.md#common-google-ads-glossary).

## Decision matrix

When and how to deploy P-MAX.

### Adoption decision

| Condition | Decision | Reason |
|------|------|------|
| 30+ monthly CVs (account-wide) | Consider adopting | A practical baseline for more stable learning |
| 50+ monthly CVs | Adopt with confidence | Stable optimization is realistic |
| Under 10 monthly CVs | Too early | Insufficient learning data. Build CV history with Search first |
| No Search campaign yet | Run Search first | P-MAX leverages your existing campaigns' CV data |

### How many campaigns to run

| Monthly CVs (account-wide) | Recommended P-MAX campaigns | Notes |
|---------------------------|----------------------|------|
| 30–50 | 1 campaign | Concentrate data for max learning efficiency |
| 50–150 | 1–2 campaigns | Consider splitting brand vs. non-brand |
| 150+ | 2–4 campaigns | Split by category, margin tier, or customer type |

### Design approach by business type

| Business type | Campaign structure | Asset approach | Notes |
|--------------|----------------|------------|---------|
| E-commerce (small catalog) | 1 campaign / 2–3 AGs | Full assets recommended | Feed optimization is the most important lever |
| E-commerce (large catalog) | 2–4 campaigns (by category / margin) | Feed-only or full assets | Use custom labels to segment products |
| B2B lead-gen | 1–2 campaigns | Full assets required | Recommend URL expansion OFF — prevents traffic to blogs etc. |
| B2C lead-gen | 1–2 campaigns | Full assets required | Use demographic exclusions strategically |
| Store visits | P-MAX for Store Goals | Full assets recommended | Google Business Profile integration required |

---

## Quickstart

The shortest path for a first-time P-MAX launch. Refer to detailed sections below.

### Pre-launch readiness

| Check | Required / recommended | If not met |
|------------|---------|----------|
| CV tracking is accurate | Required | Set up CV tracking first (see [§9](#9-conversion-measurement-optimization)) |
| Enhanced Conversions implemented | Strongly recommended | Improves measurement accuracy |
| 30+ monthly CVs (account-wide) | Strongly recommended | Below this, expect slower and less stable learning. Build CV history via Search first when possible |
| Search campaign already running | Strongly recommended | Needed for brand-KW control and cannibalization monitoring |
| Product feed optimized (e-commerce) | Required (e-commerce) | See [shopping-ads.md](shopping-ads.md) |
| Offline-CV import in place (lead-gen) | Recommended | Build CRM integration to capture GCLID |

### Launch steps

| Step | Action | Reference |
|---------|----------|-------|
| 1. Decide structure | Set the number of campaigns and AGs (start with 1 campaign and 1–3 AGs) | [§2](#2-campaign-structure-design) |
| 2. Build assets | Text (11+ headlines, 4+ descriptions), images (5+ landscape, 5+ square), video (1+ landscape, 1+ vertical) | [§4](#4-asset-specs-and-submission-requirements) |
| 3. Set audience signals | Customer Match list + In-market segments | [§5](#5-audience-signals) |
| 4. Search themes | 8–12 themes | [§6](#6-search-themes-and-url-expansion) |
| 5. Exclusions | Brand exclusion + irrelevant-KW negatives + URL exclusion rules (URL expansion OFF for lead-gen) | [§7](#7-negative-keywords-and-brand-exclusion) |
| 6. Bidding | Start with Maximize Conversions or Maximize Conversion Value (no constraint) | [§8](#8-bid-strategy) |
| 7. Budget | 3–5× target CPA/day when possible; 1–3× for narrow tests | [§8](#8-bid-strategy) |
| 8. Go live | Activate the campaign | — |

### First two weeks (learning period)

| Do | Don't |
|---------|------------|
| Check budget pacing daily | Change the bid strategy |
| Watch for anomalous spend patterns | Increase or decrease the budget |
| Review the search-terms report (only exclude clearly irrelevant terms) | Bulk-replace assets |
| Review the channel report (for trend awareness only) | Add tCPA / tROAS constraints |

### Weeks 3–6 (stabilization → optimization)

| Decision | Condition | Action |
|------|------|----------|
| Migrate to tCPA / tROAS | 30+ monthly CVs is stable | Set targets from trailing-30-day actuals (see [§8-3](#8-bid-strategy)) |
| Add an AG | Existing AGs have 20+ monthly CVs | Add an AG for a new category / target |
| Improve assets | Some assets are rated "Low" | Replace "Low" assets |
| Add negative KWs | Search-terms report reveals irrelevance | Exclude strategically — by category, not single terms |

---

## 1. Major updates 2025–2026

> Beta-feature availability differs by account, country, and timing. Verify in the Google Ads UI before implementation.

| When | Update |
|------|----------------|
| Jan 2025 | Self-service campaign-level negative keywords for Search and Shopping inventory ([Google Ads Help](https://support.google.com/google-ads/answer/15726455?hl=en)) |
| Jan 2025 | Age-based demographic exclusion beta ([campaign settings Help](https://support.google.com/google-ads/answer/15864837?hl=en)) |
| Mar 2025 | Search-terms report introduced for Search and Shopping inventory ([P-MAX evaluation Help](https://support.google.com/google-ads/answer/16279166?hl=en)) |
| May 2025 | Channel performance report introduced ([Google Ads Help](https://support.google.com/google-ads/answer/16260130?hl=en)) |
| Jul 2025 | Gender-based demographic exclusion beta ([campaign settings Help](https://support.google.com/google-ads/answer/15864837?hl=en)) |
| Aug 2025 | Demographic-exclusion consolidation: age and gender managed together ([campaign settings Help](https://support.google.com/google-ads/answer/15864837?hl=en)) |
| 2025 | Strengthened asset auto-generation via Gemini |
| 2025 | Asset-level impressions / clicks / cost data added |
| 2025 | Shared negative-keyword list support ([negative keyword lists Help](https://support.google.com/google-ads/answer/2453983?hl=en)) |
| 2025 | High-Value New Customer Mode rollout |
| 2025 | Option to allow Shopping ads on searches that mention excluded brands ([brand exclusions Help](https://support.google.com/google-ads/answer/14505308?hl=en-419)) |
| Nov 2025 | Waze ad inventory added (US-only, Store Goals only) |
| Nov 2025 | Search Partners added to channel report |
| Jan 2026 | P-MAX asset testing through optimization experiments ([Google Ads Help](https://support.google.com/google-ads/answer/16030588?hl=en-EN)) |
| Jan 2026 | Channel-level reporting in the Google Ads API ([API release notes](https://developers.google.com/google-ads/api/docs/release-notes)) |
| Feb 2026 | Search Partners placement visibility |
| Feb 2026 | Parked domains (AdSense for Domains) permanently removed from the Search Partners network |

---

## 2. Campaign structure design

### 2-1. Structural principles

Think of P-MAX in three layers.

```
Account
 └── Campaign  (the unit for budget, bid strategy, geo, negatives)
      └── Asset group  (the unit for creative, audience signals, search themes)
           └── Listing group  (filter on the product feed — for e-commerce)
```

**Split into separate campaigns when:**
- Different budget allocations are required
- Different bid strategies are required (tCPA vs. tROAS)
- Different geo-targeting is required
- Different negative-KW strategies are required

**Split into separate asset groups when:**
- Different product categories / service lines
- Different audience segments
- Different creative themes / messaging

> **Principle: when in doubt, fewer campaigns and more asset groups.** Split campaigns once data is sufficient. Each campaign needs at least 30+ monthly CVs as a baseline.

### 2-2. E-commerce campaign-structure patterns

| Pattern | Structure | Suited to |
|---------|------|----------|
| Simple | 1 campaign / 1–3 AGs | 30–100 monthly CVs. Small catalog |
| Category split | 2–3 campaigns / 2–3 AGs each | 100+ monthly CVs. Margin varies materially across categories |
| Margin split | 3 campaigns by high / mid / low margin | tROAS operation. Wide product-margin spread |
| Brand vs. non-brand | 2 campaigns: branded queries / generic | When you want brand budget and ROAS managed independently |

### 2-3. Lead-gen campaign-structure patterns

| Pattern | Structure | Suited to |
|---------|------|----------|
| Simple | 1 campaign / 2–3 AGs (per service) | 30–50 monthly CVs. Few service lines |
| Service split | 2 campaigns: service A / service B | When CPA targets differ across services |
| Funnel split | High-intent (CV = inquiry) / low-intent (CV = whitepaper download) | When you want different bid strategies per CV type |

### 2-4. Campaign settings checklist

| Setting | Recommendation | Notes |
|---------|---------|------|
| Goal | Sales / Leads | Match to business goal |
| Bid strategy | Value-led → tROAS / Volume-led → tCPA | See [§8](#8-bid-strategy) |
| Budget | 3–5× target CPA per day when possible | 1–3× can work for narrow tests; below 1× is usually too slow |
| Geo | Target locations explicit | Recommend "Presence" only |
| Language | Target languages explicit | |
| Ad schedule | As needed | Default is 24/7 |
| URL expansion | On / off based on goal | See [§6](#6-search-themes-and-url-expansion) |
| Brand exclusion | As needed | See [§7](#7-negative-keywords-and-brand-exclusion) |
| New customer acquisition | Enable as needed | See [§12](#12-new-customer-acquisition-mode) |

---

## 3. Asset-group design

### 3-1. Basics

An asset group contains:

| Element | Description |
|------|------|
| Text assets | Headlines, long headlines, descriptions, business name, display URL path |
| Image assets | Landscape, square, portrait images, plus logo |
| Video assets | YouTube videos (landscape, vertical, square) |
| Audience signals | Hints about your target user |
| Search themes | Search-intent themes (max 25 per AG) |
| Final URL | The destination page after click |
| Listing group | Filter selecting which products are eligible (e-commerce) |

### 3-2. Splitting strategy

| Approach | Description | Suited to |
|---------|------|----------|
| By category | Mirrors your main site categories | Easy to manage. General-purpose |
| By target | Persona / segment | Apparel, beauty, and other segment-driven categories |
| By messaging | Price-led / quality-led / convenience-led | When you want creative-A/B tests |
| By promotion | Sale / seasonal pushes | Time-limited offers without disrupting evergreen AGs |

### 3-3. Asset-group rules

| Rule | Reason |
|-------|------|
| Maintain 20+ monthly CVs per AG | Minimum data for learning |
| Consolidate AGs with under 5 CVs | Insufficient data for AI to optimize |
| Start with 1–3 AGs | Over-segmentation fragments data |
| Avoid product / target overlap between AGs | Confuses learning |
| Register every asset type (text + image + video) | Required to serve on every channel |
| Aim for "Good" or better Ad Strength, and improve toward "Excellent" when practical | Better asset coverage can improve eligibility and delivery quality |

---

## 4. Asset specs and submission requirements

Use [creative-strategy.md](creative-strategy.md#p-max-asset-baseline) for production specs. Strategy rules stay here:

- Text: supply 11+ headlines and 4+ descriptions with distinct angles, not paraphrases.
- Images: cover landscape and square at minimum; add portrait when mobile visual inventory matters.
- Video: provide at least one landscape and one vertical video. Avoid relying on auto-generated videos.
- Retail: feed quality and custom labels matter as much as uploaded creative.
- Each asset group should have enough format coverage to serve across channels while staying coherent with the asset group's product/service theme.

---

## 5. Audience signals

### 5-1. What signals are

Audience signals are not targeting — they are hints. They tell Google's algorithm what your ideal prospects look like. P-MAX bootstraps from the signal and then auto-expands beyond it.

### 5-2. Signal types and priority

| Priority | Signal | Description | How to set |
|-------|-------------|------|---------|
| Highest | Customer Match | List of existing customers' email addresses | Upload a Customer Match list |
| High | Website visitors | Remarketing list | Google Ads audience list |
| High | YouTube viewers | Subscribers / video viewers | YouTube linking |
| Medium | In-market | Users in active purchase consideration in a category | Pick from Google's predefined segments |
| Medium | Custom segment | Built from search terms or URLs visited | Define with KWs / URLs |
| Low | Affinity | Interest categories | Pick from Google's predefined segments |
| Low | Life events | Marriage, moving, new job | Pick from Google's predefined segments |
| Low | Demographic | Age, gender, household income, parental status | Set basic attributes |

### 5-3. Signal design rules

| Rule | Reason |
|-------|------|
| Prioritize Customer Match | The strongest signal — ideal as the AI's starting point |
| Combine multiple signal types per AG | Multi-angle signals improve learning quality |
| Understand signals are hints, not constraints | Google will expand beyond them |
| Avoid lists that are too small | 1,000+ users is the recommended minimum |
| Use distinct signals per AG | Same signal across multiple AGs fragments data |

---

## 6. Search themes and URL expansion

### 6-1. Search themes

Search themes guide P-MAX's Search-channel delivery. Unlike Search-campaign keywords, themes are starting points the AI auto-expands from.

| Item | Spec |
|------|------|
| Cap | 50 themes per asset group |
| Behavior | In addition to AI-predicted matching, also expands to terms within the specified themes (additive) |
| Match types | None — the AI auto-expands to related terms |

**Design rules:**
- 8–12 themes is the recommended count
- Include your main service names, product categories, and the search terms your customers use
- Reference high-performing KWs from your Search campaign as inspiration
- Don't list competitor brand names (conflicts with brand exclusion)
- Think in "themes", not "keywords" — don't use an exact-match mindset

### 6-2. URL expansion (Final URL Expansion)

URL expansion is on by default. Google routes traffic to LPs other than the specified Final URL based on the search query ([Google Ads Help](https://support.google.com/google-ads/answer/14337539?hl=en)).

| Setting | Behavior | When to use |
|------|------|----------|
| ON (default) | Google picks the best LP automatically; generates dynamic headlines / descriptions | E-commerce sites with many product pages |
| OFF | Routes only to the specified Final URL | Lead-gen, where you want a specific LP |
| ON + URL exclusion rules | Auto-selection on, with specific paths excluded | E-commerce that wants to block traffic to /blog, /careers, etc. |

**Risks and mitigations:**

| Risk | Mitigation |
|-------|------|
| Routing to non-CV pages (blog posts, privacy policy) | Add URL exclusion rules for /blog/, /privacy/, /careers/, etc. |
| Ads showing on unintended brand pages | Add URL exclusion rules |
| Loss of LP-message match (also breaks LP A/B-test designs) | For lead-gen, recommend URL expansion OFF |

---

## 7. Negative keywords and brand exclusion

### 7-1. Negative keywords

P-MAX supports self-managed campaign-level negative keywords for Search and Shopping inventory ([Google Ads Help](https://support.google.com/google-ads/answer/15726455?hl=en)). Shared negative-keyword lists are also supported ([negative keyword lists Help](https://support.google.com/google-ads/answer/2453983?hl=en)).

| Item | Spec |
|------|------|
| Cap | 10,000 negative keywords per campaign |
| Shared lists | Supported (apply to multiple P-MAX campaigns at once) |
| Scope | Primarily affects Search and Shopping channels (no effect on Display, YouTube, etc.) |

> Account-level negatives remain capped separately at 1,000. Verify the current UI before large bulk operations because limits can change.

**Negative-keyword strategy:**

| Category | Examples to exclude |
|---------|------------|
| Irrelevant terms | jobs, careers, salary, reviews (when not driving CV) |
| Competitor names | When deliberately not bidding on competitor terms |
| Information-only | "what is", "how to", "comparison" (when not driving CV) |
| Negative connotation | "worst", "scam", "cancel" |

> **Don't over-exclude.** Reflexively excluding every non-CV query narrows the AI's exploration space and costs you new-customer discovery. The right approach is strategic, category-level exclusion.

### 7-2. Brand exclusion

Brand exclusion prevents your ads from showing on queries that include specific brand names ([Google Ads Help](https://support.google.com/google-ads/answer/16669487?hl=en)).

| Setting | Effect | When to use |
|------|------|----------|
| Own-brand exclusion | Prevents P-MAX from absorbing your brand searches | When already running brand KWs in a Search campaign |
| Competitor-brand exclusion | Prevents ads on competitor names | When you've decided not to target competitor terms |
| Shopping-only exclusion | Apply brand exclusion to text ads only — Shopping ads still serve on brand searches | E-commerce that wants Shopping to capture branded traffic (2025+) |

---

## 8. Bid strategy

### 8-1. Available bid strategies

P-MAX supports four bid strategies.

| Strategy | Optimizes for | When to use |
|---------|----------|----------|
| Maximize Conversions | CV count | Initial launch, data-accumulation phase |
| Target CPA (tCPA) | CV count (with cost constraint) | Lead-gen with uniform CV value |
| Maximize Conversion Value | CV value (revenue) | E-commerce, data-accumulation phase |
| Target ROAS (tROAS) | CV value (with ROAS constraint) | E-commerce with sufficient CV history |

### 8-2. How to choose

```
Does CV value vary by product?
├── Yes (e-commerce, etc.)
│   ├── 50+ monthly CVs → tROAS
│   └── Under 50 monthly CVs → Maximize Conversion Value (no tROAS constraint)
└── No (lead-gen with uniform CV value)
    ├── 30+ monthly CVs → tCPA
    └── Under 30 monthly CVs → Maximize Conversions (no tCPA constraint)
```

### 8-3. Bid-strategy design rules

| Rule | Reason |
|-------|------|
| Start with no constraint ("Maximize"-family) | Don't constrain learning; prioritize data accumulation |
| Set tCPA / tROAS targets from actuals | Anchor on observed performance, not aspirational targets |
| Start tROAS at 80–90% of trailing-30-day actual ROAS | Tight constraints crash delivery volume |
| Start tCPA at 110–120% of trailing-30-day actual CPA | Same |
| Change targets in 10–20% steps | Large changes reset learning |
| Don't change bid and budget at the same time | Confuses learning — change one at a time and measure |
| Allow 2–4 weeks of learning after a change | Repeat changes before stabilization makes learning permanently unstable |

### 8-4. Budget design

| Item | Recommendation | Notes |
|------|------|------|
| Floor | 1× target CPA | Below this, learning is extremely slow and budget pacing can hide demand |
| Narrow-test range | 1–3× target CPA per day (e.g., $50 CPA → $50–$150 / day) | Works when structure is tight and expectations are modest |
| Healthy range | 3–5× target CPA per day | Practical starting point for steadier learning and faster readout |
| Scale / fast-learning range | 5–10×+ target CPA per day | Use when economics allow and the campaign has enough audience/feed/creative depth |
| Budget increases | Up to 20% every 7–14 days | Sudden hikes reset learning |
| Budget decreases | Up to 15% every 7–14 days | Sudden cuts destabilize delivery |

---

## 9. Conversion-measurement optimization

### 9-1. Why CV measurement matters in P-MAX

CV data is P-MAX's only learning signal. The quality of your CV definitions and tracking translates directly into campaign quality.

### 9-2. CV-measurement design rules

| Rule | Reason |
|-------|------|
| Limit optimization-target CVs to actual business outcomes | Including low-intent actions (PDF downloads, newsletter signups) makes the AI mass-produce them |
| Implement Enhanced Conversions where eligible | Improves measurement resilience and gives Smart Bidding cleaner first-party signals |
| Set CV value accurately (e-commerce: dynamic; lead-gen: lead-score-based) | CV-value accuracy directly determines tROAS accuracy |
| Use data-driven attribution when appropriate | Helps credit non-last-click touchpoints when the account has meaningful assist paths |

### 9-3. Click-based, engaged-view, and view-through CV

> See SKILL.md "VTC unified policy" as well. P-MAX is heavily affected by non-click attribution, but standard P-MAX does not normally put plain VTC in the primary Conversions column. The practical risk is mixing click, EVC, store-goal VTC, brand, remarketing, and modeled conversions into one success story.

P-MAX includes engaged-view conversions (EVC) for eligible video engagement in Conversions. Standard view-through conversions (VTC: impression without click or engagement) are usually reporting-only, except for P-MAX Store Goals. High non-click share can overstate causal impact even when the reporting is technically correct.

| Metric | Description | Caveat |
|------|------|-------|
| Click-through CV | Click → CV | Strongest direct-response signal |
| Engaged-view CV | Meaningful video view → CV | Biddable for supported P-MAX video inventory, but still non-click |
| View-through CV | Impression but no click/engagement → CV | Usually reporting-only for standard P-MAX; biddable for Store Goals |

**Mitigation (advanced):**
- Segment conversions by ad event type: Clicks, Interactions / Engaged-view, and Impression.
- If non-click contribution is distorting decisions, create a click-prioritized reporting view or campaign experiment; do not blindly remove useful EVC from bidding.
- For Store Goals, compare store visits / store sales against POS or store-level revenue before scaling from VTC-heavy results.
- This is an advanced technique: start with defaults, monitor event mix, and decide from there.

**How to validate in your account:**
1. Use Segment → Conversions → Ad event type to separate clicks, engaged views, and impressions.
2. Use the channel performance report to see whether Search, Shopping, YouTube, Display, Discover, Gmail, Maps, or Search partners are driving the event mix.
3. If impression-attributed CVs are material, compare against backend revenue, store sales, or a holdout before raising budget.
4. Record CPA / ROAS / CV count before and after major goal or attribution-view changes to assess real improvement.

### 9-4. Offline CV import

For lead-gen, importing later-stage data (qualified opportunities, closed-won) — not just form submits — substantially improves P-MAX optimization.

| Step | Detail |
|---------|------|
| 1. Capture GCLID | Save the GCLID into your CRM at form submission |
| 2. Define later-stage CVs | Define qualified opportunity / closed-won as CV actions |
| 3. Periodic import | Upload from CRM to Google Ads on a regular cadence |
| 4. Set as P-MAX optimization goal | Include the imported CVs as optimization targets |

---

## 10. Product-feed integration (e-commerce)

### 10-1. The role of the feed

For e-commerce, P-MAX uses your Google Merchant Center (GMC) product feed to serve Shopping ads and dynamic remarketing. Feed quality is the biggest performance driver.

> **For detailed feed design and optimization, see [shopping-ads.md](shopping-ads.md).**

### 10-2. Listing groups (product filtering)

Listing groups control which products from the feed are eligible in each asset group.

**Filterable attributes:**

| Attribute | Use | Example |
|------|------|-----|
| Category (Google product category) | Top-level segmentation | Apparel > Men's |
| Brand | Brand-level management | Nike / Adidas |
| Product ID | Single-product include / exclude | Exclude a specific SKU |
| Condition | New vs. used | New only |
| Custom labels (0–4) | Free-form classification | Margin, seasonality, sales rank, etc. |

### 10-3. Custom-label patterns

| Label | Use | Example values |
|-------|------|-------|
| custom_label_0 | Margin tier | high_margin / mid_margin / low_margin |
| custom_label_1 | Sales performance | best_seller / mid_performer / long_tail |
| custom_label_2 | Seasonality | spring / summer / autumn / winter / year_round |
| custom_label_3 | Promotion | on_sale / clearance / new_arrival |
| custom_label_4 | Stock | in_stock / low_stock / pre_order |

**Example campaign split using custom labels:**

```
P-MAX Campaign A (high margin, high performance)
 ├── tROAS: 400%
 ├── AG1: best_seller × high_margin
 └── AG2: mid_performer × high_margin

P-MAX Campaign B (mid margin, the rest)
 ├── tROAS: 250%
 ├── AG1: best_seller × mid_margin
 └── AG2: remaining products
```

---

## 11. Feed-only vs. full assets

### 11-1. What feed-only is

A campaign that submits no text / image / video assets and runs solely on the product feed. Effectively focuses on Shopping ads and dynamic remarketing.

### 11-2. Comparison

| Item | Feed-only | Full assets |
|------|---------------|------------|
| Channels | Mostly Shopping + dynamic remarketing | All 7 channels (Search, Shopping, YouTube, GDN, Discover, Gmail, Maps) |
| Asset production | Not needed (feed only) | Need to produce text, image, video |
| Time-to-launch | Fast | Asset production takes time |
| CPA / ROAS | CPA tends to be lower short-term (concentrates on high-intent users) | Long-term CV growth potential via reach expansion |
| Reach | Limited (mostly high-intent users) | Wide (covers awareness → consideration → purchase) |
| Brand awareness | Almost none | YouTube / GDN delivery builds brand contact |

### 11-3. Which to choose

| Situation | Recommendation | Reason |
|-------|---------|------|
| Immediate ROAS focus | Feed-only | Strips away wasted placements, concentrates on high-intent |
| No asset-production resource | Feed-only | Can launch with the feed alone |
| New-customer / brand awareness goals | Full assets | Reach across all channels finds new customers |
| Long-term growth strategy | Full assets | Covers full funnel: awareness → consideration → purchase |
| Already running Display / YouTube as separate campaigns | Feed-only | Prevents overlap and cannibalization with P-MAX |

---

## 12. New-customer acquisition mode

### 12-1. Overview

P-MAX has dedicated modes for prioritizing new-customer acquisition.

| Mode | Behavior | When to use |
|-------|------|----------|
| New Customer Value Mode | Adds extra value to new-customer CVs and bids more aggressively for them; existing customers still served | Reinforce new acquisition while keeping existing-customer CV opportunity |
| New Customer Only Mode | Optimizes solely for new-customer CVs; existing customers excluded | Full focus on new acquisition |
| High-Value New Customer Mode | Define high-value existing customers via Customer Match, and bid even more aggressively for high-LTV-likely new customers | Businesses with wide LTV variance among customers |

### 12-2. Setup requirements

| Requirement | Detail |
|------|------|
| Customer Match list | Upload existing-customer email list |
| Conversion tag | Implement a parameter that distinguishes new vs. existing |
| High-value mode | Additional Customer Match list defining high-value customers |

### 12-3. Design notes

- Don't set the new-customer "extra value" too high. Base it on actual new-customer LTV.
- "New Customer Only" mode can shrink delivery materially — only use when you have ample traffic.
- Refresh the Customer Match list regularly (at least monthly).

---

## 13. Demographic controls

### 13-1. Available demographic exclusions (2025+)

The table reflects availability as of February 2026. Availability varies by account and region. Confirm in Google Ads UI under Campaign settings → Demographic exclusions.

| Demographic | Excludable values | Availability note |
|---------------|------------|---------|
| Age | 18-24 / 25-34 / 35-44 / 45-54 / 55-64 / 65+ / Unknown | Apr 2025 (beta started Jan 2025) |
| Gender | Male / Female / Unknown | Jul 2025 |
| Device | Desktop / Mobile / Tablet / CTV | 2025 |

> **Household-income targeting**: available but limited in accuracy (estimate-based). Available in roughly 20 countries.

### 13-2. Demographic-exclusion rules

| Rule | Reason |
|-------|------|
| Limit exclusions to attributes that genuinely don't convert | Excessive exclusion narrows learning |
| Be cautious with "Unknown" | A meaningful share of users get classified as Unknown |
| Decide from data, not assumptions | Base decisions on actuals |
| Monitor for at least 2 weeks after exclusion | Sometimes exclusion backfires |

---

## 14. Coexistence with other campaigns

### 14-1. P-MAX and Search

Because P-MAX serves on the Search channel too, cannibalization with existing Search campaigns is unavoidable.

**Auction priority rules:**

| Condition | Wins the auction |
|------|-------------------|
| Search KW matches an Exact-match keyword in a Search campaign | **Search campaign** |
| Search KW matches Phrase / Broad in a Search campaign | The one with higher Ad Rank (often P-MAX) |
| Search KW doesn't exist in any Search campaign | **P-MAX** |

**Cannibalization mitigations:**

| Mitigation | Effect |
|------|------|
| Add brand KWs as Exact match in the Search campaign | Branded queries route to Search |
| Add brand exclusion to P-MAX | Prevents P-MAX from absorbing brand searches |
| Periodically check P-MAX search-term insights | Understand where P-MAX is serving |
| Add high-performing terms as Exact match in Search | Locks priority to the Search campaign |
| Watch CPC trends in the Search campaign | Verify CPC didn't spike after P-MAX launch |

### 14-2. P-MAX and Shopping

| Situation | Recommendation |
|------|------|
| Standard Shopping running | P-MAX wins the auction. If you run both, watch for product-segment overlap |
| P-MAX only | Generally recommended. Manageable in one campaign |
| Hybrid | Standard Shopping for fine control over specific products (high-margin), P-MAX for the rest |

### 14-3. P-MAX vs. other campaign types

| Campaign type | Cannibalization risk | Recommendation |
|----------------|-------------|---------|
| Search | High | Lock priority via Exact-match KWs. Brand exclusion on P-MAX |
| Shopping (Standard) | High | Eliminate product-segment overlap |
| Display | Medium | Can coexist for different goals. Care needed when both target CV |
| Video (YouTube) | Low–medium | Can coexist with awareness-focused video campaigns |
| Demand Gen | High | If both target CV, Demand Gen risks getting suppressed |
| App | None | Channels don't overlap |

> **For per-campaign-type best practices, see each reference: [search-ads.md](search-ads.md), [display-ads.md](display-ads.md), [shopping-ads.md](shopping-ads.md), [video-campaigns.md](video-campaigns.md), [app-campaigns.md](app-campaigns.md).**

---

## 15. P-MAX for Store Goals

### 15-1. Overview

P-MAX for Store Goals is a dedicated variant for optimizing local actions: store visits, calls, directions. Introduced in July 2022 to consolidate the legacy Local campaigns.

### 15-2. Optimization goals

| Goal | Description |
|------|------|
| Store visits | Optimizes for in-store visits |
| Store sales | Optimizes for post-visit purchases |
| Local actions (directions, calls) | Optimizes for direction lookups in Google Maps and tap-to-call |

### 15-3. Channels

Google Search / Google Maps / YouTube / GDN / Gmail / Discover / **Waze** (Nov 2025+, US only)

### 15-4. Setup requirements

| Requirement | Detail |
|------|------|
| Google Business Profile (GBP) integration | Store info, address, hours required |
| Store-visit measurement enabled | Compatible with Google's store-visit conversion measurement |
| Multi-store | Configure store groups for regional delivery optimization |

### 15-5. Waze integration (Nov 2025+, US only)

| Item | Detail |
|------|------|
| Display format | "Promoted Places" pin on the navigation map |
| Eligibility | Campaigns targeting Store Visits / Store Sales / Local Action Directions |
| Setup | Automatic — no extra config; existing assets surface in Waze |
| Region | US only. International rollout planned 2026+ |

---

## 16. Reporting and insights

### 16-1. Channel performance report (May 2025+)

The most important report for the "P-MAX black-box" problem. See per-channel performance ([Google Ads Help](https://support.google.com/google-ads/answer/16260130?hl=en)).

| Channel | Visible metrics |
|---------|--------------|
| Search | Impressions, clicks, cost, CV, CV value |
| Shopping | Same |
| YouTube | Same |
| Display (GDN) | Same |
| Discover | Same |
| Gmail | Same |
| Maps | Same |
| Search Partners | Same (added Nov 2025) |

> **Limit: you cannot control budget / bid per channel.** The report is read-only. If allocation is unsatisfactory, control indirectly via campaign splits or feed-only mode.

### 16-2. Search-terms report (Mar 2025+)

See search terms used for Search and Shopping delivery in P-MAX. Same granularity as Search-campaign search terms ([P-MAX evaluation Help](https://support.google.com/google-ads/answer/16279166?hl=en), [search terms report Help](https://support.google.com/google-ads/answer/2472708?hl=en)).

**How to use:**
- Add converting search terms as Exact-match KWs in the Search campaign (lock priority)
- Add irrelevant search terms to negative keywords
- Validate the effectiveness of your search themes

### 16-3. Asset performance report

| Visible data | Detail |
|----------------|------|
| Asset-level impressions, clicks, cost | Each text / image / video's contribution (2025+) |
| Performance rating | Best / Good / Low (3-tier) |
| Combination report | Performance per asset combination |

**How to use:**
- Replace "Low"-rated assets after at least 14 days
- Analyze commonalities of "Best" assets and apply them to new ones
- Keep an asset live at least 2 weeks before reading the rating

### 16-4. Other insights

| Report | Content |
|---------|------|
| Audience insights | Which audience segments contribute to CVs |
| Diagnostic insights | Auto-detected issues (budget shortage, asset quality) |
| Competitive insights | Auction Insights where available, especially Search-channel diagnostics |
| Placement report | Sites, apps, and videos where the ad served |

---

## 17. A/B testing (Experiments)

### 17-1. Asset A/B testing

For P-MAX, use optimization experiments for asset testing where available ([Google Ads Help](https://support.google.com/google-ads/answer/16030588?hl=en-EN)).

| Item | Detail |
|------|------|
| Scope | Asset sets within a single asset group |
| Method | Traffic split between control (existing) and treatment (new) |
| Traffic split | 50/50 recommended |
| Recommended duration | 4–6 weeks or longer |
| Applying the result | Manually apply the winning asset set |

**Test design rules:**
- Tests under 3 weeks have unstable results — run at least 4 weeks
- Change one variable per test (only headlines, only images, etc.)
- Extend to 6–8 weeks for low-CV accounts

### 17-2. Campaign-mix experiments

Campaign-level A/B tests for evaluating P-MAX's impact.

| Test | Detail |
|---------|------|
| P-MAX vs. existing campaign mix | Measure P-MAX's launch impact |
| DSA → P-MAX budget shift | Measure the impact of moving DSA budget to P-MAX |
| Display → P-MAX budget shift | Measure the impact of moving Display budget to P-MAX |

---

## 18. Gemini AI integration

### 18-1. Gemini-powered features (2025+)

| Feature | Detail |
|------|------|
| Text-asset auto-generation | Gemini auto-generates long headlines and descriptions |
| Sitelink auto-generation | Auto-suggests sitelinks based on LP content |
| Image generation | Imagen 2-based ad-image generation (lifestyle, people) |
| Image editing | Background swap, person addition for existing images |
| High-performance look-alike generation | Generates new images similar to "Best"-rated ones |
| Shareable preview | Share an ad preview via link (no Google Ads login required) |

### 18-2. Rules for using AI-generated assets

| Rule | Reason |
|-------|------|
| AI is a supplement — keep your own assets as the core | Brand consistency |
| Always review AI-generated assets before approval | Risk of inappropriate language or imagery |
| Use your top-performing assets as the base for AI generation | Better learning quality |
| Evaluate AI-generated asset performance like any other | Don't favor or penalize them by source |

---

## 19. Learning period and operating cadence

### 19-1. Learning period

| Phase | Duration | Detail |
|---------|------|------|
| Initial learning | 2–4 weeks | AI learns to optimize bidding, targeting, and creatives. Performance is unstable |
| Stabilization | 4–6 weeks | Learning matures; performance steadies |
| Maturity | 6+ weeks | Stable. Now consider optimization and expansion |

**Changes that reset learning:**
- Switching bid strategy
- Budget changes ≥20%
- Adding / changing / removing CV actions
- Major asset-group changes (replacing 50%+ of assets)
- Major changes to geo-targeting

### 19-2. Operating cadence

| Cadence | Action |
|------|----------|
| Daily | Budget pacing. Watch for anomalous spend |
| Weekly | Channel report / asset performance / search-terms report / spend-concentration check (top 20% products / AGs absorbing 80%+ of spend?) |
| Bi-weekly | Replace "Low"-rated assets / add negative KWs |
| Monthly | Audience-insights analysis / review bid targets / budget reallocation / refresh Customer Match list |
| Quarterly | Full asset refresh / restructure campaigns / cross-check competitor moves |

### 19-3. Optimization priority

When performance falls short, work in this order.

| Priority | Check | Action |
|-------|------------|------|
| 1 | CV measurement accurate? | Implement Enhanced Conversions / revisit CV definitions |
| 2 | Budget sufficient? | 1–3× target CPA/day for narrow tests; 3–5×+ for stable learning |
| 3 | Asset quality sufficient? | Replace "Low" assets / fill gaps |
| 4 | Audience signals appropriate? | Add Customer Match / revise signals |
| 5 | Negatives and brand exclusion right? | Add irrelevant terms via search-terms report |
| 6 | Bid targets realistic? | Re-anchor on trailing actuals |
| 7 | URL expansion settings right? | Verify no traffic leaks to wrong pages |
| 8 | Cannibalization happening? | Watch Search-campaign CPC and IS |

---

## 20. Common failure patterns

### 20-1. Design-stage mistakes

| Mistake | Why it fails | Avoidance |
|------------|----------|-------|
| Launching with insufficient CV data | Learning is slower and less stable | Build more true conversion volume first when possible |
| Over-splitting campaigns | Each campaign starves for CV data | Split only for real control needs and keep enough volume per campaign |
| Over-splitting asset groups | Data fragmentation slows learning | Start with 1–3 AGs; expand based on data |
| P-MAX-only without Search | Can't control brand KWs or judge cannibalization | Build Search first, add P-MAX after |

### 20-2. Asset mistakes

| Mistake | Why it fails | Avoidance |
|------------|----------|-------|
| Only generic stock images | Low CVR; no brand differentiation | Use real photos of your products / services |
| No video assets | Google auto-generates low-quality video from images | At least one landscape + one vertical video |
| Too few text assets | AI has limited combinations to test | 11+ headlines, 4+ descriptions |
| Excessive text in images | Risk of policy issues / delivery limits on GDN, Discover | Keep text ≤20% of image area |

### 20-3. Operating-stage mistakes

| Mistake | Why it fails | Avoidance |
|------------|----------|-------|
| Frequent changes during learning | Resets learning; permanently unstable | Don't touch for at least 2 weeks after a change |
| Leaving URL expansion on by default | Traffic leaks to blogs / careers | Configure URL exclusion rules; off for lead-gen |
| Running without brand exclusion | P-MAX absorbs brand-search CVs — apparent ROAS is high but real lift is small | Configure brand exclusion to draw a clean line with Search |
| Excluding all non-CV terms | Narrows AI exploration; loses new-customer discovery | Strategic, category-level exclusion only |
| Judging by ROAS alone | Brand, remarketing, modeled CV, EVC, or Store Goals VTC may overstate lift | Also evaluate click-only / ad-event-type ROAS and business revenue |
| Spiking the budget | Triggers learning reset | Up to 20% per 7–14 days |
| Setting tCPA / tROAS targets to aspirational values | Delivery collapses, learning halts | Anchor on actuals |
| "Set and forget" P-MAX | Performance decays as the environment shifts | Make a weekly health check routine |

### 20-4. P-MAX retargeting bias

P-MAX defaults to prioritizing existing customers and site visitors — "users likely to convert". This makes ROAS look high while real new-customer acquisition is low.

**Mitigations:**
- Enable a New Customer Acquisition mode (see [§12](#12-new-customer-acquisition-mode))
- Use Customer Match to identify existing customers
- Check Display / YouTube share in the channel report (heavy retargeting → high Display share)
- Periodically analyze new vs. existing CV breakdown

---

## Appendix A: Symptom-based troubleshooting

Reverse lookup: identify the cause from the symptom and decide the action.

| Symptom | Likely causes | Action |
|------|---------|-------|
| CVs are coming in but ROAS is degrading | Non-click event mix, tROAS too loose, or low-margin products dominate CVs | Segment by ad event type / tighten tROAS in steps from actuals / split by margin via custom labels |
| Spend concentrates on a few products / AGs | AI optimized into a few easy-to-convert products | Split via listing groups / improve low-spend AG asset quality / split campaigns to manage budget independently |
| YouTube / Display share is too high | Full-asset delivery skewing to retargeting / fierce Search-channel competition | Consider feed-only / enable New Customer Acquisition mode / verify true CV contribution in the channel report |
| CPA / CPC suddenly rose | Learning reset / competitive shift / seasonality | Check recent changes (bid, budget, assets) / wait 2–3 weeks for stabilization / check search-terms for new high-CPC queries |
| Search-campaign performance dropped | Cannibalization with P-MAX | Check P-MAX search-terms for overlap / set brand exclusion / add critical KWs as Exact match in Search |
| Far too few CVs / learning not progressing | Budget shortage / CV definition too strict / poor asset quality | Lift daily budget if economics allow / improve the primary CV path / use only proven proxy signals / fill out assets |
| Ad Strength stuck at "Low" | Insufficient asset count / missing asset types | 11+ headlines, 4+ descriptions, 5+ images per format, 1+ videos |

---

## Appendix B: Naming conventions, change log, checklist

Use the account-level naming pattern in [../SKILL.md](../SKILL.md). For P-MAX specifically:

- Campaign names should expose goal, segment, and bid strategy: `P-MAX_EC_HighMargin_tROAS400`.
- Asset-group names should expose category / audience and message axis: `Mens_Shoes_Price`, `SaaS_Enterprise_ROI`.
- Feed custom labels should expose the segmentation axis: `CL0_margin_high`, `CL1_rank_bestseller`.
- Log every bid, budget, asset, feed, URL expansion, brand exclusion, and conversion-setting change with hypothesis, expected effect, next review date, and result.
- Use [creative-strategy.md](creative-strategy.md#p-max-asset-baseline) for the P-MAX asset checklist instead of duplicating specs here.
