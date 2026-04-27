# Keywords Campaign / Search Ads

Keywords campaigns reach people based on what they search for on X and can serve promoted posts in Search Results. Keep this separate from **keyword targeting**, which is a targeting feature available in broader campaign setup.

Spec source: X Create a Keywords Campaign docs (https://business.x.com/en/help/campaign-setup/create-a-keywords-campaign) and Keyword Targeting docs (https://business.x.com/en/help/campaign-setup/campaign-targeting/keyword-targeting). Last verified: 2026-04.

## Product Behavior

| Item | Guidance |
|---|---|
| Campaign setup | Select Keywords from the campaign objective/workflow where available |
| Supported campaign types | App Installs, App Re-engagements, Website Traffic, Website Conversions / Sales |
| Required placement | Search Results is mandatory/default |
| Additional placements | Home Timeline and Replies can serve when contextually relevant |
| Keyword volume | Up to 200 keywords at one time in the Keywords campaign workflow |
| Recommended minimum | At least 25 keywords per ad group |
| Matching behavior | Exact-match style; trims extra whitespace; not case-sensitive |
| Expansion | Can match related Hashtags, Cashtags, and @handles |
| Language | X does not translate non-English keywords automatically |

## Best Uses

- Capturing demand around product categories.
- Event, launch, or trend-driven campaigns.
- Competitor or alternative searches where policy allows.
- Problem/solution terms.
- B2B category research and comparison terms.

## Keyword Strategy

| Keyword type | Examples | Use |
|---|---|---|
| Brand | Brand, product, event names | Defensive or launch campaigns |
| Category | Product or service category terms | Prospecting |
| Problem | Pain points and needs | Lead generation and education |
| Competitor / alternative | Competitor names, comparison terms | Use carefully and follow policy |
| Event / trend | Conferences, sports, cultural moments | Timely relevance |

Use enough keywords to give delivery room, but keep ad groups thematically coherent.

For general keyword targeting outside this campaign workflow, current official docs list up to 750 keywords per ad group.

Practical launch posture:

- Use 25-50 tightly themed keywords when keyword targeting is the main audience thesis.
- Avoid very large mixed-intent lists unless the goal is broad discovery and reporting can tolerate noise.
- Do not duplicate hashtag and non-hashtag versions just for coverage; X includes hashtag variants automatically in ordinary keyword targeting.
- Add negatives early for irrelevant meanings, job seekers, freebie terms, unsafe contexts, and competitor conflicts.

## Campaign Design

- Group keywords by intent or message.
- Match creative to keyword intent.
- Use Website Cards when traffic or conversion is the goal.
- Use separate ad groups for very different intent levels.
- Exclude or avoid irrelevant terms that create poor-quality clicks.
- Do not rely on platform translation for non-English keywords; build local-language keyword sets explicitly.
- Let keyword campaigns gather enough data before pausing. A weak first few days can reflect warm-up, sparse search volume, or a poor keyword/creative match rather than a failed channel.

## Measurement

| Goal | Metrics |
|---|---|
| Traffic | CPC, CTR, landing-page behavior |
| Conversion | CPA, CVR, ROAS, qualified actions |
| Awareness | Reach, CPM, engagement quality |

## Common Mistakes

- Mixing broad awareness keywords and high-intent conversion keywords in the same ad group.
- Confusing Keywords campaigns with ordinary keyword targeting.
- Using generic copy that does not match the search intent.
- Judging only on CTR.
- Not using UTMs or landing-page analytics.

## Diagnosis

| Symptom | Likely cause | Response |
|---|---|---|
| Low delivery | Too few keywords or low-volume topic | Expand to adjacent terms, handles, and problem language |
| High CTR, low conversion | Curiosity/search mismatch | Tighten copy to the user's intent and improve landing-page match |
| Poor quality traffic | Mixed intent keywords | Split brand/category/problem/competitor terms |

## Operating Cadence

- Review keyword clusters weekly and add/remove terms in batches.
- Keep separate ad groups for materially different intent levels.
- Rebuild local-language keyword sets manually; do not assume translation.
- Expand winners by adding adjacent problem language, competitor alternatives, event terms, and follower look-alike handles that share the same audience.
