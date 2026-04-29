# Google App Campaigns

## Operating practice

App campaigns are highly automated. The real levers are event choice, event quality, budget-to-bid ratio, creative variety, geo/platform split, and patience during learning.

### What matters most

- **Pick the deepest event with stable volume, not the deepest event available.** Bidding to purchase is correct only when purchases are frequent enough. If not, use a proxy event that correlates with LTV and audit that correlation.
- **Creative is the main controllable lever.** Ship distinct concepts, especially video. App campaigns need variety across motivations, use cases, objections, gameplay/product moments, and user benefits.
- **Budget-to-bid ratio matters.** Underfunded tCPI/tCPA campaigns cannot explore enough auctions. Respect the setup guidance before diagnosing the algorithm.
- **Do not mix unequal actions under one target.** If trial start, subscription, purchase, and tutorial completion have different values, define values or choose the primary event carefully.
- **iOS attribution will not reconcile perfectly.** SKAN, MMP, and Google's reported numbers can diverge. Use each for its role: SKAN for directional privacy-safe truth, MMP for cross-network ops, Google numbers for bidding reality.
- **ACe needs incrementality skepticism.** Re-engagement campaigns can capture users who would have returned organically. Use holdouts or conservative reporting where stakes are high.
- **Learning is easy to break.** Changing bid targets, budgets, geos, or creative wholesale can reset momentum. Add creative gradually and make target moves deliberately.

- **Launch shallower, graduate deeper.** For cold app acquisition, tCPI or a higher-volume in-app event can seed learning; move toward tCPA/tROAS only when the deeper event has stable volume and reliable value.
- **Proxy events need business validation.** Tutorial complete, add-to-cart, paywall view, level complete, or trial start are useful only if they correlate with retention/LTV. Audit that correlation periodically.
- **Video refresh is usually the first creative priority.** Text assets can last longer; video fatigue tends to show earlier, especially at scale.
- **Do not call trims "creative variety."** Multiple lengths or aspect ratios of the same idea help coverage, but the algorithm also needs different motivations, use cases, emotional hooks, and proof points.
- **ACe should be tested for incrementality.** Returning users often come back without ads. Use audience holdouts, geo tests, or conservative attribution before scaling re-engagement purely from platform ROAS.
- **Web-to-App Connect is a strategic lever when web traffic exists.** Deep links, event passing, and attribution plumbing are operationally heavy, but can improve user quality when the same users discover on web and convert in app.
- **Seasonal spikes require target planning.** If CPM/CPI rises predictably, adjust targets and budgets before the peak rather than reacting mid-spike.

### Diagnosis

| Symptom | First checks | Likely action |
|---|---|---|
| Installs but poor quality | Optimization event, post-install funnel, MMP/Firebase mapping | Move deeper if volume allows, improve event quality, use value bidding |
| Low spend | Budget-to-bid ratio, app eligibility, policy, geo, bid target | Raise budget/target, fix eligibility, broaden geo/assets |
| tROAS unstable | Purchase volume, value schema, campaign splits | Use proxy event, consolidate, fix value mapping |
| iOS numbers disagree | SKAN schema, SDK init, postback timing, MMP mapping | Treat normal gaps as methodology; investigate large gaps |
| Creative fatigue | Asset ratings, spend concentration, age of concepts | Add new video/concept families, not just trims |

### Common traps

- Optimizing forever to installs when retention or revenue is the real goal.
- Jumping to tROAS before purchase/value volume is stable.
- Uploading many cuts of the same creative concept and calling it variety.
- Changing targets and creative during the first learning window because early results look noisy.

