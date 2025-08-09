# features/

Domain-first organization for app modules. Co-locate UI, hooks, server actions, and types by feature.

Conventions:
- Each feature exports a public API via an `index.ts` barrel.
- Co-locate UI under `components/`, hooks under `hooks/`, and server-only logic under `server/`.
- Keep cross-feature utilities in `src/lib/`.

Example structure:

```
features/
  feedback/
    components/
      FeedbackModal.tsx
      FeedbackList.tsx
    hooks/
      useFeedback.ts (future)
    server/
      actions.ts (future)
    types.ts (future)
    index.ts (future exports)
```