# SuperSites Hub

Nuxt 4 public catalog for the SuperSites portfolio.

## Sprint 1.1 scope

- Root and localized catalog routes: `/`, `/en`, `/pt-br`, `/es`, `/fr`, `/de`.
- Localized site detail routes: `/<locale>/sites/<slug>`.
- Search and category filtering on the catalog home.
- Canonical, viewport and hreflang metadata for the transitional `/supersites` public base.
- Static prerender route list for the catalog and ten site detail pages.

## Local

```powershell
pnpm install
pnpm --filter @supersites/supersite dev
```

## Validation

```powershell
pnpm --filter @supersites/supersite test
pnpm --filter @supersites/supersite build
pwsh -NoProfile -ExecutionPolicy Bypass -File ..\..\scripts\validate-supersite-preview.ps1
```

When manually previewing the built server, run it from this app directory so `.output/public` assets are served correctly:

```powershell
$env:HOST = "127.0.0.1"
$env:PORT = "3001"
node .output/server/index.mjs
```
