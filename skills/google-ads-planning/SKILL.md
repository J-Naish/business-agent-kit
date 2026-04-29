---
name: google-ads-planning
description: Plan and design Google Ads campaigns end-to-end — choose the right ad types, design account structure, pick bidding strategies, configure conversion measurement, and decide what gets launched and how. Covers both new launches and improvements to existing accounts. Use this skill whenever the user mentions Google Ads, paid search, search ads, display ads, shopping ads, video / YouTube ads, Performance Max (P-MAX), Demand Gen, or app install campaigns, or asks how to structure / improve / launch a Google Ads account. Skip for unrelated paid-media platforms (Meta, X, TikTok, etc.).
---

# Google Ads Planning

Plan a Google Ads program end-to-end: ad-type selection, campaign architecture, bidding, conversion measurement, and the operational decisions that turn a plan into a running account. This skill covers both new launches and improvements to existing accounts.

## Practice-first stance

Google Ads planning should prioritize the practices that make campaigns work, not just the settings that make campaigns valid. Campaign type, account structure, and bid settings matter, but they are secondary to measurement quality, conversion signal design, creative quality, feed/landing-page quality, budget sufficiency, and disciplined operating cadence.

Before proposing campaign settings, check these first:

| Area | What to verify | Why it matters |
|---|---|---|
| Conversion design | Primary vs secondary actions, qualified-lead imports, dynamic values, deduplication | Bad signals make Smart Bidding optimize bad outcomes |
| Incrementality | Brand vs non-brand, VTC handling, geo/holdout feasibility, finance source of truth | Platform ROAS is a steering signal, not finance truth |
| Creative system | Number of distinct concepts, refresh cadence, offer clarity, proof, format coverage | Automation cannot rescue weak or stale creative |
| Feed / landing page | Product titles, prices, availability, LP match, page speed, form friction | Ads amplify the destination and feed quality |
| Budget and volume | Conversion volume, target CPA/ROAS realism, budget-to-bid ratio | Underfunded campaigns never learn properly |
| Controls | Negative keywords, brand exclusions, URL exclusions, placement/content exclusions, suppression lists | Broad automation needs guardrails |
| Operating cadence | Daily sanity, weekly review, monthly audit, quarterly strategy reset | Most failures come from either neglect or over-editing |

### Core operating rules

- Start from business outcome and unit economics, not from campaign menus.
- Treat the conversion action as the strategy. Prefer the deepest reliable signal with enough volume and acceptable latency; keep weak micro-conversions secondary or low-value by default.
- Separate platform performance from incrementality. Brand capture, VTC, modeled conversions, and attribution overlap can overstate Search, P-MAX, Display, Demand Gen, and Video impact.
- Consolidate for learning; split only for real control needs: budget, goal, margin, geo, language, conversion value, customer type, or owner.
- Treat creative as a primary lever. Prefer distinct concepts over cosmetic variants, and use AI to produce/iterate from human-defined angles rather than to invent generic positioning.
- Do not chase cheap CPC/CPM/CPV/CPI unless downstream quality, brand safety, and incrementality remain acceptable.
- Use automation deliberately. Humans still own conversion definitions, value rules, exclusions, brand controls, feed quality, asset quality, budgets, and incrementality tests.
- Avoid constant intervention. Batch meaningful changes, keep an intent-aware change log, and let learning periods and conversion delay pass before judging.

### Cadence

Use this as the default practice cadence unless the user's account context suggests otherwise:

| Cadence | Focus | Avoid |
|---|---|---|
| Daily | Spend anomalies, conversion drops, tracking/policy/feed breakage | Daily target/budget micromanagement |
| Weekly | Search terms, asset performance, budget pacing, lead/product quality, change-log review | Restructuring because of a few days of noise |
| Monthly | Negative sweeps, creative refresh, feed/title improvements, landing-page review, budget reallocation | Letting launch-era assumptions persist |
| Quarterly | Conversion action redesign, incrementality review, brand/non-brand split, account architecture, target economics | Reporting only platform ROAS |

