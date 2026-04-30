# Meta App Promotion campaigns



## Operating practice

App Promotion campaigns optimize for installs, post-install events, or value. The most common failure is optimizing forever to install volume when the business actually cares about retention, purchases, subscriptions, or LTV. The second most common failure is treating iOS and Android as a single market - measurement, opt-in rates, costs, and post-install behavior diverge meaningfully.

### What matters most

- **Pick the deepest event with stable volume, not the deepest event available.** Bidding to purchase only works if purchases are frequent. Below ~50 purchases / week, value optimization will starve. Drop one rung on the ladder.
- **Creative is the main controllable lever.** Advantage+ App allows up to 50 creatives per campaign. Real variety means different motivations, hooks, UI moments, and proof points - not 50 cuts of the same idea.
- **Measurement readiness is binary.** No SDK / MMP / CAPI = no usable App Promotion campaign on iOS. Plan the stack before plan the spend.
- **iOS and Android need separate campaigns.** Different frameworks (AAK / SKAN / AEM on iOS, Play Install Referrer + Meta Install Referrer on Android), different opt-in realities, different CPI ranges.
- **Re-engagement ROAS is easy to over-claim.** Returning users may have come back without ads, so use holdouts or incrementality tests before treating re-engagement ROAS as causal.
- **Learning resets are easy to trigger.** Bid moves >20%, budget swings >20%, wholesale creative replacement, or switching optimization event mid-flight all reset learning. Learning phase exits at 50 events / week per ad set.
- **AEM is now automated.** As of June 2025 Meta removed the 8-event cap and prioritization requirement for app AEM. All eligible standard / custom events are processed without manual ranking.
- **Advantage+ App is the default starting point in 2026.** Manual app campaigns are a fallback for very specific eligibility / measurement edge cases.

### Diagnostic philosophy

Three frameworks must be reasoned about separately:

1. **Apple AAK / SKAN** - Apple-side, privacy-preserving, near-truth at population level for iOS, but slow (24-48h+ postbacks) and noisy (null conversion values below crowd-anonymity threshold).
2. **Meta AEM** - Meta-side, near-real-time, used for bidding optimization on iOS 14.5+ when SDK / MMP signals are present.
3. **MMP (AppsFlyer / Adjust / Singular / Branch / Kochava)** - cross-network operations and deduplication; their Meta integration plumbs both AEM and AAK / SKAN.

Plus on Android: **Google Play Install Referrer** (deterministic same-session click-through) and **Meta Install Referrer** (Meta-side encrypted referrer, adds Meta-side attribution context).

These never reconcile perfectly. Use each for its role:
- AAK / SKAN: directional privacy-safe truth
- AEM: bidding signal
- MMP: ops console and cross-network attribution
- Meta in-platform numbers: bid-time reality, what the auction sees

---

## Campaign-type cheat sheet

| Goal | Setup | Optimization event | Bid strategy | Min daily budget guideline | Notes |
|---|---|---|---|---|---|
| **New-install acquisition (default)** | Advantage+ App | App install | Lowest cost or Cost per result goal | tCPI guideline x 50 | Default for cold app UA |
| **Quality install** | Advantage+ App or manual | App event (registration / tutorial / key action) | Cost per result goal | Daily budget supporting >= 50 events / week | Graduate when retention proxy correlates with LTV |
| **Revenue / purchase optimization** | Advantage+ App | App event = Purchase | Lowest cost (Highest value) or ROAS goal | Sufficient to clear 50+ purchases / 7d | Requires value passing + currency mapping |
| **Subscription / trial app** | Advantage+ App | App event = Subscribe / StartTrial | Cost per result goal then ROAS goal | Trial volume >= 30 / day to start | Tag paid_start vs trial_start cleanly |
| **Re-engagement (existing users)** | App Promotion - Re-engagement | App event in deep-linked surface | Cost per result goal | Audience-size dependent | Apply incrementality skepticism |
| **Game UA** | Advantage+ App + Playable | Tutorial complete or level N | Cost per result goal | Tutorial volume gate | Playable is design-load heavy but install-quality positive |

---

## 1. Surfaces and basic characteristics

The advertiser controls (a) creative assets, (b) budget, (c) bidding goal, (d) optimization event, (e) audience hint (for manual). Everything else is Meta AI.

| Surface | Where it shows | Notes for app |
|---|---|---|
| Facebook Feed | Meta news feed | Vertical / square video best |
| Instagram Feed | IG main feed | Same |
| Instagram Reels | Full-screen vertical | Major reach driver in 2026 |
| Facebook Reels | Vertical short video | Growing share |
| Stories | Vertical full-screen | Includes lead-in video for playable |
| Audience Network (rewarded video / interstitial) | 3rd-party apps | Major source of game UA volume; lower quality on average |
| In-stream video | Pre / mid roll | Limited app-relevant volume |
| Marketplace, Right Column | Desktop / FB | Minor for app |

