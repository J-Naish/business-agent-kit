---
name: meta-ads-planning
description: Plan and design Meta ads programs for Facebook and Instagram end-to-end: choose campaign objectives, ad formats, placements, campaign structure, creative requirements, copy, measurement, and operating instructions. Use this skill whenever the user mentions Meta ads, Facebook ads, Instagram ads, paid social on Meta, Advantage+ sales campaigns, Lead Ads, Reels ads, or Meta campaign planning.
---

# Meta Ads Planning

Plan Meta ads programs for Facebook and Instagram, including campaign architecture, creative and copy specifications, measurement design, budget viability, and practical operating instructions.

## Practice-first stance

Meta ads planning should prioritize the practices that make campaigns work, not just the settings that make campaigns valid. Campaign objective, placements, and bid strategy matter, but they are secondary to measurement quality, conversion signal design, creative quality, account structure, budget sufficiency, customer exclusions, and disciplined operating cadence.

Before proposing campaign settings, check these first:

| Area | What to verify | Why it matters |
|---|---|---|
| Conversion design | Pixel/CAPI, deduplication, event depth, value, CRM/offline feedback | Bad signals make delivery learn the wrong outcome |
| Incrementality | New vs existing customers, view-through share, retargeting bias, finance source of truth | Platform ROAS is a steering signal, not business truth |
| Creative system | Distinct concepts, hook/proof/offer, format fit, refresh cadence | Creative is a major audience-shaping and persuasion lever |
| Budget and volume | Target CPA/ROAS realism, expected event volume, budget-to-CPA ratio | Underfunded ad sets and campaigns produce noisy learning |
| Structure | Consolidation, split logic, audience overlap, budget control needs | Fragmentation splits signal and increases volatility |
| Destination | Landing page, form, checkout, app store, catalog, offer match | Ads amplify the destination |
| Controls | Customer exclusions, geography/language/age, special category constraints, brand safety | Automation needs guardrails |
| Operating cadence | Learning windows, change log, creative testing rhythm, measurement reviews | Most failures come from neglect or over-editing |

### Core operating rules

- Start from business outcome and unit economics, not from Ads Manager menus.
- Treat the optimization event as the strategy. Prefer the deepest reliable event with enough volume and acceptable latency; keep weak micro-events temporary or secondary.
- Separate platform performance from incrementality. Retargeting, view-through attribution, modeled conversions, and existing-customer delivery can overstate Meta's business impact.
- Consolidate for learning; split only for real control needs: objective, budget, economics, geo/language, compliance, customer type, funnel role, creative test, or measurement.
- Use broad/Advantage+ delivery as the default posture when signal and creative quality support it, but keep real business constraints as controls.
- Treat creative as a primary lever. Test distinct concepts, not cosmetic variants; use AI/Advantage+ creative as a multiplier on human strategy, not a substitute for positioning.
- Do not chase cheap CPM, clicks, engagement, or leads unless downstream quality and incrementality remain acceptable.
- Avoid constant intervention. Batch meaningful changes and allow learning periods, conversion delay, and statistical noise to settle before judging.

### Cadence

Use this as the default operating cadence unless the account context suggests otherwise:

| Cadence | Focus | Avoid |
|---|---|---|
| Daily | Spend anomalies, tracking drops, disapprovals, catalog/feed errors | Daily bid/target rewrites |
| Weekly | Creative fatigue, lead/product quality, budget pacing, customer/audience breakdowns | Restructuring from a few days of noise |
| Biweekly | Creative testing readout, new concept launches, landing/form diagnostics | Cosmetic variant testing with no strategic question |
| Monthly | Structure review, suppression lists, CAPI/EMQ health, attribution/reporting checks | Letting launch-era assumptions persist |
| Quarterly | Incrementality review, event design, Advantage+ vs manual role, business-model strategy | Reporting only platform ROAS |

### Measurement notes

- Use Meta metrics for tactical optimization, not as final financial truth.
- Keep click-through, view-through, and modeled attribution assumptions visible when possible.
- Reconcile against order data, CRM, POS, app revenue, pipeline, LTV, contribution margin, or another finance source of truth.
- Monitor new vs existing customer contribution, especially in Advantage+ Sales and retargeting-heavy setups.
- Use Meta Experiments, A/B tests, conversion lift, geo holdouts, CRM/customer holdouts, MMM, or pre/post analysis when budget and volume allow.
- Treat reporting-tool/API changes as dated implementation details; verify current Ads Manager/API behavior before hard-coding attribution-window claims.

## Output flexibility

Adapt the output to what the user actually asked for. There is no requirement to produce a written spec document.

