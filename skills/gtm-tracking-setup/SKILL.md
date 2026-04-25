---
name: gtm-tracking-setup
description: Designs analytics tracking and outputs an importable GTM container JSON covering GA4, Google Ads, Microsoft Ads, Meta, TikTok, X, Pinterest, Snap, Reddit, LinkedIn, Microsoft Clarity, and Hotjar. Trigger whenever the user wants to set up or expand tracking — conversion tracking, event tracking, dataLayer design, pixel/tag setup, session recording, or heatmaps — including casual asks like "wire up Google Analytics", "track form submissions", "add a Meta pixel", "set up purchase tracking", or "I need a tracking plan". Use this skill even when GTM isn't explicitly mentioned, since browser-side tracking almost always routes through GTM. Skip for pure GA4 admin-side configuration (custom dimensions, audiences, reports) that doesn't touch the container.
---

# GTM Tracking Setup

Design tracking configurations for GA4, GTM, and each ad platform, and output an importable JSON file for the GTM container.

## Workflow

```
0. Read app code → 1. Gather requirements → 2. Consult references → 3. Refer to examples → 4. Output JSON → 5. Implementation guide
```

---

## 0. Reading the application code

If the source code of the site/app to be tracked is accessible (anywhere in the workspace, or at a path the user provides), **read and understand it before starting design.** Reading the actual code dramatically improves the precision of dataLayer design, trigger conditions, and event definitions — guessing at form IDs or routing patterns leads to triggers that silently fail in production.

Skip this step only if the code is not accessible (e.g., the user is integrating with a third-party site they cannot read).

**Points to check:**
- Page structure and routing (SPA/MPA detection, identification of major pages)
- Form implementation (form IDs, submission handling, validation)
- E-commerce features (cart, checkout, purchase completion flow)
- Existing `dataLayer.push` calls or analytics-related code
- Implementation patterns for CTAs, phone links, and external links
- HTML `data-*` attributes and class names (elements that can be used for trigger conditions)

**Procedure:**
1. Ask the user where the application source lives (or confirm if it is obvious from the workspace)
2. Explore the structure (Glob/Grep) before reading individual files
3. Read the source of major pages and components
4. Identify existing tracking implementations and avoid duplication

---

## 1. Gathering requirements

Collect the following from the user. Ask questions to clarify any unknown items.

| # | Item | Example | Required |
|---|------|-----|------|
| 1 | Application path (if readable) | (path the user provides) | If the source is accessible |
| 2 | Site type | Corporate / LP / EC / Lead generation | ✅ |
| 3 | Platforms to use | GA4, Google Ads, Meta, TikTok, X, Clarity | ✅ |
| 4 | Primary conversions | Purchase, form submission, phone tap, etc. | ✅ |
| 5 | SPA / MPA | MPA | Used to decide page_view control |
| 6 | GTM Account ID | `123456` | At JSON generation time |
| 7 | GTM Container ID | `789012` | At JSON generation time |
| 8 | Container public ID | `GTM-XXXXXXX` | At JSON generation time |
| 9 | Site domain | `example.com` | At JSON generation time |
| 10 | IDs for each platform | GA4 measurement ID, Pixel ID, etc. | At JSON generation time |

**Tips for the interview:**
- Once the site type and platforms in use are known, design can begin
- IDs only need to be confirmed right before JSON output (design can proceed using placeholders)
- For e-commerce sites, confirm whether the ecommerce funnel (view_item → add_to_cart → begin_checkout → purchase) applies

---

## 2. Reference manuals

Detailed specifications for each platform are in the manuals under the `references/` directory. **Only read the manuals relevant to the platforms selected by the user.**

