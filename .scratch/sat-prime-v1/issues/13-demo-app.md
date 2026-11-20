# 13 — SatPrimeDemo app

Type: task
Status: ready-for-agent
Blocked by: 01

## Goal

A full-page integration preview next to Storybook.

## Scope

- `SatPrimeDemo` is the Angular project key; folder is `projects/sat-prime-demo`.
- Routes/sections: Field, Confirm, Toast (including countdown), Table.
- Import library code via the workspace path aliases.
- Light/dark toggle wired to `provideSatUI()`.
- Never published.

## Acceptance

- [ ] `npm run start` serves the demo.
- [ ] Each section exercises the real component, not a copy.
- [ ] Countdown demonstrates on/off and per-message opt-in.
- [ ] Table shows normal/small/large side by side.