Advantage+ Placements is the recommended default; manual placements only when there is a measured reason (creative not built for a placement, audience-network quality issue).

---

## 2. Prerequisites

| Item | Requirement |
|---|---|
| App registered in Meta App Dashboard | Required, with Bundle ID / Package Name |
| Meta Business Manager access | Admin role |
| Measurement | Meta SDK integrated **or** MMP with Meta integration enabled |
| App Events | At minimum, Install + one post-install event firing |
| iOS - AEM eligibility | App registered, SDK / MMP forwarding signals, Advanced Data Sharing on (MMP path) |
| iOS - SKAN / AAK | SKAdNetwork Identifier registered with Meta; AAK postback URL configured |
| Android - Install Referrer | Play Install Referrer enabled in MMP / SDK; Meta Install Referrer enabled |
| Conversions API for App Events (optional but recommended) | Server-side event posting to Graph API endpoint |
| Daily budget | Capable of clearing 50 events / week for the chosen optimization event |

### Pre-launch checklist

- [ ] App registered in Meta App Dashboard with correct Bundle ID / Package Name and SKAdNetwork ID list
- [ ] Either Meta SDK or MMP wired to Meta with Advanced Data Sharing on
- [ ] Standard app events firing: at minimum `fb_mobile_first_install`, plus one of `fb_mobile_complete_registration` / `fb_mobile_tutorial_completion` / `fb_mobile_purchase`
- [ ] Currency and value passed correctly on revenue events; agreed scope (gross vs net of discount, tax, refunds)
- [ ] iOS: AAK postback URL registered with Meta; SKAN integration verified through MMP; ATT prompt copy and timing reviewed
- [ ] iOS: AEM toggle on after all setup complete; enabling it before the app, events, and MMP path are ready can produce partial measurement without obvious errors
- [ ] Android: Both Play Install Referrer and Meta Install Referrer captured by MMP / SDK
- [ ] Conversions API for App Events configured if engineering capacity allows (improves match quality and signal coverage)
- [ ] Deep links (Universal Links on iOS, App Links on Android) tested for re-engagement
- [ ] Budget meets event volume floor for chosen optimization event
- [ ] Creative set: minimum 10 assets, target 20-50; video first, vertical first
- [ ] App Ads Helper used to verify install events and deep links arrive

---

## 3. Choosing the campaign mode

### 3-1. Advantage+ App (default)

Meta's official Advantage+ App page describes the product as using Meta AI to optimize **bidding, audiences, and placements** to drive installs, post-install events, or value. Three performance goals:

1. Maximize app installs
2. Maximize post-install events (e.g. registration, tutorial, level, key action)
3. Maximize conversion value

Key points:
- Up to 50 creative assets per campaign
- AI expands audience beyond the manual seed when applicable
- Recommended creative diversity (formats, hooks, motivations) - "50 minor variations of the same product photo gives the system redundant inputs"
- Average reported -7% CAC

When to use: virtually all greenfield app UA work in 2026.

When to fall back to manual:
- Specific audience constraint that Advantage+ AI keeps overriding
- Eligibility blocked (rare; usually a setup issue)
- Test isolation - measuring an audience or creative effect cleanly

### 3-2. Manual App Promotion

Manual mode gives explicit audience controls. Useful for:
- Holdout / incrementality structures
- Specific lookalike or custom audience strategies
- Re-engagement campaigns (manual is required for app-event audiences)

### 3-3. Re-engagement campaigns

Separate campaign objective inside App Promotion. Targets installed users who have been inactive or who haven't completed a downstream action.

Eligibility:
- App with measurable install base
- Deep links implemented (Universal Links on iOS, App Links on Android)
- Re-engagement Attribution toggled on in MMP and Meta Active integration (MMP path)
- iOS: AEM with re-engagement enabled to attribute deep-link clicks where IDFA is unavailable

Common use cases:

| Use case | Setup | Caveat |
|---|---|---|
| Win back dormant users (>=14 days) | Lapsed-user audience, value-prop creative | Most likely to be cannibalized by organic return |
| Cart / funnel abandonment | Add-to-cart but not Purchase audience | High organic re-conversion bias |
| Trial expiry / downgrade | Custom audience by lifecycle stage | Lifecycle messaging matters more than ad |
| Sale / event push | Broad existing-user audience | Can sometimes show real lift; test |
| Cross-sell paid features | Free-tier audience | Watch for revenue attribution overcounting |

---

## 4. Optimization-event ladder

The ladder is the single most important strategic choice in app campaigns.

