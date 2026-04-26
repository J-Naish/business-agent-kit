# Gmail (`gws gmail`)

Send, read, and manage email.

## Table of Contents

- [Helper Commands](#helper-commands)
  - [+send](#send)
  - [+read](#read)
  - [+reply](#reply)
  - [+reply-all](#reply-all)
  - [+forward](#forward)
  - [+triage](#triage)
  - [+watch](#watch)
- [API Resources](#api-resources)

---

## Helper Commands

### +send

Send an email.

```bash
gws gmail +send --to <EMAILS> --subject <SUBJECT> --body <TEXT>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--to` | Yes | — | Recipient email(s), comma-separated |
| `--subject` | Yes | — | Email subject |
| `--body` | Yes | — | Email body (plain text, or HTML with --html) |
| `--from` | — | — | Sender address (send-as alias) |
| `--cc` | — | — | CC email(s), comma-separated |
| `--bcc` | — | — | BCC email(s), comma-separated |
| `--attach` | — | — | File attachment (repeatable, 25MB total limit) |
| `--html` | — | — | Treat --body as HTML (use fragment tags, no wrapper needed) |
| `--draft` | — | — | Save as draft instead of sending |
| `--dry-run` | — | — | Preview without executing |

```bash
gws gmail +send --to alice@example.com --subject 'Hello' --body 'Hi Alice!'
gws gmail +send --to alice@example.com --subject 'Report' --body 'See attached' -a report.pdf
gws gmail +send --to alice@example.com --subject 'Hello' --body '<b>Bold</b>' --html
gws gmail +send --to alice@example.com --subject 'Hello' --body 'Hi!' --draft
```

> **Write command** — use `--draft` or `--dry-run` for previews. Confirm before sending external email unless the user explicitly provided recipients, subject, and body and asked to send.

---

### +read

Read a message and extract its body or headers.

```bash
gws gmail +read --id <ID>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--id` | Yes | — | Gmail message ID |
| `--headers` | — | — | Include headers (From, To, Subject, Date) |
| `--format` | — | text | Output format (text, json) |
| `--html` | — | — | Return HTML body instead of plain text |

```bash
gws gmail +read --id 18f1a2b3c4d
gws gmail +read --id 18f1a2b3c4d --headers
gws gmail +read --id 18f1a2b3c4d --format json | jq '.body'
```

Automatically converts HTML-only messages to plain text and handles multipart/base64 decoding.

---

### +reply

Reply to a message (handles threading automatically).

```bash
gws gmail +reply --message-id <ID> --body <TEXT>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--message-id` | Yes | — | Gmail message ID to reply to |
| `--body` | Yes | — | Reply body |
| `--from` | — | — | Sender address (send-as alias) |
| `--to` | — | — | Additional To recipients |
| `--cc` | — | — | CC recipients |
| `--bcc` | — | — | BCC recipients |
| `--attach` | — | — | File attachment (repeatable) |
| `--html` | — | — | HTML mode |
| `--draft` | — | — | Save as draft |

Automatically sets In-Reply-To, References, and threadId. Quotes the original message.

> **Write command** — if the user already specified the message and reply body, execute after checking the target recipients. Confirm first when replying to multiple or external recipients.

---

### +reply-all

Reply-all to a message (handles threading automatically).

```bash
gws gmail +reply-all --message-id <ID> --body <TEXT>
```

Same flags as `+reply`, plus:

| Flag | Description |
|------|-------------|
| `--remove` | Exclude recipients from reply (comma-separated emails) |

Replies to sender and all original To/CC recipients. Fails if no To recipient remains after exclusions.

> **Write command** — if the user already specified the message and reply body, execute after checking the recipient set. Confirm first when replying to many or external recipients.

---

### +forward

Forward a message to new recipients.

```bash
gws gmail +forward --message-id <ID> --to <EMAILS>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--message-id` | Yes | — | Gmail message ID |
| `--to` | Yes | — | Recipient email(s) |
| `--from` | — | — | Sender address (send-as alias) |
| `--body` | — | — | Optional note above forwarded message |
| `--no-original-attachments` | — | — | Exclude original attachments |
| `--attach` | — | — | Extra file attachments |
| `--cc` | — | — | CC recipients |
| `--bcc` | — | — | BCC recipients |
| `--html` | — | — | HTML mode |
| `--draft` | — | — | Save as draft |

```bash
gws gmail +forward --message-id 18f1a2b3c4d --to dave@example.com
gws gmail +forward --message-id 18f1a2b3c4d --to dave@example.com --body 'FYI see below'
```

> **Write command** — if the user already specified the message and forwarding recipients, execute after checking the target. Confirm first for external recipients or sensitive content.

---

### +triage

Show unread inbox summary (sender, subject, date).

```bash
gws gmail +triage
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--max` | — | 20 | Maximum messages |
| `--query` | — | is:unread | Gmail search query |
| `--labels` | — | — | Include label names |

```bash
gws gmail +triage
gws gmail +triage --max 5 --query 'from:boss'
gws gmail +triage --labels --format table
```

Read-only. Defaults to table output.

---

### +watch

Watch for new emails and stream them as NDJSON.

```bash
gws gmail +watch
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--project` | — | — | GCP project ID for Pub/Sub |
| `--subscription` | — | — | Existing Pub/Sub subscription (skip setup) |
| `--topic` | — | — | Existing Pub/Sub topic |
| `--label-ids` | — | — | Filter by label IDs (e.g., INBOX,UNREAD) |
| `--max-messages` | — | 10 | Max messages per pull batch |
| `--poll-interval` | — | 5 | Seconds between pulls |
| `--msg-format` | — | full | Message format: full, metadata, minimal, raw |
| `--once` | — | — | Pull once and exit |
| `--cleanup` | — | — | Delete Pub/Sub resources on exit |
| `--output-dir` | — | — | Write each message to a separate JSON file |

Gmail watch expires after 7 days — re-run to renew. Ctrl-C to stop.

---

## API Resources

### users

- `getProfile`, `stop`, `watch`
- **drafts**: `create`, `delete`, `get`, `list`, `send`, `update`
- **history**: `list`
- **labels**: `create`, `delete`, `get`, `list`, `patch`, `update`
- **messages**: `batchDelete`, `batchModify`, `delete`, `get`, `import`, `insert`, `list`, `modify`, `send`, `trash`, `untrash`
  - **attachments**: `get`
- **settings**: `getAutoForwarding`, `getImap`, `getLanguage`, `getPop`, `getVacation`, `updateAutoForwarding`, `updateImap`, `updateLanguage`, `updatePop`, `updateVacation`
  - **cse**: identity/keypair management
  - **delegates**: `create`, `delete`, `get`, `list`
  - **filters**: `create`, `delete`, `get`, `list`
  - **forwardingAddresses**: `create`, `delete`, `get`, `list`
  - **sendAs**: `create`, `delete`, `get`, `list`, `patch`, `update`, `verify`
    - **smimeInfo**: `delete`, `get`, `insert`, `list`, `setDefault`
- **threads**: `delete`, `get`, `list`, `modify`, `trash`, `untrash`

---

## Recipes

### Create a Gmail Filter

Automatically label, star, or categorize incoming messages.

1. List existing labels: `gws gmail users labels list --params '{"userId": "me"}' --format table`
2. Create a new label: `gws gmail users labels create --params '{"userId": "me"}' --json '{"name": "Receipts"}'`
3. Create a filter: `gws gmail users settings filters create --params '{"userId": "me"}' --json '{"criteria": {"from": "receipts@example.com"}, "action": {"addLabelIds": ["LABEL_ID"], "removeLabelIds": ["INBOX"]}}'`
4. Verify: `gws gmail users settings filters list --params '{"userId": "me"}' --format table`

### Set Up Vacation Responder

1. Enable: `gws gmail users settings updateVacation --params '{"userId": "me"}' --json '{"enableAutoReply": true, "responseSubject": "Out of Office", "responseBodyPlainText": "I am out of the office until Jan 20. For urgent matters, contact backup@company.com.", "restrictToContacts": false, "restrictToDomain": false}'`
2. Verify: `gws gmail users settings getVacation --params '{"userId": "me"}'`
3. Disable when back: `gws gmail users settings updateVacation --params '{"userId": "me"}' --json '{"enableAutoReply": false}'`

### Label and Archive Emails

1. Search: `gws gmail users messages list --params '{"userId": "me", "q": "from:notifications@service.com"}' --format table`
2. Apply label: `gws gmail users messages modify --params '{"userId": "me", "id": "MSG_ID"}' --json '{"addLabelIds": ["LABEL_ID"]}'`
3. Archive: `gws gmail users messages modify --params '{"userId": "me", "id": "MSG_ID"}' --json '{"removeLabelIds": ["INBOX"]}'`

### Forward Labeled Emails

1. Find: `gws gmail users messages list --params '{"userId": "me", "q": "label:needs-review"}' --format table`
2. Read: `gws gmail +read --id MSG_ID`
3. Forward: `gws gmail +forward --message-id MSG_ID --to manager@company.com`

### Save Email Attachments to Drive

1. Search: `gws gmail users messages list --params '{"userId": "me", "q": "has:attachment from:client@example.com"}' --format table`
2. Get message: `gws gmail users messages get --params '{"userId": "me", "id": "MSG_ID"}'`
3. Download attachment: `gws gmail users messages attachments get --params '{"userId": "me", "messageId": "MSG_ID", "id": "ATTACHMENT_ID"}'`
4. Upload: `gws drive +upload ./attachment.pdf --parent FOLDER_ID`

### Save Email to Doc

1. Find message: `gws gmail +triage --query 'subject:important from:boss@company.com'`
2. Read: `gws gmail +read --id MSG_ID`
3. Create doc: `gws docs documents create --json '{"title": "Saved Email - Important Update"}'`
4. Write body: `gws docs +write --document DOC_ID --text '...'`