### Measurement notes

- Use platform metrics for tactical optimization, not as final financial truth.
- Report brand separately from non-brand. For established brands, assume some branded conversions would happen organically unless a holdout or incrementality test says otherwise.
- For P-MAX / Demand Gen / Display / Video, look for incremental contribution, assisted demand, branded search lift, and audience-pool growth; last-click CPA is often incomplete.
- Keep VTC visible but separate by default. Distinguish VTC from engaged-view conversions (EVC): EVC is a biddable video-engagement signal in Video / Demand Gen / P-MAX, while standard VTC is usually reporting-only except for App, P-MAX Store Goals, and Demand Gen campaigns explicitly opted into VTC optimization.
- Use geo holdouts, Customer Match holdouts, campaign experiments, conversion lift, or pre/post analysis when budget and volume allow.
- Reconcile against revenue, pipeline, CRM, app LTV, or contribution margin. Do not sum platform-reported revenue across channels as if it were deduplicated.

### Common Google Ads glossary

Use these shared terms instead of repeating basic definitions in each campaign-type playbook.

| Term | Meaning |
|---|---|
| CV | Conversion: the action the campaign is meant to drive |
| CV value | Monetary or scored value attached to a conversion |
| CPA | Cost per acquisition: spend / conversions |
| ROAS | Return on ad spend: conversion value / spend |
| CTR | Click-through rate: clicks / impressions |
| CPC | Cost per click |
| CPM | Cost per thousand impressions |
| CPV | Cost per video view |
| CVR | Conversion rate: conversions / clicks or interactions |
| IS | Impression share |
| LP | Landing page |
| DDA | Data-driven attribution |
| VTC | View-through conversion: impression without click or engagement, then conversion |
| EVC | Engaged-view conversion: meaningful video engagement, then conversion |
| RSA | Responsive Search Ad |
| RDA | Responsive Display Ad |
| DSA | Dynamic Search Ad |
| P-MAX / PMax | Performance Max |
| DGen | Demand Gen |
| GMC | Google Merchant Center |
| GTIN | Global Trade Item Number |
| SKU | Stock Keeping Unit |
| NCA | New customer acquisition |
| ACi | App campaign for installs |
| ACe | App campaign for engagement |
| ACpre | App campaign for pre-registration |
| SKAN | SKAdNetwork |
| AAK | AdAttributionKit |
| MMP / AAP | Mobile Measurement Partner / App Attribution Partner |
| LTV | Lifetime value |
| KW | Keyword |
| tCPA | Target CPA |
| tROAS | Target ROAS |
| tCPI | Target CPI |
| tCPV | Target CPV |
| tCPM | Target CPM |
| CPI | Cost per install |
| CTA | Call to action |
| VTR | View-through rate / video view rate, depending on report context |
| CTV | Connected TV |
| AG | Asset group |
| LG | Listing group |
| CL | Custom label |
| PLA | Product Listing Ad |
| MPN | Manufacturer Part Number |
| RLSA | Remarketing Lists for Search Ads |
| ATT | App Tracking Transparency |
| SDK | Software Development Kit |
| Deep link | Link that opens a specific screen inside an app |
| Brand Lift | Study measuring changes in ad recall, awareness, consideration, or similar brand outcomes |

## Output flexibility (don't always write a document)

Adapt the output to what the user actually asked for. **There is no requirement to produce a written spec document** — sometimes a conversational answer or a structured inline response is the right deliverable.

| Situation | Output |
|---|---|
| User asks a focused question (e.g. "should I use P-MAX or Search for this?") | Direct answer with reasoning. No document. |
| User wants planning guidance across the full picture | Structured response covering the relevant sections. Still inline by default. |
| User explicitly asks for a written plan / spec / brief | Produce a written deliverable inline or as a Markdown file, depending on the requested handoff format. |
| User is launching a multi-campaign account from scratch and the deliverable will be handed off | A written spec usually fits — but **confirm with the user before writing** rather than assuming. |

When in doubt, ask whether they want a written deliverable or a conversational answer. Default to the lighter form.

