# Output templates

Templates for written deliverables when one is appropriate. **A written document is not always required** — see SKILL.md "Output flexibility." Use these templates when the user asks for a written plan or when the deliverable is being handed off to another team / agency / client. For focused questions or quick guidance, a conversational answer is better.

## Contents

- [Template 1: Strategy document (full version)](#template-1-strategy-document-full-version)
- [Template 2: Design memo (lightweight version)](#template-2-design-memo-lightweight-version)
- [Template 3: Creative brief](#template-3-creative-brief)

---

## Template 1: Strategy document (full version)

Use for new launches and major restructures.

```markdown
# Google Ads strategy document

Created: YYYY-MM-DD
Subject: {Company name / project name}

---

## 1. Strategy summary

### 1-1. Business overview
- Offer: {Product / service name}
- Business model: {E-commerce / lead generation / app / store visits}
- Target audience: {Audience summary}
- Landing page: {URL}

### 1-2. Advertising goals
- Primary KPI: {CPA $X,XXX / ROAS XXX% / CPI $XX}
- Monthly budget: ${XXX,XXX}
- Target conversions: {XX / month}

### 1-3. Why this ad-type mix
{Reasoning for the chosen ad-type combination}

---

## 2. Campaign structure

| # | Campaign name | Type | Goal | Bid strategy | Daily budget | Monthly split |
|---|---|---|---|---|---|---|
| 1 | {name} | {Search / P-MAX / etc} | {goal} | {tCPA / tROAS / etc} | ${X,XXX} | {XX%} |
| 2 | {name} | {type} | {goal} | {strategy} | ${X,XXX} | {XX%} |

### Naming convention

Follow the conventions in SKILL.md "Naming conventions."

**Campaign name:** `{Type}_{Goal}_{Target}_{Geo}_{Note}`

| Element | Values |
|---|---|
| Type | `Search` `PMax` `Display` `Shopping` `Video` `DGen` `App` |
| Goal | `CV` `Lead` `Sales` `Awareness` `Traffic` `Install` |
| Target | `Brand` `NonBrand` `Competitor` `Remarketing` `Prospecting` `AllProducts` |
| Geo | `US` `Tokyo` `EU` etc. (omit if global) |

Examples: `Search_CV_Brand_US` / `PMax_Sales_AllProducts` / `DGen_Lead_Prospecting`

**Ad group / asset group name:** `{Theme}_{Subcategory}`

Examples: `CRM_Exact` / `Pricing_Phrase` / `NewCustomer_HighValue`

**Rules:**
- Use underscores `_` consistently as the separator
- English-based names recommended; PascalCase tokens (`NonBrand`, `AllProducts`) for multi-word elements
- Don't include the start date in the name (only test campaigns may append `_Test_YYMM`)

---

## 3. Per-campaign design

### 3-1. {Campaign name 1}

#### Basic settings
- Type: {Search / P-MAX / Display / etc}
- Bid strategy: {strategy} / Target: {$X,XXX or XXX%}
- Daily budget: ${X,XXX}
- Geography: {nationwide / specific region}
- Devices: {all / with adjustments}

#### [If Search] Keyword design

| Category | Example keywords | Match type | Expected CPC |
|---|---|---|---|
| Brand | {KW1}, {KW2} | Exact | ${XX} |
| High intent | {KW3}, {KW4} | Phrase | ${XXX} |
| Generic | {KW5}, {KW6} | Broad | ${XXX} |

Negative keywords:
- {Negative KW1} (reason: {XXX})
- {Negative KW2} (reason: {XXX})

#### [If Search] Ad copy

**Headline drafts (15):**
1. {Headline 1} (angle: numerical proof)
2. {Headline 2} (angle: problem statement)
3. {Headline 3} (angle: benefit)
...

**Description drafts (4):**
1. {Description 1}
2. {Description 2}
...

**Ad assets:**
- Sitelinks: {4+}
- Callouts: {4+}
- Structured snippets: {XXX}

#### [If P-MAX] Asset group design

| AG name | Target | Search themes | Landing page |
|---|---|---|---|
| {AG1} | {target} | {theme1, theme2...} | {URL} |
| {AG2} | {target} | {theme3, theme4...} | {URL} |

Audience signals:
- Customer Match: {customer-list availability and contents}
- Website visitors: {remarketing list}
- Custom segments: {search KW / URL}
- In-market: {category}

URL expansion: {ON / OFF} (reason: {XXX})
Brand exclusion: {what's excluded}

#### [If P-MAX] Creative requirements

**Text assets:**
| Type | Count | Char limit | Content |
|---|---|---|---|
| Headline | 5+ | 30 chars | {draft 1}, {draft 2}... |
| Long headline | 5+ | 90 chars | {draft 1}, {draft 2}... |
| Description | 4+ | 90 chars | {draft 1}, {draft 2}... |
| Business name | 1 | 25 chars | {name} |

**Image assets:**
| Type | Size | Count | Content direction |
|---|---|---|---|
| Landscape | 1200×628 | 3+ | {direction} |
| Square | 1200×1200 | 3+ | {direction} |
| Portrait | 960×1200 | 1+ | {direction} |
| Logo (landscape) | 1200×300 | 1 | {logo} |
| Logo (square) | 1200×1200 | 1 | {logo} |

**Video assets:**
| Type | Length | Aspect ratio | Count | Content direction |
|---|---|---|---|---|
| Landscape | 15–30 s | 16:9 | 1+ | {direction} |
| Vertical | 15–30 s | 9:16 | 1+ | {direction} |
| Square | 15–30 s | 1:1 | 1 | {direction} |

---

## 4. Measurement design

### Conversion definitions
| CV name | Type | Counting | Value | Use |
|---|---|---|---|---|
| {CV1} | Primary | {every / one per click} | {$X,XXX / dynamic} | Used for bid optimization |
| {CV2} | Secondary | {every / one per click} | – | Reference metric |

### Tracking requirements
- [ ] Google Ads global site tag or GTM setup
- [ ] Enhanced Conversions
- [ ] GA4 integration
- [ ] Offline conversion import (for lead generation)

---

## 5. Operating timeline

### Phase 1: Launch (week 1–2)
- Campaign live, learning period
- Don't change bidding, budget, or targeting
- Daily: monitor delivery, disapprovals, search terms
- Allowed changes: add negative keywords, swap disapproved assets

### Phase 2: Post-learning, initial optimization (week 3–4)
- Confirm learning status
- Review search-terms report and add negative keywords
- Audit underperforming KWs / asset groups / assets
- Consider migrating bid strategy as conversion data accumulates

### Phase 3: Full optimization (month 2 onward)
- Migrate to tCPA / tROAS
- Add and test new assets / creatives
- Reallocate budget toward winning patterns
- Monthly review for strategy-level adjustments

---

## 6. KPIs and success criteria

| Metric | Target | Review cadence | Pass criterion |
|---|---|---|---|
| CPA | ${X,XXX} | Every 2 weeks | Within ±20% of target |
| ROAS | {XXX%} | Every 2 weeks | Within ±20% of target |
| CTR | {X.X%} | Weekly | At or above account baseline for the same intent segment |
| CV count | {XX / month} | Monthly | Evaluate together with budget pacing |
| Quality Score | 7+ | Monthly | Search only |

---

## 7. Risks and mitigations

| Risk | Mitigation |
|---|---|
| CPA spike during learning | 2–4 weeks is expected. If 2× target, review assets / targeting. |
| P-MAX cannibalizing Search | Monitor search-terms report. Add exact-match keywords to the Search campaign. |
| Creative fatigue | Audit asset performance every 4–6 weeks. Replace anything rated Low. |
| Budget skew across channels | Use channel-level reporting. If YouTube dominates, consider splitting asset groups. |
```

---

## Template 2: Design memo (lightweight version)

Use for partial changes to an existing account or a single new campaign.

```markdown
# Google Ads design memo

Created: YYYY-MM-DD
Subject: {Campaign name / initiative name}

## Goal
{What this initiative is trying to achieve}

## Changes
{Summary of the new addition or change}

## Design details
{Concrete design — campaign settings, keywords, copy, etc.}

## Expected impact
{Anticipated KPI changes}

## Pre-launch checklist
- [ ] {Item 1}
- [ ] {Item 2}
```

---

## Template 3: Creative brief

Use as a brief for the creative production team.

```markdown
# Creative brief: {Campaign name}

## Overview
- Ad type: {P-MAX / Display / Video / etc}
- Goal: {Awareness / consideration / conversion}
- Target audience: {Persona summary}

## Key messages
- Primary message: {One sentence}
- Secondary message: {Supporting}
- CTA: {Call-to-action copy}

## Asset list

### Images
| # | Size | Use | Direction | Notes |
|---|---|---|---|---|
| 1 | {WxH} | {use} | {direction} | {notes} |

### Videos
| # | Length | Aspect ratio | Direction | Notes |
|---|---|---|---|---|
| 1 | {sec} | {ratio} | {direction} | {notes} |

## Tone & manner
{Brand guidelines, color, fonts, etc.}

## Don't-do list
- {Constraint 1}
- {Constraint 2}

## Delivery
- File formats: {PNG / JPG / MP4}
- Destination: follow your project's conventions for handoff
- Deadline: {date}
```
