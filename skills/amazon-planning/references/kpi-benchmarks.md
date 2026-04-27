# KPI, Benchmarks, and Operating Rules

Use benchmarks as planning ranges, not promises. Amazon performance varies by marketplace, category, price, margin, review count, competition, seasonality, placement, and retail readiness.

## Core Metrics

| Metric | Full name | Formula | Meaning |
|---|---|---|---|
| ACoS | Advertising Cost of Sales | `ad spend / attributed ad sales` | Share of ad-attributed sales spent on ads. Lower is more efficient. |
| TACoS | Total Advertising Cost of Sales | `ad spend / total sales` | Total business-level ad pressure, including organic sales. |
| ROAS | Return on Ad Spend | `attributed ad sales / ad spend` | Revenue returned per unit of ad spend. |
| CPC | Cost Per Click | `ad spend / clicks` | Auction cost per click. |
| CTR | Click-Through Rate | `clicks / impressions` | Ad relevance and creative/query fit. |
| CVR | Conversion Rate | `orders / clicks` | Product detail page and offer conversion. |
| NTB | New-to-Brand | Amazon's new-to-brand metric where available | Share or volume of purchases from customers new to the brand over Amazon's lookback window; sub-metrics vary by ad product. |
| DPV | Detail Page View | Product detail page visit | Consideration signal. |

## Metric Relationships

```text
ACoS = CPC / (Average selling price x CVR)
ROAS = 1 / ACoS
TACoS = ad spend / total sales
```

If ACoS is too high, diagnose whether the issue is CPC, CVR, average selling price, attribution mix, or low organic pull-through.

## ACoS and ROAS

| ACoS | ROAS | How to read it |
|---|---|---|
| 10% | 10.0x | Often efficient, but can still be overpriced if it is mostly cannibalized brand demand. |
| 20% | 5.0x | Viability depends on category, margin, price, and objective; do not treat as universally strong. |
| 30% | 3.3x | May be healthy for some categories or launches and too high for others. Compare to break-even ACoS and TACoS. |
| 40% | 2.5x | Requires a growth, new-to-brand, rank, or launch rationale unless margins are high. |
| 50%+ | 2.0x or lower | Usually needs explicit strategic rationale, budget cap, and post-test decision rule. |

## Break-Even ACoS

```text
Break-even ACoS =
(selling price - product cost - referral fee - fulfillment cost - discount - variable cost)
/ selling price
```

Target ACoS should be based on contribution margin and business objective:

| Objective | ACoS posture |
|---|---|
| Profit harvesting | Below break-even with margin buffer |
| Growth | Near target margin, with TACoS and organic rank monitored |
| Launch | May exceed break-even temporarily if budget, inventory, and learning goals are explicit |
| Defensive brand | Often lower ACoS; ensure not overpaying for demand that organic already captures |
| Competitor conquesting | Often higher ACoS; judge with new customers and long-term value |

## Benchmark Ranges

Use these as rough directional ranges only:

| Ad product | Common pattern |
|---|---|
| Sponsored Products | Highest conversion intent; usually the first performance benchmark. |
| Sponsored Brands | Lower direct conversion than Sponsored Products in many accounts, but can drive Store visits, video engagement, and new-to-brand demand. |
| Sponsored Display | Performance varies widely by contextual, audience, and remarketing setup. Separate prospecting from remarketing. |
| Amazon DSP | Direct ROAS may be lower for upper funnel; assess reach, incrementality, and assisted demand. |
| Streaming TV / Sponsored TV | Direct ROAS is usually the wrong primary read; assess reach, frequency, branded search, detail page views, and downstream assisted demand. |

Avoid universal CPC, CTR, CVR, and ACoS claims unless sourced for the exact marketplace, category, and period.

## Attribution and Measurement Changes

Amazon attribution and reporting methods change. When reviewing year-over-year or pre/post performance, identify whether the account is using updated view attribution, shopping-signal-enhanced last-touch attribution, Multi-Touch Attribution beta, or unified reporting variants.

Use these checks:

- Separate click-attributed sales from view-through and assisted sales where reporting allows.
- Compare tightened and broader view metrics only when both are available and clearly labeled.
- Use AMC for path-to-purchase, frequency, audience overlap, new-to-brand, and incrementality questions where access exists.
- Do not compare 2026 ROAS directly against older periods without checking whether attribution methodology changed.

## Amazon Marketing Cloud and Audience Measurement

AMC is no longer only a DSP-heavy enterprise topic. Amazon has expanded AMC access to sponsored ads advertisers, including self-service access in supported accounts and partner-mediated access in others. Use AMC when the plan needs:

- Sponsored Products or Sponsored Brands audience bid boosting.
- Sponsored Display audience activation.
- DSP path-to-purchase and frequency analysis.
- New-to-brand analysis across ad products.
- Incrementality, overlap, or long-lookback cohort questions.

Verify access, clean room permissions, lookback windows, and whether the user can operate AMC directly or through a partner.

## Diagnostic Rules

| Symptom | Likely diagnosis | First actions |
|---|---|---|
| High impressions, low CTR | Query mismatch, weak main image/title/price, poor placement fit | Tighten targeting, improve main image/title, review price and rating gap |
| High CTR, low CVR | Listing or offer problem | Improve images, bullets, A+ Content, reviews, price, delivery promise |
| High CPC, acceptable CVR, high ACoS | Auction too expensive for margin | Lower bids, shift to long-tail/product targeting, improve ASP/bundle |
| Low impressions | Bid/budget too low, target too narrow, eligibility issue | Check eligibility, raise bid carefully, broaden discovery |
| Good ACoS, rising TACoS | Paid sales cannibalizing organic or total sales not growing | Review organic rank, incrementality, brand defense, budget allocation |
| Strong ROAS, stockouts | Ads outpacing inventory | Reduce budgets, protect hero ASINs, adjust launch calendar |

## Pre-Launch Checklist

- Product detail page is complete and compliant.
- Main image and secondary images are strong on mobile.
- Price, rating, review count, and delivery promise are competitive enough for the target auction.
- Inventory can support planned spend.
- Break-even ACoS and target ACoS are calculated.
- Campaign roles, budgets, bids, negatives, and measurement are defined.
- Brand Registry status is known if Sponsored Brands, Stores, A+ Content, Brand Analytics, or Sponsored Display features are needed.

## Weekly Checklist

- Budget pacing and out-of-budget campaigns.
- Search term harvesting and negatives.
- Bid changes by target, placement, and match type.
- Product detail page conversion and buyability.
- ACoS, ROAS, TACoS, sales, contribution margin.
- Inventory, price, promotion, and review changes.
- New-to-brand and organic rank where available.
