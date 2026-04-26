# Google Meet (`gws meet`)

Manage Google Meet conferences.

## API Resources

- **conferenceRecords**: `get`, `list`
  - **participants**: `get`, `list`
    - **participantSessions**: `get`, `list`
  - **recordings**: `get`, `list`
  - **smartNotes**: `get`, `list`
  - **transcripts**: `get`, `list`
    - **entries**: `get`, `list`
- **spaces**: `create`, `endActiveConference`, `get`, `patch`

## Examples

```bash
# Create a meeting space
gws meet spaces create --json '{"config": {"accessType": "OPEN"}}'

# List recent conferences
gws meet conferenceRecords list --format table

# List participants
gws meet conferenceRecords participants list --params '{"parent": "conferenceRecords/CONF_ID"}' --format table
```

---

## Recipes

### Create Meet Space and Share Link

1. Create: `gws meet spaces create --json '{"config": {"accessType": "OPEN"}}'`
2. Get URI from response
3. Email: `gws gmail +send --to team@company.com --subject 'Join the meeting' --body 'Join here: MEETING_URI'`

### Review Meet Attendance

1. List conferences: `gws meet conferenceRecords list --format table`
2. List participants: `gws meet conferenceRecords participants list --params '{"parent": "conferenceRecords/CONF_ID"}' --format table`
3. Get session details: `gws meet conferenceRecords participants participantSessions list --params '{"parent": "conferenceRecords/CONF_ID/participants/PARTICIPANT_ID"}' --format table`