Terms used across playbooks live in [SKILL.md glossary](../SKILL.md#common-google-ads-glossary).

## Campaign-type cheat sheet

| Goal | Campaign type | Bid strategy | Daily budget guideline | Main surfaces |
|---|---|---|---|---|
| **New-install acquisition** | ACi (install-optimized) | tCPI | tCPI × 50 or higher | Search, Play, YouTube, Display, etc. |
| **In-app action acquisition** | ACi (action-optimized) | tCPA | tCPA × 10 or higher | Search, Play, YouTube, Display, etc. |
| **Revenue maximization** | ACi (ROAS-optimized) | tROAS | Sufficient budget | Search, Play, YouTube, Display, etc. |
| **Re-engagement of existing users** | ACe | tCPA | tCPA × 15 or higher | Search, YouTube, Display, etc. |
| **Pre-launch pre-registration** | ACpre | Pre-registration cost | Pre-reg cost × 50 or higher | Play, YouTube, Display, etc. |

> **Note:** Surfaces may change or expand with platform updates (e.g., Discover).

---

## 1. Surfaces and basic characteristics

The advertiser controls only three things: assets (creative), budget, and bid target. Everything else is automated by Google's AI.

| Surface | Where it shows | Characteristics |
|---|---|---|
| **Google Search** | Search results page | Text ads on app-related search queries |
| **Google Play** | In-store search results and recommendations | Reaches users with the highest install intent |
| **YouTube** | In-stream, in-feed, Shorts | Driven by video assets. Largest reach |
| **Display network** | In-app ads, mobile web | Broad audience reach |

---

## 2. Prerequisites

| Item | Requirement |
|---|---|
| App-store listing | Published on Google Play or the App Store (except for ACpre) |
| Measurement SDK | Firebase SDK or an MMP (AppsFlyer, Adjust, etc.) implemented |
| Conversion tracking | Tracking set up for installs and / or in-app events |
| Daily budget | Capable of sustaining tCPI × 50 or tCPA × 10 |
| ACe (engagement) additional requirements | A meaningful install base, deep links implemented, and ACe selectable in the campaign creation flow. Requirements vary by account and category |

### 2-3. Pre-launch checklist

- [ ] App-store listing is optimized (screenshots, description, preview video)
- [ ] Firebase SDK or MMP is correctly implemented
- [ ] Google Ads ↔ Firebase / MMP integration complete; the source for the primary bidding event is decided (Firebase or MMP)
- [ ] Conversion list (Primary / Secondary) to import is finalized
- [ ] Minimum creative set: 10 text assets (5 headlines + 5 descriptions), 4+ images, 2 videos (16:9 + 9:16)
- [ ] Budget meets bid × minimum-multiplier requirement
- [ ] On iOS, the team has agreed on a judgment window (≥7 days) that accounts for SKAN delays
- [ ] Owner and cadence for app-store (ASO) updates assigned (ASO directly impacts the quality of auto-generated assets)
- [ ] Deep links implemented and tested (for ACe)

---

## 3. Choosing the campaign type

### 3-1. ACi (App Campaigns for installs)

The most basic type, focused on new-install acquisition.

**Optimization-target options:**

| Optimization target | Bid strategy | Recommended condition |
|---|---|---|
| Install volume | tCPI | Early stage with low conversion volume; want to ramp scale first |
| In-app actions | tCPA | 30+ target events per day expected |
| In-app action value | tROAS | Sufficient purchase / revenue data |

**Phased migration path:**

```
tCPI (install optimization)
  ↓ Stable 30–50+ in-app actions per day
tCPA (action optimization)
  ↓ Sufficient purchase / revenue data accumulated
tROAS (revenue optimization)
```

### 3-2. ACe (App Campaigns for engagement)

Re-engagement of existing users.

**Eligibility (rough guideline; varies by account and category):**
- A meaningful install base (rough guideline: 50,000+; previously 250,000, now relaxed)
- Deep links implemented (App Links / Universal Links / custom schemes)
- An app-user audience list

> **How to verify:** The most reliable way is to check whether ACe appears as an option in the Google Ads campaign creation flow.

**Common use cases:**

| Use case | Description |
|---|---|
| Win back dormant users | Serve ads to users who haven't opened the app in 7+ days |
| Cart-abandonment recovery | Deep-link uncompleted-purchase users to the product page |
| Drive in-app purchases | Pitch paid content to free users |
| Event / sale announcement | Deep-link to in-app pages for limited-time events |

**Deep-link types and priority:**

| Type | Platform | Recommendation |
|---|---|---|
| App Links | Android | Most recommended |
| Universal Links | iOS | Most recommended |
| Custom schemes | iOS / Android | Use as a fallback |

### 3-3. ACpre (App Campaigns for pre-registration)

Pre-launch pre-registration campaigns. **Android only.**

**Prerequisites:**
- Pre-registration enabled in Google Play Console for the app
- At least one APK uploaded to a release track
- Launch planned within 90 days of opening pre-registration

**Recommended timing:** Open pre-registration 3–6 weeks before the planned launch date and start the campaign at the same time.

**Surfaces:** Google Play, YouTube (in-stream only), Display network.

**Note:** Once the app launches, campaigns in launched regions automatically pause delivery.

---

## 4. Building the measurement foundation

### 4-1. Picking a tracking solution

| Solution | Platforms | Summary |
|---|---|---|
| **Firebase SDK** | iOS / Android | Strong baseline integration for Google Ads bid signals and audience building |
| **Google Play install referrer** | Android only | Lightweight measurement of install paths via Google Play |
| **MMP** | iOS / Android | AppsFlyer, Adjust, Singular, etc. Strongest at cross-platform measurement |

**Recommendation:** Treat Firebase SDK as the baseline; combine with an MMP as needed. Firebase SDK has unique capabilities for the bid signals and audience-building Google Ads relies on, and it doesn't conflict with running an MMP in parallel.

### 4-2. Designing conversion events

**Principle for event selection:** Quality over quantity. Don't optimize for installs alone — choose in-app events that carry real business value.

| Event type | Examples | Use |
|---|---|---|
| Install | first_open | Default ACi optimization target. Auto-tracked on Android |
| Light events | Tutorial completion, profile creation | Initial tCPA target (volume) |
| Mid events | Add-to-cart, level clear, search | Optimization target once user quality stabilizes |
| Deep events | Purchase, subscription start, paid action | Final optimization target. Requires sufficient volume |

**Event-volume guidelines:**

| Level | Events per day | Status |
|---|---|---|
| Minimum | 10 / day | Smallest amount where the campaign can learn |
| Recommended | 30–50 / day | Stable optimization |
| Ideal | 100+ / day | High-precision optimization. Also helps clear iOS SKAN privacy thresholds |

### 4-3. Firebase SDK setup steps

1. **Embed the Firebase SDK in the app**
2. **Enable Google Analytics in the Firebase project**
3. **Define custom events** (purchase, subscribe, level_complete, etc.)
4. **Link the Firebase project to the Google Ads account**
5. **Import the events as conversion actions in Google Ads**

### 4-4. Running Firebase + MMP together

Firebase and MMPs (AppsFlyer, Adjust, etc.) can coexist with these advantages:

| Role | Firebase | MMP |
|---|---|---|
| Google Ads bid signals | Optimal | Supported |
| Audience building | Firebase-only feature | Not supported |
| Cross-platform measurement | Limited | Core capability |
| Multi-network attribution | Google-centric | All networks |

### 4-5. Avoiding double-counting when running both

When Firebase and an MMP are both running, importing the same conversion event (e.g. purchase) from both into Google Ads causes double counting, breaking bid optimization and reporting.

**Prevention rules:**

| Rule | Description |
|---|---|
| Standardize on one source for the primary event used in bidding | Decide whether to import from Firebase or from the MMP — pick one |
| Don't import the same-named event twice | Don't have both Firebase-purchase and MMP-purchase as Primary |
| Make Primary vs Secondary roles explicit | Events used for bid optimization → Primary. Events for reporting only → Secondary |
| Standardize event naming | Maintain a team-wide table mapping Firebase / MMP event names to their roles |

---

## 5. Designing campaign structure

### 5-1. Core principle

The most important principle for app-campaign structure: **consolidate by default; only split when there's a clear reason.**

Excessive splitting fragments the data and reduces AI learning efficiency.

### 5-2. When to split campaigns

| Split axis | Reason | Example |
|---|---|---|
| **By OS** | iOS / Android measure and optimize fundamentally differently | iOS / Android |
| **By optimization target** | tCPI and tCPA cannot coexist in the same campaign | Install / Action |
| **By geography** | Regions with very different LTV or CPI deserve separate campaigns | Japan / Southeast Asia / North America |
| **By language** | When creative needs to differ across languages | Japanese / English |

**Caution:** Don't run multiple campaigns with the same geo and same optimization target — they cannibalize each other and drive CPI up.

**iOS operations recommendation:** Keep iOS campaigns to roughly 8 or fewer in principle. This isn't a platform cap; it's an operational guideline to prevent signal fragmentation. Make exceptions only when geo, language, or optimization target differ substantially.

### 5-3. Designing ad groups

Build ad groups around **creative themes**.

| Theme example | Asset content |
|---|---|
| Feature-focused | Highlight the app's core features |
| User-benefit | The value the user gets |
| Social proof | Reviews, ratings, download count |
| Promotion | Time-limited offers, first-time bonuses |

**Asset limits per ad group:**

| Asset type | Max | Recommended |
|---|---|---|
| Text (headlines) | 5 | 5 (fill all) |
| Text (descriptions) | 5 | 5 (fill all) |
| Image | 20 | At least 4+ |
| Video | 20 | At least 2 (vertical + landscape) |
| HTML5 | 20 | Game apps only |

### 5-4. Recommended structure examples

**Basic structure (single region, Android):**

```
Account
└── ACi - JP - Install
    ├── Ad group: Feature-focused
    ├── Ad group: Benefit-focused
    └── Ad group: Social proof
```

**Mid-sized structure (iOS + Android, multiple regions):**

```
Account
├── ACi - Android - JP - Install (tCPI)
│   ├── Ad group: Feature-focused
│   └── Ad group: Promotion
├── ACi - Android - JP - Action (tCPA)
│   ├── Ad group: Paid-content-focused
│   └── Ad group: Benefit-focused
├── ACi - iOS - JP - Install (tCPI)
│   └── Ad group: Feature-focused
├── ACe - Android - JP - Re-engagement (tCPA)
│   └── Ad group: Dormant-user-focused
└── ACi - Android - SEA - Install (tCPI)
    └── Ad group: English-language-focused
```

---

## 6. Bidding and budget design

### 6-1. Choosing a bid strategy

| Bid strategy | Optimization target | Recommended condition | Budget / bid ratio |
|---|---|---|---|
| **tCPI** | Install volume | Early stage, low CV volume | Daily budget ≥ tCPI × 50 |
| **tCPA (new install)** | In-app action | 30+ events per day | Daily budget ≥ tCPA × 10 |
| **tCPA (existing user, ACe)** | Re-engagement action | Existing user base in place | Daily budget ≥ tCPA × 15 |
| **tROAS** | Conversion value | Sufficient purchase data | Sufficient budget |

### 6-2. Setting initial bids

**For tCPI:**
- Research the average CPI for the app category (varies dramatically by country and category)
- Set initial bid at 80–100% of the category average
- Tolerate higher CPI during the 1–2 week learning period

**For tCPA:**
- Use observed CPA (from Firebase / MMP) as the starting point
- Set initial bid at par with observed or slightly higher

### 6-3. Why budget-to-bid ratio matters

App-campaign AI reads signal from the budget-bid balance. Too low a ratio means:
- Daily delivery is too small — insufficient learning data
- Status flips to "Budget limited," preventing optimal delivery

| Bid strategy | Minimum ratio | Recommended ratio |
|---|---|---|
| tCPI | 50× | 100× |
| tCPA (new) | 10× | 20× |
| tCPA (ACe) | 15× | 20× |

### 6-4. Operating during the learning period

**Learning period:** Roughly 1–2 weeks after a new campaign is created.

**Rules during learning:**
- Don't change bids or budget
- Don't make major creative changes
- Don't change targeting
- Tolerate short-term CPI / CPA spikes
- Don't make decisions based on less than 2 days of data (especially on iOS)

**Learning-complete signal:** CPA stable for 5–7 days.

### 6-5. Defining conversion value when running tROAS

When using tROAS, the team must agree on the definition of the `value` (conversion value) being sent. If the definition drifts, optimization breaks.

**Items to make explicit:**

| Item | What to confirm |
|---|---|
| Scope of revenue events | Which to include: in-app purchases, subscriptions, ad revenue |
| `value` / `currency` send rules | Tax-inclusive or exclusive, post-discount amount, currency code |
| Refund handling | Send a negative value on refund, or manage as a separate event |
| Subscription distinction | Distinguish trial_start (free trial start) from paid_start (paid start). Optimize on "payment occurred" by default; back off only when volume is insufficient |

---

## 7. App creative assets

Use [creative-strategy.md](creative-strategy.md#app-campaign-baseline) for production specs. Planning rules:

- Text assets should be self-contained, varied in length, and built around different motivations or objections.
- Images should show the app UI or product moment; avoid generic lifestyle-only visuals.
- Video is the first creative priority for scale. Cover landscape, square, and vertical where possible.
- Apply the ABCD logic: hook early, show the app/brand early, connect to the user motivation, and close with a clear action.
- If no video is uploaded, Google may auto-generate one from store assets; treat that as a fallback, not a creative strategy.
- Playable / HTML5 ads are mainly for games or apps where interaction materially improves user quality. They are usually unnecessary for utility, SaaS, or content apps.

---

## 8. Asset operations and Ad Strength

### 8-1. Ad Strength

Keep each ad group's Ad Strength at "Good" or above.

**Ad Strength evaluation criteria:**
- Sufficient asset variety and count
- Asset diversity (theme and format)
- Adherence to Google's best practices

### 8-2. Evaluating asset performance

Each asset is given a performance rating:

| Rating | Meaning | What to do |
|---|---|---|
| **Learning** | Still gathering data | Don't change. Wait at least a few days to a week |
| **Low** | Lowest performance among the same type | Consider replacing with a new asset |
| **Good** | Stable performance | Keep. Consider adding similar variations |
| **Best** | Highest performance | Build new variations along this direction |

**Caution about ratings:** Don't decide on rating alone. Combine with the following KPIs for full judgment.

| KPI | What to look at |
|---|---|
| Performance rating | Learning / Low / Good / Best |
| Spend share | Assets with low spend may be losing to Google's auto-generated ones |
| Impressions | A rating without enough delivery is unreliable |
| CPI / CPA | Cost efficiency per asset |
| CVR | Conversion rate per asset |

**Decision logic:**
- "Best" + high spend + acceptable CPI / CPA → build new variations along this direction
- "Low" + high spend → replace with priority (high cost impact)
- "Low" + low spend → may be insufficient learning. Watch a bit longer or replace
- Zero spend → Google is preferring auto-generated assets. Review the asset's quality and format

### 8-3. Asset update rules

| Rule | Why |
|---|---|
| Update sparingly (rough guideline: 1–2× per week) | Frequent changes reset AI learning. Prioritize stability of current learning |
| Don't replace all assets at once | Comparison data disappears |
| Build new variations in the direction of "Best" | Scale winning patterns horizontally |
| Replace "Low" assets first | Highest-impact improvement |
| Maintain theme diversity | The AI can serve diverse surfaces and users |

---

## 9. iOS campaign considerations

### 9-1. Impact of ATT (App Tracking Transparency)

Since iOS 14.5, the ATT prompt requires user consent. Typical opt-in rates are around 15–30%, though the actual rate varies dramatically by app category, region, and prompt design.

**Impact:**
- Most conversion data becomes modeled (estimated)
- Data may take up to 5 days to appear
- Optimization precision is lower than on Android

### 9-2. SKAdNetwork (SKAN)

Apple's privacy-preserving framework. Aggregates attribution at a population level for users who don't opt in to ATT.

**SKAN 4.0 highlights:**
- Up to 3 postbacks (0–48 h, 3–7 days, 8–35 days)
- Conversion value: 64 levels (0–63)
- Source identifier: up to 4 digits (10,000 patterns)

**Privacy-threshold challenge:** Without sufficient install volume, conversion values come back as "null."

| Platform | Suggested daily install volume |
|---|---|
| Google Ads | 100+ / day |
| Facebook | 88+ / day |

> **Note:** These are platform recommendations; Apple does not publicly disclose the threshold. Required volume varies by category and campaign mix.

### 9-3. iOS operating best practices

| Rule | Why |
|---|---|
| Keep iOS campaigns to roughly 8 or fewer | Prevents signal fragmentation (operational guideline, not a platform cap) |
| Don't decide on less than 2 days of data | Modeled data takes time to appear |
| Optimize the ATT prompt | Higher opt-in rate → better data quality |
| Always implement Firebase SDK | Required for iOS on-device measurement |
| Maintain sufficient install volume | To clear SKAN thresholds |

### 9-4. iOS implementation checklist

| Task | Description |
|---|---|
| SKAN conversion-value schema design | Decide which in-app event maps to which conversion value (0–63). Categorize by revenue tier and engagement stage |
| Judgment window accounting for postback delay | SKAN 4.0 has up to 35-day delay. Use a 7-day moving average minimum for decisions |
| ATT prompt timing and copy optimization | Showing it after the user experienced app value (e.g. after tutorial completion) lifts opt-in rate |
| Firebase SDK on-device measurement | Required to meet iOS privacy requirements |
| Verify MMP-side SKAN support | Check the MMP's (AppsFlyer, Adjust, etc.) SKAN 4.0 readiness and configuration |

### 9-5. AdAttributionKit (AAK) migration

Apple announced AdAttributionKit (AAK) at WWDC 2025 as the successor to SKAN. MMP and ad-platform support is still in flux — check the latest status periodically.

---

## 10. Operating cadence and scaling

### 10-1. Operating cadence

| Cadence | Items |
|---|---|
| **Daily** | Budget pacing, CPI / CPA trends, outlier checks |
| **Weekly** | Asset performance, Ad Strength, asset-update consideration |
| **Biweekly** | Bid micro-adjustments (within ±20%), test new ad groups |
| **Monthly** | Account-wide ROI review, structure audit, new-campaign consideration |

### 10-2. Scaling strategy

**Prerequisites for scaling:**
- CPA stable for 5–7 days
- 20–30+ target events per day

**Scaling rules:**

| Rule | Detail |
|---|---|
| Increase budget by at most 20% every 48–72 hours | Sudden jumps destabilize AI learning |
| Change bids by at most 20% per 24 hours | Big changes reset learning |
| For target changes, create a new campaign | Switching tCPI → tCPA in place is not recommended |

### 10-3. Capturing YouTube traffic

YouTube provides the largest reach, but YouTube delivery may not occur if bids are too low.

**Ways to grow YouTube reach:**
- Always upload high-quality video (landscape + vertical)
- Test gradual bid increases to test access to YouTube inventory
- Follow the ABCD framework

### 10-4. Connecting with App Store Optimization (ASO)

App campaigns use the app-store listing for auto-generation of text and creative. Optimizing the store directly impacts campaign performance.

| ASO element | Impact |
|---|---|
| App title / description | Used as keyword signal by the AI |
| Screenshots | Used as source material for auto-generated video |
| Preview video | Drives store-page CVR |
| Ratings / reviews | Trust signal for the store page. Low ratings hurt CVR badly |
| Download count | Functions as social proof |

---

## 11. Web to App Connect

### 11-1. Overview

Web to App Connect enables seamless transitions from web campaigns (Search, Shopping, P-MAX, etc.) into the app. It measures app installs and in-app actions driven by web campaigns.

### 11-2. Supported campaign types

| Campaign type | Support |
|---|---|
| Search | Supported |
| Shopping | Supported |
| Performance Max | Supported |
| YouTube | Supported (expanded 2025) |
| Demand Gen | Supported (expanded 2025) |
| Hotel Ads | Supported (expanded 2025) |

### 11-3. Key features

| Feature | Description |
|---|---|
| Deep-link integration | Web ad click → directly opens the corresponding screen in the app |
| Unified conversions | Auto-merges app and web events |
| Web-to-app acquisition | Measures how many app installs were driven by web campaigns |
| Unified overview card | Side-by-side comparison of web and app performance |

### 11-4. Impact

Web to App Connect can improve continuity between web discovery and app conversion. On iOS especially, it can surface web-campaign contribution to app installs that would otherwise be harder to see.

---

## 12. Common failure patterns and mitigations

### 12-1. Campaign-design failures

| Failure | Problem | Mitigation |
|---|---|---|
| Multiple campaigns with the same geo and goal | Self-cannibalization drives CPI up | Default to consolidation; split only with a clear reason |
| Cramming all assets and all geos into one campaign | Language and LTV differences ignored; optimization fails | Split appropriately by OS / geo / language |
| Too many iOS campaigns | Signal fragmentation reduces learning precision | Keep to ~8 or fewer in principle; split exceptionally for big geo / language / goal differences |

### 12-2. Budget / bid failures

| Failure | Problem | Mitigation |
|---|---|---|
| Budget-to-bid ratio too low | "Budget limited" status; insufficient learning | Sustain tCPI × 50, tCPA × 10 minimums |
| Frequent bid / budget changes during learning | AI learning resets; optimization stalls | Don't change for at least 1–2 weeks |
| Single-step scaling >20% | Learning destabilizes; CPA spikes | Step in 20% increments every 48–72 hours |
| Switching tCPI → tCPA in the same campaign | Loses learning data | Create a new campaign for the switch |

### 12-3. Creative failures

| Failure | Problem | Mitigation |
|---|---|---|
| Not refreshing creative for long periods | Creative fatigue degrades performance | Refresh assets regularly (within the 1–2× per week guideline) |
| Replacing all assets at once | No comparison baseline; can't tell what worked | Replace incrementally |
| No video assets uploaded | YouTube delivery is constrained | Always upload at least landscape + vertical |
| Too much text in images | Lower visibility, lower performance | Keep text light (≤20–25% of image area) |

### 12-4. Measurement failures

| Failure | Problem | Mitigation |
|---|---|---|
| Wrong conversion event chosen | Volume too low or business value too low | Pick events with 10+ daily occurrences. Migrate to deeper events stepwise |
| Judging iOS based on <2 days of data | Modeled data hasn't landed yet | Use at least 3–5 days of data |
| No Firebase / MMP | In-app actions can't be measured | Build the measurement foundation before launching |

### 12-5. Operations failures

| Failure | Problem | Mitigation |
|---|---|---|
| Letting the app-store listing go stale | Auto-generated assets degrade; CVR drops | Optimize store info regularly (ASO) |
| Running ads with low ratings | Higher store-page drop-off | Improve ratings before scaling |
| Localizing nothing for multilingual regions | Users in mismatched languages convert poorly | Split by major languages |
