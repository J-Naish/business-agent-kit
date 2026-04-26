# Measurement and signal quality

Use this reference before finalizing conversion events, Advantage+ readiness, bid strategy, or reporting. Meta delivery quality depends heavily on the event stream and the business meaning of that event.

## Core principles

- Pixel alone is usually not durable enough for serious conversion programs. Use Pixel + Conversions API when conversion optimization matters.
- Deduplicate browser and server events with the same `event_id`.
- Use the deepest reliable event with enough volume and acceptable latency.
- Event Match Quality is a diagnostic, not a business KPI. Improve it, but do not treat a score as proof of causal lift.
- Platform CPA/ROAS is an optimization signal, not finance truth.
- Separate click-through, view-through, modeled, new-customer, existing-customer, and incremental views where possible.
- Since Meta's March 2026 attribution update, also separate **engage-through** where available.

---

## Signal stack

| Layer | What to verify | Why it matters |
|---|---|---|
| Pixel | Standard events fire once and on the right pages/actions | Browser signal and event coverage |
| Conversions API | Server events sent with low latency | More durable signal under browser/privacy loss |
| Deduplication | Pixel and CAPI share `event_id` for the same event | Prevents double counting or discarded events |
| Customer parameters | Email, phone, external ID, `fbp`, `fbc`, IP, user agent where policy/consent allow | Improves matching and attribution quality |
| Event semantics | `Purchase`, `Lead`, value, currency, and custom events are consistent | Prevents broken learning and bad comparisons |
| Business feedback | CRM stages, offline sales, refunds, margin, LTV | Aligns optimization with real value |

---

## Event selection

| Business type | Preferred event path | Notes |
|---|---|---|
| E-commerce | Purchase -> profit/value-aware Purchase | Use ATC/IC only as temporary validated proxies |
| Lead gen | Lead -> qualified lead -> opportunity/closed-won | Raw lead volume can be actively harmful |
| SaaS | Signup/trial -> activated user/PQL -> subscription/LTV | Activation and retention matter more than signup count |
| App | Install -> in-app event -> purchase/value | Do not optimize forever to installs |
| Local | Booking/qualified call -> completed job/POS sale | Call handling and service-area quality matter |

### Deepest reliable event rule

Choose the event that best balances value, volume, and latency:

```
Best business event
  ↓ if too sparse or too delayed
Validated proxy event
  ↓ if proxy quality is unproven
Higher-volume event for learning, with explicit quality risk
  ↓ once signal improves
Move back toward the deeper event
```

---

## Event Match Quality

Improve Event Match Quality by sending clean, consented, properly formatted identifiers:

- Hashed email and phone where available.
- `external_id` for logged-in users or CRM records.
- Browser identifiers such as `fbp` and `fbc`.
- IP address and user agent for server events where allowed.
- Consistent names, phone formats, country/state/ZIP fields, and lowercase normalized emails.

Use EMQ as a health target. Avoid hard rules such as "must be 8+" unless the account, implementation, and source warrant it.

---

## Attribution and reporting

| Issue | Recommended stance |
|---|---|
| Click-through conversions | Treat as link-click-driven conversions under the newer attribution model; compare against prior periods carefully if definitions changed |
| Engage-through conversions | Separate from click-through. It can include non-link engagements and 5-second video views followed by conversion within the 1-day window |
| View-through conversions | Keep visible but separate when possible; high VTC share can overstate causal impact |
| Retargeting ROAS | Treat with skepticism until incrementality is tested |
| Advantage+ Sales ROAS | Compare against new-customer rate, business revenue, margin, and incrementality |
| Long consideration cycle | Use longer evaluation windows and CRM/source-of-truth reconciliation |
| API/reporting changes | Verify current Ads Manager/API behavior before relying on a window or metric |

Reporting-tool sources indicate 7-day and 28-day view-through attribution windows were removed from Ads Insights API in January 2026. Treat this as dated API/reporting behavior to verify in the user's stack. Do not claim 28-day click removal unless current official/API evidence confirms it.

### Engage-through attribution

Meta's March 2026 attribution update narrowed click-through attribution toward link clicks and introduced/renamed **engage-through attribution** for social-native interactions. Treat this as an important reporting split:

- Includes likes, reactions, comments, shares, saves, profile/non-link interactions, and engaged video views where available.
- Uses a 1-day window.
- The video engaged-view threshold is reported as 5 seconds, or 97% of video length when the video is shorter than 5 seconds.
- It helps explain discrepancies between Meta, GA4, and backend systems, but it is not the same as a click-based visit.
- For conversion campaigns, report click-through, engage-through, and view-through separately where the account/tool exposes them.

---

## Incrementality

Use incrementality methods when budget and volume allow:

| Method | Best for | Caveat |
|---|---|---|
| Meta Experiments / A/B test | Tactical setup or creative tests | Still platform-run |
| Conversion Lift | Causal read on Meta impact | Requires enough volume and eligibility |
| Geo holdout | Channel/account-level incrementality | Needs stable geo markets and sufficient spend |
| Customer/CRM holdout | Existing-customer or lifecycle campaigns | Requires clean customer lists |
| MMM | Larger programs and cross-channel planning | Needs history and careful modeling |
| Finance reconciliation | Always-on sanity check | Not causal by itself |

Practitioner research such as Haus' Meta incrementality work is useful for setting skepticism around Advantage+ and retargeting, but do not apply its average results as a universal forecast for one account.

---

## Lead-quality loop

For lead generation, define:

| Stage | Example | Use |
|---|---|---|
| Raw lead | Instant Form submit | Volume and front-end CPL |
| Qualified lead | Sales-accepted, MQL, SQL | Better optimization/reporting target |
| Opportunity | Pipeline created | Business quality |
| Closed-won | Revenue | Source of truth |

Operational checks:

- Use Higher Intent forms for high-value leads.
- Add 1-3 qualifying questions when quality matters.
- Sync CRM stages back to Meta when volume and latency allow.
- Monitor speed-to-lead; slow follow-up can make good leads look bad.

---

## Common measurement mistakes

| Mistake | Fix |
|---|---|
| Pixel-only setup for serious conversion spend | Add CAPI and deduplication |
| Optimizing to raw leads forever | Import qualified outcomes or use better form friction |
| Changing `Purchase` value semantics midstream | Keep value definitions stable and document changes |
| Reporting Meta ROAS as finance truth | Reconcile with orders, CRM, POS, margin, and LTV |
| Ignoring existing customers | Define and monitor customer segments |
| Judging before conversion delay passes | Use appropriate windows and stabilization periods |
