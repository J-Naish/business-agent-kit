# Google People / Contacts (`gws people`)

Manage contacts and profiles.

## API Resources

- **contactGroups**: `batchGet`, `create`, `delete`, `get`, `list`, `update`
  - **members**: `modify`
- **otherContacts**: `copyOtherContactToMyContactsGroup`, `list`, `search`
- **people**: `batchCreateContacts`, `batchUpdateContacts`, `createContact`, `deleteContactPhoto`, `get`, `getBatchGet`, `listDirectoryPeople`, `searchContacts`, `searchDirectoryPeople`, `updateContact`, `updateContactPhoto`
  - **connections**: `list`

## Examples

```bash
# Search contacts
gws people people searchContacts --params '{"query": "Alice", "readMask": "names,emailAddresses"}'

# List directory people
gws people people listDirectoryPeople --params '{"readMask": "names,emailAddresses", "sources": ["DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE"], "pageSize": 100}' --format table
```

---

## Recipes

### Sync Contacts to Sheet

1. List contacts: `gws people people listDirectoryPeople --params '{"readMask": "names,emailAddresses,phoneNumbers", "sources": ["DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE"], "pageSize": 100}' --format json`
2. Add headers: `gws sheets +append --spreadsheet SHEET_ID --range Contacts --values 'Name,Email,Phone'`
3. Append each: `gws sheets +append --spreadsheet SHEET_ID --range Contacts --values 'Jane Doe,jane@company.com,+1-555-0100'`
