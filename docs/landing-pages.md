# Landing pages on Cloudflare: status

Written 2026-10-02. Covers moving the three AEGIS landing pages (`/`, `/connect`, `/platform`) off Phoenix onto Cloudflare Pages, the same way the blog is hosted.

## Who serves what on lightforge.dev

| Path | Served by | How |
|---|---|---|
| `/`, `/connect`, `/platform`, `/lp/*` (GET, HEAD) | Cloudflare Pages project `lightforge-landing` | Snippet `landing_proxy` |
| `/blog/*` | Cloudflare Pages project `lightforge-blog` | Snippet `blog_proxy` (strips `/blog`) |
| everything else (`/auth/sign-in`, `/contact`, `/api`, the app) | Phoenix on Fly (`aegis-platform-prod`) | zone DNS, proxied |
| `docs.lightforge.dev` | Cloudflare Pages project `lightforge-docs` | custom domain |

Both proxies are Cloudflare Snippets (Rules > Snippets), not Worker routes or Origin Rules. A snippet fetches the Pages project and returns it. Snippet rules are saved as one list (`cf snippets rules update` replaces all of them), so every update must include `blog_proxy` as well.

`dev.lightforge.dev` still serves the Phoenix landing pages.

## What was done

**Landing hosting**
- `mix landing.snapshot` (in `aegis-v3-prototype`) renders the three pages with no server or database, strips the LiveView parts, and writes static HTML plus hashed CSS and JS. Every rewrite is anchored on exact markup and fails loudly if it changes.
- The Pages project `lightforge-landing` was created and the snapshot deployed (deployment `b55effcf`).
- Snippet `landing_proxy` went live on 2026-10-01 21:39Z. The pages were checked on lightforge.dev at 1440 and 390 px wide: same page heights as the LiveView pages, scripts running, no console errors, theme toggle and form validation working.
- The pages keep the Phoenix theme setting (`aegis-theme`), so the light/dark choice carries over.

**Copy and nav**
- Grammar pass on the landing copy and a plain "Blog" link in the header, menu and footer.

**Blog and docs**
- The blog and docs use the Connect sign-in "drawing sheet" look, the LightForge wordmark, and a Blog-only header nav (`lightforge-docs` #8, merged and deployed).

| PR | Repo | State |
|---|---|---|
| #8 v3 style for blog and docs | lightforge-docs | merged |
| #9 Astro 7, Starlight 0.42 (`npm audit` clean) | lightforge-docs | open |
| #3293 landing grammar pass | aegis-api-phoenix | open |
| #3291 Blog link on the Phoenix landing | aegis-api-phoenix | open |
| #17 copy + `mix landing.snapshot` | aegis-v3-prototype | open (its CI needs the `DEPS_READ_TOKEN` secret) |

## Updating the pages

```bash
# in aegis-v3-prototype
mix landing.snapshot --out dist/landing [--turnstile-site-key KEY]
export CLOUDFLARE_ACCOUNT_ID=bc8bc61a9d4c7e85faf5ae61c0010556
wrangler pages deploy dist/landing --project-name lightforge-landing --branch main
```

Rollback: save the current list with `cf snippets rules list`, then `cf snippets rules update --rules @file.json` with only the `blog_proxy` rule. Phoenix serves the pages again immediately.

## Pending

1. **"Talk to us" does not send.** The form posts to `/api/public/contact`, which does not exist. Visitors see "We couldn't send your message. Email us at info@lightforge.dev instead." The Phoenix app that would host it (`aegis-platform-prod`) is stopped on purpose. Options:
   - a Pages Function or Worker that checks Turnstile and sends the email (recommended: no Phoenix needed; needs a mail path);
   - the endpoint on `aegis-company-platform`, called cross-origin (needs CORS and a CSRF-free route);
   - a plain `mailto:` link until one of those exists.
2. **Turnstile is not set up.** Needs a widget (site key and secret). The snapshot adds the widget only when given a site key.
3. **Sign in goes to a 503.** `/auth/sign-in` is served by the stopped Phoenix prod app. Decide where it should point while that app is off.
4. **No CI for the landing deploy.** Updates are manual (above). Needs a workflow with the Cloudflare secrets; the prototype repo has neither those nor `DEPS_READ_TOKEN`.
5. **Where the snapshot tool lives.** It is in `aegis-v3-prototype`, which is slated to be archived. Move it before then.
6. **Copy items that need an owner** (they add or reorder claims): explain "desk and floor" sooner and lead with value before "agentic OS"; add a plain-English outcome line to the Connect sandbox section; reach accountability sooner in "Run your agents like members of your team"; differentiate "Run them side by side".
7. **Edge details not yet checked:** the zone rule bypasses edge caching for `lightforge.dev` (the static pages are not edge-cached; add an exception for `/lp/*`); security headers and CSP parity with Phoenix; `www.lightforge.dev` points straight at Fly and is not covered.
8. **Docs home links to `/platform/`** on `docs.lightforge.dev`, which does not exist. The page now lives at `lightforge.dev/platform`.
9. **Merge order.** #3291 and #3293 only matter for the Phoenix dev/staging pages now; #17 is the source of the live pages.
