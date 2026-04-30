# Meta Leads campaigns

## Operating practice

Lead campaigns work when the **lead path, form/message design, qualification logic, response operations, and CRM feedback loop** are designed against a single business outcome (qualified pipeline / booked appointments / closed revenue), not against raw CPL.

### What matters most

- **Cheap CPL is not success.** Optimize against qualified-lead rate, contact rate, appointment rate, SQL/opportunity rate, close rate, and revenue. Treat raw CPL as a front-end operational metric only.
- **Friction is a lever, not a defect.** Higher Intent forms and qualification questions deliberately reduce volume to raise quality. The right friction depends on the deal size, sales bandwidth, and lead-quality history.
- **Conversion Leads is the strongest quality unlock when eligible.** When the account meets the readiness conditions (200 leads/month, 15-16 digit Meta Lead ID mapped, daily upload, optimized stage within 28 days, stage CVR 1-40%), Meta optimizes toward the deeper CRM stage rather than form fill. Without those conditions, do not promise it.
- **Advantage+ Leads is automation-first, not a magic button.** When Advantage+ is on, audience, placements, and campaign budget are simultaneously automated; only custom audience exclusions, age 18+, location/language, and account-level controls are honored without disabling Advantage+. Do not blame Advantage+ for poor lead quality before checking form, offer, follow-up, and CRM feedback.
- **Speed-to-lead beats form length.** For high-intent Meta-sourced leads, design operations around very fast acknowledgement and routing; click-to-message leads are essentially live and lose intent quickly.
- **Source breakdowns reveal where quality varies.** Placement, ad, form, audience, gender/age, region, and creative breakdowns surface which combinations produce qualified pipeline vs. junk.
- **EMQ is a diagnostic, not a KPI.** Higher EMQ means Meta can match more lead events to user identities, which improves Conversion Leads / lookalike-from-leads / customer-list workflows. Treat 7+ as "good", 9+ as "great"; do not write hard "EMQ must be 8+" rules.
- **Special Ad Categories collapse the targeting / measurement / optimization toolkit.** If the offer is Finance, Employment, Housing, or Politics/Social Issues, planning must happen before campaign setup. Custom audiences, lookalikes, ZIP, age/gender, and many lead-form question types are restricted.

### Diagnosis cheat-sheet

| Symptom | First checks | Likely action |
|---|---|---|
| Cheap CPL, poor SQL | Form type, qualification questions, follow-up SLA, placement breakdown, audience breadth | Switch More Volume to Higher Intent, add 1-3 qualifying questions, build CRM feedback, exclude weak placements only with evidence |
| High form opens, low submits | Form length, intro screen clarity, trust cues, conditional logic dead-ends | Shorten form, strengthen intro / value prop, fix conditional branches |
| Many leads, very few contacts | Phone/email validity, prefilled vs typed inputs, autofill abuse | Enable SMS verification, turn off autofill for phone/email, add typed short-answer for phone |
| WhatsApp/Messenger volume but no qualification | Welcome message specificity, response speed, qualifying script | Pre-filled message, agent SLA under 5s for auto-ack, qualification chatbot |
| Calls volume, low quality | Country code, business-hours scheduling, call ad creative qualifies | Use lifetime budget + dayparting, qualify in ad copy, add call-tracking to CRM |
| Volume good early, then collapse | Audience exhaustion, creative fatigue, learning reset, attribution-window changes | Refresh creative, broaden audience, hold edits, audit attribution-window setting |
| Conversion Leads not optimizing | Volume below 200/mo, lead ID mismatch, stage CVR outside 1-40%, latency >28d | Reset to Maximize Leads while you re-build feedback loop |

### Common traps

- Scaling because CPL is low; never auditing CRM stages.
- Running More Volume forms in regulated industries where lead quality matters most.
- Treating "Conversion Leads" as a button rather than a months-long CRM-CAPI program.
- Pulling ad set after 24-48h before learning has stabilized; for leads, allow at least 7 days at meaningful event volume.
- Stacking too many qualification questions before value is communicated, suppressing the funnel.
- Letting Audience Network deliver the majority of impressions on a lead campaign without verifying source quality.
- Promising Advantage+ Leads and then over-restricting audience / placement, silently disabling Advantage+.
- Forgetting that when an account is flagged Special Ad Category, custom audience exclusions, lookalikes, and many demographic filters disappear.

Glossary terms used throughout this document live in `SKILL.md` (to be added to the Meta planning skill glossary).

---

## Decision matrix by monthly lead volume / qualified-lead rate

This matrix replaces the Google Ads "monthly conversions" matrix with two axes that matter most for Meta Leads.

