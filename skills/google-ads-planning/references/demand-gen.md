# Google Demand Gen

## Operating practice

Demand Gen is a visual, social-style Google campaign type. Plan and evaluate it closer to paid social than to Search: it creates and warms demand more than it harvests explicit intent.

### What matters most

- **Creative and audience seed quality are the main levers.** Strong purchaser/customer lists, lookalikes, short video, lifestyle images, carousels, and product-feed creative usually matter more than tiny targeting tweaks.
- **Use high-quality seeds for lookalikes.** Recent purchasers, high-LTV customers, qualified leads, or retained users are better seeds than all site visitors or all converters. Weak seeds produce weak lookalikes.
- **Creative must feel native to YouTube/Discover/Gmail.** Generic stock, logo-heavy banners, and Search-style copy usually underperform. Use hooks, product context, human/product-in-use visuals, and clear offer paths.
- **Judge by role, not last-click alone.** Demand Gen can lift brand Search, assisted conversions, remarketing pools, and P-MAX performance. Direct CPA matters, but it may understate contribution when the campaign is mid-funnel.
- **Avoid overlap with P-MAX unless the job is different.** Demand Gen should own a defined role: cold visual prospecting, product discovery, mid-funnel education, remarketing, or cross-sell.
- **Consolidate until volume supports splits.** Tiny ad groups by persona often trap the campaign in learning. Split only when creative, audience, bid target, or business goal truly differs.
- **Budget must be meaningful.** Very small B2B or niche campaigns often fail because the system never gets enough signal. In those cases, use Demand Gen for remarketing/customer lists first.

- **Demand Gen should have a defined funnel job.** Good jobs include cold visual prospecting, product discovery, mid-funnel education, creator/UGC-style proof, remarketing, and cross-sell. "Make more conversions like P-MAX" is too vague.
- **Lookalike seed quality dominates lookalike settings.** Prefer recent purchasers, high-LTV customers, qualified leads, active subscribers, or retained app users. Avoid diluted seeds like all visitors when quality varies.
- **Paid-social winners are useful starting points.** Creative that works on Meta/TikTok-style feeds often adapts better to Demand Gen than Search or Display banners do.
- **Shorts can supply volume but needs native creative.** Vertical, fast-opening, text-supported creative is the default. Horizontal repurposes often waste the surface.
- **Creative volume beats polish up to a point.** A steady pipeline of distinct angles usually beats a few heavily polished assets. Approval bottlenecks should be handled as an operating problem.
- **Demand Gen can lift Search.** If last-click CPA looks weak, check branded Search, assisted conversion, and remarketing-pool movement before concluding there is no value.

### Diagnosis

| Symptom | First checks | Likely action |
|---|---|---|
| Low CTR | Hook, first frame, native fit, offer clarity, asset ratios | Refresh concepts, add video/carousel, use social-style winners |
| Good CTR, weak CVR | Landing page, audience seed, offer, conversion action | Improve LP/offer, refine seed, use qualified conversion |
| Low spend | Audience too narrow, target too tight, asset/ad strength weak | Consolidate, broaden, relax target, add assets |
| Looks weak by last click | Branded Search lift, assisted conversions, holdout feasibility | Evaluate incrementality or blended funnel impact |

### Common traps

- Reusing Search copy as visual-feed copy.
- Running 2-3 polished assets for months instead of refreshing concepts.
- Using all-converter or all-visitor lists as lookalike seeds when quality differs sharply.
- Killing campaigns before conversion delay and assisted impact can show.

---

## 1. Ad formats

### 1-1. Single-image ad (multi-asset ad)

Upload multiple images, headlines, descriptions, and CTAs; Google AI selects the best combination per surface and per user.

- Including all three aspect ratios (landscape, square, portrait) maximizes the eligible inventory.
- Each asset must stand on its own — AI generates arbitrary combinations.

### 1-2. Video ad (responsive video ad)

Uses videos already uploaded to YouTube. Combine landscape, square, and portrait to deliver across In-Stream, In-Feed, and Shorts.

