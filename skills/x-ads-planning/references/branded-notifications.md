# Branded Notifications

Branded Notifications let people opt in to receive future messages from a brand at moments that matter.

Spec source: X Branded Notifications product page (https://business.x.com/en/advertising/branded-notifications). Last verified: 2026-04.

## Availability

Branded Notifications are eligibility-gated and operationally heavier than standard ads.

- Available to managed advertisers in the US and Canada, and globally for advertisers working with X Next.
- Requires a public, verified X account.
- Configured and launched through **Arrow**, a third-party autoresponse platform by IC Group in collaboration with X Next.
- Requires granting Arrow access to the brand handle through X OAuth.
- Verify current market, account, X Next, and approval requirements before building the plan around this feature.

## Best Uses

- Product drops.
- Ticket sales.
- Episode releases.
- Event reminders.
- Limited-time offers.
- Sequential storytelling.

## Flow

```text
Promoted CTA post
  -> User opts in by engaging
  -> Arrow listens for opt-ins via X APIs
  -> Automated @mention notification post
  -> Follow-up content or conversion destination
```

## Campaign Formats

| Format | Use |
|---|---|
| Scheduled Notifications | Instant opt-in notification plus one scheduled notification |
| Subscription Notifications | Instant opt-in notification plus multiple scheduled notifications |
| Instant Notifications | Instant notification after opt-in |

## Planning Inputs

| Input | Why it matters |
|---|---|
| Trigger moment | The notification must have a reason to exist |
| Opt-in message | Determines participation quality |
| Follow-up content | Must deliver on the promise |
| Timing | Too early or too late reduces value |
| Measurement | Track opt-ins, notification engagement, and downstream actions |

## Creative Practices

- Make the opt-in value explicit.
- Use concise copy.
- Avoid overusing reminders.
- Match the notification to a real moment: launch, reveal, sale, livestream, release.

## Measurement

Use opt-in rate, notification engagement, click-through, conversion rate, and incremental lift where possible. X Ads Manager provides full metrics for promoted CTA posts, but notification-post reporting can be limited. Users' device and account notification settings can prevent notification posts from appearing.

## Diagnosis

| Symptom | Likely cause | Response |
|---|---|---|
| Low opt-in rate | Reminder value is unclear | Make the moment and payoff explicit |
| Opt-ins but weak follow-through | Notification timing or content misses the promise | Tighten schedule and destination relevance |
| Reporting gap | Notification post metrics are limited | Plan CTA-post metrics, downstream UTMs, and lift/proxy reads upfront |

## Operating Cadence

- Confirm Arrow, OAuth, verified account, and X Next/account-team access before selling the idea internally.
- Lock schedule, copy, and approval workflow early.
- Review notification performance together with downstream business metrics, not only opt-ins.