| Monthly lead volume | Qualified-lead rate | Recommended path | Performance goal | Form posture | Bid strategy |
|---|---|---|---|---|---|
| <50 | Unknown / unstable | Manual Leads, Instant Form (More Volume) OR Website form if Pixel/CAPI clean | Maximize number of leads | Short, 1-2 qualifying questions, custom intro | Highest volume; no cost cap |
| 50-200 | <20% qualified | Manual Leads, switch to Higher Intent, add 2-3 qualification questions; build CRM feedback in parallel | Maximize number of leads | Higher Intent + SMS verification if phone is core asset | Highest volume; consider cost cap once 7-day CPL stabilizes |
| 50-200 | 20-50% qualified | Manual Leads, More Volume + qualification questions OR Higher Intent | Maximize number of leads | Tight form, 1-3 quals | Highest volume; cost cap if learning stable |
| 200-500 | <30% qualified | Conversion Leads readiness build (target 28d stage <40% CVR), Higher Intent forms, CRM feedback live within 90 days | Maximize number of leads (interim) → Maximize conversion leads (after readiness) | Higher Intent or website form; SMS verification | Highest volume during transition; cost cap once Conversion Leads stable |
| 200-500 | 30-50% qualified | Advantage+ Leads with CRM feedback; Conversion Leads optimization | Maximize conversion leads | Higher Intent or Rich Creative | Cost cap based on cost-per-qualified-lead target |
| 500+ | 30%+ qualified | Advantage+ Leads + Conversion Leads as default; manual Leads for restricted categories or strict controls | Maximize conversion leads | Higher Intent, Rich Creative for high-consideration offers | Cost cap or bid cap per stage economics |
| 500+ | <30% qualified | Diagnose first (form/audience/creative). Do not scale on volume alone. | Maximize number of leads (interim) | Higher Intent + qualification questions + SMS verify | Highest volume + manual exclusion controls |

Notes:

- The "200 leads/month, daily upload, 28d stage, 1-40% stage CVR" thresholds for Conversion Leads come directly from Meta Developer guidance. They are the eligibility floor, not a stretch goal.
- "Maximize number of conversion leads" performance goal exists as a distinct option once the Conversion Leads CRM data is wired and Meta sees the deeper stage events.
- A typical readiness build takes 1-3 months end-to-end; full optimizer convergence is reported around 45-60 days after stable feedback. Treat 90 days as the planning horizon for Conversion Leads.

---

## Lead path selection matrix

Use this as the canonical "which path" decision tree for a Meta Leads campaign.

### Path summary table

| Path | Conversion location | Best for | Key requirement | Quality risk |
|---|---|---|---|---|
| Instant Form (More Volume) | Meta-hosted form | Mobile volume, top-of-funnel content, webinar / guide / waitlist | None beyond a Page and privacy policy | Low intent, autofill-driven submissions |
| Instant Form (Higher Intent) | Meta-hosted form with review screen + optional SMS verify | Mid/high-stakes services, B2B, regulated | Review screen tolerated by audience | Lower volume, possibly higher CPL |
| Instant Form (Rich Creative) | Meta-hosted form with brand sections | High-consideration, brand-led, multi-product, social-proof-heavy | Strong creative assets and copy | Form depth fatigue if cards are weak |
| Website lead form (with CAPI) | Advertiser site | Custom UX, full first-party data capture, complex qualification | Pixel + CAPI dedup; mobile speed; lead form on site | Mobile friction reduces volume |
| Instant Form + Website (multi-destination) | Meta routes per user | Hedged volume + quality | Both destinations live | Reporting splits required |
| Click-to-Messenger lead | Messenger | Conversational qualification, Facebook-native audiences | Page Inbox / chatbot SLA | Slow responses kill it |
| Click-to-Instagram-Direct lead | IG Direct | Creator / lifestyle / DTC services with IG-first audience | IG inbox SLA / IG automation | Same as above |
| Click-to-WhatsApp lead | WhatsApp Business / WABA | LATAM / EMEA / India, high-consideration, regulated locally | WhatsApp Business account, pre-filled message, agent / bot SLA | WABA template approvals, regional pricing |
| Calls (Lead Ads with Calling) | Phone dialer | Urgent local services, home services, healthcare bookings | Country phone number, business hours | Missed calls, off-hours waste |
| Conversion Leads | Any of above + CRM CAPI | Mature lead programs with 200+ leads/mo | Lead ID mapping + daily upload + 28d/<40% stage CVR | Setup misconfig = no optimization gain |
| Advantage+ Leads | Any conversion location | Eligible accounts wanting automation | Broad audience tolerance, custom-audience-only exclusion, 18+, all placements | Quality issues need feedback loop |

### Selection logic (path → quality → match)

```
1. Is the offer regulated (Finance / Employment / Housing / Politics)?
   YES → Special Ad Category. Restricted form questions, no demographic targeting,
         no lookalikes, no customer list audiences (US 2025+). Use Higher Intent
         + manual or limited Advantage+; CAPI for first-party signal where allowed.
   NO  → continue.

2. Does the buyer expect a live conversation before sharing info?
   YES → Click-to-message. Pick:
         - WhatsApp if LATAM/EMEA/India or local norm.
         - Messenger if Facebook-native B2C.
         - Instagram Direct if IG-led brand or creator.
         Fallback: phone call if conversational chat ops are weak.
   NO  → continue.

3. Is mobile + Meta-native form acceptable?
   YES → Instant Form. Pick:
         - Higher Intent for B2B/services/regulated/high-AOV.
         - Rich Creative for brand storytelling + multi-product / social proof.
         - More Volume only when downstream qualification is cheap.
   NO  → Website form (with Pixel + CAPI dedup). Use only when form UX or
         CRM logic on the site is materially better.

4. Volume + qualified-lead rate qualifies for Conversion Leads?
   (200/mo, lead ID mapped, daily upload, stage <28d, stage CVR 1-40%)
   YES → Build Conversion Leads; then move performance goal to
         "Maximize conversion leads".
   NO  → Stay on "Maximize number of leads"; build the readiness in parallel.

5. Account is eligible for Advantage+ Leads and tolerates broad audience?
   YES → Default to Advantage+ Leads; verify Advantage+ status remains "On"
         (no over-restriction on audience/placement).
   NO  → Manual Leads with controlled audience and placements; document why.
```

