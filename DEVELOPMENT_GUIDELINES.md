# Development Guidelines

This file is the entry point for project conventions. Detailed guidance is split into focused documents so contributors can find the right rules quickly.

## Documents

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): design principles, visual consistency, accessibility, styling rules, and reusable UI guidance.
- [ARCHITECTURE.md](ARCHITECTURE.md): folder structure, feature organization, state boundaries, services, and code reuse rules.
- [CONTRIBUTING.md](CONTRIBUTING.md): implementation standards, review checklist, testing expectations, and delivery workflow.

## Current Project Notes

- Stack: React + TypeScript + Vite
- Entry point: `src/main.tsx`
- Flow controller: `src/App.tsx`
- Login screen: `src/pages/AdminLoginPage.tsx`
- Dashboard screen: `src/pages/SalonManagementPage.tsx`
- Global styles: `src/styles.css`
- Development command: `npm run dev`
- Production build command: `npm run build`

As the app grows beyond the current single-screen setup, follow the structure and reuse guidance in the linked documents instead of continuing with a flat `src` layout.