| Stage | Event examples (Meta standard) | Use | Graduation trigger |
|---|---|---|---|
| 1. Install | `fb_mobile_first_install` | Cold start, new app, no post-install volume | Stable install delivery for >=2 weeks but retention or revenue weak |
| 2. Onboarding | `fb_mobile_complete_registration`, `fb_mobile_tutorial_completion` | Quality proxy when registration correlates with retention | Stage-2 event >= 50 / week per ad set, business validates correlation with D7 retention |
| 3. Key action | `fb_mobile_add_to_cart`, `fb_mobile_search`, `fb_mobile_achievement_unlocked`, `fb_mobile_level_achieved` | Stronger quality proxy; latency from install acceptable | Stage-3 event >= 50 / week, predictive of monetization |
| 4. Monetization | `fb_mobile_purchase`, `Subscribe`, `StartTrial` | Direct revenue signal | Purchase volume >= 50 / week stable |
| 5. Value / ROAS | `fb_mobile_purchase` with value | Mature optimization, LTV-aware | Clean value pipeline, currency, and refund handling |

### Graduation rules

- **Move one rung at a time.** Skipping rungs (Install -> Purchase) almost always starves on volume.
- **Validate the proxy.** Tutorial completion that does not predict D7 retention is worse than installs as an optimization event.
- **Size the funnel.** Ratio of Install : Stage-2 : Stage-3 : Stage-4 should be roughly 100 : 30-60 : 10-30 : 2-10. If Stage-3 is < 5% of Install, it is too sparse to bid on.
- **Count by ad set, not by campaign.** Meta's 50 events / week threshold is per ad set per week.

### Volume gates per stage

| Optimization stage | Min events / week / ad set to consider | Comfortable |
|---|---|---|
| Install | 50 | 100+ |
| Onboarding event | 50 | 100+ |
| Key action | 50 | 100+ |
| Purchase (CPA mode) | 50 | 100+ |
| Value / ROAS goal | 50 distinct purchases / 7d minimum | 100+ |

### Value optimization specifics

To run Value (Highest value / ROAS goal):
- 50+ purchases in the last 7 days at the ad-set level
- Value parameter passed on every revenue event in a single currency
- Refund handling decided (skip, send negative, separate event)
- Trial vs paid distinction made (subscription apps): default optimize on `paid_start` once volume allows; back off to `trial_start` only when paid volume insufficient

For ad-impression revenue apps (gaming with rewarded ads), unlocking "In-app ad impression" as an optimization goal needs >= 15 attributed AdImpression events with distinct values in the past 28 days.

---

## 5. iOS measurement: the three layers

iOS app measurement in 2026 is a stack, not a single source. Treating any one layer as truth is the most common diagnostic mistake.

### 5-1. Apple AdAttributionKit (AAK)

Apple's forward framework, built on SKAN fundamentals but with more capability. Apple recommends AAK going forward.

| Property | Value |
|---|---|
| Base support | iOS / iPadOS 17.4+ |
| Re-engagement support | iOS / iPadOS 18+ |
| Web AdAttributionKit | iOS 14.5+, Safari 15.4+ |
| Click-through window | 30 days |
| View-through window | 24 hours |
| Postback timing | 24-48h after install / re-engagement |
| Conversion values | Up to 64 distinct signals (coarse + fine schema) |
| Postbacks per event | Up to 3 (iOS 18+) |
| ATT requirement | Not required |

#### iOS version updates

- **Overlapping conversion windows for re-engagement** - run multiple simultaneous re-engagement campaigns with their own conversion paths via conversion tags
- **Configurable attribution windows and cooldowns** - per-conversion-type cooldown (e.g. 6h for installs, 1h for re-engagements) blocks competing attributions
- **Geo-level postback data** - country code natively in postbacks
- **Improved testing / developer mode**
- **Web-to-app re-engagement flow** - deep link routes user into app, re-engagement conversion created, conversion tag appended to URL via Universal Links

Implications for skill recommendations:
- iOS 18+ is a real eligibility threshold for re-engagement attribution at the OS level
- MMP / Meta integration must support overlapping windows before running multiple concurrent re-engagement campaigns - check MMP support per network

### 5-2. SKAdNetwork (SKAN) - parallel

Still supported for compatibility. Original framework. SKAN 4.0 highlights:
- Up to 3 postbacks (0-48h, 3-7d, 8-35d)
- 64 conversion values (0-63)
- Source identifier 4 digits (10,000 patterns)

Privacy threshold: without sufficient install volume, SKAN postbacks return null conversion values. Meta's published recommended floor for SKAN clearance is ~88+ installs / day per campaign.

In 2026, SKAN and AAK run in parallel. Most accounts still see meaningful SKAN volume. AAK is the future; the migration is gradual and MMP-driven.

### 5-3. Meta App AEM (Aggregated Event Measurement for apps)

Meta-side, privacy-preserving protocol that lets Meta measure web and app events on iOS 14.5+ devices even when ATT is declined. Used for **Meta-side bidding optimization and reporting**.

