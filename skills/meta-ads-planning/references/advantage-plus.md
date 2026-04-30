# Meta Advantage+ automation

Use this reference when deciding whether Meta automation should be used, limited, or replaced with a manual structure. Keep measurement implementation details in `measurement-and-attribution.md`.

## Operating model

1. Advantage+ has shifted from optional opt-in to default ON for the three end-to-end campaign families (Sales, Leads, App). Manual mode still exists for those objectives but is increasingly framed as a fallback.
2. The "Advantage" (without the plus) ad-set-level optimizations are mostly auto-applied on new ad sets and many cannot be disabled cleanly. Detailed Targeting expansion behavior is no longer a checkbox, it is the default.
3. Attribution windows and API field names change. Verify the current Ads Manager/API behavior before hard-coding view-through, click-through, or engage-through assumptions.
4. Keep click-through, engage-through, and view-through reporting separated when the account exposes those splits; non-link social interactions should not be interpreted as outbound-link clicks.
5. CAPI is no longer optional for serious accounts. AEM no longer caps at 8 events per domain (cap removed 2025-06). Pixel-only is treated as a measurement bug.
6. The phrase "the campaign is Advantage+" in current UI means: Advantage+ Audience + Advantage+ Placements + Advantage Campaign Budget are all on at the same time. The green "Advantage+" label in Ads Manager is the visual confirmation.


---

## Advantage+ suite

The Advantage+ universe has three layers. The layer matters for the planning skill because each layer has different "reversibility": an end-to-end Advantage+ campaign is hard to undo without losing learning, but a single Advantage Detailed Targeting toggle is cheap to flip.

| Layer | Scope | Examples | What flipping it costs |
|---|---|---|---|
| Campaign-level (end-to-end) | Whole campaign automation: targeting + placement + budget + creative selection | Advantage+ Sales, Advantage+ Leads, Advantage+ App | High: structural decision, restarts learning, changes reporting columns |
| Ad-set-level | Single dimension automation inside a manual campaign | Advantage+ Audience, Advantage+ Placements, Advantage Campaign Budget, lookalike/CA/detailed-targeting expansion | Medium: per-ad-set, may restart learning |
| Ad-level / creative-level | Per-asset enhancements applied at delivery time | Advantage+ Creative (visual touchups, image expansion, video expansion 9:16, music, text variations, generative AI) | Low: granular per-feature toggle, no campaign restart |

### 1.1 Advantage+ Sales campaigns

Formerly "Advantage+ Shopping Campaigns" (ASC). Renamed mid-2024 and broadened to cover non-pure-DTC sales journeys.

| Field | Value |
|---|---|
| What is automated | Audience, placement, budget allocation across ad sets, creative selection, real-time delivery |
| Required objective | Sales (purchase / value-based optimization) |
| Required signals | Pixel + CAPI events for purchase / value, ideally with EMQ 6+ |
| Catalog requirement | Not required; catalog ads can be slotted in but Advantage+ Sales is broader than DPA |
| Manual controls remaining | Audience suggestions (CA, LAL, age, gender), exclusions (CA only, hard), campaign budget, attribution setting, creative roster |
| Existing customer cap | Control availability has changed repeatedly. Do not promise this control without checking the current account UI. |
| Budget guidance | Meta's stated rule of thumb: enough budget to clear 50 conversions/week per ad set |
| Multiple ad sets | Yes. Sales campaigns can include multiple ad sets, up to 50 ads each. |
| Reporting columns | New vs existing customer split available where Customer Lists are configured |
| Risk: cannibalization | Existing-customer harvesting if cap removed; verify with backend new-customer rate |
| Risk: catalog exposure | If the brand has narrow SKU range, automation may concentrate spend on a few products |


Skill stance: do not use Advantage+ Sales as a fix for poor measurement, weak product-market fit, bad catalog feed, or chronically underfunded learning phases. Always verify backend new-customer rate, not just platform-attributed ROAS.

### 1.2 Advantage+ Leads campaigns

