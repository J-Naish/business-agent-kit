# Google Docs (`gws docs`)

Read and write Google Docs.

## Helper Commands

### +write

Append text to a document.

```bash
gws docs +write --document <ID> --text <TEXT>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--document` | Yes | — | Document ID |
| `--text` | Yes | — | Text to append (plain text) |

```bash
gws docs +write --document DOC_ID --text 'Hello, world!'
```

Text is inserted at the end of the document body. For rich formatting, use the raw `batchUpdate` API.

> **Write command** — if the user already specified the document and text, execute after checking the target. Confirm first for large edits, template overwrites, or sharing/permission changes.

---

## API Resources

- **documents**: `batchUpdate`, `create`, `get`

---

## Recipes

### Create Doc from Template

1. Copy template: `gws drive files copy --params '{"fileId": "TEMPLATE_DOC_ID"}' --json '{"name": "Project Brief - Q2 Launch"}'`
2. Add content: `gws docs +write --document NEW_DOC_ID --text '## Project: Q2 Launch ...'`
3. Share: `gws drive permissions create --params '{"fileId": "NEW_DOC_ID"}' --json '{"role": "writer", "type": "user", "emailAddress": "team@company.com"}'`

### Draft Email from Doc

1. Get doc: `gws docs documents get --params '{"documentId": "DOC_ID"}'`
2. Send: `gws gmail +send --to recipient@example.com --subject 'Newsletter Update' --body 'CONTENT_FROM_DOC'`

### Share Doc and Notify

1. Share: `gws drive permissions create --params '{"fileId": "DOC_ID"}' --json '{"role": "writer", "type": "user", "emailAddress": "reviewer@company.com"}'`
2. Email: `gws gmail +send --to reviewer@company.com --subject 'Please review: Project Brief' --body 'Link: https://docs.google.com/document/d/DOC_ID'`
