# Campaign Strategy

Use this reference to design Amazon Ads campaign architecture, budget allocation, keyword strategy, product targeting, launch phases, and operating cadence.

## Funnel Roles

Amazon Ads works best when each campaign has a clear job.

| Funnel role | Primary ad products | Main goal | Typical KPI |
|---|---|---|---|
| Awareness | Sponsored Brands video, Sponsored Brands Store spotlight, Sponsored Display reach, Amazon DSP | Create brand/category awareness | Reach, impressions, video completion, branded search |
| Consideration | Sponsored Brands, Sponsored Display contextual/audiences, DSP display/video | Bring shoppers to product detail pages or Store | CTR, detail page views, Store visits, new-to-brand |
| Conversion | Sponsored Products, Sponsored Brands, Sponsored Display conversion optimization | Capture high-intent demand | CVR, ACoS, ROAS, orders |
| Loyalty | Sponsored Display remarketing, DSP remarketing, Brand Tailored Promotions | Repeat purchase and basket expansion | Repeat rate, LTV, TACoS |

## Budget Allocation

Early accounts usually need a performance core before broad expansion.

| Stage | Default allocation | Rationale |
|---|---|---|
| Launch / first learning period | 60-80% Sponsored Products, 10-25% Sponsored Brands, 0-15% Sponsored Display | Mine search terms, test retail readiness, and establish controlled demand capture. |
| Growth | 45-65% Sponsored Products, 20-35% Sponsored Brands, 10-25% Sponsored Display | Expand category presence and remarketing while keeping conversion engine strong. |
| Full funnel | Sponsored ads plus DSP with role-based budgets | Use broader reach only when measurement and creative volume support it. |

Adjust allocation based on category demand, margin, review count, price competitiveness, and inventory. Do not give every ad product a budget if the total spend is too small to generate learnings.

## Campaign Architecture

### Core Sponsored Products Structure

| Campaign type | Purpose | Targeting |
|---|---|---|
| Brand defense | Protect branded demand | Exact brand keywords, own ASIN product targeting |
| Category exact | Scale proven generic demand | Exact high-intent category terms |
| Category phrase/broad | Discover query variants | Phrase and broad category terms with negative mining |
| Automatic discovery | Let Amazon find queries and ASINs | Close match, loose match, substitutes, complements |
| Competitor conquesting | Win comparison shoppers | Competitor brand terms and competitor ASINs |
| Complementary products | Cross-sell adjacent demand | Product targeting on complementary ASINs |

Separate campaigns when targets need different bids, budgets, match types, funnel roles, or reporting interpretation.

### Match Type Logic

| Match type | Use |
|---|---|
| Exact | Highest control; use for proven queries and budget protection. |
| Phrase | Controlled expansion; useful for phrase variants and modifier discovery. |
| Broad | Discovery; requires disciplined search term and negative keyword review. |
| Automatic | Query and ASIN mining; split match groups when budget and data justify it. |
| Product targeting | ASIN/category conquesting, defense, complementary placement, review/price comparison plays. |

## Keyword Research

Build keyword sets from:

- Amazon search suggestions.
- Brand Analytics and Search Query Performance where available.
- Sponsored Products search term reports.
- Competitor titles, bullet points, reviews, and Q&A.
- Customer language from reviews and support tickets.
- External SEO and paid search data when relevant.

Group keywords by intent:

| Intent tier | Examples | Bid posture |
|---|---|---|
| Brand | Brand and product names | Defend efficiently; avoid overpaying if organic rank is dominant. |
| Category core | "stainless steel water bottle" | Scale carefully; competition is high. |
| Problem/use case | "bottle keeps water cold all day" | Often strong CVR if listing matches the claim. |
| Feature/spec | "32 oz insulated bottle" | Good for differentiated products. |
| Competitor | Competitor brand/product terms | Use only when price, reviews, and creative comparison are credible. |
| Complementary | Products used with yours | Test at lower bids first. |

## Negative Keywords

Use negatives to protect budget and clarify learning.

| Negative type | Use |
|---|---|
| Negative exact | Block a specific irrelevant or unprofitable query. |
| Negative phrase | Block a theme that is consistently irrelevant. Use cautiously. |
| Campaign cross-negatives | Prevent discovery campaigns from stealing exact winners after graduation. |

Do not over-negate early. New launches need enough data to learn which terms convert.

## Placement Strategy

Sponsored Products placement adjustments can change auction pressure significantly.

| Placement | Use |
|---|---|
| Top of Search | Strong for proven high-intent terms; raise only when CVR and margin support it. |
| Rest of Search | Useful for efficient reach and discovery. |
| Product Pages | Strong for ASIN conquesting, defensive coverage, and comparison shopping. |

Avoid applying large placement multipliers to unproven broad or automatic targets.

## Launch Phases

### Phase 1: Retail Readiness

Before launch, confirm product detail page quality, images, price, inventory, fulfillment, compliance, and review plan.

### Phase 2: Discovery

Run automatic, broad, phrase, and controlled product targeting to identify converting queries and ASINs. Keep budgets modest and review search terms frequently.

### Phase 3: Harvest

Move converting queries and ASINs into manual exact or product-targeting campaigns. Add negatives to discovery campaigns when needed.

### Phase 4: Scale

Increase budgets and bids on proven targets, expand Sponsored Brands and Sponsored Display, and test DSP only when the performance core and measurement are stable.

## Seasonality

For major retail events, plan backward:

- 6-8 weeks before: inventory, deal eligibility, creative, Store, and keyword expansion.
- 3-4 weeks before: discovery and audience building.
- Event period: budget pacing, priority terms, deal-linked creative, inventory monitoring.
- 1-2 weeks after: remarketing, repeat purchase, search term harvesting, profitability review.

Prime Day, Black Friday/Cyber Monday, holiday periods, and local retail events vary by marketplace. Verify event timing and deal deadlines locally.

## Operating Cadence

| Cadence | Work |
|---|---|
| Daily during launch/event | Budget caps, out-of-stock risk, disapprovals, spend anomalies, Featured Offer loss |
| 2-3 times weekly | Search terms, bids, negatives, placement performance |
| Weekly | ACoS/ROAS/TACoS, query graduation, creative learnings, product page conversion |
| Monthly | Budget allocation, campaign structure cleanup, organic rank, incrementality, margin impact |

## Common Mistakes

- Scaling ads before retail readiness.
- Combining too many roles in one campaign.
- Treating ACoS as the only KPI during launch or category expansion.
- Ignoring TACoS, organic rank, contribution margin, and inventory.
- Overbidding competitor targets when the offer is weaker.
- Expanding to DSP before sponsored ads have produced stable learning.