---

## Form design playbook

Form design is the single highest-leverage thing on a Meta Lead campaign after path selection.

### Form types

| Form type | Mechanics | Use when | Avoid when |
|---|---|---|---|
| More Volume | Single-tap submit using prefilled fields | Top-funnel, low-stakes asset (guide, webinar, list), audience screened by creative | Lead quality is critical; phone validity matters; deal size is high |
| Higher Intent | Adds a review screen forcing user to confirm prefilled info before submit; supports SMS verification of phone number | B2B, services, finance/insurance/auto/real-estate (where allowed), high-AOV DTC | True top-funnel content where any friction drops volume below floor |
| Rich Creative | Customizable sections: Intro image, up to 3 Benefits, up to 4 Build Your Story sub-sections (How It Works / More About Us / How We're Different / Highlights, each 2-5 steps), Products carousel up to 5 cards, Social Proof, Incentives | High-consideration purchases needing trust and education before submit | Simple offers; thin creative; ops-driven category where speed > polish |

### Question types and limits

| Question type | Behavior | Best use | Notes |
|---|---|---|---|
| Prefilled standard fields | Email, phone, full name, city, state, country, ZIP, DOB (where allowed) | Reduce friction on top-funnel | Prefill = low intent. Turn off autofill for fields where validity matters. |
| Multiple Choice | Up to ~6 options visible cleanly | Qualification (budget band, role, service interest) | Keep options exclusive and exhaustive |
| Short Answer | Free text, capped per Meta UI | Phone (typed) when validity matters; specific intent (project description) | Typed phone reduces autofill bots |
| Conditional | Dynamic answer options driven by previous answer (CSV-backed) | Service-area routing, multi-product flows | Route paths: "Go to question", "Submit Form", "Close Form" (no submission for non-leads) |
| Appointment Request | Date and time picker | Local services, demos, consultations | Combine with calendar/CRM sync; otherwise booking falls through |
| Business Locator (Store Locator) | Location list with proximity | Multi-location retail / clinics / dealerships | Up to many locations; user picks nearest |
| Image Select | Up to 8 image options | Visual choices (style preference, product type) | Stronger qualification when text is ambiguous |
| Slider | Range input (e.g., 1-10) | Self-rated intent / budget band | Useful for scoring; weak alone |

Treat 3-6 custom questions as the practical envelope for completion. Verify current Instant Form field limits in Ads Manager before building long forms.

### Question design rules

| Rule | Why |
|---|---|
| Order from low-friction → high-friction | Anchors commitment; users who answer 1-2 are more likely to finish |
| Mark non-essential questions optional | Conditional questions cannot be optional; everything else can |
| Prefer Multiple Choice over Short Answer for qualification | Cleaner segmentation in CRM; lower drop-off |
| Use Conditional → Close Form to disqualify | Stops poor-fit submissions before they hit CRM; lead is not collected |
| Add a custom intro screen | Clarifies value before questions and can reduce poor-fit submissions |
| Use typed Short Answer for phone if calling is critical | Mitigates autofill of stale numbers |

### Completion (thank-you) screen

Configurable elements:

- Headline + description
- Action button: visit website, download PDF, call business, redeem promo code, message via Messenger / WhatsApp
- Separate completion screens when Conditional logic splits leads vs. non-leads (only leads see the next-step CTA)

Best practice:

| Goal | Recommended completion CTA |
|---|---|
| Speed-to-lead | "Call us now" + click-to-call number |
| Self-serve content | "Download the guide" PDF link |
| Sales handoff | "Book a time" link to scheduler (Calendly / native scheduler) |
| Conversational continuation | "Message us on WhatsApp / Messenger" |
| Promo redemption | "Use code XYZ on the site" with site button |

### Privacy / disclaimer

- Privacy policy link is mandatory.
- Custom legal disclaimer is optional; required for many regulated categories (insurance, finance, healthcare, employment) per Meta policy.
- For Special Ad Categories, certain personal-info questions (age, gender, relationship status, location) are restricted from instant forms.

### Quality features (2024-2025 launches)

| Feature | Purpose | Notes |
|---|---|---|
| SMS passcode verification | Validates that the entered phone number reaches the user | Big lift in phone validity for services / calls follow-up; small drop in completion |
| Work email verification | Filters consumer freemail in B2B | Use for B2B SaaS/services where personal email pollutes pipeline |
| Turn off autofill | Forces typed entry for selected fields | Reduces autofilled stale data; raises CPL |
| Flexible form delivery | Meta auto-orders questions / swaps backgrounds | Useful when you cannot test variants manually; verify via breakdowns |
| Allow multiple responses | Checkbox-style multi-select questions | Useful for product interest / service basket questions |
| Promo code incentive | Show a discount/incentive on completion screen | Good for DTC and event registration |
| Lead delivery by email | Sends lead detail to a mailbox in addition to CRM | Backup channel; don't make it primary |
| Instant form templates | Pre-built form structures by goal | Fast launch; replace defaults that conflict with quality strategy |

---

## Conversion Leads readiness checklist

Use this checklist before recommending Conversion Leads optimization. If any line is "no" or "unknown", do not promise the optimization gain.

| Item | Required state | How to verify |
|---|---|---|
| Lead path is Instant Form / Lead Ads | Yes | Campaign objective = Leads, conversion location = Instant Form / Website Form / Multi-dest |
| Meta Lead ID is mapped to CRM record | Yes, on every lead | Inspect a sample CRM lead record for `lead_id` field |
| Lead volume is sufficient for CRM-stage optimization | Yes | Last 30-90 days lead count per ad account |
| CRM to Meta upload cadence is stable | Yes | Check CRM partner integration / CAPI logs for daily events |
| Optimized stage occurs fast enough for optimization | Yes | Sales cycle data: median time from lead to optimized stage |
| Stage conversion rate is neither too rare nor too broad | Yes | Leads reaching stage / leads over last 90 days |
| Event Match Quality on lead events is healthy | Yes | Events Manager diagnostics and EMQ |
| `lead_event_source` on CRM CAPI events identifies the CRM | Yes | Inspect raw event payload |
| Custom event names match the expected stage taxonomy or are mapped via partner | Yes | CRM partner integration verified |
| Backup integration available | Yes | If primary partner fails, leads still sync |

Setup time estimates:

- 1-4 weeks: CRM partner integration if a native connector exists.
- 1-3 months: full readiness for accounts that need to map lead IDs and rebuild CRM stages.
- 45-60 days post-launch: optimizer convergence on the deeper stage event.

Performance-goal switch:

- During build: keep performance goal at "Maximize number of leads".
- Once stage events flow daily and EMQ is stable: switch to "Maximize number of conversion leads".
- After switch, expect a 1-2 week recalibration. Do not change other variables during this window.

Failure modes to call out in audit:

| Failure | Symptom | Fix |
|---|---|---|
| Stage CVR below 1% | Optimizer cannot find signal | Choose a higher-funnel stage (e.g., Contacted instead of Closed-Won) |
| Stage CVR above 40% | Stage too lenient; signal noisy | Choose a deeper stage |
| Stage latency > 28 days | Optimizer drops events | Choose an earlier stage (Qualified / SQL) |
| Lead ID missing on CRM record | Cannot match | Re-instrument CRM intake; backfill if possible |
| Daily upload missing weekends | Optimizer treats as gaps | Use partner with continuous sync or scheduled job |
| EMQ < 5 | Match rate too low | Hash email + phone with SHA-256, include all available identifiers, add `external_id` |

---

## Click-to-message ops

Click-to-message Lead Ads succeed or fail on **response speed and qualification scripting**. Treat them as operational campaigns, not pure media buys.

### Conversion locations

| Location | Strengths | Constraints | Required ops |
|---|---|---|---|
| Messenger | Native to Facebook, low-friction, easy for B2C | Less common in some markets | Inbox monitoring + saved replies + bot for off-hours |
| Instagram Direct | Strong on creator / lifestyle / DTC | IG inbox sometimes harder to manage at scale | IG-native automation or BSP |
| WhatsApp Business | Strong in LATAM, EMEA, India, MENA; enables structured templates and end-to-end conversational sales | Requires WhatsApp Business account or WhatsApp Business Platform (WABA) for scale; 24-hour customer service window after first message; template approval for outbound | BSP integration (e.g., 360dialog, Twilio, WATI), agents or AI chatbot, opt-in management |
| Instant Form + Messenger (hybrid) | Form prefill + automatic chat handoff | Slightly more complex setup | Same as Messenger |
| Instant Form + WhatsApp | Same hybrid pattern | WABA required for scaled outbound follow-up | Same as WhatsApp |

### Welcome message and quick replies

| Element | Best practice |
|---|---|
| Pre-filled message | Specific to product/intent (e.g., "Hi, I'd like a quote for X service") rather than generic ("Hi") to improve qualification |
| Welcome message length | Short and truncation-aware; the user should see the intent and next step immediately |
| Quick replies | 2-4 buttons mapping to intent: "Get a quote", "See pricing", "Talk to a rep" |
| Qualifying questions | Up to ~6 in the chat flow; progress from low-friction (service interest) to higher-friction (budget, contact info) |
| Auto-acknowledgement | Reply within seconds; ideally under 5 seconds via bot or templated reply |
| Human SLA | Aim for under-5-minute first human response for warm leads; faster is materially better |
| Disqualification | If user does not match, hand off a self-serve resource rather than ghosting |
| Tagging | Tag conversation outcomes (qualified / unqualified / sale) to feed back into optimization |

### Performance metrics (in order of seriousness)

| Metric | What it tells you |
|---|---|
| Cost per messaging conversation started | Front-end auction efficiency; not quality |
| Reply rate from business side | Operational health |
| First-response time (median, p95) | Operational SLA |
| Qualified conversation rate | Quality of inbound + qualification script |
| Booked appointment / quote rate | Pipeline value |
| Cost per qualified conversation | Primary scaling read |
| Cost per closed deal / revenue | Business truth |

### Performance goals

| Goal | When |
|---|---|
| Maximize number of leads (using messaging conversion location) | Default for click-to-message lead campaigns |
| Maximize conversations | Use only when conversation count itself is the business outcome (engagement / pre-launch warm pool) |
| Conversion Leads (when CRM events from chat outcomes are wired) | Mature operations with CRM stage feedback from chat |

### Click-to-WhatsApp specifics

| Detail | Note |
|---|---|
| Channel sources | Use WABA for scale; the WhatsApp Business app is for very small accounts |
| 24-hour service window | After a user messages, you can reply freely for 24 hours; outside that, only approved templates |
| Templates | Pre-approved by Meta; categories include marketing, utility, authentication |
| Conversion measurement | Send conversion events from BSP or Conversions API for WhatsApp; "Purchases through messaging" optimization is available under Sales objective when purchase events are sent (cross-objective) |
| 2026 pricing changes | WABA pricing model updated effective 2026-01-01 with category-based billing; verify current cost model in BSP dashboard |

---

## Calls path (Lead Ads with Calling)

### When to use

| Fit | Examples |
|---|---|
| Urgent local services | Plumbing, locksmith, towing |
| Booked appointment categories | Home services, auto, healthcare (subject to category restrictions) |
| Complex products | Insurance quotes, mortgage discovery (subject to Special Ad Category rules) |
| Mobile-only audiences | Local SMB services |

### Setup specifics

| Setting | Behavior |
|---|---|
| Conversion location | Calls (under Leads objective) |
| Phone number | Country code + number; one per ad |
| Optimization | Optimizes for ~60-second confirmed calls; reported ~59% cost reduction vs. link-click optimization |
| Reported metric | Estimated number of call confirmation clicks (people who tap to confirm the call dialer) |
| Business hours | Use Lifetime budget + Ad scheduling to restrict delivery to business hours |
| Country | Country availability varies by Meta product rollout; verify in Ads Manager |
| Call tracking | Pair with a call-tracking provider (CallRail, 800.com, etc.) for CRM attribution and quality scoring |

### Operating rules

- Always run calls campaigns with business-hours scheduling; off-hours calls go to voicemail and waste budget.
- Use creative copy that pre-qualifies (price band, eligibility, service area) — optimization toward 60s calls does not protect from junk callers.
- Use Conditional logic equivalents on the call side: an IVR that screens and routes (e.g., "Press 1 if you need service in [region]") is the call-side analog of conditional form questions.
- Connect call dispositions back to the CRM to enable Conversion Leads or offline event optimization.

### When not to use

- Service area is large but support is regional: missed calls cause negative experience.
- Off-hours leads are valuable: forms or messaging would capture instead of dropping.
- Compliance prohibits voice contact without prior written consent.

---

## Bidding and budget by stage

### Performance goals

| Performance goal | Optimization signal | Use when |
|---|---|---|
| Maximize number of leads | Form fill / message / call / website lead event | Default for new accounts; Conversion Leads not yet wired |
| Maximize number of conversion leads | CRM stage event via Conversions API | Conversion Leads readiness met; deeper-funnel optimization |
| Cost per result goal | Stable target CPL | After 7+ days at stable performance; do not use during learning |
| Bid cap | Hard ceiling on auction bid | Aggressive scale where margin per lead is well known; high variance acceptable |
| Maximize quality | Implicit in Higher Intent forms; not a discrete bid strategy | Use form type + qualification questions instead of expecting a "highest quality leads" bid switch (which does not exist as a discrete goal in current UI) |

### Budget posture by lead-program stage

| Program stage | Budget posture | Reason |
|---|---|---|
| Brand new account / unverified pixel | $50-150 / day per ad set; manual; short tests | Avoid wasting on bad measurement |
| Validated tracking, learning | At least target CPL × 50 / week per ad set | Approximate Meta learning floor (~50 events/week per ad set); below this expect "Learning Limited" |
| Stable, pre-Conversion-Leads | Continue at learning-floor or higher; consider campaign budget optimization | Provide enough room for ad set rotation |
| Conversion Leads launched | Hold all variables for 7-14 days; then increase 20-30% / 5-7 days | Avoid resetting learning during stage-event optimizer convergence |
| Mature | Cost cap or ROAS via Conversion Leads with CRM feedback; scale via creative diversification | Business economics drive headroom |

### Learning phase rules for Leads

| Behavior | Practice |
|---|---|
| Learning floor | Approximately 50 optimization events per ad set per week |
| Reset triggers | Significant edits to budget (>20%), bid strategy, target audience, optimization event, creative; pausing > 7 days |
| Edit batching | Make all planned changes at once at the start of a week; annotate the date |
| Volume troubleshooting | Consolidate ad sets, broaden audience, allow Advantage+ Audience expansion, simplify form |
| Event-depth fallback | If Conversion Leads cannot get to 50 stage events / week, drop back to Maximize Leads while you build volume |

### Bid strategy decision

```
Tracking unstable or volume <30/week  → Highest volume / Maximize leads, no cap
Stable 30-60/week, target CPL known  → Cost per result goal at +10-20% above 7-day actual CPL
Stable 60+/week, predictable CVR    → Cost per result goal at actual CPL; Conversion Leads if eligible
Aggressive ROAS-led scale, mature   → Cost cap or bid cap on cost-per-qualified-lead target
Special Ad Category, restricted     → Default Maximize leads; cap only after multi-week stability
```

---

## Audience design

### Default posture

| Posture | When | Notes |
|---|---|---|
| Advantage+ Audience (no fixed inputs) | Most accounts where audience can be broad | Fastest learning; required for Advantage+ Leads "On" status |
| Advantage+ Audience with location/age/language constraints | Service-area or regulated categories | Hard controls survive Advantage+; suggestions are softer |
| Advantage+ Audience with custom audience exclusions | Suppress existing customers / past leads | Custom-audience exclusions are the only exclusion type that maintains Advantage+ "On" |
| Manual saved audience | Strict targeting required (compliance, geo, customer type) | Disables Advantage+ "On" criteria; document why |
| Lookalike from converters / customer list / Conversion Leads stage | Where allowed | Strongest manual audience for leads; not allowed under Special Ad Categories |
| Custom audience from Lead Ads form openers, video viewers, IG/FB engagers | Retargeting | Layer with care; avoid retargeting all engagers without quality filter |

### Audience controls under Advantage+ Leads

Per Meta's Advantage+ Leads page, the campaign is "Advantage+ On" when:

- Campaign budget remains on (Advantage+ Campaign Budget)
- At least one ad set uses Advantage+ Audience
- Only custom audience exclusions are made (no exclusions on saved demographic / interest audiences if you want "On" status)
- Minimum age is 18+
- Advantage+ Placements is on
- Account-level controls (account-wide blocklists / placement blocks) may be applied without disabling "On"

If any of these are violated, Advantage+ flips off and audience/budget/placement automation falls back to manual behavior. Audit by checking Campaign Opportunities and Advantage+ status.

### Special Ad Categories effect on audience

When the campaign is flagged Finance / Employment / Housing / Politics:

- No detailed targeting (interests/behaviors) for these ad sets.
- Age range capped at 18-65+.
- No gender targeting.
- No ZIP/postcode targeting.
- No lookalike audiences.
- No saved audience exclusions of demographic categories.
- US 2025: customer list custom audiences for Special Ad Categories carry stricter data-use rules and are functionally limited; verify current state.
- Lead form questions about age, gender, relationship status, and location are restricted.

---

## Creative strategy

Creative for Leads is **qualification creative**, not just attention creative. A great hook with vague qualification produces volume of low-fit leads.

### Qualification-by-creative principles

| Principle | Implementation |
|---|---|
| Show who the offer is for | Visuals, captions, on-screen text identifying the buyer (e.g., "homeowners in [region]", "B2B founders 5-50 employees") |
| Show price band or eligibility cue when relevant | "Plans from $X/mo", "For licensed professionals", "Service available in [city]" |
| Use proof | Reviews, accreditations, results numbers, named clients (if allowed) |
| Avoid pure curiosity hooks | Curiosity inflates CTR and crashes downstream qualification |
| Match form first-screen to ad copy | Same offer name, same brand, same value prop |
| Mobile-first composition | 9:16 video for Reels/Stories; 4:5 for feed; legible text in safe zones |
| Captions always | Especially for Reels/Stories where sound is off |

### Format roles for Leads

| Format | Strong for | Weak for |
|---|---|---|
| Static image | Direct offer, fast tests, retargeting form openers | Complex education |
| Video / Reels | Demonstration, social proof, founder POV, product walkthrough | Very simple offers (overkill) |
| Carousel | Multi-product, comparison, step-by-step process | Single high-velocity offer |
| Collection / Instant Experience | Less common for leads; useful where offering a product set leads to a service inquiry | Plain lead gen |

### Concept testing scaffold for Leads

| Slot | Concept |
|---|---|
| 1 | Direct offer (clear price / eligibility / outcome) |
| 2 | Pain-frame (problem → product → result) |
| 3 | Social proof (testimonial / case study / named outcome) |
| 4 | Founder / expert POV (trust + perspective) |
| 5 | Process explanation (how it works in 30s) |
| 6 | Result-led (specific metric / before-after) |

Run 4-6 concepts at a time, with 2-3 hooks per concept. Refresh winning concepts every 4-8 weeks; refresh losing concepts faster.

### Rich Creative form ↔ ad creative pairing

Rich Creative forms exist to extend the ad's brand experience into the form. Pair them when:

- Brand education is part of the qualification (e.g., complex services).
- Multi-product carousels in the form match the ad carousel.
- Social proof in the form mirrors the ad's testimonial line.

Avoid Rich Creative forms when the ad is a thin direct-response asset; the form's depth then feels disconnected.

---

## Measurement design

### CRM feedback loop (the real measurement)

```
Meta lead event (form / message / call) 
   → CRM intake (capture lead_id, ad_id, adset_id, campaign_id, form_id, source, timestamp)
   → Lead qualification stages (Contacted, Qualified, SQL, Opportunity, Closed-Won)
   → CRM → Conversions API (CRM integration) with stage events
   → Meta receives stage events daily, matches by lead_id + hashed PII
   → Performance goal "Maximize conversion leads" optimizes on stage event
```

### Required event fields for the loop

| Field | Source | Purpose |
|---|---|---|
| `lead_id` (15-16 digit Meta lead ID) | Returned by Lead Ads webhook / Graph API | Primary key for Conversion Leads matching |
| `event_name` | CRM stage mapped to Meta event taxonomy or partner-mapped custom event | Tells Meta which stage you're optimizing |
| `event_time` (Unix epoch) | CRM stage transition time | Latency check; must be <28 days from lead creation for optimization |
| `lead_event_source` | Identifies the CRM (e.g., `salesforce`, `hubspot`, custom) | Required for Conversion Leads CAPI events |
| `action_source` | `system_generated` or other appropriate value | CAPI parameter |
| `user_data` | Hashed email, hashed phone, `external_id`, optional fbp/fbc | Match keys; raises EMQ |
| `value` and `currency` | Where applicable | Required for ROAS/value optimization downstream |

### Marketing API / webhook pattern

| Component | Behavior |
|---|---|
| Webhook subscription | Subscribe app to `leadgen` field for the Page (`POST /PAGE_ID/subscribed_apps?subscribed_fields=leadgen`); Page must have the app installed |
| Webhook payload | Includes `leadgen_id`, `page_id`, `form_id`, `ad_id`, `created_time`; does not include lead PII directly |
| Lead retrieval | `GET /{leadgen_id}?access_token={page_access_token}` returns full lead field/value pairs |
| Permissions | `pages_show_list`, `ads_management`, `ads_read`, `leads_retrieval`, `pages_read_engagement`, `pages_manage_metadata`, `pages_manage_ads` (subject to App Review) |
| Token type | Long-lived Page Access Token (preferred over user access token for rate-limit reasons) |
| Retention | Lead CSV access in Ads Manager / Lead Center stores leads for 90 days; for legal/CRM record-keeping store yourself immediately |
| Rate limits | Tied to access tier and lead volume per Page over the prior 90 days; monitor 4xx/429 responses and back off |
| Bulk pattern | For backfill, paginate `GET /{form_id}/leads`; for steady state, prefer webhook + retrieval |

### EMQ optimization checklist

| Lever | Effect |
|---|---|
| Send hashed email (SHA-256 lowercased) | Single biggest EMQ lift |
| Send hashed phone (E.164 then SHA-256) | High lift, especially for service / call campaigns |
| Send `external_id` (CRM record ID) | Cross-event linking |
| Pass `fbp` and `fbc` from the website where applicable | Improves browser-server matching for website lead forms |
| Include first/last name (hashed) | Marginal lift |
| Include city / state / country / ZIP (hashed) | Marginal lift; helpful for high-volume accounts |

Treat 7+ as good, 9+ as great. Do not chase 10; investing past 9 produces diminishing returns.

### Reporting breakdowns to monitor

| Breakdown | What to look for |
|---|---|
| Placement | Audience Network / Reels / Feed / Stories share; pause where qualified-lead rate is materially worse, with evidence over 7+ days |
| Form / Ad / Adset | Quality variance by form type and creative |
| Age / Gender (where category allows) | Audience-fit signal |
| Region / Country | Geo-mismatch; service-area leakage |
| Device | Mobile vs desktop conversion differences for website forms |
| Time of day / day of week | For calls and messaging ops planning |

### Attribution-window changes context

- Ads Insights API attribution windows change over time. Annotate dashboards whenever attribution-window support changes, especially for view-through and engage-through reporting.
- 2026-03 reclassification: click-through narrowed to link clicks; engage-through introduced as a separate category. Report Leads with click-through, engage-through, and view-through separately where exposed.
- For Lead Ads, view-through and engage-through often inflate apparent volume; CRM/backend remains the truth.

---

## Diagnostic tree

Use this tree when an account is underperforming. Walk top-down. Stop and act on the first node where the answer is clearly "no" or "weak".

```
1. Is the offer in a Special Ad Category?
   ├─ YES: are policy / form-question / audience constraints respected?
   │       ├─ NO  → fix policy compliance first; campaigns may be running
   │       │        with auto-applied restrictions silently
   │       └─ YES → continue
   └─ NO: continue

2. Is the conversion path right for the buyer?
   ├─ Cheap CPL but no contacts → wrong path (form too easy / autofill abuse)
   ├─ High form opens, low submits → wrong form length or weak intro
   ├─ Many messages, no qualification → wrong messaging ops or wrong path entirely
   └─ Calls campaign with low-quality calls → check ad pre-qualification + business hours

3. Is form / message design optimized for quality?
   ├─ Using More Volume in a high-stakes category → switch to Higher Intent
   ├─ No qualifying questions → add 1-3 high-leverage questions
   ├─ Autofill on for fields where validity matters → turn off autofill
   ├─ No SMS verify on phone-critical campaigns → enable SMS verify
   └─ No conditional logic for disqualification → add Conditional → Close Form path

4. Is response operations meeting SLA?
   ├─ Speed-to-lead > 5 min for hot leads → fix routing / paging
   ├─ Click-to-WhatsApp first response > 5 sec → add bot / templated reply
   └─ Off-hours / weekends silent → schedule or auto-reply

5. Is CRM feedback wired?
   ├─ No CRM integration → manual stages first; build integration
   ├─ Lead ID not mapped → re-instrument intake
   ├─ Stages not flowing daily → fix sync
   └─ Stage event latency > 28 days → choose earlier stage for optimization

6. Is the account ready for Conversion Leads?
   ├─ <200 leads/mo OR stage CVR outside 1-40% → keep Maximize leads; build readiness
   └─ Ready → switch performance goal to Maximize conversion leads; hold variables 2 weeks

7. Is Advantage+ Leads "On" as expected?
   ├─ Audience over-restricted (saved audience as inclusion) → flips Advantage+ off
   ├─ Placement manually excluded without account-level path → flips off
   ├─ Campaign budget set to ad set level → flips off
   └─ All criteria met → "On"; verify in Campaign Opportunities

8. Is there enough event volume to learn?
   ├─ <50 events / ad set / week → consolidate ad sets, broaden audience, drop deeper event
   └─ Volume OK but volatile → hold edits 7-14 days

9. Is creative the constraint?
   ├─ Frequency rising, CTR/hold rate falling → creative fatigue → fresh concepts
   ├─ All creative similar → low-diversity portfolio → 4-6 concepts × 2-3 hooks
   └─ Concepts diverse but bad fit → wrong qualification creative → add eligibility cues

10. Is measurement reliable?
    ├─ Pixel-only website forms with no CAPI → add CAPI dedup
    ├─ EMQ < 6 → improve hashed identifiers
    ├─ Attribution window mismatch with backend → align reporting windows
    └─ Engage-through inflating reported leads → split CT / ET / VT in dashboards
```

---

## Common traps

1. **Treating CPL as the success metric.** A campaign producing $3 CPL with 5% qualified-lead rate is worse than $30 CPL with 50% qualified rate at typical sales-team economics.
2. **Promising Conversion Leads before doing the CRM work.** Conversion Leads is a 1-3 month implementation, not a setting toggle.
3. **Running More Volume forms in regulated industries.** Quality collapse is foreseeable; switch to Higher Intent + qualification questions + SMS verify.
4. **Editing campaigns daily during learning.** Resets the optimizer; use weekly batched edits only.
5. **Ignoring placement breakdowns.** Audience Network and certain Reels placements can dominate impressions on lead campaigns and produce low-quality leads; only exclude with 7+ days of evidence.
6. **Letting autofill drive submissions on phone-critical campaigns.** Use typed Short Answer + SMS verification.
7. **Stacking too many qualification questions before value is clear.** Customers leave before the first answer.
8. **Disabling Advantage+ silently by over-restricting audience or placement.** Verify Advantage+ status periodically; do not assume the badge stays on.
9. **Using Special Ad Category creative without policy review.** Lead form question types disappear silently for these categories.
10. **No CRM-side feedback for click-to-message and call paths.** Without CRM disposition, you cannot run Conversion Leads on those paths.
11. **Forgetting webhook security.** Verify the `X-Hub-Signature-256` HMAC on incoming Lead webhooks; do not trust raw `leadgen_id` payloads.
12. **Letting lead retention lapse.** Meta stores leads in Ads Manager for 90 days; if your sync drops, leads older than 90 days may not be retrievable through Ads Manager (CSV) but webhook history may be re-pulled depending on form retention.
13. **Optimizing WhatsApp leads on "Maximize conversations" when the business goal is leads.** Align the performance goal with the actual outcome; conversation volume is not the same as qualified lead volume.
14. **Treating "highest quality leads" as a discrete bid strategy.** It is not a current performance goal in Ads Manager. Quality is engineered through form type + qualification + Conversion Leads, not a bid.

---

## Volatile checks before implementation

Always verify these in current Ads Manager / API before turning guidance into hard rules:

| Area | Check |
|---|---|
| Advantage+ Leads availability | Account eligibility flag, default-on status, Campaign Opportunities surface |
| Advantage+ Leads "On" criteria | Audience expansion default, custom-audience-exclusion-only rule, age 18+ requirement, all-placements requirement, campaign-budget requirement |
| Form types available in current UI | More Volume / Higher Intent / Rich Creative naming and feature gating |
| Question types available | Image Select, Slider, Conditional, Appointment Request, Business Locator (Store Locator) availability |
| SMS verification availability | Country support, opt-out conditions |
| Work email verification availability | Account / region |
| Conversion Leads readiness in account | Lead ID mapping, daily upload, stage timing, stage CVR, EMQ |
| Performance goal options | "Maximize number of leads" vs "Maximize number of conversion leads" wording in current UI |
| Bid strategy options | Cost per result goal vs cost cap / bid cap; current minimums |
| Attribution windows for Lead Ads reporting | 1d/7d click, 1d view (post 2026-01-12 changes), engage-through column availability |
| Special Ad Categories | Current category list; lead-form question restrictions; US customer-list rules |
| Click-to-WhatsApp availability | Country, BSP options, on-platform purchase support |
| Calls path | Country availability, business hours scheduling, lifetime budget requirement |
| Webhook permissions | App Review status for `leads_retrieval` |

Current official checks for volatile lead items:

- Meta Lead Ads: https://www.facebook.com/business/ads/ad-objectives/lead-generation
- Meta Lead Ads with forms: https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-forms
- Meta Lead Ads with messaging: https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-messaging
- Meta Advantage+ Leads: https://www.facebook.com/business/ads/meta-advantage-plus/leads
- Meta Conversion Leads CRM integration: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration
| Retention | Lead CSV retention (currently ~90 days) and webhook re-fetch behavior |

---

## Cross-references

- Use `measurement-capi-attribution.md` for CAPI, deduplication, and CRM/offline feedback details.
- Use `creative-strategy.md` for qualification creative principles.
- Use `diagnostics-symptoms.md` and `diagnostics-account-data.md` when diagnosing an existing account.
- Use `policy-special-categories.md` for Special Ad Categories and regulated lead-gen planning.
- Use `automation-advantage-plus.md` for Advantage+ Leads, attribution, and volatile UI/API behavior.
