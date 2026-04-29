# Budget planning and viability

Use this reference to decide whether the proposed campaign mix can learn, convert, and be judged with the available budget. Budget planning should start from economics and required signal volume, not from a generic channel mix.

## Core formulas

| Question | Formula | Use |
|---|---|---|
| Break-even CPA | Average order / deal value × gross margin × close rate | Maximum acquisition cost before profit |
| Required clicks | Target conversions ÷ expected CVR | Whether the budget can generate enough traffic |
| Required spend | Required clicks × expected CPC | Whether the plan is financially viable |
| Expected conversions | Budget ÷ expected CPC × expected CVR | Whether Smart Bidding has enough volume |
| Break-even ROAS | 1 ÷ gross margin | Revenue ROAS floor for e-commerce |
| Contribution ROAS | Contribution margin ÷ ad spend | Better when shipping, discounts, COGS, and returns matter |

For lead gen, replace gross margin with expected contribution per qualified lead:

```
Allowable CPA = average deal value × gross margin × opportunity rate × close rate
```

For e-commerce:

```
Break-even ROAS = 1 / gross margin
Target ROAS should sit above break-even after accounting for returns, shipping, discounts, and operating cost.
```

---

## Viability check

Before recommending campaign types, answer these in order.

| Step | Question | Decision |
|---|---|---|
| 1 | What is the true business outcome? | Purchase, qualified lead, booked job, retained app user, store sale |
| 2 | What is the allowable CPA / required ROAS? | If unknown, calculate a range from unit economics |
| 3 | What CPC / CPM / CPI range is plausible? | Use account history or planning estimates |
| 4 | What CVR is plausible from current LP / app / feed? | Use history if available; otherwise be conservative |
| 5 | How many conversions can the budget buy? | Determines bidding and campaign complexity |
| 6 | Is conversion latency acceptable? | Long lag means longer judgment windows and slower optimization |
| 7 | What can be measured as primary? | Use the deepest reliable signal with enough volume |

---

## Budget-to-structure decision

| Expected monthly true CVs | Structure posture | Bidding posture |
|---|---|---|
| 0–10 | Very narrow. One high-intent campaign or data-gathering setup | Manual CPC / Maximize Clicks / Maximize Conversions only if signal is clean |
| 10–30 | Still consolidated. Avoid multi-campaign fragmentation | Maximize Conversions; be cautious with tCPA |
| 30–50 | One main campaign per distinct goal can work | tCPA may be viable if CPA is stable |
| 50–100 | Room for controlled expansion | Test Broad + Smart Bidding, P-MAX, or Demand Gen depending on business model |
| 100+ | Broader structure and experiments become realistic | tCPA / tROAS / portfolio strategies become more defensible |

These are operating thresholds, not platform requirements. If the conversion action is low-quality, more volume does not help.

---

## Campaign mix by budget sufficiency

| Budget condition | Recommended posture |
|---|---|
| Budget cannot buy 10 meaningful clicks/day | Do not spread across campaign types. Use a narrow Search or Shopping test, improve LP/feed first, or reconsider paid search viability |
| Budget can buy traffic but not 15+ true CVs/month | Use high-intent capture and learn from search terms / product data. Keep micro-CVs secondary unless a proxy is validated |
| Budget can produce 30+ true CVs/month | Smart Bidding and limited automation become more realistic |
| Budget can produce 50+ true CVs/month | P-MAX, Broad + Smart Bidding, and controlled expansion can be tested |
| Budget can support separate goals with volume in each | Split by business economics: brand/non-brand, margin, category, customer type, geo, or funnel role |

### Rough monthly-budget shorthand

Use these only as rough orders of magnitude. Always override them with local CPCs, expected CVR, target economics, and expected true conversion volume.

| Monthly budget | Recommended structure |
|---|---|
| Up to ~$1,000 | Single Search campaign (brand KW + high-intent KW) |
| ~$1,000–$3,000 | Search + P-MAX or Display remarketing, only if signal and budget can support it |
| ~$3,000–$10,000 | Search + P-MAX + Video or Display when the role is clear |
| Above $10,000 | Full-funnel structure; separate campaigns by goal, economics, and measurement quality |

---

## Budget allocation principles

| Principle | Practice |
|---|---|
| Fund the primary learning loop first | Put enough budget into the campaign with the cleanest conversion signal |
| Do not split tests too early | A 50/50 test is useless if neither side gets enough conversions |
| Brand needs a separate cap | Brand can absorb budget while looking efficient; cap it if acquisition is the goal |
| Expansion needs a defined job | Demand Gen, Display, and Video should have a role beyond "get more conversions" |
| Increase budget gradually | Large jumps can destabilize learning and hide cause/effect |
| Keep reserve for fixes | Feed, LP, tracking, creative, and CRM work often matter more than buying more traffic |

