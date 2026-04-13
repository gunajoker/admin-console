# Contributing Guidelines

## Implementation Standards

- Prefer simple, maintainable solutions over clever shortcuts.
- Name files, components, and functions by purpose.
- Preserve existing screens and flows unless the task explicitly asks to replace them.
- New screens should be added as clearly named page files instead of being embedded into one oversized `App.tsx`.
- Remove dead code instead of commenting it out.
- Keep utility functions small and deterministic.
- Keep components focused and easy to review.

## Forms

- Use controlled or clearly managed form inputs.
- Keep validation logic explicit and close to the form.
- Handle loading, success, and error states deliberately.
- Disable submission only when there is a real UX reason.

## Services And Data Access

- Centralize HTTP logic in service modules.
- Normalize request and response handling patterns.
- Handle errors explicitly and return predictable structures.
- Keep auth, headers, and retry behavior consistent.

## Performance

- Start with straightforward code and optimize only where needed.
- Avoid unnecessary rerenders caused by oversized parent components.
- Defer expensive work until it is actually needed.
- Split code and assets when growth justifies it.

## Testing Expectations

- Test important user flows rather than implementation details.
- Add tests for reusable components with meaningful behavior.
- Cover validation, error states, and service boundaries when introduced.
- Prefer stable tests over brittle snapshot-heavy coverage.

## Review Checklist

Before merging, verify that:

- the implementation matches the intended design
- the UI works on desktop and mobile
- accessibility basics are covered
- code is clearly typed and avoids unnecessary complexity
- repeated patterns were extracted only when justified
- file placement matches the project structure rules
- there is no dead code or unrelated refactoring
- build and tests pass for the affected scope

## Project Commands

- Development: `npm run dev`
- Production build: `npm run build`

## Current Files

- App entry: `src/main.tsx`
- Current screen: `src/App.tsx`
- Global styles: `src/styles.css`

When the project gains more routes or features, update these documents together so architecture, design, and contribution rules stay aligned.
