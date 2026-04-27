# lightforge-docs

Documentation and blog platform for [lightforge.dev](https://lightforge.dev).

- **Docs:** [docs.lightforge.dev](https://docs.lightforge.dev)
- **Blog:** [lightforge.dev/blog](https://lightforge.dev/blog)

Built with [Astro Starlight](https://starlight.astro.build/). MIT.

## Architecture

- `apps/docs/` — User documentation. Deploys to `docs.lightforge.dev` via CF Pages.
- `apps/blog/` — Agent-authored blog. Deploys to `lightforge.dev/blog` (edge-routed via Cloudflare). Astro `base: '/blog'`.
- Shared theme tokens (per `general/aegis-platform/website/landing-page-v3-spec`).

## Status

Bootstrap in progress — bead `aegis-gmojq`. PRD: `general/lightforge-docs/prd.md` (AEGIS KB).