---

## Workflow

```
Step 0: Mode detection           → New launch or improvement of existing account
    ↓
Step 1: Information gathering    → Phase A (basics) → business-model read → Phase B (details)
    ↓
Step 2: Viability + ad-type selection → Budget viability → campaign mix that fits
    ↓
Step 3: Strategy formation       → Account structure, bidding, conversion design, budget split, creative strategy
    ↓
Step 4: Practice-led detailed design + delivery → Per-ad-type playbooks; deliver as fits the situation
```

---

## Step 0: Mode detection

Determine which of the two situations applies. If unclear, ask.

| Mode | Trigger | Path |
|---|---|---|
| **New launch** | Google Ads not running yet, or new campaigns being designed from scratch | Step 1 → 2 → 3 → 4 |
| **Improvement of existing account** | Account is already running with performance issues or improvement goals | Step 1 → diagnostic → improvement proposals → Step 3–4 as needed |

### Improvement workflow

For existing accounts, run a diagnostic after Step 1. Use [references/diagnostic-decision-trees.md](references/diagnostic-decision-trees.md) to rank likely root causes before proposing changes.

1. **Inventory** — Account structure, list of running campaigns, current KPI performance.
2. **Issue identification** — Hear the user's pain point, then audit with the diagnostic decision trees:
   - Is the bid strategy appropriate for the conversion volume? (Smart bidding starves with too few conversions.)
   - Account-structure issues — over-fragmentation of campaigns? mixed themes inside an ad group?
   - Are negative keywords adequate? Is the search-terms report showing wasted clicks?
   - Is conversion tracking set up correctly?
   - Any ad groups with low Quality Score?
   - Is budget allocated to the high-performing campaigns?
3. **Improvement proposals** — Ranked actions with evidence, expected stabilization window, and changes to avoid.
4. **Execution** — Document the agreed changes in whatever form fits (conversational, structured response, or written deliverable).

---

## Step 1: Information gathering

### Phase A: Basics (the minimum needed to suggest an ad-type direction)

| Category | Question |
|---|---|
| **Business model** | E-commerce / lead generation / app / store visits / brand awareness — which? |
| **Offer** | What is being sold or promoted? (Product, service, free trial, lead magnet, etc.) |
| **Goal** | Primary KPI (CPA / ROAS / CPI / CPV, etc.) — and a target value if there is one |

After Phase A, propose an ad-type direction using the cheat sheet in Step 2. Once the user agrees, proceed to Phase B.

Before proposing that direction, use [references/business-model-playbooks.md](references/business-model-playbooks.md) to check the default strategy for the business model. This prevents campaign-type selection from becoming menu-driven.

### Phase B: Detailed inputs for design

| Category | Question |
|---|---|
| **Budget** | Monthly or daily ad spend |
| **Landing page** | URL of the destination page |
| **Target audience** | Who to reach (geography, age range, industry, search behavior, etc.) |
| **Existing account state** | Is Google Ads currently running? Issues if yes |
| **Conversion data** | Conversions in the last 30 days (affects which bid strategy is viable) |
| **Product feed** | Is there a Merchant Center product feed? (For e-commerce) |
| **Creative** | Existing video / image assets and the team's ability to produce more |
| **Measurement** | Is conversion tracking already implemented? |

If existing context (business profile, competitive analysis, brand assets, prior audit reports, etc.) is already available in the project, read it first and don't re-ask for information that's already known.

After Phase B, use [references/budget-planning.md](references/budget-planning.md) to check whether the budget can support the proposed campaign mix, expected conversion volume, and bid strategy. If the budget cannot produce enough meaningful signal, narrow the structure before moving to Step 2.

Also check [references/measurement.md](references/measurement.md) when conversion tracking is not yet live, when EEA/UK/CH traffic is in scope (Consent Mode v2 is mandatory there), or when the user mentions tracking issues, lead quality problems, or measurement reconciliation. Bad signal makes every downstream choice worse.

---

## Step 2: Viability + ad-type selection

Before choosing the final mix, combine:

1. Business-model fit from [references/business-model-playbooks.md](references/business-model-playbooks.md).
2. Budget and signal viability from [references/budget-planning.md](references/budget-planning.md).
3. Campaign-type fit from the cheat sheet below.

Do not recommend a campaign type just because it is available. If budget, conversion quality, creative supply, feed quality, or measurement cannot support it, say what must be fixed first.

### Campaign-type cheat sheet

| Campaign | Surface | Pricing | Funnel stage | Automation | Best for |
|---|---|---|---|---|---|
| **Search** | Google Search | CPC | Bottom (high intent) | Medium | All verticals |
| **Display** | GDN (2M+ sites) | CPC / CPM | Top (awareness) | Medium | All verticals |
| **Shopping** | Search / Shopping tab | CPC | Bottom (purchase) | Medium | E-commerce / retail |
| **Video** | YouTube / video partners | CPV / CPM | Top–mid | Medium | All verticals |
| **App** | Search / Play / YouTube / GDN | CPI / CPA | Mid–bottom | High | App publishers |
| **P-MAX** | All 7 channels | CPA / ROAS | Full funnel | Very high | All verticals |
| **Demand Gen** | YouTube / Discover / Gmail / GDN | CPC / CPA / CPM | Top–mid | High | All verticals |

### Per-campaign-type notes