| Field | Value |
|---|---|
| What is automated | Audience, placement, budget allocation, creative match |
| Required objective | Leads |
| Conversion locations | Instant Forms (Lead Ads), website lead form, Messenger, calls. Mix allowed. |
| Required for "Advantage+ ON" status | Advantage+ audience + Advantage+ placements + Advantage Campaign Budget + at least one qualifying ad set |
| Manual controls remaining | Audience suggestions, location/age/language/CA exclusions, conversion-location selection, CRM (Conversion Leads) integration |
| Quality optimization | Conversion Leads CRM optimization is the recommended quality lever; works only if Lead ID is captured back into Meta |
| Eligibility caveats | "Available for eligible accounts"; account-specific rollout may differ |
| Risk | Optimizing for raw lead volume hides bad leads; without CRM feedback, Advantage+ Leads will scale junk |


Skill stance: do not turn on Advantage+ Leads alongside instant-form-only setup unless the brand is fine optimizing for raw form fills. Pair with Conversion Leads + CRM stage feedback before scaling.

### 1.3 Advantage+ App campaigns

| Field | Value |
|---|---|
| What is automated | Audience, placement, creative selection, bid strategy (auto CPI), budget |
| Required objective | App promotion |
| Required integration | Meta SDK or MMP (AppsFlyer, Adjust, Branch, Kochava, Singular, etc.) |
| iOS specifics | Must coexist with SKAdNetwork / AdAttributionKit and Meta AEM-for-app; campaign must be tagged correctly to avoid event dedup issues |
| Creative cap | Up to 50 creatives per campaign |
| Optimization goals | App install, app event, value |
| Controls remaining | App, country, language, OS split (manual fallback), ATT-aware event mapping |
| Risk | iOS modeling means click-through and view-through are partially modeled; cannot interpret platform CPA as truth without MMP cross-check |


Skill stance: never optimize an iOS app install campaign on Meta-attributed installs alone. Require MMP/AEM-for-app reconciliation. Separate iOS and Android if economics or event volume diverge.

### 1.4 Advantage+ Audience (ad-set-level)

Formerly "Advantage Detailed Targeting expansion" plus broad-targeting AI; consolidated into a single ad-set-level object.

| Field | Value |
|---|---|
| What is automated | Audience selection beyond manually-input interests, custom audiences, lookalikes, demographics |
| Hard controls (AI cannot violate) | Minimum age, location (geo), language, custom audience exclusions |
| Soft controls (treated as suggestions) | Custom audiences as inclusions, lookalikes, age range above the minimum, gender, detailed targeting interests |
| Auto-application | Auto-applied to new campaigns where available. Exception: Advantage+ Sales sets it implicitly. Manual ad sets get a "Switch to Advantage+ Audience" prompt. |
| Effect on detailed targeting | Detailed targeting acts as a seed, not a fence. Cannot be relied on for compliance segregation. |
| Effect on lookalikes | lookalikes are now a "starting hint" inside Advantage+ Audience, not a true audience floor |
| Detailed targeting exclusions | Removed from Advantage+ Audience. Meta removed detailed targeting exclusions from new ad sets and from active existing campaigns created in Ads Manager starting 2025-03-31. |
| Risk | If the campaign requires audience guarantees (compliance, brand safety, age-restricted), Advantage+ Audience cannot deliver them via interests |


Skill stance: only encode "exclusion of audience X" as a hard control if X is a custom audience or a hard demographic (age/location/language). Anything else is a hint.

### 1.5 Advantage+ Placements (ad-set-level)

| Field | Value |
|---|---|
| What is automated | Placement selection across Facebook, Instagram (Feed/Stories/Reels/Explore), Messenger, WhatsApp marketing messages, Audience Network, Threads where eligible |
| Default | On by default for Advantage+ Sales, Leads, App; default but editable for manual ad sets in most objectives |
| Reportedly required for "Advantage+ ON" status | Yes, all-placements selected counts as Advantage+ Placements ON |
| Manual controls | Per-placement opt-out (Edit placements > uncheck), exclusion of Audience Network, exclusion of Reels/Stories/Feed individually |
| Risk: Audience Network | Often cited as low-quality lead source when CPL is suspiciously low; verify with engagement and downstream CRM |
| Risk: Reels-only fit | Creative must be 9:16 with safe-zone-aware composition for Reels/Stories. Auto-crop is not the same as Reels-native creative. |


