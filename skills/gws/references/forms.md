# Google Forms (`gws forms`)

Read and write Google Forms.

## API Resources

- **forms**: `batchUpdate`, `create`, `get`, `setPublishSettings`
  - **responses**: `get`, `list`
  - **watches**: `create`, `delete`, `list`, `renew`

## Examples

```bash
# Create a form
gws forms forms create --json '{"info": {"title": "Event Feedback", "documentTitle": "Event Feedback Form"}}'

# List responses
gws forms forms responses list --params '{"formId": "FORM_ID"}' --format table
```

---

## Recipes

### Create and Share Feedback Form

1. Create: `gws forms forms create --json '{"info": {"title": "Event Feedback", "documentTitle": "Event Feedback Form"}}'`
2. Get form URL from response (responderUri)
3. Email: `gws gmail +send --to attendees@company.com --subject 'Please share your feedback' --body 'Fill out the form: FORM_URL'`

### Collect Form Responses

1. List forms (if ID unknown): `gws forms forms list`
2. Get form details: `gws forms forms get --params '{"formId": "FORM_ID"}'`
3. Get responses: `gws forms forms responses list --params '{"formId": "FORM_ID"}' --format table`
