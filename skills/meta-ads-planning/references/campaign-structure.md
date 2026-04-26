# Campaign Structure Best Practices

## Contents

- [1. Recommended Campaign Structures](#1-recommended-campaign-structures)
- [2. Budget Allocation](#2-budget-allocation)
- [3. Full-Funnel Strategy](#3-full-funnel-strategy)
- [4. Learning Phase Management](#4-learning-phase-management)
- [5. Measurement and Optimization](#5-measurement-and-optimization)
- [6. Common Mistakes](#6-common-mistakes)
- [7. Recommended Design by Business Type](#7-recommended-design-by-business-type)
- [8. Naming Conventions](#8-naming-conventions)

---

## 1. Recommended Campaign Structures

### Core Principle: Keep the Structure Simple

Modern Meta ads usually benefit from simpler campaign structures. Fewer campaigns and ad sets concentrate delivery signal, reduce overlap, and give the system more room to learn.

### Pattern A: Two-Campaign Structure

Use this when the account needs a clear testing-and-scaling operating loop.

```
Ad account
├── 1. Creative Testing Campaign
│   ├── Budget: 10-20% of total
│   ├── Role: Discover new creative concepts
│   ├── Settings: campaign budget, broad targeting
│   └── Ad set: consolidated ad set with multiple concepts
│
└── 2. Winning Ads Campaign
    ├── Budget: 80-90% of total
    ├── Role: Scale validated creative concepts
    ├── Settings: campaign budget, broad targeting
    └── Ad set: consolidated winners
```

### Pattern B: Three-Campaign Full-Funnel Structure

Use this when awareness, conversion capture, and remarketing need distinct budgets or messages.

```
Ad account
├── 1. Sales Campaign
│   ├── Budget allocation: largest
│   ├── Role: Conversion capture across the funnel
│   ├── Settings: Advantage+ sales campaign or campaign budget
│   └── Ad set: proven creative concepts
│
├── 2. Awareness Campaign
│   ├── Budget allocation: medium
│   ├── Role: Reach new users
│   ├── Optimization: reach, impressions, or ThruPlay
│   └── Ad set: video-led content
│
└── 3. Remarketing Campaign
    ├── Budget allocation: small
    ├── Role: Convert people with prior touchpoints
    ├── Settings: ad set budget when tighter control is needed
    └── Ad set: Custom Audience segments
```

### Retargeting Treatment

Meta's automated delivery often handles part of retargeting inside broader campaigns.

- Advantage+ sales campaigns can allocate spend to both prospecting and remarketing-like opportunities.
- Many advertisers consolidate dedicated retargeting into the main campaign when the account is small.
- Keep a separate remarketing campaign when a specific Custom Audience needs a distinct message, budget, or measurement view.

---

## 2. Budget Allocation

### Funnel Allocation

| Stage | Budget allocation | Role |
|---|---:|---|
| Awareness / consideration | 60% | New audience acquisition and pipeline creation |
| Conversion | 40% | Direct conversions and revenue |

Treat this as a starting point, not a rule. Direct response accounts with limited budgets may put more budget into the cleanest conversion loop first.

### Testing vs Scaling

| Use | Budget allocation |
|---|---:|
| Creative testing | 10-20% |
| Scaling validated creative | 80-90% |

### Budget Scaling Rules

- Increase budget gradually when CAC/CPA remains acceptable. **20-30% per step** is a conservative pacing heuristic, not a universal platform law.
- Large budget jumps can destabilize learning.
- Scale by **concept and creative system**, not just by individual ad.
- Monitor performance for several days after meaningful budget changes.

---

## 3. Full-Funnel Strategy

### Stage 1: Awareness

| Item | Setting |
|---|---|
| Objective | Awareness |
| Targeting | Broad audience |
| Creative | Video/Reels, brand story, problem framing |
| Optimization | Reach, impressions, or ThruPlay |
| KPIs | CPM, reach, video view rate, ad recall lift where available |

### Stage 2: Consideration

| Item | Setting |
|---|---|
| Objective | Traffic / Engagement |
| Targeting | Video viewers, engagement audiences, warm audiences |
| Creative | Carousel, video, testimonials, comparisons |
| Optimization | Landing page views, video views, engagement |
| KPIs | CTR, landing page views, engagement rate |

### Stage 3: Conversion

| Item | Setting |
|---|---|
| Objective | Sales / Leads |
| Targeting | Website visitors, cart abandoners, leads, broad conversion audiences |
| Creative | Dynamic ads, Collection Ads, offer-led assets, proof |
| Optimization | Purchase, Lead, or other deepest reliable event |
| KPIs | CPA, ROAS, conversion volume, CVR |

### Exclusions

- Exclude existing customers from pure prospecting when acquisition is the goal.
- Exclude recent engagers only when the funnel design requires strict stage separation.
- Avoid excessive exclusions when they starve delivery or conflict with Advantage+ delivery.

---

## 4. Learning Phase Management

### What the Learning Phase Is

The learning phase is the initial period where Meta's delivery system explores audiences, placements, and bids for the selected optimization event.

### Requirements

- Meta commonly uses roughly 50 optimization events per ad set per week as a practical benchmark for stable learning. Treat it as a planning benchmark, not a hard pass/fail rule.
- Performance can be volatile during learning.
- Avoid major edits during the learning phase unless there is a clear setup error.

### Changes That Can Restart Learning

- Targeting changes.
- Bid strategy changes.
- Large budget changes.
- Pausing or restarting ads.
- Adding new ads in a way that materially changes delivery.
- Changing ad creative or the optimization event.

### How to Help Learning

- Provide enough budget for the target CPA and expected conversion volume.
- Choose an optimization event that occurs frequently enough.
- If conversion volume is too low, consider a higher-funnel event only as a temporary proxy and explain the quality tradeoff.
- Prefer consolidation before moving to shallow events. More low-quality events do not improve learning.

---

## 5. Measurement and Optimization

### Core KPIs

| KPI | Use | Notes |
|---|---|---|
| CPA | Acquisition efficiency | Calculate from unit economics |
| ROAS | Revenue efficiency | Must be interpreted with margin |
| CTR | Creative pull and relevance | Do not optimize in isolation |
| CPM | Reach cost | Varies by vertical, audience, and seasonality |
| Cost per 1,000 people reached | Audience reach cost and fatigue signal | Rising cost can indicate fatigue or auction pressure |
| Frequency | Ad fatigue signal | High frequency needs context; remarketing can tolerate more |
| CVR | Landing page / funnel efficiency | Often a destination issue, not only an ads issue |
| LTV:CAC | Long-term profitability | Useful for subscription and repeat-purchase models |

### Optimization Actions

| Symptom | Action |
|---|---|
| Cost per 1,000 people reached rises | Refresh creative before changing bids |
| Frequency rises above the account's tolerance | Add new creative, broaden audience, or cap remarketing budget |
| CTR falls | Rework hook and creative concept |
| CPA rises | Diagnose creative, landing page, offer, audience, and measurement in that order |
| CVR falls on the landing page | Improve the landing page or funnel; do not treat it as only an ad problem |

### Attribution Settings

| Window | Meaning | Use case |
|---|---|---|
| 7-day click + 1-day engage-through + 1-day view | Common modern default where available | Most accounts, with reporting splits visible |
| 7-day click | Click-based optimization/reporting emphasis | Standard purchase paths where view/engagement inflation is a concern |
| 1-day click | Stricter click-based view | Tests, low-consideration products, incrementality-sensitive analysis |
| 1-day engage-through | Non-link engagement or qualified video engagement followed by conversion | Video/Reels and social engagement influence; report separately |
| 1-day view | Impression-only followed by conversion | Monitor separately; use cautiously for retargeting and high-frequency campaigns |
| Longer click windows where available | Captures longer consideration | High-ticket, B2B, longer sales cycles |

Note: reporting-tool and API behavior changes over time. Some sources report that longer view-through windows were removed from Ads Insights API in January 2026, and Meta's March 2026 attribution update reclassified non-link interactions into engage-through. Verify current Ads Manager/API behavior for the user's stack before relying on any specific window.

---

## 6. Common Mistakes

### Structure Mistakes

- Too many campaigns: signal is fragmented across small pockets.
- Audience overlap: the account competes against itself.
- Frequent structural changes: learning never stabilizes.
- Dedicated retargeting budget is too large: platform ROAS looks strong while incremental contribution is weak.

### Creative Mistakes

- Relying on one format until fatigue sets in.
- Making decisions from opinions instead of test data.
- Using creative that does not fit the placement's aspect ratio, pacing, or UI.

### Setup Mistakes

- Running without Meta Pixel / Conversions API when conversion optimization matters.
- Using Advantage+ sales campaigns without enough signal or creative quality.
- Making abrupt budget changes.
- Overtrusting automated creative features without reviewing the outputs.
- Treating detailed targeting exclusions, old interest stacks, or legacy Advantage+ Shopping controls as if they are still stable product mechanics.

---

## 7. Recommended Design by Business Type

### E-commerce / D2C

| Item | Recommendation |
|---|---|
| Campaign objective | **Sales**; Advantage+ sales campaign when ready |
| Structure | Pattern A: testing + scaling |
| Optimization event | Purchase; use AddToCart only if purchase volume is insufficient |
| Formats | Collection Ads, carousel, dynamic ads, video |
| Placements | Advantage+ placements; prioritize placement-ready Instagram Feed/Reels creative |
| Targeting | Broad + high-quality Custom Audience / Lookalike signals |
| Bid strategy | Lowest cost -> ROAS goal |
| Budget allocation | Testing 10-20% / scaling 80-90% |
| Measurement caution | Track new vs existing customers, margin, and incrementality |

### B2B Lead Generation

| Item | Recommendation |
|---|---|
| Campaign objective | **Leads** or **Sales** |
| Structure | Pattern B: Sales/Leads + Awareness + Remarketing |
| Optimization event | Lead, qualified lead, form submit, or CRM-backed event |
| Formats | Lead Ads / Instant Forms, video, image |
| Placements | Facebook Feed + Instagram Feed; consider excluding Audience Network |
| Targeting | Broad + customer-list Lookalike + website visitor remarketing |
| Bid strategy | Cost cap after stable volume |
| Note | Test Instant Forms against website conversions for lead quality |
| Measurement caution | Do not optimize to raw CPL without qualified lead or pipeline feedback |

### SaaS / Subscription

| Item | Recommendation |
|---|---|
| Campaign objective | **Leads** -> **Sales** |
| Structure | Pattern B |
| Optimization event | Demo request, sign-up, trial start, subscription |
| Formats | Demo video, feature carousel, image |
| Placements | Facebook Feed + Instagram Feed |
| Targeting | Broad + Custom Audiences such as site visitors and video viewers |
| Bid strategy | Lowest cost -> Cost cap |
| Note | Free trial or demo offers often work well, but quality must be checked |

### Local Business

| Item | Recommendation |
|---|---|
| Campaign objective | **Awareness** + **Sales** or **Leads** |
| Structure | Pattern B: Awareness + Sales/Leads + Remarketing |
| Optimization event | Reach for awareness; Purchase, Lead, booking, or call for conversion |
| Formats | Store tour video, offer image, carousel |
| Placements | Facebook Feed + Marketplace + Instagram Feed where relevant |
| Targeting | Local geography + broad audience |
| Bid strategy | Lowest cost |
| Note | Service area and local proof matter |

### App Business

| Item | Recommendation |
|---|---|
| Campaign objective | **App promotion** |
| Structure | Pattern A: testing + scaling |
| Optimization event | Install -> in-app event -> value |
| Formats | App demo video, playable ads |
| Placements | Advantage+ placements |
| Targeting | Broad + high-value user Lookalike where useful |
| Bid strategy | Lowest cost -> value optimization |
| Note | Move toward higher-value events after enough install and event data accumulates |

### Brand Awareness

| Item | Recommendation |
|---|---|
| Campaign objective | **Awareness** |
| Structure | Single Awareness campaign |
| Optimization event | Reach, impressions, ad recall lift, ThruPlay |
| Formats | Video/Reels, image |
| Placements | Advantage+ placements; Reels and Stories-ready creative |
| Targeting | Broad for maximum reach |
| Bid strategy | Lowest cost |
| Note | Use video-led brand storytelling |

---

## 8. Naming Conventions

### Campaign Name

Format: `{Objective}_{AudienceOrFunnel}_{Structure}_{Note}`

Examples:

- `Sales_Prospecting_ASC`
- `Sales_Retargeting_CartAbandoners`
- `Awareness_TOF_CBO`
- `Leads_InstantForm_US`
- `CreativeTest_Weekly`

### Ad Set Name

Format: `{Audience}_{Placement}_{Note}`

Examples:

- `Broad_AllPlacements`
- `LAL1pct_Purchase_Feed`
- `Retargeting_WebVisitors30d`
- `CustomAudience_EmailList`

### Ad Name

Format: `{Format}_{Angle}_{Variant}`

Examples:

- `Video_Testimonial_v1`
- `Image_PainPoint_4x5`
- `Carousel_ProductLine_v2`
- `UGC_FounderStory_Reel`

### Rules

- Use underscores `_` consistently.
- Prefer English-based names for compatibility with filters and exports.
- Do not include dates unless the item is a test; append `_Test_YYMM` when needed.
- Use PascalCase tokens for readability.
