# 06 — SatLabel directive

Type: task
Status: resolved
Blocked by: 04

## Goal

An optional decorative dot on any label, without owning form state.

## Scope

- `ng generate directive ui/field/sat-label`.
- Inputs: `[dot]` boolean (default false), `[dotTone]` =
  `success | info | warning | neutral` (default `neutral`).
- Dot is 8px, `aria-hidden`, rendered before label text.
- Works standalone on `<label>` for Checkbox, Radio, and Toggle.
- Unit tests for each tone and for no-dot.

## Acceptance

- [ ] `dot` unset/false renders no dot.
- [ ] `dot` true with no tone renders neutral.
- [ ] Every tone maps to the expected semantic colour, light and dark.
- [ ] No `::ng-deep`, no DOM querying.
