# Campaign Strategy

Use this reference for X Ads campaign structure, objectives, targeting, bidding, budgets, measurement, and operating cadence.

## Campaign Structure

X Ads Manager uses three levels:

```text
Campaign
  -> Ad group
      -> Ad
```

| Level | Main decisions |
|---|---|
| Campaign | Objective, funding source, campaign name, optional campaign-level spend cap or Campaign Budget Optimization |
| Ad group | Goal, bid, targeting, placements, budget controls, flight dates |
| Ad | Post, creative, card, CTA, destination, tracking |

One campaign can contain multiple ad groups, and each ad group can contain one or more ads. X can auto-optimize toward better-performing ads within an ad group.

## Objective Selection

| Funnel | Objective | Use when | Typical result metric |
|---|---|---|---|
| Awareness | Reach | The goal is efficient exposure | Reach, impressions, CPM |
| Consideration | Video views | The goal is video consumption | Views, view rate, CPV |
| Consideration | Website traffic | The goal is site visits | Link clicks, CPC, landing page actions |
| Consideration | Pre-roll views | The goal is pre-roll video against premium content | Pre-roll views, CPV |
| Consideration | Engagement | The goal is post interaction | Engagements, CPE, engagement rate |
| Consideration | App installs | The goal is new app users | Installs, CPI |
| Conversion | App re-engagements | The goal is app activity from existing users | App events, CPA |
| Conversion | Website conversions | The goal is tracked website outcomes | Conversions, CPA, ROAS |

Choose the objective that matches the business outcome. Do not use Website traffic when the real goal is a tracked conversion unless conversion volume or tracking is not ready.

## Buying Path

| Buying path | Best for | Notes |
|---|---|---|
| Self-serve | Always-on performance, tests, standard Promoted Ads, many app/website objectives | Managed in X Ads Manager |
| Managed service | Takeovers, sponsorships, premium reservation inventory, large events | Requires X sales/support involvement or eligibility |

## Targeting

### Targeting Inputs

| Type | Examples | Use |
|---|---|---|
| Demographic / device | Location, language, device, age, gender | Basic eligibility and market control |
| Interest / behavior | Interests, conversations, events, movies/TV | Broad audience shaping |
| Keyword | Search or conversation keywords | Capture topic and intent signals |
| Follower look-alikes | Users similar to followers of selected handles | Reach communities around relevant accounts |
| Custom Audiences | Customer lists, website visitors, app users, engagement audiences | Retargeting, suppression, high-value seeds |

### Targeting Principles

- Start broad enough for delivery, then narrow only for business, compliance, or measurement reasons.
- Use keyword and conversation targeting when the campaign depends on real-time intent or cultural context.
- Use follower look-alikes as a signal, not as a guarantee of buyer quality.
- Use Custom Audiences for retargeting, exclusions, and high-intent seed audiences.
- Avoid mixing many targeting ideas in one ad group if it will make learning or reporting unreadable.

## Budget and Bidding

| Situation | Recommended posture |
|---|---|
| New launch | Use a simple structure and enough budget for the primary KPI to register meaningful signal |
| Creative test | Keep tests small and use clear concept differences |
| Performance scaling | Shift budget toward ad groups and creatives with stable downstream quality |
| Premium placement | Confirm availability, minimums, dates, and measurement plan before recommending |

Campaign Budget Optimization can be useful when ad groups share the same goal and the system should allocate spend automatically. Use ad-group budgets when strict allocation, audience tests, or message tests matter.

## Measurement

| Goal | Required measurement |
|---|---|
| Website traffic | UTMs, landing page analytics, bounce/CVR checks |
| Website conversions | X Pixel and/or Conversion API, event definitions, deduplication where relevant |
| App installs / re-engagement | Mobile measurement partner or app event tracking |
| E-commerce / DPA | Product catalog, pixel/events, catalog feed health, purchase value |
| Lead generation | Form events, CRM stages, qualified lead feedback |
| Brand / awareness | Reach, frequency, video view quality, lift study or proxy brand metrics where available |

Use platform metrics for optimization, but reconcile with business data such as orders, CRM, app revenue, or finance reporting.

## Operating Cadence

| Cadence | Focus |
|---|---|
| Daily | Delivery, spend anomalies, disapprovals, tracking breaks |
| Weekly | Creative performance, audience quality, KPI pacing, landing page/app quality |
| Biweekly | New creative concepts, targeting tests, budget shifts |
| Monthly | Structure review, measurement health, source-of-truth reconciliation |

Avoid changing budget, bid, targeting, creative, and conversion events all at once unless the setup is clearly wrong.