| Manual | Contents | When to read |
|---|---|---|
| `references/google-tag-manager.md` | GTM container design, naming conventions, JSON specification | **Always read** (foundation for JSON output) |
| `references/google-analytics.md` | GA4 property design, event taxonomy, recommended events, ecommerce | When using GA4 |
| `references/google-ads.md` | Conversion design, enhanced conversions, dynamic remarketing | When using Google Ads |
| `references/microsoft-ads.md` | UET tag, conversion goals, custom events, dataLayer mapping | When using Microsoft Ads / Bing |
| `references/meta-pixel.md` | Standard events, custom events, Conversions API | When using Meta |
| `references/tiktok-pixel.md` | Standard events, Events API, Advanced Matching | When using TikTok |
| `references/x-pixel.md` | Standard events, Conversion API | When using X |
| `references/pinterest-tag.md` | Standard events, Conversions API, Enhanced Match | When using Pinterest |
| `references/snap-pixel.md` | Standard events, Conversions API v3, advanced match, dedup | When using Snap |
| `references/reddit-pixel.md` | Standard events, Conversions API, Advanced Matching, DPAs | When using Reddit Ads |
| `references/linkedin-insight-tag.md` | Insight Tag, conversions, Matched Audiences, Conversions API | When using LinkedIn |
| `references/microsoft-clarity.md` | Heatmaps, session recordings, custom tags | When using Clarity |
| `references/hotjar.md` | Tracking Code, Events API, Identify API, suppression | When using Hotjar |

---

## 3. Referring to examples

The `examples/` directory contains illustrative GTM container JSON files for common site/platform combinations. **Treat these as references, not files to copy.** Read the example most relevant to the user's situation to understand structural patterns (folder layout, tag/trigger/variable naming, sequencing, sharing of triggers across platforms), then build a fresh container tailored to the user's actual requirements.

| Example | Platforms | Suitable scenarios |
|---|---|---|
| `examples/corporate-site.json` | GA4 + Clarity | Corporate site, homepage |
| `examples/landing-page-with-clarity.json` | GA4 + Clarity + Google Ads | Landing page for Google Ads, lead-generation CV |
| `examples/landing-page-with-hotjar.json` | GA4 + Google Ads + Hotjar | Landing page using Hotjar (Recordings, Heatmaps, Events) instead of Clarity, lead-generation CV |
| `examples/paid-search.json` | GA4 + Clarity + Google Ads + Microsoft Ads | Paid search across Google and Bing (purchase + generate_lead conversions) |
| `examples/ecommerce.json` | GA4 + Clarity + Google Ads | Basic e-commerce site (ecommerce funnel) |
| `examples/lead-generation.json` | GA4 + Clarity + Google Ads + Meta | Lead generation site, multiple ad platforms |
| `examples/b2b-lead-generation.json` | GA4 + Clarity + Google Ads + LinkedIn | B2B lead generation (LinkedIn Insight Tag for B2B targeting) |
| `examples/saas-lead-generation.json` | GA4 + Clarity + Google Ads + LinkedIn + Reddit | SaaS / developer-tool lead generation (LinkedIn for decision-maker targeting + Reddit for technical community targeting; generate_lead + sign_up conversions) |
| `examples/social-ecommerce.json` | GA4 + Clarity + Google Ads + Meta + Pinterest | Visual / social e-commerce (full ecommerce funnel across Meta and Pinterest) |
| `examples/gen-z-ecommerce.json` | GA4 + Clarity + Google Ads + Snap + TikTok | Youth-focused mobile-first e-commerce (full ecommerce funnel across Snap and TikTok) |
| `examples/ecommerce-multi-platform.json` | GA4 + Clarity + Google Ads + Meta + TikTok + X | Full e-commerce (all platforms) |

**How to use the examples:**
1. Read the example closest to the user's situation to understand patterns
2. Build a custom container that includes only the platforms, conversions, and triggers the user actually needs — do not include unused content from the example
3. Use placeholders (`{ACCOUNT_ID}`, `{GA4_MEASUREMENT_ID}`, etc.) until the user supplies actual IDs
4. For community templates (`cvt_*`), explain to the user that the `cvt_*` IDs must be replaced with the template IDs assigned at the import destination

**When no example fits closely:**
- Combine structural patterns from multiple examples and design from scratch using the JSON specification in `google-tag-manager.md` and the per-platform manuals
- Always follow the naming convention (section 3 of `google-tag-manager.md`)

---

## 4. JSON output

### File naming convention

Output files follow this naming convention:

```
gtm-{type}-v{number}-{date}.json
```

