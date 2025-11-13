# CortexOS Deploy Notes

## Vercel Settings
- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: `.next`

## Required Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Package Scripts
Ensure `package.json` includes:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```
Vercel automatically executes `npm run build` followed by `npm start`.

## Local-Only Processes
- `codex/orchestrator/dispatch.js`
- `codex/orchestrator/oversee.js`
- `codex/orchestrator/watch.js`

Do **not** run these scripts in Vercel. They are intended for local routing and merge simulation only.

## Verification Checklist
1. `npm run lint`
2. `npm run build`
3. Confirm `/app/console` loads boot sequence, orbit map, dashboard, and terminal.
