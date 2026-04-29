# Google Search Ads (Listing ads)

## Contents

- [Glossary](#glossary)
- [Operating practice](#operating-practice)
- [Decision matrix by monthly CV volume](#decision-matrix-by-monthly-cv-volume)
- [1. Account and campaign structure design](#1-account-and-campaign-structure-design)
- [2. Keyword strategy](#2-keyword-strategy)
- [3. Bid-strategy operating details](#3-bid-strategy-operating-details)
- [4. RSA operating details](#4-rsa-operating-details)
- [5. Ad-copy frameworks](#5-ad-copy-frameworks)
- [6. Ad assets](#6-ad-assets)
- [7. Landing-page optimization](#7-landing-page-optimization)
- [8. Conversion-measurement operating details](#8-conversion-measurement-operating-details)
- [9. Search-campaign settings checklist](#9-search-campaign-settings-checklist)
- [10. Operating cadence and checklists](#10-operating-cadence-and-checklists)
- [11. Analysis and improvement](#11-analysis-and-improvement)
- [12. Budget management and optimization](#12-budget-management-and-optimization)
- [13. Common failure patterns](#13-common-failure-patterns)
- [14. AI Max for Search Campaigns](#14-ai-max-for-search-campaigns)
- [Appendix A: Starter negative-keyword set](#appendix-a-starter-negative-keyword-set)
- [Appendix B: A/B test design template](#appendix-b-ab-test-design-template)

---

## Operating practice

Search works when explicit intent, a relevant promise, a strong landing page, and a reliable conversion signal line up. Do not treat it as a pure keyword/settings exercise.

### What matters most

- **Conversion action quality is the first lever.** A Search campaign optimized to raw form submits will buy different auctions from one optimized to qualified leads or purchases. For lead gen, import CRM/offline quality when possible; otherwise, use a proxy only when it correlates with qualified outcomes.
- **Brand and non-brand must be evaluated separately.** Branded Search often has high reported ROAS because much of the demand already exists. Keep brand isolated so it cannot hide weak non-brand performance or inflate account-level ROAS.
- **Search terms reveal the truth.** If CPA is poor, inspect the query mix before changing bids. Relevant expensive queries usually point to offer, LP, CVR, or target-economics issues; irrelevant queries point to match-type, negative, or AI expansion controls.
- **Broad match is a Smart Bidding tactic, not a manual-bidding tactic.** Use Broad + Smart Bidding when conversion tracking is clean, budget can absorb exploration, and negatives/brand controls are maintained. Keep Exact/Phrase where irrelevant clicks are expensive or compliance risk is high.
- **RSA asset diversity matters more than cosmetic variants.** Provide distinct angles: problem, outcome, proof, offer, objection handling, brand trust, and urgency. Avoid 15 near-identical headlines.
- **Landing-page match beats clever ad copy.** The ad promise, keyword intent, page headline, proof, form/purchase path, and mobile speed need to agree.
- **Bid targets should move gradually.** Large tCPA/tROAS swings suppress volume first and can create multi-week volatility. Use small steps unless business economics changed enough to justify a reset.

- **Reported Search ROAS is most distorted when brand is mixed in.** A high blended ROAS can hide weak non-brand acquisition. For strategy work, always ask: "How does non-brand perform without brand lift?"
- **Do not optimize match types as if it were 2018.** Close variants, Broad + Smart Bidding, and AI Max reduce the value of fine-grained match-type architecture. Keyword hygiene still matters, but query quality and conversion quality matter more.
- **Portfolio bidding helps only when campaigns are economically similar.** Pooling brand and generic, low-CPA and high-CPA, or lead-quality-mismatched campaigns can make the portfolio optimize toward the wrong average.
- **DDA is useful when there is meaningful assist diversity.** In a simple Search-only account it may not change much; in a multi-campaign account it can better reflect assist paths. Do not compare YoY performance across attribution changes without noting the model shift.
- **Search Partners should be a deliberate test.** It can add volume, but quality varies by vertical and geography. Evaluate separately before leaving it on as a default.
- **Competitor campaigns need isolated economics.** They often have lower Quality Score, higher CPC, and weaker CVR. Run only when the strategic value or conquest economics justify it.

### Diagnosis

| Symptom | First checks | Likely action |
|---|---|---|
| High spend, low quality | Search terms, conversion action, LP/form quality | Add negatives, improve CV signal, import quality, tighten LP path |
| Low volume, acceptable CPA | Budget, bid target, match restriction, IS lost to rank/budget | Broaden match, relax targets, improve assets/Quality Score, raise budget |
| High CPA, relevant queries | Offer, LP CVR, target economics, competition | Fix LP/offer, adjust target, segment high-value terms |
| Brand looks great, non-brand weak | Brand isolation, incrementality, query mix | Report separately, test brand holdout where feasible |
| AI Max sends odd traffic | Final URL expansion, URL exclusions, brand controls | Exclude weak pages, constrain generated text, keep AI Max off for strict LP control |

### Common traps

- Splitting every match type or tiny keyword variant into its own campaign before there is enough data.
- Treating Ad Strength as the goal instead of using it as a diagnostic.
- Adding micro-conversions as primary actions to "feed the algorithm" without proving correlation to revenue.
- Letting Final URL expansion send traffic to blog, careers, support, policy, or generic pages.
- Optimizing every few days before conversion delay and learning have stabilized.

---

## Glossary

| Abbr. | Full term | Definition |
|------|---------|------|
| KW | Keyword | The phrase that triggers an ad to appear |
| CV | Conversion | Completion of the goal action (purchase, inquiry, etc.) |
| CV value | Conversion value | The monetary value tied to one CV (revenue, lead score, etc.) |
| CVR | Conversion rate | Conversions ÷ clicks |
| CPA | Cost per acquisition | Spend ÷ conversions |
| ROAS | Return on ad spend | Total CV value ÷ spend |
| CTR | Click-through rate | Clicks ÷ impressions |
| CPC | Cost per click | Spend per click |
| IS | Impression share | Actual impressions ÷ eligible impressions |
| RSA | Responsive search ad | Ad where the AI selects optimal combinations from multiple headlines and descriptions |
| DSA | Dynamic search ad | Ads automatically generated by Google from site content |
| LP | Landing page | The first page a user reaches after clicking the ad |
| DDA | Data-driven attribution | ML-based model that distributes CV credit across each touchpoint |
| LTV | Lifetime value | Total revenue / profit one customer generates over their lifetime |

---

## Decision matrix by monthly CV volume

| Monthly CVs | Bid strategy | Match types | CV design |
|-----------|---------|-------------|--------|
| **0–15** | Manual CPC or Maximize Clicks | Exact, Phrase | Keep the true business outcome primary. Track micro-CVs as secondary; use a proxy as primary only if it is proven to correlate with qualified outcomes |
| **15–30** | Maximize Conversions (no tCPA) | Exact, Phrase | Operate on primary CV only. Move micro-CVs to secondary |
| **30–50** | tCPA (set from actuals) | Phrase-led, begin testing Broad | Primary CV only. Consider importing offline CVs (B2B) |
| **50–100** | tCPA or tROAS | Broad + Smart Bidding as the workhorse | Begin using CV value rules. Use DDA unless you need a conservative last-click view |
| **100+** | tROAS / Portfolio bidding | Broad-led | Run tROAS in earnest. Refine CV values |

---

## 1. Account and campaign structure design

### How to split campaigns

Core principle: **separate campaigns whenever the goal, budget, or target differs.**

| Split axis | Description | Reason |
|--------|------|------|
| Brand vs. non-brand KWs | Fully separate company / product names from generic KWs | Brand KWs have very high CVR — mixing them hides the true performance of non-brand KWs |
| Product / service | Separate campaigns per service category | Enables independent budget allocation and bid strategy tuning |
| Competitor KWs | Run competitor names / products as their own campaigns | Isolate risk and measurement |
| Geography | Split by target area when needed | Per-region budget and bid management |

> **Note**: Always add brand KWs as negative keywords to non-brand campaigns.

### Ad group design: STAG (Single Theme Ad Group)

Use **STAG (Single Theme Ad Group)** as a common starting point, not as a universal rule.

The legacy SKAG (one keyword per ad group) approach is no longer recommended for these reasons:

- Google's "close variants" expansion means even Exact match is no longer a strict match
- Data is fragmented — Smart Bidding cannot accumulate enough CV signal to learn well
- The management overhead is no longer offset by the returns

**STAG design principles:**

| Item | Recommendation |
|------|------|
| KWs per ad group | Enough to express one shared theme and intent without fragmenting learning |
| Ads per ad group | 3–5 RSAs |
| Ad groups per campaign | As few as the business logic allows; add groups when theme, LP, economics, or message differ |
| Relevance | Ad copy and LP must closely match the theme of each ad group |

**Hybrid approach**: Keep SKAG for high-value, niche KWs while running everything else as STAG.

### Account-design frameworks (originating in the Japanese market)

These are widely-used frameworks in the Japanese paid-search community. They are language-agnostic and the principles travel well.

#### Hagakure structure

The foundational philosophy: keep account structure simple so machine learning can function. Avoid over-segmenting ad groups and concentrate data into fewer ad groups. This lets impressions, clicks, and CV data accumulate so Google's AI can optimize effectively.

#### GORIN

Builds on Hagakure with efficient delivery: right user, right time, right message.

#### MUGEN

Builds on Hagakure and GORIN. Maintains ML-driven optimization while expanding reach to new users.

| Pillar | Content |
|----|------|
| Smart automated bidding | Automates KPI optimization |
| Dynamic Search Ads (DSA) | Covers KWs you didn't manually add — expands reach |
| RSA | Improves ad quality |

> **Note**: Adopting MUGEN before the Hagakure / GORIN foundation is in place risks runaway spend and CPA inflation.

### Google's 2025–2026 recommended structure

1. **Keep structure simple, concentrate data** — AI does not need hyper-fragmented structure. What it needs is sufficient CV data.
2. **Broad match + Smart Bidding** is the standard approach for accounts with 50+ monthly CVs.
3. **AI Max for Search** — a new layer that auto-generates headlines / descriptions and matches queries beyond your KW list.
4. **Don't mix conflicting goals in one campaign** — keep the signal clean.

---

## 2. Keyword strategy

### Keyword research tools

| Tool | Notes | Cost |
|--------|------|------|
| Google Keyword Planner | Official. Monthly search volume, competition, suggested CPC | Free |
| Rakko Keyword | Comprehensive suggest-KW gathering. Strong for the Japanese market | Free / paid |
| SEMrush | Comprehensive KW research and competitor analysis | Mid-tier paid |
| Ahrefs | Backlink analysis + KW research | High-tier paid |
| SpyFu | Specialized PPC competitor analysis (their bid KWs, copy, budgets) | Low-tier paid |
| Google Search Console | Actual queries driving traffic to your site | Free |
| Google Search autocomplete | Real-time search trends | Free |

### Research process

```
1. List the business's main themes / services
2. Expand candidates from seed KWs in Keyword Planner
3. Use a competitor tool (SpyFu / SEMrush) to find what competitors are bidding on
4. Use a suggest tool to mine long-tail terms
5. Group by search intent (informational / comparison / purchase)
6. Filter and prioritize by volume, competition, estimated CPC
```

### Match-type strategy

#### Phased approach

```
Phase 1 (sparse data): start with Exact, accumulate data
    ↓
Phase 2 (need volume): add Phrase
    ↓
Phase 3 (50+ monthly CVs): expand to Broad + Smart Bidding
    ↓
Across all phases: aggressively build out negative-KW lists
```

#### 2025–2026 trends

- Broad match is increasingly useful when paired with Smart Bidding, clean conversion data, and disciplined negative-keyword operations.
- Even Exact match is no longer a "strict" match — Google's AI applies semantic interpretation across all match types
- The dominant approach is holistic: a small set of core KWs combined with appropriate audience signals

#### Conditions for Broad + Smart Bidding to succeed

- Accurate CV tracking is in place
- 30–50+ monthly CVs
- Comprehensive negative-KW list in use
- Regular search-terms report review

### Keyword organization / grouping

| Axis | Examples |
|--------|-----|
| **By search intent** | Information ("what is", "how to") / Comparison ("vs", "best") / Purchase ("price", "buy") |
| **By theme** | Group KWs around the same product / service / problem |
| **By funnel stage** | Awareness (TOFU) / Consideration (MOFU) / Decision (BOFU) |
| **By CV value** | Prioritize KWs that tend to attract high-LTV customers |

### Long-tail KWs

Long-tail KWs (4+ word, specific phrases) tend to have lower CPC and higher CVR.

| Short-tail | Long-tail |
|---------------|-------------|
| "CRM software" | "B2B CRM software for small business comparison" |
| "running shoes" | "best running shoes for marathon training" |

- Keep each ad group focused on one clear theme
- Optimize ad copy and LP for the long-tail KW
- Broad match + Smart Bidding can also surface long-tail terms automatically

### How to handle brand KWs

**Standard practice: always run them in an isolated campaign.**

| Reason | Detail |
|------|------|
| Data clarity | Brand KWs have very high CVR — mixing them hides non-brand performance |
| Budget control | Manage brand vs. non-brand budgets independently |
| Bid strategy | Brand KWs have low CPC and benefit from a different bid strategy |
| Defense | If competitors bid on your brand, defense becomes higher priority |

### Negative-keyword operations

#### Review cadence

| Account size | Recommended cadence |
|----------------|----------|
| High-spend | Daily |
| Mid-size | Weekly |
| All accounts | Monthly periodic review |

#### Levels

| Level | Use | Example |
|--------|------|-----|
| Account-level | Words that should never match | "free", "jobs", "how to" |
| Campaign-level | Campaign-specific noise | Themes belonging to other campaigns |
| Ad-group-level | Prevent cannibalization | De-duping between ad groups |

#### Match-type usage

- **Broad negatives**: clearly unrelated terms ("jobs", "salary", "free")
- **Phrase negatives**: terms that may be relevant in other contexts
- **Exact negatives**: very specific exclusions

> Negatives do not auto-expand to synonyms (unlike positive KWs). However, since June 2024 misspellings are also blocked.

#### Limits (as of 2025)

- Shared negative-KW lists: up to 20 lists, 5,000 KWs each
- Account-level negatives: up to 1,000 KWs

> See [Appendix A](#appendix-a-starter-negative-keyword-set) for a generic starter set.

---

## 3. Bid-strategy operating details

> **Note**: Enhanced CPC (eCPC) is no longer available for Search and Display campaigns, and campaigns that were not proactively migrated now effectively use Manual CPC ([Google Ads Help](https://support.google.com/google-ads/answer/2464964?hl=en)).

### tCPA vs tROAS

| Item | tCPA | tROAS |
|------|---------|----------|
| When to use | All CVs have roughly equal value (lead-gen, SaaS, etc.) | CV value varies (e-commerce, etc.) |
| Optimization goal | Volume (within an acceptable cost) | Revenue / profit |
| Minimum data | 15+ CVs in 30 days (30+ recommended) | 50+ CVs in 30 days (100+ recommended) |

### Setting and adjusting target values

**Initial setup:**
- Base it on your **actual** trailing-30-day numbers (not aspirational targets)
- For tCPA: start near the trailing-30-day average CPA
- For tROAS: start near the trailing-30-day "CV value / spend"
- Setting too aggressive a target severely caps volume

**Adjustment rules of thumb:**

| Rule | Detail |
|--------|------|
| 20% rule | Don't change by more than 20% in one move (sharp swings reset learning) |
| Step tightening | tCPA: lower by 5–10% per step / tROAS: raise by 5–10% per step |
| Decision horizon | Judge in 2–4 week windows, not weekly |
| CV lag | Account for delay in industries with long conversion cycles |

### Managing the learning period

- **Duration**: typically 7–30 days; many cases stabilize in roughly 2 weeks.
- **Required data**: ~50 CV events, or 3 conversion cycles

**Triggers that reset learning:**
- Switching bid strategy
- Large changes to tCPA / tROAS (>20%)
- Large daily-budget changes
- Changing the conversion action
- Significant changes to targeting / creative / audience

**Best practices:**
- Hold budget / bid / setting changes to within 20% per week
- Pause performance judgment for at least 2–3 weeks
- Minimize campaign changes after migration

### Portfolio bid strategies

A single bid strategy applied across multiple campaigns / ad groups / KWs.

- Automatically concentrates resources on high-performing campaigns
- Shares data across same-goal campaigns to improve prediction accuracy
- **Group campaigns with the same goal** — never mix conflicting goals
- Useful for pooling small individual campaigns to compensate for thin learning data

### Seasonality

Use Google Ads' **Seasonality Adjustments** feature.

- Notify Smart Bidding in advance of expected CVR shifts around promotions / sales / events
- **Best for 1–7 day** short-term events (14+ days is not recommended)
- No reverse adjustment is needed afterwards (it auto-reverts)
**General playbook:**

| Period | Action |
|------|------|
| Pre-peak | Increase budget gradually (within 20% per move) |
| Peak | Use Seasonality adjustments |
| Off-peak | Cut budget; concentrate on high-intent KWs |
| Annual | Plan ahead from prior-year actuals |

---

## 4. RSA operating details

### Writing descriptions

| Point | Detail |
|---------|------|
| Structure | Lead with the value prop in sentence 1, back it up or CTA in sentence 2 |
| CTA | Include a clear call to action ("Get a free quote", "Try free") |
| Differentiation | State a strength competitors don't have, concretely |
| Numbers | Include specific figures whenever possible |

### Pinning

- Use minimal pinning by default
- When unavoidable, **pin 2–3 to the same position** to keep variety
- Pinning tends to lower Ad Strength, but Ad Strength and performance don't always correlate

### Ad Strength

- Better Ad Strength can improve eligibility and combination quality, but it is a diagnostic rather than the final goal.
- That said, judge by actual metrics (CPA / ROAS) at the end
- Aim for "Good" or higher ("Excellent" is not required)

### A/B testing

- The **Ad variations** tool is the easiest entry point
- Change only one variable at a time
- Run for at least 2–4 weeks to get statistical significance
- Key metric: **CPI (CTR × CVR)**

> See [Appendix B](#appendix-b-ab-test-design-template) for a detailed test-design template.

### Ad customizers

| Feature | Detail |
|------|------|
| DKI (Dynamic Keyword Insertion) | Auto-swap headline / description text based on the search term |
| Countdown | Auto-display time remaining until a sale ends |
| Location insertion | Auto-insert the user's location |
| IF function | Show different copy based on device or audience |

### Combining with Dynamic Search Ads (DSA)

DSA is being upgraded into AI Max, so verify current creation and migration behavior before designing around DSA as a long-term structure ([Google Ads Help](https://support.google.com/google-ads/answer/2471185?hl=en), [Google launch update](https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/)).

- Strong pattern: cover core KWs with RSA, discover KW gaps with DSA
- They can coexist in the same campaign (but not in the same ad group)
- Promote high-performing KWs found by DSA into your RSA ad groups

---

## 5. Ad-copy frameworks

### Core frameworks

**AIDA (Attention → Interest → Desire → Action)**
- Headline 1: grab Attention
- Headline 2: build Interest
- Description: spark Desire and prompt Action

**PAS (Problem → Agitation → Solution)**
- Headline 1: name the Problem
- Headline 2: agitate the pain
- Description: present the Solution

**4P (Promise → Picture → Proof → Push)**
- Promise: state the core benefit
- Picture: paint a concrete future state
- Proof: validate with data / track record
- Push: prompt action

### Effective angles by industry

| Industry | Strong angles |
|------|-------------|
| B2B | Cost reduction %, ROI, number of customers, free trial |
| B2C | Price, reviews, convenience, free shipping |
| E-commerce | Free shipping, same-day delivery, selection size, returns guarantee |
| Professional services | Credentials, years of experience, consultations completed, free first consult |
| SaaS | Free trial length, easy onboarding, integrations |
| Real estate | Listing count, area, age of property, easy viewing booking |

### Numbers and proof techniques

| Technique | Example |
|-----------|-----|
| Reframe to a smaller unit | $90/mo → "just $3 a day" |
| Zero framing | "$0 setup", "no cancellation fee" |
| Social proof | "5,000 companies use it", "98% satisfaction" |
| Concrete results | "30% average cost reduction", "2.5× more inquiries" |
| Time specificity | "Live in 3 days", "1-minute signup" |

### CTA patterns

| Pattern | Example |
|---------|-----|
| Action-direct | "Get a free consult", "30-second quote" |
| Benefit-led | "Download the free guide", "Get the latest insights" |
| Urgency | "Today only", "3 spots left" |
| Risk reversal | "Start free trial (no credit card)" |

### Emotion vs. logic balance

| Target | Recommended balance |
|-----------|-------------|
| B2B | Logic 7 : Emotion 3 |
| B2C high-ticket | Logic 5 : Emotion 5 |
| B2C impulse | Logic 3 : Emotion 7 |

In RSAs, mix both styles in your headlines and let Google's AI find the best combination.

---

## 6. Ad assets

Setting four or more types of assets is the standard recommendation. Assets are free, and they help Quality Score and Ad Rank directly.

### Core assets and recommended setup

| Asset | Recommended count | Notes |
|---------|--------|---------|
| **Sitelinks** | At least 4, ideally 8–20 | Links to different pages (pricing, case studies, FAQ). Always fill in descriptions |
| **Callouts** | At least 2, ideally 8+ | Concrete pitches in ≤25 chars (free shipping, 24/7 support) |
| **Structured snippets** | 2–3 headers, 4+ values each | Service list, brands, coverage areas |
| **Images** | At least 4 (square + landscape) | Concrete visuals of the product / service |
| **Call** | Required if phone CVs matter | Schedule to display only during business hours |
| **Lead form** | Use as needed | Especially effective on mobile |
| **Promotion** | During campaigns | Use for time-limited discounts |
| **Price** | E-commerce / services | Effective when you're price-competitive |

### Best practices

- Set at least four asset types in every campaign
- Ad-group-level assets override campaign- and account-level ones
- Periodically review performance and replace underperformers
- Always fill in sitelink descriptions (it expands the visible footprint)

---

## 7. Landing-page optimization

### Ad / LP consistency

When the three Quality Score factors (expected CTR, ad relevance, LP experience) are all "above average", CPC tends to drop substantially and CVR rises substantially compared to "below average" ads. Exact magnitude varies by industry / account / KW competition, but improving Quality Score is one of the highest-ROI levers available.

### LP design fundamentals

| Principle | Detail |
|------|------|
| Match the ad | Whatever the ad promised should be in the LP's first viewport |
| One LP, one goal | One CV goal per LP |
| Clear CTA | CTA in the first viewport, plus a floating CTA after scroll |
| Trust signals | Company info, privacy policy, testimonials, real numbers |
| KW alignment | Provide a dedicated LP per ad group (not a generic top page) |

### Page speed

- Page-speed delays disproportionately hurt mobile CVR.
- Targets: LCP under 2.5s, total load under 2s
- How to improve: image compression, reducing unused JS, CDN, lazy loading

### Mobile optimization

- Responsive design
- Tap-friendly button sizes (at least 48×48 px)
- Tap-to-call phone numbers
- Form usability (autocomplete support)

### Form optimization

- Reducing unnecessary form fields usually raises CVR.
- Multi-step forms work well (put PII at the final step)
- Show a progress bar
- Real-time error messages

### Quality Score and the LP

From 2025 onward, Google's new prediction model puts more weight on LP UX and transparency:

- Content relevance (ad KW vs. LP content alignment)
- Easy navigation
- Page speed (especially mobile)
- Transparency (company info, contact, privacy policy)

---

## 8. Conversion-measurement operating details

### CV design templates by business model

#### B2B (lead-gen)

| Item | Setup |
|------|------|
| Primary CV | Inquiry-form submit, phone call |
| Secondary CV | Whitepaper download, newsletter signup, pricing-page view |
| How to set CV value | Lead score × opportunity rate × average deal size (e.g., A=$500, B=$200, C=$50) |
| Bid strategy | tCPA (introduce once you have 30+ monthly CVs) |
| Offline CVs | **Required.** Feed back opportunity / closed-won data from your CRM so the AI learns "high-quality leads" |
| Micro-CV use | If monthly inquiries are below 30, add "form start" as primary |

#### E-commerce

| Item | Setup |
|------|------|
| Primary CV | Purchase complete |
| Secondary CV | Add to cart, begin checkout, account creation |
| How to set CV value | Actual order value (dynamic). For fixed-price products, use average order value |
| Bid strategy | tROAS (introduce once you have 50+ monthly CVs) |
| CV-value rules | E.g., "1.5× CV value for repeat customers" — embed LTV signal into bidding |
| Micro-CV use | If monthly purchases are below 30, add "add to cart" as primary |

### Procedure when changing CV actions

Changing the CV action (adding, removing, or modifying the primary CV) resets Smart Bidding's learning. Proceed carefully.

```
1. Record pre-change performance (trailing-30-day CPA, ROAS, CV count)
2. Make the change
3. Avoid large bid / budget changes during the 2–4 week learning period
4. Exclude "change date → learning complete" from before/after comparisons
5. After learning completes, re-set tCPA / tROAS as needed
```

### Conversion-value rules

A feature that auto-adjusts CV value based on audience / location / device.

Examples:
- "1.5× CV value for leads from New York" (in-territory leads close at higher rates)
- "0.8× CV value for mobile CVs" (mobile converts at lower close rates)
- "1.3× CV value for users from a remarketing list"

### Conversion windows

| Setting | Recommended | Notes |
|------|--------|------|
| Click-through CV | 30–90 days | B2B (long consideration) → 90; e-commerce (impulse) → 30 |
| View-through CV | 1 day (default) | For Display / Video. Minimal effect on Search-only |
| Engaged-view CV | CV after meaningful video engagement (e.g. 10s skippable in-stream, 5s in-feed / Shorts) | YouTube / video-enabled campaigns |

---

## 9. Search-campaign settings checklist

Settings that frequently cause real-world incidents and have outsize impact on results.

### Geo-targeting pitfalls

Google Ads has two location-targeting options:

| Option | Detail | Recommendation |
|-----------|------|------|
| **Presence** | Serves only to users physically in the target area | **Recommended in most cases** |
| **Presence or interest** | Serves to users in the target area + users showing interest in it | Default. Only choose this if regional interest correlates with intent (travel, tourism, real estate, etc.) |

> **Important**: the default is "Presence or interest". Leaving it untouched serves to users outside your target area and leaks budget. **Most local businesses should switch to "Presence".**

**Where**: campaign settings → Locations → Location options → Target

**Excluded locations**:
- Configure exclusions on "Presence" too
- For radius targeting, periodically check that you aren't getting impressions outside the radius

### Search Partners

If "Google search partners" is checked, ads serve to non-Google sites (other search engines, Google Maps, etc.).

| Situation | Recommendation |
|------|------|
| Early stage / limited budget | **Off recommended.** Accumulate data on Google Search first |
| Sufficient CV data, ready to expand reach | Turn on and test. Inspect performance per network |
| Search Partners CPA outside acceptable range | Turn back off |

**How to check**: Reports → segments → Network — review "Google search partners" performance separately.

### Device / hour adjustments under Smart Bidding

If you use Smart Bidding (tCPA, tROAS, etc.), **manual device and hour bid adjustments are effectively ignored** (Google's AI manages them in real time on its own).

| Bid strategy | Device adjustment | Hour adjustment |
|---------|-------------|-----------|
| Manual CPC | **Honored** | **Honored** |
| Maximize Clicks | **Honored** | **Honored** |
| tCPA / tROAS | **Ignored** (exception: -100% to fully exclude a device) | **Ignored** |
| Maximize Conversions / Conv. value | **Ignored** (-100% exception only) | **Ignored** |

**Workarounds**:
- To fully exclude a device under Smart Bidding, set -100% (e.g., exclude tablets)
- For time-of-day delivery control, use ad scheduling to set "do not serve" hours (control via on/off, not bid adjustment)
- Optimize LPs per device to improve performance indirectly via Quality Score

### Search-term quality (especially B2B)

Beyond adding negative KWs, you need a way to evaluate the **quality** of the leads you generate.

**Axes:**

| Axis | How to check |
|----|---------|
| Intent quality | Is the search term informational vs. purchase-intent |
| Opportunity quality | Cross-reference with CRM to see opportunity rate by search term |
| Close rate | Use offline-CV data to track close rate by search term |
| LTV | Track customer LTV by search term (long-term effort) |

**How to implement:**
1. Capture the Google Ads GCLID (click ID) into a hidden form field
2. In the CRM, store the GCLID with each opportunity / closed-won record
3. Upload back to Google Ads as offline conversions
4. Use the search-terms report to identify "KWs that produce high-quality leads"

### Brand-defense criteria

Policy when competitors bid on your brand name.

**Decision criteria:**

| Condition | Decision |
|------|------|
| A competitor bids on your brand name | Build a defense campaign |
| You hold the #1 organic spot exclusively, and no competitor bids on you | No defense (redirect budget to non-brand) |
| Brand-name search volume is large | Defense is high-ROI |

**Defense-campaign settings:**

| Item | Recommendation |
|------|------|
| Bid strategy | Target Impression Share (top of page 90–95%) |
| Match types | Exact + Phrase |
| Daily budget | Usually small (brand KWs have low CPC) |
| Monitoring | Use Auction Insights to track competitor entry / exit |

### "Include Display Network" expansion

Search-campaign creation flows sometimes offer an "Include Display Network" toggle.

> **Recommendation: turn it off in Search campaigns.** If you need Display, run a dedicated Display campaign. Mixing Search and Display data pollutes Smart Bidding's learning signal.

---

## 10. Operating cadence and checklists

### Daily check (5–15 min)

- [ ] Budget pacing (any budgets exhausted)
- [ ] Anomalous CV / CPA / ROAS swings
- [ ] Any disapproved ads
- [ ] Any campaigns / ads paused or stopped

### Weekly check (30–60 min)

- [ ] Search-terms report → add negative KWs
- [ ] KW performance (consider pausing low-performers)
- [ ] Ad-copy performance (CTR, CVR)
- [ ] Performance by device / hour
- [ ] Competitor movement (Auction Insights)

### Monthly check (2–4 hours)

- [ ] Full KPI review (CPA, ROAS, CV volume, ROI)
- [ ] Reallocate budget toward winning campaigns
- [ ] KW housekeeping (additions, pauses, match-type changes)
- [ ] LP analysis (CVR, bounce rate, page speed)
- [ ] Asset performance review and rotation
- [ ] Performance by region / audience
- [ ] Reporting

### Quarterly check (half-day to a day)

- [ ] Full strategy review (re-set goals, re-evaluate KPIs)
- [ ] Account-structure review (consider campaign reorgs)
- [ ] Re-evaluate bid strategies
- [ ] Plan ahead for seasonality / peaks
- [ ] Respond to competitor and market changes

### Recommended alerts

| Alert | Example trigger |
|---------|--------|
| Budget burn | 70%+ of daily budget consumed before noon |
| CPA spike | 150% of target CPA |
| CTR collapse | Down 30%+ vs. prior week |
| Zero CVs | No CVs for 24+ hours |
| Disapproval | Any disapproved status |
| Budget-limited | IS lost (budget) ≥ 20% |

---

## 11. Analysis and improvement

### KPI baselines

Use account history, unit economics, Keyword Planner estimates, and current auction context as the primary baseline. Generic industry averages are too broad to drive decisions.

| KPI | Primary baseline | How to use |
|-----|--------|-----------|
| CTR | Account history by brand / non-brand / competitor / category | Diagnose relevance and ad strength, not business profitability by itself |
| CVR | Landing-page and offer history by intent segment | Separate query-quality issues from LP / offer issues |
| CPA | Target economics from margin, close rate, and LTV | Anchor tCPA to observed performance, then tighten gradually |
| ROAS | Gross margin or contribution-margin break-even | Revenue ROAS alone can overinvest in low-margin products |

### Using the search-terms report

| Step | Detail |
|---------|------|
| 1. Identify negatives | Add irrelevant queries to negatives |
| 2. Discover new KWs | Promote high-performing queries to KWs |
| 3. Optimize match types | Check whether expansion is going where you want |
| 4. Improve ad copy / LP | Read user intent from queries, refine copy / LP |

> When AI Max is on, the search-terms report shows AI Max-specific reporting, including views for AI Max traffic and match contribution ([Google Ads Help](https://support.google.com/google-ads/answer/16470459?hl=en)). Inspect AI-expanded queries and exclude any unwanted ones.

### Using Auction Insights

| Metric | Read |
|------|------|
| Impression share (IS) | Your impressions ÷ eligible impressions |
| Overlap rate | Share of auctions where a competitor also appeared |
| Outranking share | How often you outranked a given competitor |
| Top-of-page rate | How often you appeared at the top of the page |
| Absolute top rate | How often you appeared at the absolute top |
| Position-above rate | How often a competitor's ad appeared above yours |

**How to use:**
- Detect new competitor entries
- Track bidding pressure from a specific competitor
- Pinpoint why IS dropped (IS lost (budget) → budget shortage; IS lost (rank) → Quality Score / bid shortage)

### Segment analysis

| Segment | Analysis |
|-----------|-------------|
| Device | Mobile / desktop / tablet CVR delta → bid adjustment (Manual CPC) or LP fix (Smart Bidding) |
| Hour | Hours where CVs concentrate → schedule (Manual CPC) or reference only (Smart Bidding) |
| Day of week | Day-of-week deltas → same as above |
| Region | Per-state / city CVR → regional bid adjustment, or split into a regional campaign |
| Audience | Remarketing-list CVR → add in observation mode and bid-adjust based on data |

### Attribution

The only supported Google Ads attribution models are **DDA (data-driven) and last-click**; first-click, linear, time-decay, and position-based models are no longer supported ([Google Ads Help](https://support.google.com/google-ads/answer/6259715?hl=en)).

| Model | Eligibility | Notes |
|--------|---------|------|
| **DDA (recommended)** | Default for most web / GA4 conversion actions | ML distributes credit across each touchpoint; upper-funnel touches get credit |
| Last click | None | 100% credit to the last-clicked ad |

- Use last-click only when you deliberately need a conservative reference or DDA is not trustable for the business question.
---

## 12. Budget management and optimization

### Budget setting

| Item | Recommendation |
|------|------|
| Daily budget | 1–3× target CPA/day for narrow tests; 3–5×+ for healthier learning; 10×+ when fast scale is economically acceptable |
| Monthly budget | Google Ads can spend up to 2× the daily budget on a given day (averaged monthly) |
| Sign of budget shortage | If IS lost (budget) ≥ 20%, consider an increase |

### Break-even calculations

```
[Basic]
Marginal CPA = price - cost
Target CPA = marginal CPA - desired profit

[LTV-aware (subscription / repeat-purchase)]
Marginal CPA = customer LTV × gross margin %
Target CPA = marginal CPA × (1 - profit margin)

[B2B lead-gen]
Marginal CPA = average deal size × gross margin × opportunity rate × close rate
Target CPA = marginal CPA × (1 - profit margin)
```

### Handling budget constraints

| Lever | Detail |
|--------|------|
| Tighten KW set | Pause low performers, focus on winners |
| Schedule | Pause low-CV hours (or lower bids under Manual CPC) |
| Geo | Lower bids in low-performing regions |
| Device | Lower bids on low-CVR devices (Manual CPC) |
| Increase budget | If ROAS is healthy, consider raising the budget |

### Creative refresh cadence

| Asset type | Cadence |
|-----------|----------|
| RSA copy | As soon as performance drops |
| Image assets | Every 4–6 weeks |
| Sitelinks etc. | Monthly review, rotate low performers |

### 2026 feature: Campaign-total budget

Set a total budget for a defined period and let Google's AI optimize daily allocation. Available for Search, P-MAX, and Shopping. Useful for peaks and specific promo windows.

---

## 13. Common failure patterns

### Top 10 beginner mistakes

| # | Mistake | Avoidance |
|---|------|--------|
| 1 | CV tracking missing or broken | Verify all tags fire in GTM Preview before launch. Set up Enhanced Conversions |
| 2 | No negative KWs | Apply a generic negative list from day one (see [Appendix A](#appendix-a-starter-negative-keyword-set)). Review search terms weekly |
| 3 | Starting with Broad everywhere | Begin with Exact / Phrase, expand in stages |
| 4 | Cramming unrelated KWs into one ad group | Group keywords around a single intent, LP, and message |
| 5 | Only one ad variant | 3–5 RSAs per ad group with distinct messages |
| 6 | LP is the homepage | Build a dedicated LP per ad-group theme |
| 7 | Blindly accepting platform recommendations | Use them as input but decide based on your own data and goals |
| 8 | Smart Bidding with too little CV data | Build more true conversion volume first. Use micro-CVs for observation unless a proxy is proven to predict quality |
| 9 | Only checking once a month | At minimum weekly review of search terms and performance |
| 10 | Mobile-unfriendly LP | Responsive design, page speed, form optimization are mandatory |

### Six Smart-Bidding pitfalls

| # | Pitfall | Avoidance |
|---|---------|--------|
| 1 | Migrating with too little CV data (under 30/mo) | Stay on Manual or Maximize Clicks until data accumulates |
| 2 | Unrealistic targets | Start from actuals, tighten gradually |
| 3 | Frequent changes during learning | Avoid large changes for 2–3 weeks |
| 4 | Mismatch between budget and tCPA | Avoid budgets below 1× tCPA; use 3–5×+ tCPA/day when you expect stable learning |
| 5 | CV-data contamination | Accurate tracking; watch for accidental micro-CV inclusion |
| 6 | Blindly accepting platform recommendations | Recommendations are a hypothesis — judge with your own data |

---

## 14. AI Max for Search Campaigns

A layer that adds AI-assisted matching, ad-copy generation, and landing-page selection to Search campaigns ([Google Ads Help](https://support.google.com/google-ads/answer/15910187?hl=en)). Availability and controls can vary by account, so verify in the Google Ads UI before planning around it.

### Three core features

| Feature | Detail |
|------|------|
| KW match expansion | Broad match + keyword-less tech matching on intent |
| Ad-copy auto-generation | AI generates headlines / descriptions to combine with your assets |
| LP auto-selection | Picks the best-fit LP from your site for the search intent |

### Performance expectation

- Treat AI Max as an expansion and automation layer, not a guaranteed lift.
- Accounts with narrow Exact / Phrase coverage may see more discovery benefit than already-broad accounts.
- Judge it on query quality, CPA / ROAS, landing-page routing, and generated-text quality after the learning period.

### Text guidelines

You can control AI-generated copy and other AI Max settings from the AI Max / asset optimization controls where available ([setup Help](https://support.google.com/google-ads/answer/15909989?hl=en)). Examples: "don't mention price", "don't use competitor names".

### Recommended rollout

```
1. A/B test on one campaign first (4+ weeks)
2. Analyze results (CV count, CPA, search-term quality)
3. Roll out gradually if effective
4. Keep AI Max OFF for brand-KW campaigns
```

### Operating guardrails

AI Max needs to be controlled — set the following guardrails.

#### When to keep AI Max OFF

| Case | Reason |
|--------|------|
| Brand-KW campaign | AI expands to non-brand queries, eroding brand's low-CPC / high-CVR advantage |
| Highly regulated industry (medical, finance, legal, etc.) | AI-generated copy may breach industry advertising regulations |
| When you must strictly avoid bidding on competitor names | AI Max may expand to competitor queries |
| Campaign with under 30 monthly CVs | Insufficient learning data destabilizes optimization |

#### Ad-copy generation guardrails

Set the following in Text Guidelines:

| Setting | Reason |
|------|------|
| Forbid false price claims | AI may generate prices different from reality |
| Forbid competitor names | Trademark risk |
| Forbid hyperbole | "Best in industry", "#1" without backing |
| Forbid claims that breach industry rules | "Cures", "guaranteed effective" (medical / health) |
| Specify brand tone | Align with your own brand guidelines |

#### LP auto-selection guardrails

Configure URL exclusions so AI Max doesn't route to unintended pages.

**URLs to exclude:**
- Thank-you pages (post-CV)
- Login pages
- Careers pages
- Admin / account-settings pages
- Old / soon-to-be-retired LPs
- Privacy-policy / terms pages

### Search-terms report

When AI Max is on, AI Max-specific reporting surfaces search terms, headlines, landing pages, and AI Max contribution views ([reporting Help](https://support.google.com/google-ads/answer/16470459?hl=en)). **Check the search-terms report daily for the first two weeks** after enabling, and watch for unwanted expansion.

---

## Appendix A: Starter negative-keyword set

Generic negative-KW list to apply at account launch. Customize per industry and product.

### Generic (almost universal)

| Category | Example negatives |
|---------|---------|
| Free / no-cost | free, no charge, $0, gratis |
| Job-seeking | jobs, hiring, careers, salary, wages, employment |
| Information-only | what is, definition, meaning, history, wiki |
| DIY / self-build | DIY, do it yourself, homemade, how to make |
| Academic | research paper, thesis, dissertation, study |
| Negative connotation | scam, fraud, complaint, lawsuit, ripoff |

### B2B add-ons

| Category | Example negatives |
|---------|---------|
| Consumer-targeted | personal use, home, household |
| Too-small | freelance, solo, single-user (when out of target) |

### E-commerce add-ons

| Category | Example negatives |
|---------|---------|
| Used / resale | used, second-hand, refurbished, resale |
| Repair | repair, fix, broken |

### Service-business add-ons

| Category | Example negatives |
|---------|---------|
| Credentials / DIY | how to become, certification, licensing |
| Out-of-area | non-target city / region names |

> **Note**: negatives don't auto-expand to synonyms — manually add spelling variants and stylistic forms (lowercase / uppercase, plurals, common typos).

---

## Appendix B: A/B test design template

Before running a test, pin down and document the following.

### Test design sheet

| Item | Entry |
|------|------|
| **Test name** | E.g., "Headline benefit-led vs. price-led" |
| **Hypothesis** | E.g., "Putting concrete prices in the headline beats benefit framing on CVR" |
| **Variable changed (one only)** | E.g., RSA headlines 2–4 (switched to price-led) |
| **Variables held constant** | KWs, LP, bid strategy, budget, audience, all other ad copy |
| **Primary metric** | E.g., CPA |
| **Secondary metrics** | E.g., CTR, CVR |
| **Success criterion** | E.g., CPA improves 10%+ with statistical significance (p < 0.05) |
| **Stop criterion** | E.g., abort immediately if CPA worsens 30%+ |
| **Test duration** | At least 2–4 weeks (or 100+ CVs per variant) |
| **Test method** | Ad variations or Campaign experiments |

### When samples are insufficient

| Situation | Workaround |
|------|--------|
| Not enough CVs | Extend to 4–6 weeks |
| Still not enough | Use a qualified proxy metric only if it is known to correlate with the business outcome |
| Low search volume on the KW | Combine target ad groups |
| No statistical significance | The change may be too subtle — test a bolder change |