- Convey the brand and value prop in the first 5 seconds.
- Design for muted playback (subtitles, text overlays).
- Recommended: a set of 16:9 (landscape) + 1:1 (square) + 9:16 (vertical).

### 1-3. Carousel image ad

2–10 swipeable cards. Each card can have its own headline and destination URL.

- All cards in a carousel must share the same aspect ratio.
- Supported aspect ratios: 1.91:1 (landscape) / 4:5 (portrait) / 1:1 (square).
- Effective for narrative arcs (problem → solution → CTA) or showing multiple products in parallel.

### 1-4. Product-feed ad (e-commerce)

Combines a Merchant Center product feed with image / video creative. Three sub-types:

| Sub-type | Description |
|---|---|
| **Image + product** | Image creative + product feed |
| **Video + product** | Video creative + product feed |
| **Product only** | No creative; delivery from product feed alone |

---

## 2. Submission specs

Use [creative-strategy.md](creative-strategy.md#demand-gen-baseline) for production specs. Demand Gen-specific planning rules:

- Include landscape, square, and vertical assets when possible; vertical creative is important for Shorts.
- Each headline, description, image, video, and carousel card must stand alone because Google assembles combinations dynamically.
- Use "Automatic" CTA unless there is a specific reason to force a CTA.
- For carousel, keep card quality and message consistent; one weak card can damage the unit.
- For commerce, verify Merchant Center feed region and delivery settings before using product-feed creative.

---

## 3. Surfaces (placements)

### 3-1. Surface details

| Surface | Pricing model | Format | Characteristics |
|---|---|---|---|
| **YouTube In-Stream** | CPM | Video | Pre-roll / mid-roll, skippable |
| **YouTube In-Feed** | CPC | Image / video | Home feed, search results, related videos |
| **YouTube Shorts** | CPM | Vertical image / video | Inserted between Shorts; 9:16 recommended |
| **Discover** | CPC | Image / carousel | Google app feed; mobile-primary |
| **Gmail** | CPC | Image | Promotions / Social tabs; expandable |
| **GDN** (added April 2025) | CPM / CPC | Image | 2M+ sites and apps ([Google Ads Help](https://support.google.com/google-ads/answer/15890515?hl=en)) |
| **Google Video Partners** | CPM | Video | Third-party video inventory |
| **Google Maps** | — | Promoted pins | Shown during local search. Availability can vary by account, country, and rollout status |

### 3-2. Surface-by-surface selection (March 2025+)

Demand Gen channel controls let campaigns choose surfaces individually across YouTube, Discover, Gmail, and the Google Display Network where available ([Google Ads Help](https://support.google.com/google-ads/answer/15973205?hl=en)).

- Shorts-only campaigns are possible
- Surface-level channel selection and exclusions; budget allocation is indirect through the eligible channels
- Toggle YouTube / Discover / Gmail / GDN ON / OFF independently

**Use cases:**
- Shorts-only campaigns to maximize vertical creative
- Disable GDN delivery to focus on premium surfaces (YouTube / Discover)
- Verify per-surface performance before adding more

### 3-3. Reach scale

- Demand Gen reach and incrementality figures are Google-published benchmarks, not account forecasts; verify the current claims before quoting them in client-facing plans ([Google Ads Blog](https://blog.google/products/ads-commerce/new-demand-gen-features-2025/)).

---

## 4. Audience targeting

### 4-1. First-party data

| Type | Content |
|---|---|
| **Customer Match** | Upload your own customer list (email / phone). Also used as a seed for Lookalike expansion |
| **Remarketing lists** | Site visitors, app users, YouTube channel viewers / subscribers |
| **High-LTV segments** | Upload high-LTV customer lists to improve Lookalike precision |

### 4-2. Lookalike segments — Demand Gen only

**The only Google Ads campaign type with native Lookalike audiences.** Uses first-party data as a seed and expands to similar users ([Google Ads Help](https://support.google.com/google-ads/answer/15594567?hl=en)).

| Reach setting | % of target population | Use |
|---|---|---|
| **Narrow** | ~2.5% | High precision; keep CPA tight |
| **Balanced** | ~5% | Recommended starting point |
| **Broad** | ~10% | Maximum reach; awareness expansion |

**Important operating note:** Treat Lookalike reach settings as directional controls rather than guaranteed hard audience boundaries unless the current UI clearly confirms strict targeting behavior. Verify whether optimized targeting, demographic expansion, and audience exclusions match the intended audience-control design before launch.

### 4-3. Custom segments

- Build custom audiences from search keywords (top 20–30 terms)
- Definitions can also be based on website visits and app usage
- Applied at the ad-group level

### 4-4. Google's pre-built audiences

| Type | Content |
|---|---|
| **In-market** | Users actively researching specific products / services |
| **Life events** | Moving, marriage, graduation, etc. |
| **Affinity** | Long-term interests / habits |
| **Detailed demographics** | Parental status, marital status, education, homeownership, employment |

### 4-5. Optimized Targeting

Auto-expands beyond manually-set audiences to users likely to convert.

| Scenario | Recommended setting |
|---|---|
| New prospecting (cold audiences) | **ON** — explore broadly |
| Remarketing | **OFF** — keep audience tight |
| Cart abandoners | **OFF** — keep audience tight |
| Manual segmentation | **OFF** — respect manual config |

**Note:** When ON, audience settings are treated as "signals (suggestions)" rather than "targeting constraints" — Google may expand at its discretion.

### 4-6. Audience exclusions

- Exclude users who already converted
- Use audience exclusions to prevent overlap with other campaigns (especially P-MAX)

---

## 5. Creative-design best practices

### 5-1. Strategy by surface

Demand Gen has different pricing models and user states per surface, so the creative angle should be split:

| Surface | Pricing | User state | Creative angle |
|---|---|---|---|
| **YouTube (In-Stream / Shorts)** | CPM | Watching video | Hook in the first 5 s; surface proof / results early; subtitles required |
| **Discover / Gmail** | CPC | Browsing feeds | Put price filter or qualification criteria in the headline to filter out low-quality clicks |

### 5-2. Image-design principles

| Principle | Description |
|---|---|
| Brand-first | Make the logo and brand color stand out so the ad is recognized in feed |
| Inspirational | Show the use case or experienced benefit, not just the product alone |
| Minimal text overlay | Hard to read on small surfaces. Keep text within ≤20% of image area |
| High-quality, high-contrast | Sharp, professional. Blurry / low-resolution is unacceptable |
| Cover all 3 aspect ratios | Landscape + square + portrait covers every surface |

### 5-3. Video-design principles

| Principle | Description |
|---|---|
| First 5 seconds matter most | Brand + value prop in the first 5 s |
| Muted-playback ready | Discover / Gmail viewers often have audio off; subtitles and text overlays are essential |
| Multiple aspect ratios | Ideally 16:9 + 1:1 + 9:16 |
| Shorts-ready: 10–20 s | Short, brisk pacing. 1 minute max |
| 15+ seconds recommended | Reaches the most inventory at 15 s+ |

### 5-4. Text (headline / description) design principles

- Each headline must **stand alone** (AI generates arbitrary combinations).
- Build all 5 from different angles (price, feature, proof, scarcity, emotion, etc.).
- **Don't duplicate** between headlines and descriptions (combinations become redundant).
- On Discover / Gmail surfaces (CPC pricing), include price or qualification in the headline to pre-filter out low-quality clicks.

### 5-5. Creative refresh cycle

| Asset type | Recommended refresh interval |
|---|---|
| Static image | Every 4–6 weeks |
| Video | Every 8–12 weeks |

### 5-6. AI creative features (2025+)

| Feature | Description |
|---|---|
| **Animated images** | Auto-generates motion variations from static images |
| **Adaptive design** | Adds branded text overlays to images automatically |
| **Auto-video generation** | AI auto-generates videos from static image assets |
| **Video shortening** | Auto-edits long videos into surface-appropriate short versions |
| **Video flipping** | Auto-generates vertical (9:16) from landscape video |

---

## 6. Bidding strategies (Demand Gen specific)

### 6-1. Available bid strategies

| Strategy | Goal | Use |
|---|---|---|
| **Maximize Conversions** | Maximize CV count within the budget | New campaigns, low CV data, early stage. Recommended for small budgets too |
| **Target CPA (tCPA)** | Maximize CV count at the specified CPA | After 50+ conversions are accumulated; 3–5× target CPA/day is workable, 15×+ gives a cleaner read |
| **Maximize Conversion Value** | Maximize CV value within the budget | When CV value (revenue, etc.) is set up |
| **Target ROAS (tROAS)** | Maximize CV value at the specified ROAS | Sufficient CV-value data + clear ROAS goal |
| **Target CPC (tCPC)** | Control average CPC | Only available when the campaign goal is "clicks" — awareness or traffic ([Google Ads Help](https://support.google.com/google-ads/answer/16262529?hl=en)) |

### 6-2. Bid-strategy decision flow for Demand Gen

```
Is the campaign's primary goal traffic / awareness?
├── Yes → Target CPC
└── No (conversions) → Is there CV data?
    ├── No → Maximize Conversions
    └── Yes → 50+ conversions?
        ├── No → Maximize Conversions (accumulate data)
        └── Yes → Is conversion value (revenue, etc.) tracked?
            ├── No → Target CPA
            └── Yes → Target ROAS
```

### 6-3. Bidding notes

| Note | Description |
|---|---|
| **Target CPC granularity** | Can be set at both campaign and ad-group level; ad-group level wins |
| **Budget for conversion goals** | Practical working range is $100–500/day per ad group or about 15× the goal CPA when you want a clean read; narrow tests can run smaller |
| **Small-budget alternative** | Limiting the geography, audience, or surface can let you start at $20–35/day, but judge it as a learning test rather than a scale plan |
| **Learning period** | Avoid major changes for 3–4 weeks after launch |

---

## 7. Product-feed integration (e-commerce)

### 7-1. Prerequisites

| Condition | Detail |
|---|---|
| Merchant Center account | Active and approved (approval can take up to 3 days) |
| Google Ads link | Merchant Center linked to the Google Ads account |
| Minimum products | **4+** (recommended: 50+) |
| CV goal | Set "Purchase" as a CV goal on the campaign |
| Geography match | Target geo must match the Merchant Center delivery-region setting |

### 7-2. Key feed attributes

| Attribute | Spec | Notes |
|---|---|---|
| **title** | Up to 150 chars | Shown as the ad title |
| **short_title** | — | For short, catchy titles |
| **description** | Up to 5,000 chars | Product description |
| **image** | Min 300×300 px, max 10 MB | Product image |
| **price** | Includes currency code | Price display |
| **item_group_id** | — | Prevents duplicate images on variants |

> **For detailed product-feed optimization, see [shopping-ads.md](shopping-ads.md).**

### 7-3. Sitelinks

- Min 4, max 20
- Display URL path: max 15 characters each

### 7-4. 2025 feed enhancements

- View full product info inside the ad without navigating to the product page
- Local-inventory display drives offline-store visits too
- Omnichannel auction: auto-optimizes for online vs in-store purchase

---

## 8. Campaign structure and operating design

### 8-1. Structure principles

| Principle | Description |
|---|---|
| **Start consolidated** | Begin with a single campaign to accelerate AI learning |
| **Split surfaces by ad group** | Use ad groups for YouTube Shorts / In-Stream / Discover+Gmail to make per-surface results visible |
| **Separate remarketing from prospecting** | Don't mix warm and cold audiences |
| **No shared budget** | Demand Gen does not support the shared-budget pool |

### 8-2. Recommended campaign-structure template

```
Demand Gen (3 ad groups)
│
├── Ad Group 1: [DG] Prospecting - Lookalike
│   ├── Targeting: Lookalike (Balanced) + custom segment
│   ├── Optimized Targeting: ON
│   ├── Exclusion: remarketing list, converted users
│   ├── Creative: image + video (3 aspect ratios)
│   └── Surfaces: YouTube + Discover + Gmail
│
├── Ad Group 2: [DG] Prospecting - In-Market
│   ├── Targeting: in-market segments + affinity
│   ├── Optimized Targeting: ON
│   ├── Exclusion: remarketing list, converted users
│   └── Creative: image + video (3 aspect ratios)
│
└── Ad Group 3: [DG] Remarketing
    ├── Targeting: site visitors / YouTube viewers / Customer Match
    ├── Optimized Targeting: OFF
    ├── Exclusion: converted users
    └── Creative: remarketing-style messages (scarcity / reminder)
```

### 8-3. Shorts-only campaign (optional)

```
Demand Gen (Shorts-focused)
├── Surface: YouTube Shorts only (channel control)
├── Creative: vertical 9:16 video / image only
├── Video length: 10–20 seconds
└── Goal: validate Shorts surface performance in isolation
```

### 8-4. Budget design

| Item | Recommendation |
|---|---|
| Working daily budget | $100–500/day per ad group or about 15× target CPA when you want enough signal for a fair conversion read |
| Small-scale test | Geo / audience / surface-limited tests can start around $20–35/day, but expect slower learning |
| Total campaign budget | Can also be set to spend evenly across the full delivery period |

---

## 9. Measurement and evaluation

### 9-1. Key metrics

| Metric | Use |
|---|---|
| **CPA / ROAS** | Direct performance evaluation |
| **EVC (engaged-view CV)** | Users who watched enough of a video ad and converted later. Included in Conversions for supported Demand Gen inventory; segment by ad event type when evaluating direct response |
| **VTC (view-through CV)** | Users who saw the ad without clicking or engaged-viewing and converted later. VTC optimization is YouTube-only open beta and off by default; if enabled, keep the VTC window short and report impression credit separately |
| **Cross-platform comparable CV** | Reporting-only Demand Gen metric that can include VTC to compare with paid-social-style reporting; don't use it to compare against Search, Shopping, or P-MAX |
| **Attributed brand searches** | Brand-search activity attributed to Demand Gen when available |
| **Assist CV** | Demand Gen touchpoints that contributed to a final conversion |

### 9-2. Reading performance correctly

Demand Gen is a mid-funnel demand-creation campaign — different from Search. Looking only at CVs in the report tends to undervalue it.

| Evaluation method | Description |
|---|---|
| **Blended CPA** | Judge based on account-wide blended CPA (don't isolate Demand Gen alone) |
| **Assist CV** | Confirm Demand Gen first-touch → Search-CV paths |
| **Brand-search lift** | Did brand-search volume increase before vs after Demand Gen launch? |
| **Geographic holdout** | Compare CV rate in delivery region vs non-delivery region |
| **Period on / off** | Pause for a defined period; compare CV count before vs after |

**Note:** P-MAX often "steals" Demand Gen's first-touch CV and counts the final CV. Evaluate together with the assist-CV report and blended CPA.

### 9-3. Asset-level reporting

Per-asset performance labels:

| Label | Meaning | Action |
|---|---|---|
| Best | Outperforming the alternatives | Keep; test similar patterns |
| Good | Average | Keep; test improved variations |
| Low | Underperforming the alternatives | Replace with new assets |
| Learning | Still gathering data | Wait for results |

---

## 10. A/B testing (experiments)

### 10-1. Test types

| Type | Content |
|---|---|
| **Asset A/B test** | Single-variable creative test (image / video / headline / CTA comparison) |
| **Custom experiment** | Multi-variable test including audience, bid strategy, format |

### 10-2. Setup requirements

| Item | Requirement |
|---|---|
| Required campaign count | 2 (new, undelivered campaigns) |
| Variables | **Change only one**; keep everything else identical |
| Traffic split | 50/50 recommended (80/20 also possible) |
| Recommended duration | 3–4 weeks minimum (30–60 days ideal) |
| Required CVs | At least 100 for reliable results |
| Confidence | Reported at 70% / 80% / 95% levels |

### 10-3. Test-target examples

| Target | Examples |
|---|---|
| Format | Video vs image ads |
| CTA | "Learn more" vs "Buy now" |
| Video aspect ratio | Vertical vs square |
| Creative | Image only vs image + video mix |
| Targeting | Lookalike vs in-market |
| Targeting | Demographics added vs Optimized Targeting |
| Bidding | Maximize Conversions vs Target CPA |

### 10-4. Notes during testing

- **Don't edit the campaign** during the test (skews results)
- **Change only one variable** to isolate causation
- View results in the "Experiments" tab

---

## 11. Relationship with other campaigns

### 11-1. Demand Gen vs P-MAX

| Item | Demand Gen | P-MAX |
|---|---|---|
| **Funnel position** | Top–mid (demand creation, consideration) | Full funnel (especially CV maximization) |
| **Audience control** | High (parameters specified) | Low (full AI automation) |
| **Surfaces** | YouTube / Discover / Gmail / GDN / Maps where available | All 7 channels (including Search) |
| **Formats** | Image / video / carousel / product feed | Text / image / video |
| **Lookalike** | Available (Demand Gen exclusive) | Not available |
| **Reporting transparency** | High (per surface, per asset) | Improving but limited |
| **Strategic role** | "Create" intent — educate, explore | "Harvest" intent — convert, remarket |

**Coexistence points:**
- Demand Gen = prospecting / educational creative
- P-MAX = remarketing / offer-based creative
- Use audience exclusions to prevent overlap and cannibalization

### 11-2. Demand Gen vs Display

| Item | Demand Gen | Display |
|---|---|---|
| **Surfaces** | YouTube + Discover + Gmail + GDN + Maps where available | GDN only |
| **Formats** | Image / video / carousel / product feed | Banner / rich media / video |
| **Lookalike** | Available | Not available (use Optimized Targeting instead) |
| **Content targeting** | Not available | Available (KW / topic / placement specification) |
| **AI optimization level** | High | Mid |

**How to choose:**
- **Display**: When you need GDN-specific control with content targeting (KW / topic / placement specification).
- **Demand Gen**: For YouTube / Discover delivery, visual-rich creative, and Lookalike segments.

> Demand Gen now overlaps more with Display inventory than before. Keep Display only when it has a distinct job such as GDN-specific control, content targeting, or placement strategy.

---

## 12. Major 2025–2026 updates

| Period | Update |
|---|---|
| **Jan–Mar 2025** | Per-surface selection becomes available account-wide. YouTube Shorts-only campaigns supported ([channel controls Help](https://support.google.com/google-ads/answer/15973205?hl=en)) |
| **Feb 2025** | Vertical 9:16 image ads supported on YouTube Shorts |
| **Apr 2025** | **GDN image inventory added to Demand Gen** ([GDN integration Help](https://support.google.com/google-ads/answer/15890515?hl=en)); new VAC creation discontinued ([VAC migration Help](https://support.google.com/google-ads/answer/15110871?hl=en)) |
| **May 2025** | **Target CPC bidding** available in click-goal Demand Gen campaigns ([Google Ads Help](https://support.google.com/google-ads/answer/16262529?hl=en)) |
| **Jul 2025** | Existing VAC (Video Action Campaigns) begin auto-migration to Demand Gen ([Google Ads Help](https://support.google.com/google-ads/answer/15110871?hl=en)) |
| **Sep 2025** | Migration of accounts with VAC delivery completes in batches ([Google Ads Help](https://support.google.com/google-ads/answer/15110871?hl=en)) |
| **Oct–Dec 2025** | Expanded channel controls, AI creative features, new-customer-acquisition options, local offers, and checkout-link style commerce features; verify availability in the UI and current Help before relying on these |
| **Jan 2026** | Connected-TV commerce features, attributed brand-search reporting where available, and travel-feed support |
| **2026** | VTC optimization for Demand Gen is available as an open beta for YouTube inventory and is off by default; enable only when impression-based optimization fits the evaluation model ([Google Ads Help](https://support.google.com/google-ads/answer/16399666)) |
| **Mar 2026 onward** | Treat Lookalike reach settings as directional controls unless strict targeting behavior is confirmed in the current UI |

---

## 13. Common failure patterns (Demand Gen specific)

| Failure | Mitigation |
|---|---|
| **Budget too small** | $70–200/day is typically the minimum. $10/day won't accumulate learning |
| **Using Demand Gen as the first campaign** | Establish a CV baseline with Search / Shopping / P-MAX first. Demand Gen is a support campaign |
| **Mixing remarketing and prospecting** | Don't combine warm and cold audiences in the same ad group. Data muddies and optimization breaks |
| **Misusing Optimized Targeting** | Turning ON for remarketing or cart abandoners expands targeting unboundedly. Only ON for cold prospecting |
| **Trusting reports at face value** | Google Ads reporting alone undercounts. Confirm with blended CPA, assist CV, and brand-search lift |
| **Pulling out too early** | Mid-funnel CVs are slow to land. Allow at least 3 months of data |
| **Single-pattern generic creative** | Need variety: 5 headlines, 5 descriptions, 15+ images |
| **Missing invalid traffic** | Check 0-second sessions and abnormal micro-CV rates. Start on Google's owned surfaces (YouTube / Discover / Gmail); add GDN only after quality is verified |
| **Letting P-MAX cannibalize** | P-MAX often counts Demand Gen's first-touch as its own final CV. Manage with audience exclusions and the assist-CV report |
| **Ignoring per-surface data** | Performance differs across YouTube In-Stream / Shorts / Discover / Gmail. Optimize budget split via channel control |

---

## 14. Operations checklist

### Pre-launch checks

- [ ] Conversion tracking is configured correctly
- [ ] Image assets uploaded for both landscape and square (recommended: 5+ each, plus 3+ portrait)
- [ ] Logo uploaded
- [ ] 5 headlines, 5 long headlines, 5 descriptions uploaded
- [ ] Business name set
- [ ] Video assets: ideally all 3 aspect ratios (16:9 / 1:1 / 9:16)
- [ ] Bid strategy confirmed (initial: Maximize Conversions)
- [ ] Daily budget matched to the readout goal: 3–5× target CPA/day minimum for conversion learning, 15×+ for faster scale where affordable
- [ ] Audience setup: prospecting and remarketing in separate ad groups
- [ ] Optimized Targeting: ON for prospecting / OFF for remarketing
- [ ] Audience exclusion: converted users excluded
- [ ] Audience exclusion to prevent P-MAX overlap
- [ ] Surface selection confirmed (recommend Google's owned surfaces only at launch)
- [ ] LP renders within 3 seconds on mobile
- [ ] LP message matches the ad creative

### Weekly checks

- [ ] Delivery volume (imp / click / cost) trend
- [ ] CTR / CPC / CPA
- [ ] VTC (view-through CV)
- [ ] Per-surface performance
- [ ] Invalid-traffic signals (0-second sessions etc.)

### Monthly checks

- [ ] Asset performance report
- [ ] Replace "Low" assets
- [ ] Add new creative for testing (refresh static images every 4–6 weeks)
- [ ] Re-evaluate Lookalike segment reach setting
- [ ] Consider migrating bid strategy (move to tCPA after 50+ conversions)
- [ ] Budget reallocation
- [ ] Brand-search volume change
- [ ] Evaluate Demand Gen contribution via the assist-CV report

---

## 15. Ad policies

Demand Gen ad policies are shared with Display ads. See section 5 of [display-ads.md](display-ads.md) for details.

Additional notes:

| Item | Description |
|---|---|
| **Discover surface quality bar** | Discover feeds expect personalized, high-quality content. Excessive sensationalism / clickbait sees high disapproval rates |
| **YouTube Shorts surface** | Creatives that look natural as short-form video work best. Overly ad-like content sees high skip rates |
| **Carousel consistency** | All cards must share consistent message and quality. One low-quality card can disapprove the entire ad |
