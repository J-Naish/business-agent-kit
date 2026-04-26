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
