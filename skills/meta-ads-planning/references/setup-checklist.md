# Meta setup implementation checklist

Use this reference when the plan needs to become an implementation checklist. Strategy, structure, Advantage+, measurement, and creative decisions live in their dedicated references; this file covers setup tasks and launch QA.

## 1. Business and account setup

1. Confirm the business portfolio in Meta Business Suite / Business Manager.
2. Connect the Facebook Page and Instagram account.
3. Confirm ad account time zone, currency, payment method, business purpose, and access roles.
4. Confirm domain ownership and destination access for any website campaigns.
5. Confirm catalog ownership and Commerce Manager access for product/catalog campaigns.
6. Confirm app ownership, app IDs, store URLs, SDK/MMP access, and deep-link ownership for app campaigns.
7. Confirm WhatsApp Business, Messenger, or Instagram Direct ownership for click-to-message campaigns.

## 2. Measurement setup

1. Install Meta Pixel directly, through GTM, through a partner integration, or through the platform's native integration.
2. Implement Conversions API alongside Pixel when conversion optimization matters.
3. Configure browser/server deduplication with the same event name and event ID for the same event.
4. Send value and currency consistently for revenue events.
5. Send consented matching parameters where allowed: hashed email, hashed phone, external ID, `fbp`, `fbc`, IP address, and user agent.
6. Check Events Manager diagnostics, Event Match Quality, deduplication, event latency, value/currency consistency, and event volume before scaling.
7. For app campaigns, confirm SDK or MMP integration, app events, SKAN/AAK requirements, and CAPI for App Events where relevant.
8. For CRM/offline programs, confirm lead/order IDs, stage mapping, upload cadence, and backend reconciliation.

## 3. Audience implementation

| Audience type | Setup check |
|---|---|
| Broad audience | Limit to real constraints such as geography, language, age, and compliance. Avoid narrow interest stacks unless the objective playbook calls for it. |
| Custom Audience | Build from website, app, customer list, engagement, video, Instant Form, or CRM sources. Confirm size and retention windows. |
| Exclusions | Use customer, purchaser, lead, employee, invalid geography, or other hard business exclusions where current UI and policy allow. |
| Advantage+ Audience | Treat inclusions as suggestions unless the UI marks them as controls. Verify hard controls in current UI. |
| Special Ad Categories | Check `policy-and-special-categories.md` before building audiences or forms. |

## 4. Campaign and ad setup QA

| Area | Check |
|---|---|
| Objective | Matches the business outcome and selected playbook. |
| Conversion location | Website, app, Instant Form, calls, messaging, catalog, or offline path is correct. |
| Performance goal | Uses the deepest reliable event with enough volume and acceptable latency. |
| Budget | Can support expected learning volume without fragmenting signal. |
| Bid strategy | Starts from observed economics; strict targets are not used before volume is stable. |
| Placements | Advantage+ Placements by default unless evidence or policy requires exclusions. |
| Creative | Enough distinct concepts and placement-fit assets are loaded. |
| Destination | Landing page, form, store page, catalog, checkout, or message flow matches the ad promise. |
| Tracking | Pixel/CAPI/app/CRM events fire once, deduplicate correctly, and pass required values. |
| Policy | Category, claims, form fields, disclaimers, and landing page pass review risk checks. |

## 5. Ad setup details

- Start with 3-5 distinct creative concepts per test wave when budget can support it.
- Mix image, video, carousel, catalog-led, and form/message formats only when each format has a clear role.
- Adapt aspect ratio and composition to placements instead of relying on automatic cropping.
- Use Advantage+ Creative only after reviewing brand fit, text overlays, product edges, and regulated-category risk.
- Use Flexible Ad Format when several compatible assets exist and output quality can be monitored.

| Element | Recommended length | Quantity |
|---|---:|---:|
| Primary text | Up to 125 characters before truncation risk | 3-5 variants |
| Headline | Up to 27 characters before truncation risk | 3-5 variants |
| Description | Usually 25-30 characters; may not show on all placements | 1-3 variants |
| CTA | Choose from Meta's preset buttons | 1 |

## 6. Launch QA

Before publishing, verify:

1. Naming follows the account convention.
2. Campaign/ad set/ad statuses are correct.
3. Budget and schedule are intentional.
4. Attribution setting is documented.
5. Required exclusions and Special Ad Category settings are applied.
6. Form privacy policy, disclaimers, webhook/CRM routing, and lead delivery are working.
7. Catalog products are eligible, in stock, correctly priced, and matched to event content IDs.
8. App campaigns have deep links, store links, app events, and MMP/SKAN/AAK requirements configured.
9. Test Events or equivalent diagnostics confirm the conversion path.
10. The first-week monitoring plan is written before launch.
