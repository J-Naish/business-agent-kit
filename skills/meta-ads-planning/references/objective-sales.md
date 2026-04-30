# Meta Sales campaigns

## 0. Operating Practice

### 0-1. Philosophy

Sales objective campaigns optimize for direct purchase or revenue actions. Almost everything that goes wrong in Sales campaigns is a measurement, catalog, offer, or destination problem. The Ads Manager surface (campaign type, bidding, audience, placement) matters far less than the inputs feeding it.

Order of leverage when Sales performance is bad:

1. Purchase + value tracking quality (Pixel + CAPI dedup, value/currency, content_ids)
2. Offer/product page/checkout conversion rate
3. Catalog and feed quality
4. Creative diversity and placement-fit
5. Audience design (Advantage+ vs manual, exclusions, lookalikes)
6. Bidding posture
7. Account structure (consolidate vs split)
8. Budget allocation

Inverting this order is the single most common operator mistake.

### 0-2. What matters most

- **Revenue ROAS is not profit.** Always reconcile to backend revenue, refunds/returns, contribution margin, and new-customer rate.
- **Advantage+ Sales amplifies inputs, it does not fix them.** Bad measurement plus Advantage+ produces confidently-wrong delivery and inflated platform ROAS.
- **Catalog quality is targeting and creative quality.** Titles, images, prices, availability, item IDs, and product sets directly affect both eligibility and delivery.
- **CAPI without dedup is worse than Pixel-only.** Double-counting trains optimization on phantom volume.
- **Existing customer harvesting is the default failure mode.** If you do not measure or cap it, Advantage+ will gravitate there.
- **Creative is not optional in Advantage+.** The system needs 20-50 diverse assets to actually test, not 3 reskins.

### 0-3. Decision matrix by monthly purchase volume

Use Meta's per-week-per-ad-set learning-phase target (50 events/week to exit learning) as the anchor. ()

| Monthly purchase volume | Recommended Sales setup | Notes |
|---|---|---|
| 0-30 purchases/month | Single manual Sales campaign, 1-2 ad sets, broad audience, optimize for `Purchase` if reliable, otherwise `InitiateCheckout` or `AddToCart` (predictive of purchase) | Volume too low for any per-ad-set learning. Do not use Advantage+ Sales as sole engine. Focus on creative and offer. |
| 30-50 purchases/month | Manual Sales + a small Advantage+ Sales test (if catalog-eligible). Consolidate ad sets. Lowest Cost bidding. | Borderline learning. Consider higher-funnel events (ATC/IC) for optimization while Purchase event accumulates. |
| 50-100 purchases/month | Advantage+ Sales as primary acquisition, manual Sales for retargeting/exclusions. Optimize for `Purchase`. Lowest Cost. | Single ad set in Advantage+ can plausibly exit learning. Begin creative volume push (15-25 ads). |
| 100-300 purchases/month | Advantage+ Sales primary + manual Sales for product-set, margin, or geo splits. Begin Cost-per-Result-Goal testing. Value optimization viable if value distribution is wide. | Sweet spot. Can run 2-3 ad sets in Advantage+ Sales (each capped at 50 ads). |
| 300+ purchases/month | Advantage+ Sales + Advantage+ catalog ads (broad and retargeting) + manual splits for margin/region/new-vs-existing. ROAS Goal viable. Conversion Lift viable. | Now safe to run incrementality, value rules, and pLTV-based optimization. |

()

### 0-4. Diagnosis order when account is underperforming

1. Pixel + CAPI dedup health (Events Manager, Test Events, EMQ)
2. Catalog feed health (rejected items, availability, image quality, price drift)
3. Backend revenue vs Meta-attributed revenue gap
4. New customer rate vs returning customer rate
5. Click-through vs engage-through vs view-through split
6. Creative concept count, fatigue, placement-fit
7. Audience structure (overlap, exclusions, retargeting share)
8. Bidding posture vs event volume

### 0-5. Common traps (top of list)

- Launching Sales with Pixel-only and no CAPI for serious spend
- Evaluating ROAS without margin, refunds, new-customer rate
- Scaling Advantage+ Sales on platform ROAS alone
- Optimizing for `AddToCart` or `InitiateCheckout` permanently instead of progressing to `Purchase`
- Running catalog ads with broken feed (low image quality, missing price, stale availability)
- Editing budget/creative/goal frequently during the 7-day learning phase
- Failing to verify Existing Customer Budget Cap state in current UI (it has been modified multiple times)
- Treating Advantage+ as a fix for poor product-market fit

---

## 1. Sales Objective Surface

### 1-1. What the Sales objective covers

The Sales objective in the ODAX (Outcome-Driven Ad Experiences) menu replaces the older "Conversions" and "Catalog Sales" objectives. It is the single objective for any campaign optimizing toward direct purchase, subscription, trial, or other downstream-revenue actions.

()

### 1-2. Conversion locations

Sales campaigns expose 5 conversion locations. Choice here determines required signal stack and which performance goals are exposed.

| Conversion location | Signal stack required | Best for | Notes |
|---|---|---|---|
| Website | Meta Pixel + CAPI, Purchase event with value/currency | Standard e-commerce, SaaS purchase, lead-to-sale flows | Default. 95% of Sales campaigns belong here. |
| App | App SDK (Facebook SDK / FB SDK) or MMP integration with app events, AEM for iOS | App-first commerce, subscription apps | iOS measurement runs on AEM + AdAttributionKit + MMP. Plan with that constraint. |
| Website and shop (US-only at time of writing) | Pixel + CAPI + connected Shop on Facebook/Instagram | US D2C with Shop tab | Shop integration is US-restricted. Verify country eligibility in account UI. |
| Calls | Phone number + click-to-call signal; optionally CRM offline conversion | Local services, high-ticket consultative B2C | Optimization quality depends on whether call outcomes are uploaded as offline conversion. |
| Messaging apps (Messenger, WhatsApp, Instagram Direct) | Purchase events sent to Meta from chat platform; messaging integration | Conversational commerce (apparel, beauty, services in APAC/LATAM) | Requires `maximize purchases through messaging` performance goal and 5+ purchase events in trailing 30 days for eligibility. () |

