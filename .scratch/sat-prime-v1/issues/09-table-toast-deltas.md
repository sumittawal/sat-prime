# 09 — Verify table and toast deltas

Type: task
Status: ready-for-agent
Blocked by: 05

## Goal

Prove the token/CSS deltas land without a structural wrapper (table) and that the
toast needs only the message-template wrapper for its countdown.

## Scope

- Render DataTable at normal, `small`, and `large` in Storybook and
  `SatPrimeDemo`.
- Confirm body-cell vertical padding: 6px normal, 10px large, 2px small;
  horizontal unchanged.
- Confirm toast left border 3px, other edges 1px, severity colours unchanged.
- Confirm header/footer cells are untouched.
- If any requirement cannot be met without structure, record it before adding a
  wrapper.

## Acceptance

- [ ] Table uses tokens/component `css` only; no `sat-table` wrapper.
- [ ] Toast visual shell uses tokens/component `css`; `SatToast` exists only for
  the countdown template.
- [ ] Findings recorded in `docs/design/deltas.md`.
