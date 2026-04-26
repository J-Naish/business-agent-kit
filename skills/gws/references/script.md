# Google Apps Script (`gws script`)

Manage Google Apps Script projects.

## Helper Commands

### +push

Upload local files to an Apps Script project.

```bash
gws script +push --script <ID>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--script` | Yes | — | Script Project ID |
| `--dir` | — | — | Directory containing script files (defaults to cwd) |

```bash
gws script +push --script SCRIPT_ID
gws script +push --script SCRIPT_ID --dir ./src
```

Supports .gs, .js, .html, and appsscript.json. Skips hidden files and node_modules. Replaces ALL files in the project.

> **High-risk write command** — confirm before executing because it replaces all files in the Apps Script project.

---

## API Resources

- **processes**: `list`, `listScriptProcesses`
- **projects**: `create`, `get`, `getContent`, `getMetrics`, `updateContent`
  - **deployments**: `create`, `delete`, `get`, `list`, `update`
  - **versions**: `create`, `get`, `list`
- **scripts**: `run`
