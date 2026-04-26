# Google Calendar (`gws calendar`)

Manage calendars and events.

## Helper Commands

### +agenda

Show upcoming events across all calendars.

```bash
gws calendar +agenda
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--today` | — | — | Show today's events |
| `--tomorrow` | — | — | Show tomorrow's events |
| `--week` | — | — | Show this week's events |
| `--days` | — | — | Number of days ahead |
| `--calendar` | — | — | Filter to specific calendar name or ID |
| `--timezone` | — | — | IANA timezone override (e.g. America/Denver) |

```bash
gws calendar +agenda --today
gws calendar +agenda --week --format table
gws calendar +agenda --days 3 --calendar 'Work'
```

Read-only. Queries all calendars by default.

---

### +insert

Create a new event.

```bash
gws calendar +insert --summary <TEXT> --start <TIME> --end <TIME>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--calendar` | — | primary | Calendar ID |
| `--summary` | Yes | — | Event title |
| `--start` | Yes | — | Start time (ISO 8601, e.g. 2026-06-17T09:00:00-07:00) |
| `--end` | Yes | — | End time (ISO 8601) |
| `--location` | — | — | Event location |
| `--description` | — | — | Event description |
| `--attendee` | — | — | Attendee email (repeatable) |
| `--meet` | — | — | Add a Google Meet link |

```bash
gws calendar +insert --summary 'Standup' --start '2026-06-17T09:00:00-07:00' --end '2026-06-17T09:30:00-07:00'
gws calendar +insert --summary 'Review' --start ... --end ... --attendee alice@example.com --meet
```

> **Write command** — if the user already specified the calendar, time, and attendees, execute after checking the target. Confirm first for invites to other people, recurring events, bulk changes, or deletes.

---

## API Resources

- **acl**: `delete`, `get`, `insert`, `list`, `patch`, `update`, `watch`
- **calendarList**: `delete`, `get`, `insert`, `list`, `patch`, `update`, `watch`
- **calendars**: `clear`, `delete`, `get`, `insert`, `patch`, `update`
- **channels**: `stop`
- **colors**: `get`
- **events**: `delete`, `get`, `import`, `insert`, `instances`, `list`, `move`, `patch`, `quickAdd`, `update`, `watch`
- **freebusy**: `query`
- **settings**: `get`, `list`, `watch`

---

## Recipes

### Block Focus Time

1. Create recurring block: `gws calendar events insert --params '{"calendarId": "primary"}' --json '{"summary": "Focus Time", "description": "Protected deep work block", "start": {"dateTime": "2025-01-20T09:00:00", "timeZone": "America/New_York"}, "end": {"dateTime": "2025-01-20T11:00:00", "timeZone": "America/New_York"}, "recurrence": ["RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"], "transparency": "opaque"}'`
2. Verify: `gws calendar +agenda`

### Find Free Time Across Calendars

1. Query: `gws calendar freebusy query --json '{"timeMin": "2024-03-18T08:00:00Z", "timeMax": "2024-03-18T18:00:00Z", "items": [{"id": "user1@company.com"}, {"id": "user2@company.com"}]}'`
2. Find overlapping free slots
3. Create event: `gws calendar +insert --summary 'Meeting' --attendee user1@company.com --attendee user2@company.com --start ... --end ...`

### Reschedule a Meeting

1. Find event: `gws calendar +agenda`
2. Get details: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`
3. Update: `gws calendar events patch --params '{"calendarId": "primary", "eventId": "EVENT_ID", "sendUpdates": "all"}' --json '{"start": {"dateTime": "2025-01-22T14:00:00", "timeZone": "America/New_York"}, "end": {"dateTime": "2025-01-22T15:00:00", "timeZone": "America/New_York"}}'`

### Schedule Recurring Event

1. Create: `gws calendar events insert --params '{"calendarId": "primary"}' --json '{"summary": "Weekly Standup", "start": {"dateTime": "2024-03-18T09:00:00", "timeZone": "America/New_York"}, "end": {"dateTime": "2024-03-18T09:30:00", "timeZone": "America/New_York"}, "recurrence": ["RRULE:FREQ=WEEKLY;BYDAY=MO"], "attendees": [{"email": "team@company.com"}]}'`
2. Verify: `gws calendar +agenda --days 14 --format table`

### Plan Weekly Schedule

1. Check week: `gws calendar +agenda --week`
2. Check free/busy: `gws calendar freebusy query --json '{"timeMin": "...", "timeMax": "...", "items": [{"id": "primary"}]}'`
3. Add events: `gws calendar +insert --summary 'Deep Work Block' --start ... --end ...`

### Share Event Materials with Attendees

1. Get attendees: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`
2. Share file with each: `gws drive permissions create --params '{"fileId": "FILE_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "attendee@company.com"}'`
