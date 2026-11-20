# 05 — satPreset and provideSatUI

Type: task
Status: resolved
Blocked by: 04

## Goal

The published theme surface.

## Scope

- `satPreset = definePreset(Aura, …)`.
- DataTable delta via component `css`: `padding-block: 6px` on
  `.p-datatable .p-datatable-tbody > tr > td`; `10px` under `.p-datatable-lg`;
  `sm` untouched.
- Toast delta via component `css`: `.p-toast-message { border-left-width: 3px }`;
  other edges keep 1px; severity colours unchanged.
- Aura defaults everywhere else, light and dark.
- `provideSatUI()` wraps `providePrimeNG` with `preset`, `darkModeSelector`,
  ripple, and defaults.
- Resolution tests for each override (`$dt` / computed values).

## Acceptance

- [ ] `satPreset` and `provideSatUI()` exported from `sat-prime/theme`.
- [ ] Body-cell vertical padding is 6px / 10px (lg) in a rendered table.
- [ ] Toast left border is 3px and severity colour is unchanged.
- [ ] Tests fail if a token path or component selector silently stops applying.
