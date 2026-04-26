# Business-model playbooks

Use this reference before choosing campaign types. Business model, sales motion, margin, and conversion latency decide what "good" Google Ads architecture looks like.

## Selection principles

| Business model | First question | Default bias | Main risk |
|---|---|---|---|
| B2B lead generation | Can we import qualified pipeline, not just form submits? | Search first, then P-MAX / Demand Gen once signal quality is reliable | Optimizing to cheap unqualified leads |
| Local service | Is the service area, call handling, and schedule clear? | Search + call / lead tracking first | Paying for out-of-area or low-intent queries |
| E-commerce | Is the feed, margin data, and purchase value tracking clean? | Shopping / P-MAX with feed, plus Search for high-intent themes | Revenue ROAS hiding poor margin |
| High-ticket / long sales cycle | What proxy reliably predicts revenue? | Search and remarketing with offline conversion imports | Judging too early on shallow leads |
| App / subscription | Which event predicts retention or LTV? | App campaigns with staged event depth | Optimizing forever to installs |
| Store visit / omnichannel | Can store visits or store sales be measured credibly? | P-MAX Store Goals + geo Search | Platform visits not tying back to sales |

---

## B2B lead generation

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Search non-brand + brand | Capture explicit demand and build query / lead-quality baseline |
| Stabilize | Search + remarketing Display / Demand Gen | Re-engage researched visitors and warm long-cycle buyers |
| Scale | Search + P-MAX / Demand Gen | Expand once offline conversion quality is imported or proxy quality is proven |

### Conversion design

| Signal | Use |
|---|---|
| Raw form submit | Primary only if lead quality is stable and close-rate variance is small |
| Qualified lead / MQL / SQL | Preferred primary signal when import volume and latency are workable |
| Opportunity / closed-won | Best signal, but often too delayed or sparse to use alone |
| Whitepaper / webinar / pricing-page view | Secondary by default. Use as primary only if proven to predict pipeline |

### Design notes

- Split brand and non-brand. Brand leads often look cheap but rarely represent full incremental demand.
- Do not mix demo requests and low-intent content downloads under one target CPA.
- For P-MAX lead gen, turn Final URL expansion off or use strict URL exclusions when the site has blog, careers, support, or low-intent pages.
- Use CRM feedback to evaluate lead source, lead quality, opportunity rate, and close rate, not just form CPA.

---

## Local service

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Search by service + location | Capture urgent local demand |
| Stabilize | Brand Search + non-brand Search | Separate defensive demand from acquisition |
| Scale | P-MAX Store Goals / local P-MAX where eligible | Add Maps and broader local surfaces when measurement is credible |

### Conversion design

| Signal | Use |
|---|---|
| Phone call over qualified duration | Primary when call handling is strong |
| Form submit / booking | Primary if appointment quality is trackable |
| Directions / store visit | Useful for local goals, but reconcile against bookings or POS where possible |

### Design notes

- Use "Presence" location targeting unless remote interest is valuable.
- Build negatives for jobs, DIY, certification, free, out-of-area, and services not offered.
- Align ad schedule with call handling; wasted calls are a measurement and operations problem, not only an ads problem.
- Track missed calls and booked appointments. Call volume without service revenue can mislead bidding.

---

## E-commerce

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Standard Shopping or P-MAX with feed, plus brand Search | Establish feed / product / query baseline |
| Stabilize | P-MAX + Search for high-intent categories | Scale purchase capture and protect strategic queries |
| Scale | P-MAX by margin / category + Demand Gen product discovery | Expand discovery while protecting profit |

### Conversion design

| Signal | Use |
|---|---|
| Purchase with dynamic value | Primary baseline |
| Gross profit or contribution value | Better than revenue when margin varies materially |
| Add to cart / begin checkout | Secondary by default. Use as primary only when purchases are too sparse and the proxy is validated |

### Design notes

- Feed quality is targeting quality: titles, GTINs, prices, availability, images, product_type, and custom labels matter before campaign tweaks.
- Segment by margin only when it changes bidding, budget, or target ROAS decisions.
- Do not evaluate revenue ROAS without margin. A high-ROAS low-margin SKU can be a poor business result.
- Use product-level analysis: winners, developing products, money pits, and no-exposure SKUs need different actions.

