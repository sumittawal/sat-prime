# 04 — Shell tokens

Type: task
Status: resolved
Blocked by: 01

## Goal

Library-owned variables for values PrimeNG does not own.

## Scope

- `--sat-dot-size: 8px`.
- `--sat-field-gap` for the label-to-control spacing.
- No spacing-token overrides: Aura is already on 2px multiples.
- Document that these live outside the preset.

## Acceptance

- [ ] Tokens are declared once and consumed by `SatLabel`/`SatField`.
- [ ] No duplicated literal values in component styles.
- [ ] Light and dark render identically (they are colour-neutral).
