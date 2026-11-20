# Spec: sat-prime v1

Status: ready
Owner: Sumit Tawal
Created: 2026-11-05

## Goal

Ship an internal-only Angular 22 library that adds a small, opinionated surface
over PrimeNG 22 + `@primeuix/themes` (Aura): a preset, a field projection shell
with an optional label dot, a confirmation wrapper with typed helpers, and a
toast wrapper with an optional countdown ring.

## Stack (verified)

| Package | Version | Notes |
| --- | --- | --- |
| Angular | 22.2.4 (workspace installed 22.2.x) | Node 24.22.2 via `.nvmrc` |
| PrimeNG | 22.1.4 | peers `@angular/* ^22.1.0` |
| `@primeuix/themes` | 3.1.0 | Aura |
| `@angular/cdk` | 22.2.6 | PrimeNG peer |
| Storybook | 10.6.5 | added in SP-03 |
| Vitest | 5.x | `@angular/build:unit-test` |
| Playwright + axe | latest | added in SP-03 |

## Locked decisions

| Area | Decision |
| --- | --- |
| Scope | Aura only (v1); preset API leaves room for other presets |
| Shape | Preset tokens + opt-in wrappers only for real gaps |
| Source of truth | Code (`definePreset`) |
| Repo | Angular CLI workspace; one publishable library with secondary entry points |
| Prefix | `sat-`; package `sat-prime` (unscoped, npm-available) |
| Forms | Projection shell; Signal Forms, `ngModel`, Reactive Forms all work |
| Dot | 8px, optional, `success` / `info` / `warning` / `neutral` |
| Design deltas | Supplied directly; see `docs/design/deltas.md` |
| Docs / QA | Storybook + Vitest + Playwright visual + axe |

## Public API

```
sat-prime/theme  → satPreset, provideSatUI()
sat-prime/ui     → SatField, SatLabel, SatConfirmDialog, SatConfirmation,
                   SatToast, SatToastService
```

The primary `sat-prime` entry point is intentionally empty: ng-packagr cannot
re-export secondary entry points from the primary without breaking `rootDir`.
Consumers import the subpaths.

### Theme

- `satPreset = definePreset(Aura, …)`:
  - no spacing overrides (Aura values are already 2px multiples),
  - DataTable body-cell vertical padding via component `css`: `6px` normal,
    `10px` at `.p-datatable-lg`; `sm` untouched,
  - Toast left border `3px` via component `css`, other edges 1px, severity
    colours unchanged.
- `provideSatUI()` wraps `providePrimeNG` with `preset`, `darkModeSelector`,
  ripple, and defaults.
- Shell tokens: `--sat-field-gap`, `--sat-dot-size: 8px`.

### Field

- `SatLabel` directive: standalone on any `<label>`; inputs `[dot]` (boolean,
  default false) and `[dotTone]` (`success | info | warning | neutral`, default
  `neutral`); prepends an `aria-hidden` dot.
- `SatField` component: `label`, `hint`, `error`, `required`, `dot`, `dotTone`;
  projects the real PrimeNG control; no CVA, no model ownership.
- Stories: InputText, Select, DatePicker × Signal Forms / `ngModel` × required /
  error / every dot tone.

### Confirm dialog

- `SatConfirmDialog` wraps `p-confirmdialog`.
- `SatConfirmation`: `success()`, `info()`, `warning()`, `danger()` mapping to
  `acceptButtonProps.severity` (`success|info|warn|danger`), default icons and
  labels, `key` support.
- Stories: all four tones, keyboard, axe.

### Toast

- `SatToast` wraps `p-toast` with a custom message template (`pTemplate="message"`).
- Inputs mirror `p-toast`: `key`, `position`, `life`, `mode`, plus
  `[countdown]` (default false).
- Per-message opt-in with `data: { countdown: true }`; ring duration is
  `message.life ?? toast.life`; `sticky`/no life means no ring.
- Ring: top-right, immediately left of the close button, ~1.25rem, 2px stroke,
  `currentColor`, `aria-hidden`, pauses on hover/focus, disabled under
  `prefers-reduced-motion`.
- `SatToastService`: `success/info/warn/error`, `show()`, `clear()`; delegates to
  PrimeNG `MessageService`; typed `SatToastMessage` extends `ToastMessageOptions`.
- Custom template uses published `ToastClasses` constants and keeps parity for
  `icon`, `closable`, `styleClass`, `contentStyleClass`.

## Upgrade guardrails

See ADR-0004. In short: narrow peer ranges, a resolution test per overridden
token, `ToastClasses` constants instead of strings, `padding-block` for the table
vertical delta, and visual/axe coverage per story.

## Delivery phases / tickets

`issues/01` … `issues/14`. Critical path: 01 → 04 → 05 → 08 → 10 → 12.
Field path: 04 → 06 → 07. Toast path: 05 → 14.

## Non-goals

- Replacing PrimeNG components that tokens already cover.
- Supporting non-Aura presets in v1.
- Publishing `SatPrimeDemo`.
- Figma API integration.

## Risks

- Preset token paths are untyped; silent drift is mitigated by resolution tests.
- PrimeNG may change its toast template context or DOM classes; isolated to
  `SatToast` and guarded by a visual contract story.
- Storybook major upgrades may lag Angular; dev-only, not shipped.
