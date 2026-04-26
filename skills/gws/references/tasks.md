# Google Tasks (`gws tasks`)

Manage task lists and tasks.

## API Resources

- **tasklists**: `delete`, `get`, `insert`, `list`, `patch`, `update`
- **tasks**: `clear`, `delete`, `get`, `insert`, `list`, `move`, `patch`, `update`

---

## Examples

```bash
# List task lists
gws tasks tasklists list --format table

# Create a task list
gws tasks tasklists insert --json '{"title": "Project X"}'

# List tasks in a task list
gws tasks tasks list --params '{"tasklist": "TASKLIST_ID"}' --format table

# Create a task
gws tasks tasks insert --params '{"tasklist": "TASKLIST_ID"}' --json '{"title": "Follow up with Alice", "notes": "Send the revised brief."}'
```

---

## Notes

- Assigned tasks from Docs or Chat Spaces are not returned by default.
- Tasks assigned from Docs or Chat Spaces cannot be inserted from the Tasks API; create them from the assignment surface.
- Deleting an assigned task from Tasks can delete both the assigned task and the original task in Docs or Chat Spaces.
- `tasks clear` hides completed tasks from the selected list rather than permanently deleting every completed task.

> **Write/delete commands** — if the user already specified the list and task content, `insert` can run after checking the target. Confirm first for `clear`, `delete`, bulk moves, or ambiguous updates.

---

## Recipes

### Create a Project Task List

1. Create list: `gws tasks tasklists insert --json '{"title": "Project X"}'`
2. Add first task: `gws tasks tasks insert --params '{"tasklist": "TASKLIST_ID"}' --json '{"title": "Draft plan", "notes": "Owner: Alice"}'`
3. Verify: `gws tasks tasks list --params '{"tasklist": "TASKLIST_ID"}' --format table`

### Convert Meeting Follow-Ups to Tasks

1. Read meeting details: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`
2. Create tasks: `gws tasks tasks insert --params '{"tasklist": "TASKLIST_ID"}' --json '{"title": "Follow up: ACTION_ITEM"}'`

### Clean Up Completed Tasks

1. Review list: `gws tasks tasks list --params '{"tasklist": "TASKLIST_ID", "showCompleted": true}' --format table`
2. Clear completed: `gws tasks tasks clear --params '{"tasklist": "TASKLIST_ID"}'`
