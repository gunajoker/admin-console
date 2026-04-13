# Design System Guidelines

## Principles

### Match The Design First

- Build from the approved Figma design before adding enhancements.
- Preserve hierarchy, spacing, typography, and color relationships.
- Extend incomplete designs in the same visual language instead of inventing a conflicting pattern.

### Consistency Over Novelty

- Reuse the same spacing rhythm, border radius scale, shadows, and interaction patterns.
- Buttons, inputs, cards, and form states should feel like one system.
- Avoid near-duplicate component variants unless there is a product requirement.

### Clarity Over Decoration

- Visual effects must support readability and hierarchy.
- Gradients, blur, glow, and shadows should reinforce content instead of distracting from it.
- Labels, button text, and feedback states must remain immediately legible.

### Responsive By Default

- Build layouts that work on desktop and mobile from the start.
- Prefer flexible widths and resilient spacing.
- Avoid hardcoded layouts that fail at smaller breakpoints.

### Accessibility Is Required

- Use semantic HTML first.
- Inputs must have labels.
- Focus states must be visible.
- Text and controls must preserve usable contrast.
- Keyboard navigation must work without special-case hacks.

## Styling Rules

- Follow one styling approach consistently.
- Use shared design tokens when values start repeating.
- Keep global styles limited to reset, tokens, typography, and app-wide layout concerns.
- Prefer component-scoped selectors over broad selectors.
- Avoid selector chains that are hard to override.

## Token Categories

Create and reuse tokens for:

- colors
- typography sizes and weights
- spacing scale
- radius scale
- shadow scale
- motion durations and easing

## Component Visual Standards

- Keep interactive states defined for hover, focus, active, disabled, loading, and error when relevant.
- Variants should map to real design states, not speculative possibilities.
- Do not expose open-ended styling props unless there is a strong reason.
- Prefer a small, predictable component API.

## Reusable UI Rules

- Extract a reusable UI component when the same pattern appears in multiple places.
- Do not generalize on first use unless the component is clearly a core primitive.
- Prefer foundational building blocks such as buttons, inputs, cards, labels, and layout primitives.
- Keep reusable components visually consistent across pages.