Skill stance: default to Advantage+ Placements; only opt out of placements with evidence (placement-level CPA, lead quality by source). Do not opt out of Reels just because creative was made for Feed; produce Reels-fit creative instead.

### 1.6 Advantage Campaign Budget (CBO)

CBO survives in 2026 under the "Advantage" (without the plus) brand. Required for Advantage+ ON status when running manual objectives that have an Advantage+ form (Sales, Leads, App).

| Field | Value |
|---|---|
| What is automated | Budget allocation across ad sets in real time |
| Manual controls | Campaign-level daily/lifetime budget, ad-set spend limits (min/max per ad set), bid strategy |
| Risks | Overspend on a single ad set if min/max not set; harvesting of cheaper but lower-quality conversions |
| Interaction with Advantage+ campaign | If Advantage+ Sales/Leads/App is on, CBO is implicit; cannot run ABO inside an Advantage+ end-to-end campaign |

Skill stance: when running manual objectives, prefer CBO with ad-set spend limits when ad sets share a learning event; prefer ABO when ad sets test conceptually different audiences/creatives at fixed budget.

### 1.7 Advantage+ Lookalike (lookalike expansion)

A residual ad-set-level feature now mostly subsumed by Advantage+ Audience.

| Field | Value |
|---|---|
| What is automated | Allows delivery beyond the percentage band of the lookalike (e.g., beyond 1%) when AI predicts higher conversion |
| Status 2026 | Functionally replaced by Advantage+ Audience. Lookalikes are deprecated as a primary targeting object for many objectives. |
| Risk | Reporting on "lookalike performance" is misleading because actual delivery extended beyond the source |


Skill stance: do not encode lookalikes as an independent strategy in 2026. Use them as one input to Advantage+ Audience.

### 1.8 Advantage Detailed Targeting (interest expansion)

| Field | Value |
|---|---|
| What is automated | Delivers beyond the listed interests when better performance is predicted |
| Status 2026 | Subsumed by Advantage+ Audience. Many granular interest categories were consolidated 2025-06-23 and further removed 2026-01-15. |
| Detailed targeting exclusions | Removed from new ad sets and from active existing campaigns created in Ads Manager starting 2025-03-31 |
| Risk | Skill must not promise interest-level fences; interests cannot constrain delivery |


### 1.9 Advantage Custom Audience (custom audience expansion)

| Field | Value |
|---|---|
| What is automated | Delivers beyond the seed CA when AI predicts higher conversion |
| Status 2026 | Effectively folded into Advantage+ Audience inclusion behavior |
| Hard control | CA exclusions remain a hard fence; CA inclusions do not |
| Risk | "Retargeting only the CA" is not enforceable through inclusion alone |

Skill stance: for true retargeting (only show to people who visited a page), use exclusion of "everyone except CA" via stacked exclusion of broad audiences, but accept that this may force the system out of Advantage+ Audience. Verify in current UI.

### 1.10 Advantage+ Creative (ad-level)

Advantage+ Creative is a bundle of asset-level enhancements applied at delivery time, plus a growing set of generative AI features. Each enhancement is independently toggleable.

#### Visual enhancements

| Feature | What it does | Where | Risk |
|---|---|---|---|
| Image expansion | Generative AI fills the canvas to fit different aspect ratios across Feed/Stories/Reels | Single image, carousel | Off-brand artifacts on logo/text edges |
| Visual touch-ups | Automatic crop, brightness, contrast, color adjustment | Single image | Mild brand-feel drift |
| Aspect ratio variation | Generates 9:16 / 1:1 / 4:5 versions | Single image, video | Composition can break safe zones |
| Background generation | Generative AI creates new product backgrounds, prompt-driven | Catalog/single image | Hallucinated context (e.g., wrong setting) |
| 3D animation / image animation | Subtle motion on a still image | Single image | Distracts from CTA in some categories |

#### Text enhancements