Key facts:
- Works on iOS 14.5+ devices (does not require iOS 17.4 like AAK)
- Provides near-real-time reporting vs SKAN's 24-48h+ postbacks
- Supports 1-day click and 7-day click attribution for App Event Optimization (AEO) and Value Optimization (VO) campaigns
- View-through reporting available when impression device matching is enabled
- AEM and SKAN can run simultaneously on the same campaign

#### 2025-2026 changes

- **June 2025**: Meta removed the 8-event limit and the manual prioritization requirement for app AEM. All eligible standard / custom events are processed automatically. No ranking, no caps, no manual list.
- AEM is now fully automated for app
- Eligibility check happens at ad-set creation time; if app is AEM-eligible, AEM is selected by default

#### Setup gotcha

You must complete all setup steps **before** enabling the AEM toggle. Toggling on prematurely tells Meta the app is ready - if it isn't, AEM measurement will be partial / wrong without obvious errors. This is the single most common setup mistake.

#### When AEM data is available

| iOS version | AAK | SKAN | AEM |
|---|---|---|---|
| iOS 14.5 - 16.x | No | Yes | Yes |
| iOS 17.4 - 17.x | Yes (install) | Yes | Yes |
| iOS 18+ | Yes (install + re-engagement) | Yes | Yes |

### 5-4. The three-layer matrix

| Layer | Owner | Latency | Use for |
|---|---|---|---|
| AAK / SKAN | Apple | 24-48h+ | Privacy-safe directional truth, regulatory record |
| AEM | Meta | Near real-time | Bidding optimization, in-Meta reporting, near-real-time signal |
| MMP / SDK | Vendor | Real-time (limited by ATT) | Cross-network ops, custom events, deeper LTV analysis |
| CAPI for App Events | Meta direct | Real-time | Augment SDK / MMP signal, custom params, sub-minute latency |

Reconciliation rule: **never expect them to match.** Investigate large gaps, not small ones. Plan against AEM for bidding decisions, against AAK / SKAN for compliance / privacy story, against MMP for cross-network operations.

---

## 6. iOS ATT (App Tracking Transparency)

ATT is unavoidable context. Treat benchmarks as weak inputs; the account's own opt-in rate, iOS share, and post-install event coverage should drive planning.

| Metric | Planning implication |
|---|---|
| Global average opt-in | Varies heavily by app category, country, prompt timing, and brand trust; use own app data as the source of truth |
| Optimized prompt ceiling | Strong prompt timing can improve opt-in materially, but do not plan from a generic benchmark |
| Behavioral data Meta lost | Treat iOS user-level data as materially incomplete; rely on AEM, AAK/SKAN, MMP reporting, CAPI where relevant, and incrementality |

#### Prompt timing best practice

- Show after the user has experienced app value (post-tutorial, after first key action) - lifts opt-in materially vs cold app-launch prompt
- Pre-prompt education screen explaining what tracking enables (e.g. better recommendations) lifts opt-in further
- Localize the ATT system prompt copy where Apple allows (purpose string)

ATT impact on Meta App campaigns:
- Most conversion data becomes modeled
- iOS reporting can take up to 5 days to fully land (SKAN postback delay)
- Optimization precision lower than Android

---

## 7. Android measurement

Android is straightforward relative to iOS but still requires both referrer paths.

| Source | What it covers |
|---|---|
| Google Play Install Referrer | Deterministic same-session click-through to Play Store |
| Meta Install Referrer | Encrypts Meta ad metadata into Play Store referrer; covers click (same session + non-same session) and view-through |
| MMP SDK | Captures both, deduplicates, attributes |

Meta Install Referrer does **not** replace Play Install Referrer - it complements it. Without Meta Install Referrer enabled, view-through installs from Meta on Android are lost.

Most accounts now have both via MMP SDK auto-handling.

---

## 8. MMP integration

MMPs are not optional for serious app spend. They handle cross-network attribution, deduplication with Meta, and the AEM / AAK / SKAN plumbing on iOS. Meta's own SDK can run app campaigns alone, but multi-network app programs need an MMP.

### Vendor matrix

| MMP | Meta AEM support | AAK status | Typical strength |
|---|---|---|---|
| AppsFlyer | Supports Meta AEM via Meta integration and advanced sharing settings | Verify current AAK support in the selected account | Broad network catalog and enterprise app operations |
| Adjust | Supports Meta app measurement integrations | Verify current AAK support in the selected account | Game UA and fraud detection workflows |
| Singular | Supports Meta app measurement integrations | Verify current AAK support in the selected account | Cost aggregation and marketing data warehouse workflows |
| Branch | Supports Meta app measurement integrations and deep-link reporting | Verify current AAK support in the selected account | Deep linking and web-to-app workflows |
| Kochava | Supports Meta app measurement integrations | Verify current AAK support in the selected account | Fraud detection and measurement operations |

### Setup checks per MMP

