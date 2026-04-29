# Google Video Campaigns (YouTube Ads)

## Operating practice

YouTube performance is creative-led. Targeting and bidding matter, but weak video cannot usually be fixed with settings.

### What matters most

- **The first 1-5 seconds decide attention.** Start with motion, face, product, problem, or pattern interrupt. Show the brand early enough to transfer memory, and state the value quickly.
- **Use ABCD as a quality floor, not a guarantee.** Attract, Brand, Connect, Direct improves the odds, but weak offer or weak audience-message fit still fails.
- **Match format to objective.** Bumpers/non-skippable are reach and recall tools. Skippable/Demand Gen-style video is the better route for direct response. CTV is primarily brand/reach measurement, not last-click performance.
- **Build for Shorts and mobile separately.** Vertical assets, safe zones, on-screen text, and first-frame clarity are not optional when Shorts inventory is material.
- **Frequency is a performance and brand lever.** Overexposure can damage both CPA and sentiment. Start tighter for remarketing and non-skippable formats.
- **Measure upper-funnel correctly.** Brand Lift, search lift, geo lift, MMM, and assisted conversion patterns are more meaningful than pure last-click CPA for awareness/reach campaigns.
- **Production budget is not the lever after a basic quality floor.** Hook, offer, structure, brand timing, and CTA often outperform production polish.

- **Repurposed TV creative usually needs surgery.** Move brand/value into the opening, tighten pacing, add on-screen text, and design for skip behavior. A TV cutdown is not automatically a YouTube ad.
- **The end card is a conversion lever.** For direct response, use a clear offer, visual product/service reminder, and specific CTA. Generic "Learn more" is weaker when a more concrete action is available.
- **CTV is usually brand/reach spend.** Evaluate CTV with reach, lift, search lift, or MMM-style contribution. Do not expect reliable last-click attribution.
- **Shorts requires native vertical thinking.** Use motion in frame one, visible text, safe zones, and a fast offer/problem reveal.
- **Frequency caps matter more when interruption is high.** Non-skippable and small remarketing audiences need tighter controls than broad skippable reach.
- **Video experiments are best for concept questions.** Use them to test hooks, offers, structure, and audience-message fit; do not spend large budgets testing tiny edits.

### Diagnosis

| Symptom | First checks | Likely action |
|---|---|---|
| Low view rate | First frame, first 2 seconds, audience-message fit, format | Recut hook, add motion/product, test thumbnails/opening |
| Views but no action | Offer, CTA, end card, LP, campaign objective | Strengthen CTA/end card, use Demand Gen for DR, improve LP |
| High CPM/frequency | Audience too narrow, cap too loose, format mix | Broaden, cap frequency, test efficient reach |
| Good VTC but weak business lift | Attribution window, VTC share, search lift, holdout | Discount VTC, use lift/geo test, report separately |

### Common traps

- Repurposing TV creative without moving brand/value into the opening.
- Measuring awareness campaigns like Search.
- Running horizontal-only assets when Shorts inventory matters.
- Using generic "Learn more" CTAs when a specific offer/action is available.

