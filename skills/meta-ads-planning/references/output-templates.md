# Output Templates

## Template 1: Meta Ads Operating Specification

Use for a new launch or major account redesign.

```markdown
# Meta Ads Operating Specification

Date: YYYY-MM-DD
Subject: {company / project / account}

---

## 1. Strategy Summary

### 1-1. Business Context

- Offer: {product / service}
- Business model: {e-commerce / lead generation / app / local business / SaaS / brand awareness}
- Target audience: {audience summary}
- Destination: {URL or in-platform destination}

### 1-2. Advertising Goal

- Primary KPI: {CPA / ROAS / CPL / CPI / other}
- Target value: {amount, percentage, or range}
- Monthly budget: {currency + amount}
- Target conversion volume: {conversions per month}

### 1-3. Campaign Design Rationale

{Explain why this campaign objective, structure, format mix, and measurement approach were selected.}

---

## 2. Campaign Structure

| # | Campaign name | Objective | Structure | Budget share | Daily budget | Bid strategy |
|---|---|---|---|---:|---:|---|
| 1 | {name} | {Sales/Leads/Awareness/etc.} | {Advantage+ sales campaign / campaign budget / ad set budget} | {XX%} | {amount} | {Lowest cost / Cost cap / ROAS goal / Bid cap} |
| 2 | {name} | {objective} | {structure} | {XX%} | {amount} | {strategy} |

### Ad Set Structure

| Campaign | Ad set name | Audience | Placements | Optimization event |
|---|---|---|---|---|
| {campaign} | {ad set} | {broad / Lookalike / Custom Audience / remarketing} | {Advantage+ placements / manual placements} | {Purchase / Lead / LandingPageView / app event / other} |

### Naming Convention

**Campaign name:** `{Objective}_{Funnel}_{Structure}_{Note}`

| Element | Values |
|---|---|
| Objective | `Sales` `Leads` `Awareness` `Traffic` `Engagement` `AppPromo` |
| Funnel | `TOF` `MOF` `BOF` `RT` |
| Structure | `ASC` `CBO` `ABO` or local account terminology |
| Note | `Test` `Scale` `Evergreen` etc. |

Examples: `Sales_BOF_ASC_Scale` / `Awareness_TOF_CBO` / `Leads_MOF_CBO_Test`

**Ad set name:** `{Audience}_{Placement}_{Note}`

Examples: `Broad_AllPlacements` / `LAL_Purchasers_1pct` / `RT_ViewContent_7d`

**Ad name:** `{Format}_{Concept}_{Variant}`

Examples: `Video_UGC_HookA` / `Carousel_Product_v2` / `Image_Benefit_TestB`

Rules:

- Use underscores `_`.
- Prefer English names for cleaner filtering and exports.
- Do not include launch dates unless it is a temporary test; use `_Test_YYMM` if needed.

---

## 3. Campaign-Level Design

### 3-1. {Campaign Name}

#### Basic Settings

- Campaign objective: {Awareness / Traffic / Engagement / Leads / App promotion / Sales}
- Structure: {Advantage+ sales campaign / campaign budget / ad set budget}
- Daily budget: {amount}
- Special campaign type: {Advantage+ sales campaign / Advantage+ app campaign / standard campaign}

#### Advantage+ Sales Campaign Settings

- Existing customer definition: {Pixel event / Custom Audience / customer list}
- Existing customer budget cap: {percentage if used}
- Geography: {target locations}
- Age and gender: {unrestricted or constrained}
- Advantage+ creative: {on/off}

#### Standard Campaign Ad Set Settings

- Placements: {Advantage+ placements / manual placements}
  - If manual: {Facebook Feed, Instagram Feed, Instagram Reels, Instagram Stories, Marketplace, etc.}
  - Exclusions: {Audience Network or other exclusions if needed}
- Targeting:
  - Advantage+ audience: {on/off}
  - Location: {locations}
  - Age: {range}
  - Gender: {all / men / women / custom}
  - Language: {languages}
  - Detailed targeting: {broad / interests / behaviors}
  - Custom Audience: {none / website visitors / customer list / etc.}
  - Lookalike Audience: {none / source and percentage}
- Optimization event: {Purchase / Lead / AddToCart / LandingPageView / etc.}
- Attribution setting: {7-day click + 1-day view / 7-day click / 1-day click / other}
- Bid strategy: {Lowest cost / Cost cap amount / ROAS goal / Bid cap amount}

#### Ad Settings

- Format: {image / video / carousel / collection / Lead Ads}
- Advantage+ creative: {on/off}
- Destination: {landing page URL / Instant Experience / Instant Form}
- CTA: {Shop Now / Learn More / Sign Up / Download / Contact Us / etc.}

---

## 4. Creative Specification

### Overall Direction

- Creative diversity: {number of distinct concepts; recommend at least 3-5 when budget allows}
- Master aspect ratio: {9:16 for Reels-first / 4:5 for Feed-first}
- Tone: {casual / professional / premium / energetic / etc.}
- Quantity: {ads per ad set and total ads}

### Image Ads

| # | Concept | Design pattern | Size | Production instruction |
|---|---|---|---|---|
| 1 | {concept} | {before/after / statistic / testimonial / etc.} | 1080x1350 | {instruction} |
| 2 | {concept} | {pattern} | 1080x1350 | {instruction} |

### Video Ads

| Item | Spec |
|---|---|
| Aspect ratio | 9:16 for Reels/Stories, 4:5 for Feed |
| Resolution | 1080x1920 or higher, 1080x1350 or higher |
| Length | {15s / 30s / 60s} |
| File type | MP4 / MOV |
| Captions | Required by default |

**Video structure:**

| Section | Time | Content | Text overlay |
|---|---:|---|---|
| Hook | 0-3s | {hook content} | {text} |
| Body | 3-20s | {problem -> solution -> benefit} | {text} |
| CTA | 20-25s | {CTA content} | {text} |

**Safe-zone checklist:**

- [ ] 9:16 asset keeps important text and objects out of the lower Reels UI area.
- [ ] Key text is centered or slightly above center.

### Carousel Ads

| Card | Content | Headline | Description | Destination |
|---|---|---|---|---|
| Card 1 | {instruction} | {headline} | {description} | {URL} |
| Card 2 | {instruction} | {headline} | {description} | {URL} |
| Card 3 | {instruction} | {headline} | {description} | {URL} |

Structure pattern: {storytelling / feature sequence / step-by-step / product list / before-after / benefit stack}

### Collection Ads

- Cover: {image/video and instruction}
- Instant Experience template: {Instant Storefront / Instant Lookbook / Instant Customer Acquisition / Instant Storytelling}
- Product catalog: {catalog name or product set}
- Products shown: {number or selection rule}

### Lead Ads / Instant Forms

- Form type: {More volume / Higher intent / Rich creative}
- Question design:

| # | Question | Type | Choices / format |
|---|---|---|---|
| 1 | {question} | {prefill / custom / conditional} | {choices or text input} |
| 2 | {question} | {type} | {choices} |

- CRM integration: {native integration / Zapier / direct API / manual export / not yet set}

---

## 5. Copy Plan

### Ad Copy Requirements

| Element | Quantity | Recommended length | Notes |
|---|---:|---:|---|
| Primary text | 3-5 | Up to 125 characters before truncation risk | See variants below |
| Headline | 3-5 | Up to 27 characters before truncation risk | See variants below |
| Description | 1-3 | Up to 27 characters | May not display |
| CTA button | 1 | Preset | {Shop Now / Learn More / etc.} |

### Primary Text Variants

| # | Text | Angle | Length |
|---|---|---|---:|
| 1 | {text} | {benefit / pain point / social proof / etc.} | {characters} |
| 2 | {text} | {angle} | {characters} |
| 3 | {text} | {angle} | {characters} |

### Headline Variants

| # | Headline | Angle | Length |
|---|---|---|---:|
| 1 | {headline} | {angle} | {characters} |
| 2 | {headline} | {angle} | {characters} |
| 3 | {headline} | {angle} | {characters} |

### Description Variants

| # | Description | Length |
|---|---|---:|
| 1 | {description} | {characters} |

---

## 6. Measurement Design

### Meta Pixel / Conversions API

| Item | Setting |
|---|---|
| Pixel implementation | {manual code / GTM / partner integration} |
| Conversions API | {enabled / not enabled / planned} |
| CAPI implementation | {server-side GTM / direct API / partner integration / CAPI Gateway} |
| Domain verification | {done / not done} |
| Event priority / iOS measurement controls | {configured / not configured / not applicable} |

### Conversion Event Definition

| Event name | Type | Count | Purpose | Used for optimization |
|---|---|---|---|---|
| PageView | Standard | Every event | Pageview measurement | No |
| ViewContent | Standard | Every event | Product/content view | {yes/no} |
| AddToCart | Standard | Every event | Cart intent | {yes/no} |
| Purchase | Standard | Every event | Purchase completion | {yes/no} |
| Lead | Standard | First or every event, depending on setup | Lead submission | {yes/no} |

### Event Priority

| Priority | Event |
|---:|---|
| 1 | {Purchase or highest-value event} |
| 2 | {AddToCart or secondary event} |
| 3 | {ViewContent or proxy event} |

### Measurement QA Checklist

- [ ] Pixel fires on key pages.
- [ ] Events appear in Test Events.
- [ ] Conversions API diagnostics are reviewed.
- [ ] Domain verification is complete where needed.
- [ ] Event priority is configured where needed.

---

## 7. Operating Timeline

### Phase 1: Launch and Learning

| Item | Plan |
|---|---|
| Period | {start date} to {end date} |
| Goal | Allow learning to stabilize |
| Daily budget | {amount or target CPA multiple} |
| Bid strategy | Lowest cost for data collection |
| Do | Check delivery, disapprovals, tracking, learning status |
| Avoid | Changing bid, budget, targeting, optimization event, or creative without a clear reason |
| Allowed fixes | Replace disapproved creative, fix obvious setup errors |

### Phase 2: Initial Optimization

| Item | Plan |
|---|---|
| Period | {dates} |
| Goal | Identify winning creative and audience signals |
| Do | Evaluate creative, pause clear losers, add new creative tests |
| Bid strategy review | Move from Lowest cost to Cost cap or ROAS goal only if performance is stable |
| Budget adjustment | Increase gradually when performance supports it |

### Phase 3: Optimization and Scaling

| Item | Plan |
|---|---|
| Period | {month 2 onward or dates} |
| Do | Operate testing + scaling structure |
| Creative operations | Add new concepts every 1-2 weeks or when fatigue appears |
| Scaling | Vertical budget increases and horizontal concept expansion |
| Monthly review | Trend analysis for ROAS, CPA, CVR, creative fatigue, and strategy fit |

---

## 8. KPI Targets and Benchmarks

| Metric | Target | Benchmark | Action threshold | Review timing |
|---|---:|---:|---|---|
| CPA | {amount} | {benchmark} | Investigate if 150% of target | Weekly |
| ROAS | {ratio or %} | {benchmark} | Investigate if below 70% of target | Weekly |
| CTR | {percentage} | {benchmark} | Review creative if materially low | Daily/weekly |
| CVR | {percentage} | {benchmark} | Review landing page and offer | Weekly |
| CPM | {amount} | {benchmark} | Investigate auction or audience pressure | Weekly |
| CPC | {amount} | {benchmark} | Diagnose creative and destination | Weekly |
| Frequency | {number} | {benchmark} | Refresh creative when fatigue appears | Daily/weekly |
| Conversion volume | {monthly count} | - | Reassess strategy if far below target | Monthly |

---

## 9. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| CPA spikes during learning | Allow enough learning time before judging unless tracking or setup is broken |
| Learning limited | Consolidate ad sets or use a more frequent event if quality tradeoff is acceptable |
| Creative fatigue | Add new concepts regularly and refresh when frequency rises and CTR falls |
| Budget change resets learning | Use gradual changes and avoid simultaneous major edits |
| iOS or browser signal loss | Use Conversions API, event priority, and modeled data carefully |
| Advantage+ overweights existing customers | Define existing customers and monitor new vs existing customer contribution |
| Placement skew | Review placement breakdowns when using Advantage+ placements |
| Ad disapprovals | Check Meta Advertising Standards before launch and keep landing page claims aligned |
```

