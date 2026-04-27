# Campaign Strategy

Use this reference for X Ads campaign structure, objectives, targeting, bidding, budgets, measurement, and operating cadence.

## Campaign Structure

X Ads Manager uses three levels:

```text
Campaign
  -> Ad group
      -> Ad
```

| Level | Main decisions |
|---|---|
| Campaign | Objective, funding source, name, campaign dates, optional spend cap or Campaign Budget Optimization |
| Ad group | Goal, bid, targeting, placements, budget controls, flight dates, Dynamic Product Ads toggle where relevant |
| Ad | Post, creative, card, CTA, destination, tracking |

One campaign can contain multiple ad groups, and each ad group can contain one or more ads. X can auto-optimize toward better-performing ads within an ad group.

## Structure Practice

Keep the first structure simple:

| Decision | Default |
|---|---|
| Campaign | One objective and one primary business goal |
| Ad group | One main audience thesis or control need |
| Ads | Multiple posts so X can choose winners |
| Measurement | Pixel/CAPI/MMP/catalog/CRM ready before optimizing deep events |

Split only when the split changes a real decision: objective, market, device/OS, audience thesis, prospecting vs retargeting, premium vs auction, regulated category, creative test, or measurement read. Avoid overlapping campaigns with similar audiences and nearly identical creative.

## Objective Selection

X objective naming is not perfectly consistent across public docs and account flows. Official public campaign pages still list **Website conversions**, while other current X surfaces refer to **Sales** or **Conversions**. Use dual wording where needed and verify the current account UI before launch.

| Funnel | Objective / flow | Use when | Typical result metric |
|---|---|---|---|
| Awareness | Reach | The goal is efficient exposure | Reach, impressions, CPM |
| Consideration | Video views | The goal is video consumption | Views, view rate, CPV |
| Consideration | Website traffic | The goal is site visits | Link clicks, CPC, landing-page actions |
| Consideration | Pre-roll views | The goal is pre-roll video against premium content | Pre-roll views, CPV |
| Consideration | Engagement | The goal is post interaction | Engagements, CPE, engagement rate |
| Consideration | App installs | The goal is new app users | Installs, CPI |
| Conversion | App re-engagements | The goal is app activity from existing users | App events, CPA |
| Conversion | Website conversions / Sales | The goal is tracked website outcomes | Conversions, CPA, ROAS |
| Advanced / contextual | Keywords campaign / Search Ads | The goal is active search-intent capture | CPC, CPA, ROAS, qualified actions |

Choose the objective that matches the business outcome. Do not use Website traffic when the real goal is a tracked conversion unless conversion volume or tracking is not ready.

X does not list a native lead-generation objective comparable to Meta Lead Ads or LinkedIn Lead Gen Forms. Use Website traffic or Website conversions / Sales with a tracked form and CRM quality feedback.

## Buying Path

| Buying path | Best for | Notes |
|---|---|---|
| Self-serve | Always-on performance, tests, standard Promoted Ads, many app/website objectives | Managed in X Ads Manager |
| Eligible / account-dependent | Vertical Video, Amplify Pre-roll, Polls, Conversation Buttons, Keywords campaign, some beta or evolving features | Verify current account access |
| Managed service / high-touch | Takeovers, sponsorships, branded features, X Live, premium reservation inventory, large events | Requires X sales/support, X Next, or account eligibility |

## Targeting

### Targeting Inputs

| Type | Examples | Use |
|---|---|---|
| Demographic / device | Location, language, device, OS, age, gender | Basic eligibility and market control |
| Interest / behavior | Interests, conversations, events, movies/TV | Broad audience shaping |
| Keyword targeting | Search queries, recent posts, engaged posts | Topic and intent signals across X behavior |
| Keywords campaign / Search Ads | Keywords selected in the Keywords campaign flow | Active search-intent capture in Search Results |
| Follower look-alikes | Users similar to followers of selected handles | Reach communities around relevant accounts |
| Lookalike Audiences | Modeled from Custom Audience seeds | Scale from customer, site, app, or engagement seed lists |
| Custom Audiences | Customer lists, website visitors, app users, engagement audiences | Retargeting, suppression, high-value seeds |
| Exclusions | Excluded audiences, excluded keywords, Do Not Reach Lists | Guardrails and suppression |

### AND / OR Targeting Logic

X targeting uses additive and subtractive layers. This is easy to miss when designing ad groups.

| Logic | Targeting types | Effect |
|---|---|---|
| Additive / OR | Interests, keywords, conversation topics, movies/TV, events, follower look-alikes | Expands the eligible audience; a user can match any selected item |
| Subtractive / AND | Geo location, age, gender, device model, platform, language | Narrows the eligible audience; all selected constraints are respected |

Example: if an ad group targets women in Japan, ages 25-44, plus 5 conversation topics and 20 follower look-alike handles, the user must match the geo/age/gender constraints and can match any of the selected conversation topics or handles.

### Keyword Targeting vs Keywords Campaign

Keep these separate:

| Feature | What it is | Key limits / behavior |
|---|---|---|
| Keyword targeting | A targeting feature based on search, recent posts, and engaged posts | Official docs list up to 750 keywords per ad group |
| Keywords campaign / Search Ads | A campaign workflow/objective that serves in Search Results and can also appear in Home Timeline/Replies when contextually relevant | Search Results is mandatory/default; supports up to 200 keywords at one time; X recommends at least 25 keywords per ad group |