(

### 1-3. Performance goals exposed under Sales

Performance goal = the optimization event Meta delivers against. Available options vary by conversion location.

| Performance goal | Conversion location(s) | Use case | Risk |
|---|---|---|---|
| Maximize number of conversions | Website / App / Website-and-shop | Default for Purchase optimization | Treats every conversion as equal regardless of order value |
| Maximize value of conversions | Website / App | Wide AOV distribution; pLTV active | Requires value/currency on every event; volume threshold ~50/wk |
| Maximize landing page views | Website | Bridging step when Purchase volume too low | Do NOT use as terminal goal; transition to Purchase ASAP |
| Maximize link clicks | Website / Messaging | Diagnostic only; not a true Sales goal | Will not optimize for downstream conversion |
| Maximize conversations | Messaging | Click-to-Messenger volume | Conversation != purchase |
| Maximize purchases through messaging | Messaging | Conversational commerce with purchase event feedback | Requires purchase event signal back to Meta |
| Maximize impressions | Any | Reach-style only | Do not use for Sales objective in practice |

Operating rule: pick the goal that matches the actual revenue event. Use bridging events (LPV, ATC, IC) only when account-level Purchase volume is below ~30/month and only as an explicit transitional posture.

()

### 1-4. Sales path requirements

Required signals to launch:

| Signal | Required for | Notes |
|---|---|---|
| Meta Pixel | All website conversion locations | Browser-side baseline. Must fire on all key pages. |
| Conversions API (CAPI) | Production-grade Sales optimization | Mandatory in 2026 for accurate optimization given iOS ATT and browser signal loss. |
| Event deduplication | Pixel + CAPI dual-firing | Match `event_name` and `event_id`; 48h dedup window. |
| Catalog | Advantage+ catalog ads, Collection ads, Shop ads | Required for any feed-driven Sales surface. |
| App SDK or MMP | App conversion location | iOS requires AEM + ATT-aware setup. |

---

## 2. Account & Campaign Structure Design

### 2-1. Account-level prerequisites

Before launching Sales:

- Pixel installed on every domain involved, including subdomains.
- CAPI integrated (server-side or via gateway). Conversions API for Browsers (CAPIG) is the lowest-effort fallback if direct server integration is impossible.
- Events Manager Test Events shows duplicate detection working for at least Purchase, AddToCart, InitiateCheckout, ViewContent.
- Domain verified in Business Manager.
- Aggregated Event Measurement (AEM) priorities configured: Purchase ranked #1; downstream events follow.
- Catalog created and feed scheduled (if any feed-driven format will be used).
- Special Ad Categories assessed (financial, employment, housing, social/political → restricted targeting).

### 2-2. Number of campaigns

Default rule: minimize campaigns. Each campaign is a separate learning unit.

| Reason to split into a new campaign | Yes/No |
|---|---|
| Different conversion location (Website vs App vs Messaging) | Yes |
| Different country or major market with different economics | Yes |
| Different brand within same Business Manager | Yes |
| Strict budget separation required (compliance, finance) | Yes |
| New product launch needing isolation for clean measurement | Yes (temporary) |
| Different bidding strategy (Lowest Cost vs ROAS Goal) | Yes |
| Different audience type (broad vs retargeting) | Maybe — increasingly handled by Advantage+ |
| Different creative theme/concept | No |
| Different demographic | No (let Advantage+ Audience handle) |
| Different placement | No (rely on Advantage+ Placements unless evidence) |

Anti-pattern: one campaign per product, per audience, per creative. This fragments learning, multiplies overlap, and prevents any ad set from hitting 50/wk conversions.

### 2-3. Number of ad sets

Inside Advantage+ Sales, the 2026 limit is 50 ads per ad set, and multiple ad sets per campaign are now allowed (the previous "1 ad set / 150 ads" rule is gone). ()

Inside manual Sales:

| Account stage | Recommended ad sets per campaign |
|---|---|
| 0-30 purchases/month | 1 ad set, broad |
| 30-100 purchases/month | 2-3 ad sets max (e.g., broad / retargeting / lookalike) |
| 100-300 purchases/month | 3-5 ad sets (add product set, geo, customer-state splits) |
| 300+ purchases/month | 5-8 ad sets, all justified by clear differential economics |

If an ad set cannot plausibly hit 50 conversions/week given current spend and CPA, it should be merged.

### 2-4. Recommended structure templates

**Template A — Sub-50 purchases/month (small store)**

```
Campaign: Sales | Manual | Lowest Cost | Purchase
  Ad Set: Broad | Advantage+ Audience | Advantage+ Placements
    Ads: 6-10 (2-3 concepts x 2-3 formats)
```

**Template B — 50-300 purchases/month (scaling D2C)**

```
Campaign A: Sales | Advantage+ Sales | Lowest Cost | Purchase
  Ad Set 1: default Advantage+ Sales ad set
    Ads: 15-30 (testing 4-6 concepts)

Campaign B: Sales | Manual | Lowest Cost | Purchase
  Ad Set: Retargeting (180-day site visitors, video viewers, IG engagers)
    Ads: 4-8 (DPA-style + creative)
```

Existing Customer Budget Cap (if available in UI) on Campaign A: 20-30% to start, 10-15% in growth mode. ()

**Template C — 300+ purchases/month (mature D2C with margin signal)**

```
Campaign A: Advantage+ Sales | Lowest Cost or ROAS Goal | Purchase value
  Existing customer cap: 15-25%
  Ads: 30-50 across hero / UGC / DPA-style / Reels-native
Campaign B: Manual Sales | Catalog | Advantage+ catalog ads (broad) | Highest Value
  Product Set: high-margin SKUs, custom_label_0 = "high_margin"
Campaign C: Manual Sales | Catalog | Advantage+ catalog ads (retargeting)
  Audience: Viewed but not purchased (14d, 30d), ATC not purchased (7d), past purchasers (180d for cross-sell)
Campaign D: Manual Sales | Lowest Cost | Purchase
  Ad Set: New customer-only (excluded customer list, excluded purchased pixel audience)
```

### 2-5. Consolidate vs split heuristics

Consolidate when:
- Each ad set is below 50 events/week
- Audience definitions overlap >30%
- The same creative wins in multiple ad sets
- You cannot explain why a split exists in business terms (not media-buying habit)

Split when:
- A measurable economic difference exists (e.g., COGS varies 3x by product set)
- A compliance constraint forces it (special ad category, geo restriction)
- A creative format genuinely cannot share an ad set (e.g., DPA-driven catalog vs static hero)
- Budget separation is a hard requirement

---

## 3. Advantage+ Sales (Deep Dive)

### 3-1. What it is

Advantage+ Sales is Meta's automated Sales campaign type. It was previously named "Advantage+ Shopping Campaigns" (ASC); the rename to "Advantage+ Sales" reflects that it now supports more than just shop-style conversions. ()

### 3-2. What is automated

The system automates four levers:

| Lever | Automated behavior |
|---|---|
| Audience | Advantage+ Audience expands beyond suggestions; demo/age/location can be soft signals; only certain controls are hard. |
| Placement | Advantage+ Placements distributes across Facebook, Instagram, Reels, Stories, Audience Network, Messenger. |
| Creative | Up to 150 creative combinations can be tested; system swaps copy, headlines, CTAs, music, cropping. |
| Budget | Single campaign-level budget; no ad-set-budget tier in classic ASC; March 2026 update added multi-ad-set support. |

(

### 3-3. Manual controls remaining

Even inside Advantage+ Sales, the following are still operator decisions:

- Conversion location (Website / App / Website-and-shop)
- Performance goal (conversions vs value)
- Bidding strategy (Lowest Cost / Cost-per-Result Goal / ROAS Goal / Bid Cap)
- Existing Customer Budget Cap (when available — see 3-4)
- Country/region (hard constraint, not suggestion)
- Minimum age (hard, especially for restricted offers)
- Language (soft)
- Custom audience exclusions (hard, the most important manual lever)
- Ad creative input (you provide assets; system combines them)
- Ad import from existing successful posts

### 3-4. Existing Customer Budget Cap (volatile)

Existing Customer Budget Cap behavior is volatile. Verify the current account UI before promising a specific cap range, removal, or expanded control set.

| Volume / mode | Recommended cap |
|---|---|
| New / unstable account | 20-30% to existing |
| Steady state | 15-25% |
| Aggressive new-customer growth | 10-15% |
| Brand pulse / loyalty period | 30-40% |

Hard rule for the skill: **always verify in current UI before promising specific cap behavior**. If the cap field is missing for a given account or country, fall back to manual Sales with a customer-list exclusion ad set, or a separate retargeting campaign with explicit budget.

### 3-5. Eligibility and learning requirements

| Requirement | Spec |
|---|---|
| Pixel + CAPI | Strongly recommended; without CAPI, optimization quality degrades materially in 2026 |
| Purchase event with value/currency | Required for value optimization, recommended for all Sales |
| Weekly Purchase events | 50+ to exit learning; <50 means perpetual learning, unstable CPA |
| Daily budget | At least Target CPA × 50 / 7 (e.g., $30 CPA → $214/day floor) |
| Creative count | Minimum 6, recommended 15-30, optimal 20-50 diverse assets |
| Domain verification | Required |
| AEM event prioritization | Purchase ranked #1 |

()

### 3-6. Ad import

Advantage+ Sales lets you import existing best-performing posts/ads. Use cases:
- Cold-start a new Advantage+ campaign by seeding it with proven creatives from a manual campaign
- Migrate from a manual Sales campaign without losing creative learning at the asset level (post engagement carries forward, but campaign-level learning resets)

### 3-7. When to use Advantage+ Sales vs manual

| Situation | Recommendation |
|---|---|
| 50+ weekly purchases, clean Pixel+CAPI, broad TAM | Advantage+ Sales primary |
| Catalog with 20+ SKUs and broad demand | Advantage+ Sales + Advantage+ catalog ads |
| Strict customer/geo/age/compliance requirements | Manual Sales |
| Niche B2B with narrow ICP | Manual Sales |
| New launch with no event volume | Manual Sales (use bridging events) until volume stabilizes |
| Existing-customer harvesting risk and cap unavailable | Manual Sales with exclusion |
| Margin varies materially by SKU | Manual Sales with product-set splits, or feed-side margin labels |
| Test new creative concept in isolation | Manual (if isolation matters) or A+ with controlled creative slot |

()

---

## 4. Catalog Ads / Advantage+ Catalog Ads (Deep Dive)

### 4-1. Two flavors

Catalog ads (the format formerly called Dynamic Product Ads / DPA) split into two operational modes:

| Mode | Audience type | Use |
|---|---|---|
| Advantage+ catalog ads for retargeting | Custom audience: viewed product, ATC, past purchasers | Lower-funnel re-engagement |
| Advantage+ catalog ads for broad audiences | Open audience driven by feed signals + Advantage+ Audience | Prospecting via feed (formerly DABA) |

()

### 4-2. Feed requirements (required fields)

Required fields for a feed used with catalog ads:

| Field | Spec | Notes |
|---|---|---|
| `id` | string, ≤100 chars, unique, stable | Primary key for content_ids matching |
| `title` | string, ≤200 chars (≤100 recommended) | First 25 chars are highest-leverage |
| `description` | string, ≤9999 chars (200-500 recommended) | Affects relevance |
| `availability` | enum: in stock / out of stock / preorder / available for order / discontinued | Out-of-stock items will not deliver |
| `condition` | enum: new / refurbished / used | Required |
| `price` | numeric + ISO 4217 currency | Required |
| `link` | URL | Must be HTTPS, must match domain verification |
| `image_link` | URL | Min 500×500, recommended 1024×1024+, JPEG/PNG/GIF, <8MB, HTTPS |
| `brand` | string | Required |

()

### 4-3. Conditionally required fields

| Field | When required |
|---|---|
| `gtin`, `mpn` | Required for new products in many categories; one of (`brand`, `gtin`, `mpn`) typically required |
| `item_group_id` | Required for products with variants (size, color) |
| `google_product_category` / `fb_product_category` | Used for category-level optimization |
| `sale_price` + `sale_price_effective_date` | When discount is active |
| `shipping` | Required in some markets for accurate price comparison |

### 4-4. Custom labels and segmentation

Use custom labels (`custom_label_0`-`custom_label_4` or `custom_data` fields equivalent to Meta's product set filters) to encode profit-aware decisions:

| Label slot | Suggested use |
|---|---|
| `custom_label_0` | Margin tier (high/mid/low) |
| `custom_label_1` | Inventory health (overstocked / normal / scarce) |
| `custom_label_2` | New customer attractor (yes/no) |
| `custom_label_3` | Lifecycle stage (hero / longtail / clearance) |
| `custom_label_4` | Seasonal / promotional flag |

These labels then drive product set definitions used in catalog campaigns.

### 4-5. Product set design

| Product set | Definition | Use |
|---|---|---|
| All products | Whole catalog | Broad prospecting |
| Hero SKUs | `custom_label_3 = hero` | Acquisition-focused |
| High margin | `custom_label_0 = high` | Profit-weighted scaling |
| New customer hooks | `custom_label_2 = yes` | New-customer ad set |
| Cross-sell complements | Manual mapping | Post-purchase retargeting |
| Replenishment | Consumables | 30/60/90-day cadence retargeting |

### 4-6. Feed sync hygiene

| Sync method | Cadence | Best for |
|---|---|---|
| Direct platform integration (Shopify, WooCommerce) | Real-time | Most stores |
| Scheduled feed (URL pull) | 1-24h | Mid-sized stores |
| API push | Real-time | Custom stacks, high-velocity inventory |
| Manual upload | n/a | Initial seeding only |

Common feed problems:

| Problem | Effect |
|---|---|
| Image URLs return 403 / 404 | Item rejected, no delivery |
| Product page URL inconsistent (`?utm` variations) | content_ids matching fails, re-targeting and dynamic ads underperform |
| Stale availability | Out-of-stock ads delivered, wasted spend |
| Price drift between feed and site | Catalog policy violation, item pause |
| Missing `brand`/`gtin` | Reduced eligibility for Shop and search surfaces |
| Title stuffed with keywords | Lower CTR, brand voice damage |

### 4-7. Catalog matching and content_ids

For dynamic personalization, Pixel+CAPI Purchase, AddToCart, and ViewContent events must include `content_ids` (array of strings) and `content_type` ("product" or "product_group") that match the `id` (or `item_group_id`) in the catalog. If they do not match, the system cannot personalize, and the campaign degrades to non-dynamic delivery.

()

---

## 5. Collection Ads + Instant Experience

### 5-1. Format spec

Collection ads have a primary asset (video or image) plus a 3-tile product grid below. Tapping opens an Instant Experience full-screen post-click destination that loads inside the Meta app.

()

### 5-2. Templates

| Template | Best fit | Catalog requirement |
|---|---|---|
| Instant Storefront | Catalog of 4+ SKUs; grid-style discovery | Yes |
| Instant Lookbook (Lifestyle Catalog) | Editorial / brand storytelling with shoppable products | Yes |
| Instant Customer Acquisition | Single-product or service conversion on mobile LP | Optional (works without catalog) |
| Instant Form | Form fill in-app | No |
| Instant Storytelling | Narrative product reveal | Optional |

### 5-3. When to use Collection in a Sales context

Use Collection in Sales when:
- Mobile traffic dominates (>70%)
- Products are visual (apparel, beauty, home, food)
- Catalog is clean and image-rich
- You want to compress discovery → consideration in-app

Avoid Collection when:
- Catalog images are inconsistent or low-resolution
- Product needs heavy spec/comparison
- Mobile checkout is broken or slow
- The user journey requires a form, calculator, or configurator that does not fit Instant Experience

### 5-4. Sizing

| Asset | Spec |
|---|---|
| Cover image | 1:1 (1080×1080) or 16:9; 1200×628 minimum |
| Cover video | 1:1 or 16:9; ≤120s; loop-friendly |
| Product tile images | Square crop, sourced from catalog |
| Instant Experience | Full-screen mobile, 1080×1920 effective canvas |

### 5-5. Operating notes

- Collection only renders on mobile placements. Desktop sees a fallback (single image/video).
- Track Instant Experience opens, scroll depth, link clicks separately — they reveal whether discovery is happening but not converting.
- Collection works under both Advantage+ Sales and manual Sales.

---

## 6. Purchases Through Messaging

### 6-1. What it is

A Sales-objective performance goal that optimizes for purchase events occurring inside Messenger (and increasingly Instagram Direct / WhatsApp where supported). Selected as: Conversion location = Messaging app → Performance goal = Maximize purchases through messaging.

()

### 6-2. Requirements

| Requirement | Spec |
|---|---|
| Purchase events fed back to Meta | Required; ≥5 purchase events in trailing 30 days for eligibility |
| Conversion location | Messaging app |
| Messaging platform connected | Messenger primary; WhatsApp/IG Direct depending on country and account |
| Response operations | Team or chatbot able to handle inbound at click volume |

### 6-3. When to use

- High-touch products where conversation closes the sale (mid-ticket apparel, beauty bundles, services)
- APAC/LATAM markets where chat commerce is normal
- Brands already operating via WhatsApp/Messenger
- Stores in markets where checkout-on-web has friction

### 6-4. When to avoid

- Pure self-serve checkout works fine
- Sales team can't keep up with response SLA
- No mechanism to feed purchase events back into Meta (manual order entry only)
- Product is commodity / low-touch — chat is overhead, not unlock

### 6-5. Reporting caveat

The "mark as paid" feature inside Messenger does not currently feed conversion optimization, only reporting. Optimization requires actual `Purchase` events with value/currency sent via CAPI/Pixel keyed on the messaging interaction. ()

---

## 7. Bidding Strategy

### 7-1. Strategy ladder

| Strategy | Mechanic | When to use | Risk |
|---|---|---|---|
| Lowest Cost (Highest Volume) | No constraint; spend full budget chasing cheapest results | Default. New accounts, learning, exploration | CPA can drift up over time as easy auctions exhaust |
| Cost per Result Goal | Soft target average CPA | Stable account with predictable economics; ≥50 conversions/week | If goal too tight, underdelivery |
| Bid Cap | Hard ceiling on bid in auction | Strict CPA control; manual auction discipline | Underdelivery if cap below market clearing price |
| ROAS Goal | Soft target average ROAS | Value optimization mature, ≥50 valued conversions/week, value distribution wide | If too high, Meta pauses delivery |
| Highest Value | No ROAS constraint; chase highest-value buyers | Bridge from Lowest Cost to ROAS Goal; 4-6 weeks before introducing ROAS Goal | Spend will drift to high-AOV but possibly low-margin |
| Minimum/Maximum Spend Targets | Floor/ceiling on ad-set spend within campaign budget | Multi-ad-set Advantage+ campaigns where ad set parity matters | Adds complexity; verify availability in account UI |

()

### 7-2. Stage-by-stage posture

| Stage | Posture |
|---|---|
| New account / 0-30 purchases/mo | Lowest Cost. Do not set CPA target. Optimize for whatever event has volume. |
| 30-50 purchases/mo | Lowest Cost. Begin tracking organic CPA distribution to understand realistic Cost Goal. |
| 50-100 purchases/mo | Lowest Cost still default. Cost-per-Result Goal can be tested in a parallel ad set, not as global switch. |
| 100-300 purchases/mo | Cost-per-Result Goal viable for stability. Highest Value if value optimization is on. |
| 300+ purchases/mo with stable value events | ROAS Goal viable. Set Goal at observed average ROAS minus 10-20% (loose) initially, tighten over weeks. |

### 7-3. Bid Cap math

Bid Cap should reflect maximum acceptable cost-per-result + auction overhead. Practitioner heuristic: target CPA × 1.2 to 1.5. ()

Example: target CPA = $20 → Bid Cap = $24-30.

### 7-4. ROAS Goal pitfalls

- Setting ROAS Goal above the campaign's organic average → delivery stalls.
- Switching from Lowest Cost to ROAS Goal during a campaign → learning resets.
- ROAS Goal without value optimization on every event → optimizes against incomplete signal.
- Refunds not fed back → ROAS Goal optimizes on inflated values.

### 7-5. Value optimization readiness

Required to run Highest Value or ROAS Goal:

- All Purchase events carry `value` and `currency` (not zero, not stub)
- Value distribution wide enough that high vs low matters (>2x AOV spread between top and bottom quintile)
- ≥50 valued purchases per ad set per week
- CAPI dedup verified — duplicate-counted revenue is the most common ROAS Goal failure
- Refund/return flow ideally pushes negative-value or refund event back

---

## 8. Audience Design

### 8-1. Advantage+ Audience vs original-audience

Advantage+ Audience treats your audience selections as *signals*, not as hard targeting. It will deliver outside your selections when its model expects better outcome. Hard controls remain:

- Country/region (hard)
- Minimum age (hard, especially under-18 protections)
- Language (mostly hard)
- Custom audience exclusions (hard — most important lever)

Use original-audience targeting (the legacy detailed-targeting flow) only when:
- Compliance or special ad category requires it
- ICP is so narrow Advantage+ Audience would dilute it (early-stage B2B, very niche verticals)

### 8-2. Custom audiences for Sales

| Audience | Use | Window |
|---|---|---|
| Website visitors | Mid-funnel retargeting | 30/60/180 day |
| Product viewers (`ViewContent`) | Lower-funnel retargeting | 14/30 day |
| Add-to-cart, not purchased | High-intent retargeting | 7/14 day |
| Initiate checkout, not purchased | Highest-intent retargeting | 3/7 day |
| Past purchasers | Cross-sell, repeat, exclusion | 90/180/365 day |
| Customer list (CRM upload) | Exclusion or seed for lookalike | n/a |
| Engagement (IG/FB profile) | Warm prospecting | 60/90 day |
| Video viewers (75%) | Warm prospecting | 30/90 day |

### 8-3. Lookalike audiences

| Source | Quality |
|---|---|
| Last 90/180-day purchasers (with high LTV) | Best |
| Customer list (full file with hashed email + phone) | Strong if fresh and representative |
| ATC / IC users | Medium; can be useful but may reflect temporary intent |
| All site visitors | Low (too broad to differentiate from Advantage+ Audience) |
| Engagement only | Weak for purchase optimization unless validated |

Operating rule: in 2026, Lookalikes are increasingly redundant with Advantage+ Audience. Use them when:
- You have a particularly clean high-value customer list
- You want a hard exclusion frame ("similar to existing customers" then exclude existing customers)
- You are running manual Sales for compliance and need a defined audience

Do not stack 5+ Lookalike percent buckets — overlap kills learning.

### 8-4. Exclusion strategy (load-bearing)

Always exclude:

| Exclusion | Why |
|---|---|
| Past purchasers (when goal is acquisition) | Prevent harvesting; supports new-customer rate KPI |
| Active customers / subscribers | Avoid serving paying customers acquisition ads |
| Recent leads (when Sales is for upsell only) | Avoid double-counting or stacking funnels |
| Employees / internal IPs | Cleanliness |

In Advantage+ Sales, customer-list exclusions remain hard. Use this as the de facto new-customer control when Existing Customer Budget Cap is unavailable or insufficient.

---

## 9. Creative Strategy

### 9-1. Format priority for Sales

| Format | Priority | Notes |
|---|---|---|
| Reels-native vertical video (9:16, 4-15s) | Highest | Reels supply is largest growth surface; works across Reels, Stories, Feed |
| Static 4:5 image (Feed-first) | High | Cheap to produce, robust across placements |
| Carousel (square 1:1 or 4:5) | High | Strong for catalog and benefit-listing |
| Catalog (DPA / Advantage+ catalog) | High | Required for SKU-driven retargeting |
| Collection + Instant Experience | Medium | Mobile commerce specific |
| Square 1:1 (legacy) | Low | Surviving for compatibility, not preferred |
| Story-only static | Low | Reels covers most of this |

()

### 9-2. Asset volume and concept count

| Account stage | Concepts | Variants/concept | Total ads |
|---|---|---|---|
| 0-30 purchases/mo | 2-3 | 2-3 | 6-10 |
| 30-100 purchases/mo | 4-6 | 3-4 | 15-25 |
| 100-300 purchases/mo | 6-10 | 3-5 | 25-50 |
| 300+ purchases/mo | 10+ | 4-6 | 40-150 |

Concept = the core idea (problem framing, benefit, social proof, mechanism, founder story, comparison, etc.).
Variant = the same concept rebuilt across formats / hooks / lengths.

### 9-3. Reels and Stories safe zone

As of March 2026, Stories and Reels share a unified safe zone on a 1440×2560 canvas:

| Region | Keep critical content out |
|---|---|
| Top | 14% (~358px) — username, sponsored label |
| Bottom | 20-35% (~512-896px) — caption + CTA UI; Reels expands more than Stories |
| Sides | 6% each (~87px) |

Center critical content within the middle ~80% horizontally to survive Smart Zoom on different devices.

()

### 9-4. Aspect ratio defaults

| Surface | Recommended |
|---|---|
| Reels / Stories | 9:16 (1080×1920) |
| Feed | 4:5 (1080×1350) |
| Carousel | 1:1 (1080×1080) |
| In-stream video | 16:9 |

Meta has effectively deprecated 1:1 as default for Feed images and videos in favor of 4:5.

### 9-5. Creative fatigue rules

| Signal | Threshold | Action |
|---|---|---|
| Frequency (7-day) | >3.0 | Investigate fatigue, refresh hook |
| Frequency (30-day) | >7.0 | Add new concepts |
| CTR drop within 14 days | -30% | Refresh creative |
| Hook rate (3s thumbstop) | <25% | Replace first 3s |
| Hold rate (15s) | <10% | Re-edit pacing or replace |
| Outbound CTR vs link CTR | >2x gap | Landing page friction or offer mismatch |

### 9-6. Advantage+ Creative

Advantage+ Creative auto-applies enhancements (cropping, music, text variations, brightness) and AI-generated variations. Rules:

- QA every enhancement before launch (especially text overlay AI generation)
- Brand voice can drift; gate AI-generated copy through review
- Disable enhancements selectively when brand consistency is critical (luxury, regulated)

### 9-7. UGC and social proof

In Sales, UGC consistently outperforms produced creative on cost per result, especially for D2C in 2025-2026. Operating heuristic: at least 30% of active Sales creative should be UGC-style. ()

---

## 10. Catalog Feed Quality (Operational Checklist)

### 10-1. Daily checks

| Check | Pass criteria |
|---|---|
| Feed sync ran successfully | Last sync <24h, no errors |
| Item rejection count | <2% of total catalog |
| Out-of-stock with active ads | 0 |
| Price discrepancy errors | 0 |

### 10-2. Weekly checks

| Check | Pass criteria |
|---|---|
| Image rejections (low quality, watermarks, text overlay) | <1% of catalog |
| Product set definitions match latest custom labels | Yes |
| Title length distribution | <10% over 100 chars |
| Description fill rate | >95% |
| Catalog policy violations | 0 |

### 10-3. Monthly checks

| Check | Pass criteria |
|---|---|
| Top 20 SKU pages all reachable, mobile-friendly, fast | Yes |
| Margin labels current | Yes |
| Inventory labels current | Yes |
| Seasonal flags updated | Yes |
| New SKU coverage in feed | 100% within 7 days of catalog add |

---

## 11. Measurement Design

### 11-1. Pixel + CAPI required spec

For every key event (Purchase, AddToCart, InitiateCheckout, ViewContent, Lead, Subscribe, StartTrial):

| Field | Required | Notes |
|---|---|---|
| `event_name` | Yes | Must match between Pixel and CAPI byte-for-byte |
| `event_id` | Yes (for dedup) | Generate once on browser, pass to both Pixel and CAPI |
| `event_time` | Yes | Up to 7 days back; older rejected |
| `action_source` | Yes | `website` for web, `app`, `chat`, `business_messaging`, `physical_store`, etc. |
| `event_source_url` | Yes for web | URL of the page firing the event |
| `user_data` (hashed) | Required | email, phone, fbp, fbc, external_id, IP, user agent, click IDs |
| `value` + `currency` | Required for Purchase, Subscribe, StartTrial | ISO 4217 |
| `content_ids` + `content_type` | Required for catalog matching | Must match catalog `id` |
| `contents` | Recommended | Array with id, quantity, item_price |
| `order_id` | Recommended | Helps server-side dedup and CRM reconciliation |

()

### 11-2. Standard event templates

| Event | Required fields | Optional but recommended |
|---|---|---|
| `Purchase` | value, currency, content_ids, content_type | order_id, contents, num_items |
| `Subscribe` | value, currency | predicted_ltv |
| `StartTrial` | value (often 0), currency | predicted_ltv |
| `AddToCart` | content_ids, content_type | value, currency |
| `InitiateCheckout` | content_ids, content_type | value, currency, num_items |
| `ViewContent` | content_ids, content_type | value, currency, content_category |
| `Lead` | (none required) | content_name, content_category, value |

### 11-3. Deduplication

Spec:
- Window: 48h between Pixel and CAPI events for dedup
- Match keys: `event_name` + `event_id` (primary); `fbp` + `external_id` is fallback but weaker
- Browser preferred: when both arrive within ~5 minutes, Meta favors browser event
- Verify in Events Manager → Test Events; look for "Deduplicated" tag

()

Common dedup failures:

| Failure | Cause | Fix |
|---|---|---|
| Same event counted twice | event_id missing or differs | Generate once, pass identically |
| event_name case mismatch (`Purchase` vs `purchase`) | Implementation drift | Standardize and lock |
| event_time skew >2h | Clock drift on server | NTP sync or pass exact browser timestamp |
| Custom event names mixed with standard | Accidental rename | Rename and unify |
| One-side missing for some browsers | Adblocker blocks Pixel only | CAPI fills gap; Meta dedup still fine |

### 11-4. Event Match Quality (EMQ)

EMQ is a 0-10 score per event indicating how well sent customer data matches Meta accounts.

Operating rules:
- Treat EMQ as a health check, not a KPI
- Aim for 7+ on Purchase; 6+ on upper-funnel
- Improve EMQ by sending hashed email, phone, fbp, fbc, external_id, IP, user agent, and (where allowed) address fields
- Do NOT block launch on EMQ; iterate after baseline

()

### 11-5. Backend reconciliation

Required reports for Sales accounts at 50+ purchases/month:

| Report | Source | Frequency |
|---|---|---|
| Backend revenue vs Meta-attributed revenue | CRM/ecom + Ads Manager | Weekly |
| New vs returning customer rate | CRM/ecom | Weekly |
| First-order contribution margin | Finance | Monthly |
| Refund/return rate by Meta-attributed orders | CRM/finance | Monthly |
| Click vs engage vs view contribution | Ads Manager attribution split | Weekly |
| Product-level ROAS and margin | Catalog × CRM | Monthly |
| Holdout or geo-test result (if running) | Test platform | Per test |

### 11-6. 2026 attribution windows

Ads Insights attribution-window support changes over time. Re-check view-through, click-through, and engage-through support before making dashboard or baseline recommendations.

When Meta changes click-through or engage-through definitions, reset reporting baselines and annotate the change.

Operating implications:

- Do not compare pre/post-2026-01-12 periods without annotation
- Report click-through, engage-through, and view-through as separate columns when exposed
- Engage-through is not a "site visit" — it's social engagement followed by conversion
- Backend reconciliation should now align more closely with link-click attribution; remaining gap is engage + view + modeling

### 11-7. Conversion Lift / Brand Lift / Sales Lift

| Test | Measures | When |
|---|---|---|
| Conversion Lift | Incremental purchases/leads from Meta exposure | After 90+ days of stable spend, ≥$5-10k/wk on the tested cell |
| Brand Lift | Ad recall, awareness, consideration, favorability | Awareness/Engagement campaigns mainly, can layer on Sales |
| Sales Lift / Offline Lift | In-store / offline incremental sales using matched transactions | Omnichannel retailers with POS feed |

Treat platform ROAS as an upper bound on incrementality. Real lift depends on category, brand strength, retargeting share, and the actual holdout result.

### 11-8. New vs existing customer reporting

Required to read whether Advantage+ Sales is acquiring or harvesting:

| Metric | Source |
|---|---|
| New customer rate (% of orders that are first-time) | CRM |
| Cost per new customer (campaign spend / new customers) | CRM × Ads Manager |
| New customer LTV | CRM cohort |
| Returning customer share of Meta-attributed revenue | CRM × Ads Manager |

If Existing Customer Budget Cap exists in account UI, monitor it actively. If it does not, this report becomes the only check on harvesting.

---

## 12. Diagnostic Decision Tree

```
START
│
├─ Q1: Is Pixel + CAPI dedup verified?
│   ├─ NO → STOP. Fix measurement before any campaign decision.
│   └─ YES → continue
│
├─ Q2: Is Meta-reported revenue tracking with backend?
│   ├─ NO, Meta higher → Likely existing-customer harvesting, view-through/engage-through inflation, dedup miss
│   │   → Run new-customer report
│   │   → Verify dedup
│   │   → Check Existing Customer Budget Cap
│   │   → Consider holdout test
│   └─ YES → continue
│
├─ Q3: Is volume (purchases/week per ad set) ≥50?
│   ├─ NO → 
│   │   ├─ Consolidate ad sets
│   │   ├─ Drop to upper-funnel event temporarily (ATC/IC) but plan exit
│   │   ├─ Increase budget if CPA permits
│   │   └─ Reduce concept count temporarily
│   └─ YES → continue
│
├─ Q4: Is platform ROAS healthy but profit weak?
│   ├─ YES → Margin/refund/discount mix problem
│   │   ├─ Add custom_label margin tiers to feed
│   │   ├─ Run product-set splits by margin
│   │   └─ Consider Highest Value with margin-weighted values
│   └─ NO → continue
│
├─ Q5: Is CPA rising over time at flat creative?
│   ├─ YES → Creative fatigue
│   │   ├─ Refresh top-funnel hooks
│   │   ├─ Add new concepts (not variants)
│   │   └─ Verify frequency >3.0
│   └─ NO → continue
│
├─ Q6: Is ATC high but Purchase low?
│   ├─ YES → Checkout friction
│   │   ├─ Audit shipping cost surprise
│   │   ├─ Audit payment options
│   │   ├─ Audit mobile checkout speed
│   │   └─ Audit form fields
│   └─ NO → continue
│
├─ Q7: Are catalog/dynamic ads showing wrong products?
│   ├─ YES → content_ids mismatch
│   │   ├─ Verify Pixel/CAPI content_ids match catalog id
│   │   ├─ Verify item_group_id for variants
│   │   └─ Verify feed sync recency
│   └─ NO → continue
│
└─ Q8: Is Advantage+ Sales underperforming manual?
    ├─ Consider:
    │   ├─ Creative volume <15? Add 10-20 concepts.
    │   ├─ Existing customer share excessive? Set/lower cap.
    │   ├─ Audience exclusions missing? Add customer list.
    │   ├─ Conversion event too low-funnel? Move to Purchase.
    │   ├─ Budget below 50/wk threshold? Increase or consolidate.
    │   └─ ROAS Goal too tight? Loosen 10-20%.
```

---

## 13. Common Traps (Full)

### 13-1. Measurement traps

- Launching with Pixel only and no CAPI in 2026 — material optimization degradation
- Sending Pixel + CAPI but never verifying dedup → double-counting
- Custom event names colliding with standard names → optimization splits
- Missing `value`/`currency` on Purchase → cannot run value optimization
- `event_time` clock skew → events rejected or misaligned
- Treating Event Match Quality as a KPI rather than a hygiene metric
- Ignoring the 2026 attribution window changes when comparing periods

### 13-2. Catalog traps

- Stale availability — out-of-stock items still delivering
- Image quality below threshold — silent rejection
- Title stuffed with keywords — CTR drop and brand voice damage
- `id` collision after platform migration — historical retargeting breaks
- Missing `brand`/`gtin` — Shop and search eligibility lost
- No custom labels — cannot run profit-aware product sets
- Manual one-off uploads instead of scheduled sync — drift inevitable

### 13-3. Campaign structure traps

- One-campaign-per-product fragmentation
- Splitting by demographic that Advantage+ Audience would handle better
- Multiple Lookalike % buckets stacked → audience overlap
- Forgetting customer-list exclusions in acquisition campaigns
- Making creative changes inside learning phase (resets it)
- Editing budget by >20% mid-learning (resets it)

### 13-4. Bidding traps

- ROAS Goal set above organic average → delivery stalls
- Switching strategy mid-learning
- Bid Cap below market clearing price → underdelivery without diagnosis
- Cost-per-Result Goal with <50 events/week → unstable
- Not feeding refund events back when running Highest Value or ROAS Goal

### 13-5. Advantage+ Sales-specific traps

- Treating Advantage+ as a fix for poor product-market fit
- Using Advantage+ Sales without CAPI in 2026 — major optimization quality loss
- Assuming Existing Customer Budget Cap state without verifying current UI (it has changed multiple times in 2024-2026)
- Loading 3-5 creatives only — system cannot test 150 combinations from 5 inputs
- Not importing successful manual ads when migrating
- Running a single Advantage+ Sales campaign across multiple countries with very different economics

### 13-6. Creative traps

- 1:1 as default rather than 4:5 / 9:16
- Critical content inside Reels/Stories unsafe zone (top 14%, bottom 20-35%)
- All variants of one concept rather than multiple distinct concepts
- Heavy text overlay clipped by AEM/Smart Zoom
- Polished produced creative only, no UGC
- Reusing Reels creative as static Feed without re-cut
- Letting Advantage+ Creative AI-generate copy without brand QA

### 13-7. Audience traps

- Excluding all warm audiences inside Advantage+ Sales (defeats system)
- No exclusions at all → existing-customer harvesting maxes out
- 5+ Lookalike buckets stacked → overlap kills learning
- Detailed targeting that contradicts Advantage+ Audience expansion
- Custom audience window too long (e.g., 365-day site visitors as "warm")

### 13-8. Operational traps

- Editing during learning phase
- Daily budget changes >20%
- Pausing/relaunching ad sets daily
- Comparing 2026-pre-Jan-12 to post without attribution annotation
- Running A/B tests under <50 events/week (no statistical power)
- Using one creative test to judge a concept (variance dominates)

---

## 14. Volatile Capabilities Checklist (verify in current UI)

These features have rolled out, rolled back, or changed scope multiple times. **Always verify current account UI** before promising behavior.

| Capability | What to verify |
|---|---|
| Existing Customer Budget Cap | Present in Advantage+ Sales? Adjustable percent? Default value? |
| Existing Customer Reporting | Available in Ads Manager breakdown? |
| Multiple ad sets in Advantage+ Sales | Available in this account? Max count? |
| 50 ads per ad set cap | Enforced? Can old 150-in-one-ad-set campaigns still run? |
| Advantage+ catalog ads — broad mode | Available, or merged into Advantage+ Sales catalog flow? |
| Shop integration / Shop ads | Available in this country (US-only as of writing)? |
| Maximum spend / minimum spend ad-set targets | Visible in budget controls? |
| ROAS Goal vs Highest Value | Both available? |
| Advantage+ Creative enhancements | Per-asset toggle present? AI-generated text approval flow? |
| Conversions API for Browsers (CAPIG) | Setup option visible? |
| Conversion Leads optimization | Eligibility unlocked? |
| Conversion Lift availability | Tier/account threshold? |
| Brand Lift availability | Spend threshold? |
| Special Ad Categories targeting restrictions | Current categories and exclusions? |
| Attribution window options (1d_view, click windows) | Which exposed in this account? |
| Engage-through attribution | Reported as separate column? |
| Existing Customer Budget Cap field naming | UI label has changed; field may be in Advantage+ Sales settings, ad set, or campaign |

Current official checks for volatile Sales items:

- Meta Sales objective: https://www.facebook.com/business/ads/ad-objectives/sales
- Meta Advantage+ Sales: https://www.facebook.com/business/ads/meta-advantage-plus/sales-campaigns
- Meta Advantage+ Catalog Ads: https://www.facebook.com/business/ads/meta-advantage-plus/catalog-ads
- Meta Collection ads: https://www.facebook.com/business/ads/collection-ad-format
- Meta purchases through messaging: https://www.facebook.com/business/ads/click-to-message-ads/purchases-through-messaging/
- Meta CAPI deduplication: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events

---

## 15. Quick Reference Tables

### 15-1. Sales objective at a glance

| Question | Answer |
|---|---|
| What replaces it? | Sales is the consolidation of old Conversions + Catalog Sales objectives |
| Default conversion location | Website |
| Required signal stack | Pixel + CAPI + Purchase event with value/currency |
| Default bidding | Lowest Cost (Highest Volume) |
| Learning threshold | 50 conversions per ad set per week |
| Default placement | Advantage+ Placements (all surfaces) |
| Default audience | Advantage+ Audience |

### 15-2. Sub-type recommendation by business

| Business | Recommended Sales sub-type |
|---|---|
| D2C with clean Pixel+CAPI, ≥100 purchases/mo | Advantage+ Sales primary + manual retargeting |
| D2C with large catalog | Advantage+ Sales + Advantage+ catalog ads (broad + retargeting) |
| Subscription / SaaS with Purchase or Subscribe events | Advantage+ Sales optimizing on Subscribe/Purchase, Highest Value if value distribution wide |
| High-margin niche | Manual Sales with margin-labeled product sets |
| Local / service area | Manual Sales with strict geo + Calls or Messaging conversion location |
| Conversational commerce (chat-led) | Sales with Messaging conversion location, purchases-through-messaging goal |
| US store with Shop integration | Advantage+ Sales with Website-and-shop conversion location |
| Mobile-first app commerce | Sales with App conversion location, AEM + MMP measurement |

### 15-3. Key thresholds

| Threshold | Value |
|---|---|
| Learning phase exit | 50 conversions / ad set / week |
| Min daily budget for learning | Target CPA × 50 / 7 |
| Catalog image min size | 500×500 (1024×1024 recommended) |
| Catalog title max length | 200 chars (≤100 recommended) |
| Pixel/CAPI dedup window | 48 hours |
| `event_time` max age | 7 days |
| Offline event upload window | 62 days |
| Purchases-through-messaging eligibility | 5+ purchase events trailing 30 days |
| Reels/Stories safe zone (top) | 14% |
| Reels safe zone (bottom) | 35% |
| Stories safe zone (bottom) | 20% |

---

## 16. Cross-references

- Use `measurement-capi-attribution.md` for Pixel/CAPI, deduplication, EMQ, offline events, attribution, and incrementality.
- Use `automation-advantage-plus.md` for Advantage+ Sales controls, existing-customer volatility, and current attribution/API behavior.
- Use `diagnostics-account-data.md` when the user provides Ads Manager, Events Manager, backend, CRM, or catalog data.
- Use `creative-strategy.md` and `creative-production.md` for concept strategy, Reels/Stories fit, UGC/social proof, and format production.
- Use `policy-special-categories.md` if the offer touches credit, housing, employment, health, social issues, or other regulated topics.
