# Google Drive (`gws drive`)

Manage files, folders, and shared drives.

## Helper Commands

### +upload

Upload a file with automatic metadata.

```bash
gws drive +upload <file>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `<file>` | Yes | — | Path to file |
| `--parent` | — | — | Parent folder ID |
| `--name` | — | — | Target filename (defaults to source filename) |

```bash
gws drive +upload ./report.pdf
gws drive +upload ./report.pdf --parent FOLDER_ID
gws drive +upload ./data.csv --name 'Sales Data.csv'
```

MIME type is detected automatically.

> **Write command** — if the user already specified the local file and destination, execute after checking the target. Confirm first for sharing/permission changes, deletes, moves, or bulk operations.

---

## API Resources

- **about**: `get`
- **accessproposals**: `get`, `list`, `resolve`
- **apps**: `get`, `list`
- **changes**: `getStartPageToken`, `list`, `watch`
- **channels**: `stop`
- **comments**: `create`, `delete`, `get`, `list`, `update`
- **drives**: `create`, `get`, `hide`, `list`, `unhide`, `update`
- **files**: `copy`, `create`, `download`, `export`, `generateIds`, `get`, `list`, `listLabels`, `modifyLabels`, `update`, `watch`
- **operations**: `get`
- **permissions**: `create`, `delete`, `get`, `list`, `update`
- **replies**: `create`, `delete`, `get`, `list`, `update`
- **revisions**: `delete`, `get`, `list`, `update`

---

## Recipes

### Bulk Download Folder

1. List files: `gws drive files list --params '{"q": "'\''FOLDER_ID'\'' in parents"}' --format json`
2. Download each: `gws drive files get --params '{"fileId": "FILE_ID", "alt": "media"}' -o filename.ext`
3. Export Google Docs as PDF: `gws drive files export --params '{"fileId": "FILE_ID", "mimeType": "application/pdf"}' -o document.pdf`

### Create Shared Drive

1. Create: `gws drive drives create --params '{"requestId": "unique-id"}' --json '{"name": "Project X"}'`
2. Add member: `gws drive permissions create --params '{"fileId": "DRIVE_ID", "supportsAllDrives": true}' --json '{"role": "writer", "type": "user", "emailAddress": "member@company.com"}'`

### Organize Drive Folder

1. Create folder: `gws drive files create --json '{"name": "Q2 Project", "mimeType": "application/vnd.google-apps.folder"}'`
2. Create sub-folders: `gws drive files create --json '{"name": "Documents", "mimeType": "application/vnd.google-apps.folder", "parents": ["PARENT_ID"]}'`
3. Move files: `gws drive files update --params '{"fileId": "FILE_ID", "addParents": "FOLDER_ID", "removeParents": "OLD_PARENT"}'`
4. Verify: `gws drive files list --params '{"q": "FOLDER_ID in parents"}' --format table`

### Find Large Files

1. List by size: `gws drive files list --params '{"orderBy": "quotaBytesUsed desc", "pageSize": 20, "fields": "files(id,name,size,mimeType,owners)"}' --format table`

### Share Folder with Team

1. Find folder: `gws drive files list --params '{"q": "name = '\''Project X'\'' and mimeType = '\''application/vnd.google-apps.folder'\''"}'`
2. Share as editor: `gws drive permissions create --params '{"fileId": "FOLDER_ID"}' --json '{"role": "writer", "type": "user", "emailAddress": "colleague@company.com"}'`
3. Share as viewer: `gws drive permissions create --params '{"fileId": "FOLDER_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "stakeholder@company.com"}'`
4. Verify: `gws drive permissions list --params '{"fileId": "FOLDER_ID"}' --format table`

### Email a Drive File Link

1. Find file: `gws drive files list --params '{"q": "name = '\''Quarterly Report'\''"}'`
2. Share: `gws drive permissions create --params '{"fileId": "FILE_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "client@example.com"}'`
3. Email: `gws gmail +send --to client@example.com --subject 'Quarterly Report' --body 'Report link: https://docs.google.com/document/d/FILE_ID'`
