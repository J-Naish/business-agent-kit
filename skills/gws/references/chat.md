# Google Chat (`gws chat`)

Manage Chat spaces, members, messages, and media.

## Helper Commands

### +send

Send a plain-text message to a space.

```bash
gws chat +send --space <NAME> --text <TEXT>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--space` | Yes | — | Space name, e.g. `spaces/AAAA...` |
| `--text` | Yes | — | Message text |

```bash
gws chat +send --space spaces/AAAAxxxx --text 'Hello team!'
```

Use `gws chat spaces list` to find space names. For cards, threaded replies, attachments, or updates, use the raw API resources below.

> **Write command** — if the user already specified the space and message, execute after checking the target. Confirm first for external/broad announcements, permission changes, or ambiguous recipients.

---

## API Resources

- **customEmojis**: `create`, `delete`, `get`, `list`
- **media**: `download`, `upload`
- **spaces**: `completeImport`, `create`, `delete`, `findDirectMessage`, `findGroupChats`, `get`, `list`, `patch`, `search`, `setup`
  - **members**: inspect with `gws chat spaces members --help`
  - **messages**: `create`, `delete`, `get`, `list`, `patch`, `update`
    - **attachments**: inspect with `gws chat spaces messages attachments --help`
    - **reactions**: inspect with `gws chat spaces messages reactions --help`
  - **spaceEvents**: inspect with `gws chat spaces spaceEvents --help`
- **users**: `spaces`, `sections`

---

## Examples

```bash
# List spaces visible to the caller
gws chat spaces list --format table

# Get a space
gws chat spaces get --params '{"name": "spaces/AAAAxxxx"}'

# List messages in a space
gws chat spaces messages list --params '{"parent": "spaces/AAAAxxxx"}' --format table

# Create a basic message through the raw API
gws chat spaces messages create --params '{"parent": "spaces/AAAAxxxx"}' --json '{"text": "Hello team!"}'
```

---

## Recipes

### Announce a File

1. Ensure recipients can access the file: `gws drive permissions create --params '{"fileId": "FILE_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "team@company.com"}'`
2. Send the link: `gws chat +send --space spaces/AAAAxxxx --text 'New file: https://drive.google.com/file/d/FILE_ID/view'`

### Find a Direct Message Space

1. Search: `gws chat spaces findDirectMessage --params '{"name": "users/person@example.com"}'`
2. Send: `gws chat +send --space spaces/DM_SPACE --text 'Quick update...'`

### Review Recent Space Messages

1. List spaces: `gws chat spaces list --format table`
2. List messages: `gws chat spaces messages list --params '{"parent": "spaces/AAAAxxxx", "pageSize": 20}' --format table`
3. Get one message: `gws chat spaces messages get --params '{"name": "spaces/AAAAxxxx/messages/MESSAGE_ID"}'`