- Meta integration enabled in MMP dashboard
- App registered in Meta Business Manager and matched to MMP App ID
- Advanced Data Sharing / AEM toggle ON (AppsFlyer / Adjust)
- Re-engagement Attribution enabled if running re-engagement campaigns
- IP masking OFF in app settings (AppsFlyer specific - High)
- Standard event mapping reviewed (e.g. AppsFlyer `af_revenue` -> Meta `_valueToSum`)
- View-through impression device matching toggled if needed for view-through reporting
- For AAK: postback URL forwarding configured

### Meta SDK + MMP coexistence

Meta SDK and an MMP SDK can both be installed but require careful event sourcing. Common rule: **one source for the event used for bidding.** Importing the same purchase event from both Meta SDK and MMP results in double-counting that breaks bidding.

| Decision | Most common pattern |
|---|---|
| Install attribution | MMP (cross-network) |
| In-app events for Meta bidding | MMP forwarding to Meta (preferred) OR Meta SDK direct |
| Cross-network reporting | MMP |
| iOS AEM signals | MMP forwards via Advanced Data Sharing |

### Conversions API for App Events (CAPI for App)

Direct server-to-server pipe to Meta's Graph API endpoint. Bypasses device-level restrictions entirely. Co-exists with SDK and MMP.

When useful:
- Custom params not supported by SDK / MMP (e.g. predicted LTV, subscription tier)
- Sub-minute latency required
- Backend has the signal but client SDK doesn't (server-side purchase confirmation)
- Augment SDK / MMP signal coverage where ATT-blocked devices reduce client-side data

Note: Meta's "one-click" CAPI setup for web does **not** extend to app use cases. App CAPI is direct integration only - engineering work required.

Deduplication: use `event_name` and `event_id` consistently across SDK and CAPI; matching events within 48h are deduplicated; if browser/app and server events arrive within ~5 minutes, Meta favors the browser/app event.

---

## 9. Bidding strategies for app

| Strategy | What it does | App-campaign use | Volume need |
|---|---|---|---|
| **Lowest cost (no goal)** | Maximize results within budget | Default for cold UA, install volume | Lowest |
| **Cost per result goal** | Targets a CPA / CPI but flexes per auction | Most common for App Event Optimization | Need 50 events / week / ad set to learn |
| **Bid cap** | Hard ceiling on per-auction bid | Rare for app; aggressive cost control | Need experience with cost ceilings |
| **Highest value (no goal) / VO** | Maximizes total value in budget | Mature monetized apps | 50+ value events / 7d / ad set |
| **ROAS goal (minimum ROAS)** | Only shows ad if predicted return >= goal | Mature apps with stable value | Same as VO + value-data confidence |

### When to use each (current operating judgement)

| Stage | Recommended bidding |
|---|---|
| Brand new app, no events | Lowest cost on Install |
| 2-4 weeks in, install volume stable, onboarding events firing | Cost per result goal on Onboarding event |
| Onboarding stable, key action stable | Cost per result goal on Key Action |
| Purchase volume >= 50 / week | Cost per result goal on Purchase |
| Purchase + value clean and >= 50 / week | Highest value / ROAS goal |

### Volume threshold table

| Bid strategy | Volume floor | Comfortable |
|---|---|---|
| Lowest cost (Install) | 50 installs / week / ad set | 200+ |
| Cost per result goal (Event) | 50 events / week / ad set | 100+ |
| Bid cap | 50+ | 100+ |
| VO / ROAS goal | 50 value events / 7d / ad set | 100+ |


---

## 10. Budget design

App-campaign learning is sensitive to the budget-to-bid ratio. Underfunded campaigns can't explore enough auctions to clear learning.

### Practical floor formula

Daily budget >= (target CPA or CPI) x (events needed per day to clear learning per week)

For 50 events / week, you need ~7-8 / day. So:

| Optimization event | Target cost | Daily budget floor (rough) |
|---|---|---|
| Install at $2 CPI | 50 / week | $14-16 / day / ad set |
| Registration at $5 CPA | 50 / week | $35-40 |
| Purchase at $20 CPA | 50 / week | $140-160 |
| Purchase at $50 CPA | 50 / week | $350-400 |

Practitioner rule of thumb: campaigns starved at <2x this floor will report "Learning Limited" or stay in learning indefinitely.

### Attribution window for budget reasoning

| Window | Note |
|---|---|
| 1-day click | Stricter; fits short consideration / impulse apps |
| 7-day click | Default in 2026 for most app advertisers |
| 1-day view | Default included on most flows; 1-day view **not supported** for iOS post-install events |
| 7-day view, 28-day view | Removed January 2026 |
| 28-day click | Available for install events but not post-install |

Reported conversions dropped 15-40% overnight at the Jan 2026 view-window removal across many accounts. Plan target CPAs against the new windows.

### Learning phase rules

- Don't change bid strategy / optimization event for 7-10 days minimum
- Don't change budget by more than 20% in 24-48h
- Don't replace the entire creative set at once
- Don't decide on iOS performance with <3-5 days of data (modeled data hasn't landed)

