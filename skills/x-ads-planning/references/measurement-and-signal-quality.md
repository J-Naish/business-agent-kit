# Measurement and Signal Quality

Use this reference before finalizing X Ads objectives, bidding, and reporting.

## Measurement Stack

| Use case | Required / preferred setup |
|---|---|
| Website traffic | UTMs, landing-page analytics, click quality, bounce/CVR checks |
| Website conversions / Sales | X Pixel and/or Conversion API / Conversions API, Events Manager, event definitions, deduplication where relevant |
| Lead generation | Form events, CRM stages, qualified lead feedback, offline reconciliation |
| E-commerce / DPA | X Shopping Manager, product catalog, Product IDs, Page View, Content View, Add to Cart, Purchase, value |
| App installs / re-engagement | Approved MMP: Adjust, AppsFlyer, Branch, Kochava, or Singular |
| Brand / premium | Reach, frequency, video view quality, lift study or proxy demand metrics |

X documentation uses both **Conversion API** and **Conversions API** in different surfaces. Treat them as the same server-side conversion-sharing concept, but preserve the current UI label when writing implementation instructions.

For conversion campaigns at scale, Pixel-only measurement is fragile. Prefer Pixel + server-side Conversion API / Conversions API where feasible, then reconcile to business data.

## Event Design

Prefer the deepest reliable event with enough volume:

| Business | Primary event | Temporary fallback |
|---|---|---|
| E-commerce | Purchase with value | Add to Cart or Content View only if purchase volume is too low |
| Lead gen | Qualified lead / CRM stage | Form submit if quality feedback is not ready |
| SaaS | Qualified signup, trial activation, demo request | Signup or pricing-page visit |
| App | In-app event or retained value | Install |
| Event | Registration, ticket purchase, attendance | Landing-page view or reminder opt-in |

Do not optimize permanently to weak micro-conversions if they do not correlate with business value.

## Attribution and Incrementality

- Separate X-reported conversions from business source-of-truth revenue, CRM, or app analytics.
- Keep post-engagement and post-view attribution windows visible in reporting.
- Use click-only or view-through-discounted reporting for internal direct-response reads when view-through credit is not calibrated.
- For app campaigns, align X attribution windows with the MMP dashboard to reduce discrepancies.
- Use holdouts, geo tests, pre/post analysis, lift studies, or audience exclusions when volume and budget allow.
- Report retargeting separately from prospecting when possible.
- Use UTMs consistently. For mature accounts, triangulate X Ads Manager, GA4/warehouse, CRM/orders, post-purchase survey, MMP, and MMM/geo-lift where available.

## App Measurement

X app-install bidding requires one of its approved MMPs configured to the X Ads account. X also supports SKAdNetwork and has an Advanced Mobile Measurement program for eligible advertisers.

MMP docs may describe X as an Advanced self-attributing network. Treat this as mobile attribution integration context, not as a replacement for reconciling against app analytics and LTV.

## Catalog and DPA Signal Quality

Before recommending Dynamic Product Ads, verify:

- X Pixel or Conversion API / Conversions API is implemented, unless the campaign will be limited to link-click optimization.
- Product events include product identifiers that match the catalog.
- DPA events include required product/event parameters such as product IDs, value, currency, and purchase/content actions where applicable.
- X Shopping Manager catalog is uploaded, approved, and regularly updated.
- Product feed includes accurate titles, prices, availability, images, URLs, categories, and sale prices where relevant.
- Product sets are organized around meaningful categories, margins, inventory, or campaign goals.

For server-side events, confirm the implementation captures `twclid` where available, hashes user identifiers correctly, and uses a stable `conversion_id` for deduplication when Pixel and CAPI both send the same event.

## Measurement Gaps vs Meta

Do not assume Meta-specific tooling exists on X:

- No Meta-style CAPI Gateway equivalent should be assumed.
- No Aggregated Event Measurement equivalent should be assumed.
- No Event Match Quality score equivalent should be assumed.

Plan more conservatively when signal quality is weak.
