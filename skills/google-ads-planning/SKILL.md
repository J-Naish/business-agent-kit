---
name: google-ads-planning
description: Plan and design Google Ads campaigns end-to-end — choose the right ad types, design account structure, pick bidding strategies, configure conversion measurement, and decide what gets launched and how. Covers both new launches and improvements to existing accounts. Use this skill whenever the user mentions Google Ads, paid search, search ads, display ads, shopping ads, video / YouTube ads, Performance Max (P-MAX), Demand Gen, or app install campaigns, or asks how to structure / improve / launch a Google Ads account. Skip for unrelated paid-media platforms (Meta, X, TikTok, etc.).
---

# Google Ads Planning

Plan a Google Ads program end-to-end: ad-type selection, campaign architecture, bidding, conversion measurement, and the operational decisions that turn a plan into a running account. This skill covers both new launches and improvements to existing accounts.

## Practice-first stance

Google Ads planning should prioritize the practices that make campaigns work, not just the settings that make campaigns valid. Campaign type, account structure, and bid settings matter, but they are secondary to measurement quality, conversion signal design, creative quality, feed/landing-page quality, budget sufficiency, and disciplined operating cadence.

When answering Google Ads questions:

1. Start from the business outcome and unit economics, not from campaign menus.
2. Treat the conversion action as the core strategy. Automated bidding optimizes toward exactly what is counted, even when that action is a poor proxy for revenue or qualified demand.
3. Prefer the deepest reliable conversion signal that has enough volume and acceptable latency. If the real outcome is sparse, use a proxy only when it is demonstrably correlated with the real outcome, and keep micro-conversions secondary or low-value by default.
4. Separate platform performance from true incrementality. Branded Search, P-MAX, Display, Demand Gen, and YouTube can overstate impact through brand capture, view-through conversions, modeled conversions, and attribution overlap.
5. Consolidate when the campaign needs learning data; split only when there is a real business-control reason: different budget, goal, margin, geo, language, conversion value, customer type, or reporting owner.
6. Creative is a primary lever. In Search this means message, proof, offer, RSA asset diversity, and landing-page fit. In P-MAX, Demand Gen, Display, Video, and App campaigns it often matters more than targeting precision.
7. Do not chase cheap traffic by default. Low CPC, CPM, CPV, or CPI is useful only when downstream quality, brand safety, and incrementality remain acceptable.
8. Avoid constant intervention. Batch meaningful changes, keep a change log with intent, and let learning periods and conversion delay pass before judging.
9. Use Google's automation deliberately. The human still owns conversion definitions, value rules, exclusions, brand controls, feed quality, asset quality, budgets, and incrementality tests.

### High-leverage practice checklist

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

### Operating cadence

Use this as the default practice cadence unless the user's account context suggests otherwise:

| Cadence | Focus | Avoid |
|---|---|---|
| Daily | Spend anomalies, conversion drops, tracking/policy/feed breakage | Daily target/budget micromanagement |
| Weekly | Search terms, asset performance, budget pacing, lead/product quality, change-log review | Restructuring because of a few days of noise |
| Monthly | Negative sweeps, creative refresh, feed/title improvements, landing-page review, budget reallocation | Letting launch-era assumptions persist |
| Quarterly | Conversion action redesign, incrementality review, brand/non-brand split, account architecture, target economics | Reporting only platform ROAS |

## Output flexibility (don't always write a document)

Adapt the output to what the user actually asked for. **There is no requirement to produce a written spec document** — sometimes a conversational answer or a structured inline response is the right deliverable.

| Situation | Output |
|---|---|
| User asks a focused question (e.g. "should I use P-MAX or Search for this?") | Direct answer with reasoning. No document. |
| User wants planning guidance across the full picture | Structured response covering the relevant sections. Still inline by default. |
| User explicitly asks for a written plan / spec / brief | Produce a written document, using the templates in [references/output-templates.md](references/output-templates.md) as a starting point. |
| User is launching a multi-campaign account from scratch and the deliverable will be handed off | A written spec usually fits — but **confirm with the user before writing** rather than assuming. |

When in doubt, ask whether they want a written deliverable or a conversational answer. Default to the lighter form.

---