| Feature | What it does | Risk |
|---|---|---|
| Text variations | Recombines and rewrites primary text, headline, description; may swap order | Brand voice drift, claims accuracy |
| Highlight key sentences | Bolds or emphasizes parts of body copy | Can over-emphasize regulatory-sensitive phrasing |
| Text generation | Generative AI suggests new headlines / primary text variants based on uploaded asset and brand inputs | Compliance review needed before publish |
| Text translation | Translate primary text and headline into supported languages (Spanish, Portuguese, German, French, Vietnamese, Chinese, Hindi, Tagalog, Bengali, etc.) | Localization quality; legal copy must be human-reviewed |

#### Audio / video enhancements

| Feature | What it does | Risk |
|---|---|---|
| Music | Auto-selects a track from Meta's library; advertiser can pin a track | Genre mismatch; rights are Meta-managed |
| Video expansion (to 9:16) | Generative AI extends frame edges to make horizontal/square video fit Reels | Edge artifacts; subject re-centering issues |
| Video animation from still | Generative AI converts a single image into a short animated video | Hallucinated motion that misrepresents the product |
| Voice dubbing / AI voice | Automatic voiceover, multilingual dubbing | Voice persona drift; legal limits in some categories |
| Most relevant comment | Surfaces a top comment beneath the ad on Facebook/Instagram | Negative comment risk if surface logic chooses badly |

#### Brand controls

| Feature | What it does |
|---|---|
| Brand Kit / brand consistency | Upload logo, colors, fonts; AI applies them across generated variations |
| Persona-targeted variants | Generates multiple ad variants per audience persona (value-seeker vs style-driven, etc.) |


Skill stance: visual touch-ups + image expansion are the safest defaults. Generative text and music are the highest-risk-to-brand and require explicit creative review per campaign. For regulated categories (finance, health, employment) all generative variations must be human-reviewed pre-publish.

### 1.11 Advantage+ Catalog Ads

Catalog ads (formerly Dynamic Product Ads / DPA) sit under Advantage+ branding now. The Catalog ad placement is its own surface.

| Field | Value |
|---|---|
| What is automated | Picks the right product, image, and increasingly video from the catalog for each impression |
| Catalog inputs | Standard product feed (id, title, image, price, availability, link, description, condition, brand, GTIN, custom labels) |
| Format | Carousel, collection, single (default); video formats now supported via Dynamic Media for Catalog Ads |
| Catalog video | Video can be attached at SKU level; Meta selects video vs static per impression |
| Catalog enhancements | Background generation, image expansion, text overlays, video animation are available on catalog assets |
| Risk | Feed errors (missing image, "out of stock", broken URL) silently kill product delivery; unhealthy catalog is invisible failure |


Skill stance: catalog feed health is a first-class diagnostic. Before optimizing budget, run a catalog QA: rejected items, low-quality images, missing GTIN, price mismatches, URL errors, and inventory sync freshness.

### 1.12 What does "Advantage+" actually mean on a campaign?

The phrase has two definitions in current UI and the planning skill must keep them separate.

| Definition | Trigger | Visual marker |
|---|---|---|
| End-to-end Advantage+ campaign | Created via the "Advantage+ Sales / Leads / App campaign" flow | Campaign type label "Advantage+" at creation |
| "Advantage+ ON" badge on a manual campaign | All three at the same time: Advantage+ Audience ON + Advantage+ Placements ON + Advantage Campaign Budget ON, plus at least one qualifying ad set | Green "Advantage+" pill in the Ads Manager campaign row |


Skill stance: when the operator says "the campaign is Advantage+", clarify which of the two definitions they mean. The end-to-end form has stricter constraints (limited audience controls, no ABO) than a manual campaign with the green pill.

---

## Advantage+ vs manual decision tree