| Situation | Output |
|---|---|
| User asks a focused question | Direct answer with reasoning. No document. |
| User wants planning guidance across the full picture | Structured inline response covering relevant sections. |
| User explicitly asks for a written plan / spec / brief | Produce a written deliverable inline or as a Markdown file, depending on requested handoff format. |
| User is launching a multi-campaign account from scratch and the deliverable will be handed off | A written spec often fits, but confirm before writing unless the user clearly requested it. |

## Workflow

```
Step 0: Mode detection             -> New launch or improvement of existing account
    ↓
Step 1: Information gathering      -> Phase A basics -> business-model read -> Phase B details
    ↓
Step 2: Viability + strategy       -> Budget viability -> objective, format, placement, structure
    ↓
Step 3: Creative + measurement     -> Define creative system, conversion design, and operating cadence
    ↓
Step 4: Delivery                   -> Produce the answer, operating plan, spec, or creative brief
```

---

## Step 0: Mode Detection

Determine which situation applies. If unclear, ask.

| Mode | Trigger | Path |
|---|---|---|
| **New launch** | Meta ads not running yet, or new campaigns being designed from scratch | Step 1 -> 2 -> 3 -> 4 |
| **Improvement of existing account** | Account is already running with performance issues or improvement goals | Step 1 -> diagnostic -> improvement proposals -> Step 2-4 as needed |

### Improvement workflow

For existing accounts, run a diagnostic after Step 1. Use [references/diagnostic-decision-trees.md](references/diagnostic-decision-trees.md) to rank likely root causes before proposing changes.

1. **Inventory** - Running campaigns, objectives, budgets, bid strategies, ad set structure, creative volume, and current KPIs.
2. **Issue identification** - Audit signal quality, conversion quality, structure fragmentation, creative fatigue, audience overlap, destination quality, and economics.
3. **Improvement proposals** - Ranked actions with evidence, expected stabilization window, and changes to avoid.
4. **Execution / handoff** - Document agreed changes in the form that fits the task.

---

## Step 1: Information Gathering

Check the items below. If information is missing, ask for it. If business context, brand assets, competitive analysis, past account audits, or other project context is already available, use that context instead of asking again.

### Phase A: Basics

| Category | What to confirm |
|---|---|
| **Business model** | E-commerce / lead generation / app / local business / SaaS / brand awareness |
| **Offer** | What is being sold or promoted: product, service, free trial, lead magnet, etc. |
| **Goal** | Primary KPI: CPA, ROAS, CPL, CPI, etc. Include a target value if available |
| **Budget** | Monthly or daily ad budget |
| **Landing page** | Destination URL |
| **Audience** | Who to reach: geography, age range, gender, interests, customer type, etc. |

After Phase A, use [references/business-model-playbooks.md](references/business-model-playbooks.md) to check the default strategy for the business model before choosing objectives or structure.

### Useful Context

| Category | What to confirm |
|---|---|
| **Existing account state** | Is Meta advertising already running? What are the current issues? |
| **Conversion data** | Conversions in the last 30 days; affects bid strategy and Advantage+ sales campaign readiness |
| **Creative** | Existing videos/images and production capacity |
| **Measurement** | Whether Meta Pixel and Conversions API are implemented |
| **Catalog** | Whether a product catalog exists in Meta Business Suite / Commerce Manager for e-commerce |
| **Customer data** | Customer lists, purchaser segments, lead stages, LTV/profit data, offline events |

After the details are known, use [references/budget-planning.md](references/budget-planning.md) to check whether the budget can support the proposed conversion event, campaign mix, and learning volume. If the budget cannot produce meaningful signal, narrow the structure before moving to Step 2.

---

## Step 2: Viability + Strategy Formation

Before choosing the final mix, combine:

1. Business-model fit from [references/business-model-playbooks.md](references/business-model-playbooks.md).
2. Budget and signal viability from [references/budget-planning.md](references/budget-planning.md).
3. Measurement readiness from [references/measurement-and-signal-quality.md](references/measurement-and-signal-quality.md).
4. Objective/format/placement fit from the sections below.

Do not recommend a campaign type just because it is available. If budget, event quality, creative supply, catalog health, or measurement cannot support it, state what must be fixed first.

### 2-1. Campaign Objective Selection

Meta campaigns use six campaign objectives. **The objective matters because it tells Meta's delivery system what outcome to optimize for.**

