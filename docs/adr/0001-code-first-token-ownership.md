# ADR-0001: Code-first token ownership

- Status: Accepted
- Date: 2026-11-05

## Context

PrimeNG themes can be customised through SCSS, CSS variable overrides, component
styles, or a preset. Using more than one source of truth makes values drift and
upgrades unpredictable.

## Decision

All design values live in code: a single `definePreset(Aura, …)` in
`projects/sat-prime/theme`, exported as `satPreset`. Do not add SCSS token files
or a parallel CSS-variable theme layer. Wrapper-local variables
(`--sat-field-gap`, `--sat-dot-size`) are allowed only for values that PrimeNG
does not own.

## Consequences

- One place to change values; one place to review on upgrade.
- Token paths are untyped (`definePreset` accepts arbitrary keys), so every
  overridden token needs a resolution test (ADR-0004).
- Component `css` inside the preset is the escape hatch for what tokens cannot
  express.
