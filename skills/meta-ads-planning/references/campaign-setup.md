# Meta Ads Setup and Configuration

## Contents

- [1. Account Structure](#1-account-structure)
- [2. Initial Setup](#2-initial-setup)
- [3. Targeting Design](#3-targeting-design)
- [4. Bid Strategies](#4-bid-strategies)
- [5. Advantage+ Sales Campaigns](#5-advantage-sales-campaigns)
- [6. Ad Setup](#6-ad-setup)

---

## 1. Account Structure

Meta ads use a three-layer structure.

```
Ad account
├── Campaign        <- objective and budget strategy
│   ├── Ad set      <- audience, placements, schedule, optimization event
│   │   ├── Ad      <- creative, copy, destination, CTA
│   │   ├── Ad
│   │   └── Ad
│   ├── Ad set
│   │   └── ...
│   └── ...
└── Campaign
    └── ...
```

---

## 2. Initial Setup

### Step 1: Business Setup

1. Create or confirm the business portfolio in Meta Business Suite / Business Manager.
2. Connect the Facebook Page and Instagram account.
3. Create or confirm the ad account, including time zone, currency, and business purpose.

### Step 2: Measurement Setup

1. **Install Meta Pixel**
   - Implement directly, through Google Tag Manager, through a partner integration, or through the platform's native integration.
   - Core standard events include `PageView`, `ViewContent`, `AddToCart`, `Purchase`, and `Lead`.

2. **Implement Conversions API**
   - Use alongside Meta Pixel, especially when spend or measurement stakes are meaningful.
   - Helps recover signal lost to browser restrictions, ad blockers, and privacy changes.
   - Common implementation paths: partner integration, Conversions API Gateway, server-side GTM, or direct API implementation.

3. **Configure event deduplication**
   - When the same event is sent by Pixel and Conversions API, use the same `event_id`.
   - Without deduplication, conversions may be double-counted or discarded.

4. **Improve Event Match Quality**
   - Send hashed customer information and browser/server parameters where policy and consent allow: email, phone, IP address, user agent, click IDs, and other matching parameters.
   - Stronger matching can improve attribution and optimization quality, but do not treat a specific score as guaranteed lift.

### Step 3: Domain Verification and Event Governance

1. Verify the domain in Business settings.
2. Check Events Manager diagnostics, event match quality, deduplication, value/currency consistency, and event latency.
3. Configure Aggregated Event Measurement or related iOS measurement controls only where the current account UI requires it. Meta changes this area over time, so verify current Events Manager behavior before giving exact setup instructions.

---

## 3. Targeting Design

### Audience Types

#### Broad Audience

- Use only geography, age, language, and gender constraints unless there is a clear reason to narrow further.
- Let Meta's delivery system find likely converters.
- This is the default modern starting point for many prospecting campaigns.

Recommended size: large enough to support delivery and learning. Avoid narrow segments that starve the ad set.

#### Custom Audience

Retarget people with existing touchpoints.

| Source | Description | Typical retention |
|---|---|---|
| Website visitors | Visitors measured by Meta Pixel / Conversions API | 7-180 days |
| Engagement | People who engaged with ads, Page, or Instagram account | 30-90 days |
| Video viewers | People who watched a defined share of a video | 30-90 days |
| Customer list | CRM or customer data uploaded to Meta | Based on business need |
| App activity | App users or event-based app audiences | 30-90 days |
| Instant Form | People who opened or submitted an Instant Form | 30-90 days |

Use audience sizes that are large enough to deliver. Very small retargeting pools can produce high frequency and unstable results.

#### Lookalike Audience

- Finds new people who resemble a Custom Audience.
- Similarity ranges from 1% most similar to broader percentages for reach.
- Use high-quality seeds: purchasers, high-LTV customers, qualified leads, retained app users, or high-value subscribers.
- Avoid diluted seeds such as all visitors when quality varies heavily.
- Treat Lookalikes as a signal or test, not the default targeting engine. Broad/Advantage+ delivery can outperform Lookalikes when conversion signal and creative quality are strong.

#### Advantage+ Audience

- Lets Meta expand beyond audience suggestions when it predicts better performance.
- Uses conversion data, engagement, and delivery feedback to find likely responders.
- Often works best with broad constraints and strong creative.
- Audience suggestions are not the same as hard filters. Use audience controls and custom audience exclusions when the business needs real limits.

### Targeting Principles

Modern Meta targeting has moved from manually defining the perfect audience toward giving Meta strong signals and enough room to optimize.

- First-party data is the foundation: customer lists, Pixel data, app events, and conversion history.
- Avoid over-narrowing unless compliance, geography, language, or business logic requires it.
- Creative quality helps targeting because Meta infers audience fit from the creative itself.
- Detailed targeting exclusions have been removed from new ad sets. Do not design a strategy that depends on excluding interests/behaviors; use Custom Audience exclusions, account-level audience controls, or other current controls where available.
- Sensitive categories, special ad categories, teen targeting, health/financial audiences, and regional policy constraints can limit targeting. Verify current policy and UI behavior for these cases.

---

## 4. Bid Strategies

### Bid Strategy Types

| Strategy | Summary | Pros | Cons | Use when |
|---|---|---|---|---|
| **Lowest cost / Highest volume** | Meta tries to get the most results for the budget | Simple, scalable, best for learning | CPA is not tightly controlled | Default for launches and most unstable accounts |
| **Cost per result goal / Cost cap** | Meta aims to keep average cost around the goal | Better CPA discipline | May underspend or stay unstable | Clear CPA target and stable volume |
| **Bid cap** | Sets a maximum bid per auction | Strict auction-level control | Can severely restrict delivery | Advanced use with known economics |
| **ROAS goal** | Optimizes toward a target return on ad spend | Revenue/value-aware | Needs reliable value data, volume, and value variance | E-commerce or variable-value purchases |

### Selection Path

```
New launch or unstable account -> Lowest cost / Highest volume for data collection
    ↓
Stable conversion volume and defensible economics -> Cost per result goal / Cost cap
    ↓
Strict margin or value control -> Bid cap or ROAS goal
```

### Budget Optimization

| Setting | Summary | Best for |
|---|---|---|
| **Campaign budget** | Budget set at campaign level; Meta distributes across ad sets | Prospecting and consolidated structures |
| **Ad set budget** | Budget set at ad set level | Retargeting, controlled tests, strict allocation |

Campaign budget optimization is often preferred for larger prospecting campaigns. Use ad set budgets when the business needs exact control.

---

## 5. Advantage+ Sales Campaigns

### Summary

Advantage+ sales campaigns are Meta's automated sales campaign type. They are especially useful for e-commerce, but the exact eligibility and available controls can vary by account, region, objective, and product updates.

### Characteristics

- Automates targeting, budget allocation, placements, and creative delivery decisions.
- Works best with strong conversion tracking, enough volume, and diverse creative.
- Can combine prospecting and retargeting behavior inside one campaign.
- Opportunity Score and account recommendations can provide optimization feedback, but they should not replace business judgment.
- Existing-customer controls have changed across Advantage+ Shopping/Sales workflows. Verify current UI before prescribing an "Existing Customer Budget Cap"; where no cap exists, use customer definitions, audience breakdowns, manual Sales structures, custom audience exclusions, or ad set spending limits where appropriate.

### Setup Flow

1. Create a campaign in Ads Manager.
2. Choose the **Sales** objective.
3. Select the Advantage+ sales campaign flow when available and appropriate.
4. Name the campaign.
5. Configure catalog usage if relevant.
6. Set budget and schedule.
7. Configure A/B test options if needed.
8. Add audience suggestions where useful.
9. Upload diverse creative assets.
10. Confirm Meta Pixel / Conversions API tracking.
11. Review and publish.

### When to Use or Avoid

**Use Advantage+ sales campaigns when:**

- The goal is efficient scale with minimal manual targeting.
- Broad audience delivery is acceptable.
- The product or offer can appeal to a reasonably broad audience.
- Conversion tracking and catalog data are reliable.
- The account has enough conversion volume to learn.

**Use manual campaigns when:**

- You need strict control over targeting, placements, or budget splits.
- The market is niche and requires explicit audience separation.
- You are testing a specific creative or audience hypothesis.
- Compliance, geography, or lead-quality controls require more manual structure.

### Readiness

- Meaningful recent conversion volume is ideal.
- Budget must be sufficient to support learning.
- Creative should be diverse and high quality.
- Measurement, landing page, and funnel issues should be fixed before expecting automation to scale.
- Track new vs existing customer contribution, view-through share, and business revenue. Advantage+ Sales can look efficient in-platform while over-harvesting existing demand.

---

## 6. Ad Setup

### Recommended Number of Ads per Ad Set

- Start with **3-5 distinct creative concepts** per test wave when the budget can support it.
- Mix formats where useful: image, video, carousel, and catalog-led formats.
- Adapt aspect ratio and design to placement requirements.
- Meta has softened older "six ads per ad set" guidance, but that does not mean every account should run 20-50 ads. Scale ad volume with budget and delivery; if many ads receive no impressions, reduce the active set.

### Advantage+ Creative

- Lets Meta automatically optimize creative elements such as cropping, text variations, enhancements, and format adaptations.
- Can reduce manual testing burden.
- Still requires human quality control and performance monitoring.
- Use as a multiplier on strong human-defined concepts. Do not rely on it to invent the core offer, proof, or positioning.

### Flexible Ad Format

- Lets Meta dynamically choose among eligible formats and variations.
- Useful when several compatible assets are available.
- Monitor output quality and placement fit.

### Text Recommendations

| Element | Recommended length | Quantity |
|---|---:|---:|
| Primary text | Up to 125 characters before truncation risk | 3-5 variants |
| Headline | Up to 27 characters before truncation risk | 3-5 variants |
| Description | Usually 25-30 characters; may not show on all placements | 1-3 variants |
| CTA | Choose from Meta's preset buttons | 1 |
