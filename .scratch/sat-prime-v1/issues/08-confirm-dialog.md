# 08 — SatConfirmDialog and SatConfirmation

Type: task
Status: in-progress
Blocked by: 05

## Goal

A typed confirmation API over PrimeNG's dialog.

## Scope

- `ng generate component ui/confirm-dialog/sat-confirm-dialog`.
- `ng generate service ui/confirm-dialog/sat-confirmation`.
- Wraps `p-confirmdialog`; projects content.
- Helpers: `success()`, `info()`, `warning()`, `danger()`.
- Map tone → `acceptButtonProps.severity` (`success|info|warn|danger`).
- Default icons and labels; `key` support.
- Stories for all four tones plus keyboard and focus return.

## Acceptance

- [ ] Each helper opens the dialog with the correct accept-button severity.
- [ ] `key` targets the matching `sat-confirm-dialog`.
- [ ] Escape closes; focus returns to the trigger.
- [ ] axe passes on every story.