---

## Red flags

| Symptom | What it means | Action |
|---|---|---|
| Target CPA is below realistic CPC ÷ CVR | The economics do not work at current traffic quality | Improve CVR/offer, narrow intent, or reset target |
| P-MAX budget is below target CPA | Learning will be slow and noisy | Use Search / Shopping first or raise budget |
| Demand Gen budget is tiny and goal is direct CPA | It may never gather enough signal | Use remarketing/customer lists or delay launch |
| Lead CPA looks good but SQL rate is weak | Bid strategy is learning low-quality leads | Import quality or change primary CV |
| ROAS looks good but profit is weak | Margin mix is wrong | Segment by margin or pass profit-aware values |
| Budget split mirrors channel preference, not economics | Planning is menu-driven | Rebuild allocation from allowable CPA/ROAS and signal quality |

---

## Minimum answer format

When answering budget viability, include:

1. Economic target: allowable CPA or required ROAS.
2. Expected signal volume: likely conversions/month.
3. Learning viability: whether Smart Bidding or automation is realistic.
4. Structure implication: how many campaigns/ad groups are justified.
5. What not to launch yet: campaign types that would be underfunded or unmeasurable.

---

## Bidding strategy escalation and de-escalation

Use this section to choose, change, and roll back bid strategies in real accounts. [SKILL.md](../SKILL.md) routes here whenever bidding, budget sufficiency, or Smart Bidding stability affects the plan.

### How Smart Bidding learns

