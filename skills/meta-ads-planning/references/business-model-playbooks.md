# Business-model playbooks

Use this reference before choosing Meta campaign objectives or structure. Business model, sales motion, margin, conversion latency, and creative supply decide what "good" Meta architecture looks like.

## Selection principles

| Business model | First question | Default bias | Main risk |
|---|---|---|---|
| E-commerce / D2C | Is purchase/value tracking and catalog data reliable? | Sales with broad/Advantage+ delivery, plus creative testing | Platform ROAS hiding margin or existing-customer bias |
| B2B lead generation | Can qualified lead or pipeline feedback be sent back? | Leads/Sales with quality loop, not raw CPL chasing | Optimizing to cheap unqualified leads |
| SaaS / subscription | Which event predicts activation, paid conversion, or retention? | Leads/Sales from trial/signup toward value events | Optimizing to trials that do not activate |
| Local service | Are service area, schedule, booking/call handling, and local proof clear? | Leads/Sales plus local awareness when needed | Paying for out-of-area or low-intent leads |
| App | Which in-app event predicts retained value? | App promotion with staged event depth | Optimizing forever to installs |
| Brand / awareness | What lift or downstream behavior proves value? | Awareness/video with a measurement plan | Treating reach or video views as business impact |

---

## E-commerce / D2C

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Manual Sales or Advantage+ Sales when ready | Establish purchase/value signal and creative baseline |
| Stabilize | Sales scaling + creative testing | Scale validated creative while feeding new concepts |
| Scale | Advantage+ Sales/manual Sales plus catalog/product-set logic where useful | Expand delivery while monitoring new/existing customers and margin |

### Conversion design

| Signal | Use |
|---|---|
| Purchase with value | Primary baseline |
| Profit-aware or contribution value | Better when margin, discount, shipping, or return rates vary materially |
| AddToCart / InitiateCheckout | Temporary proxy only when purchases are too sparse and the proxy predicts purchase |
| New customer / existing customer segment | Reporting and budget-control input, not always an optimization event |

### Design notes

- Advantage+ Sales can work well when conversion tracking, product-market fit, budget, and creative diversity are strong.
- Validate Advantage+ Sales with new-customer rate, incrementality, and business revenue, not platform ROAS alone.
- If existing-customer harvesting is a risk, define customer/engaged-customer audiences and consider manual Sales structures or exclusions where current UI supports them.
- Product feed quality matters: names, images, availability, prices, product sets, margin labels, sale status, and inventory should support decisions.
- Catalog-led formats and static/video concepts should be tested against each other; do not assume dynamic/catalog ads always win.

---

## B2B Lead Generation

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Leads or Sales with tightly defined conversion quality | Build lead volume and quality baseline |
| Stabilize | Lead capture + education/remarketing | Use video/proof to warm longer-cycle buyers |
| Scale | Broader prospecting once CRM feedback is usable | Expand only after cheap-lead traps are controlled |

### Conversion design

| Signal | Use |
|---|---|
| Raw Instant Form lead | Primary only if quality and follow-up are stable |
| Higher Intent Instant Form lead | Better when lead value justifies friction |
| Website lead / demo request | Often higher intent, lower volume |
| Qualified lead / MQL / SQL / opportunity | Preferred when import volume and latency are workable |

### Design notes

- Cheap CPL is not the goal. Monitor qualified lead rate, opportunity rate, close rate, speed-to-lead, and sales feedback.
- Use qualifying questions, pricing/fit cues, and clear copy to repel poor-fit leads.
- Test Instant Forms against website conversion paths; mobile friction and lead quality often trade off.
- Audience Network or very broad placements may need review when lead quality is hard to verify.
- For small budgets, consolidate around one clean lead-quality loop before adding awareness or retargeting.

---

## SaaS / Subscription

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Leads/Sales for signups, demos, or trials | Prove initial acquisition signal |
| Stabilize | Conversion campaign + proof/education creative | Improve trial or demo quality |
| Scale | Value-aware optimization where volume supports it | Move toward subscription, retained user, or LTV signal |

### Conversion design

| Signal | Use |
|---|---|
| Signup / free trial | Useful early signal if activation quality is monitored |
| Demo request | Good for sales-led SaaS when qualification is present |
| Activated trial / product-qualified lead | Better predictor than raw signup |
| Subscription / retained value | Business truth, but may be sparse or delayed |