| Objective | Summary | Best for | Recommended formats |
|---|---|---|---|
| **Awareness** | Maximize brand awareness or reach | New brands, events, launches | Video/Reels, image |
| **Traffic** | Drive clicks or landing page views | Media, content, landing page visits | Image, carousel |
| **Engagement** | Drive likes, shares, comments, video views, messages, or event responses | Content, events, communities | Video/Reels |
| **Leads** | Collect prospect information | B2B, real estate, education, services | Lead Ads / Instant Forms, image |
| **App promotion** | Drive app installs or app events | Mobile apps, games | Video, playable ads |
| **Sales** | Drive purchases and other conversion actions | E-commerce, D2C, subscriptions | Collection, carousel |

Default principle: if the primary goal is e-commerce revenue or high-value conversion volume, start from **Sales** unless the account lacks conversion signal or the business goal clearly requires another objective.

For objective details, performance goals, optimization events, and business-type selection rules, use [references/ad-types-and-placements.md](references/ad-types-and-placements.md) section 1.

### 2-2. Recommended Structure by Business Type

| Business type | Campaign objective | Campaign structure | Placements | Bid strategy |
|---|---|---|---|---|
| **E-commerce / D2C** | Sales; Advantage+ sales campaign when suitable | 2 campaigns: testing + scaling | Advantage+ placements | Lowest cost -> ROAS goal |
| **B2B lead generation** | Leads / Sales | 3 campaigns: Sales + Awareness + Remarketing | Facebook/Instagram Feed; consider excluding Audience Network | Cost cap |
| **SaaS** | Leads -> Sales | 3 campaigns: Sales + Awareness + Remarketing | Facebook/Instagram Feed | Lowest cost -> Cost cap |
| **Local business** | Awareness + Sales | 3 campaigns: Awareness + Sales + Remarketing | Facebook Feed + Marketplace + Instagram | Lowest cost |
| **App** | App promotion | 2 campaigns: testing + scaling | Advantage+ placements | Lowest cost -> value optimization |
| **Brand** | Awareness | 1 Awareness campaign | Advantage+ placements; Reels-focused creative | Lowest cost |

For 2-campaign and 3-campaign structures, budget allocation, and learning phase management, use [references/campaign-structure.md](references/campaign-structure.md).

### 2-3. Ad Format Selection Matrix

| Goal | First choice | Second choice | Third choice |
|---|---|---|---|
| **Awareness** | Video/Reels | Carousel | Image |
| **Traffic** | Image | Carousel | Video |
| **Engagement** | Video/Reels | Carousel | Image |
| **Lead generation** | Lead Ads / Instant Forms | Video | Image |
| **E-commerce sales** | Collection | Carousel | Dynamic ads |
| **Non-commerce sales** | Video | Image | Carousel |

For detailed format specs, resolution, file size, and performance characteristics, use [references/ad-types-and-placements.md](references/ad-types-and-placements.md) section 2.

### 2-4. Placement Policy

- **Conversion goals: Sales / Leads / App promotion:** Advantage+ placements are the default starting point.
- **When placements are restricted:** CPM may fall on individual placements, but total CPA often rises.
- **B2B lead generation:** Consider excluding Audience Network if lead quality is weak or hard to verify.

For placement lists, quality tiers, and safe zones, use [references/ad-types-and-placements.md](references/ad-types-and-placements.md) section 3.

### 2-5. After Selection

Present the direction before going deep:

1. Recommended campaign objective and why.
2. Campaign-mix overview: number of campaigns and role of each.
3. Recommended formats and placements.
4. Bid strategy and budget allocation.

---

## Step 3: Creative Design

This step includes both creative strategy and measurement design. They are tightly linked: Meta can only optimize toward what it can observe, and it can only match users to the messages the creative makes legible.

### Why Creative Matters

Creative quality is one of the main drivers of Meta ads performance. Meta's delivery system increasingly uses creative signals to understand who is likely to respond, so creative strategy is not a cosmetic layer.

### Core Design Principles

- **Diversity over volume:** Create meaningfully different concepts, not minor variants of the same idea.
- **One ad = one message:** Do not overload a creative with multiple unrelated claims.
- **Use 9:16 as the master design when vertical placements matter:** Design around Reels safe zones so the asset can adapt across placements.
- **Caption video by default:** Many users watch without sound.
- **Prefer 4:5 over 1:1 for Feed assets when practical:** It occupies more vertical space in Feed.

For creative diversity, placement-specific design rules, testing cadence, and funnel-stage creative strategy, use [references/creative-strategy.md](references/creative-strategy.md).

### Measurement Design

Use [references/measurement-and-signal-quality.md](references/measurement-and-signal-quality.md) before finalizing launch recommendations.