- Learning lasts up to ~50 conversion events or ~3 conversion cycles, whichever comes first ([Google Ads Help](https://support.google.com/google-ads/answer/13020501)). Don't judge results before that window closes.
- **Strategy switches** (Max Clicks → Max Conv, Max Conv → Max Conv Value, etc.) trigger a new learning period.
- **Target-value changes** (the tCPA / tROAS number) do **not** trigger learning, but bids shift quickly. Prefer target adjustment over strategy switching when the goal is unchanged.
- Bid strategy status `Limited` typically means low conversion volume, budget capping, or an aggressive target. Investigate the cause before adjusting.

### Strategy names vs target settings

For **Search** campaigns, the standalone "Target CPA" and "Target ROAS" strategies were folded into Maximize Conversions / Maximize Conversion Value as **optional targets** in July 2022 and remain that way ([Google Ads Help](https://support.google.com/google-ads/answer/10353027)). The same pattern applies to Demand Gen and P-MAX. **Shopping, Display, Video Action, and App** can still expose Target CPA / Target ROAS as named strategies. The algorithm is identical either way: Maximize Conversions with a target CPA behaves like standalone Target CPA. Across every campaign type, prefer adjusting the target over switching strategies when the goal is unchanged.

### Volume thresholds — official vs practitioner

| Strategy | Official minimum | Practitioner standard |
|---|---|---|
| tCPA (Search/Shopping/Display) | No published minimum; "≥30 conversions" appears in measurement guidance, not migration rules | 30+ / 30d, with ≥3 conversion cycles and ≥4 weeks of stable data (Optmyzr) |
| tROAS (Search/Shopping/Display) | **15 / 30d** ([Help](https://support.google.com/google-ads/answer/6268637)) | 50+ / 30d for stable optimization |
| tROAS (Video Action) | **30 / 30d** | Same |
| tROAS (Hotel) | **50 / week / campaign** | Same |
| tROAS (Travel) | **50 / 7d / campaign** | Same |
| Demand Gen — Max Conv → tCPA/tROAS | **50 conversions** before migration ([Help](https://support.google.com/google-ads/answer/14509385)) | Same |
| Demand Gen value bidding | 50 conv with value / 35d (≥10 in last 7d), or 100 / 35d at account level | Same |

### Conversion latency and the conversion window

- App tROAS: choose a window covering ≥90% of conversions but **<30 days** ([Help](https://support.google.com/google-ads/answer/12073727)).
- Other campaign types: no official window cap; rely on the bid strategy report's "conversion delay" column.
- B2B sales cycles >30 days: extend window to 60–90d, but **GCLIDs expire at 90 days** — anything longer must be measured outside the platform (CRM, MMP) and fed back via OCI.
- High-latency accounts should not be judged on rolling 7-day windows; the algorithm down-weights recent click data automatically.

### Portfolio bid strategies

Use a portfolio strategy when:

- Multiple campaigns share the same offer and CPA/ROAS goal.
- You need bid floors / ceilings (only available in portfolios).
- Combined volume across campaigns reaches the threshold even if no single campaign does.

Avoid when campaigns have different KPIs, margins, or per-campaign budget control. **P-MAX cannot use portfolio bid strategies** ([Help](https://support.google.com/google-ads/answer/6263072)) — keep it on Max Conv / Max Conv Value at lower volume.

### Rollback procedure

The "Google Ads death spiral" / "CPA bottleneck": tight target → suppressed bids → fewer auctions → falling conversions → algorithm tightens further. Once the downgrade signals in SKILL.md trigger, run this sequence:

1. **Stop scaling damage.** Remove the tCPA/tROAS target. The strategy stays Maximize Conversions / Maximize Conversion Value with no target.
2. **Wait 2–3 weeks** for volume and CPA to stabilize on the looser strategy. Don't change other settings during this window.
3. **Reset the target above the new average**, not at the old target. The new average reflects the actual auction reality.
4. **Stair-step from there**: ±10–15% changes, ≥2 weeks between moves.

Never set the initial tCPA below the campaign's current average — this is the most cited cause of instant volume collapse.

### Lead-quality gate (lead-gen specific)

Smart Bidding optimizes for whatever you mark as Primary. With raw form-fill conversions, it will find the cheapest leads in the cheapest geos and tank SQL rate while CPA looks great. Before enabling tCPA on a lead-gen campaign:

- Implement Offline Conversion Import or Enhanced Conversions for Leads (ECfL preferred for new builds).
- Send back the deepest reliable stage with enough volume — typically SQL or Opportunity, not raw lead.
- Use campaign-specific conversion goals; do not mix mid-funnel and bottom-funnel actions in the same Primary set ("goal hijacking").

### Value-based bidding maturity ladder

Move up only when the lower rung produces reliable signal. Pass *margin* or *contribution*, not gross revenue.

| Rung | Signal | Use when |
|---|---|---|
| 1. CPA | Conversion count | Volume thin, no value data |
| 2. CPS (cost per sale) | Sales / qualified leads only | Multiple Primary CVs would dilute |
| 3. ROAS | Revenue | Stable AOV, mixed product mix |
| 4. Profit-aware ROAS | Margin or contribution | Margins vary by SKU, geo, customer type |
| 5. LTV-aware | Predicted LTV | Repeat purchase or subscription business |

Worked example (Vallaeys/Optmyzr): B2B with $3,000 AOV, 45% margin, 20% lead-to-close → conversion value passed = $3,000 × 0.45 × 0.20 = $270/lead. Add expected expansion ($5,000 LTV) → ~$720/lead.

Use **value rules** to apply geo / device / audience multipliers for what Smart Bidding can't observe — margin differences, B2B vs B2C mix, repeat-customer probability.

### Seasonality adjustments and Data exclusions

| Tool | Use for | Don't use for |
|---|---|---|
| **Seasonality adjustment** | Predictable 1–7 day spikes (BFCM, flash sale, scheduled event). Official cap is 14 days; effect decays after 4–7 days in practice ([JumpFly](https://www.jumpfly.com/blog/control-your-bids-with-google-ads-data-exclusions-and-seasonality-adjustments/)) | Ongoing seasons (e.g. all of Q4) — Smart Bidding learns those natively. Permanent CR shifts. |
| **Data exclusion** | Periods of broken tracking, pause, or known measurement gaps | Underperformance you'd like to forget |

Pattern for major events: seasonality adjustment **during** → data exclusion **after** to keep post-event noise out of training.

### Budget-to-bid ratio — full table

| Campaign type | Daily-budget floor | Source |
|---|---|---|
| Search / Shopping | 3–5× tCPA, 1× absolute minimum | Practitioner consensus (StoreGrowers, 30characters) |
| P-MAX | 3× tCPA or $150/day floor | Practitioner consensus (SEJ) |
| Demand Gen | 20× tCPA or $100/day, whichever higher | Practitioner synthesis (Lunio) |
| App ACi tCPI | ≥50× tCPI bid | Official ([Help](https://support.google.com/google-ads/answer/12073727)) |
| App ACi tCPA | ≥10× bid | Official |
| App ACe tCPA | ≥15× bid | Official |
| Shopping / P-MAX (no history) | 2× expected target spend during learning | Official ([Help](https://support.google.com/google-ads/answer/15624876)) |

Click volume matters more than absolute budget multiple: a $200 budget at $5 CPCs gives Smart Bidding more learning fuel than $500 at $40 CPCs (Sarah Stemen). Verify the floor produces meaningful click volume — adjust if it doesn't.

### Decision priority when budget is tight

When budget can't cover all the floors above, prioritize in this order:

1. Fund the campaign with the cleanest conversion signal at full ratio.
2. Brand search at minimal but non-zero spend (assume some would convert organically).
3. Other campaigns at 1× tCPA only if conversion signal is reliable.
4. Cut split-tests and expansion campaigns before underfunding the primary loop.