## Workflow

```
Step 0: Mode detection           → New launch or improvement of existing account
    ↓
Step 1: Information gathering    → Phase A (basics) → propose ad-type direction → Phase B (details)
    ↓
Step 2: Ad-type selection        → Pick the campaign mix that fits
    ↓
Step 3: Strategy formation       → Account structure, bidding, conversion design, budget split
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

For existing accounts, run a diagnostic after Step 1:

1. **Inventory** — Account structure, list of running campaigns, current KPI performance.
2. **Issue identification** — Hear the user's pain point, then audit:
   - Is the bid strategy appropriate for the conversion volume? (Smart bidding starves with too few conversions.)
   - Account-structure issues — over-fragmentation of campaigns? mixed themes inside an ad group?
   - Are negative keywords adequate? Is the search-terms report showing wasted clicks?
   - Is conversion tracking set up correctly?
   - Any ad groups with low Quality Score?
   - Is budget allocated to the high-performing campaigns?
3. **Improvement proposals** — Ranked actions, agreed with the user.
4. **Execution** — Document the agreed changes in whatever form fits (conversational, structured response, or written deliverable).

---

## Step 1: Information gathering

### Phase A: Basics (the minimum needed to suggest an ad-type direction)

| Category | Question |
|---|---|
| **Business model** | E-commerce / lead generation / app / store visits / brand awareness — which? |
| **Offer** | What is being sold or promoted? (Product, service, free trial, lead magnet, etc.) |
| **Goal** | Primary KPI (CPA / ROAS / CPI / CPV, etc.) — and a target value if there is one |

After Phase A, propose an ad-type direction using the cheat sheet in Step 2. Once the user agrees, proceed to Phase B.

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

---

## Step 2: Ad-type selection

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

### Per-campaign-type notes

**Search**
- Text ads on Google Search results — best for high-intent users at the bottom of the funnel.
- Responsive Search Ads (RSA): up to 15 headlines + 4 descriptions; AI mixes the best combination.
- AI Max for Search (rolled out 2025): broad match + auto-generated headlines + auto LP selection. Reported ~14% conversion lift in Google's data.
- Best fit: lead generation, B2B, e-commerce on specific products, capturing high-intent demand.

**Display**
- Image / video ads across 2M+ sites and apps in the GDN. Reaches roughly 90% of internet users.
- Responsive Display Ads (RDA): images + text combined automatically per placement.
- Targeting: audiences (interest / custom / similar), content (topic / placement), remarketing.
- Best fit: brand awareness, remarketing, prospecting.

**Shopping**
- Product image / price / store name in a list format on search results. Requires a Merchant Center feed.
- Standard Shopping: manual bidding, fine-grained control.
- P-MAX Shopping: AI-driven across all channels (replaces Smart Shopping).
- Best fit: e-commerce, online retail, products with strong price competitiveness.

**Video (YouTube)**
- Video ads on YouTube and partner properties.
- Formats: skippable / non-skippable / bumper (6s) / in-feed / masthead / outstream.
- 2025 changes: Video Action Campaigns (VAC) merged into Demand Gen; vertical Shorts ads supported across all formats.
- Best fit: brand awareness, new product launches, how-to messaging.

**App**
- Specialized for app installs / engagement / pre-registration. Auto-distributes across all app surfaces.
- ACi (install) / ACe (engagement) / ACpre (pre-registration).
- Keywords and placements can't be set manually (full automation).
- Best fit: app user acquisition and re-engagement.

**P-MAX (Performance Max)**
- One campaign covers all 7 channels: Search, Shopping, Display, YouTube, Gmail, Discover, Maps.
- Asset groups + audience signals + search themes are AI-optimized end-to-end.
- 2025 capabilities: 10,000 negative keywords supported, channel-level reporting, demographic exclusions, A/B testing.
- Best fit: e-commerce sales, lead-gen scale, store visits, lean teams.

**Demand Gen**
- Visual-rich ads on YouTube / Discover / Gmail / GDN. The Google equivalent of Meta's social-style ads.
- Image / carousel / video / product-feed-driven ads supported.
- 2025–2026 additions: GDN inventory, Target CPC, new-customer-acquisition mode, channel-level surface selection.
- Best fit: mid-funnel, social-style visual ads, YouTube Shorts.

### Recommended mix by business model

| Business model | First choice | Second choice | Conditions |
|---|---|---|---|
| **E-commerce** | P-MAX (with feed) | Search (high-intent KW) + Shopping | Feed required. P-MAX shines at 30+ conversions / month. |
| **Lead gen (B2B)** | Search | P-MAX (full assets) | Search intent is sharp. For P-MAX, turn off URL expansion. |
| **Lead gen (B2C)** | Search + P-MAX | Display (remarketing) | Capture intent on Search, expand reach with P-MAX. |
| **App** | App campaign | Video (YouTube) | Choose ACi / ACe / ACpre based on the goal. |
| **Brand awareness** | Video (YouTube) | Display / Demand Gen | Driven by whether video assets exist. |
| **Store visits** | P-MAX (Store Goals) | Search (geo KW) | Google Business Profile linkage required. |

### Budget guidance

| Monthly budget | Recommended structure |
|---|---|
| Up to ~$1,000 | Single Search campaign (brand KW + high-intent KW) |
| ~$1,000 – $3,000 | Search + (P-MAX or Display remarketing) |
| ~$3,000 – $10,000 | Search + P-MAX + (Video or Display) |
| Above $10,000 | Full-funnel; separate campaigns by goal |

(Numbers are rough orders of magnitude — adjust to local market CPCs and the target vertical's economics.)

### Google's "power pack" recommendation (2025–2026)

Google's recommended modern stack:

1. **Performance Max** — primary conversion engine
2. **Demand Gen** — visual-rich prospecting
3. **AI Max for Search** — AI-augmented Search

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

### Account structure

Google Ads is a 3-layer structure: Account → Campaign → Ad Group (→ Ads + Keywords).

| Level | Design principle |
|---|---|
| Campaign | Split by goal and budget. ~6–10 campaigns is typical. Over-fragmenting splits the AI's training signal. |
| Ad Group | One theme per ad group. ~10–20 keywords, 3–5 RSAs. ~7–10 ad groups per campaign. |

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

### Bidding strategy by phase

| Phase | Condition | Recommended strategy |
|---|---|---|
| 1. Launch | No conversion data yet | Manual CPC or Maximize Clicks |
| 2. Data collection | Conversion tracking live | Maximize Conversions |
| 3. Optimization | 30+ conversions in 30 days | Target CPA (start from observed average CPA) |
| 4. Scale | 50+ conversions in 50 days, conversion value available | Target ROAS / Maximize Conversion Value |

When changing bid settings:

- Avoid major changes during the 2–3 week learning period.
- Don't move Target CPA / ROAS by more than 20% at a time.
- Daily budget should be at least 10–15× target CPA.

### Conversion design

| Type | Used for | Examples |
|---|---|---|
| Primary CV | Bid optimization | Purchase, inquiry, qualified lead |
| Secondary CV | Monitoring only | Resource downloads, newsletter signup |
| Micro CV | Engagement signals | Scroll depth, dwell time |

Required modern setup (2025+):

- **Enhanced Conversions** — Hashed first-party data sent to Google. Essentially required as cookie restrictions tighten.
- **Offline Conversion Import** (for lead gen) — Push closed-deal data from CRM back into Google Ads.
- **Server-side tagging** — Mitigates ad-blocker and cookie-restriction loss.

#### View-through conversions (VTC) — unified policy

VTC measures users who saw the ad without clicking and converted later. It applies to display, video, P-MAX, Demand Gen — anywhere with impression-led inventory. Treat VTC consistently:

| Principle | Description |
|---|---|
| **Default = monitoring only** | Don't include VTC in the primary CV that drives bidding. Track it as a secondary signal. |
| **Keep the window short** | 1-day VTC window (default). Longer windows blur causality and inflate the count. |
| **Don't combine with click-based CV in CPA / ROAS** | Report VTC separately as "indirect contribution." |
| **Watch the VTC ratio** | If VTC is >50% of total conversions, the campaign's real direct effect is likely overstated. |

**VTC handling per ad type:**

| Ad type | VTC impact | Recommendation |
|---|---|---|
| **Search** | Negligible (click-driven) | No special handling needed. |
| **Display** | Mid–high (heavy impression volume) | Track VTC as secondary CV. For remarketing campaigns with strong CV volume, consider including VTC in primary. |
| **Video** | Mid (post-view influence) | Track VTC separately as "video assist." Don't combine with direct CV. |
| **P-MAX** | High (default optimizes including VTC) | Audit VTC ratio regularly. If consistently >50%, consider creating a click-based CV action (advanced — see [references/pmax.md](references/pmax.md) §9-3). |
| **Demand Gen** | Mid–high | Treat VTC + assist as "demand-creation indirect impact." Use blended CPA for overall judgment. |

### Budget allocation

**70 / 20 / 10 rule:**

- 70% — proven campaigns and keywords
- 20% — testing (bidding, targeting, ad copy)
- 10% — new keywords, audiences, or campaign types

### Operating cadence

```
Daily:     outlier checks (sudden CPC spikes, CV drops)
Weekly:    search-terms report, negative-keyword additions, VTC ratio check
Biweekly:  bid adjustments, ad-copy performance review
Monthly:   keyword adds / pauses, budget reallocation
Quarterly: campaign-structure review, strategy-level rethink
```

### Common pitfalls

| Failure mode | Fix |
|---|---|
| Conversion tracking inconsistent | Verify with GTM Preview + GA4 DebugView |
| Enhanced Conversions not enabled | Turn it on — cookie-restriction defense is required |
| Bid targets unrealistic | Start from observed historical numbers, then tighten gradually |
| Frequent changes during learning period | Hold off on big changes for 2–3 weeks after a change |
| P-MAX underbudgeted | Daily budget must be ≥10× target CPA |
| Judging on VTC-inclusive ROAS only | Also evaluate click-only ROAS in parallel |
| Mismatched ad → LP | Provide a dedicated LP per ad group |

---

## Step 4: Detailed design + delivery

For each ad type that's been selected, consult the matching playbook for both practice and settings. The practice sections should drive the recommendation; settings are the implementation layer.

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

### Delivering the output

Match the output shape to what the situation calls for. **The skill does not require producing a written deliverable** — it adapts:

- **Direct conversational answer** when the user asked a focused question.
- **Structured inline response** when the user wants planning guidance but doesn't need a document.
- **Written plan / spec** when the user explicitly asked for one, or when the deliverable is going to be handed off to another team / agency / client. Use [references/output-templates.md](references/output-templates.md) for the format and the user's project conventions for placement.

If a written plan is the right deliverable, it typically covers:

1. Strategy summary — goal, target, why this ad-type mix.
2. Campaign list — purpose, bidding, budget split per campaign.
3. Per-ad-type design — driven by the playbooks.
4. Creative requirements — assets needed, specs, who's producing them.
5. Measurement design — CV definitions, VTC policy, tracking setup.
6. Operating timeline — launch → learning → optimization phases.
7. KPIs and success criteria.

When unsure whether to produce a written document, ask the user.

---

## Multi-ad-type combination patterns

### Pattern 1: Search + P-MAX (most common)

```
Search (brand KW)              ← brand defense
Search (high-intent KW)        ← exact-match capture
P-MAX (full assets or feed)    ← AI fills the rest
```

Search exact match takes priority over P-MAX. Set P-MAX brand exclusion to prevent cannibalization.

### Pattern 2: E-commerce full funnel

```
P-MAX (with feed)               ← main engine, all 7 channels
Search (non-brand, high intent) ← captures intent P-MAX may miss
Standard Shopping (optional)    ← for products P-MAX underdelivers on
Display remarketing             ← cart abandonment, viewers
```

### Pattern 3: B2B lead generation

```
Search (brand + problem KW)            ← capture high-intent users
P-MAX (full assets, URL expansion off) ← awareness + remarketing
Video (YouTube, optional)              ← thought leadership, trust
```

### Pattern 4: Awareness → conversion

```
Video (YouTube Reach / Views) ← awareness phase
Demand Gen / Display          ← awareness reinforcement, mid-funnel
Search (brand KW)             ← capture branded search lift
P-MAX                         ← full coverage
```
