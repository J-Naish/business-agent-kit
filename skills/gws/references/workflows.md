# Cross-Service Workflows (`gws workflow`)

Built-in commands that combine multiple Workspace products for common tasks.

## +standup-report

Today's meetings + open tasks as a standup summary.

```bash
gws workflow +standup-report
gws workflow +standup-report --format table
```

Combines calendar agenda (today) with tasks list. Read-only.

---

## +meeting-prep

Prepare for your next meeting: agenda, attendees, and linked docs.

```bash
gws workflow +meeting-prep
gws workflow +meeting-prep --calendar Work
```

| Flag | Default | Description |
|------|---------|-------------|
| `--calendar` | primary | Calendar ID |
| `--format` | json | Output format: json, table, yaml, csv |

Shows the next upcoming event with attendees and description. Read-only.

---

## +email-to-task

Convert a Gmail message into a Google Tasks entry.

```bash
gws workflow +email-to-task --message-id <ID>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--message-id` | Yes | — | Gmail message ID |
| `--tasklist` | — | @default | Task list ID |

Reads the email subject as task title and snippet as notes.

> **Write command** — if the user already specified the message/task target, execute after checking the target. Confirm first when recipients, destination list, or side effects are ambiguous.

---

## +weekly-digest

Weekly summary: this week's meetings + unread email count.

```bash
gws workflow +weekly-digest
gws workflow +weekly-digest --format table
```

Combines calendar agenda (week) with gmail triage summary. Read-only.

---

## +file-announce

Announce a Drive file in a Chat space.

```bash
gws workflow +file-announce --file-id <ID> --space <SPACE>
```

| Flag | Required | Description |
|------|----------|-------------|
| `--file-id` | Yes | Drive file ID |
| `--space` | Yes | Chat space name (e.g. spaces/ABC123) |
| `--message` | — | Custom announcement message |
| `--format` | json | Output format: json, table, yaml, csv |

Fetches the file name from Drive to build the announcement.

> **Write command** — if the user already specified the file and Chat space, execute after checking the target. Confirm first for external/broad announcements or permission changes.
