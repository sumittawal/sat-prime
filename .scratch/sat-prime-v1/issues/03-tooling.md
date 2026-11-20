# 03 — Tooling: Storybook, Playwright, axe

Type: task
Status: resolved
Blocked by: 01

## Goal

A local demo/docs environment and the automated visual/a11y harness.

## Scope

- `ng add @storybook/angular` (Storybook 10.6.5+).
- `.storybook/preview.ts`: `provideSatUI()`, light/dark toolbar, backgrounds.
- Playwright configured to run against the built Storybook.
- `@axe-core/playwright` integrated; one check per story.
- npm scripts: `storybook`, `build-storybook`, `test:visual`, `test:a11y`.

## Acceptance

- [ ] `npm run storybook` serves stories with live reload.
- [ ] Autodocs enabled for every story (`tags: ['autodocs']`).
- [ ] Visual snapshots run in light and dark.
- [ ] axe reports no serious/critical violations on the seed story.
