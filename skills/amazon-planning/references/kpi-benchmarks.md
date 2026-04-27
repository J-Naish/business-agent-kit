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
| NTB | New-to-Brand | Amazon's new-to-brand metric where available | Share or volume of purchases from customers new to the brand over Amazon's lookback window. |
| DPV | Detail Page View | Product detail page visit | Consideration signal. |

## Metric Relationships

```text
ACoS = CPC / (Average selling price x CVR)
ROAS = 1 / ACoS
TACoS = ad spend / total sales
```

If ACoS is too high, diagnose whether the issue is CPC, CVR, average selling price, attribution mix, or low organic pull-through.

## ACoS and ROAS

| ACoS | ROAS | Interpretation |
|---|---|---|
| 10% | 10.0x | Very efficient; often brand terms or mature winners |
| 20% | 5.0x | Strong in many categories if margin supports it |
| 30% | 3.3x | Common planning zone; check category and margin |
| 40% | 2.5x | High for many products; may be acceptable during launch |
| 50%+ | 2.0x or lower | Requires explicit strategic rationale and margin review |

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

Avoid universal CPC, CTR, CVR, and ACoS claims unless sourced for the exact marketplace, category, and period.

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
