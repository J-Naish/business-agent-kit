# Diagnostic Decision Trees

Use this reference for existing X Ads accounts with performance issues.

## Quick Routing

Start with the visible symptom, then branch to the first likely bottleneck:

```text
Delivery low?
  -> Check billing / dates / disapproval / eligibility
  -> If clean: check bid, budget, audience size, and Optimized Targeting

Traffic weak?
  -> If impressions low: delivery or targeting problem
  -> If impressions high and CTR low: creative / message / context problem

Conversions weak?
  -> If clicks low quality: targeting or intent mismatch
  -> If clicks good but CVR low: destination, event, offer, or trust problem

Reported performance volatile?
  -> If event volume low: budget / fragmentation / conversion delay
  -> If event volume healthy: creative fatigue, audience mix, or measurement issue
```

Do not change every layer at once. Fix the first confirmed bottleneck, log the change, and wait for enough signal before moving to the next layer.

## Spend Is Low or Delivery Is Limited

Likely causes:

- Budget, bid, or target too restrictive.
- Audience too narrow after respected constraints and exclusions.
- Optimized Targeting disabled when scale is needed.
- Maximum bid or Target cost is below what the auction can clear.
- Creative disapproved or low quality.
- Account, market, or format eligibility issue.
- Premium/managed product not actually available in the account.

Actions:

- Check delivery status, disapprovals, billing, funding source, and campaign dates first.
- Broaden flexible targeting inputs or enable Optimized Targeting where appropriate.
- Reduce unnecessary ad-group fragmentation.
- Confirm objective, bid type, and optimization goal match the desired result.
- If the campaign is under 24 hours old, separate normal ramp-up from true no-delivery before rebuilding.

## CTR Is Low

Likely causes:

- Weak first line, first frame, or visual contrast.
- Message does not match the audience, keyword, or conversation context.
- Generic creative reused without X-native framing.
- Hashtag/URL/emoji clutter or poor aesthetic quality.

Actions:

- Replace cosmetic variants with distinct concepts.
- Match ad copy to keyword/search intent or follower-look-alike hypothesis.
- Improve visual clarity and remove clutter.
- Test a stronger hook, proof point, offer, or product demonstration.
- Read replies and quote-post context; low-quality or hostile replies often explain weak downstream action.

## Clicks Are Cheap but Conversions Are Weak

Likely causes:

- Objective optimized for traffic or engagement when the business needs conversions.
- Landing page has weak message match, slow load, form friction, or low trust.
- Conversion event is too shallow.
- Audience signal is broad but not qualified.

Actions:

- Move to Website conversions / Sales when tracking and volume support it.
- Audit landing-page speed, offer, proof, form length, and mobile experience.
- Split reporting by prospecting vs retargeting and by keyword/audience theme.
- Use CRM or order quality to identify whether cheap clicks are useful.

## CPA or ROAS Is Volatile

Likely causes:

- Low conversion volume or delayed conversion reporting.
- Too many simultaneous changes.
- Budget too small for the number of ad groups/creatives.
- Retargeting and prospecting mixed in one read.
- Pixel/CAPI/catalog event issues.
- View-through or post-engagement attribution is being read as final revenue truth.

Actions:

- Check event health and conversion delay before changing strategy.
- Consolidate structure.
- Separate retargeting from prospecting when possible.
- Batch changes and wait for a meaningful observation window.
- Use 3-7 day rolling reads and external source-of-truth reporting before making major changes.

## Lead Quality Is Low

Likely causes:

- Optimizing to raw form fills instead of qualified leads.
- Offer attracts low-intent users.
- Landing page overpromises or under-qualifies.
- Targeting is too broad without enough creative qualification.

Actions:

- Feed CRM quality back into reporting or offline analysis.
- Add qualification to the landing page/form.
- Use copy to repel poor-fit users as well as attract good-fit users.
- Track qualified lead rate, not only CPL.

## DPA Performance Is Weak

Likely causes:

- Product IDs do not match between events and catalog.
- Feed has bad titles, prices, availability, or images.
- Retargeting window is too broad or too narrow for the purchase cycle.
- Product set includes low-margin or unavailable products.

Actions:

- Audit X Shopping Manager feed health and event match.
- Review product-level performance and inventory.
- Separate prospecting, retargeting, and cross-sell/upsell roles.
- Optimize to margin or contribution when revenue ROAS is misleading.

## App Campaign Results Differ From MMP

Likely causes:

- Attribution windows differ between X and the MMP.
- SKAdNetwork or privacy constraints affect iOS reporting.
- Events are not mapped correctly into X Events Manager.
- Reporting is not finalized yet.

Actions:

- Align attribution windows in X and MMP.
- Check event status in Events Manager.
- Reconcile against app analytics and LTV.
- Allow 24-48 hours for reporting finalization where relevant.

## Keyword Campaign Underperforms

Likely causes:

- Keywords are too broad, ambiguous, or mixed across intent levels.
- Negative keywords are missing.
- Creative does not answer the search/post context.
- Optimized Targeting or additional placements make the keyword read less pure.
- The campaign was paused before enough search/keyword data accumulated.

Actions:

- Split brand/category/problem/competitor/event keywords.
- Add excluded keywords for irrelevant meanings and unsafe contexts.
- Rewrite copy to answer the keyword intent in the first line.
- Review keyword breakdowns and expand from winners.
- Use UTMs and landing-page analytics to judge quality, not CTR alone.