**Search**
- Text ads on Google Search results — best for high-intent users at the bottom of the funnel.
- Responsive Search Ads (RSA): up to 15 headlines + 4 descriptions; AI mixes the best combination.
- AI Max for Search ([Google Ads Help](https://support.google.com/google-ads/answer/15910187?hl=en), [launch note](https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/)): broad match + auto-generated headlines + auto LP selection. Google reported ~14% conversion lift in its launch data.
- Best fit: lead generation, B2B, e-commerce on specific products, capturing high-intent demand.

**Display**
- Image / video ads across 2M+ sites and apps in the GDN. Reaches roughly 90% of internet users.
- Responsive Display Ads (RDA): images + text combined automatically per placement.
- Targeting: audiences (interest / custom / similar), content (topic / placement), remarketing.
- Best fit: brand awareness, remarketing, prospecting.

**Shopping**
- Product image / price / store name in a list format on search results. Requires a Merchant Center feed.
- Standard Shopping: manual bidding, fine-grained control.
- P-MAX Shopping: AI-driven across all channels (replaces Smart Shopping).
- Best fit: e-commerce, online retail, products with strong price competitiveness.

**Video (YouTube)**
- Video ads on YouTube and partner properties.
- Formats: skippable / non-skippable / bumper (6s) / in-feed / masthead / outstream.
- 2025 changes: Video Action Campaigns (VAC) upgraded into Demand Gen ([Google Ads Help](https://support.google.com/google-ads/answer/15110871?hl=en)); vertical Shorts ads supported across all formats.
- Best fit: brand awareness, new product launches, how-to messaging.

**App**
- Specialized for app installs / engagement / pre-registration. Auto-distributes across all app surfaces.
- ACi (install) / ACe (engagement) / ACpre (pre-registration).
- Keywords and placements can't be set manually (full automation).
- Best fit: app user acquisition and re-engagement.

**P-MAX (Performance Max)**
- One campaign covers all 7 channels: Search, Shopping, Display, YouTube, Gmail, Discover, Maps.
- Asset groups + audience signals + search themes are AI-optimized end-to-end.
- Current volatile capabilities to verify before implementation: campaign-level negative keywords for Search/Shopping inventory ([Google Ads Help](https://support.google.com/google-ads/answer/15726455?hl=en)), channel performance reporting ([Google Ads Help](https://support.google.com/google-ads/answer/16260130?hl=en)), demographic exclusions ([campaign settings Help](https://support.google.com/google-ads/answer/15864837?hl=en)), and P-MAX experiments ([Google Ads Help](https://support.google.com/google-ads/answer/12997711?hl=en)).
- Best fit: e-commerce sales, lead-gen scale, store visits, lean teams.

**Demand Gen**
- Visual-rich ads on YouTube / Discover / Gmail / GDN. The Google equivalent of Meta's social-style ads.
- Image / carousel / video / product-feed-driven ads supported.
- Volatile additions to verify before implementation: GDN inventory and channel controls ([Google Ads Help](https://support.google.com/google-ads/answer/15890515?hl=en)), Target CPC ([Google Ads Help](https://support.google.com/google-ads/answer/16262529?hl=en)), and new-customer-acquisition / lifecycle goals ([Google Ads Help](https://support.google.com/google-ads/answer/12080169?hl=en)).
- Best fit: mid-funnel, social-style visual ads, YouTube Shorts.

### Recommended mix by business model

| Business model | First choice | Second choice | Conditions |
|---|---|---|---|
| **E-commerce** | P-MAX (with feed) | Search (high-intent KW) + Shopping | Feed required. P-MAX shines at 30+ conversions / month. |
| **Lead gen (B2B)** | Search | P-MAX (full assets) | Search intent is sharp. For P-MAX, turn off URL expansion. |
| **Lead gen (B2C)** | Search + P-MAX | Display (remarketing) | Capture intent on Search, expand reach with P-MAX. |
| **App** | App campaign | Video (YouTube) | Choose ACi / ACe / ACpre based on the goal. |
| **Brand awareness** | Video (YouTube) | Display / Demand Gen | Driven by whether video assets exist. |
| **Store visits** | P-MAX (Store Goals) | Search (geo KW) | Google Business Profile linkage required. |

### Budget guidance

| Monthly budget | Recommended structure |
|---|---|
| Up to ~$1,000 | Single Search campaign (brand KW + high-intent KW) |
| ~$1,000 – $3,000 | Search + (P-MAX or Display remarketing) |
| ~$3,000 – $10,000 | Search + P-MAX + (Video or Display) |
| Above $10,000 | Full-funnel; separate campaigns by goal |

(Numbers are rough orders of magnitude — adjust to local market CPCs and the target vertical's economics.)

### Modern automation stack (2025–2026)

A common modern stack to consider:

1. **Performance Max** — primary conversion engine
2. **Demand Gen** — visual-rich prospecting
3. **AI Max for Search** — AI-augmented Search

### After selection, confirm direction with the user

Present:

1. Recommended ad types and the reasoning.
2. Campaign-mix overview — how many campaigns and the role of each.
3. Bidding strategy per campaign.
4. Budget split.

Get confirmation before going deep into Step 3.

---

## Step 3: Strategy formation

This step decides cross-campaign strategy. Per-ad-type detail design happens in Step 4 using the playbooks.

Use this order:

1. Confirm business-model strategy and campaign roles.
2. Confirm budget viability and expected conversion volume.
3. Define conversion signals and incrementality stance.
4. Decide account structure, bidding, and budget split.
5. Define creative strategy using [references/creative-strategy.md](references/creative-strategy.md).

### Account structure

Google Ads is a 3-layer structure: Account → Campaign → Ad Group (→ Ads + Keywords).

| Level | Design principle |
|---|---|
| Campaign | Split by goal, budget, economics, geo/language, and ownership. Keep the structure as small as the business logic allows; over-fragmenting splits the AI's training signal. |
| Ad Group | One clear theme per ad group. Use enough keywords and RSAs to learn, but avoid tiny structures that exist only for reporting neatness. |

### Naming conventions

Establish a single naming convention before launch. Naming directly impacts filtering, reporting, and at-a-glance navigation.

#### Campaign name

**Format:** `{Type}_{Goal}_{Target}_{Geo}_{Note}`

| Element | Values | Notes |
|---|---|---|
| Type | `Search` `PMax` `Display` `Shopping` `Video` `DGen` `App` | Campaign type abbreviation |
| Goal | `CV` `Lead` `Sales` `Awareness` `Traffic` `Install` | Primary goal |
| Target | `Brand` `NonBrand` `Competitor` `Remarketing` `Prospecting` `AllProducts` | Audience segment |
| Geo | `US` `Tokyo` `EU` etc. | Geographic targeting (omit if global) |
| Note | Free-form (product category, test name, etc.) | As needed |

**Examples:**

| Campaign | Name |
|---|---|
| Brand search | `Search_CV_Brand_US` |
| Non-brand search | `Search_Lead_NonBrand_NYC` |
| P-MAX (all products) | `PMax_Sales_AllProducts` |
| P-MAX (category) | `PMax_Sales_Shoes` |
| Display remarketing | `Display_CV_Remarketing` |
| Display awareness | `Display_Awareness_Prospecting` |
| Demand Gen | `DGen_Lead_Prospecting` |
| Video awareness | `Video_Awareness_YouTube` |
| Shopping | `Shopping_Sales_Electronics` |
| App | `App_Install_iOS` |

#### Ad group / asset group name

**Format:** `{Theme}_{Subcategory}`

| Campaign type | Theme example | Subcategory example |
|---|---|---|
| Search | KW category (`CRM`, `Pricing`, `Comparison`) | Match type (`Exact`, `Phrase`, `Broad`) |
| P-MAX | Target segment (`NewCustomer`, `Retarget`) | Product category or message |
| Display | Targeting type (`Interest`, `Custom`, `Placement`) | Specific segment name |
| Demand Gen | Surface or goal (`YouTube`, `Discover`, `Carousel`) | Audience name |
| Shopping | Product category (`Shoes`, `Bags`) | Price tier or brand |

**Examples:** `CRM_Exact` / `Pricing_Phrase` / `NewCustomer_HighValue` / `Interest_ITManager`

#### Naming rules

- **Use underscores `_` consistently.** Don't mix hyphens or spaces.
- **English-based names recommended.** Better compatibility with Google Ads filters and external tools.
- **Don't include the start date in the name.** Google Ads tracks start dates separately. For test campaigns only, append `_Test_YYMM` at the end.
- **PascalCase tokens** (`NonBrand`, `AllProducts`).
- **Maintain a shared abbreviation list.** Prevents drift across the account.

### Bidding strategy by phase

| Phase | Condition | Recommended strategy |
|---|---|---|
| 1. Launch | No conversion data yet | Manual CPC or Maximize Clicks |
| 2. Data collection | Conversion tracking live | Maximize Conversions |
| 3. Optimization | 30+ conversions in 30 days | Target CPA (start from observed average CPA) |
| 4. Scale | 50+ conversions in 50 days, conversion value available | Target ROAS / Maximize Conversion Value |

When changing bid settings:

- Avoid major changes during the 2–3 week learning period.
- Don't move Target CPA / ROAS by more than 20% at a time.
- Treat budget-to-target ratios as practical ranges, not platform rules: below 1× target CPA/day is usually too slow, 1–3× can work for narrow tests, 3–5× is a healthier performance budget, and 10×+ is for aggressive scaling or faster learning when economics allow.

### Conversion design

| Type | Used for | Examples |
|---|---|---|
| Primary CV | Bid optimization | Purchase, inquiry, qualified lead |
| Secondary CV | Monitoring only | Resource downloads, newsletter signup |
| Micro CV | Engagement signals | Scroll depth, dwell time |

Modern setup to prioritize:

- **Enhanced Conversions** — Hashed first-party data sent to Google. Treat as a default part of a durable measurement setup.
- **Offline Conversion Import / Enhanced Conversions for Leads** (for lead gen) — Push qualified-lead, opportunity, or closed-won data from CRM back into Google Ads. Prefer ECfL over OCI for new builds.
- **Google Tag Gateway** — Default for any account on EEA/UK traffic or > $50k/month spend. Replaces ad-hoc 1P-domain hacks.
- **Server-side tagging (sGTM)** — Use when the technical stack and measurement needs justify it; usually only above ~$250k/month spend or for multi-platform CAPI.

For details — Consent Mode v2 setup, EC/OCI/ECfL choice, modeled-CV interpretation, attribution, VTC policy, iOS/SKAN, and incrementality methods — see [references/measurement.md](references/measurement.md).

#### View-through conversions (VTC) and engaged-view conversions (EVC) — unified policy

VTC measures users who saw the ad without clicking and converted later. EVC measures a deeper video engagement without a click: e.g. watching enough of a YouTube / Shorts / in-feed ad and then converting within the EVC window. Treat them separately:

| Principle | Description |
|---|---|
| **Default VTC stance = monitoring first** | Don't let impression-only credit drive the business story unless the campaign type and setting explicitly make VTC biddable. Track VTC as a supporting signal and segment by ad event type. |
| **EVC is not the same as VTC** | EVC flows into the Conversions column for supported video-based campaign types and is a stronger non-click signal than a plain impression. Still report click vs EVC separately for serious decisions. |
| **Keep the window short** | 1-day VTC window (default). Longer windows blur causality and inflate the count. |
| **Don't headline blended CPA / ROAS blindly** | Report click-based, EVC, and VTC-included views separately when the decision is material. |
| **Watch the VTC ratio** | If VTC is >50% of total reported conversions, the campaign's direct effect is likely overstated unless an incrementality test supports it. |

**VTC handling per ad type:**

| Ad type | Correct handling | Recommendation |
|---|---|---|
| **Search / Shopping** | Click-driven; VTC is not a meaningful optimization signal | No special handling beyond normal attribution checks. |
| **Display** | Standard VTC is reporting-only in the VTC / All conversions columns | Use VTC as assist evidence; use click/EVC/business outcomes for bidding decisions. |
| **Video** | EVC can be in Conversions; plain VTC should stay assist-only | Report click, EVC, and VTC separately; use lift/search-lift for upper-funnel value. |
| **P-MAX standard** | EVC can be in Conversions; standard VTC is not included in Conversions by default | Audit ad event type and channel mix; avoid calling VTC-included ROAS "real ROAS." |
| **P-MAX Store Goals** | VTC can be included for store-goal measurement | Reconcile with POS / store revenue where possible. |
| **Demand Gen** | EVC is included; VTC optimization is available for YouTube inventory but is off by default; Platform Comparable columns can include VTC for reporting only | Enable VTC optimization only when the goal is social-style scale and reporting can tolerate impression-credit inflation. |
| **App** | VTC optimization exists for eligible app campaigns, especially Android installs | Use when install scale matters, but separate prospecting from re-engagement and monitor retained-user quality. |

### Budget allocation

Use [references/budget-planning.md](references/budget-planning.md) before applying allocation rules. The 70 / 20 / 10 split is only a default operating pattern when the budget is large enough to fund learning in each bucket.

**70 / 20 / 10 rule:**

- 70% — proven campaigns and keywords
- 20% — testing (bidding, targeting, ad copy)
- 10% — new keywords, audiences, or campaign types

### Operating cadence

```
Daily:     outlier checks (sudden CPC spikes, CV drops)
Weekly:    search-terms report, negative-keyword additions, VTC ratio check
Biweekly:  bid adjustments, ad-copy performance review
Monthly:   keyword adds / pauses, budget reallocation
Quarterly: campaign-structure review, strategy-level rethink
```

### Common pitfalls

| Failure mode | Fix |
|---|---|
| Conversion tracking inconsistent | Verify with GTM Preview + GA4 DebugView |
| Enhanced Conversions not enabled | Turn it on — cookie-restriction defense is required |
| Bid targets unrealistic | Start from observed historical numbers, then tighten gradually |
| Frequent changes during learning period | Hold off on big changes for 2–3 weeks after a change |
| P-MAX underbudgeted | Keep at least 1–3× target CPA/day for a narrow test and 3–5×+ when you expect stable learning |
| Judging on VTC / EVC-inclusive ROAS only | Also evaluate click-only, EVC, and business-source-of-truth results in parallel |
| Mismatched ad → LP | Provide a dedicated LP per ad group |

---

## Step 4: Detailed design + delivery

For each ad type that's been selected, consult the matching playbook for both practice and settings. The practice sections should drive the recommendation; settings are the implementation layer.

Before asset specs or copy drafts, use [references/creative-strategy.md](references/creative-strategy.md) to define audience, offer, proof, objections, format fit, and test angles. Then use the ad-type playbooks for channel-specific settings and specs.

### Per-ad-type playbooks

| Ad type | Playbook | Key design topics |
|---|---|---|
| Search | [references/search-ads.md](references/search-ads.md) | Intent capture, brand/non-brand separation, broad match guardrails, RSA/LP practice, query quality |
| Display | [references/display-ads.md](references/display-ads.md) | Remarketing vs prospecting role, cheap reach vs quality, VTC handling, frequency, placement hygiene |
| Shopping | [references/shopping-ads.md](references/shopping-ads.md) | Feed quality, title strategy, margin labels, product groups, P-MAX coexistence |
| App | [references/app-campaigns.md](references/app-campaigns.md) | Event-depth choice, budget-to-bid ratios, creative system, iOS/SKAN realities |
| Video | [references/video-campaigns.md](references/video-campaigns.md) | Hook/offer/ABCD, Shorts/CTV role, frequency, lift measurement, DR vs awareness |
| P-MAX | [references/pmax.md](references/pmax.md) | Conversion signal quality, asset-group practice, brand controls, URL expansion, feed/margin strategy |
| Demand Gen | [references/demand-gen.md](references/demand-gen.md) | Social-style creative, lookalike seed quality, assisted demand, surface mix, P-MAX overlap |

### Cross-cutting design references

Use these inside the workflow, not just as optional reading:

| Reference | Use when | Key design topics |
|---|---|---|
| [references/business-model-playbooks.md](references/business-model-playbooks.md) | Choosing strategy by business model | B2B lead gen, local service, e-commerce, high-ticket, app, store visit |
| [references/budget-planning.md](references/budget-planning.md) | Deciding what the budget can realistically support | CPA/ROAS economics, expected CV volume, campaign mix viability |
| [references/measurement.md](references/measurement.md) | Designing CV signals, choosing attribution, planning incrementality, diagnosing measurement issues | Consent Mode v2, Enhanced Conversions, OCI/ECfL, modeled CV, VTC policy, attribution, lift studies, iOS/SKAN, Tag Gateway/sGTM |
| [references/diagnostic-decision-trees.md](references/diagnostic-decision-trees.md) | Improving an existing account or diagnosing poor performance | Spend/CV issues, lead quality, CTR/CVR, CPC increases, P-MAX/Demand Gen traps |
| [references/creative-strategy.md](references/creative-strategy.md) | Designing assets, copy, creative briefs, or production handoffs | Angles, proof, objections, format fit, P-MAX/Demand Gen/video creative systems, shared asset-size baselines |

### Delivering the output

Match the output shape to what the situation calls for. **The skill does not require producing a written deliverable** — it adapts:

- **Direct conversational answer** when the user asked a focused question.
- **Structured inline response** when the user wants planning guidance but doesn't need a document.
- **Written plan / spec** when the user explicitly asked for one, or when the deliverable is going to be handed off to another team / agency / client. If a file is useful, create a concise Markdown file using the user's project conventions for placement and naming.

If a written plan is the right deliverable, it typically covers:

1. Strategy summary — goal, target, why this ad-type mix.
2. Campaign list — purpose, bidding, budget split per campaign.
3. Per-ad-type design — driven by the playbooks.
4. Creative requirements — assets needed, specs, who's producing them.
5. Measurement design — CV definitions, VTC policy, tracking setup.
6. Operating timeline — launch → learning → optimization phases.
7. KPIs and success criteria.

When unsure whether to produce a written document, ask the user.

For Markdown-file deliverables, keep the structure practical rather than template-heavy: use clear sections, decision tables where they help handoff, explicit assumptions, and concrete launch/measurement actions. Avoid filling generic sections that do not change the campaign decision.

For common multi-campaign combinations by business model and funnel role, use [references/business-model-playbooks.md](references/business-model-playbooks.md).
