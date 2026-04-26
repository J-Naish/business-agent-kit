# Diagnostic Decision Trees

Use this reference for existing TikTok Ads accounts with performance issues. Diagnose root causes before changing structure.

## CPA / ROAS Gets Worse

1. Did measurement or destination break?
   - Check Pixel, Events API, `event_id` deduplication, MMP, CRM, Seller Center, UTMs, product links.
2. Did creative leading indicators decline first?
   - Check CTR, 2s/6s views, hold rate, comments, frequency.
3. Did a change trigger learning?
   - Check budget, bid/ROAS target, bidding strategy, targeting, pause, optimization event.
4. Did audience or placement quality change?
   - Compare TikTok vs Pangle/Global App Bundle, broad vs narrow, prospecting vs retargeting.
5. Did the business side change?
   - Check price, inventory, offer, reviews, landing page, form, returns, fulfillment, app store.

Actions:

- Fix tracking/destination first.
- Add fresh hooks/concepts before restructuring.
- Avoid large bid/budget changes until the cause is clear.
- Reconcile platform results to business-source truth.
- If no account-specific thresholds exist, use practical markers only as hypotheses: rising frequency, hook-rate decline, weaker 2s/6s views, and negative comment themes usually deserve creative review before bid surgery.

## Spend Does Not Deliver

Likely causes:

- Budget/bid/target too restrictive.
- Audience too narrow.
- Event too deep for available volume.
- Policy/review limitation.
- Creative quality too weak.
- Search keywords too tight.

Actions:

- Relax bid/target or use Maximum Delivery.
- Broaden targeting or placement where safe.
- Use a higher-volume event temporarily if the deep event has no signal.
- Add creative volume and stronger hooks.
- For Search Ads, expand broad-match keywords and review keyword quality.

## Clicks Good, Conversions Weak

Likely causes:

- Hook overpromises.
- Landing page or Instant Page mismatch.
- Slow mobile page.
- Wrong optimization goal.
- Weak offer or price.
- Form or checkout friction.

Actions:

- Compare the ad promise to the first destination screen.
- Improve speed, proof, offer clarity, and CTA.
- Use Instant Page only when it adds useful education or speed.
- Move from traffic/LPV to conversion when signal supports it.
- Read comments for confusion and objections.

## Lead Volume Good, Revenue Weak

Likely causes:

- More Volume form is too low-friction.
- Creative attracts unqualified users.
- Qualifying questions are missing or poorly chosen.
- CRM sync or speed-to-lead is weak.
- Sales team cannot handle volume.

Actions:

- Test Higher Intent.
- Add or revise qualifying questions.
- Daypart to staffed hours if needed.
- Rewrite creative to self-qualify.
- Report to qualified lead, sales accepted lead, pipeline, and revenue.

## Search Ads Spend Wasted

Likely causes:

- Broad keywords are too loose.
- No negative keyword hygiene.
- Creative does not answer the query.
- Landing page is generic.
- Search Terms Report is not reviewed.

Actions:

- Add account/campaign/ad-group negatives.
- Add plural, misspelling, and synonym variants where needed.
- Move proven terms to phrase/exact after learning.
- Split ad groups by intent theme.
- Match creative and landing page to query intent.

## GMV Max Looks Good but Profit Is Weak

Likely causes:

- GMV is not net revenue.
- Returns, discounts, fees, fulfillment, and affiliate commissions are ignored.
- Existing buyers or affiliate/organic demand are being re-credited.
- Loss-making SKUs remain eligible.
- Creative pool is shallow or stale.

Actions:

- Reconcile to Seller Center, settlement reports, margin, returns, and finance data.
- Track new buyer rate and contribution margin by SKU.
- Suppress recent purchasers where available.
- Exclude weak products if product economics are bad.
- Add authorized creator/affiliate videos and product demos.
- Confirm current GMV Max rules before editing Target ROI, product lists, campaign status, or creative sources; small-looking changes can affect protection, learning, or reporting.

## App Installs but Weak LTV

Likely causes:

- Optimizing to install rather than in-app event/value.
- Pangle or app inventory drives cheap low-quality installs.
- MMP/SKAN/PAM setup is incomplete.
- Creative misrepresents actual app value.

Actions:

- Move to deeper app events when volume supports it.
- Split or diagnose Pangle separately.
- Confirm MMP/TikTok SDK/iOS setup.
- Align creative with app store and onboarding.