---

## 11. Re-engagement playbook

Re-engagement is the highest-risk-of-self-deception area in app marketing.

### Setup

1. Implement deep links - Universal Links (iOS) and App Links (Android). Custom schemes are fallbacks only.
2. Audience strategy:
   - **Lapsed users** (no app open >= N days)
   - **Funnel abandoners** (added to cart, viewed paywall, started trial - did not convert)
   - **Lifecycle stage** (free user, churned subscriber)
3. Re-engagement Attribution toggle ON in MMP and Meta integration.
4. iOS: ensure AEM with re-engagement enabled (iOS 18+ for AAK re-engagement, AEM works on iOS 14.5+).
5. Conversion tag setup if running multiple overlapping re-engagement flows on iOS 18.4+.

### Creative focus

| Audience | Creative angle |
|---|---|
| Dormant general user | Reminder of value + new feature / improvement since last visit |
| Cart abandoner | Specific item + incentive (free shipping, discount) |
| Trial expiry | Outcome they got during trial + paid value prop |
| Free tier | Specific paid feature gated until upgrade |

### Incrementality

The single most important number to ask: of the conversions credited to re-engagement, how many would have happened anyway?

- Holdout test ("ghost ads"): randomly withhold retargeting from a control segment, compare reactivation
- A meaningful share of "wins" may have happened organically; use holdouts where re-engagement spend is material
- Geo holdout: withhold re-engagement in a region for 2-4 weeks, compare LTV / retention
- Conservative reporting: discount platform-reported re-engagement ROAS by an incrementality factor

If you can't run a holdout, do not scale re-engagement budget aggressively from platform ROAS alone.

---

## 12. Playable ads design

Playable ads are interactive HTML5 mini-experiences that let users try before installing. Best for games and any app with a core interaction loop that can be demonstrated in 30-60 seconds.

### Specs

| Element | Spec |
|---|---|
| HTML5 bundle file format | ZIP |
| Maximum total bundle size | 5 MB |
| `index.html` size | <= 2 MB |
| Maximum file count in bundle | 100 |
| Required entry point | `index.html` at root |
| Lead-in video | Required, all aspect ratios supported |
| Lead-in placements | Facebook Feed, Instagram Feed (only) |
| Playable placements | Feed (FB / IG), Stories, Audience Network (Rewarded Video, Interstitial) |
| Fallback video | Required for placements where playable doesn't render |

### Three-part structure

1. **Lead-in video** - hook attention; "Try Now" CTA below in Feed
2. **Interactive demo** - core mechanic in <= 2 steps; full-screen
3. **End card** - install CTA with App Store / Play Store deep link

### Design rules

- **2 steps in tutorial is ideal.** More than 2 reduces completion materially
- **Show CTA throughout the demo,** not only at the end
- **Lead-in video must match demo content.** Mismatch causes drop-off and quality drop
- **Test multiple ad copy variations** alongside one playable
- **Loop the playable** if user fails / completes - don't dead-end
- **Audio off by default;** rely on visual / haptic feedback
- **Test in App Ads Helper** before publishing

When **not** to use playable:
- App with no easily previewable core interaction (utility, content app, SaaS)
- Production capacity insufficient (a working playable demo is real engineering)
- Brand-story-led campaign

---

## 13. Creative production rules

App creative principles:

| Rule | Why |
|---|---|
| **First 1-3 seconds must hook + show app UI** | Feed scroll velocity; ATT-affected users still see ads, attention is the only signal |
| **Show the app, not actors using phones generically** | Generic phone-mockup creative underperforms category-wide |
| **Vertical video first** | Reels + Stories dominate placement value in 2026 |
| **Caption everything** | Most users watch with sound off |
| **Text density on static <= 20-25% of image area** | Higher text density reduces delivery (legacy 20% rule relaxed but still informative) |
| **Variety = different motivations, not different cuts** | Algorithm needs distinct hooks, audiences, proof types |
| **Production cadence: 20-50 new creatives / month** | Match Advantage+ App's appetite |
| **Refresh every 2-4 weeks** | Fatigue shows fastest in video at scale |

### Creative format roles for app

| Format | Role |
|---|---|
| Vertical video (Reels-native) | Primary scale driver |
| Square video (1:1) | Feed-native fallback |
| Static images | Cheap variety, supports retargeting |
| Carousel | Multi-feature / multi-screenshot apps |
| Playable | Game UA quality booster, install pre-qualifier |
| UGC-style | Trust + relatability; testimonial / before-after |
| Stories full-screen | Brand moment + clear CTA |

### ABCD-style framework for app

- **Attention** - hook in 1-3s with surprising UI moment or pain-point
- **Branding** - app name / logo visible early but not first frame
- **Connection** - the user's motivation explicit (save time, win game, save money)
- **Direction** - install CTA + clear next-step image

---

