# Campaign Strategy

Use this reference for TikTok Ads Manager structure, objectives, targeting, bidding, automation, learning, scaling, and measurement.

## Campaign Structure

TikTok Ads Manager uses three levels:

```text
Campaign
  -> Ad Group
      -> Ad
```

| Level | Main decisions |
|---|---|
| Campaign | Objective, budget type, campaign name, campaign-level budget / Campaign Budget Optimization where available |
| Ad Group | Optimization event, placement, targeting, bid strategy, budget, schedule, attribution settings |
| Ad | Identity, creative, caption, CTA, destination, product links, tracking |

Keep the structure simple unless there is a real reason to split by objective, market, conversion event, product economics, audience, creative test, placement, or owner.

## Structure Practice

Default to consolidation, then split only for control:

| Split reason | Good reason |
|---|---|
| Objective / event | Different optimization goals or conversion quality |
| Economics | Different CPA/ROAS targets, margin, AOV, LTV, or budget owner |
| Market / language | Different legal, shipping, language, or creative needs |
| Destination | Website, app, TikTok Shop, Instant Form, messaging |
| Placement quality | TikTok vs Pangle / Global App Bundle diagnosis |
| Creative test | Clean concept/creator/offer test |
| Policy | Restricted category or claim/disclosure requirements |

Avoid splitting by every interest category, tiny demographic hunch, or minor creative variant. Over-fragmentation starves learning and makes results harder to interpret.

## Objectives

TikTok objective labels vary by account and rollout stage. Common planning labels include:

| Funnel | Objective / flow | Use when |
|---|---|---|
| Awareness | Reach | Maximize exposure |
| Consideration | Traffic | Drive visits to a website, app, or landing destination |
| Consideration | Video Views | Drive video consumption |
| Consideration / managed | Brand Consideration | Grow high-intent mid-funnel audiences where TikTok Market Scope access is available |
| Consideration | Community Interaction | Grow follows/profile visits or account interaction where available |
| Conversion | Lead Generation | Collect leads through Instant Forms or a website form |
| Conversion | App Promotion | Drive app installs or in-app events |
| Conversion / commerce | Sales | Drive website, app, or TikTok Shop sales in current account flows |
| Commerce automation | Product GMV Max / LIVE GMV Max | Maximize TikTok Shop GMV or LIVE revenue |

Use current TikTok Ads Manager labels in final implementation notes. Older interfaces may show Website Conversions or Product Sales; newer interfaces may consolidate these under Sales. Treat Brand Consideration as gated until the account confirms access.

## Budget and Bidding

Common bid/optimization options include:

| Option | Use when |
|---|---|
| Maximum Delivery | Early learning, broad delivery, limited history |
| Cost Cap | You need CPA/CPI control and have enough signal |
| Bid Cap | You need hard bid discipline and can tolerate limited delivery; availability varies by surface |
| Highest Value | Value-based optimization where value signals are reliable and scale matters |
| Minimum ROAS | Web value optimization when ROAS guardrails matter |
| Target ROAS | App value optimization where the account supports app VBO targets |
| Target ROI | GMV Max campaigns with enough product/order signal |

Budget should be evaluated against expected conversion volume. If the campaign cannot generate enough meaningful actions, reduce fragmentation or optimize temporarily to a higher-volume event.

Avoid relying on older **Target Cost** terminology unless it appears in the account. TikTok increasingly steers CPA control through Cost Cap and related Smart+ flows.

## Targeting

| Targeting type | Examples | Use |
|---|---|---|
| Broad | Minimal constraints | Let TikTok learn from creative and conversion signals |
| Demographic | Location, language, age, gender | Market and eligibility control |
| Interest/behavior | Interest categories, video interactions, creator/category behavior | Audience shaping |
| Purchase Intent | Near-term shopping signals within interest targeting where available | Commerce and lower-funnel prospecting |
| Custom Audiences | Customer lists, website visitors, app users, engagement audiences | Retargeting and suppression |
| Lookalike Audiences | Modeled from Custom Audience seeds | Scale from high-value seeds |
| Search keywords | Search Ads keyword targeting | Capture active TikTok search intent |
| Placement | TikTok, Pangle, Global App Bundle, Lemon8, other eligible placements | Control inventory and app/network mix |

Broad targeting is often the default starting point when the conversion signal and creative system are strong. Narrow targeting can still be useful for regulated categories, local markets, creator/community fit, or clean testing.

**Smart Targeting** can let TikTok deliver outside selected Interest & Behavior or Audience settings when the system predicts better objective completion. Use it deliberately, document where it is enabled, and avoid it when strict audience containment is required.

