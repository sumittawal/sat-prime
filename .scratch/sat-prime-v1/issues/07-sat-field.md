# 07 — SatField projection shell

Type: task
Status: resolved
Blocked by: 06, 01

## Goal

A label/hint/error shell that projects the real control and works with every
Angular form API.

## Scope

- `ng generate component ui/field/sat-field`.
- Inputs: `label`, `hint`, `error`, `required`, `dot`, `dotTone`.
- Renders label row (dot + text + required marker), projected control, hint, and
  error.
- No `ControlValueAccessor`, no model ownership, no `NgControl` read.
- Stories: InputText, Select, DatePicker × Signal Forms / `ngModel` × required /
  error / each dot tone.

## Acceptance

- [ ] Projection works with `[field]` (Signal Forms), `[(ngModel)]`, and
  `formControlName`.
- [ ] Error state is driven only by the `error` input.
- [ ] Required marker is present only when `required` is true.
- [ ] axe passes on every story.