## 14. Measurement stack design (full matrix)

| Layer | iOS role | Android role | Set up by |
|---|---|---|---|
| Meta SDK in app | App events to Meta directly | App events to Meta directly | App engineer |
| MMP SDK in app | Captures + forwards events; manages SKAN / AAK / AEM | Captures Play Install Referrer + Meta Install Referrer | App engineer + MMP setup |
| AAK postback URL | Apple-signed postback to Meta | n/a | MMP / Meta |
| SKAN config | Conversion-value schema | n/a | MMP / Meta |
| AEM toggle | Meta-side aggregation, on after setup | n/a (less central) | Meta + MMP toggle |
| ATT prompt | Drives client-side data quality | n/a | App team |
| Conversions API for App Events | Server-side augmentation | Server-side augmentation | Backend engineer |
| Deep links (Universal / App Links) | Re-engagement attribution + UX | Re-engagement attribution + UX | App engineer |
| Meta App Dashboard registration | Required for AEM and SKAN | Required | Meta admin |

### Recommended stacks by maturity

| Maturity | Stack |
|---|---|
| Early (MVP, low spend) | Meta SDK only; install + 1 post-install event |
| Growing (multi-network, real spend) | MMP (AppsFlyer / Adjust / Singular / Branch / Kochava) + Meta integration + AEM enabled |
| Mature (LTV-led, multiple ad networks) | MMP + CAPI for App Events + AEM + custom events |
| Sophisticated | All of the above + holdout / incrementality program + value optimization |

---

## 15. iOS vs Android scaling matrix

| Dimension | iOS | Android |
|---|---|---|
| Measurement reliability | Modeled, multi-layer (AAK/SKAN/AEM) | Deterministic (Install Referrers) |
| Reporting latency | Up to 5 days for full picture | Near real-time |
| Opt-in / data quality | 13-25% ATT opt-in | High (no equivalent prompt) |
| Typical CPI premium | Higher (often 1.5-3x Android in same market) - varies | Baseline |
| LTV / ARPU | Often higher per user | Lower per user, more volume |
| Re-engagement attribution | Requires AAK / AEM with iOS 18+ for full picture | Standard |
| Learning stability | More volatile | More stable |
| Decision data minimum | 3-5 days | 1-2 days acceptable |
| Operational cap | Practical guideline: keep iOS campaigns small in number to avoid signal fragmentation | Less critical |

Implication: **never scale iOS and Android together off blended numbers.** Split campaigns by platform; allocate budgets per-platform; evaluate per-platform LTV.

---

## 16. Decision matrix by monthly volume

Volumes refer to optimization-event volume per ad set per month after launch.

| Monthly event volume | Strategy |
|---|---|
| < 200 | Optimize on Install (or shallowest event with volume); don't run ROAS goal; avoid splitting into many ad sets |
| 200 - 1000 | Optimize on Onboarding / Key Action; experiment with Cost per result goal; consider 2-3 ad sets |
| 1000 - 5000 | Optimize on Purchase or deep event; introduce VO if value data clean; 3-5 ad sets |
| 5000+ | Mature ROAS goal; multi-ad-set creative test; iOS / Android split campaigns; re-engagement program viable |

Cross-reference with attribution-window default: at 7-day click, the same campaign reports more conversions than at 1-day click - so the "200 volume" rule must be per the chosen attribution window.

---

## 17. Advantage+ App vs manual decision tree

```
Cold UA, default case ........................... Advantage+ App
+ Custom audience constraint that matters ....... Manual (or test both)
+ Holdout / incrementality test required ........ Manual
+ Re-engagement campaign ........................ App Promotion - Re-engagement (manual mode)
+ Eligibility blocked ........................... Investigate setup; manual fallback
+ Specific creative-by-audience pairing ......... Manual or A+ with creative by audience
```

In 2026 the bias is toward Advantage+. Manual is increasingly a tactical tool, not a default.

---

## 18. Diagnostic decision tree

| Symptom | First checks | Likely action |
|---|---|---|
| Cheap installs, poor retention | Optimization event depth, post-install funnel mapping, app onboarding flow | Move optimization deeper (Install -> Onboarding -> Key Action), audit onboarding |
| iOS reporting low / unstable | AEM toggle order (was it on too early?), SKAN schema, AAK postback URL, MMP integration | Verify setup before changing campaign; expect partial blanks until thresholds clear |
| iOS / Android numbers diverge sharply | Expected; methodology gap | Don't reconcile - operate per-platform |
| High CPI, good retention | Creative quality, store-page CVR, bid setting | Improve creative + store page; scale carefully on quality signal |
| Good in-app events but low purchase | Monetization path, paywall, proxy event quality | Check funnel below the optimization event; consider deeper event |
| Re-engagement ROAS high, no LTV lift | Organic return bias | Run holdout; discount platform ROAS by incrementality factor |
| Stuck in Learning phase | Event volume per ad set per week | Move to shallower event or consolidate ad sets |
| Spend not pacing | Budget-bid ratio, eligibility, AEM toggle, audience size | Check setup; raise budget or loosen audience |
| Sudden conversion drop Jan 2026 | Removed view windows | Re-baseline; this is methodology, not performance |
| Creative fatigue | Asset age, frequency, spend concentration | Add new concepts (different motivations), not new cuts |
| Playable not delivering | Bundle size, fallback video, lead-in video, placement support | Verify specs; fallback video required |
| AEM data sparse | Setup order, MMP "Advanced Data Sharing" toggle, IP masking on, app registration | Re-run setup checklist; AEM has no error UI for misconfig |
| ATT opt-in <10% | Prompt timing, copy, pre-prompt education | Move prompt post-value-experience |
| Android view-through missing | Meta Install Referrer not enabled | Enable in MMP + SDK |

