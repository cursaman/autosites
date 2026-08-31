<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AutoSites project rules

## Product direction

- This repository is a Codex-operated public website, not a customer-facing website builder SaaS.
- The core workflow is: user request → Codex edit → automated verification → GitHub `main` push → Vercel production deployment → live verification.
- Do not reintroduce sign-up, billing, dashboard, database, or customer editor features unless the user explicitly changes the product direction.

## Sources of truth

- Website copy and section data: `src/content/site-content.ts`
- Design tokens: `src/styles/design-tokens.css`
- Homepage structure and scoped styles: `src/app/page.tsx`, `src/app/home.module.css`
- Release target: `deployment-target.json`
- Detailed workflow: `CODEX_WORKFLOW.md`
- Request template: `홈페이지 수정 요청 양식.md`

## Change rules

- Preserve the current warm ivory, deep green, editorial design system unless the request explicitly changes the brand direction.
- Make the smallest coherent change that satisfies the request; preserve unrelated user work and working routes.
- Use `next/image` with meaningful Korean alt text for content images. Keep mobile, keyboard, and reduced-motion behavior working.
- Never commit secrets, tokens, `.env` files, Vercel IDs, or Supabase credentials.
- Treat `autosites-jd3d` and `https://autosites-jd3d.vercel.app` as the only production target.
- Do not delete or deploy the duplicate Vercel project `autosites` without explicit user approval.

## Required delivery sequence

1. Inspect the request, relevant files, and `git status`.
2. Implement the requested content, design, image, or feature change.
3. Run `npm run verify`. Do not commit or push when it fails.
4. Review the diff and commit only the intended files.
5. Push the verified commit to `origin/main` unless the user explicitly requests local-only work.
6. Wait for the `autosites-jd3d` production deployment to reach `READY`.
7. Run `npm run deployment:status` and verify the changed content at the production URL.
8. Report the production URL, commit SHA, checks, and any remaining warning.

## Safety and rollback

- Prefer `git revert <sha>` for production rollback. Never rewrite shared `main` history or force-push.
- Ask before deleting projects, domains, deployments, databases, or other hosted resources.
- A task is not complete when GitHub is updated but production is still queued, building, failed, or showing stale content.