---

## Template 2: Design Memo

Use for an existing account adjustment or a single campaign addition.

```markdown
# Meta Ads Design Memo

Date: YYYY-MM-DD
Subject: {campaign / initiative}

## Goal

{What this change should accomplish.}

## Change Summary

{New addition or change overview.}

## Design Details

### Campaign Settings

- Objective: {Sales / Leads / Awareness / etc.}
- Structure: {Advantage+ sales campaign / campaign budget / ad set budget}
- Daily budget: {amount}

### Ad Set Settings

- Targeting: {details}
- Placements: {Advantage+ placements / manual placements}
- Optimization event: {Purchase / Lead / etc.}
- Bid strategy: {Lowest cost / Cost cap amount}

### Creative

- Format: {image / video / carousel / collection}
- Quantity: {number}
- Concept: {summary}

## Expected Impact

{Expected KPI or learning impact.}

## Checks

- [ ] {check 1}
- [ ] {check 2}
- [ ] {check 3}
```

---

## Template 3: Creative Brief

Use as a handoff to a creative or production team.

```markdown
# Meta Ads Creative Brief: {Campaign Name}

## Overview

- Ad format: {image / video / carousel / collection / Lead Ads}
- Campaign objective: {Sales / Leads / Awareness / etc.}
- Target audience: {persona summary}
- Placements: {Advantage+ placements / Facebook Feed + Instagram Feed + Reels / etc.}

## Key Message

- Main promise: {one sentence}
- Supporting proof: {proof point}
- CTA: {action}

## Required Assets

### Images

| # | Size | Aspect ratio | Use | Instruction | Notes |
|---|---|---|---|---|---|
| 1 | {WxH} | {4:5 / 1:1 / 9:16} | {Feed / Stories / Reels} | {instruction} | {note} |

### Videos

| # | Length | Aspect ratio | Use | Instruction | Notes |
|---|---:|---|---|---|---|
| 1 | {seconds} | {9:16 / 4:5 / 1:1} | {Reels / Feed / Stories} | {instruction} | {note} |

### Video Structure

| Section | Time | Content | Text overlay |
|---|---:|---|---|
| Hook | 0-{X}s | {instruction} | {text} |
| Body | {X}-{Y}s | {instruction} | {text} |
| CTA | {Y}-{Z}s | {instruction} | {text} |

## Tone

- Style: {UGC-style / polished / minimal / etc.}
- Brand elements: {logo, color, typography rules}
- Mood: {friendly / premium / energetic / etc.}

## Safe-Zone Checks

- [ ] 9:16 assets keep text and key objects out of the lower Reels UI area.
- [ ] 4:5 assets leave room for interface overlap.
- [ ] Image text is minimal and mobile-readable.

## Do Not

- {rule 1}
- {rule 2}

## Delivery Format

- Images: {PNG/JPG}, {resolution}
- Videos: {MP4/MOV}, {resolution}
- File size: follow Meta specs and keep files practical for upload
- Captions: {burned-in captions / SRT / both}
- Delivery location: {requested handoff location or tool}
- Due date: {date}
```
