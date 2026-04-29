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
| Daily | Spend anomalies, conversion drops, tracking/policy/feed breakage, budget pacing | Daily target/budget micromanagement |
| Weekly | Search terms, negative-keyword additions, asset performance, lead/product quality, change-log review, VTC/EVC ratio checks | Restructuring because of a few days of noise |
| Biweekly | Bid-target adjustments, ad-copy/creative performance review, controlled test reads | Changing bids, budgets, assets, and goals at the same time |
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

For existing accounts, run a diagnostic after Step 1 before proposing changes.

- If the user provides account data in any form — CSV/XLSX exports, copied tables, screenshots, dashboards, CRM reports, Merchant Center diagnostics, API extracts, or metric summaries — first use [references/account-data-diagnostics.md](references/account-data-diagnostics.md).
- If the user only describes symptoms, use [references/diagnostic-decision-trees.md](references/diagnostic-decision-trees.md) to rank likely root causes.
- Always separate supported findings from limitations, rank actions by business impact and evidence, and include expected stabilization windows plus changes to avoid.

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

### Selection references

Use the cheat sheet only for first-pass direction. Before finalizing the mix, read:

| Decision | Reference |
|---|---|
| Default mix by business model and funnel role | [references/business-model-playbooks.md](references/business-model-playbooks.md) |
| Budget sufficiency, expected conversion volume, and what not to launch yet | [references/budget-planning.md](references/budget-planning.md) |
| Search / AI Max details | [references/search-ads.md](references/search-ads.md) |
| P-MAX controls, feed/asset groups, and volatile capability checks | [references/pmax.md](references/pmax.md) |
| Demand Gen surfaces, channel controls, and social-style creative fit | [references/demand-gen.md](references/demand-gen.md) |
| Display, Shopping, Video, or App details | The matching playbook in [Step 4](#step-4-detailed-design--delivery) |

Verify current Google documentation before implementing volatile features such as AI Max, P-MAX negative keywords/channel reporting, and Demand Gen channel controls.

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

### Bidding strategy

Use [references/budget-planning.md](references/budget-planning.md) before selecting, changing, or rolling back bid strategies. At minimum, check:

1. Primary conversion volume in the last 30 days.
2. Conversion latency vs the conversion window.
3. CPA / ROAS stability.
4. Signal depth: purchase / SQL / qualified lead vs micro-CVs.
5. Budget-to-bid ratio.

Do not set targets from aspiration. Start from observed performance, avoid initial tCPA/tROAS targets that are tighter than current actuals, and adjust gradually.

### Conversion design

Use [references/measurement.md](references/measurement.md) for Primary / Secondary / Micro CV design, value passing, Consent Mode v2, Enhanced Conversions, OCI / ECfL, Tag Gateway / sGTM, VTC / EVC handling, attribution, iOS/SKAN, and incrementality methods.

Keep the high-level rule in the active plan: choose the deepest reliable Primary conversion with workable volume and latency, keep weak proxies secondary unless validated, and separate click-based, EVC, VTC, and business-source-of-truth results when the decision is material.

### Budget allocation

Use [references/budget-planning.md](references/budget-planning.md) before applying allocation rules. The 70 / 20 / 10 split is only a default operating pattern when the budget is large enough to fund learning in each bucket.

**70 / 20 / 10 rule:**

- 70% — proven campaigns and keywords
- 20% — testing (bidding, targeting, ad copy)
- 10% — new keywords, audiences, or campaign types

### Operating cadence

Use the cadence table in [Practice-first stance](#cadence) as the canonical operating rhythm. Per-ad-type playbooks may add channel-specific checks, but should not override the basic rule: monitor anomalies frequently, batch meaningful changes, and avoid reacting to short-term noise.

### Common pitfalls

| Failure mode | Fix |
|---|---|
| Conversion tracking inconsistent | Verify with GTM Preview + GA4 DebugView |
| Enhanced Conversions not enabled | Turn it on — cookie-restriction defense is required |
| Initial tCPA set below current average CPA | Start at observed average or above; never below — instant volume collapse |
| Frequent changes during learning | Stair-step targets ±10–15% with ≥2 weeks between changes; strategy switches re-trigger learning, target-value changes don't |
| P-MAX underbudgeted | Floor at 3× tCPA or $150/day. Below ~30 conv/30d, drop the tCPA target rather than starve the campaign |
| Goal hijacking — multiple Primary CVs of mixed depth | Keep one primary action per campaign goal; demote micro-CVs to Secondary |
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
| [references/account-data-diagnostics.md](references/account-data-diagnostics.md) | Interpreting account data supplied as CSV/XLSX, screenshots, copied tables, dashboards, CRM/feed reports, or metric summaries | Data intake, required fields, Ads/GA4/CRM/Merchant reconciliation, practical if-this-then-that decisions, prioritization |
| [references/diagnostic-decision-trees.md](references/diagnostic-decision-trees.md) | Improving an existing account or diagnosing poor performance | Spend/CV issues, lead quality, CTR/CVR, CPC increases, P-MAX/Demand Gen traps |
| [references/creative-strategy.md](references/creative-strategy.md) | Designing assets, copy, creative briefs, or production handoffs | Angles, proof, objections, format fit, P-MAX/Demand Gen/video creative systems, shared asset-size baselines |

### Delivering the output

Match the output shape to [Output flexibility](#output-flexibility-dont-always-write-a-document). Do not create a written deliverable unless the user asks for one or the plan is clearly being handed off to another team / agency / client.

If a written plan is the right deliverable, it typically covers:

1. Strategy summary — goal, target, why this ad-type mix.
2. Campaign list — purpose, bidding, budget split per campaign.
3. Per-ad-type design — driven by the playbooks.
4. Creative requirements — assets needed, specs, who's producing them.
5. Measurement design — CV definitions, VTC policy, tracking setup.
6. Operating timeline — launch → learning → optimization phases.
7. KPIs and success criteria.

For Markdown-file deliverables, keep the structure practical rather than template-heavy: use clear sections, decision tables where they help handoff, explicit assumptions, and concrete launch/measurement actions. Avoid filling generic sections that do not change the campaign decision.

For common multi-campaign combinations by business model and funnel role, use [references/business-model-playbooks.md](references/business-model-playbooks.md).
