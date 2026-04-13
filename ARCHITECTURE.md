# Architecture Guidelines

## Goals

- Keep the codebase easy to navigate as features grow.
- Group code by responsibility.
- Separate UI, feature logic, and integration concerns.
- Avoid coupling route-level screens to low-level infrastructure details.

## Recommended Folder Structure

```text
src/
  app/
    providers/
    router/
  components/
    ui/
  features/
    auth/
      components/
      hooks/
      services/
      types/
  pages/
  services/
  styles/
  utils/
  assets/
  main.tsx
```

## Folder Responsibilities

- `app/`: app bootstrap, providers, routing, and global setup.
- `components/ui/`: reusable presentational building blocks shared across features.
- `features/`: domain-specific code grouped by product area such as auth, users, dashboard, or settings.
- `pages/`: route-level screen components.
- `services/`: API clients and integration logic shared across features.
- `styles/`: global styles, tokens, themes, and shared CSS layers.
- `utils/`: framework-light helpers and pure utilities.
- `assets/`: static files such as icons, images, and fonts.

## Naming And Page Structure Rules

- Route-level screen files must be placed under `src/pages/` once the app has more than one screen.
- Name screen files by purpose, for example `AdminLoginPage.tsx` or `SalonManagementPage.tsx`.
- Do not use vague names such as `Homepage.tsx`, `LoginPage.tsx`, or `Page1.tsx` when the screen has a specific product role.
- When adding a new screen, do not replace an existing one unless the change explicitly requires it.
- Prefer a thin `App.tsx` that composes or routes between purpose-named screens.

## Component Structure Rules

- Each component should have one clear responsibility.
- Prefer composition over large monolithic components.
- Break up deeply nested JSX into smaller units when readability drops.
- Keep presentational concerns separate from business logic as complexity grows.

## State Management Rules

- Keep state as local as possible.
- Lift state only when multiple components genuinely need it.
- Derive values instead of duplicating state.
- Use context only for app-level concerns or stable shared state.
- Introduce a state library only when real complexity justifies it.

## Shared Logic Rules

- Put repeated UI-related behavior in hooks.
- Put API and persistence concerns in service modules.
- Keep utilities pure and deterministic.
- Avoid mixing fetch logic directly into presentational components.

## TypeScript Rules

- Keep strict typing enabled.
- Type props and shared models explicitly.
- Avoid `any` unless there is a short-term, intentional reason.
- Prefer narrow, descriptive interfaces.
- Validate external data before relying on its structure.

## Reuse Rules

### Reuse When

- the same UI pattern appears in multiple places
- the same logic repeats across screens or components
- a design primitive is clearly shared across the app

### Do Not Reuse Yet When

- the pattern exists only once
- the abstraction would add more props than clarity
- the component would become generic without a stable use case

## Current Migration Note

The project currently has a flat `src` layout because it contains a single screen. As more screens or shared logic are added, move files into the recommended structure instead of expanding the root of `src` indefinitely.
