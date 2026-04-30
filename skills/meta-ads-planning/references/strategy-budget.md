# Budget planning and viability

Use this reference to decide whether the proposed Meta campaign mix can learn, convert, and be judged with the available budget. Budget planning should start from economics and expected signal volume, not from a generic funnel split.

## Core formulas

| Question | Formula | Use |
|---|---|---|
| Allowable CPA | Average order/deal value x gross margin x close rate | Maximum acquisition cost before profit |
| Required impressions | Target clicks / expected CTR x 100 | Whether reach can support the plan |
| Required clicks | Target conversions / expected CVR | Whether traffic volume is enough |
| Required spend | Required conversions x expected CPA | Whether the plan can generate signal |
| Expected conversions | Budget / expected CPA | Whether the optimization event has enough volume |
| Break-even ROAS | 1 / gross margin | Revenue ROAS floor for e-commerce |
| Contribution ROAS | Contribution margin / ad spend | Better when shipping, discounts, COGS, and returns matter |

For lead gen:

```
Allowable CPL = average deal value x gross margin x opportunity rate x close rate
```

For e-commerce:

```
Break-even ROAS = 1 / gross margin
Target ROAS should sit above break-even after returns, shipping, discounts, and operating costs.
```

---

## Viability check

Before recommending campaign objectives or structures, answer these in order.

| Step | Question | Decision |
|---|---|---|
| 1 | What is the true business outcome? | Purchase, qualified lead, booked job, retained app user, store sale |
| 2 | What is the allowable CPA / required ROAS? | If unknown, calculate a range from unit economics |
| 3 | What CPA/CPL/CPI range is plausible? | Use account history or conservative planning assumptions |
| 4 | What conversion rate is plausible from the destination? | Use history if available; otherwise be conservative |
| 5 | How many true outcomes can the budget buy? | Determines structure and bidding |
| 6 | Is conversion latency acceptable? | Long lag means longer judgment windows |
| 7 | What can be measured as primary? | Use the deepest reliable event with enough volume |

---

## Budget-to-structure decision

| Expected monthly true conversions | Structure posture | Bidding / optimization posture |
|---|---|---|
| 0-10 | Very narrow. One main campaign/ad set and one clean event | Lowest cost; avoid cost controls and complex tests |
| 10-30 | Still consolidated. Avoid many ad sets and separate test campaigns | Lowest cost; consider a validated proxy event if true CV is too sparse |
| 30-50 | One main campaign per distinct goal can work | Cost controls only if CPA is stable |
| 50-100 | Room for controlled creative testing or funnel separation | Advantage+ / broad delivery tests become more defensible |
| 100+ | Broader structure and experiments become realistic | Cost cap, ROAS goal, value optimization, holdouts where suitable |

These are operating thresholds, not platform requirements. If the conversion action is low-quality, more volume does not help.

---

## Budget allocation principles

| Principle | Practice |
|---|---|
| Fund the primary learning loop first | Put enough budget into the campaign with the cleanest business signal |
| Do not split tests too early | A creative test is useless if neither side gets enough delivery |
| Keep testing budget proportional | 10-20% for creative testing is a common starting point when total budget supports it |
| Retargeting needs a cap | Warm audiences can absorb spend while looking efficient but non-incremental |
| Scaling needs creative depth | Budget increases expose creative fatigue faster |
| Increase budget gradually | 20-30% steps are a conservative heuristic, not a universal platform law |
| Keep reserve for fixes | Tracking, catalog, form, landing page, CRM, and creative work can matter more than media spend |

---

## Campaign mix by budget sufficiency

| Budget condition | Recommended posture |
|---|---|
| Budget cannot buy at least several meaningful outcomes/month | Keep one narrow conversion loop or use a higher-funnel proxy only with a clear quality caveat |
| Budget can buy traffic but not 15+ true outcomes/month | Use one consolidated campaign; avoid separate prospecting, retargeting, and testing campaigns |
| Budget can produce 30+ true outcomes/month | Limited automation and creative testing become more realistic |
| Budget can produce 50+ true outcomes/month | Broad/Advantage+ delivery, value optimization tests, and controlled expansion become more defensible |
| Budget supports separate goals with volume in each | Split by economics, customer type, geo, funnel role, or measurement need |

---

## Red flags

| Symptom | What it means | Action |
|---|---|---|
| Daily budget is below expected CPA | Delivery can spend for days without a result | Consolidate or use a more frequent validated event |
| Many ad sets each spend tiny amounts | Signal fragmentation | Consolidate around the cleanest signal |
| CPL is cheap but SQL rate is weak | The system is learning low-quality leads | Add qualification and import quality events |
| ROAS is strong but profit is weak | Margin or existing-customer mix is wrong | Report contribution and new-customer rate |
| Frequency rises while CTR falls | Creative or audience fatigue | Refresh creative before bid tweaks |
| Testing budget is too small for conclusions | False winners and losers | Test fewer, more distinct concepts |

---

## Minimum answer format

When answering budget viability, include:

1. Economic target: allowable CPA/CPL/CPI or required ROAS.
2. Expected signal volume: likely true outcomes/month.
3. Learning viability: whether the event and campaign mix can learn.
4. Structure implication: how many campaigns/ad sets are justified.
5. What not to launch yet: underfunded or unmeasurable structures.
