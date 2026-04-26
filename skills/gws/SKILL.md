---
name: gws
description: "Use for `gws` CLI operations across supported Google Workspace services: Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Meet, Contacts, Chat, Tasks, Keep, and Apps Script. Covers sending email, calendar events, Drive files, spreadsheets, docs, presentations, forms, Meet recordings, contacts, Chat messages, tasks, Keep notes, and Apps Script projects."
---

# Google Workspace CLI (`gws`)

A unified CLI for Google Workspace APIs. Each product is accessed via `gws <service> <command>`.

## Setup

### Installation

The `gws` binary must be on `$PATH`. See the [project repository](https://github.com/googleworkspace/cli) for install options.

### Authentication

```bash
# Browser-based OAuth — use -s to select only the services you need
gws auth login -s gmail,calendar,drive,sheets,docs,forms,slides,chat,tasks,keep

# Read-only OAuth when the task does not need writes
gws auth login --readonly

# Existing credentials file or token
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/credentials.json
export GOOGLE_WORKSPACE_CLI_TOKEN=ya29...
```

Credential priority: `GOOGLE_WORKSPACE_CLI_TOKEN` first, then `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE`, then browser OAuth credentials stored in the gws config directory. For browser OAuth, provide `GOOGLE_WORKSPACE_CLI_CLIENT_ID` and `GOOGLE_WORKSPACE_CLI_CLIENT_SECRET`, or configure them in `~/.config/gws`. Use `gws auth status` to inspect the current auth state without printing secrets.

## CLI Syntax

```bash
gws <service> <resource> [sub-resource] <method> [flags]
```

Helper commands use `+` prefix for common operations:

```bash
gws gmail +send --to alice@example.com --subject 'Hello' --body 'Hi!'
gws calendar +agenda --today
gws sheets +read --spreadsheet ID --range "Sheet1!A1:D10"
```

### Global Flags

| Flag | Description |
|------|-------------|
| `--format <FORMAT>` | Output format: `json` (default), `table`, `yaml`, `csv` |
| `--dry-run` | Validate locally without calling the API |
| `--sanitize <TEMPLATE>` | Screen responses through Model Armor |

### Method Flags

| Flag | Description |
|------|-------------|
| `--params '{"key": "val"}'` | URL/query parameters |
| `--json '{"key": "val"}'` | Request body |
| `-o, --output <PATH>` | Save binary responses to file |
| `--upload <PATH>` | Upload file content (multipart) |
| `--page-all` | Auto-paginate (NDJSON output) |
| `--page-limit <N>` | Max pages when using --page-all (default: 10) |
| `--page-delay <MS>` | Delay between pages in ms (default: 100) |

### Discovering Commands

Before calling any API method, inspect it:

```bash
gws <service> --help                          # Browse resources and methods
gws schema <service>.<resource>.<method>      # Inspect params, types, defaults
```

## Security Rules

- **Never** output secrets (API keys, tokens) directly
- Read-only commands can run directly
- If the user explicitly requested a specific low-risk write (create a draft, append a row, create a note/task/doc/event), execute it after checking target IDs/recipients in the command
- Confirm before high-risk writes: sending external email or Chat messages, changing permissions/sharing, deleting/clearing data, bulk updates, public publishing, or operations affecting many users/files/events
- Prefer `--dry-run` or a concise command preview for destructive, bulk, or ambiguous operations
- Use `--sanitize` for PII/content safety screening

## Shell Tips

- **zsh `!` expansion:** Sheet ranges like `Sheet1!A1` contain `!` which zsh interprets as history expansion. Use double quotes:
  ```bash
  gws sheets +read --spreadsheet ID --range "Sheet1!A1:D10"
  ```
- **JSON with double quotes:** Wrap `--params` and `--json` values in single quotes:
  ```bash
  gws drive files list --params '{"pageSize": 5}'
  ```

## Available Products

Read the relevant reference file when you need detailed API resources, helper command flags, or step-by-step recipes.

| Product | Service | Helpers | Reference |
|---------|---------|---------|-----------|
| **Gmail** | `gws gmail` | `+send` `+read` `+reply` `+reply-all` `+forward` `+triage` `+watch` | [references/gmail.md](references/gmail.md) |
| **Calendar** | `gws calendar` | `+agenda` `+insert` | [references/calendar.md](references/calendar.md) |
| **Drive** | `gws drive` | `+upload` | [references/drive.md](references/drive.md) |
| **Docs** | `gws docs` | `+write` | [references/docs.md](references/docs.md) |
| **Sheets** | `gws sheets` | `+read` `+append` | [references/sheets.md](references/sheets.md) |
| **Slides** | `gws slides` | — | [references/slides.md](references/slides.md) |
| **Forms** | `gws forms` | — | [references/forms.md](references/forms.md) |
| **Meet** | `gws meet` | — | [references/meet.md](references/meet.md) |
| **People** | `gws people` | — | [references/people.md](references/people.md) |
| **Chat** | `gws chat` | `+send` | [references/chat.md](references/chat.md) |
| **Tasks** | `gws tasks` | — | [references/tasks.md](references/tasks.md) |
| **Keep** | `gws keep` | — | [references/keep.md](references/keep.md) |
| **Apps Script** | `gws script` | `+push` | [references/script.md](references/script.md) |

### Cross-Service Workflows

Built-in multi-product commands for common tasks:

| Command | Description |
|---------|-------------|
| `gws workflow +standup-report` | Today's meetings + open tasks |
| `gws workflow +meeting-prep` | Next meeting: agenda, attendees, linked docs |
| `gws workflow +email-to-task` | Convert a Gmail message to a Tasks entry |
| `gws workflow +weekly-digest` | This week's meetings + unread email count |
| `gws workflow +file-announce` | Announce a Drive file in a Chat space |

Details: [references/workflows.md](references/workflows.md)

Each product reference file also includes step-by-step **Recipes** for common multi-step tasks (Gmail filters, batch calendar events, Drive organization, report generation, etc.).
