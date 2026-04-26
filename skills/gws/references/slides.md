# Google Slides (`gws slides`)

Read and write presentations.

## API Resources

- **presentations**: `batchUpdate`, `create`, `get`
  - **pages**: `get`, `getThumbnail`

## Examples

```bash
# Create a presentation
gws slides presentations create --json '{"title": "Quarterly Review Q2"}'

# Get presentation metadata
gws slides presentations get --params '{"presentationId": "PRES_ID"}'
```

---

## Recipes

### Create Presentation

1. Create: `gws slides presentations create --json '{"title": "Quarterly Review Q2"}'`
2. Share: `gws drive permissions create --params '{"fileId": "PRES_ID"}' --json '{"role": "writer", "type": "user", "emailAddress": "team@company.com"}'`