Keywords are exact-match style, trim extra whitespace, are not case-sensitive, and can expand to matching Hashtags, Cashtags, and @handles. X does not translate non-English keywords automatically.

### Optimized Targeting

Optimized Targeting is X's AI-driven audience expansion system. It can reach beyond selected flexible targeting inputs when X predicts better performance.

| Always respected | Treated flexibly when Optimized Targeting is on |
|---|---|
| Gender, age, location, language, OS type, OS version, device, excluded keywords, excluded audiences, Do Not Reach Lists | Interests, keywords, conversation topics, follower look-alikes, and other audience features |

Use it when scale and performance matter more than strict manual audience boundaries. Be careful with regulated categories, narrow geos, strict audience tests, or cases where reporting must isolate one targeting input.

Current X guidance says Optimized Targeting is automatically selected for campaigns using the Sales Objective and automatically applied in the Simple Ads flow. In Advanced campaign flow, verify whether the toggle can be changed.

### Conversation Targeting

Conversation targeting covers 10,000+ topics across 25+ categories and uses a 28-day lookback for people who posted, engaged with, or dwelled on posts about a topic.

Language support is strongest in English-speaking markets. X also provides limited support for Japanese, Korean, Portuguese, Spanish, and French; coverage outside English may be less comprehensive. For non-English campaigns, check forecasted reach for each topic and add other targeting options if reach is low or unavailable.

### Targeting Principles

- Start broad enough for delivery, then narrow only for business, compliance, or measurement reasons.
- Test one main audience thesis at a time when learning what works. X optimization guidance favors using one type of audience targeting per campaign to make results interpretable.
- Use keyword and conversation targeting when the campaign depends on real-time intent or cultural context.
- Use follower look-alikes as a signal, not as a guarantee of buyer quality.
- Use Lookalike Audiences and Custom Audiences for seed-based scale, retargeting, and exclusions.
- Avoid mixing many targeting ideas in one ad group if it will make learning or reporting unreadable.
- For Housing, Lending, and Credit ads in relevant regions, verify restricted targeting and prediction-model requirements before launch.

### Follower Look-Alike Practice

Follower look-alikes are most useful when the selected handles describe a real buyer/community graph.

Good seeds:

- Direct competitors.
- Category publications, newsletters, podcasts, analysts, and creators.
- Adjacent tools or products used by the same buyer.
- Conference, event, or community accounts.

Weak seeds:

- Celebrity or mass-market accounts unrelated to the buyer.
- Mixed handle lists from unrelated verticals.
- Very small or inactive handles that cannot describe a useful audience.
- Your own customer/employee handles in prospecting without suppression logic.

## Budget and Bidding

| Situation | Recommended posture |
|---|---|
| New launch | Use a simple structure and enough budget for the primary KPI to register meaningful signal |
| Creative test | Keep tests small and use clear concept differences |
| Performance scaling | Shift budget toward ad groups and creatives with stable downstream quality |
| Premium placement | Confirm availability, minimums, dates, approvals, and measurement plan before recommending |

Campaign Budget Optimization can be useful when ad groups share the same goal and the system should allocate spend automatically. Use ad-group budgets when strict allocation, audience tests, or message tests matter.

Common bid postures:

| Bid posture | Use when |
|---|---|
| Automatic | Early learning, limited history, or maximizing delivery within budget |
| Maximum bid | You need a hard ceiling on bid economics |
| Target cost | You have stable conversion data and a realistic target |

Practical bidding posture:

- Start with Automatic when history is limited, conversion signal is still building, or the objective requires maximum delivery.
- Use Target cost only where the account/objective supports it and the target is based on historical performance, not aspirational CPA.
- Use Maximum bid for hard ceilings, constrained upper-funnel buys, or delivery control; too-low bids are a common no-delivery cause.
- Read 3-7 day rolling performance for conversion campaigns before making non-emergency bid changes.

## Measurement

| Goal | Required measurement |
|---|---|
| Website traffic | UTMs, landing-page analytics, bounce/CVR checks |
| Website conversions / Sales | X Pixel and/or Conversion API / Conversions API, event definitions, deduplication where relevant |
| App installs / re-engagement | Approved Mobile Measurement Partner or app event tracking |
| E-commerce / DPA | X Shopping Manager, product catalog, pixel/events, catalog feed health, purchase value |
| Lead generation | Form events, CRM stages, qualified lead feedback |
| Brand / awareness | Reach, frequency, video view quality, lift study or proxy brand metrics where available |

Use platform metrics for optimization, but reconcile with business data such as orders, CRM, app revenue, or finance reporting.

## Operating Cadence

| Cadence | Focus |
|---|---|
| Daily | Delivery, spend anomalies, disapprovals, tracking breaks |
| Weekly | Creative performance, audience quality, KPI pacing, landing page/app quality |
| Biweekly | New creative concepts, keyword/audience tests, budget shifts |
| Monthly | Structure review, measurement health, source-of-truth reconciliation |

Avoid changing budget, bid, targeting, creative, and conversion events all at once unless the setup is clearly wrong.

For conversion campaigns, treat the first week as a stabilization window unless delivery, tracking, policy, or destination quality is broken. X does not expose a Meta-style learning label, but practitioners commonly observe volatile early delivery and CPA.