Pangle and Global App Bundle are external or off-TikTok app inventory, not TikTok feed inventory. Keep them separate in diagnosis when placement quality or app context matters.

## Smart+ and Automation

Smart+ is an auction automation mode, not a standalone buying path. Smart+ products automate parts of targeting, bidding, creative assembly, and budget allocation. Current official flows include:

| Smart+ flow | Use |
|---|---|
| Smart+ Web Campaigns | Website conversion goals under Sales |
| Smart+ App Campaigns | App Promotion for installs, in-app events, or app value where supported |
| Smart+ Lead Generation Campaigns | Instant Form, website, TikTok Direct Messages, or supported instant messaging leads |
| Smart+ Traffic Campaigns | Click or Landing Page View traffic goals |
| Smart+ Catalog Ads | Catalog-driven website/app product advertising inside Smart+ flows |

Use Smart+ when:

- The account has enough conversion or commerce signal.
- Creative supply is diverse and high quality.
- The business can tolerate less manual control.
- Measurement outside TikTok Ads Manager is available.

Do not treat automation as a replacement for strategy. Humans still own event design, product economics, creative direction, identity/account setup, policy, budget constraints, and source-of-truth reporting. In the upgraded Smart+ experience, some accounts can choose full automation, partial automation, or manual control in one flow.

## Learning and Scaling

Default operating rules:

- Avoid changing budget, bid, targeting, creative, and event definitions all at once.
- Batch changes and keep a change log.
- Let conversion delay and learning stabilize before judging CPA/ROAS.
- Scale winners gradually unless a fixed event or sale requires a burst.
- Refresh creative before over-restructuring the account.

TikTok learning guidance says volatility often declines after about 25 campaign results or 7 days. Significant budget changes, bid/ROAS target changes, bidding strategy changes, targeting changes, pauses, and unreasonable creative volume can trigger or prolong learning. Treat the first week as a stability window unless tracking, policy, delivery, or destination quality is broken.

## Operating Cadence

| Cadence | Focus | Avoid |
|---|---|---|
| Daily | Spend anomalies, tracking/policy breaks, delivery failures, obvious creative issues | Daily bid/target micromanagement |
| Weekly | Creative readout, comments, search terms, lead/order quality, budget pacing, change log | Rebuilding because of a few noisy days |
| Monthly | Creative pipeline, landing page, product/feed/shop quality, CRM or finance reconciliation | Letting launch assumptions persist |
| Quarterly | Incrementality, channel role, attribution windows, business-model fit, lift tests | Treating platform ROAS as final truth |

## Retargeting

Common retargeting pools:

| Pool | Typical use |
|---|---|
| Website visitors | Reminder, proof, offer, objection handling |
| Add-to-cart / checkout | High-intent recovery |
| Video viewers | Education or sequential messaging |
| Lead form opens/submits | Lead quality and follow-up |
| App users | Re-engagement and lifecycle offers |
| TikTok Shop engagers | Product, LIVE, or GMV Max support |

Keep retargeting windows aligned with the buying cycle. Separate retargeting from prospecting when reporting or incrementality matters.

## Measurement

| Goal | Required measurement |
|---|---|
| Website conversions / Sales | TikTok Pixel and/or Events API, event definitions, deduplication where relevant |
| App promotion | Approved Mobile Measurement Partner or TikTok SDK/app events; SKAN/iOS setup where relevant |
| Lead generation | Instant Form exports/API, CRM stages, qualified lead feedback |
| TikTok Shop / GMV Max | Seller Center / Shop connection, product permissions, order/GMV reporting |
| Search Ads | Keyword-level reporting, UTMs, landing-page analytics |
| Brand / reservation | Reach, frequency, video metrics, lift study or proxy demand reads |

Use TikTok Ads Manager for tactical optimization, but reconcile against orders, CRM, app analytics, TikTok Shop/Seller Center, finance reporting, and incrementality tests where possible.

For web signals, Pixel + Events API is the default robust setup when feasible. If the same event is sent through both, pass `event_id` through both channels for deduplication.

Use the current standard event names for new setups. TikTok's 2025 standard-event update renamed `SubmitForm` to `Lead` and `CompletePayment` to `Purchase`; legacy names may continue to work during the support window, but new planning should use `Lead` and `Purchase`.

For brand and upper-funnel work, use TikTok Brand Lift Study or Conversion Lift Study where managed access and budget allow. Otherwise define proxy reads in advance: reach, frequency, view quality, branded search, direct traffic, profile visits, Shop activity, and downstream retargeting pools.
