# server/

Server-only modules: server actions, services, data loaders, and route handlers that should never run on the client.

Guidelines:
- Use this for shared server logic not tied to a single feature.
- Feature-specific server code should live in `src/features/<feature>/server`.
- Use `export const dynamic = 'force-dynamic'` where needed for Next.js server actions.