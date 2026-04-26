# Google Sheets (`gws sheets`)

Read and write spreadsheets.

## Helper Commands

### +read

Read values from a spreadsheet.

```bash
gws sheets +read --spreadsheet <ID> --range <RANGE>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--spreadsheet` | Yes | — | Spreadsheet ID |
| `--range` | Yes | — | Range in A1 notation (e.g. `Sheet1!A1:D10`) |

```bash
gws sheets +read --spreadsheet ID --range "Sheet1!A1:D10"
gws sheets +read --spreadsheet ID --range Sheet1
```

Read-only.

---

### +append

Append a row to a spreadsheet.

```bash
gws sheets +append --spreadsheet <ID>
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--spreadsheet` | Yes | — | Spreadsheet ID |
| `--values` | — | — | Comma-separated values (simple strings) |
| `--json-values` | — | — | JSON array of rows, e.g. `'[["a","b"],["c","d"]]'` |
| `--range` | — | A1 | Target range to select a specific tab |

```bash
gws sheets +append --spreadsheet ID --values 'Alice,100,true'
gws sheets +append --spreadsheet ID --json-values '[["a","b"],["c","d"]]'
gws sheets +append --spreadsheet ID --range "Sheet2!A1" --values 'Alice,100'
```

> **Write command** — if the user already specified the spreadsheet/range and values, execute after checking the target. Confirm first for bulk updates, clears, overwrites, or ambiguous ranges.

---

## API Resources

- **spreadsheets**: `batchUpdate`, `create`, `get`, `getByDataFilter`
  - **developerMetadata**: `get`, `search`
  - **sheets**: `copyTo`
  - **values**: `append`, `batchClear`, `batchGet`, `batchGetByDataFilter`, `batchUpdate`, `batchUpdateByDataFilter`, `clear`, `get`, `update`

---

## Recipes

### Backup Sheet as CSV

1. Read values: `gws sheets +read --spreadsheet SHEET_ID --range Sheet1 --format csv`
2. Or export via Drive: `gws drive files export --params '{"fileId": "SHEET_ID", "mimeType": "text/csv"}'`

### Compare Sheet Tabs

1. Read tab 1: `gws sheets +read --spreadsheet SHEET_ID --range "January!A1:D"`
2. Read tab 2: `gws sheets +read --spreadsheet SHEET_ID --range "February!A1:D"`
3. Compare the data

### Copy Sheet for New Month

1. Get details: `gws sheets spreadsheets get --params '{"spreadsheetId": "SHEET_ID"}'`
2. Copy tab: `gws sheets spreadsheets sheets copyTo --params '{"spreadsheetId": "SHEET_ID", "sheetId": 0}' --json '{"destinationSpreadsheetId": "SHEET_ID"}'`
3. Rename: `gws sheets spreadsheets batchUpdate --params '{"spreadsheetId": "SHEET_ID"}' --json '{"requests": [{"updateSheetProperties": {"properties": {"sheetId": 123, "title": "February 2025"}, "fields": "title"}}]}'`

### Create Expense Tracker

1. Create spreadsheet: `gws drive files create --json '{"name": "Expense Tracker 2025", "mimeType": "application/vnd.google-apps.spreadsheet"}'`
2. Add headers: `gws sheets +append --spreadsheet SHEET_ID --values 'Date,Category,Description,Amount'`
3. Add entry: `gws sheets +append --spreadsheet SHEET_ID --values '2025-01-15,Travel,Flight to NYC,450.00'`

### Log Deal Update

1. Find sheet: `gws drive files list --params '{"q": "name = '\''Sales Pipeline'\'' and mimeType = '\''application/vnd.google-apps.spreadsheet'\''"}'`
2. Read: `gws sheets +read --spreadsheet SHEET_ID --range "Pipeline!A1:F"`
3. Append: `gws sheets +append --spreadsheet SHEET_ID --range Pipeline --values '2024-03-15,Acme Corp,Proposal Sent,$50000,Q2,jdoe'`

### Create Events from Sheet

1. Read data: `gws sheets +read --spreadsheet SHEET_ID --range "Events!A2:D"`
2. For each row: `gws calendar +insert --summary '...' --start ... --end ... --attendee ...`

### Generate Report from Sheet Data

1. Read data: `gws sheets +read --spreadsheet SHEET_ID --range "Sales!A1:D"`
2. Create doc: `gws docs documents create --json '{"title": "Sales Report - January 2025"}'`
3. Write report: `gws docs +write --document DOC_ID --text '...'`
4. Share: `gws drive permissions create --params '{"fileId": "DOC_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "cfo@company.com"}'`