### Design notes

- Separate self-serve trial and sales-led demo economics if they differ.
- Creative should explain the problem, show the product, prove trust, and handle switching objections.
- Avoid optimizing to low-intent content downloads unless they predict pipeline.
- Feed CRM/product activation feedback back to Meta when possible.

---

## Local Service / Local Business

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Leads/Sales or Awareness + Leads | Capture local demand and establish proof |
| Stabilize | Local conversion + remarketing | Re-engage site visitors and past engagers |
| Scale | Awareness/video + conversion campaign | Build local familiarity when direct demand is limited |

### Conversion design

| Signal | Use |
|---|---|
| Booking / appointment | Preferred when trackable |
| Qualified call | Primary when call handling is strong |
| Lead form | Primary if quality can be reviewed |
| Store sale / POS / booked job | Business truth |

### Design notes

- Geo constraints are real business controls. Do not let broad delivery cross service boundaries.
- Local proof matters: reviews, nearby references, staff/team credibility, before/after, store or service-area clarity.
- Align ad schedule with call handling. Missed calls are an operations failure that can look like poor ad performance.
- Exclude customers only when repeat/replenishment is not the goal.

---

## App

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | App promotion optimized to installs | Build install and event baseline |
| Stabilize | App promotion optimized to in-app event | Move toward quality once volume supports it |
| Scale | Value optimization / ROAS where available | Optimize toward revenue or retained value |

### Conversion design

| Signal | Use |
|---|---|
| Install | Early volume signal only |
| Registration / tutorial complete / key action | Proxy if it predicts retention |
| Purchase / subscription / retained value | Preferred once volume is stable |

### Design notes

- Stage the optimization event from install to value as signal matures.
- Split iOS/Android when measurement, economics, or event volume differ materially.
- Creative should show the app experience quickly; use motion and proof, not only app-store screenshots.
- Re-engagement deserves incrementality skepticism because returning users may have come back organically.

---

## Brand / Awareness

### Best-fit campaign mix

| Stage | Campaigns | Role |
|---|---|---|
| Launch | Awareness or Engagement video | Build reach, recall, and warm pools |
| Stabilize | Awareness + conversion capture | Connect demand creation to downstream behavior |
| Scale | Full-funnel structure | Use lift, search lift, direct traffic, or blended metrics to validate |

### Conversion design

| Signal | Use |
|---|---|
| Reach / frequency | Delivery control, not business truth |
| ThruPlay / video views | Creative engagement and warm-pool creation |
| Brand lift / conversion lift | Preferred when available |
| Search/direct/site traffic lift | Useful triangulation |

### Design notes

- Awareness campaigns need creative and measurement discipline. Do not launch "cheap reach" without a job.
- Video hooks, distinctive assets, category entry points, and proof matter more than perfect audience slicing.
- Frequency targets are contextual; watch fatigue, CTR, recall, and downstream behavior.

---

## Multi-campaign combination patterns

Use these patterns as starting points. Adjust based on budget sufficiency, conversion volume, measurement quality, creative supply, and incrementality risk.

### Creative testing + scaling

```
Creative Test Campaign       <- controlled concept discovery
Sales/Leads Scaling Campaign <- proven concepts and broader delivery
```

Use a separate testing campaign only when the budget can fund it. Small accounts often need one consolidated campaign that tests and scales together.

### E-commerce acquisition with customer controls

```
Sales or Advantage+ Sales     <- main purchase engine
Manual Sales Prospecting      <- stricter customer exclusions if needed
Remarketing / CRM campaign    <- only if message or budget control is needed
```

Monitor new vs existing customer contribution. If platform ROAS is strong but business revenue is flat, diagnose existing-demand harvesting and view-through inflation.

### Lead generation quality loop

```
Lead Capture Campaign         <- Instant Form or website lead
Education / Proof Campaign    <- video, testimonials, objections
CRM Feedback Loop             <- qualified lead / opportunity events
```

Do not scale raw leads until qualified lead rate and follow-up are acceptable.

### App staged optimization

```
Install Campaign              <- early event volume
In-App Event Campaign         <- quality proxy
Value / ROAS Campaign         <- monetization once volume supports it
```

Kill or graduate install optimization when it no longer predicts retained value.
