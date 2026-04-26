# Diagnostic decision trees

Use this reference for existing-account improvement. Diagnose the failure mode before proposing changes. Most Meta Ads problems are caused by bad signal, weak creative, poor destination, fragmented structure, unrealistic economics, or over-trusted attribution.

## First-pass triage

| Check | If broken | Priority |
|---|---|---|
| Measurement | Pixel/CAPI missing, duplicate events, wrong primary event, poor deduplication | Fix before bid or structure changes |
| Conversion quality | Raw leads, low-margin purchases, shallow app events dominate | Redesign event/value feedback |
| Creative | Low hook/CTR, fatigue, near-duplicate assets, weak proof/offer | Refresh concepts before bid tweaks |
| Destination | LP/form/checkout/app store mismatch or friction | Fix destination before scaling |
| Structure | Too many campaigns/ad sets, tiny budgets, audience overlap | Consolidate around clean signal |
| Economics | Target CPA/ROAS impossible | Reset target, offer, margin, or budget |
| Attribution | Retargeting/VTC/existing customers inflate ROAS | Separate reporting and test incrementality |

---

## Spend high, conversions low

```
Spend high, conversions low
├── Tracking broken?
│   └── Verify Pixel/CAPI, deduplication, event firing, value/currency
├── Optimization event wrong?
│   └── Use the deepest reliable event with enough volume
├── Creative attracts attention but not intent?
│   └── Rework offer, proof, qualification, and message-to-page match
├── Destination weak?
│   └── Fix LP, form, checkout, app store, speed, trust, pricing
├── Audience too narrow or fragmented?
│   └── Consolidate and broaden where business constraints allow
└── Budget too small for CPA?
    └── Narrow structure or use a validated proxy event
```

---

## Leads cheap, quality low

```
Leads cheap, quality low
├── Instant Form too low-friction?
│   └── Use Higher Intent and add qualifying questions
├── Offer attracts poor-fit users?
│   └── Add price, fit, service-area, role, or intent qualifiers
├── Optimizing to raw leads?
│   └── Import MQL/SQL/opportunity events or use CRM feedback
├── Placement quality issue?
│   └── Review placement/source quality; test Audience Network exclusion if needed
├── Sales follow-up slow?
│   └── Audit speed-to-lead, routing, and CRM statuses
└── Broad delivery finding cheap pockets?
    └── Add business constraints and sharper creative qualification
```

---

## CTR high, CPA high

| Cause | How to identify | Action |
|---|---|---|
| Clickbait hook | High CTR, poor LP CVR, weak time-on-site | Make hook qualify intent, not just curiosity |
| Offer mismatch | Users click but do not convert | Align ad promise, LP headline, price, proof, CTA |
| Wrong event | Many shallow actions, few purchases/leads | Move primary event deeper when volume allows |
| Low trust | Drop-off near purchase/form | Add reviews, guarantees, credentials, demos |
| Audience mismatch | Engagement from poor-fit users | Tighten creative qualification or controls |

Do not optimize CTR in isolation. A higher CTR can worsen CPA if it attracts low-fit users.

---

## CPM or frequency rising

| Cause | How to identify | Action |
|---|---|---|
| Creative fatigue | Frequency rising, CTR falling, CPA rising | Launch meaningfully new concepts |
| Audience saturation | Small audience, high frequency, limited reach | Broaden, consolidate, or cap remarketing |
| Auction pressure | CPM rises across fresh creatives too | Review seasonality, competition, offer, budget pacing |
| Budget jump exposed weak library | CPA rises after scaling | Add creative depth or scale more gradually |
| Retargeting overexposure | Warm frequency high, VTC-heavy ROAS | Cap budget, refresh message, test holdout |

---

## Learning limited or unstable delivery

```
Learning limited / unstable
├── Budget ÷ CPA cannot buy enough events?
│   └── Consolidate or increase budget
├── Too many ad sets or campaigns?
│   └── Merge around goal, geo, and business logic
├── Event too deep for current volume?
│   └── Use validated proxy temporarily
├── Too many recent edits?
│   └── Stop changing; let stabilization window pass
├── Creative library too thin?
│   └── Add distinct concepts, not tiny variants
└── Bid/control too restrictive?
    └── Use Lowest Cost / Highest Volume until stable
```

---

## Advantage+ Sales ROAS high, business revenue flat

```
ASC ROAS high, business revenue flat
├── Existing-customer share high?
│   └── Review audience/customer breakdowns and customer definitions
├── Retargeting or warm-pool bias?
│   └── Compare cold/new-customer metrics and run holdout if possible
├── View-through share high?
│   └── Report click-through and view-through separately
├── Low-margin products dominate?
│   └── Use product sets, value rules, or profit-aware reporting
├── Catalog/feed issue?
│   └── Check availability, price, product mix, creative coverage
└── No incrementality evidence?
    └── Use geo/customer holdout, conversion lift, or finance reconciliation
```

---

## Creative test produces no clear winners

| Cause | Diagnosis | Action |
|---|---|---|
| Variants are too similar | Same hook/visual/offer repeated | Test different concepts |
| Too many ads for budget | Many ads get no impressions | Reduce test size |
| Judging too early | Few conversions or delayed conversions | Extend window |
| Wrong KPI | Optimizing hook/CTR while CPA matters | Tie readout to funnel stage |
| Campaign structure biases delivery | One ad gets early spend by chance | Use controlled test setup only when budget supports it |

---

## Diagnostic answer format

When diagnosing an account, return:

1. Likely root causes ranked by confidence.
2. Evidence needed to confirm or reject each cause.
3. Changes to make now.
4. Changes to avoid until more data arrives.
5. Expected stabilization window.