---

## High-ticket / long sales cycle

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Search high-intent + brand | Keep traffic quality tight |
| Stabilize | Search + remarketing | Re-engage long consideration cycles |
| Scale | Demand Gen / YouTube for education | Create demand only after measurement and follow-up are strong |

### Conversion design

| Signal | Use |
|---|---|
| Consultation request / quote request | Primary if quality is stable |
| Qualified opportunity | Preferred when importable |
| Purchase / closed-won | Business truth, but usually too delayed as the only optimization signal |

### Design notes

- Use longer evaluation windows and account for conversion delay.
- Separate budget for education / mid-funnel from high-intent capture.
- Build LPs around proof, risk reversal, qualification, and sales-process clarity.
- Avoid low-friction lead magnets as primary goals unless they predict pipeline.

---

## App / subscription

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | App install campaign | Build install volume and event baseline |
| Stabilize | App action campaign | Optimize to the deepest stable event |
| Scale | tROAS / value bidding where volume supports it | Optimize toward revenue or retained value |

### Conversion design

| Signal | Use |
|---|---|
| Install | Early volume signal only |
| Registration / tutorial complete / paywall view | Proxy event if it predicts retention or purchase |
| Trial start / subscription / purchase | Preferred once volume is stable |
| Retention / LTV | Business truth for scaling decisions |

### Design notes

- Launch shallower, then graduate deeper as volume supports it.
- Split iOS and Android because measurement, attribution, and learning differ.
- Creative variety means different motivations and use cases, not just resized cuts.
- Re-engagement needs incrementality skepticism; many returning users would come back organically.

---

## Store visit / omnichannel

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Local Search + brand | Capture explicit nearby demand |
| Stabilize | P-MAX Store Goals | Expand local surfaces and optimize toward visits / local actions |
| Scale | Omnichannel P-MAX + Demand Gen where available | Support product discovery and store traffic |

### Conversion design

| Signal | Use |
|---|---|
| Store visit | Directional optimization signal |
| Store sale / POS import | Preferred business truth |
| Calls / directions | Useful local-action signals, but should not replace sales reconciliation |

### Design notes

- Keep Google Business Profile, store hours, inventory, and local landing pages accurate.
- Use geo splits only when budget, service area, inventory, or store economics differ.
- Reconcile store traffic with POS, bookings, or store-level revenue where possible.
- Avoid over-crediting branded/local searches without incrementality checks.

---

## Multi-ad-type combination patterns

Use these patterns as starting points when a business model or funnel role needs more than one campaign type. Adjust the structure based on budget sufficiency, conversion volume, measurement quality, creative supply, and incrementality risk.

### Search + P-MAX

Most common pattern when high-intent capture and automated expansion both make sense.

```
Search (brand KW)              <- brand defense
Search (high-intent KW)        <- exact-match capture
P-MAX (full assets or feed)    <- automated expansion
```

Search exact match takes priority over P-MAX. Set P-MAX brand exclusions when brand capture would hide acquisition performance.

### E-commerce full funnel

Best fit when the feed, purchase tracking, margin view, and product-page quality are strong enough to support automated scale.

```
P-MAX (with feed)               <- main engine across Google surfaces
Search (non-brand, high intent) <- captures intent P-MAX may miss
Standard Shopping (optional)    <- protects diagnostics or underserved products
Display remarketing             <- cart abandonment and product viewers
```

### B2B lead generation

Best fit when Search intent is clear and lead quality can be monitored or imported from CRM.

```
Search (brand + problem KW)            <- capture high-intent users
P-MAX (full assets, URL expansion off) <- expansion and remarketing
Video (YouTube, optional)              <- education and trust
```

For P-MAX lead gen, keep URL expansion off or use strict URL exclusions when the site contains blog, careers, support, or low-intent pages.

### Awareness to conversion

Best fit when the goal is demand creation followed by capture, not immediate last-click CPA alone.

```
Video (YouTube Reach / Views) <- awareness phase
Demand Gen / Display          <- awareness reinforcement and mid-funnel warming
Search (brand KW)             <- capture branded search lift
P-MAX                         <- broad conversion coverage
```

Evaluate this pattern with blended performance, brand-search lift, assisted conversions, audience growth, and incrementality tests where volume allows.
