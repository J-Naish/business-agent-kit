# Meta Ad Types and Selection Guide

## Contents

- [1. Campaign Objectives](#1-campaign-objectives)
- [2. Ad Formats](#2-ad-formats)
- [3. Placements](#3-placements)
- [4. Benchmarks](#4-benchmarks)

---

## 1. Campaign Objectives

Meta campaigns use six campaign objectives. The objective must match the business goal because it determines the optimization direction.

Important: choosing the wrong objective trains delivery toward the wrong behavior. For example, if the real goal is purchase but the campaign uses **Traffic**, Meta may find people likely to click rather than people likely to buy.

### 1-1. Objective Details

#### Awareness

| Item | Details |
|---|---|
| Summary | Maximize awareness, reach, or recall at the top of the funnel |
| Performance goals | Reach, impressions, ad recall lift where available |
| Use when | New brand launch, new market entry, event announcement, product launch |
| Best for | Any business with low awareness or reach goals |
| Recommended formats | Video/Reels, image, carousel |
| Notes | Useful for building retargeting audiences when paired with a clear funnel plan |

#### Traffic

| Item | Details |
|---|---|
| Summary | Maximize visits to a URL or destination |
| Performance goals | Landing page views, link clicks, daily unique reach |
| Use when | Content distribution, landing page traffic, early data gathering |
| Best for | Media, blogs, affiliate pages, email capture pages, new accounts with little conversion data |
| Recommended formats | Image, carousel, video |
| Notes | Use as a temporary step when conversion signal is insufficient; migrate to Sales or Leads once conversion data is reliable |

#### Engagement

| Item | Details |
|---|---|
| Summary | Drive likes, shares, comments, video views, messages, or event responses |
| Performance goals | Post engagement, video views, messages, event responses |
| Use when | Social proof, community building, events, video-view campaigns |
| Best for | Creators, events, community-led brands |
| Recommended formats | Video/Reels, carousel |
| Notes | Useful for engagement pools, but do not treat engagement as revenue without evidence |

#### Leads

| Item | Details |
|---|---|
| Summary | Collect prospect contact information |
| Performance goals | Instant Form submissions, website leads, Messenger leads, calls |
| Use when | Newsletter signups, webinar registration, content downloads, inquiries, demo requests |
| Best for | B2B services, real estate, education, consulting, professional services, insurance |
| Recommended formats | Lead Ads / Instant Forms, video, image |
| Two paths | **Instant Forms:** higher volume and lower friction, often lower quality. **Website conversions:** lower volume, often higher intent and more qualification |

#### App Promotion

| Item | Details |
|---|---|
| Summary | Drive app installs, app events, or value |
| Performance goals | App installs, app events, value optimization |
| Use when | App acquisition or app re-engagement |
| Best for | Mobile apps and games |
| Recommended formats | Video, playable ads |
| Notes | Move from install optimization toward higher-value app events once enough event volume exists |

#### Sales

| Item | Details |
|---|---|
| Summary | Maximize purchases and other direct conversion actions |
| Performance goals | Purchase, add to cart, initiate checkout, ROAS |
| Use when | Product sales, catalog sales, promotion campaigns, retargeting |
| Best for | E-commerce, D2C, subscriptions, high-ticket conversion capture |
| Recommended formats | Collection Ads, carousel, dynamic ads, video |
| Requirements | Reliable Meta Pixel / Conversions API setup and conversion data are ideal |
| Notes | Default starting point when e-commerce revenue or direct conversion volume is the primary goal |

### 1-2. Objective Selection by Business Type

| Business type | Recommended objective | Optimization event | Notes |
|---|---|---|---|
| **E-commerce / D2C** | Sales; Advantage+ sales campaign when suitable | Purchase | If purchase volume is insufficient, start with AddToCart cautiously |
| **B2B lead generation** | Leads or Sales | Lead / form submit / qualified lead | Test Instant Forms against website conversions for quality |
| **SaaS** | Leads -> Sales | Demo request / sign-up / trial start | Use the event that best predicts pipeline or subscription |
| **Local business** | Awareness + Sales/Leads | Store visit, purchase, booking, call, lead | Combine local targeting and local proof |
| **App** | App promotion | Install -> in-app event | Graduate toward higher-value events |
| **Media / blog** | Traffic | Landing page view | Use when ad revenue, content visits, or email capture is the goal |
| **Event** | Awareness + Engagement | Event response / reach | Awareness before the event; engagement near the event |
| **Brand building** | Awareness | Reach / ad recall lift | Video-led storytelling |

### 1-3. Choosing the Optimization Event

Choose the most valuable action that has enough volume to optimize.

```
Ideal: Purchase
  ↓ if weekly volume is insufficient
Fallback: AddToCart / InitiateCheckout
  ↓ if still insufficient
Temporary proxy: ViewContent / LandingPageView
  ↓ once signal improves
Move back toward Purchase
```

Caution: optimizing to higher-funnel events can increase volume while reducing purchase intent. Use shallow events only when the tradeoff is explicit.

---

## 2. Ad Formats

### 2-1. Image Ads

Summary: one static image plus text and CTA. The most basic and fastest format to produce.

| Item | Spec |
|---|---|
| Recommended resolution | Feed: 1440x1440 (1:1) or 1440x1800 (4:5); Stories/Reels: 1440x2560 or 1080x1920 (9:16) |
| Minimum resolution | Feed: 600x600 (1:1) or 600x750 (4:5) |
| File type | JPG, PNG |
| Max file size | 30 MB |

Performance characteristics:

- Static images can still drive a large share of conversions.
- 4:5 often performs better in Feed than 1:1 because it occupies more vertical space.
- Do not treat 9:16 as a Facebook Feed image spec; use 9:16 for Stories/Reels or placement-specific full-screen inventory.
- Fast to produce and useful for rapid concept testing.

Use when: promoting one product or offer, limited production resources, fast A/B tests, retargeting.

### 2-2. Video Ads

Summary: video creative for Feed, Stories, Reels, and other video placements.

| Item | Spec |
|---|---|
| Recommended resolution | Feed: 1440x1440 (1:1) or 1440x1800 (4:5); Reels/Stories: 1440x2560 or 1080x1920 (9:16) |
| Minimum resolution | 120x120; use higher source quality whenever possible |
| Recommended length | Feed: 15-60s; Reels: 15-30s; Stories: up to 15s per story unit |
| File type | MP4, MOV; GIF may be accepted for some video placements |
| Max file size | 4 GB |
| Codec | H.264 video, AAC audio; prefer square pixels, fixed frame rate, progressive scan, and stereo AAC 128 kbps+ |
| Maximum length | Placement-dependent; Facebook Feed video can support very long uploads, but ads usually perform better when concise |

Performance characteristics:

- Strong for product demos, storytelling, proof, and emotional messaging.
- Caption by default because many users watch with sound off.

Use when: product demonstration, brand story, testimonial, founder story, emotional hook.

### 2-3. Carousel Ads

Summary: 2-10 images or videos that users can swipe. Each card can have its own link.

| Item | Spec |
|---|---|
| Cards | 2-10; start with 3-5 |
| Recommended resolution | 1080x1080 minimum for square cards; use 1440x1440 when available |
| Aspect ratio | Keep cards consistent, usually 1:1 or 4:5 |
| Video cards | Keep short; 15s or less is often practical |
| Card description | Optional; keep very short because it may be hidden or truncated |

Use when: multiple products, step-by-step explanation, before/after, benefit sequence, comparison.

### 2-4. Collection Ads

Summary: mobile-first format with a cover image/video plus product grid. Tapping opens an Instant Experience.

| Item | Spec |
|---|---|
| Cover | One image or video |
| Product images | Displayed from catalog, typically square |
| Requirement | Product catalog connected in Commerce Manager / Meta Business Suite |

Use when: e-commerce catalog is strong and users should browse multiple products.

### 2-5. Lead Ads / Instant Forms

Summary: lead capture completes inside Facebook or Instagram.

Performance characteristics:

- Lower friction than sending users to an external form.
- Auto-fill can improve completion rate.
- Lead quality may be lower than a website form unless questions and follow-up are designed well.

Quality tactics:

- Add custom qualifying questions.
- Use the **Higher intent** form type for higher-stakes leads.
- Set a clear CTA on the thank-you screen.

Use when: newsletter signup, content download, inquiry, demo request, mobile form drop-off is a problem.

### 2-6. Instant Experience

Summary: a fast-loading fullscreen mobile experience that opens after an ad tap.

Use when: immersive brand experience, catalog browsing, mobile landing-page substitute, Collection Ads destination.

### 2-7. Format Selection Matrix

| Objective | First choice | Second choice | Third choice | Why |
|---|---|---|---|---|
| **Awareness** | Video/Reels | Carousel | Image | Video earns attention |
| **Traffic** | Image | Carousel | Video | Clear CTA and fast production |
| **Engagement** | Video/Reels | Carousel | Image | Interaction-friendly |
| **Leads** | Lead Ads / Instant Forms | Video | Image | Low-friction form completion |
| **Sales: e-commerce** | Collection Ads | Carousel | Dynamic ads | Product browsing and purchase path |
| **Sales: non-commerce** | Video | Image | Carousel | Persuasion plus CTA |
| **App promotion** | Video | Playable ads | Image | Shows app experience |

---

## 3. Placements

### 3-1. Placement List

#### Facebook Placements

| Placement | Description | Formats | Notes |
|---|---|---|---|
| **Feed** | Main Facebook feed | Image, video, carousel, collection | Broad reach |
| **Marketplace** | Appears while users browse Marketplace | Image, video, carousel | Purchase-oriented context |
| **Video Feeds** | Video browsing surfaces, including Watch-like inventory | Video | Users are in video mode |
| **Right Column** | Desktop right column | Image | Limited reach; often retargeting-oriented |
| **Stories** | Fullscreen story placements | Image, video | Immersive |
| **Reels** | Between Reels | Video | High engagement, vertical-first |
| **In-Stream Video** | During video content | Video | Captive video viewing context |
| **Search Results** | Facebook search results | Image, video | Intent-adjacent discovery |
| **Business Explore** | Business content discovery | Image, video | Business-interest context |
| **Groups Feed** | Group feed surfaces | Image, video | Community reach |

#### Instagram Placements

| Placement | Description | Formats | Notes |
|---|---|---|---|
| **Feed** | Main Instagram feed | Image, video, carousel, collection | Strong visual engagement |
| **Stories** | Fullscreen stories | Image, video | Immersive and action-oriented |
| **Reels** | Between Reels | Video | Vertical-first, high attention |
| **Explore Feed** | After tapping Explore content | Image, video | Discovery-oriented users |
| **Explore Home** | Explore grid tile inventory | Image, video | Discovery surface |
| **Shop** | Instagram shopping surfaces where available | Image | Commerce context |
| **Search Results** | Instagram search results | Image, video | Search/discovery context |

#### Messenger Placements

| Placement | Description | Formats | Notes |
|---|---|---|---|
| **Home Screen** | Between chat threads | Image | Reach during message checking |
| **Sponsored Messages** | Message delivered in chat | Text + image | Limited/relationship-based use; click-to-message ads are the mainstream acquisition path |

#### Audience Network / Threads

| Placement | Description | Formats | Notes |
|---|---|---|---|
| **Native, banner, interstitial** | Third-party apps and sites | Image, video | Low CPM; quality varies |
| **Rewarded Video** | Rewarded app video inventory | Video | High completion, often app/gaming context |
| **Threads Feed** | Threads feed inventory where available | Image, video | Reach expansion; availability varies |

### 3-2. Placement Quality Tiers

| Tier | Placements | Characteristics | Recommended use |
|---|---|---|---|
| **High quality** | Facebook/Instagram Feed, Reels, Stories | Strong engagement and conversion potential | Most objectives, especially Sales/Leads |
| **Medium quality** | Instagram Explore, Facebook Marketplace, In-Stream Video | Broader reach and contextual value; in-stream inventory exists but is less central than Feed/Reels/Stories for many accounts | Awareness, Traffic, Sales tests |
| **Lower quality / variable** | Audience Network, Messenger, Right Column | Cheap impressions but variable intent | Awareness, reach expansion, or controlled tests |

### 3-3. Advantage+ Placements vs Manual Placements

| Item | Advantage+ placements | Manual placements |
|---|---|---|
| Mechanism | Meta chooses delivery across eligible placements | Advertiser selects placements |
| Reach | Broader eligible reach | Selected placements only |
| CPM | Often lower overall due to flexible inventory | Placement-dependent |
| CPA | Often better when creative fits all major placements | More control, more risk of restriction |
| Best for | Conversion objectives by default | Specific placement tests, brand requirements, or quality controls |

Default: use **Advantage+ placements** for Sales, Leads, and App promotion unless there is a clear control or quality reason not to.

### 3-4. Placement Creative Specs

#### Aspect Ratios

| Placement | Recommended aspect ratio | Resolution |
|---|---|---|
| Feed image | 4:5 preferred, 1:1 acceptable | 1440x1800, 1440x1440 |
| Feed video | 4:5 or 1:1 for Feed; 9:16 can be useful for vertical-first video delivery where eligible | 1440x1800, 1440x1440, or 1080x1920 |
| Stories | 9:16 | 1440x2560 or 1080x1920 |
| Reels | 9:16 | 1440x2560 or 1080x1920 |
| In-Stream Video | 16:9 | 1920x1080 |
| Right Column | 1:1 | 1080x1080 |
| Marketplace | 1:1 | 1080x1080 |
| Messenger | 1:1 or placement-specific message creative | Verify current Ads Manager preview |

#### Safe Zones

| Placement | Top margin | Bottom margin | Side margins | Safe area |
|---|---:|---:|---:|---|
| **Feed 1:1** | 10% | 10% | 10% | Center 80% |
| **Feed 4:5** | 8-12% | 15-20% | Keep key content centered | Center region |
| **Stories/Reels 9:16** | 14% | 20-35% | 6% each side | Unified vertical safe area; use 35% bottom if Reels may run |

Design rule: use ratio-based safe zones rather than hard-coded pixels. For 9:16 assets, keep critical text, logos, product details, and CTA outside the top 14%, bottom 20-35%, and side 6% areas. Always verify with Ads Manager placement previews because UI overlays vary by device, placement, caption length, and product updates.

### 3-5. Placement Strategy by Business Type

| Business type | Recommended placements | Reason |
|---|---|---|
| **E-commerce / D2C** | Advantage+ placements; ensure Instagram Feed and Reels assets are strong | Visual product discovery and scale |
| **B2B lead generation** | Facebook Feed + Instagram Feed; consider excluding Audience Network | Lead quality control |
| **App** | Advantage+ placements | Meta can optimize toward install or event probability |
| **Local business** | Facebook Feed + Marketplace + Instagram Feed | Local targeting and local discovery |
| **Brand awareness** | Advantage+ placements; Reels + Stories-ready video | Broad reach and immersive viewing |
| **Content marketing** | Facebook Feed + Instagram Feed + Explore | Discovery and content distribution |

---

## 4. Benchmarks

Benchmarks vary heavily by country, industry, seasonality, product price, offer, funnel, and measurement setup. Use any benchmark only as an initial planning reference, not as a success rule.

| Metric | Planning note |
|---|---|
| CPC | Compare against account history and channel role |
| CPM | Can rise with audience narrowness, competition, or fatigue |
| CTR | Useful for creative diagnosis, but not sufficient by itself |
| CPL / CPA | Must be tied to lead quality, margin, close rate, or LTV |
| ROAS | Must be interpreted with margin, returns, discounts, and incrementality |
