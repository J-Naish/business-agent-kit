# Google Display Ads

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

## 2. Submission specs

Use [creative-strategy.md](creative-strategy.md#display-baseline) for production specs. Display-specific planning rules:

- Prefer Responsive Display Ads unless strict layout control is required.
- Uploaded display ads are useful for brand-control cases, but production should prioritize high-inventory sizes first.
- Keep important visual elements centered because Google may crop responsive assets.
- Text-heavy images usually underperform and can create policy / delivery risk.
- If video is used, evaluate EVC and VTC separately from click-based CPA.

---

## 3. Creative-design best practices

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

## 4. Ad policies and rules

Treat Display policy work as a launch-risk screen, not a static policy manual. Verify the current Google Ads policy before launch, especially in regulated categories.

| Area | What to check before launch |
|---|---|
| Editorial quality | No excessive symbols, gimmicky capitalization, vague copy, phone numbers in body copy, blurry images, fake UI, or illegible text |
| Misleading / clickbait | No sensational phrasing, deceptive prompts, fear-based imagery, before/after body claims, or over-edited body-part imagery |
| Restricted categories | Alcohol, gambling, healthcare/pharma, financial services, political ads, adult content, and other regulated verticals may need certification, geo limits, disclosures, or exclusions |
| Prohibited content | Counterfeits, dangerous products, dishonest behavior, hate/violence, and other disallowed content must be excluded entirely |
| Landing page | Domain must match, page must work, browser navigation must not be blocked, content must be useful, and mobile rendering must be acceptable |

If disapproved, diagnose the exact policy reason in Google Ads, fix the ad or LP, document the change, and request review only when the underlying issue has been resolved.

---

## 5. Targeting strategy

### 5-1. Audience targeting

| Type | Content | Best for |
|---|---|---|
| **Affinity** | Segments based on interests / habits | Awareness (top funnel) |
| **In-market** | Users actively researching specific products / services | Consideration (mid funnel) |
| **Custom segments** | Custom-defined via keywords / URLs / apps | Flexible targeting |
| **Remarketing** | Users who already visited the site | Conversion (bottom funnel) |
| **Customer Match** | Upload your own customer list (emails, etc.) | Reach existing customers; seeding |
| **Demographics** | Age, gender, household income, parental status | Attribute-based filtering |
| **Life events** | Marriage, moving, graduation, etc. | Reach at moments of life-stage change |

### 5-2. Content targeting

| Type | Content |
|---|---|
| **Keywords** | Pages with content related to specified keywords |
| **Topics** | Pages related to specified topics |
| **Placements** | Specific websites, apps, or YouTube channels |

### 5-3. Optimized Targeting

- On by default at the ad-group level for Display campaigns
- Google AI expands beyond the manually-set targeting to users likely to convert
- Uses first-party data (remarketing lists, Customer Match) as a seed and expands to similar users (effectively the successor of "Similar Audiences")
- Helpful in the early stage or with low conversion volume; precision improves with more conversion data
- Consider turning OFF when you want to keep tight control (recommend A/B testing ON/OFF for Prospecting vs Remarketing)

### 5-4. Targeting vs Observation

When adding audience segments to a Display campaign, choose between Targeting and Observation:

| Mode | Behavior | Use |
|---|---|---|
| **Targeting** | Restricts delivery to the specified audience / content only | When you want to narrow reach |
| **Observation** | Doesn't narrow reach; reports performance for the specified condition | Data collection → bid-adjustment input. Use when you want to evaluate performance without losing reach |

**Pattern:** Use Targeting for remarketing lists (where narrowing is the point), and Observation for affinity / demographics (gather data first, then potentially switch to Targeting later).

### 5-5. Old-term → current-UI mapping

| Old term | Current (as of 2026) | Notes |
|---|---|---|
| Similar Audiences (similar segments) | **Sunset** (August 2023) | Replacement: Optimized Targeting + first-party data |
| Lookalike audiences | **Sunset** | Same as above |
| Lookalike segments | **Demand Gen only** (not available in Display campaigns) | In Demand Gen, expand from Customer Match etc. |
| Audience expansion | Merged into **Optimized Targeting** | Renamed and re-UI'd |

### 5-6. Targeting design notes

| Note | Description |
|---|---|
| Don't over-narrow | Stacking multiple targeting layers can collapse delivery volume |
| Separate remarketing into its own ad group | Different message vs prospecting; isolate them |
| Use exclusions as well | Excluding unwanted audiences / placements cuts waste |
| Demographics "Unknown" | Excluding "Unknown" can cut reach significantly. Decide carefully |

---

## 6. Bidding strategies (Display-specific)

### 6-1. Smart Bidding (recommended)

| Strategy | Goal | When to use |
|---|---|---|
| **Maximize Conversions** | Maximize CV count | CV tracking is live but no target CPA yet |
| **Target CPA** | Maximize CV count at the specified CPA | Sufficient CV history (rough guideline: 30+ per month) |
| **Maximize Conversion Value** | Maximize CV value (e.g. revenue) | CV value is set up |
| **Target ROAS** | Maximize CV value at the specified ROAS | Sufficient CV-value data |

### 6-2. Display-specific bid strategies

| Strategy | Goal | Notes |
|---|---|---|
| **Viewable CPM (vCPM)** | Cost per 1,000 viewable impressions | Useful for awareness goals; for Display / Video |

**Note:** Enhanced CPC (eCPC) is no longer available for Search and Display campaigns; campaigns that were not proactively migrated now effectively use Manual CPC ([Google Ads Help](https://support.google.com/google-ads/answer/2464964?hl=en)).

### 6-3. Bid-strategy decision flow for Display

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

## 7. Measurement and evaluation (Display version)

Display ads behave differently from Search — "non-click contribution," "view-through touchpoints," and "accidental clicks" are common. Evaluating Display purely on Search-style CPA either undervalues Display or leaves wasteful delivery untouched.

### 7-1. View-through conversions (VTC)

Counted when the user saw the ad, did not interact with it, and later converted within the view-through window.

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
| **Monitoring only (recommended starting point)** | VTC reported in View-through conversions / All conversions; not used as the main optimization signal | Use this by default |
| **Use as supporting evidence** | Pair VTC with click / EVC, frequency, placement quality, lift tests, and backend outcomes | Especially useful for remarketing and awareness readouts |

**Note:** Overweighting VTC risks budget flowing to impressions that don't actually drive conversions. Keeping the VTC window short (1 day) helps prevent inflation. Always track click-based / EVC performance and VTC-assisted contribution separately.

### 7-2. Primary vs Secondary conversions

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

### 7-3. KPIs by goal

The right metrics for Display vary dramatically by goal.

| Goal | Primary KPIs | Secondary KPIs |
|---|---|---|
| **Awareness** | vCPM (viewable CPM), reach, frequency | Brand-search lift, change in direct site traffic |
| **Consideration** | CTR, LP bounce rate, time on page | Micro-CV (resource DL, video views) |
| **Conversion acquisition** | CPA, CV count, ROAS | VTC, assist CV, LTV |
| **Remarketing** | CPA, CV count, ROAS | VTC, frequency, list utilization |

### 7-4. Incremental evaluation (lightweight)

Methods for verifying that Display is actually generating incremental conversions.

| Method | How | Precision |
|---|---|---|
| **Geographic holdout** | Compare CV rate in Region A (with delivery) vs Region B (without) | Mid–high |
| **Period on / off** | Pause Display for a defined period; compare CV count and brand-search volume before vs after | Mid |
| **Optimized Targeting on / off** | Compare ad groups under the same conditions with Optimized Targeting on vs off | Mid |
| **Prospecting vs Remarketing split** | Split into separate campaigns to surface each side's incremental contribution | Mid |
| **Conversion Lift** | Use the platform lift-measurement workflow when eligible | High |

### 7-5. Landing-page requirements (Display-specific)

Users land on Display ads passively, so LP drop-off is more common than from Search.

| Requirement | Why |
|---|---|
| **Message match** | Ad visual / headline must align with the LP's first view; mismatches cause immediate exits |
| **Load speed** | Render within 3 seconds on mobile. Display traffic skews mobile-heavy |
| **Clear CTA** | The first view must answer "what should I do here?" |
| **Form simplicity** | For lead gen, minimize the number of form fields |

---

## 8. Campaign structure and operating design

### 8-1. Why split campaigns

| Split axis | Examples | Reason |
|---|---|---|
| **By goal** | Awareness / remarketing / CV acquisition | Different bid strategies and KPIs |
| **By product** | Product A / Product B | Manage budgets independently |
| **By geography** | Domestic / international | Different targeting and messaging |

### 8-2. Recommended campaign-structure template

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

### 8-3. Ad-group design

| Principle | Description |
|---|---|
| One theme | One ad group = one targeting theme |
| Separate remarketing | Prospecting and remarketing belong in different ad groups |
| Message match | Creative tailored to each target audience |
| Ad count | 3–4 Responsive Display Ads per ad group |

### 8-4. Frequency cap

| Item | Setting |
|---|---|
| Scope | Campaign / ad group / ad |
| Period | Day / week / month |
| Counting basis | Viewable impressions only (Display campaigns) |

**Recommended values:**
- Awareness goal: 3–5 / day
- Remarketing: 1–3 / day
- Loosen the cap when delivery volume is low to validate

### 8-5. Geo, language, and device settings

| Setting | Notes |
|---|---|
| **Geography** | Watch the default "Presence or interest" setting. If you don't want interest-based delivery, change to "Presence only" |
| **Language** | Filters by browser language. For Japanese-language sites, use "Japanese" + "English" (bilingual fallback) |
| **Device** | Under Smart Bidding, device bid adjustments are effectively neutralized. For device-specific strategies, split structurally (campaign-level) |

---

## 9. Brand safety and placement management

### 9-1. Inventory types

| Type | Content | Recommended for |
|---|---|---|
| **Expanded inventory** | Delivery to all monetized content, including strong content | Maximum reach; few brand constraints |
| **Standard inventory** | Content suitable for the majority of brands | **Default recommended** |
| **Limited inventory** | Strict exclusion of strong language and sexual content | Brands with strict guidelines |

### 9-2. Content-type exclusions

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

### 9-3. Placement exclusions

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

### 9-4. Weekly placement-review process

1. **Check the placement report**: Campaign → Content → Where ads showed; review every site / app delivered to.
2. **Spot accidental-click signals**: Placements with abnormally high CTR (e.g. >5%) and zero CVs are likely accidental clicks.
3. **Exclude low-quality placements**: Sites with high impressions but very low CTR / CVR get added to the exclusion list.
4. **Verify brand fit**: Eyeball the site name / URL of each delivered placement and exclude anything brand-inappropriate.
5. **Build up the exclusion list**: Maintain an account-level exclusion list and apply it to new campaigns.

### 9-5. Excluding mobile apps

Mobile apps have many accidental taps and frequently include brand-incompatible apps.

| Method | Steps |
|---|---|
| **Bulk exclude via URL** | Add `adsenseformobileapps.com` to placement exclusions (excludes all GDN apps) |
| **Exclude app categories** | Campaign settings → Content exclusions → Choose app categories (game, entertainment, etc.) |
| **Exclude individual apps** | Identify low-performing app IDs in the placement report and add them to placement exclusions |

**Recommended:** Start with category exclusions instead of full-app exclusion, then adjust based on performance. Full exclusion drastically reduces reach.

---

## 10. Ad Strength and optimization

### 10-1. What is Ad Strength

A rating shown when creating Responsive Display Ads. Evaluates asset volume, diversity, and quality on a 4-tier scale: Poor / Average / Good / Excellent.

### 10-2. Aiming for "Excellent"

| Element | Recommendation |
|---|---|
| Short headlines | Fill all 5; vary the angles |
| Long headline | 1; concise value prop |
| Descriptions | Fill all 5; don't duplicate headlines |
| Landscape images | 5+ |
| Square images | 5+ |
| Logos | At least 1; ideally both 1:1 and 4:1 |

### 10-3. Asset performance report

Once enough data accumulates, each asset (headline, description, image) gets a performance label:

| Label | Meaning | Action |
|---|---|---|
| Best | Outperforming peers of the same kind | Keep; test similar variations |
| Good | Average performance | Keep; test improved versions |
| Low | Underperforming peers of the same kind | Replace with new assets |
| Learning | Still gathering data | Wait for results |

### 10-4. Creative refresh cycle

| Period | Action |
|---|---|
| Launch through week 2 | Learning period; avoid major changes |
| Weeks 2–4 | Check asset performance; identify "Low" assets |
| After week 4 | Replace low-performing assets; add new creative |
| Ongoing | Refresh creative every 2–4 weeks to prevent ad fatigue |

---

## 11. Operations checklist

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

## 12. Relationship with Demand Gen campaigns (2025+)

### Overview

Demand Gen campaigns expanded delivery to include GDN image inventory ([Google Ads Help](https://support.google.com/google-ads/answer/15890515?hl=en)). This means Demand Gen now delivers to:

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
