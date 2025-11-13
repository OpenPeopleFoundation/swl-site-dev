# Task Dispatcher v1

## Purpose
Convert ANY natural-language user request into a routed task for the correct agent.

## Steps
1. Read user request.
2. Compare against trigger sets defined in each agent's `agent.md`.
3. Score each agent according to relevance.
4. Choose top-scoring agent.
5. Create task file in:

```
/codex/agents/<agent_name>/tasks/task_<timestamp>.md
```

6. Await agent output in its `output/` folder.
7. When output appears, automatically move it to `/codex/queue`.

## File Format

### Task file structure
```
# Task
<user request>

# Routed To
<agent_name>

# Expected Output
<PATCH / CONTENT / SQL / COMPONENT>

# Notes
<system notes>
```