```
Is the business outcome an outcome Advantage+ supports?
  Sales (purchase / value)            -> Advantage+ Sales is candidate
  Leads (form / quality lead)         -> Advantage+ Leads is candidate
  App install / app event             -> Advantage+ App is candidate
  Awareness / Traffic / Engagement / Reach / Video views -> No end-to-end Advantage+ form;
                                        use manual + Advantage+ Audience + Advantage+ Placements + Advantage+ Creative

If outcome is supported:
  Is measurement healthy?
    Pixel + CAPI deployed, dedup verified, EMQ 6+, value/currency stable -> Continue
    No                                                                     -> Stop. Fix measurement first; manual w/ tighter targeting.

  Is event volume sufficient?
    >= 50 conversions/week per ad set, or campaign-level CBO viable        -> Continue
    No                                                                     -> Manual with broader event (e.g., AddToCart) or fewer ad sets.

  Are there hard audience constraints?
    Only minimum age, location, language, CA exclusions                    -> Advantage+ OK
    Need interest fence, lookalike floor, age range cap, gender exclusion  -> Manual; Advantage+ Audience cannot guarantee these.

  Is creative shaped for the placements?
    Reels-fit 9:16, safe zone respected, multiple variants                  -> Advantage+ Placements OK; allow Advantage+ Creative enhancements
    Feed-only horizontal asset, no Reels variant                            -> Either produce Reels-fit asset, or manual + Feed-only.

  Is the brand regulated (finance / employment / housing / health / politics)?
    Yes                                                                    -> Manual; Advantage+ Audience and generative creative both add policy risk.
    No                                                                     -> Advantage+ green-lit subject to above.

If outcome is not supported (Awareness/Traffic/Engagement/Reach/Video):
  Use manual campaign objective with:
    Advantage+ Audience ON (unless audience hard-constrained beyond age/geo/language/CA)
    Advantage+ Placements ON
    Advantage Campaign Budget ON if multi-ad-set
    Advantage+ Creative enhancements selectively (visual touch-up + image expansion safe defaults)
```

---

## Volatile capability checklist

Items in this list have changed in 2024-2026 and should be re-verified before encoding as a hard rule in the skill.

| Item | Why volatile | Action |
|---|---|---|
| Existing Customer Budget Cap on Sales campaigns | Controls and naming have changed repeatedly | Verify in current UI before promising |
| Attribution-window API support | Reporting windows can be removed or renamed | Check Marketing API / Ads Insights behavior before dashboard recommendations |
| Click-through vs engage-through definition | Interaction classification has changed | Reset baselines when definitions change |
| AEM event caps / AEM UI | Event limits and setup surfaces have changed | Do not tell users to manually select a fixed event cap unless current UI requires it |
| Detailed Targeting and exclusions | Interest categories and exclusion controls change often | Do not encode specific interest names or exclusion availability without checking UI |
| Lookalike audiences as primary targeting | Often folded into Advantage+ Audience behavior | Do not encode as standalone default strategy |
| Advantage+ ON badge criteria | UI label and requirement wording may shift | Verify exact wording in current UI |
| Catalog video / Dynamic Media for Catalog Ads | Availability can vary by account and rollout | Confirm availability per account |
| Conversion Leads requirements | CRM-stage and event requirements are setup-sensitive | Re-check Developer docs before promising eligibility |
| EMQ score thresholds | EMQ is diagnostic, not a stable planning contract | Use as directional signal only |
| Generative AI features | Per-account availability varies | Verify per account and review brand fit |
| Special Ad Category targeting restrictions | Policy changes can alter targeting and forms | Re-read Meta Advertising Standards before launch |

Current official checks for the volatile items above:

- Meta Advantage+ Sales: https://www.facebook.com/business/ads/meta-advantage-plus/sales-campaigns
- Meta Advantage+ Leads: https://www.facebook.com/business/ads/meta-advantage-plus/leads
- Meta Advantage+ App: https://www.facebook.com/business/ads/meta-advantage-plus/app-campaigns
- Meta Advantage+ Audience: https://www.facebook.com/business/ads/meta-advantage-plus/audience
- Meta Advantage+ Placements: https://www.facebook.com/business/ads/meta-advantage-plus/placements
- Meta Advantage+ Creative: https://www.facebook.com/business/ads/meta-advantage-plus/creative
- Meta Conversions API server events: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event
- Meta CAPI deduplication: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- Meta Conversion Leads CRM integration: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration

---

## How to use this reference in planning

Use this file when a recommendation depends on any of the following:

