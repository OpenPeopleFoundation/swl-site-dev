# Runtime Safety Guards

## Non-Negotiable Rules
- No agent may write into /app or /src.
- No agent may modify existing files.
- No agent may delete files.
- No agent may propose patches that alter shared code paths.
- All patches must be additive, component-based, or migration-based.
- All JSON must be validated before merging.
- All SQL must be dry-run checked.
- No agent may trigger side effects.

## Overseer Rejection Matrix
Reject immediately if:
- The patch touches an existing file path.
- Unsafe keywords found: DELETE, DROP, MV, RENAME.
- Agent attempts to cross scopes.
- Agent-generated TypeScript errors exceed 0.
