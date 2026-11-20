# ADR-0004: Upgrade guardrails

- Status: Accepted
- Date: 2026-11-05

## Context

The library sits on fast-moving dependencies (Angular, PrimeNG,
`@primeuix/themes`) and customises them through seams that are not always
type-checked: preset token names, component `css` selectors, and PrimeNG DOM
classes used by the custom toast template.

## Decision

- Pin peer ranges narrowly: Angular and PrimeNG `>=22.1.4 <23`,
  `@primeuix/themes` `^3.1`. Upgrading a major is an explicit, tested change.
- Every overridden token has a unit test that resolves the preset and asserts the
  computed value (tokens fail silently otherwise).
- The custom toast template uses published `ToastClasses` constants, never
  string literals, and has a visual contract story.
- Table cell vertical padding uses `padding-block` in component `css`, not the
  `bodyCell.padding` shorthand, so horizontal padding stays token-driven.
- Visual snapshots (light/dark) and axe run on every story in CI.

## Consequences

- Upgrades fail loudly in tests instead of silently losing styling.
- A small amount of extra test code per override.
- If PrimeNG removes a seam, the failure is isolated to one wrapper or one token
  block.
- Subclassed PrimeNG controls (ADR-0006) each have an integrity test for the
  re-declared providers and host directives.