---

## 19. Common traps

- Optimizing forever to install volume when retention or revenue is the real goal
- Treating Meta's reported re-engagement ROAS as incremental
- Mixing iOS and Android in one campaign for "simplicity"
- Toggling AEM on before completing the setup checklist
- Switching optimization event mid-flight inside the same campaign (forces learning reset)
- Loading 50 cuts of one creative idea and calling it variety
- Running Value / ROAS goal below 50 purchases / 7d / ad set
- Counting trial_start as a paid event in subscription apps
- Ignoring Meta Install Referrer on Android (loses view-through)
- Forgetting that 1-day view is not supported for iOS post-install events
- Assuming the Jan 2026 conversion drop was a performance issue (it was the view-window removal)
- Showing the ATT prompt at app cold-launch
- Building a playable that takes more than 2 steps to demonstrate value
- Lead-in video that doesn't match the playable demo
- Importing the same purchase event from both Meta SDK and MMP (double counts; breaks bidding)
- Decisioning iOS performance on <3 days of data
- Changing budget >20% during the learning phase
- Single ad set covering all geos with very different LTV (mixed signal)
- No deep links - re-engagement campaigns can run but UX collapses
- Manually prioritizing AEM events as if the 8-event cap still existed (it was removed June 2025)
- Comparing CPI to a category benchmark without normalizing for ATT impact / measurement framework

---

## 20. Volatile checks (re-verify before client-facing recommendations)

iOS app measurement is the most fast-moving area in performance marketing. Re-check these before quoting numbers:

| Item | Why volatile | Re-verify cadence |
|---|---|---|
| AAK iOS version requirements (17.4 / 18 / 18.4 / future) | Apple ships new functionality each major release | Quarterly or after WWDC |
| Apple's recommended framework (AAK vs SKAN parity) | Apple is migrating apps to AAK gradually | Bi-annually |
| Meta AEM event caps / prioritization | The 8-event cap was removed June 2025 - rules can change again | Quarterly |
| Meta attribution windows | 7d/28d view removed Jan 2026 - more changes possible | Per Meta announcement |
| MMP AEM / AAK feature parity | MMPs ship support at different speeds | Check the selected MMP's current setup UI |
| Meta Advantage+ App eligibility / behavior | Default-on changes happen regularly | Quarterly |
| Playable spec limits | Updated occasionally | Annually |
| ATT opt-in benchmarks | Drift slowly | Annually |
| ROAS goal / VO volume thresholds | Documented but Meta has nudged thresholds historically | Annually |
| Removal / addition of optimization goals | Meta retires goals (e.g. Highest value, ROAS goal nuances) | Per Meta release |
| iOS Install Referrer parity on Android | Adoption and platform support can change | Annually |

Current official checks for volatile app items:

- Meta Advantage+ App campaigns: https://www.facebook.com/business/ads/meta-advantage-plus/app-campaigns
- Meta App Events: https://developers.facebook.com/docs/app-events/
- Meta CAPI for App Events: https://developers.facebook.com/docs/marketing-api/conversions-api/app-events/
- Meta playable ads: https://www.facebook.com/business/ads/playable-ad-format
- Apple AdAttributionKit: https://developer.apple.com/app-store/ad-attribution/

When in doubt, check the official docs above plus the current Meta, Apple, and selected MMP setup screens for the actual account.

---

## 21. Operating cadence

| Cadence | Items |
|---|---|
| Daily | Spend pacing, learning phase status, anomaly check (esp. iOS) |
| Every 3-4 days | Asset performance review (don't act before 3-5 day data lands on iOS) |
| Weekly | Creative refresh decisions, AEM / AAK / MMP reconciliation review |
| Bi-weekly | Bid micro-adjustments (<= 20%), new ad-set tests |
| Monthly | Cohort LTV review, holdout / incrementality if running re-engagement, ATT prompt performance, structure audit |
| Quarterly | iOS measurement framework verification (AAK / SKAN / AEM updates), MMP feature parity, attribution window changes |

---
