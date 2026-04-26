# Google Display Ads

## Contents

- [1. Ad formats](#1-ad-formats)
- [Operating practice](#operating-practice)
- [2. Submission specs for Responsive Display Ads (RDA)](#2-submission-specs-for-responsive-display-ads-rda)
- [3. Submission specs for uploaded display ads](#3-submission-specs-for-uploaded-display-ads)
- [4. Creative-design best practices](#4-creative-design-best-practices)
- [5. Ad policies and rules](#5-ad-policies-and-rules)
- [6. Targeting strategy](#6-targeting-strategy)
- [7. Bidding strategies (Display-specific)](#7-bidding-strategies-display-specific)
- [8. Measurement and evaluation (Display version)](#8-measurement-and-evaluation-display-version)
- [9. Campaign structure and operating design](#9-campaign-structure-and-operating-design)
- [10. Brand safety and placement management](#10-brand-safety-and-placement-management)
- [11. Ad Strength and optimization](#11-ad-strength-and-optimization)
- [12. Operations checklist](#12-operations-checklist)
- [13. Relationship with Demand Gen campaigns (2025+)](#13-relationship-with-demand-gen-campaigns-2025)

---

## Operating practice

Display should have a clear job: remarketing, warm re-engagement, cheap incremental reach, or carefully controlled prospecting. Do not evaluate every Display campaign like Search.

### What matters most

- **Role clarity matters more than settings.** Remarketing, prospecting, brand reach, and customer re-engagement should usually be separate because their CPA, frequency, creative, and measurement logic differ.
- **Low CPM is useful only after quality constraints.** Cheap reach can beat over-targeting when the audience is already good enough and the campaign has bidding/creative discipline. It becomes waste when placements, geography, brand safety, or conversion quality are poor.
- **Optimized Targeting is dangerous for remarketing.** It can expand beyond the intended warm audience. Keep it off when the job is strict remarketing; consider it only when active prospecting is intended.
- **View-through conversions should not drive the business story alone.** Display VTC can be inflated by impressions that did not create meaningful attention. Keep VTC separate or discounted unless a holdout/lift test justifies the credit.
- **Frequency is a brand and CPA lever.** Small remarketing pools can be overexposed quickly. Frequency caps around 3-5 impressions per user per week are often a better starting point than unlimited delivery.
- **Creative message beats visual polish.** Clear value prop, reason to act, and CTA usually matter more than decorative image quality. In visual categories, the image becomes the message; in most lead-gen categories, the headline/offer carries conversion.
- **Placement hygiene should be focused, not maximalist.** Exclude known bad inventory and inappropriate app/content categories, but avoid enormous exclusion lists that simply raise CPM without improving outcomes.

- **Broad enough + cheap enough can beat precise targeting.** Once a warm audience or prospecting signal is good enough, excessive audience layering can raise CPM faster than it raises CVR. The exception is compliance-heavy or very narrow-fit products where bad impressions carry real cost.
- **Standalone Display is usually not the first cold-acquisition engine.** P-MAX and Demand Gen often cover broad visual inventory better. Use Display when it has a differentiated job: remarketing, frequency-controlled reach, customer reactivation, or curated B2B placements.
- **Mobile app inventory should be reviewed deliberately.** For non-app advertisers, app placements can create low-quality clicks or accidental engagement. Exclude categories or placements when quality is poor, but avoid reflexively blocking all scale before testing.
- **A small shared exclusion list is healthier than endless exclusions.** Maintain known-bad placements/content categories; do not turn placement cleanup into the main optimization strategy.
- **Display creative fatigue is real.** For active campaigns, plan refreshes around new concepts and offers, not just resized banners.
- **Do not let Display and P-MAX fight for the same job.** If P-MAX is already handling conversion-oriented broad reach, make Display own remarketing, win-back, controlled reach, or a different message.

### Diagnosis

| Symptom | First checks | Likely action |
|---|---|---|
| Cheap traffic, no business lift | Placement quality, VTC share, conversion action, engagement quality | Tighten goals, exclude weak inventory, test incrementality |
| Remarketing CPA worsens | Optimized Targeting, frequency, audience recency, creative fatigue | Disable expansion, cap frequency, segment recency, refresh creative |
| Prospecting does not spend | Audience too narrow, bid target too tight, assets weak | Broaden, relax target, improve RDA coverage |
| High VTC share | VTC window, viewability, primary conversion settings | Report VTC separately, shorten window, use click/engaged signals |

### Common traps

- Running Display prospecting and P-MAX against the same goal and audience without defining different jobs.
- Chasing the lowest CPM while ignoring placement quality and downstream lead/sales quality.
- Optimizing to micro-conversions such as page views or newsletter signups when revenue quality matters.
- Refreshing all creative at once in a stable Smart Bidding campaign.

---

## 1. Ad formats

### 1-1. Responsive Display Ads (RDA)

**The current default format.** You upload images, logos, headlines, and descriptions, and Google's AI auto-adjusts the optimal combination and size for each placement.

- The vast majority of GDN image-ad inventory is now served in responsive form.
- A single asset set covers every placement; operations are lightweight.
- Google AI learns the best combination per surface and per user.

### 1-2. Uploaded display ads

Use when you want pixel-level design control.

| Type | Characteristics |
|---|---|
| Static image ads | JPG / PNG / GIF. Each size produced individually |
| Animated GIF | ≤30 s, ≤5 fps. File ≤150 KB |
| HTML5 ads | ZIP packages. Allows interactive expression |
| AMPHTML ads | AMP-compliant. Fast on mobile |

### 1-3. Video ads (display inventory)

- YouTube videos can be added as assets to a Responsive Display Ad.
- Up to 5 videos, each up to 30 seconds.
- Recommended aspect ratios: 16:9, 1:1, 4:3, 9:16.
- Ads with video assets tend to lift CTR over image-only.

---

## 2. Submission specs for Responsive Display Ads (RDA)

### Image assets

| Item | Spec |
|---|---|
| **Landscape (required)** | Aspect ratio 1.91:1 / recommended 1200×628 px / minimum 600×314 px |
| **Square (required)** | Aspect ratio 1:1 / recommended 1200×1200 px / minimum 300×300 px |
| **Portrait (optional)** | Aspect ratio 4:5 / recommended 1200×1500 px / minimum 320×400 px |
| File format | JPEG or PNG (animated GIF not supported) |
| File size | ≤5 MB each |
| Maximum count | **15 images** |
| Recommended count | 5–10 per aspect ratio |

**Note:** Google may crop or resize images to fit each placement. Keep important elements near the center (the safe zone).

### Logos

| Item | Spec |
|---|---|
| **Square logo** | Aspect ratio 1:1 / recommended 1200×1200 px / minimum 128×128 px |
| **Landscape logo (optional)** | Aspect ratio 4:1 / recommended 1200×300 px / minimum 512×128 px |
| File format | PNG with transparent background recommended (or JPG) |
| File size | ≤5 MB each |
| Maximum count | **5 logos** |

### Text assets

| Item | Spec | Notes |
|---|---|---|
| **Short headline** | Up to 30 characters × up to 5 | CJK characters are counted as 2 chars each (effectively 15 in CJK) |
| **Long headline** | Up to 90 characters × 1 | Effectively 45 in CJK |
| **Description** | Up to 90 characters × up to 5 | Effectively 45 in CJK |
| **Business name** | Up to 25 characters × 1 | Effectively 12–13 in CJK |
| **CTA (call-to-action phrase)** | Picked from a dropdown | "Auto" recommended; manual selection allowed |

**CJK character counting:** Japanese / Chinese / Korean characters count as 2 chars each. Latin alphanumerics count as 1 each.

### Video assets (optional)

| Item | Spec |
|---|---|
| Maximum count | 5 |
| Maximum duration | 30 seconds |
| Recommended aspect ratios | 16:9, 1:1, 4:3, 9:16 |
| Submission method | Specify the YouTube video URL |

### Asset-count summary

| Asset | Minimum | Recommended | Cap |
|---|---|---|---|
| Landscape image (1.91:1) | 1 | 5–10 | 15 (across all images) |
| Square image (1:1) | 1 | 5–10 | 15 (across all images) |
| Portrait image (4:5) | 0 | 2–5 | 15 (across all images) |
| Logo (1:1) | 1 | 2–3 | 5 |
| Logo (4:1) | 0 | 1–2 | 5 (across all logos) |
| Short headline | 1 | **5** | 5 |
| Long headline | 1 | 1 | 1 |
| Description | 1 | **5** | 5 |
| Video | 0 | 1–3 | 5 |

**Why upload more assets:** With multiple variations, Google AI can test more combinations and serve the optimal ad per surface and user. More useful variation usually improves learning quality, provided the assets are genuinely distinct.

---

## 3. Submission specs for uploaded display ads

### 3-1. Static image ads

#### Supported sizes

**Rectangles and squares**

| Size | Name | Use |
|---|---|---|
| 300×250 | Medium Rectangle | **Most important.** High inventory on both desktop and mobile |
| 336×280 | Large Rectangle | Desktop. High performance |
| 250×250 | Square | Desktop and mobile |
| 200×200 | Small Square | Desktop and mobile |

**Horizontal banners**

| Size | Name | Use |
|---|---|---|
| 728×90 | Leaderboard | **Important.** Common at the top of desktop pages |
| 468×60 | Banner | Desktop. Legacy size |
| 970×90 | Large Leaderboard | Desktop. For wider sites |
| 970×250 | Billboard | Desktop. Large display |
| 800×250 | — | Desktop |

**Vertical skyscrapers**

| Size | Name | Use |
|---|---|---|
| 300×600 | Half Page | **Important.** High visibility |
| 160×600 | Wide Skyscraper | Desktop sidebar. Stable delivery volume |
| 120×600 | Skyscraper | Desktop sidebar |
| 300×1050 | Portrait | Desktop. Large display |

**Mobile**

| Size | Name | Use |
|---|---|---|
| 320×50 | Mobile Banner | **Mobile must-have.** Highest inventory volume |
| 320×100 | Large Mobile Banner | **Mobile important.** High visibility |
| 320×480 | Mobile Interstitial | Mobile interstitial |
| 300×50 | — | Mobile |
| 300×100 | — | Mobile |
| 360×592 | — | Mobile |

#### Sizes to prioritize

When production resources are limited, build in this order:

1. **300×250** — largest inventory; works on desktop and mobile
2. **320×50** — highest mobile inventory
3. **728×90** — desktop staple
4. **320×100** — mobile, high visibility
5. **300×600** — desktop, high visibility
6. **160×600** — desktop sidebar staple

#### File specs

| Item | Spec |
|---|---|
| File format | JPEG, PNG, GIF (non-animated) |
| File size | **≤150 KB** |

### 3-2. Animated GIF ads

| Item | Spec |
|---|---|
| File format | GIF |
| File size | **≤150 KB** |
| Animation length | **≤30 s** |
| Frame rate | **≤5 fps** (≥200 ms between frames) |
| Supported sizes | Same as static images |

### 3-3. HTML5 ads

| Item | Spec |
|---|---|
| File format | ZIP (compressed package) |
| File size | **≤150 KB** (total of all assets) |
| Media asset count | Up to 39 files |
| Audio | Must start on user interaction (no autoplay) |
| Video | Click-to-play or muted autoplay |
| Supported sizes | Same as static images, plus 320×320, 360×592, etc. |

### 3-4. AMPHTML ads

| Item | Spec |
|---|---|
| Format | AMP-compliant HTML |
| Characteristics | Fast rendering. Optimized for mobile |
| Supported sizes | Same as HTML5 |

---

## 4. Creative-design best practices

### 4-1. Image-design principles

#### Do

| Principle | Description |
|---|---|
| Use high-quality images | Sharp, professional. Blurry / low-resolution images are unacceptable |
| Center the subject | Keeps the important element when Google crops |
| Keep composition simple | One clear message; cramming in elements backfires |
| Use high-contrast colors | Strong contrast between background and foreground; helps the ad stand out on the host site |
| Show the product / service | Real product photography or use cases drive stronger response |
| Maintain brand consistency | Color, fonts, and tone should follow the brand guidelines |
| Photography > illustration | Photography tends to outperform illustration for CTR / CVR |

#### Avoid in principle

| Item | Why | Note |
|---|---|---|
| Overlaying text on the image | Unreadable on small placements (320×50 etc.); duplicates the headline | If unavoidable: minimum 16 px font, high contrast, and ≤20% of image area |
| Including a logo inside the image | Logos should be uploaded as logo assets | RDA auto-renders logos; in-image logos cause double-display |
| Collage images | Hard to read at small sizes; one image, one message | — |
| Excessive filtering | Looks unnatural; preserve a natural look | — |
| Blurry / low-resolution | Low quality damages brand image | — |
| White-on-white-only images | The ad blends into white-background sites | Add a subtle border or background tone to define the boundary |

#### Hard prohibitions (policy violations)

| Item | Why |
|---|---|
| Fake UI elements that look like buttons | Misleading-policy violation; ad will be disapproved |
| Fake system warnings or notifications | Images that mimic virus warnings or OS notifications |

### 4-2. Text (headline / description) design principles

#### Short headlines (30 chars / effectively 15 in CJK)

- Convey the product, service, or brand clearly
- Including offers / pricing / promotions tends to lift CTR
- Each headline must stand alone
- Write all 5 from different angles (price, feature, emotion, scarcity, proof, etc.)

#### Long headline (90 chars / effectively 45 in CJK)

- Shown on placements where short headlines aren't displayed
- Wraps the value proposition into one sentence
- Sometimes shown without a description; must function alone

#### Descriptions (90 chars / effectively 45 in CJK)

- Provide supplementary info to the headline
- Include concrete benefits or CTA
- Make all 5 different and combinable with any headline
- Don't paraphrase the headline (Google auto-combines headline + description)

### 4-3. Choosing the CTA

| CTA | Best for |
|---|---|
| Automatic (recommended) | Google AI picks the best CTA. Use this when in doubt |
| Learn more | Information / awareness |
| Buy now | E-commerce, direct sales |
| Sign up | Registration, subscription |
| Contact us | B2B lead gen |
| Download | Apps, resources |

### 4-4. Design points for uploaded ads

| Point | Description |
|---|---|
| Make the CTA button stand out | Bold font + high-contrast button color |
| Guide the eye | Image → headline → CTA, in that natural flow |
| Use whitespace | Don't cram; keep breathing room |
| File size ≤150 KB | Use compression tools; load speed matters |
| Maintain consistency across sizes | Same brand experience even as the size changes |
| Keep animation restrained | Motion attracts attention but excess gets ignored |

### 4-5. Using video assets

- Display ads with video tend to lift CTR over image-only
- Convey the brand and value prop in the first 5 seconds
- Design for muted playback (text overlays, subtitles)
- Provide multiple aspect ratios (16:9 + 1:1 + 9:16) for broader inventory

---

## 5. Ad policies and rules

### 5-1. Editorial policy

Google Ads requires a clear, professional quality bar across every ad.

#### Text rules

| Category | Don't | Do |
|---|---|---|
| Excessive symbols | `!!!`, `???`, `★★★` | One punctuation mark at a time |
| ALL CAPS (English) | `FREE SHIPPING NOW` | `Free Shipping Now` |
| Meaningless symbols | `F₹€€!!`, `f-r-e-e` | Normal text |
| Vague copy | "Buy this product here" | Name the product or benefit specifically |
| Spaced-out characters | `B u y N o w` | `Buy Now` |
| Phone numbers in body copy | Phone number inside the text | Use the call extension instead |

#### Image rules

| Category | Prohibited |
|---|---|
| Blurry / low-resolution | Pixelated images |
| Excessive color inversion / filtering | Unnatural processing |
| Tilted / inverted images | Show the correct orientation |
| Illegible text | In-image text too small to read |
| Fake UI elements (buttons, etc.) | Images that look clickable when they aren't |

### 5-2. No clickbait or misleading ads

These tactics result in disapproval:

| Prohibited tactic | Examples |
|---|---|
| Sensationalism | "Shocking truth revealed", "Unbelievable results" |
| Click-bait phrasing | "Click here to confirm", "Don't miss this" |
| Before / after body images | Comparison images showing dramatic body change |
| Disaster / accident imagery | Real accident photos used to drive fear |
| Emotional manipulation | Fear / guilt around death, arrest, or illness |
| Over-zoomed body parts | Obviously edited zoom-in images |

### 5-3. Restricted content

Allowed but constrained:

| Category | Restriction |
|---|---|
| Alcohol | Per local law; no targeting minors |
| Gambling | Pre-certification required; geographic restrictions |
| Healthcare / pharma | Per local law and certification |
| Financial services | Required disclosures (rates, fees) in some markets |
| Political ads | Identity verification, geographic restrictions |

### 5-4. Prohibited content

| Category | Content |
|---|---|
| Counterfeits | Promotion of counterfeit branded goods |
| Dangerous products | Drugs, weapons, explosives, etc. |
| Enabling dishonest behavior | Hacking, fake document services, etc. |
| Inappropriate content | Hate, violence, adult content, etc. |

### 5-5. Landing-page requirements

| Requirement | Description |
|---|---|
| Match the displayed URL | Display URL and landing-page domain must match |
| Page must work | No under-construction or error pages |
| Browser back button | Must not be disabled |
| Useful content | Must offer value to the user |
| Mobile-ready | Must render correctly on mobile |

### 5-6. Handling policy violations

1. **Warning**: usually a 7-day warning is issued for the first violation
2. **Ad disapproval**: the specific ad is paused
3. **Account suspension**: possible for repeated serious violations
4. **Appeal**: can be filed from the Google Ads UI

---

## 6. Targeting strategy

### 6-1. Audience targeting

| Type | Content | Best for |
|---|---|---|
| **Affinity** | Segments based on interests / habits | Awareness (top funnel) |
| **In-market** | Users actively researching specific products / services | Consideration (mid funnel) |
| **Custom segments** | Custom-defined via keywords / URLs / apps | Flexible targeting |
| **Remarketing** | Users who already visited the site | Conversion (bottom funnel) |
| **Customer Match** | Upload your own customer list (emails, etc.) | Reach existing customers; seeding |
| **Demographics** | Age, gender, household income, parental status | Attribute-based filtering |
| **Life events** | Marriage, moving, graduation, etc. | Reach at moments of life-stage change |

### 6-2. Content targeting

| Type | Content |
|---|---|
| **Keywords** | Pages with content related to specified keywords |
| **Topics** | Pages related to specified topics |
| **Placements** | Specific websites, apps, or YouTube channels |

### 6-3. Optimized Targeting

- On by default at the ad-group level for Display campaigns
- Google AI expands beyond the manually-set targeting to users likely to convert
- Uses first-party data (remarketing lists, Customer Match) as a seed and expands to similar users (effectively the successor of "Similar Audiences")
- Helpful in the early stage or with low conversion volume; precision improves with more conversion data
- Consider turning OFF when you want to keep tight control (recommend A/B testing ON/OFF for Prospecting vs Remarketing)

### 6-4. Targeting vs Observation

When adding audience segments to a Display campaign, choose between Targeting and Observation:

| Mode | Behavior | Use |
|---|---|---|
| **Targeting** | Restricts delivery to the specified audience / content only | When you want to narrow reach |
| **Observation** | Doesn't narrow reach; reports performance for the specified condition | Data collection → bid-adjustment input. Use when you want to evaluate performance without losing reach |

**Pattern:** Use Targeting for remarketing lists (where narrowing is the point), and Observation for affinity / demographics (gather data first, then potentially switch to Targeting later).

### 6-5. Old-term → current-UI mapping

| Old term | Current (as of 2026) | Notes |
|---|---|---|
| Similar Audiences (similar segments) | **Sunset** (August 2023) | Replacement: Optimized Targeting + first-party data |
| Lookalike audiences | **Sunset** | Same as above |
| Lookalike segments | **Demand Gen only** (not available in Display campaigns) | In Demand Gen, expand from Customer Match etc. |
| Audience expansion | Merged into **Optimized Targeting** | Renamed and re-UI'd |

### 6-6. Targeting design notes

| Note | Description |
|---|---|
| Don't over-narrow | Stacking multiple targeting layers can collapse delivery volume |
| Separate remarketing into its own ad group | Different message vs prospecting; isolate them |
| Use exclusions as well | Excluding unwanted audiences / placements cuts waste |
| Demographics "Unknown" | Excluding "Unknown" can cut reach significantly. Decide carefully |

---

## 7. Bidding strategies (Display-specific)

### 7-1. Smart Bidding (recommended)

| Strategy | Goal | When to use |
|---|---|---|
| **Maximize Conversions** | Maximize CV count | CV tracking is live but no target CPA yet |
| **Target CPA** | Maximize CV count at the specified CPA | Sufficient CV history (rough guideline: 30+ per month) |
| **Maximize Conversion Value** | Maximize CV value (e.g. revenue) | CV value is set up |
| **Target ROAS** | Maximize CV value at the specified ROAS | Sufficient CV-value data |

### 7-2. Display-specific bid strategies

| Strategy | Goal | Notes |
|---|---|---|
| **Viewable CPM (vCPM)** | Cost per 1,000 viewable impressions | Useful for awareness goals; for Display / Video |

**Note:** Enhanced CPC (eCPC) was sunset for Search and Display campaigns in March 2025. Existing eCPC campaigns now run as Manual CPC.

### 7-3. Bid-strategy decision flow for Display

```
Is conversion tracking live?
├── No → Maximize Clicks / Manual CPC / vCPM
└── Yes → Are monthly conversions ≥ 30?
    ├── No → Maximize Conversions (accumulate learning data)
    └── Yes → Is conversion value (revenue, etc.) being tracked?
        ├── No → Target CPA
        └── Yes → Target ROAS
```

---

## 8. Measurement and evaluation (Display version)

Display ads behave differently from Search — "non-click contribution," "view-through touchpoints," and "accidental clicks" are common. Evaluating Display purely on Search-style CPA either undervalues Display or leaves wasteful delivery untouched.

### 8-1. View-through conversions (VTC)

Counted when the user saw the ad (didn't click), then later visited the site directly and converted.

| Item | Description |
|---|---|
| Counting condition | Active View — at least 50% of the ad shown for ≥1 second |
| Default measurement window | 1 day |
| Adjustable range | 1 to 30 days |
| Dedup | If the same user later clicks the ad, the click CV takes priority and the VTC is excluded |

**VTC operating policy:**

Per the unified VTC policy in SKILL.md, treat VTC as follows:

| Policy | Use | Conditions |
|---|---|---|
| **Monitoring only (recommended starting point)** | VTC kept as Secondary CV; not used for bid optimization. Tracked as a reference signal for awareness efforts | Use this by default |
| **Include in bidding** | Set the window to 1 day and include VTC in Primary CV for bid optimization | Only when remarketing has sufficient CV volume (30+ per month) and VTC is <50% of total CVs |

**Note:** Overweighting VTC risks budget flowing to impressions that don't actually drive conversions. Keeping the VTC window short (1 day) helps prevent inflation. Always track both the VTC-included CPA / ROAS and the click-only CPA / ROAS in parallel.

### 8-2. Primary vs Secondary conversions

Google Ads lets you classify CV actions as Primary or Secondary.

| Type | Bid optimization | Reporting | Display use |
|---|---|---|---|
| **Primary** | Used | Counts in the "Conversions" column | CV actions you want the bid strategy to optimize for (purchase, form fill, etc.) |
| **Secondary** | Not used | Only in "All conversions" | Monitoring only (page views, scrolls, VTC, etc.) |

**Design examples:**

| Business | Primary | Secondary |
|---|---|---|
| E-commerce | Purchase | Add to cart, product view |
| B2B lead gen | Form submit | Resource downloads, click-to-call, VTC |
| Awareness goal | — (no CV; vCPM bidding) | Site visits, time on page |

### 8-3. KPIs by goal

The right metrics for Display vary dramatically by goal.

| Goal | Primary KPIs | Secondary KPIs |
|---|---|---|
| **Awareness** | vCPM (viewable CPM), reach, frequency | Brand-search lift, change in direct site traffic |
| **Consideration** | CTR, LP bounce rate, time on page | Micro-CV (resource DL, video views) |
| **Conversion acquisition** | CPA, CV count, ROAS | VTC, assist CV, LTV |
| **Remarketing** | CPA, CV count, ROAS | VTC, frequency, list utilization |

### 8-4. Incremental evaluation (lightweight)

Methods for verifying that Display is actually generating incremental conversions.

| Method | How | Precision |
|---|---|---|
| **Geographic holdout** | Compare CV rate in Region A (with delivery) vs Region B (without) | Mid–high |
| **Period on / off** | Pause Display for a defined period; compare CV count and brand-search volume before vs after | Mid |
| **Optimized Targeting on / off** | Compare ad groups under the same conditions with Optimized Targeting on vs off | Mid |
| **Prospecting vs Remarketing split** | Split into separate campaigns to surface each side's incremental contribution | Mid |
| **Conversion Lift** | Use the platform lift-measurement workflow when eligible | High |

### 8-5. Landing-page requirements (Display-specific)

Users land on Display ads passively, so LP drop-off is more common than from Search.

| Requirement | Why |
|---|---|
| **Message match** | Ad visual / headline must align with the LP's first view; mismatches cause immediate exits |
| **Load speed** | Render within 3 seconds on mobile. Display traffic skews mobile-heavy |
| **Clear CTA** | The first view must answer "what should I do here?" |
| **Form simplicity** | For lead gen, minimize the number of form fields |

---

## 9. Campaign structure and operating design

### 9-1. Why split campaigns

| Split axis | Examples | Reason |
|---|---|---|
| **By goal** | Awareness / remarketing / CV acquisition | Different bid strategies and KPIs |
| **By product** | Product A / Product B | Manage budgets independently |
| **By geography** | Domestic / international | Different targeting and messaging |

### 9-2. Recommended campaign-structure template

For Display, the foundational rule is: **don't mix Prospecting (new users) with Remarketing.** A 3-campaign structure is the recommended template.

```
Display (3-campaign structure)
│
├── Campaign 1: [Display] Prospecting - {product}
│   ├── Bid: Maximize Conversions or Target CPA
│   ├── Targeting: Affinity / In-Market / Custom segments
│   ├── Optimized Targeting: ON (initially; A/B test ON/OFF after data accumulates)
│   ├── Exclusion: remarketing list (existing visitors / converters)
│   └── AG1: theme A / AG2: theme B ...
│
├── Campaign 2: [Display] Remarketing - {product}
│   ├── Bid: Target CPA or Maximize Conversions
│   ├── Targeting: remarketing lists
│   │   ├── AG1: site visit (within 7 days)
│   │   ├── AG2: site visit (8–30 days)
│   │   └── AG3: cart abandonment / form abandonment, etc.
│   ├── Optimized Targeting: OFF (remarketing keeps targeting tight)
│   └── Exclusion: converted users
│
└── Campaign 3: [Display] Awareness - {product} (only when awareness is the goal)
    ├── Bid: vCPM or Maximize Clicks
    ├── Targeting: broader audiences
    ├── Frequency cap: 3–5 / day
    └── KPIs: reach, vCPM, brand-search lift
```

**Points:**
- Exclude the remarketing list from the Prospecting campaign to prevent overlap.
- Turn Optimized Targeting OFF on Remarketing to keep audience control tight.
- Heavy accidental-click traffic from in-app inventory? Use placement exclusions (see Section 10).

### 9-3. Ad-group design

| Principle | Description |
|---|---|
| One theme | One ad group = one targeting theme |
| Separate remarketing | Prospecting and remarketing belong in different ad groups |
| Message match | Creative tailored to each target audience |
| Ad count | 3–4 Responsive Display Ads per ad group |

### 9-4. Frequency cap

| Item | Setting |
|---|---|
| Scope | Campaign / ad group / ad |
| Period | Day / week / month |
| Counting basis | Viewable impressions only (Display campaigns) |

**Recommended values:**
- Awareness goal: 3–5 / day
- Remarketing: 1–3 / day
- Loosen the cap when delivery volume is low to validate

### 9-5. Geo, language, and device settings

| Setting | Notes |
|---|---|
| **Geography** | Watch the default "Presence or interest" setting. If you don't want interest-based delivery, change to "Presence only" |
| **Language** | Filters by browser language. For Japanese-language sites, use "Japanese" + "English" (bilingual fallback) |
| **Device** | Under Smart Bidding, device bid adjustments are effectively neutralized. For device-specific strategies, split structurally (campaign-level) |

---

## 10. Brand safety and placement management

### 10-1. Inventory types

| Type | Content | Recommended for |
|---|---|---|
| **Expanded inventory** | Delivery to all monetized content, including strong content | Maximum reach; few brand constraints |
| **Standard inventory** | Content suitable for the majority of brands | **Default recommended** |
| **Limited inventory** | Strict exclusion of strong language and sexual content | Brands with strict guidelines |

### 10-2. Content-type exclusions

#### Sensitive content exclusions

| Category | Description |
|---|---|
| Tragedy and conflict | War, natural disasters, social tragedies |
| Sensitive social issues | Race, religion, sexual orientation, etc. |
| Profanity | Content with vulgar language |
| Sexually suggestive | Sexually suggestive content |
| Sensational and shocking | Excessively stimulating content |

#### Content-type exclusions

| Type | Recommendation |
|---|---|
| Live streaming | Cannot be pre-vetted; recommend exclusion |
| Embedded YouTube videos | Embedded videos on sites; exclude when context is unclear |
| Below the fold | Ad slots that require scrolling to be seen |
| Parked domains | Empty domains; recommend exclusion |

### 10-3. Placement exclusions

| Level | Description |
|---|---|
| Account level | Applies to all campaigns; the brand-safety baseline |
| Campaign level | Applies only to specific campaigns |
| Ad group level | Most granular |

**Note:** Exclusions are additive. A placement excluded at the account level cannot be re-enabled at the campaign level.

#### Placements to consider excluding

| Category | Why |
|---|---|
| Mobile apps (when not needed) | High accidental clicks. Exclude `adsenseformobileapps.com` |
| Game apps | Accidental clicks in kid-oriented apps; brand mismatch |
| Underperforming sites | Identify low-CTR / low-CVR sites in the placement report |
| Brand-incompatible sites | Sites that don't match the industry or brand image |

### 10-4. Weekly placement-review process

1. **Check the placement report**: Campaign → Content → Where ads showed; review every site / app delivered to.
2. **Spot accidental-click signals**: Placements with abnormally high CTR (e.g. >5%) and zero CVs are likely accidental clicks.
3. **Exclude low-quality placements**: Sites with high impressions but very low CTR / CVR get added to the exclusion list.
4. **Verify brand fit**: Eyeball the site name / URL of each delivered placement and exclude anything brand-inappropriate.
5. **Build up the exclusion list**: Maintain an account-level exclusion list and apply it to new campaigns.

### 10-5. Excluding mobile apps

Mobile apps have many accidental taps and frequently include brand-incompatible apps.

| Method | Steps |
|---|---|
| **Bulk exclude via URL** | Add `adsenseformobileapps.com` to placement exclusions (excludes all GDN apps) |
| **Exclude app categories** | Campaign settings → Content exclusions → Choose app categories (game, entertainment, etc.) |
| **Exclude individual apps** | Identify low-performing app IDs in the placement report and add them to placement exclusions |

**Recommended:** Start with category exclusions instead of full-app exclusion, then adjust based on performance. Full exclusion drastically reduces reach.

---

## 11. Ad Strength and optimization

### 11-1. What is Ad Strength

A rating shown when creating Responsive Display Ads. Evaluates asset volume, diversity, and quality on a 4-tier scale: Poor / Average / Good / Excellent.

### 11-2. Aiming for "Excellent"

| Element | Recommendation |
|---|---|
| Short headlines | Fill all 5; vary the angles |
| Long headline | 1; concise value prop |
| Descriptions | Fill all 5; don't duplicate headlines |
| Landscape images | 5+ |
| Square images | 5+ |
| Logos | At least 1; ideally both 1:1 and 4:1 |

### 11-3. Asset performance report

Once enough data accumulates, each asset (headline, description, image) gets a performance label:

| Label | Meaning | Action |
|---|---|---|
| Best | Outperforming peers of the same kind | Keep; test similar variations |
| Good | Average performance | Keep; test improved versions |
| Low | Underperforming peers of the same kind | Replace with new assets |
| Learning | Still gathering data | Wait for results |

### 11-4. Creative refresh cycle

| Period | Action |
|---|---|
| Launch through week 2 | Learning period; avoid major changes |
| Weeks 2–4 | Check asset performance; identify "Low" assets |
| After week 4 | Replace low-performing assets; add new creative |
| Ongoing | Refresh creative every 2–4 weeks to prevent ad fatigue |

---

## 12. Operations checklist

### Pre-launch checks

- [ ] Conversion tracking is correctly configured
- [ ] Image assets uploaded for both landscape and square (minimum 1 each, recommended 5+ each)
- [ ] Logo uploaded
- [ ] 5 short headlines and 5 descriptions uploaded
- [ ] 1 long headline uploaded
- [ ] Business name set
- [ ] Ad Strength is "Good" or higher
- [ ] Targeting set appropriately (remarketing and prospecting in separate ad groups)
- [ ] Geo setting confirmed: "Presence only" vs "Presence or interest"
- [ ] Placement exclusions set (mobile apps etc.)
- [ ] Content exclusions set (parked domains etc.)
- [ ] Frequency cap set
- [ ] Bid strategy confirmed
- [ ] Daily budget set appropriately
- [ ] Primary / Secondary conversion assignments confirmed
- [ ] View-through-conversion window confirmed
- [ ] LP renders within 3 seconds on mobile

### Weekly checks

- [ ] Delivery volume (imp / click / cost) trend
- [ ] CTR (any sharp drops?)
- [ ] CV count, CPA, ROAS
- [ ] VTC trend
- [ ] Placement report (any inappropriate sites or accidental-click signals?)
- [ ] Add new placement exclusions

### Monthly checks

- [ ] Asset performance report
- [ ] Replace "Low" assets
- [ ] Add new creative for testing
- [ ] Targeting effectiveness (segment-level performance)
- [ ] Frequency (impressions per reach)
- [ ] Budget reallocation
- [ ] Bid-strategy validity

---

## 13. Relationship with Demand Gen campaigns (2025+)

### Overview

Starting April 2025, Demand Gen campaigns expanded delivery to include GDN image inventory. This means Demand Gen now delivers to:

- YouTube (in-feed, Shorts, etc.)
- Discover
- Gmail
- **Google Display Network (GDN)** ← added 2025

### Display campaign vs Demand Gen

| Item | Display campaign | Demand Gen |
|---|---|---|
| Surfaces | GDN only | YouTube + Discover + Gmail + GDN |
| Creative | Image + text (+ video) | Image + video + text (rich) |
| Targeting | Audiences + content + Optimized Targeting | Lookalike + audiences + Optimized Targeting |
| Main use | Awareness through CV (broad) | Demand creation, consideration |
| AI utilization | Mid | High (strong surface / creative optimization) |

### How to choose

- **Display campaign**: When you need GDN-specific control or want to use content targeting (keywords, topics, placements).
- **Demand Gen**: When you want unified reach across YouTube, Discover, and Gmail, or want to leverage video creative.
