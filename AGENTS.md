# AGENTS.md

Working notes for agents and humans in this repo. Read this before changing code.

## What this is

`sat-prime` is an internal-only (not published) Angular 22 library that layers a small, opinionated
surface over PrimeNG 22 + `@primeuix/themes` (Aura preset). It is not a
replacement for PrimeNG and does not wrap components that tokens already cover.

One workspace, two projects:

- `projects/sat-prime` — the library (internal-only, see ADR-0005)
- `projects/sat-prime-demo` — `SatPrimeDemo`, a local integration demo (never published)

Public entry points:

- `sat-prime/theme` — `satPreset`, `provideSatUI()`
- `sat-prime/ui` — `SatLabel`, `SatInputText`, `SatTextarea`, `SatPassword`,
  `SatInputMask`, `SatSelect`, `SatMultiSelect`, `SatAutoComplete`, `SatDatePicker`,
  `SatInputNumber`, `SatCascadeSelect`, `SatTreeSelect`, `SatConfirmDialog`, `SatConfirmation`,
  `SatToastMessage`, `SatToastService`

The `sat-prime` root entry point is intentionally empty. ng-packagr cannot
re-export secondary entry points from the primary entry point, so imports use
the subpaths above.

## Commands

Node 24 LTS is required (Angular 22 needs >= 22.22.3). `.nvmrc` pins it.

```bash
nvm use                 # Node 24
npm install
npm run build:lib       # ng build sat-prime (all entry points)
npm run start           # ng serve SatPrimeDemo
npm run test            # unit tests (Vitest via @angular/build:unit-test)
npm run storybook       # component demos + docs (added in SP-03)
```

There is no `ng serve` for a library. Use Storybook for component-level work and
`SatPrimeDemo` for full-page integration.

## Design rules

- **Code-first tokens.** Theme values live in `definePreset` in
  `projects/sat-prime/theme`. Do not create SCSS token files as a parallel
  source of truth.
- **Wrappers need a reason.** Add a wrapper only for a real gap that tokens
  cannot express. Spacing, Toast and DataTable visual changes are token or
  component-`css` overrides, not new components.
- **Extend controls by subclassing.** Enhance a PrimeNG control with one `Sat*`
  subclass per control (ADR-0006), never a wrapper that hides its API.
- **Never own the model.** Sat* controls must not implement
  `ControlValueAccessor` themselves or read `NgControl`; they inherit PrimeNG's.
- **No form-API coupling.** Library code must not import Signal Forms. Stories
  and tests may exercise Signal Forms, `ngModel`, and `formControlName`.
- **Use the Angular CLI for Angular artifacts.** `ng generate
  component|directive|service|library|application`. Only write files by hand when
  no generator exists (preset, provider function, manifests, docs, stories).
- **No private seams.** No `::ng-deep`, no `document.querySelector`, no
  monkey-patching PrimeNG internals.
- **Upgrade guardrails.** Keep Angular/PrimeNG peer ranges narrow
  (`>=22.1.4 <23`). Every overridden token gets a resolution test. See ADR-0004.

## Repo layout

```
projects/sat-prime/
  src/public-api.ts          primary entry point (intentionally empty)
  theme/                     secondary entry point: sat-prime/theme
  ui/                        secondary entry point: sat-prime/ui
projects/sat-prime-demo/     SatPrimeDemo app
docs/adr/                    architecture decisions
docs/design/deltas.md        design intake + supplied values
docs/agents/                 agent workflow configuration
.scratch/sat-prime-v1/       spec + local-markdown tickets
```

## Agent skills

### Issue tracker

Issues and specs live as local markdown under `.scratch/sat-prime-v1/`. See
`docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`,
`ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` plus `docs/adr/` at the repo root. See
`docs/agents/domain.md`.
