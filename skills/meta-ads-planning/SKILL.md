---
name: meta-ads-planning
description: Plan and design Meta ads programs for Facebook and Instagram end-to-end: choose campaign objectives, ad formats, placements, campaign structure, creative requirements, copy, measurement, and operating instructions. Use this skill whenever the user mentions Meta ads, Facebook ads, Instagram ads, paid social on Meta, Advantage+ sales campaigns, Lead Ads, Reels ads, or Meta campaign planning.
---

# Meta Ads Planning

Plan Meta ads campaigns for Facebook and Instagram, including campaign architecture, creative and copy specifications, and practical operating instructions.

## Workflow

```
Step 1: Information gathering      -> Understand business context, budget, and goals
    ↓
Step 2: Strategy formation         -> Choose campaign objectives, formats, placements, and structure
    ↓
Step 3: Creative design            -> Define creative and copy requirements by format
    ↓
Step 4: Delivery                   -> Produce an operating plan, strategy memo, or creative brief
```

---

## Step 1: Information Gathering

Check the items below. If information is missing, ask for it. If business context, brand assets, competitive analysis, past account audits, or other project context is already available, use that context instead of asking again.

### Required Inputs

| Category | What to confirm |
|---|---|
| **Business model** | E-commerce / lead generation / app / local business / SaaS / brand awareness |
| **Offer** | What is being sold or promoted: product, service, free trial, lead magnet, etc. |
| **Goal** | Primary KPI: CPA, ROAS, CPL, CPI, etc. Include a target value if available |
| **Budget** | Monthly or daily ad budget |
| **Landing page** | Destination URL |
| **Audience** | Who to reach: geography, age range, gender, interests, customer type, etc. |

### Useful Context

| Category | What to confirm |
|---|---|
| **Existing account state** | Is Meta advertising already running? What are the current issues? |
| **Conversion data** | Conversions in the last 30 days; affects bid strategy and Advantage+ sales campaign readiness |
| **Creative** | Existing videos/images and production capacity |
| **Measurement** | Whether Meta Pixel and Conversions API are implemented |
| **Catalog** | Whether a product catalog exists in Meta Business Suite / Commerce Manager for e-commerce |

---

## Step 2: Strategy Formation

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

### Why Creative Matters

Creative quality is one of the main drivers of Meta ads performance. Meta's delivery system increasingly uses creative signals to understand who is likely to respond, so creative strategy is not a cosmetic layer.

### Core Design Principles

- **Diversity over volume:** Create meaningfully different concepts, not minor variants of the same idea.
- **One ad = one message:** Do not overload a creative with multiple unrelated claims.
- **Use 9:16 as the master design when vertical placements matter:** Design around Reels safe zones so the asset can adapt across placements.
- **Caption video by default:** Many users watch without sound.
- **Prefer 4:5 over 1:1 for Feed assets when practical:** It occupies more vertical space in Feed.

For creative diversity, placement-specific design rules, testing cadence, and funnel-stage creative strategy, use [references/creative-strategy.md](references/creative-strategy.md).

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
| Description | Up to 27 characters; often hidden depending on placement | 1-3 variants |
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
| Creative strategy | [creative-strategy.md](references/creative-strategy.md) | Diversity principles, placement rules, testing cadence, funnel strategy |
| Format production | [creative-production.md](references/creative-production.md) | Production guidance by ad format |
| Output templates | [output-templates.md](references/output-templates.md) | Strategy plan, design memo, creative brief templates |

### What a Full Specification Usually Includes

1. **Strategy summary:** goal, audience, and why the campaign objective was selected.
2. **Campaign structure table:** campaign list with objective, budget, bidding, and placements.
3. **Format-specific design:** concrete ad-format decisions.
4. **Creative production instructions:** required assets and production specs.
5. **Copy plan:** primary text, headline, description, and CTA options.
6. **Measurement design:** Meta Pixel / Conversions API setup and conversion definitions.
7. **Operating timeline:** launch, learning phase, and optimization phases.
8. **KPIs and success criteria:** what success means and how it will be measured.

Use [references/output-templates.md](references/output-templates.md) when a written deliverable is useful. Put files wherever the user requested, or follow the host project's normal artifact conventions if they are already clear.

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