| Element | Description | Example |
|------|------|-----|
| `gtm` | Indicates a GTM container (fixed) | `gtm` |
| `{type}` | Site type or project name | `lp`, `ec`, `corporate`, `lead-gen` |
| `v{number}` | Sequential version (starting at 1) | `v1`, `v2`, `v3` |
| `{date}` | Generation date (YYYYMMDD) | `20260304` |

Examples: `gtm-lp-v1-20260304.json`, `gtm-ec-v2-20260310.json`

**Operational rules:**
- The file with the highest version number is the latest
- Do not delete past versions (kept for rollback if issues occur during GTM import)
- When generating a new file of the same type, check existing file version numbers and assign the next sequential number

### Construction procedure

1. **Refer to the relevant example** → Internalize structural patterns (folder layout, naming, trigger sharing)
2. **Define tags:**
   - Include only tags for the platforms the user actually uses
   - Add tags and triggers for the conversions identified in the requirements
   - Assign tag IDs sequentially (they will be re-numbered on import)
3. **Define triggers:**
   - Match custom event names to the user's dataLayer design
   - Consolidate shared triggers into one (avoid duplicates with the same conditions)
4. **Define variables:**
   - Use the IDs provided by the user for constant variables (or placeholders if not yet supplied)
   - Add the data layer variables needed by the tags
5. **Organize folders:**
   - Create folders only for platforms in use
   - Use the per-platform folder convention from the examples

### Checks at JSON output time

- [ ] `exportFormatVersion: 2` exists at the top level
- [ ] All tags have `firingTriggerId` set
- [ ] Built-in trigger IDs (`2147479553`, `2147479573`, `2147479583`) are used correctly
- [ ] All tags, triggers, and variables have `parentFolderId` set
- [ ] Naming conventions are followed (tag: `[Platform] - [Type] - [Detail]`)
- [ ] No PII is included in parameters (phone numbers, emails, etc.)
- [ ] If there are GA4 event tags that reference a GA4 Config tag via `tagReference`, the reference name is correct
- [ ] Where community templates (`cvt_*`) are used, include guidance for the user on replacing the IDs at the import destination

---

## 5. Implementation guide

After outputting the JSON, guide the user through the following.

### GTM import procedure
1. GTM admin screen → Admin → Import Container
2. Select the generated JSON file
3. For a new container choose "Overwrite"; for an existing one choose "Merge"
4. If community template tags are present, install them first from the Template Gallery

### dataLayer implementation
- Based on the designed tracking requirements, present the `dataLayer.push` code that needs to be added on the application side
- Document the specifications for event names, parameter names, types, and values in a table
- For e-commerce sites, also present the structure of the ecommerce object (the schema of the items array)

### Verification procedure
1. Verify all tags fire in GTM Preview mode
2. Confirm event reception in GA4 DebugView
3. Verify with each platform's helper tool (Meta Pixel Helper, etc.)
4. Confirm no PII is included in events
5. If there are no issues, fill in the version name and description and publish

---

## Patching an existing container

If the user has an existing GTM container and wants to add/change a few tags rather than rebuild from scratch:

1. **Ask the user to export the current container** from GTM (Admin → Export Container) and provide the JSON. This gives you the existing tag/trigger/variable IDs and folder structure.
2. **Read the export** to understand what is already in place — naming conventions actually in use, existing constant variables, folder layout. Match the user's current style rather than imposing the conventions in `references/google-tag-manager.md` blindly (deviation creates inconsistency that confuses operators).
3. **Generate a small, additive JSON** containing only the new tags/triggers/variables. Reuse existing trigger and variable IDs by reference where possible. Place new items into existing folders.
4. **Tell the user to import with "Merge"** (not Overwrite) and choose **"Rename"** on conflicts so existing items are preserved. Overwrite would wipe their container.
5. **Skip the example-based pattern study** (Section 3) — the existing container is the source of truth for structure. Examples are for greenfield builds.

The JSON output naming follows the same convention but use a descriptive `{type}` like `gtm-add-meta-purchase-v1-20260426.json` so the patch nature is obvious.
