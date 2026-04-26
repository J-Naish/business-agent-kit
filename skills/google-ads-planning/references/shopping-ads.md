# Google Shopping Ads

## Contents

- [Glossary](#glossary)
- [Practice-first operating principles](#practice-first-operating-principles)
- [2. Merchant Center setup](#2-merchant-center-setup)
- [3. Product feed: design and optimization](#3-product-feed-design-and-optimization)
- [4. Product-title optimization](#4-product-title-optimization)
- [5. Product image requirements and best practices](#5-product-image-requirements-and-best-practices)
- [6. Campaign structure](#6-campaign-structure)
- [7. Shopping-specific bidding](#7-shopping-specific-bidding)
- [8. Product groups and negative keywords](#8-product-groups-and-negative-keywords)
- [9. Policies and review](#9-policies-and-review)
- [10. Measurement and evaluation](#10-measurement-and-evaluation)
- [11. Operating cadence and checklists](#11-operating-cadence-and-checklists)
- [12. Standard Shopping vs Performance Max](#12-standard-shopping-vs-performance-max)
- [13. Free Listings](#13-free-listings)
- [14. Common failure patterns and mitigations](#14-common-failure-patterns-and-mitigations)

---

## Practice-first operating principles

Shopping performance is mostly feed, price, product-market fit, landing-page purchase friction, and margin-aware bidding. Campaign settings matter, but the feed is the targeting and creative layer.

### What actually moves Shopping performance

- **Product titles are usually the first feed lever.** Front-load the terms buyers would search: category, key attribute, brand/model, size/color/material where relevant. Use brand-first only when brand is the search intent.
- **Feed health is not just disapprovals.** Subtle GTIN errors, stale price/availability, weak product_type, poor images, or landing-page mismatches can suppress impressions without obvious account alarms.
- **Custom labels should support decisions.** Margin tier, inventory/stock status, hero/long-tail, seasonality, and promotion status are useful when they drive budget, bidding, or P-MAX listing-group choices.
- **Margin matters more than revenue ROAS.** Revenue-only tROAS can overinvest in low-margin products. Where possible, pass profit-aware values or segment by margin.
- **Supplemental feeds are a fast operating tool.** Use them to test title fixes, custom labels, and product_type changes quickly, then promote proven patterns upstream.
- **Standard Shopping still has a role.** It can be useful for diagnostics, long-tail SKU protection, inventory-heavy/asset-poor catalogs, or cases where P-MAX hides too much.
- **Free listings are worth maintaining but not forecasting around.** Treat them as incremental visibility and remarketing-pool input, not the core growth engine.

### How to diagnose Shopping issues

| Symptom | First checks | Likely action |
|---|---|---|
| Low impressions | Disapprovals, GTIN/category/title quality, budget/targets | Fix feed, improve titles, relax target, broaden eligible products |
| Low CTR | Title relevance, image, price competitiveness, promotions/reviews | Rewrite titles, improve images, add promos, review pricing |
| Low CVR | Landing page, shipping/returns, price consistency, checkout friction | Fix LP, trust signals, shipping clarity, checkout |
| Low ROAS | Margin mix, product winners/losers, values, inventory | Segment by margin, isolate heroes/long-tail, use profit-aware values |
| Long-tail never shows | Product grouping, P-MAX bias toward winners | Isolate long-tail SKUs with looser target if demand exists |

### Common practice mistakes

- Trying to solve feed or pricing problems by changing campaign settings.
- Using one ROAS target for products with very different margins.
- Breaking product IDs during feed rebuilds, which loses continuity.
- Ignoring Merchant Center diagnostics and served-rate by SKU.

---

## Glossary

Abbreviations used in this guide.

| Abbreviation | Full term | Definition |
|---|---|---|
| GMC | Google Merchant Center | The platform for sending and managing product data to Google |
| PLA | Product Listing Ads | Shopping ads showing product image, price, and store name |
| GTIN | Global Trade Item Number | Universal product identifier (UPC / EAN / JAN, etc.) |
| MPN | Manufacturer Part Number | Manufacturer's part number |
| SKU | Stock Keeping Unit | Inventory-tracking unit |
| ROAS | Return on Ad Spend | Total CV value ÷ ad spend |
| CPA | Cost Per Acquisition | Ad spend per CV |
| CTR | Click Through Rate | Click rate (clicks ÷ impressions) |
| CPC | Cost Per Click | Cost per click |
| CVR | Conversion Rate | CV ÷ clicks |
| PMax | Performance Max | Campaign type that auto-distributes across all Google surfaces |
| RLSA | Remarketing Lists for Search Ads | Bid adjustment using remarketing lists (applied as "Audience (observation)" in Shopping) |

---

## 2. Merchant Center setup

### 2-1. Initial-setup checklist

| # | Item | Description |
|---|---|---|
| 1 | Create the account | Create on merchants.google.com, linked to a Google account |
| 2 | Business info | Enter company name, address, and phone accurately |
| 3 | Website registration | Register the site URL and verify ownership (HTML tag, Google Analytics, Google Tag Manager, etc.) |
| 4 | Shipping settings | Configure shipping methods, costs, and lead time. Match the feed's `shipping` attribute |
| 5 | Return policy | Return terms and a return URL (becoming required in more countries) |
| 6 | Google Ads link | Link to the Google Ads account |
| 7 | Program enrollment | Enable "Shopping ads" and "Free listings" |

### 2-2. Major changes in Merchant Center Next (new UI)

Updates rolling out in 2025–2026:

- **Product Studio**: AI image editing for products (background removal, image animation, resolution upscaling)
- **AI insights**: Automated analysis of product performance with improvement suggestions
- **Promotion targeting**: Promotions can now be set with conditions like new customers only, by region, etc.
- **Creative Content**: Auto-link videos from social and YouTube as Google Ads assets
- **Product ID separation (March 2026 onward)**: When online and in-store versions have different attributes (price, inventory, etc.), separate IDs are required ([official changelog](https://support.google.com/merchants/announcements/6192467))
- **Merchant API v1**: Now formally released as the successor to Content API for Shopping (v1beta sunsets February 2026) ([API updates](https://developers.google.com/merchant/api/latest-updates))

> Merchant Center features, scope, and deadlines can shift. Verify in the official help center before implementation.

---

## 3. Product feed: design and optimization

The product feed is the **foundation of Shopping ad quality.** Feed quality directly impacts CTR, CVR, and CPC.

### 3-1. Required attributes

Attributes that must be set on every product.

| Attribute | Description | Notes |
|---|---|---|
| `id` | Unique product identifier | Use SKU; immutable |
| `title` | Product title | Up to 150 chars. Details in Section 4 |
| `description` | Product description | Up to 5,000 chars. Cover features, materials, and use cases |
| `link` | Product detail page URL | Must match the landing page exactly |
| `image_link` | Main product image URL | Details in Section 5 |
| `availability` | Inventory status | One of `in_stock` / `out_of_stock` / `preorder` |
| `price` | Price | With currency code (e.g. `2980 USD`). Must match the LP price exactly |
| `condition` | Product condition | `new` / `refurbished` / `used` |

### 3-2. Conditionally-required attributes

Required depending on category or situation.

| Attribute | When required | Description |
|---|---|---|
| `brand` | New products | Brand name (especially important for products registered with GTIN) |
| `gtin` | When MPN is unavailable | UPC / EAN / JAN. Affects ad-display priority |
| `mpn` | When GTIN is unavailable | Manufacturer's part number |
| `google_product_category` | Recommended for all products | Google's product-category taxonomy |
| `product_type` | Recommended | Your own product taxonomy |
| `age_group` | Apparel | `newborn` / `infant` / `toddler` / `kids` / `adult` |
| `color` | Apparel | Product color |
| `gender` | Apparel | `male` / `female` / `unisex` |
| `size` | Apparel | Size designation |
| `item_group_id` | Variant products | Group ID for color / size variants |
| `shipping` | Shipping info | Can be set in bulk via GMC settings |

### 3-3. Custom labels (custom_label_0–4)

Up to 5 custom labels. **The most important tool for campaign structure, bidding, and budget allocation.**

| Label | Use case | Sample values |
|---|---|---|
| `custom_label_0` | Margin | `high_margin` / `mid_margin` / `low_margin` |
| `custom_label_1` | Seasonality | `spring` / `summer` / `autumn` / `winter` / `evergreen` |
| `custom_label_2` | Sales performance | `bestseller` / `new_arrival` / `clearance` |
| `custom_label_3` | Price tier | `under_30` / `30_to_100` / `over_100` |
| `custom_label_4` | Promotion | `sale` / `bundle` / `regular` |

**Why this matters:**
- Margin labels enable **profit-aware bid control** (reflects actual gross profit, not just ROAS).
- Seasonality labels let you automate budget pumps before peak season and pull-back after.
- Sales-performance labels concentrate budget on bestsellers.

### 3-4. Description best practices

| Rule | Description |
|---|---|
| Important info in the first 160–500 chars | Handle truncated displays. Lead with brand, product type, and key features |
| Match the LP wording | Don't use different wording in feed vs LP |
| State features and benefits together | Materials, sizes, use cases, the problem solved |
| No promotional copy | Don't put "Free shipping" or "On sale now" in the description |
| No keyword stuffing | Unnatural keyword cramming is a policy violation |

### 3-5. Feed updating and uploads

| Method | Characteristics | Recommended for |
|---|---|---|
| URL fetch (auto) | Google fetches periodically from a URL | Large catalogs with frequent updates |
| File upload | Manually upload XML / CSV / TSV | Small catalogs with infrequent updates |
| FTP / SFTP | Auto-sent via server | When updates are needed multiple times per day |
| Content API / Merchant API | Programmatic submission | When real-time updates are needed |

**Update-frequency rules:**
- **At least every 30 days**: feeds must be re-submitted (otherwise data expires and is invalidated). Behavior differs for products registered directly in Merchant Center or when Google's automatic item updates are enabled.
- **Daily updates recommended.** Price / inventory mismatch is the leading cause of disapprovals — frequent updates are the most reliable defense.
- For scheduled fetches, the minimum interval is **30 minutes**.

### 3-6. Supplemental feeds

Add or override data without changing the main feed.

| Use | Description |
|---|---|
| Fix disapprovals | Patch attribute values without touching the main feed |
| Add custom labels | Add labels driven by performance data |
| Add seasonal attributes | Bulk-overwrite season-specific attributes |
| Test titles / descriptions | Set alternative titles for A/B testing |

---

## 4. Product-title optimization

Product title is **the single most important optimization point for Shopping ads.** It's Google's primary signal for matching queries to products and the deciding factor in user clicks.

### 4-1. Basic rules

| Rule | Description |
|---|---|
| Up to 150 chars | But the visible portion truncates at ~70 chars. **Lead with the most important info in the first 70 chars** |
| Match the LP product name | Different product names in feed vs LP create disapproval risk |
| No promotional copy | "Free shipping," "50% OFF," "Sale," etc. don't belong in the title |
| No ALL CAPS | Don't write entire titles in uppercase |
| Include specific attributes | Brand, color, size, material, etc. improve search-match accuracy |

### 4-2. Title structures by category

The optimal title structure depends on category.

| Category | Recommended structure | Example |
|---|---|---|
| **Apparel** | Brand + product type + gender + material/feature + color + size | Nike Running Jacket Women ClimaCool Blue M |
| **Electronics** | Brand + product name / model + spec + feature | Sony WH-1000XM5 Wireless Headphones Noise Cancelling Black |
| **Furniture / interior** | Product type + feature + material + size + color | L-shaped Sofa Modern Velvet 3-Seater Navy |
| **Food / beverage** | Brand + product name + flavor / variety + volume + count | Brand Name Green Tea 525 ml × 24 pack |
| **Beauty / cosmetics** | Brand + product name + type + benefit + volume | SK-II Facial Treatment Essence Toner Hydrating 230 ml |

### 4-3. Title-optimization tips

- **High brand awareness** → lead with the brand.
- **Low brand awareness** → lead with the product type (the searched-for generic noun).
- **Variants of the same product** → always reflect color / size differences in the title.
- **Google's structured title attribute (`structured_title`)** → an attribute supporting AI title optimization. Availability and scope shift; check the [official help](https://support.google.com/merchants/answer/6324415) for current state.

---

## 5. Product image requirements and best practices

### 5-1. Image-size requirements

| Item | General products | Apparel |
|---|---|---|
| Minimum size | 100 × 100 px | 250 × 250 px |
| Recommended size | **1,500 × 1,500 px or larger** | **1,500 × 1,500 px or larger** |
| Maximum size | 64 megapixels | 64 megapixels |
| Maximum file size | 16 MB | 16 MB |

### 5-2. Image rules

| Rule | Description |
|---|---|
| Product fills 75–90% of the image | Too much or too little whitespace are both rejected |
| White background recommended | Main image on white. Lifestyle imagery via `additional_image_link` |
| No added text, watermarks, or decoration | No post-overlaying watermarks, text, or decoration (disapproval risk). However, **logos and text printed on the product itself or its packaging** are typically fine |
| No promotional text | Text overlays like "SALE" or "Free shipping" not allowed |
| No borders or frames | Don't add frames around the image |
| No placeholder images | "No Image Available" type placeholders are disapproved |

### 5-3. Additional images (`additional_image_link`)

- Up to 10 images
- Use for lifestyle imagery, alternate angles, details, packaging, etc.
- Complements info that the main image can't show

### 5-4. Image best practices

- **Use high-resolution, sharp images** (blurry / noisy hurts perception).
- **Provide multiple angles** (front, side, back, in use).
- **Keep image URLs stable** (avoid timestamped URLs; URL changes force Google to re-crawl).
- **Use Product Studio** for AI editing (background removal, resolution lift) — free.

---

## 6. Campaign structure

### 6-1. Naming conventions

A consistent naming convention improves operational efficiency.

**Recommended format:**

```
[Geo] Shopping [Brand or Non-Brand] [Product category] [Year]
```

**Examples:**
- `US Shopping Non-Brand Furniture 2026`
- `US Shopping Brand Sofa 2026`
- `US Shopping Remarketing AllProducts 2026`

### 6-2. Campaign-split logic

| Split axis | Reason |
|---|---|
| Brand search vs non-brand search | Brand search has higher CVR; mixing hides the non-brand baseline |
| By margin | Concentrate budget on high-margin products; restrain low-margin ones |
| Bestseller vs the rest | Isolate proven products and bid them aggressively |
| Remarketing vs prospecting | Use Audience (observation) — bid up returning visitors, bid down new users |
| Seasonal vs evergreen | Easier to ramp budget seasonally |

**Brand / non-brand separation (Shopping-specific):**

Shopping ads don't accept keywords as input, so brand / non-brand separation works via **campaign priority + negative keywords**. It's not a hard split — it's "delivery steering."

```
[Non-Brand campaign] (priority: High)
  ├── Add your brand name as a negative keyword
  ├── → Queries without the brand name are preferred
  └── Bidding: non-brand has lower CVR — bid more conservatively

[Brand campaign] (priority: Low)
  ├── No negative keywords (catches brand-term queries here)
  ├── → Since Non-Brand excludes brand terms, brand searches flow here
  └── Bidding: brand search has higher CVR — bid up
```

**Notes:**
- The standard approach is to add brand-term negatives on the Non-Brand side (the reverse direction risks accidental exclusion).
- Perfect separation isn't possible. Check the search-terms report regularly for leakage.
- Use caution when excluding competitor brand names — legal and policy considerations apply.

### 6-3. Recommended campaign-structure template

For e-commerce sellers, a basic 3-campaign structure:

```
[Standard Shopping] Bestsellers
  ├── Product group: custom_label = bestseller
  ├── Bidding: Manual CPC (high) → migrate to Target ROAS
  ├── Budget allocation: 50% of total
  └── Priority: High

[Standard Shopping] General products
  ├── Product group: all products except bestsellers
  ├── Bidding: Manual CPC (standard) → migrate to Maximize Conversions
  ├── Budget allocation: 35% of total
  └── Priority: Medium

[Standard Shopping] Test / new products
  ├── Product group: custom_label = new_arrival
  ├── Bidding: Manual CPC (low)
  ├── Budget allocation: 15% of total
  └── Priority: Low
```

### 6-4. Budget guidelines

**Daily budget logic:**

Without enough daily clicks, AI learning and performance evaluation lack data. Aim for **at least 10 clicks per day**.

```
Estimated CPC × 10 (minimum-click target) = Minimum daily budget
```

Example: estimated CPC $0.30 → minimum daily budget ~$3/day.

> This formula is for "minimum data accumulation." For CV optimization, budget needs to be substantially higher.

**Budget allocation by scale:**

| Monthly budget | Recommended structure |
|---|---|
| Up to ~$2,000 | Single Standard Shopping campaign |
| ~$2,000–$7,000 | Bestseller + general (2 campaigns) |
| ~$7,000–$20,000 | 3-campaign structure + consider adding PMax |
| Above ~$20,000 | 3-campaign + PMax + brand-defense campaign |

---

## 7. Shopping-specific bidding

### 7-1. Setting Manual CPC

**Max-CPC formula:**

```
Max CPC = product price × gross margin × CVR
```

Example: product price $100, margin 40%, CVR 2%
→ Max CPC = $100 × 0.40 × 0.02 = **$0.80** (break-even)

**Start initial bids at 50–75% of break-even** and adjust based on performance.

### 7-2. Migrating from Manual to Smart Bidding

| Stage | Condition | Action |
|---|---|---|
| 1. Manual CPC start | — | Bid manually at the product-group level. Prioritize data accumulation |
| 2. Data accumulation | 30+ CVs | Identify bid-performance trends |
| 3. Test Smart Bidding | Stable CV history | Pre-test with Target ROAS or Target CPA via draft |
| 4. Migrate to Smart Bidding | Test results positive | Full migration. Set targets based on observed history |

**Important: don't set Target ROAS on a brand-new campaign.** With insufficient CV data, AI learning is unstable — delivery either drops sharply or scales inefficiently.

### 7-3. Bid-adjustment logic

**Margin-based bidding:**

| Margin | Bid posture | Example |
|---|---|---|
| High (60%+) | Aggressive | 75–100% of max CPC |
| Mid (30–59%) | Standard | 50–75% of max CPC |
| Low (<30%) | Conservative | 25–50% of max CPC |

**Audience (observation) bid adjustments:**

In Shopping, audiences can be added in "observation" mode and bid adjustments applied. Note: under Smart Bidding, bid adjustments are absorbed automatically as signals — manual adjustments aren't needed.

| Audience | Bid-adjustment guideline (under Manual CPC) |
|---|---|
| Cart abandoners | +50% |
| Product-page viewers | +25% |
| Site-wide visitors | +10% |

> Similar Audiences was sunset in August 2023. Use Smart Bidding signal optimization or Customer Match instead.

### 7-4. Campaign priority

In Standard Shopping, when **the same product is in multiple campaigns**, priority decides which campaign bids.

| Priority | Bid logic |
|---|---|
| **High** | Bids first; preferred over other priorities |
| **Medium** | Bids when high-priority campaigns are budget-capped, or for products not in High |
| **Low** | Bids when High and Medium are budget-capped. Default setting |

**At the same priority** → the higher bid wins.

---

## 8. Product groups and negative keywords

### 8-1. Product-group design

In Shopping, you don't bid by keyword — you bid via **product groups.**

**Available segmentation attributes:**

| Attribute | Description | Use |
|---|---|---|
| Category | Google's product taxonomy | Top-category → mid-category hierarchy |
| Brand | Brand name | Own brand vs resold brands |
| Product type | Your own taxonomy | Highly flexible classification |
| Custom labels | custom_label_0–4 | Margin / season / performance, etc. |
| Product ID | Individual SKU | Bid on bestseller products specifically |
| Condition | new / refurbished / used | Bid adjustment by condition |

**Recommended hierarchy:**

```
All products
├── Category: Furniture
│   ├── custom_label: bestseller → Bid: high
│   ├── custom_label: regular → Bid: mid
│   └── custom_label: clearance → Bid: low
├── Category: Electronics
│   ├── custom_label: bestseller → Bid: high
│   └── ...
└── Everything else → Bid: low (catch-all)
```

**Always set the bid on "Everything else."** Otherwise unclassified products spend on the default bid.

### 8-2. Negative keywords

Shopping ads can't control display via keywords, so **negative keywords are the only way to control search queries.**

**Negative keyword scopes:**

| Level | Scope |
|---|---|
| Campaign level | Applies to all product groups in the campaign |
| Ad group level | Applies to a specific ad group only |

**Match types:**

| Match type | Notation | Description |
|---|---|---|
| Broad | `keyword` | Default. Applies regardless of word order if the term is included |
| Phrase | `"keyword"` | Applies when the exact phrase is included in the query |
| Exact | `[keyword]` | Applies only on exact-match queries |

**Initial negative-keyword examples:**

| Category | Examples |
|---|---|
| No purchase intent | free, DIY, how-to, tutorial, repair, review, comparison |
| Competitors / others | (As applicable) competitor names / competitor brand names |
| Irrelevant products | Categories or types you don't carry |
| Used / unwanted | used, junk, "looking to sell" |

### 8-3. Using the search-terms report

- Review **weekly**.
- Add irrelevant or non-converting queries to negatives.
- Discover high-performing queries → consider folding them into product titles.

---

## 9. Policies and review

### 9-1. Prohibited products

Cannot be advertised in Shopping.

| Category | Examples |
|---|---|
| Counterfeits | Knockoffs of branded products |
| Dangerous products | Weapons, ammunition, explosives, fireworks, drugs, drug paraphernalia |
| Promotion of dishonest behavior | Hacking tools, academic dishonesty services |
| Inappropriate content | Hate or violence-promoting content |

### 9-2. Restricted products

Allowed with additional conditions or constraints.

| Category | Restriction |
|---|---|
| Alcohol | Per local law. No targeting minors |
| Adult products | Adult-product flag required. Some countries: not allowed |
| Pharmaceuticals / health | Per local regulation. Prescription drugs generally not allowed |
| HFSS food / beverage | High-fat / sugar / salt food can't be targeted to minors |

### 9-3. Common disapproval causes and fixes

| Reason | Cause | Fix |
|---|---|---|
| Price mismatch | Price differs in feed vs LP | Increase feed update frequency. Implement structured data (schema.org) |
| Availability mismatch | `in_stock` in feed but out of stock on LP | Implement automated inventory-linked feed updates |
| Image issues | Size too small, text overlays, placeholders | Replace images per Section 5 |
| Bad GTIN / MPN | Identifier wrong or missing | Validate with GTIN validator. Declare GTIN-exempt for custom items |
| 404 LP | Broken link | Implement URL monitoring; check links before feed submission |
| Shipping info issues | Shipping cost / lead time not configured | Fill GMC shipping settings completely |
| Policy-violating content | Prohibited / restricted-category items | Remove offending products from the feed |

### 9-4. Review escalation

If you disagree with a disapproval:
1. Check the disapproval reason in GMC's "Diagnostics" tab.
2. Fix the issue and re-submit the feed.
3. Wait for re-review (typically 3–5 business days).
4. If you have a legitimate case, request review from the "Request review" option.

**Avoiding account suspension:** Repeated disapprovals can lead to account suspension. Address errors and warnings early — don't ignore them.

---

## 10. Measurement and evaluation

### 10-1. Conversion setup

For Shopping (e-commerce), tracking CV value (revenue) accurately is especially important.

| Setting | Recommendation |
|---|---|
| Primary CV | Purchase complete |
| CV value | **Send the dynamic actual revenue value** per transaction |
| Attribution | Data-Driven Attribution (DDA) |
| CV measurement window | 30 days post-click (default). Consider 60–90 days for high-ticket items |

### 10-2. Key KPIs

| Metric | Definition | Guideline |
|---|---|---|
| ROAS | CV value ÷ ad spend | Break-even ROAS = 1 ÷ margin (30% margin → 333%; 40% → 250%; 50% → 200%). Target ROAS sits above break-even |
| CTR | Clicks ÷ impressions | Industry-dependent average; use as an improvement benchmark |
| CVR | CV ÷ clicks | Heavily depends on LP quality and price competitiveness |
| CPC | Spend ÷ clicks | Varies by category and competition |
| Impression share | Impressions ÷ eligible impressions | Indicates budget / bid sufficiency |

### 10-3. Profit-based evaluation

Don't evaluate on ROAS alone — **evaluate gross-profit profitability.**

```
Ad profit = (revenue × margin) − ad spend
```

Example:
- Revenue $10,000, margin 40%, ad spend $2,500
- Ad profit = ($10,000 × 0.4) − $2,500 = **$1,500**
- ROAS = 400% (looks fine, but at lower margins, 400% ROAS can still lose money)

### 10-4. Common measurement traps

| Trap | Problem | Fix |
|---|---|---|
| Google Ads CV doesn't match GA4 CV | Different attribution, measurement window, counting | **Treat Google Ads purchase CV as canonical for bid optimization;** use GA4 for user-behavior analysis |
| Confusing primary / secondary CV | Primary drives bid optimization. Putting unwanted CVs in primary breaks learning | **Only purchase complete is primary.** Micro-CVs (cart adds, etc.) go in secondary |
| Enhanced Conversions not enabled | Cookie restrictions are increasing CV under-counting | Hash and send first-party data (email, etc.) via Enhanced Conversions |
| Inconsistent reporting metrics | Revenue ROAS and gross-profit ROAS lead to different decisions | Standardize on three metrics: **Revenue ROAS** (from Google Ads UI), **Gross-profit ROAS** (gross profit ÷ ad spend, calculated separately), **Ad profit** (gross profit − ad spend) |

### 10-5. Product-level analysis

Check at the product level periodically:

| Bucket | Condition | Action |
|---|---|---|
| Winners | ROAS at or above target, stable CVs | Bid up, increase budget |
| Developing | High impressions, few CVs | Optimize title / image / LP |
| Money pit | High spend, no CVs | Bid down or exclude |
| No exposure | Near-zero impressions | Bid up, improve title |

---

## 11. Operating cadence and checklists

### 11-1. Daily checks

| Item | Action |
|---|---|
| Budget pacing | Confirm budget isn't exhausted intra-day. If too fast, increase budget or lower bids |
| Product disapprovals | Check GMC "Diagnostics" tab. Address new disapprovals same day |
| Outlier alerts | Watch for sudden CPC spikes, CTR drops, CV drops |

### 11-2. Weekly checks

| Item | Action |
|---|---|
| Search-terms report | Add unwanted queries to negatives. Discover effective ones |
| Product performance | Review per-product ROAS / CV / CPC. Sort winners vs losers |
| Bid adjustments | For Manual CPC, revisit bids by product group |
| Competitor pricing | Spot-check competitor pricing on key products in search results |
| Impression share | Audit lost share due to budget / bid |

### 11-3. Monthly checks

| Item | Action |
|---|---|
| Feed quality score | Check overall health in GMC "Diagnostics" |
| Refresh custom labels | Re-assign labels based on performance data |
| Improve product titles | Revise titles for low-CTR products |
| Optimize budget allocation | Reallocate budget across campaigns based on results |
| Revisit bidding strategy | Decide whether to migrate Manual → Smart; tune target values |
| Add new products | Confirm new products are included in the feed |
| Seasonal prep | Prepare for next month's seasonal events (labels, budget, bids) |

### 11-4. Quarterly checks

| Item | Action |
|---|---|
| Re-examine campaign structure | Identify areas for split / consolidation |
| Test bid strategies | Use experiments to validate alternative bid strategies |
| Decide on PMax adoption / scale | Consider adding PMax based on Standard Shopping results |
| Competitive analysis | Audit competitor Shopping ad activity and price strategy |
| Feed-wide audit | Remove unused products; check attribute completeness |

---

## 12. Standard Shopping vs Performance Max

### 12-1. Comparison table

| Item | Standard Shopping | Performance Max |
|---|---|---|
| Surfaces | Search results, Shopping tab, image search | Search, Shopping, Display, YouTube, Gmail, Discover, Maps |
| Keyword control | Negative keywords supported | Campaign-level negatives supported (since January 2025; cap of 10,000). Shared negative-keyword lists supported (since August 2025) |
| Search-terms report | Detailed search-terms report | "Search-term insights" (overview level) |
| Bid control | Manual CPC supported | Smart Bidding only |
| Product-group control | Detailed product-group settings | Asset groups + listing groups |
| Required assets | Product feed only | Product feed + text + images + video |
| Recommended CV count | No firm minimum | 30+ per month recommended |
| Transparency | High | Lower than Standard Shopping |

### 12-2. Priority logic change (2024)

**Before:** PMax automatically took priority over Standard Shopping for the same product.

**Now:** Decided by **Ad Rank.** When the same product exists in both, the campaign with the higher Ad Rank at auction time wins. ([Official help](https://support.google.com/google-ads/answer/13825980))

This change restored Standard Shopping's competitiveness and made hybrid (running both) more effective.

> The exact application timing of this change can vary by account. Verify behavior in your own account via the search-terms report.

### 12-3. When to use which

| Situation | Recommendation |
|---|---|
| Early launch, low CV data | Standard Shopping (data accumulation, learning) |
| Want detailed search-term analysis | Standard Shopping |
| Need fine-grained manual bid control | Standard Shopping |
| Want maximum reach across all surfaces | Performance Max |
| Sufficient CV data (30+/month) | Consider adding Performance Max |
| Have text / image / video assets ready | Performance Max |

### 12-4. PMax control levers

PMax is automation-heavy, but you still have the following levers.

**How to split asset groups:**

| Split axis | Examples | Benefit |
|---|---|---|
| By product category | Furniture / electronics / apparel | Per-category text and image assets |
| By margin | High vs low margin | Different target ROAS by margin |
| New-customer acquisition vs remarketing | New-customer goal ON / OFF | Separate audiences with different acquisition costs |

**Listing-group design:**

Same as Standard Shopping product groups — narrow products via listing groups in PMax. Split by custom label or category and serve different product sets per asset group.

**Improving when you can't see search terms:**

PMax doesn't provide a detailed search-terms report. Use these signals instead:
- **Search-term insights**: per-category search themes and impression count
- **Per-product performance**: judge winners / losers by per-product ROAS / CV / spend
- **Per-asset performance**: judge swaps based on Best / Good / Low ratings on text / image / video

### 12-5. Hybrid operation

**Recommended approach:**

1. **Phase 1 (weeks 1–4):** Start with Standard Shopping only. Accumulate baseline data.
2. **Phase 2 (month 2+):** Once Standard Shopping is stable and profitable, add PMax.
3. **Ongoing:** Optimize known-winning products in Standard Shopping; expand new-customer acquisition in PMax.

- Standard Shopping = **exploitation of known winning patterns**
- Performance Max = **new discovery and reach expansion**

---

## 13. Free Listings

### 13-1. Overview

Started in 2020 — a free listing slot. Just submitting the product feed to GMC can surface products on Google's surfaces without paid ads.

**Surfaces:**
- Google Shopping tab
- Google Search (some)
- Google Image Search
- Google Lens

### 13-2. Difference from paid ads

| Item | Paid Shopping ads | Free Listings |
|---|---|---|
| Cost | CPC (per click) | Free |
| Position | Top of the Shopping carousel | Below the Shopping tab paid ads |
| Control | Bid- and budget-controllable | Algorithm-driven |
| Traffic scale | Large (carousel captures most clicks) | Limited compared to paid |

### 13-3. Merchant Center capabilities to leverage

Additional GMC features that can boost Shopping ads.

**Merchant Promotions:**

Display "special sale" / "free shipping" promotion badges on products to lift CTR.

| Setting | Description |
|---|---|
| Promotion feed | Register promotion info in GMC. Tie to products via `promotion_id` |
| Scope | All products or specific products (map `promotion_id` to feed) |
| Conditions | Amount discount, percentage discount, free shipping, BOGO, etc. |
| Targeting | Conditions like new-customer-only or by region |

**Product ratings:**

Display star ratings on products — a click-decision booster.

- Acquired via Google Customer Reviews or third-party review-services
- Minimum requirement: a minimum number of reviews per product (varies by country)
- Submit a review feed (XML) to GMC

**Automatic Item Updates:**

- Google crawls your site and auto-corrects price / availability differences vs feed
- Reduces disapproval risk when enabled, but unintended corrections are possible
- **Recommended:** enable, but also keep the feed itself updated daily (auto-update is supplementary)

**Price / inventory consistency monitoring:**

- Implement structured data (schema.org `Product` markup: `price`, `availability`) on the LP — improves Google's auto-validation accuracy
- Monitor 404s and price mismatches via external tools or your own scripts; effective at preventing disapprovals

### 13-4. Optimizing Free Listings

Even without paid ads, raising feed quality increases free-listing visibility.

- Fill in every recommended attribute (GTIN, google_product_category, color, size, etc.)
- Optimize titles and descriptions (Section 4)
- Use high-quality images (Section 5)
- Increase feed update frequency (daily recommended)
- Connect product reviews / ratings

---

## 14. Common failure patterns and mitigations

| # | Failure | Cause | Mitigation |
|---|---|---|---|
| 1 | Setting Target ROAS on a brand-new campaign | CV data insufficient; AI can't learn | Start Manual CPC; migrate after 30+ CVs |
| 2 | Short, generic product titles | Low search-match accuracy; missed impressions | Follow category title structures with all relevant attributes |
| 3 | Feed updates monthly or less | Price / inventory mismatches drive disapprovals | Automate daily feed updates |
| 4 | No negative keywords | Spend leaks to irrelevant queries | Initial negatives + weekly search-terms review |
| 5 | Letting "Everything else" run on default bid | Unclassified low-performers waste spend | Set a low bid or exclude from feed |
| 6 | Not using custom labels | Can't bid on margin / seasonality | At minimum, label by margin and sales performance |
| 7 | All products in one campaign | High- and low-margin products share a single bid | Split campaigns by margin / performance |
| 8 | Low-quality, small images | CTR drops; competitiveness suffers | Provide 1,500×1,500 px or larger high-quality images |
| 9 | LP isn't a product page | Sending users to category or homepage hurts retention | Set feed `link` to the individual product-page URL |
| 10 | Choosing only Standard Shopping or only PMax | Miss the strengths of the other | Hybrid: exploit + explore |
| 11 | Not using Promotions | Missed CTR uplift (no badge shown) | Use GMC Promotions (lifts CTR) |
| 12 | "Set and forget" | Can't keep up with market and competitor shifts; performance decays | Daily / weekly / monthly check cadence |
