# Google Keep (`gws keep`)

Manage Google Keep notes in enterprise environments.

## API Resources

- **media**: `download`
- **notes**: `create`, `delete`, `get`, `list`
  - **permissions**: inspect with `gws keep notes permissions --help`

---

## Examples

```bash
# List notes
gws keep notes list --format table

# Get a note
gws keep notes get --params '{"name": "notes/NOTE_ID"}'

# Create a note
gws keep notes create --json '{"title": "Meeting notes", "body": {"text": {"text": "Discuss launch timeline."}}}'
```

---

## Notes

- Keep API access is intended for enterprise environments.
- Deleting a note requires the caller to have the `OWNER` role.
- Deleting a note is immediate and cannot be undone; collaborators lose access.
- Use pagination fields from `notes list` responses when there are more results.

> **Write/delete commands** — if the user already specified the note content, `create` can run after checking the target. Confirm first for `delete` or permission changes.

---

## Recipes

### Capture a Meeting Note

1. Create note: `gws keep notes create --json '{"title": "Meeting: Project X", "body": {"text": {"text": "Decisions:\n- ...\nActions:\n- ..."}}}'`
2. Verify: `gws keep notes list --format table`

### Export Notes for Review

1. List notes: `gws keep notes list --format json`
2. Get a note: `gws keep notes get --params '{"name": "notes/NOTE_ID"}'`
3. Write summary elsewhere if needed: `gws docs +write --document DOC_ID --text '...'`