| Business type | Preferred signal | Watch-outs |
|---|---|---|
| E-commerce / D2C | Purchase with value; profit-aware value when possible | Revenue ROAS can hide margin, returns, discounts, and existing-customer bias |
| Lead generation | Qualified lead / CRM stage when volume and latency allow | Raw leads can train cheap, low-quality volume |
| SaaS / subscription | Trial start, qualified signup, subscription, retained value | Trial volume can mislead if activation/retention is weak |
| App | Install -> in-app event -> value/LTV | Do not optimize forever to installs |
| Local business | Booking, qualified call, store sale/POS | Calls/leads need service-area and quality checks |

### Format-Specific Design References

| Format | Reference | Key design topics |
|---|---|---|
| Image Ads | [creative-production.md](references/creative-production.md) section 2 | Design patterns, copy templates |
| Video Ads | [creative-production.md](references/creative-production.md) section 3 | Hook -> Body -> CTA, safe zones, creative types |
| Carousel Ads | [creative-production.md](references/creative-production.md) section 4 | Five-beat structure, carousel patterns |
| Collection Ads | [creative-production.md](references/creative-production.md) section 5 | Cover creative, Instant Experience templates |
| Lead Ads / Instant Forms | [creative-production.md](references/creative-production.md) section 6 | Form types, question design |
| Instant Experience | [creative-production.md](references/creative-production.md) section 7 | Recommended content structure |

### Copy Basics

| Element | Recommended length | Quantity |
|---|---:|---:|
| Primary text | Up to 125 characters before truncation risk | 3-5 variants |
| Headline | Up to 27 characters before truncation risk | 3-5 variants |
| Description | Usually 25-30 characters; often hidden depending on placement | 1-3 variants |
| CTA | Choose from Meta's preset CTA buttons | 1 |

For hook types, ad angles, and CTA button selection, use [references/creative-production.md](references/creative-production.md) section 1.

---

## Step 4: Delivery

Produce the output that fits the user's request: a short recommendation, structured inline plan, strategy memo, operating specification, or creative brief.

### References to Use

| Theme | Reference | Contents |
|---|---|---|
| Objectives, formats, placements | [ad-types-and-placements.md](references/ad-types-and-placements.md) | Six objectives, format specs, placements, benchmarks |
| Setup, targeting, bidding | [campaign-setup.md](references/campaign-setup.md) | Initial setup, Pixel/CAPI, audiences, bid strategies, Advantage+ sales campaigns |
| Structure, budget, KPIs | [campaign-structure.md](references/campaign-structure.md) | 2/3-campaign structures, budget allocation, learning phase, KPIs, naming conventions |
| Business-model playbooks | [business-model-playbooks.md](references/business-model-playbooks.md) | E-commerce, lead gen, SaaS, local, app, brand, combination patterns |
| Budget planning | [budget-planning.md](references/budget-planning.md) | CPA/ROAS economics, event volume, campaign-mix viability |
| Measurement and signal quality | [measurement-and-signal-quality.md](references/measurement-and-signal-quality.md) | Pixel/CAPI, deduplication, EMQ, attribution, incrementality, CRM/offline data |
| Diagnostics | [diagnostic-decision-trees.md](references/diagnostic-decision-trees.md) | Existing-account failure modes and fixes |
| Creative strategy | [creative-strategy.md](references/creative-strategy.md) | Diversity principles, placement rules, testing cadence, funnel strategy |
| Format production | [creative-production.md](references/creative-production.md) | Production guidance by ad format |

### What a Full Specification Usually Includes

1. **Strategy summary:** goal, audience, and why the campaign objective was selected.
2. **Campaign structure table:** campaign list with objective, budget, bidding, and placements.
3. **Format-specific design:** concrete ad-format decisions.
4. **Creative production instructions:** required assets and production specs.
5. **Copy plan:** primary text, headline, description, and CTA options.
6. **Measurement design:** Meta Pixel / Conversions API setup and conversion definitions.
7. **Operating timeline:** launch, learning phase, and optimization phases.
8. **KPIs and success criteria:** what success means and how it will be measured.

Put files wherever the user requested, or follow the host project's normal artifact conventions if they are already clear.

For Markdown-file deliverables, keep the structure practical rather than template-heavy: use clear sections, decision tables where they help handoff, explicit assumptions, and concrete launch/measurement actions. Avoid filling generic sections that do not change the campaign decision.

---

## Related Workflows

| Adjacent need | Use a separate skill or workflow when |
|---|---|
| Landing page copywriting | The user needs full landing page copy, not just ad copy |
| Landing page design | The user needs the destination page structure or design |
| Analytics implementation | The user needs GA4, GTM, Meta Pixel, or Conversions API implemented |
| Competitive research | The user needs competitor ads or market research |
| Image generation | The user needs banner or image creative generated |
| Video generation | The user needs video creative generated |
| Google Ads planning | The user is planning Google Ads instead of Meta ads |