- Whether to use Advantage+ Sales, Advantage+ Leads, Advantage+ App, or a manual structure.
- Which Advantage+ controls are still human-owned: customer definitions, exclusions, catalog/feed quality, conversion event, value, creative quality, budget, and incrementality tests.
- How to interpret 2026 attribution/API changes, especially click-through vs engage-through vs view-through.
- Whether Pixel/CAPI/offline/CRM/app events are good enough for the proposed optimization event.
- Whether a dashboard or API pipeline needs attribution-window migration.
- Which current UI controls must be verified before promising a feature.

When this file conflicts with a shorter overview file, prefer this file and add a "verify current UI/API" caveat for volatile controls.

---

## Advantage+ controls by objective

The grid below is the "horizontal layer" the planning skill references when a per-objective playbook is selected. Read each row as: "for objective X, which Advantage+ controls are available, default, hard, or unavailable".

| Objective | A+ end-to-end form | A+ Audience | A+ Placements | A+ CBO | A+ Creative | Catalog ads | Conversion Leads | iOS app constraint |
|---|---|---|---|---|---|---|---|---|
| Sales (purchase / value) | Available (A+ Sales) | Default ON; hard fences = age min, geo, language, CA exclusions | Default ON | Default ON in A+ Sales; optional in manual | Available | Yes (DPA / catalog) | N/A | Web measurement; AEM auto |
| Leads | Available (A+ Leads) | Default ON | Default ON | Default ON in A+ Leads | Available | No | Strongly recommended | N/A |
| App promotion | Available (A+ App) | Default ON, but constrained by app store/region | Default ON | Default ON in A+ App | Available, lighter set | App-only catalog (catalog mobile app ads) | N/A | SKAN + AdAttributionKit + AEM-for-app required |
| Awareness | No A+ end-to-end form | Manual default; A+ Audience opt-in | Default ON | Optional CBO | Limited Creative enhancements | No | N/A | iOS view-through is heavily modeled |
| Traffic | No A+ end-to-end form | Manual default; A+ Audience opt-in | Default ON | Optional CBO | Available | No | N/A | Limited |
| Engagement | No A+ end-to-end form | Manual default | Default ON | Optional CBO | Available | No | N/A | Limited |
| Reach | No A+ end-to-end form | Manual default | Default ON | Optional CBO | Limited | No | N/A | Limited |
| Video views | No A+ end-to-end form | Manual default | Default ON | Optional CBO | Limited | No | N/A | Engage-through 5s threshold matters |
| Messages | Niche A+ form for messaging in some regions | Manual or A+ Audience | Default ON (incl. WhatsApp marketing where eligible) | Optional CBO | Available | No | N/A | Limited |

Row-by-row availability shifts with rollout; verify in current UI per account.

## Manual fallback structures

When Advantage+ end-to-end form is the wrong fit, planning falls back to manual objective + ad-set Advantage controls. Recommended skeletons:

### 9.1 Sales fallback (manual purchase)

```
Campaign
  Objective: Sales (purchase, optimization for value where possible)
  Bid strategy: Highest value (or cost cap if you have a tested target ROAS)
  Budget: CBO with ad-set spend caps if 2+ ad sets share the same audience family
Ad set A: Broad + A+ Audience seed = nothing (truly broad)
  Hard controls: country, language, age min
  CA exclusions: customers, returning visitors (decide per strategy)
Ad set B: Retargeting (CA inclusion only)
  CA inclusion: site visitors 30d / ATC 30d / IG-FB engagers 30d
  Note: with 2026 rules, CA inclusion does not fence delivery; verify in UI
Ad set C (optional): Region/segment cut for compliance or business reasons
Ads
  4-8 concept-diverse creatives per ad set
  Mix of single image, single video, carousel
  9:16 versions for Reels/Stories
  A+ Creative: visual touch-ups + image expansion ON; text variations and music selectively
```

### 9.2 Leads fallback (manual leads)

```
Campaign
  Objective: Leads
  Conversion location: depends on funnel; Instant Forms for low-intent volume, website for higher-intent
  Optimization: Conversion Leads if CRM stage feedback is wired; otherwise Lead.
Ad set A: Broad + A+ Audience
  Hard controls: country, language, age min
Ad set B: Retargeting (CA inclusion of warm website / engagement)
Ads
  3-6 concepts; lead-magnet hook, social proof, urgency where compliant
  9:16 + 1:1 + 4:5 versions
  A+ Creative: visual touch-ups ON; generative text OFF until brand-reviewed
```

