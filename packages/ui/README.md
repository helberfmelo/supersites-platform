# UI

Shared design system, components and tokens.

## Sprint 1.3 baseline

- `designTokens`: colors, spacing, radius, typography and interaction targets.
- `componentRecipes`: class contracts for buttons, cards, language switchers and status badges.
- `getStatusBadgeClass`: maps shared product status values to reusable badge tones.
- `createCssVariableMap`: flattens tokens into CSS custom properties for later theming.

Run:

```powershell
pnpm --filter @supersites/ui test
pnpm --filter @supersites/ui typecheck
```
