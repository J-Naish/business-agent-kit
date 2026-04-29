# Diagnostic decision trees

Use this reference for existing-account improvement. Diagnose the failure mode before proposing changes. Most Google Ads problems are caused by one of five things: bad signal, wrong traffic, weak destination, unrealistic economics, or premature optimization.

If the user provides account data in any form — exports, copied tables, screenshots, dashboards, CRM data, Merchant Center diagnostics, or metric summaries — read [account-data-diagnostics.md](account-data-diagnostics.md) first. That reference defines how to inspect source, date range, row grain, missing fields, Ads/GA4/CRM/feed reconciliation, and spend-weighted priority before using the symptom trees below.

## First-pass triage

| Check | If broken | Priority |
|---|---|---|
| Conversion tracking | Tags missing, duplicate firing, wrong primary CV | Fix before bid or structure changes |
| Conversion quality | Raw leads / micro-CVs dominate, sales quality weak | Fix CV design or imports |
| Traffic relevance | Search terms, placements, products, or URLs are wrong | Add guardrails and tighten structure |
| Destination quality | LP/feed/app/store page weak | Fix destination before scaling |
| Economics | Target CPA/ROAS impossible | Reset targets or change offer/margin strategy |
| Learning stability | Recent budget/bid/goal/asset changes | Wait or isolate the change before judging |

---

## Spend high, conversions low

```
Spend high, conversions low
├── Tracking broken?
│   └── Fix tags, primary/secondary CV, duplicate counting
├── Traffic irrelevant?
│   ├── Search: inspect search terms, match expansion, AI Max, negatives
│   ├── P-MAX: inspect search themes, URL expansion, brand controls, product mix
│   ├── Display/Demand Gen/Video: inspect placements, audiences, optimized targeting, VTC share
│   └── Shopping: inspect feed titles, product eligibility, query/product mismatch
├── Traffic relevant but CVR weak?
│   └── Fix offer, LP, form, checkout, trust, speed, pricing, page-message match
├── CPC/CPM too high?
│   └── Check auction pressure, Quality Score, audience narrowness, bid targets
└── Budget too fragmented?
    └── Consolidate around the cleanest signal
```

---

## Conversions high, quality low

```
Conversions high, quality low
├── Primary CV too shallow?
│   └── Move weak actions to secondary; import qualified outcomes
├── Lead sources differ by query/audience/geo?
│   └── Segment reports and apply negatives, exclusions, or value rules
├── Form too easy or offer attracts poor fit?
│   └── Add qualification, pricing clarity, service-area clarity, or stronger disqualifiers
├── P-MAX / broad automation finding cheap low-quality pockets?
│   └── Add URL exclusions, brand exclusions, audience exclusions, or stricter CV values
└── Sales follow-up causing quality loss?
    └── Audit speed-to-lead, call handling, CRM statuses, and booking process
```

---

## CTR low

| First question | Diagnosis | Action |
|---|---|---|
| Is query/audience intent right? | Low CTR may be traffic mismatch | Tighten query, audience, placement, or product eligibility |
| Is the ad promise specific? | Generic copy blends into auction | Add outcome, offer, proof, price, qualification, or urgency |
| Is brand/trust weak? | User does not recognize or believe the offer | Add proof, ratings, customer logos, guarantees, or credentials |
| Is the format wrong? | Visual ads need a stronger first frame; Search needs keyword-message match | Rebuild creative around surface behavior |
| Is position / Ad Rank low? | Ads appear but are not competitive | Improve assets, LP relevance, bid, and Quality Score drivers |

Do not optimize CTR in isolation. A higher CTR can worsen CPA if the ad attracts low-fit clicks.

---

## CVR low

```
CVR low
├── Ad promise and LP mismatch?
│   └── Align headline, offer, product, price, proof, and CTA
├── Traffic intent too broad?
│   └── Segment by query/theme/audience and isolate weak pockets
├── Page friction high?
│   └── Improve speed, mobile layout, checkout/form steps, trust signals
├── Offer not competitive?
│   └── Review price, shipping, return policy, trial, guarantee, lead magnet
├── Wrong conversion action?
│   └── Check primary/secondary setup and event firing
└── Conversion delay?
    └── Extend judgment window before changing bids
```

---

## CPC / CPM rising

| Cause | How to identify | Action |
|---|---|---|
| Auction pressure | Auction insights, impression share lost to rank | Improve relevance, QS drivers, offer, or bid selectively |
| Bid target too loose | Spend rises without quality gain | Re-anchor tCPA/tROAS to recent actuals |
| Budget increase reset learning | Recent large budget change | Wait for stabilization; avoid simultaneous changes |
| Audience too narrow | Frequency high, CPM high, low delivery | Broaden or split awareness vs remarketing |
| Quality Score weak | Low expected CTR / ad relevance / LP experience | Improve theme match, RSA assets, and LP |
| Query mix changed | Search terms shifted to broader / competitive terms | Add negatives, exact-lock high-value terms, refine broad controls |

---

## P-MAX ROAS high, business revenue flat

```
P-MAX ROAS high, revenue flat
├── Brand capture high?
│   └── Add brand exclusions or report brand separately
├── Remarketing bias high?
│   └── Analyze new vs existing customers; use NCA mode if appropriate
├── VTC share high?
│   └── Report click-based and VTC separately; calibrate with business data
├── Low-margin products dominate?
│   └── Segment by margin or pass profit-aware values
├── Search / Shopping cannibalization?
│   └── Review overlap with Search and Standard Shopping
└── No incrementality evidence?
    └── Run geo/period/customer holdout if volume supports it
```

---

## Demand Gen direct CPA weak, assisted impact plausible

| Check | Interpretation | Action |
|---|---|---|
| Brand search volume rises | Demand creation may be working | Evaluate blended CPA and search lift |
| Remarketing pool grows | Campaign may be warming future converters | Track assisted paths and audience growth |
| VTC dominates | Reported impact may be inflated | Keep VTC separate and test incrementality |
| CTR strong, CVR weak | Creative gets attention but LP/offer/audience is off | Improve landing path or qualify creative |
| Spend low | Audience, target, or assets too restrictive | Consolidate, relax target, add assets |
| P-MAX receives final conversion credit | Demand Gen may assist while P-MAX harvests | Evaluate combined system, not only last-touch CPA |

---

## Shopping / feed underperformance

| Symptom | First checks | Action |
|---|---|---|
| Low impressions | Disapprovals, GTIN, title, category, bid/target | Fix feed eligibility and title relevance |
| Low CTR | Product image, price, title, reviews, shipping | Improve title/image, pricing visibility, promotions |
| Low CVR | LP, shipping, returns, checkout, price mismatch | Fix product page and purchase path |
| High ROAS variance by product | Margin and demand differ | Use custom labels and segment targets |
| Long-tail products get no spend | Automation concentrates on winners | Isolate strategically important SKUs if demand exists |

---

## Diagnostic answer format

When diagnosing an account, return:

1. Likely root cause ranked by confidence.
2. Evidence needed to confirm or reject each cause.
3. Changes to make now.
4. Changes to avoid until more data arrives.
5. Expected stabilization window.