### 9.3 App fallback (manual app)

```
Campaign
  Objective: App promotion (manual)
  Optimization: app event (post-install) where data supports it; otherwise installs
Ad set per OS (iOS / Android), per region if needed
  Hard controls: country, language, OS, age min
Ads
  6-12 concepts
  Vertical (9:16) priority for Reels/Stories
  Playable / cinemagraph / UGC mix
  A+ Creative: visual touch-ups + image expansion ON
```

### 9.4 Awareness/Traffic/Engagement fallback

These objectives never had an Advantage+ end-to-end form. Use:

- Awareness: Reach optimization, frequency cap (e.g., 2/7 days), broad audience, A+ Placements ON
- Traffic: Landing page views (NOT link clicks) optimization, A+ Audience ON, A+ Placements ON
- Engagement: pick the engagement type carefully (post engagement / video views / Page likes); engagement is rarely a downstream value driver

Skill stance: do not recommend Engagement or Traffic objectives for revenue-driving campaigns. They optimize toward cheap proxies and break attribution comparison.

---

## Advantage+ Creative on/off matrix by category

Defaults that the planning skill can recommend, subject to per-account brand review.

| Category | Visual touch-ups | Image expansion | Aspect-ratio variation | Background gen | Music | Text variations | Generative text | Video animation | Voice dubbing |
|---|---|---|---|---|---|---|---|---|---|
| E-commerce (DTC general) | ON | ON | ON | ON | OFF default, test | ON | ON, brand-reviewed | OFF default, test on hero SKUs | OFF |
| E-commerce (luxury / fashion) | ON | OFF | ON | OFF | OFF | OFF | OFF | OFF | OFF |
| Local services | ON | ON | ON | OFF | ON | ON | OFF | OFF | OFF |
| B2B SaaS | ON | OFF | ON | OFF | OFF | OFF | OFF | OFF | OFF |
| Education / courses | ON | ON | ON | OFF | OFF | ON | OFF | OFF | OFF |
| Health / wellness (regulated) | ON | OFF | ON | OFF | OFF | OFF | OFF | OFF | OFF |
| Finance (regulated) | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF |
| Employment (Special Ad Cat) | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF |
| Housing (Special Ad Cat) | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF |
| Politics (Special Ad Cat) | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF | OFF |
| Apps / games | ON | ON | ON | ON | ON | ON | ON | ON | OFF default |
| Restaurants / food | ON | ON | ON | OFF | ON | ON | OFF | OFF | OFF |
| Travel | ON | ON | ON | OFF | ON | ON | OFF default | OFF default | OFF |

Skill stance: in regulated categories, every generative variant must be reviewed by a human before publish; the AI-suggested wording can violate platform policy or regulator policy even when it is technically true.

---

## Volatile planning questions

Items the skill should explicitly mark "to verify in current UI / API" rather than encoding as fact:

1. Exact wording of the green "Advantage+" pill in current Ads Manager (could be relabeled).
2. Whether Existing Customer Budget Cap is available, removed, or changed in the operator's account.
3. Whether `1d_engaged_view` is the live API parameter name for engage-through, or whether Meta has renamed the API token.
4. Per-account availability of generative video animation, voice dubbing, and Brand Kit features.
5. Whether Conversion Leads is supported for non-Lead-Ads website lead forms in the operator's account.
6. The current list of supported translation languages for Advantage+ Creative text translation (changes quarterly).
7. The current Catalog video / Dynamic Media for Catalog Ads availability for the operator's catalog type.
8. Detailed targeting interest categories that survived the 2026-01-15 consolidation for the operator's vertical.
9. Whether the Integration Quality API beta is enabled on the operator's account.
10. Whether AEM-for-app coexists cleanly with the operator's MMP (verify mapping in MMP dashboard).

The skill should record the operator's verified answers as planning inputs, not assume them.

---