Terms used across playbooks live in [SKILL.md glossary](../SKILL.md#common-google-ads-glossary).

## Goal-based campaign-selection cheat sheet

| Goal | Campaign sub-type | Main ad formats | Bid strategy | Pricing |
|---|---|---|---|---|
| **Maximize awareness (efficient)** | Video Reach – Efficient Reach | Bumper + skippable + in-feed + Shorts | tCPM | Impression |
| **Maximize awareness (full views)** | Video Reach – Non-Skippable | Non-skippable + bumper | tCPM | Impression |
| **Frequency control** | Video Reach – Target Frequency | Bumper + skippable + non-skippable | tCPM | Impression |
| **Views and engagement** | Video Views | Skippable + in-feed + Shorts | tCPV | View |
| **Storytelling** | Ad Sequence | Combination of skippable + non-skippable + bumper | tCPM / tCPV | Mixed |
| **Conversion acquisition** | Demand Gen | Skippable + in-feed + Shorts + image | tCPA / Maximize Conversions / tROAS | Click / impression (optimization target = CV) |
| **Audio reach** | Audio Reach | Audio ads (15 s) | tCPM | Impression |

> **Note:** Since April 2025, new Video Action Campaign (VAC) creation is unavailable. For conversion-oriented video ads, use Demand Gen campaigns instead.

---

## 1. Ad-format catalog (YouTube-specific)

### 1-1. Skippable in-stream ads

The default format for video campaigns.

| Item | Spec |
|---|---|
| Placement | Pre-roll / mid-roll / post-roll on videos |
| Length | No limit (recommended: 15 s to 3 min. Awareness: 15–20 s; consideration: 60 s to 3 min) |
| Skip | Skippable after 5 seconds |
| Pricing | CPV (whichever comes first: 30-second view, video completion, or click) |
| CTA | Overlay, companion banner, sitelinks |
| Devices | Desktop, mobile, tablet, CTV |

### 1-2. Non-skippable in-stream ads

For when you need the message viewed in full.

| Item | Spec |
|---|---|
| Placement | Pre-roll / mid-roll / post-roll |
| Length | 15–30 seconds (varies by region; up to 30 s on CTV inventory) |
| Skip | Not allowed |
| Pricing | CPM (impression-based) |
| Devices | Desktop, mobile, tablet, CTV |

> **Note:** Non-skippable ads don't accumulate TrueView "views," so they're poor for building view-based remarketing lists. Impression-based audience lists can still be created, but they don't filter for users who actively chose to watch.

### 1-3. Bumper ads

Short-form for high-frequency reach.

| Item | Spec |
|---|---|
| Placement | Pre-roll / mid-roll / post-roll |
| Length | ≤6 seconds |
| Skip | Not allowed |
| Pricing | CPM |
| Recommended use | Brand-recall reinforcement, complement to skippable ads, parts of an Ad Sequence |

### 1-4. In-feed video ads

Users actively click to watch.

| Item | Spec |
|---|---|
| Placement | YouTube search results, related-video panel, YouTube home feed |
| Display format | Thumbnail + text (headline + 2-line description) |
| Skip | N/A (playback starts on click) |
| Pricing | CPV (charged when the thumbnail click triggers playback) |
| Recommended use | Consideration push, longer-form content delivery |

### 1-5. YouTube Shorts ads

Show in the vertical short-video feed.

| Item | Spec |
|---|---|
| Placement | YouTube Shorts feed |
| Length | Recommended: 10–60 s |
| Aspect ratio | 9:16 (vertical required) |
| Skip | Swipe to skip |
| Pricing | Per the campaign sub-type (CPV / CPM) |
| Recommended use | Mobile reach, younger-audience targeting |

### 1-6. Audio ads

Reach users listening to music or podcasts on YouTube.

| Item | Spec |
|---|---|
| Placement | YouTube Music, audio-only delivery on YouTube videos |
| Length | 15 s (audio only; pair with a static image or simple animation) |
| Skip | Not allowed |
| Pricing | CPM |
| Recommended use | Brand awareness for music / podcast listeners |

### 1-7. Masthead ads

Premium reserved YouTube inventory for major launches or event announcements. Treat it as a special reach buy, not a default campaign-planning option. Pricing, availability, and purchase workflow vary by market and timing; confirm through Google reservation workflows before including it in a plan.

### 1-8. Companion banners

Auxiliary banner shown alongside an in-stream ad.

| Item | Spec |
|---|---|
| Placement | Desktop only (top right of the video) |
| Size | 300 × 60 px |
| File format | JPEG, GIF, PNG |
| File size | ≤150 KB |
| Auto-generation | Can also be auto-generated from the YouTube channel banner |

---

## 2. Campaign goals and sub-types

### 2-1. Goal → sub-type mapping

In Google Ads, you pick a goal first; the available sub-types depend on the goal.

| Campaign goal | Available sub-types |
|---|---|
| **Awareness and consideration** * | Video Reach (Efficient Reach / Non-Skippable / Target Frequency), Video Views, Ad Sequence, Audio Reach |
| **Sales / Leads / Website traffic** | Demand Gen (formerly Drive Conversions) |
| **No goal selected** | All of the above are selectable |

> *Newer campaigns may show this as "YouTube reach, views, and engagements." UI labels can change with updates.

### 2-2. Sub-type details

#### Video Views

- **Goal:** Maximize views and engagement
- **Bid:** tCPV (Target Cost Per View)
- **View counting:** 30-second view or video completion (10 s on Shorts)
- **Available formats:** Skippable + in-feed + Shorts
- **Recommended:** Standard starting point for video campaigns. Pick this when in doubt

#### Video Reach – Efficient Reach

- **Goal:** Max reach within budget (cost-efficiency emphasis)
- **Bid:** tCPM
- **Available formats:** Bumper + skippable + in-feed + Shorts
- **Notes:** Google AI auto-optimizes surfaces to maximize reach

#### Video Reach – Non-Skippable Reach

- **Goal:** Guarantee full message delivery
- **Bid:** tCPM
- **Available formats:** Bumper + non-skippable (15 s)
- **Note:** TrueView views aren't counted, so view-based remarketing lists aren't supported (impression-based lists are)

#### Video Reach – Target Frequency

- **Goal:** Control frequency on the same user
- **Bid:** tCPM
- **Available formats:** Bumper + skippable + non-skippable
- **Recommended for:** Large-scale brand campaigns. Smaller budgets tend to lose efficiency

#### Ad Sequence

- **Goal:** Tell a story by serving multiple videos in a defined order
- **Bid:** tCPM / tCPV (depends on the format)
- **Available formats:** Combination of skippable + non-skippable + bumper
- **Example structures:**
  - 6-second bumper (teaser) → 15-second skippable (detail) → 6-second bumper (reminder)
  - 30-second skippable (story part 1) → 30-second skippable (story part 2)

#### Audio Reach

- **Goal:** Reach users listening to audio
- **Bid:** tCPM
- **Format:** 15-second non-skippable audio ads
- **Recommended for:** YouTube Music listeners and background-listening users

---

## 3. Bid strategy and budget design (video-specific)

### 3-1. Choosing a bid strategy

| Bid strategy | Pricing | Compatible sub-types | Typical price level |
|---|---|---|---|
| **Target CPV** | Per view | Video Views | Varies materially by industry, region, audience, and timing |
| **Target CPM** | Per 1,000 imps | Video Reach, Ad Sequence, Audio | Varies materially by industry, region, audience, and timing |
| **Maximize Conversions** | Per CV | Demand Gen | Industry- and product-dependent |
| **Target CPA** | Per CV | Demand Gen | Set the target CPA |
| **Target ROAS** | Revenue ratio | Demand Gen | Set the target ROAS |
| **Maximize Conversion Value** | Maximize revenue | Demand Gen | Maximize revenue within the budget cap |

> **Note:** Maximum CPV migrated to Target CPV in 2025. Use Target CPV on new campaigns. Existing Maximum CPV campaigns continue to run.

### 3-2. Budget-design basics

**Awareness goal (CPM pricing)**

| Item | Recommendation |
|---|---|
| Daily budget floor | tCPM × expected daily impressions / 1,000 |
| Minimum duration | 2+ weeks (to leave a learning period) |
| Test budget guideline | From roughly $700/month (small-scale test) |

**Conversion goal (Demand Gen)**

| Item | Recommendation |
|---|---|
| Daily budget under tCPA | 3–5× target CPA as a workable floor; 10–15×+ for faster scale when economics allow |
| Daily budget under Maximize Conversions | 3–5× expected CPA as a workable floor; 10×+ for faster learning |
| CV accumulation goal | 15+ per month (rough Smart Bidding stability bar) |

### 3-3. Rules for changing budget

- Maximum change per step: **±20%**
- Minimum interval between changes: **7–14 days**
- Don't change bid and budget simultaneously (change one at a time to isolate effects)
- Avoid changes during the learning period (~7 days after launch)

### 3-4. Learning period

| Trigger | What it does |
|---|---|
| Creating a new campaign | ~7-day learning period |
| Changing budget by ≥20% | May reset learning |
| Changing bid strategy | Resets learning |
| Major ad add / change | May reset learning |
| Major targeting change | May reset learning |

---

## 4. Targeting design (YouTube-specific)

### 4-1. Audience targeting

| Targeting type | Summary | Recommended use |
|---|---|---|
| **Affinity** | Segments based on interests / habits | Awareness; broad reach |
| **Custom segments** | Based on user-specified keywords / URLs / apps | Consideration; reach competitor visitors or specific search behavior |
| **In-Market** | Users currently considering purchases / contracts | Conversion acquisition; reach high-intent users |
| **Life events** | Job changes, marriage, moving, etc. | Pitch high-ticket offers |
| **Detailed demographics** | Household income, education, homeownership, etc. | Narrow to a target profile |
| **Remarketing** | Site visitors / video viewers / app users | CVR uplift; re-engagement |
| **Customer Match** | Upload CRM data (emails, etc.) | Existing-customer plays; seed list for Lookalike Segments (Demand Gen) |
| **Lookalike Segments** | Users similar to existing customers (Demand Gen only) | New-customer expansion. Use Optimized Targeting if not available |

### 4-2. Content targeting

| Targeting type | Summary | Notes |
|---|---|---|
| **Topics** | Delivery to content under a specific topic | Broad reach but CV efficiency tends to drop |
| **Placements** | Specify YouTube channels / videos | Fine control, hard to scale |
| **Keywords** | Based on video metadata / content | Different from Display keyword targeting |

> **Important:** In Demand Gen (CV-goal) campaigns, adding content targeting (keywords, topics, placements) **dramatically restricts delivery**. For CV goals, recommend audience targeting + Optimized Targeting.

### 4-3. Device and geo targeting

- **Device:** Choose mobile, desktop, tablet, CTV (Connected TV)
- **CTV-only delivery:** Possible — useful when paired with TV-screen-oriented creative
- **Geography:** Country / state-prefecture / city / radius targeting

### 4-4. Optimized Targeting

- Auto-expands to high-CV-likelihood users beyond the manually-set audiences
- **Recommended ON** in Demand Gen (manual audiences alone often don't deliver enough volume)
- Consider OFF for awareness campaigns to avoid unintended expansion

---

## 5. Video-creative specs

Use [creative-strategy.md](creative-strategy.md#video-baseline) for production specs. Planning rules:

- Design for the objective first: reach, views, consideration, direct response, or CTV.
- Put brand/product/value in the opening; do not rely on an end-card reveal.
- Produce vertical 9:16 separately when Shorts inventory matters.
- Use subtitles or on-screen text where muted viewing is likely.
- Confirm current format-specific limits in the Google Ads UI before handoff.

---

## 6. The ABCD framework (creative principles)

A practical creative framework for YouTube ads. Use it as a quality floor for attention, brand memory, emotional connection, and action clarity.

### 6-1. A — Attract

The first 5 seconds decide everything. Skippable ads decide skip vs continue at the 5-second mark.

**Tactics:**

| Tactic | Description |
|---|---|
| **Tight framing** | Show the subject big; make the topic legible at a glance |
| **Show people** | Faces and expressions in the opening seconds attract attention |
| **Unexpected visuals** | Counterintuitive imagery makes the viewer think "what's this?" |
| **Quick cuts** | 2–3 cuts in the first 5 seconds. Static is the enemy |
| **Direct question** | "Are you struggling with…?" and other direct address |
| **Double hook** | Opening hook (0–5 s) + secondary hook (5–10 s) prevents drop-off in two stages |

### 6-2. B — Brand

**Tactics:**

| Tactic | Description |
|---|---|
| **Show within the first 5 seconds** | Logo / brand name / product within the first 5 s |
| **Audio mentions** | Mention the brand name in voice-over or jingle for auditory recall |
| **Repeat exposure** | Show the brand 3 times — opening, middle, close |
| **Real product use** | Show the product in actual use; tie brand to experience |

### 6-3. C — Connect

**Tactics:**

| Tactic | Description |
|---|---|
| **Humor** | Can improve receptivity when it fits the brand and offer |
| **Storytelling** | Use a tension → resolution arc to drive emotional pull |
| **Surface the audience's problem** | Show the pain the viewer recognizes as their own |
| **Real customer voices** | Reviews / testimonials build trust and connection |
| **Music** | BGM amplifies emotion. On Shorts, sound use has driven 20%+ CV lift in some cases (Google; varies by product / creative) |

### 6-4. D — Direct

**Tactics:**

| Tactic | Description |
|---|---|
| **Clear CTA** | Specific verbs — "Sign up now," "Learn more" |
| **Text card / animation** | Place CTA as on-screen text + voice for double conveyance |
| **Urgency** | "Limited time," "While supplies last" speeds action |
| **Specific offer** | "50% off your first order," "free trial" — concrete |
| **Show the URL** | Display the destination URL on screen for reassurance |

---

## 7. Creative design by format

### 7-1. Skippable in-stream (15 s to 3 min)

**The most versatile format — leverages ABCD fully.**

| Seconds | Content |
|---|---|
| 0–5 s | Hook + brand display (continuation decided here) |
| 5–15 s | Surface the problem → present the solution |
| 15–25 s | Proof / benefits, deeper dive |
| Last 3–5 s | CTA + brand re-display |

**Production points:**
- Even if skipped at second 5, the brand and core message must have landed.
- Length guideline: awareness 15–30 s; consideration 30 s to 2 min.
- Always add captions. For muted playback and accessibility.

### 7-2. Non-skippable (15–30 s)

**Full views are guaranteed; easier to land a complete story.**

| Seconds | Content |
|---|---|
| 0–3 s | Attention-grabbing opening (hook is less critical than skippable) |
| 3–12 s | Problem → solution → benefit |
| 12–15 s | CTA + brand close |

**Production points:**
- CTV viewing is growing; cinematic quality lands well.
- Stick to one message at 15 s. Don't cram.
- Repurposing TV CMs is fine, but recommend re-editing to add a hook up front.

### 7-3. Bumper (6 s)

**One message, one visual. Subtraction-as-art.**

| Seconds | Content |
|---|---|
| 0–2 s | Visual impact |
| 2–4 s | Core message (single sentence) |
| 4–6 s | Brand + CTA |

**Production points:**
- Convey only one message.
- Use text overlays (so it works with sound off).
- Effective as a reminder version of a longer skippable ad.
- Use as part of an Ad Sequence.

### 7-4. In-feed video ads

**The thumbnail decides everything. You have to win the user's voluntary click.**

**Thumbnail design:**
- Choose from 3 auto-generated candidates or upload a custom thumbnail.
- Thumbnails with text overlays tend to lift CTR.
- Including a person in the thumbnail tends to lift CTR.

**Video design:**
- Long-form (2–5 min) works because viewers are clicking voluntarily.
- Tutorial / explainer / review formats fit well.
- Open with "what you'll learn from this video."

---

## 8. YouTube Shorts ad design

### 8-1. Characteristics

- Vertical full-screen (9:16) mobile-first experience.
- Inserted between organic Shorts posts.
- Also delivered to desktop, tablet, CTV — but mobile optimization is the baseline.
- Channel name and description (2 lines × 35 chars) are displayed.

### 8-2. Recommended Shorts ad specs

| Item | Spec |
|---|---|
| Aspect ratio | 9:16 (vertical required) |
| Resolution | 1080 × 1920 (recommended) / 720 × 1280 (minimum) |
| Length | Demand Gen / App / PMax: 10–30 s. Video Views: 30–60 s |
| Sound | Strongly recommended. Music, voice-over, or both. If silent, cover with subtitles and text overlays |

### 8-3. Best practices for Shorts creative

| Point | Description |
|---|---|
| **Social-first** | Less ad-feel; texture that fits in with organic posts |
| **Vertical-native** | Plan and shoot vertically; don't crop landscape |
| **Hook fast** | First 2–3 seconds are about stopping the swipe |
| **Brisk pacing** | Single cuts of 2–3 seconds. Heavy use of jump cuts |
| **Use sound** | BGM or voice-over use has driven 20%+ CV lift in some cases (Google; varies by product) |
| **Text overlays** | On-screen text within the safe zone |
| **UGC feel** | Natural user-generated-content-style footage tends to perform |

### 8-4. Shorts safe zone

Important info shouldn't be hidden by UI elements (like / comment / share buttons).

- Top: avoid the channel name / status bar
- Bottom: avoid the description / CTA button area
- Right: avoid the like / comment / share buttons
- **Safe area:** roughly the central 80% of the screen

---

## 9. Optimizing for CTV (Connected TV)

### 9-1. Characteristics of CTV viewing

- CTV is primarily a reach, recall, and brand-impact environment rather than a last-click performance channel.
- Completion rates can be strong, especially for non-skippable and bumper-style formats, but the business readout should rely on reach, frequency, lift, search lift, or MMM-style contribution.
- Co-viewing can increase exposed audience, but it makes user-level attribution less precise.

### 9-2. CTV creative points

| Point | Description |
|---|---|
| **Cinematic quality** | High resolution / high quality that holds up on a TV screen |
| **Story-led** | Pairs well with non-skippable; let the story breathe |
| **Pacing** | Slightly more measured pacing to match TV viewing rhythm |
| **Brand emphasis** | Logo and product are highly visible on a large screen |
| **Talent** | When the on-camera talent says the brand name out loud, it lands |
| **QR codes** | CTV has no click affordance — QR codes are an effective bridge |

### 9-3. CTV-specific settings

- Google Ads device targeting allows "TV screens" selection.
- On CTV, full views of bumper / non-skippable ads are highly likely.
- Non-skippable ads on CTV inventory can run up to 30 seconds.

---

## 10. Demand Gen campaigns (the successor to Video Action)

### 10-1. VAC → Demand Gen migration

Video Action Campaigns are being upgraded to Demand Gen. For conversion-oriented video planning, use Demand Gen as the current default path and verify the migration state of any legacy VACs before making account changes ([Google Ads Help](https://support.google.com/google-ads/answer/15110871?hl=en)).

### 10-2. Demand Gen characteristics

| Item | VAC (legacy) | Demand Gen (current) |
|---|---|---|
| Surfaces | YouTube | YouTube + Discover + Gmail (separate from Display campaign / GDN; surfaces may expand further) |
| Creative | Video only | Video + image. Use both when the campaign needs broad surface coverage |
| Channel control | Limited | Detailed control, e.g. YouTube Shorts only |
| Lookalike Segments | — | Reach new users similar to seed lists. Availability varies by account / region |
| ROAS | — | Must be judged from the account's own conversion quality, assisted impact, and incrementality |

### 10-3. Demand Gen setup points

- **Bid:** Start with tCPA or Maximize Conversions; migrate to tROAS as data accumulates
- **Budget:** Use 3–5× target CPA/day as a workable floor; 10–15×+ is better when you need a faster read and the economics allow it
- **Creative:** Upload both video and image (only one limits surfaces)
- **Targeting:** Custom segments + Customer Match + Lookalike Segments (when available) + Optimized Targeting ON
- **Content targeting:** Don't add (causes delivery restrictions)
- **Surfaces:** Start with all surfaces ON; narrow based on data
- **CV design:** Use lighter CV events (cart adds, site visits) to accelerate learning
- **Operating period:** Run at least 4 weeks (up to 15% efficiency improvement is reachable)

### 10-4. Change rules for Demand Gen (don't break learning)

Demand Gen is sensitive to learning periods. Use the following rules to prevent change-driven incidents.

| Rule | Description |
|---|---|
| **Don't change multiple things at once** | Don't change targets (tCPA, etc.), budget, and primary assets in the same step. Change one at a time, with a 7–14 day verification window |
| **Log changes** | When, what, from-value, to-value. Required for diagnosing performance shifts |
| **Major target moves: clone the campaign** | When changing target CPA by 30%+, keep the existing campaign and roll out via a new one |
| **Asset-add timing** | Avoid asset add / remove during the learning period (~7 days after launch) |
| **Surface change discipline** | Channel control changes (YouTube / Discover / Gmail) can reset learning. Apply only after budget and target are stable |

---

## 11. Measurement and evaluation metrics (video-specific)

### 11-1. Key metrics

| Metric | Definition | Main use |
|---|---|---|
| **TrueView views** | 30-second view, video completion, or click; verify current naming and Video views campaign behavior before reporting ([Google Ads Help](https://support.google.com/google-ads/answer/13982458?hl=en)) | Video Views primary KPI |
| **View rate (VTR)** | TrueView views ÷ impressions | Evaluate creative attractiveness |
| **View-rate baseline** | Account and campaign-history baseline | Benchmark creative attractiveness against your own history and comparable campaigns |
| **CTR** | Clicks ÷ impressions | Evaluate the strength of action driving |
| **CTR baseline** | Account and campaign-history baseline | Benchmark action-driving strength against your own history and comparable campaigns |
| **View-completion rate** | Share of users who watched the video to the end | Evaluate content-retention strength |
| **CPV** | Cost ÷ TrueView views | View cost efficiency |
| **CPM** | Cost ÷ impressions × 1,000 | Reach cost efficiency |
| **CV count** | Number of conversions | Demand Gen primary KPI |
| **CPA** | Cost ÷ CV | CV cost efficiency |
| **View-through CV** | Saw the ad but didn't click or engaged-view; converted later | Indirect impact of video ads |
| **Cross-device CV** | Watched on one device → converted on another | Multi-device impact |

### 11-2. Brand Lift studies

Built-in lift-measurement workflow for awareness / consideration impact from video ads.

| Item | Detail |
|---|---|
| Measurable metrics | Ad recall, brand awareness, brand consideration, favorability, purchase intent |
| Required responses | ~4,100 responses per metric |
| Setup | Google Ads > Measurement > Lift Measurement > Brand Lift |
| Cost | No additional cost (included in delivery cost) |
| Recommended budget | Need enough impressions to detect the metric — confirm with your Google rep |

### 11-3. Metric sets per goal (what to look at, what to ignore)

| Goal | Primary KPIs | Supporting KPIs | Don't judge by |
|---|---|---|---|
| Awareness | Reach, CPM, Brand Lift | Frequency, ad-recall lift | CPA, CVR (judging awareness on CV efficiency understates the impact) |
| Consideration | VTR, view-completion rate, CPV | Engagement rate, channel subscribes, GA4 site visits | CPA alone (video contributes at the consideration stage; direct CV undersells it) |
| Conversion acquisition | CV count, CPA, ROAS | View-through CV, cross-device CV, CPC | VTR (under CV optimization, judge by CV quality and quantity, not view rate) |

> **VTC / EVC handling** (aligned with the unified policy in SKILL.md): EVC is the stronger non-click video signal and can flow into Conversions for supported campaign types. Track plain VTC separately from primary KPIs and evaluate it as indirect contribution. Combining click, EVC, and VTC without labels can make CPA look cleaner than the business reality.

---

## 12. Brand safety and surface management

### 12-1. Inventory types (delivery quality levels)

| Type | Content | Recommended for |
|---|---|---|
| **Expanded** | Delivery to all monetized videos. May include strong language and game-style violence | Maximum reach |
| **Standard** | Range suitable for most brands. Popular music videos, documentaries, etc. | **Recommended (default)** |
| **Limited** | Strict exclusion of inappropriate language and sexual suggestion. Some popular content also excluded | When brand guidelines are strict |

> **Note (as of 2026-02-23):** Inventory type is set at the account (advertiser) level — campaign-level overrides aren't available. The UI may shift; confirm at: Google Ads > Account settings > Brand suitability.

### 12-2. Content-exclusion categories

The following categories can be excluded from delivery:

- Tragedy and conflict
- Sensitive social issues
- Sensational and shocking content
- Sexual suggestion
- Profanity

### 12-3. Placement exclusions

| Exclusion target | Setting level | Cap |
|---|---|---|
| Specific YouTube channels | Account / campaign | 65,000 total per account |
| Specific videos | Account / campaign | Same |
| Specific websites / apps | Account / campaign | Same |
| Per-application max | — | 20,000 |

- Account-level placement exclusion is supported and applies across PMax / Demand Gen / YouTube / Display campaigns where available. Confirm at: Google Ads > Account settings > Placement exclusion list.
- Third-party exclusion lists (DoubleVerify, IAS, Zefr) are also supported.

### 12-4. Frequency cap

| Setting level | Description |
|---|---|
| Campaign | Set impression cap per day / week / month |
| Recommended setting | Awareness: 3–5/week. Consideration: 2–3/week. Remarketing: 5–7/week |

---

## 13. Video-creative operations

### 13-1. Creative refresh cycle

| Item | Recommendation |
|---|---|
| Refresh interval | Every 2–4 weeks for active accounts, adjusted by spend, fatigue, and approval capacity |
| Variation count | 3–5 minimum; 10+ ideal at high budget tiers |
| Test method | Google Ads video experiments (A/B: 2 arms; custom: up to 10 arms) |
| Test priority | 1. Hook (first 5 s) → 2. Offer content → 3. Visuals → 4. CTA |

### 13-2. A/B testing rules

- Change only **one** variable per test
- Test duration: **2 weeks minimum**
- Don't decide before statistical significance is reached
- Examples: hook, CTA copy, BGM on / off, video length, thumbnail

---

## 14. Common failure patterns and mitigations (video-specific)

### 14-1. Creative failures

| Failure | Problem | Mitigation |
|---|---|---|
| Repurposing TV CMs verbatim | No opening hook; skipped at 5 s | Re-edit a hook into the first 5 s. Restructure following ABCD |
| Landscape video only | Black bars on Shorts and mobile full-screen; engagement drops | Produce vertical (9:16) and ship as a set |
| Cramming messages | Information overload; nothing memorable | One message per video. Strict on bumpers |
| No CTA | Action after viewing is unclear | CTA at the close + text overlay + voice |
| No thumbnail optimization | In-feed CTR drops | Build a custom thumbnail. Person + text combos work well |
| No captions | Doesn't land in muted environments | Add captions to every video |

### 14-2. Campaign-design failures

| Failure | Problem | Mitigation |
|---|---|---|
| Adding content targeting to Demand Gen | Severely restricts delivery | Use audience targeting only for CV goals |
| Sharp budget jumps | Learning resets; performance drops | Step in ≤20% per week |
| Changes during learning | Optimization stalls | Hold off for ≥7 days |
| Using Video Views for CV goal | CV optimization doesn't engage | Use Demand Gen for CV goals |
| Mixing all formats in one campaign | Can't optimize per goal | Split awareness, consideration, CV into separate campaigns |

### 14-3. Targeting failures

| Failure | Problem | Mitigation |
|---|---|---|
| Targeting too narrow | Insufficient delivery; learning stalls | Awareness: broaden. CV goal: Optimized Targeting ON |
| No frequency cap | Same user over-served; ad fatigue | Set caps per goal (awareness: 3–5/week) |
| Not reviewing the placement report | Budget wasted on low-quality surfaces | Weekly placement review; exclude inappropriate placements |
| No remarketing list built | Can't re-approach video viewers | Build video-viewer lists and use them in remarketing |

### 14-4. Measurement failures

| Failure | Problem | Mitigation |
|---|---|---|
| Ignoring view-through CV | Indirect impact undervalued | Add view-through CV column to reports |
| Last-click-only evaluation | Video contributes upstream of search / remarketing; gets undervalued | Adopt data-driven attribution (DDA) |
| No Brand Lift study | Can't measure impact of awareness goals | Set up Brand Lift when budget allows |
