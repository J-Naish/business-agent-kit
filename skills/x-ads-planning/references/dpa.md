# Dynamic Product Ads

Dynamic Product Ads help advertisers deliver relevant products from a catalog to users based on behavior and predicted interest.

Spec source: X Dynamic Product Ads setup docs (https://business.x.com/en/help/campaign-setup/create-a-dynamic-product-ads-campaign) and Creative Ad Specifications (https://business.x.com/en/help/campaign-setup/creative-ad-specifications). Last verified: 2026-04.

## Types

| Type | Use |
|---|---|
| DPA Retargeting | Show products a user viewed, added to cart, or otherwise engaged with but did not purchase |
| DPA Prospecting | Show catalog products to new users who are predicted to be interested |

## Requirements

- Product catalog uploaded and managed in **X Shopping Manager**.
- X Pixel and/or Conversion API / Conversions API events configured. Without Pixel/CAPI, DPA can be limited to link-click optimization.
- Key events such as Page View, Content View, Add to Cart, and Purchase where relevant.
- `contents` parameters or product identifiers that match catalog products.
- Product feed with accurate IDs, titles, prices, availability, images, URLs, and categories.
- Feed file and sync process that can keep product data current. X Shopping Manager supports large catalogs; current docs cite up to 1M products or an 8GB feed file.
- Product sets created with filters for campaign-specific merchandising.
- UTMs and product-level reporting where possible.

## Campaign Design

| Campaign | Audience | Role |
|---|---|---|
| Retargeting | Recent viewers, cart abandoners, product engagers | Recover high-intent users |
| Prospecting | Broad or modeled audiences | Find new customers using catalog relevance |
| Cross-sell / upsell | Existing customers | Promote complementary products |

Keep retargeting and prospecting separate when budget, reporting, or audience intent differs.

For retargeting campaigns, create Catalog Activity Audiences during DPA setup. Use relevant List Custom Audiences where they improve audience size or quality.

## Creative and Copy

Catalog information does much of the work. Use copy to add context:

- Benefit or product category framing.
- Reminder for cart/view abandonment.
- New arrival or bestseller framing.
- Sale or seasonal messaging when relevant.

Avoid overusing discount language if it weakens brand positioning or trains low-margin demand.

## Measurement

| KPI | Use |
|---|---|
| CPA / Cost per Purchase | Acquisition efficiency |
| ROAS | Revenue efficiency |
| Contribution margin | Better when product margins vary |
| New vs returning customer | Incrementality and acquisition quality |
| Product-level performance | Feed and merchandising decisions |

## Common Mistakes

- Bad product IDs that break event-to-catalog matching.
- Out-of-stock products in the feed.
- Weak product images.
- Retargeting windows that are too broad for the purchase cycle.
- Reporting only revenue ROAS without margin or incrementality context.

## Diagnosis

| Symptom | Likely cause | Response |
|---|---|---|
| Few products serve | Product set too narrow or feed errors | Check X Shopping Manager approval, filters, availability, and image URLs |
| Retargeting underdelivers | Catalog Activity Audience too small | Add relevant List Custom Audiences where appropriate |
| ROAS looks good but profit weak | Low-margin products dominate | Segment product sets by margin, inventory, or category |
| Product mismatch | Event `contents` values do not match catalog IDs | Audit Pixel/CAPI parameters against catalog IDs |

## Operating Cadence

- Daily: check feed sync, rejected products, and event health.
- Weekly: review product-level spend, revenue, margin, and stock status.
- Monthly: refresh product sets around margin, seasonality, new arrivals, and inventory.
